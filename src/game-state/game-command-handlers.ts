import {type MultiplayerFramePacket} from '@antha/multiplayer-p2p-lock-step';
import {type MaybePromise} from '@augment-vir/common';
import {doorConfig} from '../config/door-config.js';
import {economyConfig} from '../config/game-config.js';
import {upgradeConfig} from '../config/upgrade-config.js';
import {PassLampEntity} from '../door/pass-lamp.entity.js';
import {PassEntity} from '../door/pass.entity.js';
import {BeltEntity} from '../level/belt.entity.js';
import {ChuteEntity} from '../level/chute.entity.js';
import {LevelEntity} from '../level/level.entity.js';
import {getPositionAlongPath} from '../level/level.js';
import {getLevel} from '../level/levels.js';
import {RestaurantSignEntity} from '../level/restaurant-sign.entity.js';
import {OrderBoardEntity} from '../order/order-board.entity.js';
import {canApplyTopping} from '../order/toppings.js';
import {PotatoSpawnerEntity} from '../potato/potato-spawner.entity.js';
import {PotatoEntity} from '../potato/potato.entity.js';
import {addCoins} from '../run/coins.js';
import {createInitialRunState, RunStatus} from '../run/run-state.js';
import {isAllowedSpeed} from '../run/speed.js';
import {canAfford, canPlaceTower} from '../tower/tower-placement.js';
import {getSellValue, getUpgradeCost, towerTypes} from '../tower/tower-type.js';
import {TowerEntity} from '../tower/tower.entity.js';
import {getServiceCost} from '../tower/wear.js';
import {GameCommandType, type GameCommand} from './game-command.js';
import {type FullGameState} from './game-state.js';

/** Parameters every command handler receives. `detail.sourceClientId` is who sent it. */
export type GameCommandHandlerParams<Type extends GameCommandType> = Readonly<{
    detail: Readonly<MultiplayerFramePacket<Extract<GameCommand, {type: Type}>>>;
    state: Partial<FullGameState>;
}>;

/**
 * The player slot that sent a command. Singleplayer is always slot 0. Co-op will take the command's
 * `detail.sourceClientId` and map it to that client's slot.
 */
export function getCommandSlot(): number {
    return 0;
}

/**
 * Applies commands to the simulation. Handlers run inside lockstep frames, so they may change
 * entities and `state.runState`, must only use `state.seededRandom` for randomness, and must never
 * read `state.ui`.
 */
