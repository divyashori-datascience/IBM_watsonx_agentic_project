
"""
Run Evaluation
Orchestrates all evaluation scripts and saves results separately.
Usage: python evaluation/run_evaluation.py
"""

import json
import sys
from datetime import datetime
from pathlib import Path

# Add evaluation dir to path so we can import sibling scripts
sys.path.insert(0, str(Path(__file__).parent))

from evaluation_utils import load_env, save_report
from consistency_score import score_consistency
from confidence_score import score_confidence
from differentiation_score import score_differentiation

# ── Config ────────────────────────────────────────────────────────────────────

BASE_DIR      = Path(__file__).parent.parent
RESPONSES_DIR = BASE_DIR / "responses"
RESULTS_DIR   = Path(__file__).parent / "results"
RESULTS_DIR.mkdir(exist_ok=True)

TIMESTAMP = datetime.now().strftime("%Y%m%d_%H%M%S")
PERSONAS  = ["student", "professional", "family", "retired"]

# ── Helpers ───────────────────────────────────────────────────────────────────

def get_latest_response(persona: str) -> Path | None:
    """Get the most recent response file for a given persona."""
    files = sorted(RESPONSES_DIR.glob(f"{persona}_*.json"), reverse=True)
    return files[0] if files else None

def section(title: str):
    """Print a section header to terminal."""
    print(f"\n── {title} {'─' * (50 - len(title))}")

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    load_env()

    # ── 1. Consistency ────────────────────────────────────────────────────────
    section("CONSISTENCY")
    consistency_report = {}

    for persona in PERSONAS:
        file = get_latest_response(persona)
        if not file:
            print(f"  ✗ No response file found for {persona}")
            continue
        print(f"\n  {persona}...")
        result = score_consistency(file)
        consistency_report[persona] = result
        print(f"  ✓ {persona} consistency: {result['consistency_score']}")

    # Save consistency report
    save_report(consistency_report, RESULTS_DIR, f"consistency_report_{TIMESTAMP}")

    # ── 2. Confidence ─────────────────────────────────────────────────────────
    section("CONFIDENCE")
    confidence_report = {}

    for persona in PERSONAS:
        file = get_latest_response(persona)
        if not file:
            print(f"  ✗ No response file found for {persona}")
            continue
        print(f"\n  {persona}...")
        result = score_confidence(file)
        confidence_report[persona] = result
        print(f"  ✓ {persona} confidence: {result['confidence_score']}")
        print(f"  ⚠ needs_review: {result['needs_review']}")

    # Save confidence report
    save_report(confidence_report, RESULTS_DIR, f"confidence_report_{TIMESTAMP}")

    # ── 3. Differentiation ────────────────────────────────────────────────────
    section("DIFFERENTIATION")

    # Collect all available response files for comparison
    response_files = []
    for persona in PERSONAS:
        file = get_latest_response(persona)
        if file:
            response_files.append(file)

    diff_result = score_differentiation(response_files)
    print(f"\n  Personas compared: {diff_result['personas_compared']}")
    print(f"  ✓ differentiation: {diff_result['differentiation_score']}")

    # Save differentiation report
    save_report(diff_result, RESULTS_DIR, f"differentiation_report_{TIMESTAMP}")

    # ── 4. Summary ────────────────────────────────────────────────────────────
    section("SUMMARY")

    # Collect flagged personas for human review
    flagged = [
        p for p, r in confidence_report.items()
        if r.get("needs_review", False)
    ]

    summary = {
        "timestamp": TIMESTAMP,
        "consistency": {
            p: r["consistency_score"]
            for p, r in consistency_report.items()
        },
        "confidence": {
            p: r["confidence_score"]
            for p, r in confidence_report.items()
        },
        "differentiation": diff_result.get("differentiation_score"),
        "flagged_for_review": flagged,
    }

    save_report(summary, RESULTS_DIR, f"evaluation_summary_{TIMESTAMP}")

    if flagged:
        print(f"\n  ⚠ Flagged for human review: {flagged}")
    else:
        print(f"\n  ✓ No personas flagged for review")

    print(f"\n  ✓ All reports saved → evaluation/results/")


if __name__ == "__main__":
    main()