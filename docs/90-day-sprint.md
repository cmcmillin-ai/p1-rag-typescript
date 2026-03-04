# 90-Day AI Engineer Sprint

**Target:** Day 75 → first applications. Day 90 → active pipeline in flight.

---

## Month 1 — Ecosystem Immersion
*Python fluency · LLM internals · first real build · enterprise port · ~110h*

### Week 1 — ~20h
**Python ML idioms + LLM API fundamentals**
- Python data structures for ML
- NumPy / Pandas basics
- Anthropic + OpenAI SDK (Python & TS)
- Tokens, context, temperature, streaming responses
- Read LangChain docs — map to what you know

🔨 Build: first API call — something real, not hello world

**Resources**
- Full Stack LLM Bootcamp (Berkeley) — do this in parallel, Week 1
- Anthropic Python SDK Quickstart
- DeepLearning.AI — ChatGPT Prompt Engineering for Devs
- Python for Data Analysis — Wes McKinney (ch 4–5 only)

---

### Week 2 — ~20h
**Embeddings, vector search, RAG theory**
- Embeddings as concept + cosine similarity
- pgvector (you know Postgres already)
- Pinecone / Weaviate overview
- Chunking strategies

🔨 Build: embed a small corpus, run similarity search

**Resources**
- DeepLearning.AI — Building Systems with the ChatGPT API
- DeepLearning.AI — LangChain for LLM Application Dev
- Pinecone Quickstart + pgvector README
- "Chunking strategies for LLM apps" — Pinecone blog

---

### Week 3 — ~25h
**First real RAG system — end to end**
- Retrieval pipeline design
- Reranking basics
- LangChain / LlamaIndex hands-on

🔨 Build: RAG over a real doc set  
🚀 Ship: working demo with UI

**Resources**
- DeepLearning.AI — Advanced Retrieval for AI with Chroma
- Vercel AI SDK — streaming RAG responses

---

### Week 3+ — ~21h
**Enterprise RAG port — P1-CS**
- Provision Azure OpenAI + AI Search
- Semantic Kernel NuGet setup
- Port chunking → Azure AI Search index
- RAG pipeline via SK plugins
- Hybrid search (vector + keyword)
- ASP.NET Minimal API + Swagger

🔨 Build: P1 vs P1-CS comparison README  
🚀 Ship: 2nd pinned repo — enterprise portfolio

---

### Week 4 — ~25h
**Prompt engineering depth + basic evals**
- System prompt architecture
- Few-shot, chain-of-thought, structured outputs
- JSON mode / function calling
- Intro to evals: what does "good" mean?

🔨 Build: eval harness for your RAG system

---

