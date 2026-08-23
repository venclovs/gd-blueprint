---
name: gd-plan
description: Research, define, or refresh a Unity game's design, architecture, technical context, release scope, and roadmap without implementing it.
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

Classify the work as a new game or an existing project. For a new game, or whenever its
design or architecture is still unresolved, read
[`references/game-design.md`](references/game-design.md) and use only the relevant
sections. For an existing project, document what is already established without forcing
a redesign, migration, newer Unity version, or architecture change.

Planning changes only `.gd-blueprint` planning artifacts: `PROJECT.md` and, when
research or visual references are used, `references/INDEX.md` plus permitted reference
media beside it. Do not edit `TASK.md`, create implementation tasks, install tooling,
scaffold an architecture, or edit the Unity project. Do not silently change assumptions
used by an unfinished task. Preserve its linked roadmap item, scope assumptions, and
acceptance basis; if planning would invalidate one, record the proposal as pending and
ask the developer how to handle the conflict.
