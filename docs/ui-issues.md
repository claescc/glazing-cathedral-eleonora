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
| UI-003 | 2026-10-06 | atlas.html | Firing range offers both 5-6 and 5–6 as separate options. With other filters at defaults, selecting 5-6 shows 6 of 6 surfaces; selecting 5–6 shows 2 of 2 different surfaces. Equivalent visible range notation splits the result sets. | Open, larger issue for later | Reproduced again on production 2026-10-07 in the native coneFilter: 5-6 returned 6 surfaces and 5–6 returned 2 different surfaces. Normalise comparison keys and options while retaining original source notation/provenance. Preserve leading-zero cone values: 05 and 5 are distinct; do not merge these. Review other repeated dash/prefix variants before implementation. No code change made. |
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


## Check record: 2026-10-07

Performed approximately 06:50–06:54 Europe/Brussels.
Repository/deployment commit inspected: 01885b9d18559552669ef93266c6dfe8ef46cae7, dated 2026-10-06T16:03:45Z, "Refactor global product architecture and Atlas hierarchy".
GitHub Pages workflow run 37492694787 for that commit completed successfully at 2026-10-06T16:05:41Z.
Production showed the current product-architecture Atlas layout, but the public page does not expose a commit SHA; exact live-SHA identity was therefore not independently proven.
No application code corrected or released in this run.

### Actual coverage

Desktop browser viewport: 1363 × 936 CSS-px.
Measured document scrollWidth: 1348 CSS-px on homepage, atlas, recipes, materials and kiln. No horizontal document overflow at this viewport.

| Page / state | Check / method | Result | Evidence | Not tested / limitation |
| --- | --- | --- | --- | --- |
| / | Initial viewport; screenshot and DOM width | Current global shell and hero render; no horizontal document overflow | Screenshot; scrollWidth 1348 at 1363 × 936 | Below-fold full-page review and interactions not repeated |
| atlas.html | Initial structural hierarchy and first catalogue viewport; screenshot, DOM and accessibility state | Global shell → room identity → local navigation → task controls → result toolbar → content appears in that order; 36 of 267 surfaces initially shown; no desktop horizontal overflow | Screenshot and DOM; latest product-architecture changes visibly present | Compact/mobile progressive disclosure not tested |
| atlas.html | Search tenmoku | Search changed results to 7 of 7 | Result counter and visible matching cards captured | Broad search rules not validated |
| atlas.html | Firing range 5-6 then 5–6, other filters at defaults | Reconfirmed different result sets: 6 of 6 versus 2 of 2 | UI-003; counters and item names captured | Other dash/prefix variants not exercised |
| atlas.html | Switch from Photos to Index | Index became selected with aria-pressed=true; catalogue changed to list presentation; 36 of 267 remained | DOM state and screenshot | Complete keyboard sequence and focus order not reviewed |
| recipes.html | Initial viewport; screenshot and DOM width | Shared global shell and page/task hierarchy render; no desktop horizontal overflow | Screenshot; scrollWidth 1348 | Below-fold sections not reviewed |
| recipes.html | Search tenmoku, open the single Tenmoku Gold formula, press Escape | Search returned 1 of 1; formula dialog opened with sourced recipe content; Escape closed it | Accessibility/DOM state | Calculator, saving, source-page viewer and full focus trap not tested |
| materials.html | Initial viewport; screenshot, width and visible-image check | Shared shell, room banner, safety notice and first material cards render; no horizontal overflow; no failed visible content image found | Screenshot; scrollWidth 1348 | Card links and below-fold content not exercised |
| kiln.html | Initial viewport; screenshot, heading hierarchy, width and visible-image check | Shared shell, room banner and first atmosphere cards render; one visible page h1 plus following h2; no horizontal overflow or failed visible content image found | Screenshot; scrollWidth 1348 | Card interactions and below-fold content not exercised |

### Limitations and continuation

