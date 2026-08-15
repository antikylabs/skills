/**
 * A dictionary with an unconstrained value type checks the key and gives up on the value.
 *
 * Covers both spellings: `Record<string, any>` and an index signature whose
 * value is a top type.
 */

import { advice, isBroadKeyType, isTopType, typeReferenceName, unwrapType } from "../shared.mjs";

export default {
  meta: { docs: { description: "Disallow dictionaries whose value type asserts nothing." } },
  create(context) {
    const report = (node) =>
      context.report({
        node,
        message: advice(
          "This dictionary constrains the key and gives up on the value.",
          "name the value type, or use a discriminated union if the values genuinely differ.",
          "do not swap `any` for `unknown` and call it fixed — both discard the value contract.",
        ),
      });

    return {
      TSTypeReference(node) {
        if (typeReferenceName(node) !== "Record") return;
        const args = node.typeArguments || node.typeParameters;
        const params = args && args.params;
        if (!params || params.length !== 2) return;
        if (isBroadKeyType(params[0]) && isTopType(params[1])) report(node);
      },
      TSIndexSignature(node) {
        const key = node.parameters && node.parameters[0];
        const keyType = key && key.typeAnnotation && key.typeAnnotation.typeAnnotation;
        const valueType = node.typeAnnotation && node.typeAnnotation.typeAnnotation;
        if (!keyType || !valueType) return;
        if (isBroadKeyType(keyType) && isTopType(valueType)) report(node);
      },
    };
  },
};
