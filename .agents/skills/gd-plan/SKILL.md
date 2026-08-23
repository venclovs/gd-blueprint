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
install tooling, scaffold an architecture, or edit the Unity project. Do not apply a
planning change that invalidates an unfinished task's roadmap item, scope, or acceptance
basis; leave it pending until `$gd-build` reconciles that task and its changes.

When `TASK.md` is a `Done` scout awaiting planning reconciliation, record its result and
developer decision or remaining unknown in `PROJECT.md`, update architecture and roadmap
dependencies, and add `INDEX.md` provenance for retained evidence when applicable. Then
return to `$gd-build` at `Done` for the combined scout commit handoff; do not start a
separate commit.

Close with a readiness summary: the proposed release slice, architecture status, every
non-resolved risk and its affected work, roadmap dependencies, and the next unresolved
decision or scout. Call the game ready for production only when its release slice and
required quality targets are bounded, prerequisites for the first production roadmap
item are decided, architecture is `Selected`, `Existing`, or deliberately `Declined`,
and no `Open` risk or pending scout blocks either `Release readiness` or that item. If a
scout must run first, report `Ready to scout` only when it is approved, its artifact
disposition is selected, and its prerequisites are decided; otherwise report the
specific unresolved decision. Do not call either state ready for production.
