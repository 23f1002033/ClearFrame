"""Tests for the deterministic rules engine.

Covers the five cases the build specification requires:

1. A 1926 musical composition (US).
2. A 1978 musical composition (US).
3. A work by an author who died in 2001.
4. The sound recording vs musical composition split.
5. A missing-death-date case that must return INSUFFICIENT_FACTS.

Plus India terms, publicity, trademark, and a guard proving the module performs
no model inference.
"""

from __future__ import annotations

import ast
import inspect

import pytest

from clearframe.models import (
    AuthorshipType,
    Jurisdiction,
    RuleFacts,
    RuleOutcomeCode,
    WorkType,
)
from clearframe.tools import rules_engine
from clearframe.tools.rules_engine import evaluate, evaluate_music_both_rights

# All term assertions are pinned to a fixed evaluation year so the suite does
# not start failing on 1 January.
EVAL_YEAR = 2026


# ---------------------------------------------------------------------------
# 1. 1926 composition
# ---------------------------------------------------------------------------


def test_1926_composition_is_public_domain() -> None:
    """A 1926 US musical composition is out of its 95-year publication term."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.MUSICAL_COMPOSITION,
            jurisdiction=Jurisdiction.US,
            publication_year=1926,
            authorship_type=AuthorshipType.INDIVIDUAL,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.rule_id == "US_PUB_PRE_1978_95_YEARS"
    assert outcome.outcome is RuleOutcomeCode.PUBLIC_DOMAIN
    # 1926 + 95 = protection through end of 2021, public domain from 2022.
    assert outcome.public_domain_year == 2022
    assert "1926" in outcome.explanation
    assert outcome.citation


def test_1926_composition_explanation_carries_renewal_caveat() -> None:
    """The pre-1978 rule surfaces its renewal caveat to the reviewer."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.MUSICAL_COMPOSITION,
            publication_year=1926,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert "CAVEAT" in outcome.explanation


def test_1931_composition_still_in_copyright_in_2026() -> None:
    """The 95-year boundary is computed, not hardcoded to a cutoff year."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.MUSICAL_COMPOSITION,
            publication_year=1931,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.outcome is RuleOutcomeCode.IN_COPYRIGHT
    assert outcome.public_domain_year == 2027


# ---------------------------------------------------------------------------
# 2. 1978 composition
# ---------------------------------------------------------------------------


def test_1978_composition_without_death_year_is_insufficient() -> None:
    """A 1978 work switches to life+70 and so needs a death year, not a guess."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.MUSICAL_COMPOSITION,
            jurisdiction=Jurisdiction.US,
            publication_year=1978,
            authorship_type=AuthorshipType.INDIVIDUAL,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.rule_id == "US_LIFE_PLUS_70"
    assert outcome.outcome is RuleOutcomeCode.INSUFFICIENT_FACTS
    assert outcome.missing_facts == ["author_death_year"]
    assert outcome.public_domain_year is None


def test_1978_composition_with_death_year_computes_life_plus_70() -> None:
    """With a death year supplied, the 1978 work gets a real term."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.MUSICAL_COMPOSITION,
            publication_year=1978,
            author_death_year=1990,
            authorship_type=AuthorshipType.INDIVIDUAL,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.rule_id == "US_LIFE_PLUS_70"
    assert outcome.outcome is RuleOutcomeCode.IN_COPYRIGHT
    assert outcome.public_domain_year == 2061  # 1990 + 70, PD from 2061


def test_1978_corporate_work_uses_fixed_term_not_death_year() -> None:
    """A work for hire needs no death year; the 95/120 rule applies."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.MUSICAL_COMPOSITION,
            publication_year=1978,
            creation_year=1977,
            authorship_type=AuthorshipType.WORK_FOR_HIRE,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.rule_id == "US_CORPORATE_95_FROM_PUBLICATION"
    assert outcome.outcome is RuleOutcomeCode.IN_COPYRIGHT
    # min(1978+95+1, 1977+120+1) = min(2074, 2098) -> the shorter term controls.
    assert outcome.public_domain_year == 2074


# ---------------------------------------------------------------------------
# 3. Author died 2001
# ---------------------------------------------------------------------------


