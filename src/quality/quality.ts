import {qualityConfig} from '../config/quality-config.js';

/** Formats stars like `★★★½☆` (always five slots). */
export function formatStars(stars: number): string {
    const full = Math.floor(stars);
    const half = stars - full >= 0.5 ? 1 : 0;

    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(qualityConfig.maxStars - full - half);
}
