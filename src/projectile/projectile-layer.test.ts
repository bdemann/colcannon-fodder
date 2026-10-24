import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {projectileConfig} from '../config/game-config.js';
import {ProjectileKind} from './projectile-kind.js';
import {
    clearProjectiles,
    countProjectiles,
    getProjectilePose,
    spawnProjectile,
} from './projectile-layer.js';

const projectile = {
    kind: ProjectileKind.Masher,
    from: {
        x: 0,
        y: 0,
    },
    to: {
        x: 100,
        y: 0,
    },
    startMs: 1000,
};

describe(getProjectilePose.name, () => {
    it('flies in an arc from the tower to the target', () => {
        const start = getProjectilePose({
            projectile,
            elapsedMs: 1000,
        });
        assert.strictEquals(start.phase, 'flight');
        const middle = getProjectilePose({
            projectile,
            elapsedMs: 1000 + projectileConfig.flightMs / 2,
        });

        if ('x' in middle) {
            assert.strictEquals(middle.x, 50);
            assert.isTrue(middle.y < 0);
        }
    });

    it('puffs, then disappears', () => {
        assert.strictEquals(
            getProjectilePose({
                projectile,
                elapsedMs: 1000 + projectileConfig.flightMs,
            }).phase,
            'puff',
        );
        assert.strictEquals(
            getProjectilePose({
                projectile,
                elapsedMs: 1000 + projectileConfig.flightMs + projectileConfig.puffMs,
            }).phase,
            'done',
        );
    });

    it('does not move when the clock is frozen', () => {
        assert.deepEquals(
            getProjectilePose({
                projectile,
                elapsedMs: 1050,
            }),
            getProjectilePose({
                projectile,
                elapsedMs: 1050,
            }),
        );
    });
});

describe(spawnProjectile.name, () => {
    it('keeps at most the cap, dropping the oldest', () => {
        clearProjectiles();
        for (let index = 0; index < projectileConfig.maxLive + 10; index++) {
            spawnProjectile({
                ...projectile,
                startMs: index,
            });
        }
        assert.strictEquals(countProjectiles(), projectileConfig.maxLive);
        clearProjectiles();
    });
});
