import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {recordsConfig} from '../config/records-config.js';
import {
    createEmptyRecords,
    getModeRecord,
    isNewBest,
    mergeRunIntoRecords,
    parseRecords,
    type RunResult,
} from './records.js';

const run: RunResult = {
    levelId: 'a',
    mode: 'campaign',
    won: true,
    score: 1000,
    stars: 3,
    wavesReached: 5,
    dateMs: 1,
};

describe(parseRecords.name, () => {
    it('gives empty records for missing or broken data', () => {
        assert.deepEquals(parseRecords(undefined), createEmptyRecords());
        assert.deepEquals(parseRecords('{nope'), createEmptyRecords());
        assert.deepEquals(parseRecords('42'), createEmptyRecords());
    });

    it('round-trips merged records', () => {
        const records = mergeRunIntoRecords(createEmptyRecords(), run);
        assert.deepEquals(parseRecords(JSON.stringify(records)), records);
    });

    it('drops malformed hall entries', () => {
        const parsed = parseRecords(
            JSON.stringify({
                hall: [
                    {
                        levelId: 1,
                    },
                    'x',
                ],
            }),
        );
        assert.deepEquals(parsed.hall, []);
    });
});

describe(isNewBest.name, () => {
    it('is true for the first scoring run and false for a worse one', () => {
        assert.isTrue(isNewBest(createEmptyRecords(), run));
        const records = mergeRunIntoRecords(createEmptyRecords(), run);
        assert.isFalse(
            isNewBest(records, {
                ...run,
                score: 10,
                stars: 1,
            }),
        );
        assert.isTrue(
            isNewBest(records, {
                ...run,
                score: 1001,
            }),
        );
    });

    it('checks waves only in endless', () => {
        const records = mergeRunIntoRecords(createEmptyRecords(), {
            ...run,
            mode: 'endless',
        });
        const worse = {
            ...run,
            score: 1,
            stars: 0,
        };
        assert.isTrue(
            isNewBest(records, {
                ...worse,
                mode: 'endless',
                wavesReached: 9,
            }),
        );
        assert.isFalse(
            isNewBest(records, {
                ...worse,
                mode: 'endless',
                wavesReached: 2,
            }),
        );
        assert.isTrue(
            isNewBest(records, {
                ...worse,
                mode: 'campaign',
            }),
        );
    });
});

describe(mergeRunIntoRecords.name, () => {
    it('counts wins and champs and keeps the bests', () => {
        let records = mergeRunIntoRecords(createEmptyRecords(), run);
        records = mergeRunIntoRecords(records, {
            ...run,
            score: 500,
            stars: 2,
            won: true,
        });
        records = mergeRunIntoRecords(records, {
            ...run,
            score: 200,
            stars: 0,
            won: false,
        });
        assert.deepEquals(getModeRecord(records, 'a', 'campaign'), {
            bestScore: 1000,
            bestStars: 3,
            wins: 2,
            champs: 1,
            bestWaves: 5,
        });
        assert.strictEquals(getModeRecord(records, 'a', 'endless').bestScore, 0);
    });

    it('does not mutate its input', () => {
        const records = createEmptyRecords();
        mergeRunIntoRecords(records, run);
        assert.deepEquals(records, createEmptyRecords());
    });

    it('keeps only the top runs, best first', () => {
        let records = createEmptyRecords();
        for (let score = 1; score <= recordsConfig.hallSize + 3; score++) {
            records = mergeRunIntoRecords(records, {
                ...run,
                score,
            });
        }
        assert.strictEquals(records.hall.length, recordsConfig.hallSize);
        assert.strictEquals(records.hall[0]?.score, recordsConfig.hallSize + 3);
    });
});
