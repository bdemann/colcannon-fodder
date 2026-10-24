import {type ModExecuteParams} from '@antha/engine';
import {defineShape} from 'object-shape-tester';
import {defineLogicEntity} from '../game-state/game-entity.mod.js';
import {getPathLength} from '../level/level.js';
import {advanceOrders} from './orders.js';

/** Logic-only entity that places and expires customer orders (`advanceOrders`). */
export class OrderBoardEntity extends defineLogicEntity({
    key: 'OrderBoardEntity',
    paramsShape: defineShape({}),
}) {
    public override update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        const longestPathLengthPx = Math.max(
            0,
            ...this.state.level.paths.map((path) => getPathLength(path)),
        );
        advanceOrders({
            runState: this.state.runState,
            msElapsed: msSinceLastExecute,
            roll: () => this.state.seededRandom.next(),
            longestPathLengthPx,
        });
    }
}
