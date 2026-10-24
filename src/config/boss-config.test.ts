import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {bossConfig, getBossHp} from './boss-config.js';
import {waveConfig} from './game-config.js';

describe(getBossHp.name, () => {
    it('starts at 1200 and grows 25% per boss', () => {
        assert.strictEquals(getBossHp(0), 1200);
        assert.strictEquals(getBossHp(1), 1500);
        assert.strictEquals(getBossHp(2), 1800);
    });
});

describe('boss config', () => {
    it('only the final wave has a boss', () => {
        assert.deepEquals(
            waveConfig.waves.map((wave) => wave.bossCount),
            [
                0,
                0,
                0,
                0,
                1,
            ],
        );
        assert.strictEquals(bossConfig.penaltyMultiplier, 3);
    });
});
