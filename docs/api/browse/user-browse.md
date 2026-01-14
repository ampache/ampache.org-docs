---
title: "User Browse"
metaTitle: "User Browse"
description: "API documentation"
---

This page focuses on a single object type.

Refer to the main [Api Browse methods](https://ampache.org/api/api-browse) page for further information regarding the other Browse types method.

## Available browse filters

You can filter responses by the object name using the following conditions.

e.g. `cond=like,unplayed+tracks`

Filters for the User browse check the username **OR** fullname for the string.

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
        'access',
        'disabled',
        'starts_with',
    );
```

## Available browse sorts

```PHP
    protected array $sorts = array(
        'id',
        'rand',
        'username',
        'fullname',
        'email',
        'website',
        'access',
        'disabled',
        'last_seen',
        'create_date',
        'state',
        'city',
        'fullname_public',
    );
```
