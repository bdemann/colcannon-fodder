import {Graphics} from '@antha/graphics-2d';
import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {drawPotato} from './potato-view.js';

describe(drawPotato.name, () => {
    it('returns the same graphics instance', () => {
        const graphics = new Graphics();

        assert.strictEquals(
            drawPotato(graphics, {
                cut: false,
                cooked: false,
                mashed: false,
            }),
            graphics,
        );
    });
});
