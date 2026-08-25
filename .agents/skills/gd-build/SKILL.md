---
name: gd-build
description: Implement or resume one Unity outcome under the fixed architecture and deterministic verification.
---

# Build one Unity outcome

Read `AGENTS.md`; it owns architecture and determinism. This skill owns the procedure.

## Establish the outcome

Resume the active task or start from `Idle`. Record one observable outcome, scope,
architecture delta, and checks in `.agents/TASK.md`. Update `.agents/PROJECT.md` only for
durable intent, the initial prefix, or a bounded Legacy transition.

## Implement

Implement under the recorded architecture delta and `AGENTS.md`.

## Verify

Compare changed code and asmdefs with `.agents/TASK.md` and validate the dependency graph.
Required evidence, when applicable:

1. Import and compilation.
2. EditMode tests for plain rules.
3. PlayMode tests for Unity integration.
4. A player build when required.

Match determinism tests to the change: replay identical configuration, inputs, and seed
for randomness; vary callback and subscription order for the same decision stimuli; vary
registration order and equal-score ties for registries. PlayMode tests cover composed
enable/disable/destroy teardown when Unity lifetime behavior changed. When save/load or
lockstep continuation is in scope, test continuation from serialized random state.

Record results, required playtests, and final state in `.agents/TASK.md`.
