import { cpSync, mkdirSync, rmSync } from "node:fs";
import "./page-routes.mjs";
import { join } from "node:path";

const output = new URL("./dist/", import.meta.url);
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const file of [
  "index.html",
  "atlas.html",
  "glaze-families.html",
  "recipes.html",
  "layering.html",
  "learn.html",
  "kiln.html",
  "materials.html",
  "restoration.html",
  "masters.html",
  "tribute.html",
  "notebook.html",
  "reading.html",
  "typography.html",
  "typography.css",
  "design-system.js",
  "theme.js",
  "back-to-top.js",
  "CNAME",
  "styles.css",
  "material3.css",
  "m3-site.css",
  "app.js",
  "recipe-workbench.js",
  "library-data.js",
  "glazy-data.js",
  "glazy-imports.js",
  "book-recipes.js",
  "source-library.js",
  "library.css",
  "reading-room.css",
]) {
  cpSync(
    new URL(`./${file}`, import.meta.url),
    new URL(`./dist/${file}`, import.meta.url),
  );
}

cpSync(
  new URL("./assets/", import.meta.url),
  new URL("./dist/assets/", import.meta.url),
  { recursive: true },
);
mkdirSync(new URL("./dist/.openai/", import.meta.url), { recursive: true });
cpSync(
  new URL("./.openai/hosting.json", import.meta.url),
  new URL("./dist/.openai/hosting.json", import.meta.url),
);

console.log(`Prepared static site in ${join(new URL(".", output).pathname)}`);