def test_author_died_2001_us_life_plus_70() -> None:
    """US: death in 2001 yields a term through 2071 and PD from 2072."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.LITERARY_WORK,
            jurisdiction=Jurisdiction.US,
            publication_year=1995,
            author_death_year=2001,
            authorship_type=AuthorshipType.INDIVIDUAL,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.rule_id == "US_LIFE_PLUS_70"
    assert outcome.outcome is RuleOutcomeCode.IN_COPYRIGHT
    assert outcome.public_domain_year == 2072
    assert "2001" in outcome.explanation


def test_author_died_2001_india_life_plus_60() -> None:
    """India: the same death year yields a shorter term than the US."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.LITERARY_WORK,
            jurisdiction=Jurisdiction.IN,
            publication_year=1995,
            author_death_year=2001,
            authorship_type=AuthorshipType.INDIVIDUAL,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.rule_id == "IN_LIFE_PLUS_60"
    assert outcome.outcome is RuleOutcomeCode.IN_COPYRIGHT
    assert outcome.public_domain_year == 2062


def test_jurisdiction_changes_the_answer() -> None:
    """A work PD in India can still be in copyright in the US."""
    facts = RuleFacts(
        work_type=WorkType.LITERARY_WORK,
        publication_year=1940,
        author_death_year=1960,
        authorship_type=AuthorshipType.INDIVIDUAL,
        evaluation_year=EVAL_YEAR,
    )
    india = evaluate(facts.model_copy(update={"jurisdiction": Jurisdiction.IN}))
    usa = evaluate(facts.model_copy(update={"jurisdiction": Jurisdiction.US}))
    assert india.outcome is RuleOutcomeCode.PUBLIC_DOMAIN  # 1960 + 60 -> PD 2021
    assert usa.outcome is RuleOutcomeCode.IN_COPYRIGHT  # 1940 + 95 -> PD 2036


# ---------------------------------------------------------------------------
# 4. Sound recording vs composition split
# ---------------------------------------------------------------------------


def test_sound_recording_and_composition_diverge_for_same_year() -> None:
    """The single most common clearance error: same song, two different answers.

    A 1926 composition is public domain in the US, but the 1926 sound recording
    of it runs a 100-year term and is not.
    """
    shared = {
        "jurisdiction": Jurisdiction.US,
        "publication_year": 1926,
        "authorship_type": AuthorshipType.INDIVIDUAL,
        "evaluation_year": EVAL_YEAR,
    }
    composition, recording = evaluate_music_both_rights(
        RuleFacts(**shared), RuleFacts(**shared)
    )

    assert composition.rule_id == "US_PUB_PRE_1978_95_YEARS"
    assert composition.outcome is RuleOutcomeCode.PUBLIC_DOMAIN
    assert composition.public_domain_year == 2022

    assert recording.rule_id == "US_SOUND_RECORDING_MMA"
    assert recording.outcome is RuleOutcomeCode.IN_COPYRIGHT
    assert recording.public_domain_year == 2027  # 1926 + 100, PD from 2027

    assert composition.outcome is not recording.outcome


def test_pre_1923_sound_recording_is_public_domain() -> None:
    """Recordings published 1922 or earlier entered PD on 1 January 2022."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.SOUND_RECORDING,
            publication_year=1918,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.outcome is RuleOutcomeCode.PUBLIC_DOMAIN
    assert outcome.public_domain_year == 2022


def test_1960_sound_recording_uses_fixed_2068_date() -> None:
    """1957-1972 recordings are protected until 2067 and PD from 2068."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.SOUND_RECORDING,
            publication_year=1960,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.rule_id == "US_SOUND_RECORDING_MMA"
    assert outcome.outcome is RuleOutcomeCode.IN_COPYRIGHT
    assert outcome.public_domain_year == 2068


