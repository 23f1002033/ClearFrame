# ClearFrame

**Script clearance research, automated. Evidence for counsel — never a verdict.**

---

## The problem

Before a film shoots, someone has to run a clearance review: every brand, song,
real person, real location, published work and trademark in the screenplay gets
checked for rights status. It takes **2–3 weeks** and costs **$5,000–15,000**.

Roughly **90% of that is research, not judgment** — reading the script,
listing what's flaggable, then looking each item up one at a time. The judgment
part, the part that actually needs a qualified attorney, is the last 10%.

Independent productions frequently skip it. Not because they think it's
unnecessary, but because three weeks and $10k is the entire post-production
budget. They shoot, and find out later.

## What we built

ClearFrame automates the 90%. It reads a screenplay, extracts every flaggable
item with real page numbers, runs sourced web research on each one through
Parallel, applies deterministic copyright-term rules in Python, and produces a
review-ready clearance log where **every substantive claim carries a citation**.

**It does not give legal advice, and it never says an item is cleared.** That
constraint is enforced in code, not in copy:

- There is no `CLEARED` state anywhere in the type system. A test walks every
  enum and fails if `CLEARED`, `APPROVED`, `SAFE` or `OK_TO_USE` appears.
- A citation validator splits each rationale into claims and **deletes** any
  claim that doesn't resolve to a real evidence id or rule id — and any claim
  containing "cleared", "safe", "legal" or "you may use", *even when cited*.
- The copyright rules engine is pure Python. A test parses its AST and fails if
  it ever imports a model SDK or calls `generate_content`.

The output is triage: how much reviewer attention each item needs, with the
evidence already gathered and the terms already calculated.

---

## The flagship result: one song, two rights, opposite answers

The single most common clearance mistake in music is treating a song as one
thing. It's two: the **musical composition** and the **sound recording**.
Different owners, different terms, licensed separately. Clearing one clears
nothing about the other.

Our sample screenplay has a character propose recording *"Bye Bye Blackbird"*
for a car commercial because "it's a hundred years old, which is why it's free."

ClearFrame issues **two separate research briefs** for every music item, each
explicitly scoped away from the other. Parallel returned **16 sources**, tagged
by which right they bear on, with only 3 URLs overlapping between them — the
composition brief surfaced the publisher chain (Redwood Music / Ray Henderson
Music / Olde Clover Leaf), the recording brief surfaced a master-use licensing
PDF and a sync-license request page.

Both briefs independently established **1926**. The deterministic engine then
computed both terms:

| Right | Rule | Outcome | Public domain from |
|:---|:---|:---|---:|
| Musical composition | `US_PUB_PRE_1978_95_YEARS` (17 U.S.C. § 304(b)) | `PUBLIC_DOMAIN` | **2022** |
| Sound recording | `US_SOUND_RECORDING_MMA` (17 U.S.C. § 1401) | `IN_COPYRIGHT` | **2027** |

Same song. Same year. **Opposite answers.** The composition is free; the 1926
master is protected until 1 January 2027 under the Music Modernization Act's
100-year band.

The exported finding says so, with every sentence cited:

> Sources establish that the musical composition "Bye Bye Blackbird" was
> published in 1926 `[ev_c5a6d2c7d095, ev_4890a1b603cb]`. Based on this
> publication date, the composition's 95-year term has expired, placing the
> underlying work in the public domain `[US_PUB_PRE_1978_95_YEARS]`.
> Conversely, the earliest sound recordings were also produced in 1926
> `[ev_c9b78aad236d, ev_a7163c305ba9]`. Under the applicable schedule, a 1926
> sound recording remains under copyright until January 1, 2027
> `[US_SOUND_RECORDING_MMA]`.

The recording's rule outcome carries a standing caveat: *"A public-domain sound
recording does not imply a public-domain musical composition."* And because the
item is `ESCALATE`, the export drafts a licensing enquiry addressed to the
publisher chain the research found, asking for **both** rights and requesting a
referral for whichever the recipient doesn't control.

That's the whole thesis in one item: sourced facts in, deterministic arithmetic
in the middle, a cited finding and an actionable next step out.

---

## Architecture

Five stages, each an ADK tool, orchestrated by a Gemini root agent.

```
screenplay.pdf
    │
    ▼  INGEST      pypdf page boundaries + Gemini segmentation,
    │              reconciled against a deterministic slugline parser
    │              so page numbers are never model-estimated
    ▼  EXTRACT     Gemini structured output, chunked, concurrent,
    │              then deduplicated  →  32 mentions collapse to 23 items
    ▼  RESEARCH    Parallel fan-out, one brief per category,
    │              TWO briefs for music  →  190 sourced evidence objects
    ▼  RULES       pure Python term arithmetic. No LLM. Names any
    │              missing fact instead of guessing a year
    ▼  ASSEMBLE    Gemini synthesis with rule outcomes already in context,
    │              then the citation validator strips uncited claims
    ▼
clearance log + draft licensing emails
```

