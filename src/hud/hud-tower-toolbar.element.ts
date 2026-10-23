import {css, defineElement, html, listen} from 'element-vir';
import {economyConfig} from '../config/game-config.js';
import {canAfford} from '../tower/tower-placement.js';
import {TowerType, towerTypes} from '../tower/tower-type.js';
import {type HudActions} from './hud-actions.js';
import {type HudSnapshot} from './hud-snapshot.js';

/** Bottom toolbar with one button per tower type. */
export const HudTowerToolbar = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-tower-toolbar',
    styles: css`
        :host {
            align-items: center;
            bottom: 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            left: 50%;
            pointer-events: auto;
            position: absolute;
            transform: translateX(-50%);
        }

        .hint {
            font-size: 26px;
            text-shadow: 0 2px 4px black;
            white-space: nowrap;
        }

        .row {
            display: flex;
            gap: 16px;
        }

        button {
            background: rgba(20, 20, 20, 0.85);
            border: 4px solid rgba(255, 255, 255, 0.25);
            border-radius: 16px;
            box-sizing: border-box;
            color: white;
            cursor: pointer;
            font-family: inherit;
            height: 110px;
            width: 240px;
        }

        button.selected {
            border: 6px solid #ffffff;
            transform: translateY(-8px);
        }

        .content {
            align-items: center;
            display: flex;
            gap: 16px;
            justify-content: center;
        }

        .swatch {
            border-radius: 50%;
            height: 44px;
            width: 44px;
        }

        .text {
            align-items: flex-start;
            display: flex;
            flex-direction: column;
        }

        .label {
            font-size: 30px;
            font-weight: bold;
            white-space: nowrap;
        }

        button.unaffordable {
            opacity: 0.45;
        }

        .cost {
            color: #ffd700;
            font-size: 24px;
        }

        .hotkey {
            font-size: 24px;
            opacity: 0.7;
        }
    `,
    render({inputs}) {
        const selected = inputs.snapshot.selectedTowerType;
        const hint = selected
            ? `Click beside the path to build a ${towerTypes[selected].label}. Right click or Esc to cancel.`
            : 'Pick a tower: Knife cuts · Pot cooks · Masher mashes';

        return html`
            <div class="hint">${hint}</div>
            <div class="row">
                ${Object.values(TowerType).map((towerType) => {
                    const definition = towerTypes[towerType];

                    return html`
                        <button
                            class=${[
                                towerType === selected ? 'selected' : '',
                                canAfford(inputs.snapshot.coins, towerType) ? '' : 'unaffordable',
                            ].join(' ')}
                            ${listen('click', () => {
                                inputs.actions.selectTowerType(
                                    towerType === selected ? undefined : towerType,
                                );
                            })}
                        >
                            <div class="content">
                                <div class="swatch" style="background: ${definition.color}"></div>
                                <div class="text">
                                    <span class="label">${definition.label}</span>
                                    <span class="hotkey">[${definition.hotkey}]</span>
                                    <span class="cost">
                                        🪙 ${economyConfig.towerCost[towerType]}
                                    </span>
                                </div>
                            </div>
                        </button>
                    `;
                })}
            </div>
        `;
    },
});
