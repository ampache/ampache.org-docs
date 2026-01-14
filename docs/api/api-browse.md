---
title: "API Browse methods"
metaTitle: "API Browse methods"
description: "API documentation"
---

Starting in Amapche 6.5.0, API6 has added additional sorting and filtering options to browse methods.

A browse method is used for actions that return many items that can be filtered further.

Example:

* The `artists` method is used to show many artists and is a browse action.
* The `artist` method is used to show details for a single artist.

These methods utilize the Ampache Browse class to allow more advanced queries without having to use searches or post-processing by the client.

The browse can be filtered and sorted based on the output type.

## Additional browse parameters

Each method now has 2 additional parameters.

### cond

Apply a filter to the objects.

Add comma separated filter and value pairs, use `;` to split additional filters.

e.g. `&cond=artist,1240;catalog,2`

Conditions that don't require a value can be sent with a null value.

e.g. `&cond=unplayed,;catalog,2`

Example:

* The `songs` method uses a song browse to return `song` objects.
* You can filter this browse by `genre` and return all songs that have that genre.

e.g. `https://music.com.au/server/json.server.php?action=songs&auth=eeb9f1b6056246a7d563f479f518bb34&cond=genre,111`

### sort

Apply a different sort for the output repsonse.

**NOTE** There can only be one sort applied to each browse.

The default sort is (usually) `name`. This is the name of the returned objects sorted ascending.

The sort parameter docstring on each browse method will tell you the default sort and link to available sorts.

Example:

* The `users` method uses a user browse to return `user` objects in order of id number.
* You can sort this browse by `username` and return all users in alphabetical order.

e.g. `https://music.com.au/server/json.server.php?action=users&auth=f57766d256df0ad5e5ec163d35f05a21&sort=username,desc`

## Browse types and available methods

When you create a browse you are querying a database table and to return an object from that table.

The exception to this is a `playlist_search` browse which is a combination of `playlist` and `search` tables.

The API generally treats playlists as a single object so it may be a bit confusing to see that these are two separate objects.

To allow this; all searches are prefixed with 'smart_' meaning that the search `2256` will return as `smart_2256`.

The following pages will list the available conditions and sort options for each browse type.

