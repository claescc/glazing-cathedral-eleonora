import { readFileSync, writeFileSync } from 'node:fs';

// The source document keeps every interactive mount point available to the
// shared application; route-specific CSS exposes only the chosen page.
const routes = {
  atlas: 'atlas.html', 'glaze-families': 'glaze-families.html', recipes: 'recipes.html', layering: 'layering.html',
  path: 'learn.html', kiln: 'kiln.html', materials: 'materials.html',
  restoration: 'restoration.html', masters: 'masters.html', tribute: 'tribute.html',
  notebook: 'notebook.html', reading: 'reading.html',
  'source-library': 'reading.html#source-library',
  rooms: 'index.html#rooms', exhibitions: 'index.html#exhibitions', top: 'index.html',
};
const titles = {
  home: 'Home', atlas: 'Glaze Atlas', 'glaze-families': 'Glaze Families', recipes: 'Recipes', layering: 'Layering Laboratory',
  learn: 'Learn', kiln: 'Kiln Chapel', materials: 'Materials Archive',
  restoration: 'Restoration Room', masters: 'Hall of Masters', tribute: 'Judith Laqueur-Révész',
  notebook: 'Eleonora’s Notebook', reading: 'Reading Room',
};
const openings = {
  'glaze-families': ['ceramic-window-stories', 'Glaze families', 'Colour, chemistry, surface and tradition.'],
  atlas: ['ceramic-window-stories', 'A treasury of colour, surface and fire.'],
  recipes: ['recipe-manuscript', 'The Recipe Library', 'Open a volume. Study the formula. Begin a test.'],
  layering: ['recipe-manuscript', 'Layering Laboratory', 'Where glaze recipes meet on the same surface.'],
  learn: ['ceramic-library', 'The Learning Library', 'Eight chapters, from workable clay to a considered finished surface.'],
  kiln: ['ceramic-window-stories', 'The Kiln Chapel', 'Follow the transformation through heat, atmosphere and cooling.'],
  materials: ['ceramic-window-stories', 'The Materials Archive', 'The earth behind every vessel and glaze.'],
  restoration: ['masters-gallery', 'The Restoration Room', 'Look closely. Understand the surface. Care for the object.'],
  masters: ['masters-gallery', 'The Hall of Masters', 'A gallery of ceramic traditions, makers and shared knowledge.'],
  tribute: ['masters-gallery', 'Judith Laqueur-Révész', 'An artist’s hall of vessels, sculpture and surviving records.'],
  notebook: ['ceramic-library', 'Eleonora’s Notebook', 'Gather surfaces, observations and the questions for your next firing.'],
  reading: ['ceramic-library', 'The Reading Room', 'Books, source pages and paths into ceramic knowledge.'],
};
function opening(page, title) {
  const [, heading, description] = openings[page];
  return `<section class="room-frontispiece" aria-label="${title} introduction"><div class="room-art" aria-hidden="true"><img src="assets/artwork/ceramic-window-stories.jpg" alt="" fetchpriority="high" width="2172" height="724"></div><div class="frontispiece-caption"><h1>${title}</h1><p>${description || heading}</p></div></section>`;
}
let source = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
// Keep the source route as Home and regenerate sibling pages from it.
source = source.replace(/<body(?: data-page="[^"]+")?>/, '<body data-page="home">');
source = source.replace(/href="#([a-z-]+)"/g, (whole, id) => routes[id] ? `href="${routes[id]}"` : whole);
source = source.replace(/href="index\.html"(\s+data-nav-section="top")/g, 'href="index.html"$1');
source = source.replace(/<title>[^<]*<\/title>/, '<title>Home · Ceramics Cathedral of Eleonora</title>');
source = source.replace(/m3-site\.css\?v=[^"]+/g, 'm3-site.css?v=20261010-elephant-video-thumbnail');
source = source.replace(/<script src="app\.js\?v=[^"]+"/, '<script src="app.js?v=20261010-colour-hierarchy"');
source = source.replace(/<link rel="stylesheet" href="styles\.css\?v=[^"]+"/, '<link rel="stylesheet" href="styles.css?v=20260927-mobile-density"');
source = source.replace(/(<div class="desktop-pages"[^>]*>)([\s\S]*?)(<\/div>)/, (all, open, links, close) => open + links.replace(/ aria-current="page"/g, '').replace('href="index.html"', 'href="index.html" aria-current="page"') + close);
writeFileSync(new URL('./index.html', import.meta.url), source);
for (const [page, title] of Object.entries(titles)) {
  if (page === 'home') continue;
  const html = source.replace('data-page="home"', `data-page="${page}"`)
    .replace('<main id="main-content">', `${opening(page, title)}<main id="main-content">`)
    .replace('<title>Home ·', `<title>${title} ·`)
    .replace('href="index.html" aria-current="page"', 'href="index.html"')
    .replace(`href="${page}.html"`, `href="${page}.html" aria-current="page"`)
    .replace(/<meta\s+name="description"\s+content="[^"]+"\s*\/>/, `<meta name="description" content="Explore ${title.toLowerCase()} at the Ceramics Cathedral of Eleonora." />`);
  const archedHtml = ['restoration', 'kiln', 'materials', 'learn', 'masters', 'notebook', 'recipes'].includes(page) ? html.replace('</head>', '<link rel="stylesheet" href="arched-rooms.css?v=20261010-width" />\n  </head>') : html;
  const pageSection = page === 'glaze-families' ? 'glaze-families' : page;
  let headed = archedHtml;
  if (['atlas', 'glaze-families', 'recipes'].includes(page)) {
    const block = new RegExp(`(<section[^>]*id="${pageSection}"[\\s\\S]*?)(<h2>)([\\s\\S]*?)(<\\/h2>)`);
    headed = headed.replace(block, '$1<h2>$3</h2>');
  }
  const section = page === 'glaze-families' ? 'atlas' : page === 'learn' ? 'path' : page;
  const withNavigation = headed.replace(new RegExp(`(<a href="${page}.html")(?! aria-current)([^>]*data-nav-section="${section}")`), '$1 aria-current="page"$2');
  writeFileSync(new URL(`./${page}.html`, import.meta.url), withNavigation);
}
