"""Tests for secret resolution and the credential preflight.

A 401 surfacing deep inside a concurrent research fan-out gets attributed to the
wrong component. These tests pin the resolution rules that determine which value
actually wins, and prove the preflight reports the state without ever exposing a
key.
"""

from __future__ import annotations

import logging
import pathlib
from pathlib import Path

import pytest

from clearframe.config import (
    PROJECT_ROOT,
    Settings,
    describe_key_source,
    preflight,
    resolve_google_api_key,
    resolve_parallel_api_key,
)


# ---------------------------------------------------------------------------
# Precedence
# ---------------------------------------------------------------------------


def test_os_environment_overrides_the_dotenv_file(monkeypatch: pytest.MonkeyPatch) -> None:
    """pydantic-settings ranks the OS environment above the .env file.

    This is the documented precedence, and it means a stale shell export
    silently wins over a correct .env entry.
    """
    sentinel = "from-the-shell"
    monkeypatch.setenv("PARALLEL_API_KEY", sentinel)
    # Compared into a boolean first: a failing `==` assertion prints both
    # operands, which would put the developer's real key in the output if the
    # monkeypatch ever failed to apply.
    matched = resolve_parallel_api_key(Settings()) == sentinel
    assert matched, "OS environment did not take precedence over the .env file"


