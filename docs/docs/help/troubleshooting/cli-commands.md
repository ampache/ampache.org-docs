---
title: "Ampache CLI Commands"
metaTitle: "Ampache CLI Commands"
description: "A reference for every command available in the Ampache CLI"
---

## Ampache CLI Commands

Every administrative and maintenance task in Ampache is available from the command line through `bin/cli`.

This page lists every command grouped by its prefix.
For the migration history from the old `bin/*.inc` scripts see [Ampache CLI](/docs/help/troubleshooting/cli).

Run the program with no arguments to see the full list, and add `-h` or `--help` to any command to see its arguments and options.

```shell
php bin/cli
php bin/cli admin:addUser --help
```

Commands are grouped by a prefix that describes what they touch:

* `admin:` — users, access control, licenses, catalog filters, modules, mail and other server administration
* `run:` — catalogs and long-running background processes
* `cleanup:` — housekeeping of statistics, art and disabled media
* `export:` — writing art, playlists and catalog metadata to disk
* `print:` — read-only reports printed to the terminal
* `show:` — read-only information about the installation

Most `admin:` and `run:` commands change your database, so treat them with the same care as the equivalent page in the web interface.

![image](/img/1305249/627484330-3bd72794-03b9-496f-9909-1e7cedfca044.png)

## admin: — server administration

Many of these commands mirror an action on an **Admin** page in the web interface and call the same code underneath, so a change made on the command line shows up in the browser and vice versa.

### Users

| Command             | What it does                                                                                                                                                                          |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `admin:addUser`     | Create a user account. Takes a `<username>` argument plus `--password`, `--email`, `--website`, `--name` and `--level` options. A random password is generated when none is supplied. |
| `admin:listUsers`   | List every user, or find one by `[username]` / `--user <id>`. `--apikey` prints only the API key.                                                                                     |
| `admin:updateUser`  | Update a single user: generate a new `--apikey`, `--streamtoken` or `--rsstoken`, set the `--subsonic` password, or change the access `--level`.                                      |
| `admin:deleteUser`  | Delete a user by `[username]` or `--user <id>`. Refuses to remove the last active administrator.                                                                                      |
| `admin:enableUser`  | Enable a disabled user.                                                                                                                                                               |
| `admin:disableUser` | Disable a user. Refuses to disable the last active administrator.                                                                                                                     |

```shell
# Create a manager-level user with a known password
php bin/cli admin:addUser jane --level 75 --password "s3cr3t" --email jane@example.com

# Rotate a user's API key
php bin/cli admin:updateUser jane --apikey

# Disable, then later delete a user
php bin/cli admin:disableUser jane
php bin/cli admin:deleteUser jane
```

### Access Control Lists

Access Control Lists (ACLs) restrict which addresses may stream, use the API/RPC, reach the web interface, or act as trusted network hosts.
These mirror the **Admin → Access Control** page.

| Command           | What it does                                                                                                                                            |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `admin:listAcl`   | List every ACL with its address range, type, level and assigned user.                                                                                   |
| `admin:addAcl`    | Add an ACL. Takes a `<name>` argument plus `--start`, `--end`, `--level`, `--type` (`stream`, `interface`, `rpc`, `network`), `--addtype` and `--user`. |
| `admin:updateAcl` | Update an existing ACL by `<accessId>`.                                                                                                                 |
| `admin:deleteAcl` | Delete an ACL by `<accessId>`.                                                                                                                          |

```shell
php bin/cli admin:addAcl "office" --start 10.0.0.1 --end 10.0.0.255 --type stream --level 25
php bin/cli admin:listAcl
php bin/cli admin:deleteAcl 7
```

### Licenses

Licenses are the reusable rights labels (Creative Commons, All rights reserved, …) that can be attached to media.
These mirror the **Admin → Licenses** page and are available to managers.

| Command               | What it does                                                                                    |
|-----------------------|-------------------------------------------------------------------------------------------------|
| `admin:listLicenses`  | List every license by id and name.                                                              |
| `admin:addLicense`    | Add a license. Takes a `<name>` argument plus `--description`, `--external_link` and `--order`. |
| `admin:updateLicense` | Update a license by `<licenseId>`; omitted options keep their current value.                    |
| `admin:deleteLicense` | Delete a license by `<licenseId>`.                                                              |

```shell
php bin/cli admin:addLicense "CC BY 4.0" --external_link https://creativecommons.org/licenses/by/4.0/
php bin/cli admin:listLicenses
```

### Catalog filters

Catalog filter groups control which catalogs a group of users can see.
These mirror the **Admin → Catalog Filters** page.

