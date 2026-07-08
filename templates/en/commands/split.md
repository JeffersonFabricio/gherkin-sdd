---
description: Splits a feature that grew too big into smaller, independently valuable features. Keeps each spec focused (KISS).
---

# /split

You will break a feature that got too large into **smaller, decoupled features**,
each independently specifiable, testable, and shippable. A feature is a candidate
to split when it has **more than ~7 tasks**, mixes unrelated behaviors, or its
scenarios no longer read as one coherent capability.

## Input
`$ARGUMENTS`: path to the feature. If empty, use the most recent one in `specs/`.

## Do
1. Read `feature.feature`, `plan.md`, and `tasks.md`. Count the tasks and cluster
   the scenarios by the capability they exercise.
2. Propose a decomposition into sub-features where each one:
   - delivers observable value on its own (a user could stop after it),
   - owns a coherent, testable slice of the scenarios,
   - has minimal coupling to the others (name the dependencies explicitly).
3. **Confirm the split with the user** before touching files.
4. On approval, for each sub-feature create `specs/<NNN-name>/feature.feature`
   (next sequential numbers) and move the relevant scenarios there intact — don't
   rewrite behavior, just redistribute it. Note the split and any ordering
   dependency at the top of each new `feature.feature`.
5. Update the **feature index** in `.gherkin-sdd/memory/memory.md`: mark the
   original as `split` and add the new features, and record the decision (date +
   why) in the decisions log.

## Output
- The proposed decomposition (before) and the created spec folders (after).
- The dependency order for implementing them.
- A recommendation to run `/plan` on the first sub-feature.

## Don't
- Don't change what the scenarios mean — a split redistributes behavior, it doesn't redesign it.
- Don't create sub-features that only make sense together (that's not a real split).
- Don't split just to hit a number; if the feature is genuinely one capability, say so and stop.
