# Production UI issues and check history

Production: https://ceramicscathedral.com/
Procedure: ../QA-CHECKLIST.md
Source: claescc/glazing-cathedral-eleonora.
This is the central list. Keep stable IDs and preserve resolved findings.

## Issues

| ID | First recorded | Page | Observation / reproduction | Status | Evidence / next step |
| --- | --- | --- | --- | --- | --- |
| UI-001 | 2026-10-06; prior report 2026-10-05 | atlas.html | Prior review reported display-button text overflow at 320 CSS-px and 200% text size. Current desktop buttons do not overflow: Photographs 125/125, Cone previews 135/135, Index 82/82 client/scroll px. | To confirm on mobile | The previous result concerned an older commit. Mobile and text enlargement were not executed in this run. Do not classify the prior result as a current reproduced defect. |
| UI-002 | 2026-10-06; prior report 2026-10-05 | atlas.html | Prior review reported visible group labels differing from ARIA names. Current production has hues role=group aria-labelledby=colourLabel, and viewTabs role=group aria-labelledby=displayLabel; neither has aria-label. Browser accessibility snapshot names the groups COLOUR FAMILY and DISPLAY. | Resolved in inspected current state | Observed on production 2026-10-06. This run did not implement the correction or identify its introducing commit. Former Collection grouping has changed to a labelled Show select. |
| UI-003 | 2026-10-06 | atlas.html | Firing range offers both 5-6 and 5–6 as separate options. With other filters at defaults, selecting 5-6 shows 6 of 6 surfaces; selecting 5–6 shows 2 of 2 different surfaces. Equivalent visible range notation splits the result sets. | Open, larger issue for later | Reproduced in production native coneFilter. Normalise comparison keys and options while retaining original source notation/provenance. Preserve leading-zero cone values: 05 and 5 are distinct; do not merge these. Review other repeated dash/prefix variants before implementation. No code change made. |
| OBS-001 | 2026-10-06 | tribute.html | Two visible h1 elements both read Judith Laqueur-Révész: introduction banner and main artist panel. | Observation, impact to confirm | DOM and accessibility snapshot agree. No WCAG violation or user impact established; do not treat as a proven accessibility failure. Consider heading hierarchy during a later design review. |

## Check record: 2026-10-06

Performed approximately 06:04–06:06 Europe/Brussels.
Live commit: unknown; not inferred from repository HEAD.
Repository latest commit inspected: 765ffab280aa1516c74b7ff87e016ed9805fea7b, dated 2026-10-05T20:09:52Z, "Improve Atlas label readability and reduce colour swatch size".
No equivalent central issue file found in the repository tree; this list created.
No application code corrected or released in this run.

### Actual coverage

Desktop browser viewport: 1363 × 936 CSS-px.
Measured document scrollWidth: 1348 CSS-px on homepage, atlas, tribute and recipes. No horizontal document overflow at this viewport.

| Page / state | Check / method | Result | Evidence | Not tested / limitation |
| --- | --- | --- | --- | --- |
| / | Homepage initial viewport; screenshot, accessibility snapshot and DOM width | Opens without login; initial viewport visually inspected; no horizontal document overflow | Screenshot inspected; scrollWidth 1348 at viewport 1363 × 936 | Below-fold full-page visual review not performed |
| atlas.html | Default filters and labels; screenshot, accessibility/DOM attributes and button widths | Visible labels linked to groups; desktop display buttons within measured widths | UI-001, UI-002 | Mobile and 200% text size not tested |
| atlas.html | Search Cranberry | Search changes results to 4 of 4 | Accessibility snapshot; do not assume search is name-only | Broad matching rules and all search terms not validated |
| atlas.html | Index activated with Enter | Index selected, aria-pressed=true; other display buttons false; list content changes | DOM state and accessibility snapshot | Complete tab sequence and focus styling not reviewed |
| atlas.html | Firing range 5-6 then 5–6, other filters default | Different result sets, 6 versus 2 | UI-003; counters and card names captured in accessibility snapshots | Other duplicate ranges not exercised |
| tribute.html | Initial viewport and visible heading structure; screenshot and DOM | Opens without login; two identical visible h1 headings | OBS-001; scrollWidth 1348 | Gallery below fold, external museum links and factual claims not validated |
| recipes.html | Initial viewport; screenshot and DOM width | Page renders; no horizontal document overflow | scrollWidth 1348 | All recipe cards and loading states not inspected |
| recipes.html | Search June Perry Pink, open the single formula, press Escape on close control | 1 matching recipe; formula opens; Escape returns to recipe page | Accessibility snapshots | Calculator, original-source viewer, saving and full focus-trap behaviour not tested |

### Limitations and continuation

- No supported viewport-resizing/emulation method was exposed by this browser interface. Mobile layouts and 200% text enlargement were not reproduced. Record this as a test limitation, not a site defect.
- No Safari, VoiceOver, NVDA, contrast audit, full accessibility conformance evaluation or scientific/content verification.
- No exhaustive internal/external link or loaded-image audit. Loaded visible images checked on atlas Index and tribute returned no failed-image matches; this does not cover unloaded images.
- Browser error-log sample contained extension metadata errors from chrome-extension://; these were not classified as website failures.
- Remaining routes for rotation: glaze-families.html, kiln.html, layering.html, learn.html, masters.html, materials.html, notebook.html, reading.html, restoration.html, typography.html. Revisit changed atlas alongside the next small route sample.
- Keep monitoring enabled: completion of one daily check does not complete the ongoing monitoring request.
