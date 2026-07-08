---
description: Resumes the project at the start of a session. Reads the memory + constitution and tells you the single next action.
---

# /status

Run this **at the start of every session**. You are the orchestrator: load the
project context, figure out where things stand, and point to the one next action.
This is a **read-only** command — it orients, it doesn't change files.

## Do
1. Read `.gherkin-sdd/memory/constitution.md` and `.gherkin-sdd/memory/memory.md`.
   If either is missing or still full of `<placeholders>`, say so and route to
   `/welcome-gherkin-sdd`.
2. Read the **feature index** in `memory.md` and cross-check it against `specs/`:
   - Which feature is in progress? What is its status (draft · specified · in
     implementation · done)?
   - For the active feature, glance at `feature.feature`, `plan.md`, and `tasks.md`
     to see which checklist items are still `[ ]`.
3. Detect drift: features on disk missing from the index, or index entries with no
   folder. Flag them (recommend `/doctor` for a full check).

## Output
- **Where we are** (2-4 lines): last completed feature, what's in progress.
- **Next action** — exactly one command, with the argument to pass, e.g.
  `/implement specs/003-checkout` or `/clarify` on the open `TODO(clarify)`.
- Any pending `TODO(clarify)` or unresolved decisions worth surfacing first.

## Don't
- Don't change any file (that's the job of the command you recommend).
- Don't dump the whole memory back at the user — synthesize the state (KISS).
- Don't propose more than one next action; pick the highest-leverage one.
