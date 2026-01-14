---
title: "Share Browse"
metaTitle: "Share Browse"
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
    );
```

## Available browse sorts

```PHP
    protected array $sorts = array(
        'id',
        'object',
        'object_type',
        'user',
        'creation_date',
        'lastvisit_date',
        'counter',
        'max_counter',
        'allow_stream',
        'allow_download',
        'expire'
    );
```
