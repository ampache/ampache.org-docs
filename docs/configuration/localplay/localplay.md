# Localplay

Ampache has the ability to remote control 3rd party programs through the web interface. Localplay works on the principle of a **Controller** written by someone and placed in your _/modules/localplay_ directory and then individual **Instances** of a given Localplay Controller. Each instance has its own distinct settings, owner and permissions.

## Default Localplay Controllers

* [MPD](/docs/configuration/localplay/mpd) _Linux_
* [HttpQ](/docs/configuration/localplay/HttpQ) _Windows_
* [VideoLan Client](/docs/configuration/localplay/VLC) _Linux and Windows_
* [Kodi / XBMC](https://github.com/ampache/ampache-xbmc-plugin) _Linux and Windows_
* [UPnP](/docs/configuration/api#upnp--dlna-api) _Linux and Windows_

## Localplay Permission Levels

Ampache divides up Localplay into a few user levels, _None, User, Manager_ and _Admin_ By default everyone is assigned the _None_ level. With this level they will not be able to use Localplay. If you would like your users to be able to interact with the Localplay settings you must set this for them. The permissions are as follows

* **None** - No access.
* **User** - Can change their Own Active Instance and view the current playlist, can not modify anything but they can still add to the MPD playlist
* **Manager** - Managers can do everything except for Delete or Add new instances, this includes modifying the playlist, stoping and starting the player or changing the volume
* **Admin** - Can do anything

## Uses of Localplay

One of the most common uses of localplay is controlling a home or office stereo. You simply need to plug a computer into the stereo and run either HttpQ or MPD on it, then you can push music to your stereo from any place you can access your Ampache Install. The computer hooked up to the stereo does not need to have a copy of any of the music, as everything is done over HTTP streams.