import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {getMultiplayerGameId} from './multiplayer-game-id.js';

describe(getMultiplayerGameId.name, () => {
    it('resolves the id for GitHub Pages', () => {
        assert.strictEquals(getMultiplayerGameId('https://bdemann.github.io'), 'colcannon-fodder');
    });

    it('resolves the id for local dev origins', () => {
        assert.strictEquals(getMultiplayerGameId('http://localhost:5173'), 'colcannon-fodder');
        // eslint-disable-next-line sonarjs/no-clear-text-protocols
        assert.strictEquals(getMultiplayerGameId('http://192.168.1.20:5173'), 'colcannon-fodder');
    });

    it('is undefined for other origins', () => {
        assert.isUndefined(getMultiplayerGameId('https://example.itch.zone'));
        assert.isUndefined(getMultiplayerGameId('https://itch.io'));
        assert.isUndefined(getMultiplayerGameId('not a url'));
    });
});
