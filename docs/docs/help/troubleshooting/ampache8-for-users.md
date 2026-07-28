---
title: "Ampache8 for Users"
metaTitle: "Ampache8 for Users"
description: "Ampache8 for Users"
---

**WORK IN PROGRESS**

## Ampache8 for Users

This page will cover the visual, user specific changes to Ampache.

Changes that are important to Admin's are available at [Ampache8 for Admins](/docs/help/troubleshooting/ampache8-for-admins)

## The Web Player has been rebuilt

The player bar now uses a clean 3 row layout for both music and video.

* Top: one centered control strip - previous, play/pause, next, stop, mute, volume, shuffle and repeat
* Middle: a full width seek bar
* Bottom: current time on the left and duration on the right

![image](/img/1305249/6f8d3bc1-3171-4170-8599-15d7831a0e6e.png)

The action buttons sit together on the right of the bar: Add All to playlist, Loop Playlist, Expand playlist, Show/Hide playlist, Visualizer, Broadcast, Show/Hide Now Playing, ReplayGain, Equalizer and Visualizer full-screen.

### Playlist show and expand

You can now hide the in-bar playlist completely and the action buttons move into the freed space.

The Expand button opens a full height playlist panel above the bar and works even while the in-bar playlist is hidden.

Both choices are remembered in cookies, and on small screens the playlist starts hidden by default.

![image](/img/1305249/0d42fa39-218f-4538-aa93-f67ba550997a.png)

### The Equalizer is back

A 5 band equalizer (80, 240, 750, 2.2k and 6k Hz) is available from the player at any time.

It used to be buried inside the visualizer; now it has its own button and works together with ReplayGain and the visualizer.

![image](/img/1305249/20fc0bff-b030-4495-a6a8-abb0fd3312cf.png)

### A new Visualizer

The old WebGL visualizer has been replaced with a lightweight canvas visualizer that reacts to the music.

It covers the screen above the player, and if you hide the player it covers the full screen.

While it runs the player bar switches to a black theme so the controls stay readable.

![image](/img/1305249/c5ce8b68-2e3e-4d28-acec-9c2fbf16f3a3.png)

### Random and Democratic play show what is playing

Random and Democratic play used to show an empty player with no song information.

The player now shows the current title, artist, album and art, along with a live rating/flag widget and a link to the album.

![image](/img/1305249/7a1a3d91-0e4b-453a-97a2-7d754ff7c5c6.png)

### Other player changes

* The waveform display has been removed from the player bar (waveforms remain on song pages)
* The Flash and Aurora.js fallbacks are gone; the player is HTML5 only
* The old `Authorize Flash Web Player`, `Authorize JavaScript decoder (Aurora.js)` and alternative `play2` playback preferences have been removed

## Browse your music by Folder

There is a new **Folders** link at the top of the Browse sidebar.

It shows your catalogs as the real folder tree on disk, with the songs, podcast episodes and videos inside each folder.

![image](/img/1305249/ac988f7d-ff79-4afc-9909-90bbfaedcae8.png)

Folder rows work like any other library item:

* Play, Play Next and Play Last on hover
* Add to the temporary playlist or a saved playlist
* Folders can be rated and flagged
* Shout, share and batch download actions

Folder art falls back to a folder icon when no image is found.

You can hide the link with the new `Show 'Folders' link in the main sidebar` preference.

**NOTE** the link only appears after your admin has run the new Scan Folders catalog action.

## Collections: a list that can hold anything

There is a new **Collections** link in the Playlists part of the sidebar.

A playlist only holds music and a smartlist builds itself from rules, so neither can hold an album, an artist or a genre.

A collection can hold any of them in the same list, because its contents are chosen by hand rather than by a rule.

Albums, album disks, artists, genres, labels, live streams, playlists, podcasts, episodes, songs and videos are all allowed.

<image: the Collections browse page listing collections with their type, what they hold and their owner.>

Opening one shows a section per kind of thing it holds, with each row behaving like it does anywhere else in Ampache.

<image: a collection page showing a mixed collection with a section per object type.>

Pressing play expands the collection, so an album plays its songs and anything that cannot be streamed is skipped.

A song reached twice, through its album and on its own, still plays once.

You can leave a collection mixed or pin it to a single kind of thing, after which it refuses anything else.

Collections can be rated and flagged, and they get their own art with the same mosaic fallback playlists use.

Public or private and the collaborator list work just like playlists, so a collaborator is allowed to change the contents but only the owner can delete the list.

You can hide the link with the new `Show 'Collections' link in the main sidebar` preference.

**NOTE** the link only appears once you have a collection you can see.

Collections are created and filled through the API in this release.

The web interface shows collections and edits their name, visibility, pinned type, collaborators and art.

Adding and removing items is not in the web interface yet.

## A mini player for small screens and simple accounts

There's a new stripped-down `/m/` page showing just the web player and your `home` category plugins.

