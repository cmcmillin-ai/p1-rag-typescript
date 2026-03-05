# Project Arc — AI Engineer Sprint

---

## Sprint Timeline

```
Day 1–14      P1 · Code Doc Search          RAG foundation in TypeScript
Day 15–19     P1-CS · Enterprise RAG Port   Same architecture in C# / Azure
Day 20–34     P2 · PR Review Agent          First agent — tool use, GitHub API
Day 35–54     P3 · Debug Assistant          Multi-agent, full eval suite, Langfuse
Day 55–69     P4 · Fine-tuned Reviewer      Model customisation, benchmark report
Day 70–90     ⭐ DevMind Capstone           Full system integration, deployed
```

*~280 hours across 90 days at 20h+/week*

---

## The 6 Pinned Repos

| Repo | Stack | Portfolio signal |
|---|---|---|
| `code-doc-search` | TypeScript · Anthropic · pgvector · Vercel AI SDK | "I build modern AI applications" |
| `code-doc-search-dotnet` | C# · Semantic Kernel · Azure OpenAI · Azure AI Search | "I bring AI into your existing .NET stack" |
| `pr-review-agent` | TypeScript · Anthropic · GitHub API · Zod | Tool use, structured output, CI integration |
| `debug-assistant` | TypeScript · Langfuse · Ragas · Multi-model | Multi-agent orchestration, full observability |
| `fine-tuned-reviewer` | TypeScript + Python · LoRA · OpenAI · W&B | Real ML engineering, not just API wrangling |
| `devmind` ⭐ | Full-stack AI system | Everything integrated — deployed, documented |

**The story these repos tell:** Row 1 shows the same AI system in two ecosystems. Rows 2–4 show increasing sophistication: agents → multi-agent → fine-tuning → full system. A hiring manager scans this in 10 seconds and sees both breadth and depth. The .NET repo is the one that makes enterprise clients reach out first.

---

## P1 — Code Doc Search (Day 1–14)

**TypeScript · Anthropic · pgvector · Vercel AI SDK**

RAG system for searching and understanding codebases and documentation. First real build — everything from chunking and embedding to retrieval, reranking, and a polished Next.js chat UI.

### What you build
- Document ingestion pipeline: chunking, embedding, pgvector indexing
- Retrieval pipeline with reranking
- Streaming chat UI with Next.js + Vercel AI SDK
- Eval harness running in CI (GitHub Actions)

### What makes the README great
- Architecture diagram
- Eval results table (faithfulness, relevancy scores)
- "How I'd extend this" section showing systems thinking
- Cost analysis (tokens per query, cost per 1k queries)

---

## P1-CS — Enterprise RAG Port (Day 15–19)

**C# / .NET 8 · Semantic Kernel · Azure OpenAI · Azure AI Search**

The same RAG system reimplemented with Microsoft Semantic Kernel, Azure OpenAI, and Azure AI Search. Proves you can bring AI capabilities into enterprise .NET environments.

### Why this project exists
Enterprise companies running .NET backends need AI engineers who speak their language. Your freelance strategy identifies this as a low-competition, high-rate niche. Without a C# + AI project in your portfolio, you can't prove you bridge both worlds. This project closes that gap in under a week because the hard part — understanding RAG architecture — is already done.

### What you build
- Same codebase/docs ingestion as P1, using Azure AI Search index
- Semantic Kernel orchestration with Azure OpenAI as the LLM
- Azure AI Search for vector + hybrid retrieval (replaces pgvector)
- ASP.NET Minimal API with a clean Swagger endpoint
- Console chat interface (functional, not polished)

### What you learn
- Semantic Kernel plugin architecture and planners
- Azure OpenAI deployment and model management
- Azure AI Search — index creation, hybrid search, semantic ranking
- How enterprise AI orchestration differs from the startup stack
- Cost and latency tradeoffs: Azure managed vs. DIY

### What you intentionally skip
- Polished frontend — API + minimal UI is enough
- Full eval harness — reference P1's eval approach in the README
- CI/CD — the TypeScript version has this covered

### What makes the README great
- Architecture diagram showing Azure service topology
- Side-by-side comparison: TS/pgvector vs. C#/Azure approach
- Cost analysis: Azure AI Search pricing vs. self-hosted vector DB
- "When to choose which" decision framework for clients

### Day-by-Day Plan

| Day | Focus |
|---|---|
| Day 15 | Setup + Azure — Provision Azure OpenAI + AI Search. Scaffold .NET 8 console project. Semantic Kernel NuGet setup. "Hello world" completion from Azure OpenAI. |
| Day 16 | Indexing — Port chunking logic from P1. Create Azure AI Search index with vector field. Write ingestion script. |
| Day 17 | RAG pipeline — Build retrieval + generation pipeline via Semantic Kernel. Wire Azure AI Search as a retrieval plugin. Hybrid search. |
| Day 18 | API + UI — ASP.NET Minimal API with Swagger. Console chat interface. Test against same queries as P1 to compare. |
| Day 19 | README + polish — Architecture diagram. P1 vs P1-CS comparison table. Cost analysis. Decision framework. Push, pin. |

*Total: ~21 hours across 5 days.*

---

## P1 vs P1-CS — Side by Side

