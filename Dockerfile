# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Stage 1 — build wheels
#
# Dependencies are compiled in a throwaway stage so the runtime image carries no
# compiler toolchain and no build caches.
# ---------------------------------------------------------------------------
FROM python:3.12-slim AS builder

ENV PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /build

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN python -m venv /opt/venv \
    && /opt/venv/bin/pip install --upgrade pip \
    && /opt/venv/bin/pip install -r requirements.txt


# ---------------------------------------------------------------------------
# Stage 2 — runtime
# ---------------------------------------------------------------------------
FROM python:3.12-slim AS runtime

# Non-root. Cloud Run does not require it, but a container that never needs to
# write outside its own output directory should not run as uid 0.
RUN groupadd --system --gid 1001 clearframe \
    && useradd --system --uid 1001 --gid clearframe --create-home clearframe

ENV PATH="/opt/venv/bin:$PATH" \
    PYTHONPATH=/app/src \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8080

WORKDIR /app

COPY --from=builder /opt/venv /opt/venv

COPY --chown=clearframe:clearframe src/ ./src/
COPY --chown=clearframe:clearframe data/ ./data/
COPY --chown=clearframe:clearframe frontend/ ./frontend/
COPY --chown=clearframe:clearframe scripts/ ./scripts/

# Audit trails and exports are written here at runtime.
RUN mkdir -p /app/output/audit /app/output/reports \
    && chown -R clearframe:clearframe /app/output

USER clearframe

EXPOSE 8080

# Cloud Run health checking hits this; it reports Gemini and Parallel
# configuration status as well as liveness.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD python -c "import os,urllib.request,sys; \
sys.exit(0 if urllib.request.urlopen(f\"http://127.0.0.1:{os.environ.get('PORT','8080')}/api/health\", timeout=4).status == 200 else 1)"

# Cloud Run injects $PORT and it must be honoured, so the server is started
# through a shell rather than with a hardcoded port in exec form.
CMD exec uvicorn clearframe.api.main:app \
      --host 0.0.0.0 \
      --port "${PORT}" \
      --workers 1 \
      --timeout-keep-alive 75
