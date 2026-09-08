"""QA pass 1: dashboard, demo mode, real-report inspector, music split, citations."""
import json, re, sys
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8081"
RID = "rpt_57fdc861f486"
results = []
def check(n, ok, detail=""):
    results.append((n, ok, detail))
    print(f"  {'PASS' if ok else 'FAIL'}  {n}" + (f"\n        {detail}" if detail else ""))

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    errors, failed_req = [], []
    pg.on("console", lambda m: errors.append(f"{m.type}: {m.text}") if m.type in ("error",) else None)
    pg.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
    pg.on("requestfailed", lambda r: failed_req.append(f"{r.method} {r.url} :: {r.failure}"))
    pg.on("response", lambda r: failed_req.append(f"HTTP {r.status} {r.url}") if r.status >= 400 else None)

    # ---------- 1. Dashboard ----------
    print("\n[1] Dashboard loads via GET /api/reports, zero console/network errors")
    reqs = []
    pg.on("request", lambda r: reqs.append(r.url))
    pg.goto(f"{BASE}/ui/", wait_until="networkidle")
    pg.wait_for_timeout(1200)
    check("1a dashboard rendered", pg.locator("#appMain").count() > 0)
    check("1b GET /api/reports was called", any("/api/reports" in u and not re.search(r"/api/reports/", u) for u in reqs))
    check("1c no console errors", not errors, "; ".join(errors[:3]))
    check("1d no failed/4xx requests", not failed_req, "; ".join(failed_req[:3]))
    body = pg.inner_text("#appMain")
    check("1e report card shows 27 items", "27" in body, f"body snippet: {body[:180]!r}")

    # ---------- 2. Demo mode ----------
    print("\n[2] Demo mode populates from mock_data.js with correct counts")
    demo_btn = pg.locator("button:has-text('Demo'), button:has-text('Sample')").first
    if demo_btn.count():
        demo_btn.click(); pg.wait_for_timeout(1200)
    counts = pg.evaluate("""async () => {
      const m = await import('/ui/js/mock_data.js');
      const tc = m.MOCK_REPORT.findings.reduce((a,f)=>(a[f.tier]=(a[f.tier]||0)+1,a),{});
      return {items: m.MOCK_REPORT.items.length, tiers: tc,
              exports: Object.keys(m), listRow: m.MOCK_REPORTS ? m.MOCK_REPORTS[0] : null};
    }""")
    check("2a mock has 27 items", counts["items"] == 27, f"got {counts['items']}")
    check("2b mock tier_counts correct", counts["tiers"] == {"ESCALATE":12,"NEEDS_VERIFICATION":13,"CLEAR_ON_RECORD":2}, f"got {counts['tiers']}")
    dash = pg.evaluate("""async () => {
      const {store} = await import('/ui/js/store.js');
      store.state.demoMode = true;
      await store.refreshReports();
      return store.state.reports[0];
    }""")
    check("2c demo dashboard row items == 27", dash["items"] == 27, f"got {dash['items']}")
    check("2d demo dashboard tier_counts match mock",
          dash["tier_counts"] == {"ESCALATE":12,"NEEDS_VERIFICATION":13,"CLEAR_ON_RECORD":2},
          f"dashboard row says {dash['tier_counts']} but the mock report contains {counts['tiers']}")
    check("2e demo dashboard pending == 27", dash["pending"] == 27, f"got {dash['pending']}")

    # ---------- 3. Real report inspector ----------
    print("\n[3] Real report item shows evidence, citations, rule outcomes")
    errors.clear(); failed_req.clear()
    pg.goto(f"{BASE}/ui/?report={RID}", wait_until="networkidle"); pg.wait_for_timeout(1500)
    check("3a workspace rendered", pg.locator("#itemList").count() > 0)
    rows = pg.locator(".item-row").count()
    check("3b item rows rendered", rows == 27, f"got {rows}")
    insp = pg.inner_text("#appMain").upper()  # headings render via CSS uppercase
    check("3c occurrences table present", "SCREENPLAY OCCURRENCES" in insp)
    check("3d evidence vault present", "EVIDENCE VAULT" in insp)
    check("3e rule outcomes present", "RULE OUTCOMES" in insp or "DUAL-RIGHTS" in insp)
    ev_cards = pg.locator("[id^='card-ev_']").count()
    check("3f evidence cards rendered", ev_cards > 0, f"{ev_cards} cards")
    chips = pg.locator(".cite-token").count()
    check("3g citation chips rendered", chips > 0, f"{chips} chips")
    check("3h no console errors on workspace", not errors, "; ".join(errors[:3]))

    # ---------- 4. Bye Bye Blackbird side-by-side ----------
    print("\n[4] Bye Bye Blackbird: composition and recording SIDE BY SIDE")
    bbb = pg.locator(".item-row", has_text="BYE BYE BLACKBIRD")
    check("4a music item in list", bbb.count() > 0)
    if bbb.count():
        bbb.first.click(); pg.wait_for_timeout(900)
        t = pg.inner_text("#appMain"); T = t.upper()
        check("4b dual-rights section shown", "DUAL-RIGHTS" in T)
        check("4c composition rule present", "US_PUB_PRE_1978_95_YEARS" in t)
        check("4d recording rule present", "US_SOUND_RECORDING_MMA" in t)
        check("4e both outcomes present", "PUBLIC_DOMAIN" in t and "IN_COPYRIGHT" in t)
        grid = pg.evaluate("""() => {
          const hs = [...document.querySelectorAll('h3')];
          const h = hs.find(x => x.textContent.includes('Dual-Rights'));
          if (!h) return null;
          const g = h.parentElement.querySelector('.grid');
          if (!g) return null;
          const kids = [...g.children];
          const tops = kids.map(k => Math.round(k.getBoundingClientRect().top));
          return {n: kids.length, tops, cls: g.className,
                  sameRow: kids.length===2 && Math.abs(tops[0]-tops[1]) < 20};
        }""")
        check("4f exactly 2 cards in a grid", grid and grid["n"] == 2, f"{grid}")
        check("4g rendered on the SAME ROW (side by side)", bool(grid and grid["sameRow"]),
              f"card tops={grid['tops'] if grid else None} (viewport {pg.viewport_size})")
        # not collapsed: also confirm section 4 didn't duplicate them
        cards = pg.evaluate("() => document.querySelectorAll(\"[id='rule-US_SOUND_RECORDING_MMA']\").length")
        check("4h recording rule rendered in exactly one card", cards == 1, f"{cards} rule cards")

    # ---------- 5. Citation chips resolve to the right card ----------
    print("\n[5] Citation chips scroll to and highlight the CORRECT evidence card")
    res = pg.evaluate("""() => {
      const chips = [...document.querySelectorAll('.cite-token[data-ev-id]')];
      if (!chips.length) return {err: 'no evidence chips'};
      const out = [];
      for (const c of chips.slice(0, 5)) {
        const id = c.dataset.evId;
        const card = document.getElementById('card-' + id);
        out.push({id, cardExists: !!card,
                  cardIdMatches: card ? card.id === 'card-' + id : false,
                  chipLabel: c.textContent.trim()});
      }
      const ruleChips = [...document.querySelectorAll('.cite-token[data-rule-id]')];
      return {out, ruleChipCount: ruleChips.length,
              ruleTargets: ruleChips.slice(0,3).map(c => ({id: c.dataset.ruleId,
                  targetExists: !!document.getElementById('rule-' + c.dataset.ruleId)}))};
    }""")
    if res.get("err"):
        check("5a evidence chips exist", False, res["err"])
    else:
        allok = all(o["cardExists"] and o["cardIdMatches"] for o in res["out"])
        check("5a every ev chip resolves to its own card", allok, json.dumps(res["out"][:3]))
        idmatch = all(o["chipLabel"].strip().endswith(o["id"]) or o["id"] in o["chipLabel"] for o in res["out"])
        check("5b chip label matches the id it targets", idmatch)
    # click behaviour
    clicked = pg.evaluate("""() => {
      const c = document.querySelector('.cite-token[data-ev-id]');
      if (!c) return null;
      const id = c.dataset.evId;
      c.click();
      const card = document.getElementById('card-' + id);
      return {id, highlighted: card ? card.className.includes('ring-2') : false};
    }""")
    check("5c clicking an ev chip highlights that card", bool(clicked and clicked["highlighted"]), f"{clicked}")
    check("5d rule chips have a scroll target", 
          res.get("ruleChipCount", 0) == 0 or all(r["targetExists"] for r in res.get("ruleTargets", [])),
          f"{res.get('ruleChipCount')} rule chips; targets={res.get('ruleTargets')}")

    b.close()

print("\n" + "="*72)
f = [r for r in results if not r[1]]
print(f"{len(results)-len(f)}/{len(results)} passed, {len(f)} FAILED")
for n, _, d in f: print(f"  FAIL {n}: {d[:150]}")
json.dump([{"name":n,"ok":o,"detail":d} for n,o,d in results], open(f"{__import__('os').environ.get('SP','.')}/qa1.json","w"), indent=2)
