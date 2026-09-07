"""Tests for extraction chunking and deduplication.

Deduplication is the pipeline's cost control: one surviving item equals one paid
Parallel research task. These tests pin both directions of the trade-off —
variants must merge, but genuinely distinct entities must never be collapsed,
because a hidden item is a missed clearance item.
"""

from __future__ import annotations

import pytest

from clearframe.agents.extractor import (
    choose_label,
    _GeminiItem,
    _coerce_category,
    _coerce_depiction,
    _is_token_subsequence,
    canonical_key,
    chunk_scenes,
    deduplicate,
    render_chunk,
)
from clearframe.audit.logger import AuditLogger
from clearframe.models import DepictionNature, ItemCategory, PipelineStage, Scene

PAGES = {n: (n // 3) + 1 for n in range(1, 30)}


def _raw(
    mention: str,
    canonical: str = "",
    category: str = "BRAND_TRADEMARK",
    scene: int = 1,
    on_screen: bool = True,
    depiction: str = "NEUTRAL",
) -> _GeminiItem:
    """Build a raw per-mention record as the model would return it."""
    return _GeminiItem(
        mention_text=mention,
        normalized_name=canonical or mention,
        category=category,
        scene_number=scene,
        context_snippet=f"...{mention}...",
        on_screen=on_screen,
        depiction_nature=depiction,
    )


# ---------------------------------------------------------------------------
# Chunking
# ---------------------------------------------------------------------------


def _scene(n: int) -> Scene:
    """Build a Scene for chunking tests."""
    return Scene(
        scene_number=n, page_number=PAGES[n], heading=f"INT. ROOM {n} - DAY", action_text="x"
    )


def test_chunking_respects_scene_boundaries_and_covers_everything() -> None:
    """No scene may be split across chunks or dropped between them."""
    scenes = [_scene(n) for n in range(1, 15)]
    chunks = chunk_scenes(scenes, 9)
    assert [len(c) for c in chunks] == [9, 5]
    flat = [s.scene_number for c in chunks for s in c]
    assert flat == list(range(1, 15))


def test_chunk_size_of_one_is_valid() -> None:
    """Degenerate chunk sizes still produce complete coverage."""
    scenes = [_scene(n) for n in range(1, 5)]
    assert len(chunk_scenes(scenes, 1)) == 4


def test_zero_chunk_size_is_rejected() -> None:
    """An invalid chunk size fails fast rather than looping forever."""
    with pytest.raises(ValueError):
        chunk_scenes([_scene(1)], 0)


def test_rendered_chunk_labels_scene_and_page() -> None:
    """The model needs both numbers to attribute occurrences correctly."""
    rendered = render_chunk([_scene(4)])
    assert "SCENE 4" in rendered
    assert f"script page {PAGES[4]}" in rendered
    assert "[ACTION]" in rendered and "[DIALOGUE]" in rendered


# ---------------------------------------------------------------------------
# Canonicalisation
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    ("a", "b"),
    [
        ("Coca-Cola", "coca cola"),
        ("Coke", "Coca-Cola"),
        ("COCA-COLA", "The Coca-Cola's"),
        ("Marlboros", "Marlboro"),
        ("Levis", "Levi Strauss"),
    ],
)
def test_variant_surface_forms_share_a_key(a: str, b: str) -> None:
    """Case, punctuation, possessives and known nicknames all collapse."""
    assert canonical_key(a) == canonical_key(b)


@pytest.mark.parametrize(
    ("a", "b"),
    [("Coca-Cola", "Pepsi"), ("Nike", "Adidas"), ("Gibson", "Fender")],
)
def test_distinct_brands_keep_distinct_keys(a: str, b: str) -> None:
    """Normalisation must not collapse genuinely different entities."""
    assert canonical_key(a) != canonical_key(b)


@pytest.mark.parametrize(
    ("raw", "expected"),
    [
        ("BRAND_TRADEMARK", ItemCategory.BRAND_TRADEMARK),
        ("brand_trademark", ItemCategory.BRAND_TRADEMARK),
        ("MUSIC", ItemCategory.MUSIC),
        ("Song", ItemCategory.MUSIC),
        ("PERSON", ItemCategory.REAL_PERSON),
        ("nonsense", None),
    ],
)
def test_category_coercion(raw: str, expected: ItemCategory | None) -> None:
    """Model category strings map onto the enum, or are rejected outright."""
    assert _coerce_category(raw) is expected


def test_unknown_depiction_defaults_to_neutral() -> None:
    """An unparseable depiction never silently becomes NEGATIVE or POSITIVE."""
    assert _coerce_depiction("bananas") is DepictionNature.NEUTRAL
    assert _coerce_depiction("negative") is DepictionNature.NEGATIVE


# ---------------------------------------------------------------------------
# Deduplication
# ---------------------------------------------------------------------------


def test_three_mentions_become_one_item_with_three_occurrences() -> None:
    """The core cost control: three mentions, one research task."""
    raw = [
        _raw("Coca-Cola", scene=1),
        _raw("Coke", "Coca-Cola", scene=4),
        _raw("a COCA-COLA", "Coca-Cola", scene=8),
    ]
    items = deduplicate(raw, PAGES)
    assert len(items) == 1
    assert items[0].occurrence_count == 3
    assert sorted(o.scene_number for o in items[0].occurrences) == [1, 4, 8]


def test_merged_variants_are_preserved_for_the_reviewer() -> None:
    """The reviewer must still see every surface form that was merged."""
    items = deduplicate(
        [_raw("Coca-Cola", scene=1), _raw("Coke", "Coca-Cola", scene=2)], PAGES
    )
    assert "Coke" in items[0].variants


def test_same_name_in_different_categories_stays_separate() -> None:
    """A brand and a same-named location are different clearance questions."""
    raw = [
        _raw("Meridian", category="BRAND_TRADEMARK", scene=1),
        _raw("Meridian", category="REAL_LOCATION_BUSINESS", scene=2),
    ]
    items = deduplicate(raw, PAGES)
    assert len(items) == 2
    assert {i.category for i in items} == {
        ItemCategory.BRAND_TRADEMARK,
        ItemCategory.REAL_LOCATION_BUSINESS,
    }


def test_longer_form_absorbs_the_shorter_within_a_category() -> None:
    """"Chateau Marmont" and "the Chateau Marmont hotel" are one item."""
    raw = [
        _raw("Chateau Marmont", "Chateau Marmont", "REAL_LOCATION_BUSINESS", scene=1),
        _raw("the Chateau Marmont Hotel", "Chateau Marmont Hotel", "REAL_LOCATION_BUSINESS", scene=5),
    ]
    items = deduplicate(raw, PAGES)
    assert len(items) == 1
    assert items[0].occurrence_count == 2


def test_short_single_tokens_do_not_over_merge() -> None:
    """Aggressive subsequence merging would hide items; it is capped."""
    raw = [
        _raw("Gap", "Gap", "BRAND_TRADEMARK", scene=1),
        _raw("Gap Kids Store", "Gap Kids Store", "BRAND_TRADEMARK", scene=2),
    ]
    items = deduplicate(raw, PAGES)
    # "gap" is a 3-character single token, below the merge threshold.
    assert len(items) == 2


def test_occurrence_carries_the_true_page_not_the_scene_number() -> None:
    """Occurrences are stamped with the real page from the parsed script."""
    items = deduplicate([_raw("Nike", scene=7)], PAGES)
    assert items[0].occurrences[0].page_number == PAGES[7]


def test_on_screen_and_depiction_roll_up_to_the_adverse_case() -> None:
    """One negative on-screen use governs the whole item's exposure."""
    raw = [
        _raw("Marlboro", scene=1, on_screen=False, depiction="NEUTRAL"),
        _raw("Marlboro", scene=5, on_screen=True, depiction="NEGATIVE"),
    ]
    items = deduplicate(raw, PAGES)
    assert items[0].appears_on_screen is True
    assert items[0].worst_depiction is DepictionNature.NEGATIVE


def test_items_are_ordered_by_occurrence_count() -> None:
    """The reviewer sees the most-referenced items first."""
    raw = [
        _raw("Nike", scene=1),
        _raw("Rolex", scene=1),
        _raw("Rolex", scene=2),
        _raw("Rolex", scene=3),
    ]
    items = deduplicate(raw, PAGES)
    assert items[0].mention_text == "Rolex"
    assert items[0].occurrence_count == 3


def test_item_ids_are_stable_across_runs() -> None:
    """Stable ids keep audit diffs and benchmark runs comparable."""
    a = deduplicate([_raw("Nike", scene=1)], PAGES)[0].item_id
    b = deduplicate([_raw("Nike", scene=2)], PAGES)[0].item_id
    assert a == b


def test_empty_extraction_is_a_valid_result() -> None:
    """A script with nothing flaggable yields no items and does not crash."""
    assert deduplicate([], PAGES) == []


# ---------------------------------------------------------------------------
# Nothing is dropped silently (rule 8)
# ---------------------------------------------------------------------------


def test_unknown_category_is_skipped_but_audited() -> None:
    """A record the pipeline cannot use is logged, never silently discarded."""
    audit = AuditLogger(echo=False)
    items = deduplicate([_raw("Widget", category="NOT_A_CATEGORY")], PAGES, audit=audit)
    assert items == []
    entry = next(e for e in audit.entries if e.stage is PipelineStage.DEDUPLICATE)
    assert entry.level == "WARNING"
    assert any("Widget" in s for s in entry.detail["skipped"])


def test_mention_in_a_nonexistent_scene_is_skipped_but_audited() -> None:
    """A hallucinated scene number cannot produce a bogus page citation."""
    audit = AuditLogger(echo=False)
    items = deduplicate([_raw("Ghost", scene=999)], PAGES, audit=audit)
    assert items == []
    entry = next(e for e in audit.entries if e.stage is PipelineStage.DEDUPLICATE)
    assert any("999" in s for s in entry.detail["skipped"])


def test_deduplication_records_the_cost_saving() -> None:
    """The audit trail states the research-task count the merge avoided."""
    audit = AuditLogger(echo=False)
    raw = [_raw("Coca-Cola", scene=n) for n in range(1, 6)]
    deduplicate(raw, PAGES, audit=audit)
    entry = next(
        e for e in audit.entries if e.tool == "extractor.deduplicate"
    )
    assert entry.detail["raw_mentions"] == 5
    assert entry.detail["distinct_items"] == 1
    assert "instead of 5" in entry.output_summary


def test_every_merge_is_individually_audited() -> None:
    """A reviewer can see exactly which surface forms were folded together."""
    audit = AuditLogger(echo=False)
    raw = [
        _raw("Chateau Marmont", "Chateau Marmont", "REAL_LOCATION_BUSINESS", scene=1),
        _raw("Chateau Marmont Hotel", "Chateau Marmont Hotel", "REAL_LOCATION_BUSINESS", scene=2),
    ]
    deduplicate(raw, PAGES, audit=audit)
    assert any(e.tool == "extractor.merge_variant" for e in audit.entries)


@pytest.mark.parametrize(
    ("needle", "haystack", "expected"),
    [
        (["coca", "cola"], ["coca", "cola", "company"], True),
        (["cola"], ["coca", "cola"], True),
        (["coca", "company"], ["coca", "cola", "company"], False),
        (["a", "b", "c"], ["a", "b"], False),
        ([], ["a"], False),
    ],
)
def test_token_subsequence(needle: list[str], haystack: list[str], expected: bool) -> None:
    """Subsequence matching is contiguous, not merely set containment."""
    assert _is_token_subsequence(needle, haystack) is expected


# ---------------------------------------------------------------------------
# Spacing variants
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    ("a", "b"),
    [
        ("Neumann U 87", "Neumann U87"),
        ("Echo Plex", "Echoplex"),
        ("Play Station", "PlayStation"),
    ],
)
def test_spacing_variants_merge_into_one_item(a: str, b: str) -> None:
    """Model output varies on internal spacing across calls; the entity does not.

    Left unmerged these fan out as two paid research tasks and appear twice in
    the reviewer's log as if they were different entities.
    """
    items = deduplicate([_raw(a, a, scene=1), _raw(b, b, scene=4)], PAGES)
    assert len(items) == 1
    assert items[0].occurrence_count == 2


