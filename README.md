# GD Blueprint

A Unity workflow for coding agents: one vertical-slice architecture, explicit asmdef
boundaries, and deterministic verification. It adds only agent files—no Unity dependency
or game runtime code.

## Install

Use a tagged or pinned copy whose `.agents/TASK.md` is `Idle`. The official Unity CLI is
required (`unity --version`); Pipeline is required only for live Editor work. GD Blueprint
does not install or upgrade either one.

Copy these paths into the Unity project root:

```text
.agents/
AGENTS.md
```

Merge rather than overwrite existing agent files. Nothing is added to `Assets/`, and no
installer or Git setup is involved. Start the agent at the project root:

> Use `gd-build` to create {concept}. Done means {observable behavior}.

### Upgrade an older GD Blueprint install

Finish or dispose the active task, merge the three state/contract files, and replace
`.agents/skills/gd-build/` as one unit. Remove retired `.gd-blueprint/`, `gd-plan`, and npm
installer files only after their unique content has been migrated.

## License

[MIT License](LICENSE.md).
