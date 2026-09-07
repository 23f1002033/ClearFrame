"""Pydantic schemas for the ClearFrame clearance research pipeline.

Every value that crosses a module boundary in ClearFrame is one of these models.
No bare dicts are passed between the ingest, extraction, research, rules,
assembly, validation, or export stages.

Positioning constraint encoded here: there is no ``CLEARED`` tier and no
``approved`` flag anywhere in this file. :class:`Tier` describes *reviewer
workload*, not a legal conclusion, and :class:`ReviewState` decisions can only
be set by a human reviewer through the API.
"""

from __future__ import annotations

import hashlib
import re
import uuid
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator


def utcnow() -> datetime:
    """Return the current time as a timezone-aware UTC datetime."""
    return datetime.now(timezone.utc)


def _new_id(prefix: str) -> str:
    """Return a short unique identifier carrying a human-readable prefix."""
    return f"{prefix}_{uuid.uuid4().hex[:12]}"


# ---------------------------------------------------------------------------
# Enumerations
# ---------------------------------------------------------------------------


class ItemCategory(str, Enum):
    """The kind of clearance exposure a mention creates.

    The category drives the research brief in :mod:`clearframe.agents.researcher`
    and the fact extraction in :mod:`clearframe.agents.assembler`, so it is a
    routing decision as much as a label.
    """

    BRAND_TRADEMARK = "BRAND_TRADEMARK"
    MUSIC = "MUSIC"
    REAL_PERSON = "REAL_PERSON"
    REAL_LOCATION_BUSINESS = "REAL_LOCATION_BUSINESS"
    PUBLISHED_WORK = "PUBLISHED_WORK"
    NAME_COLLISION = "NAME_COLLISION"
    LOGO_PROP = "LOGO_PROP"


class DepictionNature(str, Enum):
    """How the script portrays the item.

    Negative depiction of a real entity carries materially different exposure
    (disparagement, defamation, trade libel) than neutral background use, so
    this is captured at extraction time and forced to ``ESCALATE`` at assembly.
    """

    POSITIVE = "POSITIVE"
    NEUTRAL = "NEUTRAL"
    NEGATIVE = "NEGATIVE"


class Tier(str, Enum):
    """Triage tier describing the reviewer workload an item implies.

    These are explicitly *not* legal conclusions:

    ``CLEAR_ON_RECORD``
        Sourced evidence and deterministic rule outcomes together indicate no
        clearance action is likely needed. Still requires reviewer sign-off.
    ``NEEDS_VERIFICATION``
        Evidence is incomplete, or sources conflict.
    ``ESCALATE``
        High-exposure item requiring qualified counsel.
    """

    CLEAR_ON_RECORD = "CLEAR_ON_RECORD"
    NEEDS_VERIFICATION = "NEEDS_VERIFICATION"
    ESCALATE = "ESCALATE"


class ReviewDecision(str, Enum):
    """A human reviewer's decision on a finding.

    Only ever set through ``PATCH /api/reports/{id}/items/{item_id}``. The
    pipeline itself always leaves items at ``PENDING``.
    """

    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    REJECTED = "REJECTED"
    ESCALATED = "ESCALATED"


class ReportStatus(str, Enum):
    """Lifecycle state of a clearance report."""

    DRAFT = "DRAFT"
    SIGNED_OFF = "SIGNED_OFF"


class WorkType(str, Enum):
    """Work types the deterministic rules engine knows how to reason about.

    ``MUSICAL_COMPOSITION`` and ``SOUND_RECORDING`` are deliberately distinct:
    conflating them is the single most common clearance mistake, and the rules
    engine refuses to apply composition terms to a recording.
    """

    MUSICAL_COMPOSITION = "MUSICAL_COMPOSITION"
    SOUND_RECORDING = "SOUND_RECORDING"
    LITERARY_WORK = "LITERARY_WORK"
    DRAMATIC_WORK = "DRAMATIC_WORK"
    VISUAL_ARTWORK = "VISUAL_ARTWORK"
    FILM_AUDIOVISUAL = "FILM_AUDIOVISUAL"
    TRADEMARK = "TRADEMARK"
    PERSONA = "PERSONA"


