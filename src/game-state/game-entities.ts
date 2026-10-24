import {type Entity2dConstructor} from '@antha/entity-2d';
import {PassLampEntity} from '../door/pass-lamp.entity.js';
import {PassEntity} from '../door/pass.entity.js';
import {BeltEntity} from '../level/belt.entity.js';
import {ChuteEntity} from '../level/chute.entity.js';
import {LevelEntity} from '../level/level.entity.js';
import {RestaurantSignEntity} from '../level/restaurant-sign.entity.js';
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
    RestaurantSignEntity,
    ChuteEntity,
    PotatoEntity,
    PotatoSpawnerEntity,
    OrderBoardEntity,
    TowerEntity,
    SeagullEntity,
    PassEntity,
    PassLampEntity,
];
