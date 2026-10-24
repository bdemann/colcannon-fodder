import {doorConfig} from '../config/door-config.js';
import {
    economyConfig,
    orderConfig,
    satisfactionConfig,
    seagullConfig,
    servingConfig,
} from '../config/game-config.js';
import {qualityConfig} from '../config/quality-config.js';
import {defaultLevel} from '../level/level.js';
import {dishDefinitions} from '../order/dish.js';
import {type PotatoToppings} from '../order/topping.js';
import {matchDish} from '../order/toppings.js';
import {getMashProgress} from '../potato/mash.js';
import {pushRecentQuality} from '../quality/quality.js';
import {addCoins, getPerfectReason} from './coins.js';
import {type PotatoProcessing, type RunState, RunStatus, ServingResult} from './run-state.js';

/** Where serving and order coin popups appear. */
const restaurantSpot = {
    x: defaultLevel.restaurant.x,
    y: defaultLevel.restaurant.y,
};

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
        ...restaurantSpot,
    });
    const newSatisfaction = Math.min(
        satisfactionConfig.max,
        Math.max(0, runState.satisfaction + orderConfig.fulfilled.satisfaction),
    );
    runState.lastOrderEvent = {
        kind: 'fulfilled',
        dish,
        atMs: runState.elapsedMs,
        scoreDelta: score,
        satisfactionDelta: newSatisfaction - runState.satisfaction,
    };
    runState.satisfaction = newSatisfaction;
}

/** Ends the run if satisfaction ran out (lost) or every potato is dealt with (won). */
function checkRunEnd(runState: RunState): RunStatus {
    if (runState.satisfaction <= 0) {
        runState.status = RunStatus.Lost;
    } else if (runState.potatoesServed + runState.potatoesStolen >= runState.potatoesPerRun) {
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
        atMs: runState.elapsedMs,
        satisfactionDelta: newSatisfaction - runState.satisfaction,
    };
    runState.satisfaction = newSatisfaction;
    checkRunEnd(runState);
}

/**
 * Serves one potato at the restaurant: updates `runState` in place with the result's score,
 * satisfaction, counts and `lastServing`, and ends the run when it is won or lost. Simulation code
 * (the potato entity) calls this exactly once per potato the waiter takes. A bad potato is sent
 * back (`sentBack`, not counted) until it has been sent back `maxSendBacks` times; the caller
 * resets it.
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
        /** How many times this potato was already sent back. */
        timesSentBack: number;
        /** The potato's quality, 0 to 100. Scales a perfect serving's score and coins. */
        quality: number;
        /** Multiplies the satisfaction lost on a bad serving (bosses). Defaults to 1. */
        penaltyMultiplier?: number;
    }>,
): {result: ServingResult; sentBack: boolean} {
    const result = evaluatePotato(serving.processing);
    if (runState.status !== RunStatus.Playing) {
        return {
            result,
            sentBack: false,
        };
    }

    const isPerfect = result === ServingResult.Perfect;
    const sentBack = !isPerfect && serving.timesSentBack < doorConfig.maxSendBacks;
    const qualityFactor = serving.quality / 100;
    const score = isPerfect
        ? Math.round(servingConfig.perfect.score * serving.value * qualityFactor)
        : servingConfig[result].score;
    const coins = isPerfect
        ? Math.round(economyConfig.servingCoins.perfect * serving.value * qualityFactor)
        : economyConfig.servingCoins[result];
    if (isPerfect) {
        pushRecentQuality(runState.recentQualities, serving.quality);
    }
    const satisfactionDelta = isPerfect
        ? getSatisfactionDelta(result, serving.processing)
        : (getSatisfactionDelta(result, serving.processing) -
              doorConfig.angerStep * runState.sendBackStreak) *
          (serving.penaltyMultiplier ?? 1);
    if (isPerfect) {
        runState.sendBackStreak = 0;
    } else {
        runState.sendBackStreak += 1;
    }
    if (!sentBack) {
        runState.potatoesServed += 1;
        runState.servingCounts[result] += 1;
        runState.scoreBySlot[serving.ownerSlot] =
            (runState.scoreBySlot[serving.ownerSlot] ?? 0) + score;
    }
    addCoins(runState, {
        amount: sentBack ? 0 : coins,
        reason: sentBack
            ? 'Sent back · no pay'
            : isPerfect
              ? getPerfectReason(serving)
              : 'Eaten anyway',
        ...restaurantSpot,
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
        scoreDelta: sentBack ? 0 : score,
        satisfactionDelta: appliedSatisfactionDelta,
        progress: getMashProgress(serving.processing),
        sentBack,
    };

    const status = checkRunEnd(runState);

    if (isPerfect && status === RunStatus.Playing) {
        fillOrder(runState, serving);
    }

    return {
        result,
        sentBack,
    };
}
