# AI Engineer Tech Stack Reference

*Generated from Learning Plan + 90-Day Sprint + Project Arc*

---

## Languages

### TypeScript — Primary
10+ years depth. Primary language for P1, P2, P3 and the DevMind capstone. Vercel AI SDK, Anthropic SDK, LangChain.js all first-class. Competitive advantage vs Python-only AI engineers.

**Used:** All projects · Sprint-wide

### Python — Learn
Required for ML ecosystem: HuggingFace, PEFT, LoRA fine-tuning (P4), evals with RAGAS. Closes in ~1 week given background. Use `pyenv` on macOS. Syntax gap only — not a cognitive gap.

**Used:** Wk 1–2 ramp · P4 fine-tuning · RAGAS evals

### C# / .NET 8 — Azure Primary
20+ years depth. Used in P1-CS (Enterprise RAG Port). Semantic Kernel is C#-native. The combination of C# + Azure + Semantic Kernel is a niche with very few competitors.

**Used:** P1-CS · Day 15–19 · Enterprise track

**Runtime setup (macOS):** `nvm` for Node/TS · `pyenv` for Python (never system Python) · `dotnet sdk` via Homebrew for C# · All managed independently, no conflicts.

---

## LLM APIs & Models

### claude-sonnet-4-6 — Primary
Default reasoning engine. Multi-step agents, code understanding, careful judgment, long context. Workhorse for P1–P3 and capstone.

**Used:** All projects · Anthropic API

### claude-haiku-4-5-20251001 — Secondary
Latency-sensitive paths within agent loops. Classification, routing decisions, fast extraction. Swap with one line in Vercel AI SDK.

**Used:** P2 · P3 agent loops · routing layer

### gpt-4o — Secondary
~60% of job postings mention OpenAI. Multi-model routing in P3 uses Claude for reasoning + GPT-4o for speed — a real production pattern worth demonstrating. Baseline for fine-tuning comparison in P4.

**Used:** P3 multi-model routing · P4 benchmark baseline

### text-embedding-3-small — Primary
Default embedding model for all vector search. Cheap, fast, excellent quality. Used in P1 pgvector pipeline and P1-CS Azure AI Search indexing. Don't overthink this choice.

**Used:** P1 · P1-CS · any RAG project

### Azure OpenAI — Azure Primary
Managed GPT-4o / embedding deployment via Azure. How most enterprise companies consume LLMs in production.

**Used:** P1-CS · enterprise track

### Mistral-7B / CodeLlama-7B — Learn
Open-source models for P4 LoRA fine-tuning. Run locally on M-series Mac with `mlx-lm` (48GB recommended). Fine-tuned specialist model vs GPT-4o cost comparison is the P4 punchline.

**Used:** P4 · fine-tuning · local inference

**Routing logic:** Sonnet for reasoning-heavy → Haiku for speed-sensitive → fine-tuned 7B for narrow domain tasks at low cost. Demonstrating this in P3/P4 is production thinking.

---

## Cloud Platforms & Services

### Azure OpenAI Service — Azure Primary
Managed LLM endpoint (GPT-4o, embeddings). How most enterprise companies deploy AI in production. 26% of AI engineer job postings.

**Used:** P1-CS · enterprise track

### Azure AI Search — Azure Primary
Managed vector + keyword hybrid search. Enterprise-grade RAG infrastructure. Replaces pgvector in Azure environments. Native semantic ranking — saves building reranking yourself.

**Used:** P1-CS · Wk 3+ · AI-102 exam topic

### Azure AI Foundry — Learn
Azure's unified AI platform — model deployment, agent orchestration, prompt flow, responsible AI. Central to AI-102 exam content (2025 refresh).

**Used:** AI-102 prep · Month 4–5

### Azure Cognitive Services — Learn
Vision, NLP, Speech, Language APIs on Azure. AI-102 exam breadth. Build awareness rather than depth during sprint.

### Azure.Identity / RBAC — Learn
Authentication for Azure AI services. `DefaultAzureCredential` pattern used in P1-CS. Managed identities, service principals, key vault integration.

**Used:** P1-CS · enterprise security pattern

### AWS Bedrock — Secondary
Managed LLM access on AWS. 32.9% of AI engineer job postings. Know the service and how it compares to Azure OpenAI. Conversancy, not mastery.

### AWS SageMaker — Secondary
MLOps on AWS. Model training, deployment, monitoring pipelines. Most enterprise ML infrastructure runs here. Build on the job after landing a role.

### GCP / Vertex AI — Aware
Genuinely strong AI platform. Smaller job pool, no C# leverage. Know it exists. Don't invest sprint time here.