def test_spacing_merge_respects_category_boundaries() -> None:
    """A spacing match across categories is still two clearance questions."""
    raw = [
        _raw("Echo Plex", "Echo Plex", "REAL_LOCATION_BUSINESS", scene=1),
        _raw("Echoplex", "Echoplex", "BRAND_TRADEMARK", scene=2),
    ]
    assert len(deduplicate(raw, PAGES)) == 2


def test_spacing_merge_does_not_collapse_different_names() -> None:
    """Removing whitespace must not make distinct entities collide."""
    raw = [_raw("Coca-Cola", scene=1), _raw("Pepsi", scene=2), _raw("Nike", scene=3)]
    assert len(deduplicate(raw, PAGES)) == 3


def test_spacing_merge_is_audited() -> None:
    """The reviewer can see which surface forms were folded together."""
    audit = AuditLogger(echo=False)
    deduplicate(
        [_raw("Neumann U 87", "Neumann U 87", scene=1), _raw("Neumann U87", "Neumann U87", scene=2)],
        PAGES,
        audit=audit,
    )
    assert any(e.tool == "extractor.merge_spacing_variant" for e in audit.entries)


# ---------------------------------------------------------------------------
# Label selection
# ---------------------------------------------------------------------------


def test_anaphoric_mention_does_not_become_the_item_label() -> None:
    """Merging on the canonical name is right; labelling with the anaphor is not.

    A reviewer reading "the estate — 3 occurrences" cannot act on it. The label
    must name the entity even when the vague form was encountered first.
    """
    raw = [
        _raw("the estate", "Gene Austin", "REAL_PERSON", scene=1),
        _raw("Gene Austin", "Gene Austin", "REAL_PERSON", scene=4),
    ]
    items = deduplicate(raw, PAGES)
    assert len(items) == 1
    assert items[0].mention_text == "Gene Austin"
    assert "the estate" in items[0].variants


def test_label_selection_prefers_canonical_overlap_over_length() -> None:
    """A long vague phrase must not beat a short accurate name."""
    assert (
        choose_label(["that label over in Nashville", "Meridian Records"], "Meridian Records")
        == "Meridian Records"
    )


def test_label_selection_falls_back_when_nothing_matches() -> None:
    """With no overlap at all, encounter order is preserved rather than guessed."""
    assert choose_label(["that label", "the outfit"], "Meridian Records") == "that label"


def test_label_selection_handles_empty_input() -> None:
    """Degenerate input returns cleanly rather than raising."""
    assert choose_label([], "Anything") == ""


def test_every_surface_form_survives_relabelling() -> None:
    """Promoting a label must never lose a variant the reviewer might search for."""
    raw = [
        _raw("the estate", "Gene Austin", "REAL_PERSON", scene=1),
        _raw("Gene Austin", "Gene Austin", "REAL_PERSON", scene=4),
        _raw("Austin", "Gene Austin", "REAL_PERSON", scene=8),
    ]
    item = deduplicate(raw, PAGES)[0]
    assert set([item.mention_text, *item.variants]) == {"the estate", "Gene Austin", "Austin"}
