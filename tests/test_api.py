"""Tests for the FastAPI layer.

The 409 review gate is the test that matters most: the export must be refused
server-side while any item lacks a reviewer decision, regardless of what the UI
does.
"""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from clearframe.api import main as api
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


@pytest.fixture
def client() -> TestClient:
    """Return a test client over a clean report store."""
    api.REPORTS.clear()
    api.AUDITS.clear()
    return TestClient(api.app)


def _item(name: str, category: ItemCategory = ItemCategory.BRAND_TRADEMARK) -> ExtractedItem:
    """Build an item for API tests."""
    return ExtractedItem(
        mention_text=name,
        normalized_name=name,
        category=category,
        occurrences=[
            Occurrence(
                scene_number=1,
                page_number=3,
                context_snippet=f"...{name}...",
                on_screen=True,
                depiction_nature=DepictionNature.NEUTRAL,
            )
        ],
    )


def _seed(items: int = 3, complete: bool = True) -> ClearanceReport:
    """Create and register a finished report with the given number of items."""
    report = ClearanceReport(
        script_name="Test Script",
        pipeline_state="COMPLETE" if complete else "RUNNING",
        page_count=6,
        scene_count=14,
    )
    for index in range(items):
        item = _item(f"Brand{index}")
        report.items.append(item)
        report.review_states[item.item_id] = ReviewState(item_id=item.item_id)
        evidence = Evidence(
            item_id=item.item_id,
            source_url=f"https://example.com/{index}",
            source_title=f"Source {index}",
            snippet="a sourced fact",
            relevance_note="registrant",
        )
        report.evidence_store[evidence.evidence_id] = evidence
        report.findings.append(
            Finding(
                item_id=item.item_id,
                tier=Tier.ESCALATE if index == 0 else Tier.NEEDS_VERIFICATION,
                rationale=f"The mark is registered [{evidence.evidence_id}].",
                evidence_ids=[evidence.evidence_id],
                rule_outcomes=[
                    RuleOutcome(
                        rule_id="TRADEMARK_NO_EXPIRY",
                        outcome=RuleOutcomeCode.NOT_APPLICABLE,
                        explanation="no term applies",
                        citation="15 U.S.C. § 1058",
                    )
                ],
                validated=True,
                rights_holder_hint="Acme Corp",
            )
        )
    api.REPORTS[report.report_id] = report
    return report


# ---------------------------------------------------------------------------
# The review gate
# ---------------------------------------------------------------------------


def test_export_returns_409_while_any_item_is_pending(client: TestClient) -> None:
    """The hard backend rule: no export until every item has been reviewed.

    Enforced server-side, not by disabling a button. A clearance log that leaves
    the building without a human having seen every item is the failure this
    product exists to prevent.
    """
    report = _seed(items=3)
    response = client.post(f"/api/reports/{report.report_id}/export")

    assert response.status_code == 409
    body = response.json()
    assert body["pending_count"] == 3
    assert body["total_items"] == 3
    assert len(body["pending_item_ids"]) == 3
    assert "must be Confirmed, Rejected or Escalated" in body["detail"]


def test_409_body_carries_enough_to_render_a_jump_list(client: TestClient) -> None:
    """The UI must not need a second request to show what is outstanding."""
    report = _seed(items=2)
    body = client.post(f"/api/reports/{report.report_id}/export").json()
    entry = body["pending_items"][0]
    assert {"item_id", "mention_text", "category", "tier", "pages"} <= set(entry)
    assert entry["pages"] == [3]


def test_export_still_blocked_when_only_one_item_remains(client: TestClient) -> None:
    """A partially reviewed report is not exportable."""
    report = _seed(items=3)
    for item in report.items[:2]:
        client.patch(
            f"/api/reports/{report.report_id}/items/{item.item_id}",
            json={"decision": "CONFIRMED"},
        )
    response = client.post(f"/api/reports/{report.report_id}/export")
    assert response.status_code == 409
    assert response.json()["pending_count"] == 1


