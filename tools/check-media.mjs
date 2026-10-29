import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const read = name => readFileSync(new URL('../' + name, import.meta.url),'utf8');
const registrations = [];
class Element { }
const context = {HTMLElement:Element, customElements:{define:(name,impl)=>registrations.push([name,impl])},window:{},document:{body:{dataset:{page:'learn'}}}};
vm.runInNewContext(read('cathedral-media.js'),context);
assert.equal(registrations[0][0],'cathedral-media');
const render = context.window.cathedralMedia;
const result = render({src:'a" onerror="bad',alt:'<unsafe>',size:'compact'});
assert.ok(!result.includes('src="a" onerror='),'Attributes must be escaped');
assert.ok(result.includes('alt="&lt;unsafe&gt;"'));
assert.ok(render({placeholder:'No photo'}).includes('placeholder="No photo"'));
for (const page of ['atlas','glaze-families','reading']) {
 context.document.body.dataset.page=page;
 assert.ok(render({src:'photo.jpg',alt:'Source'}).startsWith('<img'),'Excluded routes keep native image markup');
}
const app=read('app.js');
for (const needle of ['src:l[4]','src:story.image','src:imageSrc(x.image)','Diagnostic ceramic example','Fired ceramic example','Ceramic material reference','Illustrative ceramic glaze surface']) assert.ok(app.includes(needle));
const html=read('index.html');
assert.ok(html.indexOf('cathedral-media.js') < html.indexOf('<script src="app.js'));
assert.ok(!read('arched-rooms.css').includes('object-fit'),'The old page patch must not own media fit');
const css=read('cathedral-media.css');
assert.ok(!/object-fit|object-position/.test(css),'Card molecules must not override the media atom');
console.log('Media component contract checks passed.');

assert.ok(read('cathedral-media.js').includes('width:100%; height:auto'), 'Artwork must follow full-width natural sizing');

assert.ok(!read('cathedral-media.js').includes('padding-top:var(--cathedral-media-rise'), 'Media cannot create a blank arch cap');

assert.ok(read("cathedral-media.js").includes("aspect-ratio:auto"), "The atom must preserve natural artwork proportions");
assert.ok(read("cathedral-media.js").includes("object-fit:contain"), "Images must display the entire source photograph");
