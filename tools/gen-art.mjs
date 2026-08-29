/* ==========================================================================
   gen-art.mjs — generates every piece of artwork on the site.

   The old site shipped three AI-generated concept illustrations. They were
   ~380 KB, they depicted nothing that exists, and any reader in 2026 spots
   them immediately. This replaces them with plotted SVG: each drawing is
   derived from a small deterministic model of the thing it depicts, so the
   picture is a diagram rather than decoration.

   Deterministic: a fixed-seed PRNG means `node tools/gen-art.mjs` produces
   byte-identical files every run, so the assets are diffable in git.

     node tools/gen-art.mjs            # writes assets/art/*.svg
     node tools/gen-art.mjs --raster   # also writes og-card.png + favicon.png
                                       # (needs rsvg-convert)
   ========================================================================== */

import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const OUT = new URL('../assets/art/', import.meta.url);
const IMG = new URL('../assets/images/', import.meta.url);
mkdirSync(OUT, { recursive: true });

/* -- mulberry32: 32 bits of state, uniform enough for placing dots -------- */
const rng = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const n = (v) => Number(v.toFixed(2));

/* Every drawing is stroked in `currentColor`, so a single CSS rule themes
   all of them. The embedded <style> only exists to serve the standalone
   <img> case, where currentColor resolves to black. */
