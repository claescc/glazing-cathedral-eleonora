/* Shared appearance preference for the site and its design-system catalogue. */
(() => {
  const key = "eleonora-appearance-v2";
  const allowed = new Set(["auto", "light", "dark", "contrast"]);
  let preference = "auto";
  try {
    const saved = localStorage.getItem(key);
    if (allowed.has(saved)) preference = saved;
  } catch { /* Storage may be unavailable in private browsing. */ }

  const darkQuery = matchMedia("(prefers-color-scheme: dark)");
  const contrastQuery = matchMedia("(prefers-contrast: more)");
  function apply() {
    const theme = preference === "auto"
      ? (contrastQuery.matches ? "contrast" : darkQuery.matches ? "dark" : "light")
      : preference;
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#171b1c" : theme === "contrast" ? "#ffffff" : "#f7f5f0";
  }
  function syncControls() {
    document.querySelectorAll('.theme-select').forEach(select => { select.value = preference; });
    document.querySelectorAll('input[name="appearance"]').forEach(input => { input.checked = input.value === preference; });
  }
  function choose(value) {
    if (!allowed.has(value)) return;
    preference = value;
    try { localStorage.setItem(key, preference); } catch { /* Preference still applies this session. */ }
    apply();
    syncControls();
  }
  apply();
  darkQuery.addEventListener("change", apply);
  contrastQuery.addEventListener("change", apply);
  document.addEventListener("DOMContentLoaded", () => {
    syncControls();
    document.querySelectorAll(".theme-select").forEach(select => select.addEventListener("change", () => choose(select.value)));
    document.querySelectorAll('input[name="appearance"]').forEach(input => input.addEventListener("change", () => { if (input.checked) choose(input.value); }));
    const dialog = document.getElementById("settingsDialog");
    const button = document.getElementById("settingsButton");
    if (dialog && button) {
      button.addEventListener("click", () => dialog.showModal());
      document.getElementById("settingsClose").addEventListener("click", () => dialog.close());
      dialog.addEventListener("close", () => button.focus());
      dialog.addEventListener("click", event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
    }
  });
})();
