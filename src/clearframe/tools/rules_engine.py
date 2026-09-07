"""Deterministic copyright and publicity term arithmetic.

**This module never calls an LLM.** It takes structured
:class:`~clearframe.models.RuleFacts` and returns a
:class:`~clearframe.models.RuleOutcome` produced entirely by Python branching
and arithmetic. The assembler is configured so that Gemini cannot emit a tier
without a RuleOutcome from here already in context.

If a fact required by the selected rule is absent, the engine returns
``INSUFFICIENT_FACTS`` naming exactly which fact is missing. It never guesses a
year, never infers a death date, and never picks a jurisdiction by default when
the choice would change the answer.

Term convention: ``public_domain_year`` is the first calendar year in which the
work is in the public domain, computed as ``anchor_year + term_years + 1``,
because both encoded jurisdictions run terms to the end of a calendar year.
"""

from __future__ import annotations

import functools
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional

import yaml

from clearframe.config import DEFAULT_RULES_PATH
from clearframe.models import (
    AuthorshipType,
    Jurisdiction,
    RuleFacts,
    RuleOutcome,
    RuleOutcomeCode,
    WorkType,
)

# The US federal sound-recording regime begins 15 February 1972; recordings
# published before that date run on the Classics Protection and Access Act
# schedule rather than the general term provisions.
US_SOUND_RECORDING_FEDERAL_YEAR = 1972

# Works created on or after 1 January 1978 use life-based terms in the US;
# earlier published works use the 95-year publication term.
US_1976_ACT_EFFECTIVE_YEAR = 1978

_FIXED_TERM_AUTHORSHIP = {
    AuthorshipType.CORPORATE,
    AuthorshipType.WORK_FOR_HIRE,
    AuthorshipType.ANONYMOUS,
    AuthorshipType.PSEUDONYMOUS,
}


class RulesEngineError(Exception):
    """Raised when the rules file itself is missing or malformed."""


@functools.lru_cache(maxsize=4)
def load_rules(path: Optional[Path] = None) -> dict[str, Any]:
    """Load and cache the rules YAML.

    Args:
        path: Path to ``copyright_rules.yaml``; defaults to the packaged file.

    Returns:
        The parsed rules document.

    Raises:
        RulesEngineError: If the file is missing or does not parse into a mapping.
    """
    rules_path = Path(path) if path else DEFAULT_RULES_PATH
    if not rules_path.exists():
        raise RulesEngineError(f"copyright rules file not found at {rules_path}")
    try:
        data = yaml.safe_load(rules_path.read_text(encoding="utf-8"))
    except yaml.YAMLError as exc:
        raise RulesEngineError(f"could not parse {rules_path}: {exc}") from exc
    if not isinstance(data, dict) or "rules" not in data:
        raise RulesEngineError(f"{rules_path} does not contain a 'rules' list")
    return data


def get_rule(rule_id: str, path: Optional[Path] = None) -> dict[str, Any]:
    """Return one rule definition by id.

    Args:
        rule_id: The rule identifier, e.g. ``"US_LIFE_PLUS_70"``.
        path: Optional override for the rules file location.

    Returns:
        The rule mapping.

    Raises:
        RulesEngineError: If no rule with that id exists.
    """
    for rule in load_rules(path)["rules"]:
        if rule["rule_id"] == rule_id:
            return rule
    raise RulesEngineError(f"unknown rule_id {rule_id!r}")


def current_year() -> int:
    """Return the current UTC calendar year."""
    return datetime.now(timezone.utc).year


def _insufficient(
    rule_id: str,
    missing: list[str],
    facts: RuleFacts,
    note: str = "",
) -> RuleOutcome:
    """Build an INSUFFICIENT_FACTS outcome naming the missing facts.

    Args:
        rule_id: Rule that could not be applied.
        missing: Names of the facts that were required but absent.
        facts: The facts that were supplied.
        note: Optional extra explanation appended to the message.

    Returns:
        A RuleOutcome with code ``INSUFFICIENT_FACTS``.
    """
    joined = ", ".join(missing)
    explanation = (
        f"Cannot apply {rule_id}: required fact(s) not established by sourced "
        f"evidence: {joined}. No term has been calculated and no assumption has "
        f"been substituted."
    )
    if note:
        explanation = f"{explanation} {note}"
    citation = ""
    try:
        citation = get_rule(rule_id).get("citation", "")
    except RulesEngineError:
        citation = ""
    return RuleOutcome(
        rule_id=rule_id,
        applied_facts=_facts_dict(facts),
        outcome=RuleOutcomeCode.INSUFFICIENT_FACTS,
        explanation=explanation,
        missing_facts=missing,
        citation=citation,
    )


