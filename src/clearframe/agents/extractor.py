"""Gemini structured extraction of clearable items from screenplay scenes.

Scenes are chunked (never split mid-scene), each chunk is sent to Gemini under a
strict JSON response schema, and the resulting items are deduplicated before any
research runs.

Deduplication is the pipeline's main cost control. One
:class:`~clearframe.models.ExtractedItem` becomes exactly one Parallel research
fan-out, so merging "Coke", "Coca-Cola" and "a Coca-Cola" into a single item
with three occurrences turns three paid deep-research tasks into one. Merging is
conservative by design: over-merging hides a distinct item from the reviewer,
which is a worse failure than paying for one redundant lookup.
"""

from __future__ import annotations

import asyncio
import logging
import re
import time
from typing import Iterable, Optional

from pydantic import BaseModel, Field

from clearframe.audit.logger import AuditLogger
from clearframe.config import Settings, get_settings
from clearframe.models import (
    DepictionNature,
    ExtractedItem,
    ItemCategory,
    Occurrence,
    PipelineStage,
    Scene,
    normalize_name,
    stable_item_id,
)

logger = logging.getLogger(__name__)

# Known surface-form aliases that normalisation alone cannot merge, because the
# strings share no tokens. Kept deliberately short and high-confidence: this
# table is a correctness aid, not a brand database. The model's own canonical
# `normalized_name` output does the general work.
CANONICAL_ALIASES: dict[str, str] = {
    "coke": "coca cola",
    "cocacola": "coca cola",
    "pepsi cola": "pepsi",
    "mcdonalds": "mcdonald s",
    "macdonalds": "mcdonald s",
    "fedex": "federal express",
    "the gap": "gap",
    "kleenex tissue": "kleenex",
    "band aid": "band aid",
    "google it": "google",
    "xerox machine": "xerox",
    "levis": "levi strauss",
    "jack daniels": "jack daniel s",
    "budweiser beer": "budweiser",
    "marlboros": "marlboro",
    "iphone": "apple iphone",
}


class _GeminiItem(BaseModel):
    """Response schema for one extracted item within a single chunk.

    Flat by design. Occurrences are carried one-per-object here and merged into
    :class:`~clearframe.models.ExtractedItem` during deduplication, because the
    model is markedly more reliable emitting flat records than nested ones.
    """

    mention_text: str = Field(
        ..., description="The mention exactly as printed in the script. Never paraphrased."
    )
    normalized_name: str = Field(
        ...,
        description="Canonical real-world name of the entity, e.g. 'Coke' -> 'Coca-Cola'.",
    )
    category: str = Field(..., description="One of the seven ItemCategory values.")
    scene_number: int = Field(..., description="Scene in which this mention occurs.")
    context_snippet: str = Field(
        ..., description="Verbatim surrounding text, roughly one to three lines."
    )
    on_screen: bool = Field(
        ..., description="True if visually depicted; false if only spoken in dialogue."
    )
    depiction_nature: str = Field(
        ..., description="POSITIVE, NEUTRAL or NEGATIVE, judged from context."
    )
    extraction_note: str = Field(
        default="", description="Why this was flagged, if not self-evident."
    )


