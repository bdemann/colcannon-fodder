import {defineEslintConfig} from '@virmator/lint/configs/eslint.config.base.js';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
    ...defineEslintConfig(__dirname),
    {
        ignores: [
            /** Agent worktrees: each has its own copy of the repo. */
            '.claude/worktrees/**',
        ],
    },
    {
        rules: {
            /**
             * Turn off or on specific rules. See {@link defineEslintConfig} for which plugins are
             * already enabled.
             */
        },
    },
];
