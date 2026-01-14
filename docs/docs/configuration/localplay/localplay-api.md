---
title: "Localplay Controller API"
metaTitle: "Localplay Controller API"
description: "Requirements for building a Localplay controller"
---

All controllers and config files are located in /modules/localplay/ they are named with the following conventions. [name of service].controller.php and [name of service].cfg.php. For example if you are using MPD then the names would be mpd.controller.php and mpd.cfg.php The class inside must be Ampache[name of service] in order to avoid conflicts and must extend the localplay_controller class

## Required Functions of Controller

The controller will be called by the Ampache localplay class and must extend the localplay_controller class.

### Required Functionality

* add -- This must take an array of song_id's to be added to the player's playlist
* play -- This function is not passed anything
* stop - This function is not passed anything
* delete - This takes an array of UID's to remove from the players playlist
* get - This must return an array that at the very lease contains ['id'] for each song in the players playlist. For players that can't return data this must be stored in the object...
* status - This returns the current state of the 'localplay' device such as Playing Stopped or Paused.
* connect - This must establish the connection to the daemon and test for it's existance

### Recommended Functionality

* next - This skips to the next song
* prev - This skips to the previous song
* pause - This pauses the song
* skip - This skips to the specified UID as retrieved via get
* repeat - This is passed a bool true/false value to repeat one song
* random - This is passed a bool true/false value to play songs from the playlist in random order
* get_playing - This returns the current track that is playing on the localplay device
* get_playlist - This returns an array of the currently playing songs with the track_id as the key allowing for display/modification

### Optional Functionality

* seek - go to the point x seconds into the song
* randomize - This shuffles the playlist
* move - move song x to position y within the playlist
* delete_all - This clears the entire playlist on the localplay device
* volume_up - This function is simply called and increments the volume by a pre-defined amount
* volume_down - This function is simply called and decreses the volume by a pre-defined amount
