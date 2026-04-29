
"""
Differentiation Score
Checks if the 4 personas are distinct enough from each other.
Compares all persona responses and scores how different they are.
0.0 = all personas sound the same, 1.0 = clearly distinct personas.
"""

import json
import sys
from pathlib import Path
from evaluation_utils import load_env, load_response

sys.path.insert(0, str(Path(__file__).parent))
from consistency_score import call_llm


def build_differentiation_prompt(persona_summaries: dict) -> str:
    # Format each persona's answers into a summary block
    summaries_text = ""
    for persona, answers in persona_summaries.items():
        summaries_text += f"\n--- {persona.upper()} ---\n"
        for q_id, answer in answers.items():
            summaries_text += f"{q_id}: {answer[:150]}...\n"  # truncate for token efficiency

    return f"""You are evaluating whether 5 synthetic consumer personas are clearly distinct from each other.

Here are sample answers from each persona:

{summaries_text}

Are these personas clearly different in terms of:
- Fee tolerance (how much they are willing to pay)
- Payment habits (cash, Twint, credit card)
- Priorities (security, cashback, travel, family)
- Decision-making style (emotional, analytical, cautious)

Reply with ONLY a number between 0.0 and 1.0 where:
1.0 = personas are clearly and distinctly different
0.5 = some differences but overlap exists
0.0 = personas sound very similar

Reply with ONLY the number, nothing else."""


def score_differentiation(response_files: list, runs: int = 3) -> dict:
    # Load all persona responses and extract answers per question
    persona_summaries = {}
    for file in response_files:
        data = load_response(Path(file))
        persona = data["persona"]
        # Take first 5 questions only to keep prompt short
        persona_summaries[persona] = {
            r["question_id"]: r["answer"]
            for r in data["results"][:5]
        }

    if len(persona_summaries) < 2:
        print("Need at least 2 personas to compare.")
        return {}

    prompt = build_differentiation_prompt(persona_summaries)

    scores = []
    for i in range(runs):
        print(f"  Run {i+1}/{runs}...")
        raw = call_llm(prompt)
        try:
            import re
            numbers = re.findall(r'\d+\.?\d*', raw)
            if numbers:
                score = float(numbers[0])
                score = max(0.0, min(1.0, score))
                scores.append(score)
            else:
                print(f"  Could not parse: {raw}")
        except:
            print(f"  Could not parse: {raw}")

    avg = round(sum(scores) / len(scores), 3) if scores else 0.0

    return {
        "differentiation_score": avg,
        "runs": scores,
        "personas_compared": list(persona_summaries.keys()),
    }


if __name__ == "__main__":
    load_env()

    # Pass multiple response files as arguments
    files = sys.argv[1:]
    if not files:
        print("Usage: python differentiation_score.py <file1.json> <file2.json> ...")
        sys.exit(1)

    result = score_differentiation(files)
    print(f"\nDifferentiation Score: {result['differentiation_score']}")
    print(f"Personas compared: {result['personas_compared']}")
    print(f"Individual runs: {result['runs']}")