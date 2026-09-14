# Portfolio — Claude memory

Durable project memory for Claude Code sessions in this repo. Created
2026-09-14; there was no `~/.claude` auto-memory for this project, so this
starts fresh. Entries are point-in-time notes — check the code before relying
on a detail.

## Index

- [Content lives in index.html](#content-lives-in-indexhtml) — no data file, no framework; project cards are hand-written HTML
- [Design tokens](#design-tokens) — `#0a0f14` ground, teal `#00e5c7` accent, Inter / JetBrains Mono / Bebas Neue
- [Deploy](#deploy) — Vercel serves the repo as-is; no build step, so `main` IS production
- [Store links on project cards](#store-links-on-project-cards) — official Play glyph, never redrawn; Nuo's listing added 2026-09-14
- [The resume is two files](#the-resume-is-two-files) — edit `resume.html`, then regenerate the PDF, and keep it to one page
- [Incident: index.html missing locally](#incident-indexhtml-missing-locally) — tracked in git but deleted from the working tree

## Content lives in index.html

_Updated 2026-09-14._

There is no data file and no framework. Sections (`#about`, `#experience`,
`#skills`, `#projects`, `#education`, `#contact`) are hand-written HTML, and
every project is an `<article class="proj-card">` — `featured` adds the amber
border and the star badge.

A card is: `.proj-badge`, `.proj-title`, `.proj-desc`, `.proj-tech` (a
`.tech-tag` span per item, `os` variant for open-source), then `.proj-links`
with one `.proj-link` per destination. Link labels follow an emoji-then-text
pattern (`🚀 Live Site`, `🐙 GitHub`) — the sole exception is the Play link,
which uses real artwork instead of an emoji (see below).

**How to apply:** adding a project means copying an `<article>` block. Keep
`.tech-tag` values to real stack names.

## Design tokens

_Updated 2026-09-14._

All in `:root` in `styles.css` — use the variables, never raw hex:

- Ground `--bg: #0a0f14`, alt `--bg2: #0f151c`, surfaces `--card` / `--glass` (white at 4% / 3%)
- Accent `--blue: #00e5c7` (teal, despite the name) with `--blue-dim` for tinted backgrounds; `--amber: #F59E0B` marks "Personal · Featured"
- Text `--text: #e6f1f5`, `--sub: #9aa5b1`, `--muted: #6b7785`
- Type: `--font` Inter (body), `--mono` JetBrains Mono (tags, labels), `--display` Bebas Neue (headings)
- Radii `--r-sm/md/lg` = 8/12/16px

Note: the teal accent is saturated enough to defeat naive "find the coloured
pixels" image checks on screenshots — filter on a hue the site never uses when
locating something visually.

## Deploy

_Updated 2026-09-14._

Vercel serves this repo at `pranavchandra-portfolio.vercel.app`. No build step
and no config file, so whatever is on `main` is live — a push is the deploy.
(Inferred from the setup and history, not read off a Vercel dashboard.)

## Store links on project cards

_Updated 2026-09-14._

Nuo shipped to Google Play on 2026-09-14, so its card gained a
`Google Play` link before `Live Site`, and its description now ends "...ships
as an Android app on Google Play."

The link uses the four-colour Play glyph at 14px
(`assets/google-play-icon.png`) instead of an emoji. That artwork is Google's
own, lifted from the official "Get it on Google Play" badge and
un-premultiplied against the badge's black pill so it carries real
transparency — **never recolour or redraw it**, and don't swap in a lookalike
emoji. The full badge (the affordance Google's brand guidelines actually
sanction, 40px minimum) lives in the garage repo at
`~/Desktop/mini-projects/pranavs-garage/assets/google-play-badge.png` if a
by-the-book version is ever needed. The compact glyph was chosen so the link
sits inside the existing pill row instead of towering over it.

Nuo's own project memory:
`~/Desktop/mini-projects/notes-app/docs/claude-memory.md`.

## The resume is two files

_Updated 2026-09-14._

`resume/resume.html` is the source; `resume/Pranav_Chandra_Resume.pdf` is what
visitors download. **They drift if only one is edited.** Git history shows the
PDF being regenerated alongside HTML edits ("Add Nuo to resume projects and
regenerate PDF"), and several commits exist purely to keep it to **one page**
("Condense resume to one page", "Restore professional projects as compact
one-liners, keep one page") plus ATS-friendliness (plain hyphens in date
ranges).

**How to apply:** after editing `resume.html`, regenerate the PDF and verify
the page count is still 1 before committing:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=resume/Pranav_Chandra_Resume.pdf resume/resume.html
mdls -name kMDItemNumberOfPages resume/Pranav_Chandra_Resume.pdf
```

Still open as of 2026-09-14: the resume lists Nuo with the `nuo-app.vercel.app`
URL and does NOT mention the Play listing. Left alone deliberately — a one-page
resume is tightly tuned and Pranav had not asked for it.

## Incident: index.html missing locally

_Updated 2026-09-14._

On 2026-09-14 `index.html` was tracked in git but **deleted from the working
tree** (`git status` showed ` D index.html`) — the same thing had happened in
the garage repo, so it looks like a habit or a stray cleanup rather than a
one-off. The live site was unaffected because Vercel builds from the remote.
Recovered with `git restore index.html`.

**How to apply:** run `git status` before editing. A missing `index.html` here
is a stale local delete — restore it rather than reconstructing the page.
