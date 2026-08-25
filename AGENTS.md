# GD Blueprint

Before changing the Unity project, read `.agents/PROJECT.md`, `.agents/TASK.md`, and
relevant source. Use `gd-build`; if unavailable, read
`.agents/skills/gd-build/SKILL.md`. Use the installed `unity-cli` skill for Unity operations.

The script architecture is already selected. Ordinary game work never compares, chooses,
or invents architectures. Changing this contract requires a separately requested migration.

## Architecture contract

- Project-owned game code lives under `Assets/Game/`; packages, third-party code,
  generated code, and untouched legacy code are outside this contract.
- Place by first match: recorded bridge -> `Legacy`; cross-feature startup -> `Bootstrap`;
  gameplay -> the existing feature owning the changed state or invariant, otherwise the
  feature owning the changed behavior's established output, otherwise one new feature
  named for the observable capability; neutral runtime code with two named consumers ->
  `Shared`; project-wide Editor work -> `Tools`. Keep local code, tests, and assets with
  their feature. Stop on ambiguous ownership. Technical roles are not features or assemblies.
- Each runtime-bearing Feature, Bootstrap, and Shared has exactly one runtime asmdef and
  at most one peer of each listed kind; no other project-owned assembly shapes are used.
  `<Owner>` is its folder and `<Token>` its PascalCase name:

  ```text
  <Owner>/Runtime/<Prefix>.<Token>.asmdef
  <Owner>/Editor/<Prefix>.<Token>.Editor.asmdef
  <Owner>/Tests/EditMode/<Prefix>.<Token>.EditModeTests.asmdef
  <Owner>/Tests/PlayMode/<Prefix>.<Token>.PlayModeTests.asmdef
  Features/<Feature>/Content/
  Tools/Editor/<Prefix>.Tools.Editor.asmdef
  Tools/Tests/EditMode/<Prefix>.Tools.EditModeTests.asmdef
  ```

  Each asmdef's root namespace equals its assembly name. `PROJECT.md` owns the prefix
  before the first asmdef and defaults to `Game`; source owns it afterward. Keep C# out of
  `Content/`. Test asmdefs carry the installed Test Framework marker. Editor and EditMode
  assemblies are Editor-only; PlayMode tests never reference `UnityEditor`; production
  never references tests.
- New project asmdefs set `autoReferenced: false`. Freeze complete touched flags and
  references. Preserve the project's name-or-GUID style; use names when none exists and
  never invent a GUID. A true `autoReferenced` value is allowed only as a recorded Legacy
  bridge edge.
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
  concrete Unity adapters, authored assets, registries, or implementation collections.
  At Inspector boundaries, adapters serialize a `Component`, resolve and validate the
  interface during composition, and pass it inward. Never add interface-per-class or
  Contracts assemblies.
- Custom asmdefs never reference `Assembly-CSharp`; a Legacy bridge owns no gameplay.
  Keep `UnityEditor` out of runtime assemblies, preserve `.meta` files and GUIDs, and
  never hand-edit Unity YAML.

## Deterministic code

- Keep decisions, transitions, and gameplay-owned state in plain C#. MonoBehaviours only
  adapt serialization, composition, sensing/input, Unity lifecycle, movement, and
  presentation; never mirror Unity-owned state into the rules.
- Put cohesive designer-authored configuration in feature-local ScriptableObjects when
  authoring or reuse adds value. Validate once, copy to immutable runtime values, and keep
  per-agent/session state out of those assets.
- Use event-driven control for discrete facts with typed producer events instead of frame
  polling. Subscribe and unsubscribe with the subscriber's lifetime. When several events
  can affect one decision, process a frozen batch at an explicit step in a total order
  defined by event data; callback and subscription order never decide output. Tick only
  continuous or timed rules. No static events or event bus.
- Use an injected feature/session registry only for real dynamic membership or repeated
  discovery. Define duplicate and lifetime behavior, snapshot valid members, then filter
  and rank with a total order ending in a stable unique domain ID. Never use registration
  order, `GetInstanceID`, a static registry, global manager, service locator, or broad
  scene search for dependency resolution or selection.
- Given the same validated configuration, ordered inputs/stimuli, time steps, and random
  state, plain rules produce the same decisions. Never read ambient `Time`, `Input`,
  `UnityEngine.Random`, unordered traversal, or Unity callback order as rule input. Pass
  time, input, independently owned named random streams, and tie-breakers explicitly.
  When replay/save/load or lockstep requires continuation, freeze the generator algorithm,
  stream derivation, draw order, and serialized state. This does not promise
  cross-platform physics identity.
