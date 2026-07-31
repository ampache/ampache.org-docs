---
title: "Genre Browse"
metaTitle: "Genre Browse"
description: "API documentation"
---

## Genre Browse

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
        'equal',
        'exact_match',
        'genre',
        'hidden',
        'id',
        'like',
        'not_like',
        'not_starts_with',
        'object_type',
        'regex_match',
        'regex_not_match',
        'starts_with',
        'tag',
    ];
```

## Available browse sorts

```PHP
    protected array $sorts = [
        'id',
        'name',
        'rand',
        'rating',
        'tag',
        'user_flag_rating',
        'user_flag',
        'userflag',
        'artist',
        'album',
        'song',
        'video',
    ];
```
