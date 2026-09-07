"""ADK root agent wiring the ClearFrame pipeline as registered tools.

Built natively on the Google Agent Development Kit. There is no LangChain,
LangGraph or other wrapper anywhere in this module or its dependencies: the
pipeline stages are plain Python functions registered directly as ADK
``FunctionTool`` instances, which keeps the trace readable as a genuine
multi-step agent run rather than a framework's internal chatter.

Two model-level constraints, not prompt instructions:

``ANY``-mode forced function calling
    The agent's ``tool_config`` is set to
    ``FunctionCallingConfigMode.ANY``, so the model must emit a function call
    rather than free text. It cannot answer about an item's status by talking.

A structural rules gate
    :func:`assemble_findings_tool` refuses to run until
    :func:`apply_copyright_rules_tool` has recorded a deterministic outcome for
    the item in session state, and no finding is returned until the citation
    validator has run over it. Both are enforced in the tool bodies, so the
    constraint holds regardless of what the model decides to do.
"""

from __future__ import annotations

import asyncio
import json
import logging
from pathlib import Path
from typing import Any, Optional

from clearframe.agents.assembler import apply_rules, assemble_findings
from clearframe.agents.extractor import extract_items_async
from clearframe.agents.researcher import research_items
from clearframe.audit.logger import AuditLogger
from clearframe.config import Settings, get_settings
from clearframe.ingest.parser import parse_script
from clearframe.models import (
    ClearanceReport,
    ExtractedItem,
    PipelineStage,
    ReportStatus,
    ReviewState,
    RuleFacts,
    utcnow,
)

logger = logging.getLogger(__name__)

ROOT_AGENT_INSTRUCTION = """\
You are ClearFrame, a script-clearance research assistant for a film production.

You do NOT give legal advice and you NEVER state that anything is cleared, safe
or legal to use. You gather sourced evidence and triage work for a qualified
attorney who makes every actual decision.

Run the pipeline in this order, using your tools:

1. parse_screenplay      - read the script into scenes with real page numbers
2. extract_clearable_items - find every brand, song, person, place, work and
                           name collision, deduplicated
3. research_items        - run sourced web research on each item via Parallel
4. apply_copyright_rules - compute copyright and publicity terms. This is
                           deterministic Python arithmetic, not your judgment.
                           You MUST call this before any item is tiered.
5. assemble_findings     - synthesise tiers and cited rationale. This tool
                           refuses to run for an item that has no rule outcome.
6. summarize_report      - report what was found

Rules you must follow:
- Never assign a tier yourself. assemble_findings does that, with the
  deterministic rule outcomes already in context.
- Never state a copyright term you calculated yourself. Only apply_copyright_rules
  computes terms. If it reports INSUFFICIENT_FACTS, say which fact is missing.
- Every substantive claim must cite an evidence id or a rule id.
- If a stage returns an error, report it plainly. Do not paper over a gap: an
  item that was not researched is a hole in the review, and the reviewer needs
  to know about it.
"""


class PipelineSession:
    """Shared state for one orchestrated run.

    ADK tools are plain functions, so run state lives here rather than in
    closures. The rules gate is enforced against :attr:`rule_outcomes`.

    Attributes:
        report: The report being built.
        audit: The audit trail for this run.
    """

    def __init__(
        self, settings: Optional[Settings] = None, audit: Optional[AuditLogger] = None
    ) -> None:
        """Initialise a pipeline session.

        Args:
            settings: Loaded settings; read from the environment if omitted.
            audit: Audit logger; one is created if omitted.
        """
        self.settings = settings or get_settings()
        self.report = ClearanceReport(script_name="(unset)")
        self.audit = audit or AuditLogger(
            report_id=self.report.report_id, log_dir=self.settings.audit_log_dir
        )
        self.report.audit_log = self.audit.entries
        self._items: dict[str, ExtractedItem] = {}
        self.rule_outcomes: dict[str, list] = {}
        self._scenes: list = []

    def item(self, item_id: str) -> Optional[ExtractedItem]:
        """Return an item by id, or None."""
        return self._items.get(item_id)


class RulesGateError(RuntimeError):
    """Raised when assembly is attempted before the deterministic rules ran."""


# ---------------------------------------------------------------------------
# Tools
# ---------------------------------------------------------------------------


