import OpenAI from "openai";

const EMBEDDING_MODEL = "text-embedding-3-small";

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function embed(text: string): Promise<number[]> {
  const response = await getOpenAIClient().embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  });
  return response.data[0].embedding;
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  const response = await getOpenAIClient().embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
  });
  return response.data.map((d) => d.embedding);
}
