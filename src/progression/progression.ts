import {removeDuplicates} from '@augment-vir/common';
import {progressionConfig} from '../config/progression-config.js';
import {type RunState} from '../run/run-state.js';
import {TowerType} from '../tower/tower-type.js';

/** Something that moves prestige. Applied by serving, orders and seagulls. */
export type PrestigeEvent =
    | {kind: 'perfect'; quality: number}
    | {kind: 'incomplete'}
    | {kind: 'raw'}
    | {kind: 'order-filled'}
    | {kind: 'order-expired'}
    | {kind: 'stolen'};

/** Stars from prestige points: 0 to 5 in half steps, rounded down so shown stars match unlocks. */
export function getStarsFromPoints(points: number): number {
    const stars = Math.min(
        progressionConfig.maxStars,
        Math.max(0, points / progressionConfig.pointsPerStar),
    );

    return Math.floor(stars * 2 + 1e-9) / 2;
}

/** Whether a tower type can be built at this star rating. */
export function isTowerUnlocked(towerType: TowerType, stars: number): boolean {
    return stars >= progressionConfig.towerUnlockStars[towerType];
}

/** Stars needed to unlock a tower type. */
export function getTowerUnlockStars(towerType: TowerType): number {
    return progressionConfig.towerUnlockStars[towerType];
}

/**
 * Whether a built tower of this type acts. With `goDormant` (the config default) a tower whose type
 * is locked stops working; otherwise it keeps working.
 */
export function isTowerWorking(
    towerType: TowerType,
    stars: number,
    goDormant: boolean = progressionConfig.lockedBuiltTowersGoDormant,
): boolean {
    return !goDormant || isTowerUnlocked(towerType, stars);
}

/** Stars needed to upgrade a tower to `toLevel` (2 or 3). Other levels need none. */
export function getUpgradeStars(toLevel: number): number {
    const required: Record<number, number | undefined> = progressionConfig.upgradeLevelStars;

    return required[toLevel] ?? 0;
}

/** Whether a tower of this type can be upgraded to `toLevel` at this star rating. */
export function canUpgradeAtStars({
    towerType,
    toLevel,
    stars,
}: Readonly<{towerType: TowerType; toLevel: number; stars: number}>): boolean {
    return isTowerUnlocked(towerType, stars) && stars >= getUpgradeStars(toLevel);
}

/** Every star level that unlocks something, ascending. */
function getMilestones(): number[] {
    return removeDuplicates([
        ...Object.values(progressionConfig.towerUnlockStars),
        ...Object.values(progressionConfig.upgradeLevelStars),
    ])
        .filter((stars) => stars > 0)
        .sort((a, b) => a - b);
}

/**
 * Progress from the last unlock to the next one, 0 to 1 (rounded to 1/20 so the HUD re-renders
 * rarely). `undefined` once nothing is left to unlock.
 */
export function getNextUnlockProgress(points: number):
    | {
          nextStars: number;
          fraction: number;
      }
    | undefined {
    const {pointsPerStar} = progressionConfig;
    const stars = getStarsFromPoints(points);
    const milestones = getMilestones();
    const next = milestones.find((milestone) => milestone > stars);
    if (next == undefined) {
        return undefined;
    }
    const previous = milestones.findLast((milestone) => milestone <= stars) ?? 0;
    const fraction = (points - previous * pointsPerStar) / ((next - previous) * pointsPerStar);

    return {
        nextStars: next,
        fraction: Math.round(Math.min(1, Math.max(0, fraction)) * 20) / 20,
    };
}

/** The prestige change an event would cause before clamping. */
export function getPrestigeDelta(event: Readonly<PrestigeEvent>): number {
    if (event.kind === 'perfect') {
        return event.quality < progressionConfig.rubberyQuality
            ? progressionConfig.rubberyPenalty
            : (progressionConfig.perfectMax * event.quality) / 100;
    }
    const fixed: Record<Exclude<PrestigeEvent['kind'], 'perfect'>, number> = {
        incomplete: progressionConfig.incompletePenalty,
        raw: progressionConfig.rawPenalty,
        'order-filled': progressionConfig.orderFilled,
        'order-expired': progressionConfig.orderExpired,
        stolen: progressionConfig.potatoStolen,
    };

    return fixed[event.kind];
}

/**
 * Applies a prestige event: moves `prestigePoints` (clamped to 0 to 100) and, when towers unlock or
 * lock because of it, records `prestigeNotice` for the HUD banner. Returns the change that was
 * actually applied.
 */
export function applyPrestigeEvent(
    runState: Pick<RunState, 'prestigePoints' | 'prestigeNotice' | 'elapsedMs'>,
    event: Readonly<PrestigeEvent>,
): number {
    const before = runState.prestigePoints;
    const after =
        Math.round(
            Math.min(progressionConfig.maxPoints, Math.max(0, before + getPrestigeDelta(event))) *
                1000,
        ) / 1000;
    runState.prestigePoints = after;

    const starsBefore = getStarsFromPoints(before);
    const starsAfter = getStarsFromPoints(after);
    const unlocked = Object.values(TowerType).filter((towerType) => {
        return !isTowerUnlocked(towerType, starsBefore) && isTowerUnlocked(towerType, starsAfter);
    });
    const locked = Object.values(TowerType).filter((towerType) => {
        return isTowerUnlocked(towerType, starsBefore) && !isTowerUnlocked(towerType, starsAfter);
    });
    const changed = unlocked.length ? unlocked : locked;
    if (changed.length) {
        runState.prestigeNotice = {
            id: (runState.prestigeNotice?.id ?? 0) + 1,
            atMs: runState.elapsedMs,
            kind: unlocked.length ? 'unlocked' : 'locked',
            towerTypes: changed,
        };
    }

    return Math.round((after - before) * 1000) / 1000;
}
