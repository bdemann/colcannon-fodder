import {type ModExecuteParams} from '@antha/engine';
import {defineShape} from 'object-shape-tester';
import {potatoConfig, runConfig} from '../config/game-config.js';
import {defineLogicEntity} from '../game-state/game-entity.mod.js';
import {PotatoEntity} from './potato.entity.js';

/**
 * Logic-only entity that releases one potato per path every `spawnIntervalMs` until the run's
 * potato total is reached.
 */
export class PotatoSpawnerEntity extends defineLogicEntity({
    key: 'PotatoSpawnerEntity',
    paramsShape: defineShape({
        msUntilNextSpawn: 0,
    }),
}) {
    public override async update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        const {runState, level} = this.state;

        if (runState.potatoesSpawned >= runConfig.potatoesPerRun) {
            return;
        }

        this.params.msUntilNextSpawn -= msSinceLastExecute;

        while (
            this.params.msUntilNextSpawn <= 0 &&
            runState.potatoesSpawned < runConfig.potatoesPerRun
        ) {
            for (const path of level.paths) {
                const start = path.waypoints[0];

                if (!start) {
                    continue;
                }

                await this.addEntity(PotatoEntity, {
                    x: start.x,
                    y: start.y,
                    pathId: path.pathId,
                    distancePx: 0,
                    speedPxPerMs: potatoConfig.speedPxPerMs,
                    cut: false,
                    cooked: false,
                    mashed: false,
                    served: false,
                });
                runState.potatoesSpawned++;
            }

            this.params.msUntilNextSpawn += potatoConfig.spawnIntervalMs;
        }
    }
}
