import {Graphics} from '@antha/graphics-2d';
import {Container, Text} from 'pixi.js';
import {
    addSoftShadow,
    cozyPalette,
    cozyShades,
    cozyStyle,
    drawCozyLine,
    drawCozyShape,
    ellipsePath,
    polyPath,
    roundRectPath,
} from '../art/cozy.js';
import {type RestaurantDefinition} from './level.js';

/** The cottage is drawn in a 220 px box and scaled to the level's `restaurant.sizePx`. */
const cottageBoxPx = 220;
const awningStripes = 8;

/** A little text label with a Bark outline, in the cozy font. */
export function createCozyText({
    text,
    fontSize,
    fill,
}: Readonly<{text: string; fontSize: number; fill: string}>): Text {
    const label = new Text({
        text,
        style: {
            fill,
            fontSize,
            fontFamily: cozyStyle.fontFamily,
            fontWeight: cozyStyle.fontWeight,
            stroke: {
                color: cozyPalette.bark,
                width: fontSize / 6,
                join: 'round',
            },
        },
    });

    label.anchor.set(0.5);

    return label;
}

/**
 * The cottage storefront: cream walls, a Tomato striped awning, a counter window with the heat lamp
 * glow, and a door. Static. Sits under the potatoes; the sign is separate (see
 * `createRestaurantSign`) so it can be drawn above them.
 */
export function createRestaurantBuilding(restaurant: Readonly<RestaurantDefinition>): Container {
    const container = new Container();
    const art = new Graphics();

    container.position.set(restaurant.x, restaurant.y);
    container.scale.set(restaurant.sizePx / cottageBoxPx);
    addSoftShadow(container, {
        width: 250,
        height: 40,
        offsetY: 104,
    });

    // walls
    drawCozyShape(art, {
        path: roundRectPath({
            x: -104,
            y: -60,
            width: 208,
            height: 164,
            radius: 6,
        }),
        fill: cozyPalette.cream,
    });
    // timber base strip
    drawCozyShape(art, {
        path: roundRectPath({
            x: -104,
            y: 88,
            width: 208,
            height: 16,
            radius: 4,
        }),
        fill: cozyPalette.caramel,
        outlineScale: 0.8,
    });

    // service window and heat lamp glow
    drawCozyShape(art, {
        path: roundRectPath({
            x: -92,
            y: -16,
            width: 118,
            height: 62,
            radius: 6,
        }),
        fill: cozyPalette.walnut,
        outlineScale: 0.9,
    });
    for (let layer = 0; layer < 5; layer++) {
        drawCozyShape(art, {
            path: ellipsePath({
                x: -33,
                y: 18,
                rx: 52 - layer * 9,
                ry: 26 - layer * 4,
            }),
            fill: layer < 3 ? cozyPalette.butter : cozyShades.lamp,
            alpha: 0.22,
            outline: false,
            highlight: false,
        });
    }
    // plate of mash on the counter
    drawCozyShape(art, {
        path: ellipsePath({
            x: -33,
            y: 34,
            rx: 22,
            ry: 6,
        }),
        fill: cozyPalette.stone,
        outlineScale: 0.6,
    });
    drawCozyShape(art, {
        path: ellipsePath({
            x: -33,
            y: 27,
            rx: 13,
            ry: 9,
        }),
        fill: cozyPalette.cream,
        outlineScale: 0.7,
    });
    // window frame shutters
    drawCozyShape(art, {
        path: roundRectPath({
            x: -98,
            y: -20,
            width: 6,
            height: 70,
            radius: 2,
        }),
        fill: cozyPalette.pine,
        outlineScale: 0.7,
    });
    drawCozyShape(art, {
        path: roundRectPath({
            x: 26,
            y: -20,
            width: 6,
            height: 70,
            radius: 2,
        }),
        fill: cozyPalette.pine,
        outlineScale: 0.7,
    });
    // counter
    drawCozyShape(art, {
        path: roundRectPath({
            x: -106,
            y: 44,
            width: 142,
            height: 14,
            radius: 4,
        }),
        fill: cozyPalette.toffee,
    });

    // door
    drawCozyShape(art, {
        path: roundRectPath({
            x: 50,
            y: 2,
            width: 46,
            height: 86,
            radius: 16,
        }),
        fill: cozyPalette.oak,
    });
    drawCozyShape(art, {
        path: roundRectPath({
            x: 58,
            y: 12,
            width: 30,
            height: 34,
            radius: 10,
        }),
        fill: cozyPalette.caramel,
        outlineScale: 0.6,
    });
    drawCozyShape(art, {
        path: ellipsePath({
            x: 88,
            y: 56,
            rx: 3.5,
            ry: 3.5,
        }),
        fill: cozyPalette.butter,
        outlineScale: 0.5,
        highlight: false,
    });

    // scalloped awning
    const stripeWidth = 208 / awningStripes;

    for (let stripe = 0; stripe < awningStripes; stripe++) {
        const left = -104 + stripe * stripeWidth;

        drawCozyShape(art, {
            path(graphics) {
                graphics
                    .moveTo(left, -62)
                    .lineTo(left + stripeWidth, -62)
                    .lineTo(left + stripeWidth, -42)
                    .arc(left + stripeWidth / 2, -42, stripeWidth / 2, 0, Math.PI)
                    .closePath();
            },
            fill: stripe % 2 ? cozyPalette.cream : cozyPalette.tomato,
            outlineScale: 0.9,
        });
    }
    // roof beam
    drawCozyShape(art, {
        path: roundRectPath({
            x: -114,
            y: -84,
            width: 228,
            height: 26,
            radius: 6,
        }),
        fill: cozyPalette.tomato,
    });
    drawCozyShape(art, {
        path: polyPath([
            [
                -114,
                -84,
            ],
            [
                -96,
                -100,
            ],
            [
                96,
                -100,
            ],
            [
                114,
                -84,
            ],
        ]),
        fill: cozyPalette.walnut,
    });
    // little chimney curl of steam from the lamp
    drawCozyLine(art, {
        path(graphics) {
            graphics.moveTo(-40, 8).bezierCurveTo(-36, -2, -30, 2, -33, -10);
        },
        color: cozyPalette.cream,
        width: 3,
        alpha: 0.5,
    });

    container.addChild(art);

    return container;
}

