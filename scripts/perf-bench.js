/**
 * Performance benchmark: loads the dev build on The Long Haul, builds ~24 mixed towers, forces a
 * dense wave and records frame timing plus CPU hot spots (CDP profiler) for a while.
 *
 * Usage: node scripts/perf-bench.js <url> [seconds=20]
 *
 * Headless Chromium uses software GL, so compare relative before/after numbers only.
 */
import {chromium} from 'playwright';

const [
    url = 'http://localhost:5173/?solo',
    secondsText = '20',
] = process.argv.slice(2);
const seconds = Number(secondsText);

const browser = await chromium.launch({
    args: (process.env.CHROMIUM_ARGS ?? '--use-gl=angle --use-angle=gl --ignore-gpu-blocklist')
        .split(' ')
        .filter(Boolean),
});
const page = await browser.newPage({
    viewport: {
        width: 1280,
        height: 720,
    },
});
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));

await page.addInitScript(() => {
    localStorage.setItem('colcannon-fodder-level', 'long-haul');
});
await page.goto(url);
await page.waitForFunction(() => /** @type {any} */ (globalThis).gameState?.runState);
await page.waitForTimeout(1500);

await page.evaluate(
    async (maxTowers) => {
        const state = /** @type {any} */ (globalThis).gameState;
        function act(/** @type {any} */ command) {
            return state.multiplayerP2pLockStep.multiplayerController.act(command);
        }
        function wait(/** @type {number} */ ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        act({
            type: 'begin-run',
        });
        await wait(500);
        state.runState.coins = 1_000_000;
        const types = [
            'knife',
            'boiler',
            'masher',
            'microwave',
            'cricket-trap',
            'swiper',
        ];
        const candidates = [];
        for (let x = 120; x <= 1450; x += 220) {
            candidates.push(
                [
                    x,
                    270,
                ],
                [
                    x,
                    490,
                ],
                [
                    x,
                    730,
                ],
                [
                    x,
                    950,
                ],
            );
        }
        candidates.slice(0, maxTowers).forEach(
            (
                [
                    x,
                    y,
                ],
                index,
            ) => {
                act({
                    type: 'place-tower',
                    towerType: types[index % types.length],
                    x,
                    y,
                    angleDeg: 0,
                });
            },
        );
        await wait(1500);
        state.runState.waveIndex = 4;
        state.runState.wavePhase = 'break';
        state.runState.breakRemainingMs = 500;
    },
    Number(process.env.MAX_TOWERS ?? 24),
);

await page.waitForTimeout(3000);

/** Debug aid: HIDE=BeltEntity,TowerEntity hides those entities' views to see what they cost. */
if (process.env.HIDE) {
    await page.evaluate((keys) => {
        const state = /** @type {any} */ (globalThis).gameState;
        function hide() {
            for (const entity of state.entityStore.currentEntityInstances) {
                if (keys.includes(entity.entityDefinition.entityKey) && entity.view) {
                    entity.view.visible = false;
                }
            }
            requestAnimationFrame(hide);
        }
        hide();
    }, process.env.HIDE.split(','));
}

const client = await page.context().newCDPSession(page);
await client.send('Profiler.enable');
await client.send('Profiler.setSamplingInterval', {
    interval: 500,
});
await client.send('Performance.enable');
async function metricsOf() {
    return Object.fromEntries(
        (await client.send('Performance.getMetrics')).metrics.map((m) => {
            return [
                m.name,
                m.value,
            ];
        }),
    );
}
const metricsBefore = await metricsOf();
await client.send('Profiler.start');
await page.evaluate(() => {
    const frames = /** @type {number[]} */ ([]);
    /** @type {any} */ (globalThis).__frames = frames;
    let last = performance.now();
    function loop() {
        const now = performance.now();
        frames.push(now - last);
        last = now;
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
});
await page.waitForTimeout(seconds * 1000);
const {profile} = await client.send('Profiler.stop');
if (process.env.SCREENSHOT) {
    await page.screenshot({
        path: process.env.SCREENSHOT,
    });
}
const metricsAfter = await metricsOf();

const result = await page.evaluate(() => {
    const frames = /** @type {number[]} */ (/** @type {any} */ (globalThis).__frames);
    const state = /** @type {any} */ (globalThis).gameState;
    const counts = /** @type {Record<string, number>} */ ({});
    for (const entity of state.entityStore.currentEntityInstances) {
        const key = entity.entityDefinition.entityKey;
        counts[key] = (counts[key] ?? 0) + 1;
    }

    return {
        frames,
        counts,
        elapsedMs: state.runState.elapsedMs,
        status: state.runState.status,
    };
});

const sorted = result.frames.toSorted((a, b) => a - b);
const total = result.frames.reduce((sum, value) => sum + value, 0);
console.info(
    JSON.stringify(
        {
            frames: result.frames.length,
            avgFps: Number(((result.frames.length / total) * 1000).toFixed(2)),
            avgFrameMs: Number((total / result.frames.length).toFixed(2)),
            p50FrameMs: Number((sorted[Math.floor(sorted.length * 0.5)] ?? 0).toFixed(1)),
            p95FrameMs: Number((sorted[Math.floor(sorted.length * 0.95)] ?? 0).toFixed(1)),
            maxFrameMs: Number((sorted.at(-1) ?? 0).toFixed(1)),
            counts: result.counts,
            elapsedMs: Math.round(result.elapsedMs),
            status: result.status,
        },
        null,
        2,
    ),
);

/** Self time per function from the sampling profile. */
const nodesById = new Map(
    profile.nodes.map((node) => {
        return [
            node.id,
            node,
        ];
    }),
);
const selfUs = new Map();
profile.samples.forEach((id, index) => {
    selfUs.set(id, (selfUs.get(id) ?? 0) + (profile.timeDeltas[index] ?? 0));
});
const byFunction = new Map();
for (const [
    id,
    micros,
] of selfUs) {
    const {callFrame} = nodesById.get(id);
    const name = `${callFrame.functionName || '(anon)'} ${callFrame.url.split('/').slice(-2).join('/')}:${callFrame.lineNumber}`;
    byFunction.set(name, (byFunction.get(name) ?? 0) + micros);
}
const profileTotal = [...byFunction.values()].reduce((sum, value) => sum + value, 0);
const idleUs = [...byFunction.entries()].find(([name]) => name.startsWith('(idle)'))?.[1] ?? 0;
console.info(
    `CPU per frame (page.metrics TaskDuration): ${(((metricsAfter.TaskDuration - metricsBefore.TaskDuration) * 1000) / result.frames.length).toFixed(2)} ms, script ${(((metricsAfter.ScriptDuration - metricsBefore.ScriptDuration) * 1000) / result.frames.length).toFixed(2)} ms`,
);
console.info(
    `Busy main-thread time per frame: ${((profileTotal - idleUs) / 1000 / result.frames.length).toFixed(2)} ms`,
);
console.info('Top self-time functions:');
byFunction
    .entries()
    .toSorted((a, b) => b[1] - a[1])
    .slice(0, 25)
    .forEach(
        ([
            name,
            micros,
        ]) => {
            console.info(`${((micros / profileTotal) * 100).toFixed(1).padStart(5)}%  ${name}`);
        },
    );
/** Inclusive time for functions in our own source, to see which game code drives the cost. */
const parentOf = new Map();
for (const node of profile.nodes) {
    for (const child of node.children ?? []) {
        parentOf.set(child, node.id);
    }
}
const inclusive = new Map();
for (const [
    id,
    micros,
] of selfUs) {
    const seen = new Set();
    for (let current = id; current != undefined; current = parentOf.get(current)) {
        const {callFrame} = nodesById.get(current);
        if (!callFrame.url.includes('.ts')) {
            continue;
        }
        const name = `${callFrame.functionName || '(anon)'} ${callFrame.url.split('/').slice(-2).join('/').split('?')[0]}:${callFrame.lineNumber}`;
        if (!seen.has(name)) {
            seen.add(name);
            inclusive.set(name, (inclusive.get(name) ?? 0) + micros);
        }
    }
}
console.info('Top inclusive (own source, ms per frame):');
inclusive
    .entries()
    .toSorted((a, b) => b[1] - a[1])
    .slice(0, 25)
    .forEach(
        ([
            name,
            micros,
        ]) => {
            console.info(
                `${(micros / 1000 / result.frames.length).toFixed(2).padStart(6)}  ${name}`,
            );
        },
    );
console.info(errors.length ? `Errors:\n${errors.join('\n')}` : 'No page errors.');
await browser.close();
