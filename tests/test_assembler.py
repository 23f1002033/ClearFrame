"""Tests for assembly: the rules gate, forced tiers, and the music split.

The assembler is where deterministic arithmetic and model judgment meet, so
these tests pin exactly which decisions the model is and is not allowed to make.
"""

from __future__ import annotations

import pytest

from clearframe.agents.assembler import (
    apply_rules,
    forced_tier,
    render_evidence,
    render_rule_outcomes,
)
from clearframe.audit.logger import AuditLogger
from clearframe.models import (
    DepictionNature,
    Evidence,
    ExtractedItem,
    ItemCategory,
    Occurrence,
    PipelineStage,
    RuleFacts,
    RuleOutcome,
    RuleOutcomeCode,
    Tier,
    WorkType,
)

EVAL = 2026


def _item(
    category: ItemCategory,
    name: str = "Thing",
    on_screen: bool = True,
    depiction: DepictionNature = DepictionNature.NEUTRAL,
) -> ExtractedItem:
    """Build an ExtractedItem for assembly tests."""
    return ExtractedItem(
        mention_text=name,
        normalized_name=name,
        category=category,
        occurrences=[
            Occurrence(
                scene_number=1,
                page_number=1,
                context_snippet="ctx",
                on_screen=on_screen,
                depiction_nature=depiction,
            )
        ],
    )


# ---------------------------------------------------------------------------
# The music split survives assembly
# ---------------------------------------------------------------------------


def test_music_produces_two_rule_outcomes_one_per_right() -> None:
    """A song is two copyrights, so assembly must produce two outcomes."""
    outcomes = apply_rules(
        _item(ItemCategory.MUSIC, "Bye Bye Blackbird"),
        RuleFacts(publication_year=1926, evaluation_year=EVAL),
        recording_year=1926,
    )
    assert len(outcomes) == 2
    assert {o.rule_id for o in outcomes} == {
        "US_PUB_PRE_1978_95_YEARS",
        "US_SOUND_RECORDING_MMA",
    }


def test_composition_and_recording_can_diverge_within_one_item() -> None:
    """The 1926 composition is PD; the 1926 recording is not. Both are reported."""
    composition, recording = apply_rules(
        _item(ItemCategory.MUSIC, "Bye Bye Blackbird"),
        RuleFacts(publication_year=1926, evaluation_year=EVAL),
        recording_year=1926,
    )
    assert composition.outcome is RuleOutcomeCode.PUBLIC_DOMAIN
    assert recording.outcome is RuleOutcomeCode.IN_COPYRIGHT
    assert composition.public_domain_year == 2022
    assert recording.public_domain_year == 2027


def test_recording_year_overrides_composition_year_for_the_recording_right() -> None:
    """A 1926 song reissued in 1955 has a later-running recording term."""
    _, recording = apply_rules(
        _item(ItemCategory.MUSIC, "Song"),
        RuleFacts(publication_year=1926, evaluation_year=EVAL),
        recording_year=1955,
    )
    assert recording.applied_facts["publication_year"] == 1955
    assert recording.public_domain_year == 2066  # 1955 + 110 under the MMA schedule


# ---------------------------------------------------------------------------
# Category routing
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    ("category", "expected_rule"),
    [
        (ItemCategory.BRAND_TRADEMARK, "TRADEMARK_NO_EXPIRY"),
        (ItemCategory.LOGO_PROP, "TRADEMARK_NO_EXPIRY"),
        (ItemCategory.NAME_COLLISION, "TRADEMARK_NO_EXPIRY"),
        (ItemCategory.REAL_LOCATION_BUSINESS, "TRADEMARK_NO_EXPIRY"),
        (ItemCategory.REAL_PERSON, "US_PUBLICITY_POSTMORTEM"),
    ],
)
def test_categories_route_to_the_right_rule(category: ItemCategory, expected_rule: str) -> None:
    """Each category reaches the rule that actually governs it."""
    outcomes = apply_rules(_item(category), RuleFacts(evaluation_year=EVAL))
    assert outcomes[0].rule_id == expected_rule


def test_published_work_uses_the_supplied_work_type() -> None:
    """A literary work is not forced onto a trademark or persona rule."""
    outcomes = apply_rules(
        _item(ItemCategory.PUBLISHED_WORK, "The Great Gatsby"),
        RuleFacts(work_type=WorkType.LITERARY_WORK, publication_year=1925, evaluation_year=EVAL),
    )
    assert outcomes[0].rule_id == "US_PUB_PRE_1978_95_YEARS"
    assert outcomes[0].outcome is RuleOutcomeCode.PUBLIC_DOMAIN


