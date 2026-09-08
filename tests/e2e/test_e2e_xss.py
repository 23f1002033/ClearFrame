"""Evidence snippets and titles come from scraped web pages. Verify they cannot
inject markup into the workspace."""
import json
from playwright.sync_api import sync_playwright
BASE="http://127.0.0.1:8081"
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page()
    alerts=[]; pg.on("dialog", lambda d: (alerts.append(d.message), d.dismiss()))
    pg.goto(f"{BASE}/ui/", wait_until="networkidle"); pg.wait_for_timeout(800)
    r = pg.evaluate("""async () => {
      const {store} = await import('/ui/js/store.js');
      const m = await import('/ui/js/mock_data.js');
      const rep = JSON.parse(JSON.stringify(m.MOCK_REPORT));
      const item = rep.items[0];
      const evId = 'ev_' + 'f'.repeat(12);
      // Hostile content in every field that originates from a scraped page.
      rep.evidence_store[evId] = {
        evidence_id: evId, item_id: item.item_id,
        source_url: 'https://x.example/1',
        source_title: '<img src=x onerror="window.__xss1=1">TITLE',
        retrieved_at: '2026-09-08T00:00:00Z',
        snippet: '<script>window.__xss2=1<\\/script><b>BOLD</b>',
        relevance_note: '<svg onload="window.__xss3=1"></svg>NOTE'
      };
      const f = rep.findings.find(x => x.item_id === item.item_id);
      f.claims = [{text: 'Hostile <img src=x onerror="window.__xss4=1"> claim [' + evId + '].',
                   evidence_ids: [evId], rule_ids: []}];
      item.mention_text = '<img src=x onerror="window.__xss5=1">MENTION';
      item.occurrences[0].context_snippet = '<img src=x onerror="window.__xss6=1">CTX';
      store.setState({currentReport: rep, currentTrace: m.MOCK_TRACE,
                      selectedItemId: item.item_id, view: 'workspace', demoMode: true});
      await new Promise(r => setTimeout(r, 600));
      return {
        injected: [1,2,3,4,5,6].filter(n => window['__xss'+n]),
        rawImgWithOnerror: document.querySelectorAll('#appMain img[onerror]').length,
        rawScriptTags: document.querySelectorAll('#appMain script').length,
        rawSvgOnload: document.querySelectorAll('#appMain svg[onload]').length,
        titleRenderedAsText: document.body.innerText.includes('TITLE'),
        boldRenderedAsText: document.body.innerText.includes('<b>BOLD</b>')
                            || document.body.innerText.includes('BOLD'),
      };
    }""")
    print("  injected globals fired :", r["injected"] or "none")
    print("  <img onerror> elements :", r["rawImgWithOnerror"])
    print("  <script> elements      :", r["rawScriptTags"])
    print("  <svg onload> elements  :", r["rawSvgOnload"])
    print("  hostile title as text  :", r["titleRenderedAsText"])
    print("  js dialogs raised      :", alerts or "none")
    ok = not r["injected"] and r["rawImgWithOnerror"]==0 and r["rawScriptTags"]==0 and r["rawSvgOnload"]==0
    print(f"\n  {'PASS' if ok else 'FAIL'}  scraped content is escaped, not executed")
    b.close()
