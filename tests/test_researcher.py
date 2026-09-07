"""Tests for the research fan-out.

The two properties that matter most: music is always researched as two separate
rights, and no evidence object can exist without a citable URL.
"""

from __future__ import annotations

import asyncio

import pytest

from clearframe.agents.researcher import (
    RightsAspect,
    build_briefs,
    evidence_from_response,
    research_items,
)
from clearframe.audit.logger import AuditLogger
from clearframe.config import Settings
from clearframe.models import (
    DepictionNature,
    ExtractedItem,
    ItemCategory,
    Occurrence,
    PipelineStage,
)
from clearframe.tools.parallel_client import ParallelClient, ParallelResponse, SourceRecord


def _item(category: ItemCategory, name: str = "Test Entity") -> ExtractedItem:
    """Build an ExtractedItem for research tests."""
    return ExtractedItem(
        mention_text=name,
        normalized_name=name,
        category=category,
        occurrences=[
            Occurrence(
                scene_number=1,
                page_number=1,
                context_snippet=f"...{name}...",
                on_screen=True,
                depiction_nature=DepictionNature.NEUTRAL,
            )
        ],
    )


# ---------------------------------------------------------------------------
# Brief construction
# ---------------------------------------------------------------------------


def test_music_always_produces_two_briefs_for_two_rights() -> None:
    """Composition and sound recording are separate copyrights.

    Resolving only one of them is the most common clearance error in music, so
    the pipeline must never let a single call stand in for both.
    """
    briefs = build_briefs(_item(ItemCategory.MUSIC, "Bye Bye Blackbird"))
    assert len(briefs) == 2
    assert {b.aspect for b in briefs} == {
        RightsAspect.COMPOSITION,
        RightsAspect.SOUND_RECORDING,
    }


def test_composition_brief_excludes_recording_facts_and_vice_versa() -> None:
    """Each music brief explicitly scopes itself away from the other right."""
    composition, recording = build_briefs(_item(ItemCategory.MUSIC, "Song"))
    assert "not any" in composition.objective or "underlying song" in composition.objective
    assert "Do not report facts about any sound recording" in composition.objective
    assert "not the underlying composition" in recording.objective
    assert "does not imply a public-domain recording" in recording.objective


@pytest.mark.parametrize(
    "category",
    [
        ItemCategory.BRAND_TRADEMARK,
        ItemCategory.REAL_PERSON,
        ItemCategory.REAL_LOCATION_BUSINESS,
        ItemCategory.PUBLISHED_WORK,
        ItemCategory.NAME_COLLISION,
        ItemCategory.LOGO_PROP,
    ],
)
def test_non_music_categories_produce_one_brief(category: ItemCategory) -> None:
    """Only music splits; everything else costs one research task."""
    assert len(build_briefs(_item(category))) == 1


@pytest.mark.parametrize(
    ("category", "fact"),
    [
        (ItemCategory.REAL_PERSON, "person_death_year"),
        (ItemCategory.REAL_PERSON, "domicile_state_at_death"),
        (ItemCategory.PUBLISHED_WORK, "author_death_year"),
        (ItemCategory.PUBLISHED_WORK, "publication_year"),
        (ItemCategory.BRAND_TRADEMARK, "registration_status"),
        (ItemCategory.REAL_LOCATION_BUSINESS, "permit_required"),
    ],
)
def test_briefs_seek_the_facts_the_rules_engine_needs(
    category: ItemCategory, fact: str
) -> None:
    """Briefs ask for exactly the fields the deterministic engine consumes.

    Without these, ``evaluate()`` can only return INSUFFICIENT_FACTS.
    """
    facts = {f for b in build_briefs(_item(category)) for f in b.facts_sought}
    assert fact in facts


def test_person_brief_asks_for_domicile_because_terms_vary_by_state() -> None:
    """US post-mortem publicity terms turn on domicile, so it must be sourced."""
    brief = build_briefs(_item(ItemCategory.REAL_PERSON, "Someone"))[0]
    assert "domicile" in brief.objective.lower()
    assert "100 years" in brief.objective


def test_name_collision_brief_accepts_a_negative_finding() -> None:
    """"No such entity exists" is a useful research result, not a failure."""
    brief = build_briefs(_item(ItemCategory.NAME_COLLISION, "Meridian Sound"))[0]
    assert "say so explicitly" in brief.objective


def test_every_brief_names_the_entity_and_carries_queries() -> None:
    """A brief with no queries would silently research nothing."""
    for category in ItemCategory:
        for brief in build_briefs(_item(category, "Acme Corp")):
            assert "Acme Corp" in brief.objective
            assert brief.queries


# ---------------------------------------------------------------------------
# Evidence construction
# ---------------------------------------------------------------------------


def _response(sources: list[SourceRecord], ok: bool = True) -> ParallelResponse:
    """Build a ParallelResponse for evidence tests."""
    return ParallelResponse(ok=ok, surface="search", objective="o", sources=sources)


def test_failed_response_yields_no_evidence() -> None:
    """A failed call must not fabricate evidence from nothing."""
    brief = build_briefs(_item(ItemCategory.BRAND_TRADEMARK))[0]
    assert evidence_from_response(brief, _response([], ok=False), 8) == []


