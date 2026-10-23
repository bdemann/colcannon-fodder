# Colcannon Fodder: agent handbook

A cooking + tower defense game for a "Mashup" game jam. Potatoes walk a path to a restaurant;
the player places a Knife, a Boiling Pot and a Masher beside the path to cut, cook and mash them.
The restaurant judges each potato. Full design: `docs/spec.md`. Work items: GitHub issues on
`bdemann/colcannon-fodder`.

Built on the **Antha** engine (TypeScript + Pixi.js v8), started from `antha-engine/antha-template`.
Antha is new and niche: do not guess its APIs from memory. Use the patterns in this file and the
existing code, and read type declarations in `node_modules/@antha/*/dist/*.d.ts` when you need
more. Engine source: https://github.com/electrovir/antha (our fork: `bdemann/antha`).

## Commands

```bash
npm ci                 # install (once per worktree)
npx virmator frontend  # dev server on http://localhost:5173 (hot reload)
npm run compile        # type-check
npm test               # unit tests (web-test-runner, headless Chromium)
npm run lint           # auto-fix lint, then ALWAYS run `npm run format` after it
npm run format         # prettier
npm run test:all       # everything CI runs: compile, tests, spelling, format, deps, lint
node scripts/screenshot.js http://localhost:5173/ out.png [move:X:Y] [click:X:Y] [key:K] [wait:MS]
```

`npm run test:all` must pass before you open a PR. If spelling fails on a real word (a game
term), add it to `words` in `cspell.config.cjs`.

`scripts/screenshot.js` uses a 1280x720 browser viewport. World coordinates = browser
coordinates x 1.5 (the world is 1920x1080). It prints `gameState.runState` and `gameState.ui` and
any console errors. Use it to check visual work, and look at the PNG.

## Architecture

```
src/
  config/game-config.ts           every tunable number (speeds, scores, ranges, counts)
  level/level.ts                  level data (paths, restaurant) + path math helpers
  level/level.entity.ts           draws grass, paths, spawn markers, restaurant
  run/run-state.ts                RunState (score, satisfaction, status) + ServingResult, PotatoProcessing
  run/serving.ts                  evaluatePotato() + servePotato(): the restaurant's rules
  tower/tower-type.ts             TowerType enum + per-type label/color/hotkey/processes/range/cooldown
  game-state/game-state.ts        GameState + UiState + FullGameState types
  game-state/game-command.ts      GameCommand union + sendGameCommand()
  game-state/game-command-handlers.ts   one handler per command (runs in lockstep frames)
  game-state/game-lockstep.mod.ts the simulation loop: commands -> runState.elapsedMs -> entity updates
  game-state/game-entities.ts     list of every entity class (register new entities here)
  game-state/load-game.ts         bootstraps state and the mod list
  game-state/game-update.mod.ts   starts singleplayer + the first run
  input/input.mod.ts              mouse + keyboard -> state.ui
  hud/                            HTML overlay (element-vir) on top of the canvas
```

### The two kinds of code: simulation and UI

This split keeps co-op multiplayer possible later. Respect it in every change.

**Simulation** = command handlers (`game-command-handlers.ts`) and entity `update()` methods.

-   Runs inside lockstep frames: `gameLockstepMod.runFrameUpdate` calls
    `entityStore.updateAllEntities` only while `runState.status === RunStatus.Playing`.
-   May change entities and `state.runState`.
-   Must be deterministic: randomness only from `state.seededRandom.next()`, never `Math.random()`;
    no `Date.now()`, use `state.runState.elapsedMs` for time.
-   Must never read `state.ui`.

**UI** = mods that read input and draw HTML (`input.mod.ts`, `hud/`, placement preview code).

-   May read and write `state.ui`.
-   Must never change entities or `state.runState` directly. To change the simulation it calls
    `sendGameCommand(state, {type: GameCommandType.X, ...})`, which is applied at the next frame.

To add a player action: add a member to `GameCommandType` and the `GameCommand` union
(JSON-compatible fields only), add its handler to `gameCommandHandlers`, and send it from UI code.
Credit points with `getCommandSlot()` (always 0 in singleplayer) or the path's `ownerSlot`.

### Entities

Entities are classes made with `defineEntity` from `src/game-state/game-entity.mod.ts`. Params
are the entity's serializable state (keep them JSON: numbers, strings, booleans). Pattern:

```ts
import {position2dParamsShape, type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {Circle} from 'detect-collisions';
import {defineShape, intersectShape} from 'object-shape-tester';
import {defineEntity} from '../game-state/game-entity.mod.js';

export class ExampleEntity extends defineEntity({
    key: 'ExampleEntity', // unique, used for serialization
    paramsShape: intersectShape(
        position2dParamsShape, // x, y
        defineShape({
            speed: -1, // a number field (shape values are example values that set the type)
            label: '', // a string field
            done: false, // a boolean field
        }),
    ),
    paramsMap: {
        hitbox: {x: true, y: true}, // keep hitbox at params.x/y
        view: {x: true, y: true}, // keep the Pixi view at params.x/y
    },
    // Optional: get collide() calls for overlaps with these classes.
    // collidesWith: {collidesWithOtherEntities: [OtherEntity]},
}) {
    public override createView(): ViewCreation2d {
        return {
            // Optional collision shape, positioned relative to params.x/y by paramsMap.
            hitbox: new Circle({x: 0, y: 0}, 20),
            view: new Graphics().circle(0, 0, 20).fill({color: '#ffcc00'}),
        };
    }

    public override update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        this.params.x += this.params.speed * msSinceLastExecute; // view + hitbox follow automatically
        // this.state is the full game state. this.destroy() removes the entity next update.
        // this.view is the Pixi Container returned from createView; redraw it to show changes.
    }
}
```

