# Technical plan — <feature>

> Realizes the scenarios in `feature.feature`. The spec rules; the plan serves.
> Rule: the simplest approach that makes the scenarios pass (KISS), nothing beyond (YAGNI).

## Stack decisions
| Decision | Choice | Why | Simpler alternative discarded |
|----------|--------|-----|-------------------------------|
| <e.g. persistence> | <choice> | <reason tied to a scenario> | <what was discarded and why> |

## Minimal architecture
- **<Component>** — role; which scenarios it serves.

## Contracts
> Include only contracts required by some scenario.
- **<API / schema / event>** — shape and the scenario that requires it.

## Scenario → component map
| Scenario | Component(s) that realize it |
|----------|-------------------------------|
| <Scenario: …> | <component> |

## Test strategy
- **Gherkin runner**: <e.g. Cucumber.js>
- How the `.feature` files are executed; where the step definitions live.

## Risks / open
- <only what's real; no YAGNI speculation>
