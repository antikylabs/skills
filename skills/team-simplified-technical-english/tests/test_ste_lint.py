#!/usr/bin/env python3
"""Tests for ste_lint.py. Standard library only.

    python3 -m unittest discover -s tests -v
    python3 tests/test_ste_lint.py

Run from the skill directory.

The tests use the real shipped dataset, because the linter's behaviour is
mostly a function of that data and a stub dictionary would test nothing worth
knowing. Tests that only exercise counting or splitting need no data at all.
"""

from __future__ import annotations

import ast
import io
import json
import os
import re
import subprocess
import sys
import tempfile
import unittest
from contextlib import redirect_stdout

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHECKER = os.path.join(ROOT, "scripts")
sys.path.insert(0, CHECKER)

import ste_lint  # noqa: E402

LINTER = os.path.join(CHECKER, "ste_lint.py")
GUIDE = os.path.join(ROOT, "reference", "ste-guide.md")
DATA = os.path.join(CHECKER, "ste100-lint.json")

if not os.path.exists(DATA):  # pragma: no cover - the dataset must be built first
    raise SystemExit(f"{DATA} not found. It ships next to ste_lint.py in scripts/.")
DICTIONARY = ste_lint.Dictionary.load(DATA)


def check(text, mode="auto", strict=False, dictionary=None):
    return ste_lint.check_text(text, "t.txt", dictionary or DICTIONARY, mode, strict)


def rules(findings):
    return [f.rule for f in findings]


def messages(findings):
    return " | ".join(f.message for f in findings)


class WordCount(unittest.TestCase):
    """Rules 8.4 thru 8.7 define exactly how to count words."""

    def test_plain_sentence(self):
        self.assertEqual(ste_lint.count_words("Remove the cover from the housing."), 6)

    def test_parenthetical_text_counts_as_one_word(self):
        # Rule 8.5. The standard's own example: this sentence has 14 words.
        sentence = "Install the three auxiliary screws (2) in the flange of the motor assembly (9)."
        self.assertEqual(ste_lint.count_words(sentence), 14)

    def test_number_with_unit_counts_as_one_word(self):
        # Rule 8.6: "2 liters" is one word, so this is 8 words not 9.
        self.assertEqual(
            ste_lint.count_words("Drain approximately 2 liters of fuel from the tank."), 8
        )

    def test_number_without_unit_counts_as_one_word(self):
        self.assertEqual(ste_lint.count_words("Torque the bolt to 25."), 5)

    def test_pressure_unit(self):
        self.assertEqual(ste_lint.count_words("The pressure must be more than 800 kPa."), 7)

    def test_hyphenated_word_counts_as_one_word(self):
        # Rule 8.7.
        self.assertEqual(ste_lint.count_words("Use a word-for-word replacement."), 4)

    def test_quoted_text_counts_as_one_word(self):
        # Rule 8.6.
        self.assertEqual(ste_lint.count_words('Set the switch to "ON AND LOCKED".'), 5)

    def test_punctuation_alone_is_not_a_word(self):
        self.assertEqual(ste_lint.count_words("Stop. -- Go."), 2)

    def test_empty(self):
        self.assertEqual(ste_lint.count_words(""), 0)


class SentenceSplit(unittest.TestCase):
    def test_period(self):
        self.assertEqual(
            ste_lint.split_sentences("Remove the bolt. Install the nut."),
            ["Remove the bolt.", "Install the nut."],
        )

    def test_colon_ends_a_sentence(self):
        # Rule 8.4.
        self.assertEqual(
            ste_lint.split_sentences("Do the steps that follow: Remove the bolt."),
            ["Do the steps that follow:", "Remove the bolt."],
        )

    def test_abbreviation_period_does_not_split(self):
        self.assertEqual(
            ste_lint.split_sentences("Get access to the accumulator for the No. 1 system."),
            ["Get access to the accumulator for the No. 1 system."],
        )

    def test_each_line_is_its_own_sentence(self):
        self.assertEqual(len(ste_lint.split_sentences("First item\nSecond item")), 2)


