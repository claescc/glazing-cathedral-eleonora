from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
rows=[r for r in json.loads((ROOT/'book-recipes.js').read_text().split('=',1)[1].strip().rstrip(';')) if r['source']=='Colour in Glazes']
# Remove illustration associations that the visual review rejected.
for x in rows:
 if x['name']=='Nickel pink matt, not food safe':
  x.update(image=None,imageVerified=False);x.pop('imageCredit',None);x.pop('imageSourcePage',None)
ash=[
(1,'Phil Rogers',183,'1280°C','Reduction','Any ash:53;Cornish stone:14.5;Potash feldspar:14.5;China clay:6.5;Whiting:4.5;Quartz:7','Standard glaze; the source says the last three ingredients may need adjustment depending on the ash.'),
(2,'Phil Rogers',183,None,None,'Ash:47;China clay:8;Feldspar:21;Whiting:8;Quartz:9;Dolomite:7','Described as similar to recipe 1, usually lighter in tone.'),
(3,'Phil Rogers',183,'1280°C','Reduction','Ash:50;Feldspar:21.5;China clay:7;Whiting:3.5;Quartz:18',''),
(4,'Phil Rogers',183,None,None,'Straw ash:59.5;Potash feldspar:21.5;China clay:3.5;Whiting:4.5;Talc:6;Quartz:5','Named Straw ash glaze in the source.'),
(5,'Katherine Pleydell-Bouverie',183,None,None,'Petalite:6;Soda feldspar:28;China clay:7;Quartz:10;Ash:31;Whiting:17','Described as pale green.'),
(6,'Katherine Pleydell-Bouverie',183,'1280°C','Reduction','Grass ash:33;China clay:15;Feldspar:44;Calcium borate frit:7','Source also describes salt-kiln use, a smooth Shino-like surface and tea-leaf crystal pattern.'),
(7,'Alan Brunsden',183,'1280°C','Reduction; also suitable for oxidation','Potash feldspar:30;Mixed wood ash:43;Ball clay:17;Talc:8;Quartz:8;Bentonite:2','Ash washed three times; source specifies heavy reduction from 1000°C for green breaking to brown.'),
(8,'Jim Malone',183,None,None,'Shap hornfels:25;Shap pink granite:75;Hawthorn ash:100;Ball clay:50','Continuation on PDF page 184 describes this as a local-material variation of the classic 40:40:20 formula.'),
(9,'Warren MacKenzie',184,'1280°C','Reduction','Ash:4;Fusible red clay (Albany slip):5','The original uses parts, not percentages. The source discusses thickness and firing-temperature variation.'),
(10,'Warren MacKenzie',184,'1280–1300°C','Reduction; oxidation at upper temperature limits','Feldspar:60;Ash:50;Quartz:40','Described as a Nuka-like opaque opalescent glaze with a blue, Chun-like quality.'),
(11,'Muriel Harris',184,'1230–1250°C','Oxidation','Seaweed ash:38;Feldspar:36;China clay:8;Ball clay:8;Flint:10',''),
(12,'Walter Keeler',184,None,None,'Feldspar:45.6;China clay:4.5;Ash:13.6;Whiting:9.5;Yellow ochre:27.6','Source also describes salt-kiln suitability and dependence on ochre quality.'),
(13,'Walter Keeler',184,None,None,'Red clay:60;Unwashed ash:20;Nepheline syenite:20','Continuation on PDF page 185 states this can be used for raw glazing at leatherhard.'),
(14,'Walter Keeler',185,None,None,'Ash:4;Feldspar:2;Red clay:1','Source states this can be used for raw glazing at bone dry.'),
(15,'Mick Casson',185,'1280°C','Oxidation or reduction','Ash:50;China clay:50','Described as a dry, stony matt glaze; thickness changes colour. Added oxides are discussed but no fixed amount is given.'),
(16,'Mick Casson',185,'1270–1280°C','Oxidation','Elm ash:80;Potash feldspar:40;Whiting:40;Ball clay:70','Described as smooth light grey turning to mottled grey/gold where thicker, over a smooth low-iron body.'),
(17,'Mick Casson',185,'1280°C','Oxidation','Ash:50;Red clay:50','Source describes Indian red breaking to ochre mottle where thicker, depending on red clay.'),
(18,'Mick Casson',185,'1280°C','Oxidation','Ash:30;Feldspar:30;Ball clay:20;Whiting:10;Red clay:10',''),
(19,'Mick Casson',185,'1280°C','Oxidation','Ash:40;Feldspar:40;Any clay:20','The source suggests additions of 10% dolomite, talc etc. These alternatives are not one fixed formula and are not silently added to the calculator. Described as blue/grey.'),
(20,'Philip Revell',185,'1280°C','Reduction','Potash feldspar:19;Whiting:31;Talc:2.4;Bone ash:2.4;Ball clay:6;Quartz:9;Cornish stone:15;China clay:15;Red iron oxide:1','Named reconstructed ash celadon glaze. The reduction instruction appears at the top of the second column, following this formula.'),
(21,'Philip Revell',185,None,None,'Potash feldspar:36;Whiting:22;Talc:2;Bone ash:2;Ball clay:6;Quartz:30;Boro-calcite frit:3','Named reconstructed Nuka glaze.'),
(22,'Ray Finch',185,'1280–1300°C','Reduction','Ash:30;Feldspar:55;China clay:10;Flint:5;Black iron oxide:1',''),
(23,'Tom and Ginny Marsh',185,None,None,'Ash:40;Custer (potash) Feldspar:40;Georgia kaolin:20','Described as a matt glaze.'),
(24,'Tom and Ginny Marsh',185,None,None,'Local earthenware clay:50;Hardwood ash:50',''),
(25,'Ursula Mommens',185,'1280°C','Reduction','Apple ash:44;Feldspar:44;China clay:12','')]
def ingredients(s):return [{'material':n,'amount':float(a)} for n,a in (p.rsplit(':',1) for p in s.split(';'))]
for n,author,page,temp,atm,formula,note in ash:
 base=ingredients(formula)
 rows.append({'id':f'rogers-ash-{n}','name':f'Ash glaze {n} · {author}','cone':'Not specified','firingTemperature':temp or 'Not specified for this formula','atmosphere':atm or 'Not specified for this formula','color':'See source notes','surface':'See source notes','source':'Ash Glazes · 3rd edition','author':'Phil Rogers','recipeCredit':author,'history':f'Recipe {n}, credited to {author} in Phil Rogers, Ash Glazes, 3rd edition. Supplied PDF p. {page} (printed p. {page-1}).','page':page,'sourceBookId':'ash-glazes-3rd-edition-phil-rogers-a972ff90','ingredients':base,'additions':[],'publishedTotal':sum(x['amount'] for x in base),'calculationBasis':'total','status':'Transcribed and visually checked against supplied source page · test in your kiln','notes':note+' '+('Published firing temperature: '+temp+'. ' if temp else 'No firing temperature is stated beside this formula. ')+'Amounts are retained as printed; the dry batch scales all listed parts together.','image':None,'imageVerified':False})
