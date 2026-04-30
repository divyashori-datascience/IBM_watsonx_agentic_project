"""
Insights Enricher
PROJECT_WATSONX — Multi-Agent Synthetic Researcher

Reads raw insights JSON and produces a richer structured JSON
with category_insights, persona behaviors, key metrics, and recommendations.

Usage:
    python3 analyst/insights_report.py
    python3 analyst/insights_report.py --input insights/insights_visa_survey_20260429.json
    python3 analyst/insights_report.py --provider mock
"""

import os
import sys
import json
import argparse
import requests
import time
from pathlib import Path
from datetime import datetime

# ── Paths ─────────────────────────────────────────────────────────────────────

BASE_DIR     = Path(__file__).parent.parent
INSIGHTS_DIR = BASE_DIR / "insights"
INSIGHTS_DIR.mkdir(parents=True, exist_ok=True)

# ── Load .env ─────────────────────────────────────────────────────────────────

def load_env():
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

# ── Persona metadata ──────────────────────────────────────────────────────────

PERSONA_METADATA = {
    "Felix":  {"segment": "Student",      "fee_ceiling": "CHF 5",     "population_pct": 8,  "key": "student"},
    "Lukas":  {"segment": "Professional", "fee_ceiling": "CHF 25-30", "population_pct": 12, "key": "professional"},
    "Anna":   {"segment": "Mittelstand",  "fee_ceiling": "CHF 12",    "population_pct": 28, "key": "mittelstand"},
    "Sandra": {"segment": "Family",       "fee_ceiling": "CHF 10",    "population_pct": 22, "key": "family"},
    "Peter":  {"segment": "Retired",      "fee_ceiling": "CHF 5",     "population_pct": 18, "key": "retired"},
}

# ── System prompt ─────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are a senior consumer insights analyst for Visa Switzerland.
You receive raw survey responses and verdicts for ONE persona and must produce a structured JSON enrichment.

