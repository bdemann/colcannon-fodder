# Colcannon Fodder

A mashed potato tower defense game made for a "Mashup" game jam: cooking game + tower defense.

Potatoes march down the path toward the restaurant. Place a **Knife**, a **Boiling Pot**, and a
**Masher** beside the path so every potato arrives cut, cooked, and mashed. Customers love a
proper mash, grumble about half-done potatoes, and are furious about raw ones. Keep the restaurant
happy until the last potato is served and earn the title of **Mash Champ**.

## Play

Play in the browser: https://bdemann.github.io/colcannon-fodder/ (after the first deploy).

## How to play

### The idea

Potatoes ride a conveyor belt toward the restaurant. Every potato has to arrive **mashed**, so you
build cooking towers beside the belt and combine them into a combo. Customers love a proper mash,
grumble about half-done potatoes, and are furious about raw ones. Keep the restaurant's
satisfaction above zero until the last potato is served and you earn the title of **Mash Champ**.

### The combo

Each potato has a mash meter, and the Masher empties it. The other towers set it up:

-   **Cut** (Knife): hits on a cut potato do **x1.5** damage.
-   **Soft** (Boiling Pot): the Masher does **x2** damage to a cooked potato.
-   Cut and cooked together make a **x3 SMASH!**, shown as a floating hit number and status icons
    on the potato.

### The seven towers

| Key | Tower        | What it does                                                                                      |
| --- | ------------ | ------------------------------------------------------------------------------------------------- |
| `1` | Knife        | Fast. Cuts a short line straight across the belt (automatic), cutting every potato on that line.  |
| `2` | Boiling Pot  | Splashes every potato in range at once, softening (cooking) them.                                 |
| `3` | Masher       | Slow and heavy. The finisher: mashes one potato at a time.                                        |
| `4` | Microwave    | A shortcut. A cone of big damage, cheap, but it spoils the potato's quality (rubbery).            |
| `5` | Cricket Trap | Feeds a cricket to a seagull so it leaves happy. Long reload.                                     |
| `6` | Swiper       | A slow rotating paddle that swipes potatoes back up the belt, buying your other towers more time. |
| `7` | Laser        | Late game (150 coins). The aimable long line: aim it before building, it chops everything on it.  |

Towers cost coins. Click a built tower to **upgrade** it (3 levels: more damage and range, faster
cooldown), **sell** it for half of what you spent, or **service** it.

The Masher, Boiling Pot and Cricket Trap visibly throw things: a spinning potato masher (a meat
hammer from level 3), a blob of boiling water and a cricket. It is purely visual.

### Wear

Every tower wears out with use. A worn tower works at half strength until you service it for coins
(Sharpen, Refill, Oil, Clean or Restock, about a third of its build cost). The Cricket Trap wears
fastest.

### Toppings and orders

Customers post order tickets for dishes. Top a mashed potato by hand, at any stage, with the
toppings in the recipe, and send it through before the ticket runs out:

| Dish           | Toppings          |
| -------------- | ----------------- |
| Buttered Mash  | Butter            |
| Champ          | Scallions, Butter |
| Colcannon      | Cabbage, Butter   |
| Bangers & Mash | Gravy             |

The toppings must match the recipe exactly. A filled order pays bonus score, coins and
satisfaction; an expired one makes the customer unhappy. Orders need a potato of decent quality.

### Judged on arrival

A potato must be done done done before it reaches the restaurant. It is judged the instant it
arrives: perfect, incomplete (a penalty scaled by how far along it was) or raw. There is no queue
and no second chance.

### Seagulls

Seagulls (some fly, some walk) try to steal potatoes off the belt, and each escape costs a chunk
of satisfaction. Knock a gull out with your towers or feed it with a Cricket Trap to earn a bounty.

### Prestige and quality

Every potato has a quality that the Microwave wears down. **Prestige** (0 to 5
stars) is the average quality of your last ten perfect servings. To earn **Mash Champ** you need to
win with 3 or more stars, so shortcuts have a price.

### Coins and scoring

Perfect servings pay the most (bigger potatoes pay more), filled orders pay a bonus, and potatoes
that are eaten anyway pay a little. Knocked-out or fed seagulls pay a bounty. The pause menu has a
"How you earn" summary.

### Maps and modes

Pick a map and a mode on the title screen:

-   **Winding Way**: the classic winding belt.
-   **Double Back**: two long straights, Knife country.
-   **The Long Haul**: a big loop with a chute dropping potatoes mid-belt.
-   **The Fork**: potatoes split at a junction, so cover both roads.

**Campaign** runs five waves that get faster and denser, ending with the **Russet King** boss
potato. You win when the belt clears after the last wave. **Endless** generates waves forever, with
a boss every fifth wave. See how far you get.

Your best score and stars per map and mode, and the **Hall of Mash Champs** (your top five runs),
are saved in your browser.

## Controls

| Input                 | Action                                                                        |
| --------------------- | ----------------------------------------------------------------------------- |
| `1` to `7`            | Pick Knife / Boiling Pot / Masher / Microwave / Cricket Trap / Swiper / Laser |
| `Q` / `W` / `E` / `R` | Pick Butter / Scallions / Cabbage / Gravy                                     |
| Click                 | Build the selected tower, top a potato, or select a built tower               |
| Scroll / `[` `]`      | Aim the Laser before building it                                              |
| `U` / `S` / `X`       | With a built tower selected: Upgrade / Service / Sell                         |
| Right click / `Esc`   | Cancel the selected tower or topping                                          |
| `P` / `Esc`           | Pause (and resume); music and effects volume                                  |
| `F`                   | Fast-forward: cycle 1x / 1.5x / 2x / 3x                                       |
| `G`                   | Fast-forward until the next income                                            |
| `M`                   | Mute and unmute                                                               |
| `Space`               | Start cooking from the title screen                                           |
| `R`                   | Restart after a run ends                                                      |

## Run locally

Requires Node.js 22 or newer.

```bash
npm ci
npx virmator frontend
```

Then open http://localhost:5173.

## How it was made (AI disclosure)

-   The game concept, design direction and playtesting are by the human designer,
    [bdemann](https://github.com/bdemann).
-   **All code, art and documentation were produced by AI**: Claude (Anthropic) via Claude Code.
    Claude Opus planned the game and wrote the specs as GitHub issues, and Claude Sonnet subagents
    implemented them as pull requests.
-   All art is drawn in code. No AI image generation was used.
-   The designer never edited the code by hand.
-   The [issues](https://github.com/bdemann/colcannon-fodder/issues?q=is%3Aissue) and
    [pull requests](https://github.com/bdemann/colcannon-fodder/pulls?q=is%3Apr) are the build log.

The jam page text is in [`docs/jam-submission.md`](docs/jam-submission.md).

## Develop

-   Design: [`docs/spec.md`](docs/spec.md)
-   Work items: [GitHub issues](https://github.com/bdemann/colcannon-fodder/issues)
-   Engine notes and code conventions: [`CLAUDE.md`](CLAUDE.md)
-   `npm run test:all` runs every check CI runs.

## Credits

-   Engine: the [Antha engine](https://github.com/electrovir/antha) by electrovir, starting from
    [antha-template](https://github.com/antha-engine/antha-template) (MIT / CC0).
-   Font: [Fredoka](https://fonts.google.com/specimen/Fredoka) from Google Fonts (SIL Open Font
    License).
-   Music: see below.

## Audio credits

<!-- cspell:words empacotatron Fupi -->

All included audio is CC0. The game music is `empacotatron_loop.ogg` by Fupi from
[Empacotatron](https://opengameart.org/content/empacotatron).
