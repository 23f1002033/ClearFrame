"""Export a clearance report as a reviewable markdown log.

The exported log is the deliverable a production actually hands to counsel, so
it carries a standing header stating what it is and what it is not. Every
substantive line in it has already survived
:mod:`clearframe.validation.citations`, so the citations in the export resolve
by construction.

For ``ESCALATE`` items the export also drafts a licensing enquiry addressed to
the rights holder the research identified. The drafts are starting points for a
human to send, not correspondence the system transmits, and they say so.
"""

from __future__ import annotations

from datetime import datetime
from typing import Optional

from clearframe.models import (
    ClearanceReport,
    Evidence,
    ExtractedItem,
    Finding,
    ItemCategory,
    ReviewDecision,
    RuleOutcome,
    Tier,
    utcnow,
)

DISCLAIMER = """\
> **This is research output for review by qualified counsel. It is not legal
> advice.**
>
> ClearFrame does not determine whether any item may be used. No item in this
> log has been cleared. Tiers describe how much reviewer attention an item is
> likely to need, not the legal status of the underlying rights. Every
> substantive statement carries a citation to a retrieved source or to a
> deterministic rule; statements that could not be cited were removed before
> export and are listed under "Claims removed in validation".
>
> Copyright terms shown here are arithmetic applied to facts found in the cited
> sources. Where a required fact was not established, the log says so by name
> rather than estimating a term.\
"""

TIER_LABEL = {
    Tier.ESCALATE: "Escalate",
    Tier.NEEDS_VERIFICATION: "Needs verification",
    Tier.CLEAR_ON_RECORD: "Clear on record",
}

TIER_MEANING = {
    Tier.ESCALATE: (
        "High exposure. A living person is depicted, music is in copyright, a "
        "real entity is depicted negatively, or a real brand is shown "
        "favourably in a way that could imply endorsement."
    ),
    Tier.NEEDS_VERIFICATION: (
        "Evidence is incomplete, sources conflict, a required fact for the term "
        "calculation is missing, or a mark appears on screen in incidental use."
    ),
    Tier.CLEAR_ON_RECORD: (
        "Sourced evidence and rule outcomes together indicate no clearance "
        "action is likely needed. Still requires reviewer sign-off."
    ),
}


def _fmt_date(value: datetime) -> str:
    """Format a timestamp as an ISO date."""
    return value.date().isoformat()


def _occurrence_table(item: ExtractedItem) -> str:
    """Render an item's occurrences as a markdown table.

    Args:
        item: The item whose occurrences to render.

    Returns:
        A markdown table with page numbers, which is how counsel locates the
        item in the physical script.
    """
    rows = [
        "| Scene | Page | On screen | Depiction | Context |",
        "|---:|---:|:---:|:---|:---|",
    ]
    for occurrence in item.occurrences:
        snippet = occurrence.context_snippet.replace("\n", " ").replace("|", "\\|")
        if len(snippet) > 160:
            snippet = snippet[:157] + "..."
        rows.append(
            f"| {occurrence.scene_number} | {occurrence.page_number} | "
            f"{'yes' if occurrence.on_screen else 'no'} | "
            f"{occurrence.depiction_nature.value.lower()} | {snippet} |"
        )
    return "\n".join(rows)


def _rule_block(outcomes: list[RuleOutcome]) -> str:
    """Render deterministic rule outcomes for one item.

    Args:
        outcomes: The item's rule outcomes.

    Returns:
        A markdown block, or a note that no term rule applies.
    """
    if not outcomes:
        return "_No copyright term rule applies to this category._"
    blocks: list[str] = []
    for outcome in outcomes:
        lines = [
            f"**`{outcome.rule_id}` → {outcome.outcome.value}**",
            "",
            outcome.explanation,
        ]
        if outcome.public_domain_year:
            lines.append(f"\nPublic domain from: **{outcome.public_domain_year}**")
        if outcome.missing_facts:
            lines.append(
                f"\n**Fact(s) not established by the sources:** "
                f"`{'`, `'.join(outcome.missing_facts)}`"
            )
        if outcome.citation:
            lines.append(f"\nAuthority: {outcome.citation}")
        blocks.append("\n".join(lines))
    return "\n\n".join(blocks)


def _evidence_block(evidence: list[Evidence]) -> str:
    """Render an item's evidence with URLs and retrieval dates.

    Args:
        evidence: Evidence for one item.

    Returns:
        A markdown list, or a warning that nothing was retrieved.
    """
    if not evidence:
        return (
            "> **No sources were retrieved for this item.** It has not been "
            "researched and must be checked manually."
        )
    lines: list[str] = []
    for item in evidence:
        lines.append(
            f"- `{item.evidence_id}` — [{item.source_title or item.source_url}]"
            f"({item.source_url})  \n"
            f"  Retrieved {_fmt_date(item.retrieved_at)}. {item.relevance_note}  \n"
            f"  > {item.snippet.strip()[:400].replace(chr(10), ' ')}"
        )
    return "\n".join(lines)


