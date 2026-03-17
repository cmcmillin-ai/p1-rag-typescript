import { pool } from "./db";
import { embed } from "./embeddings";

export interface RetrievedChunk {
  id: number;
  content: string;
  source: string;
  similarity: number;
}

/**
 * Retrieve top-k most similar chunks using cosine similarity.
 *
 * Embeds the input query and searches the documents table for the most
 * semantically similar chunks using pgvector's cosine distance operator (<=>).
 * Returns chunks ranked by similarity score (1.0 = identical, 0.0 = orthogonal).
 *
 * @param query - The user's search query
 * @param topK - Number of chunks to retrieve (default: 5)
 * @returns Array of retrieved chunks with content, source, and similarity scores
 */
export async function retrieve(
  query: string,
  topK = 5
): Promise<RetrievedChunk[]> {
  const queryEmbedding = await embed(query);

  const result = await pool.query(
    `SELECT id, content, source,
            1 - (embedding <=> $1::vector) AS similarity
     FROM documents
     ORDER BY embedding <=> $1::vector
     LIMIT $2`,
    [JSON.stringify(queryEmbedding), topK]
  );

  return result.rows as RetrievedChunk[];
}

/**
 * Build a context string from retrieved chunks for injection into the prompt.
 *
 * Formats retrieved chunks into a structured context block that includes
 * source attribution and similarity scores. This context is prepended to
 * the system prompt when calling the LLM, grounding the response in
 * retrieved documents.
 *
 * @param chunks - Array of retrieved chunks with content and metadata
 * @returns Formatted context string ready for prompt injection
 */
export function buildContext(chunks: RetrievedChunk[]): string {
  return chunks
    .map(
      (c, i) =>
        `[Source ${i + 1}: ${c.source} (similarity: ${c.similarity.toFixed(3)})]\n${c.content}`
    )
    .join("\n\n---\n\n");
}
