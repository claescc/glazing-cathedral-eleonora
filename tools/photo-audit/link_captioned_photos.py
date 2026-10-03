"""Photographs matched by explicit captions, formula labels or adjacent source layout."""
from pathlib import Path
import json,io,urllib.request
import pymupdf as fitz
from PIL import Image
ROOT=Path(__file__).resolve().parents[2];path=ROOT/'book-recipes.js';recipes=json.loads(path.read_text().split('=',1)[1].rstrip(';\n'));byid={r['id']:r for r in recipes};out=ROOT/'assets/recipes/photographs';manifest=[]
doc=fitz.open('/Users/chloeclaes/Downloads/Eleonora Ceramics/Colour in Glazes - Linda Bloomfield.pdf')
def add(id,page,box,description,index=0):
 r=byid[id];raw=doc.extract_image(doc[page-1].get_image_info(xrefs=True)[index]['xref']);im=Image.open(io.BytesIO(raw['image'])).convert('RGB');plate=out/f'bloomfield-plate-{page}-{index}.jpg';plate.write_bytes(raw['image']);dest=out/(id+'.jpg');(im.crop(box) if box else im).save(dest,quality=94)
 r.update(image=str(dest.relative_to(ROOT)),imageVerified=True,imageSourcePage=page,imageCredit='Linda Bloomfield, Colour in Glazes. '+description,imageEvidenceUrl=str(plate.relative_to(ROOT)))
 manifest.append({'id':id,'image':r['image'],'platePage':page,'plateImage':str(plate.relative_to(ROOT)),'cropPixels':box,'evidence':description})
add('bloomfield-84-celadon',84,(372,36,514,447),'Mirka Golden-Hann’s labelled iron series: first groove is the published 0.4% iron addition; the separate L-shaped tile is the uncoloured base and is not used.')
add('bloomfield-87-copper-iron-green',86,(132,6,368,754),'Lok Ming Fung: left test tile, copper 0.75% and iron 8%; formula and tile corroborated by the publisher’s labelled green-glazes excerpt.')
add('bloomfield-87-copper-chrome-green',86,(463,140,705,753),'Lok Ming Fung: right test tile, copper 1.5% and chromium 0.4%; formula and tile corroborated by the publisher’s labelled green-glazes excerpt.')
add('bloomfield-88-copper-ilmenite-green',87,(0,0,470,718),'Lok Ming Fung: copper-ilmenite test tile; formula and photograph labelled together in the publisher’s green-glazes excerpt.')
for id,box in [('bloomfield-95-chrome-green-glaze',(116,51,415,463)),('bloomfield-96-duck-egg-blue-glaze',(466,51,745,463)),('bloomfield-96-turquoise-glaze',(772,52,1091,466))]:
 add(id,97,box,'John Solly earthenware test tiles; left-to-right recipe order on supplied PDF pp.95–96.')
# These two photographs precede the heading for the next section.
raw=doc.extract_image(doc[97].get_image_info(xrefs=True)[0]['xref']);im=Image.open(io.BytesIO(raw['image']));w,h=im.size
for id,box in [('bloomfield-97-bright-turquoise',(0,0,round(w*.49),round(h*.8))),('bloomfield-97-dark-turquoise',(round(w*.51),0,w,round(h*.8)))]:add(id,98,box,'Lok Ming Fung: bright turquoise on the left, dark turquoise on the right, identified by the left-to-right caption on supplied PDF p.97. The discs below are pooling tests.')
add('bloomfield-109-red-purple-glaze',109,None,'John Solly’s red-purple specimen printed immediately below its formula, before the separate purple formula.')
add('bloomfield-146-iron-honey-yellow',146,(283,258,533,924),'Iron honey-yellow: right-hand tile explicitly identified by the caption; the small overlap disc is not used.')
url='https://ceramicartsnetwork.org/daily/article/Cone-6-Pottery-Glazes-and-Firing-Tips-for-Creating-Exciting-Surfaces-in-Electric-Kilns'
# The two-layer photograph is labelled as a combination on both recipe records.
for id,filename,caption,kind in [
 ('jones-edgy-green','elecfiringtech_02-1','Jonathan Kaplan, Vase with Circular Attributes and Stand, Edgy Green glaze. Published by Ceramic Arts Network.','Fired photograph'),
 ('jones-vc-blue-green-purple-variation','elecfiring_02-1','Jonathan Kaplan, Disk Vase: VC Blue/Green/Purple with PV Black sprayed over it. This is a layered result, not VC alone. Published by Ceramic Arts Network.','Layered photograph'),
 ('jones-pv-black-liner-glaze','elecfiring_02-1','Jonathan Kaplan, Disk Vase: PV Black sprayed over VC Blue/Green/Purple. This is a layered result, not PV Black alone. Published by Ceramic Arts Network.','Layered photograph')]:
 r=byid[id];dest=out/(filename+'.jpg');
 if not dest.exists(): urllib.request.urlretrieve('https://ceramicartsnetwork.org/images/default-source/uploadedimages/wp-content/uploads/2012/10/'+filename+'.jpg',dest)
 r.update(image=str(dest.relative_to(ROOT)),imageVerified=True,imageCredit=caption,imageEvidenceUrl=url,imageKind=kind)
 manifest.append({'id':id,'image':r['image'],'evidence':caption,'sourceUrl':url,'imageUrl':'https://ceramicartsnetwork.org/images/default-source/uploadedimages/wp-content/uploads/2012/10/'+filename+'.jpg'})
path.write_text('window.BOOK_RECIPES='+json.dumps(recipes,ensure_ascii=False)+';\n');(ROOT/'tools/photo-audit/batch-2-captioned.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n');print('Linked',len(manifest))
