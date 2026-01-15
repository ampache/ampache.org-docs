---
title: "Democratic Play"
metaTitle: "Democratic Play"
description: "Ampache Democratic Play"
---

## Ampache Democratic Play

**Democratic Play** is a communal vote-based playlist feature. It is meant to be used in situations where you have many users and a single output source. Some examples would be an office with a central stereo or a bar / club. There are two types of users on a democratic playlist. Voters and Admins. Voters can only add/remove their votes to/from the playlist. They are only allowed one vote per trac. Admins have all the same rights except they can also completely remove a song from the playlist. All democratic playlists also have a **Base Playlist**. The base playlist is what is used when there are no voted songs. Once a song has been played via democratic play it is removed from the playlist.

## Democratic Play Properties

All democratic playlists have a set of properties. They affect who is assigned to the playlist, and how the playlist behaves.

* **Name** - This is a non-functional property used to identify the playlist
* **Base Playlist** - This is the playlist that songs are pulled from if there are no voted songs
* **Cooldown Time** - This defines the minimum number of minutes between an identical song play, this is not strictly enforced, see Song Selection Rules
* **Level** - Only users of this level or higher will be automatically assigned to this playlist, users may still be manually assigned
* **Primary** - This identifies this playlist as the primary one for people of this level, it will be picked over others of the same level

## Song Selection Rules

When a player requests a democratic playlist item Ampache uses the following rules to determine which song should be played. A reasonable effort will be made to respect the cooldown rule, however in the interest in providing continuous music if Ampache fails to find a song that does not violate the cooldown rule after 5 tries it will simple return what it has found.

* Get the oldest song with the highest votes that does not violate cooldown rules
* Get a random song from the base playlist that does not violate cooldown rules
* Get a random song from the entire catalog that does not violate cooldown rules

## Setting Up Democratic Play

First you must enable Democratic Play in your Ampache installation. It is found under _Preferences, Server Config, System_. Next switch to the _Home_ sidebar menu and click on _Configure Democratic Playlist_ under _Democratic_ to create your first democratic playlist. Once you have created the democratic playlist any users who wishes to vote on the playlist must be set to the _Democratic_ play type. In order to actually start using the Democratic Playlist you must click on the _Play Democratic Playlist_ icon in the democratic playlist section. This will generate and send the correct URL based on your current play method. To avoid abnormal results it is recommended to only have one source reading any one democratic playlist at any one time.

Once you have created your democratic playlist all you need to do to vote for songs is set your play type to **Democratic** and then use ampache as you would normally, selecting songs and streaming them to the democratic playlist. As an admin if you would like your users to not have the option to change their play method away from democratic play see [Web Preferences](/docs/configuration#web-interface-configuration-options).

## Frequently Asked Questions

* **It plays only one song and then stops, why?** Democratic play works by only passing one URL to the player, you must have the player on repeat in order for it to work correctly.
