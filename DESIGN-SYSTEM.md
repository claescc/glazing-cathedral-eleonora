# Eleonora Ceramics Material 3 design system

Updated 4 October 2026.

## Architecture contract

`PRODUCT-ARCHITECTURE.md` is the canonical product and information-architecture contract. This document implements that contract visually. The shared hierarchy is global shell → room/page identity → local navigation → task controls → content/contextual links. Room colour and editorial character may vary; interaction grammar may not.

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
- Atlas has visible local navigation for Colour atlas and Glaze families. Search and surface type remain primary task controls. On compact screens colour and advanced filters use progressive disclosure; active advanced filters retain a count indicator. Result count, sort and display mode form one subordinate results toolbar immediately before catalogue content. Expanded layouts may expose filters without changing their semantic order. Glaze families has its own open guide and historic surface gallery, with shareable Atlas search links.
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

## Default artwork fit inside arches · 10 October 2026

Cathedral artwork cards display the complete image with `object-fit: contain` and centred positioning. Reserve internal space for the arch curvature so the image does not clip against its corners. This is the default across amphorae, documented artist records, Hall of Masters gallery cards and featured artwork. Do not use `cover` for artwork; decorative illustrations are separate from artwork records. Check portrait and landscape images at compact and expanded widths when introducing a new arched card.

## Shared Cathedral card primitive · 10 October 2026

Home room cards, recipe records, learning chapters, amphorae and Masters records share the Cathedral card primitive. `--cathedral-card-arch`, `--cathedral-card-border`, `--cathedral-card-ink` and `--cathedral-card-image-height` own its geometry and presentation; `--cathedral-card-tone` provides a content or room variant. Existing component selectors adapt to this primitive; new cards can use `.cathedral-card`. Artwork uses centred `contain` with clearance for the arch. Decorative room illustrations retain their separate background treatment. Task controls and reading panels keep their existing interaction and reading structure.

## Shared Cathedral media atom · 12 October 2026

`cathedral-media.js` defines `<cathedral-media>` and the `cathedralMedia()` renderer. All chapter, lesson, recipe, room-discovery, kiln, material, restoration, timeline, exhibition, saved, related-surface and artwork-card photographs consume this atom. `cathedral-media.css` composes the atom with existing card content; it does not own image fit. `arched-rooms.css` now owns only the approved room content width.

The atom uses an open shadow root: the photograph has `width:100%` and `height:auto`, preserving its complete source proportions without padding or an image mask. The frame owns the arch boundary with zero padding and a transparent background. The photograph starts at the top of the frame; the frame clips only the arch corners. No blank cap is inserted. Legacy size attributes are accepted but do not constrain photographs to thumbnail heights. Rectangle is a contextual variant without the arch rise. Consumers supply source and alt text; page CSS must not override internal sizing.

Card links/buttons retain their native semantics and keyboard focus. Decorative images use empty alt text; meaningful images retain supplied descriptions. Colours inherit the active theme tokens. Do not add direct card images or page-specific image-fit rules: use this atom and its documented variants. Atlas, Glaze Families and Reading retain their native image-rendering path under the user's exclusions. Banners, logos, document facsimiles, portrait and interactive comparison previews are separate media roles.

`tools/check-media.mjs` runs through the normal site check and covers attribute escaping, exclusions, registration order and removal of the old sizing owner. `tools/audit-media-browser.js` checks rendered frame/image geometry, natural proportions, zero image padding, visible consumer coverage, fallbacks and overflow. Run the browser audit on desktop and compact viewports, including content appended by pagination.

## Shared flat notification family · 12 October 2026

`cathedral-notice.js` owns `<cathedral-notice>`; `cathedral-notice.css` owns its shadow-root presentation and semantic tokens. `notification-preview.html` is a local component showcase, excluded from the production build. Reference images supplied by the user inform the flat colour bar, outlined status icon, square geometry and coloured-header card. No reference image is embedded. This component is available for integration; it is not yet mounted on public routes.

### Variants and usage

- `kind`: `info` (default), `error`, `success`, `warning`, `confirmation`. Meaning is expressed through both icon and text.
- `presentation`: `alert` (default), `card`, `label`. Alerts are in-flow messages; cards share the same anatomy with a coloured header. Labels open a native modal dialog containing the explanation.
- `heading` and `message`: plain text only. Supply the actual outcome, context and recovery action.
- `dismissible`: adds a labelled close control to alerts/cards. Cards also have a labelled bottom action.
- `action-label`: card action text, defaults to Close. `notice-action` is emitted before dismissal; `notice-dismiss` is emitted when an alert/card is dismissed. Both bubble and include `detail.kind`.
- `announce`: opt-in live announcement for newly inserted feedback. Errors use `role=alert`; other kinds use `role=status`. Initial construction content does not require an urgent announcement.
- `floating`: fixed placement for an alert, card or label; compact placement reserves bottom-navigation space. Integration must check collisions with back-to-top and other floating controls.

Load the script once and create components with their attributes set before insertion. Attributes are read on first connection; dynamic attribute updates are not supported. There is no automatic dismissal, persisted dismissal or notification queue. Ordinary alerts do not take focus. Label dialogs use native modal keyboard behaviour, Escape dismissal and focus return. Confirmation is a visual semantic variant; a two-action decision dialog requires a separate explicit interaction contract.

```html
<script src="cathedral-notice.js" defer></script>
<cathedral-notice kind="warning" presentation="label" heading="Under construction"
  message="This website is still being built. Some features may not work, pages may be incomplete, and parts of the design are still being refined." floating>
</cathedral-notice>
```

Tokens: `--notice-info`, `--notice-error`, `--notice-success`, `--notice-warning`, `--notice-radius`, `--notice-space`. Card content uses `--notice-card-background: #fff` and `--notice-card-foreground: #242934`, keeping the white content area from the approved reference across appearance modes. High contrast and forced-colour treatments are provided. All notification surfaces, close controls, labels and actions have zero border radius. Cards use a taller coloured header, an outlined status icon and a plain content surface with one prominent action. `action-label` also sets the label-dialog action. No gradients or decorative shadows. Native buttons have at least 48px interaction height.

### Global notification geometry

Semantic kind changes only colour and the status glyph. Each presentation has one shared geometry across all kinds. Cards are 360px wide (clamped to the available width), 480px high, with a 240px header (exactly half the card), an 80px outlined icon frame and a action up to 240px wide and 48px high. Alerts have a shared 112px minimum height. All status glyphs use the same circular frame. The shared geometry tokens are `--notice-card-width`, `--notice-card-height`, `--notice-header-height`, and `--notice-alert-height`; do not override these per kind or route. Internal scrolling is prohibited. Copy limits are 20 Unicode code points for headings, 80 for messages, and 20 for actions. Over-limit components emit `notice-invalid` and remain unrendered until corrected and reinserted. Copy is never silently truncated. Very short viewports or enlarged text may require document-level scrolling; the notification itself does not scroll.

Cards use an exact 50/50 split between the coloured header and white content area. All kinds share this split. The content area uses compact shared spacing rather than reducing the coloured half.

### Approved reference anatomy

The coloured half contains the outlined status icon and title, both centred. The white half contains only the centred message and a flat text action. All semantic types share this structure and dimensions.
