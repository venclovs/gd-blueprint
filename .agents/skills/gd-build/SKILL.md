---
name: gd-build
description: Scope, diagnose, implement, coordinate, and verify Unity work, resume interrupted tasks, and offer to commit the result.
---

# Build the task

Read `.gd-blueprint/PROJECT.md`, `.gd-blueprint/TASK.md`, relevant project files, and
Git state. Treat the architecture decision and project conventions in `PROJECT.md` as
constraints. Do not silently choose, replace, or migrate an architecture. Production
work on a greenfield project requires architecture status `Selected` or `Declined`; a
`Prototyping` project may run only the recorded disposable scout, and unresolved
greenfield production returns to `$gd-plan` for a developer decision. For an established
project whose status has not been recorded yet, follow the architecture and conventions
observed in the repository without imposing a preset or incidental migration.

Load detailed guidance only when it applies:

- Before changing or reviewing Unity/C# code, serialized assets, packages, or project
  settings, read [Unity and C# development rules](references/unity-csharp.md).
- Before splitting, delegating, or integrating parallel work, read
  [Parallel work and integration](references/parallel-work.md).

For new work, start from `Idle` or a handled `Done` task. Do not replace uncommitted
`Done` work unless the developer explicitly carries it forward and it is recorded in
Notes. Abandon unfinished work only with explicit direction about its existing changes.

Before editing, clarify only missing decisions that would materially change the result.
Then replace the task with one goal, its exact roadmap item or `None`, boundaries,
expected behavior, a short implementation checklist, relevant verification checks, and
useful assumptions. Use only `TASK.md` unless parallel work materially helps. For a bug,
record the observed symptom and reproduction without assuming a cause. Set the state to
`In progress`.

When a failure's cause is uncertain, inspect the available evidence and separate
observations from hypotheses before editing. Identify the smallest supported cause and
record useful findings in Notes. Do not make a speculative fix. If essential evidence is
unavailable, record what is missing and stop.

For `In progress`, reconcile the project and diff with the checklist, implement the
remaining work, and set `Ready to verify`. For `Ready to verify`, compare the result with
the boundaries and expected behavior, then complete the Verification checklist. For
`Done`, resume only a pending commit handoff, an explicitly requested recheck, or new
work after the previous changes are handled. Refuse every unsupported state.

Move through every applicable phase in the same invocation. When a check fails, add a
correction, return to `In progress`, and fix it within the task boundaries before
verifying again. If a required check is unavailable, record the blocker, remain
`Ready to verify`, and stop. Mark `Done` only when every required check passes; mark a
named roadmap item complete only when the task fully completes it.

After `Done`, inspect both staged and unstaged changes, summarize the exact commit scope,
and propose a concise message. Commit only after commit-specific approval for this task,
including approval given in advance. Stage only task changes. If the index already has
unrelated changes, changes overlap, or the task cannot be isolated safely, stop without
altering the existing staging area. If no task changes remain, report that no commit is needed.

After completing a prototype scout, record its evidence in `TASK.md` and route the
developer back to `$gd-plan` to update the scout decision, architecture status, and
dependent roadmap. Do not treat prototype completion as production approval.