**Decision:** Azure PRIMARY · AWS SECONDARY · GCP SKIP for now.

---

## Frameworks, SDKs & Orchestration

### Vercel AI SDK — Primary
Primary TypeScript AI abstraction. Streaming, tool use, multi-model routing in one clean package. Swap providers with one line. Use from Day 1 of P1. Thin enough that you understand what's happening underneath.

**Used:** P1 · P2 · P3 · capstone · Day 1

### Anthropic SDK — Primary
Raw SDK for anything Vercel AI SDK doesn't cover. Python and TypeScript versions both used. "I used the SDK directly to understand the tool-use loop" is a strong interview answer.

**Used:** Sprint-wide

### OpenAI SDK — Secondary
Raw SDK for GPT-4o calls, embeddings, and fine-tuning API (P4). Fine-tuning API is the best available — mature, well-documented.

**Used:** P3 multi-model · P4 fine-tuning API

### Semantic Kernel — Azure Primary
C#-native AI orchestration from Microsoft. Plugin architecture maps directly to LangChain concepts. Mature, enterprise-grade, underrepresented in candidate pool. P1-CS is built on it.

**Used:** P1-CS · Wk 3+ · C# enterprise track

### LangGraph — Learn
Stateful agent orchestration using state machines. Used in P3 (Debug Assistant) for multi-agent coordination. More structured than LangChain — cleaner mental model for complex agent flows.

**Used:** Wk 6 · P3 multi-agent

### LangChain.js / LangChain — Aware
Know the concepts and read the docs (Wk1). Use sparingly — reputation problem in senior engineering circles (heavy abstractions, painful debugging). LangSmith observability is still worthwhile. Don't build core logic on it.

**Used:** Wk 1 docs read only · LangSmith ok

### LlamaIndex — Learn
RAG-focused framework. Better document ingestion and retrieval abstractions than LangChain for pure RAG use cases. Python-first.

**Used:** Wk 3 · P1 RAG pipeline

### FastAPI — Learn
Python backend for AI services where TS isn't the right tool. Clean async API surface, auto-generated docs.

**Used:** Wk 8 flagship · Python backend option

### ASP.NET Minimal API — Azure
Backend for P1-CS enterprise RAG. Expose Semantic Kernel RAG pipeline as clean REST endpoint with Swagger docs. 20yr C# background means this is trivial overhead.

**Used:** P1-CS · Day 18

### Next.js — Primary
Frontend for P1 and capstone chat UI. Full-stack TypeScript. Pairs with Vercel AI SDK natively. Use App Router.

**Used:** P1 UI · capstone DevMind

### Zod — Primary
TypeScript schema validation. Used in P2 (PR Review Agent) for structured LLM output validation — tool calling results, parsed JSON, agent step typing. Prevents silent failures in agentic systems.

**Used:** P2 · P3 · structured output validation

**Decision:** Vercel AI SDK over LangChain as primary TS abstraction · Semantic Kernel for C# · Raw SDKs where frameworks add more friction than value.

---

## Vector Stores & Data Infrastructure

### pgvector — Primary
Postgres extension for vector search. You already know Postgres — low-friction starting point. Used in P1 for the TypeScript RAG pipeline. Self-hosted, cost-effective, production-viable for most scales.

**Used:** P1 · Wk 2

### Azure AI Search — Azure Primary
Managed hybrid (vector + keyword) search. Enterprise RAG for P1-CS. Native semantic ranking. AI-102 exam topic.

**Used:** P1-CS · enterprise track

### Supabase (pgvector) — Secondary
Hosted Postgres + pgvector. Free tier covers sprint projects. Good DX with TypeScript SDK.

**Used:** P1 hosted option · fast deploy

### Pinecone / Weaviate / Chroma — Aware
Industry-standard for interview conversations about vector infrastructure choices. Know the landscape, don't go deep.

**Used:** Wk 2 landscape overview only

**Note:** Chunking strategies matter — Pinecone blog "Chunking strategies for LLM apps" (Wk 2 required reading). Reranking covered in Wk 3 — Azure AI Search provides semantic ranking natively.

---

## Observability, Evals & Quality

### Langfuse — Primary
Open-source LLM observability. Tracing, prompt versioning, A/B testing, cost dashboards. Add from Day 1 of building — evals without observability is flying blind. Self-hostable.

**Used:** Wk 7 setup · all projects from P1

### LangSmith — Secondary
LangChain's tracing platform. Use if the project uses LangGraph — the integration is native. Either LangSmith or Langfuse; pick one per project.

**Used:** Wk 7 · LangGraph projects (P3)

