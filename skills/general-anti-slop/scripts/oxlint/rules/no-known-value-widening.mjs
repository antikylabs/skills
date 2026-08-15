/**
 * An explicit top-type annotation that throws away evidence the value carries.
 *
 *   const config: unknown = { host: "localhost" };
 *
 * The initialiser says exactly what this is. The annotation says nothing, and
 * every later use has to re-establish what was already known here.
 */

import { advice, isTopType } from "../shared.mjs";

/** An initialiser whose type is evident from the expression itself. */
const KNOWN = new Set([
  "ObjectExpression",
  "ArrayExpression",
  "Literal",
  "TemplateLiteral",
  "ArrowFunctionExpression",
  "FunctionExpression",
  "ClassExpression",
  "NewExpression",
]);

export function isKnownValue(node) {
  if (!node) return false;
  let current = node;
  while (current.type === "ParenthesizedExpression") current = current.expression;
  if (current.type === "TSAsExpression") return isKnownValue(current.expression);
  if (current.type === "UnaryExpression") return isKnownValue(current.argument);
  return KNOWN.has(current.type);
}

export default {
  meta: { docs: { description: "Disallow widening a known value to unknown or any." } },
  create(context) {
    return {
      VariableDeclarator(node) {
        const annotation = node.id && node.id.typeAnnotation && node.id.typeAnnotation.typeAnnotation;
        if (!annotation || !isTopType(annotation)) return;
        if (!isKnownValue(node.init)) return;
        context.report({
          node,
          message: advice(
            "This annotation discards what the initialiser already establishes.",
            "annotate the type the value actually has, or drop the annotation and let it be inferred.",
            "do not assert it back later — that is the widening and the undo, in two places.",
          ),
        });
      },
    };
  },
};