class AuthorshipType(str, Enum):
    """Authorship basis, which selects between life-based and fixed terms."""

    INDIVIDUAL = "INDIVIDUAL"
    JOINT = "JOINT"
    CORPORATE = "CORPORATE"
    WORK_FOR_HIRE = "WORK_FOR_HIRE"
    ANONYMOUS = "ANONYMOUS"
    PSEUDONYMOUS = "PSEUDONYMOUS"
    UNKNOWN = "UNKNOWN"


class Jurisdiction(str, Enum):
    """Jurisdictions whose copyright and publicity terms are encoded."""

    US = "US"
    IN = "IN"


class RuleOutcomeCode(str, Enum):
    """Result of applying a deterministic rule.

    ``INSUFFICIENT_FACTS`` is a first-class outcome, not an error: the engine
    names exactly which fact is missing rather than guessing a term.
    """

    PUBLIC_DOMAIN = "PUBLIC_DOMAIN"
    IN_COPYRIGHT = "IN_COPYRIGHT"
    PUBLIC_DOMAIN_IN_TERM_YEAR = "PUBLIC_DOMAIN_IN_TERM_YEAR"
    RIGHT_SUBSISTS = "RIGHT_SUBSISTS"
    RIGHT_EXPIRED = "RIGHT_EXPIRED"
    NOT_APPLICABLE = "NOT_APPLICABLE"
    INSUFFICIENT_FACTS = "INSUFFICIENT_FACTS"


class PipelineStage(str, Enum):
    """Pipeline stages recorded in the audit trail."""

    INGEST = "INGEST"
    EXTRACT = "EXTRACT"
    DEDUPLICATE = "DEDUPLICATE"
    RESEARCH = "RESEARCH"
    RULES = "RULES"
    ASSEMBLE = "ASSEMBLE"
    VALIDATE = "VALIDATE"
    EXPORT = "EXPORT"
    REVIEW = "REVIEW"
    ORCHESTRATOR = "ORCHESTRATOR"


# ---------------------------------------------------------------------------
# Ingest
# ---------------------------------------------------------------------------


class Scene(BaseModel):
    """One screenplay scene with a real, citable page number.

    ``page_number`` must correspond to the page of the physical script, because
    counsel reads the finding and then goes and finds the line.
    """

    model_config = ConfigDict(extra="forbid")

    scene_number: int = Field(..., ge=1, description="1-based sequential scene index.")
    page_number: int = Field(..., ge=1, description="Page in the source script.")
    heading: str = Field(..., description="Slugline, e.g. 'INT. DINER - NIGHT'.")
    action_text: str = Field(default="", description="Concatenated action lines.")
    dialogue_text: str = Field(default="", description="Concatenated dialogue lines.")

    @property
    def full_text(self) -> str:
        """Return the scene rendered as a single searchable block of text."""
        return f"{self.heading}\n{self.action_text}\n{self.dialogue_text}".strip()


class ScriptDocument(BaseModel):
    """A parsed screenplay: ordered scenes plus provenance about the source."""

    model_config = ConfigDict(extra="forbid")

    script_name: str
    source_filename: str
    page_count: int = Field(..., ge=0)
    scenes: list[Scene] = Field(default_factory=list)
    parsed_at: datetime = Field(default_factory=utcnow)
    parser_notes: list[str] = Field(
        default_factory=list,
        description="Anomalies worth surfacing, e.g. pages with no detectable heading.",
    )


# ---------------------------------------------------------------------------
# Extraction
# ---------------------------------------------------------------------------


class Occurrence(BaseModel):
    """A single place in the script where an item is mentioned."""

    model_config = ConfigDict(extra="forbid")

    scene_number: int = Field(..., ge=1)
    page_number: int = Field(..., ge=1)
    context_snippet: str = Field(
        ...,
        description="Verbatim surrounding text so a reviewer can judge without the script.",
    )
    on_screen: bool = Field(
        ...,
        description="True if visually depicted; False if spoken in dialogue only.",
    )
    depiction_nature: DepictionNature = DepictionNature.NEUTRAL


