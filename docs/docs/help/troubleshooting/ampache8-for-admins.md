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

## Transcoding bitrates are sent in full bps: remove the `k` from your config

Ampache 7.8.0 asked you to add a `k` to all `%BITRATE%` values in your `encode_args_*` settings.

Ampache8 reverses this: the bitrate is now expanded to full bps **before** it is inserted into your transcode command.

The config defaults have changed from `%BITRATE%k` back to `%BITRATE%`.

```conf
; e.g. the new default mp3 encode args
encode_args_mp3 = "-vn -b:a %BITRATE% -c:a libmp3lame -f mp3 pipe:1"
```

**NOTE** This can not be updated automatically in your config file. If you keep the `k` your transcoder will be asked for bitrates like `128000k`, so check every `encode_args_` parameter when upgrading. (`encode_args_ts` still uses `%MAXBITRATE%k`)

## Database changes for Ampache8

Ampache8 brings the first new database updates since the version split.

* New tables `folder` and `folder_map` holding a virtual folder tree for each catalog
* `folder` added to the `object_type` enum on `cache_object_count`, `cache_object_count_run`, `image`, `object_count`, `rating`, `tag_map`, `user_activity` and `user_flag`
* New preference `api_enable_8` (Allow Ampache API8 responses)
* New preference `show_folder` (Show 'Folders' link in the main sidebar)
* Removed preferences `webplayer_flash`, `webplayer_aurora` and `play2`
* Any user with `subsonic_legacy` enabled has it disabled (OpenSubsonic becomes the default)
* Any `direct_play_limit` set to 0 (unlimited) is reset to a cap of 500 tracks

**NOTE** The `object_type` enum updates also delete orphaned rows that reference an invalid object type. This is bad data cleanup but it is destructive, so back up your database before updating.

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

<image: login page showing the "Sign in with OpenID Connect" button below the regular login form.>

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

<image: admin catalog page showing the catalog action dropdown with the new Scan Folders action selected.>

The sidebar **Folders** link only appears once the folder table has data and the `show_folder` preference is enabled.

WebDAV browsing has been rewritten on top of the folder tree, so WebDAV clients now see your real folder hierarchy.

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

The REST interface is documented with a full OpenAPI spec at [ampache.org/rest/swagger](https://ampache.org/rest/swagger).

All changes will be documented in the [API](/api) before final release.

## OpenSubsonic is now forced as the default Subsonic implementation

After a lot of poor implementation the split between Subsonic and Opensubsonic is now very clear.

When updating to Ampache8 all users will default to OpenSubsonic to ensure that everyone is using the latest version.

Users can still disable OpenSubsonic but the old implementation is now 1.16.1 compatible and does not support OpenSubsonic extensions.

Subsonic transcoding now converts the client `maxBitRate` correctly, so clients asking for e.g. 128kbps actually get 128kbps.

## Faster catalog scans

Catalog verify, clean and add have been reworked to cache file lists, query less and skip non-media files early.

Large catalogs should see noticeably faster update and clean actions.

## Debug page hides more secrets

The admin debug page now masks LDAP, MusicBrainz, proxy, Spotify, Last.fm and OIDC secrets along with your `secret_key`.

It also shows the PHP version and the last auto-update check time.

## Removed config options

The config version has been bumped to 89.

* `api_debug_handler` has been removed entirely

## New Options

New site options and preferences are documented in wiki at [ampache8-for-users](/docs/help/troubleshooting/ampache8-for-users)
