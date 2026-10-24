import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {formatStars} from './quality.js';

describe(formatStars.name, () => {
    it('shows full, half and empty stars', () => {
        assert.strictEquals(formatStars(3.5), '★★★½☆');
        assert.strictEquals(formatStars(5), '★★★★★');
        assert.strictEquals(formatStars(0), '☆☆☆☆☆');
    });
});
