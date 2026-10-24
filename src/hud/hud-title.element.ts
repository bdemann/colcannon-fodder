import {createFullDateInUserTimezone, toFormattedString} from 'date-vir';
import {css, defineElement, html, nothing, svg} from 'element-vir';
import {potatoTraitLines} from '../config/potato-variety-config.js';
import {gameWorldSize} from '../game-state/game-world.js';
import {getPositionAlongPath, type LevelDefinition} from '../level/level.js';
import {getLevel, getLevelsForPlayerCount} from '../level/levels.js';
import {getModeRecord} from '../records/records.js';
import {RunStatus} from '../run/run-state.js';
import {TowerType, towerTypes} from '../tower/tower-type.js';
import {type HudActions} from './hud-actions.js';
import {starRow} from './hud-icons.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {
    hudButtonStyles,
    hudPanelStyles,
    hudPrimaryButtonStyles,
    hudScrimStyles,
    hudSelectedStyles,
} from './hud-theme.js';

/** The title screen starts singleplayer runs, so it only offers 1-player maps. */
const singleplayerCount = 1;

/** The recipe order, with what each tower does to a potato. */
const recipe: ReadonlyArray<{towerType: TowerType; verb: string}> = [
    {
        towerType: TowerType.Knife,
        verb: 'cut',
    },
    {
        towerType: TowerType.Boiler,
        verb: 'splash & soften',
    },
    {
        towerType: TowerType.Masher,
        verb: 'mash',
    },
];

/** The combo explained in one line. Shown in the toolbar hint and the title rules. */
export const comboHintText =
    'Combo: the Knife cuts (×1.5), the Pot softens (Mashers hit ×2), then the Masher smashes (×3)';

const previewSize = {
    width: 192,
    height: 108,
} as const;

/** A mini map of the level: the belt as a polyline, the restaurant square and chute dots. */
export function renderLevelPreview(level: Readonly<LevelDefinition>) {
    const scale = previewSize.width / gameWorldSize.width;
    const restaurantSize = level.restaurant.sizePx * scale;

    return html`
        <svg
            class="preview"
            width=${previewSize.width}
            height=${previewSize.height}
            viewBox="0 0 ${previewSize.width} ${previewSize.height}"
        >
            ${svg`<rect width="${previewSize.width}" height="${previewSize.height}" fill="#7f9040" />`}
            ${level.paths.map((path) => {
                const points = path.waypoints
                    .map((point) => `${point.x * scale},${point.y * scale}`)
                    .join(' ');

                return svg`
                    <polyline
                        points="${points}"
                        fill="none"
                        stroke="#cfc6b0"
                        stroke-width="${path.widthPx * scale}"
                        stroke-linejoin="round"
                    />
                    ${(path.chutes ?? []).map((chute) => {
                        const spot = getPositionAlongPath(path, chute.distancePx);

                        return svg`<circle cx="${spot.x * scale}" cy="${spot.y * scale}" r="6" fill="#e07b3f" stroke="#2b1a12" stroke-width="1.5" />`;
                    })}
                `;
            })}
            ${svg`<rect
                x="${(level.restaurant.x - level.restaurant.sizePx / 2) * scale}"
                y="${(level.restaurant.y - level.restaurant.sizePx / 2) * scale}"
                width="${restaurantSize}"
                height="${restaurantSize}"
                fill="#b8472f"
                stroke="#2b1a12"
                stroke-width="2"
            />`}
        </svg>
    `;
}

/** A level card's record line for the selected mode: best score, stars and Mash Champ count. */
export function renderRecord(snapshot: HudSnapshot, levelId: string) {
    const record = getModeRecord(snapshot.records, levelId, snapshot.mode);

    if (!record.bestScore) {
        return html`
            <span class="record">No record yet</span>
        `;
    }

    return html`
        <span class="record">
            Best ${record.bestScore.toLocaleString('en-US')} · ${record.bestStars} ★ · 🏆
            ${record.champs}
        </span>
    `;
}

