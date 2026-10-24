import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {getBossHp} from '../config/boss-config.js';
import {waveConfig} from '../config/game-config.js';
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
