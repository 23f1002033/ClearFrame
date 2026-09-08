"""Guard the README's runtime call-site references.

Judges verify these specific file:line pointers, and code edits shift line
numbers silently. This test fails the build rather than letting the README go
stale.
"""

from __future__ import annotations

import re
from pathlib import Path

import pytest

REPO = Path(__file__).resolve().parents[1]
README = REPO / "README.md"

# (file, line, token that must appear at or near that line)
REFERENCES = [
    ("src/clearframe/tools/gemini_client.py", 177, "generate_content"),
    ("src/clearframe/ingest/parser.py", 410, "generate_content"),
    ("src/clearframe/agents/extractor.py", 390, "generate_with_retry"),
    ("src/clearframe/agents/assembler.py", 340, "generate_with_retry"),
    ("src/clearframe/agents/assembler.py", 616, "generate_with_retry"),
    ("src/clearframe/config.py", 328, "build_safety_settings"),
    ("src/clearframe/agents/orchestrator.py", 400, "LlmAgent"),
    ("src/clearframe/agents/orchestrator.py", 412, "FunctionCallingConfigMode"),
    ("src/clearframe/agents/orchestrator.py", 373, "FunctionTool"),
    ("src/clearframe/agents/orchestrator.py", 538, "Runner"),
    ("src/clearframe/tools/parallel_client.py", 202, "AsyncParallel"),
    ("src/clearframe/tools/parallel_client.py", 346, "self._client.search"),
    ("src/clearframe/tools/parallel_client.py", 374, "task_run.execute"),
    ("src/clearframe/agents/researcher.py", 445, "asyncio.gather"),
]


@pytest.mark.parametrize(("path", "line", "token"), REFERENCES)
def test_readme_line_reference_is_accurate(path: str, line: int, token: str) -> None:
    """Each cited line must still contain what the README says it does.

    A small window is allowed so trivial edits do not fail the build, but drift
    beyond that means the reference is wrong and must be updated.
    """
    lines = (REPO / path).read_text(encoding="utf-8").splitlines()
    assert line <= len(lines), f"{path}:{line} is past end of file ({len(lines)} lines)"
    window = "\n".join(lines[max(0, line - 3) : line + 3])
    assert token in window, f"{path}:{line} no longer contains {token!r}"


@pytest.mark.parametrize(("path", "line", "token"), REFERENCES)
def test_readme_actually_cites_that_line(path: str, line: int, token: str) -> None:
    """The README must contain the reference this test is guarding."""
    readme = README.read_text(encoding="utf-8")
    assert path in readme, f"README no longer references {path}"
    assert f"**{line}**" in readme or f"**{line}–" in readme, (
        f"README no longer cites line {line} of {path}"
    )


def test_readme_mermaid_diagram_is_balanced() -> None:
    """An unbalanced subgraph renders as a blank box on the submission page."""
    blocks = re.findall(r"```mermaid\n(.*?)```", README.read_text(encoding="utf-8"), re.S)
    assert blocks, "README has no mermaid diagram"
    for block in blocks:
        assert "flowchart" in block or "graph" in block
        assert block.count("subgraph") == len(re.findall(r"^\s*end\s*$", block, re.M))


def test_readme_states_the_non_advice_positioning() -> None:
    """The positioning constraint must survive any future README rewrite."""
    readme = README.read_text(encoding="utf-8")
    assert "never marks an item as cleared" in readme
    assert "does not give legal advice" in readme


# ---------------------------------------------------------------------------
# Invocation is standardised on one form
# ---------------------------------------------------------------------------


def test_api_module_does_not_manipulate_sys_path() -> None:
    """The app must not shim sys.path to support a second invocation form.

    A shim was added so the app could be started as ``src.clearframe.api.main``.
    That form makes Python load every ``clearframe`` module twice under two
    names; since ``get_settings()`` is LRU-cached, each copy gets its own
    settings and its own in-memory report store, so reports created through one
    are invisible to the other.
    """
    import ast

    source = (REPO / "src/clearframe/api/main.py").read_text(encoding="utf-8")
    tree = ast.parse(source)
    for node in ast.walk(tree):
        if isinstance(node, ast.Call):
            rendered = ast.unparse(node)
            assert "sys.path.insert" not in rendered, "main.py manipulates sys.path"
            assert "sys.path.append" not in rendered, "main.py manipulates sys.path"


def test_documented_invocation_is_consistent_everywhere() -> None:
    """Dockerfile, README and the API contract must agree on how to start it."""
    expected = "uvicorn clearframe.api.main:app"
    for relative in ("Dockerfile", "README.md", "docs/api-contract.md"):
        text = (REPO / relative).read_text(encoding="utf-8")
        assert expected in text, f"{relative} does not document {expected!r}"


def test_no_document_recommends_the_dual_import_form() -> None:
    """The broken form must not appear as an instruction anywhere.

    It may be mentioned as something to avoid, so only lines that read as a
    command are rejected.
    """
    bad = "uvicorn src.clearframe"
    for relative in ("Dockerfile", "README.md", "docs/api-contract.md"):
        for line in (REPO / relative).read_text(encoding="utf-8").splitlines():
            if bad in line:
                # Match negations as words so markdown emphasis ("**Not**") and
                # punctuation do not defeat the check.
                negated = re.search(
                    r"\b(not|never|avoid|don'?t|instead|rather)\b", line, re.IGNORECASE
                )
                assert negated, (
                    f"{relative} appears to recommend the dual-import form: {line.strip()}"
                )


def test_frontend_facing_doc_explains_how_to_start_the_backend() -> None:
    """A frontend developer reads the contract, not the setup section."""
    contract = (REPO / "docs/api-contract.md").read_text(encoding="utf-8")
    assert "Running the backend locally" in contract
    assert "PYTHONPATH=src uvicorn clearframe.api.main:app" in contract
