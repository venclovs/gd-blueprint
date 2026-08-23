---
name: gd-build
description: Execute or resume the active GD Blueprint TASK.md by scoping, diagnosing, implementing, coordinating, and verifying Unity work, then offer to commit the result.
---

# Build the task

Read `.gd-blueprint/PROJECT.md`, `.gd-blueprint/TASK.md`, relevant project files, and
Git state. Treat the architecture decision and project conventions in `PROJECT.md` as
constraints. Do not silently choose, replace, or migrate an architecture. Production
work on a greenfield project—one without an established production codebase or
architecture—requires architecture status `Selected` or `Declined`; an empty Unity
project alone is not an established project. A `Prototyping` project may run only the
recorded disposable scout. Unresolved greenfield production returns to `$gd-plan` for a
developer decision. For an established project whose status is not recorded, follow the
observed architecture and conventions without imposing a preset or incidental migration.

Load detailed guidance only when it applies:

- Before changing or reviewing Unity/C# code, serialized assets, packages, or project
  settings, read [Unity and C# development rules](references/unity-csharp.md), including
  its prototype scout cleanup section when applicable.
- Before splitting, delegating, or integrating parallel work, read
  [Parallel work and integration](references/parallel-work.md).

For new work, start from `Idle` or a handled `Done` task. Do not replace an unfinished
task or its uncommitted `Done` work until the developer approves each prior-task change
as reverted, accepted baseline, or carried forward. Complete approved reversions first;
record accepted-baseline and carried-forward paths in Notes, and retain baseline records
in later tasks until those changes are handled.

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

For a prototype scout, name its stable scout ID and recorded artifact disposition in the
task, and record the owned paths and baseline before editing. Execute it only when the
scout is approved to run and its disposition is not `Pending`. Before `Ready to verify`,
apply the disposition and record its evidence in `TASK.md`. After `Done`, route the
developer back to `$gd-plan` to update the scout decision, architecture status, and
dependent roadmap. Do not treat prototype completion as production approval.

After `Done`, inspect both staged and unstaged changes, summarize the exact commit scope,
and propose a concise message. Leave the index untouched until commit-specific approval
for this task, including approval given in advance. After approval, stage only the final
task scope and commit it. If the index already has unrelated changes, changes overlap,
or the task cannot be isolated safely, stop without altering the existing staging area.
If no task changes remain, report that no commit is needed.