class Punctuation(unittest.TestCase):
    def test_semicolon_is_reported(self):
        found = check("The unit is serviceable; the test is complete.")
        self.assertIn("8.1", rules(found))

    def test_no_semicolon_no_finding(self):
        found = check("The unit is serviceable.")
        self.assertNotIn("8.1", rules(found))

    def test_latin_abbreviation_is_reported(self):
        found = check("Use a soft cloth, e.g. cotton.")
        self.assertIn("GR-6", rules(found))
        self.assertIn("FOR EXAMPLE", messages(found))

    def test_etc_is_reported(self):
        self.assertIn("GR-6", rules(check("Remove the bolts, nuts, etc.")))

    def test_a_word_containing_a_latin_abbreviation_is_not_reported(self):
        # "vs." inside "revs." must not match, nor "ca." inside "vertica.".
        self.assertNotIn("GR-6", rules(check("Count the revs. Then stop.")))

    def test_contraction_is_reported(self):
        # Rule 4.2.
        found = check("Do not remove the cover if it isn't loose.")
        self.assertIn("4.2", rules(found))

    def test_possessive_is_a_warning(self):
        found = check("Refer to the manufacturer's instructions.")
        self.assertIn("GR-8", rules(found))
        self.assertEqual([f.severity for f in found if f.rule == "GR-8"], ["warning"])


class VerbForms(unittest.TestCase):
    def test_ing_form_as_a_verb_is_reported(self):
        # Rules 3.2 and 3.5.
        found = check("The pump is operating at full speed.")
        self.assertIn("3.2", rules(found))

    def test_ing_form_in_a_noun_is_not_reported(self):
        # Rule 3.5 permits the "-ing" form inside a technical noun.
        self.assertNotIn("3.2", rules(check("Open the landing gear door.")))

    def test_passive_voice_is_reported(self):
        # Rule 3.6. "installed" is the past participle of the approved INSTALL.
        found = check("The pump is installed in the compartment.")
        self.assertIn("3.6", rules(found))

    def test_a_named_agent_makes_it_an_error(self):
        # "by the technician" is what settles it: this cannot be a participle
        # used as an adjective.
        found = check("The pump is installed by the technician.", mode="procedural")
        self.assertEqual([f.severity for f in found if f.rule == "3.6"], ["error"])

    def test_without_an_agent_it_is_only_a_warning(self):
        # Rule 3.3 permits the past participle as an adjective, and it looks
        # identical, so an unnamed agent cannot be called an error.
        found = check("The pump is installed in the compartment.", mode="procedural")
        self.assertEqual([f.severity for f in found if f.rule == "3.6"], ["warning"])

    def test_make_sure_that_a_state_holds_is_not_passive(self):
        # Canonical STE, used throughout the standard: a required condition.
        self.assertNotIn("3.6", rules(check("Make sure that the valve is closed.")))

    def test_active_voice_is_not_reported(self):
        self.assertNotIn("3.6", rules(check("Install the pump in the compartment.")))


