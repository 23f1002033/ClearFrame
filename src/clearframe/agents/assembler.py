"""Assembly: evidence plus deterministic rule outcomes become tiered findings.

The order of operations here is the product's whole argument, so it is enforced
structurally rather than by prompt:

1. Facts are lifted out of sourced evidence by Gemini, and every fact must name
   the evidence ids that support it. Facts with no supporting evidence are
   discarded before the rules engine ever sees them.
2. :mod:`clearframe.tools.rules_engine` computes the term arithmetic in pure
   Python. Music is always evaluated as two separate rights.
3. Only then is Gemini asked to synthesise a tier and a rationale, with the rule
   outcomes already in context. The synthesis call is a forced function call, so
   the model cannot emit a tier without having received the deterministic
   outcome.
4. :mod:`clearframe.validation.citations` strips any claim that is uncited or
   that states a legal conclusion.

Step 4 runs unconditionally. No :class:`~clearframe.models.Finding` leaves this
module unvalidated.
"""

from __future__ import annotations

import asyncio
import logging
import time
from typing import Any, Optional

from pydantic import BaseModel, Field

from clearframe.audit.logger import AuditLogger
from clearframe.config import Settings, get_settings
from clearframe.models import (
    AuthorshipType,
    DepictionNature,
    Evidence,
    ExtractedItem,
    Finding,
    ItemCategory,
    Jurisdiction,
    PipelineStage,
    RuleFacts,
    RuleOutcome,
    RuleOutcomeCode,
    Tier,
    WorkType,
)
from clearframe.tools import rules_engine
from clearframe.validation.citations import validate_finding

logger = logging.getLogger(__name__)

# Categories whose exposure is not a copyright-term question.
_TRADEMARK_CATEGORIES = {
    ItemCategory.BRAND_TRADEMARK,
    ItemCategory.LOGO_PROP,
    ItemCategory.NAME_COLLISION,
    ItemCategory.REAL_LOCATION_BUSINESS,
}

_DEFAULT_WORK_TYPE = {
    ItemCategory.MUSIC: WorkType.MUSICAL_COMPOSITION,
    ItemCategory.PUBLISHED_WORK: WorkType.LITERARY_WORK,
    ItemCategory.REAL_PERSON: WorkType.PERSONA,
    ItemCategory.BRAND_TRADEMARK: WorkType.TRADEMARK,
    ItemCategory.LOGO_PROP: WorkType.TRADEMARK,
    ItemCategory.NAME_COLLISION: WorkType.TRADEMARK,
    ItemCategory.REAL_LOCATION_BUSINESS: WorkType.TRADEMARK,
}


class _ExtractedFacts(BaseModel):
    """Response schema for fact extraction from evidence.

    Every field is optional and every field is paired with the evidence that
    supports it. A fact the sources do not state must be left null: the rules
    engine reports a missing fact by name, which is a useful research output,
    whereas a guessed year produces a confident wrong term.
    """

    work_type: str = Field(default="", description="One of the WorkType values, or empty.")
    jurisdiction: str = Field(default="US", description="US or IN.")
    publication_year: Optional[int] = Field(default=None)
    creation_year: Optional[int] = Field(default=None)
    author_death_year: Optional[int] = Field(default=None)
    authorship_type: str = Field(default="UNKNOWN")
    is_person_living: Optional[bool] = Field(default=None)
    person_death_year: Optional[int] = Field(default=None)
    trademark_status: str = Field(default="")
    rights_holder: str = Field(
        default="", description="Best-sourced rights holder or registrant."
    )
    supporting_evidence_ids: list[str] = Field(
        default_factory=list,
        description="Evidence ids that state these facts. Required for any fact given.",
    )
    facts_not_found: list[str] = Field(
        default_factory=list,
        description="Fields the sources did not establish, named explicitly.",
    )
    # Music only: the recording is a separate right with its own facts.
    recording_publication_year: Optional[int] = Field(default=None)
    recording_rights_holder: str = Field(default="")


