"""Parallel research fan-out: one brief per item, one Evidence per source.

A generic query wastes the depth Parallel provides, so every category gets a
purpose-built brief that names the specific facts a clearance reviewer needs.
The briefs are also what make the rules engine usable: they ask for publication
years, death years and jurisdictions as *facts to be sourced*, not as things the
model may infer.

Music is deliberately researched twice. A song carries two distinct copyrights —
the musical composition and the sound recording — which are owned by different
parties, run on different terms, and must be licensed separately. Conflating
them is the most common clearance error in music, so this module never lets one
research call stand in for both.

Every fact returned is stored as an :class:`~clearframe.models.Evidence` object
carrying a real source URL and a retrieval timestamp. Sources without a URL are
discarded here at ingest, not filtered downstream, so an uncitable claim can
never reach a finding.
"""

from __future__ import annotations

import asyncio
import logging
import time
from enum import Enum
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from clearframe.audit.logger import AuditLogger
from clearframe.config import Settings, get_settings, preflight
from clearframe.models import (
    Evidence,
    ExtractedItem,
    ItemCategory,
    PipelineStage,
    utcnow,
)
from clearframe.tools.parallel_client import ParallelClient, ParallelResponse

logger = logging.getLogger(__name__)


class RightsAspect(str, Enum):
    """Which distinct right a brief is investigating.

    Only music routinely splits, but the field is general so a reviewer can see
    which right a given piece of evidence bears on.
    """

    GENERAL = "GENERAL"
    COMPOSITION = "COMPOSITION"
    SOUND_RECORDING = "SOUND_RECORDING"


class ResearchBrief(BaseModel):
    """A single category-specific research request for one item."""

    model_config = ConfigDict(extra="forbid")

    item_id: str
    aspect: RightsAspect = RightsAspect.GENERAL
    objective: str = Field(..., description="What this call must establish, in prose.")
    queries: list[str] = Field(default_factory=list)
    mode: str = Field(default="fast", description="Parallel search mode.")
    facts_sought: list[str] = Field(
        default_factory=list,
        description="Named facts the rules engine needs, surfaced in the audit trail.",
    )


# ---------------------------------------------------------------------------
# Category-specific briefs
# ---------------------------------------------------------------------------


def _brand_brief(item: ExtractedItem) -> list[ResearchBrief]:
    """Build the research brief for a brand or trademark.

    Args:
        item: The extracted item.

    Returns:
        A single brief covering registrant, status, classes and usage policy.
    """
    name = item.normalized_name
    return [
        ResearchBrief(
            item_id=item.item_id,
            objective=(
                f"Establish the trademark position of '{name}'. Identify: the current "
                f"registered proprietor or registrant; whether the registration is live, "
                f"cancelled, abandoned or expired; the Nice classes the registration "
                f"covers; and whether the owner publishes a brand-usage, trademark or "
                f"film-clearance policy governing depiction in motion pictures. Cite the "
                f"trademark register entry itself where possible."
            ),
            queries=[
                f"{name} USPTO trademark registration owner status",
                f"{name} trademark registrant classes register",
                f"{name} brand usage guidelines film television policy",
            ],
            facts_sought=["registrant", "registration_status", "nice_classes", "usage_policy"],
        )
    ]


def _music_briefs(item: ExtractedItem) -> list[ResearchBrief]:
    """Build the two separate music briefs: composition and sound recording.

    These are two different copyrights with different owners and different terms.
    Resolving only one of them is the single most common clearance mistake, so
    both briefs are always issued.

    Args:
        item: The extracted item.

    Returns:
        Two briefs, one per right.
    """
    name = item.normalized_name
    return [
        ResearchBrief(
            item_id=item.item_id,
            aspect=RightsAspect.COMPOSITION,
            objective=(
                f"Research the MUSICAL COMPOSITION (the underlying song, not any "
                f"particular recording) of '{name}'. Identify: the composer and "
                f"lyricist; the year of first publication of the composition; the "
                f"composer's year of death if deceased; and the current music "
                f"publisher or administrator controlling the synchronisation right. "
                f"Do not report facts about any sound recording in this answer."
            ),
            queries=[
                f'"{name}" song composer lyricist year first published',
                f'"{name}" music publisher synchronization rights administrator',
                f'"{name}" composer died death year copyright',
            ],
            facts_sought=[
                "composer",
                "publication_year",
                "author_death_year",
                "publisher",
            ],
        ),
        ResearchBrief(
            item_id=item.item_id,
            aspect=RightsAspect.SOUND_RECORDING,
            objective=(
                f"Research SOUND RECORDINGS of '{name}' (specific masters, not the "
                f"underlying composition). Identify: notable recording artists and the "
                f"year each recording was first released; the record label or current "
                f"owner of the master; and who controls master-use licensing. A "
                f"public-domain composition does not imply a public-domain recording, "
                f"so report the recording facts independently."
            ),
            queries=[
                f'"{name}" original recording year record label master',
                f'"{name}" master use license owner recording rights',
                f'"{name}" first recorded release date artist',
            ],
            facts_sought=["recording_artist", "publication_year", "label", "master_owner"],
        ),
    ]


