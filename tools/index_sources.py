"""Read-only PDF source indexing. Keep extracted text separate from checked formulas."""
from pathlib import Path
import pymupdf as fitz
import json, re, hashlib, unicodedata
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).resolve().parents[1]
LIB=Path('/Users/chloeclaes/Downloads/Eleonora Ceramics')
OUT=ROOT/'assets/library'
OUT.mkdir(parents=True,exist_ok=True)
def slug(s):
 s=unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode()
 return re.sub('[^a-z0-9]+','-',s.lower()).strip('-')[:100]
materials=re.compile(r'feldspar|frit\b|silica|whiting|kaolin|nepheline|wollastonite|ball clay|bentonite|dolomite|wood ash|gerstley|quartz|zinc oxide|copper oxide|cobalt oxide|potash|china clay',re.I)
def process(path):
 key=slug(path.stem)+'-'+hashlib.sha256(path.read_bytes()).hexdigest()[:8]
 item={'id':key,'name':path.stem,'file':str(path.relative_to(LIB)),'pages':0,'recipePages':[],'status':'text-indexed','sha256':hashlib.sha256(path.read_bytes()).hexdigest()}
 try: doc=fitz.open(path)
 except Exception as e:
  item['status']='unreadable';item['error']=type(e).__name__;return item,[]
 if not doc.is_pdf:
  item['status']='unreadable';item['error']='File contains HTML, not PDF';return item,[]
 pages=[];search=[];item['pages']=len(doc)
 for i,page in enumerate(doc):
  text=page.get_text(sort=True).replace('\x00','').strip()
  lines=text.splitlines()
  terms=set(m.group(0).lower() for m in materials.finditer(text))
  numbers=len(re.findall(r'\b\d+(?:\.\d+)?\b',text))
  # Candidates only: never claim these heuristics verify an individual formula.
  candidate=len(terms)>=3 and numbers>=5 and bool(re.search(r'recipe|glaze|cone|100|parts|%',text,re.I))
  if 'Glazy' in path.name and len(terms)>=3: candidate=True
  row={'page':i+1,'text':text,'recipeCandidate':candidate}
  if candidate:
   dest=OUT/key;dest.mkdir(exist_ok=True)
   img=f'{key}/p{i+1}.jpg'
   if not (OUT/img).exists():
    pix=page.get_pixmap(matrix=fitz.Matrix(1.6,1.6),alpha=False)
    pix.pil_save(OUT/img,format='JPEG',quality=82,optimize=True)
   row['image']='assets/library/'+img
   item['recipePages'].append(i+1)
  pages.append(row)
  if text:search.append({'book':key,'page':i+1,'text':text,'recipeCandidate':candidate})
 item['textPages']=sum(bool(p['text']) for p in pages)
 (OUT/(key+'.json')).write_text(json.dumps(pages,ensure_ascii=False),encoding='utf-8')
 return item,search
files=sorted(LIB.rglob('*.pdf'))
books=[];corpus=[]
with ThreadPoolExecutor(max_workers=4) as ex:
 for b,s in ex.map(process,files):
  books.append(b);corpus.extend(s)
  print(b['name'],b['pages'],len(b['recipePages']),flush=True)
# Exact duplicate publications stay in the provenance ledger, but are not double-counted.
seen={}
for b in books:
 if b['sha256'] in seen:b['duplicateOf']=seen[b['sha256']]
 else:seen[b['sha256']]=b['id']
corpus=[p for p in corpus if not next(b for b in books if b['id']==p['book']).get('duplicateOf')]
(OUT/'catalogue.json').write_text(json.dumps(books,ensure_ascii=False),encoding='utf-8')
(OUT/'recipe-search.json').write_text(json.dumps([p for p in corpus if p['recipeCandidate']],ensure_ascii=False),encoding='utf-8')
parts=[]
for i in range(0,len(corpus),2000):
 name=f'search-{i//2000}.json';(OUT/name).write_text(json.dumps(corpus[i:i+2000],ensure_ascii=False),encoding='utf-8');parts.append(name)
(OUT/'search-parts.json').write_text(json.dumps(parts))
print(json.dumps({'files':len(books),'unique':len(seen),'pages':len(corpus),'candidatePages':sum(p['recipeCandidate'] for p in corpus)}))
