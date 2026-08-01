# ybreakless.github.io

Personal portfolio and CV for **Mohammad Haj Najafi** — Experimental Sciences graduate applying to
computer science programmes at German technical universities.

**Live:** https://ybreakless.github.io

Static site. No framework, no build step, no dependencies. HTML5, CSS custom properties and
~150 lines of vanilla JavaScript, all of it progressive enhancement — disable JS and the page
still reads, navigates and submits.

---

## Structure

```
.
├── index.html          Portfolio — hero, academics, skills, work, contact
├── resume.html         Print-first CV (A4, renders straight to PDF)
├── 404.html            Not-found page
├── sitemap.xml         Search engine sitemap
├── robots.txt          Crawler directives
├── AUDIT.md            Full design + content audit and outstanding TODOs
├── css/
│   └── style.css       Token-based design system (dark + light)
├── js/
│   └── main.js         Theme, nav, scroll-spy, reveal, form state
└── assets/images/      WebP with JPEG fallbacks, OG card, favicon
```

## Design system

| | |
|---|---|
| Type | Inter (structure) · JetBrains Mono (labels, metadata) |
| Scale | Fluid major third (1.250) via `clamp()`, 7 steps |
| Space | 8pt base |
| Colour | Near-black `#0b0c0e`, single periwinkle accent, full light theme |
| Contrast | All pairs verified at WCAG 2.1 AA or better |
| Motion | 160–700ms, `cubic-bezier(0.22, 1, 0.36, 1)`, `prefers-reduced-motion` honoured |

Theme is set from `prefers-color-scheme` before first paint and persisted to `localStorage`.

## Performance

| | |
|---|---|
| Image payload | ~380 KB (was 8.4 MB) |
| JavaScript | ~150 lines, no dependencies |
| Repository | 1.3 MB (was 9.4 MB) |
| Requests | 1 stylesheet, 1 script, 1 font request |

Responsive `<picture>` with WebP + JPEG fallback, explicit dimensions to prevent layout shift,
`fetchpriority="high"` on the portrait, lazy loading below the fold.

## Accessibility

Skip link · semantic landmarks · every input bound to a `<label>` · `aria-expanded` on the menu
toggle · `aria-current` on the active nav link · Escape-to-close with focus return · decorative
SVGs `aria-hidden` · visible focus rings · no flashing content (WCAG 2.3.1).

## SEO

Per-page `<title>` and description · `rel="canonical"` · Open Graph + Twitter card with a
1200×630 preview · JSON-LD `Person` schema with `sameAs` · sitemap · robots.

## Local development

No tooling required. Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
```

## Deployment

GitHub Pages, `main` branch, `/` root. Repository must be named `<username>.github.io`.

---

## Outstanding

See [`AUDIT.md`](AUDIT.md) for the full audit. Open items:

- [ ] Replace the placeholder performance metric in the Terminal Network Toolkit card (`TODO(Mo)`)
- [ ] Add verification URLs to all certifications
- [ ] Replace `project1.jpg` / `project2.jpg` with real screenshots
- [ ] Confirm the IELTS band and update both pages
