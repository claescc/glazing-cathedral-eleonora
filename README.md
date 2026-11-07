# Ceramics Cathedral of Eleonora

A colour-first ceramic library with structured recipes and searchable supplied sources.

## Current content

- 265 structured recipe records; 26 historic surface records.
- 128 formula transcriptions from *Colour in Glazes*, with 23 matched specimen photographs. The merged Chrome-tin maroon formula on PDF p. 140 remains source-only.
- All 25 numbered recipes in the *Ash Glazes* appendix, PDF pp. 183–185, visually checked.
- Five base recipes / named variants from *Cone 5–6 Glazes*, PDF p. 12, visually checked.
- 108 distinct readable sources; 19,955 source pages; 19,153 searchable text pages after OCR recovery. All 1,220 formerly textless pages have source images; 802 still have no recognised text. These are page counts, not counts of verified recipes. Three PDF-named files contain HTML, with one exact duplicate among them.

## Sources and generation

Original PDFs remain read-only in the supplied library. The source catalogue records SHA-256 hashes and exact filenames. Recipe amounts preserve the source; non-100 bases are scaled proportionally for the base-batch calculator. Ash formulas expressed as parts scale by the complete printed total.

Run `tools/index_sources.py`, `tools/import_bloomfield.py`, then `tools/append_checked_recipes.py` using Python with PyMuPDF. The first script creates search chunks and source-page facsimiles. It identifies recipe-related candidates using ingredient terms, not semantic verification. Formula transcriptions and photographs have separate provenance. The 128 Bloomfield transcriptions were checked structurally, with sample page inspections; they are not labelled as individually visually verified.


Run `tools/build_reading_visuals.py` after source indexing to regenerate the Reading Room finding aids: actual covers or labelled title/source previews, recipe headings, source-page thumbnails, and explicitly recorded photograph-page links. Colour, surface, cone and atmosphere descriptions are copied from labelled source fields. Extracted headings and passages remain finding aids, not newly verified formulas.

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

## Release target and preservation gate

`release-target.json` fixes the production identity. `node tools/check-release-target.mjs` is imported by the build and refuses a wrong repository, branch, domain, legacy Sites identity, removed copy or changed/missing original assets. `docs/content-preservation-baseline.json` captures the existing production-source copy and original asset/data hashes. Preserve it during layout work; never refresh it simply to clear a failure. The separate ChatGPT-hosted copy is not an approved delivery target.

## Source coverage recovery · 7 November 2026

The current reader uses `assets/library/expanded/`. Original data and assets remain unchanged under the preservation baseline. `coverage.json` reconciles every supplied file by hash, every source page and every structured recipe, including candidate pages with no structured record. `knowledge-paths.json` routes all readable sources into subject rooms. These paths and page indexing do not establish complete chapter synthesis or individual visual verification of all formulas. Three unreadable PDF-named files still need valid replacements. Project handover and design documents remain project resources rather than ceramic teaching sources.

Set `CERAMICS_SOURCE_ROOT` when the supplied library moves. The shared default is the current Ceramics Cathedral source folder. `tools/repair_source_coverage.py` uses pypdfium2 and Pillow plus `tools/recognize-source.swift` compiled to `/tmp/cathedral-recognize-source`; recognised text is always unverified and never promoted into calculator formulas. Run `tools/audit_source_coverage.py` after imports. Re-run the release guard, static build, site checks and V2 preservation checks before publication.

### Complete source-page previews · 8 November 2026

Every one of the 19,955 readable source pages now has a page facsimile or rendered preview, including diagrams, photographs, tables and blank pages. The reader offers the full extracted text separately. Compact AVIF previews preserve the page layout; they are not original-resolution files. The originals remain read-only in the supplied library. 2,082 bookmark entries copied from 48 PDFs provide chapter navigation; sources without supplied bookmarks do not receive invented chapter titles. Run `tools/complete_page_images.py`, `tools/compact_page_previews.py`, `tools/index_source_chapters.py`, `tools/rebuild_source_search.py`, then `tools/audit_source_coverage.py` to reproduce this layer. `tools/audit_production_coverage.py` compares the deployed reader, source records and search shards against an exact committed release.