def make_tools(session: PipelineSession) -> list:
    """Build the ADK FunctionTool set bound to one pipeline session.

    Args:
        session: The session the tools mutate.

    Returns:
        A list of ``google.adk.tools.FunctionTool`` instances.
    """
    from google.adk.tools import FunctionTool

    def parse_screenplay(script_path: str) -> dict:
        """Parse a screenplay into scenes with accurate script page numbers.

        Args:
            script_path: Path to the .pdf, .txt or .fountain screenplay.

        Returns:
            A dict with the script name, page count, scene count, and any parser
            notes describing corrections or gaps.
        """
        document = parse_script(
            Path(script_path), settings=session.settings, audit=session.audit
        )
        session._scenes = document.scenes
        session.report.script_name = document.script_name
        session.report.page_count = document.page_count
        session.report.scene_count = len(document.scenes)
        return {
            "script_name": document.script_name,
            "page_count": document.page_count,
            "scene_count": len(document.scenes),
            "parser_notes": document.parser_notes,
        }

    def extract_clearable_items() -> dict:
        """Extract and deduplicate every clearable item from the parsed scenes.

        Returns:
            A dict with the item count and a compact list of the items found.
        """
        if not session._scenes:
            return {"error": "No scenes parsed yet. Call parse_screenplay first."}
        items = asyncio.run(
            extract_items_async(
                session._scenes, settings=session.settings, audit=session.audit
            )
        )
        session.report.items = items
        session._items = {i.item_id: i for i in items}
        for item in items:
            session.report.review_states[item.item_id] = ReviewState(item_id=item.item_id)
        return {
            "item_count": len(items),
            "items": [
                {
                    "item_id": i.item_id,
                    "mention": i.mention_text,
                    "category": i.category.value,
                    "occurrences": i.occurrence_count,
                    "pages": i.page_numbers,
                    "on_screen": i.appears_on_screen,
                    "depiction": i.worst_depiction.value,
                }
                for i in items
            ],
        }

    def research_all_items() -> dict:
        """Run sourced web research on every extracted item via the Parallel API.

        Music items are researched twice, resolving the musical composition and
        the sound recording as two separate rights.

        Returns:
            A dict with the evidence count and per-item coverage.
        """
        if not session.report.items:
            return {"error": "No items extracted yet. Call extract_clearable_items first."}
        store = asyncio.run(
            research_items(
                session.report.items, settings=session.settings, audit=session.audit
            )
        )
        session.report.evidence_store = store
        covered = {e.item_id for e in store.values()}
        return {
            "evidence_count": len(store),
            "items_covered": len(covered),
            "items_total": len(session.report.items),
            "items_without_evidence": [
                i.mention_text for i in session.report.items if i.item_id not in covered
            ],
        }

    def apply_copyright_rules(
        item_id: str,
        work_type: str = "",
        jurisdiction: str = "US",
        publication_year: int = 0,
        author_death_year: int = 0,
        person_death_year: int = 0,
        is_person_living: str = "",
        authorship_type: str = "UNKNOWN",
    ) -> dict:
        """Compute copyright or publicity terms deterministically for one item.

        This is pure Python arithmetic over the rules in copyright_rules.yaml.
        No model reasoning is involved, and no term is ever guessed: if a
        required fact is missing the result names the missing field instead.

        Args:
            item_id: The item to evaluate.
            work_type: MUSICAL_COMPOSITION, SOUND_RECORDING, LITERARY_WORK,
                TRADEMARK, PERSONA, etc. Leave empty to infer from the category.
            jurisdiction: US or IN.
            publication_year: Year of first publication, or 0 if unknown.
            author_death_year: Author or composer death year, or 0 if unknown.
            person_death_year: Death year of a depicted person, or 0 if unknown.
            is_person_living: "true", "false", or empty if unknown.
            authorship_type: INDIVIDUAL, CORPORATE, WORK_FOR_HIRE, ANONYMOUS or
                UNKNOWN.

        Returns:
            A dict of rule outcomes, each with the rule id, outcome code,
            explanation, statutory citation, and any missing facts.
        """
        item = session.item(item_id)
        if item is None:
            return {"error": f"unknown item_id {item_id!r}"}

        living: Optional[bool] = None
        if is_person_living.strip().lower() in {"true", "yes"}:
            living = True
        elif is_person_living.strip().lower() in {"false", "no"}:
            living = False

        from clearframe.models import AuthorshipType, Jurisdiction, WorkType

        def _enum(value: str, cls, default):
            try:
                return cls(value.strip().upper())
            except ValueError:
                return default

        facts = RuleFacts(
            work_type=_enum(work_type, WorkType, None) if work_type else None,
            jurisdiction=_enum(jurisdiction, Jurisdiction, Jurisdiction.US),
            publication_year=publication_year or None,
            author_death_year=author_death_year or None,
            person_death_year=person_death_year or None,
            is_person_living=living,
            authorship_type=_enum(authorship_type, AuthorshipType, AuthorshipType.UNKNOWN),
        )
        outcomes = apply_rules(item, facts, audit=session.audit)
        session.rule_outcomes[item_id] = outcomes
        return {
            "item_id": item_id,
            "outcomes": [
                {
                    "rule_id": o.rule_id,
                    "outcome": o.outcome.value,
                    "explanation": o.explanation,
                    "public_domain_year": o.public_domain_year,
                    "missing_facts": o.missing_facts,
                    "citation": o.citation,
                }
                for o in outcomes
            ],
        }

    def assemble_findings_tool() -> dict:
        """Synthesise tiered, cited findings for every researched item.

        Refuses to run until the deterministic rules engine has produced an
        outcome, and never returns a finding that has not passed the citation
        validator.

        Returns:
            A dict of tier counts and per-item findings.
        """
        if not session.report.items:
            return {"error": "No items extracted yet."}
        if not session.rule_outcomes:
            return {
                "error": (
                    "RULES GATE: apply_copyright_rules has not been called for any item. "
                    "The deterministic rule outcome must exist before any item is tiered."
                )
            }

        findings = asyncio.run(
            assemble_findings(
                session.report.items,
                session.report.evidence_store,
                settings=session.settings,
                audit=session.audit,
            )
        )
        unvalidated = [f.item_id for f in findings if not f.validated]
        if unvalidated:
            raise RulesGateError(
                f"citation validation did not run for {unvalidated}; refusing to emit findings"
            )

        session.report.findings = findings
        session.report.updated_at = utcnow()
        return {
            "tier_counts": session.report.tier_counts(),
            "findings": [
                {
                    "item_id": f.item_id,
                    "tier": f.tier.value,
                    "rationale": f.rationale,
                    "open_questions": f.open_questions,
                    "dropped_claims": len(f.dropped_claims),
                }
                for f in findings
            ],
        }

    def summarize_report() -> dict:
        """Summarise the completed clearance report.

        Returns:
            Counts by tier and category, plus audit totals for the run.
        """
        report = session.report
        by_category: dict[str, int] = {}
        for item in report.items:
            by_category[item.category.value] = by_category.get(item.category.value, 0) + 1
        return {
            "report_id": report.report_id,
            "script_name": report.script_name,
            "pages": report.page_count,
            "items": len(report.items),
            "evidence": len(report.evidence_store),
            "tier_counts": report.tier_counts(),
            "by_category": by_category,
            "audit": session.audit.totals(),
            "disclaimer": (
                "Research output for review by qualified counsel. Not legal advice. "
                "No item has been cleared."
            ),
        }

    return [
        FunctionTool(parse_screenplay),
        FunctionTool(extract_clearable_items),
        FunctionTool(research_all_items),
        FunctionTool(apply_copyright_rules),
        FunctionTool(assemble_findings_tool),
        FunctionTool(summarize_report),
    ]


