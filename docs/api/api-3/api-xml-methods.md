---
title: "XML Methods"
metaTitle: "XML Methods"
description: "API documentation"
---

## API3 XML Methods

Lets go through come calls and examples that you can do for each XML method.

## Non-Data Methods

### handshake

This is the function that handles verifying a new handshake Takes a timestamp, auth key, and username.

| Input       | Type    | Description                                                                                     | Optional |
|-------------|---------|-------------------------------------------------------------------------------------------------|---------:|
| 'auth'      | string  | $passphrase (Timestamp . Password SHA hash) OR (API Key)                                        |       NO |
| 'user'      | string  | $username (Required if login/password authentication)                                           |      YES |
| 'timestamp' | integer | UNIXTIME() (Timestamp used in seed of password hash. Required if login/password authentication) |      YES |
| 'version'   | string  | $version (API Version that the application understands)                                         |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/handshake.xml)

### ping

This can be called without being authenticated, it is useful for determining if what the status of the server is, and what version it is running/compatible with

| Input     | Type   | Description                                                                | Optional |
|-----------|--------|----------------------------------------------------------------------------|---------:|
| 'auth'    | string | (Session ID) returns version information and extends the session if passed |      YES |
| 'version' | string | $version (API Version that the application understands)                    |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/ping.xml)

### url_to_song

This takes a url and returns the song object in question

| Input | Type   | Description                                                   | Optional |
|-------|--------|---------------------------------------------------------------|---------:|
| 'url' | string | Full Ampache URL from server, translates back into a song XML |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/url_to_song.xml)

## Data Methods

### advanced_search

#### Changes to text searches

* 'is not' has been added shifting values down the list.
  0=contains, 1=does not contain, 2=starts with, 3=ends with
  4=is, 5=is not, 6=sounds like, 7=does not sound like
* rule_1['name'] is depreciated. Instead of rule_1['name'] use rule_1['title'] (I have put a temp workaround into the search rules to alleviate this change for any existing apps)

#### Using advanced_search

Perform an advanced search given passed rules. This works in a similar way to the web/UI search pages.
You can pass multiple rules as well as joins to create in depth search results

Rules must be sent in groups of 3 using an int (starting from 1) to designate which rules are combined.
Use operator ('and'|'or') to choose whether to join or separate each rule when searching.

Refer to the [Advanced Search](/api/api-advanced-search) page for details about creating searches.

* INPUTS
  * ampache_url = (string)
  * ampache_API = (string)
  * operator = (string) 'and'|'or' (whether to match one rule or all)
  * rules = (array) = [[`rule_1`, `rule_1_operator`, `rule_1_input`], [`rule_2`, `rule_2_operator`, `rule_2_input`], [etc]]
  * type = (string) `song`, `album`, `artist`, `playlist`, `label`, `user`, `video`
  * random = (integer) `0`, `1` (random order of results; default to 0)
  * offset = (integer)
  * limit = (integer)

SONG

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/advanced_search%20\(song\).xml)

ARTIST

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/advanced_search%20\(artist\).xml)

ALBUM

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/advanced_search%20\(album\).xml)

### albums

This returns albums based on the provided search filters

| Input     | Type       | Description                                                                                        | Optional |
|-----------|------------|----------------------------------------------------------------------------------------------------|---------:|
| 'filter'  | string     | Value is Alpha Match for returned results, may be more than one letter/number                      |      YES |
| 'exact'   | boolean    | if true filter is exact rather then fuzzy                                                          |       NO |
| 'add'     | set_filter | ISO 8601 Date Format (2020-09-16) Find objects with an 'add' date newer than the specified date    |      YES |
| 'update'  | set_filter | ISO 8601 Date Format (2020-09-16) Find objects with an 'update' time newer than the specified date |      YES |
| 'offset'  | integer    | Return results starting from this index position                                                   |      YES |
| 'limit'   | integer    |                                                                                                    |      YES |
| 'include' | string     | `albums`, `songs` (include child objects in the response)                                          |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/albums.xml)

### album

This returns a single album based on the UID provided

| Input     | Type    | Description                                                                                                              | Optional |
|-----------|---------|--------------------------------------------------------------------------------------------------------------------------|---------:|
| 'filter'  | integer | UID of Album, returns album XML                                                                                          |       NO |
| 'include' | array   | Array specified using GET convention, can contain `songs` and will include the corresponding XML nested in the album XML |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/album.xml)

### album_songs

This returns the songs of a specified album

