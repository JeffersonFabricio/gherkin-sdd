---
description: Health check of the gherkin-sdd structure. Diagnoses missing files, stale placeholders, and spec ↔ memory drift.
---

# /doctor

You will run a diagnostic on the project's gherkin-sdd setup and report its health.
This is a **read-only** command: it finds problems and recommends the command that
fixes each one — it doesn't fix them itself.

## Do
Check and report on:

1. **Structure** — do `.gherkin-sdd/memory/constitution.md` and `memory.md` exist?
   Are the agent files present for the agents in use (`CLAUDE.md`, `.claude/commands/`,
   `.github/prompts/`, `.cursor/`, `.gemini/`)?
2. **Placeholders** — does `constitution.md` still contain unfilled `<placeholders>`?
3. **Index ↔ disk drift** — every feature in the `memory.md` index has a folder in
   `specs/`, and every `specs/` folder appears in the index, with a matching status.
4. **Spec integrity** — each active feature has a `feature.feature`; specs with a
   plan/tasks but no scenarios, or scenarios with no task, are flagged.
5. **Context hygiene** — is `memory.md` getting long or full of stale entries that
   should be trimmed? Are there lingering `TODO(clarify)` across specs?

## Output
- A checklist report, each item marked 🟢 ok / 🟡 attention / 🔴 broken.
- For every 🟡/🔴, the exact remedy: the command to run (`/welcome-gherkin-sdd`,
  `/constitution`, `/specify`, `/clarify`, `/analyze`…) or the manual fix.
- A one-line overall verdict: healthy, or the top thing to fix first.

## Don't
- Don't modify any file — only diagnose and recommend.
- Don't report noise; if everything is 🟢, say so briefly (KISS).
