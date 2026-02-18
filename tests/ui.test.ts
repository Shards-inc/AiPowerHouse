import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const MODEL_LABELS = [
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

/**
 * Loads the UI markup for validation.
 */
const loadMarkup = async (): Promise<string> => {
  return readFile(new URL("../index.html", import.meta.url), "utf8");
};

describe("UI shell", () => {
  it("includes all required model cards", async () => {
    const markup = await loadMarkup();

    for (const label of MODEL_LABELS) {
      expect(markup).toContain(label);
    }
  });

  it("includes searchable and filterable model roster controls", async () => {
    const markup = await loadMarkup();

    expect(markup).toContain('id="model-search"');
    expect(markup).toContain('id="capability-filter"');
    expect(markup).toContain('id="model-result-count"');
    expect(markup).toContain('id="model-empty-state"');
    expect(markup).toContain("searchInput.addEventListener");
    expect(markup).toContain("filterButton.addEventListener");
  });
});
