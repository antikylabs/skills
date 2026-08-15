/**
 * "Shape" as a suffix says a value has structure, which every value has.
 *
 * The capital S and the required prefix matter: this is about the `UserShape`
 * habit, not about the word. A geometry `class Shape` is the thing itself.
 */

import { advice } from "../shared.mjs";

const SHAPE_SUFFIX = /.+Shapes?$/;

export default {
  meta: { docs: { description: "Disallow Shape as a suffix in declared names." } },
  create(context) {
    const check = (identifier) => {
      if (!identifier || identifier.type !== "Identifier") return;
      if (!SHAPE_SUFFIX.test(identifier.name)) return;
      context.report({
        node: identifier,
        message: advice(
          `\`${identifier.name}\` names the value as having structure, which every value has.`,
          "name what it is, not that it is shaped.",
          "do not swap it for another placeholder such as Data, Info, or Object.",
        ),
      });
    };

    return {
      VariableDeclarator: (node) => check(node.id),
      FunctionDeclaration: (node) => check(node.id),
      ClassDeclaration: (node) => check(node.id),
      TSInterfaceDeclaration: (node) => check(node.id),
      TSTypeAliasDeclaration: (node) => check(node.id),
      TSEnumDeclaration: (node) => check(node.id),
    };
  },
};
