# Art and audio asset scouting

Research only: nothing here has been downloaded or added to the repo. Research date: 2026-10-23.

**Verification legend.** "Verified" means the license appeared on the asset's own page when fetched. "Secondhand" means it came from a search snippet or a mirror site. "Unverified" means we could not confirm it. Re-check the license on the page before downloading anything, and keep a `CREDITS` entry for every file used.

## Recommendation

Build the look around a small number of sources. Tiny pixel packs are the most consistent, cheapest option, but nothing out there covers our cast directly, so expect a custom-art gap.

1. **Kenney UI Pack** (CC0, verified): buttons, panels, sliders in 5 colors. Covers all UI chrome. Pair with game-icons.net for coin, star and wrench icons.
2. **Kenney Tiny Factory + Tiny Farm** (CC0, 16x16 pixel, verified): conveyor belts (including corner pieces), grass and farm tiles, crates, chutes and machinery. These two share a style, so they are the safest base for the world and the conveyor.
3. **Kenney Roguelike Indoor Pack** (CC0, verified): kitchen pieces, counters, furniture for the restaurant and kitchen floor. It is 16x16 in the same Kenney family as Tiny Factory. Check the tile size when you open the pack, because the page does not state it.
4. **Kenney Particle Pack** (CC0, verified) for steam, sparkles and splash blobs, plus Kenney audio packs (CC0) for UI and impact sounds.
5. **Google Fonts: Fredoka** (OFL, secondhand) as the cute display font. Baloo 2 and Lilita One are good alternates.
6. **Music and SFX**: OpenGameArt CC0 loops, plus Freesound filtered to CC0 for the chop, sizzle and seagull sounds.

**Gaps we would make ourselves** (nothing suitable and license-clean found):

-   All potato variants (raw, sliced, boiled with steam, mashed blob, three sizes) and the crowned boss. This is the most important and most unique art, so make it in a consistent vector or pixel style.
-   Toppings: butter pat, scallions, cabbage, gravy. Small food icon packs may cover some as placeholders.
-   Towers: cleaver block, pot on burner, masher, microwave, cricket trap, rotating paddle. Some pieces may be kitchen props in the Kenney packs, but towers need to be bespoke to read at a glance.
-   Seagull with walk and fly animations. The best lead is a CC0 sketch sheet (see below), so plan to draw our own.
-   Heat lamp and serving counter with the lamp.
-   Cartoon splash sheet. We found CC0 smoke, but no cartoon splash.

**Style-consistency warning.** Kenney 16x16 pixel packs, Kenney UI (smooth flat shapes), Kenney Particles (soft 512px glow sprites) and game-icons.net (monochrome vector glyphs) are four different looks. Decide early: either (a) go pixel at 16x16 scaled 3 to 4x for the world and use the UI Pack's flat style only for HUD, or (b) go flat vector for everything and use Kenney only as placeholder art. Do not mix itch.io pixel packs of other sizes (24px, 32px) with 16px Kenney tiles.

## World, tiles, conveyor, kitchen

| Name                                     | URL                                                                    | License                                                               | Covers                                                   | Style                                                | Fit | Notes                                                                                                 |
| ---------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------- | --- | ----------------------------------------------------------------------------------------------------- |
| Kenney Tiny Factory                      | https://kenney.nl/assets/tiny-factory                                  | CC0, verified. No attribution required, commercial use OK.            | Conveyor (straight and corner likely), chutes, machinery | Pixel, 16x16, 130 files                              | 4   | Tags include conveyor and factory. Individual files not listed on the page, so confirm corner pieces. |
| Kenney Tiny Farm                         | https://kenney.nl/assets/tiny-farm                                     | CC0, verified                                                         | Grass, ground, crops                                     | Pixel, 16x16, 130 files                              | 3   | Good grass background. Page does not list contents.                                                   |
| Kenney Roguelike Indoor Pack             | https://opengameart.org/content/roguelike-indoor-pack                  | CC0, verified. Credit "Kenney.nl" suggested, not required.            | Kitchen floor, counters, restaurant furniture            | Pixel spritesheet, 480 sprites, tile size not stated | 4   | Closest to a kitchen set. Dark dungeon-ish palette in places.                                         |
| Kenney Roguelike/RPG Pack                | https://opengameart.org/content/roguelikerpg-pack-1700-tiles           | CC0 (secondhand via search snippet)                                   | Terrain, props                                           | Pixel 16x16, about 1700 tiles                        | 3   | Same family as the indoor pack.                                                                       |
| pixel_prismor food game assets           | https://pixel-prismor.itch.io/food-game-assets                         | CC0, verified on page. Name-your-own-price (can be free).             | Food and drink sprites                                   | Pixel top-down, size not stated                      | 2   | Tagged AI-assisted by the author. Check content and size before use.                                  |
| Hooded Crow Kitchen assets               | https://hoodedcrow.itch.io/kitchen-assets                              | Unverified. A commenter asked about the license with no clear answer. | Stove, sink, fridge, microwave                           | Pixel, 32x32 tiles                                   | 2   | Do not use until the license is confirmed. Size also clashes with 16px Kenney.                        |
| Neivik Kitchen destructible objects      | https://neivik.itch.io/kitchen-destructible-objects                    | Author says free for commercial use; no named license (secondhand).   | Kitchen props                                            | Pixel 32x32 top-down                                 | 2   | License is informal and the size is different.                                                        |
| Sweeetpotatoo top-down kitchen furniture | https://sweeetpotatoo.itch.io/top-down-kitchen-furnitures-pixel-assets | Unverified ("free to use" per snippet)                                | Kitchen furniture                                        | Pixel top-down                                       | 2   | Confirm license first.                                                                                |
| LPC Foods                                | https://opengameart.org/content/food                                   | Mixed (many CC0, some others), per snippet                            | Produce and meat icons                                   | Pixel, LPC style                                     | 2   | Per-file licensing makes this risky.                                                                  |

