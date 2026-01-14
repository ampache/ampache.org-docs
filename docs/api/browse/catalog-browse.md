---
title: "Catalog Browse"
metaTitle: "Catalog Browse"
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

    public const FILTERS = array(
        'enabled',
        'gather_type',
        'gather_types',
        'user'
    );

## Available browse sorts

    protected array $sorts = array(
        'id',
        'title',
        'name',
        'catalog_type',
        'last_update',
        'last_clean',
        'last_add',
        'enabled',
        'rename_pattern',
        'sort_pattern',
        'gather_types'
        'rating',
        'user_flag',
        'user_flag_rating',
    );
