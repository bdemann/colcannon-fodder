import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {isInCone} from './microwave.js';

const base = {
    origin: {
        x: 0,
        y: 0,
    },
    aimAt: {
        x: 100,
        y: 0,
    },
    lengthPx: 100,
    halfAngleDeg: 25,
};

describe(isInCone.name, () => {
    it('includes points along the aim and inside the angle', () => {
        assert.isTrue(
            isInCone({
                ...base,
                point: {
                    x: 50,
                    y: 0,
                },
            }),
        );
        assert.isTrue(
            isInCone({
                ...base,
                point: {
                    x: 50,
                    y: 20,
                },
            }),
        );
        assert.isTrue(
            isInCone({
                ...base,
                point: {
                    x: 0,
                    y: 0,
                },
            }),
        );
    });

    it('excludes points outside the angle', () => {
        assert.isFalse(
            isInCone({
                ...base,
                point: {
                    x: 50,
                    y: 40,
                },
            }),
        );
        assert.isFalse(
            isInCone({
                ...base,
                point: {
                    x: -50,
                    y: 0,
                },
            }),
        );
    });

    it('excludes points past the length', () => {
        assert.isFalse(
            isInCone({
                ...base,
                point: {
                    x: 101,
                    y: 0,
                },
            }),
        );
    });

    it('follows the aim direction, including wrap-around', () => {
        const aimed = {
            ...base,
            aimAt: {
                x: -100,
                y: 0,
            },
        };
        assert.isTrue(
            isInCone({
                ...aimed,
                point: {
                    x: -50,
                    y: 10,
                },
            }),
        );
        assert.isTrue(
            isInCone({
                ...aimed,
                point: {
                    x: -50,
                    y: -10,
                },
            }),
        );
        assert.isFalse(
            isInCone({
                ...aimed,
                point: {
                    x: 50,
                    y: 0,
                },
            }),
        );
    });
});
