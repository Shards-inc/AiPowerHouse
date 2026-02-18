import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { describe, expect, it } from "vitest";
import { findInlineScriptBlock } from "./helpers/scriptBlocks";

class MockClassList {
  private readonly values = new Set<string>();

  toggle(value: string, force?: boolean): void {
    if (force === true) {
      this.values.add(value);
      return;
    }

    if (force === false) {
      this.values.delete(value);
      return;
    }

    if (this.values.has(value)) {
      this.values.delete(value);
    } else {
      this.values.add(value);
    }
  }

  contains(value: string): boolean {
    return this.values.has(value);
  }
}

class MockCard {
  readonly classList = new MockClassList();

  constructor(
    readonly dataset: { model: string; capability: string },
    readonly title: string
  ) {}
}

class MockInput {
  value = "";
  private readonly handlers: Array<() => void> = [];

  addEventListener(type: string, handler: () => void): void {
    if (type === "input") {
      this.handlers.push(handler);
    }
  }

  trigger(): void {
    for (const handler of this.handlers) {
      handler();
    }
  }
}

class MockButton {
  textContent = "Filter: All";
  private readonly handlers: Array<() => void> = [];

  addEventListener(type: string, handler: () => void): void {
    if (type === "click") {
      this.handlers.push(handler);
    }
  }

  click(): void {
    for (const handler of this.handlers) {
      handler();
    }
  }
}

class MockText {
  textContent = "";
}

class MockEmptyState {
  readonly classList = new MockClassList();

  constructor() {
    this.classList.toggle("hidden", true);
  }
}

/**
 * Creates a narrow DOM mock to execute roster filtering logic.
 */
const createRuntimeHarness = () => {
  const cards = [
    new MockCard({ model: "chatgpt", capability: "Primary" }, "ChatGPT"),
    new MockCard({ model: "gemini", capability: "Multimodal" }, "Gemini"),
    new MockCard({ model: "mistral", capability: "Efficient" }, "Mistral")
  ];

  const searchInput = new MockInput();
  const filterButton = new MockButton();
  const resultCount = new MockText();
  const emptyState = new MockEmptyState();

  const document = {
    getElementById(id: string): unknown {
      if (id === "model-search") return searchInput;
      if (id === "capability-filter") return filterButton;
      if (id === "model-result-count") return resultCount;
      if (id === "model-empty-state") return emptyState;
      return undefined;
    },
    querySelectorAll(selector: string): MockCard[] {
      return selector === ".model-card" ? cards : [];
    }
  };

  return { cards, searchInput, filterButton, resultCount, emptyState, document };
};

/**
 * Extracts and executes the inline UI script against a mocked runtime document.
 */
const executeUiScript = async (document: unknown): Promise<void> => {
  const markup = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const block = findInlineScriptBlock(markup, [
    "model-search",
    "capability-filter",
    "searchInput.addEventListener"
  ]);

  if (!block) {
    throw new Error("Expected roster runtime script block was not found in index.html");
  }

  const executable = block;
  vm.runInNewContext(executable, {
    document,
    Array,
    Set,
    Boolean,
    console,
    HTMLInputElement: MockInput,
    HTMLButtonElement: MockButton
  });
};

describe("UI runtime filtering logic", () => {
  it("updates visible cards and result count when searching", async () => {
    const harness = createRuntimeHarness();
    await executeUiScript(harness.document);

    harness.searchInput.value = "mi";
    harness.searchInput.trigger();

    const visibleCards = harness.cards.filter((card) => !card.classList.contains("hidden"));
    expect(visibleCards.map((card) => card.title)).toEqual(["Gemini", "Mistral"]);
    expect(harness.resultCount.textContent).toBe("2 models shown");
    expect(harness.emptyState.classList.contains("hidden")).toBe(true);
  });

  it("cycles capability filters and shows empty state for misses", async () => {
    const harness = createRuntimeHarness();
    await executeUiScript(harness.document);

    harness.filterButton.click();
    expect(harness.filterButton.textContent).toBe("Filter: Primary");
    expect(harness.cards.filter((card) => !card.classList.contains("hidden")).length).toBe(1);

    harness.searchInput.value = "zzz";
    harness.searchInput.trigger();

    expect(harness.cards.filter((card) => !card.classList.contains("hidden")).length).toBe(0);
    expect(harness.resultCount.textContent).toBe("0 models shown");
    expect(harness.emptyState.classList.contains("hidden")).toBe(false);
  });
});
