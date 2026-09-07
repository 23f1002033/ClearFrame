"""Citation validation: the technical enforcement of ClearFrame's positioning.

ClearFrame claims to surface *evidence*, never legal advice. That claim is only
credible if it is mechanically enforced, so this module is the gate every
:class:`~clearframe.models.Finding` passes through before it reaches a report.

Each rationale is split into claims. A claim survives only if it cites at least
one citation token that actually resolves — an ``evidence_id`` present in the
report's evidence store, or a ``rule_id`` present in the finding's rule
outcomes. Claims citing nothing, and claims citing an identifier the model
invented, are removed and written to the audit trail.

The validator also enforces the vocabulary ban. A finding that states an item is
"cleared", "safe", "legal" or that the production "may use" it has crossed from
research into advice, so those claims are dropped even when cited.
"""

from __future__ import annotations

import logging
import re
from typing import Iterable, Optional

from clearframe.audit.logger import AuditLogger
from clearframe.models import Claim, Finding, PipelineStage

logger = logging.getLogger(__name__)

# Citation tokens are written inline by the synthesis prompt as [ev_ab12cd34ef56]
# or [US_LIFE_PLUS_70]. Evidence ids are lowercase-prefixed; rule ids are the
# SCREAMING_SNAKE identifiers from copyright_rules.yaml.
# A citation block is anything in square brackets. Models group citations both
# as [ev_a][ev_b] and as [ev_a, ev_b], so the block is matched first and split
# afterwards; requiring one identifier per bracket silently discarded
# well-sourced claims.
CITATION_BLOCK_RE = re.compile(r"\[([^\[\]]{1,400})\]")
_ID_SPLIT_RE = re.compile(r"[,;]\s*|\s+and\s+|\s{2,}")
EVIDENCE_ID_RE = re.compile(r"^ev_[0-9a-f]{6,}$")
RULE_ID_RE = re.compile(r"^[A-Z][A-Z0-9_]{3,}$")

# Language that converts research into advice. Matched case-insensitively on
# word boundaries so "clearance" and "legally" do not trip "cleared"/"legal".
FORBIDDEN_PHRASES: tuple[str, ...] = (
    r"\bcleared\b",
    r"\bis clear\b",
    r"\bsafe to use\b",
    r"\bis safe\b",
    r"\bno legal risk\b",
    r"\byou may use\b",
    r"\bwe may use\b",
    r"\bcan be used freely\b",
    r"\bfree to use\b",
    r"\bno permission (?:is )?(?:required|needed)\b",
    r"\bno licence (?:is )?(?:required|needed)\b",
    r"\bno license (?:is )?(?:required|needed)\b",
    r"\blegally permissible\b",
    r"\bthis is legal\b",
    r"\bno clearance (?:is )?(?:required|needed)\b",
)
FORBIDDEN_RE = re.compile("|".join(FORBIDDEN_PHRASES), re.IGNORECASE)

# Sentence splitter that does not break on the abbreviations and section marks
# that appear constantly in statutory citations ("17 U.S.C. § 302(a).").
_PROTECTED = [
    ("U.S.C.", "\x01"),
    ("U.S.", "\x02"),
    ("Pub. L.", "\x03"),
    ("Civ.", "\x04"),
    ("Cal.", "\x05"),
    ("N.Y.", "\x06"),
    ("Inc.", "\x07"),
    ("Ltd.", "\x08"),
    ("Co.", "\x0b"),
    ("No.", "\x0c"),
    ("v.", "\x0e"),
    ("§§", "\x0f"),
]
_SENTENCE_SPLIT_RE = re.compile(r"(?<=[.!?])\s+(?=[A-Z0-9\"'\[])")

# Initials in party names and bylines ("A.L. Vijay", "J. R. R. Tolkien") are not
# sentence ends. Enumerating abbreviations cannot cover these, so the dots
# inside a run of single-letter initials are protected by pattern instead.
# One to four initials immediately followed by another capitalised word, which
# covers "F. Scott Fitzgerald", "A.L. Vijay" and "J. R. R. Tolkien". Requiring
# two or more initials split "F. Scott" and truncated the claim to "authored by
# F.", which the validator then dropped as an uncited fragment.
_INITIALS_RE = re.compile(r"\b(?:[A-Z]\.[ \t]?){1,4}(?=[A-Z])")
_DOT_PLACEHOLDER = "\x10"


