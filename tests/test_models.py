"""Tests for the ClearFrame schemas.

Focus on the invariants that carry product meaning: normalisation (the
deduplication key), evidence requiring a real URL, and the pending-item logic
that gates export.
"""

from __future__ import annotations

import pytest
from pydantic import ValidationError

from clearframe.models import (
    ClearanceReport,
    DepictionNature,
    Evidence,
    ExtractedItem,
    Finding,
    ItemCategory,
    Occurrence,
    ReviewDecision,
    ReviewState,
    Scene,
    Tier,
    normalize_name,
    stable_item_id,
)


@pytest.mark.parametrize(
    ("raw", "expected"),
    [
        ("Coca-Cola", "coca cola"),
        ("coca cola", "coca cola"),
        ("COCA-COLA", "coca cola"),
        ("The Coca-Cola's", "coca cola"),
        ("Coca‑Cola.", "coca cola"),
        ("  Nike  ", "nike"),
        ("Nike's", "nike"),
        ("A Tribe Called Quest", "tribe called quest"),
        ("St. Regis Hotel", "st regis hotel"),
    ],
)
def test_normalize_name_handles_case_punctuation_and_possessives(
    raw: str, expected: str
) -> None:
    """Normalisation collapses the variants that would otherwise fan out twice."""
    assert normalize_name(raw) == expected


def test_stable_item_id_is_deterministic_and_category_scoped() -> None:
    """Re-running extraction yields the same ids, so audit diffs stay comparable."""
    a = stable_item_id("coca cola", ItemCategory.BRAND_TRADEMARK)
    b = stable_item_id("coca cola", ItemCategory.BRAND_TRADEMARK)
    c = stable_item_id("coca cola", ItemCategory.LOGO_PROP)
    assert a == b
    assert a != c


def test_evidence_requires_an_http_url() -> None:
    """Evidence with no resolvable source cannot be constructed at all."""
    with pytest.raises(ValidationError):
        Evidence(item_id="item_1", source_url="", snippet="x")
    with pytest.raises(ValidationError):
        Evidence(item_id="item_1", source_url="not-a-url", snippet="x")

    ok = Evidence(
        item_id="item_1", source_url="https://tsdr.uspto.gov/x", snippet="registered"
    )
    assert ok.evidence_id.startswith("ev_")
    assert ok.retrieved_at.tzinfo is not None


def _item(**kw) -> ExtractedItem:
    """Build an ExtractedItem with sensible defaults for tests."""
    defaults = dict(
        mention_text="Coca-Cola",
        category=ItemCategory.BRAND_TRADEMARK,
        normalized_name="coca cola",
    )
    defaults.update(kw)
    return ExtractedItem(**defaults)


def _occ(**kw) -> Occurrence:
    """Build an Occurrence with sensible defaults for tests."""
    defaults = dict(
        scene_number=1, page_number=3, context_snippet="a Coca-Cola sign", on_screen=True
    )
    defaults.update(kw)
    return Occurrence(**defaults)


def test_item_rollups_report_worst_depiction_and_on_screen() -> None:
    """Roll-ups drive escalation, so the adverse case must win."""
    item = _item(
        occurrences=[
            _occ(depiction_nature=DepictionNature.NEUTRAL, on_screen=False, page_number=3),
            _occ(depiction_nature=DepictionNature.NEGATIVE, on_screen=True, page_number=11),
            _occ(depiction_nature=DepictionNature.POSITIVE, on_screen=False, page_number=3),
        ]
    )
    assert item.occurrence_count == 3
    assert item.appears_on_screen is True
    assert item.worst_depiction is DepictionNature.NEGATIVE
    assert item.page_numbers == [3, 11]


def test_report_pending_logic_counts_missing_states_as_pending() -> None:
    """An item with no review state blocks export just as a PENDING one does."""
    items = [_item(item_id="a"), _item(item_id="b"), _item(item_id="c")]
    report = ClearanceReport(script_name="Test", items=items)
    report.review_states["a"] = ReviewState(
        item_id="a", decision=ReviewDecision.CONFIRMED
    )
    report.review_states["b"] = ReviewState(item_id="b", decision=ReviewDecision.PENDING)
    # "c" has no state at all.
    assert report.pending_item_ids() == ["b", "c"]


def test_tier_counts_includes_zero_tiers() -> None:
    """The summary table always shows every tier, including empty ones."""
    report = ClearanceReport(
        script_name="Test",
        findings=[
            Finding(item_id="a", tier=Tier.ESCALATE),
            Finding(item_id="b", tier=Tier.ESCALATE),
        ],
    )
    counts = report.tier_counts()
    assert counts["ESCALATE"] == 2
    assert counts["CLEAR_ON_RECORD"] == 0
    assert counts["NEEDS_VERIFICATION"] == 0


def test_evidence_for_item_filters_the_store() -> None:
    """Evidence is stored report-wide but always retrievable per item."""
    report = ClearanceReport(script_name="Test")
    for i, item_id in enumerate(["a", "a", "b"]):
        ev = Evidence(
            item_id=item_id, source_url=f"https://example.com/{i}", snippet="s"
        )
        report.evidence_store[ev.evidence_id] = ev
    assert len(report.evidence_for_item("a")) == 2
    assert len(report.evidence_for_item("b")) == 1
    assert report.evidence_for_item("zzz") == []


def test_no_schema_exposes_a_cleared_state() -> None:
    """Positioning enforced in the type system: nothing can be marked cleared.

    ``CLEAR_ON_RECORD`` describes reviewer workload. There is deliberately no
    ``CLEARED``, ``APPROVED``, or ``SAFE`` member anywhere in the enums a
    consumer could read as a legal conclusion.
    """
    forbidden = {"CLEARED", "APPROVED", "SAFE", "LEGAL", "OK_TO_USE"}
    for enum_cls in (Tier, ReviewDecision):
        assert not forbidden & {m.name for m in enum_cls}
        assert not forbidden & {m.value for m in enum_cls}


def test_scene_full_text_joins_heading_action_and_dialogue() -> None:
    """Extraction reads scenes as one block, so the join must be lossless."""
    scene = Scene(
        scene_number=1,
        page_number=1,
        heading="INT. DINER - NIGHT",
        action_text="She sips a Coke.",
        dialogue_text="MAYA: It's warm.",
    )
    assert "INT. DINER - NIGHT" in scene.full_text
    assert "Coke" in scene.full_text
    assert "Maya".upper() in scene.full_text


def test_models_reject_unknown_fields() -> None:
    """extra='forbid' everywhere stops silent typos crossing module boundaries."""
    with pytest.raises(ValidationError):
        Finding(item_id="a", tier=Tier.ESCALATE, verdict="cleared")
