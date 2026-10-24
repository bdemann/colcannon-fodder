import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {capQueuedDistance} from './queue.js';

describe(capQueuedDistance.name, () => {
    it('caps at the counter front with nothing ahead', () => {
        assert.strictEquals(
            capQueuedDistance({
                next: 1005,
                aheadDistances: [],
                spacingPx: 50,
                endPx: 1000,
            }),
            1000,
        );
    });

    it('does not cap before the counter', () => {
        assert.strictEquals(
            capQueuedDistance({
                next: 500,
                aheadDistances: [],
                spacingPx: 50,
                endPx: 1000,
            }),
            500,
        );
    });

    it('stays one spacing behind the nearest potato ahead', () => {
        assert.strictEquals(
            capQueuedDistance({
                next: 480,
                aheadDistances: [
                    600,
                    520,
                ],
                spacingPx: 50,
                endPx: 1000,
            }),
            470,
        );
    });

    it('moves freely when the potato ahead is far away', () => {
        assert.strictEquals(
            capQueuedDistance({
                next: 100,
                aheadDistances: [600],
                spacingPx: 50,
                endPx: 1000,
            }),
            100,
        );
    });
});
