const {baseConfig} = require('@virmator/spellcheck/configs/cspell.config.base.cjs');

module.exports = {
    ...baseConfig,
    ignorePaths: [
        ...baseConfig.ignorePaths,
        '.claude/worktrees/**',
    ],
    words: [
        ...baseConfig.words,
        'bdemann',
        'colcannon',
        'deseret',
        'fieldrunners',
        'purée',
        'uncarried',
        'reskin',
        'scurriers',
        'utahn',
        'despawn',
        'desync',
        'pathing',
        'playfield',
        'playtest',
        'tunables',
        'underprocessed',
    ],
};