class ApprovedWords(unittest.TestCase):
    def test_word_that_is_not_approved_is_reported(self):
        found = check("The unit is installed abaft the compartment.")
        finding = [f for f in found if f.rule == "1.1"]
        self.assertTrue(finding)
        self.assertIn("AFT OF", finding[0].message)

    def test_recurring_error_names_the_replacement(self):
        found = [f for f in check("Ensure the valve is closed.") if f.rule == "1.1"]
        self.assertTrue(found)
        self.assertIn("MAKE SURE", found[0].message)

    def test_approved_word_is_not_reported(self):
        self.assertNotIn("1.1", rules(check("Remove the bolt.")))

    def test_inflected_form_of_an_approved_verb_is_not_reported(self):
        # "connects" resolves through CONNECT via the forms index. Asserted on
        # the word itself: other words in a sentence may have findings of their
        # own, which would make a whole-sentence assertion prove nothing.
        self.assertEqual(DICTIONARY.status("connects"), "approved")
        found = check("Plug A connects to socket B.")
        self.assertEqual([f for f in found if "connects" in f.message], [])

    def test_irregular_past_tense_is_not_reported(self):
        self.assertNotIn("1.1", rules(check("This section gave the procedures.")))

    def test_unknown_word_is_not_reported_by_default(self):
        # Rule 1.5: any technical noun is permitted, and is absent from the
        # dictionary by definition.
        self.assertNotIn("1.1", rules(check("Remove the flanged spigot.")))

    def test_unknown_word_is_listed_in_strict_mode(self):
        found = check("Remove the flanged spigot.", strict=True)
        self.assertIn("1.5", rules(found))

    def test_a_spelling_approved_under_any_part_of_speech_is_accepted(self):
        # CHECK (n) is approved while check (v) is not. Which one a sentence
        # means needs the part of speech in context, so the spelling is
        # accepted; rule 1.2 is one this tool cannot decide.
        self.assertEqual(DICTIONARY.status("check"), "approved")
        self.assertEqual([f for f in check("Do the check of the container.") if f.rule == "1.1"], [])

    def test_a_word_offered_as_a_technical_noun_takes_the_rule_1_5_path(self):
        # "cover (v)" is not approved and its alternative is COVER (TN), so the
        # more precise finding is rule 1.5: permitted as a technical noun.
        self.assertIn("cover", DICTIONARY.technical_terms())
        found = [f for f in check("Cover the container.") if "Cover" in f.message]
        self.assertTrue(found)
        self.assertEqual(found[0].rule, "1.5")

    def test_a_word_offered_as_a_technical_noun_is_not_an_error(self):
        # The dictionary tells "fail (v)" and "glitch (n)" to use FAILURE (TN),
        # while separately rejecting "failure (n)" as a plain noun. Calling
        # FAILURE forbidden would contradict the dictionary's own advice.
        self.assertIn("failure", DICTIONARY.technical_terms())
        # Filtered by word, not by position: other words in the sentence have
        # findings of their own and a positional index would be brittle.
        found = [f for f in check("EXAMINE THE PUMP FOR A FAILURE.") if "FAILURE" in f.message]
        self.assertTrue(found)
        self.assertEqual(found[0].severity, "warning")
        self.assertEqual(found[0].rule, "1.5")

    def test_interference_is_also_a_technical_noun(self):
        found = [f for f in check("MEASURE THE INTERFERENCE AT THE JOINT.") if f.rule == "1.1"]
        self.assertEqual(found, [])

    def test_verb_only_rejection_in_a_noun_position_is_informational(self):
        # "fuel (v)" is not approved, but "of fuel" is a noun, which rule 1.5
        # permits as a technical noun.
        found = [f for f in check("Drain the fuel from the tank.") if f.rule in ("1.1", "1.5")]
        self.assertTrue(found)
        self.assertEqual(found[0].severity, "info")


class Length(unittest.TestCase):
    def test_long_procedural_sentence_is_reported(self):
        # Rule 5.1: 20 words maximum. This has 24.
        sentence = (
            "Remove the bolt and the nut and the washer and the spacer and the shim "
            "and the clip and the pin and the seal."
        )
        found = [f for f in check(sentence, mode="procedural") if f.rule == "5.1"]
        self.assertTrue(found)
        self.assertIn("24 words", found[0].message)

    def test_twenty_word_procedural_sentence_is_permitted(self):
        sentence = " ".join(["Remove"] + ["bolt"] * 19) + "."
        self.assertEqual(ste_lint.count_words(sentence), 20)
        self.assertNotIn("5.1", rules(check(sentence, mode="procedural")))

    def test_descriptive_limit_is_twenty_five(self):
        sentence = "The " + " ".join(["pump"] * 25) + "."
        self.assertEqual(ste_lint.count_words(sentence), 26)
        self.assertIn("6.3", rules(check(sentence, mode="descriptive")))

    def test_long_paragraph_is_reported(self):
        # Rule 6.6: six sentences maximum.
        paragraph = " ".join(f"The pump has a value of {n}." for n in range(1, 9))
        self.assertIn("6.6", rules(check(paragraph, mode="descriptive")))

    def test_six_sentence_paragraph_is_permitted(self):
        paragraph = " ".join(f"The pump has a value of {n}." for n in range(1, 7))
        self.assertNotIn("6.6", rules(check(paragraph, mode="descriptive")))

    def test_paragraph_limit_does_not_apply_to_procedures(self):
        steps = "\n".join(f"{n}. Remove the bolt." for n in range(1, 10))
        self.assertNotIn("6.6", rules(check(steps, mode="procedural")))


class MultiWordNouns(unittest.TestCase):
    def test_long_multi_word_noun_is_reported(self):
        # Rule 2.1: three words maximum.
        found = check("Runway light connection resistance calibration is necessary.")
        self.assertIn("2.1", rules(found))

    def test_three_word_multi_word_noun_is_permitted(self):
        self.assertNotIn("2.1", rules(check("The runway light connection is loose.")))

    def test_punctuation_ends_a_run(self):
        # Two short noun groups separated by a comma are not one long one.
        self.assertNotIn("2.1", rules(check("Install the bolt, washer and nut.")))