def _facts_dict(facts: RuleFacts) -> dict[str, Any]:
    """Return the non-null facts as a plain dict for the audit record."""
    dumped = facts.model_dump(mode="json", exclude_none=True)
    dumped.pop("source_evidence_ids", None)
    return dumped


def _term_outcome(
    rule_id: str,
    facts: RuleFacts,
    anchor_year: int,
    anchor_name: str,
    term_years: int,
    evaluation_year: int,
    rule: dict[str, Any],
    prefix: str = "",
) -> RuleOutcome:
    """Compute a public-domain year from an anchor year and a term length.

    Args:
        rule_id: Rule being applied.
        facts: Facts supplied by the caller.
        anchor_year: The year the term is measured from.
        anchor_name: Human-readable name of the anchor, for the explanation.
        term_years: Term length in years.
        evaluation_year: Year the term is evaluated as of.
        rule: The rule mapping, read for citation and caveat.
        prefix: Optional sentence prepended to the explanation.

    Returns:
        A RuleOutcome of ``PUBLIC_DOMAIN`` or ``IN_COPYRIGHT``.
    """
    pd_year = anchor_year + term_years + 1
    is_pd = evaluation_year >= pd_year

    explanation = (
        f"{anchor_name} {anchor_year} + {term_years} year term = protection through "
        f"31 December {anchor_year + term_years}; the work enters the public domain "
        f"on 1 January {pd_year}. Evaluated as of {evaluation_year}: "
        f"{'the term has expired' if is_pd else 'the term has not expired'}."
    )
    if prefix:
        explanation = f"{prefix} {explanation}"
    caveat = rule.get("caveat")
    if caveat:
        explanation = f"{explanation} CAVEAT: {' '.join(caveat.split())}"

    return RuleOutcome(
        rule_id=rule_id,
        applied_facts=_facts_dict(facts),
        outcome=RuleOutcomeCode.PUBLIC_DOMAIN if is_pd else RuleOutcomeCode.IN_COPYRIGHT,
        explanation=explanation,
        public_domain_year=pd_year,
        citation=rule.get("citation", ""),
    )


# ---------------------------------------------------------------------------
# Rule branches
# ---------------------------------------------------------------------------


def _apply_us_sound_recording(facts: RuleFacts, evaluation_year: int) -> RuleOutcome:
    """Apply the US Classics Protection and Access Act schedule.

    Sound recordings carry a copyright distinct from the underlying musical
    composition and run on their own schedule. Clearing one never clears the
    other.

    Args:
        facts: Facts including ``publication_year``.
        evaluation_year: Year to evaluate the term as of.

    Returns:
        The RuleOutcome for the recording.
    """
    rule_id = "US_SOUND_RECORDING_MMA"
    rule = get_rule(rule_id)

    if facts.publication_year is None:
        return _insufficient(
            rule_id,
            ["publication_year"],
            facts,
            note="A sound recording's term is anchored to first publication.",
        )

    pub = facts.publication_year

    if pub >= US_SOUND_RECORDING_FEDERAL_YEAR:
        # Post-15 Feb 1972 recordings fall under the general federal terms.
        return _apply_us_general(
            facts, evaluation_year, forced_note="Recording published under federal copyright."
        )

    for band in rule["schedule"]:
        through = band.get("published_through")
        start = band.get("published_from")
        if start is not None and pub < start:
            continue
        if through is not None and pub > through:
            continue

        if "fixed_public_domain_year" in band:
            pd_year = int(band["fixed_public_domain_year"])
            is_pd = evaluation_year >= pd_year
            explanation = (
                f"Sound recording first published {pub}. {band['note'].strip()} "
                f"Evaluated as of {evaluation_year}: "
                f"{'the term has expired' if is_pd else 'the term has not expired'}. "
                f"CAVEAT: {' '.join(rule['caveat'].split())}"
            )
            return RuleOutcome(
                rule_id=rule_id,
                applied_facts=_facts_dict(facts),
                outcome=RuleOutcomeCode.PUBLIC_DOMAIN
                if is_pd
                else RuleOutcomeCode.IN_COPYRIGHT,
                explanation=explanation,
                public_domain_year=pd_year,
                citation=rule.get("citation", ""),
            )

        term = int(band["term_years"])
        if term == 0:
            explanation = (
                f"Sound recording first published {pub}. {band['note'].strip()} "
                f"CAVEAT: {' '.join(rule['caveat'].split())}"
            )
            return RuleOutcome(
                rule_id=rule_id,
                applied_facts=_facts_dict(facts),
                outcome=RuleOutcomeCode.PUBLIC_DOMAIN,
                explanation=explanation,
                public_domain_year=2022,
                citation=rule.get("citation", ""),
            )

        return _term_outcome(
            rule_id,
            facts,
            anchor_year=pub,
            anchor_name="Sound recording first published",
            term_years=term,
            evaluation_year=evaluation_year,
            rule=rule,
            prefix="Applying the Classics Protection and Access Act schedule:",
        )

    return _insufficient(
        rule_id,
        ["publication_year"],
        facts,
        note=f"Publication year {pub} falls outside every encoded schedule band.",
    )


