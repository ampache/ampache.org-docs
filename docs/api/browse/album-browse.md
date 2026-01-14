---
title: "Album Browse"
metaTitle: "Album Browse"
description: "API documentation"
---

This page focuses on a single object type.

Refer to the main [Api Browse methods](https://ampache.org/api/api-browse) page for further information regarding the other Browse types method.

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
    public const FILTERS = array(
        'add_gt',
        'add_lt',
        'artist',
        'album_artist',
        'song_artist',
        'catalog',
        'catalog_enabled',
        'user_catalog',
        'genre',
        'unplayed',
        'update_gt',
        'update_lt'
    );
```

## Available browse sorts

```PHP
    protected array $sorts = array(
        'id',
        'album_artist',
        'artist',
        'barcode',
        'catalog',
        'catalog_number',
        'generic_artist',
        'title',
        'name',
        'name_year',
        'name_original_year',
        'original_year',
        'rand',
        'release_status',
        'release_type',
        'disk_count',
        'song_count',
        'subtitle',
        'time',
        'total_count',
        'version',
        'year',
        'rating',
        'user_flag',
        'user_flag_rating',
    );
```
