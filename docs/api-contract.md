# ClearFrame API contract

**Version:** 0.1.0 · **Base URL (local):** `http://localhost:8080` · **Interactive docs:** `/docs` · **Machine-readable:** `/openapi.json`

This document is the frontend integration contract. It is written against the
live FastAPI app in [`src/clearframe/api/main.py`](../src/clearframe/api/main.py);
`/openapi.json` is generated from the same source and is authoritative if the
two ever disagree.

---

## Running the backend locally

**One supported command.** Run it from the repository root:

```bash
PYTHONPATH=src uvicorn clearframe.api.main:app --port 8080 --reload
```

Then the API is at `http://localhost:8080`, interactive docs at `/docs`, and the
bundled reference UI at `/ui`.

> **Not** `uvicorn src.clearframe.api.main:app`. That form loads every
> `clearframe` module twice under two different names, and since settings are
> LRU-cached, each copy gets its own configuration and its own in-memory report
> store — so a script you upload may appear to vanish. The Dockerfile uses the
> command above; please match it.

Check it came up with both integrations configured:

```bash
curl -s localhost:8080/api/health
# {"status":"ok","gemini_configured":true,"parallel_configured":true,...}
```

If either flag is `false`, the pipeline will still accept uploads but produce a
degraded report. The server logs a credential preflight at the start of the
research stage showing each key's length and origin (never its value).

---

## Positioning constraints the UI must honour

These are product requirements, not styling suggestions. The backend enforces
the first two; the UI must not contradict them.

1. **Never render an item as "cleared", "safe", "approved", or "legal."** No API
   response contains those states. `CLEAR_ON_RECORD` means *"no clearance action
   is likely needed, pending reviewer sign-off"* — label it **"Clear on record"**
   and never shorten it to "Clear" or "OK".
2. **Tiers describe reviewer workload, not legal status.** Surface the tier
   meanings (below) somewhere the reviewer can see them.
