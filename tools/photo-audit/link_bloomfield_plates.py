"""Extract photographed specimens from the supplied book's composite plates.

Plate positions follow the publication's six-formula, two-column reading order.
No colour correction, synthesis, substitution or generated image is used.
The manifest retains the complete plate, crop and source formula for review.
"""
from pathlib import Path
import json, hashlib
import pymupdf as fitz
from PIL import Image
import io
ROOT = Path(__file__).resolve().parents[2]
SOURCE = Path('/Users/chloeclaes/Downloads/Eleonora Ceramics/Colour in Glazes - Linda Bloomfield.pdf')
recipes_path = ROOT / 'book-recipes.js'
recipes = json.loads(recipes_path.read_text().split('=', 1)[1].rstrip(';\n'))
doc = fitz.open(SOURCE)
# Six specimens in row-major order; ranges refer to supplied PDF formula pages.
groups = [(76,73,75), (79,76,78), (92,89,91), (95,92,94), (104,102,103), (107,104,106), (149,146,148)]
# Individually reviewed specimen bounds, excluding neighbouring tiles.
bounds={
76:[(155,90,425,450),(430,85,705,458),(125,451,405,813),(405,460,681,819),(121,818,391,1185),(394,825,660,1190)],
79:[(95,65,373,482),(374,155,717,470),(100,465,315,835),(398,487,620,826),(90,842,331,1175),(381,842,631,1167)],
92:[(116,59,396,425),(409,83,674,436),(120,429,389,786),(400,438,661,792),(102,786,374,1140),(386,795,657,1144)],
95:[(75,48,372,414),(394,117,653,415),(95,425,354,788),(382,434,672,767),(129,791,362,1145),(386,805,635,1100)],
104:[(137,62,413,438),(416,85,680,442),(125,439,402,796),(404,443,672,802),(131,797,391,1137),(397,802,676,1165)],
107:[(48,78,373,425),(414,156,620,442),(113,426,362,800),(383,457,681,760),(99,805,381,1128),(436,786,635,1097)],
149:[(151,71,381,445),(404,99,692,443),(105,463,394,766),(412,450,661,796),(123,775,377,1133),(400,794,683,1114)]}
manifest=[]
out=ROOT/'assets/recipes/photographs';out.mkdir(parents=True,exist_ok=True)
for plate,first,last in groups:
    records=[r for r in recipes if r['id'].startswith('bloomfield-') and first<=r['page']<=last and r['name']!='Iron honey-yellow']
    assert len(records)==6,(plate,len(records))
    info=doc[plate-1].get_image_info(xrefs=True)
    assert len(info)==1
    raw=doc.extract_image(info[0]['xref'])
    image=Image.open(io.BytesIO(raw['image'])).convert('RGB')
    plate_path=out/f'bloomfield-plate-{plate}.jpg';plate_path.write_bytes(raw['image'])
    for i,r in enumerate(records):
        col,row=i%2,i//2;w,h=image.size
        box=bounds[plate][i]
        path=out/(r['id']+'.jpg');image.crop(box).save(path,quality=94)
        r.update(image=str(path.relative_to(ROOT)),imageVerified=True,imageSourcePage=plate,imageCredit=f'Linda Bloomfield, Colour in Glazes; photographed test tile, supplied PDF p. {plate}, row {row+1}, column {col+1}. Matched by the publication’s recipe and plate sequence; original photograph colours retained.')
        manifest.append({'id':r['id'],'formulaPages':[r['page'],r['endPage']],'platePage':plate,'plateImage':str(plate_path.relative_to(ROOT)),'cropPixels':box,'image':r['image'],'evidence':'Publication recipe / plate reading order','sourceSha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest()})
# Lucy Burley's individual tiles are on the following page, in a different order.
for name,index in [('Matt duck-egg blue',0),('Matt olive green',1),('Matt turquoise',2)]:
    r=next(r for r in recipes if r['name']==name);info=doc[99].get_image_info(xrefs=True)[index];raw=doc.extract_image(info['xref']);path=out/(r['id']+'.'+raw['ext']);path.write_bytes(raw['image'])
    r.update(image=str(path.relative_to(ROOT)),imageVerified=True,imageSourcePage=100,imageCredit=f'Linda Bloomfield, Colour in Glazes; Lucy Burley test tile, supplied PDF p. 100, photograph {index+1}. Olive and turquoise formula/photo matches also checked against the publisher’s illustrated recipe excerpt.')
    manifest.append({'id':r['id'],'formulaPages':[r['page'],r['endPage']],'platePage':100,'image':r['image'],'evidence':'Individual test tile; publisher excerpt labels olive green and turquoise','corroboratingUrl':'https://ceramicartsnetwork.org/daily/article/Recipes-for-Cool-Ceramic-Glaze-Colors'})
recipes_path.write_text('window.BOOK_RECIPES='+json.dumps(recipes,ensure_ascii=False)+';\n')
(ROOT/'tools/photo-audit/batch-1.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
coverage_path=ROOT/'bloomfield-coverage.json';coverage=json.loads(coverage_path.read_text());byid={r['id']:r for r in recipes}
for r in coverage['records']:r['image']=byid[r['id']]['image']
coverage['photographs']=sum(bool(r['image']) for r in coverage['records']);coverage_path.write_text(json.dumps(coverage,ensure_ascii=False,indent=2)+'\n')
print('Linked',len(manifest),'photographs; Bloomfield coverage',coverage['photographs'],'/',coverage['recipes'])