/** The top runs overall, or nothing before the first run. */
function renderHall(snapshot: HudSnapshot) {
    if (!snapshot.records.hall.length) {
        return nothing;
    }

    return html`
        <div class="hall">
            <div class="hall-title">Hall of Mash Champs</div>
            <div class="hall-list">
                ${snapshot.records.hall.map((entry, index) => {
                    return html`
                        <div class="hall-entry">
                            <div>
                                ${index + 1}. ${getLevel(entry.levelId).name} ·
                                ${entry.mode === 'campaign' ? 'Campaign' : 'Endless'}
                            </div>
                            <div>
                                ${entry.score.toLocaleString('en-US')} · ${starRow(entry.stars)} ·
                                ${toFormattedString(
                                    createFullDateInUserTimezone(entry.dateMs),
                                    'MMM d',
                                )}
                            </div>
                        </div>
                    `;
                })}
            </div>
        </div>
    `;
}

export const rules = [
    comboHintText,
    'Every tower mashes. The Knife cuts a short line straight across the belt. The late-game Laser is the aimable long line: aim it when you build it (scroll or [ ]) and it chops everything on that line, fast. Pots soften everything in range, so Mashers hit twice as hard.',
    `Potato varieties: ${potatoTraitLines.join(' ')}`,
    'Customers order dishes: top mashed potatoes by hand (Q W E R, then click) to fill them before the ticket runs out.',
    'Potatoes are judged the instant they arrive, so get them done done done first. Fully mashed ones make customers happy; the closer to done, the less they complain. Raw ones make them furious.',
    'Seagulls swoop in to steal potatoes. Your towers can knock them out.',
    'You start at zero stars with only the Knife. Serve quality mash to earn prestige: stars unlock new towers and upgrades. Poor potatoes (rubbery Microwave mash, raw or half-mashed ones, stolen ones, missed orders) cost stars, and towers lock again if you slip.',
    'The Microwave is fast and cheap, but rubbery potatoes cost you prestige.',
    'Towers wear out with use. Click one and press S to service it.',
    'Keep satisfaction above zero through every wave to become the Mash Champ.',
];

/** Controls reminder shown on the title and pause panels. */
export const controlsText =
    '1 / 2 / 3 or click a button to pick a tower · Q/W/E/R pick a topping · Click to build · Right click / Esc to cancel · P / Esc pause · F fast-forward speed · G fast-forward until the next income (volume sliders are in the pause menu) · R to restart after a run';

