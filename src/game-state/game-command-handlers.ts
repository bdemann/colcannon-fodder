import {type MultiplayerFramePacket} from '@antha/multiplayer-p2p-lock-step';
import {SeededRandom, type MaybePromise} from '@augment-vir/common';
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
import {createInitialRunState, getSlotForClient, isCoopRun, RunStatus} from '../run/run-state.js';
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
 * The player slot that sent a command, from the synced `slotByClientId` map. Singleplayer (empty
 * map) and unknown clients are slot 0.
 */
export function getCommandSlot(
    state: Partial<FullGameState>,
    sourceClientId: string | undefined,
): number {
    return getSlotForClient(state.runState, sourceClientId);
}

function getDefaultSlotName(slot: number): string {
    return `Player ${slot + 1}`;
}

/** Restores `state.level` from `state.runState.levelId`, e.g. after a state sync. */
export function syncLevelWithRunState(state: Partial<FullGameState>) {
    if (state.runState) {
        state.level = getLevel(state.runState.levelId);
    }
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
            /** In co-op only the host (slot 0) can restart or change the level. */
        } else if (
            isCoopRun(state.runState) &&
            getCommandSlot(state, detail.sourceClientId) !== 0
        ) {
            return;
        }

        state.entityStore.destroyAllEntities();
        const level = getLevel(detail.packet.levelId);
        state.level = level;
        state.seededRandom = SeededRandom.fromSeed(detail.packet.seed);
        state.runState = createInitialRunState(level.levelId, detail.packet.mode);
        /** The host's own client starts the run and always owns slot 0. */
        state.runState.slotByClientId[detail.sourceClientId] = 0;
        state.runState.slotNames[0] = getDefaultSlotName(0);
        state.runState.connected[0] = true;

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
            clumpPathId: '',
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

        const slot = getCommandSlot(state, detail.sourceClientId);
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
                slot,
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
            ownerSlot: slot,
            cooldownRemainingMs: 0,
            lastProcessedAtMs: -1,
            lastTargetX: 0,
            lastTargetY: 0,
            angleDeg: packet.angleDeg ?? 0,
            wear: 0,
        });
        state.runState.nextTowerId++;
    },
    [GameCommandType.JoinRun]({detail, state}) {
        const {runState} = state;

        if (!runState) {
            return;
        }

        const existingSlot = runState.slotByClientId[detail.sourceClientId];

        if (existingSlot != undefined) {
            runState.connected[existingSlot] = true;
            return;
        }

        const takenSlots = new Set(Object.values(runState.slotByClientId));
        /** Reclaiming: the lowest disconnected slot comes before any brand new slot. */
        const reclaimedSlot = [...takenSlots]
            .filter((slot) => runState.connected[slot] === false)
            .sort((a, b) => a - b)[0];
        let slot = reclaimedSlot;

        if (slot == undefined) {
            slot = 0;
            while (takenSlots.has(slot)) {
                slot++;
            }
        } else {
            for (const [
                clientId,
                clientSlot,
            ] of Object.entries(runState.slotByClientId)) {
                if (clientSlot === slot) {
                    delete runState.slotByClientId[clientId];
                }
            }
        }

        runState.slotByClientId[detail.sourceClientId] = slot;
        runState.slotNames[slot] = detail.packet.name || getDefaultSlotName(slot);
        runState.connected[slot] = true;
        runState.scoreBySlot[slot] ??= 0;

        /** Fast-forward is disabled in co-op, so drop any speed set before the second player joined. */
        if (isCoopRun(runState)) {
            runState.speed = 1;
            runState.resetSpeedOnIncome = false;
        }
    },
    [GameCommandType.LeaveRun]({detail, state}) {
        const slot = state.runState?.slotByClientId[detail.packet.clientId];

        if (state.runState && slot != undefined) {
            state.runState.connected[slot] = false;
        }
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
    [GameCommandType.TogglePause]({detail, state}) {
        if (state.runState?.status !== RunStatus.Playing) {
            return;
        }

        const slot = getCommandSlot(state, detail.sourceClientId);

        if (state.runState.paused) {
            /** Only the pauser or the host can resume. */
            if (slot === state.runState.pausedBySlot || slot === 0) {
                state.runState.paused = false;
                state.runState.pausedBySlot = undefined;
            }
        } else {
            state.runState.paused = true;
            state.runState.pausedBySlot = slot;
        }
    },
    [GameCommandType.SetSpeed]({detail, state}) {
        if (
            state.runState?.status === RunStatus.Playing &&
            !isCoopRun(state.runState) &&
            isAllowedSpeed(detail.packet.speed)
        ) {
            state.runState.speed = detail.packet.speed;
        }
    },
    [GameCommandType.ArmSpeedReset]({state}) {
        if (state.runState?.status === RunStatus.Playing && !isCoopRun(state.runState)) {
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
