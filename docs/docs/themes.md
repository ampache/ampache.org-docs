---
title: "Themes"
metaTitle: "Themes"
description: "Ampache Themes"
---

## Ampache Themes

Ampache has an integrated theme system that allows users to modify the CSS/images and can be configured on a per user basis. Official themes are available under the **/themes** directory.

## Theme Directory Structure

The theme directory is fairly straightforward.

Only `theme.cfg.php` is mandatory. Ampache finds themes by globbing `themes/*/theme.cfg.php`, so a directory without one is not a theme and never appears in the list. Everything else falls back — an image, an icon or a template your theme does not carry is served from Ampache's own copy, so a theme only needs the files it actually changes.

```text
Theme Name
├─ images/
│  ├─ icons/
│  │  └─ icon_*.png
│  ├─ ratings/
│  │  └─ star_rating.png
│  └─ *.png
├─ templates/
│  ├─ fonts/
│  │  ├─ *.css
│  │  ├─ *.ttf
│  │  └─ *.etc
│  ├─ dark.css
│  ├─ default.css
│  └─ light.css
└─ theme.cfg.php
```

### Images

The **images/** directory contains all images that will be used by Ampache. Image files at the root of that folder are accessed through several different ways. For example some files like **ajax-loader.gif** are accessed directly through the CSS, **Ampache-dark.png** is accessed via the function `UI::get_logo_url('dark')`, and other image files within are fetched by using the function `UI::get_image('filename')`.

#### Icons

Within images, is the **icons/** directory. All files in the folder are prefixed with **icon_**. These are all of the various icons found in the Ampache interface, such as the nav buttons in the sidebar, and the play/play next/add to playlist icons, etc. These are fetched using `get_icon($name, $title)`, where `$name` is the part of the filename after **icon_**, and `$title` is the title/alt text that shows when you hover over it.

If the icon is an SVG, then it will return the entire `<svg>` tag within the icon's file. Otherwise, for .png, .jpg, etc. it will return an `<img>` tag.

The reason SVGs are not using the `<img>` tag, is so that styles can be applied to icons using an external style sheet. This provides much more flexible styling for SVG files, than if you were to use `<img>` or to put it in the CSS property `background_image`.

##### ID and Class Attributes

Some icons will also provide an ID or Class attribute that will be assigned to the image's tag. If none is provided, then for SVGs by default the `id` attribute is set to **icon-name**, and the `class` attribute is set to **icon**. PNGs do not get a default value.

##### Material Symbols

Most of the interface no longer uses `icon_*` files at all. The sidebar, the headers and the row actions are drawn with **Material Symbols**, fetched with `Ui::get_material_symbol($name, $title, $id, $class)` and read from `resources/images/material-symbols/`.

These are **not** part of a theme. Each symbol is inlined once per page as a hidden `<symbol>` and reused with `<use>`, which is why hundreds of icons cost one copy each. A missing name falls back to `icon_error.svg` and logs a runtime error rather than rendering nothing.

Because they are plain SVG paths that inherit `currentColor`, you restyle them from your theme's CSS rather than by shipping replacement files.

#### Ratings

This folder just includes a .gif, and .png for the star ratings. These are applied using CSS.

### Templates

This is the main folder containing all of a theme's styles, and it is the only folder Ampache loads stylesheets from.

Three kinds of file live here.

#### The base stylesheet

Every file named in the `base` key of `theme.cfg.php` is loaded first, in order. This is the theme's layout: geometry, spacing, sizing, everything that is not a colour. Reborn ships one, `default.css`.

Each entry is `[css_path]|[media_type]`, so `default.css|screen` loads `default.css` for screen media. Separate multiple bases with `, `.

Ampache's own `templates/base.css` is loaded **after** your base file and before the colour file, so a rule of yours at the same specificity loses to it. Raise the specificity rather than fighting it with `!important`.

#### The colour stylesheets

One file per entry in the `colors` key, named in lower case — `colors = "Dark,Light"` means `dark.css` and `light.css`. Exactly one is loaded, chosen by the user's `theme_color` preference, and it is loaded **last** so it always wins.

Keep colour in these files and geometry in the base file. A layout rule that only exists in `dark.css` is a layout rule the light theme does not have.

#### Optional files

* `rtl.css` — loaded only when the user's language is right-to-left. Ampache skips it silently if it does not exist.
* `fonts/` — self-hosted webfonts and the `@font-face` CSS that declares them, referenced from your own stylesheets.
* **Template overrides** — any file in `templates/` whose name matches one of Ampache's own templates replaces it for this theme. Non-PHP files are always allowed; PHP templates are only honoured when `allow_php_themes` is enabled in `config/ampache.cfg.php`, which is off by default because a theme that can overwrite PHP can run code.

#### Cache busting

Theme stylesheets are requested with a `?v=` query built from the file's modification time, so an edit is picked up on the next normal reload without a version bump. A browser that already cached a file may still need one hard refresh.

## theme.cfg.php

The config file is an INI file with a `<?php exit(); ?>` guard on the second line so it can never be served or executed. Keep that guard when you copy a theme.

| Key | Meaning |
|---|---|
| `name` | The display name shown in the Theme preference. This is what a user picks, but the value stored is the **directory name** |
| `base` | Comma-separated `file.css` + media-type list (`default.css\|screen`), loaded first and in order |
| `colors` | Comma-separated colour names; each becomes a lower-case `<name>.css` in `templates/` and fills the Theme color preference |
| `author` | Theme author |
| `maintainer` | Who to contact about it |

## Choosing a theme

`theme_name` and `theme_color` are per-user preferences with an access level of **Default**, so every user — including a guest — can pick their own unless an admin raises the level. See [Preferences](/docs/help/preferences-explained#interface---theme).

If the stored theme directory has been deleted, Ampache drops the preference and falls back to `reborn` rather than rendering an unstyled page.

## Creating a New Ampache Theme

If you're interested in creating your own theme, the easiest way is to copy an existing theme in **themes/**, and edit the files as needed. Once you have edited the name field inside the **theme.cfg.php** file, it should automatically populate in your Ampache install as an available theme.

A few things worth knowing before you start:

* The directory name is the identity. Renaming a theme's folder orphans every user who had it selected; changing `name` in the config file is safe.
* `reborn` is desktop-first. Its mobile support is a single `@media (max-width: 768px)` block at the end of `default.css`, and the colour files only carry mobile drawer/toast backgrounds. If you fork it, keep that split.
* Test both colours. A rule you add to `default.css` applies to every colour; one you add to `dark.css` does not.
