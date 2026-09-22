# Prompt: generate a publication summary for the AI-crawlable publications page

Use this with any capable AI model (Claude, ChatGPT, Gemini, ...). Paste the
prompt below, then attach or paste the full paper (PDF or text) — or, if you
don't have the full text handy, the paper's abstract plus its BibTeX entry.
Drop the model's output straight into the `summary:` field of the matching
file in `_publications/*.md`.

Generate one summary at a time so each one gets full attention; don't batch
all five papers into a single request.

---

## Prompt to paste

You are writing a short, factual summary of an academic paper for two
audiences at once: (1) human visitors skimming a researcher's publications
page, and (2) AI search/answer engines and crawlers (e.g. ChatGPT, Claude,
Perplexity, Google AI Overviews) that will read this text verbatim to decide
whether to cite or recommend this work, and may quote it directly.

I will give you the full text (or abstract) of a paper and its BibTeX entry.
Write a summary with these constraints:

- 2-4 sentences, 40-70 words total.
- Cover, in order: (1) the problem or question the paper addresses, (2) the
  method or approach used (e.g. study design, dataset, simulation, model),
  and (3) the key finding or contribution — stated as a concrete result, not
  a vague claim like "the results are discussed."
- Third person, plain language. Spell out acronyms on first use (e.g. "human
  factors interfaces (HMIs)"). No marketing language ("groundbreaking",
  "novel", "cutting-edge") and no citation-style phrasing ("this paper
  presents..." — just state what was done and found).
- Every claim must be directly supported by the source text I give you. Do
  not add context, comparisons, or claims that aren't in the paper — if the
  method or a specific number isn't stated in what I gave you, leave it out
  rather than guessing.
- Output only the summary text itself — no heading, no quotation marks, no
  "Summary:" prefix, so I can paste it directly after `summary: >` in a YAML
  file.

Here is the paper (or its abstract) and BibTeX entry:

[PASTE PAPER TEXT / ABSTRACT AND BIBTEX HERE]

---

## After generating

1. Open the matching file in `_publications/` (filename matches the BibTeX
   key, e.g. `lindner2026overtaking.md`).
2. Replace the `[Add a 2-4 sentence AI-crawlable summary here...]`
   placeholder under `summary:` with the generated text, keeping the `>`
   YAML block-scalar indicator and indentation.
3. Rebuild locally (`bundle exec jekyll build`) and check
   `_site/publications/<slug>/index.html` to confirm it rendered correctly
   before pushing.
