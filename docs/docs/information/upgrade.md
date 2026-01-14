---
title: "Upgrading"
metaTitle: "Upgrading"
description: "Upgrading Ampache"
---

As an assumption we assume you know the path to your Ampache folder and how to manage your permissions.

In this doc we'll use `/var/www/ampache` as the install folder.

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
* Extract the new version.
  * `unzip ampache-X.X.X_all.zip -d /var/www/ampache`
* Copy your config file from the old install to the new directory
  * `cp /var/www/ampache.old/config/ampache.cfg.php /var/www/ampache/config/`

## Upgrade From Source

Did you use [git](/docs/installation#download-ampache)?

If you've been downloading tar.gz source archives, it's probably better to switch to git.

* Pull the repo with `git pull`
* Pull the composer deps `composer install --prefer-source --no-interaction`
* Attempt to login as normal, Ampache will prompt you for any database upgrades which must be performed

### Maintenance mode

If you attempt to run migration or custom scripts, it's good practice to put your website in maintenance mode to avoid users doing mistakes during that time.

To put Ampache in maintenance mode, simply create a new `.maintenance` file in Ampache root directory. An example redirecting a page hosted in ampache.org is provided under `.maintenance.example` file.

When creating your custom message, don't forget to add `exit;` at the end to stop the script going further.

### Old versions

#### Migrating from Ampache 4.x --> 5.x

Ampache5 has changes the website path so check out the [wiki](/docs/installation#emplacement) for information about how it's been moved into the project public folder.

#### Migrating from Ampache 3.4.x --> 3.5

If Ampache reports that your config file is 'unreadable' after upgrading open your config file and remove all configuration options relating to RSS Feeds, these options should be at the bottom.  This is due to a change in PHP versions which is often done at the same time as an Ampache upgrade.

#### Migrating from Ampache 3.3.x --> 3.4

Ampache 3.4 Introduces a new config format. Still follow the basic instructions however when attempting to login Ampache will redirect you to a different update page telling you that your ampache.cfg.php is out of date and must be updated. Run the command line script as instructed before continuing.

### Apache rewrite rules

Make sure you don't forget to re-copy over the htaccess rules if you're using Apache.

```shell
cp /var/www/ampache/public/rest/.htaccess.dist /var/www/ampache/public/rest/.htaccess
cp /var/www/ampache/public/play/.htaccess.dist /var/www/ampache/public/play/.htaccess
cp /var/www/ampache/public/channel/.htaccess.dist /var/www/ampache/public/channel/.htaccess
```
