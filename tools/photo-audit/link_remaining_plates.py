"""Second photo audit: explicit bounds and source reading order, including omissions."""
from pathlib import Path
import json,io,hashlib
import pymupdf as fitz
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
SOURCE=Path('/Users/chloeclaes/Downloads/Eleonora Ceramics/Colour in Glazes - Linda Bloomfield.pdf')
doc=fitz.open(SOURCE);path=ROOT/'book-recipes.js';recipes=json.loads(path.read_text().split('=',1)[1].rstrip(';\n'))
# (plate, formula page interval, visually checked tile rectangles)
groups=[
(114,111,113,[(125,75,404,435),(419,76,696,444),(120,445,404,807),(416,449,679,812),(129,817,388,1174),(411,817,678,1176)]),
(117,114,116,[(119,59,415,462),(429,71,718,425),(116,468,396,822),(441,424,697,837),(117,822,414,1158),(422,850,734,1172)]),
(127,124,126,[(125,62,403,439),(415,70,680,439),(122,439,397,799),(411,446,678,807),(117,798,398,1157),(409,806,686,1170)]),
(131,127,129,[(117,139,407,500),(451,174,686,513),(86,519,412,811),(421,515,727,829),(126,832,380,1122),(419,824,678,1146)]),
(141,139,140,[(135,64,339,337),(454,65,653,339),(111,464,398,768),(417,390,648,759),(402,794,610,1120)]),
(157,154,156,[(195,141,422,433),(445,62,717,429),(194,462,418,750),(481,461,696,750),(194,773,424,1130),(459,799,703,1123)]),
(171,167,169,[(67,97,398,313),(443,95,726,318),(50,329,440,607),(451,360,732,583),(49,593,423,840),(439,607,741,832),(91,849,394,1162),(421,846,754,1043)])]
out=ROOT/'assets/recipes/photographs';manifest=[]
for plate,first,last,boxes in groups:
 records=[r for r in recipes if r['id'].startswith('bloomfield-') and first<=r['page']<=last and (not r.get('image') or '/photographs/' in r['image'])]
 assert len(records)==len(boxes),(plate,len(records),len(boxes))
 info=doc[plate-1].get_image_info(xrefs=True)[0];raw=doc.extract_image(info['xref']);im=Image.open(io.BytesIO(raw['image'])).convert('RGB');platepath=out/f'bloomfield-plate-{plate}.jpg';platepath.write_bytes(raw['image'])
 for i,(r,box) in enumerate(zip(records,boxes)):
  pos=i if plate!=141 or i<4 else 5
  imagepath=out/(r['id']+'.jpg');im.crop(box).save(imagepath,quality=94)
  credit=f'Linda Bloomfield, Colour in Glazes; photographed specimen, supplied PDF p. {plate}, row {pos//2+1}, column {pos%2+1}. Matched to the publication’s formula and plate sequence; original colours retained.'
  r.update(image=str(imagepath.relative_to(ROOT)),imageVerified=True,imageSourcePage=plate,imageCredit=credit)
  manifest.append({'id':r['id'],'formulaPages':[r['page'],r['endPage']],'platePage':plate,'plateImage':str(platepath.relative_to(ROOT)),'cropPixels':box,'image':r['image'],'evidence':'Publication formula / plate sequence; withheld maroon occupies row 3 column 1 on p.141'})
path.write_text('window.BOOK_RECIPES='+json.dumps(recipes,ensure_ascii=False)+';\n')
(ROOT/'tools/photo-audit/batch-2.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print('Added',len(manifest))
