import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const books=read('assets/library/expanded/catalogue.json');
const additions=read('assets/library/expanded/additional-recipes.json');
const context={window:{}};vm.createContext(context);
for(const file of ['library-data.js','book-recipes.js','glazy-data.js','glazy-imports.js','additional-recipes.js'])vm.runInContext(readFileSync(file,'utf8'),context);
const recipes=['RECIPES','BOOK_RECIPES','GLAZY_RECIPES','GLAZY_IMPORTED_RECIPES'].flatMap(k=>context.window[k]||[]);
assert.equal(new Set(recipes.map(r=>r.id)).size,recipes.length,'Recipe identifiers must be unique');
for(const r of additions){
 const book=books.find(b=>b.id===r.sourceBookId);assert.ok(book,r.id+': source');
 assert.ok(r.page>=1&&r.page<=book.pages,r.id+': page bounds');
 for(const item of [...r.ingredients,...r.additions])assert.ok(item.material&&Number.isFinite(item.amount)&&item.amount>=0,r.id+': invalid ingredient');
 const sum=r.ingredients.reduce((n,i)=>n+i.amount,0);
 assert.ok(Math.abs(sum-r.publishedBase)<=0.11,r.id+': unexplained base discrepancy '+sum);
 const total=[...r.ingredients,...r.additions].reduce((n,i)=>n+i.amount,0);
 assert.ok(Math.abs(total-r.publishedTotal)<0.0001,r.id+': total');
 assert.ok(r.verification?.sourcePages.includes(r.page),r.id+': verification evidence');
 assert.equal(recipes.filter(x=>x.id===r.id).length,1,r.id+': absent or repeated in browser overlay');
}
const gallery=read('assets/family-archive/catalogue.json');
assert.equal(gallery.objects.length,71);assert.equal(new Set(gallery.objects.map(o=>o.id)).size,71);
const photos=gallery.objects.flatMap(o=>o.photographs);assert.equal(photos.length,114);assert.equal(gallery.studio.length,13);
for(const p of [...photos,...gallery.studio]){
 assert.ok(existsSync(p.image),p.image+': preview missing');
 assert.match(p.originalSha256,/^[a-f0-9]{64}$/);
 assert.ok(p.previewWidth>0&&p.previewHeight>0,p.image+': dimensions');
}
const coverage=read('assets/library/expanded/coverage.json');assert.equal(coverage.summary.structuredRecipes,recipes.length);assert.equal(coverage.summary.localReadErrors,coverage.files.filter(f=>f.readError).length,'Read errors must remain explicit');
console.log(JSON.stringify({recipes:recipes.length,newVisuallyChecked:additions.length,objects:gallery.objects.length,originalViews:photos.length,studioViews:gallery.studio.length,failures:[]},null,2));
