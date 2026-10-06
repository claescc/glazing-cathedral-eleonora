# Ceramics Cathedral product architecture

Status: canonical UX and information-architecture contract  
Approved: 6 October 2026  
Scope: the entire public Ceramics Cathedral product

## 1. Product model

Ceramics Cathedral is one product. The Cathedral and its Rooms are the content and brand model; they are not a second competing interaction model.

Every public screen must use the same five-layer hierarchy, in this order:

1. **Global shell** — brand/home, global search, Saved, Settings, and the persistent primary navigation.
2. **Room/page identity** — room name, page title, and only the minimum orientation needed to understand the destination.
3. **Local navigation** — sibling views within the current destination, for example Colour atlas / Glaze families.
4. **Task controls** — search, filter, sort, view, save, compare, or other controls required to operate on the current content.
5. **Content and contextual links** — the records, lessons, recipes, sources, artists, or tools the user came to use; related destinations appear after or inside the relevant content.

A control may not be promoted to a higher layer merely because there is available screen space.

## 2. Canonical global navigation

The persistent primary destinations are:

- Home
- Atlas
- Recipes
- Learn
- Rooms

**Rooms** is the Cathedral map and discovery layer. It exposes the named Rooms and specialist destinations without competing with the five persistent destinations.

Saved and Settings are utilities, not primary destinations. Global source/library search is a utility. On compact screens these utilities live in the top app bar; the five primary destinations live in the bottom navigation. On expanded screens the same hierarchy may be expressed as a navigation rail/drawer, but destination meaning must not change.

## 3. Room architecture

The canonical Rooms remain:

1. The Stained-Glass Atlas
2. The Recipe Library
3. The Kiln Chapel
4. The Materials Archive
5. The Restoration Room
6. The Hall of Masters
7. Eleonora's Notebook
8. The Reading Room

Layering Laboratory is a specialist study tool associated with the Recipe Library. Glaze Families is a local Atlas destination. Judith Laqueur-Révész is a Hall of Masters destination. These may be directly addressable routes without becoming additional persistent global-navigation levels.

## 4. Page grammar

Interior pages should follow this DOM/visual sequence where applicable:

```
global app shell
room/page header
local navigation
primary task/search
primary classification tabs
compact filter entry points
results toolbar: result count + sort/view
content
contextual/related links
global footer/navigation
```

Do not stack multiple visually equivalent tab bars, chip rows, headings, and filter rows. Each row must have one semantic job.

### Catalogue pages

Atlas, Recipes, Reading and other catalogues use progressive disclosure:

- Search is visible.
- The smallest high-frequency classification set may be visible.
- One or two high-frequency filters may be directly available.
- Advanced filters are collapsed on compact screens by default.
- Sort and display mode are subordinate to filtering and content.
- The result count sits with sort/view controls, not as a disconnected section.
- Actual catalogue content should enter the first useful mobile viewport as early as practical.

Active filters must remain discoverable through state/count indicators when their controls are collapsed.

### Editorial and learning pages

Learning, history, artist and source-reading pages do not inherit catalogue controls merely for visual consistency. They reuse the shell, page header, navigation and content primitives while preserving reading flow.

## 5. Responsive contract

Compact baseline remains 375 × 667 CSS px. At compact widths:

- one primary content column;
- bottom navigation contains exactly the five persistent destinations;
- advanced controls use disclosure rather than permanent vertical space;
- no decorative hero may push the primary task below an avoidable full viewport;
- touch targets remain at least the project's established 44–48 px interaction baseline;
- no horizontal overflow.

Expanded layouts may expose secondary controls, but must preserve the same semantic order and labels.

## 6. Component ownership

The product must converge on reusable structural primitives rather than page-specific imitations:

- App shell / top app bar
- Primary navigation
- Room/page header
- Local navigation
- Search field
- Classification tabs
- Filter disclosure / filter panel
- Results toolbar
- View switcher
- Catalogue card/list item
- Contextual-link group
- Dialog/sheet
- Footer

Theme colours and Room identities may vary through tokens. Interaction grammar, state semantics, focus treatment and component anatomy must not vary per Room without a documented functional reason.

## 7. Content relationships

The Cathedral's cross-linking is part of the product model and must be preserved. A glaze may connect to a formula, material, chemistry/family, firing guidance, source, test plan and historic context. Those relationships should appear contextually from the relevant record instead of being duplicated as top-level navigation.

## 8. Anti-regression rules

A UI change is not complete if it fixes one route by introducing a new navigation/control pattern that has no global definition.

Before merging structural UI work:

1. Identify which of the five hierarchy layers the changed element belongs to.
2. Reuse an existing structural primitive or update the shared primitive.
3. Check compact and expanded layouts.
4. Check at least one sibling route that uses the same primitive.
5. Confirm primary content is not displaced by newly permanent controls.
6. Update this document if the product architecture itself changes.

Page-specific CSS is allowed for content presentation. Page-specific navigation grammar is not.

## 9. Source of truth

- This file is the canonical product/UX architecture.
- `DESIGN-SYSTEM.md` defines visual/component implementation.
- `MOBILE-FIRST.md` defines compact acceptance constraints.
- `QA-CHECKLIST.md` defines verification.
- `AGENTS.md` defines delivery and repository operating rules.

When these documents conflict, product hierarchy follows this file; implementation details follow the more specific document only when they do not violate this architecture.
