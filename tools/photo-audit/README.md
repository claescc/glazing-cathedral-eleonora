# Recipe photograph audit · 2 October 2026

Two independently published batches link 105 previously unillustrated book-recipe records to source photographs: 45 in batch 1 and 60 in batch 2. These are recipe links, not 105 distinct camera exposures. Two Kaplan records share an explicitly labelled layered result.

## Evidence

- `batch-1.json`: 42 Bloomfield specimens cropped from seven composite plates, plus three individual Lucy Burley tiles.
- `batch-2.json`: 43 Bloomfield specimens from seven further composite plates. The unavailable chrome-tin maroon formula occupies the unused lower-left position in the red plate; it is not reassigned to another recipe.
- `batch-2-captioned.json`: 11 caption-linked Bloomfield specimens and three Kaplan records from Ceramic Arts Network. PV Black and VC Blue/Green/Purple are labelled as a layered photograph, not individual glaze outcomes.
- `batch-2-ash.json`: three Ash Glazes examples. The 50/50 ash/red-clay example is explicitly attributed to Phil Rogers, whose caption supplies the same formula and firing as the Casson appendix entry. It is not attributed to Casson as an object.
- `unresolved.json`: 30 book records for which an exact photograph has not been established. Similar colours, a matching maker name or approximate recipes are insufficient. No generated replacements have been used.

Complete source plates or publisher links accompany the cropped images. All supplied source PDFs remain unchanged. PDF page numbers refer to the supplied files, not necessarily printed pagination. Crops retain source colours; white balance and source lighting have not been altered.

## Reproduce after importing book recipes

Use Python with PyMuPDF and Pillow. The extraction scripts expect the user's source PDFs in `/Users/chloeclaes/Downloads/Eleonora Ceramics/`. After all recipe importers have run, execute in this order:

1. `python3 tools/photo-audit/link_bloomfield_plates.py`
2. `python3 tools/photo-audit/link_remaining_plates.py`
3. `python3 tools/photo-audit/link_captioned_photos.py`
4. `python3 tools/photo-audit/link_ash_photos.py`
5. `python3 tools/photo-audit/finalize.py`
6. `node build-static.mjs` and `node tools/check-site.mjs`

The Kaplan extraction reuses committed assets; if absent, it retrieves the documented publisher images. Re-running the pipeline must preserve all ingredient quantities, additions and firing fields. Never edit a formula to make an image match.

## Atlas presentation

The default photo filter and reset action display photographed records. The coverage line states the outstanding count; all formulas remain accessible through the Photograph filter and the Recipe Library. This removes blank panels from the default atlas without representing unresolved recipes as completed.

## Visual references · 3 October 2026

Six additional records now use documented photographs of related formulas, coloured variations or layered use. These carry `visualReference: true`, `imageVerified: false`, visible labels and the specific differences in the introductory caption. Run `add_visual_references.py` before `finalize.py` when rebuilding. The unresolved ledger continues to track exact-recipe evidence gaps, including records with a useful visual reference. All atlas filter states require an image; text-only recipe records are presented without empty photo panels in the Recipe Library.
