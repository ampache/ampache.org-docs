---
title: "Song Browse"
metaTitle: "Song Browse"
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
        'album',
        'album_disk',
        'artist',
        'catalog',
        'catalog_enabled',
        'user_catalog',
        'disk',
        'enabled',
        'exact_match',
        'license',
        'regex_match',
        'regex_not_match',
        'starts_with',
        'genre',
        'top50',
        'unplayed',
        'update_gt',
        'update_lt',
        'user_catalog'
    );
```

## Available browse sorts

```PHP
    protected array $sorts = array(
        'id',
        'title',
        'name',
        'catalog',
        'year',
        'track',
        'time',
        'composer',
        'addition_time',
        'update_time',
        'object_count',
        'total_count',
        'total_skip',
        'album',
        'album_disk',
        'artist',
        'rand',
        'rating',
        'user_flag',
        'user_flag_rating',
    );
```