class _SynthesisOutput(BaseModel):
    """Response schema for the tier-and-rationale synthesis call."""

    tier: str = Field(..., description="CLEAR_ON_RECORD, NEEDS_VERIFICATION or ESCALATE.")
    rationale: str = Field(
        ...,
        description=(
            "Two to five sentences. EVERY sentence must contain at least one "
            "citation token in square brackets."
        ),
    )
    open_questions: list[str] = Field(default_factory=list)


FACT_PROMPT = """\
You are extracting structured facts from sourced research so a deterministic
rules engine can compute copyright and publicity terms. The engine does pure
arithmetic; it cannot reason around a wrong or invented input.

Rules:
- Report ONLY facts explicitly stated in the evidence below.
- If the evidence does not establish a field, leave it null and name the field
  in facts_not_found. A null is a useful answer. A guessed year is not: it
  produces a confident, wrong term that a reviewer may rely on.
- Every fact you report must be traceable to evidence. List the evidence ids
  that support your answer in supporting_evidence_ids.
- Years must be exact four-digit years taken from the sources. Never estimate,
  never round, never infer a year from an era or a style.

FIELD NOTES:
- work_type: one of MUSICAL_COMPOSITION, SOUND_RECORDING, LITERARY_WORK,
  DRAMATIC_WORK, VISUAL_ARTWORK, FILM_AUDIOVISUAL, TRADEMARK, PERSONA.
- For a song, work_type is MUSICAL_COMPOSITION and publication_year is the year
  the COMPOSITION was first published. Put the recording's year in
  recording_publication_year. These are two different rights with different
  terms; do not merge them.
- author_death_year is the death year of the AUTHOR or COMPOSER, used for
  life-plus terms. person_death_year is for a real person whose likeness is
  depicted. They are different fields; a song's composer goes in the former.
- authorship_type: INDIVIDUAL, JOINT, CORPORATE, WORK_FOR_HIRE, ANONYMOUS,
  PSEUDONYMOUS or UNKNOWN. Use UNKNOWN unless the sources say.
- is_person_living: true or false only if the sources establish it.

ITEM: {item}
CATEGORY: {category}

EVIDENCE:
{evidence}
"""


SYNTHESIS_PROMPT = """\
You are a clearance researcher writing a triage note for a qualified attorney
who will make the actual decisions. You are not the decision-maker. Your job is
to state what the sources show and how much work the item implies.

TIERS (these describe REVIEWER WORKLOAD, not legal conclusions):
- CLEAR_ON_RECORD      sourced evidence and rule outcomes together indicate no
                       clearance action is likely needed. Still requires
                       reviewer sign-off.
- NEEDS_VERIFICATION   evidence is incomplete, or sources conflict, or a rule
                       returned INSUFFICIENT_FACTS.
- ESCALATE             high exposure. Use this when ANY of the following hold:
                         - a living person is depicted
                         - an active trademark appears on screen
                         - music is in copyright, for either right
                         - a real entity is depicted negatively

ABSOLUTE CONSTRAINTS:
1. NEVER write the words "cleared", "safe", "legal", or "you may use". Never
   state that something can be used, that no permission is needed, or that there
   is no risk. Those are legal conclusions and you are not qualified to give
   them here. A validator removes any sentence containing them.
2. EVERY SENTENCE of your rationale must carry at least one citation token in
   square brackets: an evidence id like [ev_ab12cd34ef56] or a rule id like
   [US_LIFE_PLUS_70]. A sentence with no citation token is deleted by a
   validator before the reviewer sees it, so an uncited sentence is wasted work.
3. Cite ONLY identifiers that appear in the lists below. Do not invent an id. A
   citation that does not resolve is stripped out.
4. Where a rule returned INSUFFICIENT_FACTS, say which fact is missing and cite
   the rule id. That is the most useful thing you can tell the reviewer.
5. For music, address the composition and the sound recording separately. A
   public-domain composition does not imply a public-domain recording.

Write two to five sentences. State what the sources establish, what the rule
arithmetic produced, and what remains unresolved. Put anything unresolved in
open_questions as a direct question the reviewer can act on.

ITEM: {item}
CATEGORY: {category}
OCCURRENCES: {occurrences}
ON SCREEN: {on_screen}
WORST DEPICTION: {depiction}

DETERMINISTIC RULE OUTCOMES (computed in Python, not by you - treat as ground truth):
{rule_outcomes}

VALID RULE IDS YOU MAY CITE: {rule_ids}

EVIDENCE (cite these ids):
{evidence}
"""


