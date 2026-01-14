---
title: "Themes"
metaTitle: "Themes"
description: "Ampache Themes"
---

Ampache has an integrated theme system that allows users to modify the CSS/images and can be configured on a per user basis. Official themes are available under the **/themes** directory.

## Theme Directory Structure

The theme directory is fairly straightforward.

```Text
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
│  ├─ dark_preview.png
│  ├─ dark.css
│  ├─ default.css
│  └─ light.css
├─ preview.png
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

#### Ratings

This folder just includes a .gif, and .png for the star ratings. These are applied using CSS.

### Templates

This is the main folder containing all of a theme's styles.

WIP - more to be added here!

## Creating a New Ampache Theme

If you're interested in creating your own theme, the easiest way is to copy an existing theme in **themes/**, and edit the files as needed. Once you have edited the name field inside the **theme.cfg.php** file, it should automatically populate in your Ampache install as an available theme.
