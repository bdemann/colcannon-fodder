import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';

/**
 * Fetches a source file from the test server. The server transpiles `.ts` to JS, which also drops
 * comments, so doc comments mentioning these APIs cannot trip the scan.
 */
async function readSource(relativeTsPath: string): Promise<string> {
    const response = await fetch(new URL(relativeTsPath, import.meta.url));
    assert.isTrue(response.ok, `Could not read ${relativeTsPath}`);
    return await response.text();
}

/** Returns the source with the body of every `render(...) {...}` method removed (UI only). */
function removeRenderMethods(source: string): string {
    let result = source;
    for (;;) {
        const match = /\brender\s*\([^)]*\)\s*\{/.exec(result);
        if (!match) {
            return result;
        }
        let depth = 1;
        let index = match.index + match[0].length;
        while (depth > 0 && index < result.length) {
            const character = result[index];
            if (character === '{') {
                depth++;
            } else if (character === '}') {
                depth--;
            }
            index++;
        }
        result = result.slice(0, match.index) + result.slice(index);
    }
}

const forbiddenNondeterminism = [
    /\bMath\.random\b/,
    /\bDate\.now\b/,
    /\bperformance\.now\b/,
    /\bsetTimeout\b/,
    /\brequestAnimationFrame\b/,
];
const forbiddenUiRead = /\b(?:state|this\.state)\??\.ui\b/;

/**
 * The simulation: command handlers, the lockstep frame update, and every entity's `update`. Entity
 * files are found from the list in `game-entities.ts`.
 */
async function readSimSources(): Promise<Record<string, string>> {
    const entityList = await readSource('./game-entities.ts');
    /** The transpiled imports end in `.ts` or `.js` depending on the transform. */
    const entityPaths = [...entityList.matchAll(/from\s+['"](\.\.?\/[^'"]+)\.(?:js|ts)['"]/g)].map(
        (match) => `${match[1]}.ts`,
    );
    assert.isTrue(entityPaths.length > 5, 'Expected to find the entity files.');

    const paths = [
        './game-command-handlers.ts',
        './game-lockstep.mod.ts',
        ...entityPaths,
    ];
    const sources: Record<string, string> = {};
    for (const path of paths) {
        sources[path] = removeRenderMethods(await readSource(path));
    }
    return sources;
}

describe('simulation purity', () => {
    it('uses no nondeterministic APIs', async () => {
        for (const [
            path,
            source,
        ] of Object.entries(await readSimSources())) {
            for (const forbidden of forbiddenNondeterminism) {
                assert.isFalse(forbidden.test(source), `${path} uses ${forbidden.source}`);
            }
        }
    });

    it('never reads state.ui', async () => {
        for (const [
            path,
            source,
        ] of Object.entries(await readSimSources())) {
            assert.isFalse(forbiddenUiRead.test(source), `${path} reads state.ui`);
        }
    });

    it('does not read localStorage or generate seeds inside handlers', async () => {
        const handlers = await readSource('./game-command-handlers.ts');
        assert.isFalse(/localStorage|loadLevelChoice|randomString/.test(handlers));
    });
});
