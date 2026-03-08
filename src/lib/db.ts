import { Pool } from "pg";

let poolInstance: Pool | undefined;

function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  if (!poolInstance) {
    poolInstance = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  return poolInstance;
}

/**
 * Initialise pgvector extension and documents table.
 * Safe to call multiple times — uses IF NOT EXISTS.
 */
export async function initDb() {
  const client = await getPool().connect();
  try {
    await client.query("CREATE EXTENSION IF NOT EXISTS vector");
    await client.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id        SERIAL PRIMARY KEY,
        content   TEXT NOT NULL,
        source    TEXT NOT NULL,
        embedding vector(1536)
      )
    `);
    await client.query(
      "CREATE INDEX IF NOT EXISTS documents_embedding_idx ON documents USING ivfflat (embedding vector_cosine_ops)"
    );
    console.log("Database initialised");
  } finally {
    client.release();
  }
}

export const pool = new Proxy({} as Pool, {
  get(_target, prop) {
    const currentPool = getPool();
    const value = Reflect.get(currentPool, prop, currentPool);
    return typeof value === "function" ? value.bind(currentPool) : value;
  },
});
