"""FastAPI application exposing the ClearFrame pipeline.

Run it with, and only with::

    PYTHONPATH=src uvicorn clearframe.api.main:app --port 8080

Importing this module as ``src.clearframe.api.main`` also works if ``src`` is on
the path, but it must not be done: Python would then hold two distinct copies of
every ``clearframe`` module, and because ``get_settings()`` is LRU-cached each
copy would carry its own settings and its own report store. The Dockerfile and
the README both use the form above.

The review gate is the load-bearing rule here. ``POST /api/reports/{id}/export``
returns **409 Conflict** while any item is still ``PENDING``. That is enforced in
the backend, not by disabling a button in the UI: a clearance log that leaves the
building without a human having looked at every item is exactly the failure this
product exists to prevent, and a frontend is not a trustworthy place to enforce
it.
"""

from __future__ import annotations

import asyncio
import logging
import shutil
import tempfile
from pathlib import Path
from typing import Any, Optional

from fastapi import BackgroundTasks, FastAPI, HTTPException, Response, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, PlainTextResponse
from pydantic import BaseModel, ConfigDict, Field

from clearframe.agents.orchestrator import run_pipeline
from clearframe.audit.logger import AuditLogger
from clearframe.config import get_settings
from clearframe.export.report import render_markdown, render_summary_text
from clearframe.models import (
    AuditEntry,
    ClearanceReport,
    HealthResponse,
    ReportStatus,
    ReviewDecision,
    ReviewDecisionRequest,
    ReviewState,
    ScriptUploadResponse,
    utcnow,
)

logger = logging.getLogger(__name__)

ALLOWED_SUFFIXES = {".pdf", ".txt", ".fountain"}
MAX_UPLOAD_BYTES = 25 * 1024 * 1024

