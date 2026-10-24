import {defineAnthaMod} from '@antha/engine';
import {Graphics} from '@antha/graphics-2d';
import {projectileConfig} from '../config/game-config.js';
import {type FullGameState} from '../game-state/game-state.js';
import {drawProjectile, drawPuff} from './projectile-art.js';
import {ProjectileKind} from './projectile-kind.js';

export type Point = {x: number; y: number};

export type Projectile = {
    kind: ProjectileKind;
    from: Point;
    to: Point;
    /** `runState.elapsedMs` when thrown. */
    startMs: number;
};

/** Where a projectile is at `elapsedMs`. */
export type ProjectilePose =
    | {phase: 'waiting'}
    | {
          phase: 'flight';
          /** 0 to 1 through the flight. */
          progress: number;
          x: number;
          y: number;
      }
    | {
          phase: 'puff';
          /** 0 to 1 through the puff. */
          progress: number;
          x: number;
          y: number;
      }
    | {phase: 'done'};

/** How long a projectile of this kind flies. */
export function getFlightMs(kind: ProjectileKind): number {
    return kind === ProjectileKind.Cricket
        ? projectileConfig.cricketFlightMs
        : projectileConfig.flightMs;
}

/** The arc is a parabola on top of the straight line from `from` to `to`. */
export function getProjectilePose({
    projectile,
    elapsedMs,
}: Readonly<{projectile: Readonly<Projectile>; elapsedMs: number}>): ProjectilePose {
    const {from, to, kind, startMs} = projectile;
    const ageMs = elapsedMs - startMs;
    // Negative age means the run restarted and the clock went back.
    if (ageMs < 0) {
        return {
            phase: 'waiting',
        };
    }
    const flightMs = getFlightMs(kind);
    if (ageMs < flightMs) {
        const progress = ageMs / flightMs;
        const distance = Math.hypot(to.x - from.x, to.y - from.y);
        const arcHeight =
            kind === ProjectileKind.Cricket
                ? projectileConfig.cricketArcPx
                : Math.min(
                      projectileConfig.arcMaxPx,
                      Math.max(projectileConfig.arcMinPx, distance * projectileConfig.arcFraction),
                  );
        return {
            phase: 'flight',
            progress,
            x: from.x + (to.x - from.x) * progress,
            y: from.y + (to.y - from.y) * progress - arcHeight * 4 * progress * (1 - progress),
        };
    } else if (kind !== ProjectileKind.Cricket && ageMs < flightMs + projectileConfig.puffMs) {
        return {
            phase: 'puff',
            progress: (ageMs - flightMs) / projectileConfig.puffMs,
            x: to.x,
            y: to.y,
        };
    } else {
        return {
            phase: 'done',
        };
    }
}

const liveProjectiles: Projectile[] = [];

/** Throws something from a tower to a target. Render-only: call it from `render`, never `update`. */
export function spawnProjectile(
    projectile: Readonly<{
        kind: ProjectileKind;
        from: Point;
        to: Point;
        startMs: number;
    }>,
) {
    liveProjectiles.push({
        kind: projectile.kind,
        from: {
            ...projectile.from,
        },
        to: {
            ...projectile.to,
        },
        startMs: projectile.startMs,
    });
    while (liveProjectiles.length > projectileConfig.maxLive) {
        liveProjectiles.shift();
    }
}

/** Test and restart helper. */
export function clearProjectiles() {
    liveProjectiles.length = 0;
}

/** How many are alive right now (for tests). */
export function countProjectiles(): number {
    return liveProjectiles.length;
}

/** The one Pixi graphics all projectiles are drawn on, owned by this module. */
let layer: Graphics | undefined;
/** True when the layer was last cleared with nothing drawn, so an idle frame can skip the clear. */
let layerIsEmpty = false;

/**
 * Draws every live projectile from `runState.elapsedMs` each tick, so they freeze while paused and
 * speed up with fast-forward. Sits above the towers and potatoes.
 */
export const projectileLayerMod = defineAnthaMod<FullGameState>({
    modName: 'projectile-layer',
    execute({state}) {
        const stage = state.pixi?.pixiApplication?.stage;
        if (!stage || !state.runState) {
            return;
        }
        if (!layer || layer.destroyed) {
            layer = new Graphics();
            layer.zIndex = 900;
            stage.sortableChildren = true;
            stage.addChild(layer);
        }

        const {elapsedMs} = state.runState;
        if (liveProjectiles.length === 0 && layerIsEmpty) {
            return;
        }
        layer.clear();
        layerIsEmpty = liveProjectiles.length === 0;
        for (let index = liveProjectiles.length - 1; index >= 0; index--) {
            const projectile = liveProjectiles[index];
            if (!projectile) {
                continue;
            }
            const pose = getProjectilePose({
                projectile,
                elapsedMs,
            });
            if (pose.phase === 'done' || pose.phase === 'waiting') {
                liveProjectiles.splice(index, 1);
            } else if (pose.phase === 'flight') {
                drawProjectile(layer, {
                    kind: projectile.kind,
                    x: pose.x,
                    y: pose.y,
                    progress: pose.progress,
                    directionX: projectile.to.x - projectile.from.x,
                    timeSec: elapsedMs / 1000,
                });
            } else {
                drawPuff(layer, {
                    kind: projectile.kind,
                    x: pose.x,
                    y: pose.y,
                    progress: pose.progress,
                });
            }
        }
    },
});