3. **Every substantive claim carries a citation.** `finding.rationale` contains
   inline tokens like `[ev_4f2a1c9b8e07]` and `[US_LIFE_PLUS_70]`. Render these
   as links to the matching evidence card or rule outcome. See
   [Rendering citations](#rendering-citations).
4. **Always display the disclaimer** on any view that shows findings. Canonical
   text is returned by `GET /`.

---

## Lifecycle

```
POST /api/scripts                 -> 202, { report_id, pipeline_state: "QUEUED" }
  |
  |  poll every ~3s
  v
GET  /api/reports/{id}            -> pipeline_state: QUEUED -> RUNNING -> COMPLETE
  |
  v
PATCH /api/reports/{id}/items/{item_id}   (once per item — all must be decided)
  |
  v
POST /api/reports/{id}/export     -> 200 with markdown
                                  -> 409 if ANY item is still PENDING
```

A 6-page script takes roughly **2–4 minutes** end to end. A feature-length script
takes considerably longer. Build the polling UI to tolerate several minutes and
show stage progress from `GET /api/reports/{id}/trace`.

---

## Endpoints

### `GET /api/health`

Liveness plus integration status. Use for a status indicator; do not gate the UI
on it.

**200**
```json
{
  "status": "ok",
  "version": "0.1.0",
  "gemini_configured": true,
  "parallel_configured": true,
  "timestamp": "2026-09-07T23:41:02.184Z"
}
```

`gemini_configured: false` or `parallel_configured: false` means uploads will
still be accepted but the pipeline will produce a degraded report. Worth a
visible warning banner.

---

### `POST /api/scripts`

Upload a screenplay and start the pipeline.

**Request:** `multipart/form-data`

| Field | Type | Required | Notes |
|:---|:---|:---:|:---|
| `file` | binary | yes | `.pdf`, `.txt` or `.fountain`. Max 25 MB. |

```js
const body = new FormData();
body.append("file", fileInput.files[0]);
const res = await fetch("/api/scripts", { method: "POST", body });
```

**202 Accepted**
```json
{
  "report_id": "rpt_f2d7778b40f2",
  "script_name": "The Last Good Year",
  "pipeline_state": "QUEUED",
  "message": "Script accepted. Poll GET /api/reports/{report_id} until pipeline_state is COMPLETE."
}
```

**Errors**

| Status | When | Body |
|---:|:---|:---|
| 400 | Unsupported extension | `{"detail": "unsupported file type '.docx'; use ['.fountain', '.pdf', '.txt']"}` |
| 400 | Empty file | `{"detail": "uploaded file is empty"}` |
| 413 | Over 25 MB | `{"detail": "file exceeds 25 MB limit"}` |

---

### `GET /api/reports`

List all reports on this instance, newest first. For a dashboard or report picker.

**200**
```json
[
  {
    "report_id": "rpt_f2d7778b40f2",
    "script_name": "The Last Good Year",
    "pipeline_state": "COMPLETE",
    "status": "DRAFT",
    "items": 23,
    "tier_counts": { "CLEAR_ON_RECORD": 1, "NEEDS_VERIFICATION": 12, "ESCALATE": 10 },
    "pending": 23,
    "created_at": "2026-09-07T23:39:11.402Z"
  }
]
```

---

### `GET /api/reports/{report_id}`

The full report. This is the main payload the UI renders.

**200** — see [ClearanceReport](#clearancereport) below.

**404** — `{"detail": "report 'rpt_xxx' not found"}`

**While processing**, `pipeline_state` is `QUEUED` or `RUNNING` and `items`,
`findings` and `evidence_store` are empty. On failure, `pipeline_state` is
`FAILED` and `error` holds a message — render it; do not retry automatically.

---

### `GET /api/reports/{report_id}/trace`

The structured audit trail, for the agent-trace view.

**200**
```json
{
  "report_id": "rpt_f2d7778b40f2",
  "entries": [
    {
      "entry_id": "log_a1b2c3d4e5f6",
      "timestamp": "2026-09-07T23:39:24.117Z",
      "report_id": "rpt_f2d7778b40f2",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "COCA-COLA [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 1055.4,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": { "item_id": "item_9f3c21a4b7de", "facts_sought": ["registrant"] }
    }
  ],
  "totals": {
    "entries": 61, "warnings": 2, "errors": 0, "safety_blocks": 0,
    "total_latency_ms": 214882.6, "total_tokens": 148213, "total_parallel_tasks": 26
  }
}
```

**`stage`** is one of `INGEST`, `EXTRACT`, `DEDUPLICATE`, `RESEARCH`, `RULES`,
`ASSEMBLE`, `VALIDATE`, `EXPORT`, `REVIEW`, `ORCHESTRATOR`.
**`level`** is `INFO`, `WARNING` or `ERROR` — colour these.
`detail` is free-form; do not assume any key exists.

Entries where `detail.safety_blocked` is `true` mean a span of the script was not
analysed. **Surface these prominently** — they are gaps in the review.

---

### `PATCH /api/reports/{report_id}/items/{item_id}`

Record a reviewer decision. Every item needs one before export.

**Request**
```json
{
  "decision": "CONFIRMED",
  "reviewer_note": "Nominative use, background only.",
  "reviewer": "j.okonkwo@example.com"
}
```

| Field | Type | Required | Notes |
|:---|:---|:---:|:---|
| `decision` | enum | yes | `PENDING` \| `CONFIRMED` \| `REJECTED` \| `ESCALATED` |
| `reviewer_note` | string | no | Defaults to `""`. Appears in the export. |
| `reviewer` | string \| null | no | Free-form identifier. |

Sending `PENDING` clears a decision and re-blocks export.

**200**
```json
{
  "item_id": "item_9f3c21a4b7de",
  "decision": "CONFIRMED",
  "reviewer_note": "Nominative use, background only.",
  "reviewer": "j.okonkwo@example.com",
  "decided_at": "2026-09-07T23:52:40.881Z"
}
```

**404** — report not found, or `{"detail": "item 'item_xxx' not in report 'rpt_xxx'"}`

> **Decision vs tier.** `decision` is the human's call; `tier` is the pipeline's
> triage. They are independent. A reviewer may `CONFIRMED` an `ESCALATE` item
> (meaning "yes, I have escalated this") or `REJECTED` it (meaning "not a real
> item"). Never overwrite one with the other in the UI.

---

### `POST /api/reports/{report_id}/export`

Generate the clearance log. **Refuses while any item is unreviewed.**

**Query parameters**

| Name | Type | Default | Notes |
|:---|:---|:---|:---|
| `format` | string | `markdown` | `markdown` returns JSON; `raw` returns `text/markdown` as a file download. |

**200** (`format=markdown`)
```json
{
  "report_id": "rpt_f2d7778b40f2",
  "format": "markdown",
  "filename": "clearance-log-the-last-good-year.md",
  "markdown": "# Clearance research log — *The Last Good Year*\n\n> **This is research output...",
  "summary": "The Last Good Year: 23 items across 6 pages, 189 sources.\nEscalate 10 | Needs verification 12 | Clear on record 1\n0 item(s) still pending reviewer decision.\nResearch output for review by qualified counsel. Not legal advice.",
  "escalate_count": 10,
  "generated_at": "2026-09-07T23:55:03.220Z"
}
```

A successful export flips `report.status` from `DRAFT` to `SIGNED_OFF`.

#### 409 Conflict — incomplete review

**This is the one you must build for.** It is a hard backend rule: the export is
refused server-side while any item lacks a decision. Do not rely on disabling the
export button — the request can still be made, and it will be rejected.

```json
{
  "detail": "7 of 23 items have no reviewer decision. Every item must be Confirmed, Rejected or Escalated before this log can be exported.",
  "pending_count": 7,
  "total_items": 23,
  "pending_item_ids": ["item_9f3c21a4b7de", "item_2b7e40c1a993"],
  "pending_items": [
    {
      "item_id": "item_9f3c21a4b7de",
      "mention_text": "COCA-COLA",
      "category": "BRAND_TRADEMARK",
      "tier": "NEEDS_VERIFICATION",
      "pages": [1]
    }
  ]
}
```

`pending_items` is everything needed to render a "finish these first" list with
deep links — no extra fetch required.

**Other errors**

| Status | When |
|---:|:---|
| 404 | Report not found |
| 425 | `pipeline_state` is not `COMPLETE` — `{"detail": "pipeline is RUNNING; export is only available once processing is COMPLETE"}` |

---

### `GET /`

Service metadata and the canonical disclaimer string. Use the `disclaimer` value
verbatim rather than hardcoding your own.

---

## Schemas

### ClearanceReport

```jsonc
{
  "report_id": "rpt_f2d7778b40f2",
  "script_name": "The Last Good Year",
  "status": "DRAFT",                    // DRAFT | SIGNED_OFF
  "created_at": "2026-09-07T23:39:11Z",
  "updated_at": "2026-09-07T23:52:40Z",
  "pipeline_state": "COMPLETE",         // QUEUED | RUNNING | COMPLETE | FAILED
  "error": null,                        // string when pipeline_state is FAILED
  "page_count": 6,
  "scene_count": 14,
  "items": [ /* ExtractedItem */ ],
  "findings": [ /* Finding */ ],
  "evidence_store": { "ev_4f2a1c9b8e07": { /* Evidence */ } },  // keyed by evidence_id
  "review_states": { "item_9f3c21a4b7de": { /* ReviewState */ } }, // keyed by item_id
  "audit_log": [ /* AuditEntry */ ]
}
```

`items` and `findings` are **parallel lists joined on `item_id`**, not nested.
Build a lookup:

```js
const findingByItem = Object.fromEntries(report.findings.map(f => [f.item_id, f]));
const evidenceByItem = {};
for (const ev of Object.values(report.evidence_store)) {
  (evidenceByItem[ev.item_id] ??= []).push(ev);
}
```

`findings` is pre-sorted most severe first (`ESCALATE`, then
`NEEDS_VERIFICATION`, then `CLEAR_ON_RECORD`). `items` is sorted by occurrence
count descending. Use `findings` order for the main list.

---

### ExtractedItem

```jsonc
{
  "item_id": "item_9f3c21a4b7de",
  "mention_text": "COCA-COLA",          // verbatim from the script
  "category": "BRAND_TRADEMARK",
  "normalized_name": "Coca-Cola",       // canonical entity — use for search
  "variants": ["Coke"],                 // other surface forms merged in
  "extraction_notes": null,
  "occurrences": [
    {
      "scene_number": 3,
      "page_number": 1,                 // real page in the physical script
      "context_snippet": "Maya sits with a COCA-COLA in a glass bottle...",
      "on_screen": true,                // visually depicted vs dialogue-only
      "depiction_nature": "NEUTRAL"     // POSITIVE | NEUTRAL | NEGATIVE
    }
  ]
}
```

Display `mention_text` as the heading. If `normalized_name` differs, show it as
"Resolved entity". If `variants` is non-empty, show "Also appears as: …" — these
were merged and the reviewer should know.

`page_number` is load-bearing: counsel uses it to find the item in the physical
script. Show it prominently.

---

### Finding

```jsonc
{
  "item_id": "item_9f3c21a4b7de",
  "tier": "NEEDS_VERIFICATION",
  "rationale": "The record establishes that COCA-COLA is an active, registered trademark owned by The Coca-Cola Company [ev_138654f495df, ev_27707629e060]. Trademark rights do not expire on a fixed term [TRADEMARK_NO_EXPIRY].",
  "claims": [
    {
      "text": "The record establishes that COCA-COLA is an active, registered trademark owned by The Coca-Cola Company [ev_138654f495df, ev_27707629e060].",
      "evidence_ids": ["ev_138654f495df", "ev_27707629e060"],
      "rule_ids": []
    }
  ],
  "evidence_ids": ["ev_138654f495df"],
  "rule_outcomes": [ /* RuleOutcome */ ],
  "open_questions": ["Is the on-screen use of the Coca-Cola trademark nominative?"],
  "dropped_claims": ["Sentence removed because it carried no citation."],
  "validated": true,
  "rights_holder_hint": "The Coca-Cola Company",
  "generated_at": "2026-09-07T23:45:12Z"
}
```

- **`claims`** is `rationale` pre-split with citations resolved. **Prefer
  `claims` over parsing `rationale` yourself** — the splitting handles statutory
  abbreviations (`17 U.S.C. § 302(a)`) and author initials (`F. Scott
  Fitzgerald`) that a naive sentence split gets wrong.
- **`dropped_claims`** are statements removed for being uncited or for stating a
  legal conclusion. Show them collapsed, labelled "removed in validation" — they
  demonstrate the validator working, and must never be shown as findings.
- **`validated`** is always `true` on anything the API returns. If you ever see
  `false`, treat it as a bug and do not render the finding.
- **`rights_holder_hint`** may be `null`, `"UNKNOWN"`, or a real name. Treat the
  first two as absent.

---

### RuleOutcome

Deterministic copyright/publicity arithmetic. **Not model output** — computed in
Python. Render as authoritative.

```jsonc
{
  "rule_id": "US_SOUND_RECORDING_MMA",
  "applied_facts": { "work_type": "SOUND_RECORDING", "publication_year": 1926 },
  "outcome": "IN_COPYRIGHT",
  "explanation": "Applying the Classics Protection and Access Act schedule: Sound recording first published 1926 + 100 year term = protection through 31 December 2026...",
  "missing_facts": [],
  "public_domain_year": 2027,
  "citation": "Music Modernization Act, Title II, 17 U.S.C. § 1401",
  "evaluated_at": "2026-09-07T23:45:10Z"
}
```

**`outcome`** — `PUBLIC_DOMAIN`, `IN_COPYRIGHT`, `PUBLIC_DOMAIN_IN_TERM_YEAR`,
`RIGHT_SUBSISTS`, `RIGHT_EXPIRED`, `NOT_APPLICABLE`, `INSUFFICIENT_FACTS`.

> **`INSUFFICIENT_FACTS` is a feature, not an error.** It means research did not
> establish a fact the calculation needs, and `missing_facts` names it exactly
> (e.g. `["domicile_state_at_death"]`). `public_domain_year` is `null`. Render
> these as an actionable research task, not as a failure.

**A music item carries TWO rule outcomes** — one for the composition, one for the
sound recording — and they frequently disagree. Render both side by side; never
collapse them to one status. A public-domain composition does **not** imply a
public-domain recording.

---

### Evidence

```jsonc
{
  "evidence_id": "ev_138654f495df",
  "item_id": "item_9f3c21a4b7de",
  "source_url": "https://trademarks.justia.com/700/22/coca-70022406.html",
  "source_title": "COCA-COLA Trademark of Coca Cola Company, The",
  "retrieved_at": "2026-09-07T23:41:55Z",
  "snippet": "The trademark was filed on 27 Aug 1992...",
  "relevance_note": "Retrieved to establish registrant, registration_status...",
  "confidence": null
}
```

`source_url` is always a real `http(s)` URL — enforced at model construction.
**Always show the URL and `retrieved_at`.** The retrieval date matters: a
trademark status found six months ago may have changed.

For music, `relevance_note` ends with `[composition right]` or
`[sound recording right]`. Use it to group evidence under the correct right.

---

### ReviewState

```jsonc
{
  "item_id": "item_9f3c21a4b7de",
  "decision": "PENDING",       // PENDING | CONFIRMED | REJECTED | ESCALATED
  "reviewer_note": "",
  "reviewer": null,
  "decided_at": null           // ISO timestamp once decided
}
```

An item **absent** from `review_states` counts as `PENDING` and blocks export.
Do not assume the key exists:

```js
const decision = report.review_states[itemId]?.decision ?? "PENDING";
```

---

## Enumerations

### Tier

| Value | Label | Meaning | Suggested colour |
|:---|:---|:---|:---|
| `ESCALATE` | Escalate | Living person depicted, music in copyright, real entity depicted negatively, or a brand shown favourably in a way that could imply endorsement. | red |
| `NEEDS_VERIFICATION` | Needs verification | Evidence incomplete, sources conflict, a required fact is missing, or a mark appears on screen incidentally. | amber |
| `CLEAR_ON_RECORD` | Clear on record | No clearance action likely needed — **pending reviewer sign-off**. | green |

Never label `CLEAR_ON_RECORD` as "Cleared", "Clear", "Safe", "Approved" or "OK".

### ItemCategory

`BRAND_TRADEMARK` · `MUSIC` · `REAL_PERSON` · `REAL_LOCATION_BUSINESS` ·
`PUBLISHED_WORK` · `NAME_COLLISION` · `LOGO_PROP`

`NAME_COLLISION` is a **fictional** name that may collide with a real entity —
worth a distinct icon; it reads differently from a deliberate brand reference.

### Other enums

- **DepictionNature** — `POSITIVE` · `NEUTRAL` · `NEGATIVE`
- **ReviewDecision** — `PENDING` · `CONFIRMED` · `REJECTED` · `ESCALATED`
- **ReportStatus** — `DRAFT` · `SIGNED_OFF`
- **PipelineStage** — `INGEST` · `EXTRACT` · `DEDUPLICATE` · `RESEARCH` · `RULES` · `ASSEMBLE` · `VALIDATE` · `EXPORT` · `REVIEW` · `ORCHESTRATOR`

---

## Rendering citations

`claim.text` contains inline tokens. Two forms occur:

```
[ev_138654f495df]                      single
[ev_138654f495df, ev_27707629e060]     grouped
```

Rule ids are `SCREAMING_SNAKE_CASE` (`[US_LIFE_PLUS_70]`); evidence ids match
`^ev_[0-9a-f]{6,}$`. Resolve them against `report.evidence_store` and
`finding.rule_outcomes` respectively.

```js
const CITE = /\[([^\]]+)\]/g;

function renderClaim(claim, report, finding) {
  return claim.text.replace(CITE, (whole, inner) => {
    const links = inner.split(/[,;]\s*/).map(id => {
      const ev = report.evidence_store[id];
      if (ev) return `<a href="${ev.source_url}" title="${ev.source_title}">${id}</a>`;
      const rule = finding.rule_outcomes.find(r => r.rule_id === id);
      if (rule) return `<a href="#rule-${id}" title="${rule.citation}">${id}</a>`;
      return id; // should not occur — validator strips unresolvable ids
    });
    return `[${links.join(", ")}]`;
  });
}
```

Every id in a returned `claim` resolves — the validator strips unresolvable ones
before the finding is stored. Code defensively anyway.

---

## Suggested screens

1. **Upload** — drop zone, then a progress view polling `/trace`, grouping
   entries by `stage`.
2. **Item list** — from `findings` order. Tier badge, `mention_text`, category
   icon, page numbers, occurrence count, decision state.
3. **Item detail** — occurrences table with page numbers; rationale with
   resolved citations; **both** rule outcomes for music; evidence cards showing
   source link and `retrieved_at`; `open_questions` as a checklist; collapsed
   `dropped_claims`.
4. **Review controls** — Confirm / Reject / Escalate plus a note field, each
   firing the `PATCH`. Show a running "N of M decided" counter.
5. **Trace** — the audit log as a timeline. Highlight `WARNING`/`ERROR` and
   anything with `detail.safety_blocked`.
6. **Export** — calls `POST .../export`. **Handle 409 by rendering
   `pending_items` as a jump list.** Do not merely disable the button.

---

## Notes and current limits

- **No authentication.** Do not expose a deployment publicly without adding it.
- **CORS is `*`** for development. Tighten before production.
- **Storage is in-memory.** Reports are lost on restart or redeploy, and are not
  shared across Cloud Run instances. Treat a session as ephemeral.
- **No pagination anywhere.** A feature-length script may return several hundred
  items and several thousand evidence objects in one `GET /api/reports/{id}`
  response. Expect payloads of a few MB and render with virtualisation.
- **No websocket.** Poll `/trace` for progress; ~3s is reasonable.
- Timestamps are ISO 8601 UTC. IDs are opaque strings — do not parse them.
