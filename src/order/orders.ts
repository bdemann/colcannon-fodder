import {assertWrap} from '@augment-vir/assert';
import {orderConfig, satisfactionConfig} from '../config/game-config.js';
import {type RunState, RunStatus} from '../run/run-state.js';
import {Dish} from './dish.js';

/**
 * Advances orders by `msElapsed` and mutates `runState`. `roll` returns numbers in [0, 1) (the
 * caller passes `() => state.seededRandom.next()`). Returns nothing; read runState after.
 */
export function advanceOrders(runState: RunState, msElapsed: number, roll: () => number): void {
    if (runState.status !== RunStatus.Playing) {
        return;
    }

    const expired = runState.orders.filter((order) => order.expiresAtMs <= runState.elapsedMs);
    runState.orders = runState.orders.filter((order) => order.expiresAtMs > runState.elapsedMs);
    for (const order of expired) {
        const newSatisfaction = Math.min(
            satisfactionConfig.max,
            Math.max(0, runState.satisfaction + orderConfig.expiredSatisfaction),
        );
        runState.lastOrderEvent = {
            kind: 'expired',
            dish: order.dish,
            atMs: runState.elapsedMs,
            scoreDelta: 0,
            satisfactionDelta: newSatisfaction - runState.satisfaction,
        };
        runState.satisfaction = newSatisfaction;
        if (runState.satisfaction <= 0) {
            runState.status = RunStatus.Lost;
        }
    }

    if (runState.wavePhase !== 'spawning') {
        return;
    }

    const settings = assertWrap.isDefined(
        orderConfig.byWave[runState.waveIndex] ?? orderConfig.byWave[orderConfig.byWave.length - 1],
    );
    runState.msUntilNextOrder -= msElapsed;
    while (runState.msUntilNextOrder <= 0) {
        if (runState.orders.length < settings.maxOpen) {
            const dishValue = assertWrap.isDefined(
                settings.dishes[Math.floor(roll() * settings.dishes.length)],
            );
            const dish = assertWrap.isDefined(Object.values(Dish).find((x) => x === dishValue));
            runState.orders.push({
                orderId: runState.nextOrderId++,
                dish,
                createdAtMs: runState.elapsedMs,
                expiresAtMs: runState.elapsedMs + settings.lifetimeMs,
            });
        }
        runState.msUntilNextOrder += settings.intervalMs;
    }
}
