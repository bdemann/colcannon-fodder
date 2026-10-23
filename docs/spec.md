# Mash Potato Defense --- Game Jam Spec

## 1. Game concept

**Working title:** Mash Potato Defense\
**Game jam theme:** Mashup\
**Genre mashup:** Cooking game + tower defense\
**Core joke:** Everything is mashed together---including the potatoes.

Potatoes walk along a path toward a restaurant. The player places
cooking-themed towers beside the path to process them before they reach
the customers. Each potato arrives in a state determined by what
happened along the route. Customers judge the result: properly mashed
potatoes are good; underprocessed potatoes are bad; untouched potatoes
are raw and very bad.

The game should be built in small, independently testable increments.
The first playable version should be intentionally tiny and presentable
even if development stops early.

## 2. Scope and priorities

### Must-have for a presentable core game

1.  A potato can spawn and walk along one straight path toward a
    restaurant.
2.  The potato reaches the restaurant and is evaluated.
3.  A simple score / penalty system tracks the result.
4.  The player can place a basic tower beside the path.
5.  Towers affect potatoes when they are in range.
6.  The core processing loop supports the three planned tower types:
    -   Knife: cuts the potato.
    -   Boiling-water tower: cooks the potato.
    -   Masher: mashes the potato.
7.  The game has a clear win/lose or end-of-round state and enough
    visual feedback to understand what happened.

### Nice-to-have only after the core is stable

-   More path shapes (curves, turns, branching).
-   Power-ups or temporary boosts.
-   Tower upgrades.
-   Additional waves, difficulty progression, polish, sound, and
    effects.

**Scope rule:** Do not start bonus features until the straight-path game
is playable from start to finish.

## 3. Core gameplay loop

1.  Potatoes enter at the beginning of the path.
2.  Potatoes walk toward the restaurant.
3.  The player places cooking towers near the path.
4.  Towers process potatoes that enter their range.
5.  Each potato reaches the restaurant and is evaluated.
6.  The result adds points or penalties to the player's score /
    restaurant health.
7.  The player continues until the round ends.

## 4. Potato processing model

Keep the initial model simple and readable. A potato has three
processing properties:

-   **Cut:** whether it has been cut.
-   **Cooked:** whether it has been cooked.
-   **Mashed:** whether it has been mashed.

Initially, each property can be a boolean. A tower changes its
corresponding property when it hits or processes a potato.

### Customer evaluation (initial proposal)

  Potato state             Result
  ------------------------ ---------------------------------------
  Cut + cooked + mashed    Good serving; award points
  Any processing missing   Bad serving; apply a smaller penalty
  No processing at all     Raw potato; apply the largest penalty

Exact point values can be tuned later. Make them constants/configuration
rather than scattered through code.

**Important:** The game is about making mashed potatoes, so the initial
implementation should require all three processing steps for a perfect
result. If implementation time is tight, the first prototype may
temporarily use a single `mashed` state, but the final core loop should
include the three planned tower types.

## 5. Towers

All towers should share a simple placement, range, and processing
interface where practical.

### Knife tower

-   Represents cutting.
-   Targets potatoes within range.
-   Changes the potato's `cut` state.
-   Initial behavior: one hit is enough.

### Boiling-water tower

-   Represents cooking.
-   Targets potatoes within range.
-   Changes the potato's `cooked` state.
-   Initial behavior: one hit is enough.

### Masher tower

-   Represents mashing.
-   Targets potatoes within range.
-   Changes the potato's `mashed` state.
-   Initial behavior: one hit is enough.

### Tower rules for the first version

-   Towers are placed by the player in valid build locations.
-   A tower has a visible range or otherwise clear targeting feedback.
-   Towers automatically process eligible potatoes in range.
-   No tower upgrade system is required for the first playable version.
-   Avoid complex targeting, projectile physics, or resource economies
    unless they are already trivial in the chosen engine.

## 6. Path and movement

### First implementation

-   One straight path.
-   A clearly marked potato spawn point.
-   A clearly marked restaurant / endpoint.
-   Potatoes move at a constant speed.
-   Potatoes follow the path and cannot leave it.
-   Reaching the endpoint triggers customer evaluation.

