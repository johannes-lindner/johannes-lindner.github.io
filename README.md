# Updating the site content

The site is built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages. Most content lives as **markdown files with front matter** — you never need to touch HTML to add a blog post, research project, teaching entry, or featured work item. Write the file, commit, push to `main`, and GitHub Pages rebuilds the site automatically.

## Adding a blog post

Create a file in `_posts/` named `YYYY-MM-DD-slug.md` (the date is required by Jekyll and controls sort order; it does not have to be the exact publish day):

```markdown
---
title: My Post Title
category: Publication
description: One or two sentences shown on the blog listing card.
duration: March 2026
image: /img/my-photo.jpg   # optional
links:                      # optional, renders a "Links" sidebar box
  - label: Read Article
    url: https://example.com/paper
tags:                       # optional, renders a "Tags" sidebar box
  - Publication
  - Presentation
---
The body of the post, written in plain markdown. Use `###` for subheadings,
`- item` for bullet lists, `**bold**` for emphasis, etc.
```

## Adding a research project

Create a file in `_research/`, e.g. `_research/my-project.md`:

```markdown
---
title: My Research Project
category: Traffic Simulation
description: One or two sentences shown on the Funded Research listing card.
duration: 2024 - Ongoing
order: 7                    # controls position in the listing; use the next free number
info:                        # optional, renders a "Project Information" sidebar box
  - label: Duration
    value: 2024 - Ongoing
  - label: Status
    value: Active
related:                    # optional, renders a "Related" sidebar box with links
  - label: Some Other Project
    url: /research/some-other-project/
---
The body, written in markdown. Use `###` for subheadings as needed.
```

## Adding a teaching entry

Same idea, in `_teaching/`:

```markdown
---
title: Course Name
category: Lecture            # e.g. Lecture, Seminar, Thesis Supervision
description: One or two sentences shown on the Teaching listing card.
duration: Winter 2026
order: 4
---
Details about the course.
```

## Adding a Featured Work project (homepage)

Same idea, in `_projects/`:

```markdown
---
title: My Tool
category: Research
description: One or two sentences shown on the homepage card.
status: Active                # short label shown in the card footer, e.g. Active, Ongoing, Open Source
image: /img/work-7.jpg        # required, put the image in img/ first
order: 7
links:                        # optional
  - label: Repository
    url: https://github.com/you/project
