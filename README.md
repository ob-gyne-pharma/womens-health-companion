# Women & Families (OB-GYN PHARMA)

A free, bilingual (English/Arabic) women's health information and self-tracking companion.
Installable as an app, works offline, makes no network requests of its own, sets no cookies.
Live at **https://public.ob-gyn-pharma.com**

Read **[FACTSHEET.md](./FACTSHEET.md)** before describing this product to anyone outside the
team — it is the only approved source of claims about what this app does and does not do.

## Running it locally

No build step. It's plain HTML/CSS/JS.

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Before every push

```bash
node tools/check.mjs
```

This must print `✓ OK`. If it prints `✗` with problems, **do not push** — fix what it names
first. This same check runs automatically on GitHub (`.github/workflows/check.yml`) on every
push and pull request to `main`.

If you changed any guide content, the symptom checker, release number, or the script list in
`index.html`/`sw.js`, also run:

```bash
node tools/build-pages.mjs
```

This regenerates the 118 static pages from the live app so their text can't drift from what
the app actually shows. It needs `npm i playwright` once.

## Repository layout

```
index.html              the app shell: head, CSS, page markup, script tags (order matters)
sw.js                   service worker: what's available offline
js/NN-name.js           24 script files, loaded in filename order — this order is load-bearing
images/                 photos (WebP)
icons/                  PWA icons (not in this zip — see "Before you deploy" below)
*.html (root)            118 generated static pages (guide-*, chapter-*, ar-*, etc.) — don't
                         hand-edit these, they're overwritten by tools/build-pages.mjs
sitemap.xml, robots.txt generated alongside the static pages
tools/check.mjs         the pre-push/CI check described above
tools/build-pages.mjs   the static-page generator
.github/workflows/      CI: runs tools/check.mjs on every push/PR to main
FACTSHEET.md            the only approved source of product claims
STATUS.md               running log — read this first in any new session
```

## Before you deploy

`icons/icon-192.png` and `icons/icon-512.png` must exist in the repo (not included in every
export of this project) or `tools/check.mjs` will fail with a `MISSING` error naming them.

## Who works on what

This project is split across three roles — see the Master Plan document for full detail:

- **Agent 1 (builder/release manager)** — everything in `js/`, `index.html`, `sw.js`,
  `tools/`, `.github/`, `FACTSHEET.md`. Only Agent 1 merges to `main` and assigns release
  numbers (next is **r23**).
- **Agent 2 (clinical content & localization)** — content and translation files, clinical
  governance documents. Does not touch JavaScript or the release number directly; delivers
  changes as a pull request or issue for Agent 1 to merge.
- **Agent 3 (partnerships/funding/growth)** — works in a separate, private workspace (not
  this repository, which is public). Never states a product claim that isn't in
  `FACTSHEET.md`.

See `CONTRIBUTING.md` for the exact handoff process between sessions.

## License

(Founder to decide and fill in before the repository is made public — see the Master Plan,
§9, decision 2. Until a license file is added, all rights are reserved by default.)
