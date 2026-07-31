---
title: "Album Browse"
metaTitle: "Album Browse"
description: "API documentation"
---

## Album Browse

This page focuses on a single object type.

Refer to the main [Api Browse methods](/api/api-browse) page for further information regarding the other Browse types method.

## Available browse filters

You can filter responses by the object name using the following conditions.

e.g. `cond=like,unplayed+tracks`

* Name/Title string filters
  * like
  * not_like
  * equal
  * regex_match
  * regex_not_match
  * starts_with
  * not_starts_with

```PHP
    public const array FILTERS = [
        'add_gt',
        'add_lt',
        'album_artist',
        'alpha_match',
        'artist',
        'catalog_enabled',
        'catalog',
        'equal',
        'exact_match',
        'genre',
        'id',
        'like',
        'no_genre',
        'no_tag',
        'not_like',
        'not_starts_with',
        'regex_match',
        'regex_not_match',
        'song_artist',
        'starts_with',
        'tag',
        'unplayed',
        'update_gt',
        'update_lt',
        'user_catalog',
        'user_flag',
        'user_rating',
    ];
```

## Available browse sorts

```PHP
    protected array $sorts = [
        'addition_time',
        'album_artist_album_sort',
        'album_artist_title',
        'album_artist',
        'artist',
        'barcode',
        'catalog_number',
        'catalog',
        'disk_count',
        'generic_artist',
        'id',
        'name_original_year',
        'name_year',
        'name',
        'original_year',
        'rand',
        'rating',
        'release_status',
        'release_type',
        'song_count',
        'subtitle',
        'time',
        'title',
        'total_count',
        'user_flag_rating',
        'user_flag',
        'userflag',
        'version',
        'year',
    ];
```
