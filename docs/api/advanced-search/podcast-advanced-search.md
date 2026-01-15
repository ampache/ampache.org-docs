---
title: "Podcast Search"
metaTitle: "Podcast Search"
description: "API documentation"
---

## Podcast Search

This page focuses on a single object type.

**NOTE** This type is only available in Ampache develop (Ampache 5.5.0+)

Refer to the main [Advanced Search](/api/api-advanced-search) page for further information regarding the advanced_search method.

## Available search rules

Select the type of search based on the type of data you are searching for. (songs, playlists, etc)

| rule_1                    | Title                                   | Operator Type   |
|---------------------------|-----------------------------------------|-----------------|
| title                     | Title / Name                            | text            |
| name                      | (*Alias of title)                       |                 |
| podcast_episode           | Podcast Episode                         | text            |
| podcast_episode_title     | (*Alias of podcast_episode)             |                 |
| played_times              | # Played                                | numeric         |
| skipped_times             | # Skipped                               | numeric         |
| played_or_skipped_times   | # Played or Skipped                     | numeric         |
| myplayed_times            | # Played by Me                          | numeric         |
| myskipped_times           | # Skipped by Me                         | numeric         |
| myplayed_or_skipped_times | # Played or Skipped by Me               | numeric         |
| play_skip_ratio           | Played/Skipped ratio                    | numeric         |
| last_play                 | My Last Play                            | days            |
| last_play_or_skip         | My Last Play OR skip                    | days            |
| played                    | Played                                  | boolean         |
| myplayed                  | Played by Me                            | boolean         |
| time                      | Length (in minutes)                     | numeric         |
| file                      | Filename                                | text            |
| state                     | File state (completed, pending skipped) | boolean_numeric |
| status                    | (*Alias of state)                       |                 |
| added                     | Added                                   | date            |
| pubdate                   | Publication Date                        | date            |

## Available operator values

Select your operator (integer only!) based on the type or your selected search

| rule_1_operator | text                              | numeric                                      | date   | boolean, boolean_numeric, days |
|:---------------:|-----------------------------------|----------------------------------------------|--------|--------------------------------|
|        0        | contains                          | is greater than or equal to / has loved      | before | is true / before (x) days ago  |
|        1        | does not contain                  | is less than or equal to / has rated 5 stars | after  | is false / after (x) days ago  |
|        2        | starts with                       | equals / has rated 4 stars                   |        |                                |
|        3        | ends with                         | does not equal / has rated 3 stars           |        |                                |
|        4        | is                                | is greater than / has rated 2 stars          |        |                                |
|        5        | is not                            | is less than / has rated 1 stars             |        |                                |
|  6 (Text Only)  | sounds like                       |                                              |        |                                |
|  7 (Text Only)  | does not sound like               |                                              |        |                                |
|  8 (Text Only)  | matches regular expression        |                                              |        |                                |
|  9 (Text Only)  | does not match regular expression |                                              |        |                                |
