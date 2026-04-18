"""
Synthetic Persona Survey Runner
PROJECT_WATSONX — Multi-Agent Synthetic Researcher

Usage:
    python3 run_survey.py --persona student --provider watsonx
    python3 run_survey.py --all --provider watsonx
    python3 run_survey.py --all --provider mock

.env file (place in project root):
    WATSONX_URL=https://eu-de.ml.cloud.ibm.com
    WATSONX_PROJECT_ID=your_project_id
    WATSONX_API_KEY=your_api_key
    WATSONX_MODEL_ID=meta-llama/llama-3-70b-instruct  (optional)
"""

import os
import json
import argparse
import requests
from datetime import datetime
from pathlib import Path
import time

# ── Load .env automatically ───────────────────────────────────────────────────

def load_env():
    env_path = Path(__file__).parent.parent / ".env"
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

# ── Paths ─────────────────────────────────────────────────────────────────────

BASE_DIR      = Path(__file__).parent.parent
PROMPTS_DIR   = BASE_DIR / "prompts"
SURVEY_FILE   = BASE_DIR / "survey" / "survey_questions.json"
RESPONSES_DIR = BASE_DIR / "responses"
RESPONSES_DIR.mkdir(exist_ok=True)

PERSONA_PROMPT_MAP = {
    "student":      "student_prompt_v2.txt",
    "professional": "professional_prompt_v2.txt",
    "family":       "family_prompt_v2.txt",
    "retired":      "retired_prompt_v2.txt",
}

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

# ── LLM Providers ─────────────────────────────────────────────────────────────
def call_watsonx(system_prompt: str, messages: list) -> str:
    import time
    token      = get_iam_token()
    url        = os.environ["WATSONX_URL"].rstrip("/")
    project_id = os.environ["WATSONX_PROJECT_ID"]
    model_id   = os.environ.get("WATSONX_MODEL_ID")

    prompt = f"<s>[INST] <<SYS>>\n{system_prompt}\n<</SYS>>\n\n"
    for msg in messages:
        if msg["role"] == "user":
            prompt += f"{msg['content']} [/INST] "
        else:
            prompt += f"{msg['content']} </s><s>[INST] "

    payload = {
        "model_id":   model_id,
        "project_id": project_id,
        "input":      prompt,
        "parameters": {
            "max_new_tokens":    512,
            "temperature":       0.7,
            "repetition_penalty": 1.1,
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
            timeout=60,
        )
        if resp.status_code == 429:
            wait = 3 * (attempt + 1)
            print(f"Rate limit, {wait}s bekleniyor...")
            time.sleep(wait)
            continue
        print("STATUS:", resp.status_code)
        resp.raise_for_status()
        return resp.json()["results"][0]["generated_text"].strip()

    resp.raise_for_status()

"""
def call_anthropic(system_prompt: str, messages: list) -> str:
    import anthropic
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=512,
        system=system_prompt,
        messages=messages,
    )
    return response.content[0].text


def call_openai(system_prompt: str, messages: list) -> str:
    from openai import OpenAI
    client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
    response = client.chat.completions.create(
        model="gpt-4o",
        max_tokens=512,
        messages=[{"role": "system", "content": system_prompt}] + messages,
    )
    return response.choices[0].message.content
"""

def call_mock(system_prompt: str, messages: list) -> str:
    last_question = messages[-1]["content"] if messages else "?"
    persona_hint = ""
    for line in system_prompt.splitlines():
        if line.startswith("You are "):
            persona_hint = line.replace("You are ", "").split(",")[0]
            break
    preview = last_question[:80] + ("..." if len(last_question) > 80 else "")
    return f'[MOCK — {persona_hint}] Placeholder answer for: "{preview}"'


PROVIDERS = {
    "watsonx":   call_watsonx,
    # "anthropic": call_anthropic,
    # "openai":    call_openai,
    "mock":      call_mock,
}

# ── Session memory ────────────────────────────────────────────────────────────

def build_session_context(history: list) -> str:
    if not history:
        return ""
    lines = []
    for i, turn in enumerate(history, 1):
        lines.append(f"Q{i}: {turn['question']}")
        lines.append(f"A{i}: {turn['answer']}")
        lines.append("")
    return "\n".join(lines)


def inject_session_context(system_prompt: str, history: list) -> str:
    return system_prompt.replace(
        "[PREVIOUS_ANSWERS_PLACEHOLDER]",
        build_session_context(history)
    )

# ── Core runner ───────────────────────────────────────────────────────────────

def run_survey(persona_key: str, provider: str) -> dict:
    prompt_file = PROMPTS_DIR / PERSONA_PROMPT_MAP[persona_key]
    if not prompt_file.exists():
        raise FileNotFoundError(f"Prompt file not found: {prompt_file}")
    system_prompt_template = prompt_file.read_text(encoding="utf-8")

    if not SURVEY_FILE.exists():
        raise FileNotFoundError(f"Survey file not found: {SURVEY_FILE}")
    with open(SURVEY_FILE, encoding="utf-8") as f:
        questions = json.load(f).get("questions", [])

    llm_call   = PROVIDERS[provider]
    history    = []
    conversation = []
    results    = []
    model_name = os.environ.get("WATSONX_MODEL_ID", "meta-llama/llama-3-70b-instruct") \
                 if provider == "watsonx" else provider

    print(f"\n{'─' * 60}")
    print(f"  Persona  : {persona_key.upper()}")
    print(f"  Provider : {provider}")
    print(f"  Model    : {model_name}")
    print(f"  Questions: {len(questions)}")
    print(f"{'─' * 60}\n")

    for i, item in enumerate(questions, 1):
        q_id       = item.get("id", i)
        q_text     = item.get("text") or item.get("question", str(item))
        q_category = item.get("category", "")

        print(f"[{q_id}] {q_category}")
        print(f"Q: {q_text}")

        system_prompt = inject_session_context(system_prompt_template, history)
        conversation.append({"role": "user", "content": q_text})
        answer = llm_call(system_prompt, conversation)
        conversation.append({"role": "assistant", "content": answer})
        history.append({"question": q_text, "answer": answer})

        print(f"A: {answer}\n")
        time.sleep(1)  # rate limit 
        results.append({
            "question_id": q_id,
            "category":    q_category,
            "question":    q_text,
            "answer":      answer,
        })

    return {
        "persona":   persona_key,
        "provider":  provider,
        "model":     model_name,
        "timestamp": datetime.now().isoformat(),
        "results":   results,
    }

# ── Save output ───────────────────────────────────────────────────────────────

def save_results(data: dict) -> Path:
    filename = f"{data['persona']}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    out_path = RESPONSES_DIR / filename
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"✓ Saved → responses/{filename}")
    return out_path

# ── CLI ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Run synthetic persona survey")
    parser.add_argument("--persona", choices=list(PERSONA_PROMPT_MAP.keys()))
    parser.add_argument("--all", action="store_true", help="Run all 4 personas")
    parser.add_argument("--provider", choices=list(PROVIDERS.keys()), default="watsonx")
    args = parser.parse_args()

    if not args.all and not args.persona:
        parser.error("Specify --persona <n> or --all")

    personas = list(PERSONA_PROMPT_MAP.keys()) if args.all else [args.persona]

    for persona in personas:
        try:
            save_results(run_survey(persona, args.provider))
        except Exception as e:
            print(f"\n✗ Error running {persona}: {e}\n")

    print("\n✓ All done.")


if __name__ == "__main__":
    main()
