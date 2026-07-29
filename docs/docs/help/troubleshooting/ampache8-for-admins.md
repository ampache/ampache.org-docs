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

The develop branch is holding the current WIP of Ampache8.

**NOTE** This used to be the develop8 branch. Ampache8 is now the mainline, so develop is Ampache8 and the Ampache7 line lives on release7.

You can check out a new install on the branch.

```shell
git clone -b develop https://github.com/ampache/ampache.git ampache8
```

Or you can pull the branch onto your current system.

```shell
git checkout develop
```

If you were already tracking develop8, point your checkout at the new branch.

```shell
git fetch origin
git checkout develop
```

If you have any issues you can reset the branch forcibly with.

```shell
git reset --hard origin/develop
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

We will start building official Ampache8 images for [docker](/docker) closer to release.

In the meantime the `docker-compose.yml` in the repository is now a full development stack.

It builds `docker/Dockerfilephp85` (PHP 8.5) and adds a MariaDB service with a persistent volume and healthcheck.

New environment variables allow a zero-touch first run: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `AMPACHE_DB_USER`, `AMPACHE_DB_PASSWORD`, `AMPACHE_ADMIN_USER`, `AMPACHE_ADMIN_PASSWORD` and `AMPACHE_ADMIN_EMAIL`.

The entrypoint creates the `.htaccess` files from their `.dist` versions, runs composer and npm when missing, installs the database and creates the admin user.

Set `DB_NAME` to an empty value if you want to use the web installer instead.

The php8.2, php8.3 and php8.4 Dockerfiles have been removed.

## Rollback to Ampache7

Ampache8 now makes real database changes. (New tables, new preferences and data resets)

Ampache 7.10.0 added the downgrade path from Ampache8 so make sure you are on the latest Ampache7 release before trying it out.

To go back, check out your Ampache7 branch and run the update command; the database will be downgraded to match your version.

`php bin/cli admin:updateDatabase -e`

![image](/img/1305249/db7bcbdb-de94-4db2-86a3-2151646ae877.png)

## PHP Version support

The first major change is that Ampache8 supports PHP8.5+ **ONLY**!

Builds will no longer support other versions.

Your distribution probably doesn't ship PHP8.5 yet, and you don't have to wait for it.

Both of the third party repositories below are maintained by the people who package PHP for the distributions themselves.

### PHP8.5 on Debian and Ubuntu (Sury)

On Debian, add the Sury repository.

```shell
sudo apt-get update
sudo apt-get -y install lsb-release ca-certificates curl
sudo curl -sSLo /tmp/debsuryorg-archive-keyring.deb https://packages.sury.org/debsuryorg-archive-keyring.deb
sudo dpkg -i /tmp/debsuryorg-archive-keyring.deb
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/debsuryorg-archive-keyring.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
sudo apt-get update
```

On Ubuntu, use the same maintainer's PPA instead.

```shell
sudo add-apt-repository ppa:ondrej/php
sudo apt update
```

Then install the versioned packages Ampache needs.

```shell
sudo apt install php8.5 php8.5-curl php8.5-gd php8.5-intl php8.5-mysql php8.5-xml php8.5-zip
```

Every version is co-installable, so PHP8.5 goes on beside the one your system already uses.

### PHP8.5 on RHEL, Rocky, Alma and Fedora (Remi)

Install the release package for your version, replacing `9` with `10` on Enterprise Linux 10.

```shell
sudo dnf install https://rpms.remirepo.net/enterprise/remi-release-9.rpm
```

On Fedora use the matching Fedora release package instead.

```shell
sudo dnf install https://rpms.remirepo.net/fedora/remi-release-43.rpm
```

Then switch the module stream to PHP8.5 and install.

```shell
dnf module list php
sudo dnf module reset php
sudo dnf module install php:remi-8.5
sudo dnf install php-curl php-gd php-intl php-mysqlnd php-xml php-zip
```

Run `dnf module list php` first to confirm the stream name on your release.

### Staying on Ampache7 instead

If you can't move your server yet, stay on the `patch7` or `release7` branch by checking out the git branch.

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

## Transcoding bitrates are sent in full bps: remove the `k` from your config

Ampache 7.8.0 asked you to add a `k` to all `%BITRATE%` values in your `encode_args_*` settings.

Ampache8 reverses this: the bitrate is now expanded to full bps **before** it is inserted into your transcode command.

The config defaults have changed from `%BITRATE%k` back to `%BITRATE%`.

```conf
; e.g. the new default mp3 encode args
encode_args_mp3 = "-vn -b:a %BITRATE% -c:a libmp3lame -f mp3 pipe:1"
```

**NOTE** This can not be updated automatically in your config file. If you keep the `k` your transcoder will be asked for bitrates like `128000k`, so check every `encode_args_` parameter when upgrading. (`encode_args_ts` still uses `%MAXBITRATE%k`)

New output profiles are available if you want to add them to your own `encode_args_*` config: `mp3_rg`, `mp3_car`, `opus_rg` and `opus_car` (ReplayGain-aware variants, never written to the transcode cache), plus a fragmented-MP4 `m4a` profile.

## Transcoding preferences moved per-user

`encode_target`, `encode_video_target` and the per-player `encode_player_webplayer_target`/`encode_player_api_target` settings used to live only in `ampache.cfg.php`. In Ampache8 they are per-user preferences under **Streaming -> Transcoding** instead; your existing config values just seed the default the first time a user's preferences are created on upgrade, so nothing changes for users until they open that page.

Two more per-user preferences add dynamic downsampling: `max_bit_rate`/`min_bit_rate` let a user cap and floor their own transcode bitrate, and `transcode_bitrate_webplayer`/`transcode_bitrate_api` override the bitrate per-player (`0` uses the site default `transcode_bitrate`).

An explicit `format=` request parameter still always takes priority over the target preferences.

## Playlist art mosaic

Automatically generated playlist cover art can now be a mosaic of up to nine covers from the playlist instead of a single random cover. Playlists with fewer than four distinct covers keep the old single-cover behaviour.

```conf
; DEFAULT: "true"
playlist_art_mosaic = "true"
```

Set `playlist_art_mosaic_fallback` to `true` if you'd rather a playlist with no art of its own got a generated mosaic than the blank placeholder; the image is only built once and then stored as that playlist's own art.

```conf
; DEFAULT: "false"
;playlist_art_mosaic_fallback = "true"
```

## Statistical Graphs no longer need `ext-gd`

Graphs are now drawn by [goat1000/svggraph](https://github.com/goat1000/SVGGraph) (LGPL-3.0) instead of `szymach/c-pchart`. Since it's a normal dependency rather than a dev-only one, a release download works out of the box with nothing extra to install — see the updated [Charts and Graphs](/docs/help/troubleshooting/chart-faq) page.

Graphs render as SVG instead of PNG, so they scale to the page and stay sharp on a high-dpi screen, and `statistical_graphs` now defaults to `"true"`. Set it to `"false"` to skip the graph queries entirely on a very large catalog.

## Database changes for Ampache8

Ampache8 brings the first new database updates since the version split.

* New tables `folder` and `folder_map` holding a virtual folder tree for each catalog
* New tables `object_count_summary` and `object_count_archive` for [play history consolidation](#play-history-consolidation)
* `folder` added to the `object_type` enum on `cache_object_count`, `cache_object_count_run`, `image`, `object_count`, `rating`, `tag_map`, `user_activity` and `user_flag`
* New `user`.`subsonic_secret` column holding the per-user [Subsonic Password](#a-dedicated-subsonic-password)
* New `last_played` column on `album`, `album_disk`, `artist`, `podcast`, `podcast_episode`, `song` and `video`, backfilled from your existing play history
* New tables `collection` and `collection_map` holding [collections](#collections-curate-a-list-of-anything)
* `collection` added to the `object_type` enum on `cache_object_count`, `cache_object_count_run`, `image`, `object_count`, `object_count_archive`, `object_count_summary`, `rating` and `user_flag`
* New preference `api_enable_8` (Allow Ampache API8 responses)
* New preference `show_folder` (Show 'Folders' link in the main sidebar)
* New preference `show_collection` (Show 'Collections' link in the main sidebar)
* New preference `mini_player` (Lock this user into the mini player interface)
* New per-user transcoding preferences: `encode_target`, `encode_video_target`, `encode_player_webplayer_target`, `encode_player_api_target`, `max_bit_rate`, `min_bit_rate`, `transcode_bitrate_webplayer` and `transcode_bitrate_api` — see [Transcoding preferences moved per-user](#transcoding-preferences-moved-per-user)
* Removed preferences `webplayer_flash`, `webplayer_aurora` and `play2`
* Any user with `subsonic_legacy` enabled has it disabled (OpenSubsonic becomes the default)
* Any `direct_play_limit` set to 0 (unlimited) is reset to a cap of 500 tracks
* Existing `transcode_bitrate` values are migrated to bits per second (see [Transcoding bitrates are sent in full bps](#transcoding-bitrates-are-sent-in-full-bps-remove-the-k-from-your-config) above)
* Dropped four redundant `object_count` indexes that duplicated or prefixed `object_count_UNIQUE_IDX`/`object_count_date_IDX`
* Uploaded art with a corrected mime type (`.jpg` no longer stored as the invalid `image/jpg`)

**NOTE** The `object_type` enum updates also delete orphaned rows that reference an invalid object type. This is bad data cleanup but it is destructive, so back up your database before updating.

## Play history consolidation

Large, long-running servers can end up with millions of rows in `object_count`. Ampache8 can now roll old detail rows up into summary counts.

Set `stats_consolidate_threshold` in your config to the number of days of detailed play history you want to keep (the default `0` disables consolidation entirely):

```conf
; Keep 2 years of detailed history, consolidate anything older
stats_consolidate_threshold = 730
```

Run the new CLI command to consolidate anything past the threshold. Like most cleanup commands it defaults to a dry-run; pass `-e` to actually write:

```shell
php bin/cli cleanup:consolidateStats -e
```

Consolidation is lossless: nothing is discarded. Detail rows past the threshold move into `object_count_archive` and get rolled up into `object_count_summary`; play counts, `played` flags and streamed data size stay exact. Only period-based statistics (trending, recent, graphs, Last.fm export), smart playlist play-history rules, and play-count sorting only see the retained window — and the "Recently Played" smart playlist rule only reaches back as far as the retained window, since it needs individual timestamps.

If you need the detail back (to re-run a report over the full history, or you consolidated too aggressively), restore it with:

```shell
php bin/cli cleanup:restoreStats -e
```

This puts the archived detail rows back and regenerates the `album`, `album_disk`, `artist` and `podcast` counts from them.

An example systemd unit and timer for running consolidation on a schedule is in `docs/examples`.

## OpenID Connect (OIDC) login

Ampache8 adds a new `oidc` auth method so you can log in through a single OpenID Connect provider. (Keycloak, Entra ID, Authentik, Google, Okta, ...)

Add `oidc` to your `auth_methods` and keep `mysql` in the list so local accounts can still log in.

```conf
auth_methods = "mysql,oidc"
```

The login uses the authorization code flow with PKCE (S256) and only one provider is supported.

Register the redirect uri `<web_path>/oidc/` with your provider. It carries no query string and needs no extra webserver configuration.

Three keys are required; discovery fills in the rest from `/.well-known/openid-configuration`.

```conf
; Provider base url
oidc_url = "https://idp.example.com/realms/ampache"