## Food, potatoes, toppings

Nothing found covers potato variants. Treat everything here as placeholder or reference.

| Name                    | URL                                                 | License                                                         | Covers                                            | Style            | Fit | Notes                                                     |
| ----------------------- | --------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------- | ---------------- | --- | --------------------------------------------------------- |
| AntumDeluge food icons  | https://opengameart.org/node/45781                  | CC0 (secondhand; author says collected from CC0 sources)        | Generic food icons incl. possible potato, cabbage | Pixel 32x32      | 2   | Not guaranteed to match our needs. Check the exact page.  |
| piiixl Food             | https://piiixl.itch.io/food                         | CC BY 4.0 (secondhand), attribution required. About $2 minimum. | Food and kitchenware icons                        | Pixel about 24px | 2   | Attribution is fine, but a paid pack of a different size. |
| Ghostpixxells pixelfood | https://ghostpixxells.itch.io/pixelfood             | Unverified                                                      | Food sprites                                      | Pixel            | 2   | License not checked.                                      |
| Kenney Food Kit         | https://opengameart.org/ (search "Kenney Food Kit") | CC0 (secondhand)                                                | Food models                                       | 3D, low-poly     | 1   | 3D only. Not usable as 2D sprites without rendering.      |

## Towers and props

| Name                                     | URL                    | License                                                                                                                                                                 | Covers                                                | Style                                            | Fit | Notes                                                                                                                                                                                               |
| ---------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------ | --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| game-icons.net                           | https://game-icons.net | CC BY 3.0, verified. Attribution required (credit the author, e.g. "Icons made by Lorc. Available on https://game-icons.net"). Free commercial use as long as credited. | Icons for knife, cleaver, pot, flame, etc.            | Monochrome vector (SVG/PNG), single-color glyphs | 3   | Good for tower icons in menus, not for in-world sprites. Credits are per author (Lorc, Delapouite and others), so track the author of each icon used. We did not verify which specific icons exist. |
| Kenney Tiny Factory and Roguelike Indoor | see above              | CC0                                                                                                                                                                     | Burner, machinery, microwave-like props (unconfirmed) | Pixel 16x16                                      | 3   | Contents not listed on pages. Open the previews to see which props fit.                                                                                                                             |

## Seagull

| Name                        | URL                                              | License                                                                  | Covers                      | Style                                                                        | Fit | Notes                                                                            |
| --------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------ | --------------------------- | ---------------------------------------------------------------------------- | --- | -------------------------------------------------------------------------------- |
| OH GULLY by Spring Spring   | https://opengameart.org/node/87393               | CC0, verified. No attribution required.                                  | Seagull sprites             | Two PNG files (about 20 KB and 32 KB); "possible sprites for a seagull game" | 3   | Page does not state frame layout; walk cycle not confirmed. Likely needs rework. |
| Animated Birds (32x32)      | https://opengameart.org/node/10651               | CC0 (secondhand)                                                         | Bird flying and walk cycles | Pixel 32x32                                                                  | 2   | Not a seagull. Size mismatch with 16px. Recolor candidate.                       |
| Seagull Animation Pixel Art | https://makinggamesinc.itch.io/seagull-pixel-art | Free for personal and commercial; no resale as-is (secondhand). Not CC0. | Seagull flying              | Pixel 32x32                                                                  | 2   | Flying only.                                                                     |
| Pigeon Pixel                | https://kangjung.itch.io/pigeon-pixel            | No redistribution (secondhand)                                           | Walk and fly bird           | Pixel                                                                        | 1   | Pigeon, not gull; license restrictive.                                           |

## Buildings

No building or heat lamp art was found. The restaurant and serving counter should be composed from Roguelike Indoor tiles or drawn by us. Heat lamp is a custom piece.

## UI

| Name                     | URL                                               | License             | Covers                        | Style                                                    | Fit | Notes                                                                  |
| ------------------------ | ------------------------------------------------- | ------------------- | ----------------------------- | -------------------------------------------------------- | --- | ---------------------------------------------------------------------- |
| Kenney UI Pack           | https://kenney.nl/assets/ui-pack                  | CC0, verified       | Buttons, panels, sliders      | Flat 2D, 430 files, 5 colors (vector status unconfirmed) | 5   | Best UI source. Style is clean flat, not pixel.                        |
| Kenney UI Pack Adventure | https://opengameart.org/content/ui-pack-adventure | CC0 (secondhand)    | Themed panels and buttons     | 128 sprites                                              | 3   | Warmer, more "storybook" than the plain pack. Pick one family.         |
| game-icons.net           | https://game-icons.net                            | CC BY 3.0, verified | Coin, star, wrench-type icons | Monochrome vector                                        | 3   | Attribution required. Search for the specific icons before committing. |

