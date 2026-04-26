"""
Analyst Agent
PROJECT_WATSONX — Multi-Agent Synthetic Researcher

Reads persona response JSONs and produces structured insight reports
for the Visa product team. Called by the Orchestrator after all
persona agents have completed their survey runs.

Usage (standalone):
    python3 analyst/analyst_agent.py --response responses/family_20260426.json
    python3 analyst/analyst_agent.py --all
    python3 analyst/analyst_agent.py --all --provider mock

Usage (from Orchestrator):
    from analyst.analyst_agent import run_analyst
    insights = run_analyst(response_files, provider=args.provider)
"""

import os
import sys
import json
import argparse
import requests
from datetime import datetime
from pathlib import Path

# ── Paths ─────────────────────────────────────────────────────────────────────

BASE_DIR      = Path(__file__).parent.parent
RESPONSES_DIR = BASE_DIR / "responses"
INSIGHTS_DIR  = BASE_DIR / "insights"
INSIGHTS_DIR.mkdir(exist_ok=True)

# ── Load .env ─────────────────────────────────────────────────────────────────

def load_env():
    env_path = BASE_DIR.parent / ".env"
    if not env_path.exists():
        env_path = BASE_DIR / ".env"
    if not env_path.exists():
        return
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip())

load_env()

# ── Persona metadata (from analyst JSON — segment_weighting) ──────────────────

PERSONA_METADATA = {
    "student": {
        "persona_id":            "persona_1_student",
        "agent_label":           "Campus Felix — Student Segment",
        "segment_type":          "Student",
        "population_weight_pct": 8,
        "fee_ceiling":           "CHF 5",
    },
    "professional": {
        "persona_id":            "persona_2_professional",
        "agent_label":           "Mobile-First Lukas — Professional Segment",
        "segment_type":          "Professional",
        "population_weight_pct": 12,
        "fee_ceiling":           "CHF 25-30",
    },
    "mittelstand": {
        "persona_id":            "persona_3_mittelstand",
        "agent_label":           "Average-Earner Anna — Mittelstand Segment",
        "segment_type":          "Mittelstand",
        "population_weight_pct": 28,
        "fee_ceiling":           "CHF 12",
    },
    "family": {
        "persona_id":            "persona_4_family",
        "agent_label":           "Value-Smart Sandra — Family Segment",
        "segment_type":          "Family",
        "population_weight_pct": 22,
        "fee_ceiling":           "CHF 10",
    },
    "retired": {
        "persona_id":            "persona_5_retired",
        "agent_label":           "Trust-First Peter — Retired Segment",
        "segment_type":          "Retired",
        "population_weight_pct": 18,
        "fee_ceiling":           "CHF 5",
    },
}

# ── System prompt (from analyst JSON — agent_identity.system_role) ────────────