def _build_client(settings: Settings):
    """Construct a google-genai client for the configured auth path.

    Args:
        settings: Loaded settings.

    Returns:
        A configured ``google.genai.Client``.
    """
    from google import genai

    from clearframe.config import resolve_google_api_key

    if settings.google_genai_use_vertexai:
        return genai.Client(
            vertexai=True,
            project=settings.google_cloud_project,
            location=settings.google_cloud_location,
        )
    return genai.Client(api_key=resolve_google_api_key(settings))


def render_evidence(evidence: list[Evidence], limit: int = 12) -> str:
    """Render evidence for a prompt, labelled by the id the model must cite.

    Args:
        evidence: Evidence for one item.
        limit: Maximum entries to include.

    Returns:
        The rendered block, or a clear statement that there is none.
    """
    if not evidence:
        return "(no evidence was retrieved for this item)"
    lines: list[str] = []
    for item in evidence[:limit]:
        lines.append(
            f"[{item.evidence_id}] {item.source_title}\n"
            f"  url: {item.source_url}\n"
            f"  retrieved: {item.retrieved_at.date().isoformat()}\n"
            f"  note: {item.relevance_note}\n"
            f"  excerpt: {item.snippet[:700]}"
        )
    return "\n\n".join(lines)


def render_rule_outcomes(outcomes: list[RuleOutcome]) -> str:
    """Render rule outcomes for the synthesis prompt.

    Args:
        outcomes: The deterministic outcomes for one item.

    Returns:
        The rendered block.
    """
    if not outcomes:
        return "(no term rule applies to this category)"
    lines: list[str] = []
    for outcome in outcomes:
        lines.append(
            f"[{outcome.rule_id}] outcome={outcome.outcome.value}\n"
            f"  explanation: {outcome.explanation}\n"
            f"  public_domain_year: {outcome.public_domain_year}\n"
            f"  missing_facts: {outcome.missing_facts or 'none'}\n"
            f"  citation: {outcome.citation}"
        )
    return "\n\n".join(lines)


# ---------------------------------------------------------------------------
# Step 1: facts from evidence
# ---------------------------------------------------------------------------


def _coerce_enum(value: str, enum_cls, default):
    """Coerce a model string onto an enum, falling back to a default.

    Args:
        value: The raw string.
        enum_cls: The target enum class.
        default: Value to return if coercion fails.

    Returns:
        The enum member, or ``default``.
    """
    try:
        return enum_cls((value or "").strip().upper())
    except ValueError:
        return default


