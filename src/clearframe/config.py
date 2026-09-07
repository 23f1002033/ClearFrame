"""Environment-driven configuration for ClearFrame.

No API key is ever hardcoded. Secrets resolve in this order:

1. Google Secret Manager, when ``USE_SECRET_MANAGER=true`` and a project is set
   (the deployed Cloud Run path).
2. Environment variables (the local development path).

Gemini safety thresholds are configured explicitly here rather than inherited
from library defaults. Screenplays contain violence, profanity, and adult themes
as ordinary subject matter; default thresholds silently drop such chunks, and a
silently skipped scene is a missed clearance item. See
:data:`GEMINI_SAFETY_RATIONALE` and the README for the documented thresholds.
"""

from __future__ import annotations

import functools
import logging
import os
from pathlib import Path
from typing import Optional

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

logger = logging.getLogger(__name__)

PROJECT_ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = PROJECT_ROOT / "data"
DEFAULT_RULES_PATH = DATA_DIR / "copyright_rules.yaml"


class Settings(BaseSettings):
    """All runtime configuration, loaded from the environment or a ``.env`` file."""

    # env_file is anchored to the repository root rather than left relative.
    # As a relative path it resolved against the process working directory, so
    # running from any other directory silently loaded no .env at all and every
    # key came back None.
    model_config = SettingsConfigDict(
        env_file=(PROJECT_ROOT / ".env", ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    # -- Google Cloud / Gemini ------------------------------------------------
    google_cloud_project: Optional[str] = Field(
        default=None, description="GCP project id; required for Vertex AI and Secret Manager."
    )
    google_cloud_location: str = Field(
        default="us-central1", description="Vertex AI region."
    )
    google_genai_use_vertexai: bool = Field(
        default=False,
        description="True routes Gemini through Vertex AI; False uses the Gemini API key.",
    )
    google_api_key: Optional[str] = Field(
        default=None, description="Gemini API key, used when not on Vertex AI."
    )
    gemini_api_key: Optional[str] = Field(
        default=None,
        description=(
            "Alias for google_api_key. The google-genai SDK accepts either "
            "GOOGLE_API_KEY or GEMINI_API_KEY, so ClearFrame reads both and "
            "prefers GOOGLE_API_KEY when both are set."
        ),
    )

    gemini_parse_model: str = Field(
        default="gemini-flash-latest",
        description=(
            "Model for screenplay scene segmentation. Flash is safe here: scene "
            "boundaries and page numbers matched Pro exactly across every measured "
            "run, and the deterministic slugline anchor in ingest/parser.py "
            "overrides any page number the model gets wrong."
        ),
    )
    gemini_extraction_model: str = Field(
        default="gemini-3.1-pro-preview",
        description=(
            "Model for clearable-item extraction. Kept on Pro deliberately: on "
            "Flash, item recall and depiction_nature varied run to run at "
            "temperature 0, and a dropped item is never recovered by a later "
            "stage, whereas a wrong tier is at least surfaced to a reviewer."
        ),
    )
    gemini_synthesis_model: str = Field(
        default="gemini-3.1-pro-preview",
        description=(
            "Model for finding synthesis in the assembler. Kept on Pro: tiering and "
            "cited rationale are the judgment-heavy step and run once per item."
        ),
    )
    gemini_orchestrator_model: str = Field(
        default="gemini-3.1-pro-preview",
        description="Model backing the ADK root agent.",
    )
    gemini_timeout_seconds: float = Field(default=180.0, gt=0)
    gemini_max_retries: int = Field(default=3, ge=0)
    gemini_max_concurrency: int = Field(
        default=6,
        ge=1,
        le=32,
        description="Hard cap on simultaneous Gemini calls during chunk extraction.",
    )

    # -- Parallel -------------------------------------------------------------
    parallel_api_key: Optional[str] = Field(
        default=None, description="Parallel API key; prefer Secret Manager in deployment."
    )
    parallel_base_url: str = Field(default="https://api.parallel.ai")
    parallel_processor: str = Field(
        default="base",
        description="Parallel Task API processor tier (lite | base | core | pro).",
    )
    parallel_timeout_seconds: float = Field(default=300.0, gt=0)
    parallel_max_retries: int = Field(default=4, ge=0)
    parallel_max_concurrency: int = Field(
        default=6, ge=1, le=50, description="Hard cap on simultaneous research tasks."
    )
    parallel_backoff_base_seconds: float = Field(default=1.5, gt=0)
    parallel_backoff_max_seconds: float = Field(default=60.0, gt=0)

    # -- Secret Manager -------------------------------------------------------
    use_secret_manager: bool = Field(
        default=False, description="Resolve secrets from Secret Manager before env vars."
    )
    parallel_api_key_secret: str = Field(
        default="clearframe-parallel-api-key",
        description="Secret Manager secret id holding the Parallel API key.",
    )
    google_api_key_secret: str = Field(
        default="clearframe-google-api-key",
        description="Secret Manager secret id holding the Gemini API key.",
    )
    secret_version: str = Field(default="latest")

    # -- Pipeline -------------------------------------------------------------
    scenes_per_extraction_chunk: int = Field(
        default=9, ge=1, le=50, description="Scenes per Gemini extraction call."
    )
    max_evidence_per_item: int = Field(default=8, ge=1)
    rules_path: Path = Field(default=DEFAULT_RULES_PATH)
    audit_log_dir: Path = Field(default=PROJECT_ROOT / "output" / "audit")
    export_dir: Path = Field(default=PROJECT_ROOT / "output" / "reports")

    # -- Safety ---------------------------------------------------------------
    gemini_safety_threshold: str = Field(
        default="BLOCK_ONLY_HIGH",
        description="Threshold applied to every configurable harm category.",
    )

    # -- Service --------------------------------------------------------------
    app_version: str = Field(default="0.1.0")
    port: int = Field(default=8080, description="Cloud Run injects $PORT.")
    log_level: str = Field(default="INFO")

    @field_validator("gemini_safety_threshold")
    @classmethod
    def _validate_threshold(cls, v: str) -> str:
        """Reject thresholds the Gemini SDK does not define."""
        allowed = {
            "BLOCK_NONE",
            "BLOCK_ONLY_HIGH",
            "BLOCK_MEDIUM_AND_ABOVE",
            "BLOCK_LOW_AND_ABOVE",
            "OFF",
        }
        if v not in allowed:
            raise ValueError(f"gemini_safety_threshold must be one of {sorted(allowed)}")
        return v

    # -- Derived --------------------------------------------------------------
    @property
    def gemini_configured(self) -> bool:
        """Return True if Gemini can be called with the current configuration.

        On the Vertex AI path a real project id is required and the API key is
        ignored, so a placeholder project must not read as configured.
        """
        if self.google_genai_use_vertexai:
            return bool(self.google_cloud_project) and not _is_placeholder(
                self.google_cloud_project
            )
        return bool(resolve_google_api_key(self))

    def configuration_warnings(self) -> list[str]:
        """Return actionable warnings about a contradictory configuration.

        Surfaced by ``/api/health`` so a misconfigured deployment is visible
        rather than failing on the first Gemini call.
        """
        warnings: list[str] = []
        has_key = bool(resolve_google_api_key(self))
        project_ok = bool(self.google_cloud_project) and not _is_placeholder(
            self.google_cloud_project
        )

        if self.google_genai_use_vertexai:
            if not project_ok:
                warnings.append(
                    "GOOGLE_GENAI_USE_VERTEXAI=true but GOOGLE_CLOUD_PROJECT is unset or "
                    "a placeholder. Set a real project id, or set "
                    "GOOGLE_GENAI_USE_VERTEXAI=false to use an AI Studio API key."
                )
            if has_key and not project_ok:
                warnings.append(
                    "An API key is present but GOOGLE_GENAI_USE_VERTEXAI=true causes the "
                    "google-genai client to ignore it and use Application Default "
                    "Credentials instead."
                )
        elif not has_key:
            warnings.append(
                "No Gemini API key found. Set GOOGLE_API_KEY or GEMINI_API_KEY."
            )

        if not resolve_parallel_api_key(self):
            warnings.append("No Parallel API key found. Set PARALLEL_API_KEY.")
        return warnings

    @property
    def parallel_configured(self) -> bool:
        """Return True if a Parallel API key is resolvable."""
        return bool(resolve_parallel_api_key(self))


GEMINI_SAFETY_RATIONALE = (
    "ClearFrame sets every configurable Gemini harm category to BLOCK_ONLY_HIGH. "
    "Screenplays contain violence, profanity, sexual content, and drug use as "
    "ordinary dramatic subject matter. At the SDK default thresholds, Gemini "
    "silently returns no candidate for such chunks, and a silently skipped scene "
    "is a missed clearance item, which is a correctness failure for this product. "
    "Any chunk that is still blocked at this threshold is written to the audit "
    "trail as a SAFETY_BLOCKED entry naming the scene range, so the omission is "
    "visible to the reviewer instead of disappearing."
)


_PLACEHOLDER_VALUES = {"", "...", "your-project-id", "changeme", "todo", "none", "null"}


def _is_placeholder(value: Optional[str]) -> bool:
    """Return True if a config value is an unfilled placeholder rather than real.

    Args:
        value: The configured value.

    Returns:
        True if the value is empty or a recognised placeholder token.
    """
    return value is None or value.strip().lower() in _PLACEHOLDER_VALUES


def _secret_manager_get(project_id: str, secret_id: str, version: str) -> Optional[str]:
    """Fetch one secret payload from Google Secret Manager.

    Args:
        project_id: GCP project holding the secret.
        secret_id: Secret name.
        version: Secret version, usually ``"latest"``.

    Returns:
        The secret payload as a string, or None if it could not be retrieved.
        Failures are logged and swallowed so local development falls through to
        environment variables.
    """
    try:
        from google.cloud import secretmanager

        client = secretmanager.SecretManagerServiceClient()
        name = f"projects/{project_id}/secrets/{secret_id}/versions/{version}"
        response = client.access_secret_version(request={"name": name})
        return response.payload.data.decode("utf-8").strip()
    except Exception as exc:  # noqa: BLE001 - fallback path must never crash startup
        logger.warning(
            "Secret Manager lookup failed for %s (falling back to env): %s", secret_id, exc
        )
        return None


def resolve_parallel_api_key(settings: "Settings") -> Optional[str]:
    """Resolve the Parallel API key from Secret Manager, then the environment.

    Args:
        settings: Loaded settings object.

    Returns:
        The API key, or None if no source supplied one.
    """
    if settings.use_secret_manager and settings.google_cloud_project:
        secret = _secret_manager_get(
            settings.google_cloud_project,
            settings.parallel_api_key_secret,
            settings.secret_version,
        )
        if secret:
            return secret
    return settings.parallel_api_key or os.getenv("PARALLEL_API_KEY")


def resolve_google_api_key(settings: "Settings") -> Optional[str]:
    """Resolve the Gemini API key from Secret Manager, then the environment.

    Args:
        settings: Loaded settings object.

    Returns:
        The API key, or None if no source supplied one.
    """
    if settings.use_secret_manager and settings.google_cloud_project:
        secret = _secret_manager_get(
            settings.google_cloud_project,
            settings.google_api_key_secret,
            settings.secret_version,
        )
        if secret:
            return secret
    return (
        settings.google_api_key
        or settings.gemini_api_key
        or os.getenv("GOOGLE_API_KEY")
        or os.getenv("GEMINI_API_KEY")
    )


def build_safety_settings(settings: Optional["Settings"] = None) -> list:
    """Return explicit Gemini safety settings for every configurable category.

    Thresholds are set deliberately rather than inherited from SDK defaults; see
    :data:`GEMINI_SAFETY_RATIONALE`.

    Args:
        settings: Settings to read the threshold from; loaded if omitted.

    Returns:
        A list of ``google.genai.types.SafetySetting`` objects.
    """
    from google.genai import types

    settings = settings or get_settings()
    threshold = types.HarmBlockThreshold(settings.gemini_safety_threshold)
    categories = [
        types.HarmCategory.HARM_CATEGORY_HARASSMENT,
        types.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        types.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        types.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    ]
    return [
        types.SafetySetting(category=category, threshold=threshold)
        for category in categories
    ]


def describe_key_source(name: str, settings: "Settings") -> dict[str, Any]:
    """Report where a secret resolved from, without ever revealing its value.

    Precedence in pydantic-settings is: init kwargs > OS environment > .env file
    > defaults. An OS variable therefore shadows the ``.env`` entry, including
    when it is set but empty, which is almost always an accident.

    Args:
        name: Environment variable name, e.g. ``"PARALLEL_API_KEY"``.
        settings: Loaded settings.

    Returns:
        A dict describing presence, length and origin. Never contains the key.
    """
    resolver = {
        "PARALLEL_API_KEY": resolve_parallel_api_key,
        "GOOGLE_API_KEY": resolve_google_api_key,
    }.get(name)
    value = resolver(settings) if resolver else os.getenv(name)

    raw_env = os.environ.get(name)
    if raw_env is not None and raw_env.strip() == "":
        source = "OS environment (SET BUT EMPTY - shadows .env)"
    elif raw_env:
        source = "OS environment"
    elif value:
        source = ".env file or Secret Manager"
    else:
        source = "NOT FOUND"

    if settings.use_secret_manager and settings.google_cloud_project and value:
        source = f"Secret Manager (or fallback: {source})"

    return {
        "name": name,
        "present": bool(value),
        "length": len(value) if value else 0,
        "prefix": (value[:4] + "...") if value and len(value) > 8 else None,
        "source": source,
        "env_shadowing_dotenv": raw_env is not None,
    }


def preflight(settings: Optional["Settings"] = None, stage: str = "") -> list[dict[str, Any]]:
    """Log the resolved state of every secret before a stage that needs one.

    Emits the length and origin of each key and never the key itself. This exists
    so a missing or shadowed credential is visible at the top of a run rather
    than surfacing as an authentication error deep inside a concurrent fan-out,
    where it is attributed to the wrong component.

    Args:
        settings: Loaded settings; read from the environment if omitted.
        stage: Name of the stage about to run, for the log line.

    Returns:
        One descriptor per key, suitable for the audit trail.
    """
    settings = settings or get_settings()
    reports = [
        describe_key_source("GOOGLE_API_KEY", settings),
        describe_key_source("PARALLEL_API_KEY", settings),
    ]
    label = f" before {stage}" if stage else ""
    logger.info("ClearFrame credential preflight%s:", label)
    for report in reports:
        if report["present"]:
            logger.info(
                "  %s: resolved, length=%d, prefix=%s, source=%s",
                report["name"],
                report["length"],
                report["prefix"],
                report["source"],
            )
        else:
            logger.error(
                "  %s: NOT RESOLVED (source=%s). Calls requiring it will fail.",
                report["name"],
                report["source"],
            )
        if "SET BUT EMPTY" in report["source"]:
            logger.error(
                "  %s is set to an empty string in the OS environment, which "
                "shadows the .env value. Unset it: `unset %s`",
                report["name"],
                report["name"],
            )
    if settings.google_genai_use_vertexai:
        logger.info("  Gemini auth path: Vertex AI (API key ignored, ADC used)")
    else:
        logger.info("  Gemini auth path: AI Studio API key")
    logger.info("  .env searched at: %s (exists=%s)", PROJECT_ROOT / ".env",
                (PROJECT_ROOT / ".env").exists())
    return reports


@functools.lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return the process-wide settings singleton.

    Returns:
        The cached :class:`Settings` instance.
    """
    settings = Settings()
    logging.basicConfig(
        level=getattr(logging, settings.log_level.upper(), logging.INFO),
        format="%(asctime)s %(levelname)s %(name)s %(message)s",
    )
    return settings
