const DEFAULT_ANTHROPIC_MODEL = "claude-sonnet-4-6";

export function getAnthropicModelName(): string {
  const modelName = process.env.ANTHROPIC_MODEL?.trim();

  return modelName || DEFAULT_ANTHROPIC_MODEL;
}

export function getChatTemperature(): number | undefined {
  const rawTemperature = process.env.CHAT_TEMPERATURE?.trim();

  if (!rawTemperature) {
    return undefined;
  }

  const temperature = Number(rawTemperature);

  if (!Number.isFinite(temperature)) {
    throw new Error("CHAT_TEMPERATURE must be a valid number");
  }

  return temperature;
}