/** Full-screen title panel with how-to-play, shown while the run is `Ready`. */
export const HudTitle = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-title',
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
        }

        .panel {
            ${hudPanelStyles}
            border-radius: 28px;
            border-width: 6px;
            padding: 16px 48px;
            text-align: center;
            width: 1500px;
        }

        .title {
            color: var(--hud-oak);
            font-size: 60px;
            font-weight: 700;
        }

        .tagline {
            font-size: 32px;
            margin-bottom: 16px;
            opacity: 0.8;
        }

        .recipe {
            align-items: center;
            display: flex;
            font-size: 30px;
            gap: 24px;
            justify-content: center;
            margin-bottom: 16px;
            white-space: nowrap;
        }

        .chip {
            align-items: center;
            display: flex;
            gap: 12px;
        }

        .swatch {
            border: 3px solid var(--hud-bark);
            border-radius: 50%;
            box-sizing: border-box;
            height: 36px;
            width: 36px;
        }

        .rules {
            font-size: 24px;
            line-height: 1.2;
            margin-bottom: 10px;
        }

        .controls {
            font-size: 20px;
            margin-bottom: 12px;
            opacity: 0.8;
        }

        .levels {
            display: flex;
            gap: 24px;
            justify-content: center;
            margin-bottom: 12px;
        }

        .modes {
            display: flex;
            gap: 16px;
            justify-content: center;
            margin-bottom: 16px;
        }

        .mode {
            ${hudButtonStyles}
            font-size: 28px;
            font-weight: 700;
            padding: 8px 32px;
        }

        .mode.selected {
            ${hudSelectedStyles}
        }

        .level-card {
            ${hudButtonStyles}
            border-radius: 18px;
            display: flex;
            flex-direction: column;
            font-weight: 400;
            gap: 8px;
            padding: 12px;
            width: 340px;
        }

        .level-card.selected {
            ${hudSelectedStyles}
        }

        .level-name {
            color: var(--hud-oak);
            font-size: 30px;
            font-weight: 700;
        }

        .level-description {
            font-size: 20px;
            min-height: 52px;
            opacity: 0.85;
        }

        .preview {
            align-self: center;
            border-radius: 6px;
            margin-top: auto;
        }

        .record {
            color: var(--hud-bark);
            font-size: 22px;
            font-weight: 700;
        }

        .hall {
            margin-bottom: 12px;
        }

        .hall-title {
            color: var(--hud-oak);
            font-size: 24px;
            font-weight: 700;
        }

        .hall-list {
            display: flex;
            font-size: 18px;
            gap: 10px;
            justify-content: center;
        }

        .hall-entry {
            border: 3px solid var(--hud-bark);
            border-radius: 14px;
            line-height: 1.3;
            padding: 2px 8px;
            width: 290px;
        }

        .start {
            ${hudPrimaryButtonStyles}
        }
    `,
    render({inputs}) {
        /** Rooms use the lobby panel instead. */
        if (inputs.snapshot.status !== RunStatus.Ready || inputs.snapshot.session.roomName) {
            return html`
                ${nothing}
            `;
        }

        return html`
            <div class="layer">
                <div class="panel">
                    <div class="title">Colcannon Fodder</div>
                    <div class="tagline">A mashed potato tower defense</div>
                    <div class="recipe">
                        ${recipe.map((step, index) => {
                            const tower = towerTypes[step.towerType];

                            return html`
                                ${index > 0
                                    ? html`
                                          <span>→</span>
                                      `
                                    : nothing}
                                <span class="chip">
                                    <span class="swatch" style="background: ${tower.color}"></span>
                                    ${tower.label}: ${step.verb}
                                </span>
                            `;
                        })}
                    </div>
                    <div class="rules">
                        ${rules.map((rule) => {
                            return html`
                                <div>${rule}</div>
                            `;
                        })}
                    </div>
                    <div class="controls">${controlsText}</div>
                    <div class="modes">
                        ${(
                            [
                                'campaign',
                                'endless',
                            ] as const
                        ).map((mode) => {
                            return html`
                                <button
                                    ?disabled=${!inputs.snapshot.isHost}
                                    class="mode ${mode === inputs.snapshot.mode ? 'selected' : ''}"
                                    @click=${() => {
                                        inputs.actions.selectMode(mode);
                                    }}
                                >
                                    ${mode === 'campaign' ? 'Campaign' : 'Endless'}
                                </button>
                            `;
                        })}
                    </div>
                    <div class="levels">
                        ${getLevelsForPlayerCount(singleplayerCount).map((level) => {
                            return html`
                                <button
                                    ?disabled=${!inputs.snapshot.isHost}
                                    class="level-card ${level.levelId === inputs.snapshot.levelId
                                        ? 'selected'
                                        : ''}"
                                    @click=${() => {
                                        inputs.actions.selectLevel(level.levelId);
                                    }}
                                >
                                    <span class="level-name">${level.name}</span>
                                    <span class="level-description">${level.description}</span>
                                    ${renderRecord(inputs.snapshot, level.levelId)}
                                    ${renderLevelPreview(level)}
                                </button>
                            `;
                        })}
                    </div>
                    ${renderHall(inputs.snapshot)}
                    <button
                        class="start"
                        @click=${() => {
                            inputs.actions.beginRun();
                        }}
                    >
                        Start cooking (Space)
                    </button>
                </div>
            </div>
        `;
    },
});
