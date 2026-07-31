---
title: "Share Browse"
metaTitle: "Share Browse"
description: "API documentation"
---

## Share Browse

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
    ];
```

## Available browse sorts

```PHP
    protected array $sorts = [
        'allow_download',
        'allow_stream',
        'counter',
        'creation_date',
        'expire',
        'lastvisit_date',
        'max_counter',
        'object_type',
        'object',
        'user',
    ];
```
