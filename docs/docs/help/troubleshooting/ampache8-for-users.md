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

![image](https://github.com/user-attachments/assets/6f8d3bc1-3171-4170-8599-15d7831a0e6e)

The action buttons sit together on the right of the bar: Add All to playlist, Loop Playlist, Expand playlist, Show/Hide playlist, Visualizer, Broadcast, Show/Hide Now Playing, ReplayGain, Equalizer and Visualizer full-screen.

### Playlist show and expand

You can now hide the in-bar playlist completely and the action buttons move into the freed space.

The Expand button opens a full height playlist panel above the bar and works even while the in-bar playlist is hidden.

Both choices are remembered in cookies, and on small screens the playlist starts hidden by default.

![image](https://github.com/user-attachments/assets/0d42fa39-218f-4538-aa93-f67ba550997a)

### The Equalizer is back

A 5 band equalizer (80, 240, 750, 2.2k and 6k Hz) is available from the player at any time.

It used to be buried inside the visualizer; now it has its own button and works together with ReplayGain and the visualizer.

![image](https://github.com/user-attachments/assets/20fc0bff-b030-4495-a6a8-abb0fd3312cf)

### A new Visualizer

The old WebGL visualizer has been replaced with a lightweight canvas visualizer that reacts to the music.

It covers the screen above the player, and if you hide the player it covers the full screen.

While it runs the player bar switches to a black theme so the controls stay readable.

![image](https://github.com/user-attachments/assets/c5ce8b68-2e3e-4d28-acec-9c2fbf16f3a3)

### Random and Democratic play show what is playing

Random and Democratic play used to show an empty player with no song information.

The player now shows the current title, artist, album and art, along with a live rating/flag widget and a link to the album.

![image](https://github.com/user-attachments/assets/7a1a3d91-0e4b-453a-97a2-7d754ff7c5c6)

### Other player changes

* The waveform display has been removed from the player bar (waveforms remain on song pages)
* The Flash and Aurora.js fallbacks are gone; the player is HTML5 only
* The old `Authorize Flash Web Player`, `Authorize JavaScript decoder (Aurora.js)` and alternative `play2` playback preferences have been removed

## Browse your music by Folder

There is a new **Folders** link at the top of the Browse sidebar.

It shows your catalogs as the real folder tree on disk, with the songs, podcast episodes and videos inside each folder.

![image](https://github.com/user-attachments/assets/ac988f7d-ff79-4afc-9909-90bbfaedcae8)

Folder rows work like any other library item:

* Play, Play Next and Play Last on hover
* Add to the temporary playlist or a saved playlist
* Folders can be rated and flagged
* Shout, share and batch download actions

Folder art falls back to a folder icon when no image is found.

You can hide the link with the new `Show 'Folders' link in the main sidebar` preference.

**NOTE** the link only appears after your admin has run the new Scan Folders catalog action.

## Ampache on your phone

The desktop theme now has a proper mobile layout on screens up to 768px wide.

* The page fits the screen; no more zoomed-out desktop rendering with a stuck player
* A compact header stays pinned to the top with a hamburger menu button
* The sidebar becomes a slide-in drawer with a dim backdrop; tap outside or the X to close
* The temporary playlist drops down below the header from its usual button
* Album, artist and song pages stack the art above the details instead of overlapping
* Wide tables scroll sideways inside their box

![image](https://github.com/user-attachments/assets/c1dc82ea-eb71-4cdf-8f64-9b276e4e2a9a)

![image](https://github.com/user-attachments/assets/bae9e63c-acd3-47ed-9d59-3814b5127c94)

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

![image](https://github.com/user-attachments/assets/721d22f5-ebbe-411a-9f0b-fadb71eed66d)

## OpenSubsonic is the default Subsonic implementation

All Ampache8 users will default to OpenSubsonic to ensure that everyone is using the latest version.

You can still disable OpenSubsonic but the old implementation is now 1.16.1 compatible and does not support OpenSubsonic extensions.

Subsonic clients that request a transcode bitrate now get the bitrate they asked for.

## Upload page folder tree fixed

The destination folder tree on the upload page shows its folder, checkbox and chevron icons again.

![image](https://github.com/user-attachments/assets/9f64d419-ee98-412d-961a-22eaa72f20c9)

## Smaller fixes you might notice

* Adding songs to a playlist skips duplicates correctly again
* Democratic play shows the configured base playlist when the queue is empty
* Downloads work again on password protected streams

## New Database Options / User preferences

Added:

* `Allow Ampache API8 responses` - enable or disable the new API8 per user
* `Show 'Folders' link in the main sidebar` - show or hide the Folders browse link

Removed:

* `Authorize Flash Web Player`
* `Authorize JavaScript decoder (Aurora.js) in Web Player`
* `Use an alternative playback action for streaming` (play2)
