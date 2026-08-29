# Portfolio Audit — ybreakless.github.io

**Reviewed:** 31 July 2026
**Audience it was scored against:** German technical university admissions (TUM, RWTH Aachen, KIT, TU Berlin), plus the scholarship and Werkstudent readers who sit downstream of that.
**Verdict:** Strong instincts, dangerous execution. The site was memorable for the wrong reasons and unverifiable in the ways that matter most. Rebuilt.

---

## 0. Read this part first

Before any design critique, the uncomfortable structural point:

**German public universities do not read portfolio websites.** Undergraduate admission at TUM, RWTH, KIT and TU Berlin runs through uni-assist as a documents process: your recognised secondary qualification, your grade conversion, your language certificate, and where required TestAS or a *Studienkolleg* / *Feststellungsprüfung* result. There is no "creative supplement" box. No admissions officer is clicking a link.

That does not make the site worthless. It makes its actual audience different from the one you were designing for:

| Reader | Does the site matter? |
|---|---|
| Undergrad admissions at a German public university | Barely. Documents decide it. |
| **DAAD / Deutschlandstipendium / private scholarships** | **Yes — these read a motivation letter and often a CV, and a link is fair game.** |
| **Werkstudent / HiWi / internship applications once you're in Germany** | **Yes, heavily. This is the real payoff.** |
| Professors you cold-email about research assistant work | Yes. |
| Anyone who Googles your name during any of the above | Yes. |

