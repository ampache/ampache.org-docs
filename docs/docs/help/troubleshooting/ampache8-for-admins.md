---
title: "Ampache8 for Admins"
metaTitle: "Ampache8 for Admins"
description: "Ampache8 for Admins"
---

**WORK IN PROGRESS**

## Ampache8 for Admins

This page will cover the visual, backend and Admin specific changes to Ampache.

User specific changes are available at [Ampache8 for Users](/docs/help/troubleshooting/ampache8-for-users)

There are a few changes in Ampache8 that might block you upgrading.

Consider all the changes before upgrading.

### Try it out Ampache8 using git

The develop8 branch is holding the current WIP of Ampache8.

You can check out a new install on the branch.

```shell
git clone -b develop8 https://github.com/ampache/ampache.git ampache8
```

Or you can pull the branch onto your current system.

```shell
git checkout develop8
```

If you have any issues you can reset the branch forcibly with.

```shell
git reset --hard origin/develop8
```

Then after the reset make sure you run composer and NPM.

```shell
composer update --no-dev --prefer-source
npm install
npm run build
```

You can verify your NPM install has complete using the `verify:install` command.

```shell
npm run verify:install
```

## Docker

We will start building Ampache8 images for [docker](/docker) soon.

## Rollback to Ampache7

While there haven't been any major database changes yet there may be things that break compared to Ampache7 as development continues.

You can downgrade your database using the cli.

Simply run the update command and the database will be downgraded to match your version.

`php bin/cli admin:updateDatabase -e`

![image](https://github.com/user-attachments/assets/db7bcbdb-de94-4db2-86a3-2151646ae877)

## PHP Version support

The first major change is that Ampache8 supports PHP8.5+ **ONLY**!

Builds will no longer support other versions. Stay on Ampache7 until you can move your server.

You can stay on the `patch7` or `release7` branch by checking out the git branch.

```shell
git checkout patch7
```

## PHP fileinfo extension is required

To make sure the new Captcha works, the core php fileinfo module is being used.

This is usually included in Linux with PHP installs but platforms like Windows may require that you enable the extension.

In your php.ini, make sure the extension is uncommented.

```config
extension=fileinfo
```

## Updated captcha with OCR testing

The old easycaptcha code has finally been replaced with [Gregwar/Captcha](https://github.com/Gregwar/Captcha/).

The library will general a picture and then test it buy using `convert` and `ocrad` to read the file.

If ocrad can read the captcha phrase it will generate a new file and try again.

In Debian you can install these packages to enable OCR testing:

* graphicsmagick-imagemagick-compat: (/usr/bin/convert)
* ocrad: (/usr/bin/ocrad)

If you don't have these programs installed the code will generate a picture without testing the result.

**NOTE** This is also being ported back to Ampache7 for security. 

## API8 is here

The Ampache API is making sure that the changes in API8 are backwards compatible with API6 where possible.

If you send a version 7 API call you will now receive an access denied error.

There are changes in default parameters and data responses for additional metadata have changed slightly.

All changes will be documented in the [API](/api) before final release.

## New Options

New site options and preferences are documented in wiki at [ampache8-for-users](/docs/help/troubleshooting/ampache8-for-users)