* [Album Browses](https://ampache.org/api/browse/album-browse) browses
  * albums
  * artist_albums (`albums` filtered by `artist`)
  * genre_albums (`albums` filtered by `genre`)
* [Artist Browses](https://ampache.org/api/browse/artist-browse) browses (includes `album_artist` and `song_artist` subtypes.)
  * artists
  * genre_artists (`artists` filtered by `genre`)
  * label_artists (`artists` filtered by `label`)
* [Catalog Browses](https://ampache.org/api/browse/catalog-browse) browses
  * catalogs
* [Follower Browses](https://ampache.org/api/browse/follower-browse) browses
  * followers
* [Genre Browses](https://ampache.org/api/browse/genre-browse) browses
  * genres
* [Label Browses](https://ampache.org/api/browse/label-browse) browses
  * labels
* [License Browses](https://ampache.org/api/browse/license-browse) browses
  * licences
* [Live Stream Browses](https://ampache.org/api/browse/live_stream-browse) browses
  * live_streams
* [Playlist Browses](https://ampache.org/api/browse/playlist-browse) browses
  * playlists (Combine `playlist` and `smartlist` objects into a single list)
  * user_playlists (`playlists` filtered by `user`)
  * user_smartlists (`smartlists` filtered by `user`)
* [Podcast Browses](https://ampache.org/api/browse/podcast-browse) browses
  * podcasts
* [Podcast Episode Browses](https://ampache.org/api/browse/podcast-browse) browses
  * podcast_episodes
* [Share Browses](https://ampache.org/api/browse/share-browse) browses
  * shares
* [Song Browses](https://ampache.org/api/browse/song-browse) browses
  * album_songs (`songs` filtered by `album`)
  * artist_songs (`songs` filtered by `artist`)
  * genre_songs (`songs` filtered by `genre`)
  * license_songs (`songs` filtered by `license`)
  * songs
* [User Browses](https://ampache.org/api/browse/user-browse) browses
  * users
* [Video Browses](https://ampache.org/api/browse/video-browse) browses
  * videos

* Methods that return multiple object types return type browses
  * 'catalog', 'artist', 'album', 'song', 'podcast', 'podcast_episode'
    * browse
  * 'album_artist', 'album', 'artist', 'catalog', 'live_stream', 'playlist', 'podcast_episode', 'podcast', 'share', 'song_artist', 'song', 'video'
    * get_indexes
    * index
    * list

## Available cond filters

Allowed conditional filters are derived from the output type.

Conditions are documented for each method, some of these filters are used by the method to create the output.

**NOTE** You can overwrite filters applied to a method with your own conditions and this can break your expected response

You can apply any valid filter for that output type on top of the default filters to these methods.

For example genre_artists uses the `tag` filter to identify the tag and return artist objects.

* Call genre_artists for the tag 215. `https://music.com.au/server/json.server.php?action=genre_artists&auth=APIKEY&filter=215`
* Add `https://music.com.au/server/json.server.php?action=genre_artists&auth=APIKEY&filter=215&cond=tag,111`
* Your call will return Artists who are connected to the 111 genre insteas of 215.

When you add a conditional parameter you are overwriting any default filter applied by the method.

|      Condition      |                                Browse Types                                 |
|:-------------------:|:---------------------------------------------------------------------------:|
|         id          |                     All (excluding `follower` browses)                      |
|        like         |                     All (excluding `follower` browses)                      |
|      not_like       |                     All (excluding `follower` browses)                      |
|        equal        |                     All (excluding `follower` browses)                      |
|     regex_match     |                     All (excluding `follower` browses)                      |
|   regex_not_match   |                     All (excluding `follower` browses)                      |
|     starts_with     |                     All (excluding `follower` browses)                      |
|   not_starts_with   |                     All (excluding `follower` browses)                      |
|       add_gt        |                   album,artist,podcast_episode,song,video                   |
|       add_lt        |                   album,artist,podcast_episode,song,video                   |
|    album_artist     |                                   artist                                    |
|     song_artist     |                                   artist                                    |
|       artist        |                                 album,song                                  |
|    album_artist     |                                    album                                    |
|     song_artist     |                                    album                                    |
|       catalog       |         album,artist,live_stream,podcast_episode,podcast,song,video         |
|   catalog_enabled   |         album,artist,live_stream,podcast_episode,podcast,song,video         |
|    user_catalog     |         album,artist,live_stream,podcast_episode,podcast,song,video         |
|      user_flag      | album,artist,live_stream,podcast_episode,podcast,song,video,playlist_search |
|     user_rating     | album,artist,live_stream,podcast_episode,podcast,song,video,playlist_search |
|        label        |                                   artist                                    |
|        genre        |                        album,artist,genre,song,video                        |
|      unplayed       |                  album,artist,podcast_episode,podcast,song                  |
|      update_gt      |                           album,artist,song,video                           |
|      update_lt      |                           album,artist,song,video                           |
|       enabled       |                                catalog,song                                 |
|     gather_type     |                                   catalog                                   |
|    gather_types     |                                   catalog                                   |
|        user         |                           catalog,follower,share                            |
|       to_user       |                                  follower                                   |
|       hidden        |                                    genre                                    |
|     object_type     |                                    genre                                    |
|   not_starts_with   |                               genre,playlist                                |
|    playlist_open    |                                  playlist                                   |
|    playlist_type    |                                  playlist                                   |
|    playlist_user    |                                  playlist                                   |
| hide_dupe_smartlist |                            Invalid array length                             |
|      smartlist      |                               playlist_search                               |
|       podcast       |                               podcast_episode                               |
|       object        |                                    share                                    |
|     object_type     |                                    share                                    |
|    creation_date    |                                    share                                    |
|   lastvisit_date    |                                    share                                    |
|       counter       |                                    share                                    |
|     max_counter     |                                    share                                    |
|    allow_stream     |                                    share                                    |
|   allow_download    |                                    share                                    |
|       expire        |                                    share                                    |
|        album        |                                    song                                     |
|     album_disk      |                                    song                                     |
|        disk         |                                    song                                     |
|       license       |                                    song                                     |
|        top50        |                                    song                                     |
|       access        |                                    user                                     |
|      disabled       |                                    user                                     |

## Available sort... sorts

Check out the object pages for available sorts and filters
