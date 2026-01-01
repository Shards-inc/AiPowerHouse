import { describe, it, expect } from "vitest";
import { AI_MODELS } from "../models.js";

describe("AI_MODELS", () => {
  it("contains all expected models", () => {
    const expectedModelNames = [
      "ChatGPT",
      "Claude",
      "Gemini",
      "Grok",
      "Co Pilot",
      "Meta AI",
      "Manus AI",
      "Kimi",
      "Qwen",
      "DeepSeek",
      "Minimax",
      "Genspark",
      "Perplexity",
      "Mistral"
    ];

    const modelNames = AI_MODELS.map((model) => model.name);
    expectedModelNames.forEach((name) => {
      expect(modelNames).toContain(name);
    });
  });

  it("all models have required properties", () => {
    AI_MODELS.forEach((model) => {
      expect(model).toHaveProperty("id");
      expect(model).toHaveProperty("name");
      expect(model).toHaveProperty("description");
      expect(model).toHaveProperty("status");
      expect(model).toHaveProperty("reliability");
      expect(model).toHaveProperty("latency");
      expect(model).toHaveProperty("badgeColor");
    });
  });

  it("all models have valid reliability scores", () => {
    AI_MODELS.forEach((model) => {
      expect(model.reliability).toBeGreaterThanOrEqual(0);
      expect(model.reliability).toBeLessThanOrEqual(100);
    });
  });

  it("all models have valid latency values", () => {
    AI_MODELS.forEach((model) => {
      expect(model.latency).toBeGreaterThan(0);
    });
  });

  it("all models have unique IDs", () => {
    const ids = AI_MODELS.map((model) => model.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
