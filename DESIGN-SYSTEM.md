# Ceramics Cathedral design system

Updated 25 September 2026. This documents the local refactor, not a production deployment or accessibility certification.

## Ownership

- `material3.css`: shared colour, type, shape, elevation, spacing and motion tokens.
- `styles.css`: site components and responsive behaviour, mobile base first.
- `typography.css`: specimen layout only, not another theme.
- `typography.html` and `design-system.js`: live catalogue of shared roles and computed values.
- `library.css`: retired compatibility file; not loaded by either page.
- `app.js`: Atlas, glaze details, recipe calculator, learning sections and notebook.
- `source-library.js`: sole owner of source catalogue, search and source reader.
- Data scripts, source JSON and photographs: preserved as evidence, not restyled content.

## Design contract

- Baseline 375 × 667 CSS px; also check 320 px reflow. Single-column base, two columns at 600 px, expanded layouts at 840 px and four-column collections at 1200 px.
- Montserrat 400 for body, 500 for supporting controls, 600 for prominent titles and labels. Technical numbers use Google Sans Code.
- Brand-adapted Material 3 role names and scale. Semibold headings and a 14 px small-body/label floor are project choices, not unmodified Google defaults. The compact navigation uses 12 px labels with 24 px icons and large targets.
- Light sand/canvas and pastel washes support reading; candy-pastel panels identify rooms; sunflower `#FEC125` remains the signature action accent. The 60/30/10 direction is compositional, not a pixel quota or accessibility standard.
- Controls target at least 48 px height; navigation icons remain 24 px, distinct from touch target size.
- Text wraps. Cards do not hide long names with ellipses. Shared desktop card rows align metadata, title, description and source.
- Digital cone previews remain visibly labelled. Original photographs remain in the detail view. Missing photographs are identified, not fabricated.
- All records are included by default. Photograph-only filtering is opt-in.
- Source materials and ceramic evidence are outside this presentation refactor's factual-review scope.

## Components and states

### Exact reference highlights, 25 September 2026

Added all 17 printed hex codes supplied in the three reference images as `--highlight-*` tokens. Used for room header strips, room-card edges, selected record/view filters, counts, and lesson/history badges. These are interface accents, not glaze-colour evidence or new error semantics. Sunflower remains the primary action colour.

Palette: #00418D, #00C2DE, #00BA71, #FAD717, #FA8901, #F43545, #FF70A6, #FFD670, #70D6FF, #9B5DE5, #B7EFC5, #FA6977, #F0B967, #FAF278, #9AE66E, #87D5F8, #CE81F8.

Text pairing: white on #00418D; #0D0B10 on the other highlights. All 17 solid-colour pairings calculate above 4.5:1. The public design guide contains every exact swatch. Browser inspection verified all 17 rendered history badge values and the 375 px Atlas layout without horizontal overflow. This is not a full accessibility recertification.

### Candy-pastel extension, 25 September 2026

User-approved direction: happy, vibrant text and special sections, inspired by the supplied palette reference. Extended brand tokens live in `material3.css`; section and card assignments live in `styles.css`. They do not change semantic error colours or photographic evidence. Room names remain explicit; colour is not the only identifier.

| Pastel container | Companion ink | Measured contrast | Use |
| --- | --- | --- | --- |
| Lilac #EDE2FF | Violet #6330A3 | 6.82:1 | Atlas, learning path, masters |
| Peach #FFE3D0 | Burnt orange #9A461C | 5.25:1 | Recipes, kiln |
| Aqua #D6F5F1 | Teal #076C65 | 5.44:1 | Source search, materials |
| Pink #FFE0ED | Berry #9B2460 | 6.09:1 | Layering, notebook |
| Sky #DEEFFF | Blue #185B96 | 6.01:1 | Routes, restoration |
| Lemon #FFF2B8 | Golden ink #705800 | 6.04:1 | Floor plan, reading room |

Contrast calculated from rendered solid sRGB heading/container pairs. Browser checks at 320, 375, 840 and 1280 px found no page-width overflow after this colour update. Mobile opening and desktop Atlas/Recipe panels were visually inspected. Recipe and source data were not edited.

