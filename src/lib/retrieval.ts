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
 */
export function buildContext(chunks: RetrievedChunk[]): string {
  return chunks
    .map(
      (c, i) =>
        `[Source ${i + 1}: ${c.source} (similarity: ${c.similarity.toFixed(3)})]\n${c.content}`
    )
    .join("\n\n---\n\n");
}
