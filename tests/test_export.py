"""Tests for the markdown export and draft licensing emails."""

from __future__ import annotations

import pytest

from clearframe.export.report import build_licensing_email, render_markdown, render_summary_text
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
    RuleOutcome,
    RuleOutcomeCode,
    Tier,
)


def _flatten(markdown: str) -> str:
    """Collapse markdown blockquote wrapping so prose can be matched as prose.

    The disclaimer is a wrapped ``>`` blockquote, so phrases legitimately span
    line breaks and quote prefixes. Matching the rendered text directly would
    make these tests fail on rewrapping rather than on meaning.

    Args:
        markdown: The rendered document.

    Returns:
        The text with quote markers and newlines collapsed to single spaces.
    """
    import re

    return re.sub(r"\s+", " ", markdown.replace("\n>", " ").replace(">", " "))


def _report(tier: Tier = Tier.ESCALATE, category=ItemCategory.BRAND_TRADEMARK) -> ClearanceReport:
    """Build a small finished report for export tests."""
    report = ClearanceReport(script_name="Test Script", page_count=6, scene_count=14)
    item = ExtractedItem(
        mention_text="COCA-COLA",
        normalized_name="Coca-Cola",
        category=category,
        variants=["Coke"],
        occurrences=[
            Occurrence(
                scene_number=3,
                page_number=1,
                context_snippet="Maya sits with a COCA-COLA",
                on_screen=True,
                depiction_nature=DepictionNature.NEUTRAL,
            )
        ],
    )
    evidence = Evidence(
        item_id=item.item_id,
        source_url="https://trademarks.justia.com/coca",
        source_title="COCA-COLA Trademark",
        snippet="Registered to The Coca-Cola Company.",
        relevance_note="registrant",
    )
    report.items.append(item)
    report.evidence_store[evidence.evidence_id] = evidence
    report.review_states[item.item_id] = ReviewState(item_id=item.item_id)
    report.findings.append(
        Finding(
            item_id=item.item_id,
            tier=tier,
            rationale=f"The mark is registered [{evidence.evidence_id}].",
            evidence_ids=[evidence.evidence_id],
            rule_outcomes=[
                RuleOutcome(
                    rule_id="TRADEMARK_NO_EXPIRY",
                    outcome=RuleOutcomeCode.NOT_APPLICABLE,
                    explanation="Trade mark rights do not expire on a fixed term.",
                    citation="15 U.S.C. § 1058",
                )
            ],
            open_questions=["Is the use nominative?"],
            validated=True,
            rights_holder_hint="The Coca-Cola Company",
        )
    )
    return report


# ---------------------------------------------------------------------------
# Positioning
# ---------------------------------------------------------------------------


def test_export_carries_the_non_advice_disclaimer() -> None:
    """The deliverable states what it is and is not, on every export."""
    flat = _flatten(render_markdown(_report()))
    assert "not legal advice" in flat.lower()
    assert "No item in this log has been cleared" in flat
    assert "qualified counsel" in flat


def test_export_never_uses_advice_vocabulary_as_a_status() -> None:
    """No item may read as cleared, safe or approved."""
    markdown = _flatten(render_markdown(_report(tier=Tier.CLEAR_ON_RECORD))).lower()
    for banned in ("is cleared", "is safe", "safe to use", "you may use", "approved for use"):
        assert banned not in markdown


def test_clear_on_record_is_labelled_with_its_full_meaning() -> None:
    """The label must not be shortened to something that reads as permission."""
    flat = _flatten(render_markdown(_report(tier=Tier.CLEAR_ON_RECORD)))
    assert "Clear on record" in flat
    assert "Still requires reviewer sign-off" in flat


# ---------------------------------------------------------------------------
# Content
# ---------------------------------------------------------------------------


def test_export_includes_page_numbers_for_every_occurrence() -> None:
    """Counsel locates the item by page; the export must carry them."""
    markdown = render_markdown(_report())
    assert "| Scene | Page |" in markdown
    assert "| 3 | 1 |" in markdown


def test_export_lists_evidence_with_urls_and_retrieval_dates() -> None:
    """A source without a date cannot be judged for staleness."""
    report = _report()
    markdown = render_markdown(report)
    evidence = next(iter(report.evidence_store.values()))
    assert evidence.source_url in markdown
    assert evidence.retrieved_at.date().isoformat() in markdown
    assert evidence.evidence_id in markdown


def test_export_shows_merged_variants() -> None:
    """A reviewer must know which surface forms were folded together."""
    assert "Coke" in render_markdown(_report())


def test_export_surfaces_missing_facts_from_the_rules_engine() -> None:
    """INSUFFICIENT_FACTS is an actionable research task, so it must be visible."""
    report = _report()
    report.findings[0].rule_outcomes = [
        RuleOutcome(
            rule_id="US_PUBLICITY_POSTMORTEM",
            outcome=RuleOutcomeCode.INSUFFICIENT_FACTS,
            explanation="cannot compute",
            missing_facts=["domicile_state_at_death"],
            citation="State law",
        )
    ]
    flat = _flatten(render_markdown(report))
    assert "domicile_state_at_death" in flat
    assert "not established by the sources" in flat


def test_export_flags_items_with_no_evidence_as_gaps() -> None:
    """An unresearched item is a hole in the review and must be named."""
    report = _report()
    report.evidence_store.clear()
    flat = _flatten(render_markdown(report))
    assert "Appendix B" in flat
    assert "have **not** been researched" in flat


def test_dropped_claims_appear_collapsed_not_as_findings() -> None:
    """Removed claims demonstrate the validator, but are not assertions."""
    report = _report()
    report.findings[0].dropped_claims = ["An uncited assertion."]
    markdown = render_markdown(report)
    assert "Claims removed in validation" in markdown
    assert "<details>" in markdown


