"""Caption-linked photographs in the supplied Ash Glazes, third edition."""
from pathlib import Path
import json
import pymupdf as fitz
ROOT=Path(__file__).resolve().parents[2]
doc=fitz.open('/Users/chloeclaes/Downloads/Eleonora Ceramics/Ash Glazes 3rd Edition - Phil Rogers.pdf')
path=ROOT/'book-recipes.js';recipes=json.loads(path.read_text().split('=',1)[1].rstrip(';\n'));byid={r['id']:r for r in recipes};out=ROOT/'assets/recipes/photographs';manifest=[]
items=[
('rogers-ash-1',112,(365,80,485,176),'Phil Rogers standard ash glaze: upper bowl in Colour test 9. The caption explicitly identifies the standard appendix formula; the lower bowl uses an ash substitute and is excluded.','Source photograph'),
('rogers-ash-4',93,(222,138,349,276),'Phil Rogers straw ash glaze: right bowl in Colour test 8, normal reduction. The text explicitly refers to the straw ash recipe on printed p.182. The left salt-fired bowl is excluded.','Source photograph'),
('rogers-ash-17',91,(63,59,271,241),'Phil Rogers, Model of a blanket chest (1973), wood ash 50 / red earthenware clay 50, oxidised at 1280°C. The caption gives the same 50/50 formula as recipe 17; this is Rogers’s Etruria marl example, not a photograph of a Mick Casson pot.','50/50 formula example')]
for id,page,rect,caption,kind in items:
 dest=out/(id+'.jpg');doc[page-1].get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(rect),alpha=False).save(dest)
 evidence=out/f'rogers-source-{page}.jpg';doc[page-1].get_pixmap(matrix=fitz.Matrix(1.6,1.6),alpha=False).save(evidence)
 r=byid[id];r.update(image=str(dest.relative_to(ROOT)),imageVerified=True,imageSourcePage=page,imageCredit=caption,imageKind=kind,imageEvidenceUrl=str(evidence.relative_to(ROOT)))
 manifest.append({'id':id,'image':r['image'],'platePage':page,'plateImage':r['imageEvidenceUrl'],'cropPdfPoints':rect,'evidence':caption})
path.write_text('window.BOOK_RECIPES='+json.dumps(recipes,ensure_ascii=False)+';\n')
(ROOT/'tools/photo-audit/batch-2-ash.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print('Linked',len(manifest))
