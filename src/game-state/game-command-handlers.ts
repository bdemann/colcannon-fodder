import {type MultiplayerFramePacket} from '@antha/multiplayer-p2p-lock-step';
import {type MaybePromise} from '@augment-vir/common';
import {economyConfig, getPotatoesPerRun} from '../config/game-config.js';
import {BeltEntity} from '../level/belt.entity.js';
import {LevelEntity} from '../level/level.entity.js';
import {OrderBoardEntity} from '../order/order-board.entity.js';
import {canApplyTopping} from '../order/toppings.js';
import {PotatoSpawnerEntity} from '../potato/potato-spawner.entity.js';
import {PotatoEntity} from '../potato/potato.entity.js';
import {createInitialRunState, RunStatus} from '../run/run-state.js';
import {canAfford, canPlaceTower} from '../tower/tower-placement.js';
import {TowerEntity} from '../tower/tower.entity.js';
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
        state.runState = createInitialRunState();

        if (detail.packet.ready) {
            state.runState.status = RunStatus.Ready;
        }

        await state.entityStore.addEntity(LevelEntity);
        await state.entityStore.addEntity(BeltEntity);
        state.runState.potatoesPerRun = getPotatoesPerRun(state.level?.paths.length ?? 0);
        await state.entityStore.addEntity(PotatoSpawnerEntity, {
            msUntilNextSpawn: 0,
        });
        await state.entityStore.addEntity(OrderBoardEntity, {});
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
            ownerSlot: getCommandSlot(),
            cooldownRemainingMs: 0,
            lastProcessedAtMs: -1,
            lastTargetX: 0,
            lastTargetY: 0,
        });
    },
    [GameCommandType.TogglePause]({state}) {
        if (state.runState?.status === RunStatus.Playing) {
            state.runState.paused = !state.runState.paused;
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
                    canApplyTopping(potato.params, packet.topping)
                ) {
                    potato.params[packet.topping] = true;
                }
                return;
            }
        }
    },
};
