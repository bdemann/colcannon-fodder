import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {addCoins} from './coins.js';
import {createInitialRunState} from './run-state.js';
import {getNextSpeed, isAllowedSpeed, stepsForFrame} from './speed.js';

describe(stepsForFrame.name, () => {
    it('runs one step per frame at 1x', () => {
        assert.deepEquals(
            stepsForFrame({
                accumulator: 0,
                speed: 1,
            }),
            {
                steps: 1,
                accumulator: 0,
            },
        );
    });
    it('alternates 1 and 2 steps at 1.5x', () => {
        const first = stepsForFrame({
            accumulator: 0,
            speed: 1.5,
        });
        const second = stepsForFrame({
            accumulator: first.accumulator,
            speed: 1.5,
        });
        assert.deepEquals(
            [
                first.steps,
                second.steps,
            ],
            [
                1,
                2,
            ],
        );
        assert.strictEquals(second.accumulator, 0);
    });
    it('runs three steps at 3x', () => {
        assert.strictEquals(
            stepsForFrame({
                accumulator: 0,
                speed: 3,
            }).steps,
            3,
        );
    });
});

describe(getNextSpeed.name, () => {
    it('cycles and wraps', () => {
        assert.strictEquals(getNextSpeed(1), 1.5);
        assert.strictEquals(getNextSpeed(3), 1);
    });
    it('only allows listed speeds', () => {
        assert.isTrue(isAllowedSpeed(2));
        assert.isFalse(isAllowedSpeed(4));
    });
});

describe('speed reset on income', () => {
    const event = {
        reason: 'test',
        x: 0,
        y: 0,
    };
    it('resets speed when armed and coins come in', () => {
        const runState = createInitialRunState();
        runState.speed = 3;
        runState.resetSpeedOnIncome = true;
        addCoins(runState, {
            ...event,
            amount: 5,
        });
        assert.strictEquals(runState.speed, 1);
        assert.isFalse(runState.resetSpeedOnIncome);
    });
    it('keeps the speed when not armed or when no pay', () => {
        const runState = createInitialRunState();
        runState.speed = 3;
        addCoins(runState, {
            ...event,
            amount: 5,
        });
        assert.strictEquals(runState.speed, 3);
        runState.resetSpeedOnIncome = true;
        addCoins(runState, {
            ...event,
            amount: 0,
        });
        assert.strictEquals(runState.speed, 3);
        assert.isTrue(runState.resetSpeedOnIncome);
    });
});