def _person_brief(item: ExtractedItem) -> list[ResearchBrief]:
    """Build the research brief for a real person.

    Args:
        item: The extracted item.

    Returns:
        A single brief covering living status, death, domicile and litigation.
    """
    name = item.normalized_name
    return [
        ResearchBrief(
            item_id=item.item_id,
            objective=(
                f"Establish the right-of-publicity position for '{name}'. Determine: "
                f"whether they are living or deceased; the exact year of death if "
                f"deceased; their state or country of domicile at death, because "
                f"post-mortem publicity terms are set by domicile and range from none "
                f"to 100 years; who administers the estate or likeness rights; and any "
                f"reported litigation over unauthorised depiction in film or television."
            ),
            queries=[
                f"{name} born died biography date of death",
                f"{name} estate likeness rights publicity administrator",
                f"{name} lawsuit portrayal film right of publicity",
            ],
            facts_sought=[
                "is_person_living",
                "person_death_year",
                "domicile_state_at_death",
                "estate_administrator",
            ],
        )
    ]


def _location_brief(item: ExtractedItem) -> list[ResearchBrief]:
    """Build the research brief for a real location or business.

    Args:
        item: The extracted item.

    Returns:
        A single brief covering owner, permits, releases and trade dress.
    """
    name = item.normalized_name
    return [
        ResearchBrief(
            item_id=item.item_id,
            objective=(
                f"Establish the filming and depiction position for '{name}'. Identify: "
                f"the current owner or operator; whether a location release or filming "
                f"permit is customarily required to depict or film there; whether the "
                f"name, signage or trade dress is registered as a trademark; and any "
                f"reported dispute over its depiction on screen."
            ),
            queries=[
                f"{name} owner operator company who owns",
                f"{name} filming permit location release film policy",
                f"{name} trademark trade dress registered name signage",
            ],
            facts_sought=["owner", "permit_required", "trademark_status"],
        )
    ]


def _published_work_brief(item: ExtractedItem) -> list[ResearchBrief]:
    """Build the research brief for a published work.

    Args:
        item: The extracted item.

    Returns:
        A single brief covering author, dates and rights holder.
    """
    name = item.normalized_name
    return [
        ResearchBrief(
            item_id=item.item_id,
            objective=(
                f"Establish the copyright position of the published work '{name}'. "
                f"Identify: the author; the year of first publication; the author's year "
                f"of death if deceased; whether the work was a work made for hire or "
                f"published anonymously; and the current rights holder or literary "
                f"estate. These facts determine the copyright term arithmetic, so report "
                f"exact years rather than approximations."
            ),
            queries=[
                f'"{name}" author first published year edition',
                f'"{name}" author death year copyright public domain',
                f'"{name}" rights holder literary estate permissions',
            ],
            facts_sought=[
                "author",
                "publication_year",
                "author_death_year",
                "authorship_type",
                "rights_holder",
            ],
        )
    ]


def _name_collision_brief(item: ExtractedItem) -> list[ResearchBrief]:
    """Build the research brief for a possible name collision.

    Args:
        item: The extracted item.

    Returns:
        A single brief asking whether a real entity of that name exists.
    """
    name = item.normalized_name
    return [
        ResearchBrief(
            item_id=item.item_id,
            objective=(
                f"The screenplay uses '{name}' as a fictional name. Determine whether a "
                f"real company, organisation or notable person of that name exists, and "
                f"if so in what sector and territory, whether the name is registered as a "
                f"trademark, and whether the real entity operates in a field close enough "
                f"to the film's depiction that an audience might associate the two. "
                f"If no real entity of this name can be found, say so explicitly."
            ),
            queries=[
                f'"{name}" company business real existing',
                f'"{name}" trademark registered owner',
            ],
            facts_sought=["real_entity_exists", "sector", "trademark_status"],
        )
    ]


