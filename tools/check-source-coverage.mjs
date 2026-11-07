import {readFileSync, readdirSync, statSync, existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import {join} from 'node:path';
const root=new URL('../',import.meta.url).pathname;
const base=join(root,'assets/library/expanded');
const read=p=>JSON.parse(readFileSync(join(base,p),'utf8'));
const books=read('catalogue.json');
const paths=read('knowledge-paths.json');
const integrated=new Set(Object.values(paths.rooms).flat().map(b=>b.id));
const chapters=read('chapters.json');
let pages=0, bookmarks=0;
for(const book of books){
 if(book.status==='unreadable'||book.duplicateOf)continue;
 assert.ok(integrated.has(book.id),`${book.id}: no subject room`);
 const rows=read(book.id+'.json');
 assert.equal(rows.length,book.pages,`${book.id}: page count`);
 for(const page of rows){
  assert.ok(page.image,`${book.id}:${page.page}: missing page preview`);
  assert.ok(existsSync(join(root,page.image)),`${page.image}: missing image file`);
  pages++;
 }
 for(const item of chapters[book.id]?.chapters||[]){
  assert.ok(item.page>=1&&item.page<=book.pages,`${book.id}: chapter outside source`);
  bookmarks++;
 }
}
function bytes(path){return readdirSync(path,{withFileTypes:true}).reduce((n,item)=>n+(item.isDirectory()?bytes(join(path,item.name)):statSync(join(path,item.name)).size),0);}
const size=bytes(join(root,'dist'));
assert.ok(size<980_000_000,`Build exceeds source-recovery budget: ${size} bytes`);
console.log(JSON.stringify({sourcePagesWithImages:pages,bookmarks,buildBytes:size,failures:[]},null,2));
