# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The source for <https://ampache.org> — a Docusaurus 3 static site containing the Ampache website, the Wiki, and the API documentation. There is no application code here beyond a handful of React/CSS files; ~178 Markdown files under `docs/` are the product.

## Commands

```bash
npm install              # or npm update
npm start                # dev server with hot reload
npm run build            # production build into ./build (fails on broken links, see below)
npm run serve            # serve the built ./build locally
npm run clear            # wipe .docusaurus/ and build caches when the dev server misbehaves
./build.sh               # build + copy ./build/* into ../ampache.github.io/docs/
```

There are no tests and no lint script. `.eslintrc.json` and `.prettierrc` are present but eslint/prettier are not installed as dependencies — editor-driven only.

### Deploying

The site is published from a **separate** repo, `ampache/ampache.github.io`, which must be checked out as a sibling directory. Build here, copy the output there, commit both. `README.md` says copy to that repo's root (`cp -rfv ./build/* ../ampache.github.io/`) while `build.sh` copies to `../ampache.github.io/docs/` — confirm the intended target with the user before running either. `npm run deploy` (Docusaurus' own gh-pages deploy) is not the workflow used here.

## Architecture

**Docs are the site root.** `routeBasePath: '/'` in `docusaurus.config.js`, and the blog plugin is disabled. So `docs/index.md` is the homepage, `docs/api/api-standards.md` is `/api/api-standards`, and there is no `/docs/` URL prefix except for files that literally live in `docs/docs/`.

**Three content trees under `docs/`:**

| Path | URL | Contents |
| --- | --- | --- |
| `docs/*.md` | `/`, `/demo`, `/donate`, `/docker`, `/download`, `/links` | marketing/landing pages |
| `docs/docs/**` | `/docs/**` | the Wiki — install, configuration, clients, plugins, development, help, old-information |
| `docs/api/**`, `docs/rest/` | `/api/**`, `/rest/` | API reference |

**`sidebars.js` is entirely hand-maintained.** One sidebar (`api`) defines the whole site nav. A new Markdown file is invisible until its doc ID is added there — IDs are the path under `docs/` without the extension (e.g. `docs/help/troubleshooting/faq`, `api/browse/song-browse`).

**`onBrokenLinks: 'throw'`.** Any internal link that doesn't resolve breaks `npm run build`. Always build after renaming, moving, or deleting a doc. Broken *Markdown* links only warn.

**API versioning is by directory copy, not the Docusaurus versioning plugin.** `docs/api/*.md` at the top level is the current API (Ampache 8). `docs/api/api-3/`, `api-4/`, `api-5/`, `api-6/` are frozen snapshots of the same page set for older releases — do not "fix" them to match current behaviour. `docs/api/versions/` holds per-release method lists.

**The REST/OpenAPI surface is separate from the RPC docs.** Two hand/tool-maintained specs live in `static/`: `openapi.json` (~3.9 MB, the current API 8 surface) and `openapi-6.json` (~360 KB, pinned to API version 6 — the subset Ampache 7 and 8 both serve). Both are served from the site root (`https://ampache.org/openapi.json`, `.../openapi-6.json`) and offered as a version dropdown by the vendored Swagger UI in `static/rest/swagger/`, which is a checked-in copy of the distribution — edit only `swagger-initializer.js` there (the `urls` array is where specs are registered). `docs/rest/index.md` is the prose explaining the RPC → REST path conversion and which spec to use. Changing an endpoint usually means touching the relevant spec(s) and the corresponding `docs/api/api-{xml,json}-methods.md` entry.

`static/api-responses/{api3..api8,ampache-subsonic,opensubsonic}/` holds raw sample XML/JSON responses linked from the method docs.

## Conventions

- Every Markdown file starts with `title` / `metaTitle` / `description` frontmatter.
- Pages freely mix raw HTML with Docusaurus utility classes (`display--flex`, `article--box`, `text--center`) — see `docs/index.md`. These are MDX, so unescaped `{` and unclosed tags are build errors.
- Site-wide styling lives in `src/css/custom.css`; `static/css`, `static/js`, and `static/old` are legacy assets from the pre-Docusaurus site.
- `.docusaurus/` is partially committed (a few generated files are gitignored). It is build output — never hand-edit it; regenerate with `npm start` or `npm run clear`.
