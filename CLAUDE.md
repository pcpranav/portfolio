# Portfolio — reference for Claude

Pranav Chandra's personal site, live at `pranavchandra-portfolio.vercel.app`.
GitHub remote is `pcpranav/portfolio`.

## Shape

Pure static site — no build step, no dependencies, no `package.json`.

| Path                                                               | Role                                                            |
| ------------------------------------------------------------------ | --------------------------------------------------------------- |
| `index.html`                                                       | The whole page. Every section is hand-written HTML, incl. cards |
| `styles.css`                                                       | All styling; design tokens in `:root`                           |
| `script.js`                                                        | Nav, reveal-on-scroll, contact form                             |
| `resume/resume.html`                                               | Source for the resume PDF                                       |
| `resume/Pranav_Chandra_Resume.pdf`                                 | The served PDF — regenerate whenever the HTML changes           |
| `assets/`                                                          | Icons referenced by cards                                       |
| `og-image.png`, `linkedin-banner.png`, `robots.txt`, `sitemap.xml` | Social + SEO                                                    |

Open `index.html` in a browser to check changes; there is nothing to run.

## Project memory

Durable memory (design tokens, card conventions, resume workflow, incidents)
lives in `docs/claude-memory.md`, imported below so every session loads it.
Record new memories there.

@docs/claude-memory.md
