"""Rebuild every search shard from the current page records, including OCR."""
from pathlib import Path
import json

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/library/expanded'
books=json.loads((OUT/'catalogue.json').read_text())
corpus=[]
for book in books:
    if book['status']=='unreadable' or book.get('duplicateOf'):continue
    pages=json.loads((OUT/(book['id']+'.json')).read_text())
    corpus.extend(dict(book=book['id'],**p) for p in pages if p['text'].strip())
parts=[]
for i in range(0,len(corpus),2000):
    name=f'search-{i//2000}.json'
    (OUT/name).write_text(json.dumps(corpus[i:i+2000],ensure_ascii=False))
    parts.append(name)
(OUT/'search-parts.json').write_text(json.dumps(parts))
(OUT/'recipe-search.json').write_text(json.dumps([p for p in corpus if p['recipeCandidate']],ensure_ascii=False))
print('Search pages:',len(corpus),flush=True)
