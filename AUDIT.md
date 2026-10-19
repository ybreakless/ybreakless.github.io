# Portfolio Audit — ybreakless.github.io

**Reviewed:** 19 October 2026
**Audience it is scored against:** recruiters, security teams, ML tooling collaborators, and anyone a link reaches.
**Verdict:** Rebuilt as a professional record. The site now positions itself around four disciplines — cybersecurity, systems programming, machine learning and computational biology — and carries no biography beyond what the work supports.

---

## 0. Positioning

The portfolio speaks as a handle, not a personal dossier. Everything on the page is:

- **Present tense.** Skills, shipped work and certifications — no application plans, timelines or long-range goals.
- **Checkable.** Certifications are named, repositories are linked, and every claim is sized to its evidence.
- **Handle-first.** Identity is `ybreakless` across GitHub, LeetCode and Hugging Face.

## 1. Structure as rebuilt

```
1. Hero          Positioning statement + 3 CTAs (console, contact, repositories)
2. Proof bar     Four numbers: repositories · certifications · spoken languages · locales
3. Focus         Four disciplines in cards: security, Rust, ML, bio
4. Record        Certifications · languages · public repositories
5. Capability    Code · machine learning & data · security & systems
6. Work          Shipped projects as Problem → Approach → Result
7. Console       Command interpreter over the same facts the page renders
8. Contact       Social channels under the @ybreakless handle (GitHub, LeetCode, Hugging Face)
```

## 2. Design

Unchanged from the previous rebuild and worth keeping:

| | |
|---|---|
| Colour | Monochrome throughout; hierarchy via weight, size, spacing and rule thickness. |
| Themes | Dark and light, resolved from `localStorage` then `prefers-color-scheme` before first paint. |
| Type | Space Grotesk (display) · Inter (prose) · JetBrains Mono (chrome, console). Arabic script coverage (Noto Sans Arabic) loads only if `ar`/`fa` is chosen. |
| Contrast | Measured against WCAG 2.1 AA in both themes. |
| Artwork | Deterministic SVG plotted by `tools/gen-art.mjs`; byte-identical across runs, diffable in git. |

## 3. Known gaps, in priority order

1. **Certification verification links.** All ten certificates are named with year but no public URLs yet. Until linked, the page correctly labels them as claims. Issuing platforms are deliberately not named, to keep the identity surface small.
2. **Network toolkit benchmark.** The speedup figure is deliberately absent until measured under controlled conditions. Benchmark it, then quote it here and in the project card.
3. **Artefacts behind the ML-in-Rust claim.** The "pulling ML toward Rust" position is the site's sharpest differentiator; it gets stronger every time a small public artefact backs it (a crate, a benchmark, a write-up).
4. **Console parity.** The console's `focus` and `record` commands read a local `FACTS` table; keep it in step with the page when content changes.

## 4. Content policy going forward

- Add experience as it exists, never as a plan. A "shipped" section grows; nothing else should.
- New certifications join the record only with a verification URL.
- Keep the identity surface to the handle. Professional channels (GitHub, LeetCode, Hugging Face) are the verified graph; anything revealing personal life stays off the page. A given name ("Ario") is shared only on direct request.
