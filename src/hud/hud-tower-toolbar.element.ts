import {css, defineElement, html, keyed, listen, nothing} from 'element-vir';
import {economyConfig} from '../config/game-config.js';
import {toppingDefinitions} from '../order/topping.js';
import {getTowerUnlockStars} from '../progression/progression.js';
import {getTowerIcon} from '../tower/tower-icons.js';
import {canAfford} from '../tower/tower-placement.js';
import {TowerType, towerTypes} from '../tower/tower-type.js';
import {type HudActions} from './hud-actions.js';
import {coinIcon} from './hud-icons.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {hudButtonStyles, hudPanelStyles, hudSelectedStyles} from './hud-theme.js';
import {comboHintText} from './hud-title.element.js';

/** Stars as text for an unlock requirement, like `★★½`. */
export function starLabel(stars: number): string {
    const full = Math.floor(stars);

    return stars - full >= 0.5 ? `${'★'.repeat(full)}½${full ? '' : '★'}` : '★'.repeat(full);
}

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
            ${hudPanelStyles}
            border-radius: 14px;
            font-size: 26px;
            font-weight: 500;
            padding: 4px 22px;
            white-space: nowrap;
        }

        .row {
            display: flex;
            gap: 8px;
        }

        button {
            ${hudButtonStyles}
            border-radius: 16px;
            height: 110px;
            width: 176px;
        }

        button.selected {
            ${hudSelectedStyles}
            transform: translateY(-8px);
        }

        .content {
            align-items: center;
            display: flex;
            gap: 4px;
            justify-content: center;
        }

        .icon {
            flex-shrink: 0;
            height: 36px;
            margin: 0;
            width: 36px;
        }

        .text {
            align-items: flex-start;
            display: flex;
            flex-direction: column;
        }

        .label {
            font-size: 21px;
            font-weight: 700;
            white-space: nowrap;
        }

        button.locked {
            cursor: default;
            filter: grayscale(1);
            opacity: 0.55;
        }

        .unlock-text {
            font-size: 20px;
            font-weight: 700;
            white-space: nowrap;
        }

        button.glow {
            animation: unlock-glow 0.8s ease-in-out infinite alternate;
        }

        @keyframes unlock-glow {
            from {
                box-shadow: 0 0 6px 2px #ffe27a;
            }
            to {
                box-shadow: 0 0 22px 8px #ffe27a;
            }
        }

        .banner {
            ${hudPanelStyles}
            border-radius: 14px;
            font-size: 34px;
            font-weight: 700;
            padding: 6px 26px;
            white-space: nowrap;
        }

        button.unaffordable {
            opacity: 0.45;
        }

        .cost {
            color: var(--hud-oak);
            font-size: 24px;
            font-weight: 700;
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
              ? selected === TowerType.Laser
                  ? 'Scroll or [ ] to aim the beam. Click beside the belt to build it.'
                  : selected === TowerType.Knife
                    ? 'The Knife cuts straight across the belt. Click beside the belt to build it.'
                    : `Click beside the path to build a ${towerTypes[selected].label}. Right click or Esc to cancel.`
              : comboHintText;

        const banner = inputs.snapshot.prestigeBanner;

        return html`
            ${banner
                ? keyed(
                      banner.id,
                      html`
                          <div class="banner">${banner.text}</div>
                      `,
                  )
                : nothing}
            <div class="hint">${hint}</div>
            <div class="row">
                ${Object.values(TowerType).map((towerType) => {
                    const definition = towerTypes[towerType];
                    const locked = !inputs.snapshot.unlockedTowers.includes(towerType);

                    return html`
                        <button
                            class=${[
                                towerType === selected ? 'selected' : '',
                                locked ? 'locked' : '',
                                inputs.snapshot.glowTowers.includes(towerType) ? 'glow' : '',
                                canAfford(inputs.snapshot.coins, towerType) ? '' : 'unaffordable',
                            ].join(' ')}
                            ${listen('click', () => {
                                if (locked) {
                                    return;
                                }
                                inputs.actions.selectTowerType(
                                    towerType === selected ? undefined : towerType,
                                );
                            })}
                        >
                            <div class="content">
                                ${locked
                                    ? nothing
                                    : html`
                                          <img class="icon" src=${getTowerIcon(towerType) ?? ''} />
                                      `}
                                <div class="text">
                                    <span class="label">
                                        ${locked ? '🔒 ' : ''}${definition.label}
                                    </span>
                                    ${locked
                                        ? html`
                                              <span class="unlock-text">
                                                  Unlocks at
                                                  ${starLabel(getTowerUnlockStars(towerType))}
                                              </span>
                                          `
                                        : html`
                                              <span class="hotkey">[${definition.hotkey}]</span>
                                              <span class="cost">
                                                  ${coinIcon()}
                                                  ${economyConfig.towerCost[towerType]}
                                              </span>
                                          `}
                                </div>
                            </div>
                        </button>
                    `;
                })}
            </div>
        `;
    },
});