def test_source_without_a_snippet_yields_no_evidence() -> None:
    """A URL with no excerpt supports no claim, so it is not evidence."""
    brief = build_briefs(_item(ItemCategory.BRAND_TRADEMARK))[0]
    sources = [SourceRecord(url="https://x.example", excerpts=[])]
    assert evidence_from_response(brief, _response(sources), 8) == []


def test_evidence_carries_url_timestamp_and_relevance_note() -> None:
    """Every evidence object must be independently checkable by a reviewer."""
    brief = build_briefs(_item(ItemCategory.BRAND_TRADEMARK))[0]
    sources = [SourceRecord(url="https://x.example/1", title="T", excerpts=["fact"])]
    evidence = evidence_from_response(brief, _response(sources), 8)[0]
    assert evidence.source_url == "https://x.example/1"
    assert evidence.retrieved_at.tzinfo is not None
    assert "registrant" in evidence.relevance_note


def test_music_evidence_is_labelled_with_the_right_it_supports() -> None:
    """A reviewer must see which of the two music rights a source bears on."""
    composition, recording = build_briefs(_item(ItemCategory.MUSIC, "Song"))
    sources = [SourceRecord(url="https://x.example/1", excerpts=["fact"])]
    comp_ev = evidence_from_response(composition, _response(sources), 8)[0]
    rec_ev = evidence_from_response(recording, _response(sources), 8)[0]
    assert "composition right" in comp_ev.relevance_note
    assert "sound recording right" in rec_ev.relevance_note


def test_evidence_count_is_capped_per_brief() -> None:
    """A flood of sources cannot blow up the report or the synthesis prompt."""
    brief = build_briefs(_item(ItemCategory.BRAND_TRADEMARK))[0]
    sources = [
        SourceRecord(url=f"https://x.example/{n}", excerpts=["fact"]) for n in range(50)
    ]
    assert len(evidence_from_response(brief, _response(sources), 8)) == 8


# ---------------------------------------------------------------------------
# Fan-out behaviour
# ---------------------------------------------------------------------------


class _StubClient:
    """Parallel client stub that returns fixed sources or fails on demand."""

    def __init__(self, fail_for: set[str] | None = None):
        self.fail_for = fail_for or set()
        self.task_count = 0
        self.objectives: list[str] = []

    async def search(self, objective, queries, mode="fast", max_chars=6000):
        self.task_count += 1
        self.objectives.append(objective)
        if any(token in objective for token in self.fail_for):
            return ParallelResponse(
                ok=False, surface="search", objective=objective, error="boom"
            )
        return ParallelResponse(
            ok=True,
            surface="search",
            objective=objective,
            sources=[SourceRecord(url="https://x.example/1", excerpts=["fact"])],
            task_cost=1,
        )

    async def aclose(self):
        return None


async def test_one_failing_item_does_not_lose_the_others() -> None:
    """A fan-out that aborts on the first failure would waste the whole run."""
    items = [
        _item(ItemCategory.BRAND_TRADEMARK, "GoodBrand"),
        _item(ItemCategory.BRAND_TRADEMARK, "BadBrand"),
        _item(ItemCategory.PUBLISHED_WORK, "GoodBook"),
    ]
    audit = AuditLogger(echo=False)
    store = await research_items(
        items, settings=Settings(), audit=audit, client=_StubClient(fail_for={"BadBrand"})
    )
    covered = {e.item_id for e in store.values()}
    assert items[0].item_id in covered
    assert items[2].item_id in covered
    assert items[1].item_id not in covered


async def test_item_with_no_evidence_is_recorded_as_a_gap() -> None:
    """An unresearched item must be visible to the reviewer, never silent."""
    items = [_item(ItemCategory.BRAND_TRADEMARK, "BadBrand")]
    audit = AuditLogger(echo=False)
    await research_items(
        items, settings=Settings(), audit=audit, client=_StubClient(fail_for={"BadBrand"})
    )
    gaps = [
        e
        for e in audit.entries
        if e.stage is PipelineStage.RESEARCH and "NO EVIDENCE FOUND" in e.output_summary
    ]
    assert gaps and gaps[0].level == "WARNING"


async def test_music_item_issues_two_calls_not_one() -> None:
    """The two-rights split must survive the fan-out, not just brief building."""
    client = _StubClient()
    await research_items(
        [_item(ItemCategory.MUSIC, "Song")], settings=Settings(), client=client
    )
    assert client.task_count == 2
    assert any("MUSICAL COMPOSITION" in o for o in client.objectives)
    assert any("SOUND RECORDINGS" in o for o in client.objectives)


async def test_empty_item_list_returns_an_empty_store() -> None:
    """A script with nothing to research does not error."""
    assert await research_items([], settings=Settings(), client=_StubClient()) == {}


async def test_research_totals_are_audited_for_cost() -> None:
    """Parallel spend and coverage are both reportable from the trail."""
    items = [_item(ItemCategory.BRAND_TRADEMARK, f"Brand{n}") for n in range(3)]
    audit = AuditLogger(echo=False)
    await research_items(items, settings=Settings(), audit=audit, client=_StubClient())
    total = next(e for e in audit.entries if e.tool == "researcher.research_items")
    assert total.task_cost == 3
    assert "3/3 items" in total.output_summary