def test_export_succeeds_once_every_item_is_decided(client: TestClient) -> None:
    """With all decisions recorded, the log exports and the report is signed off."""
    report = _seed(items=3)
    for index, item in enumerate(report.items):
        decision = ["CONFIRMED", "REJECTED", "ESCALATED"][index]
        client.patch(
            f"/api/reports/{report.report_id}/items/{item.item_id}",
            json={"decision": decision, "reviewer_note": f"note {index}"},
        )

    response = client.post(f"/api/reports/{report.report_id}/export")
    assert response.status_code == 200
    body = response.json()
    assert "Clearance research log" in body["markdown"]
    assert body["escalate_count"] == 1
    assert api.REPORTS[report.report_id].status.value == "SIGNED_OFF"


def test_an_item_with_no_review_state_at_all_blocks_export(client: TestClient) -> None:
    """A missing state counts as pending; absence is not consent."""
    report = _seed(items=2)
    report.review_states.clear()
    assert client.post(f"/api/reports/{report.report_id}/export").status_code == 409


def test_resetting_a_decision_to_pending_re_blocks_export(client: TestClient) -> None:
    """Withdrawing a decision must close the gate again."""
    report = _seed(items=1)
    item_id = report.items[0].item_id
    client.patch(
        f"/api/reports/{report.report_id}/items/{item_id}", json={"decision": "CONFIRMED"}
    )
    assert client.post(f"/api/reports/{report.report_id}/export").status_code == 200

    client.patch(
        f"/api/reports/{report.report_id}/items/{item_id}", json={"decision": "PENDING"}
    )
    assert client.post(f"/api/reports/{report.report_id}/export").status_code == 409


def test_export_before_the_pipeline_finishes_returns_425(client: TestClient) -> None:
    """An unfinished report cannot be exported even with no items to review."""
    report = _seed(items=0, complete=False)
    response = client.post(f"/api/reports/{report.report_id}/export")
    assert response.status_code == 425
    assert "COMPLETE" in response.json()["detail"]


def test_raw_export_returns_markdown_as_a_download(client: TestClient) -> None:
    """The raw format is a file, for the download button."""
    report = _seed(items=1)
    client.patch(
        f"/api/reports/{report.report_id}/items/{report.items[0].item_id}",
        json={"decision": "CONFIRMED"},
    )
    response = client.post(f"/api/reports/{report.report_id}/export?format=raw")
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/markdown")
    assert "attachment" in response.headers["content-disposition"]


# ---------------------------------------------------------------------------
# Review decisions
# ---------------------------------------------------------------------------


def test_patch_records_decision_note_and_timestamp(client: TestClient) -> None:
    """A decision carries who decided and when, for the exported log."""
    report = _seed(items=1)
    response = client.patch(
        f"/api/reports/{report.report_id}/items/{report.items[0].item_id}",
        json={
            "decision": "CONFIRMED",
            "reviewer_note": "Nominative use.",
            "reviewer": "counsel@example.com",
        },
    )
    body = response.json()
    assert body["decision"] == "CONFIRMED"
    assert body["reviewer_note"] == "Nominative use."
    assert body["decided_at"] is not None


def test_pending_decision_clears_the_timestamp(client: TestClient) -> None:
    """Reverting to PENDING must not leave a stale decision time."""
    report = _seed(items=1)
    url = f"/api/reports/{report.report_id}/items/{report.items[0].item_id}"
    client.patch(url, json={"decision": "CONFIRMED"})
    assert client.patch(url, json={"decision": "PENDING"}).json()["decided_at"] is None


def test_patch_rejects_an_unknown_item(client: TestClient) -> None:
    """A bad item id is a 404, not a silently created review state."""
    report = _seed(items=1)
    response = client.patch(
        f"/api/reports/{report.report_id}/items/item_nope", json={"decision": "CONFIRMED"}
    )
    assert response.status_code == 404


def test_patch_rejects_an_invalid_decision(client: TestClient) -> None:
    """Only the four defined decisions are accepted."""
    report = _seed(items=1)
    response = client.patch(
        f"/api/reports/{report.report_id}/items/{report.items[0].item_id}",
        json={"decision": "CLEARED"},
    )
    assert response.status_code == 422


