<p align="center">
  <img src="logo/Hacker house.png" alt="Hacker House Goa Logo" width="500"/>
</p>

# Voice RAG over `ai4bharat/MSMARCO-XI`

**Team: 3PIXLE**

Voice → speech-to-text → hybrid retrieval → grounded answer, with the whole core path
measured at **P50 7.87 ms / P70 9.62 ms / P100 40.71 ms** against a 200 ms budget, and a
system that declines rather than guesses when the corpus does not contain the answer.

Built for HH Goa 2026 Shortlisting Task 2 by **Team 3PIXLE** · `#RAGInGoa`

| | |
| --- | --- |
| **Live demo** | [hhgoa-task2.onrender.com](https://hhgoa-task2.onrender.com) |
| **Corpus** | `ai4bharat/MSMARCO-XI` validation split — 5,979 passages (2,990 `eng_Latn` / 2,989 `hin_Deva`), 155 labelled eval queries |
| **Index** | 18,416 chunks from five chunking strategies, 512-d static embeddings + BM25+ |
| **Latency** | in-process P50 7.87 / P70 9.62 / P100 40.71 ms · **over real HTTP** P50 6.04 / P70 7.00 / P100 58.30 ms · both 100% inside 200 ms |
| **STT** | Sarvam (`saaras:v3`) and ElevenLabs (`scribe_v1`), pluggable, with browser-side fallback |
| **Answering** | extractive by default (cannot hallucinate by construction); optional Claude path |
| **Tests** | 241, `pytest tests/ -q` |
| **Full measurements** | [`reports/benchmark.md`](reports/benchmark.md) |

---

## Quick start

```bash
python -m venv .venv && .venv/Scripts/activate     # Linux/macOS: source .venv/bin/activate
pip install -r requirements-dev.txt                 # runtime + ingest + benchmark + tests

python scripts/ingest.py --queries 300              # download and shape the corpus (~60 s)
python scripts/build_index.py                       # chunk, embed, build BM25 (~40 s)
uvicorn app.main:app --reload                       # http://127.0.0.1:8000
```

`data/corpus/` is committed, so `scripts/build_index.py` alone is enough for a fresh
checkout. `data/index/` is **not** committed — it is derived data, and shipping an index
that silently disagrees with the corpus beside it is a class of bug worth designing out.

No API keys are required. With none set, the pipeline runs fully offline: the browser's
Web Speech API handles dictation and the extractive composer writes the answer. Copy
`.env.example` to `.env` to add Sarvam, ElevenLabs, or Anthropic keys.

The frontend dev server (optional — the container serves a static export):

```bash
cd web && npm install && npm run dev                # http://localhost:3000
```

---

## The pipeline

```
audio ──► transcribe ──► guard_input ──► classify ──► embed_query ──► retrieve
          (Sarvam /      (unsafe /       (intent,     (static         (dense + BM25+
           ElevenLabs)    injection /     script)      512-d)          → RRF → MMR)
                          malformed)                                       │
                                                                           ▼
   answer ◄── verify ◄────────── generate ◄────────────────── retrieval_guard
             (grounding,        (extractive, or Claude       (confidence ≥ 0.67,
              numeric,           when the budget allows)      else decline)
              citations,
              PII)
```

Every box is a named, timed span. Four of them can end the request with a refusal, each
carrying its own verdict and recorded reason. `transcribe` is the only stage excluded from
the 200 ms core budget — it is a network round-trip to a third party, and including it
would measure someone else's infrastructure.

---

## Chunking

The brief asks for "vast chunking" rather than one naive fixed-size pass. Five strategies
run over every passage, each making a *different* promise about what it will not break:
