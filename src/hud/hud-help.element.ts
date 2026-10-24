import {css, defineElement, html, nothing} from 'element-vir';
import {
    economyConfig,
    orderConfig,
    potatoSizeConfig,
    seagullConfig,
} from '../config/game-config.js';
import {potatoTraitLines} from '../config/potato-variety-config.js';
import {progressionConfig} from '../config/progression-config.js';
import {upgradeConfig} from '../config/upgrade-config.js';
import {Topping, toppingDefinitions} from '../order/topping.js';
import {getTowerUnlockStars} from '../progression/progression.js';
import {TowerType, towerTypes} from '../tower/tower-type.js';
import {type HudActions} from './hud-actions.js';
import {coinIcon} from './hud-icons.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {hudPanelStyles, hudPrimaryButtonStyles, hudScrimStyles} from './hud-theme.js';
import {comboHintText, starLabel} from './hud-tower-toolbar.element.js';

const goalLines = [
    'Potatoes walk the belt to the restaurant. Build towers beside it to cut, cook and mash them first.',
    'Keep satisfaction above zero through every wave to become the Mash Champ.',
    'Potatoes are judged the instant they arrive, so get them done done done first. Fully mashed ones make customers happy; the closer to done, the less they complain. Raw ones make them furious.',
];

/** One line per tower: what it does. The unlock stars are added from the progression table. */
const towerLines: Readonly<Record<TowerType, string>> = {
    [TowerType.Knife]: 'cuts a short line straight across the belt.',
    [TowerType.Boiler]: 'splashes and softens everything in range, so Mashers hit twice as hard.',
    [TowerType.Masher]: 'smashes one potato at a time, hardest of all.',
    [TowerType.Microwave]: 'a fast, cheap cone blast, but rubbery potatoes cost you prestige.',
    [TowerType.CricketTrap]: 'a trap that knocks out seagulls that swoop in.',
    [TowerType.Swiper]: 'a slow spinning arm that knocks touched potatoes back up the belt.',
    [TowerType.Laser]: 'the aimable long line: aim it when you build it (scroll or [ ]).',
};

const toppingOrderLines = [
    'Customers order dishes: top mashed potatoes by hand (pick a topping, then click a potato) to fill them before the ticket runs out.',
    'A filled order pays extra coins; a missed one costs satisfaction and prestige.',
];

const prestigeLines = [
    'You start at zero stars with only the Knife. Serve quality mash to earn prestige: stars unlock new towers and tower upgrades.',
    'Poor potatoes (rubbery Microwave mash, raw or half-mashed ones, stolen ones, missed orders) cost stars, and towers lock again if you slip.',
];

const seagullLines = [
    'Seagulls swoop in to steal potatoes. Your towers can knock them out.',
    'Towers wear out with use. Click one and press S to service it.',
];

const coopLines = [
    'In co-op every cook defends their own belt, but the restaurant and its satisfaction are shared.',
    'Only the host picks the map and mode, restarts, and starts the run. Any cook can pause.',
    'Fast-forward is singleplayer only.',
];

/** Every key and what it does, shown as a table in the Help panel. */
export const controls: ReadonlyArray<
    readonly [
        keys: string,
        action: string,
    ]
> = [
    [
        '1 - 7 or click',
        'Pick a tower',
    ],
    [
        'Q W E R',
        'Pick a topping',
    ],
    [
        'Click',
        'Build the tower / apply the topping',
    ],
    [
        'Right click / Esc',
        'Cancel',
    ],
    [
        'S / U / X',
        'Service / upgrade / sell the selected tower',
    ],
    [
        '[ ] or scroll',
        'Aim the Knife and Laser',
    ],
    [
        'P / Esc',
        'Pause',
    ],
    [
        'F',
        'Fast-forward speed',
    ],
    [
        'G',
        'Fast-forward until the next income',
    ],
    [
        'M',
        'Mute sound effects',
    ],
    [
        'H',
        'Open or close this help',
    ],
    [
        'R',
        'Restart after a run',
    ],
];

/** The "How you earn" lines, built from the config so they never go stale. */
export function getEarnLines(): string[] {
    const sizes = Object.entries(potatoSizeConfig)
        .map(
            ([
                size,
                config,
            ]) => `${size} ×${config.value}`,
        )
        .join(', ');
    return [
        `Perfect mash: ${economyConfig.servingCoins.perfect} coins × size (${sizes})`,
        'Quality scales the pay',
        `Wave cleared: bonus coins (wave 1: ${progressionConfig.waveEndBonusCoins[0]})`,
        'Prestige: great mash earns stars that unlock towers and upgrades; poor potatoes cost stars',
        `Filled order: +${orderConfig.fulfilled.coins} coins × size`,
        `Eaten anyway: ${economyConfig.servingCoins.incomplete} coins`,
        `Seagull knocked out or fed: ${seagullConfig.bountyCoins} coins`,
        `Selling a tower refunds ${Math.round(upgradeConfig.sellRefund * 100)}%`,
    ];
}

function renderLines(lines: ReadonlyArray<string>) {
    return lines.map((line) => {
        return html`
            <p>${line}</p>
        `;
    });
}

/**
 * The scrollable Help panel. Opened from the title, the pause panel or the `h` key, closed with
 * Esc, `h` or the Close button. All the long rules and the controls live here.
 */
export const HudHelp = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-help',
    styles: css`
        :host {
            display: block;
        }

        .layer {
            align-items: center;
            ${hudScrimStyles}
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
            z-index: 4;
        }

        .panel {
            ${hudPanelStyles}
            border-radius: 28px;
            border-width: 6px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            height: 1000px;
            padding: 20px 40px 24px;
            width: 1500px;
        }

        .title {
            color: var(--hud-oak);
            font-size: 52px;
            font-weight: 700;
            text-align: center;
        }

        .scroll {
            align-items: start;
            display: grid;
            flex: 1;
            font-size: 24px;
            gap: 0 48px;
            grid-template-columns: 1fr 1fr;
            line-height: 1.25;
            min-height: 0;
            overflow-y: auto;
            padding-right: 12px;
        }

        section {
            margin-bottom: 14px;
        }

        h2 {
            color: var(--hud-oak);
            font-size: 30px;
            margin: 0 0 4px;
        }

        p {
            margin: 0 0 6px;
        }

        .tower-name {
            font-weight: 700;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        td {
            padding: 2px 0;
            vertical-align: top;
        }

        td.keys {
            font-weight: 700;
            padding-right: 20px;
            white-space: nowrap;
        }

        .close {
            ${hudPrimaryButtonStyles}
            align-self: center;
            padding: 8px 48px;
        }
    `,
    render({inputs}) {
        if (!inputs.snapshot.helpOpen) {
            return html`
                ${nothing}
            `;
        }

        return html`
            <div class="layer">
                <div class="panel">
                    <div class="title">How to play</div>
                    <div class="scroll">
                        <div>
                            <section>
                                <h2>The goal</h2>
                                ${renderLines(goalLines)}
                            </section>
                            <section>
                                <h2>The combo</h2>
                                <p>${comboHintText}</p>
                            </section>
                            <section>
                                <h2>Potato varieties</h2>
                                ${renderLines(potatoTraitLines)}
                            </section>
                            <section>
                                <h2>Toppings and orders</h2>
                                <p>
                                    ${Object.values(Topping)
                                        .map((topping) => {
                                            const definition = toppingDefinitions[topping];

                                            return `${definition.label} [${definition.hotkey.toUpperCase()}]`;
                                        })
                                        .join(', ')}
                                </p>
                                ${renderLines(toppingOrderLines)}
                            </section>
                            <section>
                                <h2>Prestige</h2>
                                ${renderLines(prestigeLines)}
                            </section>
                            <section>
                                <h2>Seagulls and wear</h2>
                                ${renderLines(seagullLines)}
                            </section>
                            <section>
                                <h2>Co-op basics</h2>
                                ${renderLines(coopLines)}
                            </section>
                        </div>
                        <div>
                            <section>
                                <h2>Towers</h2>
                                ${Object.values(TowerType).map((towerType) => {
                                    const definition = towerTypes[towerType];
                                    const stars = getTowerUnlockStars(towerType);

                                    return html`
                                        <p>
                                            <span class="tower-name">
                                                ${definition.label} [${definition.hotkey}]
                                            </span>
                                            ${stars
                                                ? `(unlocks at ${starLabel(stars)})`
                                                : '(from the start)'}
                                            ${towerLines[towerType]}
                                        </p>
                                    `;
                                })}
                            </section>
                            <section>
                                <h2>How you earn ${coinIcon()}</h2>
                                ${renderLines(getEarnLines())}
                            </section>
                            <section>
                                <h2>Controls</h2>
                                <table>
                                    ${controls.map(
                                        ([
                                            keys,
                                            action,
                                        ]) => {
                                            return html`
                                                <tr>
                                                    <td class="keys">${keys}</td>
                                                    <td>${action}</td>
                                                </tr>
                                            `;
                                        },
                                    )}
                                </table>
                                <p>Volume sliders are in the pause menu.</p>
                            </section>
                        </div>
                    </div>
                    <button
                        class="close"
                        @click=${() => {
                            inputs.actions.closeHelp();
                        }}
                    >
                        Close (Esc)
                    </button>
                </div>
            </div>
        `;
    },
});
