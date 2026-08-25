/**
 * Regenerates public/og-image.png (1200x630 social preview card).
 *
 * Layout, top to bottom: logo, organisation name, motto (Devanagari,
 * transliteration, English translation).
 *
 * Requires rsvg-convert (brew install librsvg). Run after changing the
 * wordmark, motto, or brand colours:  node scripts/build-og-image.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const logo = fs.readFileSync(path.join(root, "public", "logo.png")).toString("base64");

// Brand palette, converted from the HSL custom properties in src/index.css.
const PRIMARY = "#E64219";
const SECONDARY = "#338899";
const ACCENT = "#F49D25";
const INK = "#261C17";
const MUTED = "#6B5B50";

const HEADING = "Poppins, Helvetica, Arial, sans-serif";
const BODY = "Inter, Helvetica, Arial, sans-serif";
const DEVANAGARI = "Kohinoor Devanagari, Devanagari MT, Noto Sans Devanagari, serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDFBF7"/>
      <stop offset="100%" stop-color="#F5EDE3"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${PRIMARY}"/>
      <stop offset="55%" stop-color="${ACCENT}"/>
      <stop offset="100%" stop-color="${SECONDARY}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- soft concentric motifs, low opacity -->
  <g fill="none" stroke="${PRIMARY}" stroke-opacity="0.06" stroke-width="2">
    <circle cx="1110" cy="90" r="150"/>
    <circle cx="1110" cy="90" r="215"/>
    <circle cx="1110" cy="90" r="280"/>
  </g>
  <g fill="none" stroke="${SECONDARY}" stroke-opacity="0.06" stroke-width="2">
    <circle cx="90" cy="560" r="130"/>
    <circle cx="90" cy="560" r="190"/>
  </g>

  <rect x="0" y="0" width="1200" height="12" fill="url(#bar)"/>

  <!-- logo -->
  <image x="536" y="58" width="128" height="128" xlink:href="data:image/png;base64,${logo}"/>

  <!-- organisation name -->
  <text x="600" y="268" text-anchor="middle" font-family="${HEADING}" font-size="58" font-weight="700" fill="${INK}">Limbach Samaj of Canada</text>

  <!-- divider -->
  <rect x="552" y="300" width="96" height="5" rx="2.5" fill="${ACCENT}"/>

  <!-- motto -->
  <text x="600" y="388" text-anchor="middle" font-family="${DEVANAGARI}" font-size="46" fill="${INK}">अहर्निशं सेवामहे</text>
  <text x="600" y="442" text-anchor="middle" font-family="${HEADING}" font-size="34" font-weight="600" fill="${PRIMARY}">Aharnish Sevamahe</text>
  <text x="600" y="496" text-anchor="middle" font-family="${BODY}" font-size="25" font-style="italic" fill="${MUTED}">&#8220;Eternally in Service of Mankind at every moment&#8221;</text>

  <!-- domain -->
  <text x="600" y="582" text-anchor="middle" font-family="${BODY}" font-size="22" fill="#9A8B7E">limbachsamajcanada.ca</text>
</svg>`;

const tmp = path.join(root, "public", ".og-image.svg");
const out = path.join(root, "public", "og-image.png");
fs.writeFileSync(tmp, svg);
try {
  execFileSync("rsvg-convert", ["-w", "1200", "-h", "630", tmp, "-o", out]);
  console.log(`Wrote ${out}`);
} finally {
  fs.unlinkSync(tmp);
}
