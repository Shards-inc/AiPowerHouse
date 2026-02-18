/**
 * Returns all inline script blocks from HTML markup.
 */
export const extractInlineScriptBlocks = (markup: string): string[] => {
  const blocks: string[] = [];
  const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

  let match = scriptPattern.exec(markup);
  while (match) {
    const attributes = match[1] ?? "";
    const body = (match[2] ?? "").trim();
    const isInline = !/\bsrc\s*=/.test(attributes);

    if (isInline && body.length > 0) {
      blocks.push(body);
    }

    match = scriptPattern.exec(markup);
  }

  return blocks;
};

/**
 * Finds the first inline script block that contains every provided token.
 */
export const findInlineScriptBlock = (
  markup: string,
  requiredTokens: string[]
): string | undefined => {
  const blocks = extractInlineScriptBlocks(markup);

  return blocks.find((block) => requiredTokens.every((token) => block.includes(token)));
};
