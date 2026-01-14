---
title: "XML 4.1"
metaTitle: "XML 4.1"
description: "API documentation"
---

Lets go through come calls and examples that you can do for each XML method.

Remember that Binary data methods will not return xml; just the file/data you have requested.

## Non-Data Methods

## handshake

* MINIMUM_API_VERSION=380001

This is the function that handles verifying a new handshake Takes a timestamp, auth key, and username.

@param array $input
@return boolean

| Input       | Type    | Description                                                                                     | Optional |
|-------------|---------|-------------------------------------------------------------------------------------------------|---------:|
| 'auth'      | string  | $passphrase (Timestamp . Password SHA hash) OR (API Key)                                        |       NO |
| 'user'      | string  | $username (Required if login/password authentication)                                           |      YES |
| 'timestamp' | integer | UNIXTIME() (Timestamp used in seed of password hash. Required if login/password authentication) |      YES |
| 'version'   | string  | $version (API Version that the application understands)                                         |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/handshake.xml)

## ping

* MINIMUM_API_VERSION=380001

This can be called without being authenticated, it is useful for determining if what the status of the server is, and what version it is running/compatible with
@param array $input

| Input  | Type   | Description                                                                | Optional |
|--------|--------|----------------------------------------------------------------------------|---------:|
| 'auth' | string | (Session ID) returns version information and extends the session if passed |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/ping.xml)

## goodbye

* MINIMUM_API_VERSION=400001

Destroy a session using the auth parameter.

@param array $input

| Input  | Type   | Description                                    | Optional |
|--------|--------|------------------------------------------------|---------:|
| 'auth' | string | (Session ID) destroys the session if it exists |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/goodbye.xml)

## url_to_song

* MINIMUM_API_VERSION=380001

This takes a url and returns the song object in question
@param array $input

| Input | Type   | Description                                                   | Optional |
|-------|--------|---------------------------------------------------------------|---------:|
| 'url' | string | Full Ampache URL from server, translates back into a song XML |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/url_to_song.xml)

## Data Methods

## get_indexes

* MINIMUM_API_VERSION=400001

This takes a collection of inputs and returns ID + name for the object type
@param array $input
@return boolean

| Input    | Type       | Description                                                                | Optional |
|----------|------------|----------------------------------------------------------------------------|---------:|
| 'type'   | string     | `song`, `album`, `artist`, `playlist`                                      |       NO |
| 'filter' | string     |                                                                            |      YES |
| 'add'    | set_filter | ISO 8601 Date Format (2020-09-16) add date is newer then specified date    |      YES |
| 'update' | set_filter | ISO 8601 Date Format (2020-09-16) update itme is newer then specified date |      YES |
| 'offset' | integer    |                                                                            |      YES |
| 'limit'  | integer    |                                                                            |      YES |

SONGS

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/get_indexes%20\(songs\).xml)

ARTIST

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/get_indexes%20\(artists\).xml)

ALBUM

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/get_indexes%20\(albums\).xml)

PLAYLIST

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/get_indexes%20\(playlists\).xml)

## advanced_search

* MINIMUM_API_VERSION=380001
* CHANGED_IN_API_VERSION=400001
* CHANGED_IN_API_VERSION=410001

### Changes to text searches for 410001

* Metadata Search is combined with text and numeric. Refer to the Metadata operator table to see the new order after adding regex to text fields.

### Changes to text searches for 400001

* 'is not' has been added shifting values down the list.
  0=contains, 1=does not contain, 2=starts with, 3=ends with
  4=is, 5=is not, 6=sounds like, 7=does not sound like
* rule_1['name'] is depreciated. Instead of rule_1['name'] use rule_1['title'] (I have put a temp workaround into the search rules to alleviate this change for any existing apps)
* Metadata Search is combined with text and numeric. Meaning that changes to text lists push the numeric fields down.

### Using advanced_search

Perform an advanced search given passed rules. This works in a similar way to the web/UI search pages.
You can pass multiple rules as well as joins to create in depth search results

Rules must be sent in groups of 3 using an int (starting from 1) to designate which rules are combined.
Use operator ('and', 'or') to choose whether to join or separate each rule when searching.

* Rule arrays must contain the following:
  * rule name (e.g. rule_1['title'], rule_2['album'])
  * rule operator (e.g. rule_1_operator[0], rule_2_operator[3])
  * rule input (e.g. rule_1_input['Prodigy'], rule_2_input['Land'])

#### Available search rules

Select the type of search based on the type of data you are searching for. (songs, playlists, etc)