def _logo_prop_brief(item: ExtractedItem) -> list[ResearchBrief]:
    """Build the research brief for an on-screen logo or branded prop.

    Args:
        item: The extracted item.

    Returns:
        A single brief covering the mark owner and depiction policy.
    """
    name = item.normalized_name
    return [
        ResearchBrief(
            item_id=item.item_id,
            objective=(
                f"'{name}' appears on screen as a logo, signage or branded prop. "
                f"Identify the owner of the mark or design, whether the logo is "
                f"separately registered as a trademark or protected by copyright as an "
                f"artistic work, and any published policy on depicting the logo in film."
            ),
            queries=[
                f"{name} logo trademark owner registration",
                f"{name} logo usage policy film depiction permission",
            ],
            facts_sought=["mark_owner", "trademark_status", "usage_policy"],
        )
    ]


_BRIEF_BUILDERS = {
    ItemCategory.BRAND_TRADEMARK: _brand_brief,
    ItemCategory.MUSIC: _music_briefs,
    ItemCategory.REAL_PERSON: _person_brief,
    ItemCategory.REAL_LOCATION_BUSINESS: _location_brief,
    ItemCategory.PUBLISHED_WORK: _published_work_brief,
    ItemCategory.NAME_COLLISION: _name_collision_brief,
    ItemCategory.LOGO_PROP: _logo_prop_brief,
}


def build_briefs(item: ExtractedItem) -> list[ResearchBrief]:
    """Build every research brief needed for one item.

    Args:
        item: The deduplicated item to research.

    Returns:
        One brief for most categories; two for music, covering the composition
        and the sound recording as separate rights.
    """
    builder = _BRIEF_BUILDERS.get(item.category)
    if builder is None:
        return [
            ResearchBrief(
                item_id=item.item_id,
                objective=(
                    f"Establish who owns any rights in '{item.normalized_name}' and "
                    f"whether permission is customarily required to depict it on screen."
                ),
                queries=[f"{item.normalized_name} rights owner permission"],
            )
        ]
    return builder(item)


# ---------------------------------------------------------------------------
# Evidence construction
# ---------------------------------------------------------------------------


def evidence_from_response(
    brief: ResearchBrief,
    response: ParallelResponse,
    max_items: int,
) -> list[Evidence]:
    """Convert a Parallel response into Evidence objects.

    Sources with no URL never become evidence: an uncitable fact cannot support a
    claim, and the citation validator would drop any claim relying on it anyway.

    Args:
        brief: The brief that produced this response.
        response: The Parallel response.
        max_items: Cap on evidence retained for this brief.

    Returns:
        Evidence objects, each with a real URL and retrieval timestamp.
    """
    if not response.ok:
        return []

    aspect_note = (
        ""
        if brief.aspect is RightsAspect.GENERAL
        else f" [{brief.aspect.value.replace('_', ' ').lower()} right]"
    )

    evidence: list[Evidence] = []
    for source in response.sources[:max_items]:
        snippet = source.best_excerpt.strip()
        if not snippet:
            continue
        evidence.append(
            Evidence(
                item_id=brief.item_id,
                source_url=source.url,
                source_title=source.title or source.url,
                retrieved_at=utcnow(),
                snippet=snippet[:1200],
                relevance_note=(
                    f"Retrieved to establish {', '.join(brief.facts_sought) or 'rights status'}"
                    f"{aspect_note}."
                ),
            )
        )
    return evidence


# ---------------------------------------------------------------------------
# Fan-out
# ---------------------------------------------------------------------------


