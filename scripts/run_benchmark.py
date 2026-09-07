#!/usr/bin/env python3
"""Score a ClearFrame pipeline run against the verified golden set.

Reads ``data/golden_set.json`` — entries independently verified by fresh web
research rather than by re-reading the pipeline's own stored evidence — and
reports extraction recall and precision, evidence-citation accuracy, and
rules-engine accuracy.

The numbers are cited in the demo, so the script is deliberately strict:

- A ``PENDING`` golden entry is never counted as a pass. It is reported
  separately as unscored, because a metric that quietly counts unverified rows
  as successes is worse than no metric.
- An entry the golden set marks ``NOT_AN_ITEM`` counts as a false positive when
  the pipeline extracts it. Recall alone would reward over-flagging.
- Rules accuracy compares the computed public-domain year against the
  independently verified year, not against the pipeline's own explanation.

Usage::

    python scripts/run_benchmark.py                    # score the stored report
    python scripts/run_benchmark.py --report out.json  # score a specific run
    python scripts/run_benchmark.py --run              # run the pipeline first
    python scripts/run_benchmark.py --json             # machine-readable output
"""

from __future__ import annotations

import argparse
import asyncio
import json
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Optional

REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "src"))

from clearframe.models import ClearanceReport, normalize_name  # noqa: E402

GOLDEN_PATH = REPO_ROOT / "data" / "golden_set.json"
DEFAULT_SCRIPT = REPO_ROOT / "data" / "scripts" / "the_last_good_year.pdf"


@dataclass
class Row:
    """One scored golden-set entry."""

    item: str
    category: str
    verdict: str
    extracted: bool
    tier_expected: Optional[str]
    tier_actual: Optional[str]
    cited: Optional[bool]
    rule_expected: Optional[int]
    rule_actual: Optional[int]
    notes: str = ""


@dataclass
class Metrics:
    """Aggregate benchmark results."""

    scored: int = 0
    pending: int = 0
    extracted: int = 0
    expected_items: int = 0
    false_positives: int = 0
    with_evidence: int = 0
    citation_ok: int = 0
    citation_total: int = 0
    rules_ok: int = 0
    rules_total: int = 0
    verdicts: dict[str, int] = field(default_factory=dict)
    rows: list[Row] = field(default_factory=list)

    @property
    def recall(self) -> float:
        """Share of real golden items the pipeline extracted."""
        return self.extracted / self.expected_items if self.expected_items else 0.0

    @property
    def precision(self) -> float:
        """Share of extracted golden matches that should have been extracted."""
        total = self.extracted + self.false_positives
        return self.extracted / total if total else 0.0

    @property
    def evidence_coverage(self) -> float:
        """Share of extracted items carrying at least one sourced citation."""
        return self.with_evidence / self.extracted if self.extracted else 0.0

    @property
    def citation_accuracy(self) -> float:
        """Share of findings whose every claim resolves to a real citation."""
        return self.citation_ok / self.citation_total if self.citation_total else 0.0

    @property
    def rules_accuracy(self) -> float:
        """Share of term calculations matching the independently verified year."""
        return self.rules_ok / self.rules_total if self.rules_total else 0.0


def load_golden(path: Path = GOLDEN_PATH) -> dict[str, Any]:
    """Load the golden set.

    Args:
        path: Path to ``golden_set.json``.

    Returns:
        The parsed golden set document.

    Raises:
        SystemExit: If the file is missing.
    """
    if not path.exists():
        sys.exit(f"golden set not found at {path}")
    return json.loads(path.read_text(encoding="utf-8"))


def load_report(path: Path) -> ClearanceReport:
    """Load a stored pipeline report.

    Args:
        path: Path to a serialised :class:`ClearanceReport`.

    Returns:
        The parsed report.

    Raises:
        SystemExit: If the file is missing.
    """
    if not path.exists():
        sys.exit(f"report not found at {path}\nRun with --run to generate one.")
    return ClearanceReport.model_validate_json(path.read_text(encoding="utf-8"))