EXTRACTION_PROMPT = """\
You are a script-clearance researcher preparing a rights review for a film
production. Your job is to find every item in these scenes that a clearance
attorney would need to check. You are gathering evidence for a human reviewer.
You are not deciding whether anything may be used.

Return one object per MENTION. If an entity is mentioned three times, return
three objects; they are merged downstream.

CATEGORIES (use exactly one of these strings):
- BRAND_TRADEMARK          a branded product, company or mark (Coca-Cola, Nike, Rolex)
- MUSIC                    a song, composition, recording, artist or album
- REAL_PERSON              a real, identifiable living or dead person
- REAL_LOCATION_BUSINESS   a real place or business (Chateau Marmont, Katz's Deli)
- PUBLISHED_WORK           a book, film, TV show, play, poem or artwork
- NAME_COLLISION           a FICTIONAL name that plausibly collides with a real entity
- LOGO_PROP                a logo, signage, packaging or branded prop visible on screen

FIELDS:
- mention_text: copy the mention EXACTLY as printed, character for character.
  Never paraphrase, expand, correct spelling, or change capitalisation.
- normalized_name: the canonical real-world name of the entity. Resolve
  abbreviations and nicknames here: "Coke" -> "Coca-Cola", "the Chateau" ->
  "Chateau Marmont", "Blackbird" -> "Bye Bye Blackbird". If you cannot resolve
  it confidently, repeat mention_text.
- scene_number: the scene number given in the SCENES block below.
- context_snippet: the surrounding text, verbatim, one to three lines. Enough
  that a reviewer can judge the use without opening the script.
- on_screen: true if the item is VISUALLY DEPICTED (appears in action lines,
  props, signage, wardrobe, or is described as seen). false if it is only
  SPOKEN ABOUT in dialogue and never shown. This distinction changes the
  clearance exposure materially, so decide it deliberately.
- depiction_nature: judge from surrounding context.
    POSITIVE  the entity is shown favourably or endorsed
    NEUTRAL   incidental, background, or merely referenced
    NEGATIVE  the entity is criticised, mocked, associated with crime, disease,
              incompetence or moral failure, or is otherwise disparaged
  Negative depiction of a real entity carries materially different legal
  exposure, so read the surrounding lines carefully before choosing NEUTRAL.

WHAT TO FLAG:
- Branded products, even in passing dialogue.
- Songs by title, lyric quotation, or description of a recording being played.
  Flag the song ONCE per mention; the composition and the recording are resolved
  as separate rights later.
- Real people named or unmistakably described.
- Real businesses and landmarks used as settings.
- Books, films and artworks named on screen or in dialogue.
- Fictional company or character names that plausibly collide with a real
  entity of the same name. Flag these as NAME_COLLISION, not BRAND_TRADEMARK.
- Logos, signage and packaging described as visible.

WHAT NOT TO DO:
- Do not invent items. If a chunk contains nothing flaggable, return an empty
  list. An empty list is a correct and expected answer.
- Do not flag generic unbranded nouns ("a car", "a guitar", "a cigarette").
  Flag them only when a brand is named or clearly implied.
- Do not flag the screenplay's own fictional characters as REAL_PERSON.
- Do not omit an item because you think it is probably fine. Triage is the
  reviewer's job, not yours.

Adult language, violence, drug use and sexual content are ordinary screenplay
subject matter. Analyse those scenes exactly as you would any other; skipping a
scene means a missed clearance item.

SCENES:
"""


def chunk_scenes(scenes: list[Scene], size: int) -> list[list[Scene]]:
    """Group scenes into chunks without ever splitting a scene.

    Args:
        scenes: Scenes in script order.
        size: Target number of scenes per chunk.

    Returns:
        A list of scene chunks, each preserving script order.
    """
    if size < 1:
        raise ValueError("chunk size must be at least 1")
    return [scenes[i : i + size] for i in range(0, len(scenes), size)]


def render_chunk(scenes: Iterable[Scene]) -> str:
    """Render a chunk of scenes as text for the extraction prompt.

    Args:
        scenes: The scenes in this chunk.

    Returns:
        The rendered block, with scene numbers and page numbers labelled.
    """
    blocks: list[str] = []
    for scene in scenes:
        blocks.append(
            f"--- SCENE {scene.scene_number} (script page {scene.page_number}) ---\n"
            f"{scene.heading}\n\n"
            f"[ACTION]\n{scene.action_text or '(none)'}\n\n"
            f"[DIALOGUE]\n{scene.dialogue_text or '(none)'}"
        )
    return "\n\n".join(blocks)