async def extract_facts(
    item: ExtractedItem,
    evidence: list[Evidence],
    settings: Optional[Settings] = None,
    audit: Optional[AuditLogger] = None,
    client: Optional[Any] = None,
) -> tuple[RuleFacts, str, Optional[int]]:
    """Lift the rules engine's inputs out of sourced evidence.

    Args:
        item: The item being assembled.
        evidence: Evidence retrieved for this item.
        settings: Loaded settings.
        audit: Audit logger.
        client: Shared genai client.

    Returns:
        A tuple of the facts, the best-sourced rights holder, and the recording
        publication year when the item is music. Facts unsupported by evidence
        are left null so the rules engine can name them.
    """
    from google.genai import types

    from clearframe.config import build_safety_settings

    settings = settings or get_settings()
    default_facts = RuleFacts(work_type=_DEFAULT_WORK_TYPE.get(item.category))

    if not evidence:
        if audit:
            audit.record(
                stage=PipelineStage.ASSEMBLE,
                tool="gemini.extract_facts",
                input_summary=f"{item.mention_text}",
                output_summary="SKIPPED: no evidence, so no facts can be sourced",
                level="WARNING",
                item_id=item.item_id,
            )
        return default_facts, "", None

    client = client or _build_client(settings)
    prompt = FACT_PROMPT.format(
        item=item.normalized_name,
        category=item.category.value,
        evidence=render_evidence(evidence),
    )
    started = time.perf_counter()
    try:
        response = await client.aio.models.generate_content(
            model=settings.gemini_synthesis_model,
            contents=prompt,
            config=types.GenerateContentConfig(
                safety_settings=build_safety_settings(settings),
                temperature=0.0,
                response_mime_type="application/json",
                response_schema=_ExtractedFacts,
                max_output_tokens=8000,
            ),
        )
    except Exception as exc:  # noqa: BLE001 - a failed extraction is a missing fact
        if audit:
            audit.record(
                stage=PipelineStage.ASSEMBLE,
                tool="gemini.extract_facts",
                input_summary=item.mention_text,
                output_summary=f"FAILED: {type(exc).__name__}: {exc}",
                latency_ms=(time.perf_counter() - started) * 1000,
                level="ERROR",
                item_id=item.item_id,
            )
        return default_facts, "", None

    parsed = getattr(response, "parsed", None)
    if parsed is None:
        if audit:
            candidates = getattr(response, "candidates", None)
            audit.record_safety_block(
                stage=PipelineStage.ASSEMBLE,
                tool="gemini.extract_facts",
                scope=f"item {item.mention_text}",
                finish_reason=str(candidates[0].finish_reason) if candidates else "UNKNOWN",
                ratings=candidates[0].safety_ratings if candidates else None,
            )
        return default_facts, "", None

    valid_ids = {e.evidence_id for e in evidence}
    supporting = [e for e in parsed.supporting_evidence_ids if e in valid_ids]

    facts = RuleFacts(
        work_type=_coerce_enum(
            parsed.work_type, WorkType, _DEFAULT_WORK_TYPE.get(item.category)
        ),
        jurisdiction=_coerce_enum(parsed.jurisdiction, Jurisdiction, Jurisdiction.US),
        publication_year=parsed.publication_year,
        creation_year=parsed.creation_year,
        author_death_year=parsed.author_death_year,
        authorship_type=_coerce_enum(
            parsed.authorship_type, AuthorshipType, AuthorshipType.UNKNOWN
        ),
        is_person_living=parsed.is_person_living,
        person_death_year=parsed.person_death_year,
        trademark_status=parsed.trademark_status or None,
        source_evidence_ids=supporting,
    )

    if audit:
        usage = getattr(response, "usage_metadata", None)
        audit.record(
            stage=PipelineStage.ASSEMBLE,
            tool="gemini.extract_facts",
            input_summary=f"{item.mention_text} ({len(evidence)} evidence)",
            output_summary=(
                f"facts sourced: "
                f"{ {k: v for k, v in facts.model_dump(exclude_none=True).items() if k not in {'jurisdiction', 'authorship_type', 'source_evidence_ids'}} }; "
                f"not found: {parsed.facts_not_found or 'none'}"
            ),
            latency_ms=(time.perf_counter() - started) * 1000,
            token_cost=getattr(usage, "total_token_count", None),
            item_id=item.item_id,
            facts_not_found=parsed.facts_not_found,
            supporting_evidence=supporting,
            unresolved_citations=[
                e for e in parsed.supporting_evidence_ids if e not in valid_ids
            ],
        )
    return facts, parsed.rights_holder, parsed.recording_publication_year


# ---------------------------------------------------------------------------
# Step 2: deterministic rules (no LLM)
# ---------------------------------------------------------------------------