def build_licensing_email(
    item: ExtractedItem,
    finding: Finding,
    report: ClearanceReport,
) -> str:
    """Draft a licensing enquiry for one escalated item.

    The draft asks the rights holder what is required. It never asserts that the
    production has a right to use anything, and it is explicitly marked as an
    unsent draft for a human to review and send.

    Args:
        item: The item the enquiry concerns.
        finding: The finding for that item.
        report: The report the item belongs to, used for the script name.

    Returns:
        A markdown block containing the draft email.
    """
    holder = finding.rights_holder_hint or "[RIGHTS HOLDER — not identified in research]"
    pages = ", ".join(str(p) for p in item.page_numbers)
    scenes = ", ".join(str(o.scene_number) for o in item.occurrences)

    if item.category is ItemCategory.MUSIC:
        subject = f"Synchronisation and master use enquiry — “{item.mention_text}”"
        ask = (
            "We are seeking to license both the musical composition and the "
            "specific sound recording. We understand these are separate rights "
            "and may be controlled by different parties. Could you confirm "
            "which rights you control, and direct us to the correct "
            "counterparty for any right you do not?"
        )
    elif item.category is ItemCategory.REAL_PERSON:
        subject = f"Depiction enquiry — {item.mention_text}"
        ask = (
            "We are seeking to understand what permissions, if any, are "
            "required in connection with this depiction, and who administers "
            "the relevant rights."
        )
    elif item.category in {ItemCategory.REAL_LOCATION_BUSINESS, ItemCategory.LOGO_PROP}:
        subject = f"Location and depiction enquiry — {item.mention_text}"
        ask = (
            "We are seeking to understand whether a location release, filming "
            "permit, or depiction consent is required, and what your process is."
        )
    else:
        subject = f"Trademark depiction enquiry — {item.mention_text}"
        ask = (
            "We are seeking to understand whether your organisation has a "
            "policy governing depiction of the mark in a motion picture, and "
            "whether any permission is required for the use described."
        )

    questions = finding.open_questions or [
        "What permissions, if any, are required for the use described above?"
    ]
    question_lines = "\n".join(f"  {n}. {q}" for n, q in enumerate(questions, 1))

    return f"""\
> **UNSENT DRAFT.** Prepared automatically for review by the production's
> clearance counsel. Verify the recipient, the facts, and the wording before
> sending. ClearFrame does not send correspondence.

**To:** {holder}
**Subject:** {subject}

Dear {holder},

I am writing on behalf of the production of *{report.script_name}* regarding a
proposed depiction in our screenplay.

The screenplay refers to **{item.mention_text}** in {item.occurrence_count} \
place(s) — scene(s) {scenes}, page(s) {pages} of the current draft. \
{'The item is visually depicted on screen.' if item.appears_on_screen else \
'The item is referred to in dialogue and is not visually depicted.'}

{ask}

Specifically, we would be grateful for guidance on the following:

{question_lines}

We are happy to provide the relevant pages of the screenplay and to discuss the
context of the depiction. Please let us know the appropriate contact if this
enquiry should be directed elsewhere.

With thanks,

[PRODUCER NAME]
[PRODUCTION COMPANY]
[CONTACT DETAILS]
"""


def _summary_table(report: ClearanceReport) -> str:
    """Render the tier summary table.

    Args:
        report: The report to summarise.

    Returns:
        A markdown table of counts by tier.
    """
    counts = report.tier_counts()
    total = len(report.findings) or 1
    rows = ["| Tier | Items | Share | Meaning |", "|:---|---:|---:|:---|"]
    for tier in (Tier.ESCALATE, Tier.NEEDS_VERIFICATION, Tier.CLEAR_ON_RECORD):
        count = counts[tier.value]
        rows.append(
            f"| **{TIER_LABEL[tier]}** | {count} | {count / total:.0%} | {TIER_MEANING[tier]} |"
        )
    return "\n".join(rows)


def _category_table(report: ClearanceReport) -> str:
    """Render a count of items by category.

    Args:
        report: The report to summarise.

    Returns:
        A markdown table.
    """
    counts: dict[str, int] = {}
    for item in report.items:
        counts[item.category.value] = counts.get(item.category.value, 0) + 1
    rows = ["| Category | Items |", "|:---|---:|"]
    for category, count in sorted(counts.items(), key=lambda kv: -kv[1]):
        rows.append(f"| {category.replace('_', ' ').title()} | {count} |")
    return "\n".join(rows)