def _coerce_category(raw: str) -> Optional[ItemCategory]:
    """Map a model-returned category string onto the enum.

    Args:
        raw: The category string the model returned.

    Returns:
        The matching :class:`~clearframe.models.ItemCategory`, or None if it does
        not correspond to a known category.
    """
    key = re.sub(r"[^A-Z_]", "", (raw or "").upper().replace(" ", "_"))
    try:
        return ItemCategory(key)
    except ValueError:
        aliases = {
            "BRAND": ItemCategory.BRAND_TRADEMARK,
            "TRADEMARK": ItemCategory.BRAND_TRADEMARK,
            "PRODUCT": ItemCategory.BRAND_TRADEMARK,
            "SONG": ItemCategory.MUSIC,
            "PERSON": ItemCategory.REAL_PERSON,
            "LOCATION": ItemCategory.REAL_LOCATION_BUSINESS,
            "BUSINESS": ItemCategory.REAL_LOCATION_BUSINESS,
            "WORK": ItemCategory.PUBLISHED_WORK,
            "BOOK": ItemCategory.PUBLISHED_WORK,
            "LOGO": ItemCategory.LOGO_PROP,
            "PROP": ItemCategory.LOGO_PROP,
        }
        return aliases.get(key)


def _coerce_depiction(raw: str) -> DepictionNature:
    """Map a model-returned depiction string onto the enum, defaulting to NEUTRAL.

    Args:
        raw: The depiction string.

    Returns:
        The matching :class:`~clearframe.models.DepictionNature`.
    """
    try:
        return DepictionNature((raw or "").strip().upper())
    except ValueError:
        return DepictionNature.NEUTRAL


def canonical_key(normalized_name: str, mention_text: str = "") -> str:
    """Return the deduplication key for an item.

    Applies :func:`~clearframe.models.normalize_name`, then the alias table, so
    that surface forms sharing no tokens ("Coke" and "Coca-Cola") still collapse.

    Args:
        normalized_name: The canonical name the model proposed.
        mention_text: The raw mention, used if no canonical name was given.

    Returns:
        The key used to merge occurrences.
    """
    key = normalize_name(normalized_name or mention_text)
    key = CANONICAL_ALIASES.get(key, key)
    return CANONICAL_ALIASES.get(normalize_name(mention_text), key) if not key else key


# ---------------------------------------------------------------------------
# Extraction
# ---------------------------------------------------------------------------


def _build_client(settings: Settings):
    """Construct a google-genai client for the configured auth path.

    Args:
        settings: Loaded settings.

    Returns:
        A configured ``google.genai.Client``.
    """
    from google import genai

    from clearframe.config import resolve_google_api_key

    if settings.google_genai_use_vertexai:
        return genai.Client(
            vertexai=True,
            project=settings.google_cloud_project,
            location=settings.google_cloud_location,
        )
    return genai.Client(api_key=resolve_google_api_key(settings))


def _chunk_config(settings: Settings):
    """Build the Gemini request config shared by every extraction chunk.

    Args:
        settings: Loaded settings.

    Returns:
        A ``types.GenerateContentConfig`` with the explicit safety settings and
        the strict item response schema applied.
    """
    from google.genai import types

    from clearframe.config import build_safety_settings

    return types.GenerateContentConfig(
        safety_settings=build_safety_settings(settings),
        temperature=0.0,
        response_mime_type="application/json",
        response_schema=list[_GeminiItem],
        max_output_tokens=32000,
    )


def _handle_chunk_response(
    response: object,
    scope: str,
    prompt_len: int,
    elapsed_ms: float,
    settings: Settings,
    audit: Optional[AuditLogger],
) -> list[_GeminiItem]:
    """Turn a Gemini response into items, auditing every non-result outcome.

    Args:
        response: The raw model response.
        scope: Scene range this chunk covers, e.g. ``"scenes 1-9"``.
        prompt_len: Character length of the prompt, for the audit record.
        elapsed_ms: Wall-clock duration of the call.
        settings: Loaded settings.
        audit: Audit logger.

    Returns:
        The parsed per-mention records, or an empty list. An empty list from a
        blocked or truncated call is always accompanied by an audit entry, so a
        skipped span is never silent.
    """
    parsed = getattr(response, "parsed", None)
    if parsed is None:
        finish_reason, ratings = "UNKNOWN", None
        candidates = getattr(response, "candidates", None)
        if candidates:
            finish_reason = str(candidates[0].finish_reason)
            ratings = candidates[0].safety_ratings
        if audit:
            audit.record_safety_block(
                stage=PipelineStage.EXTRACT,
                tool="gemini.extract_items",
                scope=scope,
                finish_reason=finish_reason,
                ratings=ratings,
            )
        logger.warning("no content for %s (finish_reason=%s)", scope, finish_reason)
        return []

    if audit:
        usage = getattr(response, "usage_metadata", None)
        audit.record(
            stage=PipelineStage.EXTRACT,
            tool="gemini.extract_items",
            input_summary=f"{scope} ({prompt_len} chars)",
            output_summary=f"{len(parsed)} raw mentions",
            latency_ms=elapsed_ms,
            token_cost=getattr(usage, "total_token_count", None),
            model=settings.gemini_extraction_model,
            scene_range=scope,
        )
    return list(parsed)


