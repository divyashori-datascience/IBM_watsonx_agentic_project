"""
Confidence Score
Checks if a persona stayed true to its own rules.
0.0 = broke all rules, 1.0 = followed all rules perfectly.
"""

import json
import sys
from pathlib import Path
from evaluation_utils import load_env, load_response

sys.path.insert(0, str(Path(__file__).parent))
from consistency_score import call_llm

# Rules for each persona — used to check if the persona stayed in character
PERSONA_RULES = {
    "student": """
- Never agrees to a monthly fee above CHF 5 unless cashback provably covers it
- Always references Twint as default payment method
- Skeptical of paid cards, open to free ones
- Correctly REJECTS airport lounges, concierge services, premium perks — this is expected behavior
- Price-first mindset — product must be free or nearly free before considering
- If asked about business travel or premium perks, says it is not relevant
""",
    "professional": """
- Never rejects a card purely based on monthly fee — always evaluates value first
- Always considers travel benefits and foreign transaction fees when travel is relevant
- Monthly fee up to CHF 15-20 acceptable if cashback and benefits clearly exceed it
- Thinks in numbers — calculates return on spending explicitly
- Values travel insurance, purchase protection, seamless Apple Pay integration
- Skeptical of complex or inaccessible reward programs — wants simplicity
- Does not pretend to be price-sensitive
""",
    "mittelstand": """
- Never agrees to a fee above CHF 12/month
- Sweet spot fee is CHF 8-10/month with clear benefits
- Never be as price-dismissive as a high-income professional
- Never be as reflexively anti-fee as a student
- Payment stack: debit dominant, Twint secondary, some credit card
- Represents Swiss median earner — practical, value-oriented
- Evaluates benefits mathematically but not obsessively
""",
    "family": """
- Never agrees to a fee above CHF 10/month without clear family-relevant justification
- Always evaluates whether a benefit is actually useful for a family with children
- Skeptical of complex rewards — prefers simple cashback or clear discounts
- Trusts established institutions — skeptical of flashy fintech products
- Values purchase protection and security
- References grocery shopping, family holidays, or children when naturally relevant
- Resistant to anything that feels like a sales pitch
""",
    "retired": """
- Never agrees to a monthly fee above CHF 5
- Cash is default — PostFinance debit card for supermarkets
- Correctly REJECTS airport lounges, travel perks, digital products — this is expected behavior
- Security is top priority
- Not interested in travel rewards or premium features
""",
}

def build_confidence_prompt(persona: str, rules: str, results: list) -> str:
    # Format all Q&A pairs into a single block of text for the LLM
    qa_text = ""
    for r in results:
        qa_text += f"Q: {r['question']}\nA: {r['answer']}\n\n"

    # Build the evaluation prompt — tells the LLM what to check and how to score
    return f"""You are evaluating whether a synthetic persona called "{persona}" followed its rules in all answers.

PERSONA RULES:
{rules}

ANSWERS:
{qa_text}

Did this persona follow its rules consistently across all answers?

Reply with ONLY a number between 0.0 and 1.0 where:
1.0 = followed all rules perfectly
0.5 = followed some rules, broke others
0.0 = broke most rules

Reply with ONLY the number, nothing else."""


def score_confidence(response_file: Path, runs: int = 3) -> dict:
    data = load_response(response_file)
    persona = data["persona"]
    results = data["results"]
    rules = PERSONA_RULES.get(persona, "")

    # Split results into chunks of 5 to avoid token limit issues
    chunk_size = 5
    chunks = [results[i:i+chunk_size] for i in range(0, len(results), chunk_size)]
    
    all_chunk_scores = []
    for chunk_idx, chunk in enumerate(chunks):
        print(f"  Chunk {chunk_idx+1}/{len(chunks)}...")
        prompt = build_confidence_prompt(persona, rules, chunk)
        
        chunk_scores = []
        for i in range(runs):
            print(f"    Run {i+1}/{runs}...")
            raw = call_llm(prompt)
            try:
                import re
                numbers = re.findall(r'\d+\.?\d*', raw)
                if numbers:
                    score = float(numbers[0])
                    score = max(0.0, min(1.0, score))
                    chunk_scores.append(score)
                else:
                    print(f"    Could not parse: {raw}")
            except:
                print(f"    Could not parse: {raw}")
        
        if chunk_scores:
            all_chunk_scores.append(round(sum(chunk_scores) / len(chunk_scores), 3))

    avg = round(sum(all_chunk_scores) / len(all_chunk_scores), 3) if all_chunk_scores else 0.0
    needs_review = avg < 0.6

    return {
        "persona":          persona,
        "confidence_score": avg,
        "chunk_scores":     all_chunk_scores,
        "needs_review":     needs_review,
        "file":             str(response_file),
    }


if __name__ == "__main__":
    load_env()
    file = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    if not file:
        print("Usage: python confidence_score.py <response_file.json>")
        sys.exit(1)

    result = score_confidence(file)
    print(f"\nConfidence Score for {result['persona']}: {result['confidence_score']}")
    print(f"Needs review: {result['needs_review']}")
    print(f"Individual runs: {result['runs']}")