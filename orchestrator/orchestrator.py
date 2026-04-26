"""
Orchestrator Agent
PROJECT_WATSONX — Multi-Agent Synthetic Researcher

The Orchestrator coordinates the full pipeline:
    1. Runs all persona survey agents (via run_survey.py)
    2. Runs the evaluation suite (consistency, confidence, differentiation)
    3. Calls the Analyst Agent to generate insight JSONs
    4. Saves a consolidated final report

Usage:
    python3 orchestrator/orchestrator.py --provider watsonx
    python3 orchestrator/orchestrator.py --provider mock
    python3 orchestrator/orchestrator.py --provider watsonx --personas student family
"""

import os
import sys
import json
import argparse
import subprocess
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from orchestrator.question_generator import generate_questions

# ── Paths ─────────────────────────────────────────────────────────────────────

BASE_DIR       = Path(__file__).parent.parent
SCRIPTS_DIR    = BASE_DIR / "scripts"
EVAL_DIR       = BASE_DIR / "evaluation"
INSIGHTS_DIR   = BASE_DIR / "insights"
RESPONSES_DIR  = BASE_DIR / "responses"
REPORT_DIR     = BASE_DIR / "orchestrator" / "reports"

INSIGHTS_DIR.mkdir(exist_ok=True)
REPORT_DIR.mkdir(exist_ok=True)

ALL_PERSONAS = ["student", "professional", "mittelstand", "family", "retired"]

TIMESTAMP = datetime.now().strftime("%Y%m%d_%H%M%S")

# ── Helpers ───────────────────────────────────────────────────────────────────

def section(title: str):
    print(f"\n{'═' * 60}")
    print(f"  {title}")
    print(f"{'═' * 60}")


def get_latest_response(persona: str) -> Path | None:
    """Get the most recent response file for a given persona."""
    files = sorted(RESPONSES_DIR.glob(f"{persona}_*.json"), reverse=True)
    return files[0] if files else None


def load_json(path: Path) -> dict:
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def save_json(data: dict, path: Path):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"  ✓ Saved → {path.relative_to(BASE_DIR)}")

# ── Step 1: Run Persona Survey Agents ─────────────────────────────────────────

def run_surveys(personas: list, provider: str) -> dict:
    """
    Runs run_survey.py for each persona as a subprocess.
    Returns a dict of persona → response file path.
    """
    section("STEP 1 — RUNNING PERSONA SURVEY AGENTS")
    response_files = {}

    for persona in personas:
        print(f"\n  → Running persona: {persona.upper()}")
        result = subprocess.run(
            [sys.executable, str(SCRIPTS_DIR / "run_survey.py"),
             "--persona", persona,
             "--provider", provider],
            capture_output=False,  # show live output
            text=True,
        )
        if result.returncode != 0:
            print(f"  ✗ Error running {persona}")
            continue

        # Find the response file that was just created
        response_file = get_latest_response(persona)
        if response_file:
            response_files[persona] = response_file
            print(f"  ✓ {persona} response saved → {response_file.name}")
        else:
            print(f"  ✗ No response file found for {persona}")

    return response_files

# ── Step 2: Run Evaluation Suite ──────────────────────────────────────────────

def run_evaluation() -> dict:
    """
    Runs the full evaluation suite (consistency, confidence, differentiation).
    Returns the evaluation summary.
    """
    section("STEP 2 — RUNNING EVALUATION SUITE")

    result = subprocess.run(
        [sys.executable, str(EVAL_DIR / "run_evaluation.py")],
        capture_output=False,
        text=True,
    )

    if result.returncode != 0:
        print("  ✗ Evaluation failed")
        return {}

    # Find the most recent evaluation summary
    results_dir = EVAL_DIR / "results"
    summaries   = sorted(results_dir.glob("evaluation_summary_*.json"), reverse=True)

    if summaries:
        summary = load_json(summaries[0])
        print(f"  ✓ Evaluation complete → {summaries[0].name}")
        return summary

    return {}

# ── Step 3: Run Analyst Agent ─────────────────────────────────────────────────

def run_analyst(response_files: dict) -> dict:
    """
    Calls the Analyst Agent to generate insight JSONs for each persona.
    Returns a dict of persona → insight data.

    NOTE: Placeholder until teammate's Analyst Agent is ready.
    Replace the placeholder block below with:
        result = subprocess.run([sys.executable, str(BASE_DIR / "analyst" / "analyst_agent.py"), ...])
    """
    section("STEP 3 — RUNNING ANALYST AGENT")

    insights = {}

    # ── Check if Analyst Agent exists ─────────────────────────────────────────
    analyst_script = BASE_DIR / "analyst" / "analyst_agent.py"

    if analyst_script.exists():
        # ── Real Analyst Agent ─────────────────────────────────────────────
        for persona, response_file in response_files.items():
            print(f"\n  → Analysing: {persona.upper()}")
            result = subprocess.run(
                [sys.executable, str(analyst_script),
                 "--response", str(response_file),
                 "--output",   str(INSIGHTS_DIR / f"insight_{persona}.json")],
                capture_output=False,
                text=True,
            )
            if result.returncode == 0:
                insight_file = INSIGHTS_DIR / f"insight_{persona}.json"
                if insight_file.exists():
                    insights[persona] = load_json(insight_file)
                    print(f"  ✓ Insight generated → insight_{persona}.json")
            else:
                print(f"  ✗ Analyst failed for {persona}")
    else:
        # ── Placeholder (until analyst_agent.py is ready) ──────────────────
        print("  Analyst Agent not found — skipping insight generation")
        print("  Add analyst/analyst_agent.py to enable this step")
        print("  Expected path:", analyst_script)

    return insights