| Input    | Type    | Description                                      | Optional |
|----------|---------|--------------------------------------------------|---------:|
| 'filter' | integer | UID of Album, returns song XML                   |       NO |
| 'offset' | integer | Return results starting from this index position |      YES |
| 'limit'  | integer | Maximum number of results to return              |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/album_songs.xml)

### artists

This takes a collection of inputs and returns artist objects.

| Input     | Type       | Description                                                                                        | Optional |
|-----------|------------|----------------------------------------------------------------------------------------------------|---------:|
| 'filter'  | string     | Value is Alpha Match for returned results, may be more than one letter/number                      |      YES |
| 'exact'   | boolean    | if true filter is exact rather then fuzzy                                                          |      YES |
| 'add'     | set_filter | ISO 8601 Date Format (2020-09-16) Find objects with an 'add' date newer than the specified date    |      YES |
| 'update'  | set_filter | ISO 8601 Date Format (2020-09-16) Find objects with an 'update' time newer than the specified date |      YES |
| 'offset'  | integer    | Return results starting from this index position                                                   |      YES |
| 'limit'   | integer    | Maximum number of results to return                                                                |      YES |
| 'include' | string     | `albums`, `songs` (include child objects in the response)                                          |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/artists.xml)

### artist

This returns a single artist based on the UID of said artist

| Input     | Type   | Description                                                                                                                           | Optional |
|-----------|--------|---------------------------------------------------------------------------------------------------------------------------------------|---------:|
| 'filter'  | string | UID of Artist, returns artist XML                                                                                                     |       NO |
| 'include' | array  | Array specified using GET convention, can contain `albums` or `songs` and will include the corresponding XML nested in the artist XML |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/artist.xml)

### artist_albums

This returns the albums of an artist

| Input    | Type    | Description                                      | Optional |
|----------|---------|--------------------------------------------------|---------:|
| 'filter' | integer | UID of Artist, returns Album XML                 |       NO |
| 'offset' | integer | Return results starting from this index position |      YES |
| 'limit'  | integer | Maximum number of results to return              |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/artist_albums.xml)

### artist_songs

This returns the songs of the specified artist

| Input    | Type    | Description                                      | Optional |
|----------|---------|--------------------------------------------------|---------:|
| 'filter' | integer | UID of Artist, returns Song XML                  |       NO |
| 'offset' | integer | Return results starting from this index position |      YES |
| 'limit'  | integer | Maximum number of results to return              |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/artist_songs.xml)

### followers

This gets a user's followers

| Input      | Type   | Description                                        | Optional |
|------------|--------|----------------------------------------------------|---------:|
| 'username' | string | Username of the user for who to get followers list |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/followers.xml)

### following

This get the user list followed by a user

| Input      | Type   | Description                                         | Optional |
|------------|--------|-----------------------------------------------------|---------:|
| 'username' | string | (Username of the user for who to get following list |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/following.xml)

### friends_timeline

This get current user friends timeline

| Input   | Type    | Description                         | Optional |
|---------|---------|-------------------------------------|---------:|
| 'limit' | integer | Maximum number of results to return |      YES |
| 'since' | integer | UNIXTIME()                          |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/friends_timeline.xml)

### last_shouts

This get the latest posted shouts

| Input      | Type    | Description                                       | Optional |
|------------|---------|---------------------------------------------------|---------:|
| 'username' | string  | Username of the user for who to get latest shouts |      YES |
| 'limit'    | integer | Maximum number of results to return               |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/last_shouts.xml)

### playlists

This returns playlists based on the specified filter

| Input    | Type    | Description                                                                   | Optional |
|----------|---------|-------------------------------------------------------------------------------|---------:|
| 'filter' | string  | Value is Alpha Match for returned results, may be more than one letter/number |      YES |
| 'exact'  | boolean | if true filter is exact rather then fuzzy                                     |      YES |
| 'offset' | integer | Return results starting from this index position                              |      YES |
| 'limit'  | integer | Maximum number of results to return                                           |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/playlists.xml)

### playlist

This returns a single playlist

| Input    | Type   | Description                           | Optional |
|----------|--------|---------------------------------------|---------:|
| 'filter' | string | UID of playlist, returns playlist XML |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/playlist.xml)

### playlist_songs

This returns the songs for a playlist

| Input    | Type    | Description                                      | Optional |
|----------|---------|--------------------------------------------------|---------:|
| 'filter' | string  | UID of Playlist, returns song XML                |       NO |
| 'offset' | integer | Return results starting from this index position |      YES |
| 'limit'  | integer | Maximum number of results to return              |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/playlist_songs.xml)

