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

### The user interface

Ampache renders every page through a **typed view class paired with a `.phtml` template**. There is no
`Ui::show()` and no `.inc.php` template left: a view takes its data through its constructor and the
template runs in that view's own scope, so nothing arrives by way of a caller's local variables.

Values reach the page through an escaping seam — `$this->e()` for text, `$this->raw()` for markup that
is already safe — and three tests in `tests/Gui/View/` enforce it: that every echoed value passes
through the seam, that nothing is escaped twice, and that no template resolves a path that differs
between Ampache's three on-disk layouts. [Contributing](/docs/development/CONTRIBUTING#templates-and-views)
covers the rules a new view has to follow.

If you are not writing code, the [Help](/docs/help) pages list the places where you can reach the community.
