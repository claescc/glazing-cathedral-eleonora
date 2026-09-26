import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../ceramic-palette.css', import.meta.url), 'utf8');
const token = (name) => {
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})\\s*;`));
  if (!match) throw new Error(`Missing solid token ${name}`);
  return match[1];
};
const luminance = (hex) => {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
};
const failures = [];
for (const mode of ['light', 'dark', 'contrast']) {
  const block = css.match(new RegExp(`:root\\[data-theme="${mode}"\\] \\{([\\s\\S]*?)\\n\\}`));
  if (!block) throw new Error(`Missing ${mode} mapping`);
  for (let section = 1; section <= 8; section++) {
    const prefix = `cc-s${section}`;
    const bg = token(`${prefix}-${mode}-bg`);
    const fg = token(`${prefix}-${mode}-text`);
    const border = token(`${prefix}-${mode}-border`);
    const accentMatch = block[1].match(new RegExp(`--${prefix}-accent:\\s*(#[0-9A-Fa-f]{6})`));
    const onMatch = block[1].match(new RegExp(`--${prefix}-on-accent:\\s*(#[0-9A-Fa-f]{6})`));
    if (!accentMatch || !onMatch) throw new Error(`Missing operational accent ${section}/${mode}`);
    const accent = accentMatch[1], onAccent = onMatch[1];
    for (const [role, ratio, minimum] of [
      ['text/background', contrast(fg, bg), 7],
      ['accent/background', contrast(accent, bg), 7],
      ['on-accent/accent', contrast(onAccent, accent), 7],
      ['border/background', contrast(border, bg), 3],
    ]) if (ratio < minimum) failures.push(`${section}/${mode} ${role}: ${ratio.toFixed(3)} < ${minimum}`);
  }
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else console.log('Palette contrast checks passed: 8 sections × 3 modes × 4 role pairs.');
