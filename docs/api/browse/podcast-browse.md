---
title: "Podcast Browse"
metaTitle: "Podcast Browse"
description: "API documentation"
---

## Podcast Browse

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
        'alpha_match',
        'catalog_enabled',
        'catalog',
        'equal',
        'exact_match',
        'id',
        'like',
        'not_like',
        'not_starts_with',
        'regex_match',
        'regex_not_match',
        'starts_with',
        'unplayed',
        'user_catalog',
        'user_flag',
        'user_rating',
    ];
```

## Available browse sorts

```PHP
    protected array $sorts = [
        'catalog',
        'episodes',
        'id',
        'name',
        'rand',
        'rating',
        'title',
        'total_count',
        'user_flag_rating',
        'user_flag',
        'userflag',
        'website',
    ];
```
