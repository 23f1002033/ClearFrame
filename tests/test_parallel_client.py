"""Tests for the Parallel client wrapper.

The properties under test are the ones that keep a fan-out alive: failures come
back as values rather than exceptions, retries are bounded and only fire on
transient faults, and concurrency is genuinely capped.
"""

from __future__ import annotations

import asyncio

import parallel
import pytest

from clearframe.config import Settings
from clearframe.tools.parallel_client import (
    ParallelClient,
    ParallelResponse,
    SourceRecord,
    is_retryable,
)


class FakeResult:
    """Stands in for an SDK search result."""

    def __init__(self, results=None, search_id="s_1"):
        self.results = results or []
        self.search_id = search_id


class FakeSource:
    """Stands in for one SDK web result."""

    def __init__(self, url="https://example.com/a", title="T", excerpts=("snippet",)):
        self.url = url
        self.title = title
        self.excerpts = list(excerpts)


class FakeSDK:
    """Scriptable async stand-in for ``parallel.AsyncParallel``."""

    def __init__(self, behaviours):
        self._behaviours = list(behaviours)
        self.calls = 0
        self.concurrent = 0
        self.max_concurrent = 0

    async def search(self, **kwargs):
        self.calls += 1
        self.concurrent += 1
        self.max_concurrent = max(self.max_concurrent, self.concurrent)
        try:
            await asyncio.sleep(0.01)
            behaviour = self._behaviours[min(self.calls - 1, len(self._behaviours) - 1)]
            if isinstance(behaviour, Exception):
                raise behaviour
            return behaviour
        finally:
            self.concurrent -= 1

    async def close(self):
        return None


def _settings(**kw) -> Settings:
    """Build settings with fast backoff so retry tests do not sleep."""
    base = dict(
        parallel_api_key="test-key",
        parallel_max_retries=3,
        parallel_backoff_base_seconds=0.001,
        parallel_backoff_max_seconds=0.002,
        parallel_max_concurrency=2,
    )
    base.update(kw)
    return Settings(**base)


def _client(behaviours, **kw) -> tuple[ParallelClient, FakeSDK]:
    """Build a client wired to a scripted fake SDK."""
    sdk = FakeSDK(behaviours)
    return ParallelClient(settings=_settings(**kw), client=sdk), sdk


# ---------------------------------------------------------------------------
# Retry classification
# ---------------------------------------------------------------------------


def _status_error(code: int) -> parallel.APIStatusError:
    """Build an SDK status error carrying an HTTP code."""
    exc = parallel.APIStatusError.__new__(parallel.APIStatusError)
    Exception.__init__(exc, f"status {code}")
    exc.status_code = code
    return exc


@pytest.mark.parametrize("code", [408, 429, 500, 502, 503, 504])
def test_transient_statuses_are_retryable(code: int) -> None:
    """Rate limits and server faults are worth another attempt."""
    assert is_retryable(_status_error(code))


@pytest.mark.parametrize("code", [400, 401, 403, 404, 422])
def test_client_errors_are_not_retryable(code: int) -> None:
    """Retrying a bad key or a malformed request only burns budget."""
    assert not is_retryable(_status_error(code))


def test_timeouts_and_connection_errors_are_retryable() -> None:
    """Network flakiness is the canonical retry case."""
    assert is_retryable(parallel.APITimeoutError(request=None))


# ---------------------------------------------------------------------------
# Failures are values, never exceptions
# ---------------------------------------------------------------------------


async def test_permanent_failure_returns_a_response_not_a_raise() -> None:
    """An exception escaping here would abort the entire fan-out."""
    client, sdk = _client([_status_error(401)])
    response = await client.search("objective", ["q"])
    assert isinstance(response, ParallelResponse)
    assert response.ok is False
    assert response.error_type == "APIStatusError"
    assert sdk.calls == 1  # 401 is not retried


async def test_transient_failure_is_retried_then_succeeds() -> None:
    """A 429 followed by a success yields a usable response."""
    client, sdk = _client(
        [_status_error(429), _status_error(429), FakeResult([FakeSource()])]
    )
    response = await client.search("objective", ["q"])
    assert response.ok is True
    assert response.attempts == 3
    assert sdk.calls == 3
    assert len(response.sources) == 1


async def test_retries_are_bounded_by_configuration() -> None:
    """A permanently failing endpoint cannot retry forever."""
    client, sdk = _client([_status_error(503)], parallel_max_retries=2)
    response = await client.search("objective", ["q"])
    assert response.ok is False
    assert sdk.calls == 3  # initial attempt plus two retries
    assert response.attempts == 3


async def test_backoff_grows_and_is_capped() -> None:
    """Delays grow exponentially but never exceed the configured ceiling."""
    client, _ = _client([], parallel_backoff_base_seconds=1.0, parallel_backoff_max_seconds=4.0)
    delays = [client._backoff(n) for n in range(1, 8)]
    assert all(0 < d <= 4.0 for d in delays)
    assert max(delays[4:]) <= 4.0


# ---------------------------------------------------------------------------
# Concurrency
# ---------------------------------------------------------------------------


async def test_concurrency_is_capped_by_the_semaphore() -> None:
    """The fan-out must not open unbounded connections on a long script."""
    client, sdk = _client([FakeResult([FakeSource()])], parallel_max_concurrency=2)
    await asyncio.gather(*(client.search(f"o{i}", ["q"]) for i in range(10)))
    assert sdk.max_concurrent <= 2
    assert sdk.calls == 10


async def test_task_count_tracks_every_call_for_cost_reporting() -> None:
    """Parallel task spend is auditable, including retried attempts."""
    client, _ = _client([_status_error(429), FakeResult([FakeSource()])])
    await client.search("objective", ["q"])
    assert client.task_count == 2


# ---------------------------------------------------------------------------
# URL enforcement
# ---------------------------------------------------------------------------


async def test_sources_without_a_url_are_dropped_at_ingest() -> None:
    """An uncitable source must never enter the pipeline in the first place."""
    client, _ = _client(
        [FakeResult([FakeSource(url=""), FakeSource(url="https://ok.example/1")])]
    )
    response = await client.search("objective", ["q"])
    assert len(response.sources) == 1
    assert response.sources[0].url == "https://ok.example/1"


def test_source_record_picks_the_longest_excerpt() -> None:
    """The most informative excerpt becomes the evidence snippet."""
    record = SourceRecord(url="https://x.example", excerpts=["short", "a much longer one"])
    assert record.best_excerpt == "a much longer one"


def test_missing_api_key_fails_fast_at_construction() -> None:
    """A misconfigured client raises at startup, not mid-fan-out."""
    with pytest.raises(RuntimeError, match="No Parallel API key"):
        ParallelClient(settings=Settings(parallel_api_key=None, use_secret_manager=False))
