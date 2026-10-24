import {qualityConfig} from '../config/quality-config.js';

/** Adds a Perfect serving's quality to the window, dropping the oldest beyond the cap. */
export function pushRecentQuality(recentQualities: number[], quality: number): void {
    recentQualities.push(quality);
    while (recentQualities.length > qualityConfig.prestigeWindow) {
        recentQualities.shift();
    }
}

/** Prestige from 0 to 5 stars in half steps: average quality / 20. No data means full stars. */
export function getPrestigeStars(recentQualities: ReadonlyArray<number>): number {
    if (!recentQualities.length) {
        return qualityConfig.maxStars;
    }
    const average =
        recentQualities.reduce((sum, quality) => sum + quality, 0) / recentQualities.length;

    return Math.min(qualityConfig.maxStars, Math.round((average / 20) * 2) / 2);
}

/** Formats stars like `★★★½☆` (always five slots). */
export function formatStars(stars: number): string {
    const full = Math.floor(stars);
    const half = stars - full >= 0.5 ? 1 : 0;

    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(qualityConfig.maxStars - full - half);
}
