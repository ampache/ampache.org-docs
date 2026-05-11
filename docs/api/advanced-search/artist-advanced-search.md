---
title: "Artist Search"
metaTitle: "Artist Search"
description: "API documentation"
---

## Artist Search

This page focuses on a single object type.

Refer to the main [Advanced Search](/api/api-advanced-search) page for further information regarding the advanced_search method.

## Available search rules

Select the type of search based on the type of data you are searching for. (songs, playlists, etc)

| rule_1                    | Title                     | Operator Type     |
|---------------------------|---------------------------|-------------------|
| title                     | Name / Name               | text              |
| name                      | (*Alias of title)         |                   |
| artist                    | (*Alias of title)         |                   |
| artist_title              | (*Alias of title)         |                   |
| album                     | Album Title               | text              |
| album_title               | (*Alias of album)         |                   |
| song                      | Song Title                | text              |
| song_title                | (*Alias of song)          |                   |
| summary                   | Summary                   | text              |
| yearformed                | Year Formed               | numeric           |
| placeformed               | Place Formed              | text              |
| time                      | Length (in minutes)       | numeric           |
| album_count               | Album Count               | numeric           |
| song_count                | Song Count                | numeric           |
| id                        | Database ID               | numeric           |
| myrating                  | My Rating                 | numeric           |
| rating                    | Rating (Average)          | numeric           |
| songrating                | My Rating (Song)          | numeric           |
| albumrating               | My Rating (Album)         | numeric           |
| my_flagged_song            | My Favourite Songs        | boolean           |
| my_flagged_album           | My Favourite Albums       | boolean           |
| my_flagged_artist          | My Favourite Artists      | boolean           |
| favorite                  | Favourites                | text              |
| other_user                | Another User              | user_numeric      |
| played_times              | # Played                  | numeric           |
| skipped_times             | # Skipped                 | numeric           |
| played_or_skipped_times   | # Played or Skipped       | numeric           |
| last_play                 | My Last Play              | days              |
| last_skip                 | My Last Skip              | days              |
| last_play_or_skip         | My Last Play or Skip      | days              |
| played                    | Played                    | boolean           |
| myplayed                  | Played by Me              | boolean           |
| myplayed_times            | # Played by Me            | numeric           |
| myskipped_times           | # Skipped by Me           | numeric           |
| myplayed_or_skipped_times | # Played or Skipped by Me | numeric           |
| recent_played             | Recently Played           | recent_played     |
| genre                     | Genre                     | text              |
| tag                       | (*Alias of genre)         |                   |
| artist_genre              | (*Alias of genre)         | tags              |
| artist_tag                | (*Alias of genre)         |                   |
| song_genre                | Song Genre                | text              |
| song_tag                  | (*Alias of song_genre)    |                   |
| no_genre                  | No Genre                  | is_true           |
| no_tag                    | (*Alias of no_genre)      |                   |
| genre_count_song          | Song Count                | numeric           |
| genre_count_album         | Album Count               | numeric           |
| genre_count_artist        | Artist Count              | numeric           |
| playlist                  | Playlist                  | boolean_subsearch |
| playlist_name             | Playlist Name             | text              |
| file                      | Filename                  | text              |
| has_image                 | Local Image               | boolean           |
| image_width               | Image Width               | numeric           |
| image_height              | Image Height              | numeric           |
| days_added                | Added                     | days              |
| possible_duplicate        | Possible Duplicate        | is_true           |
| possible_duplicate_album  | Possible Duplicate Albums | is_true           |
| catalog                   | Catalogue                 | boolean_numeric   |
| mbid                      | MusicBrainz ID            | text              |
| mbid_artist               | (*Alias of mbid)          | text              |
| mbid_album                | MusicBrainz ID (Album)    | text              |
| mbid_song                 | MusicBrainz ID (Song)     | text              |

## Available operator values

Select your operator (integer only!) based on the type or your selected search

**NOTE** with the numeric_limit and is_true operators the operator is ignored, but still required

| rule_1_operator | text / tags                       | numeric / user_numeric                       | boolean, boolean_numeric, days     |
|:---------------:|-----------------------------------|----------------------------------------------|------------------------------------|
|        0        | contains                          | is greater than or equal to / has loved      | is true / before (x) days ago      |
|        1        | does not contain                  | is less than or equal to / has rated 5 stars | is false / after (x) days ago      |
|        2        | starts with                       | equals / has rated 4 stars                   |                                    |
|        3        | ends with                         | does not equal / has rated 3 stars           |                                    |
|        4        | is                                | is greater than / has rated 2 stars          |                                    |
|        5        | is not                            | is less than / has rated 1 stars             |                                    |
|  6 (Text Only)  | sounds like                       |                                              |                                    |
|  7 (Text Only)  | does not sound like               |                                              |                                    |
|  8 (Text Only)  | matches regular expression        |                                              |                                    |
|  9 (Text Only)  | does not match regular expression |                                              |                                    |

Send the correct input based on the type of search.

| rule_1_input |
|--------------|
| text         |
| integer      |
| boolean      |
