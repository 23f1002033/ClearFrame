"""QA pass 3: decide all 27 through the UI, then export 200 and validate markdown."""
import json, re, urllib.request
from playwright.sync_api import sync_playwright
BASE="http://127.0.0.1:8081"; RID="rpt_57fdc861f486"
results=[]
def check(n,ok,d=""):
    results.append((n,ok,d)); print(f"  {'PASS' if ok else 'FAIL'}  {n}"+(f"\n        {d}" if d else ""))

with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page()
    errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type=="error" else None)
    statuses=[]
    pg.on("response", lambda r: statuses.append((r.status,r.url)) if "/export" in r.url else None)
    pg.goto(f"{BASE}/ui/?report={RID}", wait_until="networkidle"); pg.wait_for_timeout(1500)

    print("\n[9] Decide all 27 items through the UI, then export")
    ids = pg.evaluate("() => [...document.querySelectorAll('.item-row')].map(r=>r.dataset.id)")
    check("9a all 27 rows present", len(ids)==27, f"{len(ids)}")
    # Drive real PATCHes through the UI for every item.
    for i, iid in enumerate(ids):
        pg.evaluate(f"async()=>{{const {{store}}=await import('/ui/js/store.js'); store.selectItem('{iid}');}}")
        pg.wait_for_timeout(90)
        dec = "ESCALATED" if i % 3 == 0 else ("CONFIRMED" if i % 3 == 1 else "REJECTED")
        pg.locator(f"button.btn-decide[data-decision='{dec}']").first.click()
        pg.wait_for_timeout(170)
    pg.wait_for_timeout(1200)
    srv = json.load(urllib.request.urlopen(f"{BASE}/api/reports/{RID}"))
    pending = [i["item_id"] for i in srv["items"]
               if (srv["review_states"].get(i["item_id"]) or {}).get("decision","PENDING")=="PENDING"]
    check("9b zero pending server-side", not pending, f"{len(pending)} still pending: {pending[:3]}")
    check("9c counter reads 27/27", "27/27" in pg.inner_text("#appMain"),
          [l for l in pg.inner_text("#appMain").split("\n") if "/27" in l][:1])

    statuses.clear()
    pg.locator("#wsBtnExport").click(); pg.wait_for_timeout(2500)
    check("9d backend returned 200", any(s==200 for s,_ in statuses), f"{statuses}")
    modal = pg.inner_text("#appModals")
    check("9e export modal opened", "SIGNED_OFF" in modal or "Clearance Research Log" in modal, modal[:90])
    md = pg.evaluate("async()=>{const {store}=await import('/ui/js/store.js'); return store.state.exportData?.markdown || '';}")
    check("9f markdown returned", len(md) > 5000, f"{len(md)} chars")
    # Well-formedness of the returned log
    flat = re.sub(r"\s+", " ", md.replace("\n>", " "))  # disclaimer is a wrapped blockquote
    checks = {
        "H1 title": md.startswith("# Clearance research log"),
        "disclaimer": "not legal advice" in flat.lower(),
        "no-cleared statement": "No item in this log has been cleared" in flat,
        "summary table": "## Summary by tier" in md,
        "findings section": "## Findings" in md,
        "draft emails appendix": "## Appendix A" in md,
        "unsent draft marker": "UNSENT DRAFT" in md,
        "all 27 items numbered": all(f"\n### {n}. " in md for n in range(1,28)),
        "evidence urls present": md.count("https://") > 100,
        "rule ids present": "US_SOUND_RECORDING_MMA" in md and "TRADEMARK_NO_EXPIRY" in md,
        "reviewer decisions recorded": "**Reviewer decision:**" in md,
        "balanced md tables": md.count("|:---") >= 5,
        "no empty markdown links from scraped snippets": "[]" not in md,
        "no unresolved template": "{" not in md.replace("{{","") or "${" not in md,
    }
    for k,v in checks.items(): check(f"9g markdown: {k}", v)
    # tier labels must never read as permission
    banned = [w for w in ("is cleared","safe to use","you may use","approved for use") if w in md.lower()]
    check("9h no advice vocabulary in export", not banned, f"found {banned}")
    check("9i status flipped to SIGNED_OFF",
          json.load(urllib.request.urlopen(f"{BASE}/api/reports/{RID}"))["status"]=="SIGNED_OFF")
    check("9j no console errors during full flow", not errs, "; ".join(errs[:2]))
    b.close()

print("\n"+"="*72)
f=[r for r in results if not r[1]]
print(f"{len(results)-len(f)}/{len(results)} passed, {len(f)} FAILED")
for n,_,d in f: print(f"  FAIL {n}: {str(d)[:150]}")