def test_empty_shell_variable_shadows_dotenv_and_yields_no_key(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """An empty export shadows .env, which is almost always an accident.

    It does not produce a working client with a bad key; it produces no key at
    all, so the failure is a construction-time RuntimeError rather than an
    authentication error at call time.
    """
    monkeypatch.setenv("PARALLEL_API_KEY", "")
    settings = Settings()
    assert not resolve_parallel_api_key(settings)
    assert settings.parallel_configured is False


def test_empty_shell_variable_fails_fast_at_client_construction(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """The failure mode of a missing key is explicit, not a silent 401."""
    from clearframe.tools.parallel_client import ParallelClient

    monkeypatch.setenv("PARALLEL_API_KEY", "")
    with pytest.raises(RuntimeError, match="No Parallel API key"):
        ParallelClient(Settings())


def test_gemini_key_accepts_either_variable_name() -> None:
    """GOOGLE_API_KEY and GEMINI_API_KEY are both honoured, GOOGLE first.

    Built from explicit Settings rather than the environment so the developer's
    real .env cannot leak into an assertion message on failure.
    """
    only_gemini = Settings(google_api_key=None, gemini_api_key="from-gemini-var")
    assert resolve_google_api_key(only_gemini) == "from-gemini-var"

    both = Settings(google_api_key="from-google-var", gemini_api_key="from-gemini-var")
    assert resolve_google_api_key(both) == "from-google-var"

    neither = Settings(google_api_key=None, gemini_api_key=None)
    import os

    if not os.getenv("GOOGLE_API_KEY") and not os.getenv("GEMINI_API_KEY"):
        assert resolve_google_api_key(neither) is None


def test_no_assertion_in_this_module_can_print_a_live_key() -> None:
    """Guard: tests must not compare against a value read from the real .env.

    A failing assertion prints both operands, so a test that resolves the
    developer's actual key and compares it to a literal leaks that key into CI
    output the moment it breaks.
    """
    import ast

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    tree = ast.parse(source)
    offenders: list[str] = []
    for node in ast.walk(tree):
        if not isinstance(node, ast.Assert) or not isinstance(node.test, ast.Compare):
            continue
        rendered = ast.unparse(node.test)
        # Comparing a resolver's output on a bare Settings() to a string literal
        # is the shape that leaks; Settings(...) with explicit kwargs is safe.
        if "resolve_" in rendered and "Settings()" in rendered:
            if any(isinstance(c, ast.Constant) and isinstance(c.value, str)
                   for c in ast.walk(node.test)):
                offenders.append(rendered[:80])
    # A resolver compared into a local boolean before asserting is safe: the
    # failure output is `assert False`, which carries no key material.
    assert not offenders, f"assertions may leak a live key: {offenders}"


# ---------------------------------------------------------------------------
# The .env path bug
# ---------------------------------------------------------------------------


def test_dotenv_path_is_absolute_not_relative_to_cwd() -> None:
    """.env must load regardless of the process working directory.

    As a bare relative path it resolved against the caller's cwd, so running the
    pipeline or the benchmark from any other directory silently loaded no .env
    and every key came back None.
    """
    env_files = Settings.model_config["env_file"]
    if isinstance(env_files, (str, Path)):
        env_files = (env_files,)
    absolute = [Path(f) for f in env_files if Path(f).is_absolute()]
    assert absolute, f"no absolute .env path configured: {env_files}"
    assert any(p == PROJECT_ROOT / ".env" for p in absolute)


def test_key_resolution_happens_at_call_time_not_import_time() -> None:
    """The client must read the key when constructed, not when imported.

    An import-time read would freeze whatever the environment happened to be
    when the module first loaded, which is impossible to debug from a 401.
    """
    import ast
    import inspect

    from clearframe.tools import parallel_client

    tree = ast.parse(inspect.getsource(parallel_client))
    module_level = [
        node
        for node in tree.body
        if not isinstance(
            node,
            (ast.Import, ast.ImportFrom, ast.FunctionDef, ast.AsyncFunctionDef,
             ast.ClassDef, ast.Expr),
        )
    ]
    for node in module_level:
        rendered = ast.unparse(node)
        assert "resolve_parallel_api_key" not in rendered
        assert "get_settings()" not in rendered


# ---------------------------------------------------------------------------
# Preflight
# ---------------------------------------------------------------------------


def test_preflight_never_reveals_a_key_value(
    monkeypatch: pytest.MonkeyPatch, caplog: pytest.LogCaptureFixture
) -> None:
    """The whole point is visibility without exposure.

    A secret printed into a build log is a leaked secret, so the check reports
    length and origin only.
    """
    secret = "super-secret-key-value-abcdefghijklmnop"
    monkeypatch.setenv("PARALLEL_API_KEY", secret)
    with caplog.at_level(logging.INFO):
        reports = preflight(Settings(), stage="RESEARCH")

    assert secret not in caplog.text
    for report in reports:
        assert secret not in str(report)
        assert report.get("prefix") is None or len(report["prefix"]) <= 8


def test_preflight_reports_length_and_source(monkeypatch: pytest.MonkeyPatch) -> None:
    """Length is enough to tell a real key from a truncated or empty one."""
    monkeypatch.setenv("PARALLEL_API_KEY", "abcdefghij" * 4)
    report = describe_key_source("PARALLEL_API_KEY", Settings())
    assert report["present"] is True
    assert report["length"] == 40
    assert report["source"] == "OS environment"
    assert "abcdefghij" not in str(report)


def test_preflight_names_an_empty_shell_variable_explicitly(
    monkeypatch: pytest.MonkeyPatch, caplog: pytest.LogCaptureFixture
) -> None:
    """The shadowing case must be called out, with the fix, not merely absent."""
    monkeypatch.setenv("PARALLEL_API_KEY", "")
    with caplog.at_level(logging.INFO):
        report = describe_key_source("PARALLEL_API_KEY", Settings())
        preflight(Settings(), stage="RESEARCH")

    assert "SET BUT EMPTY" in report["source"]
    assert "shadows the .env value" in caplog.text
    assert "unset PARALLEL_API_KEY" in caplog.text


def test_preflight_logs_an_error_when_a_key_is_missing(
    monkeypatch: pytest.MonkeyPatch, caplog: pytest.LogCaptureFixture
) -> None:
    """A missing credential is an ERROR at the top of the stage, not a warning."""
    monkeypatch.setenv("PARALLEL_API_KEY", "")
    monkeypatch.setattr(
        "clearframe.config.resolve_parallel_api_key", lambda s: None
    )
    with caplog.at_level(logging.INFO):
        preflight(Settings(), stage="RESEARCH")
    assert "NOT RESOLVED" in caplog.text
    assert any(r.levelno >= logging.ERROR for r in caplog.records)


def test_preflight_reports_the_dotenv_search_path(
    caplog: pytest.LogCaptureFixture,
) -> None:
    """Showing where .env was looked for makes the cwd bug self-diagnosing."""
    with caplog.at_level(logging.INFO):
        preflight(Settings(), stage="RESEARCH")
    assert str(PROJECT_ROOT / ".env") in caplog.text


def test_preflight_states_which_gemini_auth_path_is_active(
    caplog: pytest.LogCaptureFixture,
) -> None:
    """On Vertex the API key is ignored entirely; the log must say so."""
    with caplog.at_level(logging.INFO):
        preflight(Settings(google_genai_use_vertexai=True), stage="EXTRACT")
    assert "Vertex AI (API key ignored" in caplog.text

    caplog.clear()
    with caplog.at_level(logging.INFO):
        preflight(Settings(google_genai_use_vertexai=False), stage="EXTRACT")
    assert "AI Studio API key" in caplog.text


async def test_research_stage_records_preflight_in_the_audit_trail() -> None:
    """Every run's trace shows the credential state before the fan-out opened."""
    from clearframe.agents.researcher import research_items
    from clearframe.audit.logger import AuditLogger
    from clearframe.models import ExtractedItem, ItemCategory, Occurrence, PipelineStage
    from clearframe.tools.parallel_client import ParallelResponse, SourceRecord

    class _Stub:
        task_count = 0

        async def search(self, objective, queries, mode="fast", max_chars=6000):
            return ParallelResponse(
                ok=True,
                surface="search",
                objective=objective,
                sources=[SourceRecord(url="https://x.example/1", excerpts=["fact"])],
                task_cost=1,
            )

        async def aclose(self):
            return None

    item = ExtractedItem(
        mention_text="Nike",
        normalized_name="Nike",
        category=ItemCategory.BRAND_TRADEMARK,
        occurrences=[
            Occurrence(scene_number=1, page_number=1, context_snippet="c", on_screen=True)
        ],
    )
    audit = AuditLogger(echo=False)
    await research_items([item], settings=Settings(), audit=audit, client=_Stub())

    entry = next(e for e in audit.entries if e.tool == "config.preflight")
    assert entry.stage is PipelineStage.RESEARCH
    assert "PARALLEL_API_KEY" in entry.output_summary
    assert "length" in entry.detail
