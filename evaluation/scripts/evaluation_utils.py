
"""
Evaluation Utils
Shared helpers for all evaluation scripts.
"""

import os
from pathlib import Path


def load_env():
    """Load .env from project root."""
    env_path = Path(__file__).parent.parent.parent / ".env"
    if not env_path.exists():
        return
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip())


def load_response(file: Path) -> dict:
    """Load a persona response JSON file."""
    import json
    with open(file) as f:
        return json.load(f)


def save_report(report: dict, output_dir: Path, filename: str = None):
    """Save evaluation report to JSON with optional custom filename."""
    import json
    from datetime import datetime
    output_dir.mkdir(exist_ok=True)
    
    # Use custom filename if provided, otherwise generate from timestamp
    if filename:
        out_path = output_dir / f"{filename}.json"
    else:
        ts = datetime.now().strftime('%Y%m%d_%H%M%S')
        out_path = output_dir / f"report_{ts}.json"
    
    with open(out_path, "w") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    print(f"✓ Report saved → {out_path}")
    return out_path