### RAGAS — Learn
Open-source RAG eval framework. Faithfulness, answer relevancy, context recall metrics. Used in Wk 4 for P1 eval harness. P3 runs a full eval suite.

**Used:** Wk 4 · P3 full eval suite

### W&B (Weights & Biases) — Learn
ML experiment tracking and fine-tuning monitoring. Used in P4 to log LoRA training runs, compare model versions, build the benchmark report.

**Used:** P4 fine-tuning track

### CI / GitHub Actions — Primary
Eval harness runs in CI on P1 TypeScript version. Automated quality gate on every commit. Shows production engineering discipline.

**Used:** P1 CI evals · all shipped repos

**The signal:** A GitHub repo with Langfuse traces, a RAGAS eval dashboard, and CI-gated evals signals more credibility to senior engineers than most certs. Start tracing from day one — retrofitting observability is painful.

---

## ML Tooling & Fine-Tuning

### HuggingFace PEFT — Learn
Parameter-Efficient Fine-Tuning library. LoRA/QLoRA implementation for P4. Python-native via pyenv on macOS.

**Used:** Wk 9 · P4 fine-tuning track

### mlx-lm — Primary
Apple's ML framework for Apple Silicon. Optimised for unified memory architecture — outperforms PyTorch/MPS for local fine-tuning on M-series Macs. Use for local LoRA runs on 48GB Mac Mini.

**Used:** P4 local fine-tuning · Mac Mini M4 Pro

### OpenAI Fine-Tuning API — Learn
Best fine-tuning API for P4. Mature tooling, clean DX, JSONL dataset format. Fine-tuned GPT-3.5 or GPT-4o-mini specialist model vs full GPT-4o — cost/performance comparison is the P4 benchmark report punchline.

**Used:** P4 · Day 55–69

### Google Colab Pro — Secondary
Cloud GPU fallback for heavy LoRA runs. ~$12/month. Safety valve, not primary.

**Used:** P4 heavy training runs

### NumPy / Pandas — Learn
Python data manipulation basics. Wk 1 (ch 4–5 of Python for Data Analysis only). Enough to prepare datasets for fine-tuning and parse eval outputs.

**Used:** Wk 1 ramp · dataset prep for P4

### MLflow / DVC — Aware
MLOps pipeline tooling. Only if taking the Platform track at the Day 60 direction fork. Awareness-level otherwise.

**Used:** Wk 9 Platform track only

**P4 punchline:** A fine-tuned Mistral-7B running locally at 10% of GPT-4o cost, with a benchmark report showing it outperforms GPT-4o on the narrow task. That's the artefact that shows real ML engineering, not just API wrangling.

---

## Infrastructure & Deployment

### Vercel — Primary
Deployment for Next.js frontend projects (P1, capstone). Zero-config, Git-connected. Free tier covers sprint projects.

**Used:** P1 · capstone · frontend deploy

### Railway / Render — Secondary
Backend service hosting. FastAPI services, Node backends, Postgres databases. Faster DX than AWS for sprint-pace deployment.

**Used:** Wk 8 flagship · backend hosting

### Docker — Learn
Containerisation for P1-CS Azure deployment and Wk 8 flagship. Native on macOS.

**Used:** P1-CS · Wk 8

### GitHub / GitHub Actions — Primary
6 pinned repos are the portfolio. GitHub Actions for CI eval harness. Clean commit history, descriptive READMEs, and pinned repos are the interview artefact.

**Used:** All projects

### GitHub API — Learn
Used in P2 (PR Review Agent). The agent fetches PR diffs, comments, and file trees via GitHub REST API. Real external tool integration.

**Used:** P2 · PR Review Agent · tool use

### Homebrew — Primary
macOS package manager. Manages git, nvm, pyenv, dotnet, docker, and all dev tooling.

**Used:** Mac setup · Day 0

### VS Code — Primary
Primary IDE for TypeScript, Python, and C# work. macOS native. Extensions: Pylance, ESLint, Prettier, GitHub Copilot, REST Client, C# Dev Kit.

**Used:** Sprint-wide · all languages

---

## Hardware & Environment

### macOS (Apple Silicon) — Primary
Native Unix environment. Python tooling, Docker, HuggingFace, every tutorial — all work without workarounds. No WSL, no path hacks.

### Mac Mini M4 Pro 48GB — Primary (Recommended)
Desktop powerhouse. 48GB unified memory: run 13B models unquantised, fine-tune 7B with headroom, two models simultaneously. Plugs into existing monitor/keyboard/trackpad setup. Better value than MacBook Pro equivalent.

