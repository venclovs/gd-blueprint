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
observations from hypotheses. If needed, make the smallest reversible diagnostic edit,
such as a focused failing test or temporary instrumentation, and record it in scope.
Remove temporary instrumentation before verification. Implement a production fix only
after the evidence supports a cause; if essential evidence cannot be obtained, record
what is missing and stop.

If the task creates the Unity project or changes facts recorded under `Unity technical
snapshot` in `PROJECT.md`, refresh only the affected observed fields before
`Ready to verify`. Treat existing non-`Unresolved` values as constraints: change them
only when the task explicitly includes that change or the observed result matches the
recorded baseline. An unapproved mismatch returns to `In progress` instead of overwriting
the plan. Do not use a factual update to revise game design, architecture, release scope,
or roadmap decisions.

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
scout is approved to run and its disposition is not `Pending`. During `In progress`,
execute and evaluate it, then capture the result before applying its disposition. Use
`Ready to verify` to check the recorded evidence and cleanup integrity, not to rerun a
removed prototype. After `Done`, defer the commit handoff and route the developer back
to `$gd-plan` to reconcile the result, scout decision, architecture, roadmap, and
retained-evidence provenance. Then resume `$gd-build` at `Done`; treat the task record,
planning reconciliation, and permitted evidence media as one final scout commit scope.
Do not treat prototype completion as production approval.

After `Done`, and after any required scout reconciliation, inspect both staged and
unstaged changes, summarize the exact commit scope, and propose a concise message. Leave
the index untouched until commit-specific approval for this task, including approval
given in advance. After approval, stage only the final task scope and commit it. If the
index already has unrelated changes, changes overlap, or the task cannot be isolated
safely, stop without altering the existing staging area. If no task changes remain,
report that no commit is needed.
