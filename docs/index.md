# Ampache Wiki

## Ampache is...

* A web based audio/video streaming application and file manager allowing you to access your music & videos from anywhere, using almost any internet enabled device.
* A back-end for supplying the player of your choice (with http streaming support) with all of your music.
* Both a front-end and back-end for various Localplay options meaning you can use Ampache to control mpd as well as supply mpd with the music it is to play.

## Ampache is not...

* A universal player. Ampache doesn't use codecs. It simply streams the music to your player / web browser. If set up properly, it can convert music on the fly in case you use a player that doesn't read a specific format. For instance, if your player doesn't support FLAC, Ampache can [Transcode](Transcoding) it on the fly to mp3 or any other format.

## Why Ampache

Besides the great list of features you will find below, there are several great reasons to use Ampache for streaming your music library.

### It's Free and Open Source Software

There are some great options out there for streaming you media. However, they usually come with a catch. With a subscription or high one-time fee Plex offers access to apps, mobile sync, users, Album Art, artist bios, lyrics. Similarly, Subsonic gives access to a personal server address, Podcasts, and DLNA/UPnP with a premium subscription. Ampache already has all of those features by default, for free!

### Powerful API and streaming to any client

If you use Plex, you're stuck with their proprietary apps. You would be hard-pressed to find a music client not compatible with Ampache. By default, you can use the web interface which requires nothing! Otherwise you have the option of a number of native Ampache apps, playlist streaming to apps like VLC, WinAMP, Foobar2000, Windows Media Player, Subsonic API allowing use of all Subsonic clients, UPnP/DLNA, and DAAP with iTunes. Visit the [clients page](Clients) for more information.

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

* Modern HTML5 [Web Player](https://github.com/ampache/ampache/wiki/Web-Player) (embedded or popup)
* [Subsonic Backend](API#subsonic-api) - Compatibility with any Subsonic client
* [DAAP Backend](API#daap-api)
* [UPnP Backend](API#upnp-api)
* [Localplay for Httpq/MPD/VLC/XBMC](Localplay), [Stream](Stream), and [Democratic Playlists](Democratic)
* Live streams/radio
* Subsonic remote catalog (you can import music coming from an existing Subsonic instance)
* SoundCloud remote catalog
* Second Ampache instance as a remote catalog
* Song lyrics from ChartLyrics and LyricsWiki
* Metadata from MusicBrainz
* Get similar artists/biography/pictures asynchronously from Last.FM
* Transcoding (Live transcoding fully configurable using ffmpeg, avconv, neatokeen or any other command)
* Configurable automatic downsampling based on bandwidth usage
* Album art gathered from Amazon, a specified url, or from the filesystem
* Dynamic playlists based on search results which update as your catalog updates
* Per user theme preference and easy theming interface
* Several authentication methods, can be turned off completely for internal instances
* Per User statistics of song/album/artist/genre played
* Democratic Playback based on communal votes from your users to a single output source.
* ... And more!

## Is Ampache Right for Me?

If you would like more information to make a decision, please check out the various [use cases](Ampache-Use-Cases) for the ways others are using Ampache. 

## Try Ampache

### Demo

If you want to try out Ampache without installing it first, visit the [demo page](http://ampache.org/demo.html).

### Installation

To set Ampache up yourself, check out the [general install guide](https://github.com/ampache/ampache/wiki/Installation). Or just browse the sidebar for more information.