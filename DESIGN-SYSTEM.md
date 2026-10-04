# Eleonora Ceramics Material 3 design system

Updated 4 October 2026.

## Source and scope

The supplied `Material Design 3 - M3` PNG kit provides visual references for layouts, navigation, buttons, search, cards, lists, fields, dialogs and responsive behaviour. The site implements those patterns in plain HTML and CSS. Google’s [Material Design 3 foundations](https://m3.material.io/foundations/) and [canonical layout examples](https://m3.material.io/foundations/layout/canonical-examples/overview) provide the underlying system guidance.

The redesign applies to the whole public site: Home, Atlas, Glaze Families, Recipes, Layering, Learn, Kiln, Materials, Restoration, Masters, Tribute, Notebook and Reading. Ceramic records, recipes, source citations and photographs remain owned by their existing data files.

## Implementation

- `material3.css` owns base M3 tokens and compatibility aliases used by existing components.
- `m3-site.css` owns the active light, dark and high contrast theme, adaptive scaffold and component presentation.
- `styles.css` retains content-specific layout and interaction styling. `ceramic-palette.css` is no longer loaded by public pages.
- `theme.js` handles the appearance preference.
- `index.html` is the source page. `page-routes.mjs` generates the other public routes, and `build-static.mjs` prepares `dist/`.
- `typography.html` displays the active type and colour roles.

## Layout and components

- Compact widths use Home, Atlas, Recipes, Learn and Rooms in the navigation bar. At 840 CSS px and above, a labelled navigation drawer exposes Reading Room, Materials Archive, Kiln Chapel, Layering Laboratory, Hall of Masters and Restoration Room directly.
- The top app bar holds the brand, library search, Saved and Settings at every supported width. Settings uses a native dialog and appearance radio choices. System is the initial preference; choices made in the new panel persist. The previous dropdown preference is replaced by a versioned preference key.
- Atlas has visible route navigation for Colour atlas and Glaze families. Colour swatches retain labels, selection rings and checks. Record type, firing range, source, image evidence and sorting are visible labelled selects. Glaze families has its own open guide and historic surface gallery, with shareable Atlas search links.
- Recipes starts with Find a formula, Plan glaze layers and Read the source books. Atlas initially renders 36 matches and Recipes 24. Show more appends the next group and focuses its first card. Search and filters operate on the complete collections.
- Action buttons use explicit semantic foreground/background pairs. Navigation uses links, appearance uses radios, and catalogue choices use selects or swatches.
- The Home page uses a featured introduction, actual ceramic imagery, room cards and curated routes.
- Roboto is the interface and reading face. Google Sans Code is retained for technical values. Material Symbols Rounded supplies icons.
- Light, dark and high contrast modes are available. The semantic M3 colours are applied through `--md-sys-color-*` roles. Ceramic photographs retain their source colours.

## Ceramic window stories

The user's 1 October refinement adds imagery to all eight floor-plan cards and gives them cobalt, rose, ember, ochre, jade, amethyst, terracotta and teal identities. Arched card media mixes existing ceramic source photographs with crops of one original decorative mural. The mural follows mineral earth, hands shaping clay, kiln fire, glazing and studio knowledge. It is generated illustration, not source evidence. Its generation prompt and provenance are in `assets/artwork/README.md`.

The same story colours map to M3 semantic roles on each destination, with light and dark pairings, tinted collection cards, chapter-header artwork, and a dark teal footer. At 375 px the floor plan uses two columns; at 840 px it uses four. The 320 px route check found no horizontal overflow on the 12 public destinations. Measured floor-plan title, description and label pairs range from 5.54:1 to 9.37:1 in the tested light mode. This is scoped contrast evidence, not an accessibility certification.

## Verification

Run `node build-static.mjs`, `node tools/check-site.mjs` and `git diff --check`. The checker validates JavaScript syntax, tracked JSON, static IDs and local references. Browser checks should cover 320 px and 375 px phone widths, an expanded desktop width, all public routes, the Atlas dialog and the room menu. These checks do not constitute a complete accessibility certification or a factual review of ceramic source material.

## Interior libraries and gallery · 2 October 2026

Atlas, Glaze Families and Recipes open directly on their task heading. Other interior routes retain a compact decorative ceramic illustration alongside their title panel. Recipes use searchable parchment book cards with actual source photographs; Learn has eight chapter links and reading panels; Masters uses arched surface-reference gallery cards. Georgia is the editorial display face on these book and gallery titles, while M3 controls retain Roboto. Generated artwork is labelled as decorative; historical attribution is never inferred from it. Asset prompts and provenance are recorded in `assets/artwork/README.md`.

## Navigation and control verification · 4 October 2026

The browser pass covers 13 destinations at 320, 375, 700, 1024 and 1440 CSS px, including room discovery, Saved/Settings visibility, button labels and horizontal overflow. Interaction checks cover System appearance changes, persistence, native dialog Escape/focus return, swatch keyboard selection, catalogue pagination, taxonomy search links and opening/closing a recipe formula. Rendered text in visible buttons, links, selects and summaries was checked against the 4.5:1 normal-text and 3:1 large-text thresholds across 12 routes in light, dark and high contrast modes after theme transitions settled. These are scoped checks, not a complete accessibility certification.