| rule_1            | Title                 | Type                      |             Valid Items              |
|-------------------|-----------------------|---------------------------|:------------------------------------:|
| anywhere          | Any searchable text   | text                      |                 song                 |
| title             | Title / Name          | text                      | song, album, artist, playlist, label |
| favorite          | Favorites             | text                      |         song, album, artist          |
| playlist_name     | Playlist Name         | text                      |                 song                 |
| album             | Album                 | text                      |                 song                 |
| artist            | Artist                | text                      |             song, album              |
| composer          | Composer              | text                      |                 song                 |
| comment           | Comment               | text                      |                 song                 |
| label             | Label                 | text                      |                 song                 |
| lyrics            | Lyrics                | text                      |                 song                 |
| tag               | Tag                   | tags                      |         song, album, artist          |
| album_tag         | Album tag             | tags                      |                 song                 |
| artist_tag        | Artist tag            | tags                      |                 song                 |
| filename          | Filename              | text                      |             song, video              |
| placeformed       | Place                 | text                      |                artist                |
| username          | Username              | text                      |                 user                 |
| year              | Year                  | numeric                   |             song, album              |
| time              | Length (in minutes)   | numeric                   |             song, album              |
| rating            | Rating (Average)      | numeric                   |         song, album, artist          |
| myrating          | My Rating             | numeric                   |         song, album, artist          |
| artistrating      | My Rating (Artist)    | numeric                   |             song, album              |
| albumrating       | My Rating (Album)     | numeric                   |                 song                 |
| played_times      | # Played              | numeric                   |         song, album, artist          |
| bitrate           | Bitrate               | numeric                   |                 song                 |
| has imageght      | Local Image           | boolean                   |            album, artist             |
| image height      | Image Height          | numeric                   |            album, artist             |
| image width       | Image Width           | numeric                   |            album, artist             |
| yearformed        | Year                  | numeric                   |                artist                |
| played            | Played                | boolean                   |                 song                 |
| myplayed          | Played by Me          | boolean                   |                 song                 |
| myplayedartist    | Played by Me (Artist) | boolean                   |                 song                 |
| myplayedalbum     | Played by Me (Album)  | boolean                   |                 song                 |
| last_play         | My Last Play          | days                      |         song, album, artist          |
| added             | Added                 | date                      |                 song                 |
| updated           | Updated               | date                      |                 song                 |
| catalog           | Catalog               | boolean_numeric           |             song, album              |
| other_user        | Another User          | user_numeric              |         song, album, artist          |
| other_user_album  | Another User          | user_numeric              |                 song                 |
| other_user_artist | Another User          | user_numeric              |                 song                 |
| playlist          | Playlist              | boolean_numeric           |                 song                 |
| licensing         | Music License         | boolean_numeric           |                 song                 |
| smartplaylist     | Smart Playlist        | boolean_subsearch         |                 song                 |
| metadata          | Metadata              | metadata (multiple types) |                 song                 |

#### Available search operators

Select your operator (integer only!) based on the type or your selected search

| rule_1_operator | Text / Tags / Metadata                        | Numeric / user_numeric                       | Date   | Boolean, Numeric, Subsearch / Days |
|:---------------:|-----------------------------------------------|----------------------------------------------|--------|------------------------------------|
|        0        | contains                                      | is greater than or equal to / has loved      | before | is true / before (x) days ago      |
|        1        | does not contain                              | is less than or equal to / has rated 5 stars | after  | is false / after (x) days ago      |
|        2        | starts with                                   | equals / has rated 4 stars                   |        |                                    |
|        3        | ends with                                     | does not equal / has rated 3 stars           |        |                                    |
|        4        | is                                            | is greater than / has rated 2 stars          |        |                                    |
|        5        | is not                                        | is less than / has rated 1 stars             |        |                                    |
|        6        | sounds like (Text Only)                       |                                              |        |                                    |
|        7        | does not sound like (Text Only)               |                                              |        |                                    |
|        8        | matches regular expression (Text Only)        |                                              |        |                                    |
|        9        | does not match regular expression (Text Only) |                                              |        |                                    |

Send the correct input based on the type of search.

| rule_1_input |
|--------------|
| text         |
| integer      |
| boolean      |

**NOTE** To search metadata you need to add a 4th rule "rule_X_subtype"
Operators for metadata are using the text/tag types **AND** numeric types in a single list as they can be ints/strings/dates.
Currently there is not a simple way to identify what metadata types you have saved. New methods will be created for this.

#### Metadata operator table

| rule_1_operator | Metadata                                      |
|-----------------|-----------------------------------------------|
| 0               | contains                                      |
| 1               | does not contain                              |
| 2               | starts with                                   |
| 3               | ends with                                     |
| 4               | is                                            |
| 5               | is not                                        |
| 6               | sounds like (Text Only)                       |
| 7               | does not sound like (Text Only)               |
| 8               | matches regular expression (Text Only)        |
| 9               | does not match regular expression (Text Only) |
| 10              | is greater than or equal to                   |
| 11              | is less than or equal to                      |
| 12              | is                                            |
| 13              | is not                                        |
| 14              | is greater than                               |
| 15              | is less than                                  |

