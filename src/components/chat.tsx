"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

export function ChatInterface() {
  const [input, setInput] = useState("");
  const { messages, status, sendMessage } = useChat();

  const isLoading = status === "streaming" || status === "submitted";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    sendMessage({ text });
  };

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
          </div>
        ))}
        {isLoading && (
          <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>Thinking...</p>
        )}
        {status === "error" && (
          <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>Error occurred</p>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
      </form>
    </div>
  );
}
