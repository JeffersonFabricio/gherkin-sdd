---
description: Generates/updates a C4 architecture view (Mermaid) that reflects the system the specs actually describe.
---

# /c4-architecture

You will produce a **C4 architecture view in Mermaid** that mirrors what the specs
and plans actually describe — a map, not a wish list. This is a project-level
document you refresh when the architecture changes, not on every feature.

## Input
`$ARGUMENTS`: optional focus (a subsystem or feature). If empty, cover the whole system.

## Do
1. Read `.gherkin-sdd/memory/constitution.md` (stack, boundaries), `memory.md`
   (decisions), and the `plan.md` of implemented features to learn the real pieces.
2. Produce Mermaid diagrams, only at the levels that carry information (KISS):
   - **Level 1 — Context**: the system, its users/personas, and external systems.
   - **Level 2 — Container**: the deployable/runnable pieces (apps, services, DBs)
     and how they talk.
   - **Level 3 — Component**: *only* for a container complex enough to warrant it.
3. Diagram **what exists**. Mark anything not yet built as `planned` (e.g. a
   dashed note or a `%% planned` comment) so the map never lies about reality.
4. Write the result to `.gherkin-sdd/memory/architecture.md` (create it if absent),
   with a short legend and a "last synced" note tied to the current feature index.

## Output
- `.gherkin-sdd/memory/architecture.md` with the Mermaid C4 diagrams + legend.
- A note of any drift you found between the diagram and the specs/plans.

## Don't
- Don't invent components no spec or plan justifies (YAGNI) — diagram reality.
- Don't go deeper than needed; skip the Component level unless it earns its place.
- Don't let the diagram contradict the specs; if it must, the spec wins — flag it.
