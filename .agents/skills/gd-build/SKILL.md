---
name: gd-build
description: Implement or resume one Unity outcome under the fixed architecture with deterministic Unity CLI and Pipeline verification.
---

# Build one Unity outcome

Read `AGENTS.md`; it owns architecture and determinism. This skill owns the procedure.

## Establish the outcome

Resume the active task or start from `Idle`; never replace unfinished work. Record one
observable outcome, scope, architecture delta, and checks in `.agents/TASK.md`. For bugs,
record the symptom and reproduction before assuming a cause. Update `.agents/PROJECT.md`
only for the initial prefix, a durable exception, or a route.

Ask only about choices that change the outcome; stop if the change does not fit
`AGENTS.md`.

## Implement

Implement under the recorded architecture delta and `AGENTS.md`.

## Verify

Compare changed code and asmdefs with `.agents/TASK.md`, validate the dependency graph,
then run:

1. Import and compilation.
2. EditMode tests for plain rules.
3. PlayMode tests for Unity integration.
4. A player build when required.

When randomness, stimuli/events, or registries change, EditMode tests replay identical
configuration, seed, and inputs and cover equal-score ordering; vary registration and
subscription order to prove it is not policy. PlayMode tests cover composed
enable/disable/destroy teardown when Unity lifetime behavior changed. When save/load or
lockstep continuation is in scope, test continuation from serialized random state.

Record results, required playtests, and final state in `.agents/TASK.md`.
