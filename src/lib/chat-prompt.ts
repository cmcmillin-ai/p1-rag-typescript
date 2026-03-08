import { buildContext, retrieve } from "@/lib/retrieval";

import type { UIMessage } from "ai";

const QUERY_LOG_PREVIEW_LENGTH = 200;

function getQueryPreview(query: string): string {
  const normalizedQuery = query.replace(/\s+/g, " ").trim();

  if (normalizedQuery.length <= QUERY_LOG_PREVIEW_LENGTH) {
    return normalizedQuery;
  }

  return `${normalizedQuery.slice(0, QUERY_LOG_PREVIEW_LENGTH)}...`;
}

export interface ChatRequestPart {
  type: string;
  text?: string;
}

export interface ChatRequestMessage {
  role: string;
  parts?: ChatRequestPart[];
}

export interface ChatUsageMetadata {
  inputTokens?: number;
  outputTokens?: number;
}

export type ChatUIMessage = UIMessage<ChatUsageMetadata>;

function getTextFromMessage(message: ChatRequestMessage): string {
  return (
    message.parts
      ?.filter((part) => part.type === "text")
      .map((part) => part.text ?? "")
      .join("\n\n") ?? ""
  );
}

export function getLastUserQuery(messages: ChatRequestMessage[]): string {
  const lastUserMessage = messages.findLast((message) => message.role === "user");
  return lastUserMessage ? getTextFromMessage(lastUserMessage) : "";
}

export async function buildSystemPrompt(messages: ChatRequestMessage[]): Promise<string> {
  const query = getLastUserQuery(messages);
  const startedAt = Date.now();

  console.info("Building system prompt", {
    messageCount: messages.length,
    hasQuery: query.trim().length > 0,
    queryPreview: getQueryPreview(query),
  });

  let context = "";
  try {
    const chunks = await retrieve(query, 5);
    context = buildContext(chunks);

    console.info("System prompt retrieval complete", {
      chunkCount: chunks.length,
      contextLength: context.length,
      durationMs: Date.now() - startedAt,
    });
  } catch (err) {
    console.error("Retrieval failed:", err);
  }

  console.info("System prompt ready", {
    usedRetrievedContext: context.length > 0,
    durationMs: Date.now() - startedAt,
  });

  return context
    ? `You are a helpful assistant that answers questions about code and documentation.
Answer based on the provided context. If the context doesn't contain enough information, say so clearly.

Context:
${context}`
    : `You are a helpful assistant that answers questions about code and documentation.
No relevant documents were found for this query. Let the user know their question couldn't be matched to any ingested content, and suggest they run the ingest script if documents haven't been loaded yet.`;
}

export function toAnthropicCountMessages(messages: ChatRequestMessage[]) {
  return messages
    .filter(
      (message): message is ChatRequestMessage & { role: "user" | "assistant" } =>
        message.role === "user" || message.role === "assistant"
    )
    .map((message) => ({
      role: message.role,
      content: getTextFromMessage(message),
    }))
    .filter((message) => message.content.trim().length > 0);
}