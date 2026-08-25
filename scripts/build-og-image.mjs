/**
 * Regenerates public/og-image.png (1200x630 social preview card).
 *
 * Requires rsvg-convert (brew install librsvg). Run after changing the
 * wordmark, tagline, or brand colours:  node scripts/build-og-image.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const logo = fs.readFileSync(path.join(root, "public", "logo.png")).toString("base64");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDFBF7"/>
      <stop offset="100%" stop-color="#F5EDE3"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#E64219"/>
      <stop offset="55%" stop-color="#F49D25"/>
      <stop offset="100%" stop-color="#338899"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- soft decorative arcs, low opacity -->
  <g fill="none" stroke="#E64219" stroke-opacity="0.07" stroke-width="2">
    <circle cx="1080" cy="120" r="150"/>
    <circle cx="1080" cy="120" r="210"/>
    <circle cx="1080" cy="120" r="270"/>
  </g>
  <g fill="none" stroke="#338899" stroke-opacity="0.07" stroke-width="2">
    <circle cx="110" cy="560" r="120"/>
    <circle cx="110" cy="560" r="175"/>
  </g>

  <!-- top accent bar -->
  <rect x="0" y="0" width="1200" height="12" fill="url(#bar)"/>

  <!-- logo -->
  <image x="92" y="132" width="150" height="150" xlink:href="data:image/png;base64,${logo}"/>

  <!-- wordmark -->
  <text x="92" y="360" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="#261C17">Limbach Samaj</text>
  <text x="92" y="446" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="#E64219">of Canada</text>

  <!-- rule -->
  <rect x="94" y="486" width="96" height="6" rx="3" fill="#F49D25"/>

  <!-- tagline -->
  <text x="92" y="546" font-family="Inter, Helvetica, Arial, sans-serif" font-size="30" fill="#5A4B41">Navratri Garba  &#183;  Mataji Havan  &#183;  Diwali Snehmilan</text>

  <!-- bottom-right domain -->
  <text x="1108" y="560" text-anchor="end" font-family="Inter, Helvetica, Arial, sans-serif" font-size="24" fill="#8A7A6E">limbachsamajcanada.ca</text>
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