**Deduplication is the cost control.** One item equals one paid research
fan-out, so merging "Coke"/"Coca-Cola" and "the estate"/"Gene Austin" turned 32
mentions into 23 tasks.

**Page numbers are load-bearing.** Counsel reads a finding and goes to find the
line. The deterministic parser is the authority on which physical page a
slugline sits on, and it overrides the model on every disagreement. Text and PDF
of the same script produce byte-identical page attribution.

**Two model-level constraints, not prompt instructions.** The ADK agent runs
with `FunctionCallingConfigMode.ANY`, so it must call a tool rather than narrate
a conclusion. And the assembly tool refuses to run until the deterministic rules
engine has produced an outcome — plus escalation triggers (living person shown,
in-copyright music, negative depiction, endorsement-shaped use) are computed in
Python and the model **cannot lower them**.

---

## Benchmark

15 items scored against a golden set spanning all tiers and categories, each
verified by **independent** fresh web research — the pipeline's own stored
Parallel evidence was deliberately not re-read, so a source it never retrieved
can contradict it. Two did.

| Metric | Result | |
|:---|---:|:---|
| Extraction recall | **100.0%** | 14/14 golden items extracted |
| Extraction precision | **93.3%** | 1 known false positive |
| Evidence coverage | **100.0%** | 14/14 items with ≥1 sourced citation |
| Evidence-citation accuracy | **100.0%** | 14/14 findings where every claim resolves |
| Rules-engine accuracy | **100.0%** | 3/3 term calculations match verified year |

Verdicts: **12 MATCH · 1 PARTIAL · 2 MISMATCH**.

The failures are the interesting part:

- **Gene Austin (PARTIAL).** The engine returned `INSUFFICIENT_FACTS` naming
  `domicile_state_at_death` and refused to compute a publicity term — correct
  behaviour, since US post-mortem terms run 0–100 years by state. But one
  independent fetch found it: *"Austin died on January 24, 1972, in Palm
  Springs, California."* California is 70 years, so the right subsists to 2042.
  A research-depth gap, not a reasoning error — the person brief should query
  "died in ⟨city⟩" explicitly.

- **Meridian Records (MISMATCH).** The pipeline matched the bare string
  "Meridian" to a trademark hit and named **Scotsman Group LLC** — an ice-machine
  manufacturer. The real Meridian Records is a British classical label founded in
  London in 1977. Wrong entity, though the negative-depiction `ESCALATE` was
  still right.

- **"Clinton administration" (MISMATCH).** Extracted as a `REAL_PERSON`
  depiction from the line *"a jukebox nobody has fed since the Clinton
  administration."* It's an idiom for elapsed time. Bill Clinton being alive is
  true and irrelevant. Kept in the golden set deliberately as the precision test.

**Honest note on method:** this golden set was verified via independent
AI-assisted web research, not a full manual paralegal review. With our team size
that was the achievable standard. Every source URL is recorded in
`data/golden_set.json` so any entry can be re-checked by hand, and the two
mismatches were found and written down rather than smoothed over.

Four `LOGO_PROP` entries are ground-truth-verified but marked `PENDING` — the
benchmark refuses to score an entry the pipeline hasn't run, rather than
counting it as a pass.

---

## What it's actually like to use

Upload a screenplay. Two to four minutes later you have a clearance log. Then
**you cannot export it until a human has decided every item** — the API returns
`409 Conflict` with the list of what's outstanding. That's a backend rule, not a
disabled button, because a clearance log leaving the building without human
review is precisely the failure this product exists to prevent.

On our 7-page sample: 23 items, 190 sources, **12 Escalate / 10 Needs
verification / 1 Clear on record**. Escalate is reserved for genuine exposure —
a living person, in-copyright music, negative depiction, or endorsement-shaped
on-screen use. Neutral background brands sit at Needs verification, because a
review that flags three-quarters of a script as needing counsel hasn't triaged
anything.

## Built with

**Google Cloud ADK** (native — no LangChain, no LangGraph, enforced by an
AST test) · **Gemini 3.1 Pro** for extraction and synthesis, **Gemini Flash**
for scene segmentation, both with explicitly configured safety thresholds ·
**Parallel Search API** for sourced research · FastAPI · Pydantic v2 ·
Cloud Run · **318 passing tests**.
