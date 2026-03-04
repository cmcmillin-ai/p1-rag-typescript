import { pool } from "./db";
import { embedBatch } from "./embeddings";

export interface Chunk {
  content: string;
  source: string;
}

/**
 * Split text into overlapping fixed-size chunks.
 * chunkSize and overlap are in characters.
 */
export function chunkText(
  text: string,
  source: string,
  chunkSize = 1000,
  overlap = 200
): Chunk[] {
  const chunks: Chunk[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push({ content: text.slice(start, end), source });
    if (end === text.length) break;
    start += chunkSize - overlap;
  }

  return chunks;
}

/**
 * Embed a batch of chunks and upsert into pgvector.
 */
export async function ingestChunks(chunks: Chunk[]): Promise<void> {
  if (chunks.length === 0) return;

  const texts = chunks.map((c) => c.content);
  const embeddings = await embedBatch(texts);

  const client = await pool.connect();
  try {
    for (let i = 0; i < chunks.length; i++) {
      await client.query(
        "INSERT INTO documents (content, source, embedding) VALUES ($1, $2, $3)",
        [chunks[i].content, chunks[i].source, JSON.stringify(embeddings[i])]
      );
    }
    console.log(`Ingested ${chunks.length} chunks`);
  } finally {
    client.release();
  }
}
