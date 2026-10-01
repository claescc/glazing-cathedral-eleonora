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

## Verification

Run `node build-static.mjs`, `node tools/check-site.mjs` and `git diff --check`. The checker validates JavaScript syntax, tracked JSON, static IDs and local references. Browser checks should cover 320 px and 375 px phone widths, an expanded desktop width, all public routes, the Atlas dialog and the room menu. These checks do not constitute a complete accessibility certification or a factual review of ceramic source material.