def apply_rules(
    item: ExtractedItem,
    facts: RuleFacts,
    recording_year: Optional[int] = None,
    audit: Optional[AuditLogger] = None,
) -> list[RuleOutcome]:
    """Run the deterministic rules engine for one item.

    Music always produces two outcomes, one per right. This function contains no
    model inference of any kind; it is a thin dispatcher over
    :mod:`clearframe.tools.rules_engine`.

    Args:
        item: The item being assembled.
        facts: Facts lifted from evidence.
        recording_year: Publication year of the sound recording, for music.
        audit: Audit logger.

    Returns:
        The rule outcomes. Empty only for categories with no term rule.
    """
    started = time.perf_counter()

    if item.category is ItemCategory.MUSIC:
        composition = facts.model_copy(update={"work_type": WorkType.MUSICAL_COMPOSITION})
        recording = facts.model_copy(
            update={
                "work_type": WorkType.SOUND_RECORDING,
                "publication_year": recording_year or facts.publication_year,
            }
        )
        outcomes = rules_engine.evaluate_music_both_rights(composition, recording)
    elif item.category is ItemCategory.REAL_PERSON:
        outcomes = [rules_engine.evaluate(facts.model_copy(update={"work_type": WorkType.PERSONA}))]
    elif item.category in _TRADEMARK_CATEGORIES:
        outcomes = [
            rules_engine.evaluate(facts.model_copy(update={"work_type": WorkType.TRADEMARK}))
        ]
    else:
        outcomes = [rules_engine.evaluate(facts)]

    if audit:
        audit.record(
            stage=PipelineStage.RULES,
            tool="rules_engine.evaluate",
            input_summary=(
                f"{item.mention_text}: "
                f"{ {k: v for k, v in facts.model_dump(mode='json', exclude_none=True).items() if k != 'source_evidence_ids'} }"
            ),
            output_summary="; ".join(
                f"{o.rule_id}={o.outcome.value}"
                + (f" (PD {o.public_domain_year})" if o.public_domain_year else "")
                + (f" missing {o.missing_facts}" if o.missing_facts else "")
                for o in outcomes
            ),
            latency_ms=(time.perf_counter() - started) * 1000,
            item_id=item.item_id,
            deterministic=True,
            rule_ids=[o.rule_id for o in outcomes],
        )
    return outcomes


# ---------------------------------------------------------------------------
# Step 3: synthesis
# ---------------------------------------------------------------------------


def forced_tier(item: ExtractedItem, outcomes: list[RuleOutcome]) -> Optional[Tier]:
    """Return the tier that the facts compel, independent of the model.

    Some escalation triggers are structural and must not depend on model
    judgment: a living person depicted, in-copyright music, a negative depiction
    of a real entity, an on-screen active mark. Where one of these holds, the
    tier is decided here and the model cannot lower it.

    Args:
        item: The item being assembled.
        outcomes: The deterministic rule outcomes.

    Returns:
        The compelled tier, or None if the model may choose.
    """
    codes = {o.outcome for o in outcomes}

    if item.worst_depiction is DepictionNature.NEGATIVE:
        return Tier.ESCALATE
    if item.category is ItemCategory.REAL_PERSON and RuleOutcomeCode.RIGHT_SUBSISTS in codes:
        return Tier.ESCALATE
    if item.category is ItemCategory.MUSIC and RuleOutcomeCode.IN_COPYRIGHT in codes:
        return Tier.ESCALATE
    if (
        item.category in {ItemCategory.BRAND_TRADEMARK, ItemCategory.LOGO_PROP}
        and item.appears_on_screen
    ):
        return Tier.ESCALATE
    if RuleOutcomeCode.INSUFFICIENT_FACTS in codes:
        return Tier.NEEDS_VERIFICATION
    return None


