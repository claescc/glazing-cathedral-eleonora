/* Shared media atom. Shadow styles isolate image fit from legacy page CSS. */
class CathedralMedia extends HTMLElement {
  static observedAttributes = ['src', 'alt', 'size', 'shape', 'position', 'loading', 'placeholder'];
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    root.innerHTML = `<style>
      :host { display:block; box-sizing:border-box; flex:none; width:100%; height:auto; padding:0; overflow:hidden; border-radius:var(--cathedral-card-arch); background:transparent; }
      :host([shape="rectangle"]) { padding-top:0; border-radius:0; }
      img { display:block; width:100%; height:auto; max-width:none; margin:0; padding:0; border:0; border-radius:0; object-fit:contain; }
      .placeholder { display:grid; place-items:center; box-sizing:border-box; width:100%; padding:var(--cathedral-card-space, 1rem); text-align:center; font:inherit; color:var(--text); }
      [hidden] { display:none; }
    </style><img><span class="placeholder" hidden></span>`;
    this.image = root.querySelector('img');
    this.placeholder = root.querySelector('.placeholder');
    this.image.addEventListener('error', () => this.showPlaceholder('Photograph unavailable'));
  }
  connectedCallback() { this.update(); }
  attributeChangedCallback() { this.update(); }
  showPlaceholder(text) { this.image.hidden = true; this.placeholder.hidden = false; this.placeholder.textContent = text; }
  update() {
    if (!this.image) return;
    const src = this.getAttribute('src');
    if (!src) { this.showPlaceholder(this.getAttribute('placeholder') || 'Photograph not yet documented'); return; }
    this.image.hidden = false; this.placeholder.hidden = true;
    this.image.alt = this.getAttribute('alt') || '';
    this.image.loading = this.getAttribute('loading') === 'eager' ? 'eager' : 'lazy';
    this.image.decoding = 'async';
    this.image.style.objectPosition = this.getAttribute('position') || 'center';
    if (this.image.getAttribute('src') !== src) this.image.src = src;
  }
}
customElements.define('cathedral-media', CathedralMedia);
window.cathedralMedia = ({src='', alt='', size='standard', shape='arch', position='center', placeholder=''}) => {
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // These routes retain their original rendered image structure and behaviour.
  if (['atlas','glaze-families','reading'].includes(document.body.dataset.page)) {
    return src ? `<img loading="lazy" src="${escape(src)}" alt="${escape(alt)}">` : `<div class="image-missing">${escape(placeholder)}</div>`;
  }
  return `<cathedral-media src="${escape(src)}" alt="${escape(alt)}" size="${escape(size)}" shape="${escape(shape)}" position="${escape(position)}" placeholder="${escape(placeholder)}"></cathedral-media>`;
};
