# Code Doc Search

> RAG system for searching and understanding codebases and documentation.
> Built with TypeScript · Anthropic · pgvector · Vercel AI SDK

![Evals](https://github.com/cmcmillin-ai/p1-rag-typescript/actions/workflows/evals.yml/badge.svg)

---

## Architecture

> Architecture diagram coming — will be added at Day 14

---

## Stack

| Layer | Technology |
|---|---|
| LLM | Anthropic claude-sonnet-4-6 |
| Embeddings | OpenAI text-embedding-3-small |
| Vector store | pgvector (Postgres) |
| Orchestration | Vercel AI SDK |
| Frontend | Next.js 15 (App Router) |
| Evals | Custom harness + RAGAS |
| CI | GitHub Actions |

---

## Getting Started

### Prerequisites
- Node.js 20+
- Postgres with pgvector extension

### Setup

```bash
# Install dependencies
npm install

# Copy env file and fill in your keys
cp .env.example .env.local

# Initialise the database and ingest docs
npm run ingest

# Start dev server
npm run dev
```

### Running Evals

```bash
npm run evals
```

Evals run automatically on every push to `main` via GitHub Actions.

---

## Eval Results

> Results table will be added at Day 14

| Metric | Score |
|---|---|
| Retrieval hit rate | — |
| Answer relevancy | — |

---

## Cost Analysis

> Cost analysis will be added at Day 14

---

## How I'd Extend This

> To be written at Day 14

---

## See Also

- [p1-cs-azure-rag](https://github.com/cmcmillin-ai/p1-cs-azure-rag) — the same RAG system in C# / Azure. See the comparison README for when to choose each stack.
