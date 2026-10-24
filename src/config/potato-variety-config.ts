import {PotatoVariety} from '../potato/potato-variety.js';

/**
 * Potato varieties: an HP multiplier each (on top of size and the wave `hpMultiplier`) plus two
 * traits. Tough skin: every hit does `toughSkinMultiplier` until the potato is Cut (the Cut hit
 * itself too). Dense: Masher hits do `denseMasherMultiplier` unless the potato is Soft. The eyes
 * modifier is rolled separately (`hasEyes`) and weakens Knife and Laser hits.
 */
export const potatoVarietyConfig = {
    varieties: {
        [PotatoVariety.Red]: {
            label: 'Red',
            hpMultiplier: 0.7,
            toughSkin: false,
            dense: false,
        },
        [PotatoVariety.Russet]: {
            label: 'Russet',
            hpMultiplier: 1,
            toughSkin: false,
            dense: false,
        },
        [PotatoVariety.Yukon]: {
            label: 'Yukon Gold',
            hpMultiplier: 1.3,
            toughSkin: false,
            dense: false,
        },
        [PotatoVariety.ToughSkinned]: {
            label: 'Tough-skinned',
            hpMultiplier: 1.2,
            toughSkin: true,
            dense: false,
        },
        [PotatoVariety.Sweet]: {
            label: 'Sweet potato',
            hpMultiplier: 1.5,
            toughSkin: false,
            dense: true,
        },
        [PotatoVariety.Yam]: {
            label: 'Yam',
            hpMultiplier: 2,
            toughSkin: true,
            dense: true,
        },
    },
    /** Damage multiplier of every hit on a tough-skinned potato that is not Cut yet. */
    toughSkinMultiplier: 0.4,
    /** Damage multiplier of Masher hits on a dense potato that is not Soft yet. */
    denseMasherMultiplier: 0.5,
    /** Damage multiplier of Knife and Laser hits on a potato with eyes. */
    eyesBladeMultiplier: 0.5,
} as const;

/** One line per trait, for the title screen, pause help and README. */
export const potatoTraitLines = [
    'Tough skin: Cut it first.',
    'Dense: soften it first.',
    'Eyes: blades struggle.',
] as const;
