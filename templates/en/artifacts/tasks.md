# Tasks — <feature>

> Test-first. Each task cites the scenario(s) it covers. `[P]` = parallelizable.
> Every task traces to a scenario — no orphan tasks (YAGNI).

## Checklist
- [ ] T01 — Write the happy-path test, must fail (covers: Scenario "<…>") — `path/to/test`
- [ ] T02 — Implement the minimum to make T01 pass (covers: Scenario "<…>") — `path/to/code`
- [ ] T03 — [P] Edge-case test (covers: Scenario "<…>") — `path/to/test`
- [ ] T04 — Implement the edge case (covers: Scenario "<…>") — `path/to/code`

## Scenario → tasks coverage (must be 100%)
| Scenario | Tasks |
|----------|-------|
| <Scenario: happy path> | T01, T02 |
| <Scenario: edge/error>  | T03, T04 |
