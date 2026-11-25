import {build} from 'esbuild';
import {execFileSync} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync, rmSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../../',import.meta.url);
mkdirSync(new URL('assets/design-system',root),{recursive:true});
execFileSync('pnpm',['exec','tailwindcss','-i','src/notice.css','-o','../../assets/design-system/notice.css','--minify'],{cwd:new URL('.',import.meta.url),stdio:'inherit'});
const styleVersion=createHash('sha256').update(readFileSync(new URL('assets/design-system/notice.css',root))).digest('hex').slice(0,12);
const indexPath=new URL('index.html',root);
writeFileSync(indexPath,readFileSync(indexPath,'utf8').replace(/<link data-ui-styles[^>]*>/,`<link data-ui-styles rel="stylesheet" href="assets/design-system/notice.css?v=${styleVersion}">`));
await build({entryPoints:[new URL('src/notices.tsx',import.meta.url).pathname],bundle:true,minify:true,format:'iife',target:'es2022',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"',__UI_STYLE_VERSION__:JSON.stringify(styleVersion)},outfile:new URL('cathedral-notice.js',root).pathname,legalComments:'eof'});

// Pre-render shared React controls for the existing synchronous reader.
const template=new URL('page-navigation-template.cjs',root);
try {
  await build({stdin:{contents:"import {renderToStaticMarkup} from 'react-dom/server';import {PageNavigation} from '../../packages/ui/src/page-navigation';import {Button} from '../../packages/ui/src/button';process.stdout.write(JSON.stringify({html:renderToStaticMarkup(<PageNavigation idPrefix='source' pageLabel='Page in file'/>),closeButton:renderToStaticMarkup(<Button id='sourceClose' className='cnx-button-surface' aria-label='Close source page'>Close ×</Button>),retryButton:renderToStaticMarkup(<Button id='sourceRetry' className='cnx-button-surface'>Try again</Button>)}));",resolveDir:new URL('.',import.meta.url).pathname,loader:'tsx'},bundle:true,platform:'node',format:'cjs',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},outfile:template.pathname});
  const controls=JSON.parse(execFileSync(process.execPath,[template.pathname],{encoding:'utf8'}));
  writeFileSync(new URL('assets/design-system/page-navigation.js',root),'window.cathedralPageNavigation='+JSON.stringify({...controls,stylesheet:'assets/design-system/notice.css?v='+styleVersion})+';\n');
} finally {rmSync(template,{force:true});}
