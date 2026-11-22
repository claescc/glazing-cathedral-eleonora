/* One global construction notice, using the shared notification component. */
(() => {
  const dismissalKey='cathedral-construction-dismissed';
  try {if(sessionStorage.getItem(dismissalKey)==='yes') return;} catch {}
  const notice=document.createElement('cathedral-notice');
  const attributes={kind:'warning',presentation:'label',heading:'Under construction',message:'Website under construction. Features, pages and designs are still incomplete.','action-label':'Continue exploring',floating:'','open-once':'',dismissible:''};
  for(const [name,value] of Object.entries(attributes)) notice.setAttribute(name,value);
  notice.id='constructionNotice';
  notice.addEventListener('notice-dismiss',()=>{try {sessionStorage.setItem(dismissalKey,'yes');} catch {}});
  document.body.append(notice);
})();
