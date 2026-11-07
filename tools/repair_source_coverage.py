"""Restore image-only source pages and rebuild search, without changing formulas.

Requires pypdfium2 and Pillow; OCR uses the compiled recognize-source.swift tool.
Original sources remain read-only. OCR output is explicitly unverified.
"""
from pathlib import Path
import json, re, subprocess, hashlib, collections
from concurrent.futures import ThreadPoolExecutor
import pypdfium2 as pdf
from source_paths import LIB

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/library/expanded'
catalogue = json.loads((OUT / 'catalogue.json').read_text())
materials = re.compile(r'feldspar|frit\b|silica|whiting|kaolin|nepheline|wollastonite|ball clay|bentonite|dolomite|wood ash|gerstley|quartz|zinc oxide|copper oxide|cobalt oxide|potash|china clay', re.I)

jobs = []
for book in catalogue:
    if book['status'] == 'unreadable' or book.get('duplicateOf'):
        continue
    pages = json.loads((OUT / (book['id'] + '.json')).read_text())
    targets = [p for p in pages if not p['text'].strip() and p.get('textMethod') != 'ocr-unverified']
    if not targets:
        continue
    doc = pdf.PdfDocument(LIB / book['file'])
    dest = OUT / book['id']
    dest.mkdir(exist_ok=True)
    for p in targets:
        image = dest / f'p{p["page"]}.jpg'
        if not image.exists():
            page = doc[p['page'] - 1]
            bitmap = page.render(scale=1600 / page.get_width())
            bitmap.to_pil().convert('RGB').save(image, quality=72, optimize=True)
            bitmap.close()
            page.close()
        jobs.append(str(image))
    doc.close()
    print('Restored source images:', book['name'], len(targets), flush=True)

def recognize(batch):
    subprocess.run(['/tmp/cathedral-recognize-source', *batch], check=True)
    print('OCR batch complete:', len(batch), flush=True)

with ThreadPoolExecutor(max_workers=3) as pool:
    list(pool.map(recognize, [jobs[i:i+12] for i in range(0, len(jobs), 12)]))

corpus = []
for book in catalogue:
    if book['status'] == 'unreadable' or book.get('duplicateOf'):
        continue
    path = OUT / (book['id'] + '.json')
    pages = json.loads(path.read_text())
    for p in pages:
        image = OUT / book['id'] / f'p{p["page"]}.jpg'
        ocr = Path(str(image) + '.ocr.json')
        if ocr.exists():
            data = json.loads(ocr.read_text())
            p.update(text=data['text'], image=str(image.relative_to(ROOT)),
                     textMethod='ocr-unverified', ocrConfidence=data['meanConfidence'])
            terms = set(x.group().lower() for x in materials.finditer(p['text']))
            p['recipeCandidate'] = len(terms) >= 3 and len(re.findall(r'\b\d+(?:\.\d+)?\b', p['text'])) >= 5
        if p['text'].strip():
            corpus.append(dict(book=book['id'], **p))
    book['textPages'] = sum(bool(p['text'].strip()) for p in pages)
    book['ocrPages'] = sum(p.get('textMethod') == 'ocr-unverified' for p in pages)
    book['pagesWithoutText'] = [p['page'] for p in pages if not p['text'].strip()]
    book['recipePages'] = [p['page'] for p in pages if p['recipeCandidate']]
    path.write_text(json.dumps(pages, ensure_ascii=False))
    for p in pages:
        ocr = OUT / book['id'] / f'p{p["page"]}.jpg.ocr.json'
        if ocr.exists():
            ocr.unlink()

parts = []
for i in range(0, len(corpus), 2000):
    name = f'search-{i//2000}.json'
    (OUT / name).write_text(json.dumps(corpus[i:i+2000], ensure_ascii=False))
    parts.append(name)
(OUT / 'search-parts.json').write_text(json.dumps(parts))
(OUT / 'recipe-search.json').write_text(json.dumps([p for p in corpus if p['recipeCandidate']], ensure_ascii=False))
(OUT / 'catalogue.json').write_text(json.dumps(catalogue, ensure_ascii=False))
print('Search restored:', len(corpus), 'pages;', len(jobs), 'source images', flush=True)