## Particles and effects

| Name                       | URL                                                | License          | Covers                              | Style                                                | Fit | Notes                                                                        |
| -------------------------- | -------------------------------------------------- | ---------------- | ----------------------------------- | ---------------------------------------------------- | --- | ---------------------------------------------------------------------------- |
| Kenney Particle Pack       | https://kenney.nl/assets/particle-pack             | CC0, verified    | Steam, sparkles, smoke puffs, glows | 80 files, 512x512, soft white sprites (tint in Pixi) | 4   | Tintable. Good for steam and sparkle. Splash would be made from blob shapes. |
| Swirling prerendered smoke | https://opengameart.org/node/16871                 | CC0 (secondhand) | Steam from pots                     | 256x256, 15 or 30 frames                             | 2   | Realistic, may clash with a cartoon look.                                    |
| Smoke Sprite Sheet         | https://opengameart.org/content/smoke-sprite-sheet | CC0 (secondhand) | Smoke                               | Single PNG                                           | 2   | Same caveat.                                                                 |

## Fonts

| Name         | URL                                            | License                                                                                                       | Covers       | Style                     | Fit | Notes                         |
| ------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------- | --- | ----------------------------- |
| Fredoka      | https://fonts.google.com/specimen/Fredoka      | OFL (secondhand; the Google Fonts license page did not load in our fetch). Commercial use OK, no attribution. | Display font | Rounded, chunky, variable | 5   | Cozy and readable.            |
| Baloo 2      | https://fonts.google.com/specimen/Baloo+2      | OFL (secondhand)                                                                                              | Display font | Heavier, rounder          | 4   | Good alternate.               |
| Chewy        | https://fonts.google.com/specimen/Chewy        | OFL (secondhand)                                                                                              | Display font | Gummy and playful         | 3   | Less readable at small sizes. |
| Lilita One   | https://fonts.google.com/specimen/Lilita+One   | OFL (secondhand)                                                                                              | Display font | Bold, soft                | 4   | Good for titles.              |
| Grandstander | https://fonts.google.com/specimen/Grandstander | OFL (secondhand)                                                                                              | Display font | Bouncy, variable          | 3   | Playful.                      |

## Audio

| Name                                                   | URL                                                 | License                                                                                                          | Covers                               | Notes                                                                                                                                                  | Fit |
| ------------------------------------------------------ | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| Kenney Impact Sounds                                   | https://kenney.nl/assets/impact-sounds              | CC0, verified. 130 files.                                                                                        | Thuds, foley, squish-like impacts    | Likely covers chop and thump; contents not listed.                                                                                                     | 4   |
| Kenney Interface Sounds                                | https://opengameart.org/content/interface-sounds    | CC0 (secondhand). About 100 OGG files.                                                                           | UI clicks, confirmations             | Credit optional.                                                                                                                                       | 5   |
| Freesound (CC0 filter)                                 | https://freesound.org                               | CC0 per sound. Verified from the FAQ: CC0 needs no attribution, CC-BY (by sound) does. Login needed to download. | Chop, sizzle, squish, seagull squawk | We could not find a specific CC0 sound for each term. Search "knife chop", "sizzle", "seagull" with the license filter set to CC0, and check each one. | 4   |
| In the Lobby                                           | https://opengameart.org/node/183286                 | CC0 (secondhand). Lo-fi, loopable, 27.8 MB WAV.                                                                  | Cozy music loop                      | Convert to OGG or MP3 for the web.                                                                                                                     | 3   |
| relax_background1                                      | https://opengameart.org/content/relaxbackground1    | CC0 (secondhand)                                                                                                 | Menu, town or shop music             | Simple, 353 downloads.                                                                                                                                 | 3   |
| Sherwood                                               | https://opengameart.org/content/sherwood            | CC0 (secondhand); uploader asks for credit to Chris Murphy                                                       | Chill loop                           | Give credit anyway.                                                                                                                                    | 3   |
| Itch.io kitchen SFX packs (Gravity Sound, rawAmbience) | https://gravity-sound.itch.io/kitchen-sound-effects | Paid ($10 to $11), license not stated                                                                            | Kitchen foley                        | Not free. Listed only as a fallback.                                                                                                                   | 1   |

## Open questions

-   Confirm every "secondhand" license on the asset's own page before downloading.
-   Check which props (microwave, burner, conveyor corners) actually exist in Tiny Factory and Roguelike Indoor by viewing the previews.
-   Decide pixel versus flat vector before commissioning or drawing the custom art.
-   Kenney Sokoban, Tiny Town and Tiny Dungeon were searched for but not verified, so they are not recommended here.