def test_sound_recording_explanation_warns_against_conflating_rights() -> None:
    """The recording outcome always tells the reviewer to check the composition."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.SOUND_RECORDING,
            publication_year=1950,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert "composition" in outcome.explanation.lower()


def test_sound_recording_without_publication_year_is_insufficient() -> None:
    """No publication year means no recording term, and the engine says which fact."""
    outcome = evaluate(
        RuleFacts(work_type=WorkType.SOUND_RECORDING, evaluation_year=EVAL_YEAR)
    )
    assert outcome.outcome is RuleOutcomeCode.INSUFFICIENT_FACTS
    assert outcome.missing_facts == ["publication_year"]


# ---------------------------------------------------------------------------
# 5. Missing facts
# ---------------------------------------------------------------------------


def test_missing_death_date_returns_insufficient_facts_naming_the_field() -> None:
    """The engine names the missing fact and refuses to compute a term."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.LITERARY_WORK,
            jurisdiction=Jurisdiction.US,
            publication_year=2005,
            authorship_type=AuthorshipType.INDIVIDUAL,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.outcome is RuleOutcomeCode.INSUFFICIENT_FACTS
    assert "author_death_year" in outcome.missing_facts
    assert outcome.public_domain_year is None
    assert "author_death_year" in outcome.explanation
    assert "no assumption has been substituted" in outcome.explanation.lower()


def test_missing_work_type_is_insufficient_not_a_default() -> None:
    """Work type is never defaulted, because it selects the governing rule."""
    outcome = evaluate(RuleFacts(publication_year=1926, evaluation_year=EVAL_YEAR))
    assert outcome.outcome is RuleOutcomeCode.INSUFFICIENT_FACTS
    assert outcome.missing_facts == ["work_type"]


def test_no_facts_at_all_names_every_missing_field() -> None:
    """With nothing established, the engine still refuses to guess."""
    outcome = evaluate(
        RuleFacts(work_type=WorkType.LITERARY_WORK, evaluation_year=EVAL_YEAR)
    )
    assert outcome.outcome is RuleOutcomeCode.INSUFFICIENT_FACTS
    assert set(outcome.missing_facts) == {"publication_year", "author_death_year"}


def test_india_missing_publication_year_for_recording() -> None:
    """India film/recording terms also refuse to guess a publication year."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.SOUND_RECORDING,
            jurisdiction=Jurisdiction.IN,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.rule_id == "IN_PUBLICATION_60"
    assert outcome.outcome is RuleOutcomeCode.INSUFFICIENT_FACTS
    assert outcome.missing_facts == ["publication_year"]


# ---------------------------------------------------------------------------
# Right of publicity
# ---------------------------------------------------------------------------


def test_living_person_publicity_right_subsists() -> None:
    """A living person's publicity right subsists with no term arithmetic."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.PERSONA,
            jurisdiction=Jurisdiction.US,
            is_person_living=True,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.outcome is RuleOutcomeCode.RIGHT_SUBSISTS
    assert outcome.public_domain_year is None


def test_us_deceased_person_needs_domicile_before_any_term() -> None:
    """There is no federal US publicity right, so domicile must be established."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.PERSONA,
            jurisdiction=Jurisdiction.US,
            is_person_living=False,
            person_death_year=1980,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.outcome is RuleOutcomeCode.INSUFFICIENT_FACTS
    assert outcome.missing_facts == ["domicile_state_at_death"]
    assert "no federal" in outcome.explanation.lower()


def test_unknown_living_status_is_insufficient() -> None:
    """Living status is the gating fact for any publicity analysis."""
    outcome = evaluate(
        RuleFacts(work_type=WorkType.PERSONA, evaluation_year=EVAL_YEAR)
    )
    assert outcome.outcome is RuleOutcomeCode.INSUFFICIENT_FACTS
    assert outcome.missing_facts == ["is_person_living"]


def test_india_publicity_right_lapses_on_death() -> None:
    """Indian personality rights are not heritable."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.PERSONA,
            jurisdiction=Jurisdiction.IN,
            is_person_living=False,
            person_death_year=1987,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.outcome is RuleOutcomeCode.RIGHT_EXPIRED
    assert "not heritable" in outcome.explanation.lower()
    assert "CAVEAT" in outcome.explanation


# ---------------------------------------------------------------------------
# Trademark
# ---------------------------------------------------------------------------


