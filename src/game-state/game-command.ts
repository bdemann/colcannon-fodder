import {type Topping} from '../order/topping.js';
import {type TowerType} from '../tower/tower-type.js';
import {type FullGameState} from './game-state.js';

/**
 * Every player action that changes the simulation is a command. UI code sends commands with
 * `sendGameCommand`; the lockstep controller delivers them to `gameCommandHandlers` at the start of
 * a frame. In singleplayer this is just a queue. In co-op the same commands go over the network,
 * which is why handlers must be deterministic.
 */
export enum GameCommandType {
    /** Clears all entities and starts a fresh run. Used for the first run and for restart. */
    StartRun = 'start-run',
    /** Leaves the title screen: `Ready` becomes `Playing`. Ignored in any other status. */
    BeginRun = 'begin-run',
    /** Places a tower at a world position, if the position is valid. */
    PlaceTower = 'place-tower',
    /** Adds a topping to a potato on the belt. */
    ApplyTopping = 'apply-topping',
}

/** Must stay JSON compatible: it is sent over the network in co-op. */
export type GameCommand =
    | {
          type: GameCommandType.StartRun;
          /** Start on the title screen (`Ready`) instead of playing immediately. */
          ready?: boolean;
      }
    | {
          type: GameCommandType.BeginRun;
      }
    | {
          type: GameCommandType.PlaceTower;
          towerType: TowerType;
          x: number;
          y: number;
      }
    | {
          type: GameCommandType.ApplyTopping;
          /** The target potato's `potatoId` param. */
          potatoId: number;
          topping: Topping;
      };

/** Queues a command for the next lockstep frame. Call this from UI code, never from handlers. */
export function sendGameCommand(state: Partial<FullGameState>, command: GameCommand) {
    if (!state.multiplayerP2pLockStep) {
        throw new Error(`Cannot send '${command.type}': lockstep mod is missing.`);
    }

    state.multiplayerP2pLockStep.multiplayerController.act(command);
}
