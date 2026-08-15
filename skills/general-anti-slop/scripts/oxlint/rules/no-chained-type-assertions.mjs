/**
 * A chained assertion tells the compiler to stop checking, twice.
 *
 * `payload as unknown as User` launders a value through a top type so the second
 * assertion has nothing left to object to. It is the shape a cast takes when the
 * direct cast would not compile.
 */

import { advice, unwrapType } from "../shared.mjs";

const ASSERTION = new Set(["TSAsExpression", "TSTypeAssertion"]);

export default {
  meta: { docs: { description: "Disallow a type assertion applied to another type assertion." } },
  create(context) {
    return {
      TSAsExpression(node) {
        let inner = node.expression;
        while (inner && inner.type === "ParenthesizedExpression") inner = inner.expression;
        if (!inner || !ASSERTION.has(inner.type)) return;

        const through = unwrapType(inner.typeAnnotation);
        const laundered =
          through && (through.type === "TSUnknownKeyword" || through.type === "TSAnyKeyword");
        context.report({
          node,
          message: advice(
            laundered
              ? "This assertion launders the value through a top type so the second one cannot fail."
              : "This is a type assertion applied to another type assertion.",
            "parse or validate the value at the boundary and return the type you actually have.",
            "do not split it across two statements — the same evidence is discarded either way.",
          ),
        });
      },
    };
  },
};
