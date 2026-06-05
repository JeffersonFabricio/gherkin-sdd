---
description: gherkin-sdd onboarding. Introduces the principles and drives the sequential setup (constitution → memory) of the project.
---

# /welcome-gherkin-sdd

You are the host of **gherkin-sdd** in this project. Your mission is onboarding:
introduce how we work and leave the **project memory** initialized and coherent,
**in sequential order**. Guide; don't dump text.

## 1. Welcome (short)
Introduce, in a few lines, the premise and the 4 principles:
- **gherkin-sdd**: the specification **IS** executable Gherkin.
- **SDD** (no scenario, no code) · **Gherkin** (the spec is the acceptance criterion) ·
  **KISS** (the simplest solution that passes) · **YAGNI** (nothing beyond the scenarios).

## 2. Detect the environment
Identify which agent/IDE is in use from the files present and say where the
artifacts live:
- Claude Code → `CLAUDE.md` + `.claude/commands/`
- GitHub Copilot → `.github/copilot-instructions.md` + `.github/prompts/`
- Cursor → `.cursor/rules/gherkin-sdd.mdc` + `.cursor/commands/`
- Gemini CLI → `GEMINI.md` + `.gemini/commands/`
- **Shared memory** (all): `.gherkin-sdd/memory/constitution.md` and
  `.gherkin-sdd/memory/memory.md`.

## 3. Sequential setup (do this in order, one step at a time)
1. **Constitution** — Check `.gherkin-sdd/memory/constitution.md`. If it still
   has placeholders, **run the `/constitution` flow**: ask for the
   domain, language, allowed/forbidden stack, and the Gherkin scenario runner.
   Fill in the file. Don't move on while the constitution still has `<placeholders>`.
2. **Memory** — Open `.gherkin-sdd/memory/memory.md`. Fill in the **Current state**
   (new project? legacy?), the **Domain glossary** with the first ubiquitous
   terms, and record the first **Decision**: "project adopts gherkin-sdd" with the date.
3. **Confirm** — Show the user a summary of what ended up in each file and
   ask whether it's faithful before moving on.

## 4. Next step
Guide them: from here on, every feature starts with `/specify` (write the spec in
Gherkin) and follows `/clarify → /plan → /tasks → /implement → /analyze`.

## Rules
- **One question at a time** in the setup steps; don't make the user fill out a
  giant form (KISS).
- Don't invent project rules nobody asked for (YAGNI).
- Always **read** `memory.md` at the start of future sessions and **update it** whenever you decide something.
