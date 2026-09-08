#!/usr/bin/env python3
"""Regenerate ``frontend/js/mock_data.js`` from a real pipeline report.

The frontend ships pre-baked data so the dashboard, review workspace and demo
tour work offline and during a presentation when API keys are unavailable. That
fixture drifts from reality the moment the pipeline changes, and a demo showing
stale numbers is worse than one showing none, so it is generated rather than
hand-maintained.

The three exports mirror the API exactly:

===================  ==========================================
``MOCK_REPORT``      ``GET /api/reports/{id}``
``MOCK_TRACE``       ``GET /api/reports/{id}/trace``
``MOCK_REPORTS``     ``GET /api/reports`` (dashboard list view)
===================  ==========================================

Usage::

    python scripts/generate_mock_data.py
    python scripts/generate_mock_data.py --report path/to/report.json
    python scripts/generate_mock_data.py --check    # CI: fail if stale
"""

from __future__ import annotations

import argparse
import collections
import json
import sys
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "src"))

DEFAULT_REPORT = REPO_ROOT / "output" / "report.json"
TARGET = REPO_ROOT / "frontend" / "js" / "mock_data.js"

TIERS = ("CLEAR_ON_RECORD", "NEEDS_VERIFICATION", "ESCALATE")


def build_trace(report: dict[str, Any]) -> dict[str, Any]:
    """Rebuild the trace payload the API's ``/trace`` route returns.

    Args:
        report: The serialised report, including its ``audit_log``.

    Returns:
        A dict shaped like ``TraceResponse``.
    """
    audit = report.get("audit_log") or []
    return {
        "report_id": report["report_id"],
        "entries": audit,
        "totals": {
            "entries": len(audit),
            "warnings": sum(1 for e in audit if e["level"] == "WARNING"),
            "errors": sum(1 for e in audit if e["level"] == "ERROR"),
            "safety_blocks": sum(
                1 for e in audit if (e.get("detail") or {}).get("safety_blocked")
            ),
            "total_latency_ms": round(sum(e.get("latency_ms") or 0 for e in audit), 1),
            "total_tokens": sum(e.get("token_cost") or 0 for e in audit),
            "total_parallel_tasks": sum(e.get("task_cost") or 0 for e in audit),
        },
    }


def build_listing(report: dict[str, Any]) -> list[dict[str, Any]]:
    """Build the dashboard list row the ``GET /api/reports`` route returns.

    Args:
        report: The serialised report.

    Returns:
        A one-element list matching the list endpoint's row shape.
    """
    tier_counts = collections.Counter(f["tier"] for f in report["findings"])
    states = report.get("review_states") or {}
    return [
        {
            "report_id": report["report_id"],
            "script_name": report["script_name"],
            "pipeline_state": report["pipeline_state"],
            "status": report["status"],
            "items": len(report["items"]),
            "tier_counts": {t: tier_counts.get(t, 0) for t in TIERS},
            "pending": sum(
                1
                for i in report["items"]
                if (states.get(i["item_id"]) or {}).get("decision", "PENDING") == "PENDING"
            ),
            "created_at": report["created_at"],
        }
    ]


DEMO_ID_PREFIX = "rpt_demo_"


def to_demo_report(report: dict[str, Any]) -> dict[str, Any]:
    """Return a copy of the report re-identified as the offline demo fixture.

    The fixture is generated from a real run, so it would otherwise carry a real
    report id. The frontend used to treat "id equals the fixture's id" as "this
    is the demo", which meant a live report sharing that id was silently served
    from the fixture: decisions appeared to save but no PATCH was sent and export
    never reached the backend's 409 gate.

    Re-identifying the fixture with a reserved ``rpt_demo_`` prefix — which
    :func:`clearframe.models._new_id` cannot generate — makes the demo
    self-identifying and the collision impossible.

    Args:
        report: The serialised real report.

    Returns:
        A copy whose ``report_id`` is the reserved demo id.
    """
    import copy

    demo = copy.deepcopy(report)
    slug = "".join(
        c if c.isalnum() else "_" for c in demo["script_name"].lower()
    ).strip("_")
    demo["report_id"] = f"{DEMO_ID_PREFIX}{slug}"
    for entry in demo.get("audit_log") or []:
        if entry.get("report_id"):
            entry["report_id"] = demo["report_id"]
    return demo


