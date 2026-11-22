import {build} from 'esbuild';
import {execFileSync} from 'node:child_process';
import {mkdirSync, readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../../',import.meta.url);
mkdirSync(new URL('assets/design-system',root),{recursive:true});
execFileSync('pnpm',['exec','tailwindcss','-i','src/notice.css','-o','../../assets/design-system/notice.css','--minify'],{cwd:new URL('.',import.meta.url),stdio:'inherit'});
const styleVersion=createHash('sha256').update(readFileSync(new URL('assets/design-system/notice.css',root))).digest('hex').slice(0,12);
await build({entryPoints:[new URL('src/notices.tsx',import.meta.url).pathname],bundle:true,minify:true,format:'iife',target:'es2022',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"',__UI_STYLE_VERSION__:JSON.stringify(styleVersion)},outfile:new URL('cathedral-notice.js',root).pathname,legalComments:'eof'});