class ExtractedItem(BaseModel):
    """A distinct clearable entity, carrying every occurrence found for it.

    One ``ExtractedItem`` maps to exactly one research fan-out call, so
    deduplication into this model is the pipeline's main cost control.
    """

    model_config = ConfigDict(extra="forbid")

    item_id: str = Field(default_factory=lambda: _new_id("item"))
    mention_text: str = Field(
        ..., description="Verbatim text as it first appears in the script, never a paraphrase."
    )
    category: ItemCategory
    occurrences: list[Occurrence] = Field(default_factory=list)
    normalized_name: str = Field(
        ..., description="Canonical form used as the deduplication key."
    )
    variants: list[str] = Field(
        default_factory=list,
        description="Other surface forms merged into this item during deduplication.",
    )
    extraction_notes: Optional[str] = None

    @property
    def occurrence_count(self) -> int:
        """Return how many times the item appears across the script."""
        return len(self.occurrences)

    @property
    def appears_on_screen(self) -> bool:
        """Return True if the item is visually depicted in at least one scene."""
        return any(o.on_screen for o in self.occurrences)

    @property
    def worst_depiction(self) -> DepictionNature:
        """Return the most adverse depiction across all occurrences."""
        natures = {o.depiction_nature for o in self.occurrences}
        if DepictionNature.NEGATIVE in natures:
            return DepictionNature.NEGATIVE
        if DepictionNature.POSITIVE in natures:
            return DepictionNature.POSITIVE
        return DepictionNature.NEUTRAL

    @property
    def page_numbers(self) -> list[int]:
        """Return the sorted distinct script pages on which the item appears."""
        return sorted({o.page_number for o in self.occurrences})


_PUNCT_RE = re.compile(r"[^\w\s]")
_WS_RE = re.compile(r"\s+")
_LEADING_ARTICLE_RE = re.compile(r"^(the|a|an)\s+")


def normalize_name(text: str) -> str:
    """Return the canonical deduplication key for a mention.

    Lowercases, strips possessives, removes punctuation, collapses whitespace,
    and drops a leading article. ``"The Coca-Cola's"`` and ``"coca cola"`` both
    normalize to ``"coca cola"``.

    Args:
        text: Raw mention text as it appeared in the script.

    Returns:
        The normalized key. Never empty for non-empty input unless the input was
        entirely punctuation.
    """
    lowered = text.strip().lower()
    lowered = re.sub(r"['’]s\b", "", lowered)
    lowered = _PUNCT_RE.sub(" ", lowered)
    lowered = _WS_RE.sub(" ", lowered).strip()
    lowered = _LEADING_ARTICLE_RE.sub("", lowered)
    return lowered


# ---------------------------------------------------------------------------
# Evidence
# ---------------------------------------------------------------------------


class Evidence(BaseModel):
    """One sourced fact with a real URL and a retrieval timestamp.

    Evidence without a resolvable ``source_url`` is discarded at ingest by
    :mod:`clearframe.agents.researcher` rather than being carried forward and
    filtered later, so every object of this type is citable by construction.
    """

    model_config = ConfigDict(extra="forbid")

    evidence_id: str = Field(default_factory=lambda: _new_id("ev"))
    item_id: str = Field(..., description="The ExtractedItem this evidence supports.")
    source_url: str = Field(..., min_length=1)
    source_title: str = Field(default="")
    retrieved_at: datetime = Field(default_factory=utcnow)
    snippet: str = Field(..., description="Verbatim excerpt from the source.")
    relevance_note: str = Field(
        default="", description="Why this source bears on the item's clearance status."
    )
    confidence: Optional[float] = Field(default=None, ge=0.0, le=1.0)

    @field_validator("source_url")
    @classmethod
    def _require_http_url(cls, v: str) -> str:
        """Reject anything that is not an http(s) URL."""
        if not v.lower().startswith(("http://", "https://")):
            raise ValueError(f"evidence source_url must be an http(s) URL, got {v!r}")
        return v


# ---------------------------------------------------------------------------
# Deterministic rules
# ---------------------------------------------------------------------------


