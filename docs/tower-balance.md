# Tower balance

Numbers come from `src/config/game-config.ts`, `knife-config.ts`, `swiper-config.ts`, `quality-config.ts`, `upgrade-config.ts` and `src/tower/tower-type.ts`. The tables are `docs/tower-balance.csv` (per tower, with expected targets and effective DPS for waves 1-5) and `docs/tower-vs-wave.csv` (per tower and wave: damage per pass against the average potato, alone and prepped) and `docs/tower-vs-variety.csv` (per tower and potato variety).

The model is code: `src/balance/balance-model.ts` (dwell time, hits per pass, damage per pass, throughput). It calls the real `getHitDamage`, and `src/balance/balance-model.test.ts` asserts the three design goals against the real config, so a tuning change that breaks a goal fails the tests.

## Columns

-   `cost`: build cost in coins (`economyConfig.towerCost`).
-   `damage_type`: how the tower hits.
-   `base_damage`: mash damage per hit at level 1 (the Microwave value is its per-hit config number).
-   `attack_interval_s`: `cooldownMs / 1000`, the attack speed. The Swiper has no cooldown (0); its arm turns once every 5 s.
-   `range_px`: range in world pixels (the Swiper's is its arm length; the Knife's is its cut length).
-   `special_effect`: status effects and extra behavior.
-   `dps`: `base_damage / attack_interval_s`. The Microwave uses its continuous 45 damage per second. Cricket Trap and Swiper deal no damage, so 0.
-   `dps_per_coin`: `dps / cost`.
-   `targets_w1..w5`: expected number of potatoes the tower hits per attack in that wave (see the model below).
-   `eff_dps_w1..w5`: `dps x targets`, the damage per second the tower puts out across all potatoes (Masher is always 1 target).
-   The `Laser` row is the best case (beam aligned along a straight leg). `Laser (across belt)` is the beam aimed across the belt like a Knife.

## What per-hit DPS misses

-   Area towers hit many potatoes: the Boiling Pot's 5 DPS applies to every potato in range, and its real job is applying Soft.
-   Multipliers: Cut makes later hits x1.5 and Soft makes Masher hits x2, so a prepped Masher does far more than 40 DPS.
-   Line towers (Knife, Laser) hit everything crossing the line, so DPS is per potato crossing it.
-   Dwell time in range matters more than raw DPS. A short, fast tower deals less total damage than a long-range one.
-   Support towers (Cricket Trap, Swiper) show 0 DPS but protect against gulls and buy time.

## Effective Masher DPS

| Potato state | Multiplier | Level 1 | Level 2 | Level 3 |
| ------------ | ---------- | ------- | ------- | ------- |
| Raw          | x1         | 40.0    | 65.9    | 108.6   |
| Cut          | x1.5       | 60.0    | 98.8    | 162.9   |
| Soft         | x2         | 80.0    | 131.8   | 217.1   |
| Cut and Soft | x3         | 120.0   | 197.6   | 325.7   |

## DPS by level (raw potato)

Upgrades multiply damage by 1.4 (level 2) and 1.9 (level 3) and cooldown by 0.85 and 0.7. Per-hit damage is rounded. The Microwave scales only by the damage multiplier.

| Tower       | Level 1 | Level 2 | Level 3 |
| ----------- | ------- | ------- | ------- |
| Knife       | 16.0    | 28.2    | 45.7    |
| Laser       | 16.0    | 28.2    | 45.7    |
| Boiling Pot | 5.0     | 7.8     | 13.1    |
| Masher      | 40.0    | 65.9    | 108.6   |
| Microwave   | 45.0    | 63.0    | 85.5    |

## Expected targets and effective DPS (model)

Inputs, all from `game-config.ts` `waveConfig` and `potatoSizeConfig`:

-   Spawn rate per second: `(1 / spawnIntervalMs) x (1 + clumpChance x (1 + clumpMaxExtra) / 2) + extraSpawnsPerSecond`. A clump adds 1 to `clumpMaxExtra` extra potatoes (assumed uniform) at each spawn.
-   Density per pixel of belt: `spawn rate / speedPxPerMs`. Potatoes all move at the wave speed, so this is the average number per px.
-   Average potato HP: sum of `sizeWeights x mashHp`, times the wave `hpMultiplier` (wave 1 is x0.25).
-   Geometry assumption: the tower sits beside a straight belt, its center 90 px from the belt center line (half belt 45 + tower radius 30 + a 15 px gap). A circle of radius R covers a belt chord of `2 x sqrt(R^2 - 90^2)`: 214 px for the Boiling Pot and Masher (R 140), 159 px for the Microwave (R 120). Lane offsets (potatoes sit up to about 17 px off center) are ignored for circles.