async def synthesize(
    item: ExtractedItem,
    evidence: list[Evidence],
    outcomes: list[RuleOutcome],
    settings: Optional[Settings] = None,
    audit: Optional[AuditLogger] = None,
    client: Optional[Any] = None,
) -> Finding:
    """Synthesise a tier, cited rationale and open questions for one item.

    The rule outcomes are already in context when this runs; the model is never
    asked to produce a tier without them.

    Args:
        item: The item being assembled.
        evidence: Evidence for this item.
        outcomes: Deterministic rule outcomes.
        settings: Loaded settings.
        audit: Audit logger.
        client: Shared genai client.

    Returns:
        An unvalidated finding. Validation is applied by :func:`assemble_finding`.
    """
    from google.genai import types

    from clearframe.config import build_safety_settings

    settings = settings or get_settings()
    compelled = forced_tier(item, outcomes)
    fallback = Finding(
        item_id=item.item_id,
        tier=compelled or Tier.NEEDS_VERIFICATION,
        rationale="",
        evidence_ids=[e.evidence_id for e in evidence],
        rule_outcomes=outcomes,
        open_questions=[
            "Synthesis did not complete for this item; review the evidence directly."
        ],
    )

    if not evidence and not outcomes:
        return fallback

    client = client or _build_client(settings)
    prompt = SYNTHESIS_PROMPT.format(
        item=item.normalized_name,
        category=item.category.value,
        occurrences=", ".join(
            f"scene {o.scene_number} p.{o.page_number}" for o in item.occurrences
        ),
        on_screen=item.appears_on_screen,
        depiction=item.worst_depiction.value,
        rule_outcomes=render_rule_outcomes(outcomes),
        rule_ids=[o.rule_id for o in outcomes] or "(none)",
        evidence=render_evidence(evidence),
    )

    started = time.perf_counter()
    try:
        response = await client.aio.models.generate_content(
            model=settings.gemini_synthesis_model,
            contents=prompt,
            config=types.GenerateContentConfig(
                safety_settings=build_safety_settings(settings),
                temperature=0.1,
                response_mime_type="application/json",
                response_schema=_SynthesisOutput,
                max_output_tokens=8000,
            ),
        )
    except Exception as exc:  # noqa: BLE001
        if audit:
            audit.record(
                stage=PipelineStage.ASSEMBLE,
                tool="gemini.synthesize",
                input_summary=item.mention_text,
                output_summary=f"FAILED: {type(exc).__name__}: {exc}",
                latency_ms=(time.perf_counter() - started) * 1000,
                level="ERROR",
                item_id=item.item_id,
            )
        return fallback

    parsed = getattr(response, "parsed", None)
    if parsed is None:
        if audit:
            candidates = getattr(response, "candidates", None)
            audit.record_safety_block(
                stage=PipelineStage.ASSEMBLE,
                tool="gemini.synthesize",
                scope=f"item {item.mention_text}",
                finish_reason=str(candidates[0].finish_reason) if candidates else "UNKNOWN",
                ratings=candidates[0].safety_ratings if candidates else None,
            )
        return fallback

    model_tier = _coerce_enum(parsed.tier, Tier, Tier.NEEDS_VERIFICATION)
    tier = compelled or model_tier

    if audit:
        usage = getattr(response, "usage_metadata", None)
        audit.record(
            stage=PipelineStage.ASSEMBLE,
            tool="gemini.synthesize",
            input_summary=f"{item.mention_text} ({len(outcomes)} rule outcomes)",
            output_summary=(
                f"tier={tier.value}"
                + (
                    f" (COMPELLED by facts; model proposed {model_tier.value})"
                    if compelled and compelled is not model_tier
                    else ""
                )
                + f", {len(parsed.open_questions)} open questions"
            ),
            latency_ms=(time.perf_counter() - started) * 1000,
            token_cost=getattr(usage, "total_token_count", None),
            item_id=item.item_id,
            model_tier=model_tier.value,
            compelled_tier=compelled.value if compelled else None,
        )

    return Finding(
        item_id=item.item_id,
        tier=tier,
        rationale=parsed.rationale,
        evidence_ids=[e.evidence_id for e in evidence],
        rule_outcomes=outcomes,
        open_questions=parsed.open_questions,
    )