def build_root_agent(session: PipelineSession):
    """Build the ADK root agent with forced function calling enabled.

    ``FunctionCallingConfigMode.ANY`` is a model-level constraint: the model must
    respond with a function call rather than free text, so it cannot narrate a
    clearance conclusion instead of running the pipeline.

    Args:
        session: The pipeline session the tools operate on.

    Returns:
        A configured ``google.adk.agents.LlmAgent``.
    """
    from google.adk.agents import LlmAgent
    from google.genai import types

    from clearframe.config import build_safety_settings

    return LlmAgent(
        name="clearframe_orchestrator",
        model=session.settings.gemini_orchestrator_model,
        description=(
            "Runs script clearance research: extraction, sourced research, "
            "deterministic rules, and cited triage."
        ),
        instruction=ROOT_AGENT_INSTRUCTION,
        tools=make_tools(session),
        generate_content_config=types.GenerateContentConfig(
            safety_settings=build_safety_settings(session.settings),
            temperature=0.0,
            tool_config=types.ToolConfig(
                function_calling_config=types.FunctionCallingConfig(
                    mode=types.FunctionCallingConfigMode.ANY,
                ),
            ),
        ),
    )


async def run_pipeline(
    script_path: Path,
    settings: Optional[Settings] = None,
    audit: Optional[AuditLogger] = None,
) -> ClearanceReport:
    """Run the full pipeline directly, without the agent loop.

    This is the deterministic path used by the API and the benchmark, where a
    fixed sequence is wanted rather than model-chosen tool ordering. The ADK
    agent in :func:`build_root_agent` exposes the same stages as tools for
    interactive and traced runs.

    Args:
        script_path: Path to the screenplay.
        settings: Loaded settings; read from the environment if omitted.
        audit: Audit logger; one is created if omitted.

    Returns:
        The completed :class:`~clearframe.models.ClearanceReport`.
    """
    settings = settings or get_settings()
    report = ClearanceReport(script_name=script_path.stem, pipeline_state="RUNNING")
    audit = audit or AuditLogger(report_id=report.report_id, log_dir=settings.audit_log_dir)
    report.audit_log = audit.entries

    try:
        document = parse_script(script_path, settings=settings, audit=audit)
        report.script_name = document.script_name
        report.page_count = document.page_count
        report.scene_count = len(document.scenes)

        report.items = await extract_items_async(
            document.scenes, settings=settings, audit=audit
        )
        for item in report.items:
            report.review_states[item.item_id] = ReviewState(item_id=item.item_id)

        report.evidence_store = await research_items(
            report.items, settings=settings, audit=audit
        )
        report.findings = await assemble_findings(
            report.items, report.evidence_store, settings=settings, audit=audit
        )

        report.status = ReportStatus.DRAFT

        # A script that parsed into scenes but yielded no items did not succeed.
        # Reporting COMPLETE with zero items reads to a producer as "nothing in
        # this script needs clearing", which is the most dangerous possible
        # false negative for this product.
        if report.scene_count > 0 and not report.items:
            report.pipeline_state = "FAILED"
            report.error = (
                f"Extraction produced no items from {report.scene_count} parsed scenes. "
                f"This is a pipeline failure, not a clean script. Check the trace for "
                f"failed or safety-blocked extraction chunks before relying on this report."
            )
            audit.record(
                stage=PipelineStage.ORCHESTRATOR,
                tool="run_pipeline",
                input_summary=f"{report.scene_count} scenes parsed",
                output_summary=report.error,
                level="ERROR",
                zero_items=True,
            )
        else:
            report.pipeline_state = "COMPLETE"
    except Exception as exc:  # noqa: BLE001 - surfaced on the report, not swallowed
        logger.exception("pipeline failed for %s", script_path)
        report.pipeline_state = "FAILED"
        report.error = f"{type(exc).__name__}: {exc}"
        audit.record(
            stage=PipelineStage.ORCHESTRATOR,
            tool="run_pipeline",
            input_summary=str(script_path),
            output_summary=f"PIPELINE FAILED: {exc}",
            level="ERROR",
        )
    finally:
        report.updated_at = utcnow()
        audit.record(
            stage=PipelineStage.ORCHESTRATOR,
            tool="run_pipeline",
            input_summary=f"{script_path.name}",
            output_summary=(
                f"state={report.pipeline_state} items={len(report.items)} "
                f"evidence={len(report.evidence_store)} findings={len(report.findings)} "
                f"tiers={report.tier_counts()}"
            ),
            **audit.totals(),
        )
    return report