### Later expansion

-   Curved paths.
-   Multiple turns.
-   Branching paths only if time remains.
-   Path layout should be data-driven or represented in a way that does
    not make future shapes require a full rewrite.

## 7. Scoring and failure

Use a simple, visible score or restaurant-health value.

Suggested initial behavior: - Perfect mashed potato: increase score /
improve customer satisfaction. - Incomplete potato: reduce satisfaction
or apply a small penalty. - Raw potato: apply a larger penalty. - Game
ends when the player reaches a configurable failure threshold, or after
a fixed number of potatoes / waves.

For the earliest prototype, the most important thing is that the player
can clearly see the consequence of a potato reaching the restaurant.
Final balancing is not required.

## 8. Minimal UI and feedback

The first presentable version should include: - Start / restart control,
if needed by the game flow. - Score or restaurant health display. - A
clear path from spawn to restaurant. - Visible potatoes moving along the
path. - A simple tower selection / placement interaction. - Visual
indication when a tower processes a potato. - A clear result when a
potato reaches the restaurant. - A game-over or round-complete
screen/state.

Use simple placeholder art if necessary. Readability is more important
than polished assets.

## 9. Implementation principles for the development agents

-   Work in very small vertical slices.
-   Every issue should produce a visible or testable result.
-   Keep the game runnable after each issue.
-   Prefer simple, explicit code over flexible systems that are not
    needed yet.
-   Avoid introducing dependencies or architecture for speculative
    features.
-   Keep tower processing, potato state, path movement, and customer
    evaluation separable enough to test.
-   Add basic tests or a repeatable manual verification checklist for
    gameplay logic.
-   Use placeholder art and primitive shapes until the core loop works.
-   Document controls and how to run the game in the repository README.

## 10. Suggested issue plan

Issues are ordered so the project has a playable milestone as early as
possible. Agents should create small GitHub issues from these tasks,
splitting any issue further if it cannot be completed in a short focused
session.

### Milestone 0 --- Project runs

-   [ ] **Create project skeleton and run instructions**
    -   Initialize the project using the agreed game engine.
    -   Add a minimal scene / entry point.
    -   Document how to launch the game locally.
    -   Acceptance: a developer can clone the repo and launch a blank
        playable window or scene.

### Milestone 1 --- Potato reaches the restaurant

-   [ ] **Draw a straight path and endpoint**
    -   Show a simple straight path with a spawn point and restaurant
        endpoint.
    -   Acceptance: path and endpoint are clearly visible.
-   [ ] **Create a potato placeholder**
    -   Render one simple potato sprite or shape.
    -   Acceptance: potato is visible at the spawn point.
-   [ ] **Move a potato along the straight path**
    -   Move the potato at a constant speed toward the restaurant.
    -   Acceptance: potato reliably reaches the endpoint without
        drifting off the path.
-   [ ] **Trigger evaluation when potato arrives**
    -   Detect endpoint arrival and remove or reset the potato.
    -   Acceptance: arrival triggers exactly one evaluation event.
-   [ ] **Spawn potatoes repeatedly**
    -   Spawn potatoes at a fixed interval.
    -   Acceptance: multiple potatoes travel independently and arrive in
        order.

### Milestone 2 --- Make losing / scoring visible

-   [ ] **Add potato processing state**
    -   Store cut, cooked, and mashed states on each potato.
    -   Acceptance: a new potato starts with all processing states
        false.
-   [ ] **Evaluate potato quality**
    -   Determine whether the potato is raw, incomplete, or fully
        mashed.
    -   Acceptance: evaluation result matches the processing state
        table.
-   [ ] **Display score or restaurant health**
    -   Show the current score / health on screen.
    -   Acceptance: the value updates when each potato arrives.
-   [ ] **Add failure threshold and game-over state**
    -   End the round when the configured threshold is reached.
    -   Acceptance: game-over is visible and potato spawning stops.
-   [ ] **Add restart**
    -   Reset score, potatoes, and round state.
    -   Acceptance: player can start a fresh run after game over.

