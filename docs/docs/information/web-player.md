---
title: "Ampache Web Player"
metaTitle: "Ampache Web Player"
description: "Ampache Web Player"
---

## Ampache Web Player

The default player for the Web Interface is the Web Player. For your convenience or when you are on move, you can listen to music without additional software other than your web browser. If it's not currently enabled, you can set it by clicking the drop-down menu on the top-right corner of any page, and selecting "Web Player".

## The player is HTML5 only

From Ampache8 the Web Player is HTML5 and nothing else. The Flash fallback (`jquery.jplayer.swf`) and the Aurora.js JavaScript decoders have been deleted, along with the `Authorize Flash Web Player`, `Authorize JavaScript decoder (Aurora.js)` and `Authorize HTML5 Web Player` preferences that used to switch between them.

If your browser cannot play a format natively, enable transcoding for it. See [Transcoding](/docs/configuration/transcoding/).

## What is on the bar

Ampache8 rebuilt the player bar into three rows, the same for music and video.

* Top: one centered control strip — previous, play/pause, next, stop, mute, volume, shuffle and repeat
* Middle: a full width seek bar
* Bottom: current time on the left and duration on the right

The action buttons sit together on the right: Add All to playlist, Loop Playlist, Expand playlist, Show/Hide playlist, Visualizer, Broadcast, Show/Hide Now Playing, Lyrics, ReplayGain, Equalizer and Visualizer full-screen.

A 5 band equalizer (80, 240, 750, 2.2k and 6k Hz) has its own button and works alongside ReplayGain and the visualizer.

The waveform display was removed from the player bar; waveforms are still on song pages.

**NOTE** the visualizer and equalizer are not available for remote catalog streams.

See [Ampache8 for Users](/docs/help/troubleshooting/ampache8-for-users#the-web-player-has-been-rebuilt) for screenshots and the rest of the player changes.

## Lyrics

The Lyrics button sits with the other action buttons, so it is there on every screen size, phones included. It opens a lyrics panel above the player bar. It shows the lyrics of the song that is playing and changes with the queue, and it stays open while you move around the site.

* Timed lyrics (LRC) are highlighted line by line as the song plays, with the current line kept in the middle of the panel
* The full screen button in the panel shows the lyrics over the whole screen
* The open button goes to the song's lyrics page, where the lyrics can be edited, searched for again or cleared
* A song with no stored lyrics shows the Lyrics button greyed out. Pressing it opens the lyrics page instead, so someone allowed to edit can search the lyrics plugins or type them in
* The panel only shows lyrics already stored in Ampache. It never searches the lyrics plugins itself

An LRC `[offset:]` tag is applied, so a file that runs early or late is still highlighted on time. An Enhanced LRC line that ends with a closing time tag stops being highlighted at that time, so an instrumental break shows nothing highlighted.

The button is controlled by the `Show lyrics` preference (`show_lyrics`), which is on by default from Ampache 8.5.0. The lyrics page itself is always reachable from a song's page.
