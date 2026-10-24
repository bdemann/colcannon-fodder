import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {cozyPalette, cozyStyle, squash, wobble} from './cozy.js';

describe('cozyPalette', () => {
    it('has the 20 lab colors', () => {
        assert.strictEquals(Object.keys(cozyPalette).length, 20);
        assert.strictEquals(cozyPalette.bark, '#2b1a12');
    });
});

describe(wobble.name, () => {
    it('is deterministic and bounded by the style amplitude', () => {
        assert.strictEquals(wobble(1234, 3), wobble(1234, 3));

        for (let time = 0; time < 20_000; time += 137) {
            assert.isTrue(Math.abs(wobble(time, 5)) <= cozyStyle.wobble + 1e-9);
        }
    });

    it('differs between seeds', () => {
        assert.notStrictEquals(wobble(500, 1), wobble(500, 2));
    });
});

describe(squash.name, () => {
    it('rests at the cycle ends and squashes in the middle', () => {
        assert.strictEquals(squash(0).scaleY, 1);
        assert.isTrue(Math.abs(squash(1).scaleY - 1) < 1e-9);
        assert.isTrue(squash(0.5).scaleY < 1);
        assert.isTrue(squash(0.5).scaleX > 1);
    });

    it('preserves area and wraps', () => {
        const {scaleX, scaleY} = squash(0.3);

        assert.isTrue(Math.abs(scaleX * scaleY - 1) < 1e-9);
        assert.isTrue(Math.abs(squash(1.3).scaleY - squash(0.3).scaleY) < 1e-9);
    });
});
