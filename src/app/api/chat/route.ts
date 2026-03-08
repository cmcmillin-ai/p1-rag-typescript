import { streamText, convertToModelMessages } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import {
  buildSystemPrompt,
  type ChatUIMessage,
} from "@/lib/chat-prompt";

export const runtime = "nodejs";

function getChatTemperature(): number | undefined {
  const rawTemperature = process.env.CHAT_TEMPERATURE?.trim();

  if (!rawTemperature) {
    return undefined;
  }

  const temperature = Number(rawTemperature);

  if (!Number.isFinite(temperature)) {
    throw new Error("CHAT_TEMPERATURE must be a valid number");
  }

  return temperature;
}

export async function POST(req: Request) {
  const { messages }: { messages: ChatUIMessage[] } = await req.json();

  const systemPrompt = await buildSystemPrompt(messages);

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    temperature: getChatTemperature(),
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    messageMetadata: ({ part }) => {
      if (part.type === "finish") {
        return {
          inputTokens: part.totalUsage.inputTokens,
          outputTokens: part.totalUsage.outputTokens,
        };
      }
    },
  });
}