async def research_item(
    item: ExtractedItem,
    client: ParallelClient,
    settings: Optional[Settings] = None,
    audit: Optional[AuditLogger] = None,
) -> list[Evidence]:
    """Run every brief for one item and return its evidence.

    Args:
        item: The item to research.
        client: The shared Parallel client, which owns the concurrency bound.
        settings: Loaded settings; read from the environment if omitted.
        audit: Audit logger; failures and empty results are always recorded.

    Returns:
        Evidence for this item, possibly empty. An empty result is recorded in
        the audit trail so the reviewer sees an unresearched item as a known gap.
    """
    settings = settings or get_settings()
    briefs = build_briefs(item)
    started = time.perf_counter()

    responses = await asyncio.gather(
        *(client.search(b.objective, b.queries, mode=b.mode) for b in briefs)
    )

    evidence: list[Evidence] = []
    for brief, response in zip(briefs, responses):
        found = evidence_from_response(brief, response, settings.max_evidence_per_item)
        evidence.extend(found)
        if audit:
            audit.record(
                stage=PipelineStage.RESEARCH,
                tool="parallel.search",
                input_summary=(
                    f"{item.mention_text} [{item.category.value}"
                    f"{'/' + brief.aspect.value if brief.aspect is not RightsAspect.GENERAL else ''}]"
                ),
                output_summary=(
                    f"{len(found)} evidence from {len(response.sources)} sources"
                    if response.ok
                    else f"FAILED after {response.attempts} attempts: {response.error}"
                ),
                latency_ms=response.latency_ms,
                task_cost=response.task_cost,
                level="INFO" if response.ok and found else "WARNING",
                item_id=item.item_id,
                aspect=brief.aspect.value,
                facts_sought=brief.facts_sought,
                objective=brief.objective[:300],
                sources_without_url=max(0, len(response.sources) - len(found)),
            )

    if not evidence and audit:
        audit.record(
            stage=PipelineStage.RESEARCH,
            tool="researcher.research_item",
            input_summary=f"{item.mention_text} [{item.category.value}]",
            output_summary=(
                "NO EVIDENCE FOUND. This item has no sourced basis and cannot be "
                "triaged beyond NEEDS_VERIFICATION."
            ),
            level="WARNING",
            item_id=item.item_id,
            latency_ms=(time.perf_counter() - started) * 1000,
        )
    return evidence


async def research_items(
    items: list[ExtractedItem],
    settings: Optional[Settings] = None,
    audit: Optional[AuditLogger] = None,
    client: Optional[ParallelClient] = None,
) -> dict[str, Evidence]:
    """Research every item concurrently and return the populated evidence store.

    Fan-out is bounded by the semaphore inside :class:`ParallelClient`, so the
    number of simultaneous Parallel calls is capped no matter how many items a
    script produces.

    Args:
        items: The deduplicated items to research.
        settings: Loaded settings; read from the environment if omitted.
        audit: Audit logger for the research stage.
        client: An existing client to reuse; one is created and closed if omitted.

    Returns:
        The evidence store, keyed by ``evidence_id``.
    """
    settings = settings or get_settings()
    if not items:
        return {}

    # Report credential state before opening the fan-out. A missing or shadowed
    # key surfaced here names the problem once, at the top of the stage, instead
    # of appearing as N concurrent authentication errors attributed to the
    # research logic.
    key_reports = preflight(settings, stage="RESEARCH")
    if audit:
        parallel_key = next(r for r in key_reports if r["name"] == "PARALLEL_API_KEY")
        audit.record(
            stage=PipelineStage.RESEARCH,
            tool="config.preflight",
            input_summary=f"{len(items)} items queued for research",
            output_summary=(
                f"PARALLEL_API_KEY resolved (length={parallel_key['length']}, "
                f"source={parallel_key['source']})"
                if parallel_key["present"]
                else f"PARALLEL_API_KEY NOT RESOLVED (source={parallel_key['source']}) - "
                f"every research call will fail authentication"
            ),
            level="INFO" if parallel_key["present"] else "ERROR",
            **{k: v for k, v in parallel_key.items() if k != "prefix"},
        )

    owns_client = client is None
    client = client or ParallelClient(settings)
    started = time.perf_counter()

    try:
        results = await asyncio.gather(
            *(research_item(i, client, settings=settings, audit=audit) for i in items),
            return_exceptions=True,
        )
    finally:
        if owns_client:
            await client.aclose()

    store: dict[str, Evidence] = {}
    failed_items: list[str] = []
    for item, result in zip(items, results):
        if isinstance(result, BaseException):
            # A crashed item must not take the run down with it.
            failed_items.append(f"{item.mention_text}: {type(result).__name__}")
            logger.error("research crashed for %s: %s", item.mention_text, result)
            continue
        for evidence in result:
            store[evidence.evidence_id] = evidence

    wall_ms = (time.perf_counter() - started) * 1000
    covered = len({e.item_id for e in store.values()})

    if audit:
        audit.record(
            stage=PipelineStage.RESEARCH,
            tool="researcher.research_items",
            input_summary=(
                f"{len(items)} items, concurrency={settings.parallel_max_concurrency}"
            ),
            output_summary=(
                f"{len(store)} evidence across {covered}/{len(items)} items "
                f"({client.task_count} Parallel calls, {wall_ms:.0f} ms wall clock)"
            ),
            latency_ms=wall_ms,
            task_cost=client.task_count,
            level="WARNING" if covered < len(items) else "INFO",
            items_with_no_evidence=[
                i.mention_text for i in items if i.item_id not in {e.item_id for e in store.values()}
            ],
            crashed_items=failed_items,
        )
    return store
