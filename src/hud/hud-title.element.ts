import {css, defineElement, html, nothing, svg} from 'element-vir';
import {gameWorldSize} from '../game-state/game-world.js';
import {getPositionAlongPath, type LevelDefinition} from '../level/level.js';
import {levels} from '../level/levels.js';
import {RunStatus} from '../run/run-state.js';
import {TowerType, towerTypes} from '../tower/tower-type.js';
import {type HudActions} from './hud-actions.js';
import {type HudSnapshot} from './hud-snapshot.js';

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
    'Combo: Knife cuts (×1.5) → Pot softens (×2 Masher) → Masher SMASH (×3)';

const previewSize = {
    width: 240,
    height: 135,
} as const;

/** A mini map of the level: the belt as a polyline, the restaurant square and chute dots. */
function renderLevelPreview(level: Readonly<LevelDefinition>) {
    const scale = previewSize.width / gameWorldSize.width;
    const restaurantSize = level.restaurant.sizePx * scale;

    return html`
        <svg
            class="preview"
            width=${previewSize.width}
            height=${previewSize.height}
            viewBox="0 0 ${previewSize.width} ${previewSize.height}"
        >
            ${svg`<rect width="${previewSize.width}" height="${previewSize.height}" fill="#5b8c3a" />`}
            ${level.paths.map((path) => {
                const points = path.waypoints
                    .map((point) => `${point.x * scale},${point.y * scale}`)
                    .join(' ');

                return svg`
                    <polyline
                        points="${points}"
                        fill="none"
                        stroke="#4a4a4a"
                        stroke-width="${path.widthPx * scale}"
                        stroke-linejoin="round"
                    />
                    ${(path.chutes ?? []).map((chute) => {
                        const spot = getPositionAlongPath(path, chute.distancePx);

                        return svg`<circle cx="${spot.x * scale}" cy="${spot.y * scale}" r="6" fill="#ff8c1a" stroke="#111" stroke-width="1.5" />`;
                    })}
                `;
            })}
            ${svg`<rect
                x="${(level.restaurant.x - level.restaurant.sizePx / 2) * scale}"
                y="${(level.restaurant.y - level.restaurant.sizePx / 2) * scale}"
                width="${restaurantSize}"
                height="${restaurantSize}"
                fill="#c0392b"
                stroke="#f5e6c8"
                stroke-width="2"
            />`}
        </svg>
    `;
}

export const rules = [
    comboHintText,
    'Every tower mashes. Knife: set its direction when you build it (scroll or [ ]); it chops everything on that line, fast; pots soften everything in range so mashers hit twice as hard.',
    'Customers order dishes: top mashed potatoes by hand (Q W E R, then click) to fill them before the ticket runs out.',
    'Fully mashed potatoes make customers happy; the closer to done, the less they complain. Raw ones make them furious.',
    'Seagulls swoop in to steal potatoes. Your towers can knock them out.',
    'The Microwave is fast and cheap, but rubbery potatoes hurt your prestige.',
    'Towers wear out with use. Click one and press S to service it.',
    'Keep satisfaction above zero through every wave to become the Mash Champ.',
];

/** Controls reminder shown on the title and pause panels. */
export const controlsText =
    '1 / 2 / 3 or click a button to pick a tower · Q/W/E/R pick a topping · Click to build · Right click / Esc to cancel · P / Esc pause (volume sliders are in the pause menu) · R to restart after a run';

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
            background: rgba(0, 0, 0, 0.55);
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
        }

        .panel {
            background: rgba(30, 20, 10, 0.95);
            border: 6px solid #f5e6c8;
            border-radius: 24px;
            box-sizing: border-box;
            padding: 28px 48px;
            text-align: center;
            width: 1500px;
        }

        .title {
            color: #ffd700;
            font-size: 72px;
            font-weight: bold;
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
            border: 3px solid white;
            border-radius: 50%;
            box-sizing: border-box;
            height: 36px;
            width: 36px;
        }

        .rules {
            font-size: 24px;
            line-height: 1.3;
            margin-bottom: 16px;
        }

        .controls {
            font-size: 20px;
            margin-bottom: 20px;
            opacity: 0.8;
        }

        .levels {
            display: flex;
            gap: 24px;
            justify-content: center;
            margin-bottom: 20px;
        }

        .level-card {
            background: rgba(255, 255, 255, 0.06);
            border: 5px solid transparent;
            border-radius: 16px;
            color: inherit;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            font: inherit;
            font-weight: normal;
            gap: 8px;
            padding: 12px;
            width: 340px;
        }

        .level-card.selected {
            border-color: #ffd700;
        }

        .level-name {
            color: #ffd700;
            font-size: 30px;
            font-weight: bold;
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

        .start {
            background: #ffd700;
            border: none;
            border-radius: 12px;
            color: #1a1a1a;
            cursor: pointer;
            font-size: 36px;
            font-weight: bold;
            padding: 16px 48px;
        }
    `,
    render({inputs}) {
        if (inputs.snapshot.status !== RunStatus.Ready) {
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
                    <div class="levels">
                        ${levels.map((level) => {
                            return html`
                                <button
                                    class="level-card ${level.levelId === inputs.snapshot.levelId
                                        ? 'selected'
                                        : ''}"
                                    @click=${() => {
                                        inputs.actions.selectLevel(level.levelId);
                                    }}
                                >
                                    <span class="level-name">${level.name}</span>
                                    <span class="level-description">${level.description}</span>
                                    ${renderLevelPreview(level)}
                                </button>
                            `;
                        })}
                    </div>
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