### Month 1 Skills Acquired
Python ML idioms · LLM APIs (Py + TS) · Embeddings · Vector DBs · RAG pipelines · Prompt engineering · Basic evals · LangChain / LlamaIndex · Semantic Kernel (C#) · Azure OpenAI · Azure AI Search

### Month 1 Deliverable
Two production-quality RAG systems — one in TypeScript (P1) and one in C# / Azure (P1-CS) — with a comparison README that articulates when to choose each stack. Eval harness runs in CI on the TS version. The C# version is your calling card for enterprise .NET clients. Both on GitHub, both pinned.

---

## Month 2 — Agents, Production & Depth
*Multi-step agents · observability · production patterns · flagship project · ~90h*

### Week 5 — ~20h
**Agent architectures — formal patterns**
- ReAct pattern
- Tool use / function calling in depth
- Memory types: in-context, external, episodic
- Planning strategies

🔨 Build: single agent with 3+ tools

---

### Week 6 — ~20h
**Multi-agent systems + observability**
- Orchestrator / specialist patterns
- Agent handoffs + routing
- LangSmith / Langfuse tracing
- Failure modes & recovery

🔨 Build: 2-agent orchestration system

---

### Weeks 7–8 — ~50h
**Flagship project — design & build**
- Pick a problem you genuinely care about
- Full stack: TypeScript backend + UI
- RAG + agents + evals + observability
- Cost optimization + latency profiling
- Safety / guardrails layer

🔨 Build: production-grade AI system  
🚀 Ship: deployed, public, documented

---

### Month 2 Skills Acquired
ReAct agents · Multi-agent systems · LangSmith / Langfuse · Prompt versioning · Cost optimization · Guardrails · Production deployment · Evals in depth

### Month 2 Deliverable
A flagship project that is live, deployed, and documented. Not a demo — a real system with evals, tracing, and a write-up. This is what you lead with in every conversation and interview.

---

## Month 3 — Positioning, Direction & Go-to-Market
*Specialise · sharpen the narrative · focused job search · ~80h*

### Week 9 — ~20h
**Go deep on chosen direction**
- Fine-tuning (LoRA / PEFT) if agents track
- MLOps pipelines (DVC, MLflow) if platform track
- Advanced RAG patterns if product track
- Read 3–5 relevant papers (skim first, then deep)

🔨 Build: direction-specific mini-project

---

### Week 10 — ~20h
**Narrative, portfolio & positioning**
- Write a technical blog post about what you built
- Polish GitHub READMEs
- Craft your "AI Engineer" story (3 decades → AI)
- Update LinkedIn — AI Engineer framing

🚀 Publish: blog post + open source anything

---

### Weeks 11–12 — ~40h
**Active job search + interview prep**
- Target 10–15 roles (AI-native startups first)
- Prep: system design for AI systems
- Prep: explain RAG, agents, evals from first principles
- Prep: Claude Code background as a narrative
- Keep building — don't stop during applications

🚀 Apply: send first 10 applications by Day 75

---

## What You Have by Day 90

| | |
|---|---|
| Full LLM/agent stack | ✅ |
| 2+ shipped projects | ✅ |
| Evals & observability | ✅ |
| Technical writing | ✅ |
| Direction specialisation | ✅ |
| Interview-ready narrative | ✅ |
| Active pipeline | ✅ |

**Day 90 Position:** A senior engineer with a compelling AI portfolio spanning two ecosystems (TypeScript + C#/Azure), a clear specialisation narrative, and active applications in flight. 30 years of engineering context is a *feature* — most AI Engineer candidates can't think in systems at this level. The dual-stack portfolio opens both the modern AI market and the enterprise .NET niche.

---

## Language & Cloud Strategy

### Languages
- **TypeScript (primary)** — Vercel AI SDK, Anthropic SDK. 10+ years is a competitive advantage most AI Engineer candidates don't have.
- **Python** — Required for ML ecosystem (HuggingFace, PEFT, evals). Closes in ~1 week given background. Use `pyenv`.
- **C# / .NET** — Semantic Kernel is C#-native and enterprise-dominant. Used in P1-CS. 20+ years is a genuine differentiator.

### Cloud
- **Azure (primary)** — Azure OpenAI is how most enterprise companies deploy GPT-4 in production. C# + Semantic Kernel + Azure is a rare combination. Target: Azure AI Engineer Associate (AI-102). 26% of AI engineer postings, skewed toward senior enterprise roles.
- **AWS (secondary)** — 32.9% of job postings — the broadest market. Know enough to be conversant: SageMaker, Bedrock, core IAM. Most skills transfer directly from Azure.
- **GCP (deprioritised)** — Smaller job pool, no C# leverage. Skip for now.

---

## Direction Fork — Day 60

By Day 60 you'll have built real systems. Let the work tell you where to go.

| Direction | Focus | Signal |
|---|---|---|
| **Agents & Automation** | Multi-agent systems, autonomous workflows, tool orchestration | Claude Code background is most legible here |
| **Product & Integration** | Own AI features end-to-end at a product company | Full-stack + AI + 30yr judgment = rare |
| **Platform & Tooling** | Build the infra other AI engineers build on | C# + Azure angle is a genuine differentiator |

---

## Visual Timeline

```
Month 1 · Days 1–30     Python + APIs → Embeddings + RAG → Azure / SK (P1-CS)
Month 2 · Days 31–60    Agents → Multi-agent → Flagship build & ship
Month 3 · Days 61–90    Specialisation → Narrative → Applications (Day 75+)
```

*Experience compression is real — a typical engineer spends Month 1 just getting Python comfortable. You'll clear that in Week 1 and be building by Week 2. The time savings go into deeper projects.*