/**
 * Spreading an empty object to omit a field makes the field's presence invisible
 * to the type. The type says optional; the code says conditional; nothing
 * connects the two.
 */

import { advice } from "../shared.mjs";

const isEmptyObject = (node) =>
  node && node.type === "ObjectExpression" && (node.properties ?? []).length === 0;

export default {
  meta: { docs: { description: "Disallow conditional spreads that fall back to an empty object." } },
  create(context) {
    return {
      SpreadElement(node) {
        let argument = node.argument;
        while (argument && argument.type === "ParenthesizedExpression") argument = argument.expression;
        if (!argument || argument.type !== "ConditionalExpression") return;
        if (!isEmptyObject(argument.consequent) && !isEmptyObject(argument.alternate)) return;
        context.report({
          node,
          message: advice(
            "Spreading an empty object hides whether the field is there at all.",
            "make the field optional in the type and set it explicitly to `undefined` when it does not apply.",
            "do not nest the conditional deeper — the type still cannot see which branch ran.",
          ),
        });
      },
    };
  },
};
