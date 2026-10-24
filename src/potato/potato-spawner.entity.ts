import {type ModExecuteParams} from '@antha/engine';
import {defineShape} from 'object-shape-tester';
import {getBossHp} from '../config/boss-config.js';
import {chuteConfig, potatoSizeConfig, seagullConfig, waveConfig} from '../config/game-config.js';
import {spawnConfig} from '../config/spawn-config.js';
import {defineLogicEntity} from '../game-state/game-entity.mod.js';
import {pickChute} from '../level/chute.js';
import {getPositionAlongPath, type PathDefinition} from '../level/level.js';
import {createNoToppings} from '../order/topping.js';
import {getClumpExtraCount, shouldSpawnExtra} from '../run/spawn-variety.js';
import {advanceWaves, getSeagullIntervalMs} from '../run/waves.js';
import {pickSeagullEntry} from '../seagull/seagull-logic.js';
import {SeagullEntity, seagullPhases} from '../seagull/seagull.entity.js';
import {pickPotatoSize, PotatoSize, type PotatoSizeWeights} from './potato-size.js';
import {PotatoEntity} from './potato.entity.js';

/**
 * Logic-only entity that runs the wave state machine (`advanceWaves`) and releases one potato per
 * path for every spawn it returns.
 */
export class PotatoSpawnerEntity extends defineLogicEntity({
    key: 'PotatoSpawnerEntity',
    paramsShape: defineShape({
        msUntilNextSpawn: 0,
        /** Clump potatoes still to release (per path), `clumpGapMs` apart. */
        pendingClumpSpawns: 0,
        msUntilClumpSpawn: 0,
        /** Index of the wave whose size odds the queued clump uses. */
        clumpWaveIndex: 0,
    }),
}) {
    public override async update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        const {runState, level} = this.state;

        // Read before advancing: the last spawn of a wave moves the phase on.
        const spawningWave =
            runState.wavePhase === 'spawning' ? waveConfig.waves[runState.waveIndex] : undefined;

        const spawns = advanceWaves(runState, this.params, msSinceLastExecute);

        for (const spawn of spawns) {
            for (const path of level.paths) {
                await this.spawnPotato(path, spawn);

                for (let bossIndex = 0; bossIndex < spawn.bossCount; bossIndex++) {
                    await this.spawnBoss(path, getBossHp(bossIndex));
                }
            }

            if (spawn.bossCount > 0) {
                runState.lastBossSpawnAtMs = runState.elapsedMs;
            }

            if (spawningWave && spawningWave.clumpChance > 0) {
                const extra = getClumpExtraCount({
                    wave: spawningWave,
                    chanceRoll: this.state.seededRandom.next(),
                    sizeRoll: this.state.seededRandom.next(),
                });
                if (extra > 0) {
                    if (this.params.pendingClumpSpawns === 0) {
                        this.params.msUntilClumpSpawn = spawnConfig.clumpGapMs;
                    }
                    this.params.pendingClumpSpawns += extra;
                    this.params.clumpWaveIndex = waveConfig.waves.indexOf(spawningWave);
                    runState.potatoesPending += extra * level.paths.length;
                }
            }
        }

        if (
            spawningWave &&
            spawningWave.extraSpawnsPerSecond > 0 &&
            shouldSpawnExtra({
                wave: spawningWave,
                msElapsed: msSinceLastExecute,
                roll: this.state.seededRandom.next(),
            })
        ) {
            for (const path of level.paths) {
                await this.spawnPotato(path, spawningWave);
            }
        }

        await this.releaseClumpSpawns(msSinceLastExecute);
        await this.spawnSeagulls(msSinceLastExecute);
    }

    /** Releases queued clump potatoes, one per path every `clumpGapMs`. */
    protected async releaseClumpSpawns(msSinceLastExecute: number) {
        const {runState, level} = this.state;
        const wave = waveConfig.waves[this.params.clumpWaveIndex];
        if (this.params.pendingClumpSpawns <= 0 || !wave) {
            return;
        }

        this.params.msUntilClumpSpawn -= msSinceLastExecute;
        while (this.params.msUntilClumpSpawn <= 0 && this.params.pendingClumpSpawns > 0) {
            for (const path of level.paths) {
                await this.spawnPotato(path, wave);
            }
            this.params.pendingClumpSpawns--;
            runState.potatoesPending -= level.paths.length;
            this.params.msUntilClumpSpawn += spawnConfig.clumpGapMs;
        }
    }

    /** Spawns one regular potato at the start of `path`, or at one of its chutes. */
    protected async spawnPotato(
        path: Readonly<PathDefinition>,
        spawn: Readonly<{sizeWeights: PotatoSizeWeights; chuteShare: number}>,
    ) {
        const {runState} = this.state;
        const start = path.waypoints[0];

        if (!start) {
            return;
        }

        const size = pickPotatoSize(spawn.sizeWeights, this.state.seededRandom.next());
        const mashHp = potatoSizeConfig[size].mashHp;
        // Only roll on paths with chutes, so other levels keep their random sequence.
        const chute = path.chutes?.length
            ? pickChute({
                  chutes: path.chutes,
                  chuteShare: spawn.chuteShare,
                  roll: this.state.seededRandom.next(),
              })
            : undefined;
        const spawnDistancePx = chute?.distancePx ?? 0;
        const spawnPosition = getPositionAlongPath(path, spawnDistancePx);

        await this.addEntity(PotatoEntity, {
            x: spawnPosition.x,
            y: spawnPosition.y,
            pathId: path.pathId,
            distancePx: spawnDistancePx,
            dropInMs: chute ? chuteConfig.dropMs : 0,
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
            lastHitDamage: 0,
            lastHitMultiplier: 1,
            lastHitAtMs: -1,
            lastHitTowerType: '',
            passWaitMs: 0,
            potatoId: runState.nextPotatoId,
            ...createNoToppings(),
        });
        runState.nextPotatoId++;
        runState.potatoesSpawned++;
    }

    /** Spawns the Russet King at the start of `path`. */
    protected async spawnBoss(path: Readonly<PathDefinition>, mashHp: number) {
        const {runState} = this.state;
        const start = path.waypoints[0];
        if (!start) {
            return;
        }

        await this.addEntity(PotatoEntity, {
            x: start.x,
            y: start.y,
            pathId: path.pathId,
            distancePx: 0,
            dropInMs: 0,
            size: PotatoSize.King,
            cut: false,
            cooked: false,
            mashHp,
            maxMashHp: mashHp,
            served: false,
            carriedBySeagull: false,
            quality: 100,
            timesSentBack: 0,
            lastSwipedAtMs: -1,
            lastHitDamage: 0,
            lastHitMultiplier: 1,
            lastHitAtMs: -1,
            lastHitTowerType: '',
            passWaitMs: 0,
            potatoId: runState.nextPotatoId,
            ...createNoToppings(),
        });
        runState.nextPotatoId++;
        runState.potatoesSpawned++;
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
            fed: false,
        });
        runState.seagullsSpawnedInWave++;
        runState.msUntilNextSeagull = getSeagullIntervalMs(wave);
    }
}
