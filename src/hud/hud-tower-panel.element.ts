import {css, defineElement, html, listen, nothing, unsafeCSS} from 'element-vir';
import {cozyPalette} from '../art/cozy.js';
import {upgradeConfig} from '../config/upgrade-config.js';
import {towerTypes} from '../tower/tower-type.js';
import {getServiceVerb} from '../tower/wear.js';
import {type HudActions} from './hud-actions.js';
import {coinIcon, wrenchIcon} from './hud-icons.js';
import {hudLayout} from './hud-layout.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {hudButtonStyles, hudPanelStyles} from './hud-theme.js';
import {starLabel} from './hud-tower-toolbar.element.js';

/** Wear bar color: Grass while fresh, Butter once worn, Tomato when nearly broken. */
function wearColor(wear: number): string {
    return wear < 40 ? cozyPalette.grass : wear < 70 ? cozyPalette.butter : cozyPalette.tomato;
}

/** Bottom-right panel for the selected built tower: its stats, an Upgrade button and a Sell button. */
export const HudTowerPanel = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-tower-panel',
    styles: css`
        :host {
            bottom: ${unsafeCSS(1080 - hudLayout.towerPanel.y - hudLayout.towerPanel.height)}px;
            display: block;
            left: ${unsafeCSS(hudLayout.towerPanel.x)}px;
            pointer-events: auto;
            position: absolute;
            width: ${unsafeCSS(hudLayout.towerPanel.width)}px;
        }

        .panel {
            ${hudPanelStyles}
            border-left: 12px solid var(--hud-pumpkin);
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 8px 14px 10px;
        }

        .header {
            align-items: baseline;
            display: flex;
            gap: 12px;
            justify-content: space-between;
        }

        .name {
            font-size: 30px;
            font-weight: 700;
        }

        .level {
            color: var(--hud-caramel);
            font-weight: 600;
            font-size: 22px;
        }

        .stats {
            display: flex;
            flex-wrap: wrap;
            font-size: 20px;
            gap: 0 14px;
        }

        .wear-track {
            background: var(--hud-sand);
            border: 2px solid var(--hud-bark);
            border-radius: 8px;
            box-sizing: border-box;
            height: 14px;
            overflow: hidden;
        }

        .wear-fill {
            height: 100%;
        }

        button {
            ${hudButtonStyles}
            background: var(--hud-meadow);
            border-radius: 12px;
            font-size: 22px;
            margin-top: 2px;
            padding: 4px 0;
        }

        button.service {
            background: var(--hud-sand);
        }

        button.sell {
            background: var(--hud-wheat);
        }

        button:disabled {
            cursor: default;
            opacity: 0.4;
        }
    `,
    render({inputs}) {
        const tower = inputs.snapshot.selectedTower;
        if (!tower) {
            return nothing;
        }
        const definition = towerTypes[tower.towerType];
        const {actions, snapshot} = inputs;
        const gated = tower.upgradeNeedsStars != undefined;
        const canUpgrade =
            tower.upgradeCost != undefined && !gated && snapshot.coins >= tower.upgradeCost;
        const hasDamage = definition.behavior !== 'gull-trap' && definition.behavior !== 'swipe';

        return html`
            <div class="panel">
                <div class="header">
                    <span class="name">${definition.label}</span>
                    <span class="level">Level ${tower.level} / ${upgradeConfig.maxLevel}</span>
                </div>
                <div class="stats">
                    ${hasDamage
                        ? html`
                              <span>Damage ${tower.stats.damage}</span>
                          `
                        : nothing}
                    <span>Range ${tower.stats.rangePx}</span>
                    <span>Reload ${(tower.stats.cooldownMs / 1000).toFixed(2)}s</span>
                    <span>Wear ${tower.wear}%</span>
                </div>
                <div class="wear-track">
                    <div
                        class="wear-fill"
                        style="width: ${tower.wear}%; background: ${wearColor(tower.wear)}"
                    ></div>
                </div>
                <button
                    class="service"
                    ?disabled=${tower.wear <= 0 || snapshot.coins < tower.serviceCost}
                    ${listen('click', () => {
                        actions.serviceTower(tower.towerId);
                    })}
                >
                    ${wrenchIcon()} ${getServiceVerb(tower.towerType)} (S) ${coinIcon()}
                    ${tower.serviceCost}
                </button>
                <button
                    class="upgrade"
                    ?disabled=${!canUpgrade}
                    ${listen('click', () => {
                        actions.upgradeTower(tower.towerId);
                    })}
                >
                    ${tower.upgradeNeedsStars == undefined
                        ? html`
                              Upgrade (U) ${coinIcon()} ${tower.upgradeCost ?? 'MAX'}
                          `
                        : html`
                              Needs ${starLabel(tower.upgradeNeedsStars)}
                          `}
                </button>
                <button
                    class="sell"
                    ${listen('click', () => {
                        actions.sellTower(tower.towerId);
                    })}
                >
                    Sell (X) ${coinIcon()} ${tower.sellValue}
                </button>
            </div>
        `;
    },
});