-   Add new entity classes to `gameEntities` in `src/game-state/game-entities.ts`.
-   Create entities from simulation code: `await state.entityStore.addEntity(ExampleEntity, {x, y,
speed: 1, label: 'a', done: false})` or `this.addEntity(...)` inside an entity.
-   Find entities: `state.entityStore.getEntities(PotatoEntity)` returns a `Set` of live instances.
-   Remove: `entity.destroy()` (deferred, safe inside update/collide).
-   Logic-only entities (no view, e.g. a spawner) use `defineLogicEntity` from the same module and
    skip `createView`.
-   `ModExecuteParams` comes from `@antha/engine`. `Graphics` comes from `@antha/graphics-2d`;
    `Container` and `Text` come from `pixi.js`.

### Drawing

Pixi v8 Graphics API: `new Graphics().rect(x, y, w, h).fill({color}).stroke({color, width})`,
`.circle(x, y, r)`, `.moveTo().lineTo()`. To redraw: `graphics.clear()` then draw again. Text:
`new Text({text, style: {fill, fontSize, fontWeight}})`, then `text.anchor.set(0.5)`.

World is 1920x1080, origin top-left. Draw order: later-added entities draw on top; the level uses
`zIndex: -1` so it stays underneath. Placeholder art only (simple shapes and colors).

### HUD

`hud.mod.ts` renders `GameHud` (`hud/hud.element.ts`) every tick with two inputs:

-   `snapshot`: a `HudSnapshot` (`hud/hud-snapshot.ts`) of plain values, rebuilt every tick. The
    HUD only re-renders when a value in it changes, so **add any value the HUD shows to
    `HudSnapshot`** instead of passing state objects in. Don't put fast-changing values in it
    (like the mouse position) unless the HUD really displays them.
-   `actions`: `HudActions` (`hud/hud-actions.ts`), stable callbacks (select a tower, restart).
    Add an action there when a HUD button needs to do something new. Actions may write
    `state.ui` or call `sendGameCommand`, nothing else.

`GameHud` only lays out panels; each panel is its own element file (`hud-stats`,
`hud-tower-toolbar`, `hud-run-over`). The HUD host has `pointer-events: none` so canvas clicks
work; give buttons and panels you can click `pointer-events: auto`. The overlay is scaled with the
game, so **HUD CSS pixels are world pixels** (1920x1080): use large sizes, around 28-40px text.

### Input

`inputMod` is the first game mod each tick. It fills `state.ui`:

-   `ui.pointerWorld`: mouse position in world coordinates, `undefined` when off the canvas.
-   `ui.clicks`: canvas clicks since the previous tick, `{x, y, button: 'left' | 'right'}` in
    world coordinates. Right click does not open the browser menu.
-   `ui.keys`: `KeyboardEvent.key` values pressed since the previous tick (`'1'`, `'Escape'`, `'r'`).

These are replaced every tick, so any mod later in the tick can read them; nobody clears them.
Clicks on HUD buttons are DOM clicks and never show up in `ui.clicks`.

### Mods

A mod is `defineAnthaMod<FullGameState>({modName, execute({state, msSinceLastExecute}) {...}})`
from `@antha/engine`. `execute` runs every engine tick (not lockstep frames, so it is UI-side).
Returning an element-vir `html` template renders it as an overlay. Add new mods to the `mods` list
in `load-game.ts`.

### Tests

Unit-test pure logic with `describe`/`it` from `@augment-vir/test` and `assert` from
`@augment-vir/assert` in a `*.test.ts` next to the file (see `src/level/level.test.ts`). Put game
rules in pure functions (input data -> output data) so they are easy to test. Entities can be
tested with `EntityStore2d` + `createMockPixi()` (see the engine repo for examples), but prefer
testing the pure functions they call.

## Code style

-   Match the surrounding code. Prettier + ESLint enforce most style; run `npm run lint` then
    `npm run format`.
-   No non-null assertions (`!`). Use `assertWrap.isDefined(value)` from `@augment-vir/assert`.
-   No unused variables or parameters.
-   Imports use `.js` extensions on relative paths.
-   Every tunable number goes in `src/config/game-config.ts`, not inline.
-   Short doc comments on exported things, explaining why or how to use, not restating the name.
-   Keep it simple: this is a jam game. No speculative abstractions.

## Workflow for implementation agents

1. You work in your own git worktree on a branch named `issue-<number>-<short-slug>`.
2. Run `npm ci` first.
3. Implement exactly what the issue says. If the issue is ambiguous or seems wrong, stop and
   report back instead of inventing a design.
4. Run `npm run test:all`. Check visual changes with `scripts/screenshot.js` and look at the image.
5. Commit, push the branch, and open a PR with `gh pr create` whose body starts with
   `Closes #<number>`, lists what changed, and describes how you verified it.