| Wave | Spawns per s | Density per 100 px | Mean gap (px) | Avg potato HP | Avg potato width + Knife slice (px) |
| ---- | ------------ | ------------------ | ------------- | ------------- | ----------------------------------- |
| 1    | 0.29         | 0.41               | 245           | 34            | 66                                  |
| 2    | 0.41         | 0.52               | 194           | 84            | 70                                  |
| 3    | 0.60         | 0.66               | 151           | 107           | 73                                  |
| 4    | 0.83         | 0.82               | 121           | 189           | 77                                  |
| 5    | 1.23         | 1.12               | 89            | 340           | 80                                  |

Targets per attack:

-   Boiling Pot: `density x 214 px` (every potato whose center is in range).
-   Knife: a slice straight across the belt, so `density x (2 x 14 px half width + avg potato diameter)`, the last column above. It crosses the whole belt width, so side-by-side lane potatoes at the same distance along the belt are both hit. A value below 1 is the chance that something is on the line at a swing.
-   Laser, aligned (best case): `density x min(220 px beam, straight leg)`. The straight legs are 420 px or longer, so the beam length (220) wins. This needs the tower at a corner (or belt end) with the beam running down the belt, not the usual beside-the-belt spot. Aimed across the belt, it behaves exactly like the Knife (second Laser row).
-   Microwave: `density x the belt length inside the cone`. For a 120 px, 25 degree half-angle cone at 90 px from the belt, the best aim covers about 93 px of belt. That is an aligned best case; the cone follows the furthest-along potato.
-   Masher: 1. Cricket Trap and Swiper: 0 (utility, no damage).

Damage per pass per potato (`tower-vs-wave.csv`): the potato's dwell time in the tower's area (chord or slice length / speed) times the hit rate. Line towers use `4 + 6 x (hits - 1)` since the first hit Cuts and later hits are x1.5; the Boiling Pot uses `6 + 9 x (hits - 1)`; the Masher is 40 per hit (raw potato); the Microwave is 45 per second over the range chord. `dps_per_coin_effective` is `eff_dps / cost`.

Key results (level 1, no upgrades):

| Tower           | eff DPS w1 | w2   | w3   | w4   | w5   |
| --------------- | ---------- | ---- | ---- | ---- | ---- |
| Knife           | 4.3        | 5.8  | 7.7  | 10.2 | 14.4 |
| Boiling Pot     | 4.4        | 5.5  | 7.1  | 8.8  | 12.0 |
| Masher          | 40         | 40   | 40   | 40   | 40   |
| Microwave       | 17.0       | 21.6 | 27.7 | 34.4 | 46.8 |
| Laser (aligned) | 14.4       | 18.2 | 23.3 | 29.0 | 39.5 |
| Laser (across)  | 4.3        | 5.8  | 7.7  | 10.2 | 14.4 |

## Limits of the model

-   Single path, one tower, level 1, no wear, no seagulls, no boss (wave 5 has one Russet King).
-   Averages only: a clump or a large potato changes the picture a lot. The mean of a rare event is not what a player sees.
-   The "effective DPS" is a time average. It overstates the damage on any single potato when potatoes are sparse (targets below 1) and understates the burst when they clump.
-   The Masher hits one potato at a time, so with more than one potato in range its other targets wait; effective DPS stays 40 but each potato's dwell is shared.
-   Cut and Soft are ignored in effective DPS (except the Cut ramp inside damage per pass), so combo damage is higher than shown.
-   The Microwave's guaranteed dwell is the range chord because it tracks the lead potato; followers use the cone length.
-   The Laser aligned case needs special placement; most placements are closer to the across case.
-   Potato varieties may change the HP and speed averages, so this sheet will need per-variety columns then: add `hp_<variety>` and `damage_per_pass_<variety>` columns to `tower-vs-wave.csv`, and weight `avg_potato_hp` by variety share.

## Potato varieties