To search a mixed type like metadata you must search using 4 rules.

* Search rule 1 for band containing 'Prodigy', Search Rule 2 for bbm > 120
  * rule name (e.g. rule_1['metadata'], rule_2['metadata'])
  * rule operator (e.g. rule_1_operator[0], rule_2_operator[12])
  * rule input (e.g. rule_1_input['Prodigy'], rule_2_input['120'])
  * rule subtype (e.g. rule_1_subtype['4'], rule_2_subtype['9'])

#### advanced_search parameters

@param array $input

INPUTS

* ampache_url = (string)
* ampache_API = (string)
* operator = (string) `and`, `or` (whether to match one rule or all)
* rules = (array) = [[`rule_1`, `rule_1_operator`, `rule_1_input`], [`rule_2`, `rule_2_operator`, `rule_2_input`], [etc]]
* type = (string) `song`, `album`, `artist`, `playlist`, `label`, `user`, `video`
* offset = (integer)
* limit = (integer)

SONG

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/advanced_search%20\(song\).xml)

ARTIST

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/advanced_search%20\(artist\).xml)

ALBUM

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/advanced_search%20\(album\).xml)

## artists

* MINIMUM_API_VERSION=380001

This takes a collection of inputs and returns artist objects.

@param array $input

| Input     | Type       | Description                                                                   | Optional |
|-----------|------------|-------------------------------------------------------------------------------|---------:|
| 'filter'  | string     | Value is Alpha Match for returned results, may be more than one letter/number |      YES |
| 'exact'   | boolean    | `0`, `1` (if true filter is exact rather then fuzzy)                          |      YES |
| 'add'     | set_filter | ISO 8601 Date Format (2020-09-16) add date is newer then specified date       |      YES |
| 'update'  | set_filter | ISO 8601 Date Format (2020-09-16) update itme is newer then specified date    |      YES |
| 'offset'  | integer    |                                                                               |      YES |
| 'limit'   | integer    |                                                                               |      YES |
| 'include' | string     | `albums`, `songs` (include child objects in the response)                     |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/artists.xml)

## artist

* MINIMUM_API_VERSION=380001

This returns a single artist based on the UID of said artist
@param array $input

| Input     | Type   | Description                                               | Optional |
|-----------|--------|-----------------------------------------------------------|---------:|
| 'filter'  | string | UID of Artist, returns artist XML                         |       NO |
| 'include' | string | `albums`, `songs` (include child objects in the response) |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/artist.xml)

## artist_albums

* MINIMUM_API_VERSION=380001

This returns the albums of an artist
@param array $input

| Input    | Type    | Description                      | Optional |
|----------|---------|----------------------------------|---------:|
| 'filter' | string  | UID of Artist, returns Album XML |       NO |
| 'offset' | integer |                                  |      YES |
| 'limit'  | integer |                                  |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/artist_albums.xml)

## artist_songs

* MINIMUM_API_VERSION=380001

This returns the songs of the specified artist
@param array $input

| Input    | Type    | Description                     | Optional |
|----------|---------|---------------------------------|---------:|
| 'filter' | string  | UID of Artist, returns Song XML |       NO |
| 'offset' | integer |                                 |      YES |
| 'limit'  | integer |                                 |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/artist_songs.xml)

## albums

* MINIMUM_API_VERSION=380001

This returns albums based on the provided search filters
@param array $input

| Input     | Type       | Description                                                                   | Optional |
|-----------|------------|-------------------------------------------------------------------------------|---------:|
| 'filter'  | string     | Value is Alpha Match for returned results, may be more than one letter/number |      YES |
| 'exact'   | boolean    | `0`, `1` (if true filter is exact rather then fuzzy)                          |       NO |
| 'add'     | set_filter | ISO 8601 Date Format (2020-09-16) add date is newer then specified date       |      YES |
| 'update'  | set_filter | ISO 8601 Date Format (2020-09-16) update itme is newer then specified date    |      YES |
| 'offset'  | integer    |                                                                               |      YES |
| 'limit'   | integer    |                                                                               |      YES |
| 'include' | string     | `albums`, `songs` (include child objects in the response)                     |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/albums.xml)

## album

* MINIMUM_API_VERSION=380001

This returns a single album based on the UID provided
@param array $input

| Input     | Type   | Description                                                            | Optional |
|-----------|--------|------------------------------------------------------------------------|---------:|
| 'filter'  | string | UID of Album, returns album XML                                        |       NO |
| 'include' | string | 'songs' and will include the corresponding XML nested in the album XML |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/album.xml)

## album_songs

* MINIMUM_API_VERSION=380001

This returns the songs of a specified album
@param array $input

| Input    | Type    | Description                    | Optional |
|----------|---------|--------------------------------|---------:|
| 'filter' | string  | UID of Album, returns song XML |       NO |
| 'offset' | integer |                                |      YES |
| 'limit'  | integer |                                |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/album_songs.xml)

