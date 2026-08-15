/**
 * `Reflect.get` reads a property the type system cannot check.
 */

import { advice } from "../shared.mjs";

export default {
  meta: { docs: { description: "Disallow Reflect.get, which reads past the type system." } },
  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;
        if (
          callee.type !== "MemberExpression" ||
          callee.computed ||
          callee.object.type !== "Identifier" ||
          callee.object.name !== "Reflect" ||
          callee.property.type !== "Identifier" ||
          callee.property.name !== "get"
        ) {
          return;
        }
        context.report({
          node,
          message: advice(
            "`Reflect.get` reads a property the type system cannot check.",
            "access the property directly, or narrow the object before reading it.",
            "do not assert the result back to the type you wanted — that is the same gap with a label on it.",
          ),
        });
      },
    };
  },
};
