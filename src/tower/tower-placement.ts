import {type Coords} from '@augment-vir/common';
import {towerConfig} from '../config/game-config.js';
import {gameWorldSize} from '../game-state/game-world.js';
import {getDistanceToPath, type LevelDefinition} from '../level/level.js';
import {type TowerType} from './tower-type.js';

export type PlacementCheck =
    | {valid: true}
    | {
          valid: false;
          reason: string;
      };

/** Decides whether a tower may be built at a point. Checks run in a fixed order. */
export function canPlaceTower({
    level,
    towers,
    point,
}: Readonly<{
    level: Readonly<LevelDefinition>;
    /** Centers of the towers already built. */
    towers: ReadonlyArray<Readonly<Coords>>;
    point: Readonly<Coords>;
}>): PlacementCheck {
    const radius = towerConfig.radius;

    if (
        point.x < radius ||
        point.x > gameWorldSize.width - radius ||
        point.y < radius ||
        point.y > gameWorldSize.height - radius
    ) {
        return {
            valid: false,
            reason: 'Out of bounds',
        };
    } else if (
        level.paths.some((path) => getDistanceToPath(path, point) < path.widthPx / 2 + radius)
    ) {
        return {
            valid: false,
            reason: 'Too close to the path',
        };
    }

    const {restaurant} = level;
    const reach = restaurant.sizePx / 2 + radius;

    if (Math.abs(point.x - restaurant.x) < reach && Math.abs(point.y - restaurant.y) < reach) {
        return {
            valid: false,
            reason: 'On the restaurant',
        };
    } else if (
        towers.some((tower) => Math.hypot(tower.x - point.x, tower.y - point.y) < 2 * radius)
    ) {
        return {
            valid: false,
            reason: 'Too close to another tower',
        };
    } else {
        return {
            valid: true,
        };
    }
}

/** A built tower's range ring shows while placing, or while the pointer hovers the tower. */
export function shouldShowTowerRange({
    tower,
    pointerWorld,
    selectedTowerType,
}: Readonly<{
    tower: Readonly<Coords & {towerType: TowerType}>;
    pointerWorld: Readonly<Coords> | undefined;
    selectedTowerType: TowerType | undefined;
}>): boolean {
    /** While placing, show the coverage of towers of the same type as the one being placed. */
    if (selectedTowerType === tower.towerType) {
        return true;
    }
    return (
        !!pointerWorld &&
        Math.hypot(pointerWorld.x - tower.x, pointerWorld.y - tower.y) <= towerConfig.radius
    );
}
