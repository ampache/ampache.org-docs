---
title: "Playlist Browse"
metaTitle: "Playlist Browse"
description: "API documentation"
---

This page focuses on playlist browses.

Refer to the main [Api Browse methods](https://ampache.org/api/api-browse) page for further information regarding the other Browse types method.

In the Ampache API a playlist is actually a combined object of static playlists and dynamic searches.

Smartlists are prefixes with `smart_` to ensure ID values don't clash with playlists

This allows you to list these objects together in a single call.

There are options to ignore, hide or filter searches from your playlist calls but playlist calls can return both types of object.

## Available browse filters

You can filter responses by the object name using the following conditions.

* Name/Title string filters
  * like
  * not_like
  * equal
  * regex_match
  * regex_not_match
  * starts_with
  * not_starts_with

e.g. `cond=like,unplayed+tracks`

When returning combined playlists and smartlists in a single response you can use the following extra filters.

* hide_dupe_smartlist: Hide smartlists from the response when there is already a playlist with the same name
* smartlist: return smartlists only
* playlist_open: filter by user accessible playlists (public playlists and owner = you)
* playlist_user: filter for playlists you own

## Available browse sorts

Sorts are applied with an optional order. (`asc` or `desc` depending on the method)

When you apply a sort you will overwrite the default sort order.

* id: object id
* rand: random sort order using SQL RAND()
* date: creation date
* last_count: item count
* last_update: modification date
* name: object name
* rating: object rating
* type: public / private
* user: owner id
* username: owner username
* user_flag: object loved flag
* user_flag_rating: sort flagged status then rating

Smartlist specific sorts will not affect playlist/combined results.

* Additional sorts for smartlist browses
  * limit: smartlist item limit
  * random: smartlist has random sort enabled
