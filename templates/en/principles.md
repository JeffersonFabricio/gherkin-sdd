# AI Playbook — gherkin-sdd

> Spec-Driven Development (SDD) where **the specification IS executable Gherkin**.
> The spec does not describe the code — it defines the behavior, and the code exists to satisfy it.

This document is your operating constitution. Every implementation decision must
be traceable back to an approved Gherkin scenario. When these principles conflict
with a request, **make the conflict explicit** before proceeding.

---

## The 4 principles

### 1. SDD — Spec-Driven Development
The specification comes **before** the code. Nothing is implemented without a
corresponding scenario. The flow is always:

`constitution → specify → clarify → plan → tasks → implement → analyze`

- Don't jump from idea straight to code. If there is no `.feature`, write the `.feature` first.
- The spec describes **what** and **why**; the plan describes **how**.
- If during implementation you discover unspecified behavior,
  **stop and update the spec** — don't make it up.

### 2. Gherkin — the spec IS executable
Each feature is described in Gherkin (`Feature` / `Scenario` / `Given-When-Then`).
These scenarios are, at the same time:

- the **source of truth** for behavior,
- the **acceptance criteria**,
- and the basis for the **automated tests**.

Rules for good Gherkin:
- **Behavior, not implementation.** "Given the user has insufficient balance"
  and not "Given the `balance` field in the `accounts` table is < 0".
- Domain (ubiquitous) language, in the team's language.
- One scenario = one observable behavior. No endlessly stacked `And`.
- Use `Scenario Outline` + `Examples` for data variations, not copy-paste.
- Each scenario must be verifiable from the outside: if you can't picture the
  test that proves it, the scenario is vague.

### 3. KISS — Keep It Simple
The correct solution is the **simplest one that makes all scenarios pass**.

- Prefer the obvious approach over the clever one. Code is read more than it is written.
- No layers of abstraction "just in case". No design patterns without a pain that justifies them.
- If explaining the solution takes longer than the solution itself, simplify.
- Small functions, domain names, linear flow whenever possible.

### 4. YAGNI — You Aren't Gonna Need It
Implement **only** what the current scenarios require.

- No configuration, parameter, hook, or generalization that no scenario asks for.
- No "laying the groundwork for the future". The future arrives with its own spec.
- When reviewing a plan or task, ask: *"which scenario breaks if I remove this?"*
  If none, **remove it**.

---

## How the principles interact

- **SDD defines the gate**: no scenario, no code.
- **Gherkin defines the target**: the scenarios say exactly when you are done.
- **KISS defines the path**: among the solutions that pass, choose the simplest.
- **YAGNI defines the boundary**: stop when the scenarios pass; go no further.

Golden rule: **every line of code must be defensible by pointing to a scenario.**
If you can't point to one, either the code is unnecessary (YAGNI) or a scenario is missing (SDD).

---

## Project artifacts

```
.gherkin-sdd/
  memory/
    constitution.md        # principles specific to this project (extends this playbook)
    memory.md              # living memory: decisions, learnings, glossary, index
  templates/               # models copied by the commands (feature/plan/tasks)
specs/
  <NNN-feature-name>/
    feature.feature        # THE SPEC — Gherkin, source of truth
    plan.md                # technical decisions: architecture, stack, contracts
    tasks.md               # ordered, test-first checklist derived from the scenarios
    notes.md               # (optional) clarifications and resolved questions
```

- **Read `.gherkin-sdd/memory/memory.md` at the start of every session** and update it whenever you decide something.
- `feature.feature` is immutable during implementation **except** via `/clarify` or
  an explicit scope-change decision.
- `plan.md` never contradicts the spec; it realizes it.
- `tasks.md` maps 1:1 (or N:1) to scenarios. Every task cites the scenario(s) it covers.

---

## Definition of Done

A feature is done when:
1. Every scenario in `feature.feature` has a passing automated test.
2. There is no code without a scenario that justifies it (YAGNI).
3. The solution is the simplest one that satisfies the scenarios (KISS).
4. `plan.md` and `tasks.md` reflect what was actually built.
5. `/analyze` reports no inconsistencies between spec, plan, tasks, and code.

---

## The three roles

Whatever the task, you are always acting in one of three roles. Name the role you
are in when it isn't obvious:

- **Orchestrator** — reads the memory, holds the context, and decides the single
  next action. This is where a session starts (`/status`, `/welcome-gherkin-sdd`).
- **Builder** — turns scenarios into the simplest code that makes them pass,
  test-first, nothing more (`/implement`).
- **Reviewer** — validates coherence and guards against regressions and excess
  (`/analyze`, `/doctor`).

The roles don't change the principles; they say *from which stance* you are applying
them right now.

---

## Context budget

KISS and YAGNI apply to your own context window, not just to the code. Reading
everything "just in case" is the same mistake as building for a future that hasn't
arrived. Load only what the current step needs:

- **Search before you read.** To find where something lives, `grep`/search for the
  symbol, term, or scenario name first. Don't open whole files to locate one thing.
- **Read the slice, not the file.** `/implement` needs the current task's scenario
  and its own checklist item — not the full `memory.md` history or every past
  decision. Cite the section you used, not "I read the whole file."
- **Treat `memory.md` as a log, not a working set.** It's append-only by design
  (§ Project artifacts), which means it only grows. Re-reading it end-to-end every
  session is the most common source of wasted context — pull the **Current state**
  and the entries relevant to the feature at hand; skip the historical tail unless
  you're specifically auditing it.
- **Don't re-fetch what's already in the conversation.** If a file was read this
  session and nothing since touched it, reuse what you already have instead of
  reading it again "to be safe."
- **Delegate large, disposable searches.** A broad exploration (scanning many files
  to find a pattern, reading a large log to extract one fact) belongs in an isolated
  sub-task whose only output is the answer — not inline in the main context, where
  every file it opened stays loaded for the rest of the session.
- **Match the model to the step.** Mechanical, well-defined work (formatting,
  running a linter, renaming per a fixed rule) doesn't need the same reasoning
  budget as designing a plan or resolving an ambiguous scenario. Prefer the
  cheapest tool that reliably does the step.

This is not a mandate to skip context you actually need — an under-informed
`/implement` that invents behavior violates SDD. It's a mandate to stop paying for
context nothing downstream will use.

---

## Workflow commands

Core loop (per feature):

| Command         | Does |
|-----------------|------|
| `/constitution` | Creates/updates `.gherkin-sdd/memory/constitution.md` with the project's principles. |
| `/specify`      | Writes the spec in Gherkin (`feature.feature`) from a description. |
| `/clarify`      | Asks structured questions to remove ambiguity from the spec. |
| `/plan`         | Defines the stack, architecture, and contracts that realize the scenarios. |
| `/tasks`        | Generates the test-first checklist, each task tied to scenarios. |
| `/implement`    | Executes the tasks; only writes code covered by a scenario. |
| `/analyze`      | Checks consistency between spec ↔ plan ↔ tasks ↔ code. |

Session & project (as needed):

| Command            | Does |
|--------------------|------|
| `/status`          | At session start: reads the memory and points to the one next action. |
| `/discovery`       | Structured problem framing before `/specify`, ending in candidate scenarios. |
| `/split`           | Breaks a feature that grew too big (>~7 tasks) into smaller, decoupled ones. |
| `/c4-architecture` | Generates a Mermaid C4 view reflecting the system the specs actually describe. |
| `/doctor`          | Diagnoses structure integrity, stale placeholders, and spec ↔ memory drift. |

> At any phase, if you are tempted to add something no scenario asks for,
> **don't add it** — propose a new scenario and let the user decide.