## tags

* MINIMUM_API_VERSION=380001

This returns the tags (Genres) based on the specified filter
@param array $input

| Input    | Type    | Description                                                                   | Optional |
|----------|---------|-------------------------------------------------------------------------------|---------:|
| 'filter' | string  | Value is Alpha Match for returned results, may be more than one letter/number |      YES |
| 'exact'  | boolean | if true filter is exact rather then fuzzy                                     |      YES |
| 'offset' | integer |                                                                               |      YES |
| 'limit'  | integer |                                                                               |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/tags.xml)

## tag

* MINIMUM_API_VERSION=380001

This returns a single tag based on UID
@param array $input

| Input    | Type   | Description                 | Optional |
|----------|--------|-----------------------------|---------:|
| 'filter' | string | UID of tag, returns tag XML |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/tag.xml)

## tag_artists

* MINIMUM_API_VERSION=380001

This returns the artists associated with the tag in question as defined by the UID
@param array $input

| Input    | Type    | Description                    | Optional |
|----------|---------|--------------------------------|---------:|
| 'filter' | string  | UID of tag, returns artist XML |       NO |
| 'offset' | integer |                                |      YES |
| 'limit'  | integer |                                |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/tag_artists.xml)

## tag_albums

* MINIMUM_API_VERSION=380001

This returns the albums associated with the tag in question
@param array $input

| Input    | Type    | Description                   | Optional |
|----------|---------|-------------------------------|---------:|
| 'filter' | string  | UID of tag, returns album XML |       NO |
| 'offset' | integer |                               |      YES |
| 'limit'  | integer |                               |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/tag_albums.xml)

## tag_songs

* MINIMUM_API_VERSION=380001

returns the songs for this tag
@param array $input

| Input    | Type    | Description                  | Optional |
|----------|---------|------------------------------|---------:|
| 'filter' | string  | UID of tag, returns song XML |       NO |
| 'offset' | integer |                              |      YES |
| 'limit'  | integer |                              |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/tag_songs.xml)

## songs

* MINIMUM_API_VERSION=380001

Returns songs based on the specified filter
@param array $input

| Input    | Type       | Description                                                                   | Optional |
|----------|------------|-------------------------------------------------------------------------------|---------:|
| 'filter' | string     | Value is Alpha Match for returned results, may be more than one letter/number |       NO |
| 'exact'  | boolean    | `0`, `1` (if true filter is exact rather then fuzzy)                          |       NO |
| 'add'    | set_filter | ISO 8601 Date Format (2020-09-16) add date is newer then specified date       |      YES |
| 'update' | set_filter | ISO 8601 Date Format (2020-09-16) update itme is newer then specified date    |      YES |
| 'offset' | integer    |                                                                               |      YES |
| 'limit'  | integer    |                                                                               |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/songs.xml)

## song

* MINIMUM_API_VERSION=380001

returns a single song
@param array $input

| Input    | Type   | Description                   | Optional |
|----------|--------|-------------------------------|---------:|
| 'filter' | string | UID of Song, returns song XML |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/song.xml)

## playlists

* MINIMUM_API_VERSION=380001

This returns playlists based on the specified filter
@param array $input

| Input    | Type       | Description                                                                   | Optional |
|----------|------------|-------------------------------------------------------------------------------|---------:|
| 'filter' | string     | Value is Alpha Match for returned results, may be more than one letter/number |      YES |
| 'exact'  | boolean    | `0`, `1` (if true filter is exact rather then fuzzy)                          |      YES |
| 'add'    | set_filter | ISO 8601 Date Format (2020-09-16) add date is newer then specified date       |      YES |
| 'update' | set_filter | ISO 8601 Date Format (2020-09-16) update itme is newer then specified date    |      YES |
| 'offset' | integer    |                                                                               |      YES |
| 'limit'  | integer    |                                                                               |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/playlists.xml)

## playlist

* MINIMUM_API_VERSION=380001

This returns a single playlist
@param array $input

| Input    | Type   | Description                           | Optional |
|----------|--------|---------------------------------------|---------:|
| 'filter' | string | UID of playlist, returns playlist XML |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/playlist.xml)

## playlist_songs

* MINIMUM_API_VERSION=380001

This returns the songs for a playlist
@param array $input

| Input    | Type    | Description                       | Optional |
|----------|---------|-----------------------------------|---------:|
| 'filter' | string  | UID of Playlist, returns song XML |       NO |
| 'offset' | integer |                                   |      YES |
| 'limit'  | integer |                                   |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/playlist_songs.xml)

## playlist_create

* MINIMUM_API_VERSION=380001

This create a new playlist and return it
@param array $input