| Family | Behaviour and states |
| --- | --- |
| Buttons / links | Primary sunflower, outlined secondary, mint selected; focus, hover, active and disabled states. Native keyboard activation. |
| Navigation | Rooms disclosure with expanded state and Escape; mobile five-destination navigation with current state. |
| Fields | Visible or programmatic labels, focus ring, wrapped layouts; calculator inline error and invalid state. |
| Filters | Pressed state exposed; result counts announced; no-results message. |
| Cards | Consistent image frame and text hierarchy; entire Atlas card opens its named record. |
| Collections | Explicit progressive loading for Atlas, recipes and search; no nested recipe scrolling area. |
| Glaze dialog | Full-screen mobile, expanded desktop; initial focus, Tab containment, Escape and return focus. Background inert. |
| Source reader | Native modal dialog; loading/error states; page controls disabled during loading; stale request guard; nested focus restoration. |
| Notebook | Saves locally on the current device; save/remove state and count. Malformed stored arrays no longer stop initialization. |
| Learning / history / materials | Shared spacing, readable text, separated photo and caption. Missing diagnostic evidence remains disclosed. |

## Verification recorded on 25 September 2026

| Check | Observed result |
| --- | --- |
| Atlas | 291/291 rendered cards clicked; each dialog title matched its originating card; each closed successfully. |
| Data preservation | Evaluated recipe and historical-family objects equal to HEAD: 291 records, unchanged. |
| Reflow | Page and all main sections had no horizontal overflow at 320, 375, 600, 840 and 1280 CSS px. |
| Mobile visual inspection | Atlas, long-title recipe dialog, nested source reader and design guide inspected at 375 px; desktop card alignment inspected. |
| Controls | Rendered buttons, fields, selects, summaries and mobile links had no target below 44 × 44 px in the tested state; no unlabelled visible form controls found. |
| Recipe calculator | 1000 g scaling checked; negative input shows an error and suppresses weights. |
| Modal behaviour | Escape returned focus to the Atlas card; nested source reader returned focus to its recipe source button. |
| Navigation | Rooms expanded and Escape collapsed it with aria-expanded=false. |
| Notebook | Save incremented count from 0 to 1; removal restored 0. Test favourite removed. |
| Catalogue/search | Hamer filter returned the matching source; unmatched search reported zero results. |
| Pagination | Recipe list advanced from 12 to 24; Atlas advanced to all 291 records. |
| Runtime | No captured JavaScript errors or failed loaded images in tested state. |
| Build | Node syntax checks passed; 126 tracked JSON files parsed; page-linked local assets and required output files present. |

### Measured colour pairs

| Role | Foreground | Background | Contrast |
| --- | --- | --- | --- |
| Body | #2D2B26 | #FFF9EF | 13.50:1 |
| Secondary text | #625D54 | #FFFDF8 | 6.43:1 |
| Sunflower action | #3C2F10 | #FEC125 | 8.01:1 |
| Mint selected | #203C2B | #D7EBDC | 9.64:1 |
| Inverse brown | #FFFFFF | #665326 | 7.42:1 |
| Control outline | #81786B | #FFFDF8 | 4.27:1 |

Calculated from the rendered solid sRGB theme values. This does not measure every image, transparency, hover state or text/background combination.

## Repeatable checks

Run `node build-static.mjs` then `node tools/check-site.mjs`. The checker validates script syntax, tracked JSON, duplicate static IDs, local page references and required build files. It does not replace browser testing.

## Outstanding verification boundaries

- VoiceOver/NVDA and real iPhone Safari / Android hardware have not been tested in this pass.
- Browser viewport reflow was tested; actual OS text scaling and browser zoom interaction still need manual checks.
- Image accuracy, historical claims, recipe safety and full-book completeness were not re-certified by this refactor.
- No claim of complete WCAG, legal or unmodified Material 3 conformance is made.
- External fonts still require network access; system fallbacks are declared.

## References

- Google: Material Design 3 typography: https://m3.material.io/styles/typography/type-scale-tokens
- W3C: Understanding SC 1.4.10 Reflow: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html (consulted 25 September 2026; 320 CSS px reflow criterion).