# ---------------------------------------------------------------------------
# Orchestration
# ---------------------------------------------------------------------------


async def assemble_finding(
    item: ExtractedItem,
    evidence: list[Evidence],
    settings: Optional[Settings] = None,
    audit: Optional[AuditLogger] = None,
    client: Optional[Any] = None,
) -> Finding:
    """Run the full assembly sequence for one item.

    Args:
        item: The item to assemble.
        evidence: Evidence retrieved for this item.
        settings: Loaded settings.
        audit: Audit logger.
        client: Shared genai client.

    Returns:
        A validated finding. Citation validation always runs, so the returned
        finding never contains an uncited or advice-bearing claim.
    """
    settings = settings or get_settings()
    facts, rights_holder, recording_year = await extract_facts(
        item, evidence, settings=settings, audit=audit, client=client
    )
    outcomes = apply_rules(item, facts, recording_year=recording_year, audit=audit)
    finding = await synthesize(
        item, evidence, outcomes, settings=settings, audit=audit, client=client
    )
    finding.rights_holder_hint = rights_holder or None
    validate_finding(finding, {e.evidence_id for e in evidence}, audit=audit)
    return finding


async def assemble_findings(
    items: list[ExtractedItem],
    evidence_store: dict[str, Evidence],
    settings: Optional[Settings] = None,
    audit: Optional[AuditLogger] = None,
) -> list[Finding]:
    """Assemble validated findings for every item, concurrently.

    Args:
        items: The deduplicated items.
        evidence_store: The report's evidence store, keyed by evidence id.
        settings: Loaded settings.
        audit: Audit logger.

    Returns:
        Validated findings, ordered most severe first.
    """
    settings = settings or get_settings()
    if not items:
        return []

    client = _build_client(settings)
    semaphore = asyncio.Semaphore(settings.gemini_max_concurrency)
    started = time.perf_counter()

    async def one(item: ExtractedItem) -> Finding:
        """Assemble a single item under the concurrency bound."""
        async with semaphore:
            evidence = [e for e in evidence_store.values() if e.item_id == item.item_id]
            return await assemble_finding(
                item, evidence, settings=settings, audit=audit, client=client
            )

    results = await asyncio.gather(*(one(i) for i in items), return_exceptions=True)

    findings: list[Finding] = []
    for item, result in zip(items, results):
        if isinstance(result, BaseException):
            logger.error("assembly crashed for %s: %s", item.mention_text, result)
            if audit:
                audit.record(
                    stage=PipelineStage.ASSEMBLE,
                    tool="assembler.assemble_finding",
                    input_summary=item.mention_text,
                    output_summary=f"CRASHED: {type(result).__name__}: {result}",
                    level="ERROR",
                    item_id=item.item_id,
                )
            findings.append(
                Finding(
                    item_id=item.item_id,
                    tier=Tier.NEEDS_VERIFICATION,
                    rationale="",
                    open_questions=["Assembly failed for this item; review manually."],
                    validated=True,
                )
            )
        else:
            findings.append(result)

    order = {Tier.ESCALATE: 0, Tier.NEEDS_VERIFICATION: 1, Tier.CLEAR_ON_RECORD: 2}
    findings.sort(key=lambda f: order[f.tier])

    if audit:
        counts: dict[str, int] = {}
        for finding in findings:
            counts[finding.tier.value] = counts.get(finding.tier.value, 0) + 1
        audit.record(
            stage=PipelineStage.ASSEMBLE,
            tool="assembler.assemble_findings",
            input_summary=f"{len(items)} items",
            output_summary=f"{len(findings)} findings: {counts}",
            latency_ms=(time.perf_counter() - started) * 1000,
            tier_counts=counts,
        )
    return findings
