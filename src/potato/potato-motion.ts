import {cozyStyle, squash, wobble} from '../art/cozy.js';
import {potatoMotionConfig} from '../config/potato-motion-config.js';

/** Render-only transform for a riding potato. */
export type PotatoMotion = {
    /** Radians. */
    rotation: number;
    scaleX: number;
    scaleY: number;
    /** Pixels the drawing is lifted (negative) or dropped. */
    offsetY: number;
};

/**
 * The gentle wobble, bob and hit squash of a potato. Pure: derived from the run clock and the
 * potato's id (the seed, so each potato moves out of step), so it never affects the simulation.
 * `lastHitAtMs` is -1 when never hit.
 */
export function getPotatoMotion({
    elapsedMs,
    potatoId,
    radius,
    lastHitAtMs,
}: Readonly<{
    elapsedMs: number;
    potatoId: number;
    radius: number;
    lastHitAtMs: number;
}>): PotatoMotion {
    const phase = elapsedMs / potatoMotionConfig.bobPeriodMs + potatoId * 0.37;
    const bob = squash(phase);
    const wrapped = phase - Math.floor(phase);
    // Highest at rest, lowest when squashed.
    const lift = -Math.cos(wrapped * Math.PI * 2) * 0.5 - 0.5;
    let scaleX = bob.scaleX;
    let scaleY = bob.scaleY;

    const hitAge = elapsedMs - lastHitAtMs;
    if (lastHitAtMs >= 0 && hitAge >= 0 && hitAge < potatoMotionConfig.hitSquashMs) {
        const hit =
            1 -
            potatoMotionConfig.hitSquash *
                Math.sin((hitAge / potatoMotionConfig.hitSquashMs) * Math.PI);
        scaleY *= hit;
        scaleX /= hit;
    }

    return {
        rotation: wobble(elapsedMs, potatoId),
        scaleX,
        scaleY,
        offsetY: lift * radius * cozyStyle.hop,
    };
}
