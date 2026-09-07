"""Wrapper around the Parallel API for sourced web research.

Parallel is the partner integration and the source of every piece of evidence in
a ClearFrame report. Two surfaces are used:

``search``
    Fast sourced lookup returning ranked results with URLs and excerpts. Used
    for the broad per-category sweep.
``task_run.execute``
    Deeper research against a typed output schema. Used for the structured facts
    the deterministic rules engine needs (publication year, death year, rights
    holder), where a citation-bearing structured answer is worth the extra cost.

Design rules this module enforces:

- Every call has a timeout, taken from configuration.
- 429 and 5xx responses are retried with exponential backoff and jitter.
- **Nothing raises into the agent loop.** Every method returns a
  :class:`ParallelResponse`, and failures are values with an ``error`` field.
  An agent that gets an exception mid-fan-out loses the whole run; an agent that
  gets a failed response for one item keeps the other twenty-one.
- Concurrency is bounded by a semaphore owned by the client, so the fan-out
  cannot open unbounded connections regardless of how many items a script has.
"""

from __future__ import annotations

import asyncio
import logging
import random
import time
from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field

from clearframe.config import Settings, get_settings, resolve_parallel_api_key
from clearframe.models import utcnow

logger = logging.getLogger(__name__)

# HTTP statuses worth retrying: rate limiting and transient server faults.
RETRYABLE_STATUS = {408, 409, 425, 429, 500, 502, 503, 504}


class SourceRecord(BaseModel):
    """One sourced result returned by Parallel.

    A record with no URL is not constructible as evidence downstream, so the URL
    is required here rather than being filtered later.
    """

    model_config = ConfigDict(extra="forbid")

    url: str
    title: str = ""
    excerpts: list[str] = Field(default_factory=list)

    @property
    def best_excerpt(self) -> str:
        """Return the longest excerpt, which is usually the most informative."""
        return max(self.excerpts, key=len) if self.excerpts else ""


class ParallelResponse(BaseModel):
    """Structured outcome of a Parallel call, successful or not.

    Never raises. Callers branch on :attr:`ok`.
    """

    model_config = ConfigDict(extra="forbid")

    ok: bool
    surface: str = Field(..., description="'search' or 'task'.")
    objective: str = ""
    sources: list[SourceRecord] = Field(default_factory=list)
    structured: Optional[dict[str, Any]] = Field(
        default=None, description="Typed output from the Task API, when used."
    )
    error: Optional[str] = None
    error_type: Optional[str] = None
    attempts: int = 1
    latency_ms: float = 0.0
    task_cost: int = 0
    retrieved_at: Any = Field(default_factory=utcnow)
    request_id: Optional[str] = None

    @classmethod
    def failure(
        cls, surface: str, objective: str, exc: BaseException, attempts: int, latency_ms: float
    ) -> "ParallelResponse":
        """Build a failed response from an exception.

        Args:
            surface: Which API surface was called.
            objective: The research objective that failed.
            exc: The exception that ended the attempt.
            attempts: How many attempts were made.
            latency_ms: Total elapsed time across attempts.

        Returns:
            A :class:`ParallelResponse` with ``ok=False``.
        """
        return cls(
            ok=False,
            surface=surface,
            objective=objective,
            error=f"{type(exc).__name__}: {exc}"[:500],
            error_type=type(exc).__name__,
            attempts=attempts,
            latency_ms=latency_ms,
        )


def _status_code(exc: BaseException) -> Optional[int]:
    """Extract an HTTP status code from a Parallel SDK exception.

    Args:
        exc: The raised exception.

    Returns:
        The status code, or None if the exception carries none.
    """
    for attr in ("status_code", "status"):
        value = getattr(exc, attr, None)
        if isinstance(value, int):
            return value
    response = getattr(exc, "response", None)
    code = getattr(response, "status_code", None)
    return code if isinstance(code, int) else None


