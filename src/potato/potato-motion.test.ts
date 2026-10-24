import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {cozyStyle} from '../art/cozy.js';
import {potatoMotionConfig} from '../config/potato-motion-config.js';
import {getPotatoMotion} from './potato-motion.js';

const base = {
    potatoId: 3,
    radius: 30,
    lastHitAtMs: -1,
} as const;

describe(getPotatoMotion.name, () => {
    it('is deterministic and keeps the wobble small', () => {
        const first = getPotatoMotion({
            ...base,
            elapsedMs: 4321,
        });
        assert.deepEquals(
            first,
            getPotatoMotion({
                ...base,
                elapsedMs: 4321,
            }),
        );
        assert.isTrue(Math.abs(first.rotation) <= cozyStyle.wobble);
    });

    it('moves each potato out of step', () => {
        assert.notStrictEquals(
            getPotatoMotion({
                ...base,
                elapsedMs: 700,
            }).rotation,
            getPotatoMotion({
                ...base,
                potatoId: 4,
                elapsedMs: 700,
            }).rotation,
        );
    });

    it('squashes extra right after a hit and settles back', () => {
        const hitAt = 5000;
        const midHit = hitAt + potatoMotionConfig.hitSquashMs / 2;
        const after = hitAt + potatoMotionConfig.hitSquashMs + 1;

        assert.isTrue(
            getPotatoMotion({
                ...base,
                lastHitAtMs: hitAt,
                elapsedMs: midHit,
            }).scaleY <
                getPotatoMotion({
                    ...base,
                    elapsedMs: midHit,
                }).scaleY,
        );
        assert.strictEquals(
            getPotatoMotion({
                ...base,
                lastHitAtMs: hitAt,
                elapsedMs: after,
            }).scaleY,
            getPotatoMotion({
                ...base,
                elapsedMs: after,
            }).scaleY,
        );
    });
});