for name,base,adds in [
 ('PV Base','Gerstley Borate:30;Whiting:10;PV Clay:15;Custer Feldspar:35;Silica:10',''),
 ('PV Black Liner Glaze','Gerstley Borate:30;Whiting:10;PV Clay:15;Custer Feldspar:35;Silica:10','Mason 6600:6'),
 ('VC Glaze','Whiting:6.9;Gerstley Borate:11.6;Titanium Dioxide:6.9;Nepheline Syenite:46.8;Kaolin:13.9;Silica:13.9',''),
 ('VC Blue/Green/Purple Variation','Whiting:6.9;Gerstley Borate:11.6;Titanium Dioxide:6.9;Nepheline Syenite:46.8;Kaolin:13.9;Silica:13.9','Cobalt Oxide:1.1'),
 ('Edgy Green','Barium Carbonate:15.6;Gerstley Borate:10.4;Wollastonite:15.6;Nepheline Syenite:39.7;Kaolin:10.4;Silica:8.3','Black Copper Oxide:3.1')]:
 import re
 rows.append({'id':'jones-'+re.sub('[^a-z0-9]+','-',name.lower()).strip('-'),'name':name,'cone':'6','atmosphere':'See source firing context','color':name if 'Green' in name or 'Black' in name else 'Not specified','surface':'See source','source':'Cone 5–6 Glazes','author':'Bill Jones, editor','page':12,'sourceBookId':'cone-5-6-glazes-bill-jones-9f7e547a','ingredients':ingredients(base),'additions':ingredients(adds) if adds else [],'status':'Transcribed and visually checked against supplied source page · test in your kiln','notes':'Original source page includes firing and layering context. Its photographed vase uses layered VC Blue/Green/Purple with PV Black Liner; that layered result is not used as a photograph of either glaze alone.','image':None,'imageVerified':False})
assert len({x['id'] for x in rows})==len(rows)
(ROOT/'book-recipes.js').write_text('window.BOOK_RECIPES='+json.dumps(rows,ensure_ascii=False)+';\n')
print(len(rows),'new structured recipes')
