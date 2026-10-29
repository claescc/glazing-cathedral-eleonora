import {readFileSync, existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8'}).trim();
const target=JSON.parse(read('release-target.json'));
const fail=message=>{throw Error(`RELEASE BLOCKED: ${message}`)};
if(target.repository!=='claescc/glazing-cathedral-eleonora'||target.productionOrigin!=='https://ceramicscathedral.com'||target.branch!=='main')fail('Canonical production identity changed; review the user instruction.');
const remote=git('remote','get-url','origin').replace(/\.git$/,'');
if(![ `https://github.com/${target.repository}`,`git@github.com:${target.repository}` ].includes(remote))fail('Wrong repository remote.');
if(git('branch','--show-current')!==target.branch)fail('Release checks must run on main.');
if(read('CNAME').trim()!==new URL(target.productionOrigin).hostname)fail('CNAME does not match production.');
if(existsSync(resolve(root,'.openai/hosting.json'))&&JSON.parse(read('.openai/hosting.json')).project_id)fail('Legacy ChatGPT Sites publication identity must not be used in this repository.');
const baseline=JSON.parse(read('docs/content-preservation-baseline.json'));
const html=read('index.html').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
for(const copy of baseline.copy)if(!html.includes(copy))fail(`Existing copy is missing: ${copy.slice(0,90)}`);
for(const [file,hash] of Object.entries(baseline.files)){
 if(!existsSync(resolve(root,file)))fail(`Existing asset/data file was removed: ${file}`);
 if(createHash('sha256').update(readFileSync(resolve(root,file))).digest('hex')!==hash)fail(`Existing asset/data changed: ${file}. Preserve the original and review explicitly.`);
}
console.log(`Release target verified: ${target.repository} / main → ${target.productionOrigin}; ${baseline.copy.length} copy passages and ${Object.keys(baseline.files).length} assets/data files preserved.`);
