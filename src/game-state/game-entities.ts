import {type Entity2dConstructor} from '@antha/entity-2d';
import {BeltEntity} from '../level/belt.entity.js';
import {LevelEntity} from '../level/level.entity.js';
import {OrderBoardEntity} from '../order/order-board.entity.js';
import {PotatoSpawnerEntity} from '../potato/potato-spawner.entity.js';
import {PotatoEntity} from '../potato/potato.entity.js';
import {SeagullEntity} from '../seagull/seagull.entity.js';
import {TowerEntity} from '../tower/tower.entity.js';

/**
 * Every entity class in the game. Add new entity classes here: this list is used for asset loading
 * and for rebuilding entities from a co-op state sync.
 */
export const gameEntities: Entity2dConstructor[] = [
    LevelEntity,
    BeltEntity,
    PotatoEntity,
    PotatoSpawnerEntity,
    OrderBoardEntity,
    TowerEntity,
    SeagullEntity,
];
