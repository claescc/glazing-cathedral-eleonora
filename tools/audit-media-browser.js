// Read-only browser regression audit. Execute on each route after its content renders.
function auditCathedralMedia() {
  const errors = [];
  const components = [...document.querySelectorAll('cathedral-media')].filter(el => el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0);
  for (const el of components) {
    const img = el.shadowRoot?.querySelector('img');
    if (!img) { errors.push('Component not upgraded'); continue; }
    if (!img.hidden) {
      const style = getComputedStyle(img), frame = el.getBoundingClientRect(), picture = img.getBoundingClientRect();
      if (style.objectFit !== 'contain' || style.padding !== '0px') errors.push('Incorrect image fit or padding');
      if (Math.abs(frame.width - picture.width) > 1 || Math.abs(picture.height / picture.width - img.naturalHeight / img.naturalWidth) > .01) errors.push(`Image does not fill frame: ${el.getAttribute('src')}`);
      if (img.complete && !img.naturalWidth) errors.push(`Image failed: ${el.getAttribute('src')}`);
    } else if (el.shadowRoot.querySelector('.placeholder').hidden) errors.push('Missing fallback');
  }
  const selector = '.chapter-book > img,.recipe-volume > img,.visual-card > img,.defect-card > img,.material-card > img,#lessons .lesson figure > img,#timeline .event figure > img,.amphora-photo > img,.exhibition > img,.masters-feature > img,.judith-art > img,.saved button > img,.related-books button > img';
  const bypasses = [...document.querySelectorAll(selector)].filter(el => el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0);
  if (!['atlas','glaze-families','reading'].includes(document.body.dataset.page) && bypasses.length) errors.push(`${bypasses.length} visible card images bypass the atom`);
  if (document.documentElement.scrollWidth > innerWidth) errors.push('Horizontal overflow');
  return {page:document.body.dataset.page, width:innerWidth, components:components.length, errors};
}