| Input  | Type   | Description                         | Optional |
|--------|--------|-------------------------------------|---------:|
| 'name' | string | Playlist name                       |       NO |
| 'type' | string | `public`, `private` (Playlist type) |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/playlist_create.xml)

## playlist_edit

* MINIMUM_API_VERSION=400001
* CHANGED_IN_API_VERSION=400003
* CHANGED_IN_API_VERSION=420000

This modifies name and type of a playlist
Previously name and type were mandatory while filter wasn't. this has been reversed.
@param array $input

| Input    | Type   | Description                                                             | Optional |
|----------|--------|-------------------------------------------------------------------------|---------:|
| 'filter' | string | UID of Playlist                                                         |       NO |
| 'name'   | string | Playlist name                                                           |      YES |
| 'type'   | string | `public`, `private` (Playlist type)                                     |      YES |
| 'items'  | string | comma-separated song_id's (replace existing items with a new object_id) |      YES |
| 'tracks' | string | comma-separated playlisttrack numbers matched to items in order         |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/playlist_edit.xml)

## playlist_delete

* MINIMUM_API_VERSION=380001

This deletes a playlist
@param array $input

| Input    | Type   | Description     | Optional |
|----------|--------|-----------------|---------:|
| 'filter' | string | UID of Playlist |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/playlist_delete.xml)

## playlist_add_song

* MINIMUM_API_VERSION=380001
* CHANGED_IN_API_VERSION=400001

This adds a song to a playlist. setting check=1 will not add duplicates to the playlist
@param array $input

| Input    | Type    | Description                                                   | Optional |
|----------|---------|---------------------------------------------------------------|---------:|
| 'filter' | integer | UID of Playlist                                               |       NO |
| 'song'   | integer | UID of song to add to playlist                                |       NO |
| 'check'  | boolean | `0`, `1` Whether to check and ignore duplicates (default = 0) |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/.xml)

## playlist_remove_song

* MINIMUM_API_VERSION=380001
* CHANGED_IN_API_VERSION=400001

This remove a song from a playlist.
Previous versions required 'track' instead of 'song'.
@param array $input

| Input    | Type    | Description                          | Optional |
|----------|---------|--------------------------------------|---------:|
| 'filter' | string  | UID of Playlist                      |       NO |
| 'song'   | string  | UID of song to remove from playlist  |      YES |
| 'track'  | integer | Track number to remove from playlist |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/playlist_remove_song.xml)

## playlist_generate

* MINIMUM_API_VERSION=400001
* CHANGED_IN_API_VERSION=400002

Get a list of song XML, indexes or id's based on some simple search criteria
'recent' will search for tracks played after 'Popular Threshold' days
'forgotten' will search for tracks played before 'Popular Threshold' days
'unplayed' added in 400002 for searching unplayed tracks

@param array $input

| Input    | Type    | Description                                                      | Optional |
|----------|---------|------------------------------------------------------------------|---------:|
| 'mode'   | string  | `recent`, `forgotten`, `unplayed`, `random` (default = 'random') |      YES |
| 'filter' | string  | string LIKE matched to song title                                |      YES |
| 'album'  | integer | $album_id                                                        |      YES |
| 'artist' | integer | $artist_id                                                       |      YES |
| 'flag'   | integer | `0`, `1` (get flagged songs only. default = 0)                   |      YES |
| 'format' | string  | `song`, `index`, `id` (default = 'song')                         |      YES |
| 'offset' | integer |                                                                  |      YES |
| 'limit'  | integer |                                                                  |      YES |

SONG

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/playlist_generate%20\(song\).xml)

INDEX

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/playlist_generate%20\(index\).xml)

ID

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/playlist_generate%20\(id\).xml)

## search_songs

* MINIMUM_API_VERSION=380001

This searches the songs and returns... songs
@param array $input

| Input    | Type    | Description                                     | Optional |
|----------|---------|-------------------------------------------------|---------:|
| 'filter' | string  | Value is Alpha Match for Name returns share XML |       NO |
| 'offset' | integer |                                                 |      YES |
| 'limit'  | integer |                                                 |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/search_songs.xml)

## videos

* MINIMUM_API_VERSION=380001

This returns video objects!
@param array $input

| Input    | Type    | Description                                                                   | Optional |
|----------|---------|-------------------------------------------------------------------------------|---------:|
| 'filter' | string  | Value is Alpha Match for returned results, may be more than one letter/number |       NO |
| 'exact'  | boolean | if true filter is exact rather then fuzzy                                     |      YES |
| 'offset' | integer |                                                                               |      YES |
| 'limit'  | integer |                                                                               |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/videos.xml)

## video

* MINIMUM_API_VERSION=380001

This returns a single video
@param array $input

| Input    | Type   | Description                     | Optional |
|----------|--------|---------------------------------|---------:|
| 'filter' | string | UID of video, returns video XML |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/video.xml)

## stats

* MINIMUM_API_VERSION=380001
* CHANGED_IN_API_VERSION=400001

