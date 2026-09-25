document.querySelectorAll("[data-role]").forEach((label) => {
  const specimen = document.querySelector(".specimen-" + label.dataset.role);
  const style = getComputedStyle(specimen);
  label.textContent =
    style.fontFamily +
    " · " +
    style.fontSize +
    " / " +
    style.lineHeight +
    " · weight " +
    style.fontWeight +
    " · " +
    style.color;
});
