---
title: "Ampache7 for Users"
metaTitle: "Ampache7 for Users"
description: "Ampache7 for Users"
---

## Ampache7 for Users

This page will cover the visual, user specific changes to Ampache.

Changes that are important to Admin's are available at [Ampache7 for Admins](/docs/help/troubleshooting/ampache7-for-admins)

## Material Icons have replaced a lot of the old PNG files

We're now using [Google Material Symbols & Icons](https://fonts.google.com/icons) to refresh some of the older icons on the site.

If you see the question mark, it means the requested SVG was not found.

![image](https://github.com/ampache/ampache/assets/1305249/214f57dd-6abe-4757-9354-1ce9ea15318e)

Instead of loading from URL's the icons are loaded from the XML and they look pretty good!

![image](https://github.com/ampache/ampache/assets/1305249/0d5bb39e-bb84-4a53-83da-ca7744572898)

If you have issues with your icon color or size this is usually because the CSS has been cached and has not updated after the upgrade.

![image](https://github.com/user-attachments/assets/e926f1a2-95d3-4a44-a955-86c0a523bba7)

Clear your site data and cookies to refresh your CSS

## Upload catalogs are now a per-user choice

You can now use different upload catalogs for different users.

![image](https://github.com/ampache/ampache/assets/1305249/e2a97ee2-4dcf-4a23-949f-c5de810ef79f)

This change removes the existing preference and will try to copy the existing preference value to all users.

The preference level defaults to Admin users but can be changed from the options page `preferences.php?action=admin&tab=options`

Set your access level to allow users to replace their settings or use 'Apply to all' to keep existing behaviour.

![image](https://github.com/ampache/ampache/assets/1305249/5f3c6f0e-8d3e-4e39-9ccb-12342818cbbb)

## Playlist collaboration

To make a shared playlist that other users could add to used to rely on you creating a smartlist and adding public shared lists to the search.

Now you can share a playlist with a user and there is no longer a requirement to make it public.

Select the users you want to share with in the Collaborate list and then save.

![Screenshot 2024-07-10 135218](https://github.com/ampache/ampache/assets/1305249/f2f2f9d4-9de8-45a9-a222-3f053bf89de2)

Now you can share it with other people but not the whole server.

![image](https://github.com/ampache/ampache/assets/1305249/539a773f-2cec-466b-949c-35e14d5d6055)

This allows the users to add and remove songs from the list. (They can not delete or edit other options)

## Extended user activity media links

Show the parent of the media on the user activity row (If it has one!)

![image](https://github.com/user-attachments/assets/9673d66b-21b8-4ae3-a7e0-adbb718c5a39)

## Added bandcamp search to library item pages

Quick and easy link to bandcamp search based on the current object type

![image](https://github.com/user-attachments/assets/9d3bfb1a-3f5a-4de9-8e85-ffa4974c1619)

## New Database Options / User preferences

Preferences and options galore!

### Show dashboard links on the index instead of browse pages

`Use Dashboard links for the index page header`

If you use the light sidebar you might want users to avoid the browse pages. use this option to swap a brows for a dashboard

![image](https://github.com/user-attachments/assets/8efb2f3a-11cf-4519-b85e-0793913b50a6)

### Skip stat recording on API streams

This preference functions the same way as `subsonic_always_download` but for the Ampache API

`Force API streams to download. (Enable scrobble in your client to record stats)`

### User profile picture in the header

There is a new user preference to use the user avatar as part of the main page header logo.

`Custom URL - Use your avatar for header logo`

When enabled this will use your Avatar and ignore `Custom URL - Logo` if set.

![image](https://github.com/user-attachments/assets/72f23d99-4f17-414c-b868-ef049cc757ab)

### Playlist media link extension

This preference will show you the parent of the object (if applicable) in the playlist media row

`Show extended links for playlist media`

![image](https://github.com/user-attachments/assets/9e6c3207-cbe4-4ead-8756-81fa1f760f01)

### Sidebar options to hide and order

Interface preferences related to the sidebar have into their own section.

![image](https://github.com/user-attachments/assets/eaa8880d-fe33-47ca-aabb-245bb5ea02f7)

You can hide areas from the main sidebar including the arrows to switch between light and full sidebars.

You can also change the CSS order of the sidebar. (This was done in CSS but has been removed)

![image](https://github.com/user-attachments/assets/423cc7a4-4d76-490a-ab18-331979cae53e)

When the hide preferences are enabled; menu groups will be skipped from the HTML entirely. (Not just hidden with CSS)

![image](https://github.com/ampache/ampache/assets/1305249/faffbead-357f-42dc-acf8-1b14f00127c7)

You can also hide everything if you want without affecting the other layouts

![image](https://github.com/ampache/ampache/assets/1305249/bf0c4294-d4f0-40c8-b0ed-c222e2b9a3d4)

Setting different CSS orders will change the order they are displayed. Setting the preferences to 0 will fall back to their default values

![image](https://github.com/user-attachments/assets/7dde5a97-fc2f-4933-ac2c-9246ce3d22e7)

### Hide different search icons from object pages

There are now options to hide search links from library item pages.

![image](https://github.com/user-attachments/assets/61fe42c2-09a2-4f2b-b0a8-6d9fb7dc4ff1)

## New Plugin - Homepage Dashboard

Show album dashboard rows on the home page

![image](https://github.com/user-attachments/assets/29a9a8e2-1726-486d-8021-deca6b6ba479)

Configurable from the plugin options page

![image](https://github.com/user-attachments/assets/c715d61f-d7c0-4163-98aa-b75d2c67ea6b)

### Download a playlist as a file

You can now download a playlist file from the object page. Previously you had to change the play type or use the CLI commands

![image](https://github.com/user-attachments/assets/0f2582c0-0a77-4b0c-afa1-adce26340eab)

## Warning on the upload page regarding licensing

When you upload music to a public site you have to be sure of the license and the rights you may give away by uploading.

![image](https://github.com/user-attachments/assets/7f028b62-225a-4f9a-9615-29e1a718ff6c)