### playlist_create

This create a new playlist and return it

| Input  | Type   | Description                         | Optional |
|--------|--------|-------------------------------------|---------:|
| 'name' | string | Playlist name                       |       NO |
| 'type' | string | `public`, `private` (Playlist type) |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/playlist_create.xml)

### playlist_delete

This deletes a playlist

| Input    | Type   | Description     | Optional |
|----------|--------|-----------------|---------:|
| 'filter' | string | UID of Playlist |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/playlist_delete.xml)

### playlist_add_song

This adds a song to a playlist. setting check=1 will not add duplicates to the playlist

| Input    | Type    | Description                    | Optional |
|----------|---------|--------------------------------|---------:|
| 'filter' | integer | UID of Playlist                |       NO |
| 'song'   | integer | UID of song to add to playlist |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/playlist_add_song.xml)

### playlist_remove_song

This remove a song from a playlist.

**NOTE** In API3 this function don't not allow `song` parameters

| Input    | Type    | Description                          | Optional |
|----------|---------|--------------------------------------|---------:|
| 'filter' | string  | UID of Playlist                      |       NO |
| 'track'  | integer | Track number to remove from playlist |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/playlist_remove_song.xml)

### rate

This rates a library item

| Input    | Type    | Description                                                                                             | Optional |
|----------|---------|---------------------------------------------------------------------------------------------------------|---------:|
| 'type'   | string  | `song`, `album`, `artist`, `playlist`, `podcast`, `podcast_episode`, `video`, `tvshow`, `tvshow_season` |       NO |
| 'id'     | string  | library item id                                                                                         |       NO |
| 'rating' | integer | rating between 0-5                                                                                      |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/rate.xml)

### search_songs

This searches the songs and returns... songs

| Input    | Type    | Description                                      | Optional |
|----------|---------|--------------------------------------------------|---------:|
| 'filter' | string  | Value is Alpha Match for Name returns share XML  |       NO |
| 'offset' | integer | Return results starting from this index position |      YES |
| 'limit'  | integer | Maximum number of results to return              |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/search_songs.xml)

### songs

Returns songs based on the specified filter

| Input    | Type       | Description                                                                                        | Optional |
|----------|------------|----------------------------------------------------------------------------------------------------|---------:|
| 'filter' | string     | Value is Alpha Match for returned results, may be more than one letter/number                      |       NO |
| 'add'    | set_filter | ISO 8601 Date Format (2020-09-16) Find objects with an 'add' date newer than the specified date    |      YES |
| 'update' | set_filter | ISO 8601 Date Format (2020-09-16) Find objects with an 'update' time newer than the specified date |      YES |
| 'exact'  | boolean    | if true filter is exact rather then fuzzy                                                          |       NO |
| 'offset' | integer    | Return results starting from this index position                                                   |      YES |
| 'limit'  | integer    | Maximum number of results to return                                                                |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/songs.xml)

### song

returns a single song

| Input    | Type    | Description                   | Optional |
|----------|---------|-------------------------------|---------:|
| 'filter' | integer | UID of Song, returns song XML |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/song.xml)

### stats

Get some items based on some simple search types and filters.

**NOTE** In API3 this function only returns albums

| Input      | Type    | Description                                                      | Optional |
|------------|---------|------------------------------------------------------------------|---------:|
| 'type'     | string  | `newest`, `highest`, `frequent`, `recent`, `forgotten`, `random` |       NO |
| 'username' | string  | Used for recent searches.                                        |      YES |
| 'offset'   | integer | Return results starting from this index position                 |      YES |
| 'limit'    | integer | Maximum number of results to return                              |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/stats%20\(album\).xml)

### tags

This returns the tags (Genres) based on the specified filter

**NOTE** For API3 forward compatability, this function is also called with `genres`

| Input    | Type    | Description                                                                   | Optional |
|----------|---------|-------------------------------------------------------------------------------|---------:|
| 'filter' | string  | Value is Alpha Match for returned results, may be more than one letter/number |      YES |
| 'exact'  | boolean | if true filter is exact rather then fuzzy                                     |      YES |
| 'offset' | integer | Return results starting from this index position                              |      YES |
| 'limit'  | integer | Maximum number of results to return                                           |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/tags.xml)

### tag

This returns a single tag based on UID

