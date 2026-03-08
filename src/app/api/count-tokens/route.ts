import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import {
  buildSystemPrompt,
  toAnthropicCountMessages,
  type ChatRequestMessage,
} from "@/lib/chat-prompt";

export const runtime = "nodejs";

function getAnthropicClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }

  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

export async function POST(req: Request) {
  const {
    messages = [],
    draft,
  }: { messages?: ChatRequestMessage[]; draft?: string } = await req.json();

  const text = draft?.trim();

  if (!Array.isArray(messages) || !text) {
    return NextResponse.json(
      { error: "messages array and draft are required" },
      { status: 400 }
    );
  }

  const messagesWithDraft: ChatRequestMessage[] = [
    ...messages,
    {
      role: "user",
      parts: [{ type: "text", text }],
    },
  ];

  const systemPrompt = await buildSystemPrompt(messagesWithDraft);

  const response = await getAnthropicClient().messages.countTokens({
    model: "claude-sonnet-4-6",
    system: systemPrompt,
    messages: toAnthropicCountMessages(messagesWithDraft),
  });

  return NextResponse.json({ inputTokens: response.input_tokens });
}
