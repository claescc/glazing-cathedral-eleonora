import { readFileSync, writeFileSync } from 'node:fs';

// The source document keeps every interactive mount point available to the
// shared application; route-specific CSS exposes only the chosen page.
const routes = {
  atlas: 'atlas.html', recipes: 'recipes.html', layering: 'layering.html',
  path: 'learn.html', kiln: 'kiln.html', materials: 'materials.html',
  restoration: 'restoration.html', masters: 'masters.html', tribute: 'tribute.html',
  notebook: 'notebook.html', reading: 'reading.html',
  'source-library': 'reading.html#source-library',
  rooms: 'index.html#rooms', exhibitions: 'index.html#exhibitions', top: 'index.html',
};
const titles = {
  home: 'Home', atlas: 'Glaze Atlas', recipes: 'Recipes', layering: 'Layering Laboratory',
  learn: 'Learn', kiln: 'Kiln Chapel', materials: 'Materials Archive',
  restoration: 'Restoration Room', masters: 'Hall of Masters', tribute: 'Judith Laqueur-Révész',
  notebook: 'Eleonora’s Notebook', reading: 'Reading Room',
};
let source = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
// Keep the source route as Home and regenerate sibling pages from it.
source = source.replace(/<body(?: data-page="[^"]+")?>/, '<body data-page="home">');
source = source.replace(/href="#([a-z-]+)"/g, (whole, id) => routes[id] ? `href="${routes[id]}"` : whole);
source = source.replace(/href="index\.html"(\s+data-nav-section="top")/g, 'href="index.html"$1');
source = source.replace(/<title>[^<]*<\/title>/, '<title>Home · Ceramics Cathedral of Eleonora</title>');
source = source.replace(/<script src="app\.js\?v=[^"]+"/, '<script src="app.js?v=20260927-film"');
source = source.replace(/<link rel="stylesheet" href="styles\.css\?v=[^"]+"/, '<link rel="stylesheet" href="styles.css?v=20260927-film"');
source = source.replace(/(<div class="desktop-pages"[^>]*>)([\s\S]*?)(<\/div>)/, (all, open, links, close) => open + links.replace(/ aria-current="page"/g, '').replace('href="index.html"', 'href="index.html" aria-current="page"') + close);
writeFileSync(new URL('./index.html', import.meta.url), source);
for (const [page, title] of Object.entries(titles)) {
  if (page === 'home') continue;
  const html = source.replace('data-page="home"', `data-page="${page}"`)
    .replace('<title>Home ·', `<title>${title} ·`)
    .replace('href="index.html" aria-current="page"', 'href="index.html"')
    .replace(`href="${page}.html"`, `href="${page}.html" aria-current="page"`)
    .replace(/<meta\s+name="description"\s+content="[^"]+"\s*\/>/, `<meta name="description" content="Explore ${title.toLowerCase()} at the Ceramics Cathedral of Eleonora." />`);
  writeFileSync(new URL(`./${page}.html`, import.meta.url), html);
}
