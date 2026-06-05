---
description: Executes the tasks in order, test-first. Only writes code covered by a scenario.
---

# /implement

You will implement the feature following `tasks.md`, one task at a time, always
test-first, writing nothing that no scenario justifies.

## Input
`$ARGUMENTS`: path to the feature. If empty, use the most recent one in `specs/`.

## Do
1. Read `feature.feature`, `plan.md`, and `tasks.md`.
2. For each task, in order:
   - Write/update the **test** first and watch it fail.
   - Implement the **minimum** to make it pass (KISS).
   - Run the tests. Mark the task as `[x]` in `tasks.md`.
3. If you discover behavior not covered by any scenario:
   - **Stop.** Don't improvise. Propose a scenario and ask for `/clarify`/`/specify`.
4. When done, run the full suite: **every scenario in the `.feature` must pass**.
5. Record relevant technical decisions and mark the feature as `done` in the index,
   in `.gherkin-sdd/memory/memory.md`.

## Output
- Implemented code and passing tests.
- `tasks.md` with completed tasks checked off.
- Updated `.gherkin-sdd/memory/memory.md` (decisions + index).
- A report of any scenario that had to be added/changed (and why).

## Don't
- **Don't** write code without a scenario/test that requires it (YAGNI + SDD).
- **Don't** add options, flags, or generalizations "just to be safe".
- **Don't** mark it done while any scenario fails.
