---
description: Removes ambiguity from the Gherkin spec with structured questions before planning.
---

# /clarify

You will reduce the spec's uncertainty **before** any planning or code.
Unresolved ambiguity turns into rework and YAGNI code.

## Input
`$ARGUMENTS`: path to the feature (e.g. `specs/001-email-login`). If empty, use
the most recent feature in `specs/`.

## Do
1. Read the folder's `feature.feature`. Collect every `# TODO(clarify)` and anything
   underspecified (vague rules, undefined values, omitted edge behavior, ambiguous
   domain terms).
2. Ask **closed, numbered** questions, grouped by theme. Prefer offering
   options (a/b/c) over open questions. Only ask what changes the spec — YAGNI.
3. With each answer, **update `feature.feature`**: add/edit scenarios,
   remove the resolved `TODO(clarify)`. Record relevant decisions in `notes.md`.
4. Stop when no ambiguity that affects behavior remains.

## Output
- Updated `feature.feature` and `notes.md` with the record of decisions.
- Confirmation that no open `TODO(clarify)` remains.

## Don't
- Don't decide architecture here (that's `/plan`).
- Don't ask about things outside the scope of the current scenarios.
