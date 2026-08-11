#!/usr/bin/env python3
"""Check text against the ASD-STE100 Simplified Technical English writing rules.

Python 3 standard library only, no installation, no network. Copy this file and
ste100-lint.json anywhere and run it.

    python3 ste_lint.py manual.txt
    python3 ste_lint.py --mode procedural steps.txt
    python3 ste_lint.py --json docs/*.md
    cat draft.txt | python3 ste_lint.py -

Output is one finding per line:

    manual.txt:12:5: error [1.1] "ensure" is not approved in STE. Use MAKE SURE (v).

Exit status is 0 when nothing at or above --fail-on is found, 1 when something
is, and 2 on a usage or data error.

What this can and cannot check
------------------------------
STE has 53 rules and 8 general recommendations. Most need to know a word's part
of speech in context, which needs a parser this deliberately is not. So this
tool checks the rules that can be decided from the text and the dictionary
alone, and says nothing about the rest. Every finding names the rule it comes
from so it can be looked up in reference/ste-guide.md or in the standard.

It is deterministic: the same input and the same dictionary always give exactly
the same findings, in the same order. There is no model and no randomness.

A word that the dictionary does not list at all is not reported. Rules 1.5 and
1.12 let a writer use any technical noun or technical verb from their subject
field, and those are by definition absent from the dictionary. Only words the
dictionary explicitly lists as not approved are flagged. Use --strict to also
list unknown words, as a prompt to confirm each really is a technical term.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys

__version__ = "1.0.0"

SCHEMA_PREFIX = "asd-ste100/1"

# Where to look for the dataset, relative to this file. The first hit wins. The
# shipped layout puts ste100-lint.json next to this script, which is the second
# candidate; the rest let it also run from a checkout or a skill directory.
DATA_CANDIDATES = (
    "data/ste100-lint.json",
    "ste100-lint.json",
    "data/ste100.json",
    "ste100.json",
    "../data/ste100-lint.json",
    "../data/ste100.json",
)

SEVERITIES = ("error", "warning", "info")

# --- Word counting (rules 8.4 thru 8.7) ------------------------------------

# Rule 8.6 counts "numbers together with units of measurement" as one word.
# Deciding what is a unit needs a list: symbols, and the spelled-out names the
# standard uses in its own examples ("Drain approximately 2 liters of fuel from
# the tank" is 8 words, so "2 liters" is one).
_UNIT_SYMBOLS = """
    m cm mm km um nm in ft yd mi mil
    g kg mg lb oz t
    s ms us ns min h hr d
    l ml cl dl gal qt pt
    n kn kgf lbf
    pa kpa mpa bar mbar psi psig psia inhg mmhg torr atm
    c f k degc degf
    v mv kv a ma ua w kw mw hp va kva ah mah
    hz khz mhz ghz rpm
    j kj cal kcal btu wh kwh ozin lbin lbft
    deg rad sr
    db dba ppm pph gpm lpm cfm scfm
"""
_UNIT_NAMES = """
    liter litre meter metre gram tonne
    inch foot feet yard mile pound ounce
    second minute hour day week month year
    degree radian knot volt amp ampere watt joule calorie
    percent revolution cycle turn
