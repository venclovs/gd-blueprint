# GD Blueprint

A small, file-based workflow for solo Unity projects. It keeps the game direction and current work visible without adding runtime code or choosing an architecture.

```text
$gd-plan -> $gd-build
```

Use `$gd-build` for any feature, fix, tool, or content change. It scopes the task before
editing and asks only when a missing decision would materially change the result.

```text
$gd-build add a pause menu
```

## Install with npx

Install into the current directory:

```bash
npx gd-blueprint@latest
```

Or install into another existing directory from anywhere:

```bash
npx gd-blueprint@latest /path/to/MyGame
```

Node.js 18 or newer is required. The installer copies missing workflow files and keeps
every existing file unchanged. It does not require an existing Unity project. It is a
one-time install: rerunning it does not update existing files, so merge future changes manually.

## Manual install

[Download the repository ZIP](https://github.com/venclovs/gd-blueprint/archive/refs/heads/main.zip)
and extract it. Show hidden files, then copy these three items into the Unity project root:

```text
.agents/
.gd-blueprint/
AGENTS.md
```

If a matching path exists, merge it manually; never replace an existing folder or file.

## Use the skills

In Codex CLI or the VS Code extension, invoke a skill explicitly:

```text
$gd-plan
```

Type `$` or use `/skills` to browse them. In the desktop app, open Skills from the
sidebar. Codex may also select a skill automatically when the request matches its purpose.
Skill changes are detected automatically; restart Codex only if they do not appear.

## Why use skills?

Codex can build a Unity game without them. These skills make a few project-specific
choices repeatable across chats and agents:

- `.gd-blueprint/PROJECT.md` and `.gd-blueprint/TASK.md` preserve direction and current work.
- Short calls produce the same planning, scope, Unity safety, verification, and commit behavior.
- Only the relevant skill instructions load for a request, instead of repeating a large prompt.

`AGENTS.md` provides the always-on Unity safeguards; skills provide optional, focused workflows.

Skills can be selected explicitly or automatically when a request matches their purpose.
See the [official OpenAI skills documentation](https://developers.openai.com/codex/skills).

## Skills

- `$gd-plan` sets or refreshes the game direction, Unity context, scope, and roadmap.
- `$gd-build` scopes and handles a change through diagnosis when needed, implementation,
  verification, and the commit prompt.

After successful verification, the workflow summarizes the diff, proposes a commit
message, and asks permission. It may commit without another prompt only when you gave
commit-specific permission for that task in advance.

Project state stays in two files:

- `.gd-blueprint/PROJECT.md` contains the game direction, technical facts, and roadmap.
- `.gd-blueprint/TASK.md` contains the active task and its evidence.

Reusable workflow instructions live in `.agents/skills/`. Normal Codex prompts still work.

## License

MIT. See [LICENSE.md](LICENSE.md).
