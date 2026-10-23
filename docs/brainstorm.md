# Colcannon Fodder: brainstorm catalog

Every open-ended idea from the jam, digested and sorted. This is a living list: ideas are cheap,
decisions live in issues. Status: **Shipped**, **Jam** (planned before Sun Oct 25, 9:59 PM),
**Stretch** (only with spare time), **Post-jam**, **Parked** (deliberately not doing, with reasons).

## 1. Design pillars

These came out of the "TD or factory sim?" question and should guide every idea below.

1. **Principally a tower defense.** Threats come at you; you react spatially; pressure escalates;
   you lose by letting things through, not by being inefficient.
2. **Our inversion is the hook.** In a normal TD enemies must die before the end. Here potatoes
   **must reach the end**, but cooked. Success = processed arrival; failure = raw arrival, a stolen
   potato, or an unhappy customer. Lean into this; it's what makes it a mashup and not a reskin.
3. **Disruption over throughput.** When choosing between two ideas, prefer the one that breaks the
   flow (area effects, thieves, surprise waves, off-belt potatoes) over the one that optimizes it
   (splitters, ratios, logistics). A little factory flavor is fine; a factory game is not the goal.
4. **Every tower has a reason to use it and a reason not to**, beyond its price.
5. **Two hands:** set up the kitchen (TD), then plate on the fly (cooking game). Downtime should
   always have something to do.

### TD vs factory: what pushes which way

| Pushes toward **TD** (do more)              | Pushes toward **factory** (keep light)                 |
| ------------------------------------------- | ------------------------------------------------------ |
| Area effects, crowd control                 | Belt splitters/mergers                                 |
| Thieves and other things with agency        | Exact recipe ratios across lanes                       |
| Off-belt and airborne potatoes              | Throughput optimization puzzles                        |
| Escalating, surprising waves; boss potatoes | Long-running, set-and-forget chains                    |
| Spatial choices: range, corners, mazing     | Logistics (storage, buffers, routing for its own sake) |
| Losing from leaks                           | Losing from inefficiency                               |

## 2. Fiction and themes

