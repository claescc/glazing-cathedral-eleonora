/* One global construction notice, using the shared notification component. */
(() => {
  const notice=document.createElement('cathedral-notice');
  const attributes={kind:'warning',presentation:'label',heading:'Under construction',message:'Website under construction. Features, pages and designs are still incomplete.','action-label':'Continue exploring',floating:'','open-once':''};
  for(const [name,value] of Object.entries(attributes)) notice.setAttribute(name,value);
  notice.id='constructionNotice';
  document.body.append(notice);
})();