| Component | P1 — TypeScript | P1-CS — C# / Azure |
|---|---|---|
| Language | TypeScript | C# / .NET 8 |
| LLM Provider | Anthropic Claude (direct API) | Azure OpenAI (managed deployment) |
| Orchestration | Vercel AI SDK | Microsoft Semantic Kernel |
| Vector Store | pgvector (self-hosted) | Azure AI Search (managed, hybrid) |
| Embeddings | OpenAI text-embedding-3-small | Azure OpenAI text-embedding-3-small |
| Frontend | Next.js chat UI (polished) | Console (functional) |
| Deployment | Vercel | Local + Azure provisioning docs |
| Eval harness | Full suite in CI | Reference P1's approach, manual runs |
| Target client | Startups, SaaS, AI-native | Enterprise, .NET shops, Azure customers |
| Portfolio signal | "I build modern AI applications" | "I bring AI into your existing .NET stack" |

---

## P2 — PR Review Agent (Day 20–34)

**TypeScript · Anthropic · GitHub API · Zod**

First real agent. Fetches PR diffs, file trees, and context from GitHub API, then produces structured review comments with severity ratings and fix suggestions.

### What you build
- GitHub API integration (tool use — real external tool)
- ReAct loop: fetch PR → analyse diff → structured review output
- Zod schemas for typed, validated agent output
- Webhook integration for triggering on PR events

### What you learn
- Tool use / function calling in depth
- Structured output validation with Zod
- Real API integration in an agentic context
- Production reliability patterns for agentic systems

---

## P3 — Debug Assistant (Day 35–54)

**TypeScript · Langfuse · Ragas · Multi-model**

Multi-agent system: an orchestrator agent routes debugging tasks to specialist subagents (error analysis, stack trace parsing, fix suggestion, test generation). Full observability and eval suite.

### What you build
- Orchestrator / specialist multi-agent pattern
- LangGraph state machine for agent coordination
- Langfuse tracing on all agent steps
- Full RAGAS eval suite
- Multi-model routing: Claude for reasoning, GPT-4o for speed

### What you learn
- Multi-agent orchestration at production scale
- LangGraph state machines
- Observability as a first-class concern
- Eval discipline across a complex system
- Real cost optimization through model routing

---

## P4 — Fine-tuned Reviewer (Day 55–69)

**TypeScript + Python · LoRA · OpenAI Fine-Tuning API · W&B**

Fine-tune a specialist model for code review tasks. Benchmark report comparing the fine-tuned model vs GPT-4o on the same task — showing quality parity at a fraction of the cost.

### What you build
- Dataset preparation pipeline (JSONL format)
- LoRA fine-tuning run via OpenAI Fine-Tuning API
- W&B experiment tracking
- Benchmark report: fine-tuned 7B vs GPT-4o cost/quality comparison

### The punchline
A fine-tuned specialist model running at 10% of GPT-4o cost, with a benchmark report showing it outperforms GPT-4o on the narrow task. That's the artefact that shows real ML engineering, not just API wrangling.

---

## DevMind — Capstone (Day 70–90) ⭐

**Full-stack AI system — everything integrated**

The flagship. A complete AI system integrating all sprint components: RAG, agents, evals, observability. Live, deployed, documented. Not a demo — a real system with a write-up.

This is what you lead with in every conversation and interview.

---

## Market Coverage

### Modern AI / LLM-Native Market (P1–P4 + DevMind)
Startups, SaaS companies, AI-native products. TypeScript/Python stack. Direct API integration. The larger, more competitive market — but 30yr engineering depth is the differentiator.

**Covers:** RAG systems · AI agents · LLM integration · Fine-tuning · Multi-agent · Evals

### Enterprise .NET + AI Market (P1-CS)
Enterprise companies, .NET shops, Azure customers. Lower competition, higher trust threshold, longer contracts. 20 years of C# is a genuine moat — most AI freelancers can't enter this market.

**Covers:** Azure OpenAI integration · Semantic Kernel · .NET AI copilots · Enterprise RAG

**The combined signal:** When a client sees GitHub with both P1 (TypeScript) and P1-CS (C#/Azure) pinned, they see someone who understands AI engineering at the architectural level — not just in one framework. Most AI freelancers are Python-only. Most .NET devs haven't touched AI. Credibly both is rare.

---

## Risk Management

| Risk | Mitigation | Fallback |
|---|---|---|
| Azure provisioning delays | Create Azure resources on Day 13–14 while P1 is wrapping up | Azure CLI scripts in repo for one-command setup |
| Semantic Kernel learning curve | SK is well-documented, plugin pattern maps directly to LangChain concepts you'll have just built | Use raw Azure OpenAI SDK if SK fights you |
| Sprint compression too tight | P1-CS's UI is the cut line. Console app + API + great README is the MVP | 4 days instead of 5. API-only is still a strong portfolio piece. |
| Azure costs | AI Search Basic tier is free for small indexes. Azure OpenAI is pay-per-token (pennies for a demo). Total: <$5 | Document teardown steps to avoid ongoing charges |

---

## The Bottom Line

Six pinned repos across two ecosystems in 90 days. The enterprise .NET + AI niche has less competition, higher rates, and longer contracts — and 20 years of C# means not learning a new language, just new libraries. P1-CS takes ~5 days because the hard part — understanding RAG architecture — is the same work done in P1.

When a .NET shop posts "we need someone who can add AI to our existing C# codebase" — you're one of the very few people who can credibly respond with a portfolio link.