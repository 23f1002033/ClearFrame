"""Verify the failure banner, disabled export, and that a healthy report is untouched."""
from playwright.sync_api import sync_playwright
BASE="http://127.0.0.1:8081"; FAILED="rpt_56182ed19714"; GOOD="rpt_57fdc861f486"
results=[]
def check(n,ok,d=""):
    results.append((n,ok,d)); print(f"  {'PASS' if ok else 'FAIL'}  {n}"+(f"\n        {d}" if d else ""))
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page()
    errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(f"{BASE}/ui/?report={FAILED}", wait_until="networkidle"); pg.wait_for_timeout(1500)
    t = pg.inner_text("#appMain")
    check("F1 banner headline shown", "Pipeline did not complete" in t)
    check("F2 states it is not a clean script", "not a clean script" in t.lower())
    check("F3 backend error text surfaced", "Extraction produced no items" in t)
    check("F4 warns items remain unreviewed", "remains unreviewed" in t)
    exp = pg.evaluate("""() => {const b=document.querySelector('#wsBtnExport');
        return b ? {disabled: b.disabled, cls: b.className.includes('cursor-not-allowed'),
                    title: b.title} : null;}""")
    check("F5 export button disabled", bool(exp and exp["disabled"]), f"{exp}")
    check("F6 disabled styling + tooltip", bool(exp and exp["cls"] and "did not complete" in exp["title"]))
    check("F7 trace button offered", pg.locator("#wsViewTrace").count()==1)
    pg.locator("#wsViewTrace").click(); pg.wait_for_timeout(900)
    check("F8 trace button navigates", "trace" == pg.evaluate("async()=>{const {store}=await import('/ui/js/store.js');return store.state.view;}"))
    # a healthy report must be unaffected
    pg.goto(f"{BASE}/ui/?report={GOOD}", wait_until="networkidle"); pg.wait_for_timeout(1800)
    g = pg.inner_text("#appMain")
    check("F9 healthy report shows no failure banner", "Pipeline did not complete" not in g)
    check("F10 healthy report shows the decided counter", "/27 decided" in g,
          [l for l in g.split("\n") if "decided" in l][:1])
    gexp = pg.evaluate("() => {const b=document.querySelector('#wsBtnExport'); return b ? b.disabled : null;}")
    check("F11 healthy report export enabled", gexp is False, f"disabled={gexp}")
    check("F12 no console errors", not errs, "; ".join(errs[:2]))
    b.close()
print("\n" + "="*66)
f=[r for r in results if not r[1]]
print(f"{len(results)-len(f)}/{len(results)} passed, {len(f)} FAILED")
for n,_,d in f: print(f"  FAIL {n}: {d}")