class CommandForm(unittest.TestCase):
    def test_instruction_that_does_not_start_with_a_verb_is_reported(self):
        # Rules 3.2 and 5.3.
        found = check("The bolt must be removed by the technician.", mode="procedural")
        self.assertIn("5.3", rules(found))

    def test_imperative_instruction_is_not_reported(self):
        self.assertNotIn("5.3", rules(check("Remove the bolt.", mode="procedural")))

    def test_condition_before_the_command_is_permitted(self):
        # Rule 5.4.
        self.assertNotIn(
            "5.3",
            rules(check("If the values are incorrect, stop the test.", mode="procedural")),
        )

    def test_numbered_step_is_permitted(self):
        self.assertNotIn("5.3", rules(check("1. Remove the bolt.", mode="procedural")))


class ModeDetection(unittest.TestCase):
    def test_numbered_step_is_procedural(self):
        # 22 words: over the procedural limit of 20, under the descriptive 25.
        sentence = "1. Remove " + " ".join(["bolt"] * 20) + " now."
        self.assertIn("5.1", rules(check(sentence, mode="auto")))

    def test_prose_is_descriptive(self):
        sentence = "The system " + " ".join(["pump"] * 19) + " operates."
        self.assertEqual(ste_lint.count_words(sentence), 22)
        self.assertNotIn("5.1", rules(check(sentence, mode="auto")))


class Determinism(unittest.TestCase):
    def test_same_input_gives_identical_output(self):
        text = "Ensure the valve is operable; e.g. it isn't seized.\n\nThe pump is installed."
        first = [f.format() for f in check(text)]
        second = [f.format() for f in check(text)]
        self.assertEqual(first, second)
        self.assertTrue(first)

    def test_findings_are_sorted_by_position(self):
        text = "Ensure the valve is operable and the unit is installed abaft the compartment."
        found = check(text)
        self.assertEqual(
            [(f.line, f.column) for f in found],
            sorted((f.line, f.column) for f in found),
        )


class DataFile(unittest.TestCase):
    def test_dataset_is_found_next_to_the_script(self):
        self.assertTrue(os.path.exists(ste_lint.Dictionary.find()))

    def test_unsupported_schema_is_rejected(self):
        with self.assertRaises(ValueError):
            ste_lint.Dictionary({"schema": "something-else/9"})

    def test_dataset_holds_the_published_totals(self):
        counts = DICTIONARY.data["counts"]
        self.assertEqual(counts["approved_verbs"], len(DICTIONARY.data["approved_verbs"]))
        self.assertEqual(len(DICTIONARY.data["rules"]), 61)  # 53 rules + 8 GRs

    def test_limits_match_the_rules(self):
        self.assertEqual(DICTIONARY.limits["max_words_per_procedural_sentence"], 20)
        self.assertEqual(DICTIONARY.limits["max_words_per_descriptive_sentence"], 25)
        self.assertEqual(DICTIONARY.limits["max_sentences_per_paragraph"], 6)
        self.assertEqual(DICTIONARY.limits["max_words_per_multi_word_noun"], 3)

    def test_forms_resolve_to_headwords(self):
        self.assertEqual(DICTIONARY.forms.get("connects"), "CONNECT")
        self.assertEqual(DICTIONARY.forms.get("gave"), "GIVE")


class CommandLine(unittest.TestCase):
    """The CLI contract: exit status, plain output, and JSON output."""

    def _run(self, text, *extra):
        with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as fh:
            fh.write(text)
            path = fh.name
        try:
            return subprocess.run(
                [sys.executable, LINTER, path, *extra],
                capture_output=True,
                text=True,
            )
        finally:
            os.unlink(path)

    def test_clean_text_exits_zero(self):
        result = self._run("Remove the bolt from the flange.\n")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_text_with_an_error_exits_one(self):
        result = self._run("Ensure the valve is closed.\n")
        self.assertEqual(result.returncode, 1)
        self.assertIn("MAKE SURE", result.stdout)

    def test_fail_on_never_exits_zero(self):
        result = self._run("Ensure the valve is closed.\n", "--fail-on", "never")
        self.assertEqual(result.returncode, 0)

    def test_json_output_is_valid(self):
        result = self._run("Ensure the valve is closed.\n", "--json")
        payload = json.loads(result.stdout)
        self.assertEqual(payload["issue"], 9)
        self.assertGreater(payload["counts"]["error"], 0)
        self.assertIn("rule", payload["findings"][0])

    def test_missing_file_exits_two(self):
        result = subprocess.run(
            [sys.executable, LINTER, "no-such-file.txt"],
            capture_output=True,
            text=True,
        )
        self.assertEqual(result.returncode, 2)

    def test_stdin(self):
        result = subprocess.run(
            [sys.executable, LINTER, "-"],
            input="Ensure the valve is closed.\n",
            capture_output=True,
            text=True,
        )
        self.assertEqual(result.returncode, 1)
        self.assertIn("<stdin>", result.stdout)


