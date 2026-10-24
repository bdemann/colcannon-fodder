# Tower balance

Numbers come from `src/config/game-config.ts`, `knife-config.ts`, `swiper-config.ts`, `quality-config.ts`, `upgrade-config.ts` and `src/tower/tower-type.ts`. The table is `docs/tower-balance.csv`.

## Columns

-   `cost`: build cost in coins (`economyConfig.towerCost`).
-   `damage_type`: how the tower hits.
-   `base_damage`: mash damage per hit at level 1 (the Microwave value is its per-hit config number).
-   `attack_interval_s`: `cooldownMs / 1000`, the attack speed. The Swiper has no cooldown (0); its arm turns once every 5 s.
-   `range_px`: range in world pixels (the Swiper's is its arm length; the Knife's is its cut length).
-   `special_effect`: status effects and extra behavior.
-   `dps`: `base_damage / attack_interval_s`. The Microwave uses its continuous 45 damage per second. Cricket Trap and Swiper deal no damage, so 0.
-   `dps_per_coin`: `dps / cost`.

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
