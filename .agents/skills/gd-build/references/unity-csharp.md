# Unity and C# development rules

Apply these rules after inspecting the project. Established project style and the
project-specific conventions in `PROJECT.md` take precedence over these defaults unless
they are unsafe, incompatible with the recorded Unity version, or the task explicitly
changes them.

## Architecture

- For `Selected` or `Existing`, preserve the recorded approach, dependency direction,
  boundaries, and runtime-state ownership. Put new behavior in the responsible layer or
  module; record a necessary deviation instead of quietly eroding the architecture.
- For `Declined`, follow an established repository's structure without introducing a
  framework. In greenfield work, use the smallest task-local Unity structure needed;
  do not promote it into a cross-task convention, add architecture packages, or create
  general runtime scaffolding. Route a durable structural decision through `$gd-plan`.
- For `Prototyping`, keep scout code cheap, isolated, and disposable. Prototype choices
  do not establish production architecture.

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
- Match the C# language and compiler support demonstrated by the selected Editor and its
  toolchain; do not infer support from a newer Editor's documentation.
- Do not upgrade the Editor, packages, render pipeline, input system, or API compatibility
  level unless the task explicitly includes the upgrade.

## Implementation defaults

- Prefer explicit serialized dependencies, narrow public APIs, small components, and plain
  C# game rules that can be tested without a scene where practical.
- Pair event subscription and unsubscription in compatible lifecycle methods. Avoid
  hidden global dependencies and repeated scene/object searches.
- Use ScriptableObjects for persistent configuration or shared definitions, not mutable
  session state, unless the recorded architecture explicitly owns and resets that state.
- Avoid unnecessary allocations, reflection, logging, object lookup, and component lookup
  in hot update paths. Optimize demonstrated or structurally obvious hot paths rather than
  broadly obscuring code.

## Prototype scout cleanup

- Follow the artifact disposition recorded for the scout. Never change it or delete an
  artifact chosen for retention without developer approval.
- For `Removed`, restore scout-only edits to existing files and delete scout-only
  artifacts, including their serialized references and `.meta` files, without touching
  unrelated changes.
- For `Evidence only`, apply the same cleanup but retain non-executable captures or
  reference media in addition to the scout record.
- Check the resulting diff, serialization, and compilation as applicable.

## Tooling

- Detect whether a live Unity Editor connection, official Unity skills, or a project CLI
  is already available and use it when it is the safest applicable path. Do not install,
  enable, update, or reconfigure optional tooling without developer authorization.
- Retain filesystem inspection and the project's existing Unity batch-mode, test, and
  build routes as fallbacks.
