# Project context for AI agents

This is Johannes Lindner's personal academic website (`johannes-lindner.github.io`) — a static Jekyll site hosted on GitHub Pages, built from the BootstrapMade "DevFolio" template. Johannes is a doctoral researcher at TUM working on traffic simulation, pedestrian modeling, and automated vehicles.

Read `README.md` first — it documents the content-editing workflow and the technical architecture (layouts, includes, collections). This file adds things specifically useful for an AI agent picking the project back up.

## Local dev environment

- Ruby + Jekyll are required for local preview but are **not** installed by default on a fresh clone/machine. On this project's Windows dev machine they were installed via `winget install RubyInstallerTeam.RubyWithDevKit.3.3`, landing at `C:\Ruby33-x64`. If `ruby`/`bundle`/`jekyll` aren't on `PATH` in a new shell, prepend it: `export PATH="/c/Ruby33-x64/bin:$PATH"` (bash) — don't reinstall Ruby without checking whether it's already there.
- Build/preview: `bundle install` once, then `bundle exec jekyll build` or `bundle exec jekyll serve` (serves at `http://localhost:4000`). Always use `bundle exec`, not a bare `jekyll` — the Gemfile pins the exact Jekyll version (3.10, via the `github-pages` gem) that GitHub Pages actually builds with, which is **older than Jekyll 4** — don't rely on Jekyll 4-only features.
- There is no CI. GitHub Pages builds directly from `main` on push. Breaking the build breaks the live site with no staging step, so **build and visually verify locally before pushing**, especially after touching `_config.yml`, layouts, or includes.

## Verification pattern used in this project

Past sessions verified changes with headless-browser screenshots (Playwright, installed ad-hoc into the scratchpad dir — not a repo dependency) rather than trusting the diff alone, especially for layout/CSS/scroll-behavior changes and after Jekyll build changes. A `page.on('response', ...)` check for 4xx/5xx was used to catch broken asset/link paths across every generated page. Prefer this over guessing when a change touches rendering, navigation, or generated URLs.

## Jekyll gotchas hit during the migration (don't re-discover these the hard way)

- **Pretty-URL trap**: setting a top-level `permalink:` in `_config.yml` (used here for blog posts, `/blog/:title/`) can cause plain `Page` objects (not just posts) to also get pretty-ified into `/name/index.html` instead of `/name.html`. Root pages (`index.html`, `blog.html`, `research-projects.html`, `teaching.html`, `impressum.html`) each carry an **explicit `permalink:`** in their own front matter for exactly this reason. If you add a new top-level page, give it an explicit `permalink:` too and check `_site/` after building.
- **`page.tags` is never falsy**: Jekyll auto-populates `tags` as `[]` on every document (it's a reserved front-matter key), and empty arrays are truthy in Liquid. `{% if page.tags %}` is therefore always true. Use `{% if page.tags.size > 0 %}`. This does not apply to non-reserved keys like `links`/`info`/`related`, which are `nil` (falsy) when absent.
- **`main.js` script-loading footgun**: `$('.counter').counterUp(...)` throws if the counterup plugin script isn't loaded on the current page, which silently aborts every *later* handler in the same `$(function(){...})` block — including the scroll listener that gives the nav bar its opaque background. This is now guarded (`if ($.fn.counterUp)`), and `_includes/scripts.html` loads the full script set on every page so this class of bug can't recur — don't start conditionally trimming scripts per-page without keeping that guard.

## Content state (what's real vs. placeholder)

Real, user-authored content: the `sumonity` project (`_projects/sumonity.md`), the `pedestrian-modeling` research entry (`_research/pedestrian-modeling.md`), and the `sumo-user-conference-2025` post.

Everything else was migrated as a structural placeholder (bracketed text like `[Add more detail about this project here.]`) because it never had real content — either the original card linked to a dead URL, or the user explicitly asked for placeholders rather than invented content (see Teaching page). **Do not invent realistic-sounding content for these** (course names, dates, research descriptions) — leave the bracketed placeholders for Johannes to fill in, unless he explicitly provides the real content in the conversation.

Placeholder items: `_projects/{traffic-simulation,automated-vehicles,driving-simulation,digital-twins,standardization}.md`, `_research/{sumonity-development,hitl-simulation,iso-standardization,automated-bus-research,digital-twins}.md`, `_teaching/{lecture,seminar,thesis-supervision}.md`, `_posts/{2025-01-15-heart-2025,2024-10-01-lecture-kickoff,2024-08-01-travel-ideas}.md`.

## Known pre-existing content quirks (left as-is, not bugs to silently "fix")

- The `sumo-user-conference-2025` post body says the conference was "12 May to 14," while the card originally displayed "March 2025." This inconsistency predates the migration and was preserved rather than guessed at — ask Johannes which is correct rather than picking one.
- The post titled "See more ideas about Travel" (`_posts/2024-08-01-travel-ideas.md`) has odd, generic-sounding wording — likely leftover placeholder text from before this session. Preserved verbatim; flag it to Johannes rather than rewording it unasked.
