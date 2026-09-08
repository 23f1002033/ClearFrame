"""Regression tests for frontend bugs found during live QA.

These are static/AST checks over the shipped JavaScript. They exist because the
bugs they cover were invisible to the Python test suite and to a casual click
through the UI: the app appeared to work while sending nothing to the backend.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

import pytest

REPO = Path(__file__).resolve().parents[1]
FRONTEND = REPO / "frontend" / "js"
STORE = FRONTEND / "store.js"
WORKSPACE = FRONTEND / "components" / "workspace.js"
MOCK = FRONTEND / "mock_data.js"


def _mock_literal(name: str):
    """Extract one `export const <name> = <json>;` literal from mock_data.js.

    Uses ``json.raw_decode``, which consumes exactly one JSON value and reports
    where it ended. Counting braces by hand miscounts, because the scraped
    evidence snippets in the fixture contain braces and brackets inside strings.

    Args:
        name: The exported identifier.

    Returns:
        The parsed JSON value.
    """
    text = MOCK.read_text(encoding="utf-8")
    marker = f"export const {name} = "
    assert marker in text, f"{name} not exported from mock_data.js"
    start = text.index(marker) + len(marker)
    value, _ = json.JSONDecoder().raw_decode(text, start)
    return value


# ---------------------------------------------------------------------------
# Bug 1: demo mode was inferred from a report-id match
# ---------------------------------------------------------------------------


def test_demo_fixture_uses_a_reserved_id_the_pipeline_cannot_produce() -> None:
    """The fixture is generated from a real run, so its id must be re-namespaced.

    When the fixture carried a real report id, loading that live report served
    the stale fixture instead: decisions issued no PATCH and export never reached
    the backend's 409 gate, while the UI looked entirely healthy.
    """
    report = _mock_literal("MOCK_REPORT")
    assert report["report_id"].startswith("rpt_demo_"), report["report_id"]
    # `_new_id` produces rpt_<12 hex>, which can never collide with this.
    assert not re.fullmatch(r"rpt_[0-9a-f]{12}", report["report_id"])


def test_store_does_not_infer_demo_mode_from_a_report_id_match() -> None:
    """Equality against the fixture's id must not be the demo-mode test."""
    source = STORE.read_text(encoding="utf-8")
    assert "reportId === MOCK_REPORT.report_id" not in source
    assert "isDemoReportId" in source


def test_demo_detection_accepts_only_the_reserved_prefix() -> None:
    """A real id must never be classified as the demo."""
    source = STORE.read_text(encoding="utf-8")
    match = re.search(r"isDemoReportId\(reportId\)\s*\{(.+?)\n  \}", source, re.S)
    assert match, "isDemoReportId not found"
    assert 'startsWith("rpt_demo_")' in match.group(1)


def test_trace_report_id_matches_the_demo_report_id() -> None:
    """A mismatched trace id would make the trace view silently empty."""
    assert _mock_literal("MOCK_TRACE")["report_id"] == _mock_literal("MOCK_REPORT")["report_id"]


# ---------------------------------------------------------------------------
# Bug 2: hardcoded demo dashboard counts
# ---------------------------------------------------------------------------


def test_demo_dashboard_counts_are_derived_not_hardcoded() -> None:
    """Literal tier counts drifted: the dashboard advertised 8 of 27 items."""
    source = STORE.read_text(encoding="utf-8")
    assert "tier_counts: { ESCALATE: 2" not in source
    assert "MOCK_REPORTS" in source


