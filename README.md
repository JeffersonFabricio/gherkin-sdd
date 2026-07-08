# gherkin-sdd

***English** · [Português](README.pt.md)*

> An AI playbook for spec-driven development, where **the specification IS executable Gherkin**.
> Principles: **SDD · Gherkin · KISS · YAGNI**.

`gherkin-sdd` installs a complete playbook into your project — principles + workflow
commands — for **Claude Code, GitHub Copilot, Cursor, and Gemini CLI**. Instead of
loose user stories, your spec is written in Gherkin and becomes the source of truth
for behavior, acceptance criteria, and tests.

```bash
npx gherkin-sdd init
```

## Why

Most Spec-Driven Development tools (like
[spec-kit](https://github.com/github/spec-kit)) treat the spec as prose. The problem:
prose is ambiguous and not executable. **gherkin-sdd** starts from a different premise:

> **The spec IS Gherkin.** If you can't write the `Given/When/Then`, you haven't
> understood the behavior — and if you haven't understood the behavior, you shouldn't be writing code.

Four principles guide every phase:

| Principle | Role |
|-----------|------|
| **SDD**    | Defines the gate: no scenario, no code. |
| **Gherkin**| Defines the target: the scenarios say exactly when you're done. |
| **KISS**   | Defines the path: the simplest solution that makes the scenarios pass. |
| **YAGNI**  | Defines the boundary: stop when the scenarios pass, go no further. |

Golden rule: **every line of code must be defensible by pointing to a scenario.**

## Installation

```bash
# Interactive (detects your project's agents and asks for agents + language)
npx gherkin-sdd init

# Direct, for specific agents
npx gherkin-sdd init --agents claude,copilot

# In Portuguese (the default is English)
npx gherkin-sdd init --lang pt

# Everything, overwriting
npx gherkin-sdd init --agents all --force

# See supported agents and commands
npx gherkin-sdd list
```

### Language

The playbook can be generated in **English** (`en`, default) or **Portuguese** (`pt`).
Use `--lang`:

```bash
npx gherkin-sdd init --lang en   # default: text and Gherkin (Given/When/Then) in English
npx gherkin-sdd init --lang pt   # text and Gherkin (Dado/Quando/Então) in Portuguese
```

In interactive mode, `init` asks for the language (default `en`). The chosen
language applies to the principles, the commands, and the generated Gherkin examples.

### What gets generated

| Agent           | Principles                          | Commands                       |
|-----------------|-------------------------------------|--------------------------------|
| Claude Code     | `CLAUDE.md`                         | `.claude/commands/*.md`        |
| GitHub Copilot  | `.github/copilot-instructions.md`   | `.github/prompts/*.prompt.md`  |
| Cursor          | `.cursor/rules/gherkin-sdd.mdc`      | `.cursor/commands/*.md`        |
| Gemini CLI      | `GEMINI.md`                         | `.gemini/commands/*.toml`      |

Each agent gets its files **in that tool's own native folder** —
Claude in `.claude/`, Copilot in `.github/`, Cursor in `.cursor/`, Gemini in
`.gemini/`. And the **project memory** (single source, read by all) lives in:

```
.gherkin-sdd/
  memory/
    constitution.md        # your project's principles (stable)
    memory.md              # living memory: decisions, learnings, glossary, index
  templates/               # models of feature.feature, plan.md, tasks.md
```

> Inspired by spec-kit's `.specify/memory/`: the constitution is stable, the
> `memory.md` evolves (decisions and living context, read at the start of each session).

## Start here

After `init`, **open the IDE/agent you chose and run the welcome command** — it
detects your environment and drives the setup **in the right order**
(constitution → memory) before your first feature:

```
/welcome-gherkin-sdd
```

## The workflow

The core loop, per feature:

```
/welcome-gherkin-sdd → /constitution → /specify → /clarify → /plan → /tasks → /implement → /analyze
```

| Command | What it does |
| --- | --- |
| `/welcome-gherkin-sdd` | Onboarding: introduces the principles and initializes the project memory in order. |
| `/constitution` | Defines the project-specific principles (stack, language, test runner). |
| `/specify` | Writes the spec in **Gherkin** (`specs/NNN-feature/feature.feature`). |
| `/clarify` | Asks structured questions to remove ambiguity from the spec. |
| `/plan` | Decides the simplest architecture that realizes the scenarios. |
| `/tasks` | Generates the test-first checklist, each task tied to a scenario. |
| `/implement` | Implements in order, test-first, only what the scenarios require. |
| `/analyze` | Audits the coherence of spec ↔ plan ↔ tasks ↔ code. |

### Session & project commands

Used as needed, around the core loop:

| Command | What it does |
| --- | --- |
| `/status` | Start of every session: reloads the memory and points to the single next action. |
| `/discovery` | Guided problem framing before `/specify`, ending in candidate Given/When/Then. |
| `/split` | Breaks a feature that grew too big (>~7 tasks) into smaller, decoupled features. |
| `/c4-architecture` | Generates a Mermaid C4 view that reflects the system the specs actually describe. |
| `/doctor` | Diagnoses structure integrity, stale placeholders, and spec ↔ memory drift. |

### Three roles

Whatever the command, the AI acts in one of three stances — **Orchestrator**
(reads the memory and decides the next action: `/status`, `/welcome-gherkin-sdd`),
**Builder** (turns scenarios into the simplest passing code: `/implement`), and
**Reviewer** (guards coherence against regressions and excess: `/analyze`, `/doctor`).

### Example spec (the source of truth)

```gherkin
@critical
Feature: Email login
  In order to access my account securely
  As a registered user
  I want to sign in with email and password

  Scenario: Successful login
    Given an account exists for "ana@example.com"
    When she enters the correct password
    Then she is authenticated and sees the dashboard

  Scenario: Wrong password
    Given an account exists for "ana@example.com"
    When she enters a wrong password
    Then access is denied with the message "Invalid credentials"
```

From here, `/plan` chooses the how, `/tasks` writes the tests for these scenarios
first, and `/implement` only writes code that makes these scenarios pass.

## Development

```bash
npm run setup-hooks  # enables the repo's git hooks (once per clone)
node --test          # runs the tests
node bin/gherkin-sdd.js init --agents all --cwd /tmp/test
```

No runtime dependencies — pure Node (>=18).

### Git hooks: no direct commits to main/master

The repository versions a `pre-commit` hook in [`.githooks/`](.githooks/) that
**blocks direct commits to `main`/`master`** — work should always go through a
feature branch and a PR.

Enable it once per clone (it also runs on its own during `npm install`, via `prepare`):

```bash
npm run setup-hooks
# equivalent to: git config core.hooksPath .githooks
```

With the hook active:

```bash
git switch main
git commit -m "..."          # ✋ blocked — create a feature branch
git switch -c feat/my-change
git commit -m "..."          # ✓ allowed
```

For a legitimate case on main (e.g. a merge or local release), use the explicit
override:

```bash
ALLOW_MAIN_COMMIT=1 git commit -m "release: v1.0.0"
```

> This is a **local**, complementary protection to the server's branch protection
> (GitHub/GitLab) — it does not replace the remote repository's branch protection rules.

## Inspiration and credits

`gherkin-sdd` was built from two main sources:

- **Claude's official documentation** (Anthropic) — the practices for project
  instructions (`CLAUDE.md`), slash commands, and agent-driven development that
  shaped the format of the commands and the playbook.
- **Uncle Bob's recent talks** (Robert C. Martin) — his argument that tests
  and specification are the same thing, and that the expected behavior should guide
  the code, is what underpins this project's central thesis: **the spec IS executable
  Gherkin**, supported by KISS and YAGNI as a discipline of simplicity.

`gherkin-sdd` was based on GitHub's
[spec-kit](https://github.com/github/spec-kit), inheriting its
Spec-Driven Development structure, but starts from its own premise: the
specification is not prose, it is executable behavior.

## License

[Apache 2.0](LICENSE) © Jefferson Fabrício