| Command              | What it does                                                                                                                      |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `admin:listFilters`  | List every filter group with its user and catalog counts.                                                                         |
| `admin:addFilter`    | Add a filter group. Takes a `<name>` argument plus `--catalogs 1,3` (a comma-separated list of catalog ids to enable) or `--all`. |
| `admin:updateFilter` | Update a filter group by `<filterId>`. `--catalogs` sets the exact enabled set; omit it to keep the current membership.           |
| `admin:deleteFilter` | Delete a filter group by `<filterId>`. The built-in `DEFAULT` group (id 0) cannot be deleted.                                     |

```shell
php bin/cli admin:addFilter "podcasts-only" --catalogs 4
php bin/cli admin:updateFilter 2 --all
php bin/cli admin:listFilters
```

### Modules (plugins, catalog types and localplay)

Ampache has three kinds of pluggable module: application **plugins**, **catalog types** (the backends a catalog can use, such as `subsonic` or `beets`) and **localplay** controllers (players such as `mpd` that Ampache can drive).
These mirror the **Admin → Modules** pages.

| Command                      | What it does                                                                                        |
|------------------------------|-----------------------------------------------------------------------------------------------------|
| `admin:listModules`          | List every plugin, catalog type and localplay controller and whether it is installed.               |
| `admin:installPlugin`        | Install (enable) a plugin by `<name>` and rebuild user preferences so its settings appear.          |
| `admin:uninstallPlugin`      | Uninstall (disable) a plugin by `<name>`.                                                           |
| `admin:upgradePlugin`        | Upgrade an installed plugin by `<name>` to the bundled version.                                     |
| `admin:installCatalogType`   | Install (enable) a catalog type by `<type>`.                                                        |
| `admin:uninstallCatalogType` | Uninstall (disable) a catalog type by `<type>`.                                                     |
| `admin:installLocalplay`     | Install (enable) a localplay controller by `<type>` and set the localplay preferences for `--user`. |
| `admin:uninstallLocalplay`   | Uninstall (disable) a localplay controller by `<type>`.                                             |

```shell
php bin/cli admin:listModules
php bin/cli admin:installPlugin lastfm
php bin/cli admin:installCatalogType subsonic
php bin/cli admin:installLocalplay mpd
```

See [Ampache Plugins](/docs/plugins) for what each plugin does.

![image](/img/1305249/627484766-0c02fa77-49c8-42a3-b1ac-8e5b9ea9072e.png)

### Shoutbox moderation

Shouts are the short public comments users leave on media.
These mirror the **Admin → Shoutbox** page.

| Command             | What it does                                                                                        |
|---------------------|-----------------------------------------------------------------------------------------------------|
| `admin:listShouts`  | List the most recent shouts. `--limit` sets how many; an optional `[username]` filters to one user. |
| `admin:deleteShout` | Delete a shout by `<shoutId>`.                                                                      |

### Mail

| Command           | What it does                                                                                                                                                                                              |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `admin:mailUsers` | Send an e-mail to a group of users. Takes a `[group]` argument (`all`, `users`, `admins`, `inactive`) plus `--subject` and `--message`. Does nothing when mail is disabled or the server is in demo mode. |

```shell
php bin/cli admin:mailUsers users --subject "Maintenance" --message "The server restarts at 02:00 UTC."
```

### System administration

| Command                             | What it does                                                                                                                                                                                            |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `admin:updateDatabase`              | Apply any pending database migrations. Run this after upgrading Ampache.                                                                                                                                |
| `admin:updateConfigFile`            | Regenerate `config/ampache.cfg.php`, merging in any new options for your installed version.                                                                                                             |
| `admin:updatePlugins`               | Upgrade every installed plugin to its bundled version in one pass.                                                                                                                                      |
| `admin:updatePreferenceAccessLevel` | Change the access level required to edit a preference.                                                                                                                                                  |
| `admin:resetPreferences`            | Reset preference values back to their defaults for users.                                                                                                                                               |
| `admin:clearCache`                  | Clear a cache by `[type]`. Only `perpetual_api_session` has a lasting effect (it removes stored perpetual API sessions); the `song`, `artist` and `album` object caches live only for a single process. |
| `admin:exportSchema`                | Regenerate the `resources/sql/ampache.sql` seed dump from the current database. A development/release tool; it refuses to run when migrations are pending.                                              |

## run: — catalogs and background processes

### Catalogs