def test_mock_listing_row_matches_the_mock_report() -> None:
    """MOCK_REPORTS must agree with MOCK_REPORT, since it stands in for the API."""
    report, listing = _mock_literal("MOCK_REPORT"), _mock_literal("MOCK_REPORTS")
    assert len(listing) == 1
    row = listing[0]
    assert row["report_id"] == report["report_id"]
    assert row["items"] == len(report["items"])

    tiers: dict[str, int] = {}
    for finding in report["findings"]:
        tiers[finding["tier"]] = tiers.get(finding["tier"], 0) + 1
    assert row["tier_counts"] == {
        "CLEAR_ON_RECORD": tiers.get("CLEAR_ON_RECORD", 0),
        "NEEDS_VERIFICATION": tiers.get("NEEDS_VERIFICATION", 0),
        "ESCALATE": tiers.get("ESCALATE", 0),
    }
    pending = sum(
        1
        for item in report["items"]
        if (report["review_states"].get(item["item_id"]) or {}).get("decision", "PENDING")
        == "PENDING"
    )
    assert row["pending"] == pending


def test_mock_listing_row_matches_the_api_list_shape() -> None:
    """The fixture must not drift from GET /api/reports."""
    from clearframe.models import ClearanceReport

    report = ClearanceReport(script_name="X")
    expected = {
        "report_id", "script_name", "pipeline_state", "status",
        "items", "tier_counts", "pending", "created_at",
    }
    assert set(_mock_literal("MOCK_REPORTS")[0]) == expected
    assert set(report.tier_counts()) == set(
        _mock_literal("MOCK_REPORTS")[0]["tier_counts"]
    )


# ---------------------------------------------------------------------------
# Bug 3: rule citation chips had no scroll target
# ---------------------------------------------------------------------------


def test_rule_outcome_cards_carry_an_addressable_id() -> None:
    """Rule chips were styled clickable but had nothing to scroll to."""
    source = WORKSPACE.read_text(encoding="utf-8")
    assert source.count('id="rule-${r.rule_id}"') == 2, (
        "both the dual-rights and single-outcome cards need an id"
    )


def test_citation_chip_handler_resolves_rule_ids_too() -> None:
    """The handler previously acted only on data-ev-id and ignored rule chips."""
    source = WORKSPACE.read_text(encoding="utf-8")
    handler = source[source.index('querySelectorAll(".cite-token")') :]
    assert "dataset.ruleId" in handler
    assert "rule-${ruleId}" in handler


# ---------------------------------------------------------------------------
# Bug 4: the search field lost focus on every keystroke
# ---------------------------------------------------------------------------


def test_workspace_restores_focus_after_the_rerender() -> None:
    """setState replaces the pane, so a focused input must be re-focused.

    Without this the reviewer could type only one character into the filter.
    """
    source = WORKSPACE.read_text(encoding="utf-8")
    assert "pendingFocus" in source
    assert "setSelectionRange" in source


# ---------------------------------------------------------------------------
# Bug 5: dual-rights section mislabelled and duplicated
# ---------------------------------------------------------------------------


def test_dual_rights_and_single_outcome_sections_are_complementary() -> None:
    """They keyed off different conditions, so an item could render in both.

    Section 3 triggered on ``category === "MUSIC" || ruleOutcomes.length >= 2``
    while section 4 tested only the category, so a non-music item with two
    outcomes appeared twice, once under a "Music" heading.
    """
    source = WORKSPACE.read_text(encoding="utf-8")
    assert "const isDualRights = ruleOutcomes.length >= 2;" in source
    assert "${\n              isDualRights\n" in source or "isDualRights\n" in source
    assert "!isDualRights && ruleOutcomes.length > 0" in source
    assert 'selectedItem.category !== "MUSIC" && ruleOutcomes.length > 0' not in source


def test_dual_rights_heading_is_only_called_music_for_music() -> None:
    """A non-music item with two rights must not be labelled a music analysis."""
    source = WORKSPACE.read_text(encoding="utf-8")
    assert "dualRightsHeading" in source
    assert 'Independent Rights Analysis' in source


