# Multi-Agent Synthetic Researcher
**PROJECT WATSONX — Group 29 HSLU**

An AI-powered multi-agent system that simulates Swiss consumer feedback for Visa card product research. Five synthetic personas grounded in real Swiss demographic data answer survey questions, producing structured insights for the Visa product team.

---

## System Pipeline

```
Orchestrator
      ↓
Question Generator → generates questions from a topic
      ↓
Persona Agents (5) → same questions, all personas, RAG-grounded
      ↓
Evaluation Suite → consistency, confidence, differentiation
      ↓
Analyst Agent → reads all persona responses per question → structured insight JSON with Visa recommendations
```

---

## Personas

| Persona | Name | Age | Net Income | Fee Ceiling |
|---------|------|-----|------------|-------------|
| Student | Campus Felix | 22 | CHF 800–2,000/mo | CHF 5/mo |
| Professional | Mobile-First Lukas | 32 | CHF 8,500–11,200/mo | CHF 25–30/mo |
| Mittelstand | Average-Earner Anna | 36 | CHF 5,600/mo | CHF 12/mo |
| Family | Value-Smart Sandra | 44 | CHF 7,500–9,800/mo (household) | CHF 10/mo |
| Retired | Trust-First Peter | 65 | CHF 1,682/mo | CHF 5/mo |

---

## Quick Start

**1. Install dependencies:**
```bash
pip install requests chromadb
```

**2. Create `.env` in project root:**
```
WATSONX_URL=https://eu-de.ml.cloud.ibm.com
WATSONX_PROJECT_ID=your_project_id
WATSONX_API_KEY=your_api_key
WATSONX_MODEL_ID=meta-llama/llama-3-3-70b-instruct
```

**3. Run the full pipeline:**
```bash
python3 orchestrator/orchestrator.py --provider watsonx --topic "Visa card pricing in Switzerland"
```

**4. Test without API calls:**
```bash
python3 orchestrator/orchestrator.py --provider mock --topic "Mobile payment adoption"
```

**5. Run with specific personas only (faster for testing):**
```bash
python3 orchestrator/orchestrator.py --provider watsonx --topic "Visa card pricing in Switzerland" --personas family mittelstand
```

**6. Run survey or evaluation separately:**
```bash
python3 scripts/run_survey.py --all --provider watsonx
python3 evaluation/run_evaluation.py
```

**Expected runtime:** ~5-8 minutes for 2 personas, ~15-25 minutes for all 5 personas. WatsonX API response time is the bottleneck, not local hardware.

---

## Configuration

Edit `config.json` to change number of questions, personas, or model settings without touching any code.

---

## Data Sources

The RAG knowledge base uses 57 chunks from publicly available Swiss data. No sensitive or Visa-internal data is used. 

| Source | Publisher | Year |
|--------|-----------|------|
| Payment Methods Survey | Swiss National Bank (SNB) | 2024 |
| Swiss Payment Monitor | ZHAW / University of St.Gallen | 2025 |
| Population by Age | BFS | 2024 |
| Household Budget Survey | BFS | 2022–2023 |

---

## Project Structure

```
project-watsonx-group29/
├── config.json
├── orchestrator/
│   ├── orchestrator.py
│   └── question_generator.py
├── rag/
│   ├── chunks.py
│   ├── retriever.py
│   └── README.md
├── scripts/
│   └── run_survey.py
├── evaluation/
├── analyst/
│   ├── __init__.py
│   └── analyst_agent.py     ← generates insight JSONs from persona responses
├── personas/
├── prompts/
├── survey/
├── responses/
└── insights/
```

---

*Group 29 — HSLU MSc Agentic AI Course*
