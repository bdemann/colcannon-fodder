import {type ModExecuteParams} from '@antha/engine';
import {defineShape} from 'object-shape-tester';
import {doorConfig} from '../config/door-config.js';
import {defineLogicEntity} from '../game-state/game-entity.mod.js';
import {getPath, getPathLength} from '../level/level.js';
import {PotatoEntity} from '../potato/potato.entity.js';
import {heatLampLoss} from './heat-lamp.js';

/** Where the Pass starts on a path: the last `passSlots` queue spots before the counter. */
export function getPassStartPx(pathLength: number): number {
    return pathLength - doorConfig.passSlots * doorConfig.queueSpacingPx;
}

/**
 * Logic-only entity for the counter at the end of the belt. Potatoes waiting in the pass zone lose
 * quality under the heat lamp, and a waiter serves the front plate every so often.
 */
export class PassEntity extends defineLogicEntity({
    key: 'PassEntity',
    paramsShape: defineShape({
        msUntilWaiter: 0,
    }),
}) {
    public override update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        const {level, entityStore} = this.state;
        const inZone: PotatoEntity[] = [];

        for (const potato of entityStore.getEntities(PotatoEntity)) {
            if (
                potato.params.served ||
                potato.params.carriedBySeagull ||
                potato.params.dropInMs > 0
            ) {
                continue;
            }
            const length = getPathLength(getPath(level, potato.params.pathId));
            if (potato.params.distancePx >= getPassStartPx(length)) {
                inZone.push(potato);
                potato.params.passWaitMs += msSinceLastExecute;
                potato.params.quality = Math.max(
                    0,
                    potato.params.quality -
                        heatLampLoss({
                            passWaitMs: potato.params.passWaitMs,
                            ms: msSinceLastExecute,
                        }),
                );
            } else {
                potato.params.passWaitMs = 0;
            }
        }

        this.params.msUntilWaiter -= msSinceLastExecute;

        let front: PotatoEntity | undefined;
        for (const potato of inZone) {
            if (!front || potato.params.distancePx > front.params.distancePx) {
                front = potato;
            }
        }
        if (!front) {
            return;
        }

        const atCounter =
            front.params.distancePx >= getPathLength(getPath(level, front.params.pathId)) - 1;
        const waiterReady = this.params.msUntilWaiter <= 0;
        if (atCounter && (waiterReady || inZone.length > doorConfig.passSlots)) {
            front.serveAtCounter();
            if (waiterReady) {
                this.params.msUntilWaiter = doorConfig.waiterIntervalMs;
            }
        }
    }
}
