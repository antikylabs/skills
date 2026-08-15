/**
 * An `unknown` parameter accepts anything and makes the body re-derive what it got.
 */

import { advice, isTopType } from "../shared.mjs";

export default {
  meta: { docs: { description: "Disallow parameters annotated as unknown or any." } },
  create(context) {
    const check = (node) => {
      for (const parameter of node.params ?? []) {
        const target =
          parameter.type === "AssignmentPattern" ? parameter.left
          : parameter.type === "RestElement" ? parameter.argument
          : parameter;
        const annotation = target && target.typeAnnotation && target.typeAnnotation.typeAnnotation;
        if (!annotation || !isTopType(annotation)) continue;
        context.report({
          node: target,
          message: advice(
            "This parameter accepts anything, so the body has to re-derive what it was given.",
            "take the type the caller already has, and validate at the entry point instead.",
            "do not widen the caller to match — the evidence exists at the call site, keep it.",
          ),
        });
      }
    };
    return {
      FunctionDeclaration: check,
      FunctionExpression: check,
      ArrowFunctionExpression: check,
      TSDeclareFunction: check,
    };
  },
};
