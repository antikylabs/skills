/**
 * anti-slop — an Oxlint plugin.
 *
 * Five rules, one idea: **reject what looks like evidence and is not.**
 *
 *   no-tautological-assertion    a test that cannot fail
 *   no-disabled-test             a test committed switched off
 *   no-swallowed-error           a failure caught and discarded
 *   no-placeholder-body          a stub with a finished-looking signature
 *   require-suppression-reason   a claim that the checker is wrong, with no reason
 *
 * These are not type-safety rules. `dmmulroy/anti-slop` already covers that
 * ground for TypeScript, and these are written to sit beside it rather than
 * overlap it. See NOTICE.md.
 *
 * Wiring, in the target project's oxlint config:
 *
 *   {
 *     "jsPlugins": ["./tools/anti-slop/index.mjs"],
 *     "rules": {
 *       "anti-slop/no-tautological-assertion": "error",
 *       "anti-slop/no-disabled-test": "error",
 *       "anti-slop/no-swallowed-error": "error",
 *       "anti-slop/no-placeholder-body": "error",
 *       "anti-slop/require-suppression-reason": "warn"
 *     }
 *   }
 *
 * Every rule is independently toggleable, and none is on until it is named.
 */

import noTautologicalAssertion from "./rules/no-tautological-assertion.mjs";
import noDisabledTest from "./rules/no-disabled-test.mjs";
import noSwallowedError from "./rules/no-swallowed-error.mjs";
import noPlaceholderBody from "./rules/no-placeholder-body.mjs";
import requireSuppressionReason from "./rules/require-suppression-reason.mjs";

export const RULES = {
  "no-tautological-assertion": noTautologicalAssertion,
  "no-disabled-test": noDisabledTest,
  "no-swallowed-error": noSwallowedError,
  "no-placeholder-body": noPlaceholderBody,
  "require-suppression-reason": requireSuppressionReason,
};

export default {
  meta: { name: "anti-slop" },
  rules: RULES,
};
