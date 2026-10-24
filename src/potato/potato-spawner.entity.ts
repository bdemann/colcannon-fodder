import {type ModExecuteParams} from '@antha/engine';
import {defineShape} from 'object-shape-tester';
import {chuteConfig, potatoSizeConfig, seagullConfig} from '../config/game-config.js';
import {potatoVarietyConfig} from '../config/potato-variety-config.js';
import {spawnConfig} from '../config/spawn-config.js';
import {defineLogicEntity} from '../game-state/game-entity.mod.js';
import {getLaneOffset, getMaxLaneOffset} from '../level/belt-lane.js';
import {pickChute} from '../level/chute.js';
import {
    getPositionAlongPathWithOffset,
    pickSpawnPaths,
    type LevelDefinition,
    type PathDefinition,
} from '../level/level.js';
import {createNoToppings} from '../order/topping.js';
import {getWaveSettings} from '../run/endless.js';
import {getClumpExtraCount, shouldSpawnExtra} from '../run/spawn-variety.js';
import {advanceWaves, getSeagullIntervalMs} from '../run/waves.js';
import {refreshGullGrid} from '../seagull/gull-grid.js';
import {pickSeagullEntry} from '../seagull/seagull-logic.js';
import {SeagullEntity, seagullPhases} from '../seagull/seagull.entity.js';
import {TowerEntity} from '../tower/tower.entity.js';
import {pickPotatoSize, PotatoSize, type PotatoSizeWeights} from './potato-size.js';
import {pickPotatoVariety, PotatoVariety, type PotatoVarietyWeights} from './potato-variety.js';
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
        /** The one path a queued clump rides on a pick-one level; '' means every path. */
        clumpPathId: '',
        /** Potatoes in the queued clump, so they can be spread evenly across the belt. */
        clumpLaneCount: 0,
        /** How many of the queued clump are already released. */
        clumpLaneIndex: 0,
    }),
}) {
    public override async update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        const {runState, level} = this.state;

        refreshGullGrid({
            level,
            towers: [...this.state.entityStore.getEntities(TowerEntity)].map((tower) => {
                return {
                    x: tower.params.x,
                    y: tower.params.y,
                };
            }),
        });

        // Read before advancing: the last spawn of a wave moves the phase on.
        const spawningIndex = runState.waveIndex;
        const spawningWave =
            runState.wavePhase === 'spawning'
                ? getWaveSettings(runState, spawningIndex)
                : undefined;

        const spawns = advanceWaves(runState, this.params, msSinceLastExecute);

        for (const spawn of spawns) {
            const spawnPaths = pickSpawnPaths(level, this.pickRoll(level));

            for (const path of spawnPaths) {
                await this.spawnPotato(path, spawn);

                for (let bossIndex = 0; bossIndex < spawn.bossCount; bossIndex++) {
                    await this.spawnBoss(path, spawn.bossHp);
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
                    if (this.params.pendingClumpSpawns === 0) {
                        this.params.clumpLaneCount = 0;
                        this.params.clumpLaneIndex = 0;
                    }
                    this.params.clumpLaneCount += extra;
                    this.params.pendingClumpSpawns += extra;
                    this.params.clumpWaveIndex = spawningIndex;
                    this.params.clumpPathId =
                        level.spawnMode === 'pick-one' ? (spawnPaths[0]?.pathId ?? '') : '';
                    runState.potatoesPending += extra * spawnPaths.length;
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
            for (const path of pickSpawnPaths(level, this.pickRoll(level))) {
                await this.spawnPotato(path, spawningWave);
            }
        }

        await this.releaseClumpSpawns(msSinceLastExecute);
        await this.spawnSeagulls(msSinceLastExecute);
    }

    /** The roll for picking a spawn path; only drawn on pick-one levels. */
    protected pickRoll(level: Readonly<LevelDefinition>): number {
        return level.spawnMode === 'pick-one' ? this.state.seededRandom.next() : 0;
    }

    /** Releases queued clump potatoes, one per path every `clumpGapMs`. */
    protected async releaseClumpSpawns(msSinceLastExecute: number) {
        const {runState, level} = this.state;
        const wave = getWaveSettings(runState, this.params.clumpWaveIndex);
        if (this.params.pendingClumpSpawns <= 0 || !wave) {
            return;
        }

        this.params.msUntilClumpSpawn -= msSinceLastExecute;
        while (this.params.msUntilClumpSpawn <= 0 && this.params.pendingClumpSpawns > 0) {
            const clumpPaths = this.params.clumpPathId
                ? level.paths.filter((path) => path.pathId === this.params.clumpPathId)
                : level.paths;

            const laneRoll = (this.params.clumpLaneIndex + 0.5) / this.params.clumpLaneCount;
            for (const path of clumpPaths) {
                await this.spawnPotato(path, wave, laneRoll);
            }
            this.params.clumpLaneIndex++;
            this.params.pendingClumpSpawns--;
            runState.potatoesPending -= clumpPaths.length;
            this.params.msUntilClumpSpawn += spawnConfig.clumpGapMs;
        }
    }

    /**
     * Spawns one regular potato at the start of `path`, or at one of its chutes. `laneRoll` (0 to
     *
     * 1. Picks its lane across the belt; omitted, it is rolled from the seeded random.
     */
    protected async spawnPotato(
        path: Readonly<PathDefinition>,
        spawn: Readonly<{
            sizeWeights: PotatoSizeWeights;
            varietyWeights: PotatoVarietyWeights;
            eyesChance: number;
            chuteShare: number;
            hpMultiplier: number;
        }>,
        laneRoll?: number,
    ) {
        const {runState} = this.state;
        const start = path.waypoints[0];

        if (!start) {
            return;
        }

        const size = pickPotatoSize(spawn.sizeWeights, this.state.seededRandom.next());
        const variety = pickPotatoVariety(spawn.varietyWeights, this.state.seededRandom.next());
        const hasEyes = this.state.seededRandom.next() < spawn.eyesChance;
        const mashHp = Math.round(
            potatoSizeConfig[size].mashHp *
                spawn.hpMultiplier *
                potatoVarietyConfig.varieties[variety].hpMultiplier,
        );
        // Only roll on paths with chutes, so other levels keep their random sequence.
        const chute = path.chutes?.length
            ? pickChute({
                  chutes: path.chutes,
                  chuteShare: spawn.chuteShare,
                  roll: this.state.seededRandom.next(),
              })
            : undefined;
        const spawnDistancePx = chute?.distancePx ?? 0;
        // Always drawn (one roll per potato), even when a clump supplies its own lane.
        const rolledLane = this.state.seededRandom.next();
        const laneOffsetPx = getLaneOffset({
            roll: laneRoll ?? rolledLane,
            maxOffset: getMaxLaneOffset({
                beltWidthPx: path.widthPx,
                potatoRadius: potatoSizeConfig[size].radius,
            }),
        });
        const spawnPosition = getPositionAlongPathWithOffset({
            path,
            distancePx: spawnDistancePx,
            offsetPx: laneOffsetPx,
        });

        await this.addEntity(PotatoEntity, {
            x: spawnPosition.x,
            y: spawnPosition.y,
            pathId: path.pathId,
            distancePx: spawnDistancePx,
            laneOffsetPx,
            dropInMs: chute ? chuteConfig.dropMs : 0,
            size,
            variety,
            hasEyes,
            cut: false,
            cooked: false,
            mashHp,
            maxMashHp: mashHp,
            served: false,
            carriedBySeagull: false,
            quality: 100,
            lastSwipedAtMs: -1,
            lastHitDamage: 0,
            lastHitMultiplier: 1,
            lastHitAtMs: -1,
            lastHitTowerType: '',
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
            laneOffsetPx: 0,
            dropInMs: 0,
            size: PotatoSize.King,
            variety: PotatoVariety.Russet,
            hasEyes: false,
            cut: false,
            cooked: false,
            mashHp,
            maxMashHp: mashHp,
            served: false,
            carriedBySeagull: false,
            quality: 100,
            lastSwipedAtMs: -1,
            lastHitDamage: 0,
            lastHitMultiplier: 1,
            lastHitAtMs: -1,
            lastHitTowerType: '',
            potatoId: runState.nextPotatoId,
            ...createNoToppings(),
        });
        runState.nextPotatoId++;
        runState.potatoesSpawned++;
    }

    /** Releases the current wave's gulls, spread evenly through the wave. */
    protected async spawnSeagulls(msSinceLastExecute: number) {
        const {runState} = this.state;
        const wave = getWaveSettings(runState, runState.waveIndex);
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
            onBelt: false,
        });
        runState.seagullsSpawnedInWave++;
        runState.msUntilNextSeagull = getSeagullIntervalMs(wave);
    }
}
