import {html, svg} from 'element-vir';
import {cozyPalette} from '../art/cozy.js';
import {qualityConfig} from '../config/quality-config.js';

/** Common svg attributes: the icon is 1em square so it scales with the surrounding text. */
const iconStyle = 'display: inline-block; height: 1em; vertical-align: -0.16em; width: 1em;';

/** Points of a five-pointed star centered on (0, 0). */
function getStarPoints({outer, inner}: Readonly<{outer: number; inner: number}>): string {
    const points: string[] = [];
    for (let index = 0; index < 10; index++) {
        const angle = -Math.PI / 2 + (index * Math.PI) / 5;
        const radius = index % 2 ? inner : outer;
        points.push(
            `${(Math.cos(angle) * radius).toFixed(2)},${(Math.sin(angle) * radius).toFixed(2)}`,
        );
    }

    return points.join(' ');
}

const bigStarPoints = getStarPoints({
    outer: 26,
    inner: 12,
});

/** A small Butter coin with a Caramel rim and a "C", from the art lab. */
export function coinIcon() {
    return html`
        <svg style=${iconStyle} viewBox="-26 -26 52 52">
            ${svg`
                <circle r="22" fill="${cozyPalette.butter}" stroke="${cozyPalette.bark}" stroke-width="4" />
                <circle r="16" fill="none" stroke="${cozyPalette.caramel}" stroke-width="2.5" />
                <text y="1" font-size="22" font-weight="700" text-anchor="middle" dominant-baseline="central" fill="${cozyPalette.caramel}" font-family="Fredoka, sans-serif">C</text>
                <ellipse cx="-8" cy="-9" rx="6" ry="2.6" fill="#fff" fill-opacity="0.55" transform="rotate(-40 -8 -9)" />
            `}
        </svg>
    `;
}

/** One Butter star. `fill` is how much of it is lit: 1 full, 0.5 half, 0 empty. */
export function starIcon(fill = 1) {
    const id = 'star-left-half';
    const lit = cozyPalette.butter;
    const dim = cozyPalette.sand;

    return html`
        <svg style=${iconStyle} viewBox="-30 -30 60 60">
            ${svg`
                <defs>
                    <clipPath id="${id}"><rect x="-30" y="-30" width="30" height="60" /></clipPath>
                </defs>
                <polygon points="${bigStarPoints}" fill="${fill >= 1 ? lit : dim}" stroke="${cozyPalette.bark}" stroke-width="4.5" stroke-linejoin="round" />
                ${fill > 0 && fill < 1 ? svg`<polygon points="${bigStarPoints}" fill="${lit}" clip-path="url(#${id})" />` : ''}
                ${fill > 0 ? svg`<ellipse cx="-7" cy="-9" rx="5" ry="2" fill="#fff" fill-opacity="0.6" transform="rotate(-45 -7 -9)" />` : ''}
            `}
        </svg>
    `;
}

/** A row of `qualityConfig.maxStars` stars lit up to `stars` (halves allowed). */
export function starRow(stars: number) {
    return html`
        <span style="white-space: nowrap;">
            ${Array.from(
                {
                    length: qualityConfig.maxStars,
                },
                (unusedItem, index) => {
                    return starIcon(Math.max(0, Math.min(1, Math.floor((stars - index) * 2) / 2)));
                },
            )}
        </span>
    `;
}

/** A Slate and Sage spanner, tilted, from the art lab. */
export function wrenchIcon() {
    return html`
        <svg style=${iconStyle} viewBox="-40 -40 80 80">
            ${svg`
                <g transform="rotate(-45) translate(0 2)">
                    <rect x="-5.5" y="-8" width="11" height="44" rx="5.5" fill="${cozyPalette.slate}" stroke="${cozyPalette.bark}" stroke-width="3.5" />
                    <path d="M5 -15 L5 -33 A13 13 0 1 1 -5 -33 L-5 -15 Z" fill="${cozyPalette.sage}" stroke="${cozyPalette.bark}" stroke-width="3.5" stroke-linejoin="round" />
                    <ellipse cx="-8" cy="-24" rx="2.5" ry="6" fill="#fff" fill-opacity="0.6" />
                </g>
            `}
        </svg>
    `;
}
