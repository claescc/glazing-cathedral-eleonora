"""Refresh photograph evidence links and the explicit unresolved-recipe ledger."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[2]
path=ROOT/'book-recipes.js';recipes=json.loads(path.read_text().split('=',1)[1].rstrip(';\n'));byid={r['id']:r for r in recipes}
for manifest in sorted((ROOT/'tools/photo-audit').glob('batch-*.json')):
 for entry in json.loads(manifest.read_text()):
  r=byid[entry['id']]
  r['imageEvidenceUrl']=entry.get('plateImage') or entry.get('sourceUrl') or entry.get('corroboratingUrl')
path.write_text('window.BOOK_RECIPES='+json.dumps(recipes,ensure_ascii=False)+';\n')
coverage_path=ROOT/'bloomfield-coverage.json';coverage=json.loads(coverage_path.read_text())
for r in coverage['records']:r['image']=byid[r['id']]['image']
coverage['photographs']=sum(bool(r['image']) for r in coverage['records']);coverage_path.write_text(json.dumps(coverage,ensure_ascii=False,indent=2)+'\n')
reasons={
 'bloomfield-24-transparent-alkaline-glaze-fired-to':'Uncoloured base. No caption-linked photograph established; identical formula also occurs on PDF p.219.',
 'bloomfield-219-glaze-recipe-for-alkaline-glaze-fired-to':'Uncoloured base, duplicate of PDF p.24 formula. The photographed alkaline glaze on p.171 has different ingredients.',
 'bloomfield-38-crystalline-glaze':'Adjacent Avril Farley vessel is a coloured and refired variation; not a verified photograph of this uncoloured formula.',
 'bloomfield-40-crater-glaze':'Glazy #4454 uses rutile in place of the published titanium dioxide. First-edition excerpt also differs; neither is an exact formula match.',
 'bloomfield-42-shrink-and-crawl-glaze':'Nearby Emma Williams photograph is a different earthenware glaze/firing temperature. No exact match established online.',
 'bloomfield-133-copper-red-glaze':'Nearby Bridget Drakeford vessel has the right artist and glaze family, but the caption does not establish the exact formula.',
 'rogers-ash-10':'William Marshall Nuka caption on PDF p.28 allows feldspar OR Cornish stone; the photographed material choice is not specified.',
 'jones-pv-base':'Published Disk Vase uses coloured, layered derivatives, not this uncoloured base.',
 'jones-vc-glaze':'Published Disk Vase uses coloured, layered derivatives, not this uncoloured base.'}
unresolved=[{'id':r['id'],'name':r['name'],'source':r['source'],'formulaPage':r['page'],'status':'Photograph not yet verified','reason':reasons.get(r['id'],'Book and online candidates did not establish this exact formula, material selection and firing. Generic photographs of the named maker are insufficient.')} for r in recipes if not r.get('image') or r.get('visualReference')]
(ROOT/'tools/photo-audit/unresolved.json').write_text(json.dumps(unresolved,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'bookRecipes':len(recipes),'photographed':sum(bool(r.get('image')) for r in recipes),'unresolved':len(unresolved),'bloomfieldPhotographs':coverage['photographs']}))
