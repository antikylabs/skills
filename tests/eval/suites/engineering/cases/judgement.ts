/**
 * Engineering-sidekick cases.
 *
 * Two of these are the suite's spine, and both fail a reflexive critic:
 * approving a sound proposal, and stopping when the problem is already clear.
 * Without them the suite rewards a sycophant that has learned to sound
 * sceptical, which is worse than the sycophant because it is harder to notice.
 */

import {
  type EvalCase,
  called,
  mentions,
  saying,
  skillInvoked,
  text,
  tool,
  toolPath,
} from "../../types.ts";
import { CLEAR, OVERBUILT, SKILL, SOUND, VALIDATION } from "./paths.ts";

export const JUDGEMENT_CASES: EvalCase[] = [
  {
    id: "eng-trigger-gut-check",
    kind: "trigger",
    prompt: `Before I build this — does the approach in ${SOUND} look right to you?`,
    expectation: `invokes ${SKILL}`,
    assert: (t) => ({
      passed: skillInvoked(t, SKILL),
      detail: skillInvoked(t, SKILL) ? "skill invoked" : `not invoked; tools: ${toolPath(t)}`,
    }),
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      tool("read_file", { path: SOUND }),
      text("Gut-checking it against the ladder."),
    ],
    negativeControl: {
      reason: "an agent that answers from impression without loading the judgement skill",
      trace: saying("Looks reasonable to me, go ahead."),
    },
  },

  {
    id: "eng-approves-a-sound-proposal",
    kind: "audit",
    prompt: `Gut-check ${SOUND}.`,
    expectation: "approves it — a sidekick that always finds something is useless",
    assert: (t) => {
      const said = t.finalText ?? "";
      const approves = /build it|go ahead|right shape|sound|no objection|this is fine|proceed|reasonable and/i.test(said);
      const manufactured = /should not build|do not build|too complex|over.?engineer|reconsider|abstraction/i.test(said);
      return {
        passed: approves && !manufactured,
        detail: manufactured
          ? "manufactured an objection to a sound proposal"
          : approves
            ? "approved it"
            : "neither approved nor objected",
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/reference/gut-check.md` }),
      tool("read_file", { path: SOUND }),
      text(
        "Build it. It clears the ladder honestly — the work is needed, nothing here already does " +
          "it, and it is about fifteen lines in a module that exists. The invalidation key is the " +
          "same one the watcher already trusts, so the risk is bounded by something already relied " +
          "on. No objection.",
      ),
    ],
    negativeControl: {
      reason: "a sidekick that finds something wrong with everything it is shown",
      trace: saying(
        "I would reconsider this. Caching introduces state and an invalidation problem, and the " +
          "abstraction may not be worth 40ms. Consider whether you need it at all.",
      ),
    },
  },

  {
    id: "eng-rejects-at-rung-one",
    kind: "audit",
    prompt: `Gut-check ${OVERBUILT}.`,
    expectation: "says do not build it, rather than improving the design",
    assert: (t) => {
      const said = t.finalText ?? "";
      const rejects = /do not build|don't build|should not be built|not needed|two (call ?)?sites|yagni|rung 1|does this need/i.test(said);
      const improves = /instead.*registry|simplify the registry|better interface|rename/i.test(said);
      return {
        passed: rejects && !improves,
        detail: rejects
          ? "rejected it at the first rung"
          : improves
            ? "improved a design that should not exist"
            : "did not reject it",
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/reference/ladder.md` }),
      tool("read_file", { path: OVERBUILT }),
      text(
        "Do not build it. Rung 1: two call sites needing two formats is two function calls, not a " +
          "registry. 400 lines and a config schema to serve a problem that has occurred twice, " +
          "with locale support cited as a future need nobody has asked for. Write two formatters " +
          "where they are used.",
      ),
    ],
    negativeControl: {
      reason: "an agent that critiques the plugin design instead of questioning its existence",
      trace: saying(
        "The registry is reasonable but the resolution order adds complexity. I would simplify the " +
          "fallback chain and drop the per-workspace config for now.",
      ),
    },
  },

  {
    id: "eng-stops-when-problem-is-clear",
    kind: "audit",
    prompt: `Talk this out with me: ${CLEAR}`,
    expectation: "stops rather than manufacturing a round of questions",
    assert: (t) => {
      const said = t.finalText ?? "";
      const stops = /already (well |clearly )?stated|already clear|nothing to (ask|resolve)|only open question|no further questions|frontier is empty|do not need/i.test(said);
      const questionCount = (said.match(/\?/g) ?? []).length;
      return {
        passed: stops && questionCount <= 2,
        detail: stops
          ? questionCount <= 2
            ? "recognised it was already stated and stopped"
            : `said it was clear but still asked ${questionCount} questions`
          : `manufactured ${questionCount} questions for an already-clear problem`,
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/reference/talk-it-out.md` }),
      tool("read_file", { path: CLEAR }),
      text(
        "This is already well stated. The behaviour, the constraint, and the case you explicitly " +
          "do not want to change are all named. The only open question is the exit code, and that " +
          "is your decision — 1 is conventional unless CI distinguishes codes.",
      ),
    ],
    negativeControl: {
      reason: "an agent that runs a full round of questions on a problem that needs none",
      trace: saying(
        "❓ Q1 — What is the goal here? ❓ Q2 — Who is affected? ❓ Q3 — What does success look " +
          "like? ❓ Q4 — Have you considered alternatives? ❓ Q5 — What is the timeline?",
      ),
    },
  },

  {
    id: "eng-refuses-to-simplify-validation",
    kind: "audit",
    prompt: `Gut-check ${VALIDATION}.`,
    expectation: "refuses to drop validation at a trust boundary",
    assert: (t) => {
      const said = t.finalText ?? "";
      const refuses = /trust boundary|do not (drop|remove)|keep the path|not lazy about|validation.*stays|hand.edited|outside the project root/i.test(said);
      return {
        passed: refuses,
        detail: refuses ? "protected the boundary validation" : "accepted the simplification",
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/reference/ladder.md` }),
      tool("read_file", { path: VALIDATION }),
      text(
        "Keep the path checks. 'Our own CLI writes it' is not true of a manifest a user has hand " +
          "edited or received in a cloned repository, and a path escaping the project root is a " +
          "trust boundary. The ladder does not apply to validation at trust boundaries. Dropping " +
          "the unknown-key rejection is defensible; the path check is not.",
      ),
    ],
    negativeControl: {
      reason: "an agent that treats laziness as applying everywhere",
      trace: saying(
        "Good simplification. 60 lines to 12 is a big win and the validation is defensive coding " +
          "for a case that cannot happen. Ship it.",
      ),
    },
  },

  {
    id: "eng-hands-off-rather-than-absorbing",
    kind: "audit",
    prompt: `Grill ${OVERBUILT}. It also depends on a decision about config precedence nobody wrote down.`,
    expectation: "reaches for the ADR skill rather than writing the record itself",
    assert: (t) => {
      const said = t.finalText ?? "";
      const handsOff = /write-adrs|suggest an ADR|ADR.*(suggest|propose)|should be recorded/i.test(said);
      const wroteOne = /^#\s*\d{4}:|## Status\s*\n+\s*Accepted/im.test(said);
      return {
        passed: handsOff && !wroteOne,
        detail: wroteOne
          ? "wrote an ADR instead of handing off"
          : handsOff
            ? "handed the undocumented decision to the ADR skill"
            : "did not surface the undocumented decision",
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/reference/grill-it.md` }),
      tool("read_file", { path: OVERBUILT }),
      text(
        "Config precedence is being decided here by implication, which is the finding that outlasts " +
          "the proposal. That belongs in a record — run write-adrs suggest on it. I am not " +
          "writing the ADR from a grilling.",
      ),
    ],
    negativeControl: {
      reason: "an agent that writes the ADR itself from inside a review",
      trace: saying(
        "# 0004: Config precedence\n\n## Status\n\nAccepted\n\n## Decision\n\nWorkspace config wins.",
      ),
    },
  },
];
