---
title: "Development"
metaTitle: "Development"
description: "Contributing code, translations and issues to Ampache"
---

## Development

Ampache is developed in the open on [GitHub](https://github.com/ampache/ampache) and is happy to take contributions of any size — code, translations, documentation, or a well written bug report. These pages cover how the project is organised and what is expected of a change before it is merged.

* [Contributing](/docs/development/CONTRIBUTING) — coding standards, the view and template system, how to prepare a pull request, and what the maintainers look for
* [Branch Layout](/docs/development/branch-layout) — which branch to target for a fix or a new feature
* [Translations](/docs/development/TRANSLATIONS) — translating Ampache into your language through Transifex
* [Issue Template](/docs/development/issue-template) — the detail to include so a bug can be reproduced
* [Enhancement Requests](/docs/development/enhancement-requests) — how to propose a new feature

The rest of this page is an orientation for reading the code rather than a standards document: where
things live, the helpers you are expected to use instead of writing your own, and the places where
Ampache fails quietly enough that you can break something without seeing it.

## Reading a twenty-year-old codebase

Ampache is progressively migrating legacy procedural and static code into a dependency-injected,
domain-driven architecture under `src/Module`. **Both patterns are in the tree at once, and that is
expected.** A modern service with constructor-injected interfaces may call straight into a static method
on a model, because that model has not been converted yet. When you are adding something new, follow the
new pattern; when you are fixing something old, you do not have to convert the world around it.

Two rules of thumb make the code much easier to read:

* Almost everything is programmed against an interface (`FooInterface`) with a single final
  implementation (`Foo`). If you are looking for behaviour, open the implementation; if you are looking
  for the contract, the interface has the docblocks.
* The container is assembled from one `service_definition.php` per domain. To find out how a class is
  built, look for its entry there rather than for a `new` in the callers.

[Project layout](/docs/development/CONTRIBUTING#project-layout) lists what each top-level directory is
for. The short version:

| Directory | What is in it |
|---|---|
| `src/Module/<Domain>/` | business logic, by domain — Album, Artist, Catalog, Playback, Api, User… this is where new code goes |
| `src/Repository/` | database access, plus `Repository/Model/` for the entity classes themselves |
| `src/Gui/` | view classes; one per template |
| `resources/templates/` | the `.phtml` templates those views render |
| `src/Config/` | bootstrap, the DI container and config reading |
| `src/Plugin/` | third-party integrations, each implementing `AmpachePluginInterface` |
| `public/` | the web root and the entry points |
| `bin/cli` | the command line tools |

## How a request reaches your code

Startup is two stages. `src/Config/Bootstrap.php` registers the autoloader and builds the container;
`Ampache\Config\Init\Init::init()` then runs a chain of handlers (environment, config, gettext, database
update, globals, auth). Each handler throws a specific exception that `Init` maps to a redirect — this is
why a missing config file sends you to the installer and an out-of-date schema sends you to the updater.
**A new startup concern is a new handler in that chain, not another line in `Bootstrap.php`.**

From there a request takes one of four routes:

* **Web pages** boot and hand off to `ApplicationRunner`, which reads the `action` parameter and
  dispatches through a map of action name to handler class. Handlers live in
  `src/Module/Application/<Domain>/*Action.php` and implement `ApplicationActionInterface`.
* **The native API** ([API docs](/api)) serves several versions at once — 3, 4, 5, 6 and 8. Each version
  has its own method list, its own output formatter (`Xml8_Data`, `Json6_Data`, …) and its own error
  method, and `ApiHandler` resolves which version a request actually gets from the `version` parameter,
  the session, and the user's own preferences.
* **The [REST API](/rest)** is a thin adapter: `mod_rewrite` rules turn a REST path into query
  parameters, the entry script normalises the resource and action names, and the same `ApiHandler` does
  the work. A REST-only bug is usually in that name translation rather than in the method.
* **[Subsonic and OpenSubsonic](/api/subsonic)** are a completely separate engine with their own output
  classes. None of the native API's versioning applies to them.

## Helpers you are expected to use

Most of these exist because the hand-rolled version of them was a bug.

* **Config values: ask for the type you want.** `AmpConfig::get()` returns `mixed`, and a config file
  writes `'0'`, `0`, `false` and `'false'` for the same flag, so use `AmpConfig::get_bool()`,
  `get_int()` or `get_array()` instead of casting at the call site. `get_array()` takes a real array or a
  comma-separated string and always answers a clean list. Injected code has the same three on
  `ConfigContainerInterface` as `getBool()`, `getInt()` and `getArray()`.
* **Preferences arrive already typed.** A preference row declares its own type, and `boolean` and
  `integer` preferences are cast before they reach the config, so `AmpConfig::get_bool('a_preference')`
  is reading a real boolean. Declaring the wrong type when you add a preference is what breaks this.
* **Escaping in a template is a seam**, not a habit: `$this->e()` escapes, `$this->raw()` declares that
  the value is already markup, and tests enforce that every echoed value goes through one of them. See
  [Templates and views](/docs/development/CONTRIBUTING#templates-and-views).
* **Any url the server itself will fetch goes through `UrlValidatorInterface::isPublicHttpUrl()`.**
  Art sources, podcast feeds and enclosures, lyric and RSS endpoints are all supplied by users or by
  remote feeds, and a fetch happens from inside your network — the validator refuses anything that is not
  http(s) or that resolves to a loopback, private, link-local or metadata address.
* **Repositories, not `Dba::` statics, for new database work.** A repository takes
  `DatabaseConnectionInterface`, which is the only seam the test suite can mock.
* **Field enums for single-column writers.** A column name is interpolated into SQL while a value is
  bound, so writers take `SongFieldEnum`, `AlbumFieldEnum`, `UserFieldEnum` and friends rather than a
  string column name. Adding a generic `updateField(string $column, …)` re-opens that hole.
* **`Ui::get_material_symbol()`, `Ui::get_icon()`, `Art::display()` and `Ajax::button()` return markup.**
  Escaping their output prints the tags on the page; a test catches this in templates.
* **Object lookup by type** goes through `LibraryItemLoader`, `LibraryItemEnum` and
  `ObjectTypeToClassNameMapper` rather than a `switch` on a type string.
* **Play urls are parsed, never string-matched.** Every `/play/` url exists in a query-string and a
  path-style form, and which one is produced depends on a setting that is rewritten per request. Use
  `Stream_Url::parse()` for a url built in the same request, and the format-independent
  `localplay_controller::parse_url()` for anything read back from storage.
* **`composer qa`** is the gate before a pull request: syntax check, code style and the test suite.
  `composer cs:fix` settles formatting for you, so do not hand-match style.

## Gotchas: the places Ampache fails quietly

### A broken page still answers 200

`ApplicationRunner` swallows exceptions thrown during a render, so a fatal error produces an **HTTP 200
with a truncated body** — the markup simply stops. Nothing is logged by the web server. When you are
checking a page by hand, assert that the response ends with `</html>` rather than that it contains what
you expected, because the markers you grep for are usually emitted before the point where it died.
Ampache's own log (`ampache.log`, wherever `log_path` points) is where errors surface, not the web
server's error log.

The most common cause is a type error: every value posted by an edit dialog is a **string**, and the
files declare `strict_types`, so passing one straight into an `int` or `bool` parameter throws. The same
trap applies to config values, since static analysis cannot see through `mixed` — which is what the typed
config accessors above are for.

### A stream that fails must not answer 200 either

An empty `200` reads to a player as a corrupt file rather than as an error. Note also that a live
transcode's `Content-Length` is an estimate and the body is truncated to whatever it declares, so an
over-declared length silently loses audio. It stays opt-in for that reason.

### Adding a preference takes four edits

A preference has to be registered in the migration, in `Preference::SYSTEM_LIST`, in
`Preference::set_defaults()` and in `Preference::translate_db()`. Miss one and it either never gets
inserted on a fresh install or stops being translatable. Descriptions are plain US English literals in
all four — translation happens at display time, so never wrap them in `T_()` there. Editing the
description in `translate_db()` **is** the rename mechanism; it applies to existing installs on update.

### A migration that throws blocks everyone on that version

There is no transaction around a migration and its version is not recorded when it fails, so a partial
run stays committed and the fixed migration re-runs from the top. Two consequences: every statement must
be idempotent (guard with `Dba::has_column()` / `Dba::has_index()`), and a broken migration is **fixed in
place** rather than patched by a follow-up migration.

### An API fix can silently miss most clients

A change made to the version 8 method does not reach a client pinned to version 6, and several type lists
are shared by every version — appending to one exposes a type on older versions where no formatter can
render it. When you change API behaviour, decide explicitly which versions it applies to, and record it
in the [API changelog](/api/api-changelog). New browse filters and sorts also need documenting, since the
[browse reference](/api/api-browse) is generated and its check job fails when the pages drift.

Ampache's deprecation policy is worth knowing before you write a note: **it extends rather than forces
movement.** A parameter that has been accepted stays accepted and the replacement is added beside it, so
a deprecation says "use the new thing", not "the old thing is going away", unless a removal has really
been scheduled.

### Subsonic has a strict schema

OpenSubsonic-only response fields belong **only** in the OpenSubsonic output classes. The legacy Subsonic
XML is validated against the 1.16.1 XSD, where an unknown element or attribute is a failure, and
Subsonic changes are logged in the main changelog rather than the API one.

### A model can be stale immediately after you write to it

Object caching is on by default, so a write must clear the cached row and assign the new value to the
object as well — otherwise the next lookup returns the pre-update row and the object doing the writing is
stale itself.

### `LIMIT` does not mean the query is bounded

A `GROUP BY` that only exists to dedupe a join, or an `ORDER BY` reached through a join, forces the whole
result set to be built and sorted before the limit applies. If `EXPLAIN` shows `Using temporary` or
`Using filesort` next to a `LIMIT`, the work is unbounded whatever the limit says. This matters most in
the header, sidebar and footer, which render on **every** page — "login is slow" is usually one of those
queries and not login at all.

Two specific shapes to prefer: filter on a table's own `catalog` column instead of joining the catalog
map (the join duplicates rows and the `DISTINCT` that undoes it defeats the limit), and never call
`count()` on a fetched list to get a total — the play queue has no size ceiling, and there are dedicated
count and existence queries for exactly that reason.

### Three list types that look interchangeable and are not

A **playlist** is static and ordered but holds media only; a **search** (smartlist) is dynamic and
rule-driven; a **collection** is static and can curate objects of any type. Curating non-media objects
means a collection — widening a playlist to do it breaks every method that assumes its rows are
streamable. At the API boundary playlists are deliberately treated as song lists, because playlists and
smartlists are merged into one response shape.

### The same code ships in three on-disk layouts

Ampache is released in a `public`, a `client` and a `squashed` layout, generated from one branch by a
transform. Templates in `resources/templates` are **not** rewritten by that transform, so a template that
resolves a web path itself builds broken urls in one of the layouts — ask the view for the path. See
[Branch Layout](/docs/development/branch-layout) for which branch a change belongs on.

### Small ones worth knowing

* An unchecked checkbox posts nothing, so an update that only applies fields it receives can set a flag
  and never clear it. Always test the *off* direction of a checkbox.
* An inline `<script>` in a template must wrap its work in `$(function () { … })`. The jQuery plugins it
  calls are loaded deferred, so a bare call runs before the plugin exists and the widget silently never
  appears.
* Art candidates offered by the picker are **references** (an image row, a url, a file, a mosaic to
  rebuild), never image bytes — they are parked in the session, and a too-large or non-utf8 value makes
  the entire session write fail. A page of candidates that all 404 at once means the write failed, not
  that the art is missing.
* Every new translatable string is work for every translator. Check `locale/base/messages.pot` for an
  existing wording before inventing one.
* Every new PHP file needs the AGPL license header — see
  [License Headers](/docs/development/CONTRIBUTING#license-headers).

## Testing what you changed

The test suite is **unit only — there is no database**. Tests mock their dependencies, so code whose only
seam is a static database call cannot be covered as written; that is one of the reasons new work goes
through injected interfaces. When a change genuinely cannot be unit tested, say so in the pull request
and describe how you verified it instead.

Two habits that catch more than the suite does: prove a regression test fails without your fix (put the
bug back, watch it go red, then restore), and give any setter that can *refuse* a value its own test case
covering both the accepted and the refused input — a shared round-trip test will happily pass against a
guard that is backwards.

If you are not writing code, the [Help](/docs/help) pages list the places where you can reach the community.
