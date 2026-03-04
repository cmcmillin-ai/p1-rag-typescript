import { NextResponse } from "next/server";
import { chunkText, ingestChunks } from "@/lib/ingest";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { text, source } = await req.json();

  if (!text || !source) {
    return NextResponse.json(
      { error: "text and source are required" },
      { status: 400 }
    );
  }

  const chunks = chunkText(text, source);
  await ingestChunks(chunks);

  return NextResponse.json({ chunksIngested: chunks.length });
}