class Regressions(unittest.TestCase):
    """Cases that were wrong once and must stay right."""

    def test_forms_of_be_do_not_extend_a_multi_word_noun(self):
        # "is" is a form of BE, not a headword, so an early version of
        # is_noun_candidate() treated it as an unknown technical noun and let
        # runs grow straight through it.
        found = [f for f in check("The control unit is installed correctly.") if f.rule == "2.1"]
        self.assertEqual(found, [])

    def test_help_text_is_not_counted_as_an_approved_form(self):
        # "No other verb forms." is help text in the dictionary, not a form.
        self.assertNotIn("no other verb forms", DICTIONARY.forms)

    def test_multi_word_headwords_are_looked_up(self):
        self.assertTrue(DICTIONARY.variants("make sure"))

    def test_sentence_ending_colon_does_not_produce_an_empty_sentence(self):
        self.assertNotIn("", ste_lint.split_sentences("Do the steps that follow:"))


class ShippedPackage(unittest.TestCase):
    """The skill ships the checker in scripts/ and the guide in reference/."""

    def test_the_three_parts_are_present(self):
        for path in (LINTER, DATA, GUIDE):
            self.assertTrue(os.path.exists(path), path)

    def test_the_linter_finds_its_data_with_no_arguments(self):
        # The data file must sit where ste_lint.py's own search finds it, or
        # every command in the playbooks needs a --data flag.
        result = subprocess.run(
            [sys.executable, LINTER, "-"],
            input="Make sure that the panel is attached.\n",
            capture_output=True,
            text=True,
        )
        self.assertNotIn("not found", result.stderr)
        self.assertNotEqual(result.returncode, 2, result.stderr)

    def test_the_guide_is_under_500_lines(self):
        with open(GUIDE, encoding="utf-8") as fh:
            lines = fh.read().splitlines()
        self.assertLess(len(lines), 500, f"the guide is {len(lines)} lines")

    def test_the_guide_covers_every_rule(self):
        # A rule missing from the guide means a finding a reader cannot look up.
        with open(GUIDE, encoding="utf-8") as fh:
            guide = fh.read()
        missing = [r for r in DICTIONARY.rules if f"**{r}" not in guide]
        self.assertEqual(missing, [])

    def test_the_guide_carries_no_dictionary_examples(self):
        # The point of the summary is that it reproduces no example sentences.
        # Every STE example in the standard is uppercase, so any long uppercase
        # run in the guide would be copied text.
        with open(GUIDE, encoding="utf-8") as fh:
            guide = fh.read()
        shouted = [m for m in re.findall(r"\b[A-Z][A-Z ]{25,}\b", guide)]
        self.assertEqual(shouted, [])

    def test_the_shipped_data_carries_no_examples(self):
        for variants in DICTIONARY.words.values():
            for entry in variants:
                for sense in entry.get("senses", []):
                    self.assertNotIn("examples", sense)

    def test_the_linter_needs_only_the_standard_library(self):
        # Parsed rather than grepped: prose in a docstring can start with the
        # word "from" and a regex cannot tell that from an import.
        with open(LINTER, encoding="utf-8") as fh:
            tree = ast.parse(fh.read())
        imported = set()
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                imported.update(alias.name.split(".")[0] for alias in node.names)
            elif isinstance(node, ast.ImportFrom) and node.module:
                imported.add(node.module.split(".")[0])
        allowed = {"argparse", "json", "os", "re", "sys", "__future__", "contextlib", "platform"}
        self.assertEqual(imported - allowed, set())


if __name__ == "__main__":
    unittest.main(verbosity=2)
