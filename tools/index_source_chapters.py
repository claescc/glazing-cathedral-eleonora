"""Index the supplied PDFs' own bookmarks without inventing chapter titles."""
from pathlib import Path
from concurrent.futures import ProcessPoolExecutor
import json
from pypdf import PdfReader
from source_paths import LIB

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/library/expanded'

def index(book):
    rows=[]
    try:
        doc=PdfReader(LIB/book['file'])
        def walk(items, depth=0):
            for item in items:
                if isinstance(item,list):walk(item,depth+1)
                else:
                    page=doc.get_destination_page_number(item)
                    if page is not None and 0<=page<book['pages']:
                        rows.append(dict(title=str(item.title),page=page+1,depth=depth))
        walk(doc.outline)
        status='PDF bookmarks' if rows else 'No PDF bookmarks supplied'
    except Exception as error:
        status='Bookmark extraction unavailable: '+type(error).__name__
    return book['id'],dict(method=status,chapters=rows)

if __name__=='__main__':
    books=json.loads((OUT/'catalogue.json').read_text())
    with ProcessPoolExecutor(max_workers=3) as pool:
        records=dict(pool.map(index,[b for b in books if b['status']!='unreadable' and not b.get('duplicateOf')]))
    (OUT/'chapters.json').write_text(json.dumps(records,ensure_ascii=False))
    print('Source bookmark entries:',sum(len(b['chapters']) for b in records.values()),'in',sum(bool(b['chapters']) for b in records.values()),'sources',flush=True)