def test_music_item_in_the_fixture_carries_two_rule_outcomes() -> None:
    """The side-by-side view is only meaningful if the data really splits."""
    report = _mock_literal("MOCK_REPORT")
    music = [
        f
        for f in report["findings"]
        if next(i for i in report["items"] if i["item_id"] == f["item_id"])["category"]
        == "MUSIC"
    ]
    assert music, "fixture has no music item"
    outcomes = music[0]["rule_outcomes"]
    assert len(outcomes) == 2
    rule_ids = {o["rule_id"] for o in outcomes}
    assert "US_SOUND_RECORDING_MMA" in rule_ids
    assert len({o["outcome"] for o in outcomes}) == 2, "the two rights should diverge"


# ---------------------------------------------------------------------------
# Fixture integrity
# ---------------------------------------------------------------------------


def test_every_fixture_claim_citation_resolves() -> None:
    """A dangling citation would render as a dead chip in the demo."""
    report = _mock_literal("MOCK_REPORT")
    evidence_ids = set(report["evidence_store"])
    for finding in report["findings"]:
        rule_ids = {o["rule_id"] for o in finding["rule_outcomes"]}
        for claim in finding["claims"]:
            for eid in claim["evidence_ids"]:
                assert eid in evidence_ids, f"dangling evidence id {eid}"
            for rid in claim["rule_ids"]:
                assert rid in rule_ids, f"dangling rule id {rid}"


def test_every_fixture_finding_has_a_matching_item() -> None:
    """The workspace joins findings to items; an orphan would render blank."""
    report = _mock_literal("MOCK_REPORT")
    item_ids = {i["item_id"] for i in report["items"]}
    assert all(f["item_id"] in item_ids for f in report["findings"])


def test_fixture_covers_all_seven_categories() -> None:
    """The demo is the presentation surface, so it must exercise every path."""
    report = _mock_literal("MOCK_REPORT")
    categories = {i["category"] for i in report["items"]}
    assert categories == {
        "BRAND_TRADEMARK", "MUSIC", "REAL_PERSON", "REAL_LOCATION_BUSINESS",
        "PUBLISHED_WORK", "NAME_COLLISION", "LOGO_PROP",
    }, f"missing: {categories}"


# ---------------------------------------------------------------------------
# Bug 6: a failed run rendered as an empty, apparently-clean report
# ---------------------------------------------------------------------------


def test_workspace_distinguishes_a_failed_run_from_a_clean_script() -> None:
    """An empty item list must never read as "nothing needs clearing".

    A live upload whose extraction failed rendered as "0 items - 0/0 decided" and
    "No items match the current filters", with the backend's explicit
    "This is a pipeline failure, not a clean script" message never shown. That is
    the worst false negative this product can produce.
    """
    source = WORKSPACE.read_text(encoding="utf-8")
    assert "pipelineFailed" in source
    assert 'currentReport.pipeline_state === "FAILED"' in source
    assert "runUnusable" in source
    assert "not a clean script" in source
    assert "currentReport.error" in source, "the backend's error must be surfaced"


def test_a_zero_item_completed_run_is_also_treated_as_unusable() -> None:
    """Belt and braces: zero items from a script that parsed is a broken review."""
    source = WORKSPACE.read_text(encoding="utf-8")
    assert "emptyButParsed" in source
    assert "scene_count" in source


def test_export_is_not_offered_for_an_unusable_run() -> None:
    """`isAllDecided` was true for 0 of 0 items, lighting up the export button.

    The backend refuses with 425, so the UI was inviting a request it knew would
    fail while implying the log was ready.
    """
    source = WORKSPACE.read_text(encoding="utf-8")
    assert "const isAllDecided = pendingCount === 0 && totalCount > 0 && !runUnusable;" in source
    assert 'runUnusable ? "disabled" : ""' in source


def test_failed_run_offers_the_trace_for_diagnosis() -> None:
    """The trace is where the safety-blocked or failed chunk is visible."""
    source = WORKSPACE.read_text(encoding="utf-8")
    assert "wsViewTrace" in source
    assert 'view: "trace"' in source
