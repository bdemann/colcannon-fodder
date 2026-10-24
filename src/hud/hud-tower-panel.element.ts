import {css, defineElement, html, listen, nothing} from 'element-vir';
import {upgradeConfig} from '../config/upgrade-config.js';
import {towerTypes} from '../tower/tower-type.js';
import {getServiceVerb} from '../tower/wear.js';
import {type HudActions} from './hud-actions.js';
import {type HudSnapshot} from './hud-snapshot.js';

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
            background: rgba(20, 20, 20, 0.9);
            border-left: 6px solid #ffd700;
            border-radius: 10px;
            box-sizing: border-box;
            color: white;
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 12px 18px 14px;
            width: 360px;
        }

        .name {
            font-size: 32px;
            font-weight: bold;
        }

        .level {
            color: #ffd700;
            font-size: 24px;
        }

        .stat {
            font-size: 22px;
        }

        .wear-track {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 6px;
            height: 14px;
            overflow: hidden;
        }

        .wear-fill {
            height: 100%;
        }

        button {
            background: #3a8e4a;
            border: 3px solid rgba(255, 255, 255, 0.4);
            border-radius: 10px;
            color: white;
            cursor: pointer;
            font-family: inherit;
            font-size: 26px;
            margin-top: 4px;
            padding: 8px 0;
        }

        button.service {
            background: #6a5a2a;
        }

        button.sell {
            background: #8e3a3a;
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
        const canUpgrade = tower.upgradeCost != undefined && snapshot.coins >= tower.upgradeCost;
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
                        style="width: ${tower.wear}%; background: hsl(${120 -
                        tower.wear * 1.2}, 70%, 45%)"
                    ></div>
                </div>
                <button
                    class="service"
                    ?disabled=${tower.wear <= 0 || snapshot.coins < tower.serviceCost}
                    ${listen('click', () => {
                        actions.serviceTower(tower.towerId);
                    })}
                >
                    ${getServiceVerb(tower.towerType)} (S) 🪙 ${tower.serviceCost}
                </button>
                <button
                    class="upgrade"
                    ?disabled=${!canUpgrade}
                    ${listen('click', () => {
                        actions.upgradeTower(tower.towerId);
                    })}
                >
                    Upgrade (U) 🪙 ${tower.upgradeCost ?? 'MAX'}
                </button>
                <button
                    class="sell"
                    ${listen('click', () => {
                        actions.sellTower(tower.towerId);
                    })}
                >
                    Sell (X) 🪙 ${tower.sellValue}
                </button>
            </div>
        `;
    },
});
