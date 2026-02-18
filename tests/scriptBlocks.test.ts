import { describe, expect, it } from "vitest";
import { extractInlineScriptBlocks, findInlineScriptBlock } from "./helpers/scriptBlocks";

describe("script block helper", () => {
  it("extracts inline scripts and ignores external script tags", () => {
    const markup = `
      <script src="https://cdn.example.com/lib.js"></script>
      <script>console.log("a")</script>
      <script type="module">console.log("b")</script>
    `;

    expect(extractInlineScriptBlocks(markup)).toEqual(['console.log("a")', 'console.log("b")']);
  });

  it("finds a block that contains all required tokens", () => {
    const markup = `
      <script>const alpha = 1;</script>
      <script>
        const searchInput = document.getElementById("model-search");
        searchInput?.addEventListener("input", () => undefined);
      </script>
    `;

    const block = findInlineScriptBlock(markup, ["model-search", "addEventListener"]);
    expect(block).toContain("model-search");
    expect(block).toContain("addEventListener");
  });
});
