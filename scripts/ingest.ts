/**
 * Ingestion script — run with: npm run ingest
 *
 * Reads all .md and .txt files from the /docs directory,
 * chunks them, embeds them, and stores in pgvector.
 *
 * Usage:
 *   npm run ingest
 */
import fs from "fs";
import path from "path";
import { initDb } from "../src/lib/db";
import { chunkText, ingestChunks } from "../src/lib/ingest";

const DOCS_DIR = path.join(process.cwd(), "docs");
const SUPPORTED_EXTENSIONS = [".md", ".txt", ".ts", ".js"];

async function run() {
  await initDb();

  const files = fs
    .readdirSync(DOCS_DIR)
    .filter((f) => SUPPORTED_EXTENSIONS.includes(path.extname(f)));

  if (files.length === 0) {
    console.log(`No supported files found in ${DOCS_DIR}`);
    console.log(`Add .md, .txt, .ts, or .js files to the /docs folder`);
    process.exit(0);
  }

  for (const file of files) {
    const filePath = path.join(DOCS_DIR, file);
    const text = fs.readFileSync(filePath, "utf-8");
    const chunks = chunkText(text, file);
    console.log(`Processing ${file} → ${chunks.length} chunks`);
    await ingestChunks(chunks);
  }

  console.log("Ingestion complete");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
