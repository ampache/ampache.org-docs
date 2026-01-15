---
title: "Ampache6 for Users"
metaTitle: "Ampache6 for Users"
description: "Ampache6 for Users"
---

## Ampache6 for Users

This page will cover some of the visual and feature changes you'll see in Ampache6

For information about Admin and backend changes check out [Ampache6 for Admins](/docs/old-information/ampache6-details)

As an Ampache user, it might not seem like a lot has changed.

So let's start with probably the biggest user facing change you'll see.

## Searches and smartlists consider the owner of the list instead of the current User

Previously, Ampache would run searches based on the user running the search.

For example the rule 'My Rating' was always you and 'Another User' allowed you to search for different user ratings.

So in Ampache5 if I make a playlist called "Lachlan's awesome mix" and then my friend opens the list, the rules are applied using the person opening the list and not me.

### What's changed

When a user owns the playlist, it will always make searches using their user ID instead of yours.

As an example lets look at this playlist. The playlist is owned by a user called tom.

![image](https://github.com/ampache/ampache/assets/1305249/11b48e0e-b753-401e-b02f-37ba50059cd4)

Tom has shared this playlist with me and When I load it up I can see his 4/5 star rated songs.

![image](https://github.com/ampache/ampache/assets/1305249/6a55f20b-99bd-4c80-a4de-0f2d2b020874)

In Ampache5 you had to make sure your searches were explicitly naming the user. Otherwise, I'd have gotten a list of **my** 4/5 star artists.

If the playlist is owned by the System user, the results will function the same way as before and use your user for the results.

Think of the system playlists as a public shared list which no specific owner.

## Album version/releasecomment added to the grouping

For albums that have been duplicated in your library there is now an additional column for version called Release Comment.

This field looks for the tag `Version`.

![image](/img/1305249/221723870-b4a7fc02-632e-44f0-a109-bc1c612b5ca0.png)

Now that you have this tag set you can hide or show the release comment using `Show Album subtitle on links (if available)`

![image](/img/1305249/231027119-d50a0073-3039-4046-8ffe-311a853e54ca.png)

This will allow you to identify Weezer albums without having to pull your hair out

![image](/img/1305249/231028247-79d29f12-382f-4d81-9e92-151331724a1d.png)

## Allow permalink user streams

A stream token can be added to your account by an admin from the edit user pages.

![image](/img/1305249/199862299-a514f7fb-dd63-491d-87b5-802ec26e132a.png)

This allows streams without the risk of the session expiring by using a static token.

When you have a stream token **all** Democratic, Song, Podcast Episode and Video Streams will use this token.

This token does not allow a user to do anything except stream music so don't worry about it being used to access your account.

## Subsonic 1.16.1 support

Ampache has always had a semi correct Subsonic implementation. Now in Ampache6 the API has been updated to the last released version (1.16.1 released with Subsonic 6.1.6)

## New webplayer options

The Ampache webplayer (jPlayer) has had a few new options added

### Remove played tracks from the playlist

With this option you can remove a number of songs before the currently playing track

![image](/img/1305249/205819857-c077d35f-dc8a-4f89-9798-7cb4b5c95c9d.png)

This will happen when a song is played so you can pause and move objects around the playlist without them being lost

### Loop Playlist

In the webplayer you can now loop back to the start of your current playlist after it's finished

![image](/img/1305249/205819512-23f80a87-4ef8-4230-8ceb-d2fb8436294d.png)

When you enable this setting the playlist will **not** remove played files

## Channels are gone

Channels have been removed. This feature just isn't comparable to using other streaming servers like [Icecast](/docs/configuration/Ampache-Icecast-and-Liquidsoap).

## Information pages have been split into object types

The information group was an odd one compared to other pages by listing lots of things on a single page

![image](/img/1305249/202939385-dcbda2d6-0fd1-4962-a8e0-b9eb3e2a70f7.png)

Instead of showing long lists of multiple object types we've split these pages into browse pages by object type.

Recent

![image](https://github.com/ampache/ampache/assets/1305249/19e349ec-70ed-42ae-a387-aeecb97316c0)

Newest

![image](https://github.com/ampache/ampache/assets/1305249/5e19f1d4-8fc3-428d-a50d-9481918801ac)

This matches how other pages in the site work as it's not really expected to have different object types on the same page in other areas

## Removed features

As we move things forward some things just don't make the cut for continued support the following features have been removed.

### Art from share page

I looked at ways to make this cleaner but it just looked terrible. So it's been removed to keep as a simple player.

![image](https://github.com/ampache/ampache/assets/1305249/ddf96e28-5c84-4de8-83e6-ec18f8e6260e)

### Soundcloud catalogs

The library was removed from GitHub and looks like Soundcloud has removed access to this feature. (This was also removed in Ampache 5.6.1)

### The Movie Database (TMDB) metadata plugin

Upgrading this plugin was such a low priority that it's been removed instead. Movies are not really what Ampache is for.

I would recommend Jellyfin over Ampache for movie watchers.
