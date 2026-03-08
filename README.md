# Code Doc Search

RAG application for searching a local codebase and documentation set with Claude, pgvector, and the Vercel AI SDK.

![Evals](https://github.com/cmcmillin-ai/p1-rag-typescript/actions/workflows/evals.yml/badge.svg)

## What It Does

- Ingests local docs and source files from `docs/` into Postgres with pgvector embeddings.
- Retrieves the most relevant chunks for each user question and injects them into the chat system prompt.
- Streams chat responses in a Next.js web UI.
- Lets the user estimate input tokens before sending a message.
- Displays the actual input and output tokens used after each assistant response completes.
- Includes a simple eval harness for retrieval hit rate and answer relevancy.

## Main Flow

### Ingestion

`npm run ingest` reads `.md`, `.txt`, `.ts`, and `.js` files from `docs/`, splits them into overlapping chunks, embeds them with OpenAI `text-embedding-3-small`, and stores them in Postgres.

### Retrieval and Chat

`POST /api/chat` takes the current chat history, retrieves the top matching chunks for the latest user message, builds a context-aware system prompt, and streams a Claude response back to the UI.

### Token Visibility

`POST /api/count-tokens` estimates the input tokens for the exact prompt that would be sent, including chat history and retrieved context. After the response finishes, the chat stream attaches actual usage metadata so the UI can show assistant-side input and output token counts.

## Stack

| Layer        | Technology                      |
| ------------ | ------------------------------- |
| Frontend     | Next.js 16 App Router           |
| UI Chat      | Vercel AI SDK                   |
| LLM          | Anthropic `claude-sonnet-4-6`   |
| Embeddings   | OpenAI `text-embedding-3-small` |
| Vector Store | Postgres + pgvector             |
| Language     | TypeScript                      |
| Evals        | Custom harness                  |

## Project Structure

- `src/app/api/chat/route.ts`: streaming chat endpoint
- `src/app/api/count-tokens/route.ts`: input token estimation endpoint
- `src/app/api/ingest/route.ts`: programmatic ingestion endpoint
- `src/components/chat.tsx`: chat UI
- `src/lib/chat-prompt.ts`: shared prompt and token-count preparation logic
- `src/lib/retrieval.ts`: similarity search and context assembly
- `src/lib/ingest.ts`: chunking and persistence helpers
- `scripts/ingest.ts`: CLI ingestion entrypoint
- `evals/harness.ts`: retrieval and response quality checks

## Getting Started

### Prerequisites

- Node.js 20+
- Docker or a local Postgres instance with pgvector
- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY`

### Environment

Create `.env.local` in the project root with:

```bash
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/rag_db
```

### Local Development

```bash
# Install dependencies
npm install

# Start only Postgres in Docker
docker compose up -d db

# Ingest the sample docs
npm run ingest

# Start the app
npm run dev
```

Open `http://localhost:3000`.

### Full Docker App + DB

```bash
docker compose up --build
```

## Commands

```bash
npm run dev     # start the Next.js dev server
npm run build   # production build
npm run lint    # ESLint
npm run ingest  # ingest docs into pgvector
npm run evals   # run the eval harness
```

## Evals

The eval harness runs retrieval and answer-quality checks from `evals/datasets/sample.json`. CI fails if retrieval hit rate or answer relevancy drops below the configured threshold.

## See Also

- [p1-cs-azure-rag](https://github.com/cmcmillin-ai/p1-cs-azure-rag) — the same RAG system in C# / Azure.
