---
description: Generates the test-first implementation checklist, with each task tied to Gherkin scenarios.
---

# /tasks

You will break the plan into small, ordered, **test-first** tasks, where each
task is traceable to one or more scenarios.

## Input
`$ARGUMENTS`: path to the feature. If empty, use the most recent one in `specs/`.

## Do
1. Read `feature.feature` and `plan.md`.
2. Write `specs/<.../tasks.md` as a Markdown checklist. For each task:
   - Start with the test: the first task for each scenario is "write the test that
     proves scenario X (must fail)".
   - Then the minimal implementation that makes the test pass.
   - Cite the covered scenario(s): `(covers: Scenario "…")`.
   - Indicate concrete files/paths.
   - Mark parallelizable tasks with `[P]`.
3. Order by dependency. Every scenario in the `.feature` must have coverage — if any
   is left without a task, **it's a bug**: either a task is missing or the scenario is superfluous (YAGNI → remove via clarify).
4. Don't create tasks that don't trace to any scenario.

## Output
- `specs/<.../tasks.md`.
- Coverage table: each scenario → tasks that cover it (must be 100%).

## Don't
- Don't include "infra for the future" tasks with no scenario (YAGNI).
- Don't group several behaviors into one giant task (KISS).