app = FastAPI(
    title="ClearFrame",
    version=get_settings().app_version,
    description=(
        "Script clearance research and triage. Surfaces sourced evidence and "
        "organises reviewer workload. Does not provide legal advice and never "
        "marks an item as cleared."
    ),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store. A single Cloud Run instance serves one production's review
# session; swapping this for Firestore is a store-interface change only.
REPORTS: dict[str, ClearanceReport] = {}
AUDITS: dict[str, AuditLogger] = {}


class PendingItemsError(BaseModel):
    """Body returned by the export endpoint when review is incomplete."""

    model_config = ConfigDict(extra="forbid")

    detail: str
    pending_count: int
    total_items: int
    pending_item_ids: list[str]
    pending_items: list[dict[str, Any]]


class TraceResponse(BaseModel):
    """Audit trail for one report."""

    model_config = ConfigDict(extra="forbid")

    report_id: str
    entries: list[AuditEntry]
    totals: dict[str, Any]


class ExportResponse(BaseModel):
    """Result of a successful export."""

    model_config = ConfigDict(extra="forbid")

    report_id: str
    format: str
    filename: str
    markdown: str
    summary: str
    escalate_count: int
    generated_at: Any = Field(default_factory=utcnow)


def _get_report(report_id: str) -> ClearanceReport:
    """Fetch a report or raise 404.

    Args:
        report_id: The report identifier.

    Returns:
        The report.

    Raises:
        HTTPException: 404 if no such report exists.
    """
    report = REPORTS.get(report_id)
    if report is None:
        raise HTTPException(status_code=404, detail=f"report {report_id!r} not found")
    return report


async def _process(report_id: str, script_path: Path) -> None:
    """Run the pipeline for an uploaded script and store the result.

    Args:
        report_id: The pre-allocated report id.
        script_path: Temporary path of the uploaded script.
    """
    settings = get_settings()
    audit = AUDITS[report_id]
    # Publish RUNNING on the stub immediately. run_pipeline builds its own
    # report and only returns it at the end, so without this the polling client
    # sees QUEUED for the entire run and cannot distinguish it from a stuck job.
    REPORTS[report_id].pipeline_state = "RUNNING"
    REPORTS[report_id].updated_at = utcnow()
    try:
        report = await run_pipeline(script_path, settings=settings, audit=audit)
        report.report_id = report_id
        REPORTS[report_id] = report
    except Exception as exc:  # noqa: BLE001 - surfaced on the report
        logger.exception("pipeline failed for %s", report_id)
        stub = REPORTS[report_id]
        stub.pipeline_state = "FAILED"
        stub.error = f"{type(exc).__name__}: {exc}"
    finally:
        shutil.rmtree(script_path.parent, ignore_errors=True)


@app.get("/api/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    """Report service health and which integrations are configured.

    Returns:
        A :class:`~clearframe.models.HealthResponse`.
    """
    settings = get_settings()
    return HealthResponse(
        status="ok",
        version=settings.app_version,
        gemini_configured=settings.gemini_configured,
        parallel_configured=settings.parallel_configured,
    )


@app.post("/api/scripts", response_model=ScriptUploadResponse, status_code=202)
async def upload_script(
    background: BackgroundTasks, file: UploadFile
) -> ScriptUploadResponse:
    """Accept a screenplay and start the clearance pipeline.

    Args:
        background: FastAPI background task runner.
        file: The uploaded ``.pdf``, ``.txt`` or ``.fountain`` screenplay.

    Returns:
        The allocated report id and initial pipeline state.

    Raises:
        HTTPException: 400 for an unsupported or empty file, 413 if too large.
    """
    filename = file.filename or "script.txt"
    suffix = Path(filename).suffix.lower()
    if suffix not in ALLOWED_SUFFIXES:
        raise HTTPException(
            status_code=400,
            detail=f"unsupported file type {suffix!r}; use {sorted(ALLOWED_SUFFIXES)}",
        )

    payload = await file.read()
    if not payload:
        raise HTTPException(status_code=400, detail="uploaded file is empty")
    if len(payload) > MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"file exceeds {MAX_UPLOAD_BYTES // (1024 * 1024)} MB limit",
        )

    tmp_dir = Path(tempfile.mkdtemp(prefix="clearframe_"))
    script_path = tmp_dir / filename
    script_path.write_bytes(payload)

    report = ClearanceReport(
        script_name=Path(filename).stem.replace("_", " ").title(),
        pipeline_state="QUEUED",
    )
    REPORTS[report.report_id] = report
    AUDITS[report.report_id] = AuditLogger(
        report_id=report.report_id, log_dir=get_settings().audit_log_dir, echo=False
    )
    report.audit_log = AUDITS[report.report_id].entries

    background.add_task(_process, report.report_id, script_path)

    return ScriptUploadResponse(
        report_id=report.report_id,
        script_name=report.script_name,
        pipeline_state=report.pipeline_state,
        message=(
            "Script accepted. Poll GET /api/reports/{report_id} until "
            "pipeline_state is COMPLETE."
        ),
    )


@app.get("/api/reports", response_model=list[dict])
async def list_reports() -> list[dict]:
    """List every report held by this instance.

    Returns:
        Compact descriptors, newest first.
    """
    return [
        {
            "report_id": r.report_id,
            "script_name": r.script_name,
            "pipeline_state": r.pipeline_state,
            "status": r.status.value,
            "items": len(r.items),
            "tier_counts": r.tier_counts(),
            "pending": len(r.pending_item_ids()),
            "created_at": r.created_at.isoformat(),
        }
        for r in sorted(REPORTS.values(), key=lambda r: r.created_at, reverse=True)
    ]


@app.get("/api/reports/{report_id}", response_model=ClearanceReport)
async def get_report(report_id: str) -> ClearanceReport:
    """Return a full report, including findings, evidence and review states.

    Args:
        report_id: The report identifier.

    Returns:
        The complete :class:`~clearframe.models.ClearanceReport`.
    """
    return _get_report(report_id)


@app.get("/api/reports/{report_id}/trace", response_model=TraceResponse)
async def get_trace(report_id: str) -> TraceResponse:
    """Return the structured audit trail for a report.

    Args:
        report_id: The report identifier.

    Returns:
        Every pipeline step with timing and cost, plus run totals.
    """
    report = _get_report(report_id)
    audit = AUDITS.get(report_id)
    entries = audit.entries if audit else report.audit_log
    totals = (
        audit.totals()
        if audit
        else {"entries": len(entries), "warnings": 0, "errors": 0}
    )
    return TraceResponse(report_id=report_id, entries=entries, totals=totals)


@app.patch("/api/reports/{report_id}/items/{item_id}", response_model=ReviewState)
async def set_review_decision(
    report_id: str, item_id: str, body: ReviewDecisionRequest
) -> ReviewState:
    """Record a reviewer's decision on one item.

    Args:
        report_id: The report identifier.
        item_id: The item being decided.
        body: The decision and optional reviewer note.

    Returns:
        The stored :class:`~clearframe.models.ReviewState`.

    Raises:
        HTTPException: 404 if the report or item does not exist.
    """
    report = _get_report(report_id)
    if report.item_by_id(item_id) is None:
        raise HTTPException(
            status_code=404, detail=f"item {item_id!r} not in report {report_id!r}"
        )

    state = ReviewState(
        item_id=item_id,
        decision=body.decision,
        reviewer_note=body.reviewer_note,
        reviewer=body.reviewer,
        decided_at=utcnow() if body.decision is not ReviewDecision.PENDING else None,
    )
    report.review_states[item_id] = state
    report.updated_at = utcnow()

    audit = AUDITS.get(report_id)
    if audit:
        from clearframe.models import PipelineStage

        audit.record(
            stage=PipelineStage.REVIEW,
            tool="api.set_review_decision",
            input_summary=f"{item_id} -> {body.decision.value}",
            output_summary=(
                f"{len(report.pending_item_ids())} of {len(report.items)} items "
                f"still pending"
            ),
            item_id=item_id,
            decision=body.decision.value,
            reviewer=body.reviewer,
        )
    return state


@app.post("/api/reports/{report_id}/export", response_model=ExportResponse)
async def export_report(report_id: str, format: str = "markdown") -> Response:
    """Export the clearance log, refusing while any item is unreviewed.

    Args:
        report_id: The report identifier.
        format: ``markdown`` for a JSON envelope, or ``raw`` for the document
            as ``text/markdown``.

    Returns:
        The exported log.

    Raises:
        HTTPException: 409 if any item is still ``PENDING``, 404 if the report
            does not exist, 425 if the pipeline has not finished.
    """
    report = _get_report(report_id)

    if report.pipeline_state != "COMPLETE":
        raise HTTPException(
            status_code=425,
            detail=(
                f"pipeline is {report.pipeline_state}; export is only available "
                f"once processing is COMPLETE"
            ),
        )

    pending = report.pending_item_ids()
    if pending:
        # Hard backend rule. Not a disabled button.
        payload = PendingItemsError(
            detail=(
                f"{len(pending)} of {len(report.items)} items have no reviewer "
                f"decision. Every item must be Confirmed, Rejected or Escalated "
                f"before this log can be exported."
            ),
            pending_count=len(pending),
            total_items=len(report.items),
            pending_item_ids=pending,
            pending_items=[
                {
                    "item_id": i.item_id,
                    "mention_text": i.mention_text,
                    "category": i.category.value,
                    "tier": (f.tier.value if (f := report.finding_by_id(i.item_id)) else None),
                    "pages": i.page_numbers,
                }
                for i in report.items
                if i.item_id in set(pending)
            ],
        )
        return JSONResponse(status_code=409, content=payload.model_dump(mode="json"))

    markdown = render_markdown(report)
    report.status = ReportStatus.SIGNED_OFF
    report.updated_at = utcnow()

    audit = AUDITS.get(report_id)
    if audit:
        from clearframe.models import PipelineStage

        audit.record(
            stage=PipelineStage.EXPORT,
            tool="api.export_report",
            input_summary=f"{report_id} ({len(report.items)} items, all reviewed)",
            output_summary=f"exported {len(markdown)} chars of markdown",
            format=format,
        )

    filename = f"clearance-log-{report.script_name.replace(' ', '-').lower()}.md"
    if format == "raw":
        return PlainTextResponse(
            markdown,
            media_type="text/markdown",
            headers={"Content-Disposition": f'attachment; filename="{filename}"'},
        )

    from clearframe.models import Tier

    return JSONResponse(
        content=ExportResponse(
            report_id=report_id,
            format="markdown",
            filename=filename,
            markdown=markdown,
            summary=render_summary_text(report),
            escalate_count=sum(1 for f in report.findings if f.tier is Tier.ESCALATE),
        ).model_dump(mode="json")
    )


def _mount_frontend() -> None:
    """Serve the reference UI at /ui when the frontend directory is present.

    The bundled UI is a fallback so the project is demoable even if the main
    frontend is not ready. It is optional: a missing directory is not an error.
    """
    from fastapi.staticfiles import StaticFiles

    frontend = Path(__file__).resolve().parents[3] / "frontend"
    if frontend.is_dir():
        app.mount("/ui", StaticFiles(directory=str(frontend), html=True), name="ui")
        logger.info("reference UI mounted at /ui from %s", frontend)


_mount_frontend()


@app.get("/")
async def root() -> dict[str, Any]:
    """Return service metadata and the positioning statement.

    Returns:
        A small descriptor including the non-advice disclaimer.
    """
    settings = get_settings()
    return {
        "service": "ClearFrame",
        "version": settings.app_version,
        "docs": "/docs",
        "disclaimer": (
            "Research output for review by qualified counsel. Not legal advice. "
            "ClearFrame never marks an item as cleared."
        ),
        "endpoints": [
            "POST   /api/scripts",
            "GET    /api/reports",
            "GET    /api/reports/{id}",
            "GET    /api/reports/{id}/trace",
            "PATCH  /api/reports/{id}/items/{item_id}",
            "POST   /api/reports/{id}/export",
            "GET    /api/health",
        ],
    }
