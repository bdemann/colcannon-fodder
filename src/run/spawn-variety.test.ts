import {assert, assertWrap} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {waveConfig} from '../config/game-config.js';
import {getClumpExtraCount, shouldSpawnExtra} from './spawn-variety.js';

const wave = {
    clumpChance: 0.25,
    clumpMaxExtra: 3,
    extraSpawnsPerSecond: 0.08,
};

describe(getClumpExtraCount.name, () => {
    it('makes no clump when the chance roll is not under clumpChance', () => {
        assert.strictEquals(
            getClumpExtraCount({
                wave,
                chanceRoll: 0.25,
                sizeRoll: 0,
            }),
            0,
        );
        assert.strictEquals(
            getClumpExtraCount({
                wave,
                chanceRoll: 0.9,
                sizeRoll: 0.9,
            }),
            0,
        );
    });

    it('queues 1 + floor(roll * max) extras on a clump', () => {
        assert.strictEquals(
            getClumpExtraCount({
                wave,
                chanceRoll: 0.1,
                sizeRoll: 0,
            }),
            1,
        );
        assert.strictEquals(
            getClumpExtraCount({
                wave,
                chanceRoll: 0.1,
                sizeRoll: 0.34,
            }),
            2,
        );
        assert.strictEquals(
            getClumpExtraCount({
                wave,
                chanceRoll: 0.1,
                sizeRoll: 0.99,
            }),
            3,
        );
    });

    it('never clumps on wave 1', () => {
        const wave1 = assertWrap.isDefined(waveConfig.waves[0]);
        assert.strictEquals(
            getClumpExtraCount({
                wave: wave1,
                chanceRoll: 0,
                sizeRoll: 0,
            }),
            0,
        );
    });
});

describe(shouldSpawnExtra.name, () => {
    it('spawns when the roll is under rate * seconds', () => {
        assert.isTrue(
            shouldSpawnExtra({
                wave,
                msElapsed: 1000,
                roll: 0.07,
            }),
        );
        assert.isFalse(
            shouldSpawnExtra({
                wave,
                msElapsed: 1000,
                roll: 0.08,
            }),
        );
        assert.isFalse(
            shouldSpawnExtra({
                wave,
                msElapsed: 100,
                roll: 0.01,
            }),
        );
    });

    it('never spawns with a rate of 0', () => {
        assert.isFalse(
            shouldSpawnExtra({
                wave: {
                    ...wave,
                    extraSpawnsPerSecond: 0,
                },
                msElapsed: 1000,
                roll: 0,
            }),
        );
    });
});