### Milestone 3 --- Place and use towers

-   [ ] **Add tower selection UI**
    -   Provide a basic way to select a tower type.
    -   Acceptance: player can select a tower without confusing it with
        gameplay controls.
-   [ ] **Place a tower beside the path**
    -   Allow placement in valid build areas.
    -   Acceptance: tower appears at the selected location; invalid
        placement is rejected or clearly indicated.
-   [ ] **Add tower range detection**
    -   Determine which potatoes are within tower range.
    -   Acceptance: a potato entering range can be detected reliably.
-   [ ] **Add knife tower processing**
    -   Knife tower changes `cut` state for a potato in range.
    -   Acceptance: potato becomes cut and cannot be repeatedly
        processed unnecessarily.
-   [ ] **Add boiling-water tower processing**
    -   Boiling-water tower changes `cooked` state for a potato in
        range.
    -   Acceptance: potato becomes cooked.
-   [ ] **Add masher tower processing**
    -   Masher tower changes `mashed` state for a potato in range.
    -   Acceptance: potato becomes mashed.
-   [ ] **Connect tower processing to customer evaluation**
    -   Fully processed potatoes score positively; incomplete/raw
        potatoes penalize.
    -   Acceptance: placing the correct towers changes the outcome at
        the restaurant.
-   [ ] **Add processing feedback**
    -   Show a brief visual change, indicator, or effect when a potato
        is processed.
    -   Acceptance: the player can tell which processing step happened.

### Milestone 4 --- First complete, presentable game

-   [ ] **Add a simple wave or run progression**
    -   Define a fixed number of potatoes or a small wave.
    -   Acceptance: run has a clear beginning and ending.
-   [ ] **Add minimal polish to the playfield**
    -   Improve contrast, labels, and visual hierarchy without requiring
        final art.
    -   Acceptance: player can understand spawn, path, towers,
        restaurant, score, and game state at a glance.
-   [ ] **Add basic sound or animation polish (optional within
    milestone)**
    -   Add only if it does not threaten completion.
    -   Acceptance: core gameplay remains readable with sound off.
-   [ ] **Write a short controls / gameplay README**
    -   Explain objective, controls, and how to run.
    -   Acceptance: someone unfamiliar with the project can play without
        developer explanation.

### Milestone 5 --- Bonus features (only if core is finished)

-   [ ] **Add tower upgrades**
    -   Start with one simple upgrade per tower, such as increased range
        or faster processing.
-   [ ] **Add alternate path shapes**
    -   Add a curved or turning path while preserving potato movement.
-   [ ] **Add a power-up**
    -   Implement one temporary effect, such as faster tower processing.
-   [ ] **Add branching path**
    -   Only attempt if pathing and tower targeting are already stable.
-   [ ] **Add extra visual / audio polish**
    -   Improve potato, tower, restaurant, and processing feedback.

## 11. Definition of done for the core game

The core game is considered complete when: - The game launches from the
documented instructions. - Potatoes spawn and follow a straight path to
the restaurant. - The player can place knife, boiling-water, and masher
towers. - Towers process potatoes in range. - The restaurant evaluates
potatoes based on their processing. - Score / health changes visibly. -
The run can end and restart. - The player can understand the objective
and result without developer explanation.

## 12. Explicitly out of scope for the jam's core

Do not build these unless the core is complete: - Many enemy /
ingredient types. - Complex branching path strategy. - Large upgrade
trees. - Multiple currencies or shop systems. - Detailed cooking
simulation. - Realistic physics. - Online features, persistence, or
meta-progression. - Extensive menus or settings. - Final-quality art
before gameplay is complete.

## 13. Open decisions for implementation

These can be resolved by the development agents with sensible defaults,
without blocking the first prototype: - Game engine and project
structure. - Exact score and failure values. - Potato spawn interval and
movement speed. - Tower range and processing cadence. - Whether towers
process instantly or use simple projectiles. - Exact build-area rules. -
Visual style and placeholder assets.

**Default recommendation:** choose the simplest implementation that
makes the core loop clear and keeps the game runnable. Prioritize a
complete, understandable straight-path game over optional mechanics.