- No supported viewport-resizing/emulation method was exposed by this browser interface. Mobile layouts, the compact Atlas palette/disclosure and 200% text enlargement were not reproduced. Record this as a test limitation, not a site defect.
- No Safari, VoiceOver, NVDA, contrast audit, full accessibility conformance evaluation or scientific/content verification.
- No exhaustive link, image or route audit. Only the initial viewport and described interactions were checked.
- Browser log sample contained only extension metadata errors from chrome-extension://; these were not classified as website failures.
- Remaining routes for rotation: glaze-families.html, layering.html, learn.html, masters.html, notebook.html, reading.html, restoration.html, typography.html. Revisit changed atlas at compact width when supported.
- Keep monitoring enabled: this check does not complete the ongoing monitoring request.


## Check record: 2026-10-08

Performed approximately 06:21–06:25 Europe/Brussels.
No application-source commit was added after the previous check; repository HEAD before this record was 8ca2087c8fe903f5f8aea68c7e188547caa40038, the 2026-10-07 check record.
GitHub Pages workflow run 37573767334 for that commit completed successfully at 2026-10-07T04:56:17Z.
The public pages were inspected directly, but they expose no commit SHA; exact live-SHA identity was not independently proven.
No application code corrected or released in this run.

### Actual coverage

Desktop browser viewport: 1363 × 936 CSS-px.
Measured document scrollWidth: 1348 CSS-px on glaze families, layering, restoration and reading. No horizontal document overflow at this viewport.

| Page / state | Check / method | Result | Evidence | Not tested / limitation |
| --- | --- | --- | --- | --- |
| glaze-families.html | Initial viewport; screenshot, DOM width, visible headings and visible-image check | Global shell, Atlas local navigation, page links and first family cards render; one visible h1; no horizontal overflow or failed visible content image found | Screenshot; scrollWidth 1348 at 1363 × 936 | Full 16-gallery and historic-surface visual review not performed |
| glaze-families.html | Open Crackled celadon historic surface, then press Escape | Detail dialog opened with image, lineage, surface data, reading trail and related surfaces; Escape closed the dialog | Accessibility/DOM snapshot; open-dialog count returned to zero | External attribution link, saving and all related-surface buttons not tested |
| layering.html | Initial viewport; screenshot, heading order, DOM width and visible-image check | Shared room shell, task controls, layer diagram and witnesses render; one visible h1 followed by h2; no horizontal overflow or failed visible content image found | Screenshot; scrollWidth 1348 | Saving and every glaze/thickness/application combination not tested |
| layering.html | Change first glaze from Tenmoku Gold to June Perry Pink, then restore | Native selector accepted the change and reported June Perry Pink; original selection restored | DOM selected-option state | Fired-result correctness is not predicted or scientifically validated |
| restoration.html | Initial viewport; screenshot, heading order, DOM width and visible-image check | Shared room shell, observation selector, hypothesis panel and reference cards render; no horizontal overflow or failed visible content image found | Screenshot; scrollWidth 1348 | Below-fold guidance and every symptom not reviewed |
| restoration.html | Change symptom from crazing to crawling, then restore | Hypothesis panel updated to Crawling and corresponding next-test guidance; original selection restored | DOM text and selected-option state | Content/scientific correctness not independently validated |
| reading.html | Initial viewport; screenshot, heading order, DOM width and visible-image check | Shared room shell, source search, filters and initial results render; no horizontal overflow or failed visible content image found | Screenshot; scrollWidth 1348 | Complete source catalogue and all filters not inspected |
| reading.html | Search copper red, wait for results, open first PDF result, then press Escape | Search updated to 153 matching pages across 31 sources; supplied PDF page 16 dialog opened and closed with Escape | Live status, result-card text and dialog snapshot | Extraction accuracy, PDF image fidelity, page navigation and all results not validated |

### Limitations and continuation

- No supported viewport-resizing/emulation method was exposed by this browser interface. Mobile layouts and 200% text enlargement were not reproduced. Record this as a test limitation, not a site defect.
- No Safari, VoiceOver, NVDA, contrast audit, full accessibility conformance evaluation or scientific/content verification.
- No exhaustive link, image or route audit. Only the initial viewport and described interactions were checked.
- Browser error/warning sample contained no website-origin entries after extension messages were excluded.
- Remaining routes for rotation: learn.html, masters.html, notebook.html and typography.html. Revisit atlas mobile/compact behaviour when a supported viewport is available.
- Existing open issue UI-003 was not re-exercised because application source was unchanged and this run rotated to previously untested routes.
- Keep monitoring enabled: this check does not complete the ongoing monitoring request.
