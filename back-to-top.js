/* Shared page utility, independent of catalogue and lesson rendering. */
(() => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'back-to-top';
  button.hidden = true;
  button.innerHTML = '<span aria-hidden="true">↑</span> Back to top';
  document.body.append(button);
  const update = () => { button.hidden = window.scrollY < 400; };
  window.addEventListener('scroll', update, { passive: true });
  button.addEventListener('click', () => {
    const target = document.querySelector('main h1, main h2, main');
    if (target) {
      const previous = target.getAttribute('tabindex');
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => {
        if (previous === null) target.removeAttribute('tabindex');
        else target.setAttribute('tabindex', previous);
      }, { once: true });
    }
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
  update();
})();
