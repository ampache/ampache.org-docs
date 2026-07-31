---
title: "Follower Browse"
metaTitle: "Follower Browse"
description: "API documentation"
---

## Follower Browse

This page focuses on a single object type.

Refer to the main [Api Browse methods](/api/api-browse) page for further information regarding the other Browse types method.

## Available browse filters

```PHP
    public const array FILTERS = [
        'follow_user',
        'user',
    ];
```

## Available browse sorts

```PHP
    protected array $sorts = [
        'follow_date',
        'follow_user',
        'user',
    ];
```
