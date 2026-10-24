import {Graphics} from '@antha/graphics-2d';
import {type Container} from 'pixi.js';
import {potatoMotionConfig} from '../config/potato-motion-config.js';
import {type PotatoToppings} from '../order/topping.js';
import {type PotatoProcessing} from '../run/run-state.js';
import {drawPotato} from './potato-view.js';

/** Draws over everything in the world. */
const ghostZIndex = 1000;

/** Hop progress (0 to 1) to the ghost's offset and look. Pure. */
export function getServeHop({progress, radius}: Readonly<{progress: number; radius: number}>) {
    const clamped = Math.min(1, Math.max(0, progress));
    return {
        /** Negative is up. */
        lift: -Math.sin(clamped * Math.PI) * radius * potatoMotionConfig.serveHopHeight,
        scale: 1 - 0.4 * clamped,
        alpha: clamped < 0.6 ? 1 : 1 - (clamped - 0.6) / 0.4,
    };
}

/**
 * Presentation only: a drawn copy of a served potato that hops into the restaurant and fades. It is
 * not an entity, so the simulation (and co-op) never sees it; it runs on animation frames and
 * removes itself, even if the world is torn down meanwhile.
 */
export function spawnServeGhost({
    parent,
    from,
    radius,
    processing,
    toppings,
    quality,
    seed,
}: Readonly<{
    parent: Container;
    from: Readonly<{x: number; y: number}>;
    radius: number;
    processing: Readonly<PotatoProcessing>;
    toppings: Readonly<PotatoToppings>;
    quality: number;
    seed: number;
}>) {
    if (typeof requestAnimationFrame !== 'function') {
        return;
    }
    const ghost = drawPotato({
        graphics: new Graphics(),
        processing,
        radius,
        toppings,
        quality,
        seed,
    });
    // Above the restaurant, which the belt ends at.
    ghost.zIndex = ghostZIndex;
    parent.addChild(ghost);
    const start = performance.now();

    function step(now: number) {
        const progress = (now - start) / potatoMotionConfig.serveHopMs;
        if (progress >= 1 || ghost.destroyed || !ghost.parent) {
            if (!ghost.destroyed) {
                ghost.destroy();
            }
            return;
        }
        const hop = getServeHop({
            progress,
            radius,
        });
        ghost.position.set(from.x, from.y + hop.lift);
        ghost.scale.set(hop.scale);
        ghost.alpha = hop.alpha;
        requestAnimationFrame(step);
    }
    ghost.position.set(from.x, from.y);
    requestAnimationFrame(step);
}
