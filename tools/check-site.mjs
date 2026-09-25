import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, extname } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const files = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" })
  .trim()
  .split("\n");
const failures = [];
let jsonCount = 0;
for (const file of files) {
  if (file.endsWith(".json")) {
    try {
      JSON.parse(readFileSync(resolve(root, file), "utf8"));
      jsonCount++;
    } catch (e) {
      failures.push(`${file}: ${e.message}`);
    }
  }
}
for (const file of readdirSync(root).filter((f) => /\.(m?js)$/.test(f))) {
  try {
    execFileSync(process.execPath, ["--check", resolve(root, file)]);
  } catch {
    failures.push(`${file}: JavaScript syntax error`);
  }
}
for (const page of ["index.html", "typography.html"]) {
  const html = readFileSync(resolve(root, page), "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  for (const id of new Set(ids))
    if (ids.filter((x) => x === id).length > 1)
      failures.push(`${page}: duplicate id ${id}`);
  for (const match of html.matchAll(
    /\b(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/g,
  )) {
    const path = match[1];
    if (/^(?:https?:|mailto:|data:)/.test(path)) continue;
    if (!existsSync(resolve(root, path)))
      failures.push(`${page}: missing ${path}`);
    if (!existsSync(resolve(root, "dist", path)))
      failures.push(`${page}: missing build asset ${path}`);
  }
}
for (const file of [
  "index.html",
  "typography.html",
  "design-system.js",
  "CNAME",
]) {
  if (!existsSync(resolve(root, "dist", file)))
    failures.push(`Missing build file ${file}`);
}
const inventory = files.reduce((counts, f) => {
  const type = extname(f) || "[no extension]";
  counts[type] = (counts[type] || 0) + 1;
  return counts;
}, {});
console.log(
  JSON.stringify(
    {
      trackedFiles: files.length,
      inventory,
      jsonFilesParsed: jsonCount,
      failures,
    },
    null,
    2,
  ),
);
if (failures.length) process.exitCode = 1;
