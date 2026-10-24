import {SeagullEntity} from '../../seagull/seagull.entity.js';
import {chooseGullTargetIndex} from '../tower-targeting.js';
import {getTowerStats} from '../tower-type.js';
import {type TowerEntity} from '../tower.entity.js';

/** A gull the trap could feed. */
export type TrapGullCandidate = Readonly<{
    x: number;
    y: number;
    carrying: boolean;
    fed: boolean;
    hp: number;
}>;

/**
 * Index into `gulls` of the gull the trap feeds, or -1 for none. Skips fed and knocked-out gulls,
 * then prefers a carrying gull, then the nearest.
 */
export function chooseTrapGullIndex(
    tower: Readonly<{x: number; y: number; rangePx: number}>,
    gulls: ReadonlyArray<TrapGullCandidate>,
): number {
    const eligible = gulls
        .map((gull, index) => {
            return {
                gull,
                index,
            };
        })
        .filter(({gull}) => !gull.fed && gull.hp > 0);
    const picked = chooseGullTargetIndex(
        tower,
        eligible.map(({gull}) => gull),
    );

    return eligible[picked]?.index ?? -1;
}

/** Cricket Trap behavior: seagulls only. Feeds one gull a cricket, then reloads. */
export function updateGullTrap(tower: TowerEntity, msSinceLastExecute: number): void {
    tower.params.cooldownRemainingMs = Math.max(
        0,
        tower.params.cooldownRemainingMs - msSinceLastExecute,
    );
    if (tower.params.cooldownRemainingMs > 0) {
        return;
    }

    const stats = getTowerStats(tower.params.towerType, tower.params.level);
    const gulls = [...tower.state.entityStore.getEntities(SeagullEntity)];
    const index = chooseTrapGullIndex(
        {
            x: tower.params.x,
            y: tower.params.y,
            rangePx: stats.rangePx,
        },
        gulls.map((gull) => {
            return {
                x: gull.params.x,
                y: gull.params.y,
                carrying: gull.params.carryingPotatoId !== 0,
                fed: gull.params.fed,
                hp: gull.params.hp,
            };
        }),
    );
    const gull = gulls[index];
    if (!gull) {
        return;
    }

    gull.feedCricket();
    tower.params.cooldownRemainingMs = stats.cooldownMs;
    tower.params.lastProcessedAtMs = tower.state.runState.elapsedMs;
    tower.params.lastTargetX = gull.params.x;
    tower.params.lastTargetY = gull.params.y;
}
