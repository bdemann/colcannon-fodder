import {type ModExecuteParams} from '@antha/engine';
import {defineShape} from 'object-shape-tester';
import {defineLogicEntity} from '../game-state/game-entity.mod.js';
import {advanceWaves} from '../run/waves.js';
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

                await this.addEntity(PotatoEntity, {
                    x: start.x,
                    y: start.y,
                    pathId: path.pathId,
                    distancePx: 0,
                    speedPxPerMs: spawn.speedPxPerMs,
                    cut: false,
                    cooked: false,
                    mashed: false,
                    served: false,
                });
                runState.potatoesSpawned++;
            }
        }
    }
}
