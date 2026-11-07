"""Reconcile source bytes, indexed pages, recipe records and subject paths.

Does not infer that a recipe candidate is a formula or a checked transcription.
Run after source indexing and OCR. Source files are never modified.
"""
from pathlib import Path
import json, hashlib, re, subprocess, collections
from source_paths import LIB

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/library/expanded'
books = json.loads((OUT / 'catalogue.json').read_text())
visuals = json.loads((OUT / 'visuals/index.json').read_text())['books']
js = """const fs=require('fs'),vm=require('vm');const c={window:{}};vm.createContext(c);for(const f of ['library-data.js','book-recipes.js','glazy-data.js','glazy-imports.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);process.stdout.write(JSON.stringify(['RECIPES','BOOK_RECIPES','GLAZY_RECIPES','GLAZY_IMPORTED_RECIPES'].flatMap(k=>c.window[k]||[])));"""
recipes = json.loads(subprocess.check_output(['node','-e',js],cwd=ROOT))
by_hash = {b['sha256']: b for b in books}
files = []
for p in sorted(LIB.rglob('*')):
    if not p.is_file() or p.name == '.DS_Store':
        continue
    digest = hashlib.sha256(p.read_bytes()).hexdigest()
    relative = str(p.relative_to(LIB))
    b = by_hash.get(digest)
    if b:
        role = 'ceramic-source'
        state = 'unreadable-source' if b['status']=='unreadable' else 'catalogued-source'
    elif p.suffix.lower() in ['.pdf','.docx','.pages']:
        role, state = 'project-documentation', 'retained-local-not-teaching-content'
    elif p.suffix.lower() == '.html':
        role, state = 'legacy-website', 'retained-local-reference'
    elif relative.startswith('Art by Judith'):
        role, state = 'family-art-archive', 'retained-local-archive'
    else:
        role, state = 'design-or-studio-asset', 'retained-local-asset'
    files.append(dict(file=relative,sha256=digest,bytes=p.stat().st_size,role=role,status=state,sourceId=b['id'] if b else None))

def records_for(b):
    result=[]
    for r in recipes:
        if (r.get('sourceBookId')==b['id'] or r.get('sourceFile') in [b['file'],Path(b['file']).name]
            or b['name'].startswith('Amazing Glaze Food-Safe') and r.get('source')=='Amazing Glaze: Food-Safe Recipes'
            or b['name'].startswith('Amazing Glaze Recipes and') and r.get('source')=='Amazing Glaze: Recipes and Combinations'
            or b['name'].startswith('June Perry Pink') and r['id']=='glazy-27852'):
            result.append(r)
    return result

