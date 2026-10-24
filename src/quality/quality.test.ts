import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {qualityConfig} from '../config/quality-config.js';
import {formatStars, getPrestigeStars, pushRecentQuality} from './quality.js';

describe(getPrestigeStars.name, () => {
    it('is 5 with no data', () => {
        assert.strictEquals(getPrestigeStars([]), 5);
    });

    it('averages quality / 20, rounded to half stars', () => {
        assert.strictEquals(getPrestigeStars([100]), 5);
        assert.strictEquals(
            getPrestigeStars([
                40,
                40,
                40,
            ]),
            2,
        );
        assert.strictEquals(getPrestigeStars([70]), 3.5);
        assert.strictEquals(getPrestigeStars([0]), 0);
        assert.strictEquals(
            getPrestigeStars([
                100,
                70,
            ]),
            4.5,
        );
    });
});

describe(pushRecentQuality.name, () => {
    it('caps the window, dropping the oldest', () => {
        const recent: number[] = [];
        for (let i = 0; i < qualityConfig.prestigeWindow + 3; i++) {
            pushRecentQuality(recent, i);
        }
        assert.strictEquals(recent.length, qualityConfig.prestigeWindow);
        assert.strictEquals(recent[0], 3);
        assert.strictEquals(recent[recent.length - 1], qualityConfig.prestigeWindow + 2);
    });
});

describe(formatStars.name, () => {
    it('shows full, half and empty stars', () => {
        assert.strictEquals(formatStars(3.5), '★★★½☆');
        assert.strictEquals(formatStars(5), '★★★★★');
        assert.strictEquals(formatStars(0), '☆☆☆☆☆');
    });
});
