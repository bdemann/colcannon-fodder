import {type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {Container} from 'pixi.js';
import {
    addSoftShadow,
    cozyPalette,
    cozyShades,
    cozyStyle,
    drawCozyShape,
    ellipsePath,
    roundRectPath,
} from '../art/cozy.js';
import {meadowConfig} from '../config/game-config.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {gameWorldSize} from '../game-state/game-world.js';
import {type PathDefinition} from './level.js';
import {createCozyText, createRestaurantBuilding} from './restaurant-art.js';

/** Colors of the playfield, all from the cozy palette. */
export const levelColors = {
    grass: cozyPalette.grass,
    grassTuft: cozyShades.grassDark,
    grassTuftLight: cozyPalette.meadow,
    beltRail: cozyPalette.oak,
    beltRailDark: cozyPalette.walnut,
    belt: cozyPalette.stone,
    beltStripe: cozyShades.beltStripe,
    outline: cozyPalette.bark,
} as const;

const flowerColors = [
    cozyPalette.cream,
    cozyPalette.butter,
    cozyPalette.tomato,
    cozyPalette.pumpkin,
] as const;

/** Small deterministic hash of a string, so each level gets its own (repeatable) meadow. */
function hashString(text: string): number {
    let hash = 2_166_136_261;

    for (const character of text) {
        hash = Math.imul(hash ^ Number(character.codePointAt(0)), 16_777_619);
    }

    return hash >>> 0;
}

/** Park-Miller generator seeded from a number. Pure, so the meadow never changes between runs. */
function createSeededRandom(seed: number) {
    let state = (seed % 2_147_483_646) + 1;

    return () => {
        state = (state * 16_807) % 2_147_483_647;

        return (state - 1) / 2_147_483_646;
    };
}

/** Sparse darker (and a few lighter) tufts plus a handful of flowers on top of the grass base. */
function drawMeadow(ground: Graphics, levelId: string) {
    const random = createSeededRandom(hashString(levelId));
    const {tuftCount, flowerCount} = meadowConfig;

    for (let index = 0; index < tuftCount; index++) {
        const x = random() * gameWorldSize.width;
        const y = random() * gameWorldSize.height;
        const color = random() < 0.65 ? levelColors.grassTuft : levelColors.grassTuftLight;

        ground
            .moveTo(x, y)
            .lineTo(x - 5, y - 15)
            .moveTo(x, y)
            .lineTo(x + 2, y - 18)
            .moveTo(x, y)
            .lineTo(x + 8, y - 13)
            .stroke({
                color,
                width: 3.5,
                cap: 'round',
                join: 'round',
            });
    }

    for (let index = 0; index < flowerCount; index++) {
        const x = random() * gameWorldSize.width;
        const y = random() * gameWorldSize.height;
        const color = flowerColors[Math.floor(random() * flowerColors.length)] ?? flowerColors[0];

        ground
            .moveTo(x, y)
            .lineTo(x, y + 12)
            .stroke({
                color: cozyPalette.moss,
                width: 3,
                cap: 'round',
            });

        for (let petal = 0; petal < 5; petal++) {
            const angle = (petal / 5) * Math.PI * 2;

            ground.circle(x + Math.cos(angle) * 6, y + Math.sin(angle) * 6, 4.5).fill({
                color,
            });
        }

        ground.circle(x, y, 4).fill({
            color: cozyPalette.butter,
        });
        ground.circle(x, y, 4).stroke({
            color: cozyPalette.bark,
            width: 1.2,
        });
    }
}

/** Strokes the path's center line with the given color and width. */
function strokePath({
    ground,
    path,
    color,
    width,
}: Readonly<{ground: Graphics; path: Readonly<PathDefinition>; color: string; width: number}>) {
    const [
        first,
        ...rest
    ] = path.waypoints;

    if (!first) {
        return;
    }

    ground.moveTo(first.x, first.y);
    rest.forEach((point) => ground.lineTo(point.x, point.y));
    ground.stroke({
        color,
        width,
        cap: 'round',
        join: 'round',
    });
}

/** The wooden rails and the stone surface (stripes are drawn by `BeltEntity`). */
function drawBelt(ground: Graphics, path: Readonly<PathDefinition>) {
    const frameWidth = path.widthPx + 14;
    const outline = cozyStyle.outlineWidth * 2;

    // drop shadow, then Bark outline, wooden frame and a darker inner lip
    const shadowPath = {
        ...path,
        waypoints: path.waypoints.map((point) => {
            return {
                x: point.x,
                y: point.y + cozyStyle.shadow.offsetY,
            };
        }),
    };

    strokePath({
        ground,
        path: shadowPath,
        color: 'rgba(43,26,18,0.3)',
        width: frameWidth + outline,
    });
    strokePath({
        ground,
        path,
        color: levelColors.outline,
        width: frameWidth + outline,
    });
    strokePath({
        ground,
        path,
        color: levelColors.beltRail,
        width: frameWidth,
    });
    strokePath({
        ground,
        path,
        color: levelColors.beltRailDark,
        width: path.widthPx + 4,
    });
    strokePath({
        ground,
        path,
        color: levelColors.outline,
        width: path.widthPx + 1,
    });
    strokePath({
        ground,
        path,
        color: levelColors.belt,
        width: path.widthPx - 2,
    });
}

/** A barn door where potatoes come in, half hidden by the screen edge. */
function drawSpawnMarker(view: Container, path: Readonly<PathDefinition>) {
    const first = path.waypoints[0];

    if (!first) {
        return;
    }

    const half = path.widthPx * 0.62;
    const art = new Graphics();
    const door = new Container();

    door.position.set(first.x, first.y);
    addSoftShadow(door, {
        width: 90,
        height: 20,
        offsetY: half + 4,
        offsetX: 20,
    });
    drawCozyShape(art, {
        path: roundRectPath({
            x: -34,
            y: -half - 10,
            width: 92,
            height: half * 2 + 20,
            radius: 8,
        }),
        fill: cozyPalette.walnut,
    });
    drawCozyShape(art, {
        path: roundRectPath({
            x: -24,
            y: -half,
            width: 72,
            height: half * 2,
            radius: 5,
        }),
        fill: cozyPalette.caramel,
        outlineScale: 0.7,
    });
    // plank seams and the cross brace
    for (const brace of [
        [
            -24,
            -half,
            48,
            half,
        ],
        [
            -24,
            half,
            48,
            -half,
        ],
    ] as const) {
        art.moveTo(brace[0], brace[1]).lineTo(brace[2], brace[3]).stroke({
            color: cozyPalette.walnut,
            width: 7,
            cap: 'round',
        });
    }
    art.moveTo(12, -half).lineTo(12, half).stroke({
        color: cozyPalette.bark,
        width: 2.5,
    });
    drawCozyShape(art, {
        path: ellipsePath({
            x: 38,
            y: 0,
            rx: 4,
            ry: 4,
        }),
        fill: cozyPalette.butter,
        outlineScale: 0.5,
        highlight: false,
    });
    door.addChild(art);
    view.addChild(door);

    const label = createCozyText({
        text: 'POTATOES',
        fontSize: 24,
        fill: cozyPalette.cream,
    });

    label.anchor.set(0, 1);
    label.position.set(first.x + 8, first.y - path.widthPx / 2 - 18);
    view.addChild(label);
}

/**
 * Draws the static playfield in the Cozy Farmhouse style: meadow, the wooden belt frame and
 * surface, each path's barn-door spawn marker, and the cottage restaurant. Reads the level from
 * `state.level`. Added first in a run so it renders underneath everything. The restaurant sign is
 * `RestaurantSignEntity`, which draws above potatoes.
 */
export class LevelEntity extends defineEntity({
    key: 'LevelEntity',
}) {
    public override createView(): ViewCreation2d {
        const {level} = this.state;
        const view = new Container({
            zIndex: -1,
        });
        const ground = new Graphics().rect(0, 0, gameWorldSize.width, gameWorldSize.height).fill({
            color: levelColors.grass,
        });

        drawMeadow(ground, level.levelId);
        level.paths.forEach((path) => drawBelt(ground, path));
        view.addChild(ground);

        level.paths.forEach((path) => drawSpawnMarker(view, path));
        view.addChild(createRestaurantBuilding(level.restaurant));

        return {
            view,
        };
    }

    public override update() {}
}
