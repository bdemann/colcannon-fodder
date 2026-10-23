# Colcannon Fodder

A mashed potato tower defense game made for a "Mashup" game jam: cooking game + tower defense.

Potatoes march down the path toward the restaurant. Place a **Knife**, a **Boiling Pot**, and a
**Masher** beside the path so every potato arrives cut, cooked, and mashed. Customers love a
proper mash, grumble about half-done potatoes, and are furious about raw ones. Keep the restaurant
happy until the last potato is served and earn the title of **Mash Champ**.

## Play

Play in the browser: https://bdemann.github.io/colcannon-fodder/ (after the first deploy).

## How to play

Potatoes march along a path to the restaurant. Place a Knife, a Boiling Pot and a Masher beside
the path to cut, cook, and mash every one. A perfect mash makes customers happy; raw potatoes
make them furious. Customers order dishes: top mashed potatoes by hand (Q W E R, then click) to fill them before
the ticket runs out. Keep satisfaction above zero through every wave to become the Mash Champ.

## Controls

| Input                 | Action                                           |
| --------------------- | ------------------------------------------------ |
| `1` / `2` / `3`       | Pick Knife / Boiling Pot / Masher                |
| `Q` / `W` / `E` / `R` | Pick Butter / Scallions / Cabbage / Gravy        |
| Click                 | Build the selected tower, or top a mashed potato |
| Right click / `Esc`   | Cancel the selected tower                        |
| `Space`               | Start cooking from the title screen              |
| `R`                   | Restart after a run ends                         |

## Run locally

Requires Node.js 22 or newer.

```bash
npm ci
npx virmator frontend
```

Then open http://localhost:5173.

## Develop

-   Design: [`docs/spec.md`](docs/spec.md)
-   Work items: [GitHub issues](https://github.com/bdemann/colcannon-fodder/issues)
-   Engine notes and code conventions: [`CLAUDE.md`](CLAUDE.md)
-   `npm run test:all` runs every check CI runs.

Built with the [Antha engine](https://github.com/electrovir/antha), starting from
[antha-template](https://github.com/antha-engine/antha-template).

## Audio credits

<!-- cspell:words empacotatron Fupi -->

All included audio is CC0. The game music is `empacotatron_loop.ogg` by Fupi from
[Empacotatron](https://opengameart.org/content/empacotatron).