Get some items based on some simple search types and filters.
This method has partial backwards compatibility with older api versions but should be updated to follow the current input values.
(Changed in 400001 'filter' added)
@param array $input

| Input      | Type    | Description                                                                 | Optional |
|------------|---------|-----------------------------------------------------------------------------|---------:|
| 'type'     | string  | `song`, `album`, `artist`                                                   |       NO |
| 'filter'   | string  | `newest`, `highest`, `frequent`, `recent`, `forgotten`, `flagged`, `random` |       NO |
| 'user_id'  | integer |                                                                             |      YES |
| 'username' | string  |                                                                             |      YES |
| 'offset'   | integer |                                                                             |      YES |
| 'limit'    | integer |                                                                             |      YES |

SONG

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/stats%20\(song\).xml)

ARTIST

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/stats%20\(artist\).xml)

ALBUM

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/stats%20\(album\).xml)

## user

* MINIMUM_API_VERSION=380001

This gets a user's public information
@param array $input

| Input      | Type   | Description                             | Optional |
|------------|--------|-----------------------------------------|---------:|
| 'username' | string | Username of the user to get details for |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/user.xml)

## user_create

* MINIMUM_API_VERSION=400001

Create a new user. (Requires the username, password and email.)
@param array $input

| Input      | Type    | Description               | Optional |
|------------|---------|---------------------------|---------:|
| 'username' | string  | $username                 |       NO |
| 'password' | string  | hash('sha256', $password) |       NO |
| 'email'    | string  | e.g. `user@gmail.com`     |       NO |
| 'fullname' | string  |                           |      YES |
| 'disable'  | boolean | `0`, `1`                  |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/user_create.xml)

## user_update

* MINIMUM_API_VERSION=400001

Update an existing user.
@param array $input

| Input        | Type    | Description               | Optional |
|--------------|---------|---------------------------|---------:|
| 'username'   | string  | $username                 |       NO |
| 'password'   | string  | hash('sha256', $password) |      YES |
| 'email'      | string  | e.g. `user@gmail.com`     |      YES |
| 'fullname'   | string  |                           |      YES |
| 'website'    | string  |                           |      YES |
| 'state'      | string  |                           |      YES |
| 'city'       | string  |                           |      YES |
| 'disable'    | boolean | `0`, `1`                  |      YES |
| 'maxbitrate' | string  |                           |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/user_update.xml)

## user_delete

* MINIMUM_API_VERSION=400001

Delete an existing user.
@param array $input

| Input      | Type   | Description | Optional |
|------------|--------|-------------|---------:|
| 'username' | string |             |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/user_delete.xml)

## followers

* MINIMUM_API_VERSION=380001

This gets a user's followers
@param array $input

| Input      | Type   | Description                                        | Optional |
|------------|--------|----------------------------------------------------|---------:|
| 'username' | string | Username of the user for who to get followers list |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/followers.xml)

## following

* MINIMUM_API_VERSION=380001

This get the user list followed by a user
@param array $input

| Input      | Type   | Description                                         | Optional |
|------------|--------|-----------------------------------------------------|---------:|
| 'username' | string | (Username of the user for who to get following list |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/following.xml)

## toggle_follow

* MINIMUM_API_VERSION=380001

This follow/unfollow a user
@param array $input

| Input      | Type   | Description                             | Optional |
|------------|--------|-----------------------------------------|---------:|
| 'username' | string | Username of the user to follow/unfollow |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/toggle_follow.xml)

## last_shouts

* MINIMUM_API_VERSION=380001

This get the latest posted shouts
@param array $input

| Input      | Type    | Description                                       | Optional |
|------------|---------|---------------------------------------------------|---------:|
| 'username' | string  | Username of the user for who to get latest shouts |      YES |
| 'limit'    | integer |                                                   |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/last_shouts.xml)

## rate

* MINIMUM_API_VERSION=380001

This rates a library item
@param array $input

| Input    | Type    | Description                                    | Optional |
|----------|---------|------------------------------------------------|---------:|
| 'type'   | string  | `album`, `artist`, `song`, `video` (item type) |       NO |
| 'id'     | string  | library item id                                |       NO |
| 'rating' | integer | rating between 0-5                             |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/rate.xml)

## flag

* MINIMUM_API_VERSION=400001

This flags a library item as a favorite

* Setting flag to true (1) will set the flag
* Setting flag to false (0) will remove the flag
@param array $input

| Input  | Type    | Description                | Optional |
|--------|---------|----------------------------|---------:|
| 'type' | string  | song, album, artist, video |       NO |
| 'id'   | integer | $object_id                 |       NO |
| 'flag' | boolean | `0`, `1`                   |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/flag.xml)

## record_play

* MINIMUM_API_VERSION=400001

Take a song_id and update the object_count and user_activity table with a play. This allows other sources to record play history to ampache
@param array $input