def render_markdown(
    report: ClearanceReport, include_emails: bool = True, generated_at: Optional[datetime] = None
) -> str:
    """Render the full clearance log as markdown.

    Args:
        report: The completed report.
        include_emails: Whether to append draft licensing enquiries for
            escalated items.
        generated_at: Timestamp for the header; defaults to now.

    Returns:
        The markdown document.
    """
    generated_at = generated_at or utcnow()
    order = {Tier.ESCALATE: 0, Tier.NEEDS_VERIFICATION: 1, Tier.CLEAR_ON_RECORD: 2}
    findings = sorted(report.findings, key=lambda f: order[f.tier])

    parts: list[str] = [
        f"# Clearance research log — *{report.script_name}*",
        "",
        DISCLAIMER,
        "",
        "## Report",
        "",
        f"| | |",
        f"|:---|:---|",
        f"| Report ID | `{report.report_id}` |",
        f"| Script | {report.script_name} |",
        f"| Pages | {report.page_count} |",
        f"| Scenes | {report.scene_count} |",
        f"| Distinct items | {len(report.items)} |",
        f"| Sources retrieved | {len(report.evidence_store)} |",
        f"| Generated | {generated_at.isoformat(timespec='seconds')} |",
        f"| Status | {report.status.value} |",
        "",
        "## Summary by tier",
        "",
        _summary_table(report),
        "",
        "## Items by category",
        "",
        _category_table(report),
        "",
        "---",
        "",
        "## Findings",
        "",
    ]

    for index, finding in enumerate(findings, start=1):
        item = report.item_by_id(finding.item_id)
        if item is None:
            continue
        evidence = report.evidence_for_item(item.item_id)
        state = report.review_states.get(item.item_id)

        parts.extend(
            [
                f"### {index}. {item.mention_text}",
                "",
                f"**Tier: {TIER_LABEL[finding.tier]}** · "
                f"{item.category.value.replace('_', ' ').title()} · "
                f"{item.occurrence_count} occurrence(s) on page(s) "
                f"{', '.join(str(p) for p in item.page_numbers)}",
                "",
            ]
        )
        if item.variants:
            parts.append(
                f"Also appears as: {', '.join(f'“{v}”' for v in item.variants)}\n"
            )
        if item.normalized_name.lower() != item.mention_text.lower():
            parts.append(f"Resolved entity: **{item.normalized_name}**\n")

        parts.extend(["**Occurrences**", "", _occurrence_table(item), ""])
        parts.extend(
            [
                "**Assessment**",
                "",
                finding.rationale or "_No citable rationale survived validation._",
                "",
            ]
        )

        if finding.open_questions:
            parts.append("**Open questions for the reviewer**")
            parts.append("")
            parts.extend(f"{n}. {q}" for n, q in enumerate(finding.open_questions, 1))
            parts.append("")

        parts.extend(["**Deterministic rule outcomes**", "", _rule_block(finding.rule_outcomes), ""])
        parts.extend(
            [
                f"**Sources** ({len(evidence)} retrieved)",
                "",
                _evidence_block(evidence),
                "",
            ]
        )

        if finding.dropped_claims:
            parts.append(
                f"<details><summary>Claims removed in validation "
                f"({len(finding.dropped_claims)})</summary>\n"
            )
            parts.extend(f"- {claim}" for claim in finding.dropped_claims)
            parts.append("\n</details>\n")

        if state:
            note = f" — {state.reviewer_note}" if state.reviewer_note else ""
            decided = (
                f" ({_fmt_date(state.decided_at)})" if state.decided_at else ""
            )
            parts.append(
                f"**Reviewer decision:** {state.decision.value}{decided}{note}\n"
            )
        parts.append("---\n")

    escalated = [f for f in findings if f.tier is Tier.ESCALATE]
    if include_emails and escalated:
        parts.extend(
            [
                "## Appendix A — draft licensing enquiries",
                "",
                f"{len(escalated)} item(s) are tiered Escalate. A draft enquiry is "
                "prepared below for each. These are unsent drafts for counsel to "
                "review, amend and send.",
                "",
            ]
        )
        for index, finding in enumerate(escalated, start=1):
            item = report.item_by_id(finding.item_id)
            if item is None:
                continue
            parts.extend(
                [
                    f"### A{index}. {item.mention_text}",
                    "",
                    build_licensing_email(item, finding, report),
                    "",
                    "---",
                    "",
                ]
            )

    unresearched = [i for i in report.items if not report.evidence_for_item(i.item_id)]
    if unresearched:
        parts.extend(
            [
                "## Appendix B — gaps in this review",
                "",
                "The following items produced no sourced evidence. They have **not** "
                "been researched and must be checked manually.",
                "",
            ]
        )
        parts.extend(f"- {i.mention_text} ({i.category.value})" for i in unresearched)
        parts.append("")

    return "\n".join(parts)


def render_summary_text(report: ClearanceReport) -> str:
    """Render a short plain-text summary, for the CLI and API responses.

    Args:
        report: The report to summarise.

    Returns:
        A compact multi-line summary.
    """
    counts = report.tier_counts()
    pending = len(report.pending_item_ids())
    return (
        f"{report.script_name}: {len(report.items)} items across {report.page_count} pages, "
        f"{len(report.evidence_store)} sources.\n"
        f"Escalate {counts['ESCALATE']} | "
        f"Needs verification {counts['NEEDS_VERIFICATION']} | "
        f"Clear on record {counts['CLEAR_ON_RECORD']}\n"
        f"{pending} item(s) still pending reviewer decision.\n"
        f"Research output for review by qualified counsel. Not legal advice."
    )
