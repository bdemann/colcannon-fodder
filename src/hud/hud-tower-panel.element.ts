import {css, defineElement, html, listen, nothing} from 'element-vir';
import {cozyPalette} from '../art/cozy.js';
import {upgradeConfig} from '../config/upgrade-config.js';
import {towerTypes} from '../tower/tower-type.js';
import {getServiceVerb} from '../tower/wear.js';
import {type HudActions} from './hud-actions.js';
import {coinIcon, wrenchIcon} from './hud-icons.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {hudButtonStyles, hudPanelStyles} from './hud-theme.js';
import {starLabel} from './hud-tower-toolbar.element.js';

/** Wear bar color: Grass while fresh, Butter once worn, Tomato when nearly broken. */
function wearColor(wear: number): string {
    return wear < 40 ? cozyPalette.grass : wear < 70 ? cozyPalette.butter : cozyPalette.tomato;
}

/** Bottom-left panel for the selected built tower: its stats, an Upgrade button and a Sell button. */
export const HudTowerPanel = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-tower-panel',
    styles: css`
        :host {
            display: block;
            left: 24px;
            bottom: 150px;
            pointer-events: auto;
            position: absolute;
            width: 360px;
        }

        .panel {
            ${hudPanelStyles}
            border-left: 12px solid var(--hud-pumpkin);
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 12px 18px 14px;
            width: 360px;
        }

        .name {
            font-size: 32px;
            font-weight: 700;
        }

        .level {
            color: var(--hud-caramel);
            font-weight: 600;
            font-size: 24px;
        }

        .stat {
            font-size: 22px;
        }

        .wear-track {
            background: var(--hud-sand);
            border: 2px solid var(--hud-bark);
            border-radius: 8px;
            box-sizing: border-box;
            height: 16px;
            overflow: hidden;
        }

        .wear-fill {
            height: 100%;
        }

        button {
            ${hudButtonStyles}
            background: var(--hud-meadow);
            border-radius: 12px;
            font-size: 26px;
            margin-top: 4px;
            padding: 8px 0;
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
                <div class="name">${definition.label}</div>
                <div class="level">Level ${tower.level} / ${upgradeConfig.maxLevel}</div>
                ${hasDamage
                    ? html`
                          <div class="stat">Damage: ${tower.stats.damage}</div>
                      `
                    : nothing}
                <div class="stat">Range: ${tower.stats.rangePx}</div>
                <div class="stat">Reload: ${(tower.stats.cooldownMs / 1000).toFixed(2)}s</div>
                <div class="stat">Wear: ${tower.wear}%</div>
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
