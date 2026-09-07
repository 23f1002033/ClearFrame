"""Shared Gemini client construction and retry policy.

Standing rule: every network call has a timeout and a retry policy. The Parallel
wrapper has had one from the start; Gemini calls did not, which meant a single
429 during the assembly fan-out silently degraded an item to an empty rationale
and a NEEDS_VERIFICATION tier. That failure is easy to miss because the tier
distribution still looks plausible, so it is exactly the kind of gap worth
closing in one place rather than at each call site.

Retries fire on rate limits, transient server faults and timeouts. They never
fire on authentication or malformed-request errors, where retrying only burns
quota.
"""

from __future__ import annotations

import asyncio
import logging
import random
import re
from typing import Any, Optional

from clearframe.config import Settings, get_settings

logger = logging.getLogger(__name__)

# Substrings that identify a transient Gemini failure. The SDK raises
# ClientError/ServerError carrying the HTTP status in the message, so the status
# is matched textually as well as structurally.
_RETRYABLE_STATUS = {408, 409, 425, 429, 500, 502, 503, 504}
_RETRYABLE_TOKENS = (
    "rate limit",
    "resource exhausted",
    "resource_exhausted",
    "quota",
    "deadline exceeded",
    "unavailable",
    "internal error",
    "overloaded",
    "try again",
)
_FATAL_TOKENS = (
    "api key not valid",
    "permission denied",
    "unauthenticated",
    "invalid argument",
    "not found",
)


def build_client(settings: Optional[Settings] = None):
    """Construct a google-genai client for the configured auth path.

    Args:
        settings: Loaded settings; read from the environment if omitted.

    Returns:
        A configured ``google.genai.Client``. On the Vertex path the API key is
        ignored and Application Default Credentials are used.
    """
    from google import genai

    from clearframe.config import resolve_google_api_key

    settings = settings or get_settings()
    http_options = {"timeout": int(settings.gemini_timeout_seconds * 1000)}

    if settings.google_genai_use_vertexai:
        return genai.Client(
            vertexai=True,
            project=settings.google_cloud_project,
            location=settings.google_cloud_location,
            http_options=http_options,
        )
    return genai.Client(
        api_key=resolve_google_api_key(settings), http_options=http_options
    )


def _status_of(exc: BaseException) -> Optional[int]:
    """Extract an HTTP status code from a Gemini SDK exception.

    Args:
        exc: The raised exception.

    Returns:
        The status code if one can be determined, else None.
    """
    for attr in ("code", "status_code"):
        value = getattr(exc, attr, None)
        if isinstance(value, int):
            return value
    match = re.search(r"\b([45]\d{2})\b", str(exc))
    return int(match.group(1)) if match else None


def is_retryable(exc: BaseException) -> bool:
    """Return True if a failed Gemini call is worth retrying.

    Args:
        exc: The exception raised by the SDK.

    Returns:
        True for rate limits, transient server faults and timeouts; False for
        authentication and validation failures.
    """
    if isinstance(exc, (asyncio.TimeoutError, TimeoutError, ConnectionError)):
        return True

    message = str(exc).lower()
    if any(token in message for token in _FATAL_TOKENS):
        return False
    if any(token in message for token in _RETRYABLE_TOKENS):
        return True

    status = _status_of(exc)
    if status is not None:
        return status in _RETRYABLE_STATUS
    return False


def backoff_delay(attempt: int, settings: Settings) -> float:
    """Return the delay before the next retry, in seconds.

    Exponential with full jitter, so a concurrent fan-out that trips a rate limit
    does not retry in lockstep and immediately trip it again.

    Args:
        attempt: 1-based number of the attempt that just failed.
        settings: Loaded settings, for the backoff bounds.

    Returns:
        Seconds to sleep.
    """
    raw = min(1.5 * (2 ** (attempt - 1)), 45.0)
    return random.uniform(raw * 0.5, raw)


async def generate_with_retry(
    client: Any,
    model: str,
    contents: Any,
    config: Any,
    settings: Optional[Settings] = None,
    label: str = "",
) -> Any:
    """Call Gemini asynchronously with the shared retry policy.

    Args:
        client: A ``google.genai.Client``.
        model: Model id.
        contents: Prompt contents.
        config: A ``types.GenerateContentConfig``.
        settings: Loaded settings; read from the environment if omitted.
        label: Short description used in retry logs.

    Returns:
        The model response.

    Raises:
        Exception: The final exception if every attempt failed. Callers convert
            this into an audited failure rather than letting it escape.
    """
    settings = settings or get_settings()
    last: Optional[BaseException] = None

    for attempt in range(1, settings.gemini_max_retries + 2):
        try:
            return await client.aio.models.generate_content(
                model=model, contents=contents, config=config
            )
        except asyncio.CancelledError:
            raise
        except Exception as exc:  # noqa: BLE001 - re-raised below when exhausted
            last = exc
            if not is_retryable(exc) or attempt > settings.gemini_max_retries:
                raise
            delay = backoff_delay(attempt, settings)
            logger.warning(
                "Gemini call%s failed (%s), retry %d/%d in %.1fs: %s",
                f" [{label}]" if label else "",
                type(exc).__name__,
                attempt,
                settings.gemini_max_retries,
                delay,
                str(exc)[:200],
            )
            await asyncio.sleep(delay)

    assert last is not None
    raise last