def _apply_us_general(
    facts: RuleFacts, evaluation_year: int, forced_note: str = ""
) -> RuleOutcome:
    """Apply the general US term rules for non-sound-recording works.

    Selects between the 95-year publication term, life+70, and the
    corporate/anonymous 95-or-120 term based on publication year and authorship.

    Args:
        facts: Supplied facts.
        evaluation_year: Year to evaluate the term as of.
        forced_note: Optional sentence prepended to the explanation.

    Returns:
        The RuleOutcome.
    """
    pub = facts.publication_year
    created = facts.creation_year

    # Corporate / anonymous / work-for-hire: fixed term, no death date needed.
    if facts.authorship_type in _FIXED_TERM_AUTHORSHIP:
        rule_id = "US_CORPORATE_95_FROM_PUBLICATION"
        rule = get_rule(rule_id)
        if pub is None and created is None:
            return _insufficient(
                rule_id,
                ["publication_year"],
                facts,
                note=(
                    "A work-for-hire or anonymous work is anchored to publication "
                    "(95 years) or creation (120 years); neither year was supplied."
                ),
            )
        if pub is not None:
            pub_pd = pub + int(rule["term_years"]) + 1
        else:
            pub_pd = None
        if created is not None:
            created_pd = created + int(rule["alternate_term_years"]) + 1
        else:
            created_pd = None
        candidates = [y for y in (pub_pd, created_pd) if y is not None]
        pd_year = min(candidates)  # whichever expires first
        is_pd = evaluation_year >= pd_year
        parts = []
        if pub_pd is not None:
            parts.append(f"95 years from publication {pub} expires end of {pub_pd - 1}")
        if created_pd is not None:
            parts.append(f"120 years from creation {created} expires end of {created_pd - 1}")
        explanation = (
            f"{forced_note} Authorship type {facts.authorship_type.value} uses a fixed "
            f"term: {'; '.join(parts)}. The shorter term controls, so the work enters "
            f"the public domain on 1 January {pd_year}. Evaluated as of "
            f"{evaluation_year}: "
            f"{'the term has expired' if is_pd else 'the term has not expired'}."
        ).strip()
        return RuleOutcome(
            rule_id=rule_id,
            applied_facts=_facts_dict(facts),
            outcome=RuleOutcomeCode.PUBLIC_DOMAIN if is_pd else RuleOutcomeCode.IN_COPYRIGHT,
            explanation=explanation,
            public_domain_year=pd_year,
            citation=rule.get("citation", ""),
        )

    # Pre-1978 publication: 95 years from publication.
    if pub is not None and pub < US_1976_ACT_EFFECTIVE_YEAR:
        rule_id = "US_PUB_PRE_1978_95_YEARS"
        rule = get_rule(rule_id)
        return _term_outcome(
            rule_id,
            facts,
            anchor_year=pub,
            anchor_name="First published",
            term_years=int(rule["term_years"]),
            evaluation_year=evaluation_year,
            rule=rule,
            prefix=(
                f"{forced_note} Work published before {US_1976_ACT_EFFECTIVE_YEAR}, so the "
                f"95-year publication term applies rather than a life-based term."
            ).strip(),
        )

    # 1978 or later, individual author: life + 70.
    rule_id = "US_LIFE_PLUS_70"
    rule = get_rule(rule_id)
    if facts.author_death_year is None:
        missing = ["author_death_year"]
        note = (
            f"The work was created or published in {pub or created or 'an unknown year'}, "
            f"which is on or after {US_1976_ACT_EFFECTIVE_YEAR}, so the term runs from the "
            f"author's death rather than from publication."
        )
        if pub is None and created is None:
            missing = ["publication_year", "author_death_year"]
            note = (
                "Neither a publication year nor an author death year was established, "
                "so no US term can be selected."
            )
        return _insufficient(rule_id, missing, facts, note=note)

    return _term_outcome(
        rule_id,
        facts,
        anchor_year=facts.author_death_year,
        anchor_name="Author died",
        term_years=int(rule["term_years"]),
        evaluation_year=evaluation_year,
        rule=rule,
        prefix=(
            f"{forced_note} Individual authorship with a known death year, so the "
            f"life-plus-70 term applies."
        ).strip(),
    )