class ValidationResult:
    """Outcome of validating one finding.

    Attributes:
        finding: The finding with only cited claims retained.
        kept: Claims that survived.
        dropped: Claims that were removed, with the reason.
    """

    def __init__(
        self, finding: Finding, kept: list[Claim], dropped: list[tuple[str, str]]
    ) -> None:
        """Initialise a validation result.

        Args:
            finding: The validated finding.
            kept: Surviving claims.
            dropped: ``(claim_text, reason)`` pairs for removed claims.
        """
        self.finding = finding
        self.kept = kept
        self.dropped = dropped

    @property
    def drop_count(self) -> int:
        """Return how many claims were removed."""
        return len(self.dropped)


def split_claims(rationale: str) -> list[str]:
    """Split a rationale into individual claims.

    Args:
        rationale: The synthesised rationale text.

    Returns:
        Sentence-level claims with statutory abbreviations left intact.
    """
    if not rationale.strip():
        return []
    protected = rationale
    for literal, token in _PROTECTED:
        protected = protected.replace(literal, token)
    protected = _INITIALS_RE.sub(
        lambda m: m.group(0).replace(".", _DOT_PLACEHOLDER), protected
    )
    parts = _SENTENCE_SPLIT_RE.split(protected)
    claims: list[str] = []
    for part in parts:
        part = part.replace(_DOT_PLACEHOLDER, ".")
        for literal, token in _PROTECTED:
            part = part.replace(token, literal)
        cleaned = part.strip()
        if cleaned:
            claims.append(cleaned)
    return claims


def extract_citations(text: str) -> tuple[list[str], list[str]]:
    """Pull evidence and rule citation tokens out of a claim.

    Handles both grouping styles models use: ``[ev_a][ev_b]`` and
    ``[ev_a, ev_b]``. Tokens are returned whether or not they resolve, so a
    hallucinated identifier can be reported as such rather than read as absent.

    Args:
        text: The claim text.

    Returns:
        A tuple of ``(evidence_ids, rule_ids)``, each de-duplicated in order.
    """
    evidence_ids: list[str] = []
    rule_ids: list[str] = []
    for block in CITATION_BLOCK_RE.findall(text):
        for token in _ID_SPLIT_RE.split(block):
            token = token.strip().strip(".,;")
            if EVIDENCE_ID_RE.match(token):
                if token not in evidence_ids:
                    evidence_ids.append(token)
            elif RULE_ID_RE.match(token):
                if token not in rule_ids:
                    rule_ids.append(token)
    return evidence_ids, rule_ids


def _strip_token(text: str, token: str) -> str:
    """Remove one citation token, collapsing the block if it becomes empty.

    Args:
        text: The claim text.
        token: The identifier to remove.

    Returns:
        The claim with that token gone and no empty or ragged brackets left.
    """

    def rewrite(match: re.Match[str]) -> str:
        parts = [
            p.strip().strip(".,;")
            for p in _ID_SPLIT_RE.split(match.group(1))
            if p.strip().strip(".,;")
        ]
        remaining = [p for p in parts if p != token]
        if not remaining:
            return ""
        if remaining == parts:
            return match.group(0)
        return "[" + ", ".join(remaining) + "]"

    return CITATION_BLOCK_RE.sub(rewrite, text)


