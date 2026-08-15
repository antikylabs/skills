/**
 * `Reflect.apply` calls a function the type system cannot follow.
 */

import { advice } from "../shared.mjs";

const isReflect = (callee, member) =>
  callee.type === "MemberExpression" &&
  !callee.computed &&
  callee.object.type === "Identifier" &&
  callee.object.name === "Reflect" &&
  callee.property.type === "Identifier" &&
  callee.property.name === member;

export default {
  meta: { docs: { description: "Disallow Reflect.apply, which calls past the type system." } },
  create(context) {
    return {
      CallExpression(node) {
        if (!isReflect(node.callee, "apply")) return;
        context.report({
          node,
          message: advice(
            "`Reflect.apply` calls a function the type system cannot check.",
            "call the function directly, or narrow it to a signature first.",
            "do not wrap it in a helper — the hole moves, it does not close.",
          ),
        });
      },
    };
  },
};