**So: the highest-leverage hour you can spend this month is not on this website.** It is on confirming your exact admission pathway at [anabin.kmk.org](https://anabin.kmk.org/) and [uni-assist.de](https://www.uni-assist.de/). Iranian secondary qualifications frequently require a *Studienkolleg* year or prior university study for direct entry, and the rules differ by *Bundesland* and by university. Get that answer before you polish another pixel. If you already have it, ignore this paragraph.

The site is now built for the readers in the "Yes" rows.

---

## 1. UX & structure audit

### What was wrong

**The first screen sold the wrong person.** Your `<h1>` was `MOHAMMAD "MO" HAJ NAJAFI` and your `<h2>` was `[ STEM Scholar | Developer | Tactical Esports Competitor ]`. Three identities, equally weighted, one of which is Valorant. A reviewer scanning for thirty seconds learned your name and that you're hard to categorise. Neither is useful.

**The hero had eleven competing links.** Nine social pills, two buttons. Eleven exits and no priority. When everything is a call to action, nothing is.

**Section order fought the reader.** Home → Skills → Education → Ventures → Esports → Contact. Skills before education means unverified claims arrive before the credentials that would make them believable. For an academic reader that ordering is backwards.

**Esports had a top-level nav slot.** `[ESPORTS]` sat between `[VENTURES]` and `[CONTACT]`, at the same visual weight as your academic record. You gave a hobby one-sixth of your primary navigation.

**Two of your six sections were noise.** A footer visitor counter hardcoded to `013370`, and a floating terminal widget containing a playable Tetris implementation. Roughly 460 lines of JavaScript, most of it entertainment.

**The primary CTA lied.** `[ DOWNLOAD CV.PDF ]` opened `resume.html` — an HTML page, not a PDF. Small thing, but the first promise the site makes to a stranger, and it breaks.

### What it is now

```
1. Hero              Positioning + 3 prioritised CTAs + hard credentials
2. Proof bar         Four numbers. 20.0/20 · ≈1.0 · B2 · 7 certifications
3. About             Three paragraphs. Why CS, why Germany, who you are
4. Academics         Timeline + certification grid — evidence before claims
5. Skills            Conservative labels, each naming its evidence
6. Work — Shipped    Problem → Approach → Result, with metrics
7. Work — Concepts   Visually and semantically separated. Labelled "Concept"
8. Contact           Form + direct channels, one screen
```

CTA hierarchy is now explicit: **View full CV** (filled, primary), **Email me** and **GitHub** (outlined, secondary), CV again pinned in the nav, form + five direct channels at the bottom. Never more than one scroll from a way to contact you.

The proof bar is the thirty-second scan. Four numbers, no prose. If someone reads nothing else, they leave knowing you graduated at the top of the scale, speak B2 German, and hold seven certifications.

---

## 2. Design

### Typography

The old stack was Press Start 2P (headings), VT323 (body), Share Tech Mono. Press Start 2P is a bitmap font with no lowercase optical tuning — legible only at exact pixel multiples, blurry everywhere else. VT323 at your settings rendered body copy at **24px** (`1.35rem` × an `18px` root). That is roughly 50% larger than any comfortable reading size, which is why the page felt like it never ended.

Now: **Inter** for everything structural, **JetBrains Mono** for labels, metadata and the eyebrow rules. Inter's `cv02/cv03/cv11` OpenType features are enabled for a more open single-storey `a` and unambiguous `1`/`l`. The mono face keeps a whisper of your terminal identity in the places where it reads as precision rather than costume.

Type is a fluid major-third scale (1.250) via `clamp()` — seven steps, no breakpoint jumps. Body sits at ~17px, headings tighten letter-spacing as they grow (`-0.022em` → `-0.035em`), which is what stops large sans-serif text looking amateur.

### Colour

Old palette: `#33ff33` phosphor green on `#07090f`, plus cyan, orange, magenta and yellow — five accent hues fighting on one page.

New palette: near-black `#0b0c0e`, one accent (`#7c9cff` periwinkle — reads technical rather than gamer), one positive green, one warm amber, everything else greyscale. Full light theme included and set from `prefers-color-scheme` before first paint, so there's no flash.

**Every pair was measured, not eyeballed.** Two failures were found and fixed during the build:

| Token | Before | After |
|---|---|---|
| `--text-subtle` (dark) | 4.03:1 — **fails AA** | **6.15:1** |
| `--text-subtle` (light) | 3.75:1 — **fails AA** | **4.82:1** |
| White label on accent button (dark) | 2.61:1 — **fails badly** | **7.51:1** (dark label on light accent) |

That third one is worth dwelling on: in a dark theme your accent is a *light* colour, so filled buttons need dark text. White-on-accent is the single most common contrast bug in dark-mode design systems.

### Layout

8pt spacing scale, 1120px container, `clamp()` section rhythm (4rem → 8rem). Prose capped at `68ch`. Hero is an asymmetric 1.55 : 1 grid — text-dominant, portrait as counterweight, which reads more confident than the old centred column.

### Trends worth having in 2026

Kept: sticky glass nav with a hairline that appears only on scroll, `text-wrap: balance` on headings, `color-mix()` for derived tones, `svh` units, scroll-driven reveals capped at ~620ms.

Deliberately skipped: bento grids (overexposed), gradient mesh blobs (dated in 2024), 3D hero scenes (cost/benefit is terrible for a text-dense page), AI-generated hero art (you already have three AI images — see §4).

---

## 3. Content

### The credibility problem

This is the most important section in the document.

**Your two pages described two different people.** `index.html` and `resume.html` were never reconciled:

| Claim | index.html | resume.html |
|---|---|---|
| English | IELTS **Band 9** (C1–C2) | "Fluent / C2 / **Score 130**" |
| Native languages | Persian | Persian, **Arabic**, **Turkish** |
| Languages known | Python, Rust, Bash, frontend | Python, JavaScript, **C++/C**, SQL |
| Projects | Bio Twin, Moython, Y314, Homa | Terminal Network Toolkit, Metrics Dashboard |

Zero overlap in the projects row. Anyone reading both pages — and a scholarship committee will — sees an inconsistency, and inconsistency is the thing that makes reviewers stop believing the *verifiable* claims too. Your 20.0/20.0 is real and it is genuinely excellent. Don't let a sloppy adjacent claim cost you its credibility.

Specific items to resolve yourself before you publish:

- **"IELTS Band 9"** — Band 9 overall is roughly the top 1% of test-takers worldwide. If you have it, name the test date and offer the TRF number. If it was 7.5, write 7.5; a verified 7.5 outranks an unverifiable 9 every time. "Score 130" isn't an IELTS scale at all, so at least one of the two pages was wrong. I've written the neutral "C1–C2 — IELTS Academic" as a placeholder. **Replace it with your actual band.**
- **Four native languages** — Persian, Arabic and Turkish all as "Native" invites discounting. I've kept Persian native and dropped the rest. Add Arabic/Turkish back at their honest CEFR level if you have one.
- **"Rust: Proficient"** with no Rust anywhere on GitHub. Now reads "Learning · ownership & traits", which is both true and more interesting to a professor than a claim they can disprove in one click.

### "Sleep-learning technology" — remove and don't put it back

Y314 was described as *"24/7 health-monitoring software and sleep-learning technology."* Hypnopaedia — learning during sleep — was tested and discredited in the 1950s once EEG made it possible to confirm subjects were actually asleep (Simon & Emmons, 1956). It survives today mainly in pseudoscience marketing.

On a page addressed to a technical university, this is not a neutral flourish. It signals that you'll assert a mechanism without checking whether it works, which is the precise opposite of what an admissions reader is screening for. Removed.

### "Homa: localized AI data centers" — reframed, not deleted

Datacentre construction is a capital-intensive infrastructure business. Listed flatly next to your diploma, it read as unmoored. But the *underlying* question — where inference has to physically happen, and what latency and data-residency constraints cost — is a legitimate distributed-systems problem and a good thing for a prospective CS student to be curious about.

So it stays, rewritten to lead with the question rather than the company, and filed under **"Concepts I want to build"** with the honest header: *"None of these exist yet. They are the problems I want to spend a degree learning enough to attack properly."*

That framing is strictly better for you. Ambition plus self-awareness reads as maturity. Ambition without it reads as inexperience.

### Social links — five removed

Old site: nine social pills in the hero, then all nine again in the footer. Removed **Instagram, X, Telegram and Truth Social**; kept **GitHub, LinkedIn, LeetCode, Hugging Face, email**.

Truth Social specifically: a political-identity signal on a page addressed to German academic institutions has no upside and a real downside. This isn't about your politics — it's that a professional page shouldn't broadcast any political affiliation to a reader deciding whether to fund you. Same logic applies to a personal Instagram.

Also removed, twice: *"try @ybreakless maybe i got account somewhere idk about :)"* — once in the hero, once in the contact section. Self-deprecating throwaway lines cost you more than they earn, because the reader can't tell if you're being casual or careless.

One more: the handle **ybreakless** sitting next to a certificate labelled **"Ethical Hacking Essentials"** reads as script-kiddie to a security-conscious reviewer, however unfair that is. The handle is fine — it's your GitHub, keep it. I've relabelled the certificate to its substance, **Information Security Essentials**. Use whatever the certificate literally says.

---

## 4. Projects

### The core problem

**Every project on the old site was an idea.** Bio Twin, Moython, Y314 and Homa: four concepts, zero shipped artefacts, presented in identical windows with identical weight and no label distinguishing plan from product.

A reviewer's next move is entirely predictable: click through to `github.com/ybreakless`. If what's there doesn't match what the page implied, the page stops counting. That risk was the largest single liability on the site — larger than the fonts, larger than the colours.

The three project images are also, visibly, AI-generated concept art rather than screenshots of anything. Reviewers in 2026 recognise this instantly.

### The fix — two tiers, clearly separated

**Tier 1 — Shipped.** Real, inspectable, with Problem → Approach → Result and a metric:

1. **This website.** It is genuinely the strongest thing you have right now, and the old site never mentioned it. You hand-wrote a design system, a print stylesheet and structured data with zero dependencies. That is real work. Lead with it.
2. **Terminal Network Toolkit.** From your CV. Written up properly with an asyncio concurrency angle.

**Tier 2 — Concepts.** Bio Twin, Moython, Homa — under an explicit heading, each carrying a `Concept` or `In progress` chip.

### Two things you must do before this ships

> **The metric in the Terminal Network Toolkit card is a placeholder.**
> `"under 5 seconds versus roughly 90 sequentially — an 18× speedup"` is a structurally correct sentence with an invented number. It is marked `TODO(Mo)` in the source. **Measure it and replace it, or delete the sentence.** A reviewer who checks an invented figure discards everything else on the page — you'd be reintroducing the exact credibility problem this rebuild removed.

> **`project1.jpg` needs to be a real screenshot** of the site, and `project2.jpg` a real terminal capture of the toolkit running. Take them yourself. `assets/images/project3.*` is currently unreferenced — it's waiting for your third shipped project.

### Metrics that would actually mean something

- **Toolkit:** measured scan time, subnet size, concurrent vs sequential, lines of code, test coverage
- **This site:** page weight, Lighthouse scores (run it), contrast ratios (measured — see §2)
- **Moython:** subscribers, total watch hours, videos published, learners reached
- **LeetCode:** problems solved, contest rating — a single honest number is worth three paragraphs of adjectives

---

## 5. Technical

### Performance

| | Before | After |
|---|---|---|
| Image payload | **8.4 MB** (four PNGs, one 2.0 MB) | **~380 KB** (WebP + JPEG fallback) |
| Repository size | 9.4 MB | **1.3 MB** |
| JavaScript | 458 lines (Tetris, matrix rain, Web Audio, boot screen) | **~150 lines**, all progressive enhancement |
| Font families | 3 (bitmap + two mono) | 2, one request, `display=swap` |
| Render-blocking overlays | 2 full-viewport `::before`/`::after` | 0 |

8.4 MB of images on a mid-tier mobile connection is roughly 45 seconds to first meaningful paint. Most readers were gone before your name rendered. Now: `<picture>` with WebP + JPEG fallback, explicit `width`/`height` to eliminate layout shift, `fetchpriority="high"` on the portrait, `loading="lazy"` below the fold.

### Accessibility — including one genuine safety issue

Two things on the old site were not style problems:

1. **`animation: flicker 0.15s infinite`** on a full-viewport overlay — a ~6.7 Hz full-screen luminance oscillation.
2. **The "Tactical Reload" flashbang** — a button that flashed the entire viewport to `#ffffff`.

Both sit inside the 3–60 Hz band associated with photosensitive seizure risk, and both violate **WCAG 2.3.1 (Three Flashes or Below Threshold)**. Roughly 1 in 4,000 people has photosensitive epilepsy. Removed entirely — this was the one change I'd have made regardless of what you'd chosen in §2.

Also added: skip link, `prefers-reduced-motion` honoured throughout, semantic landmarks, every form input bound to a `<label>` with `for`/`id`, `aria-expanded` on the menu toggle, `aria-current` on the active nav link, Escape-to-close with focus return, decorative SVGs `aria-hidden`, visible `:focus-visible` rings at 2px with 3px offset.

**Verified in the build:** 0 unclosed tags across all three pages, 0 broken local references, 0 unlabelled inputs, no skipped heading levels, all colour pairs at AA or better.

### SEO

Added: unique `<title>` and `<meta name="description">` per page, `rel="canonical"`, full Open Graph + Twitter card with a generated 1200×630 preview image, `theme-color` for both schemes, **JSON-LD `Person` schema** with `sameAs` links, `sitemap.xml`, `robots.txt`.

The JSON-LD matters more than it looks. It's how search engines and recruiter tooling build an entity record for "Mohammad Haj Najafi" — connecting this site, your GitHub, your LinkedIn and your LeetCode into one identity. Without it you're four unconnected strangers who share a name.

### Animation

Everything is 160–700ms on `cubic-bezier(0.22, 1, 0.36, 1)`. Scroll reveals fire once via `IntersectionObserver` and then unobserve. Hover states move 1–2px, never more. Nothing loops. Nothing autoplays. `prefers-reduced-motion: reduce` disables all of it.

### Stack

**Keep vanilla.** Genuinely. For a 2-page static site, React/Next would add a build step, a `node_modules` folder and a deployment pipeline to solve problems you don't have — and it would remove the thing that makes this site interesting to a technical reader, which is that you wrote every line of it. "No framework, no build step, 380 KB" is a better sentence than "built with Next.js."

Worth adding later: a GitHub Action running Lighthouse CI on push, and `@font-face` self-hosting to drop the Google Fonts round-trip.

---

## 6. Personal branding

**Positioning, one sentence:**
> Top-of-scale science graduate teaching himself systems programming in the open, on his way to a German technical university.

**Brand statement:**
> I finished secondary school at 20.0/20.0 and went looking for the part of science where you build things. It turned out to be systems programming. Everything I claim, you can check.

**Your differentiator — and it isn't esports.**
Plenty of applicants have strong grades. Plenty are self-taught. Almost none have a **fully verifiable public record**: measured metrics, linked certificates, conservative skill claims, shipped work separated from ideas. In a pool where every application asserts excellence, *checkability* is the rarest signal. That's the angle this rebuild is built around — and it's why the honesty edits in §3 and §4 aren't a moral lecture, they're the actual strategy.

**LinkedIn headline.** Yours is `Aspiring Software Engineer | Future CS Student in Germany 🇩🇪`. "Aspiring" and "Future" are both concessions — you're describing what you aren't yet. Replace with:

> **CS Applicant → German Technical Universities | Python & Systems | 20.0/20.0 Diploma**

Same facts, no apology, and the number does the work. Put `ybreakless.github.io` in the LinkedIn *Website* field, not just in the About text.

---

## 7. Conversion

**Making people contact you faster.** Email is now a one-tap `mailto:` in the hero, plus a form, plus five direct channels — never more than one scroll away. The form has a honeypot and a pending state so it can't be double-submitted. Response-time promise ("within 24 hours") is stated explicitly, because ambiguity about whether a message will be read is the main reason people don't send one. **Keep that promise.**

**Making people trust you.** Trust here is built by *verifiability*, not polish: conservative skill labels, metrics you can reproduce, concepts labelled as concepts, and consistency between the site and the CV.

**Proof you're still missing, ranked by value:**

1. **Public GitHub repositories with commit history.** Nothing on this list matters until this exists. A green contribution graph over six months proves consistency better than any certificate.
2. **Verification links on all seven certificates.** Currently they're claims. Coursera and most platforms issue public credential URLs. One `href` each turns claims into evidence. Marked `TODO` in the source.
3. **A real screenshot per project.** AI concept art actively subtracts.
4. **Your official grade conversion** from anabin/uni-assist, cited. `≈1.0` is currently your estimate; the official figure is a fact.
5. **One reference.** A teacher, a course instructor, a coach — a named human who will vouch. Even "References available on request" beats silence.
6. **LeetCode number.** Problems solved and contest rating are public, hard, and instantly checkable.
7. **A dated changelog or blog.** Three posts about what broke while building the toolkit would demonstrate more engineering ability than every certificate combined.

---

## 8. Action list

### Quick wins — do these in the next 24 hours

1. **Replace the placeholder metric** in the Terminal Network Toolkit card (`TODO(Mo)` in `index.html` and `resume.html`). Measure it or delete the sentence. *Non-negotiable — everything else depends on the page being true.*
2. **Fix the IELTS claim.** Write your actual band on both pages.
3. **Push the Terminal Network Toolkit to GitHub** with a README. It's cited in two places and a reviewer will look for it.
4. **Screenshot this site and the toolkit**, replace `project1.jpg` / `project2.jpg`.
5. **Add verification URLs** to all seven certificates.
6. **Update the LinkedIn headline** (§6) and put the site in the Website field.
7. **Pin four repositories** on your GitHub profile and write a profile README.
8. **Run Lighthouse** on the deployed site; put the scores on the portfolio card.
9. **Confirm your admission pathway** on anabin and uni-assist. See §0. Highest-value hour in this entire list.
10. **Print `resume.html` to PDF** and check it fits A4 cleanly before sending it anywhere.

### Long-term — next 3 to 6 months

1. **Ship three real projects**, one per month. Suggested: a Rust CLI (proves the Rust claim), a data-analysis notebook with a real public dataset (proves the Google cert), and one thing that solves an annoyance you personally have — the third will be the most interesting to talk about in an interview.
2. **Get German to C1.** More decisive for German admission than any project on this list, and it unlocks German-taught programmes, which are less competitive than the English-taught ones.
3. **Solve 150+ LeetCode problems** and publish the count.
4. **Write six posts** about things that broke and how you fixed them. Debugging narratives are the most persuasive writing an early-career engineer can produce.
5. **Contribute to one open-source project.** A single merged PR to something real outranks ten solo repositories.
6. **Grow Moython to a stated number** — subscribers or watch hours — so it becomes a metric instead of an adjective.
7. **Self-host fonts** and add Lighthouse CI on push.
8. **Ask two people for a reference** and put their names on the site with permission.

---

## Changed files

| File | Change |
|---|---|
| `index.html` | Rewritten — new structure, copy, SEO, JSON-LD, accessibility |
| `css/style.css` | Rewritten — token-based design system, dark + light, AA-verified |
| `js/main.js` | Rewritten — 458 → ~150 lines, progressive enhancement only |
| `resume.html` | Rewritten — A4-first print CV, contradictions reconciled |
| `404.html` | Rewritten to match |
| `sitemap.xml`, `robots.txt` | Added |
| `assets/images/*` | 8.4 MB PNG → ~380 KB WebP/JPEG; OG card + favicon generated; originals removed |
| `AUDIT.md` | This document |

**Outstanding `TODO`s in the source:** placeholder metric (project 2, both pages), certificate verification links, real project screenshots.

---

## Closing

The old site had one real virtue: it was *made*, not assembled from a template, and the person who made it clearly enjoyed it. That instinct is worth keeping — build the Tetris implementation, keep the terminal widget, just host them somewhere that isn't the page a scholarship committee reads.

What it lacked was the discipline to separate what you've done from what you intend to do. You have a genuinely strong hand: a maximum diploma average, B2 German at eighteen, real self-directed learning, and the ability to hand-write a website. None of that needed embellishment. It needed to be laid out clearly and made checkable.

Now go measure that scan time.

---

# Addendum — rebuild of 29 August 2026

The July audit above still stands; nothing in it was reversed. This entry
records what changed since, and why.

## What prompted it

Two things. First, the positioning was incomplete: the site explained that
the goal was Informatik in Germany but never said what the Germany was *for*,
which left an Experimental Sciences diploma looking like a discarded first
attempt rather than the reason for everything after it. Second, the page was
carrying more biography than it needed to.

## Positioning

The site now states a four-stage trajectory: **science diploma → Informatik
in Germany → computational biology in Switzerland → biotechnology, on the
compute side.** That reframing costs nothing and fixes the largest remaining
weakness in the story, because it turns the biology background from a
non-sequitur into the premise. Sequence alignment, structure prediction and
population genetics are algorithms problems; saying so out loud makes the
degree choice legible.

## Less person, more record

Removed from the public page: the portrait, the city, the plaintext email
address (now assembled in JavaScript; the form works without it), the
personal-life card, and the biography framing generally. The name stays —
in `<title>`, in the JSON-LD and on the CV — because the readers this site
is built for arrive holding an application with that name on it, and a site
that hides it is useless to them.

What replaced it is the record: a trajectory, an evidence table, and a
console that will print any of it on request.

## Design

Monochrome. Every colour token is now a grey, in both themes; hierarchy
comes from weight, size, spacing and rule thickness instead of hue. The
periwinkle accent is gone. Measured, not eyeballed: the lowest text contrast
pair anywhere on the page is **4.54:1** (light `--fg-subtle` on `--bg-sunken`),
which was found by measurement at 4.47:1 and corrected.

## Illustrations

The three AI-generated concept images and the illustrated avatar were
**deleted**, per §4 of the audit. They depicted nothing that exists and read
as AI art on sight. In their place, `tools/gen-art.mjs` plots four drawings
from small models of what they depict — a self-avoiding lattice walk, a stage
timeline with a load profile, a sequence alignment, a periodic biosignal —
using a fixed-seed PRNG so the output is byte-identical on every run. They
are used as CSS masks over `currentColor`, so one asset serves both themes.

## Things the site now demonstrates rather than claims

- an interactive console with completion, history and edit-distance
  suggestions (`js/terminal.js`)
- a tween engine that solves the CSS easing curve numerically so JS- and
  CSS-driven motion stay in step (`js/motion.js`)
- eight locales including RTL, with English snapshotted from the DOM so it
  cannot drift (`js/i18n.js`)

## The placeholder metric

§4 flagged the Terminal Network Toolkit's *"18× speedup"* as a structurally
correct sentence with an invented number. **It has been removed from both
pages** and replaced with an explicit statement that the figure is absent
because it has not been benchmarked. That is a stronger sentence than the
invented one, and it is true.

## Verified in this build

| | |
|---|---|
| Contrast | lowest pair 4.54:1 — AA in both themes |
| Horizontal overflow | none, 320 → 1440px, in all 8 locales |
| Markup | 0 unclosed tags, 0 mismatches, 0 duplicate ids across 3 pages |
| Labels / anchors | every input labelled; no dangling `#anchor` or `aria-controls` |
| Headings | no skipped levels, exactly one `h1` |
| JavaScript off | page renders complete, with true values, and the form still posts |
| CV print | 2 A4 pages, no orphaned sections |
| Page weight | ~70 KB gzipped for a first view (was 8.4 MB) |
| Behaviour | 35/35 automated end-to-end assertions, 0 console errors |

## Still outstanding

Unchanged from §8, and still in this order:

1. Confirm the admission pathway on anabin and uni-assist.
2. Certificate verification URLs.
3. Benchmark the toolkit, then publish it with the number.
4. The real IELTS band.
5. The official grade conversion, replacing the `≈1.0` estimate.
