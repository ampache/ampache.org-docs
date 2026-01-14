---
title: "Follower Browse"
metaTitle: "Follower Browse"
description: "API documentation"
---

This page focuses on a single object type.

Refer to the main [Api Browse methods](https://ampache.org/api/api-browse) page for further information regarding the other Browse types method.

## Available browse filters

```PHP
    public const FILTERS = array(
        'follow_user',
        'user',
    );
```

## Available browse sorts

```PHP
    protected array $sorts = array(
        'follow_user',
        'follow_date',
        'user',
    );
```
