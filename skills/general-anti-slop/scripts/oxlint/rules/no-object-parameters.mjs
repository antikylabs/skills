/**
 * `object` says only that the value is not a primitive.
 */

import { advice, unwrapType } from "../shared.mjs";

export default {
  meta: { docs: { description: "Disallow parameters annotated as the bare object type." } },
  create(context) {
    const check = (node) => {
      for (const parameter of node.params ?? []) {
        const target =
          parameter.type === "AssignmentPattern" ? parameter.left
          : parameter.type === "RestElement" ? parameter.argument
          : parameter;
        const annotation = target && target.typeAnnotation && target.typeAnnotation.typeAnnotation;
        const resolved = annotation && unwrapType(annotation);
        if (!resolved || resolved.type !== "TSObjectKeyword") continue;
        context.report({
          node: target,
          message: advice(
            "`object` says only that this is not a primitive.",
            "state the properties the function actually reads.",
            "do not reach into it with a cast in the body — that is the same claim, made later and less visibly.",
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
