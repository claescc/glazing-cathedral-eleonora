"""Build visual finding aids from the supplied PDFs; never alter recipe formulas.

Titles are copied from source headings. Pages without a identifiable heading
remain labelled as passages, rather than receiving an invented recipe name.
"""
from pathlib import Path
import json
import re
import pymupdf as fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LIB = Path('/Users/chloeclaes/Downloads/Eleonora Ceramics')
OUT = ROOT / 'assets/library/visuals'
OUT.mkdir(exist_ok=True)
books = json.loads((ROOT / 'assets/library/catalogue.json').read_text())
result = {'books': {}, 'pages': {}}
records = json.loads((ROOT / 'book-recipes.js').read_text().split('=', 1)[1].rstrip().rstrip(';'))
# These files start with a title page, not an illustrated cover.
title_pages = ('Ceramic Finds in Context', 'Colours and Contrast',
               'How Things Make History', 'Patterns in the Production',
               'Pottery Style and Society', 'Ceramic Material Systems')

def render(page, dest, width, clip=None):
    if dest.exists():
        return Image.open(dest).convert('RGB')
    rect = clip or page.rect
    pix = page.get_pixmap(matrix=fitz.Matrix(width / rect.width, width / rect.width),
                          clip=clip, alpha=False)
    pix.pil_save(dest, format='JPEG', quality=82, optimize=True)
    return Image.open(dest).convert('RGB')

def accent(image):
    # A sampled source colour is decorative, never evidence of a glaze colour.
    small = image.copy()
    small.thumbnail((64, 64))
    colours = small.quantize(colors=12).convert('RGB').getcolors(4096)
    colourful = [(n, rgb) for n, rgb in colours
                 if max(rgb) - min(rgb) > 35 and 35 < sum(rgb)/3 < 220]
    rgb = max(colourful or colours, key=lambda x:x[0])[1]
    return '#%02x%02x%02x' % rgb

def headings(text):
    lines = [re.sub(r'\s+', ' ', x).strip() for x in text.splitlines() if x.strip()]
    formula = []
    for i, line in enumerate(lines):
        if re.search(r'\bCONE\s*[\d–−-]+\b', line, re.I) and len(line) < 130:
            if line.upper() == line and len(line) > 8:
                formula.append(line)
        elif line.upper().startswith('INGREDIENTS') and i:
            prev = lines[i-1]
            if prev.upper() == prev and 4 < len(prev) < 110 and not re.search(r'AMOUNTS|NOTES|TOTAL|%|\d+\.\d+', prev):
                formula.append(prev)
    if len(formula)>1:
        formula = [x for x in formula if not re.search(r'^(CONE|MID-RANGE|HIGH-FIRE|LOW-FIRE).*RECIPES$', x)]
    return list(dict.fromkeys(formula))

