# Live end-to-end QA suite

Playwright scripts that drive the real frontend against a running backend. They
exist because every bug in this directory's history was invisible to the Python
unit suite: the app rendered correctly while sending nothing to the server.

Not collected by `pytest` (they need a live server and a browser). Run manually:

```bash
pip install playwright && playwright install chromium

# Serve the app with the verified report pre-seeded, on :8081
PYTHONPATH=src python tests/e2e/qa_server.py &

python tests/e2e/test_e2e_dashboard_and_inspector.py   # dashboard, demo, citations, music split
python tests/e2e/test_e2e_decisions_and_gate.py        # PATCH persistence, hotkeys, real 409
python tests/e2e/test_e2e_full_review_and_export.py    # decide all 27, 200 export, markdown shape
python tests/e2e/test_e2e_failed_run_handling.py       # a FAILED run must not read as clean
python tests/e2e/test_e2e_xss.py                       # scraped evidence cannot inject markup
```

`test_e2e_full_review_and_export.py` mutates review state; re-seed by restarting
`qa_server.py`. Report ids are hardcoded to the seeded fixture — update them if
`output/report.json` is regenerated.