ANALYST_SYSTEM_PROMPT = """You are a consumer insights analyst specialising in Swiss retail banking and payment products. You work on behalf of VISA's product strategy team. You have just received structured responses from five synthetic Swiss consumer personas — Felix (Student), Lukas (Professional/DINK), Anna (Mittelstand), Sandra (Family), and Peter (Retired). Your job is to analyse their responses, identify patterns, surface pricing thresholds and adoption barriers, and produce a structured, actionable insight report. You do not simulate any of these consumers — you reason analytically about them as a population. Your audience is a senior VISA product team. Be precise, evidence-grounded, and commercial in your framing.

Population weights for Swiss adult population (7.1M adults total):
- Campus Felix (Student): 8% — ~570,000 adults — fee ceiling CHF 5
- Mobile-First Lukas (Professional/DINK): 12% — ~850,000 adults — fee ceiling CHF 25-30
- Average-Earner Anna (Mittelstand): 28% — ~1,990,000 adults — fee ceiling CHF 12
- Value-Smart Sandra (Family): 22% — ~1,560,000 adults — fee ceiling CHF 10
- Trust-First Peter (Retired): 18% — ~1,280,000 adults — fee ceiling CHF 5

Reasoning rules:
- Always convert monthly fees to annual cost — Swiss consumers frame fees annually
- MAYBE verdict = 45% adoption probability. YES = 85%. NO = 5%
- Population weight is the multiplier — Anna (28%) matters 3.5x more than Felix (8%) for market sizing
- NEVER recommend a price above CHF 8 as mass market sweet spot without explicit justification
- NEVER classify Peter (Retired) as a priority acquisition target
- NEVER present MAYBE as equivalent to YES in adoption calculations
- If 3+ segments return NO at a price point — flag this price as not viable for mass market

Produce your response as a valid JSON object following this structure:
{
  "insight_id": "insight_<survey_run_id>",
  "generated_at": "<ISO timestamp>",
  "survey_run_id": "<echoed from input>",
  "personas_analysed": <count>,
  "missing_personas": [],
  "segment_responses": {
    "<persona_name>": {
      "verdict": "YES | NO | MAYBE | CONDITIONAL",
      "key_barrier": "<main reason for non-adoption or condition for adoption>",
      "key_quote": "<short quote from their response>",
      "fee_ceiling": "<CHF X>",
      "population_weight_pct": <number>
    }
  },
  "pricing_analysis": {
    "per_segment_threshold": {"<persona>": "<CHF range>"},
    "sweet_spot_price": "CHF X",
    "weighted_adoption_at_sweet_spot": "<X% of Swiss adult population>",
    "pricing_recommendation": "<2-3 sentence recommendation>"
  },
  "feature_analysis": {
    "weighted_feature_ranking": ["1. ...", "2. ...", "3. ..."],
    "universal_table_stakes": ["...", "..."],
    "polarising_features": ["..."]
  },
  "adoption_forecast": {
    "highest_value_segment": "<persona and reason>",
    "gtm_segment_priority": ["1. ...", "2. ...", "3. ..."]
  },
  "barrier_map": {
    "systemic_barriers": {"<barrier_name>": {"affects": [], "fix": "..."}},
    "segment_specific_barriers": {"<persona>": "..."}
  },
  "cross_segment_insight": "<3-5 sentence synthesis of the most important cross-segment pattern>",
  "visa_recommendation": {
    "primary_recommendation": "...",
    "secondary_recommendation": "...",
    "key_assumption": "...",
    "confidence_level": "HIGH | MEDIUM | LOW",
    "suggested_follow_up_questions": ["...", "...", "..."]
  },
  "confidence_level": "HIGH | MEDIUM | LOW",
  "analyst_flags": ["..."]
}

Return ONLY the JSON object. No explanation, no markdown, no extra text."""

# ── IAM Token ─────────────────────────────────────────────────────────────────

_iam_token_cache = None

def get_iam_token() -> str:
    global _iam_token_cache
    if _iam_token_cache:
        return _iam_token_cache
    resp = requests.post(
        "https://iam.cloud.ibm.com/identity/token",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
            "apikey": os.environ["WATSONX_API_KEY"],
        },
        timeout=30,
    )
    resp.raise_for_status()
    _iam_token_cache = resp.json()["access_token"]
    return _iam_token_cache

# ── LLM Call ──────────────────────────────────────────────────────────────────

def call_watsonx(prompt: str) -> str:
    token      = get_iam_token()
    url        = os.environ["WATSONX_URL"].rstrip("/")
    project_id = os.environ["WATSONX_PROJECT_ID"]
    model_id   = os.environ.get("WATSONX_MODEL_ID", "meta-llama/llama-3-3-70b-instruct")

    full_prompt = f"<s>[INST] <<SYS>>\n{ANALYST_SYSTEM_PROMPT}\n<</SYS>>\n\n{prompt} [/INST]"

    payload = {
        "model_id":   model_id,
        "project_id": project_id,
        "input":      full_prompt,
        "parameters": {
            "max_new_tokens":     1024,  # analyst needs more tokens for structured output, however it can be updated to 512 if we want to reduce latency and cost
            "temperature":        0.3,   # lower temperature for analytical output
            "repetition_penalty": 1.1,
            "stop_sequences":     ["</s>", "[/INST]"],
        },
    }

    resp = requests.post(
        f"{url}/ml/v1/text/generation?version=2023-05-29",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type":  "application/json",
        },
        json=payload,
        timeout=120,  # analyst needs more time than persona agents
    )
    resp.raise_for_status()
    return resp.json()["results"][0]["generated_text"].strip()