def _apply_india(facts: RuleFacts, evaluation_year: int) -> RuleOutcome:
    """Apply Indian Copyright Act, 1957 terms.

    Args:
        facts: Supplied facts.
        evaluation_year: Year to evaluate the term as of.

    Returns:
        The RuleOutcome.
    """
    # Sound recordings and films: 60 years from publication.
    if facts.work_type in (WorkType.SOUND_RECORDING, WorkType.FILM_AUDIOVISUAL):
        rule_id = "IN_PUBLICATION_60"
        rule = get_rule(rule_id)
        if facts.publication_year is None:
            return _insufficient(
                rule_id,
                ["publication_year"],
                facts,
                note="Indian film and sound-recording terms run from publication.",
            )
        return _term_outcome(
            rule_id,
            facts,
            anchor_year=facts.publication_year,
            anchor_name="Published",
            term_years=int(rule["term_years"]),
            evaluation_year=evaluation_year,
            rule=rule,
            prefix="India, § 26-27: term runs from the year following publication.",
        )

    # Anonymous / pseudonymous / corporate: 60 years from publication.
    if facts.authorship_type in _FIXED_TERM_AUTHORSHIP:
        rule_id = "IN_ANONYMOUS_60"
        rule = get_rule(rule_id)
        if facts.publication_year is None:
            return _insufficient(
                rule_id,
                ["publication_year"],
                facts,
                note="Indian anonymous-work terms run from first publication.",
            )
        return _term_outcome(
            rule_id,
            facts,
            anchor_year=facts.publication_year,
            anchor_name="First published",
            term_years=int(rule["term_years"]),
            evaluation_year=evaluation_year,
            rule=rule,
            prefix=f"India, § 23: authorship type {facts.authorship_type.value}.",
        )

    # Identified individual author: life + 60.
    rule_id = "IN_LIFE_PLUS_60"
    rule = get_rule(rule_id)
    if facts.author_death_year is None:
        return _insufficient(
            rule_id,
            ["author_death_year"],
            facts,
            note="Indian terms for literary, dramatic, musical and artistic works run from the author's death.",
        )
    return _term_outcome(
        rule_id,
        facts,
        anchor_year=facts.author_death_year,
        anchor_name="Author died",
        term_years=int(rule["term_years"]),
        evaluation_year=evaluation_year,
        rule=rule,
        prefix="India, § 22: term runs from the year following the author's death.",
    )


def _apply_publicity(facts: RuleFacts, evaluation_year: int) -> RuleOutcome:
    """Apply right-of-publicity duration rules.

    Args:
        facts: Facts including ``is_person_living`` and optionally
            ``person_death_year`` and a domicile in ``trademark_status``-free form.
        evaluation_year: Year to evaluate as of.

    Returns:
        The RuleOutcome.
    """
    is_india = facts.jurisdiction == Jurisdiction.IN
    rule_id = "IN_PUBLICITY_POSTMORTEM" if is_india else "US_PUBLICITY_POSTMORTEM"
    rule = get_rule(rule_id)

    if facts.is_person_living is None:
        return _insufficient(
            rule_id,
            ["is_person_living"],
            facts,
            note="Whether the individual is living determines which right applies.",
        )

    if facts.is_person_living:
        explanation = (
            "The individual is living, so the right of publicity subsists in full. "
            "No post-mortem term calculation applies. "
            f"CAVEAT: {' '.join(rule['caveat'].split())}"
            if rule.get("caveat")
            else "The individual is living, so the right of publicity subsists in full."
        )
        return RuleOutcome(
            rule_id=rule_id,
            applied_facts=_facts_dict(facts),
            outcome=RuleOutcomeCode.RIGHT_SUBSISTS,
            explanation=explanation,
            citation=rule.get("citation", ""),
        )

    if facts.person_death_year is None:
        return _insufficient(
            rule_id,
            ["person_death_year"],
            facts,
            note="A post-mortem publicity term cannot be measured without a death year.",
        )

    terms = rule.get("postmortem_terms", {})
    default_term = terms.get("default")

    if is_india:
        explanation = (
            f"India: personality rights are not heritable and lapsed on the "
            f"individual's death in {facts.person_death_year}. "
            f"CAVEAT: {' '.join(rule['caveat'].split())}"
        )
        return RuleOutcome(
            rule_id=rule_id,
            applied_facts=_facts_dict(facts),
            outcome=RuleOutcomeCode.RIGHT_EXPIRED,
            explanation=explanation,
            public_domain_year=facts.person_death_year,
            citation=rule.get("citation", ""),
        )

    if default_term is None:
        # US: no federal right; duration turns on state of domicile at death.
        span = ", ".join(
            f"{k}={v}yr" for k, v in terms.items() if k != "default" and v is not None
        )
        return _insufficient(
            rule_id,
            ["domicile_state_at_death"],
            facts,
            note=(
                f"There is no federal US right of publicity. Post-mortem duration is set "
                f"by the state of domicile at death and ranges widely ({span}), with some "
                f"states recognising no post-mortem right at all. Domicile was not "
                f"established by sourced evidence, so no term has been calculated."
            ),
        )

    pd_year = facts.person_death_year + int(default_term) + 1
    expired = evaluation_year >= pd_year
    return RuleOutcome(
        rule_id=rule_id,
        applied_facts=_facts_dict(facts),
        outcome=RuleOutcomeCode.RIGHT_EXPIRED if expired else RuleOutcomeCode.RIGHT_SUBSISTS,
        explanation=(
            f"Death year {facts.person_death_year} + {default_term} year post-mortem term "
            f"expires end of {pd_year - 1}. Evaluated as of {evaluation_year}: "
            f"{'expired' if expired else 'subsists'}."
        ),
        public_domain_year=pd_year,
        citation=rule.get("citation", ""),
    )