async def extract_chunk_async(
    scenes: list[Scene],
    settings: Optional[Settings] = None,
    audit: Optional[AuditLogger] = None,
    client: Optional[object] = None,
    semaphore: Optional[asyncio.Semaphore] = None,
) -> list[_GeminiItem]:
    """Extract flaggable items from one chunk of scenes.

    Args:
        scenes: The scenes in this chunk.
        settings: Loaded settings; read from the environment if omitted.
        audit: Audit logger. A chunk that returns nothing is always recorded.
        client: Optional shared genai client.
        semaphore: Bounds how many chunks are in flight at once.

    Returns:
        The raw per-mention records the model returned. An empty list is a valid
        result and is distinguished in the audit trail from a blocked call. A
        failed chunk never propagates its exception into the gather, so one bad
        chunk cannot lose the whole run.
    """
    settings = settings or get_settings()
    client = client or _build_client(settings)
    scope = f"scenes {scenes[0].scene_number}-{scenes[-1].scene_number}"
    prompt = EXTRACTION_PROMPT + render_chunk(scenes)
    guard = semaphore or asyncio.Semaphore(settings.gemini_max_concurrency)

    async with guard:
        started = time.perf_counter()
        try:
            response = await client.aio.models.generate_content(
                model=settings.gemini_extraction_model,
                contents=prompt,
                config=_chunk_config(settings),
            )
        except Exception as exc:  # noqa: BLE001 - one bad chunk must not lose the run
            if audit:
                audit.record(
                    stage=PipelineStage.EXTRACT,
                    tool="gemini.extract_items",
                    input_summary=scope,
                    output_summary=f"FAILED: {type(exc).__name__}: {exc}",
                    latency_ms=(time.perf_counter() - started) * 1000,
                    level="ERROR",
                    affected_scope=scope,
                )
            logger.error("extraction failed for %s: %s", scope, exc)
            return []
        elapsed = (time.perf_counter() - started) * 1000

    return _handle_chunk_response(
        response, scope, len(prompt), elapsed, settings, audit
    )


def extract_chunk(
    scenes: list[Scene],
    settings: Optional[Settings] = None,
    audit: Optional[AuditLogger] = None,
    client: Optional[object] = None,
) -> list[_GeminiItem]:
    """Synchronous wrapper around :func:`extract_chunk_async`.

    Args:
        scenes: The scenes in this chunk.
        settings: Loaded settings.
        audit: Audit logger.
        client: Optional shared genai client.

    Returns:
        The raw per-mention records for this chunk.
    """
    return asyncio.run(
        extract_chunk_async(scenes, settings=settings, audit=audit, client=client)
    )


