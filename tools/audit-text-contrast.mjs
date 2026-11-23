/* Runs in the browser. Audits rendered text on solid/composited CSS surfaces.
   Image backgrounds, pseudo-elements, canvas, shadow roots and disabled states
   require separate review; this is not a complete accessibility conformance test. */
export function auditTextContrast() {
  const canvas=document.createElement('canvas');canvas.width=canvas.height=1;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});
  const rgba=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].map((n,i)=>i===3?n/255:n)};
  const over=(fg,bg)=>[0,1,2].map(i=>fg[i]*fg[3]+bg[i]*(1-fg[3]));
  const luminance=rgb=>rgb.slice(0,3).map(n=>{n/=255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4}).reduce((a,n,i)=>a+n*[.2126,.7152,.0722][i],0);
  const failures=[],excluded=[];let tested=0;
  for(const el of document.querySelectorAll('body *')) {
    if(!el.checkVisibility({checkOpacity:true,checkVisibilityCSS:true})||el.closest(':disabled')||el.matches('script,style,.material-symbols-rounded')||![...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))continue;
    const rect=el.getBoundingClientRect();if(rect.right<0||!rect.width||!rect.height||(el.matches('.skip-link')&&!el.matches(':focus')))continue;
    const layers=[];let image=false;
    for(let parent=el;parent;parent=parent.parentElement){const style=getComputedStyle(parent);if(style.backgroundImage!=='none')image=true;const color=rgba(style.backgroundColor);layers.push(color);if(color[3]===1)break;}
    if(image){excluded.push({text:el.textContent.trim().slice(0,80),reason:'background image or gradient'});continue;}
    let bg=[255,255,255];for(const layer of layers.reverse())bg=over(layer,bg);
    const fg=over(rgba(getComputedStyle(el).color),bg);const a=luminance(fg),b=luminance(bg);const ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);tested++;
    if(ratio<7)failures.push({selector:el.tagName+'.'+el.className,text:el.textContent.trim().slice(0,100),ratio,foreground:fg,background:bg});
  }
  return {tested,failures,excluded};
}
