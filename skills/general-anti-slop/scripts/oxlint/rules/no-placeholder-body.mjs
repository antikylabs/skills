/**
 * A function that announces it does nothing, shipped as if it were done.
 *
 *   function reconcile() { throw new Error("Not implemented"); }
 *
 * An agent asked to build six things will sometimes build four and stub two,
 * and the stubs are syntactically complete, type-check, and pass review at a
 * glance. This rule makes the stub visible at the same moment as the work.
 *
 * A genuinely abstract method that throws is not this: it says what the
 * subclass must do. The rule fires only on the placeholder vocabulary.
 */

const PLACEHOLDER = /\b(not[\s_-]?implemented|unimplemented|todo|fixme|placeholder|stub(?:bed)?|coming soon|no[\s_-]?op for now)\b/i;

/** The string a `throw new Error(...)` carries, when it is a plain literal. */
function thrownMessage(statement) {
  if (!statement || statement.type !== "ThrowStatement") return null;
  const argument = statement.argument;
  const carried =
    argument?.type === "NewExpression" || argument?.type === "CallExpression" ? argument.arguments[0] : argument;
  if (!carried) return argument?.type === "NewExpression" ? "" : null;
  if (carried.type === "Literal" && typeof carried.value === "string") return carried.value;
  if (carried.type === "TemplateLiteral") return carried.quasis.map((q) => q.value.raw).join(" ");
  return null;
}

export default {
  meta: {
    docs: { description: "Reject a function body that is a placeholder." },
  },

  create(context) {
    const check = (node) => {
      const body = node.body;
      if (!body || body.type !== "BlockStatement" || body.body.length !== 1) return;

      const message = thrownMessage(body.body[0]);
      if (message === null || !PLACEHOLDER.test(message)) return;

      context.report({
        node: body.body[0],
        message:
          `This function is a placeholder ("${message.trim()}") but its signature reads as finished. ` +
          "Do: implement it, or remove it and leave the caller unwritten so the gap is visible at the call site. " +
          "Never: soften the message — a stub that no longer says it is a stub is worse than this one.",
      });
    };

    return {
      FunctionDeclaration: check,
      FunctionExpression: check,
      ArrowFunctionExpression: check,
    };
  },
};