**NOTE** For API3 forward compatability, this function is also called with `genre`

| Input    | Type    | Description                 | Optional |
|----------|---------|-----------------------------|---------:|
| 'filter' | integer | UID of tag, returns tag XML |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/tag.xml)

### tag_artists

This returns the artists associated with the tag in question as defined by the UID

**NOTE** For API3 forward compatability, this function is also called with `genre_artists`

| Input    | Type    | Description                                      | Optional |
|----------|---------|--------------------------------------------------|---------:|
| 'filter' | integer | UID of tag, returns artist XML                   |       NO |
| 'offset' | integer | Return results starting from this index position |      YES |
| 'limit'  | integer | Maximum number of results to return              |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/tag_artists.xml)

### tag_albums

This returns the albums associated with the tag in question

**NOTE** For API3 forward compatability, this function is also called with `genre_albums`

| Input    | Type    | Description                                      | Optional |
|----------|---------|--------------------------------------------------|---------:|
| 'filter' | integer | UID of tag, returns album XML                    |       NO |
| 'offset' | integer | Return results starting from this index position |      YES |
| 'limit'  | integer | Maximum number of results to return              |      YES |

[api-json-methods.md](..%2Fapi-4%2Fapi-json-methods.md)
[api-xml-methods.md](..%2Fapi-4%2Fapi-xml-methods.md)
[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/tag_albums.xml)

### tag_songs

returns the songs for this tag

**NOTE** For API3 forward compatability, this function is also called with `genre_songs`

| Input    | Type    | Description                                      | Optional |
|----------|---------|--------------------------------------------------|---------:|
| 'filter' | integer | UID of tag, returns song XML                     |       NO |
| 'offset' | integer | Return results starting from this index position |      YES |
| 'limit'  | integer | Maximum number of results to return              |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/tag_songs.xml)

### timeline

This gets a user's timeline

| Input      | Type    | Description                                       | Optional |
|------------|---------|---------------------------------------------------|---------:|
| 'username' | string  | Username of the user for whom to get the timeline |       NO |
| 'limit'    | integer | Maximum number of results to return               |      YES |
| 'since'    | integer | UNIXTIME()                                        |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/timeline.xml)

### toggle_follow

This follow/unfollow a user

| Input      | Type   | Description                             | Optional |
|------------|--------|-----------------------------------------|---------:|
| 'username' | string | Username of the user to follow/unfollow |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/toggle_follow.xml)

### user

This gets a user's public information

| Input      | Type   | Description                                 | Optional |
|------------|--------|---------------------------------------------|---------:|
| 'username' | string | Username of the user for who to get details |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/user.xml)

### videos

This returns video objects!

| Input    | Type    | Description                                                                   | Optional |
|----------|---------|-------------------------------------------------------------------------------|---------:|
| 'filter' | string  | Value is Alpha Match for returned results, may be more than one letter/number |       NO |
| 'exact'  | boolean | if true filter is exact rather then fuzzy                                     |      YES |
| 'offset' | integer | Return results starting from this index position                              |      YES |
| 'limit'  | integer | Maximum number of results to return                                           |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/videos.xml)

### video

This returns a single video

| Input    | Type    | Description                     | Optional |
|----------|---------|---------------------------------|---------:|
| 'filter' | integer | UID of video, returns video XML |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/video.xml)

## Control Methods

### democratic

This is for controlling democratic play

* ACTION
  * method
    * vote
      * oid (Unique ID of the element you want to vote on)
    * devote
      * oid (Unique ID of the element you want to vote on)
    * playlist (Returns an array of song items with an additional \<vote>[VOTE COUNT]\</vote> element)
    * play (Returns the URL for playing democratic play)

| Input    | Type    | Description                          | Optional |
|----------|---------|--------------------------------------|---------:|
| 'oid'    | integer | UID of Song object                   |       NO |
| 'method' | string  | `vote`, `devote`, `playlist`, `play` |       NO |

```XML
TBC
```

### localplay

This is for controlling localplay

| Input     | Type   | Description                    | Optional |
|-----------|--------|--------------------------------|---------:|
| 'command' | string | `next`, `prev`, `stop`, `play` |       NO |

* return

```XML
<root>
    <localplay>
        <command>
            <next>|<prev>|<stop>|<play>|<pause>|<add>|<volume_up>|<volume_down>|<volume_mute>|<delete_all>|<skip>|<status>
        </command>
    </localplay>
</root>
```

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api3/docs/xml-responses/localplay.xml)
