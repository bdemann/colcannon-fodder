import {type ModExecuteParams} from '@antha/engine';
import {defineShape} from 'object-shape-tester';
import {potatoSizeConfig, seagullConfig, waveConfig} from '../config/game-config.js';
import {defineLogicEntity} from '../game-state/game-entity.mod.js';
import {createNoToppings} from '../order/topping.js';
import {advanceWaves, getSeagullIntervalMs} from '../run/waves.js';
import {pickSeagullEntry} from '../seagull/seagull-logic.js';
import {SeagullEntity, seagullPhases} from '../seagull/seagull.entity.js';
import {pickPotatoSize} from './potato-size.js';
import {PotatoEntity} from './potato.entity.js';

/**
 * Logic-only entity that runs the wave state machine (`advanceWaves`) and releases one potato per
 * path for every spawn it returns.
 */
export class PotatoSpawnerEntity extends defineLogicEntity({
    key: 'PotatoSpawnerEntity',
    paramsShape: defineShape({
        msUntilNextSpawn: 0,
    }),
}) {
    public override async update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        const {runState, level} = this.state;

        const spawns = advanceWaves(runState, this.params, msSinceLastExecute);

        for (const spawn of spawns) {
            for (const path of level.paths) {
                const start = path.waypoints[0];

                if (!start) {
                    continue;
                }

                const size = pickPotatoSize(spawn.sizeWeights, this.state.seededRandom.next());
                const mashHp = potatoSizeConfig[size].mashHp;

                await this.addEntity(PotatoEntity, {
                    x: start.x,
                    y: start.y,
                    pathId: path.pathId,
                    distancePx: 0,
                    size,
                    cut: false,
                    cooked: false,
                    mashHp,
                    maxMashHp: mashHp,
                    served: false,
                    carriedBySeagull: false,
                    quality: 100,
                    timesSentBack: 0,
                    lastSwipedAtMs: -1,
                    potatoId: runState.nextPotatoId,
                    ...createNoToppings(),
                });
                runState.nextPotatoId++;
                runState.potatoesSpawned++;
            }
        }

        await this.spawnSeagulls(msSinceLastExecute);
    }

    /** Releases the current wave's gulls, spread evenly through the wave. */
    protected async spawnSeagulls(msSinceLastExecute: number) {
        const {runState} = this.state;
        const wave = waveConfig.waves[runState.waveIndex];
        if (runState.wavePhase !== 'spawning' || !wave) {
            return;
        }

        runState.msUntilNextSeagull -= msSinceLastExecute;
        if (
            runState.msUntilNextSeagull > 0 ||
            runState.seagullsSpawnedInWave >= wave.seagullCount
        ) {
            return;
        }

        const entry = pickSeagullEntry({
            rollEdge: this.state.seededRandom.next(),
            rollAlong: this.state.seededRandom.next(),
        });
        await this.addEntity(SeagullEntity, {
            x: entry.x,
            y: entry.y,
            flying: this.state.seededRandom.next() < seagullConfig.flyChance,
            hp: seagullConfig.hp,
            phase: seagullPhases.approach,
            targetPotatoId: 0,
            carryingPotatoId: 0,
            escapeX: 0,
            escapeY: 0,
        });
        runState.seagullsSpawnedInWave++;
        runState.msUntilNextSeagull = getSeagullIntervalMs(wave);
    }
}
