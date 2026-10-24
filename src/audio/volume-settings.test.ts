import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {defaultVolumes, loadVolumes, volumeStorageKey} from './volume-settings.js';

function withStorage(storage: unknown, callback: () => void) {
    const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
    Object.defineProperty(globalThis, 'localStorage', {
        value: storage,
        configurable: true,
    });
    try {
        callback();
    } finally {
        if (original) {
            Object.defineProperty(globalThis, 'localStorage', original);
        }
    }
}

describe(loadVolumes.name, () => {
    it('falls back to defaults when localStorage throws', () => {
        withStorage(
            {
                getItem() {
                    throw new Error('blocked');
                },
            },
            () => {
                assert.deepEquals(loadVolumes(), defaultVolumes);
            },
        );
    });

    it('falls back to defaults for invalid JSON', () => {
        withStorage(
            {
                getItem() {
                    return '{nope';
                },
            },
            () => {
                assert.deepEquals(loadVolumes(), defaultVolumes);
            },
        );
    });

    it('reads and clamps saved values', () => {
        withStorage(
            {
                getItem(key: string) {
                    return key === volumeStorageKey
                        ? JSON.stringify({
                              music: 0.1,
                              effects: 5,
                          })
                        : undefined;
                },
            },
            () => {
                assert.deepEquals(loadVolumes(), {
                    music: 0.1,
                    effects: 1,
                });
            },
        );
    });
});
