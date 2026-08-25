---
name: gd-build
description: Plan or implement one focused Unity outcome while keeping multiple agents inside one director-owned architecture.
---

# Build within one Unity architecture

Use `unity-cli` for Unity operations.

One human director owns the architecture lock. Each agent implements one director-defined outcome
within its declared write set.

## Lock the architecture

Use an existing project architecture file. If none exists, the agent initializing the project
creates a populated `ARCHITECTURE.md` in the Unity project root. It records the game flow and five
points below. All agents read it before editing. Update it only when the flow or an architecture
decision changes, with one agent editing it at a time.

Before editing, state the outcome, owner, exact write set, convention source, choices for the five
numbered points below, and verification. Resolve each choice in this order: director constraint;
repository instruction or named example; same-owner pattern; project-owned example with the same
role and artifact kind; fallback below. Do not use packages, third-party code, or generated code as
convention sources. If sources conflict, ask one targeted question instead of blending them.

## 1. Owner and feature boundaries

Fallback:

- `Features/<Feature>`: a vertical slice owning its code, content, and tests.
- `Bootstrap`: cross-feature startup and wiring only.
- `Shared`: cross-owner runtime code already used by at least two owners; no feature-specific
  behavior or mutable feature state.
- `Tools`: Editor-only work.

If a new owner or cross-owner API is required, ask the director to approve it and assign its writer.

Each path has one active writer. The write set names cross-owner APIs, shared assets, `Bootstrap`,
`Shared`, `Packages`, and `ProjectSettings`. The director serializes overlaps and Unity import,
compile, test, and build operations.

## 2. Folder and asmdef layout

With no project pattern, use this layout under `Assets/Game/`:

```text
Bootstrap/Runtime/Game.Bootstrap.asmdef
Features/<Feature>/Runtime/Game.<Feature>.asmdef
Features/<Feature>/Content/
Features/<Feature>/Editor/Game.<Feature>.Editor.asmdef
Features/<Feature>/Tests/EditMode/Game.<Feature>.EditModeTests.asmdef
Features/<Feature>/Tests/PlayMode/Game.<Feature>.PlayModeTests.asmdef
Shared/Runtime/Game.Shared.asmdef
Tools/Editor/Game.Tools.Editor.asmdef
```

Create only needed paths. Each runtime owner gets one runtime asmdef; extra assemblies require a
director decision or established project pattern.

## 3. Namespace and naming conventions

Fallback: prefix `Game`; root namespace equals the full assembly name; reference asmdefs by assembly
name; set `autoReferenced: false`. Use the director-named PascalCase capability or responsibility.

## 4. Composition, configuration, communication, and dependency wiring

Allowed runtime edges are `Bootstrap -> Feature|Shared`, `Feature -> Shared`, and one-way
consumer-feature to provider-feature. Allow no other runtime edges, cycles, or `Assembly-CSharp`
references.

Follow director-selected or established wiring. Otherwise use serialized fields for scene objects,
initialization for runtime-created Unity objects, and constructors for plain C# types.

Within an owner, concrete references are valid. Across owners, consume a narrow provider-owned API:
concrete when one implementation suffices, an interface when implementations vary, direct calls for
commands and queries, and provider-owned C# events for notifications. Add no second wiring or
messaging mechanism.

Follow project configuration; otherwise keep configuration owner-local. Expose only
Unity-attachable types and provider APIs required by other assemblies.

## 5. Test organization and reference style

Tests stay with their owner: EditMode when lifecycle or scene execution is unnecessary; PlayMode for
lifecycle, serialization, or composition. Cross-feature tests belong to the consumer; startup tests
to `Bootstrap`. Create test asmdefs only when tests exist and reference only the owner and exercised
providers. Production never references tests; runtime and PlayMode never reference `UnityEditor`.

## Verify

Run locked verification. After integration, the assigned owner compiles the combined project,
inspects errors, and reruns affected tests and smoke checks.