| Input    | Type    | Description | Optional |
|----------|---------|-------------|---------:|
| 'id'     | integer | $object_id  |       NO |
| 'user'   | integer | $user_id    |       NO |
| 'client' | string  | $agent      |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/record_play.xml)

## scrobble

* MINIMUM_API_VERSION=400001

Search for a song using text info and then record a play if found. This allows other sources to record play history to ampache
@param array $input

| Input        | Type    | Description  | Optional |
|--------------|---------|--------------|---------:|
| 'song'       | string  | $song_name   |       NO |
| 'artist'     | string  | $artist_name |       NO |
| 'album'      | string  | $album_name  |       NO |
| 'songmbid'   | string  | $song_mbid   |      YES |
| 'artistmbid' | string  | $artist_mbid |      YES |
| 'albummbid'  | string  | $album_mbid  |      YES |
| 'date'       | integer | UNIXTIME()   |      YES |
| 'client'     | string  | $agent       |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/scrobble.xml)

## catalog_action

* MINIMUM_API_VERSION=400001

Kick off a catalog update or clean for the selected catalog
@param array $input

| Input     | Type    | Description                       | Optional |
|-----------|---------|-----------------------------------|---------:|
| 'task'    | string  | `add_to_catalog`, `clean_catalog` |       NO |
| 'catalog' | integer | $catalog_id                       |       NO |

[Example: clean_catalog](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/catalog_action%20\(clean_catalog.xml))

[Example: add_to_catalog](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/catalog_action%20\(add_to_catalog.xml))

## timeline

* MINIMUM_API_VERSION=380001

This gets a user's timeline
@param array $input

| Input      | Type    | Description                                       | Optional |
|------------|---------|---------------------------------------------------|---------:|
| 'username' | string  | Username of the user for whom to get the timeline |       NO |
| 'limit'    | integer |                                                   |      YES |
| 'since'    | integer | UNIXTIME()                                        |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/timeline.xml)

## friends_timeline

* MINIMUM_API_VERSION=380001

This get current user friends timeline
@param array $input

| Input   | Type    | Description | Optional |
|---------|---------|-------------|---------:|
| 'limit' | integer |             |      YES |
| 'since' | integer | UNIXTIME()  |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/friends_timeline.xml)

## update_from_tags

* MINIMUM_API_VERSION=400001

Update a single album, artist, song from the tag data
@param array $input

| Input  | Type    | Description                     | Optional |
|--------|---------|---------------------------------|---------:|
| 'type' | string  | `song`, `artist`, `album`       |       NO |
| 'id'   | integer | $artist_id, $album_id, $song_id |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/update_from_tags.xml)

## update_artist_info

* MINIMUM_API_VERSION=400001

Update artist information and fetch similar artists from last.fm
Make sure lastfm_API_key is set in your configuration file
@param array $input

| Input | Type    | Description | Optional |
|-------|---------|-------------|---------:|
| 'id'  | integer | $artist_id  |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/update_artist_info.xml)

## update_art

* MINIMUM_API_VERSION=400001

Updates a single album, artist, song running the gather_art process
Doesn't overwrite existing art by default.
@param array $input

| Input       | Type    | Description       | Optional |
|-------------|---------|-------------------|---------:|
| 'id'        | integer | $object_id        |       NO |
| 'type'      | string  | `song`, `podcast` |       NO |
| 'overwrite' | boolean | `0`, `1`          |      YES |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/update_art.xml)

## update_podcast

* MINIMUM_API_VERSION=410005

Sync and download new podcast episodes
@param array $input

| Input | Type    | Description | Optional |
|-------|---------|-------------|---------:|
| 'id'  | integer | $object_id  |       NO |

