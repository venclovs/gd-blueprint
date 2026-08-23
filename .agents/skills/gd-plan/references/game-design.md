# New-game design and architecture

Use this reference selectively when a game is new, its direction is being reconsidered,
or its production architecture is unresolved. Keep the result proportional to the game;
do not turn a small concept into a large design document.

## Establish the design

Record concise, decision-useful answers in `.gd-blueprint/PROJECT.md`:

- Player promise and fantasy: what the player gets to feel or become.
- Audience, target platforms, and expected session length.
- A few design pillars that resolve tradeoffs, plus explicit exclusions.
- Core verbs and the meaningful choices behind them.
- Moment-to-moment loop: perceive, decide, act, and receive feedback.
- Session or run loop: pursue a goal, escalate, resolve, earn an outcome, and replay or
  exit.
- Progression loop: what persists, unlocks, changes strategy, or demonstrates mastery.
- Feedback and rewards, failure and recovery, and motivation to replay.
- Smallest credible release, observable quality targets, and major design risks.

Separate observations, developer decisions, assumptions, and unknowns. Do not invent
detail merely to fill the template.

## Choose the greenfield Unity baseline

When the Unity project does not exist yet, record that instead of trying to inspect a
technical snapshot. Verify the current LTS from an official Unity source, recommend it
as the default, and let the developer override it. Also capture the target platform,
2D/3D needs, render pipeline, input approach, and first useful test or build route when
they affect project creation. Mark any undecided production prerequisite explicitly;
planning does not install the Editor, create the project, or add packages.

## Run focused research

For a new game, run a short, cited research pass using at most three useful comparable
games or technical precedents. Choose sources that can resolve an open decision or
expose a risk rather than producing a generic market survey. If the developer opts out
or research access is unavailable, record the resulting uncertainty instead of inventing
findings. For an established game, research only when a new decision needs it. Prefer
primary, current sources for technical claims; distinguish source facts from inferences.

For each comparable or precedent, capture the question it informs, the applicable
lesson, and the resulting project decision or remaining uncertainty. Summarize those
findings in `PROJECT.md` and record provenance in
`.gd-blueprint/references/INDEX.md`.

Keep research images and other reference-only media beside that index, outside Unity's
`Assets` folder. Copy media only when it is user-provided, generated for the project, or
its permitted use is clear; otherwise record a link and notes. The index records the
title, creator or publisher, source URL, access date, relevance, rights or usage note,
and local filename when one exists.

## Scout risky assumptions

Use a small scout only for an assumption whose failure could invalidate the loop,
appeal, feasibility, or scope. Inspired by [Jonas Tyroller's discussion of searching the
design space](https://www.youtube.com/watch?v=o5K0uqhxgsE), explore cheaply before
committing and judge candidate ideas by fun, appeal, and achievable scope.

Each scout records:

- One question or falsifiable hypothesis.
- The cheapest useful prototype, research check, or playtest.
- How the result will be evaluated.
- The observed result, or `Pending` when it has not run.
- A `Keep`, `Revise`, or `Discard` decision after evidence exists.

When gameplay and presentation answer different questions, scout them separately.
Prototype code is disposable evidence, not a production foundation or an implicit
architecture choice. Put scouts before roadmap work that depends on them; record an
explicitly accepted risk when the developer chooses not to resolve one first.

## Make architecture an explicit decision

Before production work on a new game, recommend one fitting option, present all four,
and let the developer choose:

1. **Unity-native composition** — small `MonoBehaviour` components, prefabs, serialized
   references, plain C# helpers, and local C# events. This is the default recommendation
   for small, mechanics-first games.
2. **ScriptableObject-driven modules** — ScriptableObjects define configuration,
   content, event channels, or runtime sets where inspector composition and reuse are
   valuable. Mutable runtime state stays separate from saved configuration. See
   [Unity's modular architecture guidance](https://unity.com/how-to/architect-game-code-scriptable-objects).
3. **Layered domain core** — pure C# game rules behind explicit boundaries, with thin
   Unity adapters and assembly definitions separating runtime, editor, and tests. Prefer
   it for systems-heavy strategy or simulation and games needing extensive automated
   tests.
4. **None / no imposed preset** — deliberately impose no preset; in an existing project,
   follow the established shape.

Explain the recommendation using the game's size, content volume, system complexity,
testing needs, and team or agent workflow. Do not silently select, combine, scaffold, or
install an option. Treat the choice as the primary boundary model, not a ban on secondary
techniques; a deliberate hybrid is allowed when its ownership and boundaries are
recorded. Record the developer's choice, rationale, boundaries, allowed secondary
techniques, runtime-state ownership, and revisit triggers in `PROJECT.md`. Use `Selected`
for a chosen preset, `Existing` for an established project, and `Declined` for an
explicit choice of none. Leave it `Unresolved` or `Prototyping` while the decision still
depends on evidence.

For an existing project, inspect and describe the architecture actually in use. Preserve
its Unity version, packages, conventions, and boundaries unless the developer explicitly
requests a change; the preset menu is not a migration prompt.

Greenfield production begins only after the architecture is `Selected` or deliberately
`Declined`. An established project may continue with its observed structure before a
planning refresh records `Existing`. Once a decision is recorded, `$gd-build` follows it
until the developer revises it through `$gd-plan`.
