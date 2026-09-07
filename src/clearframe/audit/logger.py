"""Structured audit trail for the ClearFrame pipeline.

Every pipeline step appends an :class:`~clearframe.models.AuditEntry`: the stage,
the tool invoked, summaries of input and output, latency, and token or task
cost. Entries are held in memory for the report and mirrored to a JSONL file so
a run can be reconstructed after the fact.

The audit trail is also where rule 8 is enforced: content that Gemini declined
to process, chunks that failed, and claims dropped by the citation validator all
land here as explicit entries. A scene that silently disappears is a missed
clearance item, so nothing is allowed to vanish without a record.
"""

from __future__ import annotations

import json
import logging
import threading
import time
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Iterator, Optional

from clearframe.models import AuditEntry, PipelineStage

logger = logging.getLogger(__name__)


class AuditLogger:
    """Collects structured pipeline events for one report.

    Thread-safe and safe to share across the asyncio research fan-out.

    Attributes:
        report_id: The report these entries belong to.
        entries: Entries recorded so far, in order.
    """

    def __init__(
        self,
        report_id: Optional[str] = None,
        log_dir: Optional[Path] = None,
        echo: bool = True,
    ) -> None:
        """Initialise an audit logger.

        Args:
            report_id: Report the entries belong to.
            log_dir: Directory for the JSONL mirror. No file is written if None.
            echo: Whether to also emit entries to the Python logger.
        """
        self.report_id = report_id
        self.entries: list[AuditEntry] = []
        self._lock = threading.Lock()
        self._echo = echo
        self._path: Optional[Path] = None
        if log_dir is not None and report_id is not None:
            log_dir = Path(log_dir)
            log_dir.mkdir(parents=True, exist_ok=True)
            self._path = log_dir / f"{report_id}.jsonl"

    def record(
        self,
        stage: PipelineStage,
        tool: str = "",
        input_summary: str = "",
        output_summary: str = "",
        latency_ms: Optional[float] = None,
        token_cost: Optional[int] = None,
        task_cost: Optional[int] = None,
        level: str = "INFO",
        **detail: Any,
    ) -> AuditEntry:
        """Append one entry to the trail.

        Args:
            stage: Pipeline stage the event belongs to.
            tool: Tool or function invoked.
            input_summary: Short description of the input.
            output_summary: Short description of the result.
            latency_ms: Wall-clock duration in milliseconds.
            token_cost: Gemini tokens consumed, if known.
            task_cost: Parallel tasks consumed, if known.
            level: ``INFO``, ``WARNING`` or ``ERROR``.
            **detail: Arbitrary structured detail retained verbatim.

        Returns:
            The recorded entry.
        """
        entry = AuditEntry(
            report_id=self.report_id,
            stage=stage,
            tool=tool,
            input_summary=input_summary,
            output_summary=output_summary,
            latency_ms=latency_ms,
            token_cost=token_cost,
            task_cost=task_cost,
            level=level,
            detail=detail,
        )
        with self._lock:
            self.entries.append(entry)
            if self._path is not None:
                try:
                    with self._path.open("a", encoding="utf-8") as fh:
                        fh.write(entry.model_dump_json() + "\n")
                except OSError as exc:  # never let audit IO break the pipeline
                    logger.warning("could not write audit entry to %s: %s", self._path, exc)
        if self._echo:
            logger.log(
                logging.ERROR
                if level == "ERROR"
                else logging.WARNING
                if level == "WARNING"
                else logging.INFO,
                "[%s] %s %s -> %s",
                stage.value,
                tool,
                input_summary,
                output_summary,
            )
        return entry

    def record_safety_block(
        self,
        stage: PipelineStage,
        tool: str,
        scope: str,
        finish_reason: str,
        ratings: Any = None,
    ) -> AuditEntry:
        """Record that a model call returned no usable content.

        This exists so a safety-blocked or truncated chunk is visible to the
        reviewer as a known gap rather than disappearing. Screenplays contain
        violence and adult themes as ordinary subject matter, and a dropped
        scene is a missed clearance item.

        Args:
            stage: Stage the block occurred in.
            tool: The call that was blocked.
            scope: What content was affected, e.g. ``"scenes 9-14"``.
            finish_reason: The model's reported finish reason.
            ratings: Safety ratings returned with the response, if any.

        Returns:
            The recorded entry.
        """
        return self.record(
            stage=stage,
            tool=tool,
            input_summary=scope,
            output_summary=(
                f"NO CONTENT RETURNED (finish_reason={finish_reason}). "
                f"This span was not analysed and may contain unflagged clearance items."
            ),
            level="WARNING",
            safety_blocked=True,
            finish_reason=str(finish_reason),
            safety_ratings=[str(r) for r in ratings] if ratings else [],
            affected_scope=scope,
        )

    @contextmanager
    def timed(
        self, stage: PipelineStage, tool: str, input_summary: str = ""
    ) -> Iterator[dict[str, Any]]:
        """Time a block and record one entry when it exits.

        Mutate the yielded dict to set ``output_summary``, ``token_cost``,
        ``task_cost``, ``level``, or any extra detail before the block ends.

        Args:
            stage: Pipeline stage.
            tool: Tool being invoked.
            input_summary: Short description of the input.

        Yields:
            A mutable dict collecting the outcome of the block.
        """
        result: dict[str, Any] = {"output_summary": "", "level": "INFO"}
        start = time.perf_counter()
        try:
            yield result
        except Exception as exc:
            elapsed = (time.perf_counter() - start) * 1000
            self.record(
                stage=stage,
                tool=tool,
                input_summary=input_summary,
                output_summary=f"FAILED: {type(exc).__name__}: {exc}",
                latency_ms=elapsed,
                level="ERROR",
                error_type=type(exc).__name__,
            )
            raise
        else:
            elapsed = (time.perf_counter() - start) * 1000
            self.record(
                stage=stage,
                tool=tool,
                input_summary=input_summary,
                output_summary=str(result.pop("output_summary", "")),
                latency_ms=elapsed,
                token_cost=result.pop("token_cost", None),
                task_cost=result.pop("task_cost", None),
                level=str(result.pop("level", "INFO")),
                **result,
            )

    def totals(self) -> dict[str, Any]:
        """Return aggregate cost and timing across the run.

        Returns:
            Counts of entries, warnings and errors, plus summed latency, tokens
            and Parallel tasks.
        """
        with self._lock:
            entries = list(self.entries)
        return {
            "entries": len(entries),
            "warnings": sum(1 for e in entries if e.level == "WARNING"),
            "errors": sum(1 for e in entries if e.level == "ERROR"),
            "safety_blocks": sum(1 for e in entries if e.detail.get("safety_blocked")),
            "total_latency_ms": round(sum(e.latency_ms or 0 for e in entries), 1),
            "total_tokens": sum(e.token_cost or 0 for e in entries),
            "total_parallel_tasks": sum(e.task_cost or 0 for e in entries),
        }

    def to_jsonl(self) -> str:
        """Return the whole trail as a JSONL string."""
        with self._lock:
            return "\n".join(e.model_dump_json() for e in self.entries)

    def summary_table(self) -> str:
        """Return a compact human-readable trace, for the CLI and demo."""
        with self._lock:
            entries = list(self.entries)
        lines = [
            f"{'STAGE':<14} {'TOOL':<26} {'ms':>8}  {'lvl':<7} SUMMARY",
            "-" * 110,
        ]
        for e in entries:
            ms = f"{e.latency_ms:.0f}" if e.latency_ms is not None else "-"
            lines.append(
                f"{e.stage.value:<14} {e.tool[:26]:<26} {ms:>8}  {e.level:<7} "
                f"{e.output_summary[:52]}"
            )
        t = self.totals()
        lines.append("-" * 110)
        lines.append(
            f"{t['entries']} entries | {t['warnings']} warn | {t['errors']} err | "
            f"{t['safety_blocks']} safety-blocked | {t['total_latency_ms']:.0f} ms | "
            f"{t['total_tokens']} tokens | {t['total_parallel_tasks']} parallel tasks"
        )
        return "\n".join(lines)


def load_trail(path: Path) -> list[AuditEntry]:
    """Read a JSONL audit trail back into models.

    Args:
        path: Path to the ``.jsonl`` file.

    Returns:
        The parsed entries, skipping any malformed line.
    """
    entries: list[AuditEntry] = []
    for line in Path(path).read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        try:
            entries.append(AuditEntry.model_validate(json.loads(line)))
        except (json.JSONDecodeError, ValueError) as exc:
            logger.warning("skipping malformed audit line: %s", exc)
    return entries
