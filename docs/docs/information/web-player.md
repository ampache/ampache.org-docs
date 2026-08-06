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

The action buttons sit together on the right: Add All to playlist, Loop Playlist, Expand playlist, Show/Hide playlist, Visualizer, Broadcast, Show/Hide Now Playing, ReplayGain, Equalizer and Visualizer full-screen.

A 5 band equalizer (80, 240, 750, 2.2k and 6k Hz) has its own button and works alongside ReplayGain and the visualizer.

The waveform display was removed from the player bar; waveforms are still on song pages.

**NOTE** the visualizer and equalizer are not available for remote catalog streams.

See [Ampache8 for Users](/docs/help/troubleshooting/ampache8-for-users#the-web-player-has-been-rebuilt) for screenshots and the rest of the player changes.