def _find_item(report: ClearanceReport, name: str):
    """Locate an item in a report by normalised name or surface form.

    Args:
        report: The report to search.
        name: The golden-set item name.

    Returns:
        The matching item, or None.
    """
    key = normalize_name(name)
    for item in report.items:
        candidates = {normalize_name(item.mention_text), normalize_name(item.normalized_name)}
        candidates |= {normalize_name(v) for v in item.variants}
        if key in candidates or any(key in c or c in key for c in candidates if c):
            return item
    return None


def score(golden: dict[str, Any], report: ClearanceReport) -> Metrics:
    """Score a report against the golden set.

    Args:
        golden: The parsed golden set.
        report: The pipeline report to score.

    Returns:
        Populated :class:`Metrics`.
    """
    m = Metrics()

    for entry in golden["entries"]:
        verdict = entry["verdict"]
        m.verdicts[verdict] = m.verdicts.get(verdict, 0) + 1

        if verdict == "PENDING":
            m.pending += 1
            m.rows.append(
                Row(entry["item"], entry["category"], verdict, False, None, None,
                    None, None, None, "not scored - awaiting a pipeline run")
            )
            continue

        m.scored += 1
        expected_category = entry.get("expected_category", entry["category"])
        should_exist = expected_category != "NOT_AN_ITEM"
        item = _find_item(report, entry["normalized_name"])
        finding = report.finding_by_id(item.item_id) if item else None

        if not should_exist:
            # A known false positive: extracting it is the error.
            if item is not None:
                m.false_positives += 1
            m.rows.append(
                Row(entry["item"], "NOT_AN_ITEM", verdict, item is not None, "not extracted",
                    finding.tier.value if finding else None, None, None, None,
                    "false positive" if item else "correctly absent")
            )
            continue

        m.expected_items += 1
        if item is None:
            m.rows.append(
                Row(entry["item"], entry["category"], verdict, False, None, None,
                    None, None, None, "MISSED - not extracted")
            )
            continue

        m.extracted += 1
        evidence = report.evidence_for_item(item.item_id)
        if evidence:
            m.with_evidence += 1

        cited: Optional[bool] = None
        if finding is not None:
            m.citation_total += 1
            valid = set(report.evidence_store)
            rule_ids = {o.rule_id for o in finding.rule_outcomes}
            claims = finding.claims
            cited = bool(claims) and all(
                (set(c.evidence_ids) & valid) or (set(c.rule_ids) & rule_ids) for c in claims
            )
            if cited:
                m.citation_ok += 1

        # Rules accuracy: compare against the independently verified year.
        checks = entry.get("checks", {})
        expected_year = None
        actual_year = None
        for key in ("pd_year", "composition_pd_year"):
            if isinstance(checks.get(key), int):
                expected_year = checks[key]
                break
        if expected_year is not None and finding is not None:
            m.rules_total += 1
            years = [o.public_domain_year for o in finding.rule_outcomes if o.public_domain_year]
            actual_year = years[0] if years else None
            if actual_year == expected_year:
                m.rules_ok += 1
        # The music entry carries a second right; score it too.
        if isinstance(checks.get("recording_pd_year"), int) and finding is not None:
            m.rules_total += 1
            rec = [
                o.public_domain_year
                for o in finding.rule_outcomes
                if "SOUND_RECORDING" in o.rule_id and o.public_domain_year
            ]
            if rec and rec[0] == checks["recording_pd_year"]:
                m.rules_ok += 1

        m.rows.append(
            Row(entry["item"], entry["category"], verdict, True,
                checks.get("tier"), finding.tier.value if finding else None,
                cited, expected_year, actual_year, entry.get("note", "")[:60])
        )
    return m


