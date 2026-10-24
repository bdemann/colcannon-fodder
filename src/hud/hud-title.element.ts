import {css, defineElement, html, nothing} from 'element-vir';
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

export const rules = [
    'Every tower mashes. Knives cut so every hit lands harder; pots soften everything in range so mashers hit twice as hard.',
    'Customers order dishes: top mashed potatoes by hand (Q W E R, then click) to fill them before the ticket runs out.',
    'Fully mashed potatoes make customers happy; the closer to done, the less they complain. Raw ones make them furious.',
    'Seagulls swoop in to steal potatoes. Your towers can knock them out.',
    'The Microwave is fast and cheap, but rubbery potatoes hurt your prestige.',
    'Keep satisfaction above zero through every wave to become the Mash Champ.',
];

/** Controls reminder shown on the title and pause panels. */
export const controlsText =
    '1 / 2 / 3 or click a button to pick a tower · Q/W/E/R pick a topping · Click to build · Right click / Esc to cancel · P / Esc pause · R to restart after a run';

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
            padding: 48px;
            text-align: center;
            width: 1500px;
        }

        .title {
            color: #ffd700;
            font-size: 88px;
            font-weight: bold;
        }

        .tagline {
            font-size: 32px;
            margin-bottom: 32px;
            opacity: 0.8;
        }

        .recipe {
            align-items: center;
            display: flex;
            font-size: 30px;
            gap: 24px;
            justify-content: center;
            margin-bottom: 32px;
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
            font-size: 28px;
            line-height: 1.5;
            margin-bottom: 32px;
        }

        .controls {
            font-size: 24px;
            margin-bottom: 40px;
            opacity: 0.8;
        }

        button {
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
                    <button
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