async def extract_items_async(
    scenes: list[Scene],
    settings: Optional[Settings] = None,
    audit: Optional[AuditLogger] = None,
) -> list[ExtractedItem]:
    """Extract and deduplicate every flaggable item in a script.

    Chunks are dispatched concurrently with ``asyncio.gather`` over a bounded
    semaphore, so a feature-length script costs roughly one chunk of latency
    rather than the sum of all of them. ``gather`` preserves input order, so the
    merged mention list stays deterministic regardless of completion order.

    Args:
        scenes: All scenes of the script, in order.
        settings: Loaded settings; read from the environment if omitted.
        audit: Audit logger for the extraction and deduplication stages.

    Returns:
        Deduplicated items, each carrying every occurrence found, ordered by
        occurrence count then by first page of appearance.
    """
    settings = settings or get_settings()
    if not scenes:
        return []

    chunks = chunk_scenes(scenes, settings.scenes_per_extraction_chunk)
    scene_pages = {s.scene_number: s.page_number for s in scenes}
    client = _build_client(settings)
    semaphore = asyncio.Semaphore(settings.gemini_max_concurrency)

    started = time.perf_counter()
    results = await asyncio.gather(
        *(
            extract_chunk_async(
                chunk, settings=settings, audit=audit, client=client, semaphore=semaphore
            )
            for chunk in chunks
        )
    )
    wall_ms = (time.perf_counter() - started) * 1000

    # gather preserves the order of its awaitables, so this stays deterministic.
    raw: list[_GeminiItem] = [record for chunk_result in results for record in chunk_result]
    empty_chunks = [
        f"scenes {c[0].scene_number}-{c[-1].scene_number}"
        for c, r in zip(chunks, results)
        if not r
    ]

    if audit:
        audit.record(
            stage=PipelineStage.EXTRACT,
            tool="extractor.extract_items",
            input_summary=(
                f"{len(scenes)} scenes in {len(chunks)} chunks, "
                f"concurrency={settings.gemini_max_concurrency}"
            ),
            output_summary=(
                f"{len(raw)} raw mentions before deduplication "
                f"({len(chunks)} chunks in {wall_ms:.0f} ms wall clock)"
            ),
            latency_ms=wall_ms,
            level="WARNING" if empty_chunks else "INFO",
            chunk_count=len(chunks),
            chunk_size=settings.scenes_per_extraction_chunk,
            concurrency=settings.gemini_max_concurrency,
            empty_chunks=empty_chunks,
        )

    return deduplicate(raw, scene_pages, audit=audit)


def extract_items(
    scenes: list[Scene],
    settings: Optional[Settings] = None,
    audit: Optional[AuditLogger] = None,
) -> list[ExtractedItem]:
    """Synchronous wrapper around :func:`extract_items_async`.

    Args:
        scenes: All scenes of the script, in order.
        settings: Loaded settings; read from the environment if omitted.
        audit: Audit logger.

    Returns:
        The deduplicated items.
    """
    return asyncio.run(extract_items_async(scenes, settings=settings, audit=audit))


# ---------------------------------------------------------------------------
# Deduplication
# ---------------------------------------------------------------------------