for b in books:
    if b.get('duplicateOf') or b['status'] == 'unreadable':
        continue
    doc = fitz.open(LIB / b['file'])
    name = b['name'].replace('_', ' ').removeprefix(' OceanofPDF.com ').strip()
    title, sep, author = name.rpartition(' - ')
    glazy = name.endswith(' Glazy')
    if glazy:
        title = name.removesuffix(' Glazy').strip()
        lines = [x.strip() for x in doc[0].get_text().splitlines() if x.strip()]
        # Author is copied only where the exported page explicitly provides it.
        author = next((lines[i+1] for i,x in enumerate(lines[:-1])
                       if x.startswith('Created ') and not lines[i+1].startswith('@')), '')
    elif not sep:
        title, author = name, ''
    clip = None
    if glazy and title != 'Recipes':
        rects = [fitz.Rect(x['bbox']) for x in doc[0].get_image_info()
                 if x['bbox'][0] > doc[0].rect.width * .4
                 and x['bbox'][1] < doc[0].rect.height * .3
                 and x['bbox'][2]-x['bbox'][0] > 45
                 and x['bbox'][3]-x['bbox'][1] > 45]
        if rects:
            clip = max(rects, key=lambda r:r.get_area())
    kind = ('Source photograph' if clip else 'Source-page preview') if glazy or name.startswith('Clay & Glaze Types') else ('Title page' if name.startswith(title_pages) else 'Book cover')
    cover_name = b['id'] + '-cover.jpg'
    im = render(doc[0], OUT / cover_name, 420, clip)
    result['books'][b['id']] = {'title': title, 'author': author,
        'cover': 'assets/library/visuals/' + cover_name, 'coverKind': kind,
        'accent': accent(im), 'coverPage': 1}
    pages = json.loads((ROOT / 'assets/library' / (b['id']+'.json')).read_text())
    for p in pages:
        if not p['recipeCandidate']:
            continue
        n = p['page']
        names = headings(p['text'])
        transcribed = [x.get('sourceHeading') or x['name'] for x in records
                       if x.get('sourceBookId')==b['id'] and x.get('page')==n]
        if transcribed:
            names = list(dict.fromkeys(transcribed))
        # Preserve actual section headings when the page is a discussion.
        if not names:
            candidates = [x.strip() for x in p['text'].splitlines()
                          if 5 < len(x.strip()) < 100 and x.strip().isupper()
                          and not re.search(r'INGREDIENTS|AMOUNTS|NOTES|TOTAL|ANALYSIS|\d|%|\|', x)
                          and x.strip() not in ['I ASH GLAZES', 'ASH GLAZES', 'U.S.U.S.']]
            names = candidates[:2]
        # This volume prints its recipe title before an explicit Cone field.
        if b['name'].startswith('Amazing Glaze Recipes'):
            match = re.search(r'([^\n]+)\n\s*Cone:', p['text'])
            if match:
                names = [match.group(1).strip()]
        if glazy:
            names = [title] if n == 1 else names
        thumbnail = b['id'] + '-p' + str(n) + '.jpg'
        render(doc[n-1], OUT / thumbnail, 360)
        visual = {
            'title': (' · '.join(names[:3]) + (f' · +{len(names)-3} more recipes' if len(names)>3 else '')) if names else None,
            'kind': 'Recipe heading' if transcribed or headings(p['text']) or (glazy and n==1) or (b['name'].startswith('Amazing Glaze Recipes') and names) else 'Section heading' if names else 'Text passage',
            'thumbnail': 'assets/library/visuals/' + thumbnail}
        if b['name'].startswith('Amazing Glaze Recipes') and names:
            for field in ['Cone', 'Atmosphere', 'Surface', 'Color']:
                match = re.search(r'^\s*'+field+r':\s*([^\n]+)', p['text'], re.M)
                if match:
                    visual[field.lower()] = match.group(1).strip()
            # The source pairs formula pages with an immediately following
            # photograph. Record the image page explicitly, rather than hiding
            # that relationship or labelling an unrelated colour reference exact.
            if n < len(doc) and not doc[n].get_text().strip() and doc[n].get_images():
                next_page = doc[n]
                rects = [fitz.Rect(x['bbox']) for x in next_page.get_image_info()]
                if rects:
                    photo_name = b['id'] + '-photo-p' + str(n+1) + '.jpg'
                    im = render(next_page, OUT / photo_name, 600, max(rects, key=lambda r:r.get_area()))
                    # Trim only the blank margin of the source photograph.
                    from PIL import ImageChops
                    diff = ImageChops.difference(im, Image.new('RGB', im.size, 'white')).convert('L').point(lambda x:255 if x>35 else 0)
                    bbox = diff.getbbox()
                    if bbox:
                        pad = 18
                        bbox = (max(0,bbox[0]-pad),max(0,bbox[1]-pad),min(im.width,bbox[2]+pad),min(im.height,bbox[3]+pad))
                        im.crop(bbox).save(OUT / photo_name, quality=85)
                    visual['photograph'] = 'assets/library/visuals/' + photo_name
                    visual['photographPage'] = n+1
                    source_name = b['id'] + '-source-p' + str(n+1) + '.jpg'
                    render(next_page, OUT / source_name, 1200)
                    visual['photographSource'] = 'assets/library/visuals/' + source_name
        result['pages'][b['id'] + ':' + str(n)] = visual
    doc.close()
(OUT / 'index.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n')
print(json.dumps({'books':len(result['books']), 'pages':len(result['pages']),
                 'headings':sum(bool(x['title']) for x in result['pages'].values())}))