"""


def _with_plurals(names):
    out = set()
    for name in names.split():
        out.add(name)
        out.add(name + "s")
        if name.endswith("ch"):
            out.add(name + "es")
    return out


UNITS = frozenset(_UNIT_SYMBOLS.split()) | frozenset(_with_plurals(_UNIT_NAMES))

_NUMBER_RE = re.compile(r"^[+-]?[\d.,]*\d[\d.,]*$")
# Rule 8.6: alphanumeric identifiers, for example "A320" or "P/N".
_ALPHANUMERIC_RE = re.compile(r"^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9/.\-]+$")
_WORDLIKE_RE = re.compile(r"[A-Za-z]")

# Spans that rules 8.5 and 8.6 each count as one word.
_PARENTHESES_RE = re.compile(r"\([^()]*\)")
_QUOTED_RE = re.compile(r"[“‘\"][^”’\"]*[”’\"]")

# Sentence-ending punctuation. Rule 8.4 makes a colon end a sentence too.
_SENTENCE_SPLIT_RE = re.compile(r"(?<=[.!?:])[ \t]+(?=[\"“(]?[A-Z0-9])|(?<=[.!?:])$")
# Abbreviations whose period does not end a sentence.
_NON_TERMINAL = frozenset(
    "no nos fig figs ref refs vol ch sec para pp approx max min dia qty "
    "mr mrs ms dr st jr sr inc ltd co corp dept est etc vs cf al ed eds".split()
)


def collapse_spans(sentence):
    """Replace each span that counts as one word with a single placeholder.

    Rule 8.5 counts text in parentheses as one word. Rule 8.6 counts quoted
    text as one word. Collapsing them before splitting on whitespace is what
    makes the count match how the standard says to count.
    """
    text = _PARENTHESES_RE.sub(" paren ", sentence)
    text = _QUOTED_RE.sub(" quote ", text)
    return text


def count_words(sentence):
    """Count the words in one sentence the way rules 8.4 thru 8.7 require.

    - Text in parentheses: one word (8.5).
    - Quoted text: one word (8.6).
    - A number, with its unit of measurement if it has one: one word (8.6).
    - An abbreviation or alphanumeric identifier: one word (8.6).
    - A hyphenated word: one word (8.7).
    """
    tokens = [t for t in collapse_spans(sentence).split() if _countable(t)]
    total, index = 0, 0
    while index < len(tokens):
        token = tokens[index].strip(".,;:!?")
        index += 1
        # A number followed by a unit is a single word.
        if _NUMBER_RE.match(token) and index < len(tokens):
            following = tokens[index].strip(".,;:!?")
            if following.lower().replace("°", "deg") in UNITS or following in ("%", "°"):
                index += 1
        total += 1
    return total


def _countable(token):
    stripped = token.strip(".,;:!?()[]\"'“”‘’-–—")
    if not stripped:
        return False
    return bool(_WORDLIKE_RE.search(stripped)) or bool(re.search(r"\d", stripped))


def split_sentences(block):
    """Split a block of text into sentences.

    Rule 8.4 makes a colon end a sentence, which matters because a vertical
    list's lead-in and its items are counted separately.
    """
    out = []
    for chunk in block.split("\n"):
        chunk = chunk.strip()
        if not chunk:
            continue
        start = 0
        for match in _SENTENCE_SPLIT_RE.finditer(chunk):
            # The pattern's lookbehind puts match.start() just after the
            # punctuation, so the sentence is everything up to that point.
            piece = chunk[start : match.start()]
            if _ends_sentence(piece):
                out.append(piece.strip())
                start = match.end()
        tail = chunk[start:].strip()
        if tail:
            out.append(tail)
    return [s for s in out if s]


def _ends_sentence(piece):
    """False when the trailing period belongs to an abbreviation."""
    if not piece.endswith("."):
        return True
    last = re.findall(r"[A-Za-z]+", piece)
    if not last:
        return True
    return last[-1].lower() not in _NON_TERMINAL


# --- The dictionary --------------------------------------------------------


class Dictionary:
    """The STE dictionary and rules, ready for lookup."""

    def __init__(self, data):
        schema = data.get("schema", "")
        if not schema.startswith(SCHEMA_PREFIX):
            raise ValueError(f"unsupported data schema {schema!r}; expected {SCHEMA_PREFIX}*")
        self.data = data
        self.words = data["words"]
        self.forms = data["forms"]
        self.limits = {k: v["value"] for k, v in data["limits"].items()}
        self.rules = {r["id"]: r for r in data["rules"]}
        self.recurring = {e["non_ste"].lower(): e for e in data["recurring_errors"]}
        self.approved_verbs = frozenset(v.lower() for v in data["approved_verbs"])
        self._participles = None
        self._phrases = None
        self._technical = None

    @classmethod
    def load(cls, path=None):
        path = path or cls.find()
        with open(path, encoding="utf-8") as fh:
            return cls(json.load(fh))

    @staticmethod
    def find():
        here = os.path.dirname(os.path.abspath(__file__))
        for candidate in DATA_CANDIDATES:
            path = os.path.normpath(os.path.join(here, candidate))
            if os.path.exists(path):
                return path
        raise FileNotFoundError(
            "cannot find the STE dataset. Looked for "
            + ", ".join(DATA_CANDIDATES)
            + f" under {here}. Build it with tools/build_data.py or pass --data PATH."
        )

    def variants(self, word):
        """Every dictionary entry for a spelling, or an empty list."""
        return self.words.get(word.lower(), [])

    def status(self, word):
        """"approved", "not-approved", or "unknown" for a spelling.

        A spelling listed both ways - CHECK (n) is approved while check (v) is
        not - counts as approved, because this tool cannot tell which part of
        speech is meant. Rule 1.2 covers that case and needs a parser.
        """
        key = word.lower()
        if key in self.forms:
            return "approved"
        variants = self.variants(key)
        if not variants:
            return "unknown"
        return "approved" if any(v["approved"] for v in variants) else "not-approved"

    def alternatives(self, word):
        """The approved alternatives the dictionary gives for a word."""
        out = []
        for variant in self.variants(word):
            if variant["approved"]:
                continue
            for sense in variant.get("senses", []):
                text = sense.get("alternative_text") or sense.get("alternative")
                if text and text not in out:
                    out.append(text)
        return out

    def past_participles(self):
        """Past participle forms of approved verbs, for the passive-voice check.

        A verb entry lists its forms as present, simple past, past participle,
        so the participle is the last one. Regular verbs repeat the same word
        for the last two, which does no harm here.
        """
        if self._participles is None:
            found = set()
            for variants in self.words.values():
                for variant in variants:
                    if variant.get("pos") == "v" and variant.get("approved"):
                        forms = variant.get("forms") or []
                        if len(forms) >= 2:
                            found.add(forms[-1].lower())
            self._participles = frozenset(found)
        return self._participles

    def technical_terms(self):
        """Words the dictionary itself offers as a technical noun or verb.

        An alternative marked (TN) or (TV) is the dictionary sanctioning that
        spelling as a technical term. It does this even for words it rejects as
        ordinary vocabulary: "fail (v)" and "glitch (n)" are both told to use
        FAILURE (TN), while "failure (n)" is separately rejected as a plain noun
        meaning a performance error. Both statements are true at once, because
        rule 1.5 permits technical nouns and they are absent from the dictionary
        by definition.

        Reporting such a word as forbidden would contradict the dictionary's own
        advice, so it becomes a part-of-speech question instead.
        """
        if self._technical is None:
            found = set()
            for variants in self.words.values():
                for variant in variants:
                    for sense in variant.get("senses", []):
                        if sense.get("alternative_pos") in ("TN", "TV"):
                            term = (sense.get("alternative") or "").strip().lower()
                            if term:
                                found.add(term)
            self._technical = frozenset(found)
        return self._technical

    def approved_phrases(self):
        """Multi-word expressions that STE approves as a unit.

        Some approved entries are phrases (MAKE SURE, GO OFF), and many of the
        alternatives the dictionary offers for a word that is not approved are
        phrases too (IN PROGRESS, AT THE SAME TIME, AS FOLLOWS, MORE THAN).
        Their individual words are not always approved on their own: "progress"
        is rejected as a headword while "IN PROGRESS" is prescribed. Checking
        word by word would therefore report the dictionary's own advice as an
        error, so a phrase match takes precedence over its parts.

        Longest first, so the longest match wins.
        """
        if self._phrases is None:
            found = set()
            for spelling, variants in self.words.items():
                if " " in spelling and any(v.get("approved") for v in variants):
                    found.add(spelling)
                for variant in variants:
                    for sense in variant.get("senses", []):
                        phrase = (sense.get("alternative") or "").strip().lower()
                        # Keep only plain wording. An alternative with an
                        # ellipsis is a template rather than a fixed phrase, and
                        # one with brackets is the dictionary describing a usage
                        # rather than giving words to write.
                        if " " in phrase and re.fullmatch(r"[a-z][a-z \-]*[a-z]", phrase):
                            found.add(phrase)
            self._phrases = sorted(found, key=len, reverse=True)
        return self._phrases

    def headword(self, word):
        """The dictionary entries for a spelling, following inflected forms.

        "connects" resolves through CONNECT, so the caller sees the verb entry
        rather than nothing.
        """
        key = word.lower()
        base = self.forms.get(key)
        return self.variants(base) if base else self.variants(key)

    def parts_of_speech_of(self, word):
        """Every part of speech the dictionary gives this spelling."""
        return {v.get("pos") for v in self.headword(word) if v.get("pos")}

    def is_noun_candidate(self, word):
        """Whether a word could be part of a multi-word noun.

        True for a dictionary noun or adjective, and for any word the
        dictionary does not list, since rule 1.5 lets that be a technical noun.
        False for verbs, adverbs, articles, prepositions, conjunctions and
        pronouns, which is what ends a run.
        """
        kinds = self.parts_of_speech_of(word)
        if not kinds:
            return True
        return bool(kinds & {"n", "adj"})

    def is_noun_marker(self, word):
        """Whether this word signals that a noun follows it.

        An article, a preposition, a demonstrative or an adjective all put the
        next word in a noun position. Used to tell "drain the fuel" (a noun,
        permitted as a technical noun) from "fuel the aircraft" (the verb the
        dictionary rejects).
        """
        key = word.lower()
        if key in ("a", "an", "the", "this", "these", "those", "its", "their", "no", "any"):
            return True
        if _NUMBER_RE.match(key):
            return True
        return bool(self.parts_of_speech_of(key) & {"art", "prep", "adj"})


# --- Findings --------------------------------------------------------------


class Finding:
    __slots__ = ("path", "line", "column", "severity", "rule", "message", "text")

    def __init__(self, path, line, column, severity, rule, message, text=""):
        self.path = path
        self.line = line
        self.column = column
        self.severity = severity
        self.rule = rule
        self.message = message
        self.text = text

    def sort_key(self):
        return (self.path, self.line, self.column, self.rule, self.message)

    def format(self):
        return (
            f"{self.path}:{self.line}:{self.column}: {self.severity} "
            f"[{self.rule}] {self.message}"
        )

    def as_dict(self):
        return {
            "path": self.path,
            "line": self.line,
            "column": self.column,
            "severity": self.severity,
            "rule": self.rule,
            "message": self.message,
            "text": self.text,
        }


# --- Checks ----------------------------------------------------------------

LATIN_ABBREVIATIONS = {
    "e.g.": "FOR EXAMPLE",
    "i.e.": "THAT IS",
    "etc.": "a complete list, or “AND OTHERS”",
    "et al.": "AND OTHERS",
    "viz.": "THAT IS",
    "vs.": "COMPARED TO",
    "cf.": "REFER TO",
    "n.b.": "NOTE",
    "ca.": "APPROXIMATELY",
}
_LATIN_RE = re.compile(
    r"(?<![A-Za-z])(" + "|".join(re.escape(a) for a in LATIN_ABBREVIATIONS) + r")",
    re.IGNORECASE,
)
_NOT_CONTRACTION_RE = re.compile(r"\b\w+n['’]t\b|\b(?:it|that|there|he|she|who|what|let)"
                                 r"['’]s\b|\b\w+['’](?:re|ve|ll|m)\b", re.IGNORECASE)
_POSSESSIVE_RE = re.compile(r"\b([A-Za-z]+)['’]s\b")
_PROGRESSIVE_RE = re.compile(
    r"\b(?:am|is|are|was|were|be|been|being)\s+(?:not\s+|also\s+)?([a-z]+ing)\b", re.IGNORECASE
)
_PASSIVE_RE = re.compile(
    r"\b(?:am|is|are|was|were|be|been|being)\s+(?:not\s+|also\s+)?([a-z]+)\b", re.IGNORECASE
)
# "MAKE SURE THAT ... IS CLOSED" states a required condition. The participle
# there is an adjective (rule 3.3), not the passive voice.
_MAKE_SURE_RE = re.compile(r"\bmake\s+sure\b", re.IGNORECASE)
# An agent named after the verb is what makes a construction unambiguously
# passive: "... IS INSTALLED BY THE TECHNICIAN".
_AGENT_RE = re.compile(r"\s+by\s+(?:the|a|an)?\s*[a-z]", re.IGNORECASE)
_WORD_RE = re.compile(r"[A-Za-z][A-Za-z’'\-]*")
# Openers rule 5.4 permits before a command, and safety words from section 7.
_CONDITION_OPENERS = frozenset(
    "if when before after while unless until as at during for from in on to with "
    "warning caution danger note attention notice do make put set".split()
)
_STEP_RE = re.compile(r"^\s*(?:\(?\d+[.)]|\(?[A-Za-z][.)])\s+")


def check_text(text, path, dictionary, mode="auto", strict=False):
    """Check one document. Returns findings sorted by position."""
    findings = []
    for block in _blocks(text):
        findings.extend(_check_block(block, path, dictionary, mode, strict))
    findings.sort(key=Finding.sort_key)
    return findings


class _Block:
    """A paragraph, with the line number each of its lines came from."""

    def __init__(self, lines, start_line):
        self.lines = lines
        self.start_line = start_line

    @property
    def text(self):
        return "\n".join(self.lines)


def _blocks(text):
    """Split a document into paragraphs, keeping line numbers."""
    out, current, start = [], [], 1
    for number, raw in enumerate(text.splitlines(), start=1):
        if raw.strip():
            if not current:
                start = number
            current.append(raw)
        elif current:
            out.append(_Block(current, start))
            current = []
    if current:
        out.append(_Block(current, start))
    return out


def _check_block(block, path, dictionary, mode, strict):
    findings = []
    block_mode = _mode_of(block, dictionary) if mode == "auto" else mode

    sentences = split_sentences(block.text)
    limit_key = (
        "max_words_per_procedural_sentence"
        if block_mode == "procedural"
        else "max_words_per_descriptive_sentence"
    )
    limit = dictionary.limits[limit_key]
    limit_rule = "5.1" if block_mode == "procedural" else "6.3"

    for sentence in sentences:
        line, column = _locate(block, sentence)
        words = count_words(sentence)
        if words > limit:
            findings.append(
                Finding(
                    path, line, column, "error", limit_rule,
                    f"sentence has {words} words; the maximum for {block_mode} writing "
                    f"is {limit}. Counted as rules 8.4 thru 8.7 require.",
                    sentence,
                )
            )
        findings.extend(_check_sentence(sentence, block, path, dictionary, block_mode, strict))

    max_sentences = dictionary.limits["max_sentences_per_paragraph"]
    if block_mode == "descriptive" and len(sentences) > max_sentences:
        findings.append(
            Finding(
                path, block.start_line, 1, "error", "6.6",
                f"paragraph has {len(sentences)} sentences; the maximum is {max_sentences}.",
                block.lines[0],
            )
        )
    return findings


def _mode_of(block, dictionary):
    """Guess whether a paragraph is procedural or descriptive.

    Procedural writing gives instructions in the command form, so a paragraph
    that is a numbered step, or whose first word is an approved verb, is read as
    procedural. Everything else is read as descriptive, which is the safer
    default: its sentence limit is longer and its paragraph limit applies.
    """
    first = block.lines[0]
    if _STEP_RE.match(first):
        return "procedural"
    words = _WORD_RE.findall(first)
    if words and words[0].lower() in dictionary.approved_verbs:
        return "procedural"
    return "descriptive"


def _check_sentence(sentence, block, path, dictionary, mode, strict):
    findings = []
    line, base = _locate(block, sentence)

    def at(fragment):
        offset = sentence.find(fragment)
        return base + (offset if offset >= 0 else 0)

    # Rule 8.1: no semicolons.
    if ";" in sentence:
        findings.append(Finding(
            path, line, at(";"), "error", "8.1",
            "the semicolon (;) is not permitted. Write two sentences.", sentence))

    # GR-6: no Latin abbreviations.
    for match in _LATIN_RE.finditer(sentence):
        found = match.group(1)
        replacement = LATIN_ABBREVIATIONS[found.lower()]
        findings.append(Finding(
            path, line, base + match.start(), "error", "GR-6",
            f'the Latin abbreviation "{found}" is not permitted. Use {replacement}.', sentence))

    # Rule 4.2: no contractions.
    for match in _NOT_CONTRACTION_RE.finditer(sentence):
        findings.append(Finding(
            path, line, base + match.start(), "error", "4.2",
            f'"{match.group(0)}" is a contraction. Write the words in full.', sentence))

    # Rules 3.2 and 3.5: the "-ing" form is not a permitted verb form.
    for match in _PROGRESSIVE_RE.finditer(sentence):
        findings.append(Finding(
            path, line, base + match.start(), "error", "3.2",
            f'"{match.group(0).strip()}" uses the "-ing" form as a verb. Use the simple '
            "present, simple past, or simple future tense.", sentence))

    # Rule 3.6: use the active voice. Rule 3.3 permits the past participle as an
    # adjective, which looks identical: "THE PUMP IS INSTALLED BY THE TECHNICIAN"
    # is the passive voice, while "MAKE SURE THAT THE VALVE IS CLOSED" describes
    # a required state and is canonical STE. Only a named agent settles it, so a
    # sentence with one is an error and a bare participle is a warning.
    for match in _PASSIVE_RE.finditer(sentence):
        participle = match.group(1).lower()
        if participle not in dictionary.past_participles():
            continue
        if _MAKE_SURE_RE.search(sentence[: match.start()]):
            continue  # a required state, not an action done to something
        agent = _AGENT_RE.match(sentence[match.end() :])
        if agent:
            findings.append(Finding(
                path, line, base + match.start(), "error", "3.6",
                f'"{match.group(0).strip()}{agent.group(0).rstrip()}" is the passive voice, '
                "and it names the agent. Write it as active: put the agent first.", sentence))
        else:
            note = (
                "Procedures use the command form, so start with the verb."
                if mode == "procedural"
                else "In descriptive writing this is permitted only when the agent is "
                "unknown. If it describes a state rather than an action, rule 3.3 "
                "permits it."
            )
            findings.append(Finding(
                path, line, base + match.start(), "warning", "3.6",
                f'"{match.group(0).strip()}" may be the passive voice. {note}', sentence))

    # GR-8: the possessive form is permitted but is easy to get wrong.
    for match in _POSSESSIVE_RE.finditer(sentence):
        findings.append(Finding(
            path, line, base + match.start(), "warning", "GR-8",
            f'"{match.group(0)}" is the possessive form. Make sure it is necessary and '
            "correct; a construction with OF is usually clearer.", sentence))

    findings.extend(_check_words(sentence, path, line, base, dictionary, strict))
    findings.extend(_check_multi_word_nouns(sentence, path, line, base, dictionary))

    if mode == "procedural":
        findings.extend(_check_command_form(sentence, path, line, base, dictionary))
    return findings


def _check_words(sentence, path, line, base, dictionary, strict):
    """Rules 1.1, 1.2 and 1.6: use approved words, technical nouns, or
    technical verbs."""
    findings = []
    covered = _phrase_spans(sentence, dictionary)
    # Text in parentheses and quoted text are still words to check, so this
    # walks the raw sentence rather than the collapsed one.
    for match in _WORD_RE.finditer(sentence):
        word = match.group(0)
        if any(start <= match.start() and match.end() <= end for start, end in covered):
            continue  # inside an approved multi-word expression
        status = dictionary.status(word)
        column = base + match.start()
        if status == "approved":
            continue
        if status == "unknown":
            if strict:
                findings.append(Finding(
                    path, line, column, "info", "1.5",
                    f'"{word}" is not in the dictionary. It is permitted only if it is a '
                    "technical noun or a technical verb in your subject field.", sentence))
            continue

        recurring = dictionary.recurring.get(word.lower())
        alternatives = dictionary.alternatives(word)
        kinds = dictionary.parts_of_speech_of(word)
        shown = "; ".join(alternatives[:4]) + (" (and others)" if len(alternatives) > 4 else "")
        pos = "/".join(sorted(kinds)) if kinds else ""
        labelled = f'"{word}"' + (f" ({pos})" if pos else "")

        # The dictionary's own alternative is sometimes the same spelling in a
        # different role: check (v) is not approved, CHECK (n) is. That is a
        # part-of-speech question (rule 1.2), not a forbidden word.
        # The dictionary offers this spelling as a technical noun or verb
        # somewhere, so rule 1.5 permits it in that role.
        if word.lower() in dictionary.technical_terms():
            findings.append(Finding(
                path, line, column, "warning", "1.5",
                f'{labelled} is not approved as {_pos_name(pos)}, but the dictionary offers '
                f'"{word.upper()}" as a technical noun or verb, which rule 1.5 permits. Make '
                "sure that is how it is used here.", sentence))
            continue

        # A word the dictionary rejects only as a verb is still permitted as a
        # technical noun (rule 1.5). When it follows an article, a preposition
        # or an adjective it is being used as a noun, so this reports it for
        # confirmation rather than as an error.
        if kinds == {"v"} and _preceding_word(sentence, match) and dictionary.is_noun_marker(
            _preceding_word(sentence, match)
        ):
            findings.append(Finding(
                path, line, column, "info", "1.5",
                f'{labelled} is not approved as a verb, and here follows '
                f'"{_preceding_word(sentence, match)}", so it reads as a noun. That is '
                "permitted only if it is a technical noun in your subject field. As a verb, "
                f"use {shown or 'a different word'}.", sentence))
            continue

        if recurring:
            findings.append(Finding(
                path, line, column, "error", "1.1",
                f'{labelled} is not approved in STE and is one of the most frequent errors. '
                f"Use {recurring['use_instead']}.", sentence))
        elif alternatives:
            findings.append(Finding(
                path, line, column, "error", "1.1",
                f"{labelled} is not approved in STE. Use {shown}.", sentence))
        else:
            findings.append(Finding(
                path, line, column, "error", "1.1",
                f"{labelled} is not approved in STE. Use a different word or a different "
                "sentence construction.", sentence))
    return findings


POS_NAMES = {
    "n": "a noun",
    "v": "a verb",
    "adj": "an adjective",
    "adv": "an adverb",
    "pron": "a pronoun",
    "art": "an article",
    "prep": "a preposition",
    "conj": "a conjunction",
    "TN": "a technical noun",
    "TV": "a technical verb",
}


def _pos_name(pos):
    return POS_NAMES.get(pos, f"({pos})" if pos else "used here")


def _preceding_word(sentence, match):
    """The word immediately before `match`, or "" at the start of a sentence."""
    before = _WORD_RE.findall(sentence[: match.start()])
    return before[-1] if before else ""


def _phrase_spans(sentence, dictionary):
    """Character ranges in `sentence` occupied by approved multi-word phrases."""
    spans = []
    for phrase in dictionary.approved_phrases():
        pattern = r"\b" + r"\s+".join(re.escape(w) for w in phrase.split()) + r"\b"
        for match in re.finditer(pattern, sentence, re.IGNORECASE):
            if not any(start <= match.start() and match.end() <= end for start, end in spans):
                spans.append((match.start(), match.end()))
    return spans


def _check_multi_word_nouns(sentence, path, line, base, dictionary):
    """Rule 2.1: write multi-word nouns of no more than three words.

    Approximate on purpose. A multi-word noun cannot be identified for certain
    without parts of speech in context, so this reports runs of words that are
    all either dictionary nouns or adjectives, or absent from the dictionary
    (so possibly technical nouns). Function words, verbs and adverbs end a run,
    which is what keeps ordinary sentences from being reported.
    """
    limit = dictionary.limits["max_words_per_multi_word_noun"]
    findings = []
    run = []
    for match in list(_WORD_RE.finditer(sentence)) + [None]:
        # Punctuation between two words ends the run: a comma or a period is
        # never inside a multi-word noun.
        broken_by_punctuation = bool(
            run and match and re.search(r"[^\s]", sentence[run[-1].end() : match.start()])
        )
        if match and not broken_by_punctuation and dictionary.is_noun_candidate(match.group(0)):
            run.append(match)
            continue
        if len(run) > limit:
            phrase = sentence[run[0].start() : run[-1].end()]
            findings.append(Finding(
                path, line, base + run[0].start(), "warning", "2.1",
                f'"{phrase}" may be a multi-word noun of {len(run)} words; the maximum is '
                f"{limit}. Write it in full, then give a shorter form or use hyphens "
                "(rule 2.2).", sentence))
        run = []
        # The word that ended the run can itself start the next one.
        if match and broken_by_punctuation and dictionary.is_noun_candidate(match.group(0)):
            run.append(match)
    return findings


def _check_command_form(sentence, path, line, base, dictionary):
    """Rules 3.2 and 5.3: write instructions in the command form.

    A procedural sentence should begin with an approved verb, a step number, or
    the descriptive condition that rule 5.4 permits before the command.
    """
    stripped = _STEP_RE.sub("", sentence).strip()
    words = _WORD_RE.findall(stripped)
    if not words:
        return []
    first = words[0].lower()
    if first in dictionary.approved_verbs or first in _CONDITION_OPENERS:
        return []
    if "," in stripped:
        # Rule 5.4: a condition, a comma, then the command. Check the command.
        after = stripped.split(",", 1)[1].strip()
        following = _WORD_RE.findall(after)
        if following and following[0].lower() in dictionary.approved_verbs:
            return []
    return [Finding(
        path, line, base, "warning", "5.3",
        f'this instruction does not start with an approved verb in the command form '
        f'("{words[0]}"). Refer to rules 3.2, 5.3 and 5.4.', sentence)]


def _locate(block, fragment):
    """Line number and column of `fragment` inside `block`."""
    for offset, raw in enumerate(block.lines):
        column = raw.find(fragment[:40])
        if column >= 0:
            return block.start_line + offset, column + 1
    return block.start_line, 1


# --- Command line ----------------------------------------------------------


def _read(path):
    if path == "-":
        return sys.stdin.read(), "<stdin>"
    with open(path, encoding="utf-8") as fh:
        return fh.read(), path


def main(argv=None):
    parser = argparse.ArgumentParser(
        prog="ste_lint.py",
        description="Check text against the ASD-STE100 Simplified Technical English rules.",
    )
    parser.add_argument("paths", nargs="+", metavar="FILE", help='file to check, or "-" for stdin')
    parser.add_argument(
        "--mode",
        default="auto",
        choices=["auto", "procedural", "descriptive"],
        help="which sentence and paragraph limits to apply (default: auto, per paragraph)",
    )
    parser.add_argument("--data", help="path to ste100-lint.json (default: found next to this file)")
    parser.add_argument("--json", action="store_true", help="write findings as JSON")
    parser.add_argument(
        "--strict",
        action="store_true",
        help="also list words that are not in the dictionary at all (rule 1.5)",
    )
    parser.add_argument(
        "--fail-on",
        default="error",
        choices=list(SEVERITIES) + ["never"],
        help="lowest severity that makes the exit status 1 (default: error)",
    )
    parser.add_argument("--version", action="version", version=f"ste_lint.py {__version__}")
    args = parser.parse_args(argv)

    try:
        dictionary = Dictionary.load(args.data)
    except (OSError, ValueError, KeyError) as exc:
        print(f"ste_lint.py: {exc}", file=sys.stderr)
        return 2

    findings = []
    for path in args.paths:
        try:
            text, name = _read(path)
        except OSError as exc:
            print(f"ste_lint.py: {exc}", file=sys.stderr)
            return 2
        findings.extend(check_text(text, name, dictionary, args.mode, args.strict))

    counts = {level: sum(1 for f in findings if f.severity == level) for level in SEVERITIES}
    if args.json:
        json.dump(
            {
                "version": __version__,
                "issue": dictionary.data["standard"]["issue"],
                "counts": counts,
                "findings": [f.as_dict() for f in findings],
            },
            sys.stdout,
            indent=1,
        )
        sys.stdout.write("\n")
    else:
        for finding in findings:
            print(finding.format())
        summary = ", ".join(f"{counts[level]} {level}" for level in SEVERITIES)
        print(f"{len(findings)} findings ({summary})", file=sys.stderr)

    if args.fail_on == "never":
        return 0
    threshold = SEVERITIES.index(args.fail_on)
    hit = any(SEVERITIES.index(f.severity) <= threshold for f in findings)
    return 1 if hit else 0


if __name__ == "__main__":
    sys.exit(main())
