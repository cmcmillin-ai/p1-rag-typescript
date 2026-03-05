# AI Engineer Learning Plan

## Gap Analysis

Five gap areas identified — four AI foundations plus enterprise Azure AI. The sprint front-loads foundations in Month 1, with Azure covered by the P1-CS port.

| Gap | Closes |
|---|---|
| Python / ML idioms | Week 1–2 |
| LLM APIs & prompt engineering | Week 1, 4 |
| RAG & vector DBs | Week 2–3 |
| Agents & orchestration | Week 5–7 |
| Azure AI / Semantic Kernel | Week 3 (P1-CS port) |

---

## Daily Structure

| Block | Duration | Focus |
|---|---|---|
| Morning | 1.5h | Course / reading — theory |
| Midday | 1.5h | Coding / building — hands-on |
| Evening | 0.5h | Docs, write-up, commit to GitHub |
| Weekend top-up | 6–8h | Big builds & catch-up to hit 20h/week floor |

---

## Week-by-Week Plan

### Month 1 — Ecosystem Immersion
*Python fluency · LLM internals · first real build · enterprise port · ~110h*

#### Week 1 — ~20h · Python ML idioms + LLM API fundamentals
- Python data structures for ML
- NumPy / Pandas basics
- Anthropic + OpenAI SDK (Python & TS)
- Tokens, context, temperature, streaming responses
- Read LangChain docs

🔨 First API call — something real, not hello world

**Resources this week**
- Full Stack LLM Bootcamp (Berkeley) — free, do in parallel
- Anthropic Python SDK Quickstart
- DeepLearning.AI — ChatGPT Prompt Engineering for Devs
- Python for Data Analysis — Wes McKinney (ch 4–5 only)

---

#### Week 2 — ~20h · Embeddings, vector search, RAG theory
- Embeddings as concept + cosine similarity
- pgvector (you know Postgres already)
- Pinecone / Weaviate overview
- Chunking strategies

🔨 Embed a small corpus, run similarity search

**Resources this week**
- DeepLearning.AI — Building Systems with the ChatGPT API
- DeepLearning.AI — LangChain for LLM Application Dev
- Pinecone Quickstart + pgvector README
- "Chunking strategies for LLM apps" — Pinecone blog (required)

---

#### Week 3 — ~25h · First real RAG system end to end
- Retrieval pipeline design
- Reranking basics
- LangChain / LlamaIndex hands-on

🔨 RAG over a real doc set  
🚀 Ship: working demo with UI

**Resources this week**
- DeepLearning.AI — Advanced Retrieval for AI with Chroma
- Vercel AI SDK — streaming RAG responses (TS-first)

---

#### Week 3+ — ~21h · Enterprise RAG port (P1-CS)
- Provision Azure OpenAI + AI Search
- Semantic Kernel NuGet setup
- Port chunking → Azure AI Search index
- RAG pipeline via SK plugins
- Hybrid search (vector + keyword)
- ASP.NET Minimal API + Swagger

🔨 Build P1 vs P1-CS comparison README  
🚀 Ship: 2nd pinned repo

**Resources this week**
- Semantic Kernel docs — plugin architecture
- Azure AI Search quickstart
- Azure OpenAI Service docs

---

#### Week 4 — ~25h · Prompt engineering depth + basic evals
- System prompt architecture
- Few-shot, chain-of-thought, structured outputs
- JSON mode / function calling
- Intro to evals: what does "good" mean?

🔨 Build eval harness for RAG system

**Resources this week**
- Anthropic Prompt Engineering Guide — full read
- DeepLearning.AI — Building and Evaluating Advanced RAG
- RAGAS docs

---

### Month 2 — Agents, Production & Depth
*Multi-step agents · observability · production patterns · ~90h*

#### Week 5 — ~20h · Agent architectures — formal patterns
- ReAct pattern (Yao et al. paper — required reading)
- Tool use / function calling in depth
- Memory types: in-context, external, episodic
- Planning strategies

🔨 Single agent with 3+ tools

**Resources**
- ReAct paper (arXiv:2210.03629)
- DeepLearning.AI — Functions, Tools and Agents with LangChain
- Anthropic tool use docs

---

#### Week 6 — ~20h · Multi-agent systems + observability
- Orchestrator / specialist patterns
- Agent handoffs + routing
- LangSmith / Langfuse tracing
- Failure modes & recovery

🔨 2-agent orchestration system

**Resources**
- LangGraph docs — state machine agent orchestration
- Langfuse quickstart
- DeepLearning.AI — Multi AI Agent Systems with crewAI

