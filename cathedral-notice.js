/* Shared notification family. Content is supplied as text, never HTML. */
(() => {
  const stylesheet = new URL('cathedral-notice.css', document.currentScript.src).href;
  const icons = {info:'ⓘ', error:'!', success:'✓', warning:'⚠', confirmation:'?'};
  let sequence = 0;
  class CathedralNotice extends HTMLElement {
    connectedCallback() {
      if (this.shadowRoot) return;
      const limits = {heading:20,message:80,'action-label':20};
      for (const [attribute,maximum] of Object.entries(limits)) {
        if (Array.from(this.getAttribute(attribute) || '').length > maximum) {
          this.dataset.noticeInvalid = attribute;
          this.dispatchEvent(new CustomEvent('notice-invalid',{bubbles:true,detail:{attribute,maximum}}));
          console.error(`Notification ${attribute} exceeds ${maximum} characters. Supply shorter copy.`);
          return;
        }
      }
      const root = this.attachShadow({mode:'open'});
      const kind = Object.hasOwn(icons, this.getAttribute('kind')) ? this.getAttribute('kind') : 'info';
      const presentation = this.getAttribute('presentation') || 'alert';
      const title = this.getAttribute('heading') || kind;
      const message = this.getAttribute('message') || '';
      const id = `notice-${++sequence}`;
      const style = document.createElement('link');
      style.rel = 'stylesheet'; style.href = stylesheet;
      root.append(style);
      const make = (tag, cls, text) => {const el = document.createElement(tag); el.className = cls; if(text) el.textContent = text; return el;};
      const icon = () => {
        const el=make('span','icon'); el.setAttribute('aria-hidden','true');
        const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('viewBox','0 0 64 64'); svg.setAttribute('fill','none'); svg.setAttribute('stroke','currentColor'); svg.setAttribute('stroke-width','2.5'); svg.setAttribute('stroke-linecap','round'); svg.setAttribute('stroke-linejoin','round');
        const path=document.createElementNS(svg.namespaceURI,'path');
        const outlines={success:'M18 33 L28 43 L47 23',error:'M22 22 L42 42 M42 22 L22 42',info:'M32 29 L32 44 M32 20 L32 21',warning:'M32 22 L32 36 M32 44 L32 45',confirmation:'M24 24 C24 14 43 14 43 25 C43 33 32 31 32 39 M32 46 L32 47'};
        const frame=document.createElementNS(svg.namespaceURI,'circle');
        frame.setAttribute('cx','32');frame.setAttribute('cy','32');frame.setAttribute('r','29');
        path.setAttribute('d',outlines[kind]); svg.append(frame,path);el.append(svg);return el;
      };
      const close = (action) => {const b=make('button','close','×'); b.type='button'; b.setAttribute('aria-label',`Dismiss ${title}`); b.addEventListener('click',action); return b;};
      const panel = make('section',`notice ${kind} ${presentation}`);
      const dismiss = () => {this.hidden=true; this.dispatchEvent(new CustomEvent('notice-dismiss',{bubbles:true,detail:{kind}}));};
      if(presentation === 'label') {
        const trigger=make('button',`label ${kind}`,title); trigger.type='button'; trigger.prepend(icon()); trigger.setAttribute('aria-haspopup','dialog'); root.append(trigger);
        const dialog=make('dialog',`notice ${kind} card`); dialog.setAttribute('aria-labelledby',id); dialog.setAttribute('aria-describedby',`${id}-message`);
        const head=make('div','colour-header'); head.append(icon()); dialog.append(head);
        const body=make('div','body'); const h=make('h2','heading',title); h.id=id; const p=make('p','message',message); p.id=`${id}-message`;
        const b=make('button','action',this.getAttribute('action-label') || 'Close'); b.type='button'; b.addEventListener('click',()=>dialog.close()); head.append(h); body.append(p,b); dialog.append(body); root.append(dialog); trigger.addEventListener('click',()=>dialog.showModal());
        if(this.hasAttribute('open-once')) {
          let seen=false; try {seen=sessionStorage.getItem('cathedral-construction-seen')==='yes';} catch {}
          if(!seen) requestAnimationFrame(()=>{dialog.showModal(); try {sessionStorage.setItem('cathedral-construction-seen','yes');} catch {}});
        }
        return;
      }
      if(presentation === 'card') {const header=make('div','colour-header'); header.append(icon()); panel.append(header);}
      else panel.append(icon());
      const body=make('div','body'); const heading=make('strong','heading',title); if(presentation==='card') panel.querySelector('.colour-header').append(heading); else body.append(heading); if(message) body.append(make('p','message',message));
      if(presentation === 'card') {const b=make('button','action',this.getAttribute('action-label') || 'Close'); b.type='button'; b.addEventListener('click',()=>{this.dispatchEvent(new CustomEvent('notice-action',{bubbles:true,detail:{kind}})); dismiss();}); body.append(b);}
      panel.append(body); if(this.hasAttribute('dismissible')) panel.append(close(dismiss));
      root.append(panel);
      // Announcements are opt-in for messages inserted in response to an action.
      if(this.hasAttribute('announce')) {panel.setAttribute('role', kind==='error' ? 'alert' : 'status');}
    }
  }
  if(!customElements.get('cathedral-notice')) customElements.define('cathedral-notice',CathedralNotice);
})();
