import {
    economyConfig,
    orderConfig,
    satisfactionConfig,
    seagullConfig,
    servingConfig,
} from '../config/game-config.js';
import {progressionConfig} from '../config/progression-config.js';
import {qualityConfig} from '../config/quality-config.js';
import {getLevel} from '../level/levels.js';
import {dishDefinitions} from '../order/dish.js';
import {type PotatoToppings} from '../order/topping.js';
import {matchDish} from '../order/toppings.js';
import {getMashProgress} from '../potato/mash.js';
import {applyPrestigeEvent} from '../progression/progression.js';
import {addCoins, getPerfectReason} from './coins.js';
import {type PotatoProcessing, type RunState, RunStatus, ServingResult} from './run-state.js';

/** Where serving and order coin popups appear: the restaurant of the run's level. */
function getRestaurantSpot(runState: Readonly<RunState>) {
    const {restaurant} = getLevel(runState.levelId);

    return {
        x: restaurant.x,
        y: restaurant.y,
    };
}

/** Which result a potato earns: fully mashed is Perfect, untouched is Raw, anything else Incomplete. */
export function evaluatePotato(processing: Readonly<PotatoProcessing>): ServingResult {
    if (processing.mashHp <= 0) {
        return ServingResult.Perfect;
    } else if (!processing.cut && !processing.cooked && processing.mashHp >= processing.maxMashHp) {
        return ServingResult.Raw;
    } else {
        return ServingResult.Incomplete;
    }
}

/**
 * How much satisfaction one serving changes. Incomplete scales with mash progress: barely touched
 * costs nearly a raw penalty, almost mashed costs the small incomplete penalty.
 */
export function getSatisfactionDelta(
    result: ServingResult,
    processing: Readonly<PotatoProcessing>,
): number {
    if (result === ServingResult.Incomplete) {
        return Math.min(
            servingConfig.incomplete.satisfaction,
            Math.round(servingConfig.raw.satisfaction * (1 - getMashProgress(processing))),
        );
    }
    return servingConfig[result].satisfaction;
}

/** Fills the oldest open order matching the potato's toppings, if any, with the bonus rewards. */
function fillOrder(
    runState: RunState,
    serving: Readonly<{
        ownerSlot: number;
        value: number;
        toppings: PotatoToppings;
        quality: number;
    }>,
) {
    if (serving.quality < qualityConfig.minOrderQuality) {
        return;
    }
    const dish = matchDish(serving.toppings);
    const index = runState.orders.findIndex((order) => order.dish === dish);
    const order = runState.orders[index];
    if (!dish || !order) {
        return;
    }

    runState.orders.splice(index, 1);
    const score = Math.round(orderConfig.fulfilled.score * serving.value);
    const coins = Math.round(orderConfig.fulfilled.coins * serving.value);
    runState.scoreBySlot[serving.ownerSlot] =
        (runState.scoreBySlot[serving.ownerSlot] ?? 0) + score;
    addCoins(runState, {
        amount: coins,
        reason: `Order: ${dishDefinitions[dish].label}`,
        ...getRestaurantSpot(runState),
    });
    const newSatisfaction = Math.min(
        satisfactionConfig.max,
        Math.max(0, runState.satisfaction + orderConfig.fulfilled.satisfaction),
    );
    const prestigeDelta = applyPrestigeEvent(runState, {
        kind: 'order-filled',
    });
    runState.lastOrderEvent = {
        kind: 'fulfilled',
        prestigeDelta,
        dish,
        atMs: runState.elapsedMs,
        scoreDelta: score,
        satisfactionDelta: newSatisfaction - runState.satisfaction,
    };
    runState.satisfaction = newSatisfaction;
}

/**
 * True once every wave has spawned and nothing is left in play: no queued clump potatoes, and every
 * spawned potato (on the belt, falling from a chute, or the boss) was served or stolen. Extra
 * spawns make the total unpredictable, so this counts what actually spawned.
 */
export function isRunCleared(runState: Readonly<RunState>): boolean {
    return (
        runState.wavePhase === 'done' &&
        runState.potatoesPending === 0 &&
        runState.potatoesServed + runState.potatoesStolen >= runState.potatoesSpawned
    );
}

/**
 * Pays the wave-end bonus for every wave whose potatoes are all served or stolen. A wave counts as
 * finished spawning once the wave counter moves past it; the potato total at that moment is
 * remembered so later waves' potatoes do not delay the bonus. Call each frame and after each
 * resolution.
 */
export function payWaveBonuses(runState: RunState): void {
    const finished = runState.wavePhase === 'done' ? runState.waveIndex + 1 : runState.waveIndex;
    while (runState.waveSpawnTotals.length < finished && runState.potatoesPending === 0) {
        runState.waveSpawnTotals.push(runState.potatoesSpawned);
    }
    const resolved = runState.potatoesServed + runState.potatoesStolen;
    while (
        runState.wavesPaid < runState.waveSpawnTotals.length &&
        resolved >= (runState.waveSpawnTotals[runState.wavesPaid] ?? Infinity)
    ) {
        const bonuses = progressionConfig.waveEndBonusCoins;
        addCoins(runState, {
            amount: bonuses[Math.min(runState.wavesPaid, bonuses.length - 1)] ?? 0,
            reason: `Wave ${runState.wavesPaid + 1} cleared!`,
            ...getRestaurantSpot(runState),
        });
        runState.wavesPaid++;
    }
}

