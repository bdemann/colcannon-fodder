import {parseUrl} from 'url-vir';
import {multiplayerConfig} from '../config/multiplayer-config.js';

const localDevHostnamePatterns = [
    /^localhost$/,
    /^127\.0\.0\.1$/,
    /^\[::1\]$/,
    /^10\.\d+\.\d+\.\d+$/,
    /^192\.168\.\d+\.\d+$/,
    /^172\.(?:1[6-9]|2\d|3[01])\.\d+\.\d+$/,
    /^[^.]+\.local$/,
];

/**
 * The multiplayer game id the backend knows this page by, chosen from the page origin. Returns
 * `undefined` for any other origin (for example an itch.io embed), which hides multiplayer.
 */
export function getMultiplayerGameId(origin: string): string | undefined {
    if (origin === multiplayerConfig.prodOrigin) {
        return multiplayerConfig.gameId;
    }

    try {
        const {hostname} = parseUrl(origin);
        return localDevHostnamePatterns.some((pattern) => pattern.test(hostname))
            ? multiplayerConfig.gameId
            : undefined;
    } catch {
        return undefined;
    }
}
