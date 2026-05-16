# Visa Insight Studio — UI

Multi-agent synthetic researcher UI for Visa Switzerland.
HSLU MSc Agentic AI · Group 29 · IBM watsonx Orchestrate.

## Run
```bash
npm install
node server.js
```
Open http://localhost:5000

## Files
- `public/index.html` — Single-page app (UI + 3-layer routing + PDF/Excel export)
- `public/qdata.js` — 50 Q_DATA research entries (5 personas × 5 categories)
- `server.js` — Minimal Express server (port 5000)
- `package.json` — Node 22 + Express only

## Stack
Node.js 22 · Express · vanilla HTML/CSS/JS · jsPDF · SheetJS
