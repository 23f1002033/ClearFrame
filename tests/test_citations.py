"""Tests for the citation validator.

This validator is the technical enforcement of ClearFrame's positioning, so
these tests are the ones that prove the product claim: an uncited claim does not
survive, and neither does a claim that gives legal advice.
"""

from __future__ import annotations

import pytest

from clearframe.audit.logger import AuditLogger
from clearframe.models import Finding, PipelineStage, RuleOutcome, RuleOutcomeCode, Tier
from clearframe.validation.citations import (
    citation_coverage,
    extract_citations,
    split_claims,
    validate_finding,
    validate_findings,
)

EV_A = "ev_aaaaaaaaaaaa"
EV_B = "ev_bbbbbbbbbbbb"
VALID = {EV_A, EV_B}


def _outcome(rule_id: str = "US_LIFE_PLUS_70") -> RuleOutcome:
    """Build a rule outcome for citation tests."""
    return RuleOutcome(
        rule_id=rule_id,
        outcome=RuleOutcomeCode.IN_COPYRIGHT,
        explanation="term computed",
        citation="17 U.S.C. § 302(a)",
    )


def _finding(rationale: str, rules: list[str] | None = None) -> Finding:
    """Build a finding carrying the given rationale and rule outcomes."""
    return Finding(
        item_id="item_1",
        tier=Tier.NEEDS_VERIFICATION,
        rationale=rationale,
        rule_outcomes=[_outcome(r) for r in (rules or ["US_LIFE_PLUS_70"])],
    )


# ---------------------------------------------------------------------------
# The core guarantee
# ---------------------------------------------------------------------------


def test_uncited_claim_is_removed() -> None:
    """The central product claim: no uncited assertion reaches the reviewer."""
    finding = _finding(
        f"The mark is registered to Acme Corp [{EV_A}]. "
        f"This is probably fine for the production."
    )
    result = validate_finding(finding, VALID)

    assert len(result.kept) == 1
    assert result.drop_count == 1
    assert "probably fine" not in finding.rationale
    assert "probably fine" in finding.dropped_claims[0]
    assert finding.validated is True


def test_claim_citing_a_hallucinated_evidence_id_is_removed() -> None:
    """A citation that resolves to nothing is worse than no citation at all."""
    finding = _finding("The registrant is Acme Corp [ev_ffffffffffff].")
    result = validate_finding(finding, VALID)

    assert result.kept == []
    assert result.drop_count == 1
    assert "do not exist in this report" in result.dropped[0][1]


def test_claim_citing_an_unknown_rule_id_is_removed() -> None:
    """A rule id not among this finding's outcomes does not ground a claim."""
    finding = _finding("The term expires in 2072 [US_MADE_UP_RULE].")
    result = validate_finding(finding, VALID)
    assert result.kept == []


def test_partly_grounded_claim_survives_with_the_bad_token_stripped() -> None:
    """A real citation carries the claim; the invented token is removed."""
    finding = _finding(
        f"Registered to Acme Corp [{EV_A}] and confirmed elsewhere [ev_ffffffffffff]."
    )
    result = validate_finding(finding, VALID)

    assert len(result.kept) == 1
    assert "ev_ffffffffffff" not in finding.rationale
    assert EV_A in finding.rationale
    assert result.kept[0].evidence_ids == [EV_A]


def test_rule_id_alone_is_sufficient_citation() -> None:
    """Deterministic rule outcomes ground a claim just as evidence does."""
    finding = _finding("The composition term expired in 2022 [US_PUB_PRE_1978_95_YEARS].",
                       rules=["US_PUB_PRE_1978_95_YEARS"])
    result = validate_finding(finding, VALID)
    assert len(result.kept) == 1
    assert result.kept[0].rule_ids == ["US_PUB_PRE_1978_95_YEARS"]


def test_every_surviving_claim_is_cited() -> None:
    """After validation, citation coverage is 1.0 by construction."""
    finding = _finding(
        f"Sourced fact one [{EV_A}]. Unsupported opinion. Sourced fact two [{EV_B}]."
    )
    validate_finding(finding, VALID)
    assert all(c.is_cited for c in finding.claims)
    assert citation_coverage([finding]) == 1.0