class RuleFacts(BaseModel):
    """The structured facts the rules engine reasons over.

    Every field is optional because the engine's contract is to report which
    fact is *missing* rather than to guess it. Facts are lifted out of
    :class:`Evidence` by the assembler, never invented.
    """

    model_config = ConfigDict(extra="forbid")

    work_type: Optional[WorkType] = None
    jurisdiction: Jurisdiction = Jurisdiction.US
    publication_year: Optional[int] = Field(default=None, ge=1000, le=2200)
    creation_year: Optional[int] = Field(default=None, ge=1000, le=2200)
    author_death_year: Optional[int] = Field(default=None, ge=1000, le=2200)
    authorship_type: AuthorshipType = AuthorshipType.UNKNOWN
    is_person_living: Optional[bool] = None
    person_death_year: Optional[int] = Field(default=None, ge=1000, le=2200)
    trademark_status: Optional[str] = None
    evaluation_year: Optional[int] = Field(
        default=None,
        ge=1000,
        le=2200,
        description="Year the term is evaluated as of; defaults to the current year.",
    )
    source_evidence_ids: list[str] = Field(
        default_factory=list,
        description="Evidence that supplied these facts, for citation in the finding.",
    )


class RuleOutcome(BaseModel):
    """The result of applying one deterministic rule.

    Produced only by :mod:`clearframe.tools.rules_engine`. No LLM ever
    constructs this object; the assembler receives it as forced context.
    """

    model_config = ConfigDict(extra="forbid")

    rule_id: str = Field(..., description="Identifier from copyright_rules.yaml.")
    applied_facts: dict[str, Any] = Field(
        default_factory=dict, description="Exactly the facts this rule consumed."
    )
    outcome: RuleOutcomeCode
    explanation: str = Field(
        ..., description="Plain-language arithmetic trace, generated by code."
    )
    missing_facts: list[str] = Field(
        default_factory=list,
        description="Populated only when outcome is INSUFFICIENT_FACTS.",
    )
    public_domain_year: Optional[int] = Field(
        default=None, description="Calendar year the term expires, when computable."
    )
    citation: str = Field(
        default="", description="Statutory citation for the applied rule."
    )
    evaluated_at: datetime = Field(default_factory=utcnow)


# ---------------------------------------------------------------------------
# Findings and review
# ---------------------------------------------------------------------------


class Claim(BaseModel):
    """One sentence of rationale together with the citations it carries.

    :mod:`clearframe.validation.citations` splits rationale into these and drops
    any claim whose ``evidence_ids`` and ``rule_ids`` are both empty or dangling.
    """

    model_config = ConfigDict(extra="forbid")

    text: str
    evidence_ids: list[str] = Field(default_factory=list)
    rule_ids: list[str] = Field(default_factory=list)

    @property
    def is_cited(self) -> bool:
        """Return True if the claim references at least one citation token."""
        return bool(self.evidence_ids or self.rule_ids)


class Finding(BaseModel):
    """The triage output for one item: tier, cited rationale, open questions."""

    model_config = ConfigDict(extra="forbid")

    item_id: str
    tier: Tier
    rationale: str = Field(
        default="",
        description="Validated rationale; every sentence carries a citation token.",
    )
    claims: list[Claim] = Field(
        default_factory=list, description="Rationale decomposed for citation validation."
    )
    evidence_ids: list[str] = Field(default_factory=list)
    rule_outcomes: list[RuleOutcome] = Field(default_factory=list)
    open_questions: list[str] = Field(default_factory=list)
    dropped_claims: list[str] = Field(
        default_factory=list,
        description="Uncited claims removed by the validator, kept for the audit trail.",
    )
    validated: bool = Field(
        default=False,
        description="False until validation/citations.py has processed this finding.",
    )
    rights_holder_hint: Optional[str] = Field(
        default=None, description="Best-sourced rights holder, used to draft enquiries."
    )
    generated_at: datetime = Field(default_factory=utcnow)


class ReviewState(BaseModel):
    """A human reviewer's decision on one item.

    Export is blocked while any item is ``PENDING``; that is enforced in the API
    layer with a 409, not by disabling a button.
    """

    model_config = ConfigDict(extra="forbid")

    item_id: str
    decision: ReviewDecision = ReviewDecision.PENDING
    reviewer_note: str = Field(default="")
    reviewer: Optional[str] = None
    decided_at: Optional[datetime] = None


# ---------------------------------------------------------------------------
# Audit
# ---------------------------------------------------------------------------


