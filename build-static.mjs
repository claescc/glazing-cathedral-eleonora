import { cpSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const output = new URL("./dist/", import.meta.url);
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const file of [
  "index.html",
  "typography.html",
  "typography.css",
  "design-system.js",
  "theme.js",
  "CNAME",
  "styles.css",
  "material3.css",
  "app.js",
  "library-data.js",
  "glazy-data.js",
  "glazy-imports.js",
  "book-recipes.js",
  "source-library.js",
  "library.css",
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
