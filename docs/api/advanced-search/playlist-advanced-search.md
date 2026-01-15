---
title: "Playlist Search"
metaTitle: "Playlist Search"
description: "API documentation"
---

## Playlist Search

This page focuses on a single object type.

Refer to the main [Advanced Search](/api/api-advanced-search) page for further information regarding the advanced_search method.

## Available search rules

Select the type of search based on the type of data you are searching for. (songs, playlists, etc)

| rule_1 | Title                           | Operator Type   |
|--------|---------------------------------|-----------------|
| title  | Title / Name                    | text            |
| name   | (*Alias of title)               |                 |
| type   | Playlist Type (private, public) | boolean_numeric |

## Available operator values

Select your operator (integer only!) based on the type or your selected search

| rule_1_operator | text                              | boolean_numeric               |
|:---------------:|-----------------------------------|-------------------------------|
|        0        | contains                          | is true / before (x) days ago |
|        1        | does not contain                  | is false / after (x) days ago |
|        2        | starts with                       |                               |
|        3        | ends with                         |                               |
|        4        | is                                |                               |
|        5        | is not                            |                               |
|  6 (Text Only)  | sounds like                       |                               |
|  7 (Text Only)  | does not sound like               |                               |
|  8 (Text Only)  | matches regular expression        |                               |
|  9 (Text Only)  | does not match regular expression |                               |
