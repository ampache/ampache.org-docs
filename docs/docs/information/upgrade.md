---
title: "Upgrading"
metaTitle: "Upgrading"
description: "Upgrading Ampache"
---

## Upgrading Ampache

As an assumption we assume you know the path to your Ampache folder and how to manage your permissions.

In this doc we'll use `/var/www/ampache` as the install folder.

### Before you upgrade to Ampache8

Ampache8 is not a drop-in replacement for Ampache7. Read [Ampache8 for Admins](/docs/help/troubleshooting/ampache8-for-admins) before you start; the short version is:

* **PHP 8.5 or newer is required.** Ampache8 will not run on 8.4 or below and there are no builds for it
* The database changes are real. New tables, new preferences and some destructive orphan-row cleanup, so **back up first** (see [Backing up](#backing-up) below)
* Transcode bitrates are now expressed in bits per second, and the `%BITRATE%` defaults lost the `k` that Ampache 7.8.0 added. An old `%BITRATE%k` line still works (the `k` is consumed), but it is worth tidying up
* `memory_cache` and `statistical_graphs` both default to `"true"` now
* Rolling back needs Ampache **7.10.0 or later**, which is the release that learned the downgrade path

## Backing up

Every attempt is made to make upgrading your Ampache installation as painless as possible. Although we do everything we can to prevent data loss during an upgrade it is never a bad idea to backup your database before performing an upgrade. Below is a simple command line way to backup your MySQL database. Whenever you upgrade Ampache it is recommend that you run a catalog Verify so that any improvements/changes to the tag reading process are applied to your local collection. The catalog verify is not forced during the upgrade due to the length of time it can take.

For MySQL and MariaDB the command is the same:

```shell
mysqldump -u <USERNAME> -p -h localhost <AMPACHEDB> --add-drop-table --allow-keywords > /tmp/ampache.sql
```

You can restore your database using the mysql command:

```shell
mysql -u <username> -p -h localhost <AMPACHEDB> < /tmp/ampache.sql
```

**Note** the `<` and `>` tell you which way the restore is going from

## Upgrade From Release

Upgrading an Ampache release version is a "drop-in" replacement for an older version. (Unless you're upgrading from [Ampache4 -> Ampache5](/docs/old-information/ampache5-changes))

You can extract over the top of your current install if you want but we'll follow a Moodle style approach by moving the old folder first.

* Move the old folder out of the way.
  * `mv /var/www/ampache /var/www/ampache.old`
* Grab the release you want from the [releases](https://github.com/ampache/ampache/releases) page
* Extract the new version. ([which zip?](/docs/information/which-zip))
  * `unzip ampache-X.X.X_phpX.X.zip -d /var/www/ampache`
  * Releases before Ampache9 also ship this zip as `ampache-X.X.X_all_phpX.X.zip`; the two are identical.
* Copy your config file from the old install to the new directory
  * `cp /var/www/ampache.old/config/ampache.cfg.php /var/www/ampache/config/`
* Apply the database and config updates
  * `php bin/cli admin:updateDatabase -e`
  * `php bin/cli admin:updateConfigFile -e`

The `_php8.5` zip ships with the composer and npm packages already installed, so there is nothing to build. The plain `ampache-X.X.X.zip` is code only and still needs `composer install` and `npm install && npm run build`.

## Upgrade From Source

Did you use [git](/docs/installation#download-ampache)?

If you've been downloading tar.gz source archives, it's probably better to switch to git.

```shell
cd /var/www/ampache
git pull
composer install --no-dev --prefer-dist --no-interaction
npm install
npm run build
```

The `npm` steps have been required since Ampache 7.0.0 and are easy to forget on an upgrade — skipping them leaves you with an unstyled interface. Ampache8 builds with Vite 8, which needs Node.js `^20.19.0` or `>=22.12.0`.

`npm run verify:install` reports anything that did not land.

Then apply the database and config updates. Both commands print what they would do and need `-e` to write:

```shell
php bin/cli admin:updateDatabase -e
php bin/cli admin:updateConfigFile -e
```

Logging in to the web interface prompts you for the same database update if you would rather do it there.

[update_from_git.sh](https://github.com/ampache/ampache/blob/develop/docs/examples/update_from_git.sh) in the repository wraps all of this up.

### Maintenance mode

If you attempt to run migration or custom scripts, it's good practice to put your website in maintenance mode to avoid users doing mistakes during that time.

To put Ampache in maintenance mode, simply create a new `.maintenance` file in Ampache root directory. An example redirecting a page hosted in ampache.org is provided under `.maintenance.example` file.

When creating your custom message, don't forget to add `exit;` at the end to stop the script going further.

### Old versions

#### Migrating from Ampache 7.x --> 8.x

Ampache8 needs PHP 8.5, makes real database changes and changes two config defaults. The full list is on [Ampache8 for Admins](/docs/help/troubleshooting/ampache8-for-admins), and going back needs Ampache 7.10.0 or later.

#### Migrating from Ampache 6.x --> 7.x

Ampache7 introduced the npm build step. See [Ampache7 for Admins](/docs/help/troubleshooting/ampache7-for-admins).

#### Migrating from Ampache 4.x --> 5.x

Ampache5 has changes the website path so check out the [wiki](/docs/installation#emplacement) for information about how it's been moved into the project public folder.

#### Migrating from Ampache 3.4.x --> 3.5

If Ampache reports that your config file is 'unreadable' after upgrading open your config file and remove all configuration options relating to RSS Feeds, these options should be at the bottom.  This is due to a change in PHP versions which is often done at the same time as an Ampache upgrade.

#### Migrating from Ampache 3.3.x --> 3.4

Ampache 3.4 Introduces a new config format. Still follow the basic instructions however when attempting to login Ampache will redirect you to a different update page telling you that your ampache.cfg.php is out of date and must be updated. Run the command line script as instructed before continuing.

### Apache rewrite rules

Make sure you don't forget to re-copy over the htaccess rules if you're using Apache.

```shell
php bin/installer htaccess -e
```

That writes the two files Ampache needs, `public/rest/.htaccess` and `public/play/.htaccess`.

Add `-p` to also rewrite the optional `public/.htaccess`, which carries the private path blocking and the bot filter. It overwrites your copy, so back it up if you edited it.

```shell
php bin/installer htaccess -e -p
```

Copying them by hand does the same thing.

```shell
cp /var/www/ampache/public/rest/.htaccess.dist /var/www/ampache/public/rest/.htaccess
cp /var/www/ampache/public/play/.htaccess.dist /var/www/ampache/public/play/.htaccess
```
