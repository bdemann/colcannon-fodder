import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {waveConfig} from '../config/game-config.js';
import {PotatoSize, pickPotatoSize} from './potato-size.js';

const weights = {
    small: 0.3,
    medium: 0.6,
    large: 0.1,
};

describe(pickPotatoSize.name, () => {
    it('picks by cumulative weight', () => {
        assert.strictEquals(pickPotatoSize(weights, 0), PotatoSize.Small);
        assert.strictEquals(pickPotatoSize(weights, 0.29), PotatoSize.Small);
        assert.strictEquals(pickPotatoSize(weights, 0.31), PotatoSize.Medium);
        assert.strictEquals(pickPotatoSize(weights, 0.89), PotatoSize.Medium);
        assert.strictEquals(pickPotatoSize(weights, 0.91), PotatoSize.Large);
        assert.strictEquals(pickPotatoSize(weights, 0.999), PotatoSize.Large);
    });

    it('never picks a zero-weight size', () => {
        const noLarge = {
            small: 0.5,
            medium: 0.5,
            large: 0,
        };
        assert.strictEquals(pickPotatoSize(noLarge, 0.999), PotatoSize.Medium);
        const noSmall = {
            small: 0,
            medium: 0.5,
            large: 0.5,
        };
        assert.strictEquals(pickPotatoSize(noSmall, 0), PotatoSize.Medium);
    });

    it('has wave weights that sum to 1', () => {
        for (const wave of waveConfig.waves) {
            const {small, medium, large} = wave.sizeWeights;
            assert.isTrue(Math.abs(small + medium + large - 1) < 1e-9);
        }
    });
});