# ---------------------------------------------------------------------------
# The vocabulary ban
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    "sentence",
    [
        "This item is cleared for use",
        "The song is safe to use in the film",
        "You may use this mark without permission",
        "No permission is required for this depiction",
        "No license is needed here",
        "The use is legally permissible",
        "This is free to use",
        "No clearance is required",
    ],
)
def test_advice_language_is_removed_even_when_cited(sentence: str) -> None:
    """A cited legal conclusion is still a legal conclusion.

    ClearFrame reports evidence. Allowing "cleared" through because it happens to
    carry a citation would defeat the entire positioning.
    """
    finding = _finding(f"{sentence} [{EV_A}].")
    result = validate_finding(finding, VALID)

    assert result.kept == []
    assert "legal conclusion" in result.dropped[0][1]


@pytest.mark.parametrize(
    "sentence",
    [
        "The clearance review should confirm the registrant",
        "Counsel should legally review the depiction",
        "The registration is live and unclear on classes",
    ],
)
def test_legitimate_uses_of_similar_words_survive(sentence: str) -> None:
    """"clearance" and "legally" are ordinary vocabulary, not banned conclusions."""
    finding = _finding(f"{sentence} [{EV_A}].")
    result = validate_finding(finding, VALID)
    assert len(result.kept) == 1


# ---------------------------------------------------------------------------
# Claim splitting
# ---------------------------------------------------------------------------


def test_statutory_citations_do_not_split_a_claim() -> None:
    """"17 U.S.C. § 302(a)" must not be read as three sentences."""
    claims = split_claims(
        "The term runs under 17 U.S.C. § 302(a) as amended by Pub. L. 105-298. "
        "A second sentence follows."
    )
    assert len(claims) == 2
    assert "17 U.S.C. § 302(a)" in claims[0]


def test_case_names_do_not_split_a_claim() -> None:
    """"Deepa Jayakumar v. A.L. Vijay" is one citation, not a sentence break."""
    claims = split_claims("Indian courts held so in Deepa Jayakumar v. A.L. Vijay.")
    assert len(claims) == 1


def test_empty_rationale_yields_no_claims() -> None:
    """A finding with no rationale validates cleanly rather than erroring."""
    finding = _finding("")
    result = validate_finding(finding, VALID)
    assert result.kept == []
    assert result.drop_count == 0
    assert finding.validated is True


def test_citation_token_extraction_separates_evidence_from_rules() -> None:
    """Evidence ids and rule ids are distinguished by shape."""
    evidence, rules = extract_citations(
        f"Fact [{EV_A}] and term [US_LIFE_PLUS_70] and another [{EV_B}]."
    )
    assert evidence == [EV_A, EV_B]
    assert rules == ["US_LIFE_PLUS_70"]


# ---------------------------------------------------------------------------
# Audit trail
# ---------------------------------------------------------------------------


def test_every_dropped_claim_is_written_to_the_audit_trail() -> None:
    """A silent drop would hide the validator's work from the reviewer."""
    audit = AuditLogger(echo=False)
    finding = _finding(f"Sourced [{EV_A}]. Unsupported claim here. Another unsupported one.")
    validate_finding(finding, VALID, audit=audit)

    drops = [
        e
        for e in audit.entries
        if e.stage is PipelineStage.VALIDATE and "CLAIM DROPPED" in e.output_summary
    ]
    assert len(drops) == 2
    assert all(e.level == "WARNING" for e in drops)
    assert all(e.detail["claim_text"] for e in drops)


def test_dropped_claims_are_retained_on_the_finding_for_review() -> None:
    """Dropped text is kept on the record so a reviewer can see what was cut."""
    finding = _finding(f"Sourced [{EV_A}]. Unsupported claim.")
    validate_finding(finding, VALID)
    assert finding.dropped_claims == ["Unsupported claim."]


def test_batch_validation_totals_are_audited() -> None:
    """The run-level count of removed claims is reportable."""
    audit = AuditLogger(echo=False)
    findings = [
        _finding(f"Good [{EV_A}]. Bad claim."),
        _finding("All bad. Also bad."),
    ]
    validate_findings(findings, VALID, audit=audit)
    total = next(e for e in audit.entries if e.tool == "citations.validate_findings")
    assert total.detail["total_dropped"] == 3
    assert total.level == "WARNING"


