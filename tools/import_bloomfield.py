from pathlib import Path
import pymupdf as fitz
import re,json,hashlib
ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path('/Users/chloeclaes/Downloads/Eleonora Ceramics/Colour in Glazes - Linda Bloomfield.pdf')
r=fitz.open(SOURCE)
lines=[]
for i,p in enumerate(r):
 for line in p.get_text(sort=True).splitlines():
  if line.strip():lines.append((i+1,line.strip()))
found=[]
for i,(page,line) in enumerate(lines):
 if not(re.match(r'^.+?\s+\d+(?:\.\d+)?$',line) and re.search(r'feldspar|frit|whiting|quartz|clay|oxide|dolomite|carbonate|ash|talc|bentonite|silica|borax|colemanite|nepheline|stain|rutile|ochre|ilmenite|stone|spodumene',line,re.I)):continue
 if i and(re.match(r'^.+?\s+\d+(?:\.\d+)?$',lines[i-1][1]) or lines[i-1][1]=='+'):continue
 j=i;base=[];add=[];target=base
 while j<len(lines):
  value=lines[j][1]
  if value=='+':target=add;j+=1;continue
  m=re.match(r'^([A-Za-z][A-Za-z0-9 ()–/.,%\-]+?)\s+(\d+(?:\.\d+)?)$',value)
  if not m:break
  target.append({'material':m[1],'amount':float(m[2])});j+=1
 header=' '.join(v for _,v in lines[max(0,i-3):i])
 if len(base)<3 or '(cone ' not in header.lower():continue
 h=[]
 for k in range(i-1,max(-1,i-5),-1):
  h.insert(0,lines[k][1])
  if re.search(r'\d{3,4}[–\-]?\d*°C',lines[k][1]):break
 header=' '.join(h)
 if re.match(r'^\(?cone|^\d',header,re.I) and k>0:k-=1;header=lines[k][1]+' '+header
 startpage=lines[k][0];endpage=lines[j-1][0]
 # Merged source text (maroon, p.140) is explicitly withheld from calculator data.
 if any(len(x['material'])>40 for x in base+add):continue
 name=re.split(r',?\s*\d{3,4}[–\-]?\d*°C',header)[0].strip(' ,')
 cone=re.search(r'\(cone ([^)]+)\)',header,re.I)[1].replace(' ','').replace('–','–')
 atmosphere='Oxidation' if re.search('oxidi|oxidation',header,re.I) else 'Reduction' if re.search('reduced|reduction',header,re.I) else 'Not specified in recipe heading'
 credited=re.search(r'\((?!cone\b)([^)]+)\)\s*$',header,re.I)
 key='bloomfield-'+str(startpage)+'-'+re.sub('[^a-z0-9]+','-',name.lower()).strip('-')
 row={'id':key,'name':name,'cone':cone,'atmosphere':atmosphere,'color':name,'surface':' · '.join(dict.fromkeys(re.findall(r'transparent|translucent|opaque|satin|matt|glossy|crystalline|runny|crater|crawl',name,re.I))) or 'See source','ingredients':base,'additions':add,'page':startpage,'endPage':endpage,'source':'Colour in Glazes','author':'Linda Bloomfield','recipeCredit':credited[1] if credited else None,'sourceBookId':'colour-in-glazes-linda-bloomfield-9fc921ae','sourceHeading':header,'status':'Source transcription · compare with the original page before mixing','notes':f'Published heading: {header}. Ingredient amounts and additions are retained as printed. '+('The publication explicitly marks this recipe not food safe. ' if re.search('not food.safe',header) else '')+f'Formula spans supplied PDF pages {startpage}–{endpage}.','image':None,'imageVerified':False}
 if credited:row['history']=f'Recipe credited in the heading to {credited[1]}. Published by Linda Bloomfield in Colour in Glazes, supplied PDF page {startpage}.'
 found.append(row)
# Embedded specimen photographs only; do not substitute neighbouring vessel illustrations.
for idx,x in enumerate(found):
 if x['page']<70 or x['page']>170 or x['name']=='Nickel pink matt, not food safe':continue
 for pg in range(x['page'],min(x['endPage']+2,len(r))+1):
  page=r[pg-1];start=0;end=page.rect.height
  if pg==x['page']:
   matches=page.search_for(x['name'][:32]);start=min((v.y0 for v in matches),default=0)
  if idx+1<len(found):
   nxt=found[idx+1]
   if pg>nxt['page']:break
   if pg==nxt['page']:
    matches=page.search_for(nxt['name'][:32]);end=min((v.y0 for v in matches),default=0)
  candidates=[]
  for info in page.get_image_info(xrefs=True):
   rect=fitz.Rect(info['bbox'])
   if info['xref'] and rect.y0>start and rect.y1<end and 50<rect.width<220 and 50<rect.height<230 and .55<rect.width/rect.height<1.6:candidates.append(info)
  if len(candidates)==1:
   info=candidates[0];im=r.extract_image(info['xref']);out=ROOT/'assets/recipes'/(x['id']+'.'+im['ext']);out.write_bytes(im['image']);x['image']=str(out.relative_to(ROOT));x['imageSourcePage']=pg;x['imageVerified']=True;x['imageCredit']=f'Linda Bloomfield, Colour in Glazes, supplied PDF p. {pg}; specimen printed after this formula.';break
# Render every formula and continuation page for direct source checking, including missed search candidates.
for x in found:
 for pg in range(x['page'],x['endPage']+1):
  path=ROOT/'assets/library'/x['sourceBookId']/f'p{pg}.jpg';path.parent.mkdir(exist_ok=True)
  if not path.exists():r[pg-1].get_pixmap(matrix=fitz.Matrix(1.6,1.6)).pil_save(path,format='JPEG',quality=82,optimize=True)
 datafile=ROOT/'assets/library'/(x['sourceBookId']+'.json')
data=json.loads(datafile.read_text())
for x in found:
 for pg in range(x['page'],x['endPage']+1):data[pg-1]['image']=f"assets/library/{x['sourceBookId']}/p{pg}.jpg"
datafile.write_text(json.dumps(data,ensure_ascii=False))
(ROOT/'book-recipes.js').write_text('window.BOOK_RECIPES='+json.dumps(found,ensure_ascii=False)+';\n')
(ROOT/'bloomfield-coverage.json').write_text(json.dumps({'sourceSha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'recipes':len(found),'photographs':sum(bool(x['image']) for x in found),'withheld':[{'page':140,'name':'Chrome-tin maroon','reason':'Two addition rows merged in supplied PDF; read original, no calculator.'}],'records':[{'id':x['id'],'page':x['page'],'endPage':x['endPage'],'baseTotal':sum(a['amount'] for a in x['ingredients']),'image':x['image']} for x in found]},ensure_ascii=False,indent=2))
print(len(found),'formulas',sum(bool(x['image']) for x in found),'photographs')
