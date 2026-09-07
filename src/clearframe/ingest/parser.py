"""Screenplay ingest: PDF and plain text to :class:`~clearframe.models.Scene`.

Page numbers are the load-bearing output of this module. A finding tells counsel
"NIKE, page 4"; if that page number is wrong the finding is worthless, because
the reviewer cannot locate the item in the physical script.

The parser therefore anchors page numbers to physical page boundaries rather
than letting a model estimate them:

1. ``pypdf`` splits the PDF into pages, giving true page boundaries and real
   per-page text. Plain text is split on form feeds, or on a standard 55-line
   screenplay page when no form feeds are present.
2. Each page is wrapped in an explicit ``<<<PAGE n>>>`` marker, and the marked
   document is handed to Gemini, which segments it into scenes and classifies
   action against dialogue. This is the judgment work: non-standard sluglines,
   continued scenes, dual dialogue, and inserts.
3. A deterministic slugline parser runs over the same pages independently. Its
   output reconciles Gemini's: any scene Gemini missed is recovered, and any
   page number Gemini invented is corrected against the physical page on which
   the heading actually appears.

Step 3 is what makes the page numbers trustworthy. Gemini never has the last
word on a page number.
"""

from __future__ import annotations

import logging
import re
import time
from pathlib import Path
from typing import Optional

from pydantic import BaseModel, Field

from clearframe.audit.logger import AuditLogger
from clearframe.config import Settings, get_settings
from clearframe.models import PipelineStage, Scene, ScriptDocument

logger = logging.getLogger(__name__)

# A standard US screenplay page is 55 lines of Courier 12pt.
LINES_PER_PAGE = 55

# Sluglines: INT./EXT. and their common variants, plus transitions that open a
# scene. Anchored to line start because a slugline is always flush left.
SLUGLINE_RE = re.compile(
    r"^\s{0,15}((?:INT|EXT|INT\.?/EXT|I/E|EST)[\./\s][^\n]{0,120})$",
    re.MULTILINE,
)

# A character cue is a short all-caps name on its own line, optionally followed
# by (CONT'D), (O.S.) or (V.O.). Screenplay convention indents cues, but that
# indentation is lost by PDF text extraction and absent from many plain-text
# and Fountain scripts, so the pattern allows any indentation and relies on the
# guards in :func:`_is_character_cue` to avoid swallowing all-caps action lines.
CHARACTER_CUE_RE = re.compile(
    r"^\s*([A-Z][A-Z0-9 .'\-]{0,34})"
    r"(\s*\((?:CONT'D|CONTD|O\.S\.|V\.O\.|OS|VO|OFF)\))?\s*$"
)

# All-caps lines that are structural, not character cues.
_NON_CUE_LINES = {
    "FADE IN", "FADE OUT", "FADE TO BLACK", "CUT TO", "SMASH CUT TO", "DISSOLVE TO",
    "MATCH CUT TO", "BACK TO SCENE", "THE END", "CONTINUED", "INSERT", "MONTAGE",
    "END MONTAGE", "TITLE CARD", "SUPER", "INTERCUT", "BEGIN FLASHBACK",
    "END FLASHBACK", "PRELAP", "V O", "O S",
}

# A parenthetical ("(beat)", "(too quickly)") belongs to the dialogue block.
PARENTHETICAL_RE = re.compile(r"^\s*\([^)]{0,60}\)\s*$")


def _is_character_cue(line: str) -> bool:
    """Return True if a line is a character cue rather than action.

    Screenplay indentation is unreliable after PDF extraction, so this decides
    structurally: the line must be short, entirely upper case, free of sentence
    punctuation, and not one of the standard transitions or shot headings.

    Args:
        line: A single line of script text.

    Returns:
        True if the line should open a dialogue block.
    """
    stripped = line.strip()
    if not stripped or len(stripped) > 40:
        return False
    if SLUGLINE_RE.match(stripped):
        return False
    match = CHARACTER_CUE_RE.match(line)
    if not match:
        return False
    name = match.group(1).strip().rstrip(":").strip()
    if not name or not name.isupper():
        return False
    # A cue never ends a sentence and never contains terminal punctuation.
    if any(ch in name for ch in ".!?,;"):
        # Allow initials such as "J.T." but not "SHE OPENS IT."
        if not re.fullmatch(r"[A-Z]\.[A-Z]\.?", name.replace(" ", "")):
            return False
    base = re.sub(r"[^A-Z ]", "", name).strip()
    if base in _NON_CUE_LINES:
        return False
    # Cues are names, not sentences: cap the word count.
    return len(name.split()) <= 4

