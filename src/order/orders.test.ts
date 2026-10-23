import {assert, assertWrap} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {orderConfig} from '../config/game-config.js';
import {createInitialRunState, RunStatus} from '../run/run-state.js';
import {Dish} from './dish.js';
import {advanceOrders} from './orders.js';

const wave0 = orderConfig.byWave[0];
const lastWave = orderConfig.byWave[orderConfig.byWave.length - 1];

function spawningState() {
    const runState = createInitialRunState();
    runState.wavePhase = 'spawning';
    return runState;
}

describe(advanceOrders.name, () => {
    it('places no orders during a break', () => {
        const runState = createInitialRunState();
        advanceOrders(runState, 100_000, () => 0);
        assert.deepEquals(runState.orders, []);
    });

    it('places the first order after the delay', () => {
        const runState = spawningState();
        advanceOrders(runState, orderConfig.firstOrderDelayMs - 1, () => 0);
        assert.deepEquals(runState.orders, []);
        runState.elapsedMs += orderConfig.firstOrderDelayMs - 1;
        advanceOrders(runState, 1, () => 0);
        assert.isLengthExactly(runState.orders, 1);
        assert.deepEquals(runState.orders[0], {
            orderId: 1,
            dish: Dish.ButteredMash,
            createdAtMs: runState.elapsedMs,
            expiresAtMs: runState.elapsedMs + wave0.lifetimeMs,
        });
        assert.strictEquals(runState.nextOrderId, 2);
    });

    it('respects the maxOpen cap', () => {
        const runState = spawningState();
        for (let i = 0; i < 20; i++) {
            advanceOrders(runState, wave0.intervalMs, () => 0);
        }
        assert.strictEquals(runState.orders.length, wave0.maxOpen);
    });

    it('picks the dish from the wave list by roll', () => {
        const runState = spawningState();
        runState.msUntilNextOrder = 0;
        advanceOrders(runState, 0, () => 0.99);
        assert.strictEquals(runState.orders[0]?.dish, Dish.BangersAndMash);
    });

    it('uses the last entry past the end of the wave list', () => {
        const runState = spawningState();
        runState.waveIndex = 99;
        runState.msUntilNextOrder = 0;
        advanceOrders(runState, 0, () => 0.99);
        assert.strictEquals(runState.orders[0]?.dish, Dish.Colcannon);
        assert.strictEquals(runState.msUntilNextOrder, assertWrap.isDefined(lastWave).intervalMs);
    });

    it('expires orders and costs satisfaction', () => {
        const runState = spawningState();
        runState.msUntilNextOrder = 99_999;
        runState.satisfaction = 50;
        runState.elapsedMs = 1000;
        runState.orders.push({
            orderId: 1,
            dish: Dish.Champ,
            createdAtMs: 0,
            expiresAtMs: 1000,
        });
        advanceOrders(runState, 16, () => 0);
        assert.deepEquals(runState.orders, []);
        assert.strictEquals(runState.satisfaction, 50 + orderConfig.expiredSatisfaction);
        assert.deepEquals(runState.lastOrderEvent, {
            kind: 'expired',
            dish: Dish.Champ,
            atMs: 1000,
            scoreDelta: 0,
            satisfactionDelta: orderConfig.expiredSatisfaction,
        });
        assert.strictEquals(runState.status, RunStatus.Playing);
    });

    it('clamps the satisfaction change and loses the run at 0', () => {
        const runState = spawningState();
        runState.msUntilNextOrder = 99_999;
        runState.satisfaction = 5;
        runState.orders.push({
            orderId: 1,
            dish: Dish.Champ,
            createdAtMs: 0,
            expiresAtMs: 0,
        });
        advanceOrders(runState, 16, () => 0);
        assert.strictEquals(runState.satisfaction, 0);
        assert.strictEquals(runState.lastOrderEvent?.satisfactionDelta, -5);
        assert.strictEquals(runState.status, RunStatus.Lost);
    });

    it('does nothing when not playing', () => {
        const runState = spawningState();
        runState.status = RunStatus.Lost;
        runState.msUntilNextOrder = 0;
        advanceOrders(runState, 100, () => 0);
        assert.deepEquals(runState.orders, []);
    });
});
