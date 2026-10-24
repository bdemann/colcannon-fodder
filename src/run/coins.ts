import {economyConfig, potatoSizeConfig} from '../config/game-config.js';
import {type RunState} from './run-state.js';

/**
 * Adds income to the run's coins and records a coin event so the HUD can show where it came from. A
 * zero amount only records the event (for example a send-back that pays nothing).
 */
export function addCoins(
    runState: RunState,
    event: Readonly<{amount: number; reason: string; x: number; y: number}>,
): void {
    runState.coins += event.amount;
    if (event.amount > 0) {
        runState.coinsEarned += event.amount;
        if (runState.resetSpeedOnIncome) {
            runState.speed = 1;
            runState.resetSpeedOnIncome = false;
        }
    }
    runState.coinEvents.push({
        id: runState.nextCoinEventId,
        atMs: runState.elapsedMs,
        amount: event.amount,
        reason: event.reason,
        x: event.x,
        y: event.y,
    });
    runState.nextCoinEventId += 1;
    if (runState.coinEvents.length > economyConfig.coinEventsKept) {
        runState.coinEvents.splice(0, runState.coinEvents.length - economyConfig.coinEventsKept);
    }
}

/** The reason for a perfect serving's pay, naming a non-medium size and a quality under 100. */
export function getPerfectReason({
    value,
    quality,
}: Readonly<{value: number; quality: number}>): string {
    let reason = 'Perfect mash';
    const size = Object.entries(potatoSizeConfig).find(
        ([
            ,
            config,
        ]) => config.value === value,
    );
    if (size && value !== potatoSizeConfig.medium.value) {
        reason += ` · ${size[0]} ×${value}`;
    }
    if (quality < 100) {
        reason += ` · quality ${Math.round(quality)}%`;
    }
    return reason;
}