PAGE_MARKER = "<<<PAGE {n}>>>"
PAGE_MARKER_RE = re.compile(r"<<<PAGE (\d+)>>>")


class PageText(BaseModel):
    """Text of one physical page, with its true page number."""

    page_number: int = Field(..., ge=1)
    text: str


class _GeminiScene(BaseModel):
    """Response schema for one scene returned by Gemini.

    Deliberately flat and small: the model does better at segmentation when it
    is not also asked to nest structures.
    """

    page_number: int = Field(
        ..., description="Page the scene heading appears on, from the <<<PAGE n>>> markers."
    )
    heading: str = Field(..., description="Verbatim scene heading.")
    action_text: str = Field(default="", description="Action and description lines only.")
    dialogue_text: str = Field(
        default="", description="Character cues, parentheticals and spoken lines only."
    )


class ParserError(Exception):
    """Raised when a script cannot be read at all."""


# ---------------------------------------------------------------------------
# Page extraction
# ---------------------------------------------------------------------------


def extract_pages(path: Path) -> list[PageText]:
    """Split a script file into pages with true page numbers.

    Args:
        path: Path to a ``.pdf``, ``.txt``, or ``.fountain`` file.

    Returns:
        One :class:`PageText` per physical page, in order.

    Raises:
        ParserError: If the file is missing or its type is unsupported.
    """
    path = Path(path)
    if not path.exists():
        raise ParserError(f"script not found: {path}")

    suffix = path.suffix.lower()
    if suffix == ".pdf":
        return _pages_from_pdf(path)
    if suffix in {".txt", ".fountain", ".fdx", ".md", ""}:
        return _pages_from_text(path.read_text(encoding="utf-8", errors="replace"))
    raise ParserError(f"unsupported script format {suffix!r} (use .pdf, .txt or .fountain)")


def _pages_from_pdf(path: Path) -> list[PageText]:
    """Extract per-page text from a PDF, preserving true page boundaries.

    Args:
        path: Path to the PDF.

    Returns:
        One :class:`PageText` per PDF page. Pages that yield no extractable text
        are still returned, so the page numbering never shifts.

    Raises:
        ParserError: If the PDF cannot be opened.
    """
    try:
        from pypdf import PdfReader

        reader = PdfReader(str(path))
    except Exception as exc:  # noqa: BLE001 - surfaced as a domain error
        raise ParserError(f"could not read PDF {path}: {exc}") from exc

    pages: list[PageText] = []
    for index, page in enumerate(reader.pages, start=1):
        try:
            text = page.extract_text() or ""
        except Exception as exc:  # noqa: BLE001 - one bad page must not lose the rest
            logger.warning("page %d of %s did not extract: %s", index, path, exc)
            text = ""
        pages.append(PageText(page_number=index, text=text))
    return pages


def _pages_from_text(raw: str) -> list[PageText]:
    """Split plain text into pages.

    Honours form feeds when the file has them, since that is how paginated
    screenplay text marks page breaks. Falls back to a standard 55-line page.

    Args:
        raw: The full text of the script.

    Returns:
        One :class:`PageText` per page.
    """
    if "\f" in raw:
        chunks = raw.split("\f")
        return [
            PageText(page_number=i, text=chunk)
            for i, chunk in enumerate(chunks, start=1)
            if chunk.strip() or i == 1
        ]

    lines = raw.splitlines()
    pages: list[PageText] = []
    for i in range(0, max(len(lines), 1), LINES_PER_PAGE):
        pages.append(
            PageText(
                page_number=len(pages) + 1,
                text="\n".join(lines[i : i + LINES_PER_PAGE]),
            )
        )
    return pages