def test_validation_is_idempotent() -> None:
    """Re-validating a clean finding must not erode it further."""
    finding = _finding(f"Sourced fact [{EV_A}]. Bad claim.")
    validate_finding(finding, VALID)
    first = finding.rationale
    validate_finding(finding, VALID)
    assert finding.rationale == first


# ---------------------------------------------------------------------------
# Grouped citations
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    "rationale",
    [
        f"Registered to Acme [{EV_A}, {EV_B}].",
        f"Registered to Acme [{EV_A}; {EV_B}].",
        f"Registered to Acme [{EV_A}][{EV_B}].",
        f"Registered to Acme [{EV_A} and {EV_B}].",
    ],
)
def test_grouped_citation_styles_are_all_recognised(rationale: str) -> None:
    """Models group citations several ways; none of them means "uncited".

    Requiring one identifier per bracket silently discarded well-sourced claims,
    which is the exact opposite of what this validator exists to do.
    """
    finding = _finding(rationale)
    result = validate_finding(finding, VALID)
    assert len(result.kept) == 1
    assert set(result.kept[0].evidence_ids) == {EV_A, EV_B}


def test_mixed_evidence_and_rule_citations_in_one_block() -> None:
    """A single bracket may carry both an evidence id and a rule id."""
    finding = _finding(f"The term is computed [{EV_A}, US_LIFE_PLUS_70].")
    result = validate_finding(finding, VALID)
    assert result.kept[0].evidence_ids == [EV_A]
    assert result.kept[0].rule_ids == ["US_LIFE_PLUS_70"]


def test_dangling_token_is_stripped_from_a_group_without_losing_the_rest() -> None:
    """Removing an invented id must not take a valid neighbour with it."""
    finding = _finding(f"Registered to Acme [{EV_A}, ev_ffffffffffff].")
    result = validate_finding(finding, VALID)
    assert len(result.kept) == 1
    assert "ev_ffffffffffff" not in finding.rationale
    assert EV_A in finding.rationale
    assert result.kept[0].evidence_ids == [EV_A]


def test_group_of_only_invented_ids_drops_the_claim() -> None:
    """A group that resolves to nothing is still no citation at all."""
    finding = _finding("Registered to Acme [ev_ffffffffffff, ev_eeeeeeeeeeee].")
    assert validate_finding(finding, VALID).kept == []


def test_stripping_the_only_token_leaves_no_empty_brackets() -> None:
    """The exported log must never show a bare '[]'."""
    finding = _finding(f"Sourced fact [{EV_A}]. Another fact [{EV_B}, ev_ffffffffffff].")
    validate_finding(finding, VALID)
    assert "[]" not in finding.rationale
    assert " ." not in finding.rationale


@pytest.mark.parametrize(
    ("text", "expected"),
    [
        ('The novel was authored by F. Scott Fitzgerald and published in 1925.', 1),
        ("Indian courts held so in Deepa Jayakumar v. A.L. Vijay.", 1),
        ("Written by J. R. R. Tolkien in 1937.", 1),
        ("Authored by F. Scott Fitzgerald. A second sentence follows.", 2),
        ("The term runs under 17 U.S.C. § 302(a). Another follows.", 2),
    ],
)
def test_single_initials_before_a_name_do_not_end_a_sentence(
    text: str, expected: int
) -> None:
    """"F. Scott Fitzgerald" is one name, not a sentence boundary.

    Splitting it truncated the claim to "authored by F.", which the validator
    then dropped as an uncited fragment, losing a correctly sourced statement.
    """
    assert len(split_claims(text)) == expected


def test_a_claim_naming_an_author_by_initial_survives_validation() -> None:
    """Regression: the Gatsby rationale lost its first sentence to this bug."""
    finding = _finding(
        f"The novel was authored by F. Scott Fitzgerald and first published in 1925 [{EV_A}]."
    )
    result = validate_finding(finding, VALID)
    assert len(result.kept) == 1
    assert "F. Scott Fitzgerald" in finding.rationale
    assert result.dropped == []
