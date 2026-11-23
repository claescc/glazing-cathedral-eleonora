import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {resolve, extname} from 'node:path';
import {chromium} from 'playwright';
import {auditTextContrast} from './audit-text-contrast.mjs';
const root=resolve(import.meta.dirname,'..');
let server;
let base=process.env.DESIGN_SYSTEM_BASE_URL;
if(!base){
  server=createServer(async(req,res)=>{
    try{
      const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
      if(!path.startsWith(root+'/')){res.writeHead(403);res.end();return;}
      const data=await readFile(path);
      const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.avif':'image/avif','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'};
      res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'});res.end(data);
    }catch{res.writeHead(404);res.end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  base=`http://127.0.0.1:${server.address().port}/`;
}
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
async function freshPage(options) {
  const page=await browser.newPage({...options,serviceWorkers:'block'});
  const session=await page.context().newCDPSession(page);
  await session.send('Network.enable');await session.send('Network.setCacheDisabled',{cacheDisabled:true});await session.send('Network.clearBrowserCache');
  return page;
}
async function settlePageContent(page) {
  if(await page.locator('body').getAttribute('data-page')==='reading') {
    await page.waitForFunction(()=>/\d/.test(document.querySelector('#sourceCount')?.textContent||''));
  }
  await page.waitForFunction(()=>document.fonts.status==='loaded');
  const pending=await page.evaluate(async()=>{
    const roots=[document];
    for(let i=0;i<roots.length;i++)for(const element of roots[i].querySelectorAll('*'))if(element.shadowRoot)roots.push(element.shadowRoot);
    const images=roots.flatMap(root=>[...root.querySelectorAll('img')]).filter(image=>image.checkVisibility());
    for(const image of images)image.loading='eager';
    await Promise.race([
      Promise.all(images.map(image=>image.decode().catch(()=>{}))),
      new Promise(resolve=>setTimeout(resolve,20000)),
    ]);
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    return images.filter(image=>!image.complete).map(image=>image.currentSrc||image.src);
  });
  assert.deepEqual(pending,[],'Visible content images must finish loading before full-page capture');
}
async function captureLongPageTiles(page,folder,name,height) {
  if(height<=16000)return [];
  const viewport=page.viewportSize();
  const last=Math.max(0,height-viewport.height);
  const tiles=[];
  await mkdir(`${folder}/${name}-tiles`,{recursive:true});
  for(let next=0;;next+=viewport.height-200){
    const top=Math.min(next,last);
    await page.evaluate(top=>scrollTo({top,behavior:'instant'}),top);
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const actual=await page.evaluate(()=>scrollY);
    const path=`${name}-tiles/${String(tiles.length).padStart(3,'0')}.png`;
    await page.screenshot({path:`${folder}/${path}`});
    tiles.push({path,top:actual,bottom:actual+viewport.height});
    if(top===last)break;
  }
  assert.equal(tiles[0].top,0);
  assert.ok(tiles.at(-1).bottom>=height,'Viewport tiles must reach the document end');
  return tiles;
}
async function showFooter(page,footer) {
  await footer.scrollIntoViewIfNeeded();
  // Scroll/IntersectionObserver callbacks run asynchronously after scrolling.
  // Require both real footer intersection and the resulting utility state.
  await page.waitForFunction(()=>{
    const rect=document.querySelector('.site-footer').getBoundingClientRect();
    return rect.top<innerHeight&&rect.bottom>0&&document.querySelector('.back-to-top')?.hidden;
  });
}
try{
  for(const route of ['index','reading'])for(const [width,height] of [[320,256],[375,667],[1440,900]]) {
    const page=await freshPage({viewport:{width,height}});
    await page.addInitScript(()=>sessionStorage.setItem('cathedral-construction-dismissed','yes'));
    await page.goto(`${base}${route}.html`,{waitUntil:'domcontentloaded'});await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('#settingsButton').click();
    const dialog=page.locator('#settingsDialog');
    const bounds=await dialog.boundingBox();assert.ok(bounds.x>=0&&bounds.y>=0&&bounds.x+bounds.width<=width&&bounds.y+bounds.height<=height,'Settings must fit the viewport');
    for(const size of await dialog.locator('label').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {width:r.width,height:r.height}})))assert.ok(size.width>=48&&size.height>=48,'Appearance choice rows require 48px hit areas');
    const close=await page.locator('#settingsClose').boundingBox();assert.ok(close.width>=48&&close.height>=48,'Settings close requires a 48px hit area');
    const last=dialog.locator('label').last();await last.click({position:{x:8,y:46}});
    assert.equal(await page.locator('input[name="appearance"][value="contrast"]').isChecked(),true,'The bottom edge of the whole choice row activates the radio');
    if(width===375) {
      await page.evaluate(()=>document.documentElement.style.fontSize='200%');
      await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,3000))]));
      await dialog.evaluate(e=>e.scrollTop=0);
      const reflow=await dialog.evaluate(e=>{const title=e.querySelector('h2');const canvas=document.createElement('canvas');const ctx=canvas.getContext('2d');ctx.font=getComputedStyle(title).font;return {client:e.clientWidth,scroll:e.scrollWidth,title:title.getBoundingClientRect().width,word:ctx.measureText(title.textContent).width}});
      assert.ok(reflow.scroll<=reflow.client,'Enlarged settings text must not overflow horizontally');
      assert.ok(reflow.title>=reflow.word,'Settings heading must fit without splitting its word');
      await last.click();
    }
    await page.keyboard.press('Escape');assert.equal(await dialog.isVisible(),false);
    assert.equal(await page.locator('#settingsButton').evaluate(e=>e===document.activeElement),true,'Escape returns focus to Settings');
    console.log(`PASS settings ${route} ${width}x${height}: 48px controls, viewport fit, full-row activation and Escape focus`);
    await page.close();
  }
  {
    const page=await freshPage({viewport:{width:375,height:900}});
    await page.addInitScript(()=>sessionStorage.setItem('cathedral-construction-dismissed','yes'));
    await page.goto(`${base}index.html`,{waitUntil:'domcontentloaded'});await page.reload({waitUntil:'domcontentloaded'});
    for(const theme of ['light','dark','contrast']) {
      await page.locator('#settingsButton').click();
      await page.locator(`input[name="appearance"][value="${theme}"]`).check();
      assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
      await page.locator('#settingsClose').click();
      await page.reload({waitUntil:'domcontentloaded'});
      assert.equal(await page.locator('html').getAttribute('data-theme'),theme,'Appearance persists after reload');
    }
    await page.locator('#settingsButton').click();await page.locator('input[name="appearance"][value="auto"]').check();await page.locator('#settingsClose').click();
    await page.emulateMedia({colorScheme:'dark',contrast:'no-preference'});await page.waitForFunction(t=>document.documentElement.dataset.theme===t,'dark');
    await page.emulateMedia({colorScheme:'light',contrast:'more'});await page.waitForFunction(t=>document.documentElement.dataset.theme===t,'contrast');
    await page.emulateMedia({colorScheme:'light',contrast:'no-preference'});await page.waitForFunction(t=>document.documentElement.dataset.theme===t,'light');
    console.log('PASS appearance: real controls, three presets, reload persistence and System preferences');
    await page.close();
  }
  for(const route of ['learn','reading'])for(const [width,height] of [[320,256],[375,667],[667,375],[1440,900]]){
    const page=await freshPage({viewport:{width,height}});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.addInitScript(()=>sessionStorage.removeItem('cathedral-construction-seen'));
    await page.goto(`${base}${route}.html`,{waitUntil:'domcontentloaded'});
    await page.reload({waitUntil:'domcontentloaded'});
    const host=page.locator('#constructionNotice');
    await host.locator('dialog[open]').waitFor();
    assert.equal(await host.getAttribute('data-ui-runtime'),'react-tailwind');
    const dialog=host.locator('dialog');
    assert.equal(await dialog.getAttribute('data-ui-component'),'notice-dialog');
    const geometry=await dialog.evaluate(e=>{const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom};});
    assert.ok(geometry.top>=0 && geometry.bottom<=height,JSON.stringify(geometry));
    await dialog.locator('.cnx-action').click();
    await page.waitForFunction(()=>!document.querySelector('#constructionNotice').shadowRoot.querySelector('dialog').open);
    const trigger=host.locator('.cnx-label');await trigger.click();await page.keyboard.press('Escape');
    assert.equal(await dialog.isVisible(),false);
    assert.equal(await trigger.evaluate(e=>e===e.getRootNode().activeElement),true);
    await page.locator('.site-footer').scrollIntoViewIfNeeded();
    await trigger.waitFor({state:'hidden'});
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    await trigger.waitFor({state:'visible'});
    // Storefront tokens change colour without changing component source or behaviour.
    await host.evaluate(e=>e.style.setProperty('--ui-warning','rgb(12, 34, 56)'));
    assert.equal(await trigger.evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(12, 34, 56)');
    // Exercise a distinct variant and its public dismiss event through the adapter.
    await page.evaluate(()=>{const e=document.createElement('cathedral-notice');e.id='variant-test';e.setAttribute('kind','error');e.setAttribute('heading','Example error');e.setAttribute('message','Correct the highlighted value.');e.setAttribute('dismissible','');e.setAttribute('announce','');e.addEventListener('notice-dismiss',()=>e.dataset.dismissed='yes');document.body.append(e);});
    const variant=page.locator('#variant-test');await variant.locator('[role="alert"]').waitFor();
    await variant.locator('.cnx-close').focus();await page.keyboard.press('Enter');assert.equal(await variant.getAttribute('data-dismissed'),'yes');
    assert.equal(await variant.isVisible(),false);
    const dismiss=host.getByRole('button',{name:'Dismiss Under construction'});
    const dismissSize=await dismiss.boundingBox();
    assert.ok(dismissSize.width>=48 && dismissSize.height>=48);
    assert.ok(dismissSize.x>=0 && dismissSize.x+dismissSize.width<=width);
    await dismiss.click();
    assert.equal(await host.isVisible(),false);
    assert.equal(await page.evaluate(()=>sessionStorage.getItem('cathedral-construction-dismissed')),'yes');
    await page.goto(`${base}${route==='learn'?'reading':'learn'}.html`,{waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('#constructionNotice').count(),0,'Dismissal must persist between rooms in this tab');
    assert.deepEqual(errors,[]);
    console.log(`PASS ${route} ${width}x${height}: React runtime, dialog bounds, dismiss/reopen, Escape, focus, theme override, alert variant, label dismissal and room-navigation persistence`);
    await page.close();
  }
  for(const [width,height] of [[320,667],[375,667],[1440,900]]) {
    const page=await freshPage({viewport:{width,height}});
    await page.addInitScript(()=>sessionStorage.setItem('cathedral-construction-dismissed','yes'));
    await page.goto(`${base}reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&page=13#source-library`,{waitUntil:'domcontentloaded'});
    await page.reload({waitUntil:'domcontentloaded'});
    const navigation=page.locator('#sourceReader [data-ui-component="page-navigation"]');
    await navigation.waitFor();
    await page.waitForFunction(()=>document.querySelector('#sourcePageNumber').value==='13');
    for(const id of ['sourcePrev','sourceNext','sourcePageNumber']) {
      const box=await page.locator('#'+id).boundingBox();
      assert.ok(box.height>=48 && box.x>=0 && box.x+box.width<=width,`${id}: ${JSON.stringify(box)}`);
    }
    const previous=await page.locator('#sourcePrev').boundingBox();
    const next=await page.locator('#sourceNext').boundingBox();
    assert.ok(Math.abs(previous.y-next.y)<1,'Previous and Next must share a row');
    await page.locator('#sourceNext').click();
    await page.waitForFunction(()=>document.querySelector('#sourcePageNumber').value==='14');
    await page.locator('#sourcePrev').click();
    await page.waitForFunction(()=>document.querySelector('#sourcePageNumber').value==='13');
    await page.locator('#sourcePageNumber').fill('1');await page.locator('#sourcePageNumber').press('Tab');
    await page.waitForFunction(()=>document.querySelector('#sourcePrev').disabled);
    assert.equal(new URL(page.url()).searchParams.get('page'),'1');
    await page.locator('#sourceClose').click();
    assert.equal(await page.locator('#sourceReader').isVisible(),false);
    console.log(`PASS reader ${width}x${height}: shared navigation, 48px controls, aligned Previous/Next, page changes, first-page boundary and close`);
    await page.close();
  }
  if(process.env.FULL_PAGE_AUDIT==='1') {
    const folder=resolve(root,'.audit-artifacts');await mkdir(folder,{recursive:true});
    const reports=[];
    const allRoutes=['index','atlas','glaze-families','recipes','layering','learn','kiln','materials','restoration','masters','tribute','notebook','reading'];
    const routes=process.env.AUDIT_ROUTES?process.env.AUDIT_ROUTES.split(','):allRoutes;
    assert.ok(routes.length&&routes.every(route=>allRoutes.includes(route)),'Unknown audit route');
    const cases=routes.flatMap(route=>[320,375,1440].map(width=>({route,width})));
    await Promise.all(Array.from({length:3},async()=>{while(cases.length){
      const {route,width}=cases.shift();
      const page=await freshPage({viewport:{width,height:900},serviceWorkers:'block'});
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.addInitScript(()=>sessionStorage.setItem('cathedral-construction-dismissed','yes'));
      const session=await page.context().newCDPSession(page);
      await session.send('Network.enable');await session.send('Network.setCacheDisabled',{cacheDisabled:true});await session.send('Network.clearBrowserCache');
      await page.goto(`${base}${route}.html?visual-audit=${Date.now()}`,{waitUntil:'domcontentloaded'});
      await page.reload({waitUntil:'domcontentloaded'});
      await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,3000))]));
      await settlePageContent(page);
      const height=await page.evaluate(()=>document.documentElement.scrollHeight);
      for(let y=0;y<height;y+=780){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(40);}
      await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(150);
      await page.screenshot({path:`${folder}/${route}-${width}-full.png`,fullPage:true});
      const footer=page.locator('.site-footer');await showFooter(page,footer);await page.waitForTimeout(150);
      if(route==='index') {
        assert.equal(await page.locator('details.room-discovery').count(),0,'Room discovery must not collapse');
        assert.ok(await page.locator('#roomGrid .room-card').count()>=8,'All rooms, including future additions, stay visible');
      }
      const themes=[];
      for(const theme of ['light','dark','contrast']) {
        await page.evaluate(t=>localStorage.setItem('eleonora-appearance-v2',t),theme);
        await session.send('Network.clearBrowserCache');
        await page.reload({waitUntil:'domcontentloaded'});
        await page.waitForTimeout(450);
        assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
        await settlePageContent(page);
        const stateHeight=await page.evaluate(()=>document.documentElement.scrollHeight);
        for(let y=0;y<stateHeight;y+=780){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(40);}
        await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(150);
        const capture=await page.screenshot({path:`${folder}/${route}-${width}-${theme}-full.png`,fullPage:true});
        assert.equal(capture.readUInt32BE(20),stateHeight,`${route}/${width}/${theme}: full-page PNG height must cover the document`);
        const captureHeight=await page.evaluate(()=>document.documentElement.scrollHeight);
        assert.equal(captureHeight,stateHeight,`${route}/${width}/${theme}: document height changed during capture`);
        const tileCaptures=await captureLongPageTiles(page,folder,`${route}-${width}-${theme}`,captureHeight);
        await showFooter(page,footer);
        const textAudit=await page.evaluate(auditTextContrast);
        assert.deepEqual(textAudit.failures,[],`${route}/${width}/${theme}: text below 7:1`);
        const result=await footer.evaluate(e=>{
          const rgb=s=>s.match(/[\d.]+/g).slice(0,3).map(Number);
          const luminance=s=>rgb(s).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((v,x,i)=>v+x*[.2126,.7152,.0722][i],0);
          const bg=getComputedStyle(e).backgroundColor;
          const contrast=c=>{const a=luminance(c),b=luminance(bg);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
          const text=[...e.querySelectorAll('blockquote,p,a,.footer-eleonora,strong')].map(x=>({text:x.textContent.trim().slice(0,90),ratio:contrast(getComputedStyle(x).color)}));
          const brand=e.querySelector('.footer-brand > span');const canvas=document.createElement('canvas');const ctx=canvas.getContext('2d');ctx.font=getComputedStyle(brand).font;
          return {theme:document.documentElement.dataset.theme,text,brandWidth:brand.getBoundingClientRect().width,longestWordWidth:ctx.measureText('Cathedral').width,footerOverflow:e.scrollWidth>e.clientWidth,documentOverflow:document.documentElement.scrollWidth>innerWidth};
        });
        assert.equal(await page.locator('.back-to-top').isVisible(),false,'Page utility must not cover footer links');
        assert.ok(!result.documentOverflow,`${route}/${width}/${theme}: document overflow`);
        assert.ok(!result.footerOverflow,`${route}/${width}: footer overflow`);
        assert.ok(result.brandWidth>=result.longestWordWidth,`${route}/${width}: wordmark crushed`);
        for(const x of result.text)assert.ok(x.ratio>=7,`${route}/${width}/${theme}: footer contrast ${x.text} ${x.ratio}`);
        if(route==='index') {
          const rooms=await page.locator('#roomGrid .room-card').evaluateAll(cards=>cards.map(card=>{
            const lum=s=>s.match(/[\d.]+/g).slice(0,3).map(Number).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((a,x,i)=>a+x*[.2126,.7152,.0722][i],0);
            const bg=lum(getComputedStyle(card).backgroundColor);
            return [...card.querySelectorAll('h3,p,.room-kicker,.room-enter')].map(el=>{const fg=lum(getComputedStyle(el).color);return {text:el.textContent,ratio:(Math.max(bg,fg)+.05)/(Math.min(bg,fg)+.05)}});
          }));
          for(const card of rooms)for(const text of card)assert.ok(text.ratio>=7,`${theme}: room contrast ${text.text}: ${text.ratio}`);
          await page.locator('#roomGrid').screenshot({path:`${folder}/rooms-${width}-${theme}.png`});
          await showFooter(page,footer);
        }
        await footer.screenshot({path:`${folder}/${route}-${width}-${theme}-footer.png`});themes.push({...result,textAudit,tileCaptures});
      }
      assert.equal(errors.length,0,`${route}/${width}: runtime errors ${errors.join('; ')}`);
      reports.push({route,width,height,errors,themes});
      console.log(`AUDIT ${route} ${width}: full-page capture, cache disabled + cleared + reload, footer geometry and 3 themes; documentOverflow=${themes[0].documentOverflow}; errors=${errors.length}`);
      await page.close();
    }}));
    reports.sort((a,b)=>a.route.localeCompare(b.route)||a.width-b.width);
    await writeFile(`${folder}/report.json`,JSON.stringify({date:new Date().toISOString(),base,scope:`${routes.length} routes × 3 widths × 3 themes; full-page and footer captures. Pages over 16000px additionally have overlapping viewport tiles with verified document-end coverage; use these for long-page visual review. Text floor 7:1. Construction notice dismissed; other interactions covered only by targeted tests.`,reports},null,2));
  }
}finally{await browser.close();if(server)await new Promise(resolve=>server.close(resolve));}
