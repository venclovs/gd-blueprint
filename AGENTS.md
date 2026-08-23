# GD Blueprint

Read `.gd-blueprint/PROJECT.md` and `.gd-blueprint/TASK.md` before editing the
Unity project.

## Document ownership

- `PROJECT.md` owns game direction, design findings, Unity context, architecture,
  project conventions, release scope, and roadmap.
- `TASK.md` owns the single active initiative, integration notes, and verification
  evidence.
- `references/INDEX.md` owns research and reference-media provenance.
- `tasks/*.md` are temporary workstream records created only when parallel work helps.
  The coordinator removes them after consolidating their evidence and before closing the
  task.

Follow the architecture and conventions recorded in `PROJECT.md`; existing project
patterns take precedence over template defaults. Do not migrate an established project
or introduce packages, analyzers, or scaffolding unless the task explicitly requires it.

## Task states

`Idle -> In progress -> Ready to verify -> Done`

- `$gd-plan` updates project direction and decisions without editing the Unity project.
- `$gd-build` scopes, implements, verifies, and offers to commit the active task.
- Failed verification returns to `In progress`; an unavailable required check remains
  `Ready to verify` and is a blocker.
- Start new work from `Idle` or a handled `Done`. Abandon unfinished work only with
  explicit direction about its changes.

## Parallel work

- Only the coordinator updates `TASK.md`, shared paths, integration state, or the final
  initiative state.
- Delegate only unblocked workstreams with disjoint write ownership.
- Prefer independently playable or testable slices over architecture-layer splits.
- Never assign concurrent edits to the same scene, prefab, material, ScriptableObject,
  package manifest, project setting, or shared assembly definition.
- Keep shared serialized assets and project-wide configuration coordinator-owned, and
  review their diffs before verification.
- Before a coordinator-owned Unity Editor, import, test, or build operation, confirm all
  project-file writers are paused; keep them paused through its resulting import or
  refresh. If the Editor stays open, resume writes only while its automatic refresh and
  import are verifiably suspended.

## Unity safeguards

- Keep each asset with its `.meta` file and preserve GUIDs when moving or replacing it.
- Prefer Unity-aware moves for scenes, prefabs, materials, animations, and other
  serialized assets.
- Review serialized diffs for lost references, unexpected overrides, and broad
  reserialization.
- Never edit generated folders such as `Library`, `Temp`, `Logs`, `obj`, or build output.
- Keep runtime assemblies free of `UnityEditor`; put editor tooling in an `Editor` folder
  or editor-only assembly.
- Match the project's pinned Unity version, packages, render pipeline, input system,
  supported C# features, and code style.

## Evidence and Git

Use checks appropriate to the change: Unity compilation, EditMode or PlayMode tests, a
player build, serialized-asset inspection, and a focused manual play check. Record what
actually ran in `TASK.md`; mark irrelevant checks `N/A` with a reason. A required but
unavailable check is not a pass.

After `Done`, inspect staged and unstaged changes, summarize the exact scope, and propose
a concise commit message. Leave the index untouched until commit-specific approval for
the current task, then stage only its final scope. If unrelated staged changes or
overlaps prevent safe isolation, leave the index untouched and stop.
