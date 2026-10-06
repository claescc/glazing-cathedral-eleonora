# Lightweight production check

Approved scope: 5 October 2026. Read AGENTS.md before execution.

## Target and execution

Production: https://ceramicscathedral.com/.
Source: claescc/glazing-cathedral-eleonora, main.
The scheduled task runs once daily around 06:00 Europe/Brussels and reports after execution. Manual runs use this same procedure. This file documents the procedure; it is not an executable test suite.

## Procedure

1. Read the previous run and central issue list; inspect recent source changes. Confirm the actual live production page, not a preview or ChatGPT Sites copy.
2. Inventory visible navigation routes. Prioritise changed pages, then a small rotating selection of unchanged pages. Record the selection so coverage can be reviewed. Do not claim all pages were checked if only a sample was inspected.
3. For structural UI changes, validate the page against `PRODUCT-ARCHITECTURE.md`: global shell → room/page identity → local navigation → task controls → content/contextual links. Confirm compact layouts do not make advanced controls permanently displace primary content, and check at least one sibling route using the affected shared primitive.
4. Inspect the selected pages visually on desktop and mobile where the available browser supports those viewports. Record actual viewport sizes. Check visible clipping, overlaps, readable text, navigation, content and image loading. Record unavailable viewport checks as not tested.
5. Exercise a small relevant selection of links, search, filters or dialogs. Check accessible labels and keyboard interaction where available. Record exactly which actions and states were exercised. Never claim full accessibility conformance from this lightweight review.
6. Confirm suspected defects with a targeted reproduction or measurement. Distinguish observed defects, unconfirmed concerns and source-only findings. Capture page, state, reproduction and supporting evidence.
7. Update one central issue list (docs/ui-issues.md, or an existing equivalent) without duplicates. Keep stable IDs and statuses: to confirm, open, fixed, larger issue for later.
8. Correct only small, clear, local and reversible defects under the scheduled task. Record larger or ambiguous issues for discussion. Explicit user fix requests follow the broader authorised delivery procedure in AGENTS.md.
9. For code corrections, run targeted validation and README.md release checks: node build-static.mjs and node tools/check-site.mjs. Commit and push approved changes to main; verify the existing GitHub Pages deployment and the affected production page before reporting a correction as live.
10. Send one concise written run summary using the existing task execution, including a no-change status when appropriate. Do not run a separate audit solely to produce the summary.

## Required run record

- Local date/time and target origin.
- Live version if independently identifiable; otherwise mark unknown.
- Pages inspected, actual viewport sizes, visual states and interactions exercised.
- Validation: check name, method, result and evidence.
- New findings, confirmed corrections and larger open issues.
- Not tested, blocked checks and reason.
- Code correction commit and deployment reference, where applicable.
- Location of the central issue list.

Use this compact table for validation coverage:

| Page / state | Check / method | Result | Evidence | Not tested / limitation |
| --- | --- | --- | --- | --- |

Use this issue format:

| ID | First seen | Page | Observation / reproduction | Status | Evidence / correction |
| --- | --- | --- | --- | --- | --- |

## Initial observations, 5 October 2026

- The production homepage and atlas opened without a ChatGPT login wall in the control browser.
- The atlas accessibility snapshot showed groups named COLOUR FAMILY and DISPLAY. The previous review findings must therefore be rechecked against the current live version, not automatically treated as current defects.
- These observations are a partial inspection, not a completed website audit. Mobile viewports, other routes, full keyboard flows, contrast and content accuracy were not validated in this initial inspection.

## Scope limits

A lightweight check does not establish complete error-free behaviour, scientific accuracy of glaze content or full accessibility conformance. Preserve source provenance; do not invent missing facts. Keep scheduled runs bounded, reuse prior results and inspect unchanged pages over successive runs.