def build_marked_document(pages: list[PageText]) -> str:
    """Join pages into one document with explicit page markers.

    The markers are what let Gemini attribute a scene to a real page instead of
    estimating one.

    Args:
        pages: The extracted pages.

    Returns:
        The marked document.
    """
    return "\n".join(f"{PAGE_MARKER.format(n=p.page_number)}\n{p.text}" for p in pages)


# ---------------------------------------------------------------------------
# Deterministic parsing (the page-number anchor)
# ---------------------------------------------------------------------------


def deterministic_scenes(pages: list[PageText]) -> list[Scene]:
    """Segment scenes by slugline using pure pattern matching.

    This runs on every parse regardless of whether Gemini is available. It is
    the authority on which physical page a heading sits on, and the fallback
    when the model is unavailable.

    Args:
        pages: The extracted pages.

    Returns:
        Scenes in script order, numbered from 1.
    """
    # Flatten to lines while remembering each line's true page.
    flat: list[tuple[int, str]] = []
    for page in pages:
        for line in page.text.splitlines():
            flat.append((page.page_number, line))

    starts: list[int] = [
        i for i, (_, line) in enumerate(flat) if SLUGLINE_RE.match(line.rstrip())
    ]
    if not starts:
        return []

    scenes: list[Scene] = []
    for scene_index, start in enumerate(starts):
        end = starts[scene_index + 1] if scene_index + 1 < len(starts) else len(flat)
        page_number, heading_line = flat[start]
        body = flat[start + 1 : end]

        action_lines: list[str] = []
        dialogue_lines: list[str] = []
        in_dialogue = False
        for _, line in body:
            if not line.strip():
                in_dialogue = False
                continue
            if _is_character_cue(line):
                in_dialogue = True
                dialogue_lines.append(line.strip())
                continue
            if in_dialogue or PARENTHETICAL_RE.match(line):
                dialogue_lines.append(line.strip())
                continue
            action_lines.append(line.strip())

        scenes.append(
            Scene(
                scene_number=scene_index + 1,
                page_number=page_number,
                heading=heading_line.strip(),
                action_text="\n".join(action_lines).strip(),
                dialogue_text="\n".join(dialogue_lines).strip(),
            )
        )
    return scenes


def _normalize_heading(heading: str) -> str:
    """Return a heading reduced to a comparable key.

    Used to match a Gemini-returned heading against the deterministic one
    despite whitespace, punctuation and scene-number differences.

    Args:
        heading: Raw scene heading.

    Returns:
        A lowercase alphanumeric key.
    """
    stripped = re.sub(r"^\s*\d+[A-Z]?[\.\)]?\s*", "", heading.strip())
    return re.sub(r"[^a-z0-9]+", " ", stripped.lower()).strip()


# ---------------------------------------------------------------------------
# Gemini document understanding
# ---------------------------------------------------------------------------


_PARSE_PROMPT = """\
You are segmenting a feature screenplay into scenes for a rights-clearance
review. Accuracy of page attribution is the priority: a reviewer will use your
page numbers to find each scene in the physical script.

The document below is annotated with explicit page markers of the form
<<<PAGE n>>>. Everything after a marker and before the next marker is physically
printed on page n.

For every scene in the script, return an object with:

- page_number: the page on which the scene HEADING appears. Read this from the
  nearest preceding <<<PAGE n>>> marker. Never estimate or interpolate it. If a
  scene continues across a page break, use the page where its heading appears.
- heading: the scene heading exactly as printed (e.g. "INT. VALLEY PAWN & LOAN - DAY").
- action_text: only the action and description lines of that scene.
- dialogue_text: only character cues, parentheticals and spoken lines.

Rules:
- Return scenes in the order they appear in the script.
- Include EVERY scene. Do not merge two scenes, and do not skip a short one.
- Treat INT., EXT., INT./EXT., I/E and EST. sluglines as scene starts.
- Do not include the title page, "FADE IN:", or "THE END" as scenes.
- Copy text verbatim. Never summarise, paraphrase or omit lines.
- Adult language, violence and drug references are ordinary screenplay subject
  matter. Segment them exactly like any other scene.

SCRIPT:
"""


