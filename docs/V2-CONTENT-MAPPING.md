# V1 content in V2

V2 is implemented in the canonical GitHub Pages source, not the separate legacy Sites copy. The preservation baseline remains unchanged.

| V1 material | V2 destination |
| --- | --- |
| Home introduction and all curated routes | index.html |
| Eight room descriptions | Home → Explore all eight rooms |
| All 265 structured recipes, formula provenance and calculators | recipes.html |
| Glaze atlas and all 26 historic families | atlas.html and glaze-families.html |
| Judith’s portrait, dates, biography and family attribution | tribute.html |
| Five family amphorae with full photographs and original descriptions | tribute.html#amphorae |
| Elephant relief, film, conservation history and sources | tribute.html#gelukkige-olifant |
| Deer frieze, 1940 exhibition, museum vase and archive research | tribute.html, existing article anchors |
| Judith feature and all ceramic lineages | masters.html |
| Learning, kiln, materials, diagnosis, notebook and reading sources | Existing named routes, unchanged |
| Original stained-glass mural and caption | Shared footer |
| Earlier generated Judith tribute image | Judith archive → Earlier stained-glass tribute illustration |
| Dedication to Eleonora, creator credit and sunflower seal | Shared shell/footer |

The new decorative still life is additive and labelled. Original asset/data paths and bytes are unchanged. The shared media component displays entire source images at natural proportions. The existing notification, saving, source-reading and recipe functionality remains in place.

Checks: `node build-static.mjs`, `node tools/check-site.mjs`, `node tools/check-v2-content.mjs`. Browser review must cover the home, recipes, masters and Judith on desktop and compact widths before publication. The flattened design board supplies layout direction; V1 text and real photographs replace its sample content.
