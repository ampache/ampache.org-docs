---
title: "Video Browse"
metaTitle: "Video Browse"
description: "API documentation"
---

## Video Browse

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
        'alpha_match',
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
        'starts_with',
        'tag',
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
        'catalog',
        'codec',
        'id',
        'length',
        'name',
        'rand',
        'rating',
        'resolution',
        'title',
        'total_count',
        'total_skip',
        'update_time',
        'user_flag_rating',
        'user_flag',
        'userflag',
    ];
```