def gemini_scenes(
    pages: list[PageText],
    settings: Optional[Settings] = None,
    audit: Optional[AuditLogger] = None,
) -> list[Scene]:
    """Segment scenes with Gemini document understanding.

    Args:
        pages: The extracted pages, carrying true page numbers.
        settings: Loaded settings; read from the environment if omitted.
        audit: Audit logger; safety blocks and failures are recorded here.

    Returns:
        Scenes as returned by the model, or an empty list if the call produced
        no usable content. An empty return is always accompanied by an audit
        entry, never a silent drop.
    """
    from google import genai
    from google.genai import types

    from clearframe.config import build_safety_settings, resolve_google_api_key

    settings = settings or get_settings()
    marked = build_marked_document(pages)

    client_kwargs: dict[str, object] = {}
    if not settings.google_genai_use_vertexai:
        client_kwargs["api_key"] = resolve_google_api_key(settings)
    else:
        client_kwargs.update(
            vertexai=True,
            project=settings.google_cloud_project,
            location=settings.google_cloud_location,
        )
    client = genai.Client(**client_kwargs)

    config = types.GenerateContentConfig(
        safety_settings=build_safety_settings(settings),
        temperature=0.0,
        response_mime_type="application/json",
        response_schema=list[_GeminiScene],
        max_output_tokens=60000,
    )

    started = time.perf_counter()
    try:
        response = client.models.generate_content(
            model=settings.gemini_parse_model,
            contents=_PARSE_PROMPT + marked,
            config=config,
        )
    except Exception as exc:  # noqa: BLE001 - fall back to deterministic parsing
        if audit:
            audit.record(
                stage=PipelineStage.INGEST,
                tool="gemini.parse_scenes",
                input_summary=f"{len(pages)} pages",
                output_summary=f"FAILED: {type(exc).__name__}: {exc}",
                latency_ms=(time.perf_counter() - started) * 1000,
                level="ERROR",
            )
        logger.warning("Gemini scene parsing failed, using deterministic parser: %s", exc)
        return []

    parsed = getattr(response, "parsed", None)
    if not parsed:
        finish_reason = "UNKNOWN"
        ratings = None
        if response.candidates:
            finish_reason = str(response.candidates[0].finish_reason)
            ratings = response.candidates[0].safety_ratings
        if audit:
            audit.record_safety_block(
                stage=PipelineStage.INGEST,
                tool="gemini.parse_scenes",
                scope=f"pages 1-{len(pages)}",
                finish_reason=finish_reason,
                ratings=ratings,
            )
        logger.warning("Gemini returned no scenes (finish_reason=%s)", finish_reason)
        return []

    if audit:
        usage = getattr(response, "usage_metadata", None)
        audit.record(
            stage=PipelineStage.INGEST,
            tool="gemini.parse_scenes",
            input_summary=f"{len(pages)} pages, {len(marked)} chars",
            output_summary=f"{len(parsed)} scenes segmented",
            latency_ms=(time.perf_counter() - started) * 1000,
            token_cost=getattr(usage, "total_token_count", None),
            model=settings.gemini_parse_model,
        )

    max_page = max((p.page_number for p in pages), default=1)
    scenes: list[Scene] = []
    for index, item in enumerate(parsed, start=1):
        scenes.append(
            Scene(
                scene_number=index,
                # Clamp defensively; reconciliation corrects this properly below.
                page_number=min(max(int(item.page_number), 1), max_page),
                heading=item.heading.strip(),
                action_text=item.action_text.strip(),
                dialogue_text=item.dialogue_text.strip(),
            )
        )
    return scenes


# ---------------------------------------------------------------------------
# Reconciliation
# ---------------------------------------------------------------------------


