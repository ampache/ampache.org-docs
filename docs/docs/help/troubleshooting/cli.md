---
title: "Ampache CLI"
metaTitle: "Ampache CLI"
description: "Explaining the Ampache CLI"
---

## Explaining the Ampache CLI

The Ampache bin folder has been cleaned up into a 2 files. `bin/cli` and `bin/installer`

Generally you should only be interested in the cli program; all the old scripts have been migrated into cli commands.

-h|--help can be used to display help for commands and cli itself.

For a full reference of every available command grouped by prefix, see [Ampache CLI Commands](/docs/help/troubleshooting/cli-commands).

## Migrated actions

In general, simply updating the command should work as expected with 2 [exceptions](#command-changes).

* ./bin/install/add_user.inc => ./bin/cli admin:addUser
* ./bin/install/install_db.inc => ./bin/installer
* ./bin/install/update_db.inc => ./bin/cli admin:updateDatabase
* ./bin/broadcast.inc => ./bin/cli run:broadcast
* ./bin/calculate_art_size.inc => ./bin/cli run:calculateArtSize
* ./bin/catalog_update.inc => ./bin/cli run:updateCatalog
* ./bin/clean_art_table.inc => ./bin/cli cleanup:art
* ./bin/compute_cache.inc => ./bin/cli run:computeCache
* ./bin/cron.inc => ./bin/cli run:cronProcess
* ./bin/delete_disabled.inc => ./bin/cli cleanup:songs
* ./bin/dump_album_art.inc => ./bin/cli export:albumArt
* ./bin/fix_filenames.inc => ./bin/cli run:convertFilenames
* ./bin/print_tags.inc => ./bin/cli print:tags
* ./bin/sort_files.inc => ./bin/cli cleanup:sortSongs
* ./bin/update_db.inc => ./bin/cli run:updateDb
* ./bin/update_file.inc => ./bin/cli run:updateCatalogFile
* ./bin/websocket_run.inc => ./bin/cli run:websocket
* ./bin/write_playlists.inc  => ./bin/cli export:playlist

`./bin/channel_run.inc` has no replacement. Channels were removed from Ampache and there is no `run:channel` command.

## Command changes

There are 2 files that have had switches change between versions.

When migrating `catalog_update.inc` and `update_file.inc` commands take note that if you used the shorthand switch `-v` it has changed to `-e`

So the Ampache 4 command:

`./bin/catalog_update.inc music -cagv`

Becomes:

`./bin/cli run:updateCatalog music -cage`

## New CLI actions

There are some new features that were never part of Ampache 4.

### export:databaseArt

If you have a large image table and would like to export your art, this command will export art to the `local_metadata_dir` from your config.

### run:cacheProcess

Command to start [Transcode Caching](/docs/configuration/transcoding/transcode-caching).

### run:moveCatalogPath

When you have changed mount points you can update the database locations to match this new location.

## Full command reference

This is the full list of `./bin/cli` commands. Every command supports `-h|--help` for its own argument/option list. Arguments in `<angle brackets>` are required; arguments in `[square brackets]` are optional and may have a default value.

### admin

| Command                             | Description                                                                              | Arguments / Options                                                                                          |
|-------------------------------------|------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| `admin:addUser`                     | Add a User                                                                               | `<username>`; `-p\|--password`, `-e\|--email`, `-w\|--website`, `-n\|--name`, `-l\|--level`                  |
| `admin:clearCache`                  | Clear a cache. Only `perpetual_api_session` persists; object caches live for one process | `[type]` (`perpetual_api_session`, `song`, `artist`, `album`), default `perpetual_api_session`               |
| `admin:deleteUser`                  | Delete a User                                                                            | `[username]`; `-u\|--user` (User ID)                                                                         |
| `admin:disableUser`                 | Disable a User                                                                           | `[username]`; `-u\|--user` (User ID)                                                                         |
| `admin:enableUser`                  | Enable a User                                                                            | `[username]`; `-u\|--user` (User ID)                                                                         |
| `admin:exportSchema`                | Regenerate the `ampache.sql` seed dump from this database                                | `-e\|--execute` (write the file), `-f\|--file` (output file)                                                 |
| `admin:installCatalogType`          | Install a catalog type                                                                   | `<type>` (`local`, `remote`, `subsonic`, `beets`, `beetsremote`, `Seafile`, `dropbox`)                       |
| `admin:installLocalplay`            | Install a localplay controller                                                           | `<type>` (`mpd`, `upnp`, `httpq`, ...); `-u\|--user` (user to receive the localplay preferences, `-1` = all) |
| `admin:installPlugin`               | Install a plugin                                                                         | `<name>`                                                                                                     |
| `admin:listModules`                 | List plugins, catalog types and localplay controllers                                    | none                                                                                                         |
| `admin:listUsers`                   | Users List                                                                               | `[username]`; `-a\|--apikey`, `-u\|--user`                                                                   |
| `admin:mailUsers`                   | Send an e-mail to a group of users                                                       | `[group]` (`all`, `users`, `admins`, `inactive`), default `all`; `-s\|--subject`, `-m\|--message`            |
| `admin:resetPreferences`            | Reset preference values for users                                                        | `<username>`; `-e\|--execute`, `-p\|--preset` (`system`, `default`, `minimalist`, `community`)               |
| `admin:uninstallCatalogType`        | Uninstall a catalog type                                                                 | `<type>`                                                                                                     |
| `admin:uninstallLocalplay`          | Uninstall a localplay controller                                                         | `<type>`                                                                                                     |
| `admin:uninstallPlugin`             | Uninstall a plugin                                                                       | `<name>`                                                                                                     |
| `admin:updateConfigFile`            | Update the Ampache config file                                                           | `-e\|--execute`                                                                                              |
| `admin:updateDatabase`              | Update the database to the latest version                                                | `-e\|--execute`                                                                                              |
| `admin:updatePlugins`               | Update Plugins automatically                                                             | `-e\|--execute`                                                                                              |
| `admin:updatePreferenceAccessLevel` | Update Preference Access Level                                                           | `-e\|--execute`, `-l\|--level` (`default`, `guest`, `user`, `content_manager`, `manager`, `admin`)           |
| `admin:updateUser`                  | Update User                                                                              | `[username]`; `-a\|--apikey`, `-s\|--streamtoken`, `-r\|--rsstoken`, `-p\|--subsonic`, `-l\|--level`         |
| `admin:upgradePlugin`               | Upgrade a plugin                                                                         | `<name>`                                                                                                     |

### cleanup

| Command                    | Description                                        | Arguments / Options                                                                                                                                                                                                                                               |
|----------------------------|----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cleanup:art`              | Remove art which does not fit to the settings      | `-c\|--cleanup` (remove missing files from the database), `-t\|--thumbnails` (delete all thumbnails), `-x\|--execute` (disables dry-run)                                                                                                                          |
| `cleanup:consolidateStats` | Consolidate old play history into summary counts   | `-c\|--count-type` (`stream`, `skip`, `download`), `-e\|--execute` (disables dry-run)                                                                                                                                                                             |
| `cleanup:enableDisabled`   | Re-enable all disabled songs                       | none                                                                                                                                                                                                                                                              |
| `cleanup:restoreStats`     | Restore consolidated play history from the archive | `-e\|--execute` (disables dry-run)                                                                                                                                                                                                                                |
| `cleanup:songs`            | Delete disabled songs                              | `-d\|--delete` (disables dry-run)                                                                                                                                                                                                                                 |
| `cleanup:sortSongs`        | Sort songs files                                   | `[catalogName]`; `-x\|--execute` (disables dry-run), `-f\|--files` (rename in place instead of moving), `-l\|--limit`, `-w\|--windows` (replace Windows-incompatible characters), `-n\|--name` (`Various Artists` name), `-p\|--path` (sort a single file/folder) |

### export

| Command              | Description                                     | Arguments / Options                                                                                                                                                                                                                                             |
|----------------------|-------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `export:albumArt`    | Export album art                                | `[type]` (`linux` or `windows`), default `linux`                                                                                                                                                                                                                |
| `export:catalog`     | Export catalog metadata to a file               | `<file>`, `[format]` (`csv`, `itunes`), default `csv`; `-c\|--catalog` (Catalog ID, `0` = all)                                                                                                                                                                  |
| `export:databaseArt` | Export all database art to `local_metadata_dir` | `-c\|--clear` (clear the database image when the local file exists)                                                                                                                                                                                             |
| `export:playlist`    | Export Playlists                                | `<directory>`, `[type]` (`albums`, `artists`, `playlists`, `smartlists`), default `playlists`, `[extension]` (`m3u`, `xspf`, `pls`), default `m3u`, `[playlistId]`, default `-1`; `-u\|--user`, `-w\|--web` (return remote play URLs instead of the local file) |

### print

| Command            | Description                     | Arguments / Options                         |
|--------------------|---------------------------------|---------------------------------------------|
| `print:duplicates` | Find possible duplicate objects | `-t\|--type` (object type), default `album` |
| `print:tags`       | Print file tags                 | `<filename>`                                |

### run

| Command                   | Description                                                                                      | Arguments / Options                                                                                                                                                                                                                             |
|---------------------------|--------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `run:addCatalog`          | Create a local media catalog                                                                     | `[catalogName]`, `[catalogPath]`, `[mediaType]` (`music`, `video`, `podcast`), default `music`, `[filePattern]`, default `%T - %t`, `[folderPattern]`, default `%a/%A`                                                                          |
| `run:broadcast`           | Run a UPnP broadcast                                                                             | none                                                                                                                                                                                                                                            |
| `run:cacheProcess`        | Run the [Transcode Caching](/docs/configuration/transcoding/transcode-caching) process           | none                                                                                                                                                                                                                                            |
| `run:calculateArtSize`    | Run art size calculation                                                                         | `-f\|--fix` (fix database issues)                                                                                                                                                                                                               |
| `run:computeCache`        | Update the object cache tables                                                                   | none                                                                                                                                                                                                                                            |
| `run:convertFilenames`    | Convert filenames using a charset                                                                | `-f\|--fire` (fire-and-forget, disables the rename prompt), `-c\|--charset`, default the output charset                                                                                                                                         |
| `run:cronProcess`         | Run the cron process                                                                             | none                                                                                                                                                                                                                                            |
| `run:deleteCatalog`       | Delete a media catalog                                                                           | `<catalogId>`                                                                                                                                                                                                                                   |
| `run:disableCatalog`      | Disable a media catalog                                                                          | `<catalogId>`                                                                                                                                                                                                                                   |
| `run:enableCatalog`       | Enable a media catalog                                                                           | `<catalogId>`                                                                                                                                                                                                                                   |
| `run:moveCatalogPath`     | Change a Catalog path, e.g. after moving a mount point                                           | `[catalogName]`, `[catalogType]`, default `local`, `[path]`                                                                                                                                                                                     |
| `run:updateCatalog`       | Perform catalog actions for all files of a catalog. If no options are given, `-ceagt` is assumed | `[catalogName]`, `[catalogType]`, default `local`; `-c\|--cleanup`, `-a\|--add`, `-g\|--art`, `-e\|--verify`, `-f\|--find`, `-u\|--update`, `-i\|--import`, `-o\|--optimize`, `-t\|--garbage`, `-s\|--scan`, `-l\|--limit`, `-m\|--memorylimit` |
| `run:updateCatalogFile`   | Perform catalog actions for a single file                                                        | `<catalogName>`, `<filePath>`; `-c\|--cleanup`, `-e\|--verify`, `-a\|--add`, `-g\|--art`, `-m\|--move`, `-r\|--rename`                                                                                                                          |
| `run:updateCatalogFolder` | Perform catalog actions for a single folder                                                      | `<catalogName>`, `<folderPath>`; `-c\|--cleanup`, `-e\|--verify`, `-a\|--add`, `-g\|--art`, `-m\|--move`, `-s\|--scan`                                                                                                                          |
| `run:updateDb`            | Update the database collation and charset                                                        | `-x\|--execute` (disables dry-run)                                                                                                                                                                                                              |
| `run:websocket`           | Run a Websocket                                                                                  | `-p\|--port`, default `8100`                                                                                                                                                                                                                    |

### show

| Command        | Description                                 | Arguments / Options                                                    |
|----------------|---------------------------------------------|------------------------------------------------------------------------|
| `show:debug`   | Show a system status and environment report | `-u\|--check-updates` (query the remote version, needs network access) |
| `show:version` | Show the current Ampache version            | none                                                                   |

## bin/installer commands

`./bin/installer` is a separate, smaller binary used before Ampache has a working config/database — it does **not** share commands with `./bin/cli`, so `install` and `htaccess` only exist here.

| Command    | Description                                                   | Arguments / Options                                                                                                                                                  |
|------------|---------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `install`  | Install the database (see [Installation](/docs/installation)) | `-U\|--dbuser`, `-P\|--dbpassword`, `-H\|--dbhost`, `-o\|--dbport`, `-d\|--dbname`, `-u\|--ampachedbuser`, `-p\|--ampachedbpassword`, `-w\|--webpath`, `-f\|--force` |
| `htaccess` | Create `.htaccess` files                                      | `-e\|--execute`, `-p\|--public`                                                                                                                                       |

Usage examples:

```shell
./bin/installer install -U root -P mypassword -H localhost -d ampache -u ampache -p ampachepassword -w /ampache -f
./bin/installer htaccess -e
```

`htaccess -e` writes `public/play/.htaccess` and `public/rest/.htaccess`, the two Ampache needs to stream and to serve the APIs.

`-p` adds `public/.htaccess`, which is optional hardening rather than a requirement: a user art redirect, blocking for private paths such as `config/` and `.git`, and the commented-out bot filter.

```shell
./bin/installer htaccess -e -p
```

**NOTE** `-p` overwrites `public/.htaccess`, so back it up first if you edited it. See [Rewrite Rules](/docs/installation/rewrite-rules) for what the file blocks.
