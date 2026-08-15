/**
 * Module mocking replaces the thing under test with an assumption about it.
 */

import { advice } from "../shared.mjs";

const RUNNERS = new Set(["vi", "jest"]);
const MOCKERS = new Set(["mock", "doMock", "unstable_mockModule", "setMock"]);

export default {
  meta: { docs: { description: "Disallow Vitest and Jest module mocks." } },
  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;
        if (
          callee.type !== "MemberExpression" ||
          callee.computed ||
          callee.object.type !== "Identifier" ||
          !RUNNERS.has(callee.object.name) ||
          callee.property.type !== "Identifier" ||
          !MOCKERS.has(callee.property.name)
        ) {
          return;
        }
        context.report({
          node,
          message: advice(
            `\`${callee.object.name}.${callee.property.name}\` replaces a module with an assumption about it.`,
            "inject the dependency, or test against a real implementation at the boundary.",
            "do not add more mocks to make the first one work — that is how a suite stops testing the system.",
          ),
        });
      },
    };
  },
};
