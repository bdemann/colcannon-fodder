import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {getBossHp} from '../config/boss-config.js';
import {waveConfig} from '../config/game-config.js';
import {PotatoVariety} from '../potato/potato-variety.js';
import {generateEndlessWave, getWaveSettings} from './endless.js';
import {createInitialRunState} from './run-state.js';
import {advanceWaves} from './waves.js';

describe(generateEndlessWave.name, () => {
    it('follows the formulas at wave 1', () => {
        const wave = generateEndlessWave(1);
        assert.strictEquals(wave.potatoCount, 11);
        assert.strictEquals(wave.spawnIntervalMs, 3320);
        assert.strictEquals(wave.seagullCount, 0);
        assert.strictEquals(wave.bossCount, 0);
        assert.strictEquals(wave.orders.maxOpen, 1);
        assert.strictEquals(wave.sizeWeights.large, 0.05);
    });

    it('has a boss at 5 with base HP, and at 10 with more', () => {
        const five = generateEndlessWave(5);
        const ten = generateEndlessWave(10);
        assert.strictEquals(five.bossCount, 1);
        assert.strictEquals(five.bossHp, getBossHp(0));
        assert.strictEquals(ten.bossCount, 1);
        assert.strictEquals(ten.bossHp, getBossHp(1));
        assert.strictEquals(five.seagullCount, 2);
        assert.strictEquals(ten.potatoCount, 38);
        assert.strictEquals(ten.orders.dishes.length, 4);
    });

    it('holds every cap at wave 30', () => {
        const wave = generateEndlessWave(30);
        assert.strictEquals(wave.spawnIntervalMs, 700);
        assert.strictEquals(wave.speedPxPerMs, 0.14);
        assert.strictEquals(wave.sizeWeights.large, 0.7);
        assert.strictEquals(wave.sizeWeights.small, 0);
        assert.strictEquals(wave.chuteShare, 0.35);
        assert.strictEquals(wave.clumpChance, 0.4);
        assert.strictEquals(wave.clumpMaxExtra, 5);
        assert.strictEquals(wave.extraSpawnsPerSecond, 0.15);
        assert.strictEquals(wave.bossCount, 1);
        assert.strictEquals(wave.orders.maxOpen, 4);
        assert.strictEquals(wave.orders.intervalMs, 5000);
        assert.strictEquals(wave.orders.lifetimeMs, 18_000);
    });

    it('keeps size weights summing to 1', () => {
        [
            1,
            5,
            10,
            30,
        ].forEach((n) => {
            const {small, medium, large} = generateEndlessWave(n).sizeWeights;
            assert.isTrue(Math.abs(small + medium + large - 1) < 1e-9);
        });
    });
});

describe(getWaveSettings.name, () => {
    it('reads the campaign list and ends after the last wave', () => {
        const runState = createInitialRunState();
        assert.strictEquals(
            getWaveSettings(runState, 0)?.potatoCount,
            waveConfig.waves[0].potatoCount,
        );
        assert.isUndefined(getWaveSettings(runState, waveConfig.waves.length));
    });

    it('generates endless waves forever', () => {
        const runState = createInitialRunState('x', 'endless');
        assert.strictEquals(getWaveSettings(runState, 9)?.bossCount, 1);
    });
});

describe('endless advanceWaves', () => {
    it('never reaches done', () => {
        const runState = createInitialRunState('x', 'endless');
        runState.waveIndex = waveConfig.waves.length - 1;
        runState.wavePhase = 'spawning';
        const timer = {
            msUntilNextSpawn: 0,
        };
        for (let i = 0; i < 2000; i++) {
            advanceWaves(runState, timer, 1000);
        }
        assert.isTrue(runState.waveIndex > waveConfig.waves.length);
        assert.notStrictEquals(runState.wavePhase, 'done');
    });
});

describe('variety mix', () => {
    function sum(weights: Readonly<Record<string, number>>) {
        return Object.values(weights).reduce((total, weight) => total + weight, 0);
    }

    it('campaign waves have weights that sum to 1', () => {
        for (const wave of waveConfig.waves) {
            assert.isTrue(Math.abs(sum(wave.varietyWeights) - 1) < 1e-9);
        }
    });

    it('campaign waves 1 and 2 are Red and Russet only, with no eyes', () => {
        for (const wave of waveConfig.waves.slice(0, 2)) {
            assert.strictEquals(wave.eyesChance, 0);
            assert.strictEquals(
                wave.varietyWeights[PotatoVariety.Red] + wave.varietyWeights[PotatoVariety.Russet],
                1,
            );
        }
    });

    it('campaign waves 3 and 4 have a little tough skin and few eyes', () => {
        for (const wave of waveConfig.waves.slice(2, 4)) {
            assert.isAtMost(wave.varietyWeights[PotatoVariety.ToughSkinned], 0.15);
            assert.isAtMost(wave.eyesChance, 0.1);
        }
    });

    it('endless weights shift from soft to tough, capped, and always sum to 1', () => {
        function soft(n: number) {
            const {varietyWeights: w} = generateEndlessWave(n);
            return w[PotatoVariety.Red] + w[PotatoVariety.Russet] + w[PotatoVariety.Yukon];
        }
        assert.strictEquals(soft(1), 1);
        assert.isBelow(soft(6), soft(3));
        assert.isBelow(soft(20), soft(6));
        assert.strictEquals(soft(100), soft(200));
        for (const n of [
            1,
            5,
            12,
            100,
        ]) {
            assert.isTrue(Math.abs(sum(generateEndlessWave(n).varietyWeights) - 1) < 1e-9);
        }
    });

    it('endless eyes chance rises to a cap', () => {
        assert.isBelow(generateEndlessWave(2).eyesChance, generateEndlessWave(6).eyesChance);
        assert.strictEquals(generateEndlessWave(200).eyesChance, 0.4);
    });
});