rooms = {k:[] for k in ['path','kiln','materials','restoration','masters','recipes']}
reports=[]
for b in books:
    rs=records_for(b)
    pages=[] if b['status']=='unreadable' else json.loads((OUT/(b['id']+'.json')).read_text())
    represented=set()
    for r in rs:
        start, end = r.get('page',1), r.get('endPage',r.get('page',1))
        if isinstance(start,int) and isinstance(end,int):
            represented.update(range(start,end+1))
    row=dict(sourceId=b['id'],file=b['file'],sha256=b['sha256'],status=b['status'],pages=b['pages'],
        textPages=b.get('textPages',0),ocrPages=b.get('ocrPages',0),
        pagesWithoutText=[p['page'] for p in pages if not p['text'].strip()],
        imagePages=[p['page'] for p in pages if p.get('image')],
        recipeCandidatePages=b['recipePages'],structuredRecipeIds=[r['id'] for r in rs],
        candidatePagesWithoutStructuredRecord=[p for p in b['recipePages'] if p not in represented],
        transcriptionReview='Candidate pages require source review; not every candidate contains a formula',
        duplicateOf=b.get('duplicateOf'))
    reports.append(row)
    if b['status']=='unreadable' or b.get('duplicateOf'):
        continue
    name=b['name'].lower()
    if b['file'].startswith('Recipe Glazes/'):
        room='recipes'
    elif re.search(r'history|chinese|athens|palestin|african|peru|prehistor|apulian|global clay|southwestern|picture worlds|precious|bodies of clay|beyond blue|finds in context|makers.*marks|colours and contrast',name):
        room='masters'
    elif re.search(r'kiln|firing|burners',name): room='kiln'
    elif re.search(r'material|chemistry|mineral|phase|powder|piezo|nuclear|manufactur|arthroplasty',name): room='materials'
    elif 'kintsugi' in name: room='restoration'
    elif re.search(r'glaz|glazy',name): room='recipes'
    else: room='path'
    v=visuals.get(b['id'],{})
    record=dict(id=b['id'],title=v.get('title',b['name']),author=v.get('author',''),pages=b['pages'])
    # A source's own short passage, not an invented summary or practical instruction.
    excerpts={'electric-kilns-for-ceramics':61,'global-clay':18,'chinese-ceramics':31,
              'colour-in-glazes':18,'mastering-hand-building':75,'a-beginner-s-guide-to-kintsugi':30}
    page_no=next((pg for prefix,pg in excerpts.items() if b['id'].startswith(prefix)),None)
    if page_no:
        text=re.sub(r'\s+',' ',pages[page_no-1]['text']).strip()
        record['passage']=dict(page=page_no,text=text[:300].rsplit(' ',1)[0]+'…')
    rooms[room].append(record)

corpus=[p for part in json.loads((OUT/'search-parts.json').read_text()) for p in json.loads((OUT/part).read_text())]
keys=collections.Counter((p['book'],p['page']) for p in corpus)
failures=[]
for b in books:
    if b['status']=='unreadable' or b.get('duplicateOf'):continue
    pages=json.loads((OUT/(b['id']+'.json')).read_text())
    if len(pages)!=b['pages']:failures.append(f'{b["id"]}: page count')
    for p in pages:
        if p['text'].strip() and keys[(b['id'],p['page'])]!=1:failures.append(f'{b["id"]}:{p["page"]}: search entry')
        if not p['text'].strip() and not p.get('image'):failures.append(f'{b["id"]}:{p["page"]}: no readable representation')
        if p.get('image') and not (ROOT/p['image']).exists():failures.append(f'{b["id"]}:{p["page"]}: missing image')
if len({r['id'] for r in recipes})!=len(recipes):failures.append('Duplicate recipe IDs')
unique=[b for b in books if not b.get('duplicateOf') and b['status']!='unreadable']
coverage=dict(audited='2026-11-07',scope='Supplied local library against the website source and search corpus',
    definitions={'indexed':'Searchable extracted or OCR text; not semantic verification',
    'ocr':'Unverified text recognition; consult source image',
    'structured':'Calculator record; its status states its verification level',
    'candidate':'Ingredient-based finding aid; not a verified formula',
    'roomIntegration':'Source reading path; not a claim that every chapter has been synthesised into a lesson'},
    summary=dict(localFiles=len(files),catalogueFiles=len(books),readableUniqueSources=len(unique),
    sourcePages=sum(b['pages'] for b in unique),searchablePages=len(corpus),
    structuredRecipes=len(recipes),ocrPages=sum(b.get('ocrPages',0) for b in unique),
    pagesWithoutText=sum(len(b.get('pagesWithoutText',[])) for b in unique),
    failures=failures),sources=reports,files=files,
    unresolved=[{'type':'unreadable-source','file':b['file'],'reason':b.get('error')} for b in books if b['status']=='unreadable'],
    remainingEditorialWork='Complete formula-by-formula visual verification and chapter-by-chapter teaching synthesis are not established by indexing or room links.')
(OUT/'coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2))
(OUT/'knowledge-paths.json').write_text(json.dumps(dict(date='2026-11-07',rooms=rooms),ensure_ascii=False))
print(json.dumps(coverage['summary'],indent=2))
if failures:raise SystemExit(1)
