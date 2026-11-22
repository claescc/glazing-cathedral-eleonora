import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve, extname} from 'node:path';
import {chromium} from 'playwright';
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
try{
  for(const route of ['learn','reading'])for(const [width,height] of [[320,256],[375,667],[667,375],[1440,900]]){
    const page=await browser.newPage({viewport:{width,height}});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(`${base}${route}.html`,{waitUntil:'domcontentloaded'});
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
    // Storefront tokens change colour without changing component source or behaviour.
    await host.evaluate(e=>e.style.setProperty('--ui-warning','rgb(12, 34, 56)'));
    assert.equal(await trigger.evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(12, 34, 56)');
    // Exercise a distinct variant and its public dismiss event through the adapter.
    await page.evaluate(()=>{const e=document.createElement('cathedral-notice');e.id='variant-test';e.setAttribute('kind','error');e.setAttribute('heading','Example error');e.setAttribute('message','Correct the highlighted value.');e.setAttribute('dismissible','');e.setAttribute('announce','');e.addEventListener('notice-dismiss',()=>e.dataset.dismissed='yes');document.body.append(e);});
    const variant=page.locator('#variant-test');await variant.locator('[role="alert"]').waitFor();
    await variant.locator('.cnx-close').click();assert.equal(await variant.getAttribute('data-dismissed'),'yes');
    assert.equal(await variant.isVisible(),false);
    assert.deepEqual(errors,[]);
    console.log(`PASS ${route} ${width}x${height}: React runtime, dialog bounds, dismiss/reopen, Escape, focus, theme override, alert variant`);
    await page.close();
  }
}finally{await browser.close();if(server)await new Promise(resolve=>server.close(resolve));}