/** Ends the run if satisfaction ran out (lost) or every potato is dealt with (won). */
function checkRunEnd(runState: RunState): RunStatus {
    if (runState.satisfaction <= 0) {
        runState.status = RunStatus.Lost;
    } else if (isRunCleared(runState)) {
        runState.status = RunStatus.Won;
    }

    return runState.status;
}

/**
 * A seagull escaped with a potato: counts it, applies the (clamped) satisfaction penalty, records
 * `lastSteal` and runs the lose and win checks. Call exactly once per stolen potato.
 */
export function stealPotato(runState: RunState): void {
    if (runState.status !== RunStatus.Playing) {
        return;
    }
    runState.potatoesStolen += 1;
    const newSatisfaction = Math.min(
        satisfactionConfig.max,
        Math.max(0, runState.satisfaction + seagullConfig.stolenSatisfaction),
    );
    runState.lastSteal = {
        prestigeDelta: applyPrestigeEvent(runState, {
            kind: 'stolen',
        }),
        atMs: runState.elapsedMs,
        satisfactionDelta: newSatisfaction - runState.satisfaction,
    };
    runState.satisfaction = newSatisfaction;
    payWaveBonuses(runState);
    checkRunEnd(runState);
}

/**
 * Serves one potato at the restaurant: updates `runState` in place with the result's score,
 * satisfaction, counts and `lastServing`, and ends the run when it is won or lost. Simulation code
 * (the potato entity) calls this exactly once per potato, the instant it reaches the restaurant.
 */
export function servePotato(
    runState: RunState,
    serving: Readonly<{
        processing: Readonly<PotatoProcessing>;
        /** The `ownerSlot` of the path the potato walked. Points are credited to this slot. */
        ownerSlot: number;
        /** The potato size's `value`. Multiplies the score and coins of a perfect serving only. */
        value: number;
        /** Hand-applied toppings. A perfect potato matching an open order fills it. */
        toppings: PotatoToppings;
        /** The potato's quality, 0 to 100. Scales a perfect serving's score and coins. */
        quality: number;
        /** Multiplies the satisfaction lost on a bad serving (bosses). Defaults to 1. */
        penaltyMultiplier?: number;
    }>,
): ServingResult {
    const result = evaluatePotato(serving.processing);
    if (runState.status !== RunStatus.Playing) {
        return result;
    }

    const isPerfect = result === ServingResult.Perfect;
    const qualityFactor = serving.quality / 100;
    const score = isPerfect
        ? Math.round(servingConfig.perfect.score * serving.value * qualityFactor)
        : servingConfig[result].score;
    const coins = isPerfect
        ? Math.round(economyConfig.servingCoins.perfect * serving.value * qualityFactor)
        : economyConfig.servingCoins[result];
    const prestigeDelta = applyPrestigeEvent(
        runState,
        isPerfect
            ? {
                  kind: 'perfect',
                  quality: serving.quality,
              }
            : {
                  kind: result === ServingResult.Raw ? 'raw' : 'incomplete',
              },
    );
    const satisfactionDelta = isPerfect
        ? getSatisfactionDelta(result, serving.processing)
        : getSatisfactionDelta(result, serving.processing) * (serving.penaltyMultiplier ?? 1);
    runState.potatoesServed += 1;
    runState.servingCounts[result] += 1;
    runState.scoreBySlot[serving.ownerSlot] =
        (runState.scoreBySlot[serving.ownerSlot] ?? 0) + score;
    if (isPerfect) {
        runState.perfectBySlot[serving.ownerSlot] =
            (runState.perfectBySlot[serving.ownerSlot] ?? 0) + 1;
    }
    addCoins(runState, {
        amount: coins,
        reason: isPerfect ? getPerfectReason(serving) : 'Eaten anyway',
        ...getRestaurantSpot(runState),
    });
    const newSatisfaction = Math.min(
        satisfactionConfig.max,
        Math.max(0, runState.satisfaction + satisfactionDelta),
    );
    const appliedSatisfactionDelta = newSatisfaction - runState.satisfaction;
    runState.satisfaction = newSatisfaction;
    runState.lastServing = {
        result,
        servedAtMs: runState.elapsedMs,
        scoreDelta: score,
        satisfactionDelta: appliedSatisfactionDelta,
        progress: getMashProgress(serving.processing),
        prestigeDelta,
    };

    payWaveBonuses(runState);
    const status = checkRunEnd(runState);

    if (isPerfect && status === RunStatus.Playing) {
        fillOrder(runState, serving);
    }

    return result;
}
