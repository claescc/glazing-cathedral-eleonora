# Ceramics Cathedral of Eleonora

A colour-first ceramic library with structured recipes and searchable supplied sources.

## Current content

- 265 structured recipe records; 26 historic surface records.
- 128 formula transcriptions from *Colour in Glazes*, with 23 matched specimen photographs. The merged Chrome-tin maroon formula on PDF p. 140 remains source-only.
- All 25 numbered recipes in the *Ash Glazes* appendix, PDF pp. 183–185, visually checked.
- Five base recipes / named variants from *Cone 5–6 Glazes*, PDF p. 12, visually checked.
- 107 distinct readable sources; 18,733 pages with extractable text; 616 recipe-related candidate pages. These are page counts, not counts of verified recipes. Three PDF-named files contain HTML, with one exact duplicate among them.

## Sources and generation

Original PDFs remain read-only in the supplied library. The source catalogue records SHA-256 hashes and exact filenames. Recipe amounts preserve the source; non-100 bases are scaled proportionally for the base-batch calculator. Ash formulas expressed as parts scale by the complete printed total.

Run `tools/index_sources.py`, `tools/import_bloomfield.py`, then `tools/append_checked_recipes.py` using Python with PyMuPDF. The first script creates search chunks and source-page facsimiles. It identifies recipe-related candidates using ingredient terms, not semantic verification. Formula transcriptions and photographs have separate provenance. The 128 Bloomfield transcriptions were checked structurally, with sample page inspections; they are not labelled as individually visually verified.

The browser loads the compact recipe-page index first and fetches the all-text chunks only when requested. Original page images are the authority where text extraction is garbled. Recipes, source search, page reading and favourites work without a server database.

## Delivery

The existing GitHub Pages site serves the repository root at ceramicscathedral.com. Preserve CNAME. `node build-static.mjs` additionally prepares the static distribution. The existing Sites manifest is retained for compatibility; it is not the domain hosting configuration.

### Continuous deployment

Production branch: `main`. GitHub Pages automatically builds and deploys updates pushed to this branch. Local-only commits do not trigger GitHub Pages.

Project delivery policy, approved 25 September 2026: after each completed change, run `node build-static.mjs` and `node tools/check-site.mjs`, commit, then push `main` to `origin`. Do not leave an approved release committed only locally. Verify the GitHub Pages deployment run and the public site before reporting it deployed. If checks or publishing fail, report the failure rather than claiming delivery. Do not force-push or publish unfinished feature branches.

Production: https://ceramicscathedral.com/

Deployment runs: https://github.com/claescc/glazing-cathedral-eleonora/actions

## Verification (22 September 2026)

Validated unique recipe IDs, ingredient values, photograph paths and source-page images. Browser checks cover desktop/mobile layout, filtering, progressive loading, both batch conventions, nested source dialogs, page navigation, saved recipes, recipe-page search, all-text search and index view. No browser exceptions or page-width overflow in the tested 1440 px and 390 px layouts.