| Idea                                        | Notes                                                                                                                                           | Status              |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| **Cozy kitchen + conveyor belt**            | The belt explains the motion; one belt speed for everything                                                                                     | Shipped (#37)       |
| **"Colcannon Fodder" literally: a siege**   | A potato army marches on the restaurant; the chef turns attackers into dinner. Spud cannons, catapults, paratrooper potatoes, sprouted infantry | Post-jam idea (#52) |
| **Irish vs English mash**                   | Champ (Irish), Colcannon (Irish), Bangers & Mash (English); **Mash Champ** title for the best                                                   | Shipped (#48/#49)   |
| **Utah** (the designer is a die-hard Utahn) | See section 6                                                                                                                                   | Ideas               |

## 3. Mechanics catalog

### Movement and threats

| Idea                           | What it adds                                                                            | TD-ness                                   | Status         |
| ------------------------------ | --------------------------------------------------------------------------------------- | ----------------------------------------- | -------------- |
| **Seagulls** (thieves)         | Fly in off-track, steal a potato (lost) or drop it further down the belt (skips towers) | High: off-track targets, disrupts flow    | Stretch (#50)  |
| **Long-legs** (tall sprouts)   | Leave the belt, walk the grass, step over the line                                      | High: field coverage                      | Post-jam (#52) |
| **Scurriers** (short sprouts)  | Fast but can't pass the queue                                                           | Medium: clumps reward the area-effect Pot | Post-jam (#52) |
| **Lobbed potatoes**            | Catapulted in an arc; mash them mid-air                                                 | High: anti-air towers                     | Post-jam (#52) |
| **Flyers** (wings, parachutes) | Steer toward the restaurant                                                             | High                                      | Post-jam (#52) |
| **Drop chutes**                | Potatoes enter mid-belt                                                                 | Medium                                    | Post-jam (#41) |
| **Scraper tower**              | Paddle wheel pushes potatoes back up the belt                                           | High: crowd control                       | Post-jam (#38) |

### Towers and trade-offs

The pillar: every tower has a reason to use it and a reason not to.

| Tower         | Reason to use                                            | Reason not to (besides cost)                                                                                                               | Status                          |
| ------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| Knife         | Fast; Cut makes every later hit 1.5x                     | Weak alone                                                                                                                                 | Shipped                         |
| Boiling Pot   | Splashes everything in range; Soft doubles Masher damage | Slow; idle when the belt is sparse. _Idea:_ over-boiling (too many Pot hits) makes potatoes waterlogged and lowers quality                 | Shipped; waterlogged is an idea |
| Masher        | Heavy finisher                                           | One potato at a time. _Idea:_ mashing a raw-hard potato makes **glue** (a quality hit), so soft order matters a little                     | Shipped; glue is an idea        |
| **Microwave** | Huge damage, near-instant "done"                         | Rubbery: the potato counts as done (saves satisfaction) but has low **quality**, which hurts **prestige**, pays less and can't fill orders | Post-jam (#55)                  |
| **Blender**   | Instant purée of everything in a small radius            | Gluey quality; scares customers                                                                                                            | Idea                            |

### Quality, satisfaction and prestige

A second axis alongside done or not done:

-   **Satisfaction** (exists) is the health bar: raw potatoes and expired orders drain it.
-   **Quality** (new) is how well a potato was cooked: right technique vs shortcuts (microwave, glue, waterlogged).
-   **Prestige** (new) is the restaurant's star rating from average quality. It could scale tips (coins), unlock harder or richer orders, and be the score that decides **Mash Champ**.

This gives shortcut towers a real cost: they keep you alive but make you worse.

### The belt

| Idea                               | Notes                                                                                                                                                                                                                                                    | Status                                                                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Belt throttle**                  | The player sets belt speed (slow / normal / fast). Slow means more tower exposure, but orders may expire and the run takes longer; fast means orders arrive in time but potatoes are less mashed. Cheap to build: belt speed is already one global value | Post-jam (#54); possible Sunday stretch                                                                       |
| **Player-built conveyor (mazing)** | The player lays or routes belt pieces between spawn and restaurant: longer routes mean more exposure but slower delivery (orders!). This is classic TD "mazing" (Fieldrunners, Desktop TD), so it's TD, not factory                                      | Post-jam (#56)                                                                                                |
| **Belt splits for recipe lanes**   | Split the belt so lanes make different dishes                                                                                                                                                                                                            | **Parked**: this is the factory pull (pillar 3). Revisit only if it creates disruption rather than throughput |
| **Winding preset belts**           | Corners give placement choices                                                                                                                                                                                                                           | Shipped (#13)                                                                                                 |

### Cooking and orders

| Idea                                                                               | Status                                           |
| ---------------------------------------------------------------------------------- | ------------------------------------------------ |
| Hand-applied toppings: Butter, Scallions, Cabbage, Gravy (Q/W/E/R)                 | Shipped (#48/#49)                                |
| Orders: Champ, Colcannon, Bangers & Mash, Buttered Mash; expiry costs satisfaction | Shipped                                          |
| Topping towers                                                                     | Parked: superseded by hand toppings (#39 closed) |
| Order **tips** scaled by quality/prestige                                          | Idea (with prestige)                             |

### Engagement after setup

| Idea                                                              | Status         |
| ----------------------------------------------------------------- | -------------- |
| Hand toppings + orders: the main answer                           | Shipped        |
| Tower wear: knives dull, pots run dry; click to sharpen or refill | Post-jam (#40) |
| Upgrades                                                          | Post-jam (#15) |
| Belt throttle as a live decision                                  | Post-jam (#54) |
| Power-up: Butter Rush                                             | Post-jam (#17) |

## 4. Content variety

| Idea                                                                                        | Status           |
| ------------------------------------------------------------------------------------------- | ---------------- |
| Sizes: small / medium / large (HP and value)                                                | Shipped (#37)    |
| "Full of eyes" (resists the Knife), dirty (needs a wash first), sweet potato, golden potato | Ideas (from #23) |
| Boss potato: the Russet King                                                                | Idea             |

## 5. Multiplayer

| Idea                                                                                                               | Status         |
| ------------------------------------------------------------------------------------------------------------------ | -------------- |
| One shared restaurant, a path per player; co-op total plus per-player score; top contributor is crowned Mash Champ | Post-jam (#14) |

## 6. Utah inspiration

Tracked in #57.

The designer's home state, and maybe the game's secret flavor.

| Idea                                                                                                                                 | How it could appear                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **The Miracle of the Gulls** (1848): California gulls ate the crickets destroying the pioneers' crops; the gull is Utah's state bird | **Twist on the thieves:** "Mormon crickets" swarm the belt and steal potatoes, and **seagulls are the heroes**: a Gull Roost tower that dives on crickets. Or keep seagulls as thieves, with a Seagull Monument easter egg |
| **Funeral potatoes** (the classic LDS potluck casserole: potatoes, cheese, cornflake topping)                                        | A **dish**: mash + Cheese + Cornflakes. A potato dish straight out of Utah                                                                                                                                                 |
| **Fry sauce**                                                                                                                        | A **topping** (it goes on everything in Utah)                                                                                                                                                                              |
| **Jell-O** (Utah's official snack)                                                                                                   | A **Jell-O tower** that wobbles and slows potatoes: the classic TD slow tower                                                                                                                                              |
| **Great Salt Lake**                                                                                                                  | A Salt topping; a salt-flats level                                                                                                                                                                                         |
| **Beehive State / Deseret**                                                                                                          | Honeybee helpers; a beehive tower icon                                                                                                                                                                                     |
| **Utah scones** (fry bread with honey butter)                                                                                        | Bonus dish or power-up ("Honey Butter Rush")                                                                                                                                                                               |

> Open: what are your other special interests? They could become themes, levels or easter eggs too.

## 7. Open questions

-   Thief creature: **seagulls** as thieves, or **crickets** as thieves with **seagulls as allies** (Utah's Miracle of the Gulls)?
-   Do we add **quality and prestige** (a second score axis), or keep satisfaction as the only stake?
-   **Belt throttle** as a Sunday stretch, or post-jam?
-   How far into Utah do we go: easter eggs, or the game's actual identity?