def validate_finding(
    finding: Finding,
    valid_evidence_ids: Iterable[str],
    audit: Optional[AuditLogger] = None,
) -> ValidationResult:
    """Drop every uncited or advice-bearing claim from a finding.

    Args:
        finding: The finding to validate. Mutated in place and also returned.
        valid_evidence_ids: Evidence ids present in the report's evidence store.
        audit: Audit logger; every dropped claim is recorded individually.

    Returns:
        A :class:`ValidationResult` carrying the cleaned finding.
    """
    valid_evidence = set(valid_evidence_ids)
    valid_rules = {outcome.rule_id for outcome in finding.rule_outcomes}

    kept: list[Claim] = []
    dropped: list[tuple[str, str]] = []

    for text in split_claims(finding.rationale):
        cited_evidence, cited_rules = extract_citations(text)

        forbidden = FORBIDDEN_RE.search(text)
        if forbidden:
            dropped.append(
                (
                    text,
                    f"states a legal conclusion ({forbidden.group(0)!r}); ClearFrame "
                    f"reports evidence, not advice",
                )
            )
            continue

        resolved_evidence = [e for e in cited_evidence if e in valid_evidence]
        resolved_rules = [r for r in cited_rules if r in valid_rules]
        dangling = [e for e in cited_evidence if e not in valid_evidence] + [
            r for r in cited_rules if r not in valid_rules
        ]

        if not resolved_evidence and not resolved_rules:
            reason = (
                f"cites identifiers that do not exist in this report ({', '.join(dangling)})"
                if dangling
                else "no citation"
            )
            dropped.append((text, reason))
            continue

        if dangling:
            # Partly grounded: keep the claim but strip the invented tokens so
            # the exported log never shows a citation that resolves to nothing.
            for token in dangling:
                text = _strip_token(text, token)
            text = re.sub(r"\s+([.,;])", r"\1", re.sub(r"\s{2,}", " ", text)).strip()

        kept.append(
            Claim(text=text, evidence_ids=resolved_evidence, rule_ids=resolved_rules)
        )

    finding.claims = kept
    finding.rationale = " ".join(c.text for c in kept)
    finding.dropped_claims = [text for text, _ in dropped]
    finding.evidence_ids = sorted(
        {e for c in kept for e in c.evidence_ids} | set(finding.evidence_ids) & valid_evidence
    )
    finding.validated = True

    if audit:
        for text, reason in dropped:
            audit.record(
                stage=PipelineStage.VALIDATE,
                tool="citations.validate_finding",
                input_summary=f"{finding.item_id}: {text[:110]}",
                output_summary=f"CLAIM DROPPED - {reason}",
                level="WARNING",
                item_id=finding.item_id,
                drop_reason=reason,
                claim_text=text,
            )
        audit.record(
            stage=PipelineStage.VALIDATE,
            tool="citations.validate_finding",
            input_summary=f"{finding.item_id}: {len(kept) + len(dropped)} claims",
            output_summary=f"{len(kept)} kept, {len(dropped)} dropped",
            item_id=finding.item_id,
            kept=len(kept),
            dropped=len(dropped),
        )

    if not kept and finding.rule_outcomes:
        logger.warning(
            "every claim was dropped for %s; the finding now rests on rule outcomes alone",
            finding.item_id,
        )
    return ValidationResult(finding, kept, dropped)


def validate_findings(
    findings: list[Finding],
    valid_evidence_ids: Iterable[str],
    audit: Optional[AuditLogger] = None,
) -> list[Finding]:
    """Validate every finding in a report.

    Args:
        findings: The findings to validate.
        valid_evidence_ids: Evidence ids present in the report's evidence store.
        audit: Audit logger.

    Returns:
        The validated findings, in the order given.
    """
    valid = set(valid_evidence_ids)
    results = [validate_finding(f, valid, audit=audit) for f in findings]
    total_dropped = sum(r.drop_count for r in results)

    if audit:
        audit.record(
            stage=PipelineStage.VALIDATE,
            tool="citations.validate_findings",
            input_summary=f"{len(findings)} findings",
            output_summary=(
                f"{total_dropped} uncited or advice-bearing claims removed across "
                f"{sum(1 for r in results if r.drop_count)} findings"
            ),
            level="WARNING" if total_dropped else "INFO",
            total_dropped=total_dropped,
        )
    return [r.finding for r in results]


def citation_coverage(findings: list[Finding]) -> float:
    """Return the share of surviving claims that carry a resolving citation.

    After validation this is 1.0 by construction. It is computed anyway and
    reported in the benchmark, because a number that is not measured is a number
    nobody notices regressing.

    Args:
        findings: Validated findings.

    Returns:
        A value in ``[0.0, 1.0]``; 1.0 when there are no claims at all.
    """
    claims = [c for f in findings for c in f.claims]
    if not claims:
        return 1.0
    return sum(1 for c in claims if c.is_cited) / len(claims)
