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

    it('draws every combination of flags without throwing', () => {
        for (const cut of [
            false,
            true,
        ]) {
            for (const cooked of [
                false,
                true,
            ]) {
                for (const mashed of [
                    false,
                    true,
                ]) {
                    const graphics = new Graphics();
                    assert.strictEquals(
                        drawPotato(graphics, {
                            cut,
                            cooked,
                            mashed,
                        }),
                        graphics,
                    );
                }
            }
        }
    });
});
