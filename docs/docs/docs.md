---
title: "Wiki"
metaTitle: "Wiki"
description: "Ampache Wiki"
---

## Ampache is

* A web based audio/video streaming application and file manager allowing you to access your music & videos from anywhere, using almost any internet enabled device.
* A back-end for supplying the player of your choice (with http streaming support) with all of your music.
* Both a front-end and back-end for various Localplay options meaning you can use Ampache to control mpd as well as supply mpd with the music it is to play.

## Ampache is not

* A universal player. Ampache doesn't use codecs. It simply streams the music to your player / web browser. If set up properly, it can convert music on the fly in case you use a player that doesn't read a specific format. For instance, if your player doesn't support FLAC, Ampache can [Transcode](/docs/configuration/transcoding/) it on the fly to mp3 or any other format.

## Why Ampache

Besides the great list of features you will find below, there are several great reasons to use Ampache for streaming your music library.

### It's Free and Open Source Software

There are some great options out there for streaming you media. However, they usually come with a catch. With a subscription or high one-time fee Plex offers access to apps, mobile sync, users, Album Art, artist bios, lyrics. Similarly, Subsonic gives access to a personal server address, Podcasts, and DLNA/UPnP with a premium subscription. Ampache already has all of those features by default, for free!

### Powerful API and streaming to any client

If you use Plex, you're stuck with their proprietary apps. You would be hard-pressed to find a music client not compatible with Ampache. By default, you can use the web interface which requires nothing! Otherwise you have the option of a number of native Ampache apps, playlist streaming to apps like VLC, WinAMP, Foobar2000, Windows Media Player, a full [Subsonic and OpenSubsonic API](/docs/configuration/subsonic) allowing use of any Subsonic client, a [Jellyfin-compatible API](/docs/configuration/jellyfin) for Jellyfin audio apps like Finamp and Symfonium, UPnP/DLNA, and DAAP with iTunes. Ampache serves every one of these protocols from the same catalog at the same time, so you're never limited to a single ecosystem of apps. Visit the [clients page](/docs/clients) for more information.

Ampache8 implements the **entire** OpenSubsonic specification, not just a subset, including extensions like `playbackReport`, `topSongsByArtistId`, `transcodeOffset` and, with the AudioMuse plugin installed, `sonicSimilarity`. See the [Subsonic API docs](/api/subsonic) for the full extension list.

### Flexible catalogs

By default, Ampache will scan music straight from your local filesystem, which is fine for most people. What's great about Ampache, is that it can also use other sources to add to its database. Connect your existing Subsonic library, Beets catalog, another Ampache instance, or even SoundCloud!

### Customization

Many different settings for customization are exposed through Ampache's configuration file, or from the Web Interface. Here are just some of the available options:

* Authorization methods such as MySQL, LDAP, HTTP, PAM, OpenID, or other external methods.
* File metadata:
  * Choose to write back metadata to file, or just to database
  * List metadata sources by preference, available options include from filename, ID3 tags, MusicBrainz, TheAudioDB
  * Enable importing custom metadata
* Order album art sources by preference, available options include tags, folder, MusicBrainz, Google, Amazon, TheAudioDB, LastFM
* Enable or disable features such as social, ratings, favorites, broadcasting, channels, podcasts, video, file downloads
* Set the transcoding command, default audio output format, max/min bit rate
* Support for multiple users, and user registration (disabled by default)
* Show now playing or recently played
* ... And so much more.

### Active development

Originally released in 2001, Ampache has maintained a somewhat small but fiercely dedicated following of users and developers nearly 20 years later. As a result, Ampache is very reliable, secure, and loved by everyone that uses it. Even though leadership of the project has changed hands several times, there is always a very passionate and capable person to take the reins. The core goals of Ampache have stayed at the forefront of development, ensuring a fantastic user experience.

## Features

### Clients and protocols

* Modern HTML5 [Web Player](/docs/information/web-player) (embedded or popup) with a built-in equalizer, visualizer and a dedicated mini player for phones
* [Subsonic and OpenSubsonic Backend](/docs/configuration/subsonic) - the full specification, not a subset, so any Subsonic/OpenSubsonic client works
* [Jellyfin-compatible Backend](/docs/configuration/jellyfin) for Jellyfin audio clients such as Finamp, Symfonium and gelly, without running a Jellyfin server
* [DAAP Backend](/docs/configuration/api#daap-api) for iTunes and other DAAP clients
* [UPnP/DLNA Backend](/docs/configuration/api#upnp--dlna-api) for TVs, receivers and other UPnP players
* Native [JSON/XML API](/api) and a fully documented [REST/OpenAPI](/rest) surface, versioned so old clients keep working across upgrades
* [Localplay for Httpq/MPD/VLC/XBMC](/docs/configuration/localplay) and [Democratic Playlists](/docs/configuration/democratic) so a room full of users can vote on and control shared speakers

### Library and discovery

* Video alongside your music in the same catalog
* Real folder browsing of your catalog, not just a tag-simulated view
* Collections - group anything (songs, albums, videos, playlists) into a single browsable shelf
* Moods and track BPM tagging, both searchable and both survive a rescan once hand-set
* Sonic similarity via the [AudioMuse plugin](/docs/plugins/audiomuse) - find tracks that actually sound alike and build a listening path between two songs, on top of the usual Last.FM-style similar artists/biography/pictures
* Dynamic/smart playlists based on search results which update as your catalog updates, plus Playlist Folders to organize them
* Live streams/radio, [Podcasts](/docs/configuration/podcasts) that sync on a schedule, and [Broadcasting/channels](/docs/configuration/broadcasts)
* Subsonic, Beets and SoundCloud remote catalogs, plus importing from a second Ampache instance
* Song lyrics from ChartLyrics and LyricsWiki, metadata from MusicBrainz and TheAudioDB

### Playback and access control

* Transcoding (Live transcoding fully configurable using ffmpeg, avconv, neatokeen or any other command), configurable per user/player
* Configurable automatic downsampling based on bandwidth usage
* Album art gathered from Amazon, a specified url, or from the filesystem
* Per user theme preference and easy theming interface
* Several authentication methods - MySQL, LDAP, HTTP, PAM, OpenID Connect (OIDC), or other external methods - can be turned off completely for internal instances
* Per User statistics of song/album/artist/genre played, with sharper statistics graphs
* ... And more!

## How does Ampache compare?

Curious how Ampache stacks up against other self-hosted music servers like Navidrome? Read the [feature-by-feature comparison](/docs/information/ampache-vs-navidrome).

## Is Ampache Right for Me?

If you would like more information to make a decision, please check out the various [use cases](/docs/information/ampache-use-cases) for the ways others are using Ampache.

## Try Ampache

### Demo

If you want to try out Ampache without installing it first, visit the [demo page](/demo).

### Installation

To set Ampache up yourself, check out the [general install guide](/docs/installation). Or just browse the sidebar for more information.