def is_retryable(exc: BaseException) -> bool:
    """Return True if a failed call is worth retrying.

    Rate limits, transient server faults, timeouts and connection errors are
    retryable. Authentication and validation errors are not: retrying a bad key
    only wastes the budget.

    Args:
        exc: The exception raised by the SDK.

    Returns:
        True if the call should be retried.
    """
    import parallel

    if isinstance(exc, (parallel.APITimeoutError, parallel.APIConnectionError)):
        return True
    if isinstance(exc, (parallel.AuthenticationError, parallel.PermissionDeniedError)):
        return False
    if isinstance(exc, parallel.BadRequestError):
        return False
    if isinstance(exc, parallel.RateLimitError):
        return True
    if isinstance(exc, parallel.InternalServerError):
        return True
    code = _status_code(exc)
    if code is not None:
        return code in RETRYABLE_STATUS
    return isinstance(exc, parallel.APIError)


class ParallelClient:
    """Async Parallel client with retries, timeouts and bounded concurrency.

    Attributes:
        settings: The configuration in use.
        semaphore: Bounds simultaneous in-flight requests.
    """

    def __init__(
        self,
        settings: Optional[Settings] = None,
        api_key: Optional[str] = None,
        client: Optional[Any] = None,
    ) -> None:
        """Initialise the client.

        Args:
            settings: Loaded settings; read from the environment if omitted.
            api_key: Explicit key, overriding the resolved one. Used by tests.
            client: A pre-built async SDK client, injected by tests.

        Raises:
            RuntimeError: If no API key can be resolved and none was injected.
        """
        self.settings = settings or get_settings()
        self.semaphore = asyncio.Semaphore(self.settings.parallel_max_concurrency)
        self._task_count = 0

        if client is not None:
            self._client = client
            return

        key = api_key or resolve_parallel_api_key(self.settings)
        if not key:
            raise RuntimeError(
                "No Parallel API key. Set PARALLEL_API_KEY or enable Secret Manager."
            )
        import parallel

        self._client = parallel.AsyncParallel(
            api_key=key,
            base_url=self.settings.parallel_base_url,
            timeout=self.settings.parallel_timeout_seconds,
            max_retries=0,  # retries are handled here, with our own backoff policy
        )

    @property
    def task_count(self) -> int:
        """Return how many Parallel calls this client has issued."""
        return self._task_count

    def _backoff(self, attempt: int) -> float:
        """Return the delay before the next retry, in seconds.

        Exponential with full jitter, so a fan-out that hits a rate limit does
        not retry in lockstep and re-trigger it.

        Args:
            attempt: 1-based attempt number that just failed.

        Returns:
            Seconds to sleep before retrying.
        """
        base = self.settings.parallel_backoff_base_seconds
        raw = min(base * (2 ** (attempt - 1)), self.settings.parallel_backoff_max_seconds)
        return random.uniform(raw * 0.5, raw)

    async def _with_retries(self, surface: str, objective: str, call) -> ParallelResponse:
        """Run one API call with the retry policy, converting failures to values.

        Args:
            surface: ``"search"`` or ``"task"``, for the response record.
            objective: The research objective, for logging and the response.
            call: A zero-argument coroutine function performing the request.

        Returns:
            A :class:`ParallelResponse`. Never raises.
        """
        started = time.perf_counter()
        last: Optional[BaseException] = None
        attempts = 0

        for attempt in range(1, self.settings.parallel_max_retries + 2):
            attempts = attempt
            try:
                async with self.semaphore:
                    self._task_count += 1
                    raw = await call()
            except asyncio.CancelledError:
                raise
            except Exception as exc:  # noqa: BLE001 - converted to a value below
                last = exc
                if not is_retryable(exc) or attempt > self.settings.parallel_max_retries:
                    break
                delay = self._backoff(attempt)
                logger.warning(
                    "Parallel %s failed (%s), retry %d/%d in %.1fs: %s",
                    surface,
                    type(exc).__name__,
                    attempt,
                    self.settings.parallel_max_retries,
                    delay,
                    exc,
                )
                await asyncio.sleep(delay)
                continue

            elapsed = (time.perf_counter() - started) * 1000
            return self._to_response(surface, objective, raw, attempts, elapsed)

        elapsed = (time.perf_counter() - started) * 1000
        assert last is not None
        logger.error("Parallel %s gave up after %d attempts: %s", surface, attempts, last)
        return ParallelResponse.failure(surface, objective, last, attempts, elapsed)

    def _to_response(
        self, surface: str, objective: str, raw: Any, attempts: int, elapsed: float
    ) -> ParallelResponse:
        """Normalise an SDK result into a :class:`ParallelResponse`.

        Args:
            surface: Which surface produced the result.
            objective: The research objective.
            raw: The SDK result object.
            attempts: Number of attempts made.
            elapsed: Elapsed milliseconds.

        Returns:
            The normalised response, with sources carrying URLs only.
        """
        sources: list[SourceRecord] = []
        for result in getattr(raw, "results", None) or []:
            url = getattr(result, "url", "") or ""
            if not url:
                # Evidence with no URL cannot be cited, so it is dropped here at
                # ingest rather than being carried and filtered downstream.
                continue
            excerpts = getattr(result, "excerpts", None) or []
            sources.append(
                SourceRecord(
                    url=url,
                    title=(getattr(result, "title", "") or "")[:300],
                    excerpts=[str(e)[:1200] for e in excerpts][:5],
                )
            )

        structured: Optional[dict[str, Any]] = None
        content = getattr(getattr(raw, "output", None), "content", None)
        if content is not None:
            structured = content if isinstance(content, dict) else {"content": str(content)}

        return ParallelResponse(
            ok=True,
            surface=surface,
            objective=objective,
            sources=sources,
            structured=structured,
            attempts=attempts,
            latency_ms=elapsed,
            task_cost=1,
            request_id=getattr(raw, "search_id", None) or getattr(raw, "run_id", None),
        )

    async def search(
        self,
        objective: str,
        queries: list[str],
        mode: str = "fast",
        max_chars: int = 6000,
    ) -> ParallelResponse:
        """Run a sourced web search.

        Args:
            objective: What the research is trying to establish, in one sentence.
            queries: Search queries to run.
            mode: Parallel search mode (``turbo``, ``fast``, ``basic``, ``advanced``).
            max_chars: Cap on total characters returned across results.

        Returns:
            A :class:`ParallelResponse`; check ``ok`` before reading ``sources``.
        """

        async def call():
            return await self._client.search(
                objective=objective[:5000],
                search_queries=queries[:5],
                mode=mode,
                max_chars_total=max_chars,
            )

        return await self._with_retries("search", objective, call)

    async def task(
        self,
        objective: str,
        output_schema: Any,
        processor: Optional[str] = None,
    ) -> ParallelResponse:
        """Run a deep research task against a typed output schema.

        Args:
            objective: The research question, stated as an instruction.
            output_schema: A Pydantic model type or JSON schema for the output.
            processor: Parallel processor tier; defaults to the configured one.

        Returns:
            A :class:`ParallelResponse` whose ``structured`` field holds the
            typed result when the call succeeded.
        """

        async def call():
            return await self._client.task_run.execute(
                input=objective[:20000],
                processor=processor or self.settings.parallel_processor,
                output=output_schema,
            )

        return await self._with_retries("task", objective, call)

    async def aclose(self) -> None:
        """Close the underlying HTTP client."""
        close = getattr(self._client, "close", None)
        if close is None:
            return
        result = close()
        if asyncio.iscoroutine(result):
            await result

    async def __aenter__(self) -> "ParallelClient":
        """Enter the async context manager."""
        return self

    async def __aexit__(self, *exc_info: object) -> None:
        """Close the client on context exit."""
        await self.aclose()