---

#### Weeks 7–8 — ~50h · Flagship project
- Pick a problem you genuinely care about
- Full stack: TypeScript backend + UI
- RAG + agents + evals + observability
- Cost optimization + latency profiling
- Safety / guardrails layer

🔨 Production-grade AI system  
🚀 Deployed, public, documented

**Resources**
- Designing ML Systems — Chip Huyen (serving + monitoring chapters)
- Langfuse cost dashboard setup
- Vercel deployment docs

---

### Month 3 — Positioning, Direction & Go-to-Market
*Specialise · sharpen narrative · job search · ~80h*

#### Week 9 — ~20h · Go deep on chosen direction
- Fine-tuning (LoRA / PEFT) if agents track
- MLOps pipelines (DVC, MLflow) if platform track
- Advanced RAG patterns if product track
- Read 3–5 relevant papers (skim first, then deep)

🔨 Direction-specific mini-project

---

#### Week 10 — ~20h · Narrative, portfolio & positioning
- Write a technical blog post about what you built
- Polish GitHub READMEs
- Craft the "AI Engineer" story (3 decades → AI)
- Update LinkedIn — AI Engineer framing

🚀 Publish blog post + open source anything

---

#### Weeks 11–12 — ~40h · Active job search + interview prep
- Target 10–15 roles (AI-native startups first)
- Prep: system design for AI systems
- Prep: explain RAG, agents, evals from first principles
- Prep: Claude Code background as a narrative
- Keep building — don't stop during applications

🚀 Send first 10 applications by Day 75

---

## Sprint Resources

| Resource | Type | When | Notes |
|---|---|---|---|
| Full Stack LLM Bootcamp (Berkeley) | Course · Free | Week 1 | Full stack end-to-end — do in parallel |
| DeepLearning.AI Short Courses | Course · Paid | Ongoing | Pick 4–6 matching monthly focus. 1–2h each |
| Designing ML Systems — Chip Huyen | Book | Month 2 | Read serving, monitoring, evals chapters |
| Vercel AI SDK | Framework | Day 1 | First-class TypeScript — streaming + tool use |
| Microsoft Semantic Kernel | Framework | Week 3+ | C#-native, enterprise-grade, underrated |
| LangSmith / Langfuse | Observability | Week 2+ | Add tracing from day 1 |
| ReAct, RAG, Attention papers | Papers | Month 2 | Skim for framing — vocabulary for interviews |
| TLDR AI / The Rundown | Newsletter | Daily | 5 min/day — non-negotiable during sprint |

---

## Certification Roadmap

**Don't cert before you build.** Projects, portfolio, and deployed systems carry more weight in AI Engineer hiring than any badge. Certs amplify a strong portfolio; they don't substitute for one.

| Timing | Cert | Notes |
|---|---|---|
| Now → Day 90 | Sprint | Build. Ship. Azure hands-on is your cert prep — you just don't know it yet. |
| Month 4–5 | Azure AI-102 | Primary cert. 4–6 weeks focused study on top of sprint experience. Sit while Azure is warm. |
| Month 6–9 | AWS MLA-C01 | Needs ~1yr hands-on AWS. Build that on the job. |
| Year 2+ | Optional | AZ-305, Google ML Engineer, NVIDIA DLI — based on where the role takes you. |

### Azure AI Engineer Associate (AI-102) — Primary · ~£165
The cert that most directly validates what you'll have built. The 2025 refresh shifted focus toward generative AI and agentic solutions — Azure OpenAI, AI Foundry, AI Search, RAG pipelines, responsible AI governance. Exactly the stack built across Projects 1–3. C# exam option is a genuine edge over most candidates.

**Study path:** Microsoft Learn (AI-102 path, free) → Scott Duffy Udemy (~£15) → Whizlabs practice tests → kennethleungty/Azure-AI-Engineer-Associate-Notes (GitHub, free)

### AWS ML Engineer Associate (MLA-C01) — Secondary · ~£240
Replaces the retiring AWS ML Specialty. Engineering-focused — validates ability to productionise ML workloads using SageMaker and AWS ML stack. Needs ~1 year hands-on AWS. Build that on the job.

### Certs to Skip
- **AWS ML Specialty (MLS-C01)** — Retiring March 31, 2026. Do not invest prep time.
- **AWS AI Practitioner (AIF-C01)** — Aimed at business professionals. Below your level.
- **Azure AI Fundamentals (AI-900)** — Go straight to AI-102. AI-900 is padding on a senior engineer CV.