; The confidential client registered with your provider
oidc_client_id = "ampache"
oidc_client_secret = "secret"
```

Users are matched by the claim in `oidc_username_claim` (default `preferred_username`) and are provisioned through the existing `auto_create`, `auto_user` and `external_auto_update` settings, exactly like LDAP.

Optional claim mappings copy provider data to the account: `oidc_name_claim`, `oidc_email_claim`, `oidc_website_claim`, `oidc_state_claim` and `oidc_city_claim`.

Other keys: `oidc_issuer`, `oidc_scopes`, `oidc_use_userinfo`, `oidc_button_text`, `oidc_auto_redirect`, `oidc_cert_path`, `oidc_disable_ssl_verify` and manual endpoint overrides (`oidc_authorization_endpoint`, `oidc_token_endpoint`, `oidc_userinfo_endpoint`, `oidc_jwks_uri`, `oidc_end_session_endpoint`) for providers without discovery.

Enable `oidc_auto_redirect` to skip the local login form entirely; the local form stays reachable at `login.php?force_display=1`.

Point `logout_redirect` at your provider's `end_session_endpoint` to sign out of the provider as well.

**NOTE** OIDC users can not authenticate with a username and password, so give them an API key for API clients. (`user_create_apikey` will do this automatically for new users)

![image](/img/1305249/721d22f5-ebbe-411a-9f0b-fadb71eed66d.png)

## Updated captcha with OCR testing

The old easycaptcha code has finally been replaced with [Gregwar/Captcha](https://github.com/Gregwar/Captcha/).

The library will generate a picture and then test it by using `convert` and `ocrad` to read the file.

If ocrad can read the captcha phrase it will generate a new file and try again.

In Debian you can install these packages to enable OCR testing:

* graphicsmagick-imagemagick-compat: (/usr/bin/convert)
* ocrad: (/usr/bin/ocrad)

If you don't have these programs installed the code will generate a picture without testing the result.

**NOTE** This was also backported to Ampache 7.10.0 for security.

## Folders: a virtual filesystem view of your catalogs

Ampache8 can map every song, podcast episode and video to its filesystem folder and let users browse the tree.

The folder tables are not filled automatically; scan them from the catalog pages.

* Each catalog's action dropdown gains a **Scan Folders** action
* The Manage Catalogs page gains a **Scan All Folders** action

![image](/img/1305249/a19506c4-c246-43d4-9616-f9f07aef2ae2.png)

![image](/img/1305249/1c50a3e9-7b2d-4262-a7b5-87ad2c1b53a3.png)

The sidebar **Folders** link only appears once the folder table has data and the `show_folder` preference is enabled.

WebDAV browsing has been rewritten on top of the folder tree, so WebDAV clients now see your real folder hierarchy.

## Collections: curate a list of anything

A collection is a hand-curated list that is not restricted to playable things.

A playlist can only hold media and a smartlist is built from rules, so neither can hold an album, an artist or a genre.

Albums, album disks, artists, genres, labels, live streams, playlists, podcasts, episodes, songs and videos can all sit in the same collection.

Nothing creates collections for you, so the tables stay empty until someone makes one.

Creating a collection and adding or removing its members is API-only in this release.

The web interface browses collections, opens them, edits name, visibility, pinned type and collaborators, sets art and deletes them.

A collection can be left mixed or pinned to a single type, after which anything else is refused when it is added.

Playing one expands its members, so an album contributes its songs and anything unplayable is skipped.

Visibility and collaborators work exactly like playlists: a collaborator is allowed to change the contents, only the owner or an admin can delete the list.

The sidebar **Collections** link only appears when the `show_collection` preference is enabled and there is a collection the user is allowed to see.

A fresh install has none, so the link stays hidden until the first collection is made through the API.

<image: the Collections browse page listing collections with their type, what they hold and their owner.>

<image: a collection page showing a mixed collection with a section per object type.>

API access is covered by the [API8 collection methods](/api); the REST paths are under `collections/`.

## Mini player

There's a new stripped-down `/m/` page showing only the `home` category plugins and the web player, aimed at small screens and simple accounts.

The `mini_player` preference (admin-only, per user) locks a user into that page — it hides the rest of the interface but is **not** an access control, since the user's normal access level still decides what data they can reach. Logging in returns the user to whatever page they originally asked for, including old `index.php#page.php?...` links.

