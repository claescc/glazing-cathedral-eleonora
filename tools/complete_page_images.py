"""Provide a page facsimile for every readable source page, including diagrams.

Compact AVIF page previews complement full searchable text. Existing page images
are preserved. Originals stay read-only; rendered previews are not originals.
"""
from pathlib import Path
from concurrent.futures import ProcessPoolExecutor
import json
import pypdfium2 as pdf
from source_paths import LIB

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/library/expanded'

def process(book):
    path = OUT / (book['id']+'.json')
    pages = json.loads(path.read_text())
    targets = [p for p in pages if not p.get('image')]
    if not targets:return 0
    doc = pdf.PdfDocument(LIB/book['file'])
    dest = OUT/'pages'/book['id']
    dest.mkdir(parents=True,exist_ok=True)
    for p in targets:
        original = ROOT/'assets/library'/book['id']/f'p{p["page"]}.jpg'
        if original.exists():
            p['image'] = str(original.relative_to(ROOT))
            continue
        image = dest/f'p{p["page"]}.avif'
        if not image.exists():
            page = doc[p['page']-1]
            bitmap = page.render(scale=900/page.get_width())
            bitmap.to_pil().convert('RGB').save(image,quality=20,speed=8)
            bitmap.close()
            page.close()
        p['image'] = str(image.relative_to(ROOT))
        p['imageKind'] = 'Rendered source-page preview; searchable text available below'
    doc.close()
    path.write_text(json.dumps(pages,ensure_ascii=False))
    print('Complete page images:',book['name'],len(targets),flush=True)
    return len(targets)

if __name__=='__main__':
    books=json.loads((OUT/'catalogue.json').read_text())
    with ProcessPoolExecutor(max_workers=4) as pool:
        result=list(pool.map(process,[b for b in books if b['status']!='unreadable' and not b.get('duplicateOf')]))
    print('Page-image gaps closed:',sum(result),flush=True)
