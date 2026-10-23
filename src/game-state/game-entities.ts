import {type Entity2dConstructor} from '@antha/entity-2d';
import {LevelEntity} from '../level/level.entity.js';
import {PotatoSpawnerEntity} from '../potato/potato-spawner.entity.js';
import {PotatoEntity} from '../potato/potato.entity.js';
import {TowerEntity} from '../tower/tower.entity.js';

/**
 * Every entity class in the game. Add new entity classes here: this list is used for asset loading
 * and for rebuilding entities from a co-op state sync.
 */
export const gameEntities: Entity2dConstructor[] = [
    LevelEntity,
    PotatoEntity,
    PotatoSpawnerEntity,
    TowerEntity,
];
