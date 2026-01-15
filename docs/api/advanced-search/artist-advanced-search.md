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

| rule_1                    | Title                          | Operator Type   |
|---------------------------|--------------------------------|-----------------|
| title                     | Title / Name                   | text            |
| name                      | (*Alias of title)              |                 |
| artist                    | (*Alias of title)              |                 |
| artist_title              | (*Alias of title)              |                 |
| song                      | Song Title                     | text            |
| song_title                | (*Alias of song)               |                 |
| album                     | Album Title                    | text            |
| album_title               | (*Alias of album)              |                 |
| summary                   | Summary                        | text            |
| yearformed                | Year Formed                    | numeric         |
| placeformed               | Place Formed                   | text            |
| myrating                  | My Rating                      | numeric         |
| rating                    | Rating (Average)               | numeric         |
| songrating                | My Rating (Song)               | numeric         |
| albumrating               | My Rating (Album)              | numeric         |
| favorite                  | Favorites                      | text            |
| played_times              | # Played                       | numeric         |
| skipped_times             | # Skipped                      | numeric         |
| played_or_skipped_times   | # Played or Skipped            | numeric         |
| myplayed_times            | # Played by Me                 | numeric         |
| myskipped_times           | # Skipped by Me                | numeric         |
| myplayed_or_skipped_times | # Played or Skipped by Me      | numeric         |
| last_play                 | My Last Play                   | days            |
| last_play_or_skip         | My Last Play OR skip           | days            |
| played                    | Played                         | boolean         |
| myplayed                  | Played by Me                   | boolean         |
| album_count               | Album Count                    | numeric         |
| song_count                | Song Count                     | numeric         |
| time                      | Length (in minutes)            | numeric         |
| genre                     | Genre                          | tags            |
| tag                       | (*Alias of genre)              |                 |
| artist_genre              | (*Alias of genre)              | tags            |
| artist_tag                | (*Alias of genre)              |                 |
| song_genre                | Song Genre                     | tags            |
| song_tag                  | (*Alias of song_genre)         |                 |
| no_genre                  | No Genre                       | is_true         |
| no_tag                    | (*Alias of no_genre)           |                 |
| genre_count_song          | Genres with a count of Songs   | numeric         |
| genre_count_album         | Genres with a count of Albums  | numeric         |
| genre_count_artist        | Genres with a count of Artists | numeric         |
| other_user                | Another User                   | user_numeric    |
| playlist                  | Playlist                       | boolean_numeric |
| playlist_name             | Playlist Name                  | text            |
| file                      | Filename                       | text            |
| recent_played             | Recently Played                | numeric_limit   |
| catalog                   | Catalog                        | boolean_numeric |
| mbid                      | MusicBrainz ID                 | text            |
| mbid_artist               | (*Alias of mbid)               | text            |
| mbid_album                | MusicBrainz ID (Album)         | text            |
| mbid_song                 | MusicBrainz ID (Song)          | text            |
| has_image                 | Local Image                    | boolean         |
| image_height              | Image Height                   | numeric         |
| image_width               | Image Width                    | numeric         |
| possible_duplicate        | Possible Duplicate             | is_true         |
| possible_duplicate_album  | Possible Duplicate Albums      | is_true         |

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
