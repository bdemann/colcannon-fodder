import {css, defineElement, html, unsafeCSS} from 'element-vir';
import {type HudActions} from './hud-actions.js';
import {HudBossBanner} from './hud-boss-banner.element.js';
import {HudCoinPopups} from './hud-coin-popups.element.js';
import {HudMute} from './hud-mute.element.js';
import {HudOrders} from './hud-orders.element.js';
import {HudPause} from './hud-pause.element.js';
import {HudRunOver} from './hud-run-over.element.js';
import {HudSession} from './hud-session.element.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {HudStats} from './hud-stats.element.js';
import {hudFontFamily, hudThemeVariables} from './hud-theme.js';
import {HudTitle} from './hud-title.element.js';
import {HudToppingBar} from './hud-topping-bar.element.js';
import {HudTowerPanel} from './hud-tower-panel.element.js';
import {HudTowerToolbar} from './hud-tower-toolbar.element.js';

/**
 * The HTML overlay drawn on top of the canvas. Only lays out its child panels; each panel lives in
 * its own file. The host ignores pointer events so clicks reach the canvas; any interactive child
 * must set `pointer-events: auto`.
 *
 * The overlay is laid out in a 1920x1080 coordinate space that the engine scales to fit the window,
 * so CSS pixel sizes here match game-world pixels.
 */
export const GameHud = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'game-hud',
    styles: css`
        :host {
            ${hudThemeVariables}
            color: var(--hud-walnut);
            display: block;
            font-family: ${unsafeCSS(hudFontFamily)};
            inset: 0;
            pointer-events: none;
            position: absolute;
        }
    `,
    render({inputs}) {
        return html`
            <${HudStats.assign({
                snapshot: inputs.snapshot,
            })}></${HudStats}>
            <${HudTowerToolbar.assign({
                snapshot: inputs.snapshot,
                actions: inputs.actions,
            })}></${HudTowerToolbar}>
            <${HudTowerPanel.assign({
                snapshot: inputs.snapshot,
                actions: inputs.actions,
            })}></${HudTowerPanel}>
            <${HudToppingBar.assign({
                snapshot: inputs.snapshot,
                actions: inputs.actions,
            })}></${HudToppingBar}>
            <${HudOrders.assign({
                snapshot: inputs.snapshot,
            })}></${HudOrders}>
            <${HudCoinPopups.assign({
                snapshot: inputs.snapshot,
            })}></${HudCoinPopups}>
            <${HudMute.assign({
                snapshot: inputs.snapshot,
            })}></${HudMute}>
            <${HudPause.assign({
                snapshot: inputs.snapshot,
                actions: inputs.actions,
            })}></${HudPause}>
            <${HudBossBanner.assign({
                snapshot: inputs.snapshot,
            })}></${HudBossBanner}>
            <${HudRunOver.assign({
                snapshot: inputs.snapshot,
                actions: inputs.actions,
            })}></${HudRunOver}>
            <${HudTitle.assign({
                snapshot: inputs.snapshot,
                actions: inputs.actions,
            })}></${HudTitle}>
            <${HudSession.assign({
                snapshot: inputs.snapshot,
                actions: inputs.actions,
            })}></${HudSession}>
        `;
    },
});
