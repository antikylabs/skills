/**
 * A `typeof` check narrows a representation without establishing a contract.
 *
 * Allowed inside a type guard — a function whose return type is a predicate —
 * because that is where the narrowing is being turned into a named contract
 * rather than used in place of one.
 */

import { advice, enclosingFunction } from "../shared.mjs";

const COMPARISON = new Set(["==", "===", "!=", "!=="]);

export default {
  meta: { docs: { description: "Disallow ad hoc typeof narrowing outside a type guard." } },
  create(context) {
    const insideTypeGuard = (node) => {
      const fn = enclosingFunction(node);
      return !!fn && !!fn.returnType && fn.returnType.typeAnnotation.type === "TSTypePredicate";
    };

    return {
      UnaryExpression(node) {
        if (node.operator !== "typeof") return;
        const parent = node.parent;
        if (!parent || parent.type !== "BinaryExpression" || !COMPARISON.has(parent.operator)) return;
        if (insideTypeGuard(node)) return;
        context.report({
          node: parent,
          message: advice(
            "This `typeof` check narrows a representation without establishing what the value is.",
            "parse the value at its boundary and branch on the domain type instead.",
            "do not add more `typeof` branches — each one re-derives what a parser would have settled once.",
          ),
        });
      },
    };
  },
};
