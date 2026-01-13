# Explaining the Ampache CLI

The Ampache bin folder has been cleaned up into a 2 files. `bin/cli` and `bin/installer`

Generally you should only be interested in the cli program; all the old scripts have been migrated into cli commands.

-h|--help can be used to display help for commands and cli itself.

## Migrated actions

In general, simply updating the command should work as expected with 2 [exceptions](#Command-changes).

* ./bin/install/add_user.inc => ./bin/cli admin:addUser
* ./bin/install/install_db.inc => ./bin/installer
* ./bin/install/update_db.inc => ./bin/cli admin:updateDatabase
* ./bin/broadcast.inc => ./bin/cli run:broadcast
* ./bin/calculate_art_size.inc => ./bin/cli run:calculateArtSize
* ./bin/catalog_update.inc => ./bin/cli run:updateCatalog
* ./bin/channel_run.inc => ./bin/cli run:channel
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

Command to start [Transcode Caching](https://github.com/ampache/ampache/wiki/Transcode-Caching).

### run:moveCatalogPath

When you have changed mount points you can update the database locations to match this new location.