| Command                   | What it does                                                                                                                                                                                 |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `run:addCatalog`          | Create a local media catalog. Takes `[catalogName]`, `[catalogPath]`, `[mediaType]` (`music`, `video`, `podcast`), `[filePattern]` and `[folderPattern]`.                                    |
| `run:updateCatalog`       | Perform catalog actions across all files: clean, add, gather art, verify and garbage-collect. With no options the defaults `-ceagt` are used. Accepts a `[catalogName]` and `[catalogType]`. |
| `run:updateCatalogFile`   | Perform catalog actions for a single file.                                                                                                                                                   |
| `run:updateCatalogFolder` | Perform catalog actions for a single folder.                                                                                                                                                 |
| `run:deleteCatalog`       | Delete a catalog by `<catalogId>` and everything it owns.                                                                                                                                    |
| `run:enableCatalog`       | Enable a catalog by `<catalogId>`.                                                                                                                                                           |
| `run:disableCatalog`      | Disable a catalog by `<catalogId>` without deleting it.                                                                                                                                      |
| `run:moveCatalogPath`     | Update the stored file locations for a catalog after a mount point has changed.                                                                                                              |

```shell
php bin/cli run:addCatalog music /media/music music
php bin/cli run:updateCatalog music
php bin/cli run:disableCatalog 3
```

The `-v` verify switch from Ampache 4 is now `-e`; see [Command changes](/docs/help/troubleshooting/cli#command-changes).

### Background processes

| Command                | What it does                                                                                                       |
|------------------------|--------------------------------------------------------------------------------------------------------------------|
| `run:cronProcess`      | Run the scheduled cron tasks. Intended to be triggered from the system cron. See [CRON](/docs/configuration/cron). |
| `run:cacheProcess`     | Populate the [transcode cache](/docs/configuration/transcoding/transcode-caching).                                 |
| `run:computeCache`     | Rebuild the object cache tables.                                                                                   |
| `run:calculateArtSize` | Fill in the stored width/height for art.                                                                           |
| `run:convertFilenames` | Convert file names in the database to a different character set.                                                   |
| `run:broadcast`        | Run a UPnP broadcast.                                                                                              |
| `run:websocket`        | Run the WebSocket server used by the now-playing broadcast feature.                                                |
| `run:updateDb`         | Update the database collation and character set.                                                                   |

## cleanup: — housekeeping

| Command                    | What it does                                                                                                                         |
|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| `cleanup:stats`            | Clear play statistics and/or the now-playing list. With no flag both are cleared; `--stats`, `--now-playing` and `--user` narrow it. |
| `cleanup:enableDisabled`   | Re-enable every song that was previously disabled.                                                                                   |
| `cleanup:songs`            | Delete songs that are currently disabled.                                                                                            |
| `cleanup:art`              | Remove art that no longer fits the configured size/keep settings.                                                                    |
| `cleanup:sortSongs`        | Move song files into place according to the catalog sort pattern.                                                                    |
| `cleanup:consolidateStats` | Consolidate old play history into summary counts and archive the detail rows.                                                        |
| `cleanup:restoreStats`     | Restore consolidated play history back from the archive.                                                                             |

```shell
# Clear only the now-playing list, leaving history intact
php bin/cli cleanup:stats --now-playing
```

## export: — writing files to disk

| Command              | What it does                                                                                                                             |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `export:catalog`     | Export catalog metadata to a file. Takes a `<file>` argument and a `[format]` (`csv` or `itunes`); `--catalog` limits it to one catalog. |
| `export:playlist`    | Export playlists to a directory as `m3u`, `pls`, `xspf` or `m3u8`.                                                                       |
| `export:albumArt`    | Export embedded/side-car album art to the catalog folders.                                                                               |
| `export:databaseArt` | Export all art stored in the database to the `local_metadata_dir`.                                                                       |

```shell
php bin/cli export:catalog /backup/library.csv csv
```

## print: — terminal reports

| Command            | What it does                                                                          |
|--------------------|---------------------------------------------------------------------------------------|
| `print:duplicates` | Print possible duplicate albums, artists or songs. `[type]` selects what to look for. |
| `print:tags`       | Print the tags Ampache reads from a media file.                                       |

## show: — installation information

| Command        | What it does                                                                                                                                                                                                     |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `show:debug`   | Print a headless status and environment report: version, structure, PHP version, last cron run and a pass/fail list of the runtime prerequisites. Add `--check-updates` to also query the remote latest version. |
| `show:version` | Print the Ampache version.                                                                                                                                                                                       |

```shell
php bin/cli show:debug
```

![image](/img/1305249/627484975-37d10b88-f984-42a1-8eda-5e9df2859ecd.png)