def call_mock(prompt: str) -> str:
    """Mock response for testing without API calls."""
    return json.dumps({
        "insight_id":        "insight_mock_run",
        "generated_at":      datetime.now().isoformat(),
        "survey_run_id":     "mock_run",
        "personas_analysed": 5,
        "missing_personas":  [],
        "segment_responses": {
            "Felix":   {"verdict": "NO",    "key_barrier": "Fee above CHF 5 ceiling", "key_quote": "[MOCK]", "fee_ceiling": "CHF 5",     "population_weight_pct": 8},
            "Lukas":   {"verdict": "YES",   "key_barrier": "None — ROI positive",     "key_quote": "[MOCK]", "fee_ceiling": "CHF 25-30", "population_weight_pct": 12},
            "Anna":    {"verdict": "MAYBE", "key_barrier": "Needs free trial",         "key_quote": "[MOCK]", "fee_ceiling": "CHF 12",    "population_weight_pct": 28},
            "Sandra":  {"verdict": "MAYBE", "key_barrier": "Joint decision required",  "key_quote": "[MOCK]", "fee_ceiling": "CHF 10",    "population_weight_pct": 22},
            "Peter":   {"verdict": "NO",    "key_barrier": "Trust + fee barriers",     "key_quote": "[MOCK]", "fee_ceiling": "CHF 5",     "population_weight_pct": 18},
        },
        "pricing_analysis": {
            "sweet_spot_price":              "CHF 8",
            "weighted_adoption_at_sweet_spot": "~48% of Swiss adults",
            "pricing_recommendation":        "[MOCK] Price at CHF 8 for broad adoption.",
        },
        "cross_segment_insight": "[MOCK] This is a placeholder insight.",
        "visa_recommendation": {
            "primary_recommendation":   "[MOCK] Launch at CHF 8 with free trial.",
            "secondary_recommendation": "[MOCK] Premium tier for Lukas.",
            "key_assumption":           "[MOCK] Anna converts on trial.",
            "confidence_level":         "MEDIUM",
            "suggested_follow_up_questions": ["[MOCK] Follow-up question 1?"],
        },
        "confidence_level": "MEDIUM",
        "analyst_flags":    ["[MOCK] This is a mock run — no real analysis performed."],
    })

# ── Format input bundle (from analyst JSON — input_schema) ────────────────────

def format_input_bundle(survey_run_id: str, question: dict, responses: dict) -> str:
    """
    Formats persona responses into the input_schema bundle
    defined in agent_analyst_v1.json.

    Args:
        survey_run_id: unique run identifier
        question:      dict with 'question_id', 'category', 'text'
        responses:     dict of persona_key → answer string

    Returns:
        Formatted prompt string for the analyst LLM
    """
    response_objects = []
    missing_personas = []

    for persona_key, meta in PERSONA_METADATA.items():
        answer = responses.get(persona_key)
        if not answer:
            missing_personas.append(persona_key)
            continue

        response_objects.append({
            "persona_id":            meta["persona_id"],
            "agent_label":           meta["agent_label"],
            "segment_type":          meta["segment_type"],
            "population_weight_pct": meta["population_weight_pct"],
            "fee_ceiling":           meta["fee_ceiling"],
            "verbatim_response":     answer,
        })

    bundle = {
        "survey_run_id":   survey_run_id,
        "run_mode":        "synthetic",
        "question_id":     question.get("question_id", question.get("id", "Q?")),
        "question_text":   question.get("text", ""),
        "question_type":   question.get("category", "general"),
        "responses":       response_objects,
        "missing_personas": missing_personas,
    }

    return (
        f"Analyse the following Swiss consumer survey response bundle and produce a structured insight JSON.\n\n"
        f"Response bundle:\n{json.dumps(bundle, indent=2, ensure_ascii=False)}"
    )

# ── Parse LLM response ────────────────────────────────────────────────────────

def parse_insight(raw: str) -> dict:
    """Extracts JSON from LLM response — handles extra text around the JSON."""
    raw = raw.strip()
    start = raw.find("{")
    end   = raw.rfind("}") + 1
    if start == -1 or end == 0:
        raise ValueError(f"No JSON object found in analyst response:\n{raw[:500]}")
    return json.loads(raw[start:end])

# ── Core analyst function ─────────────────────────────────────────────────────