export const gameCommandHandlers: {
    [Type in GameCommandType]: (params: GameCommandHandlerParams<Type>) => MaybePromise<void>;
} = {
    async [GameCommandType.StartRun]({detail, state}) {
        if (!state.entityStore) {
            throw new Error('Cannot start run: no entity store exists.');
        }

        state.entityStore.destroyAllEntities();
        const level = getLevel(detail.packet.levelId);
        state.level = level;
        state.runState = createInitialRunState(level.levelId, detail.packet.mode);

        if (detail.packet.ready) {
            state.runState.status = RunStatus.Ready;
        }

        await state.entityStore.addEntity(LevelEntity);
        await state.entityStore.addEntity(BeltEntity);
        await state.entityStore.addEntity(RestaurantSignEntity);
        for (const path of level.paths) {
            for (const chute of path.chutes ?? []) {
                await state.entityStore.addEntity(ChuteEntity, {
                    ...getPositionAlongPath(path, chute.distancePx),
                    pathId: path.pathId,
                    distancePx: chute.distancePx,
                    active: false,
                });
            }
        }
        await state.entityStore.addEntity(PotatoSpawnerEntity, {
            msUntilNextSpawn: 0,
            pendingClumpSpawns: 0,
            msUntilClumpSpawn: 0,
            clumpWaveIndex: 0,
        });
        await state.entityStore.addEntity(OrderBoardEntity, {});
        await state.entityStore.addEntity(PassEntity, {
            msUntilWaiter: doorConfig.waiterIntervalMs,
        });
        await state.entityStore.addEntity(PassLampEntity);
    },
    [GameCommandType.BeginRun]({state}) {
        if (state.runState?.status === RunStatus.Ready) {
            state.runState.status = RunStatus.Playing;
        }
    },
    async [GameCommandType.PlaceTower]({detail, state}) {
        const {packet} = detail;

        if (
            !state.entityStore ||
            !state.level ||
            state.runState?.status !== RunStatus.Playing ||
            state.runState.paused
        ) {
            return;
        }

        const towers = [...state.entityStore.getEntities(TowerEntity)].map((tower) => {
            return {
                x: tower.params.x,
                y: tower.params.y,
            };
        });

        if (
            !canAfford(state.runState.coins, packet.towerType) ||
            !canPlaceTower({
                level: state.level,
                towers,
                point: {
                    x: packet.x,
                    y: packet.y,
                },
            }).valid
        ) {
            return;
        }

        state.runState.coins -= economyConfig.towerCost[packet.towerType];

        await state.entityStore.addEntity(TowerEntity, {
            x: packet.x,
            y: packet.y,
            towerType: packet.towerType,
            towerId: state.runState.nextTowerId,
            level: 1,
            builtAtMs: state.runState.elapsedMs,
            ownerSlot: getCommandSlot(),
            cooldownRemainingMs: 0,
            lastProcessedAtMs: -1,
            lastTargetX: 0,
            lastTargetY: 0,
            angleDeg: packet.angleDeg ?? 0,
            wear: 0,
        });
        state.runState.nextTowerId++;
    },
    [GameCommandType.UpgradeTower]({detail, state}) {
        if (
            !state.entityStore ||
            state.runState?.status !== RunStatus.Playing ||
            state.runState.paused
        ) {
            return;
        }

        for (const tower of state.entityStore.getEntities(TowerEntity)) {
            if (tower.params.towerId !== detail.packet.towerId) {
                continue;
            }
            if (tower.params.level >= upgradeConfig.maxLevel) {
                return;
            }
            const cost = getUpgradeCost(tower.params.towerType, (tower.params.level + 1) as 2 | 3);
            if (state.runState.coins >= cost) {
                state.runState.coins -= cost;
                tower.params.level++;
            }
            return;
        }
    },
    [GameCommandType.SellTower]({detail, state}) {
        if (
            !state.entityStore ||
            state.runState?.status !== RunStatus.Playing ||
            state.runState.paused
        ) {
            return;
        }

        for (const tower of state.entityStore.getEntities(TowerEntity)) {
            if (tower.params.towerId === detail.packet.towerId) {
                addCoins(state.runState, {
                    amount: getSellValue(tower.params.towerType, tower.params.level),
                    reason: `Sold ${towerTypes[tower.params.towerType].label}`,
                    x: tower.params.x,
                    y: tower.params.y,
                });
                tower.destroy();
                // Destruction is deferred, so a second sale this frame must not find it again.
                tower.params.towerId = 0;
                return;
            }
        }
    },
    [GameCommandType.ServiceTower]({detail, state}) {
        if (
            !state.entityStore ||
            state.runState?.status !== RunStatus.Playing ||
            state.runState.paused
        ) {
            return;
        }

        for (const tower of state.entityStore.getEntities(TowerEntity)) {
            if (tower.params.towerId !== detail.packet.towerId) {
                continue;
            }
            const cost = getServiceCost(tower.params.towerType);
            if (tower.params.wear > 0 && state.runState.coins >= cost) {
                addCoins(state.runState, {
                    amount: -cost,
                    reason: `Serviced ${towerTypes[tower.params.towerType].label}`,
                    x: tower.params.x,
                    y: tower.params.y,
                });
                tower.params.wear = 0;
            }
            return;
        }
    },
    [GameCommandType.TogglePause]({state}) {
        if (state.runState?.status === RunStatus.Playing) {
            state.runState.paused = !state.runState.paused;
        }
    },
    [GameCommandType.SetSpeed]({detail, state}) {
        if (state.runState?.status === RunStatus.Playing && isAllowedSpeed(detail.packet.speed)) {
            state.runState.speed = detail.packet.speed;
        }
    },
    [GameCommandType.ArmSpeedReset]({state}) {
        if (state.runState?.status === RunStatus.Playing) {
            state.runState.resetSpeedOnIncome = true;
        }
    },
    [GameCommandType.ApplyTopping]({detail, state}) {
        const {packet} = detail;

        if (
            !state.entityStore ||
            state.runState?.status !== RunStatus.Playing ||
            state.runState.paused
        ) {
            return;
        }

        for (const potato of state.entityStore.getEntities(PotatoEntity)) {
            if (potato.params.potatoId === packet.potatoId) {
                if (
                    !potato.params.carriedBySeagull &&
                    potato.params.dropInMs <= 0 &&
                    canApplyTopping(potato.params, packet.topping)
                ) {
                    potato.params[packet.topping] = true;
                }
                return;
            }
        }
    },
};
