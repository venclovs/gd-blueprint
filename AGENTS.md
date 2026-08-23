# GD Blueprint

Keep project direction in `.gd-blueprint/PROJECT.md` and the single active task in
`.gd-blueprint/TASK.md`. Read both before editing the Unity project.

## Task states

`Idle -> In progress -> Ready to verify -> Done`

- `$gd-build` scopes the request, implements it, verifies it, and offers to commit.
- It asks before editing only when a missing decision would materially change the result.
- Failed verification returns to `In progress`; an unavailable required check remains `Ready to verify`.
- `$gd-build` also resumes interrupted implementation, verification, or a pending commit handoff.
- Start another task from `Idle` or `Done`; abandoning unfinished work requires explicit direction about its changes.

## Unity safeguards

- Keep each asset with its `.meta` file; preserve GUIDs when moving or replacing assets.
- Prefer Unity-aware moves for scenes, prefabs, materials, animation, and other serialized assets.
- Review serialized diffs for lost references, unexpected overrides, and broad reserialization.
- Never edit generated folders such as `Library`, `Temp`, `Logs`, `obj`, or build output.
- Keep runtime assemblies free of `UnityEditor`; place editor tooling in an `Editor` folder or editor-only assembly.
- Match the project's existing Unity version, render pipeline, input system, packages, and code style.

## Evidence

Use the checks that fit the change: Unity compilation, EditMode or PlayMode tests,
a player build, serialized asset inspection, and a focused manual play check. Record
what actually ran under Verification in `.gd-blueprint/TASK.md`. Mark irrelevant checks
`N/A` with a reason. A required but unavailable check is a blocker, not a pass or failure.

## Git

After `$gd-build` moves a task to `Done`, inspect staged and unstaged changes, summarize
the exact scope, and propose a concise commit message. Commit only after commit-specific
approval for the current task, including approval given in advance. Stage only task
changes. If unrelated changes are already staged or cannot be isolated, stop without
altering the existing staging area.