def render(m: Metrics, golden: dict[str, Any], report: ClearanceReport) -> str:
    """Render the benchmark result as a printable table.

    Args:
        m: The computed metrics.
        golden: The golden set, for provenance lines.
        report: The scored report.

    Returns:
        The formatted report text.
    """
    W = 104
    out = [
        "=" * W,
        "ClearFrame benchmark — pipeline run vs independently verified golden set",
        "=" * W,
        f"script          : {golden['script']}",
        f"report          : {report.report_id}  ({report.pipeline_state})",
        f"golden entries  : {len(golden['entries'])}  "
        f"({m.scored} scored, {m.pending} pending)",
        "",
        f"{'ITEM':<30} {'CATEGORY':<24} {'VERDICT':<9} {'EXTRACTED':<10} {'CITED':<6} {'PD YEAR'}",
        "-" * W,
    ]
    for r in m.rows:
        pd = "—"
        if r.rule_expected is not None:
            pd = f"{r.rule_actual}/{r.rule_expected}"
            pd += " OK" if r.rule_actual == r.rule_expected else " XX"
        out.append(
            f"{r.item[:29]:<30} {r.category[:23]:<24} {r.verdict:<9} "
            f"{('yes' if r.extracted else 'NO'):<10} "
            f"{('yes' if r.cited else ('no' if r.cited is False else '—')):<6} {pd}"
        )

    out += [
        "-" * W,
        "",
        "METRICS",
        "-" * W,
        f"{'Extraction recall':<38} {m.recall:>7.1%}   "
        f"({m.extracted}/{m.expected_items} golden items extracted)",
        f"{'Extraction precision':<38} {m.precision:>7.1%}   "
        f"({m.false_positives} known false positive(s) extracted)",
        f"{'Evidence coverage':<38} {m.evidence_coverage:>7.1%}   "
        f"({m.with_evidence}/{m.extracted} items with >=1 sourced citation)",
        f"{'Evidence-citation accuracy':<38} {m.citation_accuracy:>7.1%}   "
        f"({m.citation_ok}/{m.citation_total} findings where every claim resolves)",
        f"{'Rules-engine accuracy':<38} {m.rules_accuracy:>7.1%}   "
        f"({m.rules_ok}/{m.rules_total} term calculations match verified year)",
        "",
        "VERDICT BREAKDOWN (independent verification)",
        "-" * W,
    ]
    for verdict in ("MATCH", "PARTIAL", "MISMATCH", "PENDING"):
        count = m.verdicts.get(verdict, 0)
        if count:
            out.append(f"  {verdict:<10} {count}")
    out += [
        "",
        "PROVENANCE",
        "-" * W,
        "  " + golden["verification_method"].replace(". ", ".\n  "),
        "",
        "  " + golden["honesty_note"].replace(". ", ".\n  "),
        "=" * W,
    ]
    return "\n".join(out)


async def _run_pipeline(script: Path) -> ClearanceReport:
    """Run the pipeline fresh for benchmarking.

    Args:
        script: Path to the screenplay.

    Returns:
        The completed report.
    """
    from clearframe.agents.orchestrator import run_pipeline

    return await run_pipeline(script)


def main() -> int:
    """Entry point.

    Returns:
        Process exit code: 0 on success, 1 if the report is unusable.
    """
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--golden", type=Path, default=GOLDEN_PATH)
    parser.add_argument("--report", type=Path, default=REPO_ROOT / "output" / "report.json")
    parser.add_argument("--script", type=Path, default=DEFAULT_SCRIPT)
    parser.add_argument("--run", action="store_true", help="run the pipeline before scoring")
    parser.add_argument("--json", action="store_true", help="emit machine-readable JSON")
    args = parser.parse_args()

    golden = load_golden(args.golden)

    if args.run:
        report = asyncio.run(_run_pipeline(args.script))
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(report.model_dump_json(indent=2), encoding="utf-8")
        print(f"wrote {args.report}")
    else:
        report = load_report(args.report)

    if report.pipeline_state != "COMPLETE":
        print(
            f"WARNING: report state is {report.pipeline_state}"
            f"{': ' + report.error if report.error else ''}",
            file=sys.stderr,
        )

    m = score(golden, report)

    if args.json:
        print(json.dumps({
            "report_id": report.report_id,
            "recall": round(m.recall, 4),
            "precision": round(m.precision, 4),
            "evidence_coverage": round(m.evidence_coverage, 4),
            "citation_accuracy": round(m.citation_accuracy, 4),
            "rules_accuracy": round(m.rules_accuracy, 4),
            "scored": m.scored,
            "pending": m.pending,
            "verdicts": m.verdicts,
        }, indent=2))
    else:
        print(render(m, golden, report))

    return 0 if report.items else 1


if __name__ == "__main__":
    raise SystemExit(main())
