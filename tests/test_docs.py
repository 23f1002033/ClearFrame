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
