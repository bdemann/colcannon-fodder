/**
 * Opens the running dev server in headless Chromium, performs optional actions, saves a screenshot,
 * and prints browser console errors plus a JSON dump of `gameState.runState` and `gameState.ui`.
 *
 * Usage: node scripts/screenshot.js <url> <output.png> [action...]
 *
 * Actions run in order. Coordinates are browser pixels in a 1280x720 viewport (the game world is
 * 1920x1080, so world = browser * 1.5):
 *
 * - `move:X:Y` moves the mouse
 * - `click:X:Y` left clicks
 * - `key:KEY` presses a key (Playwright key names, for example `1`, `Escape`, `r`)
 * - `wait:MS` waits
 */
import {chromium} from 'playwright';

const [
    url = 'http://localhost:5173/',
    outputPath = 'screenshot.png',
    ...actions
] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({
    viewport: {
        width: 1280,
        height: 720,
    },
});
const errors = [];

page.on('console', (message) => {
    if (message.type() === 'error') {
        errors.push(message.text());
    }
});
page.on('pageerror', (error) => errors.push(error.message));

await page.goto(url);
await page.waitForTimeout(3000);

for (const action of actions) {
    const [
        kind,
        first,
        second,
    ] = action.split(':');

    if (kind === 'move') {
        await page.mouse.move(Number(first), Number(second));
    } else if (kind === 'click') {
        await page.mouse.click(Number(first), Number(second));
    } else if (kind === 'key') {
        await page.keyboard.press(String(first));
    } else if (kind === 'wait') {
        await page.waitForTimeout(Number(first));
    } else {
        throw new Error(`Unknown action '${action}'.`);
    }
}

await page.waitForTimeout(300);
await page.screenshot({
    path: outputPath,
});

const snapshot = await page.evaluate(() => {
    const state = /** @type {any} */ (globalThis).gameState;

    return state
        ? {
              runState: state.runState,
              ui: state.ui,
          }
        : 'gameState is not exposed (is this a dev build?)';
});

console.info(JSON.stringify(snapshot, null, 4));
console.info(errors.length ? `Console errors:\n${errors.join('\n')}` : 'No console errors.');
await browser.close();