class AuditEntry(BaseModel):
    """One structured step in the pipeline trace."""

    model_config = ConfigDict(extra="forbid")

    entry_id: str = Field(default_factory=lambda: _new_id("log"))
    timestamp: datetime = Field(default_factory=utcnow)
    report_id: Optional[str] = None
    stage: PipelineStage
    tool: str = Field(default="", description="Tool or function invoked.")
    input_summary: str = Field(default="")
    output_summary: str = Field(default="")
    latency_ms: Optional[float] = Field(default=None, ge=0)
    token_cost: Optional[int] = Field(default=None, ge=0)
    task_cost: Optional[int] = Field(
        default=None, ge=0, description="Count of Parallel tasks consumed."
    )
    level: str = Field(default="INFO")
    detail: dict[str, Any] = Field(default_factory=dict)


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------


class ClearanceReport(BaseModel):
    """The complete research artefact for one screenplay.

    This is research output for review by qualified counsel. It contains no
    legal advice and no item is ever marked cleared by the pipeline.
    """

    model_config = ConfigDict(extra="forbid")

    report_id: str = Field(default_factory=lambda: _new_id("rpt"))
    script_name: str
    status: ReportStatus = ReportStatus.DRAFT
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)
    pipeline_state: str = Field(
        default="QUEUED",
        description="QUEUED | RUNNING | COMPLETE | FAILED, for the async upload flow.",
    )
    error: Optional[str] = None
    page_count: int = Field(default=0, ge=0)
    scene_count: int = Field(default=0, ge=0)

    items: list[ExtractedItem] = Field(default_factory=list)
    findings: list[Finding] = Field(default_factory=list)
    evidence_store: dict[str, Evidence] = Field(default_factory=dict)
    review_states: dict[str, ReviewState] = Field(default_factory=dict)
    audit_log: list[AuditEntry] = Field(default_factory=list)

    def item_by_id(self, item_id: str) -> Optional[ExtractedItem]:
        """Return the item with the given id, or None."""
        return next((i for i in self.items if i.item_id == item_id), None)

    def finding_by_id(self, item_id: str) -> Optional[Finding]:
        """Return the finding for the given item id, or None."""
        return next((f for f in self.findings if f.item_id == item_id), None)

    def evidence_for_item(self, item_id: str) -> list[Evidence]:
        """Return all evidence collected for the given item."""
        return [e for e in self.evidence_store.values() if e.item_id == item_id]

    def pending_item_ids(self) -> list[str]:
        """Return ids of items still awaiting a reviewer decision.

        An item with no review state at all counts as pending; this is what the
        export endpoint checks before returning 409.
        """
        pending: list[str] = []
        for item in self.items:
            state = self.review_states.get(item.item_id)
            if state is None or state.decision == ReviewDecision.PENDING:
                pending.append(item.item_id)
        return pending

    def tier_counts(self) -> dict[str, int]:
        """Return a count of findings per tier, including tiers with zero."""
        counts = {t.value: 0 for t in Tier}
        for finding in self.findings:
            counts[finding.tier.value] += 1
        return counts


class ReviewDecisionRequest(BaseModel):
    """Request body for setting a reviewer decision on an item."""

    model_config = ConfigDict(extra="forbid")

    decision: ReviewDecision
    reviewer_note: str = Field(default="")
    reviewer: Optional[str] = None


class ScriptUploadResponse(BaseModel):
    """Response returned when a script is accepted for processing."""

    model_config = ConfigDict(extra="forbid")

    report_id: str
    script_name: str
    pipeline_state: str
    message: str


class HealthResponse(BaseModel):
    """Service health, including which external integrations are configured."""

    model_config = ConfigDict(extra="forbid")

    status: str
    version: str
    gemini_configured: bool
    parallel_configured: bool
    timestamp: datetime = Field(default_factory=utcnow)


def stable_item_id(normalized_name: str, category: ItemCategory) -> str:
    """Return a deterministic item id for a normalized name and category.

    Used by the deduplicator so that re-running extraction on the same script
    yields stable ids, which keeps benchmark runs and audit diffs comparable.

    Args:
        normalized_name: Output of :func:`normalize_name`.
        category: The item's category.

    Returns:
        A deterministic ``item_`` prefixed identifier.
    """
    digest = hashlib.sha1(f"{category.value}|{normalized_name}".encode()).hexdigest()
    return f"item_{digest[:12]}"