If your admin locks your account into it you'll only ever see that page (your normal access level still decides what data you can reach - it isn't an access restriction on its own). Otherwise, look for the new **Mini player** button on the login form, next to `Register` and `Lost Password`, to jump there yourself after logging in.

Logging in always sends you back to whatever page you originally asked for, so old bookmarked links keep working either way.

## Your playlist art can be a mosaic now

Automatically generated playlist covers can now be a grid of up to nine covers from the playlist, instead of a single random cover. Playlists with fewer than four distinct covers still get the old single-cover behaviour. Your admin can turn this off if they'd rather keep the single-cover look.

## Per-player transcoding preferences

Your default transcode output format and bitrate live in your Options under **Streaming -> Transcoding**, and now you can override them per player: separate output-format preferences for the Web Player and the API, plus separate bitrate overrides for each (`0` keeps the site default). There are also new `Maximum transcode bitrate`/`Minimum transcode bitrate` preferences if you want to cap or floor your own dynamic downsampling.

## Ampache on your phone

The desktop theme now has a proper mobile layout on screens up to 768px wide.

* The page fits the screen; no more zoomed-out desktop rendering with a stuck player
* A compact header stays pinned to the top with a hamburger menu button
* The sidebar becomes a slide-in drawer with a dim backdrop; tap outside or the X to close
* The temporary playlist drops down below the header from its usual button
* Album, artist and song pages stack the art above the details instead of overlapping
* Wide tables scroll sideways inside their box

![image](/img/1305249/c1dc82ea-eb71-4cdf-8f64-9b276e4e2a9a.png)

![image](/img/1305249/bae9e63c-acd3-47ed-9d59-3814b5127c94.png)

The desktop layout is completely untouched.

## Playlist menus open on click

The Add-to-playlist and Random item submenus in the right sidebar no longer open on hover.

Click to open, click an item or anywhere else to close.

This makes the menus usable on touch screens and stops them vanishing when your mouse slips.

## Direct play is capped for very large items

Play buttons on items with thousands of tracks are now hidden past a limit to protect the server.

The `Limit direct play to...` preference no longer accepts unlimited; anyone set to unlimited is moved to a 500 track cap.

You can still raise the number in your Options if you need more.

## Sign in with OpenID Connect

If your admin has configured a provider you will see a **Sign in with OpenID Connect** button on the login page. (That message may be customized)

Your account is created automatically on first login.

Some servers may skip the Ampache login page entirely and send you straight to the provider.

![image](/img/1305249/721d22f5-ebbe-411a-9f0b-fadb71eed66d.png)

## OpenSubsonic is the default Subsonic implementation

All Ampache8 users will default to OpenSubsonic to ensure that everyone is using the latest version.

You can still disable OpenSubsonic but the old implementation is now 1.16.1 compatible and does not support OpenSubsonic extensions.

Subsonic clients that request a transcode bitrate now get the bitrate they asked for.

Ampache8 now implements the whole OpenSubsonic specification, so your client should find more of what it looks for.

Songs and albums carry a lot more detail than before, including replay gain, multiple artists and disc titles.

Synced lyrics can now be sent word by word, if your client asks for them and your files are tagged that way.

Clients that report playback as you listen can now keep your now playing entry alive without counting extra plays.

Finding songs that sound alike is also supported, but it needs the AudioMuse plugin set up by your administrator.

## A dedicated Subsonic Password

You no longer need to hand your API key to a Subsonic client as its "password". Set a separate **Subsonic Password** from your account page and use that instead - it's stored encrypted rather than hashed so token-based Subsonic auth keeps working, and your API key still works too if you'd rather keep using that.

## Statistics graphs are sharper and load without an extra install

The charts on catalog/statistics pages are now SVG instead of PNG, so they scale to the page and stay sharp on a high-dpi screen. They also no longer depend on your admin having installed an optional non-free library.

## Upload page folder tree fixed

The destination folder tree on the upload page shows its folder, checkbox and chevron icons again.

![image](/img/1305249/9f64d419-ee98-412d-961a-22eaa72f20c9.png)

## Smaller fixes you might notice

* Adding songs to a playlist skips duplicates correctly again
* Democratic play shows the configured base playlist when the queue is empty
* Downloads work again on password protected streams

## New Database Options / User preferences

Added:

* `Allow Ampache API8 responses` - enable or disable the new API8 per user
* `Show 'Folders' link in the main sidebar` - show or hide the Folders browse link
* `Show 'Collections' link in the main sidebar` - show or hide the Collections browse link
* `Transcode output format - Audio Default` / `- Video Default` / `- Web Player (overrides default)` / `- API (overrides default)` - per-player transcode format overrides
* `Maximum transcode bitrate` / `Minimum transcode bitrate` - caps for your own dynamic downsampling
* `Transcode bitrate - Web Player (overrides default)` / `- API (overrides default)` - per-player bitrate overrides

Removed:

* `Authorize Flash Web Player`
* `Authorize JavaScript decoder (Aurora.js) in Web Player`
* `Use an alternative playback action for streaming` (play2)
