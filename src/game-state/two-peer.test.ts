import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {levelSupportsPlayerCount} from '../level/level.js';
import {levels} from '../level/levels.js';
import {RunStatus, type RunState} from '../run/run-state.js';
import {TowerType} from '../tower/tower-type.js';
import {GameCommandType} from './game-command.js';
import {createTwoPeerHarness, type TwoPeerHarness} from './test-utils/two-peer-harness.js';

const testLevel = levels.find((level) => levelSupportsPlayerCount(level, 2));

/**
 * Hosts a run on the title screen, joins a guest (synced from the host), gives both players a slot,
 * then begins the run so both peers see all of it.
 */
async function startCoopRun(harness: TwoPeerHarness) {
    assert.isDefined(testLevel);
    harness.host.act({
        type: GameCommandType.StartRun,
        ready: true,
        levelId: testLevel.levelId,
        seed: 'two-peer',
    });
    harness.host.act({
        type: GameCommandType.JoinRun,
        name: 'Host',
    });
    await harness.waitForFrames(10);

    const guest = await harness.joinGuest();
    await harness.waitFor(
        () => (guest.state.runState as RunState | undefined)?.status === RunStatus.Ready,
    );
    guest.act({
        type: GameCommandType.JoinRun,
        name: 'Guest',
    });
    await harness.waitFor(() => Object.keys(guest.state.runState.slotByClientId).length === 2);
    harness.host.act({
        type: GameCommandType.BeginRun,
    });
    await harness.waitFor(() => guest.state.runState.status === RunStatus.Playing);

    return guest;
}

/** Frames both peers applied and hashed, which are the ones that can be compared. */
function countComparedFrames(harness: TwoPeerHarness): number {
    let count = 0;
    for (const [
        frame,
        hash,
    ] of harness.guest?.hashByFrame ?? []) {
        if (hash != undefined && harness.host.hashByFrame.get(frame) != undefined) {
            count++;
        }
    }
    return count;
}

describe('two-peer harness', () => {
    it('joins a guest, assigns slots and syncs state', async () => {
        const harness = await createTwoPeerHarness();
        try {
            const guest = await startCoopRun(harness);
            await harness.waitForFrames(60);

            assert.strictEquals(guest.state.runState.levelId, harness.host.state.runState.levelId);
            assert.deepEquals(
                guest.state.runState.slotByClientId,
                harness.host.state.runState.slotByClientId,
            );
            assert.deepEquals(
                Object.values(harness.host.state.runState.slotByClientId).sort(),
                [
                    0,
                    1,
                ],
            );
            assert.isTrue(countComparedFrames(harness) > 30);
            assert.deepEquals(harness.findHashMismatches(), []);
        } finally {
            harness.destroy();
        }
    });

    it('stays in sync through a full scripted wave', async () => {
        const harness = await createTwoPeerHarness();
        try {
            const guest = await startCoopRun(harness);
            harness.host.act({
                type: GameCommandType.PlaceTower,
                towerType: TowerType.Knife,
                x: 600,
                y: 500,
            });
            guest.act({
                type: GameCommandType.PlaceTower,
                towerType: TowerType.Knife,
                x: 900,
                y: 500,
            });

            await harness.waitFor(() => {
                return (
                    harness.host.state.runState.waveIndex >= 1 ||
                    harness.host.state.runState.status !== RunStatus.Playing
                );
            }, 120_000);
            await harness.waitForPeersCaughtUp();

            assert.isTrue(harness.host.state.runState.elapsedMs > 20_000);
            assert.isTrue(
                countComparedFrames(harness) > 1000,
                `DBG ${countComparedFrames(harness)} h=${harness.host.hashByFrame.size} g=${guest.hashByFrame.size} el=${harness.host.state.runState.elapsedMs} fc=${harness.host.controller.frameCount} wi=${harness.host.state.runState.waveIndex}`,
            );
            assert.deepEquals(harness.findHashMismatches(), []);
        } finally {
            harness.destroy();
        }
    });

    it('frees the guest slot when the guest leaves', async () => {
        const harness = await createTwoPeerHarness();
        try {
            const guest = await startCoopRun(harness);
            const guestSlot = harness.host.state.runState.slotByClientId[guest.controller.clientId];
            assert.isDefined(guestSlot);
            assert.isTrue(harness.host.state.runState.connected[guestSlot] === true);

            harness.leaveGuest();
            await harness.waitFor(() => harness.host.state.runState.connected[guestSlot] === false);
        } finally {
            harness.destroy();
        }
    });

    it('resyncs a peer after a forced desync', async () => {
        const harness = await createTwoPeerHarness();
        try {
            const guest = await startCoopRun(harness);
            await harness.waitForFrames(30);
            assert.deepEquals(harness.findHashMismatches(), []);

            /** Break the guest's state, as a nondeterministic bug would. */
            guest.state.runState.coins += 12_345;

            /** The next desync check (about a second of frames) catches it and reloads host state. */
            await harness.waitFor(() => harness.findHashMismatches().length > 0);
            const lastMismatch = Math.max(...harness.findHashMismatches());
            await harness.waitFor(() => {
                /** Equal hashes on a frame after the mismatch mean the guest recovered. */
                return [...guest.hashByFrame].some(
                    ([
                        frame,
                        hash,
                    ]) => {
                        return (
                            frame > lastMismatch &&
                            hash != undefined &&
                            hash === harness.host.hashByFrame.get(frame)
                        );
                    },
                );
            });

            assert.isTrue(guest.state.runState.coins < harness.host.state.runState.coins + 12_345);
        } finally {
            harness.destroy();
        }
    });
});