def test_rules_stage_is_audited_as_deterministic() -> None:
    """The trace must show the term came from Python, not from a model."""
    audit = AuditLogger(echo=False)
    apply_rules(
        _item(ItemCategory.PUBLISHED_WORK),
        RuleFacts(work_type=WorkType.LITERARY_WORK, publication_year=1925, evaluation_year=EVAL),
        audit=audit,
    )
    entry = next(e for e in audit.entries if e.stage is PipelineStage.RULES)
    assert entry.detail["deterministic"] is True
    assert entry.detail["rule_ids"]


# ---------------------------------------------------------------------------
# Forced tiers: decisions the model may not make
# ---------------------------------------------------------------------------


def _outcome(code: RuleOutcomeCode, rule_id: str = "R") -> RuleOutcome:
    """Build a rule outcome with a given code."""
    return RuleOutcome(rule_id=rule_id, outcome=code, explanation="x")


def test_negative_depiction_of_any_entity_forces_escalate() -> None:
    """Disparagement is high exposure regardless of what the rules returned."""
    item = _item(ItemCategory.BRAND_TRADEMARK, depiction=DepictionNature.NEGATIVE)
    assert forced_tier(item, [_outcome(RuleOutcomeCode.PUBLIC_DOMAIN)]) is Tier.ESCALATE


def test_living_person_forces_escalate() -> None:
    """A subsisting right of publicity always needs counsel."""
    item = _item(ItemCategory.REAL_PERSON, on_screen=False)
    assert forced_tier(item, [_outcome(RuleOutcomeCode.RIGHT_SUBSISTS)]) is Tier.ESCALATE


def test_in_copyright_music_forces_escalate() -> None:
    """Either music right being in copyright is enough to escalate."""
    item = _item(ItemCategory.MUSIC, on_screen=False)
    outcomes = [
        _outcome(RuleOutcomeCode.PUBLIC_DOMAIN, "US_PUB_PRE_1978_95_YEARS"),
        _outcome(RuleOutcomeCode.IN_COPYRIGHT, "US_SOUND_RECORDING_MMA"),
    ]
    assert forced_tier(item, outcomes) is Tier.ESCALATE


def test_on_screen_trademark_forces_escalate() -> None:
    """A mark shown on screen is materially different from one merely spoken."""
    on = _item(ItemCategory.BRAND_TRADEMARK, on_screen=True)
    off = _item(ItemCategory.BRAND_TRADEMARK, on_screen=False)
    outcomes = [_outcome(RuleOutcomeCode.NOT_APPLICABLE)]
    assert forced_tier(on, outcomes) is Tier.ESCALATE
    assert forced_tier(off, outcomes) is not Tier.ESCALATE


def test_insufficient_facts_forces_needs_verification() -> None:
    """An uncomputable term can never be tiered CLEAR_ON_RECORD."""
    item = _item(ItemCategory.PUBLISHED_WORK, on_screen=False)
    tier = forced_tier(item, [_outcome(RuleOutcomeCode.INSUFFICIENT_FACTS)])
    assert tier is Tier.NEEDS_VERIFICATION


def test_model_may_choose_when_nothing_is_compelled() -> None:
    """Where no trigger fires, synthesis is allowed to tier the item."""
    item = _item(ItemCategory.PUBLISHED_WORK, on_screen=False)
    assert forced_tier(item, [_outcome(RuleOutcomeCode.PUBLIC_DOMAIN)]) is None


def test_escalation_beats_insufficient_facts() -> None:
    """The more severe trigger wins when both apply."""
    item = _item(ItemCategory.MUSIC, depiction=DepictionNature.NEGATIVE)
    outcomes = [_outcome(RuleOutcomeCode.INSUFFICIENT_FACTS)]
    assert forced_tier(item, outcomes) is Tier.ESCALATE


# ---------------------------------------------------------------------------
# Prompt rendering
# ---------------------------------------------------------------------------


def test_evidence_is_rendered_with_the_ids_the_model_must_cite() -> None:
    """The model can only cite what the prompt labels."""
    evidence = [
        Evidence(
            item_id="i1",
            source_url="https://x.example/1",
            source_title="T",
            snippet="fact",
            relevance_note="note",
        )
    ]
    rendered = render_evidence(evidence)
    assert f"[{evidence[0].evidence_id}]" in rendered
    assert "https://x.example/1" in rendered


def test_absent_evidence_is_stated_not_faked() -> None:
    """An empty evidence block must read as empty, not as silence."""
    assert "no evidence" in render_evidence([]).lower()


def test_rule_outcomes_render_missing_facts_for_the_reviewer() -> None:
    """INSUFFICIENT_FACTS is the most actionable thing to surface."""
    outcome = RuleOutcome(
        rule_id="US_LIFE_PLUS_70",
        outcome=RuleOutcomeCode.INSUFFICIENT_FACTS,
        explanation="cannot compute",
        missing_facts=["author_death_year"],
    )
    rendered = render_rule_outcomes([outcome])
    assert "author_death_year" in rendered
    assert "INSUFFICIENT_FACTS" in rendered
