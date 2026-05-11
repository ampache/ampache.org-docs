---
title: "Song Search"
metaTitle: "Song Search"
description: "API documentation"
---

## Song Search

This page focuses on a single object type.

Refer to the main [Advanced Search](/api/api-advanced-search) page for further information regarding the advanced_search method.

## Available search rules

Select the type of search based on the type of data you are searching for. (songs, playlists, etc)

| rule_1                    | Title                     | Operator Type     |
|---------------------------|---------------------------|-------------------|
| anywhere                  | Any searchable text       | text              |
| none                      | Empty / No rule search    | is_true           |
| title                     | Title / Name              | text              |
| name                      | (*Alias of title)         |                   |
| song                      | (*Alias of title)         |                   |
| song_title                | (*Alias of title)         |                   |
| album                     | Album                     | text              |
| album_title               | (*Alias of album)         |                   |
| artist                    | Song Artist               | text              |
| artist_title              | (*Alias of artist)        |                   |
| song_artist               | (*Alias of artist)        | text              |
| song_artist_title         | (*Alias of artist)        |                   |
| album_artist              | Album Artist              | text              |
| composer                  | Composer                  | text              |
| track                     | Track                     | numeric           |
| year                      | Year                      | numeric           |
| time                      | Length (in minutes)       | numeric           |
| label                     | Label                     | text              |
| comment                   | Comment                   | text              |
| lyrics                    | Lyrics                    | text              |
| id                        | Database ID               | numeric           |
| myrating                  | My Rating                 | numeric           |
| rating                    | Rating (Average)          | numeric           |
| albumrating               | My Rating (Album)         | numeric           |
| artistrating              | My Rating (Artist)        | numeric           |
| my_flagged_song            | My Favourite Songs        | boolean           |
| my_flagged_album           | My Favourite Albums       | boolean           |
| my_flagged_artist          | My Favourite Artists      | boolean           |
| favorite                  | Favourites                | text              |
| favorite_album            | Favourites (Album)        | text              |
| favorite_artist           | Favourites (Artist)       | text              |
| other_user                | Another User              | user_numeric      |
| other_user_album          | Another User (Album)      | user_numeric      |
| other_user_artist         | Another User (Artist)     | user_numeric      |
| played_times              | # Played                  | numeric           |
| skipped_times             | # Skipped                 | numeric           |
| played_or_skipped_times   | # Played or Skipped       | numeric           |
| play_skip_ratio           | Played/Skipped ratio      | numeric           |
| last_play                 | My Last Play              | days              |
| last_skip                 | My Last Skip              | days              |
| last_play_or_skip         | My Last Play or Skip      | days              |
| played                    | Played                    | boolean           |
| myplayed                  | Played by Me              | boolean           |
| myplayedalbum             | Played by Me (Album)      | boolean           |
| myplayedartist            | Played by Me (Artist)     | boolean           |
| myplayed_times            | # Played by Me            | numeric           |
| myskipped_times           | # Skipped by Me           | numeric           |
| myplayed_or_skipped_times | # Played or Skipped by Me | numeric           |
| recent_played             | Recently Played           | recent_played     |
| genre                     | Genre                     | text              |
| tag                       | (*Alias of genre)         |                   |
| song_genre                | (*Alias of genre)         |                   |
| song_tag                  | (*Alias of genre)         |                   |
| album_genre               | Album Genre               | text              |
| album_tag                 | (*Alias of album_genre)   |                   |
| artist_genre              | Artist Genre              | text              |
| artist_tag                | (*Alias of artist_genre)  |                   |
| no_genre                  | No Genre                  | is_true           |
| no_tag                    | (*Alias of no_genre)      |                   |
| genre_count_song          | Song Count                | numeric           |
| genre_count_album         | Album Count               | numeric           |
| genre_count_artist        | Artist Count              | numeric           |
| playlist                  | Playlist                  | boolean_subsearch |
| smartplaylist             | Smart Playlist            | boolean_subsearch |
| playlist_name             | Playlist Name             | text              |
| file                      | Filename                  | text              |
| bitrate                   | Bitrate                   | numeric           |
| added                     | Date Added                | date              |
| updated                   | Date Updated              | date              |
| license                   | Music License             | boolean_numeric   |
| no_license                | No Music License          | is_true           |
| recent_added              | Recently Added            | recent_added      |
| recent_updated            | Recently Updated          | recent_updated    |
| days_added                | Added                     | days              |
| days_updated              | Updated                   | days              |
| possible_duplicate        | Possible Duplicate        | is_true           |
| duplicate_tracks          | Duplicate Album Tracks    | is_true           |
| possible_duplicate_album  | Possible Duplicate Albums | is_true           |
| orphaned_album            | Orphaned Album            | is_true           |
| catalog                   | Catalogue                 | boolean_numeric   |
| mbid                      | MusicBrainz ID            | text              |
| mbid_album                | MusicBrainz ID (Album)    | text              |
| mbid_artist               | MusicBrainz ID (Artist)   | text              |

