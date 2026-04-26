"""
retriever.py
Retrieves relevant Swiss consumer data chunks for a given persona and question.
Uses in-memory ChromaDB — rebuilt once per process on first call.

Usage:
    from rag.retriever import retrieve_context
    context = retrieve_context(persona="family", question="Would you pay CHF 8/month?")
"""

import sys
from pathlib import Path
import chromadb
from chromadb import Documents, EmbeddingFunction, Embeddings
import hashlib, math
from collections import Counter

sys.path.insert(0, str(Path(__file__).parent))
from chunks import CHUNKS


class TFIDFEmbeddingFunction(EmbeddingFunction):
    """Simple local TF-IDF embedding — no model download, no API key needed."""
    def __init__(self, dim: int = 256):
        self.dim = dim

    def _embed_one(self, text: str) -> list:
        tokens = text.lower().split()
        counts = Counter(tokens)
        vec = [0.0] * self.dim
        for token, count in counts.items():
            idx = int(hashlib.md5(token.encode()).hexdigest(), 16) % self.dim
            vec[idx] += count * math.log(1 + count)
        norm = math.sqrt(sum(x * x for x in vec)) or 1.0
        return [x / norm for x in vec]

    def __call__(self, input: Documents) -> Embeddings:
        return [self._embed_one(doc) for doc in input]


EMBEDDING_FN = TFIDFEmbeddingFunction()
_collection  = None  # built once per process


def _get_collection():
    global _collection
    if _collection is not None:
        return _collection

    client     = chromadb.EphemeralClient()
    _collection = client.create_collection(
        name="swiss_consumer_data",
        embedding_function=EMBEDDING_FN,
        metadata={"hnsw:space": "cosine"},
    )
    _collection.add(
        ids       = [c["id"]   for c in CHUNKS],
        documents = [c["text"] for c in CHUNKS],
        metadatas = [
            {"source": c["source"], "topic": c["topic"], "personas": ",".join(c["personas"])}
            for c in CHUNKS
        ],
    )
    return _collection


def retrieve_context(persona: str, question: str, n_results: int = 4) -> str:
    """
    Retrieves the most relevant data chunks for a given persona + question.
    Returns a formatted string block ready to inject into the system prompt.

    Args:
        persona:   'student', 'professional', 'mittelstand','family', or 'retired'
        question:  The survey question being asked
        n_results: Number of chunks to return (default 4)
    """
    collection = _get_collection()
    query      = f"{persona} Swiss consumer: {question}"

    results   = collection.query(query_texts=[query], n_results=min(len(CHUNKS), 20))
    all_docs  = results["documents"][0]
    all_metas = results["metadatas"][0]

    # Prefer chunks tagged for this persona or 'all'
    filtered_docs, filtered_metas = [], []
    for doc, meta in zip(all_docs, all_metas):
        p = meta.get("personas", "")
        if persona in p or "all" in p:
            filtered_docs.append(doc)
            filtered_metas.append(meta)
        if len(filtered_docs) >= n_results:
            break

    if not filtered_docs:            # fallback: top raw results
        filtered_docs  = all_docs[:n_results]
        filtered_metas = all_metas[:n_results]

    lines = ["## Relevant Swiss Consumer Data (use this to ground your answer):"]
    for doc, meta in zip(filtered_docs, filtered_metas):
        lines.append(f"- [{meta['source']}] {doc}")
    return "\n".join(lines)


if __name__ == "__main__":
    tests = [
        ("family",       "Would you pay CHF 8/month for a Visa card with no foreign fees?"),
        ("retired",      "Would you ever switch from cash to a credit card?"),
        ("student",      "You use Twint for everything. What would make you switch to Visa?"),
        ("professional", "Which Visa card features matter most for your travel spending?"),
        ("mittelstand",  "Would you pay CHF 8/month for a card with 1% cashback on groceries?"),
    ]
    for persona, question in tests:
        print(f"\n=== {persona.upper()} ===")
        print(retrieve_context(persona, question))
