"use client";

import type { UIMessage } from "ai";
import { useState, useSyncExternalStore } from "react";
import { useChat } from "@ai-sdk/react";
import type { ChatUsageMetadata } from "@/lib/chat-prompt";

function useIsHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ChatInterface() {
  const isHydrated = useIsHydrated();
  const [input, setInput] = useState("");
  const [tokenCount, setTokenCount] = useState<number | null>(null);
  const [isCounting, setIsCounting] = useState(false);
  const { messages, status, sendMessage } = useChat<UIMessage<ChatUsageMetadata>>();

  const isLoading = status === "streaming" || status === "submitted";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setTokenCount(null);
    sendMessage({ text });
  };

  const handleCountTokens = async () => {
    const text = input.trim();
    if (!text) return;
    setIsCounting(true);
    try {
      const res = await fetch("/api/count-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, draft: text }),
      });

      if (!res.ok) {
        setTokenCount(null);
        return;
      }

      const data = await res.json();
      setTokenCount(data.inputTokens ?? null);
    } finally {
      setIsCounting(false);
    }
  };

  if (!isHydrated) {
    return (
      <div
        style={{
          minHeight: "400px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "1rem",
          background: "#fff",
          color: "#9ca3af",
          fontSize: "0.875rem",
        }}
      >
        Loading chat...
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div
        style={{
          minHeight: "400px",
          maxHeight: "600px",
          overflowY: "auto",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "1rem",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
            Ask a question about your codebase or documentation...
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              padding: "0.75rem",
              borderRadius: "6px",
              background: m.role === "user" ? "#f3f4f6" : "#eff6ff",
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                color: "#6b7280",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              {m.role === "user" ? "You" : "Assistant"}
            </span>
            {m.parts
              .filter((part) => part.type === "text")
              .map((part, i) => (
                <span key={i}>{(part as { type: "text"; text: string }).text}</span>
              ))}
            {m.role === "assistant" && m.metadata && (
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#9ca3af",
                  display: "block",
                  marginTop: "0.375rem",
                }}
              >
                {m.metadata.inputTokens ?? 0} in · {m.metadata.outputTokens ?? 0} out
              </span>
            )}
          </div>
        ))}
        {isLoading && (
          <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>Thinking...</p>
        )}
        {status === "error" && (
          <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>Error occurred</p>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value); setTokenCount(null); }}
            placeholder="Ask about your codebase..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: "0.625rem 0.875rem",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
          <button
            type="button"
            onClick={handleCountTokens}
            disabled={isLoading || isCounting || !input.trim()}
            style={{
              padding: "0.625rem 1rem",
              background: "#fff",
              color: "#374151",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              fontSize: "0.9rem",
              cursor: "pointer",
              opacity: isLoading || isCounting || !input.trim() ? 0.5 : 1,
              whiteSpace: "nowrap",
            }}
          >
            {isCounting ? "Counting…" : "Count tokens"}
          </button>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            style={{
              padding: "0.625rem 1.25rem",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "0.9rem",
              cursor: "pointer",
              opacity: isLoading || !input.trim() ? 0.5 : 1,
            }}
          >
            Send
          </button>
        </div>
        {tokenCount !== null && (
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280" }}>
            {tokenCount} input token{tokenCount === 1 ? "" : "s"}
          </p>
        )}
      </form>
    </div>
  );
}