def test_review_decisions_are_written_to_the_audit_trail(client: TestClient) -> None:
    """Who decided what, and when, is part of the record."""
    report = _seed(items=1)
    api.AUDITS[report.report_id] = __import__(
        "clearframe.audit.logger", fromlist=["AuditLogger"]
    ).AuditLogger(report_id=report.report_id, echo=False)
    client.patch(
        f"/api/reports/{report.report_id}/items/{report.items[0].item_id}",
        json={"decision": "CONFIRMED"},
    )
    trace = client.get(f"/api/reports/{report.report_id}/trace").json()
    assert any(e["stage"] == "REVIEW" for e in trace["entries"])


# ---------------------------------------------------------------------------
# Upload, fetch, trace
# ---------------------------------------------------------------------------


def test_upload_rejects_unsupported_file_types(client: TestClient) -> None:
    """Only screenplay formats are accepted."""
    response = client.post(
        "/api/scripts", files={"file": ("script.docx", b"data", "application/octet-stream")}
    )
    assert response.status_code == 400
    assert "unsupported file type" in response.json()["detail"]


def test_upload_rejects_an_empty_file(client: TestClient) -> None:
    """An empty upload fails fast rather than producing an empty report."""
    response = client.post("/api/scripts", files={"file": ("s.txt", b"", "text/plain")})
    assert response.status_code == 400


def test_missing_report_returns_404(client: TestClient) -> None:
    """Unknown ids are 404 on every report route."""
    assert client.get("/api/reports/rpt_nope").status_code == 404
    assert client.get("/api/reports/rpt_nope/trace").status_code == 404
    assert client.post("/api/reports/rpt_nope/export").status_code == 404


def test_report_round_trips_through_the_api(client: TestClient) -> None:
    """The full report payload keeps the shapes the frontend contract promises."""
    report = _seed(items=2)
    body = client.get(f"/api/reports/{report.report_id}").json()
    assert body["pipeline_state"] == "COMPLETE"
    assert len(body["items"]) == 2
    assert len(body["findings"]) == 2
    assert body["evidence_store"]
    assert body["review_states"]
    first = body["items"][0]
    assert first["occurrences"][0]["page_number"] == 3


def test_health_reports_integration_status(client: TestClient) -> None:
    """Health names which integrations are configured, for a status banner."""
    body = client.get("/api/health").json()
    assert body["status"] == "ok"
    assert "gemini_configured" in body
    assert "parallel_configured" in body


def test_root_exposes_the_canonical_disclaimer(client: TestClient) -> None:
    """The UI takes the disclaimer from the API rather than hardcoding it."""
    body = client.get("/").json()
    assert "Not legal advice" in body["disclaimer"]
    assert "never marks an item as cleared" in body["disclaimer"]


def test_listing_reports_summarises_pending_work(client: TestClient) -> None:
    """The dashboard can show outstanding review counts without a full fetch."""
    _seed(items=3)
    row = client.get("/api/reports").json()[0]
    assert row["items"] == 3
    assert row["pending"] == 3
    assert row["tier_counts"]["ESCALATE"] == 1


def test_openapi_schema_generates(client: TestClient) -> None:
    """The contract doc is generated from this; it must not break."""
    schema = client.get("/openapi.json").json()
    assert "/api/reports/{report_id}/export" in schema["paths"]
    assert "ClearanceReport" in schema["components"]["schemas"]


def test_pipeline_state_advances_to_running_while_work_is_in_flight(
    client: TestClient, monkeypatch: pytest.MonkeyPatch
) -> None:
    """A polling client must be able to tell RUNNING from a stuck QUEUED job.

    run_pipeline builds its own report object and only returns it at the end, so
    the stub in the store has to be advanced explicitly.
    """
    seen: list[str] = []

    async def fake_run_pipeline(path, settings=None, audit=None):
        seen.append(next(iter(api.REPORTS.values())).pipeline_state)
        report = ClearanceReport(script_name="X", pipeline_state="COMPLETE")
        return report

    monkeypatch.setattr(api, "run_pipeline", fake_run_pipeline)
    response = client.post(
        "/api/scripts", files={"file": ("s.txt", b"INT. ROOM - DAY\nAction.", "text/plain")}
    )
    assert response.status_code == 202
    assert seen == ["RUNNING"]
