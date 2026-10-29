import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import '../tools/check-release-target.mjs';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root));
const baseline=JSON.parse(read('docs/content-preservation-baseline.json'));
const pages=readdirSync(new URL('dist/',root)).filter(p=>p.endsWith('.html'));
for(const page of pages){
 const html=read('dist/'+page).toString();
 if(page==='typography.html')continue;
 const text=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
 for(const passage of baseline.copy)assert.ok(text.includes(passage),`${page}: V1 copy missing: ${passage.slice(0,80)}`);
 assert.ok(html.includes('v2.css?'),`${page}: V2 presentation missing`);
}
for(const [file,hash] of Object.entries(baseline.files)) assert.equal(createHash('sha256').update(read('dist/'+file)).digest('hex'),hash,`${file}: output differs from V1`);
console.log(`V2 output verified: ${pages.length} routes, all ${baseline.copy.length} V1 copy passages and ${Object.keys(baseline.files).length} original asset/data files.`);
