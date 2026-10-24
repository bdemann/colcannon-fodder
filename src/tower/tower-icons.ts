import {Graphics} from '@antha/graphics-2d';
import {Rectangle, type Renderer} from 'pixi.js';
import {drawTower} from './tower-art.js';
import {TowerType} from './tower-type.js';

/** Icon size in px, and the sharpness it is rendered at. */
const iconFramePx = 100;
const iconResolution = 2;
/** The Swiper arm is drawn short in its icon. */
const iconRangePx = 50;

const icons = new Map<TowerType, string>();
let started = false;

/** The toolbar icon (a PNG data URL) for a tower type, once `ensureTowerIcons` has finished. */
export function getTowerIcon(towerType: TowerType): string | undefined {
    return icons.get(towerType);
}

/** Whether all the icons have been rendered. */
export function hasTowerIcons(): boolean {
    return icons.size === Object.values(TowerType).length;
}

/**
 * Renders each tower's idle drawing once to a PNG data URL, for the HUD toolbar buttons. Safe to
 * call every tick: only the first call does any work.
 */
export function ensureTowerIcons(renderer: Renderer): void {
    if (started) {
        return;
    }
    started = true;

    for (const towerType of Object.values(TowerType)) {
        const art = new Graphics();
        drawTower(art, {
            towerType,
            attack: -1,
            timeSec: 0.3,
            aimX: 0,
            aimY: 0,
            rangePx: iconRangePx,
            swiperAngle: -0.6,
        });
        renderer.extract
            .base64({
                target: art,
                frame: new Rectangle(-iconFramePx / 2, -iconFramePx / 2, iconFramePx, iconFramePx),
                resolution: iconResolution,
            })
            .then((url) => {
                icons.set(towerType, url);
                art.destroy();
            })
            .catch(() => {
                started = false;
            });
    }
}
