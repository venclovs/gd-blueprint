---
name: gd-build
description: Implement one Unity outcome under the fixed architecture and deterministic verification.
---

# Build one Unity outcome

Use the installed `unity-cli` skill for Unity operations. The architecture below is fixed;
changing it requires a separately requested migration.

## Establish the outcome

Implement one observable outcome from the current request after inspecting relevant source.

## Architecture

- Project-owned game code lives under `Assets/Game/`; packages, third-party code,
  generated code, and untouched legacy code are outside this contract.
- Place by first match: cross-feature startup -> `Bootstrap`; gameplay -> the existing
  feature owning the changed state or invariant, otherwise the feature owning the changed
  behavior's established output, otherwise one new feature named for the observable
  capability; neutral runtime code with two named consumers -> `Shared`; project-wide
  Editor work -> `Tools`. Keep local code, tests, and assets with their feature. Stop on
  ambiguous ownership. Technical roles are not features or assemblies.
- Each runtime-bearing Feature, Bootstrap, and Shared has exactly one runtime asmdef and
  at most one peer of each listed kind; no other project-owned assembly shapes are used.
  Under `Assets/Game/`, `<Owner>` is `Features/<Feature>`, `Bootstrap`, or `Shared`;
  `<Token>` is the corresponding PascalCase feature name, `Bootstrap`, or `Shared`:

  ```text
  <Owner>/Runtime/<Prefix>.<Token>.asmdef
  <Owner>/Editor/<Prefix>.<Token>.Editor.asmdef
  <Owner>/Tests/EditMode/<Prefix>.<Token>.EditModeTests.asmdef
  <Owner>/Tests/PlayMode/<Prefix>.<Token>.PlayModeTests.asmdef
  Features/<Feature>/Content/
  Tools/Editor/<Prefix>.Tools.Editor.asmdef
  Tools/Tests/EditMode/<Prefix>.Tools.EditModeTests.asmdef
  ```

  Each asmdef's root namespace equals its assembly name. Use the existing project-owned
  asmdef prefix, or `Game` when none exists; stop if it is inconsistent. Keep C# out of
  `Content/`. Test asmdefs carry the installed Test Framework marker. Editor and EditMode
  assemblies are Editor-only; PlayMode tests never reference `UnityEditor`; production
  never references tests.
- New project asmdefs set `autoReferenced: false`. Change existing flags and references
  only as required. Preserve the project's name-or-GUID style; use names when none exists
  and never invent a GUID.
- `A -> B` means A references B. Allowed project-owned runtime edges are
  `Bootstrap -> Feature`, `Bootstrap -> Shared`, `Feature -> Shared`, and one-way
  `consumer Feature -> provider Feature`. No project-owned runtime assembly references
  Bootstrap, Shared references no feature, and cycles are forbidden. Bootstrap's own
  Editor/tests and other Editor/test asmdefs have project-owned edges only to code they
  directly extend or verify. Never add a coordination layer to bypass the graph.
- Types are internal by default. Make only Unity-attachable types and real cross-assembly
  APIs public; use exact test-assembly internals access rather than widening an API for
  tests. Compose inside a feature; use Bootstrap only for cross-feature startup, never
  per-frame mediation. Unity-required public components are not cross-feature APIs.
  `Shared` owns no gameplay policy or global/session state.
- Prefer concrete calls inside a feature. At a real polymorphic, feature, or platform
  boundary, use the smallest interface for the capability consumed. The gameplay provider
  owns cross-feature interfaces; the consumer owns platform ports. Signatures never expose
  concrete Unity adapters, authored assets, or mutable implementation collections.
  At Inspector boundaries, adapters serialize a `Component`, resolve and validate the
  interface during composition, and pass it inward. Never add interface-per-class or
  Contracts assemblies.
- Custom asmdefs never reference `Assembly-CSharp`. Keep `UnityEditor` out of runtime
  assemblies, preserve `.meta` files and GUIDs, and never hand-edit Unity YAML.

## Deterministic code

- Keep decisions, transitions, and gameplay-owned state in plain C#. MonoBehaviours adapt
  serialization, composition, sensing/input, Unity lifecycle, movement, and presentation.
  Sample Unity-owned state into explicit immutable rule inputs; never maintain a second
  authoritative copy in the rules.
- Put cohesive designer-authored configuration in feature-local ScriptableObjects when
  authoring or reuse adds value. Validate once, copy to immutable runtime values, and keep
  per-agent/session state out of those assets.
- Use event-driven control for discrete facts with typed producer events instead of frame
  polling. Subscribe and unsubscribe with the subscriber's lifetime. When several events
  affect one decision, process a frozen batch at an explicit step. Resolve it independently
  of order or sort by simulation step, stable domain ID, and a unique deterministic
  per-source sequence; callback and subscription order never decide output. Tick only
  continuous or timed rules. No static events or event bus.
- Use an injected feature/session registry only for real dynamic membership or repeated
  discovery. At each decision step, rules consume frozen membership directly or through a
  read-only query over that snapshot. Define duplicate and lifetime behavior, then filter and
  rank with a total order ending in a validated stable domain ID from authored or
  deterministically persisted spawn data. Never use registration order, `GetInstanceID`,
  runtime-random IDs, a static registry, global manager, service locator, or broad scene
  search for dependency resolution or selection.
- Given the same validated configuration, ordered inputs/stimuli, time steps, and random
  state, plain rules produce the same decisions. Never read ambient `Time`, `Input`,
  `UnityEngine.Random`, unordered traversal, or Unity callback order as rule input. Pass
  time, input, independently owned named random streams, and tie-breakers explicitly.
  When replay/save/load or lockstep requires continuation, freeze the generator algorithm,
  stream derivation, draw order, and serialized state. This does not promise
  cross-platform physics identity.

## Verify

Compare changed code and asmdefs with the requested outcome and validate the dependency graph.
Required evidence, when applicable:

1. Import and compilation.
2. EditMode tests for plain rules.
3. PlayMode tests for Unity integration.
4. A player build when required.

Match determinism tests to the change: replay identical configuration, inputs, and seed
for randomness; vary callback and subscription order for the same decision stimuli; vary
registration order and equal-score ties for registries. PlayMode tests cover composed
enable/disable/destroy teardown when Unity lifetime behavior changed. When save/load or
lockstep continuation is in scope, test continuation from serialized random state.