def deduplicate(
    raw: list[_GeminiItem],
    scene_pages: dict[int, int],
    audit: Optional[AuditLogger] = None,
) -> list[ExtractedItem]:
    """Merge per-mention records into distinct items carrying all occurrences.

    Merging happens on ``(category, canonical_key)``. A second conservative pass
    merges keys where one is a strict token-subsequence of the other within the
    same category, which catches "Chateau Marmont" against "the Chateau Marmont
    hotel" without collapsing genuinely different entities.

    Args:
        raw: Per-mention records from every chunk.
        scene_pages: Map of scene number to true page number, so occurrences
            carry a real page even though the model is not asked for one.
        audit: Audit logger; every merge is recorded.

    Returns:
        Deduplicated items, ordered by occurrence count descending.
    """
    started = time.perf_counter()
    buckets: dict[tuple[str, str], ExtractedItem] = {}
    skipped: list[str] = []

    for record in raw:
        category = _coerce_category(record.category)
        if category is None:
            skipped.append(f"{record.mention_text!r} (unknown category {record.category!r})")
            continue
        if not record.mention_text.strip():
            skipped.append("(empty mention_text)")
            continue

        page = scene_pages.get(record.scene_number)
        if page is None:
            skipped.append(
                f"{record.mention_text!r} (scene {record.scene_number} not in script)"
            )
            continue

        key = canonical_key(record.normalized_name, record.mention_text)
        bucket_key = (category.value, key)
        occurrence = Occurrence(
            scene_number=record.scene_number,
            page_number=page,
            context_snippet=record.context_snippet.strip()[:600],
            on_screen=bool(record.on_screen),
            depiction_nature=_coerce_depiction(record.depiction_nature),
        )

        existing = buckets.get(bucket_key)
        if existing is None:
            buckets[bucket_key] = ExtractedItem(
                item_id=stable_item_id(key, category),
                mention_text=record.mention_text.strip(),
                category=category,
                normalized_name=(record.normalized_name or record.mention_text).strip(),
                occurrences=[occurrence],
                variants=[],
                extraction_notes=record.extraction_note.strip() or None,
            )
        else:
            existing.occurrences.append(occurrence)
            surface = record.mention_text.strip()
            if surface.lower() != existing.mention_text.lower() and surface not in existing.variants:
                existing.variants.append(surface)

    entries = _merge_spacing_variants(list(buckets.items()), audit=audit)
    items = _merge_subsequence_keys(entries, audit=audit)

    for item in items:
        _relabel(item)
        item.occurrences.sort(key=lambda o: (o.scene_number, o.page_number))

    items.sort(key=lambda i: (-i.occurrence_count, i.page_numbers[0] if i.page_numbers else 0))

    if audit:
        audit.record(
            stage=PipelineStage.DEDUPLICATE,
            tool="extractor.deduplicate",
            input_summary=f"{len(raw)} raw mentions",
            output_summary=(
                f"{len(items)} distinct items "
                f"({len(raw) - sum(i.occurrence_count for i in items)} skipped, "
                f"{len(raw) - len(items)} mentions merged) -> "
                f"{len(items)} research tasks instead of {len(raw)}"
            ),
            latency_ms=(time.perf_counter() - started) * 1000,
            level="WARNING" if skipped else "INFO",
            skipped=skipped,
            raw_mentions=len(raw),
            distinct_items=len(items),
        )
    return items


def choose_label(surfaces: list[str], canonical: str) -> str:
    """Pick the surface form that best names an item for the reviewer.

    Merging on the canonical name correctly collapses anaphora — "the estate"
    onto "Gene Austin", "the 1926 master" onto "Bye Bye Blackbird" — but the
    first mention encountered is often the vague one. Labelling the item "the
    estate" would leave a reviewer unable to tell what the finding is about.

    Scores each candidate by how much of the canonical name it actually
    contains, then prefers the longer form as a tie-break.

    Args:
        surfaces: Every surface form seen for this item, in encounter order.
        canonical: The canonical name the model resolved them to.

    Returns:
        The best label. Falls back to the first surface form if none score.
    """
    if not surfaces:
        return ""
    canonical_tokens = set(normalize_name(canonical).split())
    if not canonical_tokens:
        return surfaces[0]

    def score(surface: str) -> tuple[int, int]:
        tokens = set(normalize_name(surface).split())
        return (len(tokens & canonical_tokens), len(surface))

    best = max(surfaces, key=score)
    # If nothing overlaps the canonical name at all, keep the original order.
    return best if score(best)[0] > 0 else surfaces[0]


def _relabel(item: ExtractedItem) -> ExtractedItem:
    """Promote the most informative surface form to be the item's label.

    Args:
        item: The merged item, whose ``mention_text`` may be an anaphor.

    Returns:
        The same item with ``mention_text`` and ``variants`` reordered so the
        label names the entity and every other surface form is preserved.
    """
    surfaces = [item.mention_text, *item.variants]
    label = choose_label(surfaces, item.normalized_name)
    if label != item.mention_text:
        item.variants = [s for s in surfaces if s != label]
        item.mention_text = label
    return item