/**
 * The hanging `RESTAURANT` sign, mounted on the roof. A separate display object so the entity that
 * owns it can sit at a high zIndex and always draw above potatoes.
 */
export function createRestaurantSign(restaurant: Readonly<RestaurantDefinition>): Container {
    const container = new Container();
    const art = new Graphics();
    const width = 290;
    const height = 52;
    const scale = restaurant.sizePx / cottageBoxPx;
    // The board sits across the roof beam rather than floating above it, so it stays clear of
    // belts that run past the top of the restaurant.
    const hangY = -58 * scale;

    container.position.set(restaurant.x, restaurant.y);

    addSoftShadow(container, {
        width: width * 0.9,
        height: 20,
        offsetY: hangY + 6,
    });
    drawCozyShape(art, {
        path: roundRectPath({
            x: -width / 2,
            y: hangY - height - 4,
            width,
            height,
            radius: 10,
        }),
        fill: cozyPalette.oak,
    });
    drawCozyShape(art, {
        path: roundRectPath({
            x: -width / 2 + 8,
            y: hangY - height + 4,
            width: width - 16,
            height: height - 16,
            radius: 6,
        }),
        fill: cozyPalette.walnut,
        outlineScale: 0.5,
        highlight: false,
    });
    container.addChild(art);

    const label = createCozyText({
        text: 'RESTAURANT',
        fontSize: 40,
        fill: cozyPalette.cream,
    });

    label.position.set(0, hangY - height / 2 - 4);
    container.addChild(label);

    return container;
}