async def run_agent(script_path: Path, settings: Optional[Settings] = None) -> dict[str, Any]:
    """Run the pipeline through the ADK agent loop, returning the trace.

    Args:
        script_path: Path to the screenplay.
        settings: Loaded settings; read from the environment if omitted.

    Returns:
        A dict with the resulting report and the agent's tool-call trace.
    """
    from google.adk.runners import Runner
    from google.adk.sessions import InMemorySessionService
    from google.genai import types

    settings = settings or get_settings()
    session_state = PipelineSession(settings=settings)
    agent = build_root_agent(session_state)

    session_service = InMemorySessionService()
    app_name = "clearframe"
    user_id = "clearframe_user"
    adk_session = await session_service.create_session(app_name=app_name, user_id=user_id)

    runner = Runner(app_name=app_name, agent=agent, session_service=session_service)
    message = types.Content(
        role="user",
        parts=[
            types.Part(
                text=(
                    f"Run the full clearance pipeline on the screenplay at "
                    f"{script_path}. Parse it, extract every clearable item, research "
                    f"them, apply the copyright rules to each item that needs a term "
                    f"calculation, assemble the findings, then summarise."
                )
            )
        ],
    )

    trace: list[dict[str, Any]] = []
    async for event in runner.run_async(
        user_id=user_id, session_id=adk_session.id, new_message=message
    ):
        for part in (event.content.parts if event.content else []) or []:
            if getattr(part, "function_call", None):
                trace.append(
                    {"type": "call", "name": part.function_call.name,
                     "args": dict(part.function_call.args or {})}
                )
            elif getattr(part, "function_response", None):
                trace.append(
                    {
                        "type": "result",
                        "name": part.function_response.name,
                        "summary": json.dumps(part.function_response.response)[:400],
                    }
                )
            elif getattr(part, "text", None):
                trace.append({"type": "text", "text": part.text[:600]})

    await runner.close()
    return {"report": session_state.report, "trace": trace, "audit": session_state.audit}