Defined in `src/config/potato-variety-config.ts`; the trait math is in `getHitMultiplier` (`src/potato/mash.ts`), so every tower and the hit numbers agree. Variety HP multiplies size HP and the wave `hpMultiplier`. `docs/tower-vs-variety.csv` shows damage per pass for a medium potato at the wave 3 belt speed.

| Variety       | HP x | Trait                                                        |
| ------------- | ---- | ------------------------------------------------------------ |
| Red           | 0.7  | none                                                         |
| Russet        | 1    | none (baseline)                                              |
| Yukon Gold    | 1.3  | none                                                         |
| Tough-skinned | 1.2  | tough skin: all hits x0.4 until Cut (the Cut hit too)        |
| Sweet potato  | 1.5  | dense: Masher hits x0.5 unless Soft                          |
| Yam           | 2    | tough skin and dense                                         |
| (eyes)        | -    | Knife and Laser hits x0.5 (rolled per potato, per-wave odds) |

Waves 1-2 are Red and Russet with no eyes. Waves 3-4 are Russet and Yukon heavy with at most 15% tough skin and 5-10% eyes. Wave 5 is mostly tough-skinned, sweet potato and yam with 30% eyes. Endless shifts weight from the soft group to the tough group from wave 3 (7% per wave, capped at 85%) and raises the eyes chance 3% per wave (capped at 40%).

Because Cut removes tough skin and Soft removes dense, a prepped Masher does x3 on every variety (286 per pass at wave 3 speed, even on a Yam), while an unprepped Masher does 19 on a Yam. Prep is what the late game is about.

## Design goals check

All three hold with the real config (asserted in `src/balance/balance-model.test.ts`) and **without changing any tower stat**: only the wave `hpMultiplier` values, the variety mix and the new variety HP were tuned (`potatoSizeConfig` is unchanged). Average damage per pass is the mean over the wave's potatoes; "average potato" means mean damage against mean HP.

| Wave | Avg HP | Spawns per s | 1 Knife | 2 Knives | 3 Knives | 1 Masher | 2 Mashers | Knife+Pot+Masher | Knife+Pot+2 Mashers |
| ---- | ------ | ------------ | ------- | -------- | -------- | -------- | --------- | ---------------- | ------------------- |
| 1    | 34     | 0.29         | 21      | 43       | 66       | 123      | 245       | 411              | 779                 |
| 2    | 84     | 0.41         | 19      | 40       | 61       | 107      | 215       | 361              | 683                 |
| 3    | 107    | 0.60         | 17      | 36       | 55       | 90       | 179       | 321              | 607                 |
| 4    | 189    | 0.82         | 15      | 33       | 51       | 76       | 152       | 289              | 546                 |
| 5    | 340    | 1.23         | 12      | 27       | 42       | 32       | 64        | 260              | 494                 |

-   **Goal 1, Knives alone work early: pass.** Wave 1 is Red and Russet, small and medium only (HP 21 to 50). Three Knives finish every one of them (worst case a medium Russet at 50 HP against 72 damage); two Knives finish the average (43 against 34), one does not (21).
-   **Goal 2, Mashers alone work mid-game: pass.** Waves 2 and 3: one or two raw Mashers finish the average potato (wave 2: one does 107 against 84; wave 3: two do 179 against 107, one does 90). Throughput keeps up: two Mashers can finish 0.96 (wave 2) and 0.64 (wave 3) average potatoes per second against 0.41 and 0.60 arriving. This fixes the old model, where Mashers failed waves 2-3 (190 and 212 HP).
-   **Goal 3, late game needs the combo: pass.** Wave 5 average HP is 340. Unprepped Mashers fall far short (one does 32, two do 64: tough skin and dense cut them to a fraction), a Knife + Pot + one Masher line does 260 (not enough), and the line with two Mashers does 494 (enough). Wave 4 is the ramp: two raw Mashers do 152 against 189.
-   **Knives stop being enough at once.** From wave 2 a Knife does 12-19 per pass; it is a prep tower (Cut, which also unlocks tough skin) from then on, not a killer. Eyes halve even that.
-   **Microwave and Laser are the efficiency outliers.** The Microwave scales best with density because its cone hits several potatoes; its flat damage ignores traits, so it is the cheap answer to Yams and eyes at a quality cost. The aligned Laser reaches 0.26 per coin at wave 5 against the Masher's 0.5; across the belt it is a 150 coin Knife. The Boiling Pot is weak as DPS but its Soft (x2 Masher, and no dense penalty) is what makes the combo work.
