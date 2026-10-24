import {css, defineElement, html, listen} from 'element-vir';
import {economyConfig} from '../config/game-config.js';
import {toppingDefinitions} from '../order/topping.js';
import {getTowerIcon} from '../tower/tower-icons.js';
import {canAfford} from '../tower/tower-placement.js';
import {TowerType, towerTypes} from '../tower/tower-type.js';
import {type HudActions} from './hud-actions.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {comboHintText} from './hud-title.element.js';

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
            width: 200px;
        }

        button.selected {
            border: 6px solid #ffffff;
            transform: translateY(-8px);
        }

        .content {
            align-items: center;
            display: flex;
            gap: 6px;
            justify-content: center;
        }

        .icon {
            flex-shrink: 0;
            height: 44px;
            margin: 0;
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
        const selectedTopping = inputs.snapshot.selectedTopping;
        const hint = selectedTopping
            ? `Click a potato to add ${toppingDefinitions[selectedTopping].label}. Right click or Esc to cancel.`
            : selected
              ? selected === TowerType.Knife
                  ? 'Scroll or [ ] to turn the blade. Click beside the belt to build it.'
                  : `Click beside the path to build a ${towerTypes[selected].label}. Right click or Esc to cancel.`
              : comboHintText;

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
                                <img class="icon" src=${getTowerIcon(towerType) ?? ''} />
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
