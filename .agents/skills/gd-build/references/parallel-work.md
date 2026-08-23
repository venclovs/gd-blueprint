# Parallel work and integration

Use workstreams only when at least two independently verifiable slices can progress
concurrently and the coordination cost is justified. Keep a small or tightly coupled
change entirely in `TASK.md`.

## Shape the work

- Prefer playable or testable vertical slices over tasks divided only by architecture
  layer. Each slice should deliver observable behavior or reduce a named risk.
- Model dependencies as explicit directed edges between stable workstream IDs. Keep the
  graph acyclic; a dependent slice remains `Blocked` until every blocker is `Integrated`.
- Create `.gd-blueprint/tasks/<id>-<slug>.md` only for the active initiative. Each file
  must contain:
  - State: `Blocked`, `Ready`, `In progress`, `Ready to integrate`, or `Integrated`.
  - Objective and observable acceptance criteria.
  - Blocking workstream IDs, or `None`.
  - Exact owned paths and explicit no-touch/shared paths.
  - Implementation checklist, focused verification, and handoff/integration notes.
- Record every workstream in the coordinator-owned index in `TASK.md`, including owner,
  state, blockers, and integration notes.

The normal state path is:

```text
Blocked -> Ready -> In progress -> Ready to integrate -> Integrated
```

Exception transitions are explicit: a newly discovered unmet dependency or ownership
conflict moves `Ready` or `In progress` to `Blocked`; a failed slice check returns the
workstream to `In progress`; and a rejected `Ready to integrate` handoff returns to
`In progress`. If combined verification exposes a defect in an `Integrated` workstream,
the coordinator may reopen it with the correction recorded and its previous owner
cleared: use `Ready` when its blockers remain integrated, or `Blocked` while an affected
dependency is also being corrected. Only the coordinator may mark a workstream
`Integrated`, after reviewing its scope and evidence.

When resuming interrupted parallel work, first reconcile every indexed workstream's
state, blockers, owner, workstream file, and current diff. Do not delegate or integrate
from stale task metadata.

## Assign safely

- Automatically delegate only a `Ready` workstream when an agent is available, its
  dependencies are integrated, and its write scope does not overlap any active
  workstream. Give the agent the workstream file, owned paths, no-touch paths, acceptance
  criteria, relevant project constraints, and required checks.
- Before assigning a path, inspect its staged, unstaged, and untracked changes. Keep a
  dirty path coordinator-owned unless its baseline and preservation rules are explicitly
  recorded for the assigned agent.
- One path has one writer at a time. The asset and its `.meta` file always share an owner.
- Never concurrently edit the same scene, prefab, material, animation asset,
  ScriptableObject asset, package manifest or lockfile, project setting, shared assembly
  definition, or other shared serialized asset. Keep every shared serialized asset and
  project-wide configuration path coordinator-owned; workstream agents treat them as
  read-only until integration.
- Parallel code, tests, documentation, isolated prefabs, and independent content are
  allowed when their owned paths are disjoint. A shared interface must have one owner,
  be agreed before concurrent work starts, and remain read-only to every other active
  workstream. If overlap or a new dependency appears, pause the affected work, update the
  graph and ownership, then resume sequentially or with new scopes.
- Workstream agents edit only their owned paths and workstream file. They do not change
  `TASK.md`, shared assets, architecture decisions, or initiative state.

## Integrate

- The coordinator owns `TASK.md`, dependency and ownership changes, shared serialized
  edits, integration order, and final initiative state.
- Review each handoff against its diff, acceptance criteria, architecture constraints,
  and verification evidence. A rejected handoff returns from `Ready to integrate` to
  `In progress` with the required corrections recorded. Integrate accepted work in
  dependency order and resolve cross-slice changes sequentially under recorded ownership.
- After all workstreams are `Integrated`, run the initiative-level checks against the
  combined project. Workstream checks do not replace compilation, serialization review,
  tests, builds, or play checks required for the integrated result.
- If a combined check fails, return the initiative to `In progress`. Reopen only the
  affected dependency roots as `Ready` and affected dependents as `Blocked` until their
  blockers are reintegrated. Reassign only after the previous owner is inactive;
  unaffected workstreams remain `Integrated`.
- Only the coordinator may move the initiative from `Ready to verify` to `Done` and begin
  the commit handoff described by the main skill.
- Retain workstream files while the initiative is unfinished. After the initiative-level
  checks pass, copy durable ownership, handoff, and verification evidence into `TASK.md`,
  remove that initiative's workstream files, and only then mark `Done` and begin the
  commit handoff. Do not carry temporary workstream files into the completed-task commit.
