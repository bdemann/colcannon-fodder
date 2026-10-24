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
    /** Pivot that squashes and wobbles about the potato's base, with the lift applied. */
    pivotX: number;
    pivotY: number;
};

/** Whether a potato's eyes are shut right now. Each blinks on its own beat. */
export function isBlinking({elapsedMs, potatoId}: Readonly<{elapsedMs: number; potatoId: number}>) {
    const offset = (potatoId * 977) % potatoMotionConfig.blinkPeriodMs;
    return (elapsedMs + offset) % potatoMotionConfig.blinkPeriodMs < potatoMotionConfig.blinkMs;
}

/** Where a steam puff is in its rise (0 to 1) for the overlay. */
export function getSteamPhase({
    elapsedMs,
    potatoId,
}: Readonly<{elapsedMs: number; potatoId: number}>) {
    const cycles = elapsedMs / potatoMotionConfig.steamPeriodMs + potatoId * 0.29;
    return cycles - Math.floor(cycles);
}

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

    const rotation = wobble(elapsedMs, potatoId);
    const offsetY = lift * radius * cozyStyle.hop;
    // Pixi draws at position + R * S * (local - pivot). Choose the pivot so the base (0, radius)
    // stays put under the rotation and scale, which makes the squash sit on the belt.
    const pivotX = -(radius * Math.sin(rotation)) / scaleX;
    const pivotY = radius - (radius * Math.cos(rotation)) / scaleY;

    return {
        rotation,
        scaleX,
        scaleY,
        offsetY,
        pivotX,
        pivotY: pivotY - offsetY,
    };
}
