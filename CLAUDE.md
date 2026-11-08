> **Read this file EVERY TIME before working on the user's prompt.**

# CLAUDE.md

Personal portfolio site for **Thang Huu Pham** (CS sophomore at Wentworth Institute of Technology, Class of 2029). Plain static HTML/CSS/JS with no framework, no build step, no package.json, and no tests.

- Repo: https://github.com/Thang-H-Pham/thangpham (branch `main`)
- Hosting: GitHub Pages, so **pushing to `main` deploys the live site**.

## Workflow rules (important)

- **Never deploy without approval.** Do not commit and push to `main` until the user has seen a local preview and said yes. Serve locally (e.g. `python -m http.server 8000` from the repo root), give the link, and wait.
- Only commit or push when the user asks.
- `.idea/` is untracked IntelliJ project config. Leave it out of commits.
- Content usually comes from the user's latest resume (`My_Resume.pdf`). When updating the site from the resume, keep the wording consistent across pages.

## File layout

```
index.html      Home: hero (intro, internship/co-op line, buttons to Work/About, hero-pic.png)
about.html      Bio + resume/LinkedIn buttons, Technical Skills grid, Certifications grid
work.html       Projects (project-card) + Experiences (exp-card)
contact.html    Contact info + EmailJS contact form
My_Resume.pdf   Linked from about.html ("View My Resume")
style/
  general.css   Shared by every page: :root tokens, reset, layout, navbar, buttons, glow, footer
  home.css      index.html only
  about.css     about.html only
  work.css      work.html only
  contact.css   contact.html only
js/
  nav.js        Hamburger menu: toggle, close on link click, close on Escape
  year.js       Fills <span id="year"> in the footer
  contact.js    Form validation + EmailJS send (contact page only)
img/
  hero-pic.png, About_Me.jpg, tic_tac_toe.png, portfolio-project.png
  skills/       Skill icons that FontAwesome lacks (typescript, python, tailwind, svelte, vite, dsa, responsive-UI)
  Certifications/  Certificate screenshots
```

## Page structure (shared across all 4 pages)

Every page uses the same skeleton. **When you change the header, footer, or `<head>`, change all four pages.**

- `<head>`: inline `<script>document.documentElement.classList.add('js');</script>` (CSS turns on the hamburger only when JS runs), FontAwesome kit `b588c504a9`, Google Font **Lexend**, then `general.css` followed by the page's own CSS.
- Header: `.navbar > .navbar-inner.container` holds the `.brand` link, the `.nav-toggle` button (3 spans) and `nav#site-nav.nav-links`. The current page's link has `aria-current="page"`.
- `<main>` (`class="container"` on the inner pages) starts with `.page-header` (h1 with `<span class="gold">`, `.underline`, intro p). Sections use `.section` with `.section-header` (h2 + `.underline`).
- Footer: `Copyright © <span id="year"></span> Thang Pham. All Rights Reserved.`
- Scripts at the end of body: `year.js`, `nav.js` (+ `contact.js` on the contact page).

## Design system (style/general.css)

- Mobile-first. Breakpoints: `min-width: 640px` and `min-width: 960px`. The nav becomes a hamburger below 960px.
- Tokens: `--navy-dark #011C40` (header/footer), `--navy #023859` (body bg), `--gold #FFC857` (accent), `--gold-soft`, `--gold-line`, `--text #fff`, `--text-muted #cce0f0`, `--card-bg`, `--card-border`, `--gutter clamp(20px,5vw,80px)`, `--section-space`, `--radius 16px`.
- `.container` is max 1200px with gutter padding.
- Buttons: `.btn` (gold outline pill), `.btn-primary` (filled gold), `.btn-small`, wrapped in `.btn-row`.
- `.gold` / `.highlight` give gold text. `.glow` gives the pulsing gold glow on photos (turned off under prefers-reduced-motion).
- Dark navy/gold theme only. There is no light mode.

## Page-specific components

- **about.html**: `.bio` (`.bio-photo`, `.bio-text` with `.name`, `.role`, `.bio-divider`). Skills: `.skills-grid > .skill-box` (h3 + `.skill-items > .skill-item` using either a FontAwesome `<i>` or an `<img src="./img/skills/...">` with `alt=""`, plus a `<p>` label). The categories are Languages, Web Development, Tools and Concepts. Certs: `.cert-grid > .cert-card` (a linked img + p).
- **work.html**: `.card-grid` holding `.project-card` (`.project-img`, `.project-body`, `.project-top` h3 + `.project-date`, `.project-stack`, `.project-desc` (one p per bullet), `.tags > span`, a GitHub `.btn.btn-small`). Experiences use `.exp-card` (`.exp-top` h3 + `.exp-badge`, `.exp-company`, `.exp-location`, `.exp-desc`, `ul.exp-list`, `.tags`). If an image is replaced but keeps its filename, bust the cache with a query string (e.g. `portfolio-project.png?v=2`).
- **contact.html**: `.contact-content` holding `.contact-left` (`.contact-info > .contact-item`) and `.contact-right` (`.form-group`s with inputs `#name #email #subject #message`, error spans `#<field>-error`, and the `#sendBtn` button).

## EmailJS (js/contact.js)

- Loaded from `cdn.jsdelivr.net/npm/@emailjs/browser@4`. Public key `8FL7phInRwQ0F_98V`, service `service_7vq2yoh`, template `template_5hz0ihm`. The public key is meant to sit in client code.
- Template params: `name, email, subject, messages` (note the plural, which the template expects), `time`.
- Validation adds `.show` to `.error` spans and `.input-error` to the fields. The button shows sending/sent/failed states and resets after 3 seconds.

## Current content snapshot (as of 2026-11)

- Home: "Computer Science Undergraduate". Seeking a Summer 2027 internship or co-op in Software Engineering & Web Development.
- About: GPA 3.95. Web Developer at HackBoston (Svelte, TypeScript, Tailwind). Hobbies: guitar, soccer, tennis. LinkedIn: https://www.linkedin.com/in/thanghpham/
- Certs: freeCodeCamp Responsive Web Design, freeCodeCamp Python, Anthropic AI Fluency (Skilljar).
- Projects: Tic Tac Toe (Java, https://github.com/Thang-H-Pham/Tic-Tac-Toe) and the Responsive Portfolio Website (this repo).
- Experience: HackBoston Web Developer (Nov 2025–Present), CodeWIT Code-A-Thon (Jan 2026).
- Contact: thanghpham1506@gmail.com, +1 (857) 233-3620, Malden, MA.
- Every file in `img/`, `style/` and `js/` is referenced by a page. Unused skill icons (`c.png`, `assembly.png`) were removed on 2026-11-08; they are recoverable from git history if C/Assembly get added to the skills grid.

## History

- `ea5e796`: split the site from a single page into 4 pages and rebuilt it mobile-first (it replaced a 783-line breakpoint stylesheet). Responsive checks used headless Chrome at 7 widths from 360px to 1920px.
- `1c52c26`: updated site content from the latest resume.

## Verifying changes

There are no tests. Serve locally and check the pages in a browser at phone (360px), tablet (~768px) and desktop (≥1280px) widths. Make sure nothing scrolls horizontally, the hamburger works below 960px, and the console shows no errors.
