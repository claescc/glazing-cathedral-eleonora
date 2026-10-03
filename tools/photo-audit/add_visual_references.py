"""Documented visual references, explicitly distinct from exact recipe photographs."""
from pathlib import Path
import json
import pymupdf as fitz
ROOT=Path(__file__).resolve().parents[2];p=ROOT/'book-recipes.js';rows=json.loads(p.read_text().split('=',1)[1].rstrip(';\n'));by={r['id']:r for r in rows};out=ROOT/'assets/recipes/photographs'
b=fitz.open('/Users/chloeclaes/Downloads/Eleonora Ceramics/Colour in Glazes - Linda Bloomfield.pdf')
a=fitz.open('/Users/chloeclaes/Downloads/Eleonora Ceramics/Ash Glazes 3rd Edition - Phil Rogers.pdf')
manifest=[]
def add(id,image,caption,kind,evidence):
 r=by[id];r.update(image=image,imageVerified=False,imageKind=kind,imageCredit=caption,imageEvidenceUrl=evidence,visualReference=True)
 manifest.append({'id':id,'image':image,'kind':kind,'evidence':caption,'sourceUrl':evidence})
for id,doc,page,index,caption,kind in [
 ('bloomfield-38-crystalline-glaze',b,39,0,'Avril Farley crystalline glaze detail (2004), photographed by Martin Avery. This coloured example contains cobalt and erbium, fired to 1255°C then refired to 800°C. The base formula does not include those additions or the refiring.','Coloured variation'),
 ('bloomfield-133-copper-red-glaze',b,132,0,'Bridget Drakeford copper-red porcelain bottle (2009), photographed by Irene Sanderson. Published beside her copper-red recipe; the caption does not confirm that exact formula.','Colour reference'),
 ('rogers-ash-10',a,28,1,'William Marshall Nuka yunomi, photographed by Anthony Shorthouse. The caption supplies 50 wood ash, 60 feldspar OR Cornish stone, 40 quartz. The appendix recipe uses feldspar; the photographed choice is not stated.','Nuka reference')]:
 raw=doc.extract_image(doc[page-1].get_image_info(xrefs=True)[index]['xref']);dest=out/(id+'-reference.'+raw['ext']);dest.write_bytes(raw['image']);ev=out/(id+'-source.jpg');doc[page-1].get_pixmap(matrix=fitz.Matrix(1.5,1.5)).save(ev)
 add(id,str(dest.relative_to(ROOT)),caption,kind,str(ev.relative_to(ROOT)))
add('bloomfield-40-crater-glaze','assets/glazes/tile_crater_glazy.png','Kenneth Ibbett, Akiko’s crater glaze, Glazy #4454. Related formula uses 2 parts rutile instead of the book’s 2 parts titanium dioxide. This photograph is a surface reference, not a verified result of the book formula.','Related formula','https://glazy.org/recipes/4454/akikos-crater-glaze')
for id in ['jones-pv-base','jones-vc-glaze']:
 add(id,'assets/recipes/photographs/elecfiring_02-1.jpg','Jonathan Kaplan Disk Vase: coloured VC Blue/Green/Purple with PV Black sprayed over it. Shows a layered use of this base after colourant additions, not the appearance of the uncoloured base.','Coloured + layered example','https://ceramicartsnetwork.org/daily/article/Cone-6-Pottery-Glazes-and-Firing-Tips-for-Creating-Exciting-Surfaces-in-Electric-Kilns')
p.write_text('window.BOOK_RECIPES='+json.dumps(rows,ensure_ascii=False)+';\n');(ROOT/'tools/photo-audit/visual-references.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
