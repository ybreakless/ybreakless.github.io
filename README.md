# ybreakless.github.io

Personal site and CV. Monochrome, eight locales, an interactive console, and no dependencies.

**Live:** https://ybreakless.github.io

The short version of what it says: an Experimental Sciences graduate applying for **Informatik**
at German technical universities, with **computational biology in Switzerland** as the actual
destination. The science background is the reason for the computer science, not a detour from it.

---

## What is interesting about the code

Everything below was written for this site rather than installed.

| | |
|---|---|
| `js/motion.js` | ~120-line tween engine. One `requestAnimationFrame` loop, and the CSS `cubic-bezier(.22 1 .36 1)` curve solved numerically with Newton–Raphson so JS- and CSS-driven motion on the same screen stay in step. |
| `js/terminal.js` | A command interpreter with tab completion, ghosted completion preview, shell history on ↑/↓, `Ctrl-L`/`Ctrl-C`, and Levenshtein-based "did you mean" on an unknown command. It can also reconfigure the page. |
| `js/i18n.js` | Eight locales from seven tables — English is never stored, it is snapshotted out of the DOM on first run, so it cannot drift from the markup. Arabic and Persian flip the document to RTL and lazily fetch a font with Arabic coverage. |
| `tools/gen-art.mjs` | Every illustration on the site, plotted from a small model of the thing it depicts and a fixed-seed PRNG. Byte-identical on every run, so the assets diff cleanly in git. |

## Structure

```
.
├── index.html            Hero · trajectory · record · capability · work · console · contact
├── resume.html           Print-first CV (A4, renders straight to PDF)
├── 404.html
├── css/style.css         Design system: tokens, components, motion, locale, print
├── js/
│   ├── i18n.js           8 locales, RTL, DOM-snapshot fallback
│   ├── motion.js         tween engine, counters, word-split headline
│   ├── terminal.js       the console in section 05
│   └── main.js           settings store, cold start, nav, reveals, drawer
├── tools/gen-art.mjs     regenerates every SVG (and the OG card)
└── assets/art/           the generated drawings
```

## Design system

| | |
|---|---|
| Colour | **No hue anywhere.** Every value is a grey. Hierarchy comes from weight, size, spacing and rule thickness instead. |
| Themes | Dark and light, set before first paint from `localStorage` then `prefers-color-scheme`. |
| Type | Space Grotesk (display) · Inter (prose) · JetBrains Mono (chrome, console) · Noto Sans Arabic, loaded only if `ar`/`fa` is chosen |
| Scale | Fluid, `clamp()`, 7 steps |
| Contrast | Measured, not eyeballed. Lowest text pair on the page is **4.54:1** — WCAG AA throughout, both themes. |
| Artwork | SVG line art used as a CSS `mask` over `currentColor`, so one asset serves both themes exactly. |

## Performance

Measured over the wire for a first view, gzipped, excluding the Google Fonts request:

| | |
|---|---|
| Total | **~70 KB** (was 8.4 MB) |
| Repository | **412 KB** (was 9.4 MB) |
| Dependencies | 0 |
| Horizontal overflow | none, 320px → 1440px, in all 8 locales |

## Accessibility

Skip link · semantic landmarks · every input bound to a `<label>` · `aria-expanded` on the menu
and drawer · `aria-current` on the active nav link · Escape closes with focus return ·
`aria-live` console output · decorative SVG `aria-hidden` · visible focus rings ·
`prefers-reduced-motion` honoured, plus an in-page override for visitors whose OS setting does
not reflect what they want · no flashing content (WCAG 2.3.1).

The headline animation splits on **words, not letters**: per-letter spans make a screen reader
spell the headline aloud and break the joining behaviour Arabic and Persian depend on.

## Regenerating the artwork

```bash
node tools/gen-art.mjs            # assets/art/*.svg
node tools/gen-art.mjs --raster   # also the OG card + favicon PNG (needs rsvg-convert)
```

## Local development

No tooling required.

```bash
python3 -m http.server 8000
```

## Deployment

GitHub Pages, `main` branch, `/` root.

---

## Outstanding

See [`AUDIT.md`](AUDIT.md). Open items, highest value first:

- [ ] **Confirm the admission pathway** on [anabin](https://anabin.kmk.org/) and
      [uni-assist](https://www.uni-assist.de/) — worth more than any change to this site
- [ ] Add public verification URLs to all seven certifications
- [ ] Benchmark the network toolkit and push it with a README; the speedup figure is
      deliberately absent until it is measured
- [ ] Confirm the IELTS band and state it on both pages
- [ ] Replace the estimated `≈1.0` German grade with the official conversion once issued