def render(report: dict[str, Any]) -> str:
    """Render the complete mock_data.js module.

    Args:
        report: The serialised report to bake in.

    Returns:
        The JavaScript module source.
    """
    tier_counts = collections.Counter(f["tier"] for f in report["findings"])
    categories = collections.Counter(i["category"] for i in report["items"])
    header = f'''/**
 * Pre-baked sample report and trace data for "{report["script_name"]}".
 *
 * GENERATED — do not hand-edit. Regenerate after a pipeline run with:
 *   python scripts/generate_mock_data.py
 *
 * Source run : {report["report_id"]} ({report["pipeline_state"]})
 * Script     : {report["scene_count"]} scenes / {report["page_count"]} pages
 * Items      : {len(report["items"])}   Evidence: {len(report["evidence_store"])}   Findings: {len(report["findings"])}
 * Tiers      : {dict(tier_counts)}
 * Categories : {dict(categories)}
 *
 * Shapes match the API exactly:
 *   MOCK_REPORT   <- GET /api/reports/{{id}}
 *   MOCK_TRACE    <- GET /api/reports/{{id}}/trace
 *   MOCK_REPORTS  <- GET /api/reports          (dashboard list view)
 *
 * Enables offline demo and presentation when live API keys are unavailable.
 */

'''
    return (
        header
        + "export const MOCK_REPORT = "
        + json.dumps(report, indent=2)
        + ";\n\nexport const MOCK_TRACE = "
        + json.dumps(build_trace(report), indent=2)
        + ";\n\nexport const MOCK_REPORTS = "
        + json.dumps(build_listing(report), indent=2)
        + ";\n"
    )


def main() -> int:
    """Entry point.

    Returns:
        0 on success; 1 if ``--check`` found the fixture stale or the report
        is unusable.
    """
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--report", type=Path, default=DEFAULT_REPORT)
    parser.add_argument("--target", type=Path, default=TARGET)
    parser.add_argument(
        "--check",
        action="store_true",
        help="do not write; exit non-zero if the fixture is out of date",
    )
    args = parser.parse_args()

    if not args.report.exists():
        print(f"report not found at {args.report}", file=sys.stderr)
        print("Run the pipeline first, or pass --report.", file=sys.stderr)
        return 1

    report = json.loads(args.report.read_text(encoding="utf-8"))
    source_id = report.get("report_id")

    if report.get("pipeline_state") != "COMPLETE":
        print(
            f"refusing to bake a {report.get('pipeline_state')} report into the demo "
            f"fixture: {report.get('error')}",
            file=sys.stderr,
        )
        return 1
    if not report.get("items"):
        print("refusing to bake a report with zero items", file=sys.stderr)
        return 1

    report = to_demo_report(report)
    rendered = render(report)

    if args.check:
        current = args.target.read_text(encoding="utf-8") if args.target.exists() else ""
        if current == rendered:
            print(f"{args.target.name} is up to date")
            return 0
        print(
            f"{args.target.name} is STALE relative to {args.report}.\n"
            f"Regenerate with: python scripts/generate_mock_data.py",
            file=sys.stderr,
        )
        return 1

    args.target.parent.mkdir(parents=True, exist_ok=True)
    args.target.write_text(rendered, encoding="utf-8")

    categories = collections.Counter(i["category"] for i in report["items"])
    print(f"wrote {args.target}")
    print(f"  source run : {source_id}")
    print(f"  demo id    : {report['report_id']}")
    print(f"  items      : {len(report['items'])}")
    print(f"  evidence   : {len(report['evidence_store'])}")
    print(f"  trace      : {len(report.get('audit_log') or [])} entries")
    print(f"  LOGO_PROP  : {categories.get('LOGO_PROP', 0)}")
    print(f"  size       : {len(rendered):,} bytes")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
