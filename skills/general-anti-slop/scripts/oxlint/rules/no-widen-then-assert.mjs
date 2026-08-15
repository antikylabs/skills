/**
 * A value widened to a top type, then asserted back.
 *
 *   const raw: unknown = { id: "1" };
 *   const user = raw as User;
 *
 * Both halves are visible in one file: the evidence was there, it was thrown
 * away, and the assertion puts back a claim that is no longer checked. A value
 * that was never known — `JSON.parse` output, say — is a different problem, and
 * `require-safety-comment-for-type-assertion` covers it.
 */

import { advice, isTopType, resolveVariable, soleDeclarator, unwrapType } from "../shared.mjs";
import { isKnownValue } from "./no-known-value-widening.mjs";

const isConstAssertion = (type) => {
  const t = unwrapType(type);
  return !!t && t.type === "TSTypeReference" && t.typeName && t.typeName.name === "const";
};

export default {
  meta: { docs: { description: "Disallow asserting a value back after widening it." } },
  create(context) {
    const source = context.sourceCode;
    return {
      TSAsExpression(node) {
        if (isConstAssertion(node.typeAnnotation)) return;
        let target = node.expression;
        while (target && target.type === "ParenthesizedExpression") target = target.expression;
        if (!target || target.type !== "Identifier") return;

        const variable = resolveVariable(source, target);
        const declarator = soleDeclarator(variable);
        if (!declarator) return;

        const annotation =
          declarator.id && declarator.id.typeAnnotation && declarator.id.typeAnnotation.typeAnnotation;
        if (!annotation || !isTopType(annotation)) return;
        if (!isKnownValue(declarator.init)) return;

        context.report({
          node,
          message: advice(
            `\`${target.name}\` was widened where it was declared, and is asserted back here.`,
            "delete the widening annotation and let the value keep the type it already had.",
            "do not move the assertion closer to the declaration — remove the round trip, not its distance.",
          ),
        });
      },
    };
  },
};
