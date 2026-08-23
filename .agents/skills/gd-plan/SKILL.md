---
name: gd-plan
description: Update GD Blueprint's PROJECT.md by researching, defining, or refreshing a Unity game's design, architecture, technical context, release scope, and roadmap without implementing it.
---

# Plan the game

Read `.gd-blueprint/PROJECT.md` and `.gd-blueprint/TASK.md`, then inspect relevant
project facts before asking questions.

- Establish or preserve a clear player promise and repeatable player loop.
- Keep the release small, separate included work from exclusions, and make quality
  targets observable.
- Order the roadmap by playable value, risk, and dependencies.
- When the Unity snapshot is missing or stale, inspect the editor version, packages,
  render and input setup, main scenes, assemblies, and usable test or build routes.
- Record observed facts and decisions; keep unknowns visible instead of guessing.

Treat a game as greenfield when it has no established production codebase or architecture,
even if an empty Unity project already exists. Otherwise treat it as an existing project.
For a greenfield game, or whenever design or architecture is still unresolved, read
[`references/game-design.md`](references/game-design.md) and use only the relevant
sections. For an existing project, document what is already established without forcing
a redesign, migration, newer Unity version, or architecture change.

Planning changes only `.gd-blueprint` planning artifacts: `PROJECT.md` and, when
research or visual references are used, `.gd-blueprint/references/INDEX.md` plus
permitted reference media beside it. Do not edit `TASK.md`, create implementation tasks,
install tooling, scaffold an architecture, or edit the Unity project. Do not silently
change assumptions used by an unfinished task. Preserve its linked roadmap item, scope
assumptions, and acceptance basis; if planning would invalidate one, record the proposal
as pending and ask the developer how to handle the conflict. If the developer chooses
the incompatible plan, do not apply it until `$gd-build` has reconciled the unfinished
task and its changes; resume planning after `TASK.md` no longer depends on the old plan.

Close with a readiness summary: the proposed release slice, architecture status,
accepted or deferred risks, roadmap dependencies, and the next unresolved decision or
scout. Call the game ready for production only when the release slice is bounded, the
architecture is `Selected`, `Existing`, or deliberately `Declined`, and no unaccepted
risk blocks the first roadmap item.
