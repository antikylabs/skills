/**
 * An alias for `unknown` makes the absence of a type look like a type.
 */

import { advice, isTopType } from "../shared.mjs";

export default {
  meta: { docs: { description: "Disallow type aliases that resolve to unknown or any." } },
  create(context) {
    return {
      TSTypeAliasDeclaration(node) {
        if (!isTopType(node.typeAnnotation)) return;
        context.report({
          node,
          message: advice(
            `\`${node.id && node.id.name}\` gives a name to a type that asserts nothing.`,
            "define the shape, or delete the alias so the top type is visible where it is used.",
            "do not rename it to something reassuring — a named top type is harder to find than a bare one.",
          ),
        });
      },
    };
  },
};
