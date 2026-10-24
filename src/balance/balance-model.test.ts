import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {waveConfig} from '../config/game-config.js';
import {PotatoSize} from '../potato/potato-size.js';
import {PotatoVariety} from '../potato/potato-variety.js';
import {TowerType} from '../tower/tower-type.js';
import {
    getAverageHp,
    getAverageLineDamage,
    getDamagePerPass,
    getDwellSeconds,
    getLineDamage,
    getPassLengthPx,
    getPotatoHp,
    getSpawnRatePerSecond,
    getSustainedPotatoesPerSecond,
    getWaveEntries,
    type ModelPotato,
    PassGeometry,
    preppedState,
} from './balance-model.js';

const [
    wave1,
    wave2,
    wave3,
    ,
    wave5,
] = waveConfig.waves;

describe('the model pieces', () => {
    it('matches the doc: a Masher beside a belt covers a 214 px chord', () => {
        assert.isTrue(
            Math.abs(
                getPassLengthPx({
                    towerType: TowerType.Masher,
                    size: PotatoSize.Medium,
                }) - 214.7,
            ) < 0.5,
        );
    });

    it('a Knife slice is the potato diameter plus the slice thickness', () => {
        assert.strictEquals(
            getPassLengthPx({
                towerType: TowerType.Knife,
                size: PotatoSize.Medium,
            }),
            28 + 44,
        );
    });

    it('dwell is length over speed', () => {
        assert.strictEquals(
            getDwellSeconds({
                passLengthPx: 100,
                speedPxPerMs: 0.1,
            }),
            1,
        );
    });

    it('the Laser aligned beam uses its full length', () => {
        assert.strictEquals(
            getPassLengthPx({
                towerType: TowerType.Laser,
                size: PotatoSize.Small,
                geometry: PassGeometry.Beam,
            }),
            220,
        );
    });

    it('prepped Mashers do x3 on a plain potato and undo every trait', () => {
        const yam: ModelPotato = {
            size: PotatoSize.Medium,
            variety: PotatoVariety.Yam,
            hasEyes: false,
        };
        const russet = {
            ...yam,
            variety: PotatoVariety.Russet,
        };
        const raw = getDamagePerPass({
            towerType: TowerType.Masher,
            potato: russet,
            speedPxPerMs: 0.1,
        });
        assert.isTrue(
            Math.abs(
                getDamagePerPass({
                    towerType: TowerType.Masher,
                    potato: yam,
                    speedPxPerMs: 0.1,
                    prep: preppedState,
                }) -
                    raw * 3,
            ) < 1e-9,
        );
        assert.isTrue(
            getDamagePerPass({
                towerType: TowerType.Masher,
                potato: yam,
                speedPxPerMs: 0.1,
            }) <
                raw * 0.25,
        );
    });

    it('wave HP is size x wave x variety', () => {
        assert.strictEquals(
            getPotatoHp(
                {
                    size: PotatoSize.Medium,
                    variety: PotatoVariety.Yukon,
                    hasEyes: false,
                },
                0.5,
            ),
            130,
        );
    });
});

describe('design goal 1: Knives alone work in wave 1', () => {
    function knives(count: number) {
        return Array.from(
            {
                length: count,
            },
            () => TowerType.Knife,
        );
    }

    it('three Knives finish every potato of wave 1', () => {
        assert.isAbove(getWaveEntries(wave1).length, 0);
        for (const entry of getWaveEntries(wave1)) {
            assert.isAtLeast(
                getLineDamage({
                    towers: knives(3),
                    potato: entry.potato,
                    speedPxPerMs: wave1.speedPxPerMs,
                }),
                entry.hp,
            );
        }
    });

    it('two Knives finish the average potato, one does not', () => {
        const hp = getAverageHp(wave1);
        assert.isAtLeast(
            getAverageLineDamage({
                wave: wave1,
                towers: knives(2),
            }),
            hp,
        );
        assert.isBelow(
            getAverageLineDamage({
                wave: wave1,
                towers: knives(1),
            }),
            hp,
        );
    });
});

describe('design goal 2: Mashers alone work in waves 2 and 3', () => {
    function mashers(count: number) {
        return Array.from(
            {
                length: count,
            },
            () => TowerType.Masher,
        );
    }

    for (const [
        name,
        wave,
    ] of [
        [
            'wave 2',
            wave2,
        ],
        [
            'wave 3',
            wave3,
        ],
    ] as const) {
        it(`two unprepped Mashers finish the average potato in ${name}`, () => {
            assert.isAtLeast(
                getAverageLineDamage({
                    wave,
                    towers: mashers(2),
                }),
                getAverageHp(wave),
            );
        });

        it(`two unprepped Mashers keep up with the spawn rate in ${name}`, () => {
            assert.isAtLeast(
                getSustainedPotatoesPerSecond({
                    wave,
                    towerType: TowerType.Masher,
                    count: 2,
                }),
                getSpawnRatePerSecond(wave),
            );
        });
    }

    it('one unprepped Masher finishes the average potato in wave 2', () => {
        assert.isAtLeast(
            getAverageLineDamage({
                wave: wave2,
                towers: mashers(1),
            }),
            getAverageHp(wave2),
        );
    });
});

describe('design goal 3: wave 5 needs the combo', () => {
    it('unprepped Mashers do not finish the average potato', () => {
        const hp = getAverageHp(wave5);
        for (const count of [
            1,
            2,
            3,
        ]) {
            assert.isBelow(
                getAverageLineDamage({
                    wave: wave5,
                    towers: Array.from(
                        {
                            length: count,
                        },
                        () => TowerType.Masher,
                    ),
                }),
                hp,
            );
        }
    });

    it('a Knife + Pot + Masher line (two Mashers) does', () => {
        assert.isAtLeast(
            getAverageLineDamage({
                wave: wave5,
                towers: [
                    TowerType.Knife,
                    TowerType.Boiler,
                    TowerType.Masher,
                    TowerType.Masher,
                ],
            }),
            getAverageHp(wave5),
        );
    });
});