tags: [ ]                     # optional
---
The body, written in markdown.
```

## Updating the Selected Publications list (homepage)

Unlike the other content types, publications live in a single BibTeX file: `bib/publications.bib`. Add, edit, or remove a `@article`/`@misc`/`@inproceedings` entry there — no markdown, no front matter. A small script (`js/publications.js`) fetches that file in the visitor's browser and renders each entry in APA style automatically.

```bibtex
@article{lindner2026overtaking,
  author  = {Lindner, J. and Böckle, M.},
  title   = {Evaluating cyclists' overtaking behavior ...},
  journal = {IEEE Open Journal of Intelligent Transportation Systems},
  year    = {2026},
  volume  = {7},
  pages   = {1729-1737},
  doi     = {10.1109/OJITS.2026.3709485}
}
```

- Supported fields: `author` (space-` and `-separated, `Last, First` or `Last, F.` either works — the formatter abbreviates given names to initials for you), `title`, `journal` or `booktitle`, `year`, `volume`, `number`/`issue`, `pages`, `doi`, `note` (shown in brackets — use this for e.g. `under review` on unpublished work instead of `journal`/`volume`/`pages`).
- Entries render in the order they appear in the file — put newest/most important first.
- `doi` is turned into a clickable `https://doi.org/<doi>` link automatically.
- This is intentionally the one exception to "everything is a Jekyll collection": BibTeX is the natural format reference managers (Zotero, Google Scholar's "Export BibTeX") already produce, so you can paste an exported entry in directly rather than re-typing it into front matter.

## Adding an item to the full Publications page (`/publications.html`)

The homepage's Selected Publications widget (above) is rendered client-side by JavaScript, which most AI/search crawlers don't execute — they'd see an empty "Loading publications…" placeholder and never find your papers. `/publications.html` exists to fix that: it's a fully static, server-rendered page, one URL per paper, each with a short plain-language summary and a `ScholarlyArticle` JSON-LD block, specifically so AI agents and search engines can read, cite, and summarize your work.

This is a separate Jekyll collection, `_publications/`, so it's maintained independently of `bib/publications.bib` — adding a paper here does **not** add it to the homepage widget, and vice versa. Yes, that means pasting the BibTeX twice if you want a paper in both places; that's the tradeoff for the homepage staying pure client-side BibTeX while this page stays static HTML a crawler can read without running JS.

Create a file in `_publications/`, named after the BibTeX key (e.g. `_publications/lindner2026overtaking.md`):

```markdown
---
title: "Evaluating cyclists' overtaking behavior when interacting with HMIs on autonomous buses in varying urban infrastructure settings: A bicycle simulator study"
authors:
  - Lindner, J.
  - Böckle, M.
  - Pechinger, M.
  - Bogenberger, K.
year: 2026
date: 2026-01-01   # Jan 1 of the publication year — see note below, do not omit
venue: "IEEE Open Journal of Intelligent Transportation Systems"
volume: 7
number:            # optional
pages: "1729-1737"
doi: "10.1109/OJITS.2026.3709485"
note:              # optional, e.g. "under review" for a @misc/preprint entry
category:
  - Journal Article   # or: Conference Paper, Preprint — becomes a filter button
order: 1              # lower numbers can be used to break ties within a year
summary: >
  2-4 sentences, written for both human visitors and AI crawlers: what
  question the paper addresses, the method used, and the key finding. See
  "Writing the summary with an AI model" below.
bibtex: |
  @article{lindner2026overtaking,
    author  = {Lindner, J. and Böckle, M. and Pechinger, M. and Bogenberger, K.},
    title   = {Evaluating cyclists' overtaking behavior when interacting with hmis on autonomous buses in varying urban infrastructure settings: A bicycle simulator study},
    journal = {IEEE Open Journal of Intelligent Transportation Systems},
    year    = {2026},
    volume  = {7},
    pages   = {1729-1737},
    doi     = {10.1109/OJITS.2026.3709485}
  }
---
```

That's it — no need to touch `publications.html` itself; it lists every item in `_publications/` automatically, sorted newest-year-first.

Field notes:
- `authors` is a YAML list, not a formatted string — one name per line. It's used both for the on-page byline and to build a proper multi-author list in the JSON-LD.
- `date` should always be set to `<year>-01-01` (we only ever know the year, not the exact day). **Don't omit it**: Jekyll silently defaults a document's `date` to the moment of the build if front matter doesn't set one, which would make the page's structured data claim it was "published today" and have that date change on every single rebuild — actively misleading to any AI/search system reading it.
- `category` doubles as the tag-filter buttons on `/publications.html` — reuse an existing category where it fits rather than inventing near-duplicates.
- `doi` is turned into a clickable `https://doi.org/<doi>` link and into the JSON-LD `identifier`/`sameAs` fields automatically.
- Leave `summary` as a clear placeholder (e.g. `[Add summary here]`) if you don't have one yet, rather than leaving it out — an empty summary just means that page skips the "Summary" section and the JSON-LD `description` field, which is most of the point of this page.

### Writing the summary with an AI model

`scripts/publication-summary-prompt.md` (not published to the live site) holds a ready-to-use prompt for this. Workflow:

1. Open `scripts/publication-summary-prompt.md` and copy the prompt block.
2. Paste it into an AI model (Claude, ChatGPT, Gemini, ...), then attach/paste the paper's full text or abstract plus its BibTeX entry, as the prompt asks for.
3. Do this **one paper at a time** — don't batch several papers into one request, it dilutes the model's attention on each one.
4. The prompt is written to produce a factual, 2-4 sentence, 40-70 word summary grounded only in what you gave it (problem → method → finding, no invented claims, no marketing language), formatted to paste directly after `summary: >`.
5. Paste the result into the file's `summary:` field, then rebuild locally and check `_site/publications/<slug>/index.html` before pushing.

## Notes

- `category` on any item automatically becomes a filter button on that listing page — no need to register it anywhere.
- `order` controls display order for research/teaching/projects (lower numbers first); blog posts sort by their filename date automatically.
- All the optional sidebar fields (`links`, `info`, `related`, `tags`) only render if you include them — omit what you don't need.
- To preview locally before pushing: install [Ruby](https://rubyinstaller.org/) once, then from the repo root run `bundle install` followed by `bundle exec jekyll serve`, and open `http://localhost:4000`.
- Pairing with [Obsidian](https://obsidian.md/): point a vault at (or symlink into) `_research/`, `_teaching/`, `_projects/`, and `_posts/`, and use the community "Obsidian Git" plugin to auto-commit and push on save.

---

# Technical documentation

## How the site works

This is a static site generated by [Jekyll](https://jekyllrb.com/) and served by GitHub Pages. There is no build server or CI to configure: GitHub Pages runs Jekyll itself whenever `main` is pushed, using the exact gem versions declared by the `github-pages` gem in `Gemfile` (currently Jekyll 3.10 — GitHub Pages does not support Jekyll 4). `_config.yml` holds all site-wide settings (title, collections, permalinks, front-matter defaults).

## Directory structure

```
_config.yml       Site configuration: collections, permalinks, front-matter defaults
Gemfile            Pins the same gem set GitHub Pages builds with, for local preview
_layouts/          Page skeletons (see "Templating" below)
_includes/         Reusable HTML fragments pulled into layouts via {% include %}
_posts/            Blog entries (built-in Jekyll collection)
_research/         Funded Research entries (custom collection)
_teaching/         Teaching entries (custom collection)
_projects/         Featured Work entries, shown on the homepage (custom collection)
_publications/     Publications entries for /publications.html (custom collection, see below)
bib/publications.bib   Separate, single-file BibTeX source for the homepage's JS-rendered widget
index.html         Homepage (hero, about, Featured Work loop) — has its own layout: default
blog.html          Blog listing page — layout: listing
research-projects.html   Funded Research listing page — layout: listing
teaching.html      Teaching listing page — layout: listing
publications.html  Full Publications listing page — layout: listing
impressum.html     Static legal page — layout: page, noindex'd (see "Impressum" note below)
robots.txt         Crawler rules (Jekyll-processed for the {{ site.url }} sitemap link)
scripts/           Repo-only tooling/docs, excluded from the Jekyll build (e.g. the AI summary prompt)
css/, js/, lib/, img/   Original DevFolio template assets, unchanged
_site/             Build output (git-ignored, regenerated on every build)
```

## Templating architecture

Every page declares a `layout` in its YAML front matter; layouts can themselves declare a parent `layout`, so they chain:

- **`default`** — the outermost shell: `<html>`, `{% include head.html %}`, `{% include nav.html %}`, `{{ content }}`, `{% include footer.html %}`, `{% include scripts.html %}`. All other layouts extend this.
- **`page`** — wraps `{{ content }}` in the hero banner (`page.title`) + a single `.post-box`. Used for simple static pages (Impressum).
- **`listing`** — renders the hero, builds the tag-filter buttons dynamically from `{{ site[page.collection] | map: "category" | uniq | sort }}`, then loops the collection through `_includes/card.html`. Used for `blog.html`, `research-projects.html`, `teaching.html`.
- **`entry`** — the per-item detail page for every post/research/teaching/project entry. Renders the hero, byline (author/category/duration), the markdown body, and up to four *optional* sidebar widgets (`links`, `info`, `related`, `tags`) — each renders only if that front-matter key is present on the item. This is what makes one generic layout cover very different-looking detail pages (a blog post with a "Read Article" link vs. a research project with a "Project Information" table).
- **`publication`** — the per-item detail page for `_publications/`. Separate from `entry` because its byline/metadata shape (authors list, venue, year, DOI) doesn't fit the generic layout, and because it renders a bespoke `ScholarlyArticle` JSON-LD block (author array, journal, DOI, `summary` as `description`) rather than relying on jekyll-seo-tag's generic one. `listing.html` also special-cases `page.collection == 'publications'` to use `_includes/publication-card.html` instead of `_includes/card.html`, and to sort by `year` descending instead of `order`.

`index.html` does not use `page`/`listing` — its hero and About section are static markup unique to the homepage, and only the Featured Work section is a Liquid loop (via `_includes/project-card.html`) over `site.projects`.

All asset/page links in the includes use Jekyll's `relative_url` filter (e.g. `{{ '/css/style.css' | relative_url }}`) rather than hand-written `../` paths, so nesting depth can never desync from the actual link depth again.

## Integrations / tooling added during the Jekyll migration

- **Ruby 3.3 + Jekyll**, installed locally (via winget) purely for local preview/testing — not required by GitHub Pages itself, which builds server-side.
- **`github-pages` gem** in the `Gemfile`, so `bundle exec jekyll serve` locally uses the identical Jekyll/plugin versions GitHub's build servers use, avoiding "works locally, breaks on Pages" surprises.
- No GitHub Actions workflow exists or is needed — this repo uses GitHub's legacy "build from branch" Pages pipeline.

## Front-matter schema reference

See the "Updating the site content" section above for the fields each collection type uses (`title`, `category`, `description`, `duration`/`date`, `order`, and the optional `links`/`info`/`related`/`tags`/`image`/`status` arrays).

## Original template

Thanks for downloading this theme!

Theme Name: DevFolio
Theme URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
Author: BootstrapMade.com
Author URL: https://bootstrapmade.com
