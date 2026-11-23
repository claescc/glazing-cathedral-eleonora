/* Shared page utility, independent of catalogue and lesson rendering. */
(() => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'back-to-top';
  button.hidden = true;
  button.innerHTML = '<span aria-hidden="true">↑</span> Back to top';
  document.body.append(button);
  const footer = document.querySelector('.site-footer');
  const update = () => {
    const bounds = footer?.getBoundingClientRect();
    const footerVisible = bounds && bounds.top < innerHeight && bounds.bottom > 0;
    button.hidden = window.scrollY < 400 || Boolean(footerVisible);
  };
  if (footer) new IntersectionObserver(update).observe(footer);
  window.addEventListener('resize', update);
  window.addEventListener('scroll', update, { passive: true });
  button.addEventListener('click', () => {
    const target = Array.from(document.querySelectorAll('main h1, main h2, main')).find(element => element.getClientRects().length);
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
