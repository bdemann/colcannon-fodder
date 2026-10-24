import {speedConfig} from '../config/game-config.js';

/**
 * How many fixed-size simulation steps to run this frame, and the accumulator left over.
 * Fast-forward runs extra steps instead of scaling time, so the simulation stays deterministic.
 */
export function stepsForFrame({
    accumulator,
    speed,
}: Readonly<{accumulator: number; speed: number}>): {steps: number; accumulator: number} {
    const total = accumulator + speed;
    const steps = Math.floor(total);
    return {
        steps,
        accumulator: total - steps,
    };
}

/** Whether a speed is one the player may pick. */
export function isAllowedSpeed(speed: number): boolean {
    return (speedConfig.speeds as readonly number[]).includes(speed);
}

/** The speed after `speed` when cycling 1x, 1.5x, 2x, 3x, back to 1x. */
export function getNextSpeed(speed: number): number {
    const index = (speedConfig.speeds as readonly number[]).indexOf(speed);
    return speedConfig.speeds[(index + 1) % speedConfig.speeds.length] ?? speedConfig.speeds[0];
}

/** Label such as "1.5x". */
export function formatSpeed(speed: number): string {
    return `${speed}x`;
}
