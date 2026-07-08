---
description: Guided discovery before writing the spec. Frames the problem so /specify can write Gherkin that matters.
---

# /discovery

You will run a short, structured discovery session **before** `/specify`. The goal
is to understand the problem well enough that the Gherkin writes itself. Wear two
hats and make them explicit as you switch:

- **Product** — who is this for, what outcome do they want, what is the value.
- **Senior engineer** — what constraints, risks, and edges are hiding here.

## Input
`$ARGUMENTS`: a rough idea or problem statement. If empty, ask what we're exploring.

## Do
1. Read `.gherkin-sdd/memory/constitution.md` and `memory.md` for domain, language,
   glossary, and prior decisions — don't rediscover what's already decided.
2. Explore with the user, **one question at a time** (KISS), covering:
   - **Problem & user**: who has the pain, what does success look like.
   - **Behaviors**: the observable things the system must do (happy path first,
     then errors and edges).
   - **Boundaries** (YAGNI): what is explicitly *out* of scope for now.
   - **Risks & unknowns**: what could make this hard or ambiguous.
3. Converge on **candidate scenarios** — phrase the key behaviors as draft
   `Given/When/Then` sketches so the jump to `/specify` is trivial.

## Output
- A short discovery brief: problem, target user, in-scope behaviors, out-of-scope,
  open questions, and the **candidate Given/When/Then sketches**.
- A recommendation: run `/specify` with this framing, or keep exploring if the
  problem is still fuzzy.
- (Optional) if the user wants to persist it, save the brief to
  `specs/<NNN-name>/discovery.md`.

## Don't
- Don't write final Gherkin or code here — this feeds `/specify`, it doesn't replace it.
- Don't design the implementation (no stacks, tables, endpoints).
- Don't invent scope the user didn't ask for (YAGNI); park ideas under "out of scope".
