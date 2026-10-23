import {type ModExecuteParams} from '@antha/engine';
import {defineShape} from 'object-shape-tester';
import {defineLogicEntity} from '../game-state/game-entity.mod.js';
import {advanceOrders} from './orders.js';

/** Logic-only entity that places and expires customer orders (`advanceOrders`). */
export class OrderBoardEntity extends defineLogicEntity({
    key: 'OrderBoardEntity',
    paramsShape: defineShape({}),
}) {
    public override update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        advanceOrders(this.state.runState, msSinceLastExecute, () => {
            return this.state.seededRandom.next();
        });
    }
}
