---
description: Writes a feature's specification in executable Gherkin (feature.feature). The spec IS the source of truth.
---

# /specify

You will turn a natural-language description into a **Gherkin specification**.
This is the heart of gherkin-sdd: the spec IS Gherkin, and it defines behavior,
not implementation.

## Input
`$ARGUMENTS`: the feature description in natural language. If empty, ask the user.

## Do
1. Read `.gherkin-sdd/memory/constitution.md` to inherit language, domain, and conventions.
2. Create the feature folder: `specs/<NNN-kebab-name>/` (NNN = next sequential
   number, e.g. `001-email-login`).
3. Write `specs/<NNN-.../feature.feature` following the playbook's Gherkin rules:
   - `Feature:` with a value sentence ("In order to… As a… I want…" is welcome).
   - Scenarios covering: the happy path, **errors and edges**, and business rules.
   - Observable behavior, domain language, **no technical details**.
   - Use `Scenario Outline` + `Examples` for data variations.
   - `@tags` to group (e.g. `@critical`, `@v1`).
4. Mark anything ambiguous with `# TODO(clarify): ...` instead of guessing.
5. Update the **feature index** in `.gherkin-sdd/memory/memory.md` with the new
   feature and the status `specified`.

## Output
- `specs/<NNN-.../feature.feature`.
- List the created scenarios and the pending `TODO(clarify)`.
- Suggest running `/clarify` if there's ambiguity, or `/plan` if the spec is solid.

## Don't
- **Don't** write how to implement it (no database tables, endpoints, classes).
- **Don't** add scenarios for functionality nobody asked for (YAGNI).
- **Don't** create a scenario you wouldn't know how to test.
