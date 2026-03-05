# Sprint Progress Log

Running log of daily progress, decisions, and learnings.
Dates are actual working days — not calendar days.

---

## Day 1 — 2026-03-04

**Session:** Portfolio setup + P1 scaffold + first working RAG pipeline

### Completed
- ✅ GitHub org created: `cmcmillin-ai`
- ✅ Three repos created: `portfolio`, `p1-rag-typescript`, `p1-cs-azure-rag`
- ✅ Portfolio README committed — AI Engineer narrative, dual-stack positioning
- ✅ Planning docs converted from HTML → Markdown, committed to `portfolio/docs/`
- ✅ `p1-rag-typescript` scaffolded — full directory structure and all source files
- ✅ RAG pipeline running end to end: ingest → embed → pgvector → retrieve → stream
- ✅ Chat UI working in Next.js with AI SDK v6

### Problems Hit & How Solved
- **env vars not loading for tsx scripts** — resolved with `tsx --env-file=.env.local`
- **OpenAI 429 rate limit** — resolved by adding billing credits to OpenAI account
- **AI SDK v4 → v6 breaking changes** — `toDataStreamResponse()` → `toUIMessageStreamResponse()`, `convertToModelMessages()` required, `sendMessage({ text })` API changed
- **Chat UI not rendering** — Claude Code in VS Code resolved the final JSX/hook wiring

### Decisions Made
- VS Code + Copilot Pro+ over Cursor — C# Dev Kit compatibility, already configured
- Claude Code for hands-on file-level coding; this project for architecture and planning
- Option 3 progress tracking: sprint doc (✅ markers) + this progress log

### What landed conceptually
- RAG pipeline is not abstract anymore — chunked, embedded, and queried a real doc
- AI SDK versioning moves fast; always check installed version before debugging
- The scaffold-first approach works: hit real problems before reading theory

### Next
- Add real docs to `/docs` and test retrieval quality
- Week 1 reading with the running system in front of you
- Start Week 2: embeddings deep dive, cosine similarity, chunking strategies

---

*Template for future entries:*

## Day N — YYYY-MM-DD

**Session:** [what you worked on]

### Completed
- ✅ 

### Problems Hit & How Solved
- 

### Decisions Made
- 

### What landed conceptually
- 

### Next
-