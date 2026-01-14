---
title: "API5.0 Standards"
metaTitle: "API5.0 Standards"
description: "API documentation"
---

Here are some basic standards that all Ampache API's should follow.

There will be inconsistencies between the current API's and we will be working on merging to a clear set of standards.

## Rules regarding objects and data

For now, here are a few basic rules that the API should follow:

* ID is a string for all objects.
* Everything that has an ID should include this in the response.
* All other integers are cast to int
* Same thing for doubles
* null and empty values may be returned. (for example XML will always return an object but it may not have any value)

## Rules regarding dates

There are 2 date formats used in the API:

* [Unix epoch time](https://www.php.net/manual/en/function.time.php) (e.g. 1629345129)
* [ISO 8601 date](https://www.iso.org/iso-8601-date-and-time-format.html) (e.g. 2004-02-12T15:19:21+00:00)

The Ampache handshake method returns dates in ISO 8601

```JSON
{
    "session_expire": "2021-08-20T12:20:26+10:00",
    "update": "2021-07-21T12:51:36+10:00",
    "add": "2021-08-03T10:04:14+10:00",
    "clean": "2021-08-03T10:05:54+10:00",
}
```

Podcasts and Podcast Episodes objects also return ISO dates for the following fields

* podcast object "build_date" and "sync_date"
* podcast_episode object "pubdate"

```JSON
{
    "build_date": "1970-01-01T10:00:00+10:00",
    "sync_date": "2021-08-20T11:08:30+10:00",
    "podcast_episode": [
        {
            "pubdate": "2021-08-17T23:00:00+10:00",
        }
    ]
}
```

All remaining Ampache dates should be returned as an integer using Unix epoch time

```JSON
{
    "last_add": 1627949046,
    "last_clean": 1627949154,
    "last_update": 1626835896
}
```

### Tag is being renamed into Genre

Debate resolved. Ampache 5.0.0 will rename Tag and remove the old genre variable.

### Genre will provide a genre ID as well as the name

```XML
<genre id="20"><![CDATA[Metal]]></genre>
<genre id="37"><![CDATA[Hard Rock]]></genre>
```

```JSON
        "genre": [
            {
                "id": "4",
                "name": "Electronic"
            },
            {
                "id": "77",
                "name": "Experimental"
            }
        ],
```

### Remove spaces from advanced_search rule names. (Backwards compatible with old names)

These rules have been changed to make sure everything has no spaces.
The backward compatible names will be removed in Ampache 5.0.0

* 'has image' => 'has_image'
* 'image height' => 'image_height'
* 'image width' => 'image_width'
* 'filename' => 'file' (Video search)
