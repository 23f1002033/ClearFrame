"""Tests for the Gemini retry policy.

Gemini calls previously had no retry policy despite ``gemini_max_retries`` being
configured. A single rate-limit response during the assembly fan-out degraded an
item to an empty rationale and a NEEDS_VERIFICATION tier, which is easy to miss
because the tier distribution still looks plausible.
"""

from __future__ import annotations

import asyncio

import pytest

from clearframe.config import Settings
from clearframe.tools.gemini_client import (
    backoff_delay,
    generate_with_retry,
    is_retryable,
)


class _Err(Exception):
    """Exception carrying an HTTP status, as the Gemini SDK does."""

    def __init__(self, message: str, code: int | None = None):
        super().__init__(message)
        if code is not None:
            self.code = code


@pytest.mark.parametrize(
    "exc",
    [
        _Err("429 RESOURCE_EXHAUSTED: rate limit exceeded", 429),
        _Err("503 UNAVAILABLE: model overloaded", 503),
        _Err("500 Internal error", 500),
        _Err("Deadline exceeded"),
        _Err("The model is overloaded. Please try again later."),
        asyncio.TimeoutError(),
        ConnectionError("connection reset"),
    ],
)
def test_transient_failures_are_retryable(exc: BaseException) -> None:
    """Rate limits, overload and timeouts are worth another attempt."""
    assert is_retryable(exc)


@pytest.mark.parametrize(
    "exc",
    [
        _Err("400 INVALID_ARGUMENT: invalid argument", 400),
        _Err("403 PERMISSION_DENIED", 403),
        _Err("API key not valid. Please pass a valid API key.", 400),
        _Err("404 NOT_FOUND: model not found", 404),
    ],
)
def test_permanent_failures_are_not_retried(exc: BaseException) -> None:
    """Retrying a bad key or a retired model only burns quota."""
    assert not is_retryable(exc)


def test_backoff_grows_and_is_jittered() -> None:
    """Delays grow but stay randomised, so a fan-out does not retry in lockstep."""
    settings = Settings()
    first = [backoff_delay(1, settings) for _ in range(20)]
    later = [backoff_delay(4, settings) for _ in range(20)]
    assert len(set(first)) > 1  # jittered, not constant
    assert max(first) < max(later)
    assert all(d <= 45.0 for d in later)


class _FakeModels:
    """Async stand-in for ``client.aio.models`` with scripted behaviour."""

    def __init__(self, behaviours):
        self._behaviours = list(behaviours)
        self.calls = 0

    async def generate_content(self, **kwargs):
        self.calls += 1
        behaviour = self._behaviours[min(self.calls - 1, len(self._behaviours) - 1)]
        if isinstance(behaviour, Exception):
            raise behaviour
        return behaviour


class _FakeClient:
    """Async stand-in for ``google.genai.Client``."""

    def __init__(self, behaviours):
        self.aio = type("aio", (), {"models": _FakeModels(behaviours)})()

    @property
    def calls(self) -> int:
        return self.aio.models.calls


def _settings(**kw) -> Settings:
    """Build settings with retries enabled."""
    base = dict(gemini_max_retries=3)
    base.update(kw)
    return Settings(**base)


async def test_rate_limited_call_retries_then_succeeds(monkeypatch) -> None:
    """A 429 followed by success returns the response, not a fallback."""
    monkeypatch.setattr(
        "clearframe.tools.gemini_client.backoff_delay", lambda *a, **k: 0.001
    )
    client = _FakeClient([_Err("429 rate limit", 429), _Err("429 rate limit", 429), "OK"])
    result = await generate_with_retry(
        client, model="m", contents="c", config=None, settings=_settings()
    )
    assert result == "OK"
    assert client.calls == 3


async def test_retries_are_bounded(monkeypatch) -> None:
    """A persistently failing endpoint cannot retry forever."""
    monkeypatch.setattr(
        "clearframe.tools.gemini_client.backoff_delay", lambda *a, **k: 0.001
    )
    client = _FakeClient([_Err("503 unavailable", 503)])
    with pytest.raises(Exception):
        await generate_with_retry(
            client, model="m", contents="c", config=None, settings=_settings(gemini_max_retries=2)
        )
    assert client.calls == 3  # initial attempt plus two retries


async def test_permanent_error_fails_immediately() -> None:
    """A bad API key must not be retried four times."""
    client = _FakeClient([_Err("API key not valid", 400)])
    with pytest.raises(Exception):
        await generate_with_retry(
            client, model="m", contents="c", config=None, settings=_settings()
        )
    assert client.calls == 1


def test_timeout_setting_is_actually_applied() -> None:
    """The configured timeout must reach the SDK, not sit unused in config."""
    import inspect

    from clearframe.tools import gemini_client

    source = inspect.getsource(gemini_client.build_client)
    assert "gemini_timeout_seconds" in source
    assert "http_options" in source


def test_retry_setting_is_actually_applied() -> None:
    """Regression guard: gemini_max_retries was declared but never read."""
    import inspect

    from clearframe.tools import gemini_client

    assert "gemini_max_retries" in inspect.getsource(gemini_client.generate_with_retry)


@pytest.mark.parametrize(
    "message",
    [
        "429 RESOURCE_EXHAUSTED. Your project has exceeded its monthly spending cap.",
        "429 RESOURCE_EXHAUSTED. You exceeded your current quota, please check your plan and billing details.",
    ],
)
def test_billing_cap_is_not_retried_despite_being_a_429(message: str) -> None:
    """A spend cap reports as 429 but never clears on its own.

    Retrying it burns the backoff window and buries the one message the operator
    actually needs to act on.
    """
    assert not is_retryable(_Err(message, 429))


def test_ordinary_rate_limit_is_still_retried() -> None:
    """Narrowing the 429 handling must not disable genuine rate-limit retries."""
    assert is_retryable(_Err("429 RESOURCE_EXHAUSTED: rate limit exceeded, try again", 429))
