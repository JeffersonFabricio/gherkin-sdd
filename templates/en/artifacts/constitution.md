# Project Constitution

> Extends the **gherkin-sdd** playbook (SDD · Gherkin · KISS · YAGNI).
> On conflict, this constitution wins over defaults, but never over the 4 principles.

## The 4 principles in this project
- **SDD** — no Gherkin scenario, no code. The spec comes first.
- **Gherkin** — the spec IS executable; the scenarios are the acceptance criteria.
- **KISS** — the simplest solution that makes the scenarios pass.
- **YAGNI** — only what the current scenarios require.

## Identity
- **Product / domain**: <one sentence>
- **Language of the spec and Gherkin**: <e.g. English>
- **Ubiquitous language**: <domain terms that must appear in the Gherkin>

## Stack
- **Allowed / mandatory**: <e.g. TypeScript, Node, Postgres>
- **Forbidden**: <e.g. no heavy ORM, no microservices at this stage>
- **Gherkin scenario runner**: <e.g. Cucumber.js / Behave / pytest-bdd / SpecFlow>

## Non-negotiable rules
- <security / compliance / performance / accessibility — only what applies>

## Conventions
- <naming pattern, folder structure, formatting — short and verifiable>

---
*Edit via `/constitution`. Keep it short: KISS applies to this document.*
*Decisions and living context go in [`memory.md`](./memory.md) — this constitution is stable; the memory evolves.*
