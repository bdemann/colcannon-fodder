import {type Topping} from '../order/topping.js';
import {type RunMode} from '../run/run-state.js';
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
    /** Spends coins to raise a tower one level, if affordable and below the max level. */
    UpgradeTower = 'upgrade-tower',
    /** Destroys a tower and refunds part of everything spent on it. */
    SellTower = 'sell-tower',
    /** Spends coins to reset a worn tower's wear to 0. */
    ServiceTower = 'service-tower',
    /** Adds a topping to a potato on the belt. */
    ApplyTopping = 'apply-topping',
    /** Pauses or resumes the run. Ignored unless the run is `Playing`. */
    TogglePause = 'toggle-pause',
    /** Sets the fast-forward speed (1, 1.5, 2 or 3). Ignored unless `Playing` and allowed. */
    SetSpeed = 'set-speed',
    /** Resets the speed to 1x on the next income, without changing the speed now. */
    ArmSpeedReset = 'arm-speed-reset',
}

/** Must stay JSON compatible: it is sent over the network in co-op. */
export type GameCommand =
    | {
          type: GameCommandType.StartRun;
          /** Start on the title screen (`Ready`) instead of playing immediately. */
          ready?: boolean;
          /** The level to play (`LevelDefinition.levelId`). Defaults to the first level. */
          levelId?: string;
          /** Seeds `state.seededRandom`. The sender generates it so every client rolls the same. */
          seed: string;
          /** Campaign (default) or endless waves. */
          mode?: RunMode | undefined;
      }
    | {
          type: GameCommandType.BeginRun;
      }
    | {
          type: GameCommandType.PlaceTower;
          towerType: TowerType;
          x: number;
          y: number;
          /** Knife cut direction in degrees (default 0). Ignored by other towers. */
          angleDeg?: number;
      }
    | {
          type: GameCommandType.UpgradeTower;
          /** The tower's `towerId` param. */
          towerId: number;
      }
    | {
          type: GameCommandType.SellTower;
          towerId: number;
      }
    | {
          type: GameCommandType.ServiceTower;
          towerId: number;
      }
    | {
          type: GameCommandType.ApplyTopping;
          /** The target potato's `potatoId` param. */
          potatoId: number;
          topping: Topping;
      }
    | {
          type: GameCommandType.TogglePause;
      }
    | {
          type: GameCommandType.SetSpeed;
          speed: number;
      }
    | {
          type: GameCommandType.ArmSpeedReset;
      };

/** Queues a command for the next lockstep frame. Call this from UI code, never from handlers. */
export function sendGameCommand(state: Partial<FullGameState>, command: GameCommand) {
    if (!state.multiplayerP2pLockStep) {
        throw new Error(`Cannot send '${command.type}': lockstep mod is missing.`);
    }

    state.multiplayerP2pLockStep.multiplayerController.act(command);
}