[Example](https://raw.githubusercontent.com/ampache/python3-ampache/api4/docs/xml-responses/update_podcast.xml)

## Binary Data Methods

## stream

* MINIMUM_API_VERSION=400001

Streams a given media file. Takes the file id in parameter with optional max bit rate, file format, time offset, size and estimate content length option.
@param array $input

| Input     | Type    | Description                                                | Optional |
|-----------|---------|------------------------------------------------------------|---------:|
| 'id'      | integer | $object_id                                                 |       NO |
| 'type'    | string  | `song`, `podcast`                                          |       NO |
| 'bitrate' | integer | max bitrate for transcoding in bytes (e.g 192000=192Kb)    |      YES |
| 'format'  | string  | `mp3`, `ogg`, `raw`, etc (raw returns the original format) |      YES |
| 'offset'  | integer | time offset in seconds                                     |      YES |
| 'length'  | boolean | `0`, `1`                                                   |      YES |

## download

* MINIMUM_API_VERSION=400001

Downloads a given media file. set format=raw to download the full file
@param array $input

| Input    | Type    | Description                                                | Optional |
|----------|---------|------------------------------------------------------------|---------:|
| 'id'     | integer | $object_id                                                 |       NO |
| 'type'   | string  | `song`, `podcast`                                          |       NO |
| 'format' | string  | `mp3`, `ogg`, `raw`, etc (raw returns the original format) |      YES |

## get_art

* MINIMUM_API_VERSION=400001

Get an art image.
@param array $input

## Control Methods

## localplay

* MINIMUM_API_VERSION=380001

This is for controlling localplay
@param array $input

```XML
TBC
```

## democratic

* MINIMUM_API_VERSION=380001

This is for controlling democratic play
@param array $input

* ACTION
  * method
    * vote
      * oid (Unique ID of the element you want to vote on)
      * type (Type of object, only song is currently accepted so this is optional)
    * devote
      * oid (Unique ID of the element you want to vote on)
      * type (Type of object, only song is currently accepted so this is optional)
    * playlist (Returns an array of song items with an additional \<vote>[VOTE COUNT]\</vote> element)
    * play (Returns the URL for playing democratic play)

| Input    | Type    | Description | Optional |
|----------|---------|-------------|---------:|
| 'oid'    | integer |             |       NO |
| 'method' | string  |             |       NO |
| 'action' | string  |             |       NO |

```XML
TBC
```

All XML Documents that have a ```<tag></tag>``` element may have 0 or more tag elements associated with them. Each tag element has an attribute "count" that indicates the number of people who have specified this tag.

Artists XML Document. ID's are Ampache's unique Identifier for the artist.

```XML
<root>
<artist id="12039">
        <name>Metallica</name>
        <albums># of Albums</albums>
        <songs># of Songs</songs>
        <tag id="2481" count="2">Rock & Roll</tag>
        <tag id="2482" count="1">Rock</tag>
        <tag id="2483" count="1">Roll</tag>
        <preciserating>3</preciserating>
        <rating>2.9</rating>
</artist>
<artist id="129348">
        <name>AC/DC</name>
        <albums># of Albums</albums>
        <songs># of Songs</songs>
        <tag id="2481" count="2">Rock & Roll</tag>
        <tag id="2482" count="2">Rock</tag>
        <tag id="2483" count="1">Roll</tag>
        <preciserating>3</preciserating>
        <rating>2.9</rating>
</artist>
</root>
```

Album XML Document. ID's are Ampache's unique identifier for the album and artist associated.

```XML
<root>
<album id="2910">
        <name>Back in Black</name>
        <artist id="129348">AC/DC</artist>
        <year>1984</year>
        <tracks>12</tracks>
        <disk>1</disk>
        <tag id="2481" count="2">Rock & Roll</tag>
        <tag id="2482" count="1">Rock</tag>
        <tag id="2483" count="1">Roll</tag>
        <art>http://localhost/image.php?id=129348</art>
        <preciserating>3</preciserating>
        <rating>2.9</rating>
</album>
</root>
```

Single Song XML document, includes references to its parent objects.

```XML
<root>
<song id="3180">
        <title>Hells Bells</title>
        <artist id="129348">AC/DC</artist>
        <album id="2910">Back in Black</album>
        <tag id="2481" count="3">Rock & Roll</tag>
        <tag id="2482" count="1">Rock</tag>
        <tag id="2483" count="1">Roll</tag>
        <track>4</track>
        <time>234</time>
        <url>http://localhost/play/index.php?oid=123908...</url>
        <size>Song Filesize in Bytes</size>
        <art>http://localhost/image.php?id=129348</art>
        <preciserating>3</preciserating>
        <rating>2.9</rating>
</song>
</root>
```

Tag XML Document, includes counts for it's child objects

```XML
<root>
<tag id="2481">
        <name>Rock & Roll</name>
        <albums>84</albums>
        <artists>29</artists>
        <songs>239</songs>
        <video>13</video>
        <playlist>2</playlist>
        <stream>6</stream>
</tag>
</root>
```

Playlist XML Document, includes counts for it's child objects

```XML
<root>
<playlist id="1234">
        <name>The Good Stuff</name>
        <owner>Karl Vollmer</owner>
        <items>50</items>
        <tag id="2481" count="2">Rock & Roll</tag>
        <tag id="2482" count="2">Rock</tag>
        <tag id="2483" count="1">Roll</tag>
        <type>Public</type>
</playlist>
</root>
```

Video XML Document -- Attention UIDs for video elements are non-unique against song.id

```XML
<root>
<video id="1234">
          <title>Futurama Bender's Big Score</title>
          <mime>video/avi</mime>
          <resolution>720x288</resolution>
          <size>Video Filesize in Bytes</size>
          <tag id="12131" count="3">Futurama</tag>
          <tag id="32411" count="1">Movie</tag>
          <url>http://localhost/play/index.php?oid=123908...</url>
</video>
</root>
```
