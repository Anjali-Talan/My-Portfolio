# Checklist — what Anjali needs to supply

Everything below is either **missing**, a **placeholder I wrote**, or a **factual
decision only she can make**. The site works and can be shared as-is; items are ordered
by how much they matter.

---

## A. Blockers — do these before sharing the link

### A1. Profile photo
`assets/img/` is currently **empty**.

- Save a headshot as **`assets/img/profile.jpg`** (portrait crop, ~800×950px or larger).
- Until then the hero shows a styled **"AT" monogram**. It looks deliberate, not broken —
  so this is a "should", not a "must".

### A2. Review the Turing bullets — **I wrote these, they are not from the résumé**
`index.html`, search **`Data Annotator`** (~line 380).

All three bullets are placeholder text I drafted describing generic data-annotation work.
Nothing about them came from Anjali. **Read, rewrite, or delete them.**

Also on that card: I wrote the location as **"Remote"** — confirm or change.

### A3. Confirm the Turing / Yes Securities date overlap
Turing is shown as **Dec 2025 – Feb 2026**, which sits *inside* Yes Securities
(**Sep 2025 – Present**). Shown as given. If Turing was part-time, freelance or contract,
label it so a recruiter doesn't read it as an error.

---

## B. Facts to confirm

### B1. Three résumé certifications are NOT on the page
The résumé names these; the LinkedIn list did not, so I left them off rather than guess:

- [ ] Microsoft Certified: Power BI Data Analyst Associate
- [ ] Tableau Desktop Specialist
- [ ] Microsoft Excel (Microsoft 365)

Note **"Tableau Desktop Specialist"** (Tableau's official cert) and **"Tableau Certified"**
(the Udemy course, which *is* on the page) are different credentials. Confirm which she holds.

### B2. "Open to relocation"
Appears twice (Contact section + footer). Taken from the reference site's wording, **not**
from the résumé. Confirm it's true.

### B3. Project case-study write-ups
The 7 role-based project cards were written by me from résumé bullet points. Every metric
is hers; the framing ("The brief", "What I built", "Impact") is mine. Worth a read-through
for anything overstated. The 8th, *Macroeconomic Indicators*, is her real résumé project —
I labelled it **"Research Project"**; change if it was a capstone/dissertation.

### B4. Missing education
Only the **PGDM (NDIM)** is listed, because that's all the résumé has. Add her
bachelor's degree if she wants it shown.

---

## C. Credential links — 8 buttons currently point at `#`

Clicking one shows *"Credential link not added yet"*. To fix, find the card in
`index.html` and replace `href="#"`:

```html
<a class="cert__link" href="https://www.linkedin.com/…" target="_blank" rel="noopener" data-credential>
```

- [ ] Career Essentials in Data Analysis — Microsoft — Aug 2026
- [ ] Introduction to Career Skills in Data Analytics (2022) — LinkedIn — Aug 2026
- [ ] Data Visualization for Data Analysts and Analytics — LinkedIn — Aug 2026
- [ ] Data Analytics for Business Professionals — LinkedIn — Aug 2026
- [ ] Cybersecurity Analyst Job Simulation — Forage — Dec 2025
- [ ] Data Visualisation: Empowering Business (TATA) — Forage — Dec 2025
- [ ] Learning Data Analytics: 2 — LinkedIn — Sep 2025
- [ ] Learning Data Analytics: 1 — LinkedIn — Aug 2025

**5 cards have no button at all**, because the list gave no credential link for them.
Add one if a link exists: Google Data Analytics Professional Certificate, Tableau (Udemy),
NISM (SEBI), MySQL (Great Learning), Digital Marketing (Google).

---

## D. Optional — nice to have

- [ ] **GitHub links on projects.** No project card links to a repo or dashboard. If any
      work is public, add a link — it's the single biggest credibility upgrade for an
      analyst portfolio.
- [ ] **Absolute `og:image` URL.** `index.html` line 16 uses a relative path. Once hosted,
      change to the full URL (e.g. `https://anjali-talan.github.io/portfolio/assets/img/profile.jpg`)
      so link previews render on LinkedIn/WhatsApp.
- [ ] **Contact form backend.** The form opens the visitor's mail app. Fine for a
      portfolio; swap in Formspree/Netlify Forms if she'd rather receive submissions.
- [ ] **Keep the résumé PDF current.** `assets/Anjali_Talan_Resume.pdf` powers the download
      button — replace the file when the résumé is updated (keep the same filename).
- [ ] **Custom domain**, if wanted, instead of the default host subdomain.

---

## Things deliberately left alone

- **Certification issuer badges** (Google/Microsoft/LinkedIn) stay in their own brand
  colours, not the site green — they identify the issuer. Say the word to neutralise them.
- **"Immediate Joiner" dot** is a semantic availability green (`#16a34a`), separate from
  the brand green.
