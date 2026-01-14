---
title: "Ampache Use Cases"
metaTitle: "Ampache Use Cases"
description: "Ampache Use Cases"
---

This page describes some of the various tasks that Ampache accomplish. It will define why and how these tasks behave and can be accomplished within Ampache. If your particular use case isn't listed here, feel free to submit a [Feature Request](https://github.com/ampache/ampache/issues/new?assignees=&labels=&template=feature_request.md&title=[Feature+Request]). What you want to do may already be possible, and is just waiting to be written on this page.

## Table of Contents

* [Store music library (music files, playlists, etc.) on a single source to access from multiple devices](#store-music-library-music-files-playlists-etc-on-a-single-source-to-access-from-multiple-devices)
* [Manage music library (sorting, arranging playlists, play songs)](#manage-music-library-sorting-arranging-playlists-play-songs)
* [Sync local changes with the central server](#sync-local-changes-with-the-central-server)
* [Download music/playlists locally for offline use](#download-musicplaylists-locally-for-offline-use)

### Store music library (music files, playlists, etc.) on a single source to access from multiple devices

This is what Ampache excels at. Ampache reads metadata from music files, and then stores the information in a database. If the machine that Ampache is installed on is accessible to your local network and/or the internet, then you can access your entire music library from nearly any other LAN/internet connected device. This eliminates the need to copy your music to multiple devices.

Once installed, you can connect to Ampache using its IP address (e.g. 192.168.1.28) from a web browser. If you don't know how to find the local IP check out this [How-to Geek article](https://www.howtogeek.com/236838/how-to-find-any-devices-ip-address-mac-address-and-other-network-connection-details/).

To access Ampache from outside your local network, you will most likely need to forward the correct port/s (80, 443) from your router, and then determine your external IP address. This is outside of the scope of this document, but check out [portforward.com](https://portforward.com/) for more information. If you still are unable to figure it out, open a new issue with everything you have tried and what you are stuck on. Assistance will be provided when possible.

### Manage music library (sorting, arranging playlists, play songs)

The Ampache [Web Interface](/docs/information/Web-Interface) provides many different methods for managing your library. By navigating the interface, you can browse and play back single tracks, whole albums, or all music from an artist. The global search located at the top right of the interface will return all artists/albums/songs matching your query. Advanced search allows fine grained results such as searching specific genres, years, artists, etc. Ampache also supports creating custom playlists, as well as smart playlists which automatically update from an advanced search query. Finally, if you're not sure what to listen to, Ampache can randomly select songs, albums, artists, or playlists.

### Sync local changes with the central server

With Ampache, any changes made through the web interface are immediately saved to the database (and additionally written to the music's tags if desired). If you wish to make changes to music outside of Ampache with an external program or if you sync your files, then you can update the Ampache database through the web interface, or though the command line.

### Download music/playlists locally for offline use

You are able to download songs, albums, or playlists through the web interface as a zip file. It is not yet possible to sync music, or play music while offline. Ampache also provides several backends for different applications (Subsonic, XML-API, UPnp/DLNA) that are fully compatible, which can provide functionality such as saving music for offline play. Please visit the [Clients](/docs/clients) page to know more.
