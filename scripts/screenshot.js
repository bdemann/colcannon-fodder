/**
 * Opens the running dev server in headless Chromium, performs optional actions, saves a screenshot,
 * and prints browser console errors plus a JSON dump of `gameState.runState`, `gameState.ui`, and
 * how many entities of each kind exist.
 *
 * Usage: node scripts/screenshot.js <url> <output.png> [action...]
 *
 * The script adds `?solo` to the URL so the main menu is skipped; pass `?menu` to see the menu.
 *
 * Actions run in order. Coordinates are browser pixels in a 1280x720 viewport (the game world is
 * 1920x1080, so world = browser * 1.5):
 *
 * - `move:X:Y` moves the mouse
 * - `click:X:Y` left clicks
 * - `rightclick:X:Y` right clicks
 * - `key:KEY` presses a key (Playwright key names, for example `1`, `Escape`, `r`)
 * - `wait:MS` waits
 * - `eval:CODE` runs JavaScript in the page, for example `eval:gameState.runState.status='lost'`
 */
import {chromium} from 'playwright';
import {parseUrl} from 'url-vir';

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

/** `?solo` skips the Singleplayer / Co-op main menu so scripted runs start playing right away. */
const pageUrl = parseUrl(url);
if (!pageUrl.searchParams.has('menu')) {
    pageUrl.searchParams.set('solo', '1');
}
await page.goto(pageUrl.href);
await page.waitForTimeout(3000);

for (const action of actions) {
    const separatorIndex = action.indexOf(':');
    const kind = separatorIndex < 0 ? action : action.slice(0, separatorIndex);
    const rest = separatorIndex < 0 ? '' : action.slice(separatorIndex + 1);
    const [
        first,
        second,
    ] = rest.split(':');

    if (kind === 'move') {
        await page.mouse.move(Number(first), Number(second));
    } else if (kind === 'click') {
        await page.mouse.click(Number(first), Number(second));
    } else if (kind === 'rightclick') {
        await page.mouse.click(Number(first), Number(second), {
            button: 'right',
        });
    } else if (kind === 'key') {
        await page.keyboard.press(rest);
    } else if (kind === 'wait') {
        await page.waitForTimeout(Number(first));
    } else if (kind === 'eval') {
        await page.evaluate(rest);
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
              entityCounts: [...state.entityStore.currentEntityInstances].reduce(
                  (counts, entity) => {
                      const key = entity.entityDefinition.entityKey;
                      counts[key] = (counts[key] ?? 0) + 1;

                      return counts;
                  },
                  /** @type {Record<string, number>} */ ({}),
              ),
          }
        : 'gameState is not exposed (is this a dev build?)';
});

console.info(JSON.stringify(snapshot, null, 4));
console.info(errors.length ? `Console errors:\n${errors.join('\n')}` : 'No console errors.');
await browser.close();