def analyse_question(
    survey_run_id: str,
    question:      dict,
    responses:     dict,
    provider:      str = "watsonx",
) -> dict:
    """
    Analyses a single question across all persona responses.

    Args:
        survey_run_id: unique identifier for this survey run
        question:      dict with question_id, category, text
        responses:     dict of persona_key → answer string
        provider:      'watsonx' or 'mock'

    Returns:
        Structured insight dict following output_schema
    """
    prompt = format_input_bundle(survey_run_id, question, responses)

    if provider == "mock":
        raw = call_mock(prompt)
    else:
        raw = call_watsonx(prompt)

    return parse_insight(raw)

# ── Run analyst on response files ─────────────────────────────────────────────

def run_analyst(response_files: dict, provider: str = "watsonx") -> dict:
    """
    Runs the analyst agent on a set of persona response files.
    Called by the Orchestrator.

    Args:
        response_files: dict of persona_key → Path to response JSON file
        provider:       'watsonx' or 'mock'

    Returns:
        dict of question_id → insight dict
    """
    if not response_files:
        print("  ✗ No response files provided to analyst")
        return {}

    # Load all response data
    persona_data = {}
    for persona_key, file_path in response_files.items():
        with open(file_path, encoding="utf-8") as f:
            persona_data[persona_key] = json.load(f)

    # Get questions from first persona's response
    first_persona   = next(iter(persona_data.values()))
    questions       = first_persona.get("results", [])
    survey_run_id   = f"visa_survey_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    all_insights    = {}

    print(f"\n  Analyst Agent — analysing {len(questions)} questions across {len(persona_data)} personas")

    for item in questions:
        q_id   = item.get("question_id", item.get("id", "Q?"))
        q_text = item.get("question", item.get("text", ""))
        q_cat  = item.get("category", "general")

        print(f"\n  → Analysing {q_id}...")

        # Collect primary answer from each persona for this question
        responses = {}
        for persona_key, data in persona_data.items():
            for result in data.get("results", []):
                if result.get("question_id") == q_id:
                    responses[persona_key] = result.get("answer", "")
                    break

        question = {"question_id": q_id, "category": q_cat, "text": q_text}

        try:
            insight = analyse_question(survey_run_id, question, responses, provider)
            all_insights[q_id] = insight
            print(f"  ✓ {q_id} insight generated — confidence: {insight.get('confidence_level', 'N/A')}")
        except Exception as e:
            print(f"  ✗ Failed to analyse {q_id}: {e}")

    # Save consolidated insight file
    output = {
        "survey_run_id": survey_run_id,
        "generated_at":  datetime.now().isoformat(),
        "provider":      provider,
        "total_questions": len(questions),
        "insights":      all_insights,
    }

    out_path = INSIGHTS_DIR / f"insights_{survey_run_id}.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f"\n  ✓ All insights saved → insights/insights_{survey_run_id}.json")

    return all_insights

# ── CLI ───────────────────────────────────────────────────────────────────────

def get_latest_response(persona: str) -> Path | None:
    files = sorted(RESPONSES_DIR.glob(f"{persona}_*.json"), reverse=True)
    return files[0] if files else None


def main():
    parser = argparse.ArgumentParser(description="Analyst Agent — generates insight JSONs from persona responses")
    parser.add_argument("--all",      action="store_true", help="Run analyst on all latest persona responses")
    parser.add_argument("--response", type=str,            help="Path to a single persona response JSON file")
    parser.add_argument("--provider", choices=["watsonx", "mock"], default="watsonx")
    args = parser.parse_args()

    if not args.all and not args.response:
        parser.error("Specify --all or --response <file>")

    if args.all:
        # Collect latest response file for each persona
        response_files = {}
        for persona in PERSONA_METADATA.keys():
            file = get_latest_response(persona)
            if file:
                response_files[persona] = file
                print(f"  ✓ Found: {file.name}")
            else:
                print(f"  ✗ No response found for {persona}")

        if not response_files:
            print("✗ No response files found. Run run_survey.py first.")
            sys.exit(1)

        run_analyst(response_files, args.provider)

    elif args.response:
        file = Path(args.response)
        if not file.exists():
            print(f"✗ File not found: {file}")
            sys.exit(1)

        # Determine persona from filename
        persona = file.stem.split("_")[0]
        run_analyst({persona: file}, args.provider)


if __name__ == "__main__":
    main()
