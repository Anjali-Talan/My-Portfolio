# Anjali Talan — Portfolio

A single-page portfolio site. Plain HTML, CSS and JavaScript — **no build step, no
dependencies, no framework**. Drop the folder on any static host and it works.

```
Anjali-Talan-Portfolio/
├── index.html
├── README.md
└── assets/
    ├── Anjali_Talan_Resume.pdf   ← the "Résumé" download button
    ├── css/style.css
    ├── js/main.js
    └── img/                      ← put profile.jpg here
```

---

## 1. Open it locally

Double-click `index.html`. That's it — everything works from `file://`.

---

## 2. Host it

Any static host will serve this folder as-is.

**GitHub Pages** — the same setup the reference site uses:

```bash
git init && git add . && git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/Anjali-Talan/portfolio.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: `main` / root**. Live in a minute at
`https://anjali-talan.github.io/portfolio/`.

**Netlify / Vercel / Cloudflare Pages** — drag the folder onto their dashboard. No build
command, no output directory.

**Any web host** — upload the folder contents by FTP. No server-side requirements.

---

## 3. Things to finish before sharing it

### a. Add the photo — **needed**

Save a headshot as `assets/img/profile.jpg` (portrait crop, roughly 800×950 or larger).
Until then, the hero shows a styled **"AT" monogram** — it looks intentional, not broken,
so the page is safe to share either way.

### b. Review the Turing bullets — **please read**

The three bullets under **Data Annotator · Turing** are **placeholders I drafted**, not
information from the résumé. They describe standard data-annotation work in neutral terms.
**Read them and edit or delete them before publishing.** In `index.html`, search for
`Data Annotator`.

Note the dates overlap Yes Securities (Sep 2025 – Present vs. Dec 2025 – Feb 2026). That is
shown as-is. If the Turing role was part-time, freelance or contract, say so on the card.

### c. Add credential links — optional

Certifications with a **"Show credential"** button currently point at `#`, and clicking one
shows a small "Credential link not added yet" toast. To wire one up, find the card in
`index.html` and replace the `href`:

```html
<a class="cert__link" href="https://www.linkedin.com/…" target="_blank" rel="noopener" data-credential>
```

Four certificates have no button because the list supplied no credential link: Tableau
(Udemy), NISM (SEBI), MySQL (Great Learning), Digital Marketing (Google).

### d. One thing worth deciding

The résumé's certifications line names three credentials that were **not** in the LinkedIn
list, so they are **not on the page**:

- Microsoft Certified: Power BI Data Analyst Associate
- Tableau Desktop Specialist
- Microsoft Excel (Microsoft 365)

"Tableau Desktop Specialist" (Tableau's official cert) and "Tableau Certified" (Udemy
course) are different things — the page shows the Udemy one, as listed. Add the others if
they're genuine.

---

## 4. Editing content

Everything lives in `index.html`, in plain sections you can search for:

| Section | Find |
|---|---|
| Hero headline / intro | `class="hero__copy"` |
| Stat counters | `class="stat__num"` — edit **both** the visible number and `data-count` |
| About + quick facts | `id="about"` |
| Skills | `id="skills"` |
| Experience timeline | `id="experience"` |
| Projects | `id="projects"` |
| Certifications | `id="certifications"` |
| Education | `id="education"` |
| Contact + footer | `id="contact"` |

**Adding a project.** Copy an existing `<article class="card--project">` block. Three things
matter:

- `data-cat="powerbi sql excel"` — space-separated filter tags. Must match a filter button's
  `data-filter` value (`powerbi`, `sql`, `excel`, `stats`).
- `<use href="#t-line"/>` — the thumbnail. Available: `#t-bars`, `#t-line`, `#t-donut`,
  `#t-scatter`, `#t-table`, `#t-flow`.
- `<template class="card__detail">` — the case-study text shown in the popup.

**Adding a certification.** Copy an `<article class="card--cert">`. Set
`data-issuer="google"` to match a filter button (`google`, `microsoft`, `linkedin`,
`forage`, `other`), and update the `13` count on the "All" chip.

**Colours.** All of them are CSS variables at the top of `assets/css/style.css`, under
`:root` (light) and `html[data-theme="dark"]` (dark). Change `--accent` to re-tint the whole
site.

---

## 5. What the page does

- **Light / dark mode** — toggle in the header, remembers the choice, follows the OS until
  a choice is made.
- **Filterable projects** and **filterable certifications**.
- **Case-study popups** — click any project card. Escape closes it; focus is trapped inside
  while open.
- **Animated stat counters** on scroll. The real numbers are in the HTML, so they stay
  correct even if JavaScript is blocked.
- **Scroll-reveal** animations, scroll progress bar, active-section nav highlighting.
- **Copy-to-clipboard** on the email and phone in the Contact section.
- **Contact form** — validates, then opens the visitor's mail app pre-filled. No backend, so
  nothing to host or pay for. To use a real form service instead, replace the submit handler
  at the bottom of `assets/js/main.js`.

### Accessibility and performance notes

- Respects `prefers-reduced-motion` — all animation is disabled when the OS asks for it.
- Keyboard navigable throughout; skip-link, visible focus rings, labelled icon buttons.
- Contrast meets WCAG AA in both themes.
- Print stylesheet included — `Ctrl/Cmd + P` gives a clean document.
- Two network requests beyond the page itself (Google Fonts, one stylesheet). Everything
  else — icons, chart thumbnails, the favicon — is inline SVG. No jQuery, Bootstrap or
  animation libraries.
- SEO: Open Graph tags and JSON-LD `Person` structured data are in the `<head>`.

Tested in Chrome at 375 / 768 / 1024 / 1440 px, in both themes.
