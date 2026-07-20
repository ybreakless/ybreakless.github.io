# 🕹️ Retro Portfolio OS - Mohammad "Mo" HajNajafi (ybreakless)

A fully responsive, single-page personal portfolio website built with a **retro/vintage computing aesthetic** (inspired by old CRT monitors, DOS terminals, early GeoCities, pixel art, and arcade games). Hosted on **GitHub Pages** as a static site (HTML5 + CSS3 + Vanilla JavaScript only — NO frameworks, NO build tools, NO npm).

---

## 👤 Personal Info
- **Name:** Mohammad "Mo" HajNajafi
- **Alias / GitHub Username:** `ybreakless`
- **Tagline:** Aspiring Software Engineer | Future CS Student in Germany 🇩🇪
- **Location:** Dubai, UAE
- **Email:** `ybreakless@gmail.com`
- **GitHub:** [https://github.com/ybreakless](https://github.com/ybreakless)

---

## 🎨 Design & Features
1. **CRT Terminal Aesthetic:** Dark mode background with scanline overlays, phosphor text glow, and subtle screen flicker keyframes.
2. **Boot Screen:** Fake terminal boot sequence (`SYSTEM BOOTING...`, memory check, loading modules) on initial load with a [SKIP] button.
3. **Interactive Terminal Widget:** embedded DOS terminal widget where visitors can type commands (`help`, `about`, `skills`, `projects`, `contact`, `clear`, `matrix`, `sudo hire`, `easteregg`).
4. **Retro Sound Effects (Web Audio API):** Zero external audio assets needed; procedural retro beeps and clicks on buttons and typing.
5. **Color Themes:** Switch between Classic Green, Amber, and Cyan CRT phosphor modes.
6. **Easter Eggs:** Konami code (`↑↑↓↓←→←→BA`) unlocks matrix digital rain and arcade celebration.
7. **Responsive & Print-Friendly:** Optimized for mobile phones, tablets, and desktop displays with print-friendly layout.

---

## 📁 File Structure
```
ybreakless.github.io/
├── index.html          # Main single-page portfolio
├── resume.html         # Printable CV / Resume page
├── 404.html            # Retro 404 error page
├── css/
│   └── style.css       # All CRT and retro styles
├── js/
│   └── main.js         # Interactive terminal, audio, boot sequence, animations
├── assets/
│   └── images/
│       ├── profile.png # Pixel art avatar
│       ├── project1.png# Project 1 screenshot
│       ├── project2.png# Project 2 screenshot
│       └── project3.png# Project 3 screenshot
└── README.md           # Repository documentation
```

---

## 🚀 GitHub Pages Setup Instructions

1. **Repository Name:** Ensure your repository is named `ybreakless.github.io` (or your exact GitHub username followed by `.github.io`).
2. **Deploy Source:** 
   - Go to your GitHub repository **Settings** > **Pages**.
   - Under **Build and deployment**, select **Source** as `Deploy from a branch`.
   - Select branch `main` (or `master` / working branch) and folder `/ (root)`.
3. **Live URL:** Once deployed, your portfolio will be accessible at:
   `https://ybreakless.github.io`
