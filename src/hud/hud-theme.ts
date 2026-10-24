import {css, unsafeCSS} from 'element-vir';
import {cozyPalette} from '../art/cozy.js';

/**
 * The Cozy Farmhouse HUD theme: Fredoka (loaded in `index.html`) with the current sans-serif as the
 * offline fallback, parchment panels with Bark borders, and Walnut text.
 */
export const hudFontFamily = "'Fredoka', sans-serif";

/**
 * CSS custom properties for every palette color (`--hud-bark`, `--hud-butter`, ...). `GameHud` sets
 * them on its host, so every HUD element can use `var(--hud-...)` without importing the palette.
 */
export const hudThemeVariables = unsafeCSS(
    Object.entries(cozyPalette)
        .map(
            ([
                name,
                color,
            ]) => `--hud-${name}: ${color};`,
        )
        .join('\n'),
);

/** A parchment panel: Cream paper, a rounded Bark border and Walnut text. */
export const hudPanelStyles = css`
    background: var(--hud-cream);
    border: 4px solid var(--hud-bark);
    border-radius: 18px;
    box-shadow: 0 5px 0 rgba(43, 26, 18, 0.35);
    box-sizing: border-box;
    color: var(--hud-walnut);
`;

/** A Wheat button with a Bark border. Add your own sizes. */
export const hudButtonStyles = css`
    background: var(--hud-wheat);
    border: 4px solid var(--hud-bark);
    border-radius: 14px;
    box-shadow: 0 4px 0 rgba(43, 26, 18, 0.35);
    box-sizing: border-box;
    color: var(--hud-walnut);
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
`;

/** The highlight for a selected or armed button: Butter with a Pumpkin border. */
export const hudSelectedStyles = css`
    background: var(--hud-butter);
    border-color: var(--hud-pumpkin);
`;

/** The big Butter call-to-action button (Start, Resume, Play again). */
export const hudPrimaryButtonStyles = css`
    background: var(--hud-butter);
    border: 4px solid var(--hud-bark);
    border-radius: 16px;
    box-shadow: 0 5px 0 rgba(43, 26, 18, 0.45);
    color: var(--hud-bark);
    cursor: pointer;
    font-family: inherit;
    font-size: 36px;
    font-weight: 700;
    padding: 12px 48px;
`;

/** The dim Bark scrim behind full-screen panels. */
export const hudScrimStyles = css`
    background: rgba(43, 26, 18, 0.6);
`;

/** Dark outline around light text that floats over the game world, so it reads on any ground. */
export const hudFloatingTextStyles = css`
    -webkit-text-stroke: 6px var(--hud-bark);
    font-weight: 700;
    paint-order: stroke fill;
`;
