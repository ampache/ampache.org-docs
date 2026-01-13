# Clients

Ampache runs on a web interface allowing you to play media directly from your web browser. See the [Web Interface](/docs/information/Web-Interface) page for more information.

Thanks to its API, Ampache has also been integrated and can be used with many clients on several platforms. You should take a look at the [API](/docs/clients/api) page for details on how to setup these APIs.

## Playlist only clients

Ampache can generate a URL to stream everything you can play on the site to be used anywhere that supports HTTP streams.

These URL's can be guessed and generated if you know what you're doing but an easy way is to use the playlist generation in Ampache itself.

Simply change your playback type to `Stream`

![image](https://user-images.githubusercontent.com/1305249/212818609-1e07f4d7-43e8-49c6-b528-439a06e7c1f5.png)

And then next time you play an item (some items don't update automatically so you might need to reload the page) the `Play` and `Random Play` buttons will now generate a playlist file

![image](https://user-images.githubusercontent.com/1305249/212818526-975fa25a-7486-47e3-ba0c-97432d047926.png)

This file can be used in any media player or used  to copy the URL to import into different players directly.

If you can use the playlist simply import it into your player.

If you're using Develop (Ampache 6.0.0+) you can use a [Streaming Token](https://github.com/ampache/ampache/wiki/ampache6-details#allow-permalink-user-streams) to make these links permanent.

```URL
https://music.com.au/play/index.php?ssid=streamingtoken&type=song&oid=123&uid=1&action=stream&name=Dad%20Rocks-%20-%20Weapons.mp3
https://music.com.au/play/index.php?ssid=streamingtoken&uid=1&random=1&random_type=search&random_id=123
https://music.com.au/play/ssid/streamingtoken/uid/1/random/1/random_type/search/random_id/123
```

|                                       Client Name                                       |      Operating Systems       |                  Description                   |
| :-------------------------------------------------------------------------------------: | :--------------------------: | :--------------------------------------------: |
|        [GoodVibes](https://goodvibes.readthedocs.io/en/stable/installation.html)        |        Linux / Flatpak       |      Free Software Streaming Radio Player      |
|                             [VLC](http://www.videolan.org/)                             |    Linux / Windows / MAC     | Free Software cross-platform multimedia player |
|                        [Foobar2000](http://www.foobar2000.org/)                         |           Windows            |         Advanced freeware audio player         |
| [Windows Media Player](http://windows.microsoft.com/en-us/windows/windows-media-player) |           Windows            |          Media player from Microsoft           |

And almost any media player able to play http streams.

## XML-API clients

Check out the [API Client](https://github.com/ampache/ampache/wiki/api) page for information about the clients, libraries ad plugins that use the Ampache API

## Subsonic API clients

Ampache provides a [Subsonic](http://www.subsonic.org/pages/index.jsp) API backend. This makes it compatible with any Subsonic client. Check out the official list of [Subsonic Apps](http://www.subsonic.org/pages/apps.jsp).

Refer to the [Subsonic](https://github.com/ampache/ampache/wiki/subsonic) wiki pages for information about how Ampache implements the API.

In Dsub, if you have trouble browsing your library, you may try enabling the "Browse By Tags" option in your server settings.

## UPnP/DLNA clients

Ampache provides a [UPnP/DLNA](https://en.wikipedia.org/wiki/Universal_Plug_and_Play) backend. This makes it compatible with any UPnP/DLNA client. Visit Wikipedia to view a list of [UPnP players](https://en.wikipedia.org/wiki/List_of_UPnP_AV_media_servers_and_clients#UPnP_control_points_and_player_software).

## DAAP clients

Ampache provides a [DAAP](https://en.wikipedia.org/wiki/Digital_Audio_Access_Protocol) backend. With this, your server can also be used with Itunes and other DAAP clients. See wikipedia for clients [DAAP clients page](https://en.wikipedia.org/wiki/Digital_Audio_Access_Protocol#DAAP_clients)

## Web clients

[Ample](https://github.com/mitchray/ample) - A simple web browser client for Ampache
