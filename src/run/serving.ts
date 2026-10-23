import {
    economyConfig,
    orderConfig,
    satisfactionConfig,
    servingConfig,
} from '../config/game-config.js';
import {type PotatoToppings} from '../order/topping.js';
import {matchDish} from '../order/toppings.js';
import {getMashProgress} from '../potato/mash.js';
import {type PotatoProcessing, type RunState, RunStatus, ServingResult} from './run-state.js';

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
    serving: Readonly<{ownerSlot: number; value: number; toppings: PotatoToppings}>,
) {
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
    runState.coins += coins;
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

/**
 * Serves one potato at the restaurant: updates `runState` in place with the result's score,
 * satisfaction, counts and `lastServing`, and ends the run when it is won or lost. Simulation code
 * (the potato entity) calls this exactly once per potato that reaches the restaurant.
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
    }>,
): ServingResult {
    const result = evaluatePotato(serving.processing);
    if (runState.status !== RunStatus.Playing) {
        return result;
    }

    const isPerfect = result === ServingResult.Perfect;
    const score = isPerfect
        ? Math.round(servingConfig.perfect.score * serving.value)
        : servingConfig[result].score;
    const coins = isPerfect
        ? Math.round(economyConfig.servingCoins.perfect * serving.value)
        : economyConfig.servingCoins[result];
    const satisfactionDelta = getSatisfactionDelta(result, serving.processing);
    runState.potatoesServed += 1;
    runState.servingCounts[result] += 1;
    runState.scoreBySlot[serving.ownerSlot] =
        (runState.scoreBySlot[serving.ownerSlot] ?? 0) + score;
    runState.coins += coins;
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
    };

    if (runState.satisfaction <= 0) {
        runState.status = RunStatus.Lost;
    } else if (runState.potatoesServed >= runState.potatoesPerRun) {
        runState.status = RunStatus.Won;
    }

    if (runState.status === RunStatus.Playing && isPerfect) {
        fillOrder(runState, serving);
    }

    return result;
}