# ── Step 4: Generate Consolidated Report ──────────────────────────────────────

def generate_report(
    personas:       list,
    provider:       str,
    response_files: dict,
    eval_summary:   dict,
    insights:       dict,
) -> Path:
    """
    Combines all outputs into a single consolidated report JSON.
    """
    section("STEP 4 — GENERATING CONSOLIDATED REPORT")

    # Collect per-persona summary
    persona_summaries = {}
    for persona in personas:
        response_file = response_files.get(persona)
        persona_summaries[persona] = {
            "response_file":    str(response_file.name) if response_file else None,
            "consistency_score": eval_summary.get("consistency", {}).get(persona),
            "confidence_score":  eval_summary.get("confidence",  {}).get(persona),
            "needs_review":      persona in eval_summary.get("flagged_for_review", []),
            "insight_generated": persona in insights,
        }

    report = {
        "timestamp":              TIMESTAMP,
        "provider":               provider,
        "personas_run":           personas,
        "differentiation_score":  eval_summary.get("differentiation"),
        "flagged_for_review":     eval_summary.get("flagged_for_review", []),
        "persona_summaries":      persona_summaries,
        "pipeline_steps": {
            "surveys_completed":   list(response_files.keys()),
            "evaluation_complete": bool(eval_summary),
            "insights_generated":  list(insights.keys()),
        },
    }

    report_path = REPORT_DIR / f"final_report_{TIMESTAMP}.json"
    save_json(report, report_path)

    # Print summary to terminal
    print(f"\n  {'─' * 50}")
    print(f"  PIPELINE SUMMARY")
    print(f"  {'─' * 50}")
    print(f"  Personas run       : {', '.join(personas)}")
    print(f"  Differentiation    : {eval_summary.get('differentiation', 'N/A')}")
    print(f"  Flagged for review : {eval_summary.get('flagged_for_review', []) or 'none'}")
    for persona, s in persona_summaries.items():
        consistency = s['consistency_score']
        confidence  = s['confidence_score']
        review_flag = '⚠' if s['needs_review'] else '✓'
        print(f"  {review_flag} {persona:<14} consistency={consistency}  confidence={confidence}")
    print(f"  {'─' * 50}")

    return report_path

# ── Main Orchestrator ─────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Orchestrator — runs the full multi-agent pipeline")
    parser.add_argument(
        "--topic",
        type=str,
        default="Visa card adoption and payment behavior in Switzerland",
        help="Survey topic for question generation"
    )
    parser.add_argument(
        "--provider",
        choices=["watsonx", "mock"],
        default="watsonx",
        help="LLM provider to use (default: watsonx)"
    )
    parser.add_argument(
        "--personas",
        nargs="+",
        choices=ALL_PERSONAS,
        default=ALL_PERSONAS,
        help="Which personas to run (default: all)"
    )
    args = parser.parse_args()

    print(f"\n{'═' * 60}")
    print(f"  ORCHESTRATOR — Multi-Agent Synthetic Researcher")
    print(f"  Provider : {args.provider}")
    print(f"  Topic    : {args.topic}")
    print(f"  Personas : {', '.join(args.personas)}")
    print(f"  Time     : {TIMESTAMP}")
    print(f"{'═' * 60}")

    # ── Run pipeline ──────────────────────────────────────────────────────────
    section("STEP 0 — GENERATING SURVEY QUESTIONS")
    print(f"\n  Topic: {args.topic}")
    questions = generate_questions(
        topic         = args.topic,
        provider      = args.provider,
        save          = True,   # saves to survey/survey_questions.json
    )
    print(f"  ✓ {len(questions)} questions ready for all personas")

    response_files = run_surveys(args.personas, args.provider)

    if not response_files:
        print("\n✗ No responses generated — stopping pipeline.")
        sys.exit(1)

    eval_summary = run_evaluation()
    insights     = run_analyst(response_files)
    report_path  = generate_report(
        personas       = args.personas,
        provider       = args.provider,
        response_files = response_files,
        eval_summary   = eval_summary,
        insights       = insights,
    )

    print(f"\n✓ Pipeline complete → {report_path.relative_to(BASE_DIR)}")


if __name__ == "__main__":
    main()
