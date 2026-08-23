# GD Blueprint

A small, file-based design-to-delivery workflow for solo Unity projects and AI-assisted
development.

```text
$gd-plan -> $gd-build
```

It adds planning, implementation, verification, and optional multi-agent coordination
without adding runtime code or silently choosing a game architecture.

## Install with npx

Install into the current directory:

```bash
npx gd-blueprint@latest
```

Or install into another existing directory:

```bash
npx gd-blueprint@latest /path/to/MyGame
```

Node.js 18 or newer is required. The installer copies missing workflow files and keeps
every existing file unchanged. Conflicting non-file paths stop the install before
anything is copied. It does not require an existing Unity project.

Installation is intentionally non-destructive and one-time: rerunning it adds missing
files but does not update customized ones. Merge newer template changes manually.

## Manual install

[Download the repository ZIP](https://github.com/venclovs/gd-blueprint/archive/refs/heads/main.zip),
show hidden files, and copy these items into the Unity project root:

```text
.agents/
.gd-blueprint/
AGENTS.md
```

If a matching path exists, merge it manually rather than replacing it.

## Two commands, two core state documents

Invoke a skill explicitly in Codex CLI or the VS Code extension:

```text
$gd-plan
$gd-build add a pause menu
```

Type `$` or use `/skills` to browse skills. In the desktop app, open Skills from the
sidebar. Codex may also select a skill automatically when a request matches it.

The workflow keeps its core project state in two documents:

- `.gd-blueprint/PROJECT.md` contains the player experience, design findings, release
  scope, Unity snapshot, architecture decision, project conventions, quality targets,
  and roadmap.
- `.gd-blueprint/TASK.md` contains the single active initiative, implementation state,
  integration notes, and verification evidence.

The auxiliary `.gd-blueprint/references/INDEX.md` records source and media provenance;
it does not hold gameplay or task state.

`$gd-plan` works only on project direction. `$gd-build` carries one task through
`Idle -> In progress -> Ready to verify -> Done`, then summarizes the exact diff and
offers a commit. It commits only after approval specific to that task.

## Planning a game

For a new game, `$gd-plan` turns the idea into a small, testable direction before
production work starts. It records:

- The player promise and fantasy, audience, platform, and expected session.
- Design pillars and explicit exclusions.
- Core verbs, meaningful choices, feedback, rewards, failure, recovery, and replay.
- Moment-to-moment, session, and progression loops.
- Release scope, observable quality targets, and a short value- and risk-ordered roadmap.

When evidence can resolve an open decision or risk, research is focused rather than
exhaustive: up to three useful comparable games or technical precedents, cited in the
reference index. A bounded microgame need not manufacture comparisons. The workflow uses
[Jonas Tyroller-inspired design-search heuristics](https://www.youtube.com/watch?v=o5K0uqhxgsE):
explore before committing, judge ideas by fun, appeal, and scope, and separate gameplay
and presentation experiments when they answer different questions.

High-risk assumptions can become small prototype **scouts**. Each scout states the
stable ID, question, cheapest useful check, evaluation method, result, decision, and
artifact disposition. Prototype code is disposable and does not establish production
architecture. After `$gd-build` runs a scout, `$gd-plan` records its result and any
resulting architecture or roadmap decision. The combined commit handoff follows that
reconciliation so evidence, provenance, and the resulting decision stay together.

Existing projects take a lighter path: `$gd-plan` inspects and records their current
Unity setup, architecture, and conventions without forcing migration.

## Architecture choice

Before production in a greenfield project, `$gd-plan` presents three approachable
options plus an explicit opt-out. The developer makes the final choice:

1. **Unity-native composition** — small MonoBehaviours, prefabs, serialized references,
   plain C# helpers, and local events. This is the default recommendation for small or
   mechanics-first games.
2. **ScriptableObject-driven modules** — ScriptableObjects for configuration, content,
   event channels, or runtime sets, while mutable runtime state remains separate from
   saved configuration. See [Unity's modular architecture guidance](https://unity.com/how-to/architect-game-code-scriptable-objects).
3. **Layered domain core** — pure C# game rules behind thin Unity adapters and assembly
   boundaries, suited to strategy, simulation, and systems needing extensive tests.
4. **None / no imposed preset** — impose no new architecture. Existing projects keep
   their conventions; greenfield tasks use only the minimum local Unity structure they
   need, without creating a general framework.

`$gd-build` follows the recorded decision. Changing an established architecture is a
separate explicit planning decision, not an automatic cleanup.

## Building and parallel work

Small and normal-sized changes stay entirely in `TASK.md`. When a larger initiative has
truly independent slices, `$gd-build` may create
`.gd-blueprint/tasks/<id>-<slug>.md` workstream files on demand. Each records blockers,
owned and no-touch paths, acceptance criteria, and verification. They are temporary:
the coordinator consolidates durable evidence into `TASK.md` and removes them before the
completed-task commit handoff.

Ready workstreams can be delegated to agents in parallel only when their write scopes
do not overlap. One coordinator owns `TASK.md`, integration, and final project-wide
verification. The coordinator also owns shared scenes, prefabs, materials,
ScriptableObjects, package manifests, project settings, and shared assembly definitions;
workstream agents treat them as read-only. Workstreams favor playable or testable
vertical slices and use dependency-aware sequencing inspired by
[Matt Pocock's ticket workflow](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-tickets).
File edits may run in parallel. For Unity Editor, import, test, or build operations, the
coordinator pauses project-file writers and keeps exclusive access through any resulting
import or refresh. If the Editor remains open, automatic refresh and import stay
suspended while writers are active.

## Unity and C# compatibility

The project is the source of truth. `$gd-build` reads `ProjectVersion.txt`, installed
packages, package sources, and existing code before choosing APIs or language features.
Existing projects remain pinned; new projects default to the latest available Unity LTS
unless the developer chooses otherwise.

Reusable guidance covers assembly boundaries, explicit serialized dependencies,
balanced event lifetimes, ScriptableObject state separation, hot-loop allocations, and
testable plain C# game rules. Existing project style wins. The workflow does not install
analyzers, `.editorconfig`, architecture frameworks, or runtime scaffolding.

Already-installed [official Unity skills and CLI tools](https://www.skills.sh/unity-technologies/skills)
may be used for Unity-aware inspection and serialized changes. They are optional and are
never installed automatically; filesystem and Unity batch-mode routes remain available.

## Research and reference media

Research citations and reference-only images live in
`.gd-blueprint/references/`, outside the Unity `Assets` directory. Record every source,
its relevance, creator or rights notes, and access date in `INDEX.md`.

Copy an image locally only when it is user-provided, generated for the project, or its
license or permission allows copying. Otherwise, keep the source URL and analysis in the
index. Moving a reference into `Assets` as a production asset is a separate, deliberate
decision with the appropriate usage rights.

## What GD Blueprint does not do

- It does not replace a full production tracker or require workstream files for small
  changes.
- It does not force architecture migrations or add Unity packages and code frameworks.
- It does not treat prototypes as production foundations.
- It does not publish packages, configure Git LFS, stage files, or commit without the
  workflow's explicit approvals.

`AGENTS.md` holds concise always-on safeguards. Detailed, conditional workflow guidance
lives in `.agents/skills/`, so normal Codex prompts continue to work without loading one
large instruction file. See the [official OpenAI skills documentation](https://developers.openai.com/codex/skills).

## License

MIT. See [LICENSE.md](LICENSE.md).
