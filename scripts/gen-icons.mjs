// Generates the PWA icon set. No image libraries available in this environment,
// so the PNGs are rasterised here and encoded by hand.
//
// Run: node scripts/gen-icons.mjs
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "icons");

const BG = [27, 73, 101]; // #1B4965
const FG = [255, 255, 255];

const crcTable = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const head = Buffer.alloc(8);
  head.writeUInt32BE(data.length, 0);
  head.write(type, 4, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([Buffer.from(type, "ascii"), data])), 0);
  return Buffer.concat([head, data, crcBuf]);
}

function encodePng(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// --- shapes, in a 0..1 coordinate space ---------------------------------------

function roundedRect(px, py, x, y, w, h, r) {
  const dx = Math.max(Math.abs(px - (x + w / 2)) - (w / 2 - r), 0);
  const dy = Math.max(Math.abs(py - (y + h / 2)) - (h / 2 - r), 0);
  return Math.hypot(dx, dy) <= r;
}

function circle(px, py, cx, cy, r) {
  return Math.hypot(px - cx, py - cy) <= r;
}

// A speech bubble with three dots — reads clearly at 60px, which is roughly how
// large the icon renders on an iPhone home screen.
function bubble(px, py, scale) {
  const bx = 0.5 - 0.34 * scale;
  const by = 0.5 - 0.30 * scale;
  const bw = 0.68 * scale;
  const bh = 0.50 * scale;

  const inBody = roundedRect(px, py, bx, by, bw, bh, 0.14 * scale);

  // Tail: a triangle hanging off the lower-left of the body.
  const tailTop = by + bh - 0.01 * scale;
  const tailX = bx + 0.16 * scale;
  const tailH = 0.16 * scale;
  const t = (py - tailTop) / tailH;
  const inTail =
    py >= tailTop &&
    py <= tailTop + tailH &&
    px >= tailX &&
    px <= tailX + (1 - t) * 0.20 * scale;

  return inBody || inTail;
}

function dots(px, py, scale) {
  const cy = 0.5 - 0.05 * scale;
  const r = 0.045 * scale;
  return (
    circle(px, py, 0.5 - 0.17 * scale, cy, r) ||
    circle(px, py, 0.5, cy, r) ||
    circle(px, py, 0.5 + 0.17 * scale, cy, r)
  );
}

/**
 * @param size      pixel dimensions
 * @param maskable  true renders a full-bleed background with the artwork inside
 *                  the 80% safe zone, as Android adaptive icons require
 */
function render(size, maskable) {
  const rgba = Buffer.alloc(size * size * 4);
  const SS = 4; // supersampling factor, for antialiasing
  const artScale = maskable ? 0.72 : 1;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let bgHits = 0;
      let fgHits = 0;

      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const px = (x + (sx + 0.5) / SS) / size;
          const py = (y + (sy + 0.5) / SS) / size;

          const inBg = maskable ? true : roundedRect(px, py, 0, 0, 1, 1, 0.22);
          if (!inBg) continue;
          bgHits++;

          if (bubble(px, py, artScale) && !dots(px, py, artScale)) fgHits++;
        }
      }

      const total = SS * SS;
      const bgA = bgHits / total;
      const fgA = fgHits / total;
      const i = (y * size + x) * 4;

      // Composite foreground over background, then the whole thing over transparency.
      for (let c = 0; c < 3; c++) {
        rgba[i + c] = Math.round((BG[c] * (bgA - fgA) + FG[c] * fgA) / (bgA || 1));
      }
      rgba[i + 3] = Math.round(bgA * 255);
    }
  }

  return encodePng(size, size, rgba);
}

mkdirSync(OUT_DIR, { recursive: true });

const targets = [
  ["icon-192.png", 192, false],
  ["icon-512.png", 512, false],
  ["icon-maskable-512.png", 512, true],
  // iOS ignores the manifest for home-screen icons and reads apple-touch-icon.
  ["apple-touch-icon.png", 180, true],
];

for (const [name, size, maskable] of targets) {
  writeFileSync(join(OUT_DIR, name), render(size, maskable));
  console.log(`wrote icons/${name} (${size}x${size}${maskable ? ", maskable" : ""})`);
}
