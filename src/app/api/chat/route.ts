import { streamText, convertToModelMessages } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { retrieve, buildContext } from "@/lib/retrieval";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const lastUserMessage = messages.findLast(
    (m: { role: string }) => m.role === "user"
  );
  const query =
    lastUserMessage?.parts?.find((p: { type: string }) => p.type === "text")
      ?.text ?? "";

  let context = "";
  try {
    const chunks = await retrieve(query, 5);
    context = buildContext(chunks);
  } catch {
    // DB unavailable — proceed without context
  }

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: `You are a helpful assistant that answers questions about code and documentation.
Answer based on the provided context. If the context doesn't contain enough information, say so clearly.

Context:
${context}`,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
