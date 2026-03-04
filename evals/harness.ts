/**
 * Eval harness — run with: npm run evals
 *
 * Loads test cases from evals/datasets/sample.json,
 * runs each query through the RAG pipeline, and scores results.
 *
 * Metrics:
 *   - Retrieval hit rate: did the right source appear in top-k?
 *   - Answer relevancy: does the answer address the question? (LLM-as-judge)
 *
 * Extend this with RAGAS metrics in Week 4.
 */
import Anthropic from "@anthropic-ai/sdk";
import { retrieve } from "../src/lib/retrieval";
import testCases from "./datasets/sample.json";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface TestCase {
  query: string;
  expectedSource: string;
  expectedTopics: string[];
}

interface EvalResult {
  query: string;
  retrievalHit: boolean;
  answerRelevant: boolean;
  topSources: string[];
}

async function scoreRelevancy(
  query: string,
  answer: string,
  expectedTopics: string[]
): Promise<boolean> {
  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 10,
    messages: [
      {
        role: "user",
        content: `Does this answer address the query and cover these topics: ${expectedTopics.join(", ")}?

Query: ${query}
Answer: ${answer}

Reply with only "yes" or "no".`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  return text.toLowerCase().trim().startsWith("yes");
}

async function runEvals() {
  console.log(`Running ${testCases.length} eval cases...\n`);

  const results: EvalResult[] = [];

  for (const tc of testCases as TestCase[]) {
    const chunks = await retrieve(tc.query, 5);
    const topSources = chunks.map((c) => c.source);

    const retrievalHit = topSources.some((s) =>
      s.includes(tc.expectedSource)
    );

    const context = chunks.map((c) => c.content).join("\n\n");
    const answerResponse = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `Answer this question using the context below.\n\nContext:\n${context}\n\nQuestion: ${tc.query}`,
        },
      ],
    });

    const answer =
      answerResponse.content[0].type === "text"
        ? answerResponse.content[0].text
        : "";

    const answerRelevant = await scoreRelevancy(
      tc.query,
      answer,
      tc.expectedTopics
    );

    results.push({ query: tc.query, retrievalHit, answerRelevant, topSources });

    console.log(`Query: ${tc.query}`);
    console.log(`  Retrieval hit: ${retrievalHit ? "✅" : "❌"}`);
    console.log(`  Answer relevant: ${answerRelevant ? "✅" : "❌"}`);
    console.log(`  Top sources: ${topSources.slice(0, 3).join(", ")}\n`);
  }

  const retrievalScore =
    results.filter((r) => r.retrievalHit).length / results.length;
  const relevancyScore =
    results.filter((r) => r.answerRelevant).length / results.length;

  console.log("─────────────────────────────");
  console.log(`Retrieval hit rate:  ${(retrievalScore * 100).toFixed(1)}%`);
  console.log(`Answer relevancy:    ${(relevancyScore * 100).toFixed(1)}%`);
  console.log("─────────────────────────────");

  // Fail CI if scores fall below thresholds
  const RETRIEVAL_THRESHOLD = 0.7;
  const RELEVANCY_THRESHOLD = 0.7;

  if (
    retrievalScore < RETRIEVAL_THRESHOLD ||
    relevancyScore < RELEVANCY_THRESHOLD
  ) {
    console.error("\nEval thresholds not met — failing CI");
    process.exit(1);
  }

  console.log("\nAll evals passed ✅");
  process.exit(0);
}

runEvals().catch((err) => {
  console.error(err);
  process.exit(1);
});
