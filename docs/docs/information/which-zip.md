---
title: "Which zip?"
metaTitle: "Which zip?"
description: "Which zip?"
---

## Which zip file do I use?

Ampache supports a lot of different install options.

Builds are created and tested for all zips but the majority of users will be using the default releases.

The default Ampache code structure is built around keeping web data in a /public folder outside the project root.

This release type is known as the `public` structure.

## TLDR

Ampache has three different build types called `public` (default), `squashed` and `client`.

Squashed and Client zips will be listed with a suffix at the end of the filename (e.g. `_squashed`) so the defaults are shown first.

For Ampache 7.3.0 the default release for php8.4 is `./ampache-7.3.0_all_php8.4.zip` and is compiled with composer and NPM packages for php8.4.

The following packages are shipped without PHP or NPM packages installed and require you do do that manually.

* ampache-7.3.0_public.zip
* ampache-7.3.0_client.zip
* ampache-7.3.0_squashed.zip

When in doubt got with `ampache-%VERSION%_all_%PHPVERSION%.zip`

## The default public structure releases

The default Ampache release zips are built and named using this naming convention

`%PROJECT_NAME%-%VERSION%_all_%PHP_VERSION%.zip`

e.g. ampache-7.0.1_all_php8.3.zip

These zips are built with all the NPM and composer packages included.

Zips without `_all` are code only releases that require manual install and can be used with any supported PHP version.

`%PROJECT_NAME%-%VERSION%.zip`

e.g. ampache-7.0.1_public.zip

## Alternative Ampache releases

In addition to the default public releases; Ampache also provides 2 alternative code structures.

### Squashed

Before Ampache 5, everything was in the project root.

The code was updated to the current public structure and the squashed release was created for situations where people are unable to use the new type.

It is recommended that you don't use this release unless you have to.

All zip releases use the `_squashed` suffix to denote the different structure.

### Client

Documentation for the client release is available in the [wiki](/docs/information/ampache7-client-structure-install-type).

This is the reverse of the squashed structure; putting the client website inside a subfolder in the public web root.

Use this release if you want to use an alternative API client or website for Ampache on the base URL and use the Ampache website as a backend area.

All zip releases use the `_client` suffix to denote the different structure.
