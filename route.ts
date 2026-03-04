import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { retrieve, buildContext } from "@/lib/retrieval";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Use the last user message as the retrieval query
  const lastUserMessage = messages.findLast(
    (m: { role: string }) => m.role === "user"
  );
  const query = lastUserMessage?.content ?? "";

  // Retrieve relevant context from pgvector
  const chunks = await retrieve(query, 5);
  const context = buildContext(chunks);

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: `You are a helpful assistant that answers questions about code and documentation.
Answer based on the provided context. If the context doesn't contain enough information, say so clearly.

Context:
${context}`,
    messages,
  });

  return result.toDataStreamResponse();
}
