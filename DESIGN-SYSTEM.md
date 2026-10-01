# Eleonora Ceramics Material 3 design system

Updated 1 October 2026.

## Source and scope

The supplied `Material Design 3 - M3` PNG kit provides visual references for layouts, navigation, buttons, search, cards, lists, fields, dialogs and responsive behaviour. The site implements those patterns in plain HTML and CSS. Google’s [Material Design 3 foundations](https://m3.material.io/foundations/) and [canonical layout examples](https://m3.material.io/foundations/layout/canonical-examples/overview) provide the underlying system guidance.

The redesign applies to the whole public site: Home, Atlas, Recipes, Layering, Learn, Kiln, Materials, Restoration, Masters, Tribute, Notebook and Reading. Ceramic records, recipes, source citations and photographs remain owned by their existing data files.

## Implementation

- `material3.css` owns base M3 tokens and compatibility aliases used by existing components.
- `m3-site.css` owns the active light, dark and high contrast theme, adaptive scaffold and component presentation.
- `styles.css` retains content-specific layout and interaction styling. `ceramic-palette.css` is no longer loaded by public pages.
- `theme.js` handles the appearance preference.
- `index.html` is the source page. `page-routes.mjs` generates the other public routes, and `build-static.mjs` prepares `dist/`.
- `typography.html` displays the active type and colour roles.

## Layout and components

- Compact widths use the M3 navigation bar. At 840 CSS px and above it becomes a leading navigation rail. All destinations remain available through the All rooms menu.
- The top app bar holds the brand, library search, room menu, appearance control and Notebook shortcut where space allows.
- Collections use image cards and lists; search fields, filter chips, selects and dialogs share the semantic colour, shape and state system.
- The Home page uses a featured introduction, actual ceramic imagery, room cards and curated routes.
- Roboto is the interface and reading face. Google Sans Code is retained for technical values. Material Symbols Rounded supplies icons.
- Light, dark and high contrast modes are available. The semantic M3 colours are applied through `--md-sys-color-*` roles. Ceramic photographs retain their source colours.

## Ceramic window stories

The user's 1 October refinement adds imagery to all eight floor-plan cards and gives them cobalt, rose, ember, ochre, jade, amethyst, terracotta and teal identities. Arched card media mixes existing ceramic source photographs with crops of one original decorative mural. The mural follows mineral earth, hands shaping clay, kiln fire, glazing and studio knowledge. It is generated illustration, not source evidence. Its generation prompt and provenance are in `assets/artwork/README.md`.

The same story colours map to M3 semantic roles on each destination, with light and dark pairings, tinted collection cards, chapter-header artwork, and a dark teal footer. At 375 px the floor plan uses two columns; at 840 px it uses four. The 320 px route check found no horizontal overflow on the 12 public destinations. Measured floor-plan title, description and label pairs range from 5.54:1 to 9.37:1 in the tested light mode. This is scoped contrast evidence, not an accessibility certification.

## Verification

Run `node build-static.mjs`, `node tools/check-site.mjs` and `git diff --check`. The checker validates JavaScript syntax, tracked JSON, static IDs and local references. Browser checks should cover 320 px and 375 px phone widths, an expanded desktop width, all public routes, the Atlas dialog and the room menu. These checks do not constitute a complete accessibility certification or a factual review of ceramic source material.
