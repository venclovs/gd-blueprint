---
name: gd-build
description: Plan or implement one focused outcome using a fixed feature and assembly architecture, deterministic gameplay rules, and Unity CLI verification.
---

# Plan or build one Unity outcome

Use the installed `unity-cli` skill for Unity operations.

Work on one observable outcome. Inspect the relevant source first and follow existing project
conventions where this skill does not define them. The architecture below is fixed; changing it
requires a separately requested migration.

## Plan mode

In Codex Plan mode, inspect without modifying the project or calling mutating Unity commands.
Return a concise implementation plan covering:

- the outcome and acceptance criteria;
- the owner, files, and asmdefs affected;
- new or changed assembly edges;
- relevant deterministic state, inputs, ordering, or randomness; and
- required compile, test, and build evidence.

Ask one targeted question only if ownership remains materially ambiguous after inspection. Never
present planned verification as completed evidence.

## Architecture

Project-owned game code lives under `Assets/Game/`. Packages, third-party code, and generated code
are outside this contract.

Choose the owner by responsibility:

- `Bootstrap`: cross-feature startup only.
- `Features/<Feature>`: gameplay owned by an existing feature; otherwise create one feature named
  for the observable capability.
- `Shared`: neutral runtime code used by at least two features. It owns no gameplay policy or
  global/session state.
- `Tools`: Editor-only work with no runtime feature owner.

Keep a feature's code, tests, assets, and configuration together. Technical roles are not features.

A runtime-bearing owner has one runtime asmdef and at most one matching Editor, EditMode test, and
PlayMode test asmdef:

```text
<Owner>/Runtime/<Prefix>.<Token>.asmdef
<Owner>/Editor/<Prefix>.<Token>.Editor.asmdef
<Owner>/Tests/EditMode/<Prefix>.<Token>.EditModeTests.asmdef
<Owner>/Tests/PlayMode/<Prefix>.<Token>.PlayModeTests.asmdef
Features/<Feature>/Content/
Tools/Editor/<Prefix>.Tools.Editor.asmdef
Tools/Tests/EditMode/<Prefix>.Tools.EditModeTests.asmdef
```

- Match the existing project-owned prefix and reference style; use `Game` if none exists. Report
  inconsistent prefixes instead of guessing.
- Set each asmdef's root namespace to its assembly name and new asmdefs to
  `autoReferenced: false`. Match an existing test asmdef; if none exists, inspect one created by
  the installed Test Framework.
- Allowed runtime edges are `Bootstrap -> Feature`, `Bootstrap -> Shared`, `Feature -> Shared`, and
  one-way `consumer Feature -> provider Feature`. No cycles; no project-owned runtime assembly
  references `Bootstrap`; `Shared` references no feature.
- Editor and test assemblies reference only the code they extend or test. Production never
  references tests; PlayMode tests and runtime assemblies never reference `UnityEditor`.
- Types are internal by default. Make only Unity-attachable types and genuine cross-assembly APIs
  public. Use interfaces only at real feature, platform, or polymorphic boundaries. For Inspector
  wiring, serialize a `Component`, validate its interface during composition, and pass the
  interface inward.
- Never reference `Assembly-CSharp`, add a Contracts assembly or service locator, or hand-edit
  Unity YAML. Keep C# out of `Content/`, and preserve `.meta` files and GUIDs.

## Deterministic gameplay

- Keep gameplay decisions and owned state in plain C#. MonoBehaviours adapt Unity lifecycle,
  serialization, input, sensing, movement, and presentation.
- Put reusable designer-authored values in feature-local ScriptableObjects. Validate them and copy
  them into immutable runtime configuration; keep runtime state out of those assets.
- The same validated configuration, initial state, ordered inputs, time steps, and random state
  must produce the same decisions.
- Pass time, input, random streams, stable IDs, and tie-breakers explicitly. Rules must not depend
  on `Time`, `Input`, `UnityEngine.Random`, `GetInstanceID`, callback or registration order, or
  unordered traversal.
- Use typed events for discrete facts and ticking only for continuous or timed behavior. Subscribe
  and unsubscribe with the subscriber's lifetime.
- For dynamic scene membership, use a generic registry with explicit register/unregister lifetime
  instead of scene searches. If it is static, clear it between sessions and tests. Keep selection
  deterministic; do not use the registry as a general service locator.
- Serialize gameplay and random state only when save/load, replay, or lockstep continuation is in
  scope.

## Verify

Use Unity CLI and the connected Editor to verify proportionally:

1. Verify imports; after C# or asmdef changes, compile and check Console errors.
2. Run EditMode tests for changed plain rules or deterministic state.
3. Run PlayMode tests for changed Unity composition, serialization, or lifecycle behavior.
4. Build a player when requested or when build/platform behavior changes.

When relevant, test repeated runs with the same seed and inputs, plus alternate event,
registration, and equal-score ordering.
