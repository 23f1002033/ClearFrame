"""QA-only launcher: serves the real app with the verified report pre-seeded.

Test scaffolding, not shipped code. It imports the unmodified app and populates
the in-memory store so the browser exercises genuine API paths (PATCH, 409, 200)
against real data without spending a pipeline run.
"""
import json, sys, pathlib
sys.path.insert(0, "src")
from clearframe.api import main as api
from clearframe.audit.logger import AuditLogger
from clearframe.models import ClearanceReport

report = ClearanceReport.model_validate_json(pathlib.Path("output/report.json").read_text())
api.REPORTS[report.report_id] = report
audit = AuditLogger(report_id=report.report_id, echo=False)
audit.entries.extend(report.audit_log)
api.AUDITS[report.report_id] = audit
print(f"seeded {report.report_id}: {len(report.items)} items, {len(report.evidence_store)} evidence", flush=True)

import uvicorn
uvicorn.run(api.app, host="127.0.0.1", port=8081, log_level="warning")
