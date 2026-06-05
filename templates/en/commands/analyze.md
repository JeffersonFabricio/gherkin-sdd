---
description: Checks consistency between the spec (Gherkin) ↔ plan ↔ tasks ↔ code. Flags gaps and excess.
---

# /analyze

You will audit the feature's coherence. This is a **read-only** command: it
reports, it does not fix (fixes go back through the appropriate command).

## Input
`$ARGUMENTS`: path to the feature. If empty, use the most recent one in `specs/`.

## Do
Read `feature.feature`, `plan.md`, `tasks.md`, `.gherkin-sdd/memory/constitution.md`, and the
related code. Check and report:

1. **Coverage (SDD)**: does every scenario have a task and a test? List orphan scenarios.
2. **Excess (YAGNI)**: is there code/contract/task that no scenario requires?
   List each one and the missing scenario — or recommend removal.
3. **Simplicity (KISS)**: is there abstraction or a layer with no scenario to justify it?
4. **Fidelity**: does `plan.md` contradict the spec anywhere?
5. **Gherkin quality**: scenarios with technical detail, vague, or untestable?
6. **Constitution**: any violation of the project's rules?

## Output
- A report by section, each finding with severity (🔴 blocks / 🟡 attention / 🟢 ok)
  and the recommended action (`/clarify`, `/specify`, adjust the plan, remove code…).
- Verdict: is the feature consistent enough to be considered done?

## Don't
- Don't change files. Just report and recommend the next command.