A new `Mini player` button appears on the login form, next to `Register` and `Lost Password`, so anyone can jump straight to `/m/` after logging in without an admin needing to set the preference. Hide that button site-wide with the new `show_mini_player` config option:

```conf
; DEFAULT: "true"
show_mini_player = "false"
```

`/m/` itself stays reachable by url either way.

## The play2 stream action has been removed

The alternative `play2` playback action has been merged into the normal `play` action.

Old `action=play2` links keep working through a redirect, and the `play2` preference has been removed.

## The Web Player is HTML5 only

The Flash fallback (`jquery.jplayer.swf`) and the Aurora.js JavaScript decoders have been deleted.

The `webplayer_flash` and `webplayer_aurora` preferences are removed with them.

If your browser can not play a format natively, enable transcoding for it.

## API8 is here

API version 8 joins the concurrent live surfaces (3, 4, 5 and 6) and is the new default API version.

If you send a version 7 API call you will now receive an access denied error.

* New `api_enable_8` preference to enable/disable API8 responses per user
* API8 returns real HTTP status codes for errors and empty results (API3-6 always returned 200)
* API error messages are US English and are not translated
* New methods including `folder`, `folders`, `playlist_remove`, `random` and zip downloads for whole containers via `download`
* New collection methods `collections`, `collection`, `collection_items`, `collection_create`, `collection_edit`, `collection_delete`, `collection_add` and `collection_remove`