def _apply_trademark(facts: RuleFacts) -> RuleOutcome:
    """Return the trademark outcome, which is never a term calculation.

    Args:
        facts: Supplied facts.

    Returns:
        A ``NOT_APPLICABLE`` outcome explaining why duration is the wrong question.
    """
    rule_id = "TRADEMARK_NO_EXPIRY"
    rule = get_rule(rule_id)
    status = facts.trademark_status or "not established"
    return RuleOutcome(
        rule_id=rule_id,
        applied_facts=_facts_dict(facts),
        outcome=RuleOutcomeCode.NOT_APPLICABLE,
        explanation=(
            f"Trade mark rights do not expire on a fixed term, so no term arithmetic "
            f"applies. Registration status on the record: {status}. "
            f"CAVEAT: {' '.join(rule['caveat'].split())}"
        ),
        citation=rule.get("citation", ""),
    )


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------


def evaluate(facts: RuleFacts) -> RuleOutcome:
    """Apply the deterministic term rules to a set of facts.

    This is the only function the assembler calls, and it contains no model
    inference of any kind.

    Args:
        facts: Structured facts lifted from sourced evidence.

    Returns:
        A :class:`~clearframe.models.RuleOutcome`. When a fact required by the
        selected rule is missing, the outcome code is ``INSUFFICIENT_FACTS`` and
        ``missing_facts`` names the specific fields, rather than a term being
        guessed.
    """
    evaluation_year = facts.evaluation_year or current_year()

    if facts.work_type is None:
        return _insufficient(
            "US_LIFE_PLUS_70" if facts.jurisdiction == Jurisdiction.US else "IN_LIFE_PLUS_60",
            ["work_type"],
            facts,
            note=(
                "Work type selects the governing rule; a musical composition and a "
                "sound recording of the same title run on different terms."
            ),
        )

    if facts.work_type == WorkType.TRADEMARK:
        return _apply_trademark(facts)

    if facts.work_type == WorkType.PERSONA:
        return _apply_publicity(facts, evaluation_year)

    if facts.jurisdiction == Jurisdiction.IN:
        return _apply_india(facts, evaluation_year)

    if facts.work_type == WorkType.SOUND_RECORDING:
        return _apply_us_sound_recording(facts, evaluation_year)

    return _apply_us_general(facts, evaluation_year)


def evaluate_music_both_rights(
    composition_facts: RuleFacts, recording_facts: RuleFacts
) -> list[RuleOutcome]:
    """Evaluate a musical composition and its sound recording as separate rights.

    Conflating these two copyrights is the most common clearance error in music,
    so the pipeline always resolves both and never lets one stand in for the
    other.

    Args:
        composition_facts: Facts about the underlying musical composition.
        recording_facts: Facts about the specific sound recording.

    Returns:
        A two-element list: the composition outcome, then the recording outcome.
    """
    comp = composition_facts.model_copy(update={"work_type": WorkType.MUSICAL_COMPOSITION})
    rec = recording_facts.model_copy(update={"work_type": WorkType.SOUND_RECORDING})
    return [evaluate(comp), evaluate(rec)]
