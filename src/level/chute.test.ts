import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {getDropScale, pickChute, tickDropMs} from './chute.js';

const chutes = [
    {
        distancePx: 100,
    },
    {
        distancePx: 200,
    },
];

describe(pickChute.name, () => {
    it('uses the chute when the roll is below the share', () => {
        assert.deepEquals(
            pickChute({
                chutes: chutes.slice(0, 1),
                chuteShare: 0.2,
                roll: 0.1,
            }),
            chutes[0],
        );
    });

    it('enters at the start when the roll is at or above the share', () => {
        assert.isUndefined(
            pickChute({
                chutes,
                chuteShare: 0.2,
                roll: 0.2,
            }),
        );
        assert.isUndefined(
            pickChute({
                chutes,
                chuteShare: 0.2,
                roll: 0.9,
            }),
        );
    });

    it('never uses a chute when the share is 0 or there are none', () => {
        assert.isUndefined(
            pickChute({
                chutes,
                chuteShare: 0,
                roll: 0,
            }),
        );
        assert.isUndefined(
            pickChute({
                chutes: undefined,
                chuteShare: 1,
                roll: 0,
            }),
        );
        assert.isUndefined(
            pickChute({
                chutes: [],
                chuteShare: 1,
                roll: 0,
            }),
        );
    });

    it('spreads the roll across several chutes', () => {
        assert.deepEquals(
            pickChute({
                chutes,
                chuteShare: 0.5,
                roll: 0.1,
            }),
            chutes[0],
        );
        assert.deepEquals(
            pickChute({
                chutes,
                chuteShare: 0.5,
                roll: 0.4,
            }),
            chutes[1],
        );
    });
});

describe(tickDropMs.name, () => {
    it('counts down and stops at 0', () => {
        assert.strictEquals(
            tickDropMs({
                dropInMs: 1500,
                msSinceLastExecute: 500,
            }),
            1000,
        );
        assert.strictEquals(
            tickDropMs({
                dropInMs: 100,
                msSinceLastExecute: 500,
            }),
            0,
        );
    });
});

describe(getDropScale.name, () => {
    it('shrinks from the start scale to 1', () => {
        const base = {
            dropMs: 1500,
            startScale: 2,
        };

        assert.strictEquals(
            getDropScale({
                ...base,
                dropInMs: 1500,
            }),
            2,
        );
        assert.strictEquals(
            getDropScale({
                ...base,
                dropInMs: 750,
            }),
            1.5,
        );
        assert.strictEquals(
            getDropScale({
                ...base,
                dropInMs: 0,
            }),
            1,
        );
    });
});