## Available operator values

Select your operator (integer only!) based on the type or your selected search

**NOTE** with the numeric_limit and is_true operators the operator is ignored, but still required

| rule_1_operator | text / tags                       | numeric / user_numeric                       | date   | boolean, boolean_numeric, boolean_subsearch, days |
|:---------------:|-----------------------------------|----------------------------------------------|--------|---------------------------------------------------|
|        0        | contains                          | is greater than or equal to / has loved      | before | is true / before (x) days ago                     |
|        1        | does not contain                  | is less than or equal to / has rated 5 stars | after  | is false / after (x) days ago                     |
|        2        | starts with                       | equals / has rated 4 stars                   |        |                                                   |
|        3        | ends with                         | does not equal / has rated 3 stars           |        |                                                   |
|        4        | is                                | is greater than / has rated 2 stars          |        |                                                   |
|        5        | is not                            | is less than / has rated 1 stars             |        |                                                   |
|  6 (Text Only)  | sounds like                       |                                              |        |                                                   |
|  7 (Text Only)  | does not sound like               |                                              |        |                                                   |
|  8 (Text Only)  | matches regular expression        |                                              |        |                                                   |
|  9 (Text Only)  | does not match regular expression |                                              |        |                                                   |

Send the correct input based on the type of search.

| rule_1_input |
|--------------|
| text         |
| integer      |
| boolean      |

**NOTE** To search metadata you need to add a 4th rule "rule_*_subtype"

Operators for metadata are using the text/tag types **AND** numeric types in a single list as they can be ints/strings/dates.

Currently there is not a simple way to identify what metadata types you have saved. New methods will be created for this.

### Metadata operator table

| rule_1_operator | Metadata                          |
|:---------------:|-----------------------------------|
|        0        | contains                          |
|        1        | does not contain                  |
|        2        | starts with                       |
|        3        | ends with                         |
|        4        | is                                |
|        5        | is not                            |
|  6 (Text Only)  | sounds like                       |
|  7 (Text Only)  | does not sound like               |
|  8 (Text Only)  | matches regular expression        |
|  9 (Text Only)  | does not match regular expression |
|       10        | is greater than or equal to       |
|       11        | is less than or equal to          |
|       12        | is                                |
|       13        | is not                            |
|       14        | is greater than                   |
|       15        | is less than                      |

To search a mixed type like metadata you must search using 4 rules.

* Search rule 1 for band containing 'Prodigy', Search Rule 2 for bbm > 120
  * rule name (e.g. rule_1['metadata'], rule_2['metadata'])
  * rule operator (e.g. rule_1_operator[0], rule_2_operator[12])
  * rule input (e.g. rule_1_input['Prodigy'], rule_2_input['120'])
  * rule subtype (e.g. rule_1_subtype['4'], rule_2_subtype['9'])