def test_reviewer_decisions_appear_in_the_export() -> None:
    """The log records who signed off on what."""
    report = _report()
    item_id = report.items[0].item_id
    report.review_states[item_id] = ReviewState(
        item_id=item_id, decision=ReviewDecision.CONFIRMED, reviewer_note="Background use."
    )
    markdown = render_markdown(report)
    assert "CONFIRMED" in markdown
    assert "Background use." in markdown


def test_summary_table_reports_shares_by_tier() -> None:
    """The top of the log answers "how much work is this"."""
    markdown = render_markdown(_report())
    assert "## Summary by tier" in markdown
    assert "Escalate" in markdown


# ---------------------------------------------------------------------------
# Draft licensing emails
# ---------------------------------------------------------------------------


def test_escalate_items_get_a_draft_licensing_email() -> None:
    """Escalated items come with a starting point for the enquiry."""
    markdown = render_markdown(_report(tier=Tier.ESCALATE))
    assert "Appendix A — draft licensing enquiries" in markdown
    assert "The Coca-Cola Company" in markdown


def test_non_escalate_items_get_no_email() -> None:
    """Drafting enquiries for everything would bury the real ones."""
    markdown = render_markdown(_report(tier=Tier.CLEAR_ON_RECORD))
    assert "Appendix A" not in markdown


def test_draft_email_is_marked_unsent_and_never_claims_a_right() -> None:
    """The draft asks what is required; it never asserts permission."""
    report = _report()
    email = build_licensing_email(report.items[0], report.findings[0], report)
    flat = _flatten(email)
    assert "UNSENT DRAFT" in flat
    assert "ClearFrame does not send correspondence" in flat
    for banned in ("we have the right", "we are cleared", "no permission is required"):
        assert banned not in email.lower()


def test_music_draft_asks_for_both_rights_separately() -> None:
    """Requesting only one of the two music rights is the classic error."""
    report = _report(category=ItemCategory.MUSIC)
    email = build_licensing_email(report.items[0], report.findings[0], report)
    assert "musical composition" in email.lower()
    assert "sound recording" in email.lower()
    assert "separate rights" in email.lower()


@pytest.mark.parametrize(
    ("category", "expected"),
    [
        (ItemCategory.REAL_PERSON, "Depiction enquiry"),
        (ItemCategory.REAL_LOCATION_BUSINESS, "Location and depiction enquiry"),
        (ItemCategory.BRAND_TRADEMARK, "Trademark depiction enquiry"),
        (ItemCategory.MUSIC, "Synchronisation and master use enquiry"),
    ],
)
def test_draft_subject_matches_the_category(category, expected: str) -> None:
    """The enquiry asks the right question for the kind of right at issue."""
    report = _report(category=category)
    assert expected in build_licensing_email(report.items[0], report.findings[0], report)


def test_draft_carries_page_and_scene_references() -> None:
    """A rights holder needs to know where in the script the use occurs."""
    report = _report()
    email = build_licensing_email(report.items[0], report.findings[0], report)
    assert "scene(s) 3" in email
    assert "page(s) 1" in email


def test_draft_handles_an_unidentified_rights_holder() -> None:
    """Research does not always find a holder; the draft must say so."""
    report = _report()
    report.findings[0].rights_holder_hint = None
    email = build_licensing_email(report.items[0], report.findings[0], report)
    assert "[RIGHTS HOLDER — not identified in research]" in email


def test_draft_includes_the_open_questions_as_the_ask() -> None:
    """The enquiry asks exactly what the research could not resolve."""
    report = _report()
    email = build_licensing_email(report.items[0], report.findings[0], report)
    assert "Is the use nominative?" in email


def test_summary_text_states_pending_count_and_disclaimer() -> None:
    """The compact summary is safe to paste anywhere."""
    summary = render_summary_text(_report())
    assert "1 item(s) still pending" in summary
    assert "Not legal advice" in summary


# ---------------------------------------------------------------------------
# Scraped snippets must not render as live markup
# ---------------------------------------------------------------------------


def test_markdown_in_a_scraped_snippet_is_neutralised() -> None:
    """Snippets are verbatim scrapes and arrive full of markdown.

    Left as-is inside the log's blockquotes, image links rendered as empty `[]`
    links and page chrome became clickable links that look like ClearFrame's own.
    """
    from clearframe.export.report import _quote_snippet

    raw = (
        "See [Bye Bye Blackbird (disambiguation)](https://en.wikipedia.org/wiki/X) "
        "![](https://en.wikipedia.org/wiki/File:Blackbird_1926.png) "
        "[Start Free Trial](https://vendor.example/trial)"
    )
    out = _quote_snippet(raw)
    assert "](" not in out
    assert "[]" not in out
    assert "https://" not in out
    assert "Bye Bye Blackbird (disambiguation)" in out
    assert "Start Free Trial" in out


def test_snippet_pipes_are_escaped_so_tables_do_not_break() -> None:
    """A raw pipe inside a table cell would split the occurrence row."""
    from clearframe.export.report import _quote_snippet

    assert "\\|" in _quote_snippet('|"Bye Bye Blackbird" | | --- |')


def test_snippet_is_collapsed_to_one_line() -> None:
    """Multi-line snippets would break out of the blockquote."""
    from clearframe.export.report import _quote_snippet

    assert "\n" not in _quote_snippet("line one\nline two\n\nline three")


def test_export_contains_no_empty_markdown_links() -> None:
    """Regression: the exported log carried `[](https://...)` from scraped pages."""
    report = _report()
    evidence = next(iter(report.evidence_store.values()))
    evidence.snippet = "prefix [](https://en.wikipedia.org/wiki/File:X.png) suffix"
    assert "[]" not in render_markdown(report)