def test_trademark_has_no_term_arithmetic() -> None:
    """Duration is the wrong question for a mark; the engine says so explicitly."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.TRADEMARK,
            trademark_status="LIVE / registered",
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.rule_id == "TRADEMARK_NO_EXPIRY"
    assert outcome.outcome is RuleOutcomeCode.NOT_APPLICABLE
    assert outcome.public_domain_year is None
    assert "LIVE / registered" in outcome.explanation


# ---------------------------------------------------------------------------
# Invariants
# ---------------------------------------------------------------------------


def test_every_outcome_carries_a_statutory_citation() -> None:
    """No outcome reaches the assembler without something a reviewer can check."""
    cases = [
        RuleFacts(work_type=WorkType.MUSICAL_COMPOSITION, publication_year=1926),
        RuleFacts(work_type=WorkType.SOUND_RECORDING, publication_year=1960),
        RuleFacts(work_type=WorkType.PERSONA, is_person_living=True),
        RuleFacts(work_type=WorkType.TRADEMARK, trademark_status="LIVE"),
        RuleFacts(
            work_type=WorkType.LITERARY_WORK,
            jurisdiction=Jurisdiction.IN,
            author_death_year=2001,
        ),
        RuleFacts(work_type=WorkType.LITERARY_WORK, publication_year=2005),
    ]
    for facts in cases:
        outcome = evaluate(facts.model_copy(update={"evaluation_year": EVAL_YEAR}))
        assert outcome.citation, f"{outcome.rule_id} produced no citation"
        assert outcome.explanation


def test_insufficient_facts_never_invents_a_public_domain_year() -> None:
    """An INSUFFICIENT_FACTS outcome must not carry a computed year."""
    sparse = [
        RuleFacts(work_type=WorkType.LITERARY_WORK),
        RuleFacts(work_type=WorkType.SOUND_RECORDING),
        RuleFacts(work_type=WorkType.PERSONA),
        RuleFacts(),
    ]
    for facts in sparse:
        outcome = evaluate(facts.model_copy(update={"evaluation_year": EVAL_YEAR}))
        assert outcome.outcome is RuleOutcomeCode.INSUFFICIENT_FACTS
        assert outcome.public_domain_year is None
        assert outcome.missing_facts


def test_engine_is_deterministic_across_repeated_calls() -> None:
    """Same facts in, same arithmetic out, every time."""
    facts = RuleFacts(
        work_type=WorkType.MUSICAL_COMPOSITION,
        publication_year=1926,
        evaluation_year=EVAL_YEAR,
    )
    results = [evaluate(facts) for _ in range(5)]
    assert len({r.explanation for r in results}) == 1
    assert len({r.public_domain_year for r in results}) == 1


def test_rules_engine_module_makes_no_model_calls() -> None:
    """Guard the hard rule that this module never calls an LLM.

    Inspects the parsed AST rather than the raw text, so prose in docstrings
    that merely mentions a model does not trip the check while a real import or
    attribute access would. A regression here would let a model influence a term
    calculation, which is the one thing the rules engine exists to prevent.
    """
    tree = ast.parse(inspect.getsource(rules_engine))
    forbidden = {
        "genai",
        "generativeai",
        "google.generativeai",
        "vertexai",
        "openai",
        "anthropic",
        "google.adk",
    }

    imported: set[str] = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            imported.update(alias.name.lower() for alias in node.names)
        elif isinstance(node, ast.ImportFrom) and node.module:
            imported.add(node.module.lower())

    for module in imported:
        for bad in forbidden:
            assert not module.startswith(bad), f"rules_engine imports {module!r}"

    called = {
        node.func.attr
        for node in ast.walk(tree)
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute)
    }
    for bad_call in {"generate_content", "generate_content_async", "predict", "complete"}:
        assert bad_call not in called, f"rules_engine calls {bad_call!r}"


def test_evaluation_year_defaults_to_current_year() -> None:
    """Omitting evaluation_year uses the real current year, not a frozen one."""
    outcome = evaluate(
        RuleFacts(work_type=WorkType.MUSICAL_COMPOSITION, publication_year=1926)
    )
    assert str(rules_engine.current_year()) in outcome.explanation


@pytest.mark.parametrize(
    ("pub_year", "expected_pd"),
    [(1918, 2022), (1923, 2024), (1930, 2031), (1946, 2047), (1950, 2061), (1960, 2068)],
)
def test_sound_recording_schedule_bands(pub_year: int, expected_pd: int) -> None:
    """Each band of the Classics Protection and Access Act schedule computes."""
    outcome = evaluate(
        RuleFacts(
            work_type=WorkType.SOUND_RECORDING,
            publication_year=pub_year,
            evaluation_year=EVAL_YEAR,
        )
    )
    assert outcome.public_domain_year == expected_pd
