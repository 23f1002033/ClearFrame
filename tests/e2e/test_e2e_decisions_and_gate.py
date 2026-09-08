"""QA pass 2: decisions+persistence, hotkeys, 409 gate, 200 export."""
import json, urllib.request
from playwright.sync_api import sync_playwright
BASE="http://127.0.0.1:8081"; RID="rpt_57fdc861f486"
results=[]
def check(n, ok, d=""):
    results.append((n,ok,d)); print(f"  {'PASS' if ok else 'FAIL'}  {n}" + (f"\n        {d}" if d else ""))
def server_decision(item_id):
    with urllib.request.urlopen(f"{BASE}/api/reports/{RID}") as r:
        rep=json.load(r)
    return (rep["review_states"].get(item_id) or {}).get("decision","PENDING")

with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page()
    errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type=="error" else None)
    pg.goto(f"{BASE}/ui/?report={RID}", wait_until="networkidle"); pg.wait_for_timeout(1500)

    # ---------- 6. Decision + server persistence ----------
    print("\n[6] Confirm/Reject/Escalate persists via PATCH, verified by GET")
    first_id = pg.evaluate("() => document.querySelector('.item-row').dataset.id")
    pg.locator(".item-row").first.click(); pg.wait_for_timeout(500)
    before = server_decision(first_id)
    check("6a starts PENDING server-side", before=="PENDING", f"got {before}")
    patched=[]
    pg.on("request", lambda r: patched.append(r.url) if r.method=="PATCH" else None)
    pg.locator("button.btn-decide[data-decision='CONFIRMED']").first.click()
    pg.wait_for_timeout(1200)
    check("6b PATCH issued", any(first_id in u for u in patched), f"{patched}")
    after = server_decision(first_id)
    check("6c PERSISTED server-side (verified by GET)", after=="CONFIRMED", f"server says {after}")
    counter = pg.inner_text("#itemList") if False else pg.inner_text("#appMain")
    check("6d counter shows 1/27 decided", "1/27" in counter, [l for l in counter.split("\n") if "/27" in l][:2])
    # Escalate a second item
    ids = pg.evaluate("() => [...document.querySelectorAll('.item-row')].map(r=>r.dataset.id)")
    pg.locator(f".item-row[data-id='{ids[1]}']").click(); pg.wait_for_timeout(400)
    pg.locator("button.btn-decide[data-decision='ESCALATED']").first.click(); pg.wait_for_timeout(1000)
    check("6e second decision persisted", server_decision(ids[1])=="ESCALATED", server_decision(ids[1]))
    check("6f counter now 2/27", "2/27" in pg.inner_text("#appMain"))

    # ---------- 7. Hotkeys ----------
    print("\n[7] Keyboard shortcuts C/R/E/X and J/K")
    pg.locator(f".item-row[data-id='{ids[2]}']").click(); pg.wait_for_timeout(400)
    pg.locator("body").click(position={"x":5,"y":5})  # ensure no input focused
    for key, expect in (("c","CONFIRMED"), ("r","REJECTED"), ("e","ESCALATED"), ("x","PENDING")):
        pg.keyboard.press(key); pg.wait_for_timeout(900)
        got = server_decision(ids[2])
        check(f"7a '{key}' -> {expect}", got==expect, f"server says {got}")
    # J/K navigation
    sel_before = pg.evaluate("async()=>{const {store}=await import('/ui/js/store.js');return store.state.selectedItemId;}")
    pg.keyboard.press("j"); pg.wait_for_timeout(500)
    sel_after = pg.evaluate("async()=>{const {store}=await import('/ui/js/store.js');return store.state.selectedItemId;}")
    check("7b 'j' moves selection", sel_before!=sel_after, f"{sel_before} -> {sel_after}")
    pg.keyboard.press("k"); pg.wait_for_timeout(500)
    sel_back = pg.evaluate("async()=>{const {store}=await import('/ui/js/store.js');return store.state.selectedItemId;}")
    check("7c 'k' moves back", sel_back==sel_before, f"{sel_after} -> {sel_back}")
    # J/K must follow the VISIBLE (filtered) order
    pg.evaluate("async()=>{const {store}=await import('/ui/js/store.js'); store.setState({tierFilter:'CLEAR_ON_RECORD'});}")
    pg.wait_for_timeout(700)
    visible = pg.evaluate("() => [...document.querySelectorAll('.item-row')].map(r=>r.dataset.id)")
    pg.evaluate(f"async()=>{{const {{store}}=await import('/ui/js/store.js'); store.selectItem('{visible[0]}');}}")
    pg.wait_for_timeout(400)
    pg.locator("body").click(position={"x":5,"y":5})
    pg.keyboard.press("j"); pg.wait_for_timeout(600)
    nav_to = pg.evaluate("async()=>{const {store}=await import('/ui/js/store.js');return store.state.selectedItemId;}")
    check("7d 'j' stays within the FILTERED list", nav_to in visible,
          f"filter shows {len(visible)} items {visible}; j jumped to {nav_to} (not visible)")
    pg.evaluate("async()=>{const {store}=await import('/ui/js/store.js'); store.setState({tierFilter:'ALL'});}")
    pg.wait_for_timeout(600)

    # search focus retention
    print("\n[7e] search input focus retention while typing")
    pg.locator("#wsSearchInput").click()
    pg.keyboard.type("coca")
    pg.wait_for_timeout(700)
    st = pg.evaluate("""() => {
      const el=document.querySelector('#wsSearchInput');
      return {value: el ? el.value : null, focused: document.activeElement===el};
    }""")
    check("7e search keeps focus + full text while typing", st["focused"] and st["value"]=="coca",
          f"value={st['value']!r} focused={st['focused']} (re-render steals focus)")
    pg.evaluate("async()=>{const {store}=await import('/ui/js/store.js'); store.setState({searchQuery:''});}")
    pg.wait_for_timeout(500)

    # ---------- 8. Real 409 ----------
    print("\n[8] Export with pending items -> real backend 409 + gate modal")
    statuses=[]
    pg.on("response", lambda r: statuses.append((r.status, r.url)) if "/export" in r.url else None)
    pg.locator("#wsBtnExport").click(); pg.wait_for_timeout(1800)
    check("8a backend returned 409", any(s==409 for s,_ in statuses), f"{statuses}")
    gate = pg.inner_text("#appModals") if pg.locator("#appModals").count() else ""
    check("8b gate modal opened", "Export Blocked" in gate)
    listed = pg.locator(".gate-item-row").count()
    srv_pending = 27-2  # two decided above, third reset to PENDING
    check("8c gate lists the right pending count", listed==srv_pending, f"modal lists {listed}, server pending {srv_pending}")
    check("8d modal states pending of total", f"of 27" in gate, [l for l in gate.split("\n") if "of 27" in l][:1])
    pg.keyboard.press("Escape"); pg.wait_for_timeout(500)

    b.close()

print("\n"+"="*72)
f=[r for r in results if not r[1]]
print(f"{len(results)-len(f)}/{len(results)} passed, {len(f)} FAILED")
for n,_,d in f: print(f"  FAIL {n}: {str(d)[:160]}")
