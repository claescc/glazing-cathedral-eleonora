/* Shared appearance preference for the site and its design-system catalogue. */
(() => {
  const key = "eleonora-appearance";
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
  apply();
  darkQuery.addEventListener("change", apply);
  contrastQuery.addEventListener("change", apply);
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".theme-select").forEach((select) => {
      select.value = preference;
      select.addEventListener("change", () => {
        if (!allowed.has(select.value)) return;
        preference = select.value;
        try { localStorage.setItem(key, preference); } catch { /* still works this session */ }
        apply();
      });
    });
  });
})();
