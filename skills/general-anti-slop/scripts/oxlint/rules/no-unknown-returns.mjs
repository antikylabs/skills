/**
 * A function returning `unknown` moves the parsing onto every caller.
 */

import { advice, isTopType } from "../shared.mjs";

export default {
  meta: { docs: { description: "Disallow functions annotated as returning unknown or any." } },
  create(context) {
    const check = (node) => {
      const annotation = node.returnType && node.returnType.typeAnnotation;
      if (!annotation || !isTopType(annotation)) return;
      context.report({
        node: node.returnType,
        message: advice(
          "This function's declared return says nothing about what it returns.",
          "return the parsed type, and narrow once where the value enters the system.",
          "do not cast at the call site — that multiplies the problem instead of moving it.",
        ),
      });
    };
    return {
      FunctionDeclaration: check,
      FunctionExpression: check,
      ArrowFunctionExpression: check,
      TSDeclareFunction: check,
      TSMethodSignature: check,
    };
  },
};