The REST interface is documented with a full OpenAPI spec at [ampache.org/rest/swagger](https://ampache.org/rest/swagger).

Two specs are published there: [openapi.json](https://ampache.org/openapi.json) for the current API8 surface, and [openapi-6.json](https://ampache.org/openapi-6.json) pinned to API6 for clients that also need to work against Ampache7. See the [REST API docs](/rest) for the differences.

All changes will be documented in the [API](/api) before final release.

## OpenSubsonic is now forced as the default Subsonic implementation

After a lot of poor implementation the split between Subsonic and Opensubsonic is now very clear.

When updating to Ampache8 all users will default to OpenSubsonic to ensure that everyone is using the latest version.

Users can still disable OpenSubsonic but the old implementation is now 1.16.1 compatible and does not support OpenSubsonic extensions.

Subsonic transcoding now converts the client `maxBitRate` correctly, so clients asking for e.g. 128kbps actually get 128kbps.

## OpenSubsonic now implements the full specification

Ampache8 implements every endpoint in the OpenSubsonic specification and reports ten extensions.

Four are new: `transcoding`, `playbackReport`, `topSongsByArtistId` and `sonicSimilarity`.

XML responses now carry the same OpenSubsonic fields as JSON, which was not the case before.

Songs, albums, videos and podcast episodes now report `played`, the date and time they were last streamed.

**NOTE** The internet radio station response field was being sent as `homepageUrl` instead of `homePageUrl`.

This was wrong on the plain Subsonic API too, so a client reading that field will start seeing it for the first time.

`sonicSimilarity` needs a sonic analysis plugin, which is a new plugin type in Ampache8.

Without one, `getSonicSimilarTracks` and `findSonicPath` report the feature as unsupported.

The new **AudioMuse** plugin provides it by talking to an AudioMuse-AI server that you run yourself.

Setup and how it works is documented in [AudioMuse](/docs/plugins/audiomuse).

The full extension list and what is left out is in the [Subsonic API docs](/api/subsonic).

**NOTE** The REST paths, including everything under `/rest/`, need webserver rewrite rules to work at all.

If your Subsonic clients get a 404 from every request, that is almost always the cause.

See [Rewrite Rules](/docs/installation/rewrite-rules) for Apache, nginx and the other supported webservers.

## A dedicated Subsonic Password

Subsonic token auth (`t`/`s` params) has always needed the server to recompute `md5(password + salt)`, which Ampache can't do against a normal hashed account password — until now that meant handing your API key to a Subsonic client as its "password".

Ampache8 adds a separate, per-user **Subsonic Password**, settable from the user's own account page, the admin user-edit page, or the CLI:

```shell
php bin/cli admin:updateUser some-user --subsonic "a-different-password"
```

It's stored encrypted with `secret_key` (not hashed, since the server has to recover the plaintext to compute the token), so **changing `secret_key` invalidates every stored Subsonic Password**. The API key keeps working as the Subsonic password too, for both token and plaintext auth, so existing clients don't need reconfiguring.

## Faster catalog scans

Catalog verify, clean and add have been reworked to cache file lists, query less and skip non-media files early.

Large catalogs should see noticeably faster update and clean actions.

## Placeholder labels are filtered out of your catalog

Publisher tags often hold placeholder text instead of a real label.

Discogs-sourced tags write `[no label]` and `Not On Label (Artist Self-released)` for releases that never had a publisher, and rippers leave behind fragments like `/v/`.

These are no longer created while scanning, and the catalog clean up removes the ones earlier scans already imported.

**NOTE** This deletes rows from the `label` table on your next catalog clean up, along with the art, ratings and shouts attached to them.

A label a user created by hand is never removed, however odd its name looks; only imported labels are swept.

Which names count as placeholders is a regex you control.

```conf
; DEFAULT: "^\[no label\]|^not on label\b|^\[fwd:|^self[\s-]*released?\b|\(self[\s-]*released?\)|^[^\p{L}\p{N}]*[\p{L}\p{N}]?[^\p{L}\p{N}]*$"
;label_ignore_pattern = "^\[no label\]|^not on label\b"
```

It is matched case-insensitively against the whole name, and setting it **replaces** the default rather than adding to it.

The last branch of the default drops names holding fewer than two letters or digits, such as `/<` or `/v/`, while leaving short real labels like `XL` and `4AD` alone.

Set it to a pattern that cannot match, such as `(?!)`, to keep every name you have.

## Label pages list albums

A label page now has an **Albums** tab beside its artists and songs.

The scanner records a release's label tag against the album, which is also what the OpenSubsonic `AlbumID3.recordLabels` field reports.

![image](/img/1305249/628236361-db2b586e-8a35-4629-9ea3-9978b5a644e7.png)

## Debug page hides more secrets

The admin debug page now masks LDAP, MusicBrainz, proxy, Spotify, Last.fm and OIDC secrets along with your `secret_key`.

It also shows the PHP version and the last auto-update check time.

## Config changes

The config version has been bumped from 89 to 95 over the course of Ampache8 development, adding:

* `stats_consolidate_threshold` — see [Play history consolidation](#play-history-consolidation)
* `playlist_art_mosaic` and `playlist_art_mosaic_fallback` — see [Playlist art mosaic](#playlist-art-mosaic)
* `show_mini_player` — see [Mini player](#mini-player)
* `label_ignore_pattern` — see [Placeholder labels are filtered out of your catalog](#placeholder-labels-are-filtered-out-of-your-catalog)
* `allow_lost_password` — set to `false` to hide the `Lost Password` link on the login page and reject `lostpassword.php` outright, so nobody can trigger reset mail to your users by posting to it directly. Only relevant on a server with mail enabled; without mail the feature is already off

```conf
; DEFAULT: "true"
;allow_lost_password = "false"
```

`api_debug_handler` has been removed entirely.

## New Options

New site options and preferences are documented in wiki at [ampache8-for-users](/docs/help/troubleshooting/ampache8-for-users)
