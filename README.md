# RAG Knowledge Base — Swiss Consumer Data

This folder contains the Retrieval-Augmented Generation (RAG) layer for the Multi-Agent Synthetic Researcher project. Each persona agent retrieves relevant Swiss consumer data before answering survey questions, grounding responses in real demographic and behavioral statistics rather than relying solely on the LLM's training data.

---

## How It Works

Before each survey question, `retriever.py` queries the knowledge base with the persona type and question text. The 4 most relevant data chunks are injected into the persona's system prompt as context. This means Sandra's answer about grocery spending is backed by actual BFS household budget data, not just a prompt-engineered assumption.

```
Question → retrieve_context(persona, question) → top 4 chunks → injected into system prompt → LLM answers
```

---

## Data Sources

| # | File | Publisher | Coverage | Year |
|---|------|-----------|----------|------|
| 1 | `paytrans_survey_report_2024_en.pdf` | Swiss National Bank (SNB) | Payment behavior of private individuals in Switzerland | 2024 |
| 2 | `Report_Swiss_Payment_Monitor_2025-1_final_en.pdf` | ZHAW / University of St.Gallen | Payment method market shares, mobile payment, neobanks | Survey Nov 2024, published Feb 2025 |
| 3 | `population_by_age_region.xlsx` | Swiss Federal Statistical Office (BFS) | Permanent resident population by age and canton | 2024 |
| 4 | `household_budget_data.xlsx` | Swiss Federal Statistical Office (BFS) | Household income and expenditure by category | 2022–2023 |

All sources are publicly available and free to access. No sensitive, client-specific, or Visa-internal data is used.

---

## Knowledge Base Contents (50 chunks)

Chunks are organized by source and topic:

| Source | Chunks | Topics covered |
|--------|--------|---------------|
| SNB Payment Survey 2024 | 15 | Payment method shares by age/income, cash usage, Twint, acceptance constraints |
| Swiss Payment Monitor 2025 | 17 | Market shares, mobile payers, provider breakdown, transaction amounts by location |
| BFS Population Data 2024 | 5 | Population size per persona age group |
| BFS Household Budget 2022–2023 | 13 | Gross/disposable income, spending by category, savings, pension income |

Each chunk is tagged with:
- `source` — which report it came from
- `topic` — semantic category (e.g. `cash_attitude`, `food_spending`)
- `personas` — which persona(s) it is most relevant to (`student`, `family`, `professional`, `retired`, or `all`)

---

## Persona–Data Mapping

| Persona | Most relevant chunks |
|---------|---------------------|
| **Student** (age 18–34, 1.86M people) | Mobile payment dominance, Twint usage, small amounts, neobanks, low cash usage |
| **Family** (age 35–54, 2.54M people) | Debit card at large retailers, household food/housing/transport spend, CHF 629 groceries |
| **Professional** (age 25–54, 3.75M people) | Credit card for travel/restaurants, higher income bracket, cashless preference |
| **Retired** (age 65+, 1.77M people) | Cash dominance in 55+ group, AHV/pension income, opposition to cash abolition |

---

## Updating the Knowledge Base

The SNB and BFS publish updated reports annually (typically Q1 of the following year). To keep the knowledge base current:

### When to update
- **SNB Payment Methods Survey** — published each spring for the previous year
- **Swiss Payment Monitor** — published twice yearly (spring and autumn)
- **BFS Population Data** — published each spring for December 31 of the previous year
- **BFS Household Budget** — published every 1–2 years

### How to update (step by step)

1. Download the new reports from the official sources:
   - SNB: [www.snb.ch](https://www.snb.ch)
   - Swiss Payment Monitor: [www.swisspaymentmonitor.ch](https://www.swisspaymentmonitor.ch)
   - BFS: [www.bfs.admin.ch](https://www.bfs.admin.ch)

2. Open `chunks.py` and update the relevant chunk texts with new figures. Each chunk clearly states its source and year, making it easy to identify what needs updating.

3. For entirely new data topics, add new chunk entries following the existing format:
   ```python
   {
       "id":       "snb_16",           # unique ID
       "text":     "...",              # the actual data fact, one sentence
       "source":   "SNB Payment Survey 2025",
       "topic":    "topic_name",
       "personas": ["family", "retired"],  # or ["all"]
   }
   ```

4. The knowledge base rebuilds itself in memory on the next run — no separate build step needed.

5. Re-run the survey and check that persona answers still make sense. If a persona's behavior has changed significantly (e.g. cash usage dropped further), consider updating the persona prompts too.

---

## Design Decisions

**Why hardcoded chunks instead of loading PDFs at runtime?**
Extracting structured facts from PDFs automatically is unreliable — tables, charts, and formatting cause errors. By manually extracting and verifying each chunk, we ensure data quality. This is appropriate for a consulting context where accuracy matters.

**Why in-memory ChromaDB instead of a persistent database?**
The knowledge base is small (50 chunks) and rebuilds in under a second. An in-memory approach removes file system dependencies and makes the project easier to run on any machine.

**Why TF-IDF embeddings instead of a neural embedding model?**
Neural embedding models require downloading 80–400MB model files and an internet connection. The TF-IDF approach works fully offline, is deterministic, and is sufficient for a 50-chunk knowledge base where the chunks are already well-labelled by persona and topic.

---

## Limitations

- **Data is static** — the knowledge base does not update itself. Annual manual update is required.
- **Swiss market only** — all data is specific to Switzerland. The system would need new data sources for other markets.
- **Aggregated data** — all figures are national averages. Regional differences (e.g. Zurich vs. rural cantons) are not captured at chunk level.
- **Language** — source documents are in English or German. Chunks are written in English to match the persona prompts.
