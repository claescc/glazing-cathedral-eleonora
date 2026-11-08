/* Supplied catalogue descriptions and photographic views, without AI retouching. */
(() => {
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  fetch('assets/family-archive/catalogue.json?v=20261108').then(r=>{
    if(!r.ok)throw Error('Archive catalogue unavailable');return r.json();
  }).then(data=>{
    const host=document.querySelector('#tribute .tribute-content');
    if(host){
      const section=document.createElement('section');
      section.id='family-catalogue';
      section.innerHTML=`<h2>The complete supplied family catalogue</h2><p>${data.objects.length} catalogue entries with ${data.objects.reduce((n,o)=>n+o.photographs.length,0)} original photographic views. Descriptions and classifications come from the supplied catalogue. Formal titles, dates, materials and attribution are not independently verified. These are proportionate previews of the supplied photographs.</p><label class="search-field">Find a catalogue object<input type="search" aria-label="Find a catalogue object" placeholder="Try amphora, bowl, sculpture or JLR number…"></label><p class="archive-count" role="status"></p><div class="archive-groups"></div>`;
      host.append(section);
      const paint=()=>{
        const q=section.querySelector('input').value.toLowerCase().trim();
        const objects=data.objects.filter(o=>`${o.id} ${o.description} ${o.category}`.toLowerCase().includes(q));
        section.querySelector('.archive-count').textContent=`${objects.length} catalogue ${objects.length===1?"entry":"entries"}`;
        const groups=new Map();for(const o of objects){if(!groups.has(o.category))groups.set(o.category,[]);groups.get(o.category).push(o);}
        section.querySelector('.archive-groups').innerHTML=[...groups].map(([category,rows])=>`<details class="knowledge-paths" ${q?'open':''}><summary>${esc(category.replace(/^\d+ /,''))} · ${rows.length}</summary><div class="four">${rows.map(o=>`<article><h3>${esc(o.id)} · ${esc(o.description)}</h3><p>${esc(o.attribution)}</p>${o.photographs.map((p,i)=>`<figure><cathedral-media src="${esc(p.image)}" alt="${esc(o.description)} · supplied photograph ${i+1}" size="compact"></cathedral-media><figcaption>Supplied photograph ${i+1} of ${o.photographs.length}</figcaption></figure>`).join('')}<details><summary>Catalogue evidence</summary><p>${esc(o.titleStatus)}. ${esc(o.classification)}.</p></details></article>`).join('')}</div></details>`).join('');
      };section.querySelector('input').addEventListener('input',paint);paint();
      if(location.hash==='#family-catalogue')section.scrollIntoView();
    }
    const notebook=document.getElementById('notebook');
    if(notebook){
      const section=document.createElement('details');section.className='knowledge-paths';
      section.innerHTML=`<summary>Supplied studio photographs · ${data.studio.length}</summary><p>Supplied in the CERAMIC Creations EJL folder. Maker, dates, clay bodies and glaze identities are not independently verified.</p><div class="four">${data.studio.map((p,i)=>`<figure><cathedral-media src="${esc(p.image)}" alt="Supplied studio photograph ${i+1}" size="compact"></cathedral-media><figcaption>Studio photograph ${i+1}</figcaption></figure>`).join('')}</div>`;notebook.append(section);
    }
  }).catch(()=>{});
})();
