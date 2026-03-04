import { ChatInterface } from "@/components/chat";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-2">Code Doc Search</h1>
        <p className="text-gray-500 mb-8 text-sm">
          RAG over your codebase and documentation — powered by Anthropic +
          pgvector
        </p>
        <ChatInterface />
      </div>
    </main>
  );
}
