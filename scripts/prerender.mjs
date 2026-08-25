/**
 * Renders every prerenderable route to static HTML after `vite build`.
 *
 * Without this, all routes serve the same empty `<div id="root">` shell:
 * crawlers that don't execute JavaScript (most AI crawlers, every social
 * unfurler) see no content and no per-page metadata.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
const { render, prerenderPaths } = await import(ssrEntry);

/** Strip the tags Helmet owns so the template's defaults can't duplicate them. */
function stripManagedTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="author"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi, "");
}

let written = 0;
const failures = [];

for (const routePath of prerenderPaths) {
  try {
    const { html, head, htmlAttributes, bodyAttributes } = await render(routePath);

    let page = stripManagedTags(template)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      .replace("</head>", `  ${head}\n  </head>`);

    if (htmlAttributes) {
      page = page.replace(/<html([^>]*)>/i, `<html $1 ${htmlAttributes}>`);
    }
    if (bodyAttributes) {
      page = page.replace(/<body([^>]*)>/i, `<body $1 ${bodyAttributes}>`);
    }

    const outPath =
      routePath === "/"
        ? path.join(distDir, "index.html")
        : path.join(distDir, routePath, "index.html");

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, page);

    const textBytes = page
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim().length;

    console.log(
      `  prerendered ${routePath.padEnd(14)} -> ${(page.length / 1024).toFixed(1)} kB  (${textBytes} B text)`,
    );
    written++;
  } catch (error) {
    failures.push({ routePath, error });
    console.error(`  FAILED ${routePath}: ${error.message}`);
  }
}

console.log(`\nPrerendered ${written}/${prerenderPaths.length} routes.`);

if (failures.length) {
  console.error("Prerender failed — refusing to ship a partially static build.");
  process.exit(1);
}

/*
 * vite-plugin-vercel populates .vercel/output/static during `vite build`,
 * which happens before this script runs. Without syncing, the deploy would
 * ship the empty SPA shell and every prerendered page would be discarded.
 */
const vercelStatic = path.join(root, ".vercel", "output", "static");
const vercelConfigPath = path.join(root, ".vercel", "output", "config.json");

if (fs.existsSync(vercelStatic)) {
  const config = JSON.parse(fs.readFileSync(vercelConfigPath, "utf-8"));
  config.overrides = config.overrides || {};

  for (const routePath of prerenderPaths) {
    const rel =
      routePath === "/" ? "index.html" : `${routePath.replace(/^\//, "")}/index.html`;
    const target = path.join(vercelStatic, rel);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(
      path.join(distDir, routePath === "/" ? "index.html" : `${routePath}/index.html`),
      target,
    );
    // Map "events/index.html" -> "/events" so the filesystem handler resolves
    // the extensionless URL, mirroring the root entry the plugin emits.
    config.overrides[rel] = { path: rel.replace(/\/index\.html$/, "").replace(/^index\.html$/, "index") };
  }

  // The SSR bundle is a build artifact, not a public asset.
  const leaked = path.join(vercelStatic, "entry-server.js");
  if (fs.existsSync(leaked)) {
    fs.unlinkSync(leaked);
    console.log("  removed leaked entry-server.js from static output");
  }

  fs.writeFileSync(vercelConfigPath, JSON.stringify(config, null, 2));
  console.log(`Synced ${prerenderPaths.length} pages into .vercel/output/static.`);
} else {
  console.log("No .vercel/output found — skipping deploy-output sync.");
}