def reconcile(
    model_scenes: list[Scene], anchor_scenes: list[Scene]
) -> tuple[list[Scene], list[str]]:
    """Correct model page numbers against the deterministic anchor and recover misses.

    The deterministic parser knows exactly which physical page each slugline was
    printed on, so it wins every page-number disagreement. Gemini contributes
    the segmentation and the action/dialogue split.

    Args:
        model_scenes: Scenes returned by Gemini.
        anchor_scenes: Scenes found by the deterministic slugline parser.

    Returns:
        A tuple of the reconciled scenes and human-readable notes describing
        every correction and recovery, for the report's ``parser_notes``.
    """
    notes: list[str] = []
    if not model_scenes:
        if anchor_scenes:
            notes.append(
                f"Gemini returned no scenes; used the deterministic slugline parser "
                f"({len(anchor_scenes)} scenes)."
            )
        return anchor_scenes, notes
    if not anchor_scenes:
        notes.append(
            "No sluglines matched the deterministic parser, so Gemini page numbers "
            "could not be independently verified."
        )
        return model_scenes, notes

    anchor_by_key: dict[str, list[Scene]] = {}
    for scene in anchor_scenes:
        anchor_by_key.setdefault(_normalize_heading(scene.heading), []).append(scene)

    matched_ids: set[int] = set()
    reconciled: list[Scene] = []

    for scene in model_scenes:
        key = _normalize_heading(scene.heading)
        candidates = anchor_by_key.get(key, [])
        match = next((c for c in candidates if id(c) not in matched_ids), None)
        if match is not None:
            matched_ids.add(id(match))
            if match.page_number != scene.page_number:
                notes.append(
                    f"Corrected page for {scene.heading!r}: model said "
                    f"p.{scene.page_number}, the heading is printed on "
                    f"p.{match.page_number}."
                )
            reconciled.append(
                scene.model_copy(update={"page_number": match.page_number})
            )
        else:
            notes.append(
                f"Scene {scene.heading!r} (model, p.{scene.page_number}) has no matching "
                f"slugline in the source text; its page number is unverified."
            )
            reconciled.append(scene)

    # Recover any scene the model dropped. A missed scene is a missed item.
    for scene in anchor_scenes:
        if id(scene) not in matched_ids:
            notes.append(
                f"Recovered scene {scene.heading!r} on p.{scene.page_number}, which the "
                f"model omitted."
            )
            reconciled.append(scene)

    reconciled.sort(key=lambda s: (s.page_number, s.scene_number))
    return (
        [s.model_copy(update={"scene_number": i}) for i, s in enumerate(reconciled, 1)],
        notes,
    )


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------


def parse_script(
    path: Path,
    script_name: Optional[str] = None,
    settings: Optional[Settings] = None,
    audit: Optional[AuditLogger] = None,
    use_gemini: bool = True,
) -> ScriptDocument:
    """Parse a screenplay into a :class:`~clearframe.models.ScriptDocument`.

    Args:
        path: Path to the ``.pdf``, ``.txt`` or ``.fountain`` script.
        script_name: Display name; defaults to the file stem.
        settings: Loaded settings; read from the environment if omitted.
        audit: Audit logger for the ingest stage.
        use_gemini: Set False to run the deterministic parser alone, which the
            test suite and offline benchmark runs use.

    Returns:
        The parsed document, with page numbers anchored to physical pages and
        ``parser_notes`` describing any correction, recovery or gap.

    Raises:
        ParserError: If the file is missing or unsupported.
    """
    path = Path(path)
    settings = settings or get_settings()
    pages = extract_pages(path)
    anchor = deterministic_scenes(pages)

    model_scenes: list[Scene] = []
    if use_gemini and settings.gemini_configured:
        model_scenes = gemini_scenes(pages, settings=settings, audit=audit)
    elif use_gemini and audit:
        audit.record(
            stage=PipelineStage.INGEST,
            tool="gemini.parse_scenes",
            input_summary=str(path.name),
            output_summary="SKIPPED: Gemini not configured; deterministic parser only.",
            level="WARNING",
        )

    scenes, notes = reconcile(model_scenes, anchor)

    empty_pages = [p.page_number for p in pages if not p.text.strip()]
    if empty_pages:
        notes.append(
            f"Pages with no extractable text: {empty_pages}. These were not analysed "
            f"and may contain clearance items."
        )

    document = ScriptDocument(
        script_name=script_name or path.stem.replace("_", " ").title(),
        source_filename=path.name,
        page_count=len(pages),
        scenes=scenes,
        parser_notes=notes,
    )

    if audit:
        audit.record(
            stage=PipelineStage.INGEST,
            tool="parser.parse_script",
            input_summary=f"{path.name} ({len(pages)} pages)",
            output_summary=f"{len(scenes)} scenes, {len(notes)} parser notes",
            level="WARNING" if notes else "INFO",
            parser_notes=notes,
        )
    return document