**Config:** M4 Pro · 48GB unified memory  
**Avoid:** 24GB variant — modest step, not a different capability tier  
**Avoid:** Base M4 — 16GB max, lateral move

### MacBook Pro M1 Pro 16GB — Portable
Fully capable for Projects 1–3 (API-based work doesn't need local GPU). Portable machine. 16GB is tight for P4 fine-tuning — use Colab Pro as safety valve.

**Memory tiers for local model work**

| Memory | Capability |
|---|---|
| 16GB | 7B quantised only. Fine-tuning tight. |
| 24GB | 7B comfortably. 13B quantised. Modest step — not a tier change. |
| **48GB** | **13B unquantised. 7B fine-tuning with headroom. Two models simultaneously. Different capability tier.** |
| 64GB+ | 30B+ models. Steep premium — cloud GPUs are often cheaper at this scale. |

**Setup:** Fresh install, not migration. Homebrew → nvm → pyenv → dotnet → Docker → VS Code. Half a day, zero cruft.

---

## Key Concepts & Patterns to Master

| Concept | When | Notes |
|---|---|---|
| RAG | Month 1 | Embedding → index → retrieve → rerank → generate. Two implementations: TS/pgvector (P1) and C#/Azure AI Search (P1-CS). |
| ReAct Pattern | Wk 5 | Reason + Act loop. Foundation of P2. Read Yao et al. paper. Build from scratch before using a framework. |
| Tool Use / Function Calling | Wk 4 | LLM decides when and how to call external tools. Core to all agentic systems. |
| Multi-Agent Orchestration | Wk 6 | Orchestrator / subagent pattern. P3. LangGraph state machine for coordination. |
| Structured Outputs / JSON Mode | Wk 4 | Zod schemas for TypeScript validation. Critical for production reliability. |
| Embeddings & Cosine Similarity | Wk 2 | Foundation of RAG. Understand why text-embedding-3-small, not just how. |
| Chunking Strategies | Wk 2–3 | Fixed-size, semantic, hierarchical. Overlap strategies. Pinecone blog is the reference. |
| Reranking | Wk 3 | Cross-encoder second-pass to improve retrieval precision. Azure AI Search provides this natively. |
| Evals Framework Design | Wk 4 | Faithfulness, relevancy, groundedness. RAGAS metrics. Eval harness in CI. |
| Agent Memory Types | Wk 5 | In-context, episodic, semantic. Memory management is a production concern. |
| Token Economics | Month 2 | Input vs output pricing. Cost dashboards in Langfuse. Routing Haiku vs Sonnet for cost control. |
| LoRA / QLoRA | Wk 9 | Low-Rank Adaptation — efficient fine-tuning without full model retraining. P4. |
| Hybrid Search | P1-CS | Vector + keyword combined. Azure AI Search provides this natively. |
| Guardrails / Safety Layers | Wk 8 | Input validation, output filtering. Production AI systems need explicit safety layers. |
| Responsible AI | AI-102 | Microsoft's RAI framework. Enterprise customers require documented responsible AI posture. |
| Semantic Kernel Plugin Pattern | P1-CS | Maps 1:1 to LangChain tools concept. C#-native. LangChain knowledge from P1 makes this a translation exercise. |
| MLOps / Model Serving | Month 2 | Deploying, monitoring, versioning models. Chip Huyen "Designing ML Systems" is the reference. |

---

## Certifications

### Target — Azure AI Engineer Associate (AI-102) · Month 4–5 · ~£165
Primary cert target. 2025 refresh added GenAI + agentic focus. C# exam option is a genuine edge. Study: MS Learn path → Scott Duffy Udemy → Whizlabs → kennethleungty/Azure-AI-Engineer-Associate-Notes.

### Target — AWS ML Engineer Associate (MLA-C01) · Month 6–9 · ~£240
Replaces retiring ML Specialty. Needs ~1yr hands-on AWS. Build that on the job post-sprint. Engineering-focused: productionising ML workloads, SageMaker, Bedrock. Valid 3 years.

### Skip — AWS ML Specialty (MLS-C01)
Retiring March 31, 2026. Do not invest prep time.

### Skip — AWS AI Practitioner (AIF-C01)
Aimed at business professionals. Below your level. Under-positioning on a senior engineer CV.

### Skip — Azure AI Fundamentals (AI-900)
Foundational cert for non-technical roles. Go straight to AI-102.

**Honest cert calculus:** A deployed GitHub repo with Langfuse traces and a RAGAS eval suite opens more doors than any cert. AI-102 earns its place for breaking into a new domain without a track record. After that, let the job tell you which cert to chase next.