def _merge_spacing_variants(
    entries: list[tuple[tuple[str, str], ExtractedItem]],
    audit: Optional[AuditLogger] = None,
) -> list[tuple[tuple[str, str], ExtractedItem]]:
    """Merge keys that differ only by internal whitespace.

    Model output varies on how it spaces alphanumeric model numbers and compound
    proper nouns across calls: "Neumann U 87" against "Neumann U87", "Echo Plex"
    against "Echoplex". These are the same entity every time, so they must not
    fan out as two research tasks or appear twice in the reviewer's log.

    Safe as a general rule: two names within one category that are identical
    once whitespace is removed are the same entity. Whitespace alone never
    distinguishes two real trademarks or people.

    Args:
        entries: ``((category, key), item)`` pairs.
        audit: Audit logger; each merge is recorded.

    Returns:
        The surviving entries, keyed by the longest surface form seen.
    """
    by_squashed: dict[tuple[str, str], tuple[tuple[str, str], ExtractedItem]] = {}
    for (category, key), item in entries:
        squashed = (category, key.replace(" ", ""))
        existing = by_squashed.get(squashed)
        if existing is None:
            by_squashed[squashed] = ((category, key), item)
            continue

        (_, kept_key), kept_item = existing
        kept_item.occurrences.extend(item.occurrences)
        for variant in [item.mention_text, *item.variants]:
            if (
                variant.lower() != kept_item.mention_text.lower()
                and variant not in kept_item.variants
            ):
                kept_item.variants.append(variant)
        if audit:
            audit.record(
                stage=PipelineStage.DEDUPLICATE,
                tool="extractor.merge_spacing_variant",
                input_summary=f"{item.mention_text!r} [{category}]",
                output_summary=f"merged into {kept_item.mention_text!r} (spacing variant)",
                merged_key=key,
                target_key=kept_key,
            )
    return list(by_squashed.values())


def _merge_subsequence_keys(
    entries: list[tuple[tuple[str, str], ExtractedItem]],
    audit: Optional[AuditLogger] = None,
) -> list[ExtractedItem]:
    """Merge items whose keys are token-subsequences within the same category.

    Deliberately conservative. Only merges when one key's tokens are a contiguous
    subsequence of the other's and the shorter key has at least two tokens, or is
    a single token of five or more characters. Over-merging would hide a distinct
    item from the reviewer, which is worse than one redundant research task.

    Args:
        entries: ``((category, key), item)`` pairs.
        audit: Audit logger; each merge is recorded individually.

    Returns:
        The surviving items.
    """
    by_category: dict[str, list[tuple[str, ExtractedItem]]] = {}
    for (category, key), item in entries:
        by_category.setdefault(category, []).append((key, item))

    survivors: list[ExtractedItem] = []
    for category, pairs in by_category.items():
        # Longest key first, so shorter forms fold into the fuller name.
        pairs.sort(key=lambda p: -len(p[0]))
        kept: list[tuple[str, ExtractedItem]] = []
        for key, item in pairs:
            tokens = key.split()
            merged_into = None
            for kept_key, kept_item in kept:
                kept_tokens = kept_key.split()
                if _is_token_subsequence(tokens, kept_tokens) and (
                    len(tokens) >= 2 or (len(tokens) == 1 and len(tokens[0]) >= 5)
                ):
                    merged_into = kept_item
                    break
            if merged_into is not None:
                merged_into.occurrences.extend(item.occurrences)
                for variant in [item.mention_text, *item.variants]:
                    if (
                        variant.lower() != merged_into.mention_text.lower()
                        and variant not in merged_into.variants
                    ):
                        merged_into.variants.append(variant)
                if audit:
                    audit.record(
                        stage=PipelineStage.DEDUPLICATE,
                        tool="extractor.merge_variant",
                        input_summary=f"{item.mention_text!r} [{category}]",
                        output_summary=f"merged into {merged_into.mention_text!r}",
                        merged_key=key,
                        target_key=kept_key,
                    )
            else:
                kept.append((key, item))
        survivors.extend(item for _, item in kept)
    return survivors


def _is_token_subsequence(needle: list[str], haystack: list[str]) -> bool:
    """Return True if ``needle`` appears as a contiguous run inside ``haystack``.

    Args:
        needle: Token list of the shorter key.
        haystack: Token list of the longer key.

    Returns:
        True if every token of ``needle`` appears consecutively in ``haystack``.
    """
    if not needle or len(needle) > len(haystack):
        return False
    for start in range(len(haystack) - len(needle) + 1):
        if haystack[start : start + len(needle)] == needle:
            return True
    return False
