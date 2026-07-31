---
title: "Catalog Browse"
metaTitle: "Catalog Browse"
description: "API documentation"
---

## Catalog Browse

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
        'enabled',
        'equal',
        'exact_match',
        'gather_type',
        'gather_types',
        'id',
        'like',
        'not_like',
        'not_starts_with',
        'regex_match',
        'regex_not_match',
        'starts_with',
        'user',
    ];
```

## Available browse sorts

```PHP
    protected array $sorts = [
        'catalog_type',
        'enabled',
        'gather_types',
        'id',
        'last_add',
        'last_clean',
        'last_update',
        'name',
        'rating',
        'rename_pattern',
        'sort_pattern',
        'title',
        'user_flag_rating',
        'user_flag',
        'userflag',
    ];
```
