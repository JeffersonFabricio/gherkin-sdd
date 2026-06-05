---
description: Defines the technical approach (stack, architecture, contracts) that realizes the Gherkin scenarios — the simplest possible.
---

# /plan

You will decide **how** to realize the spec's scenarios, choosing the simplest
solution that satisfies them (KISS) and nothing beyond (YAGNI).

## Input
`$ARGUMENTS`: path to the feature. If empty, use the most recent one in `specs/`.

## Do
1. Read `feature.feature` and `.gherkin-sdd/memory/constitution.md`. The spec rules; the plan serves.
2. Write `specs/<.../plan.md` covering **only** what the scenarios need:
   - **Stack/decisions**: what will be used and why (respecting the constitution).
   - **Minimal architecture**: components and their roles. No speculative layers.
   - **Contracts**: APIs, schemas, events — only the ones some scenario requires.
   - **Scenario → component map**: each scenario points to what realizes it.
   - **Test strategy**: which runner executes the `.feature` files and how.
3. For each decision, note the simpler alternative you discarded and why.
   If there's no strong reason, pick the simplest one.

## Output
- `specs/<.../plan.md`.
- List of decisions and the KISS/YAGNI trade-offs.

## Don't
- **Don't** design for unspecified future requirements (YAGNI).
- **Don't** introduce abstraction without a scenario that makes it necessary.
- **Don't** contradict the spec — if something in the spec is unfeasible, go back to `/clarify`.
