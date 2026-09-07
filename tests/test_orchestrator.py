"""Tests for the ADK orchestrator: the rules gate and the ADK-only constraint."""

from __future__ import annotations

import ast
import inspect
from pathlib import Path

import pytest

from clearframe.agents import orchestrator
from clearframe.agents.orchestrator import PipelineSession, make_tools
from clearframe.config import Settings


def _tools_by_name(session: PipelineSession) -> dict:
    """Return the session's tools keyed by their registered function name."""
    return {t.name: t for t in make_tools(session)}


def test_all_six_pipeline_stages_are_registered_as_tools() -> None:
    """The trace only reads as a multi-step agent run if the stages are tools."""
    names = set(_tools_by_name(PipelineSession(settings=Settings())))
    assert names == {
        "parse_screenplay",
        "extract_clearable_items",
        "research_all_items",
        "apply_copyright_rules",
        "assemble_findings_tool",
        "summarize_report",
    }


def test_assembly_is_blocked_until_the_rules_engine_has_run() -> None:
    """The rules gate is structural: no tier without a deterministic outcome.

    Enforced in the tool body rather than the prompt, so it holds no matter what
    the model decides to call.
    """
    session = PipelineSession(settings=Settings())
    session.report.items = []
    tools = _tools_by_name(session)

    from clearframe.models import ExtractedItem, ItemCategory, Occurrence

    session.report.items = [
        ExtractedItem(
            mention_text="X",
            normalized_name="X",
            category=ItemCategory.BRAND_TRADEMARK,
            occurrences=[
                Occurrence(
                    scene_number=1, page_number=1, context_snippet="c", on_screen=True
                )
            ],
        )
    ]
    result = tools["assemble_findings_tool"].func()
    assert "RULES GATE" in result["error"]


def test_stages_refuse_to_run_out_of_order() -> None:
    """Each stage states its unmet precondition instead of failing obscurely."""
    session = PipelineSession(settings=Settings())
    tools = _tools_by_name(session)
    assert "parse_screenplay first" in tools["extract_clearable_items"].func()["error"]
    assert "extract_clearable_items first" in tools["research_all_items"].func()["error"]


def test_rules_tool_rejects_an_unknown_item_id() -> None:
    """A hallucinated item id cannot produce a rule outcome."""
    session = PipelineSession(settings=Settings())
    result = _tools_by_name(session)["apply_copyright_rules"].func(item_id="nope")
    assert "unknown item_id" in result["error"]


def test_rules_tool_reports_missing_facts_rather_than_guessing() -> None:
    """The agent-facing tool preserves the engine's refusal to guess."""
    from clearframe.models import ExtractedItem, ItemCategory, Occurrence

    session = PipelineSession(settings=Settings())
    item = ExtractedItem(
        mention_text="Book",
        normalized_name="Book",
        category=ItemCategory.PUBLISHED_WORK,
        occurrences=[
            Occurrence(scene_number=1, page_number=1, context_snippet="c", on_screen=True)
        ],
    )
    session.report.items = [item]
    session._items = {item.item_id: item}

    result = _tools_by_name(session)["apply_copyright_rules"].func(
        item_id=item.item_id, work_type="LITERARY_WORK", publication_year=2005
    )
    outcome = result["outcomes"][0]
    assert outcome["outcome"] == "INSUFFICIENT_FACTS"
    assert "author_death_year" in outcome["missing_facts"]
    assert outcome["public_domain_year"] is None


def test_calling_the_rules_tool_opens_the_gate() -> None:
    """Once a deterministic outcome exists, assembly is permitted to proceed."""
    from clearframe.models import ExtractedItem, ItemCategory, Occurrence

    session = PipelineSession(settings=Settings())
    item = ExtractedItem(
        mention_text="Book",
        normalized_name="Book",
        category=ItemCategory.PUBLISHED_WORK,
        occurrences=[
            Occurrence(scene_number=1, page_number=1, context_snippet="c", on_screen=True)
        ],
    )
    session.report.items = [item]
    session._items = {item.item_id: item}
    tools = _tools_by_name(session)

    assert "RULES GATE" in tools["assemble_findings_tool"].func()["error"]
    tools["apply_copyright_rules"].func(item_id=item.item_id, work_type="LITERARY_WORK")
    assert session.rule_outcomes


# ---------------------------------------------------------------------------
# Hackathon constraint: ADK only
# ---------------------------------------------------------------------------


def test_no_agent_wrapper_library_is_imported_anywhere() -> None:
    """The build must use ADK natively, with no LangChain or LangGraph.

    Checked across the whole package by AST rather than text search, so a
    docstring mentioning a library does not trip it.
    """
    banned = {"langchain", "langgraph", "llama_index", "autogen", "crewai", "haystack",
              "semantic_kernel"}
    offenders: list[str] = []
    for path in Path("src/clearframe").rglob("*.py"):
        tree = ast.parse(path.read_text(encoding="utf-8"))
        for node in ast.walk(tree):
            modules: list[str] = []
            if isinstance(node, ast.Import):
                modules = [a.name for a in node.names]
            elif isinstance(node, ast.ImportFrom) and node.module:
                modules = [node.module]
            for module in modules:
                root = module.split(".")[0].lower()
                if root in banned:
                    offenders.append(f"{path}: {module}")
    assert not offenders, f"agent wrapper libraries imported: {offenders}"


def test_forced_function_calling_is_configured_at_the_model_level() -> None:
    """ANY-mode tool_config is a model constraint, not a prompt instruction."""
    source = inspect.getsource(orchestrator.build_root_agent)
    assert "FunctionCallingConfigMode.ANY" in source
    assert "tool_config" in source


def test_orchestrator_instruction_forbids_self_calculated_terms() -> None:
    """The agent is told the rules engine owns every term calculation."""
    instruction = orchestrator.ROOT_AGENT_INSTRUCTION
    assert "Never assign a tier yourself" in instruction
    assert "Never state a copyright term you calculated yourself" in instruction
    assert "NEVER state that anything is cleared" in instruction


async def test_zero_items_from_a_parsed_script_is_a_failure_not_a_clean_report() -> None:
    """A report claiming no items after parsing scenes is a false negative.

    When every extraction chunk failed, the run previously reported COMPLETE with
    zero items, which a producer reads as "nothing in this script needs
    clearing" - the most dangerous outcome this product can produce.
    """
    from pathlib import Path

    from clearframe.agents import orchestrator as orch
    from clearframe.config import Settings
    from clearframe.ingest.parser import parse_script

    settings = Settings(parallel_api_key="k")

    async def no_items(scenes, settings=None, audit=None):
        return []

    async def no_evidence(items, settings=None, audit=None, client=None):
        return {}

    async def no_findings(items, store, settings=None, audit=None):
        return []

    orig = (orch.extract_items_async, orch.research_items, orch.assemble_findings)
    orch.extract_items_async, orch.research_items, orch.assemble_findings = (
        no_items,
        no_evidence,
        no_findings,
    )
    try:
        report = await orch.run_pipeline(
            Path("data/scripts/the_last_good_year.pdf"), settings=settings
        )
    finally:
        orch.extract_items_async, orch.research_items, orch.assemble_findings = orig

    assert report.scene_count > 0
    assert report.items == []
    assert report.pipeline_state == "FAILED"
    assert "pipeline failure, not a clean script" in report.error
