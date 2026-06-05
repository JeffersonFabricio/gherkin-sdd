---
description: Creates or updates the project constitution (project-specific principles that extend the gherkin-sdd playbook).
---

# /constitution

You will establish (or revise) this project's **constitution** in
`.gherkin-sdd/memory/constitution.md`. It extends the gherkin-sdd playbook (SDD, Gherkin,
KISS, YAGNI) with this project's specific rules.

## Input
Free-form user argument (`$ARGUMENTS`): project context, constraints,
stack preferences, conventions. It may be empty — then ask.

## Do
1. Read `.gherkin-sdd/memory/constitution.md` if it already exists. Don't throw away what's
   there; evolve it.
2. Confirm/collect the points below. Ask **only** the questions whose answers
   you don't already know (YAGNI applies to questions too):
   - The product's domain and goal in one sentence.
   - Language of the spec/Gherkin and of communication.
   - Mandatory or forbidden stack (language, framework, database, etc.).
   - Test conventions (which runner executes the Gherkin scenarios? e.g. Cucumber,
     Behave, pytest-bdd, SpecFlow, Jest+cucumber).
   - Non-negotiable constraints (security, compliance, performance).
3. Write `.gherkin-sdd/memory/constitution.md` short and actionable. Every rule must be
   verifiable. No filler — KISS applies to the document itself.
4. Restate the 4 principles at the top and record how they apply to **this** project.

## Output
- Updated `.gherkin-sdd/memory/constitution.md`.
- A 3-5 line summary of what changed and why.

## Don't
- Don't invent rules nobody asked for (YAGNI).
- Don't define architecture here — that's `/plan`'s job.