const doc = (w, h, body, label) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
<style>svg{color:#0a0b0c}@media (prefers-color-scheme:dark){svg{color:#f2f3f4}}</style>
${body}
</svg>
`;

/* Dot grid — the substrate every drawing sits on. */
function dotfield(w, h, step, o = 0.16) {
  const d = [];
  for (let y = step; y < h; y += step)
    for (let x = step; x < w; x += step) d.push(`M${x} ${y}h.01`);
  return `<path d="${d.join('')}" stroke-width="1.6" stroke-opacity="${o}"/>`;
}

/* ==========================================================================
   1. lattice — a self-avoiding walk on a lattice, drawn as a chain of
   residues. It is the standard toy model of protein folding (Lau & Dill,
   1989), and it is also just a graph traversal. That double reading is the
   whole thesis of the site, so it opens the page.
   ========================================================================== */
function lattice() {
  const W = 720, H = 420, S = 42, COLS = 16, ROWS = 9;
  const r = rng(20260828);
  const STEPS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  // A plain self-avoiding random walk, best of 600 attempts. Warnsdorff's
  // rule fills the grid but produces a boustrophedon that reads as a maze;
  // an unguided SAW traps itself early but the *longest* of a few hundred
  // tries is both long and irregular, which is what a folded chain looks
  // like. Cheap, and the fixed seed makes "best" reproducible.
  function attempt() {
    const seen = new Set();
    let x = 1 + Math.floor(r() * COLS), y = 1 + Math.floor(r() * ROWS);
    const path = [[x, y]];
    seen.add(`${x},${y}`);
    for (;;) {
      const open = STEPS
        .map(([dx, dy]) => [x + dx, y + dy])
        .filter(([nx, ny]) =>
          nx >= 1 && nx <= COLS && ny >= 1 && ny <= ROWS && !seen.has(`${nx},${ny}`));
      if (!open.length) return path;
      [x, y] = open[Math.floor(r() * open.length)];
      seen.add(`${x},${y}`);
      path.push([x, y]);
    }
  }

  let walk = [];
  for (let i = 0; i < 600; i++) {
    const p2 = attempt();
    if (p2.length > walk.length) walk = p2;
  }

  const px = ([cx, cy]) => [n(cx * S - 18), n(cy * S - 18)];
  const chain = walk.map(px).map(([a2, b2], i) => `${i ? 'L' : 'M'}${a2} ${b2}`).join('');

  // Contacts: residues adjacent in space but far apart along the chain.
  // Finding these is what a folding model is actually for.
  const contacts = [];
  for (let i = 0; i < walk.length; i++) {
    for (let j = i + 3; j < walk.length; j++) {
      if (Math.abs(walk[i][0] - walk[j][0]) + Math.abs(walk[i][1] - walk[j][1]) !== 1) continue;
      const [ax, ay] = px(walk[i]), [bx, by] = px(walk[j]);
      contacts.push(`M${ax} ${ay}L${bx} ${by}`);
    }
  }

  const nodes = walk.map((p, i) => {
    const [a2, b2] = px(p);
    return i % 4 === 0
      ? `<circle cx="${a2}" cy="${b2}" r="4.4" fill="currentColor" stroke="none"/>`
      : `<circle cx="${a2}" cy="${b2}" r="3.2" stroke-width="1.4"/>`;
  }).join('');

  const [hx, hy] = px(walk[0]);
  const [tx, ty] = px(walk[walk.length - 1]);

  return doc(W, H, [
    dotfield(W, H, S / 2, 0.11),
    `<path d="${contacts.join('')}" stroke-width="1.1" stroke-opacity="0.4" stroke-dasharray="1 4"/>`,
    `<path d="${chain}" stroke-width="2.1"/>`,
    nodes,
    `<circle cx="${hx}" cy="${hy}" r="9" stroke-width="1.3" stroke-opacity="0.55"/>`,
    `<circle cx="${tx}" cy="${ty}" r="9" stroke-width="1.3" stroke-opacity="0.55"/>`,
  ].join('\n'), 'A space-filling lattice walk with its non-local contacts marked');
}

/* ==========================================================================
   2. trajectory — the plan, drawn as a state machine rather than a map.
   ========================================================================== */
function trajectory() {
  const W = 720, H = 290;
  const stops = [
    { x: 90,  label: '01' },
    { x: 300, label: '02' },
    { x: 510, label: '03' },
    { x: 660, label: '04' },
  ];
  const y = 150;

  const rail = `<path d="M40 ${y}H${W - 30}" stroke-width="1.4" stroke-opacity="0.28"/>`;
  const done = `<path d="M40 ${y}H${stops[0].x}" stroke-width="2.4"/>`;

  const marks = stops.map((s, i) => {
    const solid = i === 0;
    return `<g>
  <circle cx="${s.x}" cy="${y}" r="${solid ? 9 : 7}" ${solid ? 'fill="currentColor" stroke="none"' : 'stroke-width="1.8"'}/>
  ${solid ? '' : `<circle cx="${s.x}" cy="${y}" r="2.4" fill="currentColor" stroke="none" stroke-opacity="0.5"/>`}
  <path d="M${s.x} ${y - 22}V${y - 44}" stroke-width="1.2" stroke-opacity="0.4"/>
  <text x="${s.x}" y="${y - 54}" fill="currentColor" stroke="none" font-family="ui-monospace,monospace" font-size="13" text-anchor="middle" opacity="0.75">${s.label}</text>
</g>`;
  }).join('\n');

  // Load profile under the rail: each stage costs more than the last, and
  // the bars are what the timeline above is actually made of.
  const r = rng(7);
  const bars = [];
  for (let i = 0; i < 52; i++) {
    const t = i / 51;
    const stage = Math.min(3, Math.floor(t * 4));
    const h = n(8 + stage * 13 + Math.sin(t * 21) * 5 + r() * 9);
    const bx = n(42 + t * (W - 86));
    bars.push(`<path d="M${bx} 252V${n(252 - h)}" stroke-width="4" stroke-opacity="${(0.2 + stage * 0.16).toFixed(2)}"/>`);
  }
  const profile = bars.join('') +
    `<path d="M40 252H${W - 30}" stroke-width="1.2" stroke-opacity="0.3"/>`;

  return doc(W, H, [dotfield(W, H, 30, 0.1), profile, rail, done, marks].join('\n'),
    'Four-stage trajectory with a workload profile beneath it');
}

/* ==========================================================================
   3. alignment — two sequences and their match track. The single most
   common picture in bioinformatics, and it is a dynamic-programming table.
   ========================================================================== */
function alignment() {
  const W = 720, H = 260, CW = 17, N = 38, X0 = 26;
  const r = rng(4242);
  const rows = [70, 130];
  const cells = [];
  const matches = [];

  for (let i = 0; i < N; i++) {
    const x = X0 + i * CW;
    const match = r() > 0.26;
    rows.forEach((y, ri) => {
      const gap = !match && ri === 1 && r() > 0.65;
      cells.push(gap
        ? `<path d="M${x + 2} ${y + 7}h${CW - 8}" stroke-width="1.6" stroke-opacity="0.35"/>`
        : `<rect x="${x}" y="${y}" width="${CW - 4}" height="14" rx="1.5" ${match
            ? 'fill="currentColor" stroke="none" fill-opacity="0.9"'
            : 'stroke-width="1.3" stroke-opacity="0.5"'}/>`);
    });
    if (match) matches.push(`M${x + 1} 106h${CW - 6}`);
  }

  const ruler = [];
  for (let i = 0; i <= N; i += 5) {
    const x = X0 + i * CW;
    ruler.push(`<path d="M${x} 178v7" stroke-width="1.2" stroke-opacity="0.4"/>`);
    ruler.push(`<text x="${x}" y="200" fill="currentColor" stroke="none" font-family="ui-monospace,monospace" font-size="11" text-anchor="middle" opacity="0.55">${i}</text>`);
  }

  return doc(W, H, [
    `<path d="${matches.join('')}" stroke-width="2" stroke-opacity="0.7"/>`,
    cells.join(''),
    `<path d="M${X0} 178H${X0 + N * CW - 4}" stroke-width="1.2" stroke-opacity="0.4"/>`,
    ruler.join(''),
  ].join('\n'), 'Two aligned sequences with their identity track');
}

/* ==========================================================================
   4. trace — a periodic biosignal with a detection window. Drawn from an
   actual sum-of-sines model, not traced by hand.
   ========================================================================== */
function trace() {
  const W = 720, H = 240;
  const r = rng(1337);
  const pts = [];
  for (let i = 0; i <= 360; i++) {
    const t = i / 360;
    const beat = t * 9 * Math.PI * 2;
    const v =
      46 * Math.exp(-Math.pow(((beat % (2 * Math.PI)) - 1.0) / 0.30, 2)) -
      16 * Math.exp(-Math.pow(((beat % (2 * Math.PI)) - 1.9) / 0.42, 2)) +
      7 * Math.sin(t * 5.5) + (r() - 0.5) * 3.4;
    pts.push(`${n(20 + t * (W - 40))} ${n(150 - v)}`);
  }

  const win = `<rect x="250" y="42" width="150" height="160" rx="3" stroke-width="1.2" stroke-opacity="0.45" stroke-dasharray="4 4"/>`;
  const base = `<path d="M20 150H${W - 20}" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="3 6"/>`;

  return doc(W, H, [dotfield(W, H, 30, 0.08), base, win,
    `<path d="M${pts.join('L')}" stroke-width="1.8"/>`].join('\n'),
    'A periodic biosignal trace with one analysis window marked');
}

/* ==========================================================================
   5. og-card — 1200x630 social preview. Rendered light-on-dark, because
   every platform that shows it puts it on an unpredictable background.
   ========================================================================== */
function ogCard() {
  const W = 1200, H = 630;
  const r = rng(99);
  const dots = [];
  for (let y = 30; y < H; y += 30)
    for (let x = 30; x < W; x += 30) dots.push(`M${x} ${y}h.01`);

  const pts = [];
  for (let i = 0; i <= 200; i++) {
    const t = i / 200;
    pts.push(`${n(t * W)} ${n(602 - 20 * Math.sin(t * Math.PI * 3.1) - r() * 5)}`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<rect width="${W}" height="${H}" fill="#08090a"/>
<path d="${dots.join('')}" stroke="#ffffff" stroke-opacity="0.13" stroke-width="2" stroke-linecap="round"/>
<path d="M${pts.join('L')}" stroke="#ffffff" stroke-opacity="0.30" stroke-width="2" fill="none"/>
<g font-family="'JetBrains Mono',ui-monospace,monospace">
  <rect x="84" y="92" width="46" height="46" fill="#ffffff"/>
  <text x="94" y="125" font-size="26" font-weight="700" fill="#08090a">Y</text>
  <text x="148" y="124" font-size="19" fill="#ffffff" opacity="0.62" letter-spacing="3">YBREAKLESS.GITHUB.IO</text>
  <text x="84" y="272" font-size="20" fill="#ffffff" opacity="0.55" letter-spacing="4">INFORMATIK &#183; DE &#8594; BIOINFORMATIK &#183; CH</text>
</g>
<g font-family="Inter,'Helvetica Neue',Arial,sans-serif" fill="#ffffff">
  <text x="84" y="380" font-size="82" font-weight="700" letter-spacing="-3.5">Computation, pointed</text>
  <text x="84" y="466" font-size="82" font-weight="700" letter-spacing="-3.5">at living systems.</text>
</g>
<g font-family="'JetBrains Mono',ui-monospace,monospace" fill="#ffffff" opacity="0.62" font-size="21">
  <text x="84" y="546">20.0 / 20.0 DIPLOMA</text>
  <text x="470" y="546">DE B2</text>
  <text x="640" y="546">7 CERTIFICATIONS</text>
  <text x="990" y="546">8 LOCALES</text>
</g>
</svg>
`;
}

/* 6. favicon — the brand mark, nothing else. */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
<rect width="64" height="64" rx="12" fill="#08090a"/>
<path d="M14 18l18 20 18-20M32 38v10" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>
`;

/* -- write ---------------------------------------------------------------- */
const files = {
  'lattice.svg': lattice(),
  'trajectory.svg': trajectory(),
  'alignment.svg': alignment(),
  'trace.svg': trace(),
  'og-card.svg': ogCard(),
  'favicon.svg': favicon,
};

for (const [name, body] of Object.entries(files)) {
  writeFileSync(new URL(name, OUT), body);
  console.log(`  ${name.padEnd(18)} ${String(body.length).padStart(6)} B`);
}

if (process.argv.includes('--raster')) {
  const png = (src, dst, args) => {
    execFileSync('rsvg-convert', [...args, '-o', new URL(dst, IMG).pathname,
      new URL(src, OUT).pathname]);
    console.log(`  ${dst}`);
  };
  png('og-card.svg', 'og-card.png', ['-w', '1200', '-h', '630']);
  png('favicon.svg', 'favicon.png', ['-w', '180', '-h', '180']);
}
