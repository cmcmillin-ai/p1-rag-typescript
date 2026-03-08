import { streamText, convertToModelMessages } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import {
  buildSystemPrompt,
  type ChatUIMessage,
} from "@/lib/chat-prompt";
import { getAnthropicModelName, getChatTemperature } from "@/lib/model-config";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { messages }: { messages: ChatUIMessage[] } = await req.json();

  const systemPrompt = await buildSystemPrompt(messages);
  
  // convertToModelMessages adapts UI-shaped chat history into the provider-ready
  // message format expected by streamText and the underlying model SDK.
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic(getAnthropicModelName()),
    system: systemPrompt,
    messages: modelMessages,
    temperature: getChatTemperature(),
  });

  // toUIMessageStreamResponse turns the streaming model result back into the
  // UI message protocol that useChat consumes on the client, including metadata.
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
