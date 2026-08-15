/**
 * A type assertion claims the compiler is wrong, with nothing recorded about why.
 *
 * The rule never forbids asserting. It requires the reason, because an assertion
 * nobody can evaluate is one nobody will ever remove. `as const` is exempt: it
 * narrows rather than claiming.
 */

import { advice, unwrapType } from "../shared.mjs";

const MINIMUM_WORDS = 3;

const isConstAssertion = (type) => {
  const t = unwrapType(type);
  return !!t && t.type === "TSTypeReference" && t.typeName && t.typeName.name === "const";
};

export default {
  meta: { docs: { description: "Require a comment explaining each type assertion." } },
  create(context) {
    const source = context.sourceCode;
    let commentLines = null;

    const explained = (line) => {
      if (commentLines === null) {
        commentLines = new Set();
        for (const comment of source.getAllComments()) {
          const words = comment.value.replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter((w) => w.length > 1);
          if (words.length < MINIMUM_WORDS) continue;
          for (let l = comment.loc.start.line; l <= comment.loc.end.line; l += 1) commentLines.add(l);
        }
      }
      return commentLines.has(line) || commentLines.has(line - 1);
    };

    return {
      TSAsExpression(node) {
        if (isConstAssertion(node.typeAnnotation)) return;
        const line = node.loc && node.loc.start.line;
        if (line === undefined || explained(line)) return;
        context.report({
          node,
          message: advice(
            "This assertion claims the compiler is wrong and records nothing about why.",
            `put a comment above it saying what you know that the compiler does not, in at least ${MINIMUM_WORDS} words.`,
            "do not delete the assertion and widen the declared type instead — that spreads the claim rather than documenting it.",
          ),
        });
      },
    };
  },
};
