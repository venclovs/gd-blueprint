# Unity and C# development rules

Apply these rules after inspecting the project. Established project style and the
project-specific conventions in `PROJECT.md` take precedence over these defaults unless
they are unsafe, incompatible with the recorded Unity version, or the task explicitly
changes them.

## Architecture

- When an established project's status is still `Unresolved`, preserve the architecture
  and conventions observed in the repository; do not impose a preset or edit `PROJECT.md`
  as an incidental build step.
- For `Selected` or `Existing`, preserve the recorded approach, dependency direction,
  boundaries, and runtime-state ownership. Put new behavior in the responsible layer or
  module; record a necessary deviation instead of quietly eroding the architecture.
- For `Declined`, follow the repository's established structure without introducing a
  framework. Do not add architecture packages or runtime scaffolding unless requested.
- For `Prototyping`, keep scout code cheap, isolated, and disposable. Prototype choices
  do not establish production architecture.
- Do not migrate an existing project or revise the architecture decision as an incidental
  part of a feature or fix. Route a material architecture change through `$gd-plan`.

## Version and API truth

- Always confirm `ProjectSettings/ProjectVersion.txt` and the relevant installed package
  versions before choosing an API. Inspect package source, the render pipeline, input
  system, assembly definitions, and existing usage only when the change depends on them.
  Use `Packages/manifest.json` and `Packages/packages-lock.json` when present.
- Treat the recorded Editor and installed package versions as the compatibility target.
  Use documentation for those versions and do not assume that the newest documented API
  or C# syntax is available. For embedded, local, or Git packages, inspect the actual
  installed source when public versioned documentation is insufficient.
- Keep existing projects pinned. For a new project, use the LTS version selected and
  recorded by `$gd-plan`; if none is selected, get that decision before scaffolding.
- Match the C# language/compiler support of the selected Editor. Unity 6.0, for example,
  documents C# 9 with listed limitations; later language features require evidence from
  the project's actual Editor/toolchain. See Unity's
  [C# compiler documentation](https://docs.unity3d.com/6000.0/Documentation/Manual/csharp-compiler.html).
- Do not upgrade the Editor, packages, render pipeline, input system, or API compatibility
  level unless the task explicitly includes the upgrade.

## Implementation defaults

- Keep runtime assemblies free of `UnityEditor`; put editor tooling in an `Editor` folder
  or editor-only assembly.
- Prefer explicit serialized dependencies, narrow public APIs, small components, and plain
  C# game rules that can be tested without a scene where practical.
- Pair event subscription and unsubscription in compatible lifecycle methods. Avoid
  hidden global dependencies and repeated scene/object searches.
- Use ScriptableObjects for persistent configuration or shared definitions, not mutable
  session state, unless the recorded architecture explicitly owns and resets that state.
- Avoid unnecessary allocations, reflection, logging, object lookup, and component lookup
  in hot update paths. Optimize demonstrated or structurally obvious hot paths rather than
  broadly obscuring code.
- Preserve asset GUIDs and `.meta` files. Use Unity-aware operations for scenes, prefabs,
  materials, animation, ScriptableObjects, and other serialized assets; inspect their
  diffs for lost references, unexpected overrides, and broad reserialization.
- Never edit generated directories such as `Library`, `Temp`, `Logs`, `obj`, or build
  output.

## Tooling and verification

- Detect whether a live Unity Editor connection, official Unity skills, or a project CLI
  is already available and use it when it is the safest applicable path. Do not install,
  enable, update, or reconfigure optional tooling without developer authorization.
- Retain filesystem inspection and the project's existing Unity batch-mode, test, and
  build routes as fallbacks.
- Choose checks proportional to the change: compilation, focused EditMode or PlayMode
  tests, player build, serialized-diff review, and a focused manual play check. Record
  only what actually ran; an unavailable required check remains a blocker.
