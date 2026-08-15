/**
 * A test that was committed switched off.
 *
 * `.skip` leaves a suite that reads as covered and is not. `.only` is worse: it
 * silently disables *every other test in the run*, so a green suite can mean one
 * assertion passed. Both are evidence theatre, and both survive review because
 * the diff looks like a one-character change.
 */

const RUNNERS = new Set(["it", "test", "describe", "suite", "context", "bench", "assert"]);
const DISABLING = new Set(["skip", "todo", "failing"]);
const EXCLUSIVE = new Set(["only"]);
const PREFIXED = new Map([
  ["xit", "skip"], ["xdescribe", "skip"], ["xtest", "skip"], ["xcontext", "skip"],
  ["fit", "only"], ["fdescribe", "only"], ["ftest", "only"],
]);

export default {
  meta: {
    docs: { description: "Reject a test committed in a skipped or exclusive state." },
  },

  create(context) {
    const skipped = (node, name) =>
      context.report({
        node,
        message:
          `\`${name}\` is committed switched off, so this suite reads as covered and is not. ` +
          "Do: finish the test, or delete it and record why in the change description. " +
          "Never: leave it skipped to make the run green.",
      });

    const exclusive = (node, name) =>
      context.report({
        node,
        message:
          `\`${name}\` silently disables every other test in this run, so a green suite proves almost nothing. ` +
          "Do: remove it before committing. " +
          "Never: keep it because the full suite is slow — narrow the run from the command line instead.",
      });

    return {
      CallExpression(node) {
        const callee = node.callee;

        // it.skip(...), describe.only(...), test.todo(...)
        if (
          callee.type === "MemberExpression" &&
          callee.property.type === "Identifier" &&
          callee.object.type === "Identifier" &&
          RUNNERS.has(callee.object.name)
        ) {
          const name = `${callee.object.name}.${callee.property.name}`;
          if (DISABLING.has(callee.property.name)) skipped(node, name);
          else if (EXCLUSIVE.has(callee.property.name)) exclusive(node, name);
          return;
        }

        // xit(...), fdescribe(...)
        if (callee.type === "Identifier" && PREFIXED.has(callee.name)) {
          if (PREFIXED.get(callee.name) === "only") exclusive(node, callee.name);
          else skipped(node, callee.name);
        }
      },
    };
  },
};