Return ONLY a valid JSON object with this exact structure — no markdown, no explanation:
{
  "key_metrics": {
    "max_monthly_fee_chf": "CHF X",
    "top_feature": "...",
    "switching_intent": "high | medium | low",
    "twint_loyalty": "...",
    "welcome_bonus_effectiveness": "..."
  },
  "category_insights": {
    "price_sensitivity": {
      "finding": "One clear analytical sentence about this persona's price sensitivity.",
      "key_quote": "Most revealing quote from their response.",
      "tags": ["tag1", "tag2", "tag3"]
    },
    "feature_preference": {
      "finding": "...",
      "key_quote": "...",
      "tags": ["...", "..."]
    },
    "behavior_switching": {
      "finding": "...",
      "key_quote": "...",
      "tags": ["...", "..."]
    },
    "trade_off": {
      "finding": "...",
      "key_quote": "...",
      "tags": ["...", "..."]
    },
    "willingness_to_pay": {
      "finding": "...",
      "key_quote": "...",
      "tags": ["...", "..."]
    }
  },
  "visa_recommendation": {
    "viable_product": "...",
    "avoid": ["...", "..."],
    "acquisition_trigger": "..."
  }
}"""

# ── IAM Token ─────────────────────────────────────────────────────────────────

_iam_token_cache  = None
_iam_token_expiry = 0

def get_iam_token() -> str:
    global _iam_token_cache, _iam_token_expiry
    if not _iam_token_cache or time.time() >= _iam_token_expiry:
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
        data = resp.json()
        _iam_token_cache  = data["access_token"]
        _iam_token_expiry = time.time() + data.get("expires_in", 3600) - 60
    return _iam_token_cache

# ── LLM Calls ─────────────────────────────────────────────────────────────────

def call_watsonx(prompt: str) -> str:
    token      = get_iam_token()
    url        = os.environ["WATSONX_URL"].rstrip("/")
    project_id = os.environ["WATSONX_PROJECT_ID"]
    model_id   = os.environ.get("WATSONX_MODEL_ID", "meta-llama/llama-3-3-70b-instruct")

    full_prompt = f"<s>[INST] <<SYS>>\n{SYSTEM_PROMPT}\n<</SYS>>\n\n{prompt} [/INST]"

    payload = {
        "model_id":   model_id,
        "project_id": project_id,
        "input":      full_prompt,
        "parameters": {
            "max_new_tokens":     2000,
            "temperature":        0.3,
            "repetition_penalty": 1.1,
            "stop_sequences":     ["</s>", "[/INST]"],
        },
    }

    for attempt in range(5):
        resp = requests.post(
            f"{url}/ml/v1/text/generation?version=2023-05-29",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type":  "application/json",
            },
            json=payload,
            timeout=120,
        )
        if resp.status_code == 429:
            wait = 3 * (attempt + 1)
            print(f"  Rate limit, {wait}s bekleniyor...")
            time.sleep(wait)
            continue
        print("STATUS:", resp.status_code)
        resp.raise_for_status()
        return resp.json()["results"][0]["generated_text"].strip()

    resp.raise_for_status()


MOCK_TEMPLATES = {
    "Felix": {
        "key_metrics": {
            "max_monthly_fee_chf": "CHF 5",
            "top_feature": "No annual fee or cashback on student spending",
            "switching_intent": "low",
            "twint_loyalty": "high — Twint is default for everything",
            "welcome_bonus_effectiveness": "medium — CHF 20 bonus is attractive"
        },
        "category_insights": {
            "price_sensitivity": {
                "finding": "Extremely price-sensitive — any fee above CHF 5/month is an immediate barrier.",
                "key_quote": "I don't see why I would pay a monthly fee when Twint is free.",
                "tags": ["fee-free preferred", "CHF 5 hard ceiling", "value skeptic"]
            },
            "feature_preference": {
                "finding": "Prefers simplicity over features — cashback on daily spending beats travel perks.",
                "key_quote": "I just want something that works without me thinking about it.",
                "tags": ["simplicity first", "grocery cashback", "no complex rewards"]
            },
            "behavior_switching": {
                "finding": "Low switching intent — Twint covers all daily needs with no cost.",
                "key_quote": "Twint works everywhere I go. I'd only switch if there was a real benefit.",
                "tags": ["Twint loyal", "low switching readiness", "habit-driven"]
            },
            "trade_off": {
                "finding": "Rejects CHF 50 welcome bonus if annual fee exceeds CHF 60.",
                "key_quote": "The bonus disappears after one year but the fee stays forever.",
                "tags": ["rejects one-time bonuses", "long-term cost focus", "annual fee averse"]
            },
            "willingness_to_pay": {
                "finding": "Maximum CHF 5/month — only if card is free at student banks.",
                "key_quote": "Maybe CHF 5 if I get something back every month.",
                "tags": ["CHF 5 ceiling", "student budget", "fee-free preferred"]
            }
        },
        "visa_recommendation": {
            "viable_product": "Free student Visa card with 1% cashback on grocery and transport spending",
            "avoid": ["annual fees above CHF 60", "complex points systems", "travel-focused perks"],
            "acquisition_trigger": "Partnership with student banks — zero fee first year with automatic cashback"
        }
    },
    "Lukas": {
        "key_metrics": {
            "max_monthly_fee_chf": "CHF 25-30",
            "top_feature": "No foreign fees + travel insurance combo",
            "switching_intent": "high",
            "twint_loyalty": "medium — already uses credit card",
            "welcome_bonus_effectiveness": "low — not a decision driver"
        },
        "category_insights": {
            "price_sensitivity": {
                "finding": "Value-driven, not price-sensitive. Immediately chooses CHF 8/month if ROI is clear.",
                "key_quote": "The math clearly favors zero foreign fees.",
                "tags": ["picks CHF 8/mo over variable fee", "evaluates CHF 5/mo on merit", "ROI focused"]
            },
            "feature_preference": {
                "finding": "No foreign fees + travel insurance is the strongest combination for this segment.",
                "key_quote": "Foreign fees and insurance have continuous value.",
                "tags": ["no foreign fees + travel insurance wins", "2% cashback secondary", "travel-first"]
            },
            "behavior_switching": {
                "finding": "Will switch if rewards are automatic and frictionless.",
                "key_quote": "If I clearly see monthly net gains without changing behavior, I would switch.",
                "tags": ["already credit card user", "high switching readiness", "no points systems"]
            },
            "trade_off": {
                "finding": "Accepts net gain instantly — no hesitation at CHF 15 save / CHF 10 fee.",
                "key_quote": "That is a clear net gain. As long as savings are consistent, I would pay.",
                "tags": ["rejects CHF 50 bonus / CHF 72 cost", "accepts reliable net gain immediately"]
            },
            "willingness_to_pay": {
                "finding": "CHF 25-30/month is the ceiling, conditional on strong travel insurance.",
                "key_quote": "I would go up to CHF 25-30 per month, but only if the value clearly justifies it.",
                "tags": ["max CHF 25-30/mo", "premium product tier", "Visa Infinite appropriate"]
            }
        },
        "visa_recommendation": {
            "viable_product": "Premium Visa card — CHF 20-25/month with zero foreign fees and travel insurance",
            "avoid": ["welcome bonuses as primary hook", "points systems with thresholds"],
            "acquisition_trigger": "Automatic value delivery — no effort required from the cardholder"
        }
    },
    "Anna": {
        "key_metrics": {
            "max_monthly_fee_chf": "CHF 12",
            "top_feature": "Grocery cashback — 1% on supermarket spending",
            "switching_intent": "medium",
            "twint_loyalty": "high — uses Twint for P2P and small purchases",
            "welcome_bonus_effectiveness": "medium — needs to offset first year fee"
        },
        "category_insights": {
            "price_sensitivity": {
                "finding": "Budget-conscious — needs to see clear monthly savings before committing to a fee.",
                "key_quote": "I would need to calculate if the cashback actually covers the monthly fee.",
                "tags": ["CHF 12 ceiling", "monthly savings required", "budget-first mindset"]
            },
            "feature_preference": {
                "finding": "Grocery cashback is the primary motivator — covers largest monthly spend category.",
                "key_quote": "I spend a lot at Migros and Coop. Cashback there would add up quickly.",
                "tags": ["grocery cashback priority", "Migros/Coop focus", "practical features only"]
            },
            "behavior_switching": {
                "finding": "Would switch if free trial proves value — needs to experience benefit before committing.",
                "key_quote": "I'd want to try it for a month before deciding to keep paying.",
                "tags": ["trial-first adopter", "medium switching readiness", "proof required"]
            },
            "trade_off": {
                "finding": "Accepts CHF 8/month only if monthly cashback consistently exceeds the fee.",
                "key_quote": "If I save CHF 15 on groceries and pay CHF 8, that makes sense to me.",
                "tags": ["positive ROI required", "CHF 8 sweet spot", "monthly calculation mindset"]
            },
            "willingness_to_pay": {
                "finding": "CHF 8-12/month is acceptable if grocery cashback delivers consistent returns.",
                "key_quote": "Up to CHF 12 if the cashback really works at my supermarkets.",
                "tags": ["CHF 8-12 range", "cashback-dependent", "largest segment by population"]
            }
        },
        "visa_recommendation": {
            "viable_product": "Mass-market Visa card — CHF 8/month with 1% grocery cashback at Migros and Coop",
            "avoid": ["travel-focused perks irrelevant to segment", "complex tier structures"],
            "acquisition_trigger": "30-day free trial with guaranteed cashback on first grocery shop"
        }
    },
    "Sandra": {
        "key_metrics": {
            "max_monthly_fee_chf": "CHF 10",
            "top_feature": "Family purchase protection + grocery cashback",
            "switching_intent": "medium",
            "twint_loyalty": "medium — uses both Twint and debit card",
            "welcome_bonus_effectiveness": "high — family budget makes bonuses attractive"
        },
        "category_insights": {
            "price_sensitivity": {
                "finding": "Joint household decision — both partners must agree before adopting a paid card.",
                "key_quote": "I would need to discuss this with my partner before making any commitment.",
                "tags": ["joint decision required", "CHF 10 ceiling", "household budget focus"]
            },
            "feature_preference": {
                "finding": "Purchase protection for large family purchases is equally valued as grocery cashback.",
                "key_quote": "When you buy appliances or electronics for a family, protection matters.",
                "tags": ["purchase protection valued", "grocery cashback", "family-scale spending"]
            },
            "behavior_switching": {
                "finding": "Would switch if family-wide card covers multiple cardholders under one fee.",
                "key_quote": "If we could both use the card and share the cashback, that would be worth it.",
                "tags": ["family plan preferred", "shared account appeal", "medium switching readiness"]
            },
            "trade_off": {
                "finding": "Accepts CHF 8/month only if both grocery cashback and purchase protection are included.",
                "key_quote": "The cashback alone might not be enough. I'd want the protection too.",
                "tags": ["dual feature requirement", "CHF 8 acceptable with full package", "value bundling"]
            },
            "willingness_to_pay": {
                "finding": "CHF 8-10/month if card delivers clear family value — household decision gate applies.",
                "key_quote": "Ten francs a month is reasonable if we actually save more than that.",
                "tags": ["CHF 10 ceiling", "family ROI mindset", "second largest segment"]
            }
        },
        "visa_recommendation": {
            "viable_product": "Family Visa card — CHF 8/month with grocery cashback + purchase protection",
            "avoid": ["individual-only positioning", "travel perks as primary hook", "complex points redemption"],
            "acquisition_trigger": "Family plan with shared cashback pool — position as household financial tool"
        }
    },
    "Peter": {
        "key_metrics": {
            "max_monthly_fee_chf": "CHF 5",
            "top_feature": "Simple interface + fraud protection",
            "switching_intent": "low",
            "twint_loyalty": "low — prefers cash and debit card",
            "welcome_bonus_effectiveness": "low — trust more important than incentives"
        },
        "category_insights": {
            "price_sensitivity": {
                "finding": "Fixed income constraint — any monthly fee above CHF 5 is a hard rejection.",
                "key_quote": "I live on a pension. Every franc counts and I don't pay for things I don't need.",
                "tags": ["CHF 5 hard ceiling", "fixed income constraint", "fee averse"]
            },
            "feature_preference": {
                "finding": "Security and simplicity override all other features — fraud protection is non-negotiable.",
                "key_quote": "I need to know my money is safe and the card is easy to use.",
                "tags": ["security first", "simplicity required", "no complex features"]
            },
            "behavior_switching": {
                "finding": "Very low switching intent — established cash and debit habits are deeply ingrained.",
                "key_quote": "I've been using the same bank for 30 years. Switching is not something I do easily.",
                "tags": ["habit-driven", "low switching readiness", "trust-first adopter"]
            },
            "trade_off": {
                "finding": "No trade-off acceptable above CHF 5 — trust barrier prevents adoption at any premium tier.",
                "key_quote": "A bonus means nothing if I don't understand or trust the product.",
                "tags": ["trust barrier dominant", "bonus ineffective", "rejects premium tiers"]
            },
            "willingness_to_pay": {
                "finding": "Maximum CHF 5/month — only if card is offered through existing trusted bank relationship.",
                "key_quote": "If my bank offered it and it was simple, I might consider it for five francs.",
                "tags": ["CHF 5 ceiling", "bank-trust dependency", "not priority acquisition target"]
            }
        },
        "visa_recommendation": {
            "viable_product": "Basic Visa debit card — no monthly fee or maximum CHF 5 via existing bank partner",
            "avoid": ["premium positioning", "complex cashback structures", "digital-first onboarding"],
            "acquisition_trigger": "Bank partnership model — existing trust relationship is the only viable entry point"
        }
    }
}


def call_mock(persona_name: str) -> str:
    template = MOCK_TEMPLATES.get(persona_name, MOCK_TEMPLATES["Anna"])
    return json.dumps(template)

# ── Build prompt ──────────────────────────────────────────────────────────────

def build_prompt(persona_name: str, persona_responses: list, raw_insights: dict) -> str:
    meta = PERSONA_METADATA.get(persona_name, {})
    responses_text = ""
    for r in persona_responses[:5]:
        q   = r.get("question", "")
        ans = r.get("answer", "")
        cat = r.get("category", "")
        responses_text += f"\n[{cat}] Q: {q}\nA: {ans}\n"

    verdicts = {}
    for q_id, insight in raw_insights.items():
        seg = insight.get("segment_responses", {}).get(persona_name, {})
        if seg:
            verdicts[q_id] = seg

    return (
        f"Persona: {persona_name}\n"
        f"Segment: {meta.get('segment', '')}\n"
        f"Fee ceiling: {meta.get('fee_ceiling', '')}\n"
        f"Population: {meta.get('population_pct', '')}% of Swiss adults\n\n"
        f"Survey responses:\n{responses_text}\n\n"
        f"Raw verdicts:\n{json.dumps(verdicts, indent=2)}\n\n"
        f"Produce the enriched insight JSON for {persona_name} only."
    )

# ── Main enricher ─────────────────────────────────────────────────────────────

def enrich_insights(insights_path: Path, provider: str = "watsonx") -> dict:
    with open(insights_path, encoding="utf-8") as f:
        data = json.load(f)

    raw_insights  = data.get("insights", {})
    survey_run_id = data.get("survey_run_id", "unknown")
    responses_dir = BASE_DIR / "responses"

    enriched = {
        "survey_run_id": survey_run_id,
        "generated_at":  datetime.now().isoformat(),
        "provider":      provider,
        "personas":      {}
    }

    for persona_name, meta in PERSONA_METADATA.items():
        print(f"\n  → Enriching {persona_name} ({meta['segment']})...")

        persona_key       = meta["key"]
        files             = sorted(responses_dir.glob(f"{persona_key}_*.json"), reverse=True)
        persona_responses = []
        if files:
            with open(files[0], encoding="utf-8") as f:
                resp_data         = json.load(f)
                persona_responses = resp_data.get("results", [])

        try:
            if provider == "mock":
                raw = call_mock(persona_name)
            else:
                prompt = build_prompt(persona_name, persona_responses, raw_insights)
                raw    = call_watsonx(prompt)

            raw    = raw.strip()
            start  = raw.find("{")
            end    = raw.rfind("}") + 1
            parsed = json.loads(raw[start:end])

            enriched["personas"][persona_name] = parsed
            print(f"  ✓ {persona_name} enriched")

        except Exception as e:
            print(f"  ✗ Failed to enrich {persona_name}: {e}")

    # Save
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_path  = INSIGHTS_DIR / f"insight_report_{timestamp}.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(enriched, f, indent=2, ensure_ascii=False)

    print(f"\n  ✓ Saved → insights/insight_report_{timestamp}.json")
    return enriched

# ── CLI ───────────────────────────────────────────────────────────────────────

def get_latest_insights() -> Path | None:
    files = sorted(INSIGHTS_DIR.glob("insights_*.json"), reverse=True)
    return files[0] if files else None


def main():
    parser = argparse.ArgumentParser(description="Enrich insights JSON with category-level persona behaviors")
    parser.add_argument("--input",    type=str, default=None)
    parser.add_argument("--provider", choices=["watsonx", "mock"], default="watsonx")
    args = parser.parse_args()

    insights_path = Path(args.input) if args.input else get_latest_insights()
    if not insights_path:
        print("✗ No insights file found. Run orchestrator first.")
        sys.exit(1)

    print(f"\n{'═' * 60}")
    print(f"  INSIGHTS ENRICHER")
    print(f"  Input    : {insights_path.name}")
    print(f"  Provider : {args.provider}")
    print(f"{'═' * 60}")

    enrich_insights(insights_path, args.provider)
    print("\n✓ Done.")


if __name__ == "__main__":
    main()
