import {assertWrap} from '@augment-vir/assert';
import {orderConfig, satisfactionConfig, waveConfig} from '../config/game-config.js';
import {applyPrestigeEvent} from '../progression/progression.js';
import {getWaveSettings} from '../run/endless.js';
import {type RunState, RunStatus} from '../run/run-state.js';
import {Dish} from './dish.js';

/**
 * Order lifetime: the configured time, but never less than a scaled belt trip down the longest
 * path.
 */
export function getOrderLifetimeMs({
    configuredMs,
    pathLengthPx,
    beltSpeedPxPerMs,
}: {
    configuredMs: number;
    pathLengthPx: number;
    beltSpeedPxPerMs: number;
}): number {
    const travelMs = beltSpeedPxPerMs > 0 ? pathLengthPx / beltSpeedPxPerMs : 0;
    return Math.max(configuredMs, travelMs * orderConfig.travelTimeMultiplier);
}

/**
 * Advances orders by `msElapsed` and mutates `runState`. `roll` returns numbers in [0, 1) (the
 * caller passes `() => state.seededRandom.next()`). `longestPathLengthPx` scales order lifetime.
 * Returns nothing; read runState after.
 */
export function advanceOrders({
    runState,
    msElapsed,
    roll,
    longestPathLengthPx,
}: Readonly<{
    runState: RunState;
    msElapsed: number;
    roll: () => number;
    longestPathLengthPx: number;
}>): void {
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
            prestigeDelta: applyPrestigeEvent(runState, {
                kind: 'order-expired',
            }),
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

    // Past the campaign's last wave, keep using the last wave's orders.
    const settings = assertWrap.isDefined(
        getWaveSettings(runState, runState.waveIndex) ??
            getWaveSettings(runState, waveConfig.waves.length - 1),
    ).orders;
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
                expiresAtMs:
                    runState.elapsedMs +
                    getOrderLifetimeMs({
                        configuredMs: settings.lifetimeMs,
                        pathLengthPx: longestPathLengthPx,
                        beltSpeedPxPerMs: runState.beltSpeedPxPerMs,
                    }),
            });
        }
        runState.msUntilNextOrder += settings.intervalMs;
    }
}
