---
title: "Download"
metaTitle: "Download"
description: "Download and install options"
---

<div class="article">
<p class="article-p text--center">
Ampache is free software (AGPLv3) that you host yourself.<br/>
There is no signup and nothing to buy; pick the way of running it that suits your server and go.
</p>
</div>

## Try it before you install anything

The [demo servers](/demo) run the stable and develop code with creative commons music, so you can click around a real Ampache without setting one up.

Log in with username `demo`, password `demodemo`, or point a client at the API with the apikey `demodemo`. See [Demo Server](/docs/clients/demo-server) for what the demo accounts are allowed to do.

## Which install option?

| Option | Good for | Start here |
| --- | --- | --- |
| [Docker](#docker) | The quickest working server, upgrades by pulling a new image | [Docker](/docker) |
| [Release zip](#release-zips) | A normal web server you already run, no build tools needed | [Installing Ampache](/docs/installation) |
| [Git checkout](#git-checkout) | Staying on the latest code, or contributing | [Download Ampache](/docs/installation#download-ampache) |
| [One-click hosting](#one-click-and-platform-installs) | Letting a platform manage the server for you | [User Guides](/docs/installation/guides) |

Whichever you pick, read the [Prerequisites](/docs/installation#prerequisites) first. The short version: a web server (Apache gets the most testing, nginx, lighttpd, Caddy and IIS all work), **PHP 8.5+ for Ampache8**, and MySQL 8.x or MariaDB 10.x or later.

## Docker

The prebuilt images bring their own web server, PHP and (optionally) MariaDB, so a single command gets you a running server.

```shell
docker run --name=ampache -d -v /path/to/your/music:/media:ro -p 80:80 ampache/ampache
```

`docker-compose` is the recommended way to run it, because it keeps your config, database and logs in persistent volumes. There is a starter `docker-compose.yml` in the [ampache-docker repository](https://github.com/ampache/ampache-docker/blob/master/docker-compose.yml).

Images are on [Docker Hub](https://hub.docker.com/r/ampache/ampache) and come in several variants:

* `ampache:<version>` — pinned to a release, the recommended tag
* `ampache:latest` — the current stable branch
* `ampache:develop` — latest features, occasionally breaks
* `ampache:preview` — unreleased Ampache8 code, expect it to break
* `ampache:nosql*` — the same images without a built-in MySQL server, for when you supply your own
* `ampache:client*` — [Client Structure](/docs/information/ampache7-client-structure-install-type) images that install a web client such as [Ample](https://github.com/mitchray/ample) or [tinysub](https://tangled.org/devins.page/tinysub) over the top of Ampache

The container can install itself without touching the web installer if you set `DB_NAME`, `DB_HOST`, `AMPACHE_ADMIN_USER` and `AMPACHE_ADMIN_EMAIL`. The full list of environment variables, the ARM builds, reverse proxy settings and theme mounting are all on the [Docker](/docker) page.

## Release zips

Releases are published on GitHub:

* [Releases](https://github.com/ampache/ampache/releases) — the download page, with checksums and release notes
* [Tags](https://github.com/ampache/ampache/tags) — every tagged version

Ampache ships more than one zip per release, so check [Which zip?](/docs/information/which-zip) before you download. In short:

* `ampache-%VERSION%_%PHPVERSION%.zip` (e.g. `ampache-8.0.0_php8.5.zip`) — **the one most people want.** It has the composer and npm packages already built in, so you unzip it and run the installer
* `ampache-%VERSION%.zip` — the same `public` code structure without dependencies. You run `composer install` and `npm install && npm run build` yourself
* `ampache-%VERSION%_squashed.zip` — everything in the project root, the pre-Ampache5 layout. Only use this if your hosting cannot serve from a `public` subfolder
* `ampache-%VERSION%_client.zip` — the [client structure](/docs/information/ampache7-client-structure-install-type), which puts an API client at the base URL and Ampache underneath it

Unzip it into your web root, point the web server at the right folder (`public/` for the default structure) and open `install.php` in a browser. [Installing Ampache](/docs/installation) walks through the whole thing, including working vhost samples for Apache, nginx, lighttpd and Caddy.

Streaming, the Subsonic API and the REST API all need URL rewriting enabled — see [Rewrite Rules](/docs/installation/rewrite-rules).

## Git checkout

A checkout is easier to keep up to date than downloading a zip each time.

```shell
git clone -b develop https://github.com/ampache/ampache.git ampache
cd ampache
composer install
npm install
npm run build
```

The branch decides which Ampache you get:

* `develop` — Ampache8, the current mainline (needs PHP 8.5 and Node.js `^20.19.0` or `>=22.12.0`)
* `release7` — Ampache7, if you can't move to PHP 8.5 yet
* `release6` — Ampache6

You can also grab a branch as a zip without git: [master](https://github.com/ampache/ampache/archive/master.zip) or [develop](https://github.com/ampache/ampache/archive/develop.zip).

**NOTE** `develop` used to be Ampache7. Ampache8 is now the mainline, and Ampache7 lives on `release7`/`patch7`.

Updating a checkout is `git pull` plus the composer and npm steps; [update_from_git.sh](https://github.com/ampache/ampache/blob/develop/docs/examples/update_from_git.sh) wraps it up, and [Upgrading](/docs/information/upgrade) covers the database and config updates that follow.

## One-click and platform installs

* [Cloudron](/docs/installation/guides/cloudron-installation-guide) — 1-click install, kept updated by the platform
* [Ubuntu 26.04 LTS](/docs/installation/install-ampache-on-ubuntu2604) — step by step on a plain LAMP server, PHP 8.5 straight from the archive
* [Ubuntu 22.04](/docs/installation/install-ampache-on-ubuntu2204) — the same on the older LTS, with PHP from Sury
* [Windows](/docs/installation/windows-installation-guide) and [IIS 7.5](/docs/installation/guides/windows-installation-on-iis7.5-from-he99)
* [XAMPP](/docs/installation/guides/tutorial-to-install-ampache-on-xampp) — for a local test install
* [More user guides](/docs/installation/guides)

## Already running Ampache?

Read [Upgrading](/docs/information/upgrade) rather than the install guide. Back up your database first, then apply the updates:

```shell
php bin/cli admin:updateDatabase -e
php bin/cli admin:updateConfigFile -e
```

Ampache8 is **not** a drop-in replacement for Ampache7: it requires PHP 8.5, makes real database changes and changes some config defaults. Read [Ampache8 for Admins](/docs/help/troubleshooting/ampache8-for-admins) before you start, and [Ampache8 for Users](/docs/help/troubleshooting/ampache8-for-users) for what changes in the interface.

## After you install

1. Add your music with a [catalog](/docs/installation/catalog), then verify and update it (a [cron job](/docs/configuration/cron) keeps it current)
2. Work through [Basic Configuration](/docs/configuration) — `config/ampache.cfg.php` controls almost every feature
3. Turn on the extras you want: [transcoding](/docs/configuration/transcoding), the [Subsonic backend](/docs/configuration/subsonic), the [API](/docs/configuration/api), [podcasts](/docs/configuration/podcasts), [LDAP](/docs/configuration/ldap) or [OIDC](/docs/configuration/oidc) logins, [ACLs](/docs/configuration/acl) and [plugins](/docs/plugins)
4. Stuck? Try [Troubleshooting](/docs/help) and the [FAQ](/docs/help/troubleshooting/faq)

## Ways to listen

You don't have to use the web interface, and Ampache doesn't lock you into one app.

* [Web Interface](/docs/information/Web-Interface) and the built-in HTML5 [Web Player](/docs/information/web-player) — nothing to install
* [Ampache API clients](/docs/clients/api) — native apps for Android, iOS, Linux, Windows and macOS, plus libraries and plugins
* **Subsonic clients** — Ampache serves the Subsonic API at `/rest`, so any [Subsonic app](http://www.subsonic.org/pages/apps.jsp) works. See [Subsonic](/api/subsonic)
* **Web clients** — [Ample](https://github.com/mitchray/ample) and friends run in the browser against your server; the [client images](/docker#ampacheclient) install one for you
* **UPnP/DLNA and DAAP** — both backends are built in, so iTunes and UPnP players can see your library ([API configuration](/docs/configuration/api))
* **Anything that plays an HTTP stream** — VLC, foobar2000, Windows Media Player and the rest, via generated playlists ([Clients](/docs/clients))
* [Localplay](/docs/configuration/localplay) — drive MPD, VLC, Kodi or httpQ from Ampache instead of streaming to your browser

Building something yourself? The [API documentation](/api) covers the XML and JSON methods, and the [REST API](/rest/) has an OpenAPI spec and a [Swagger browser](https://ampache.org/rest/swagger/).

## Source and support

* [Ampache on GitHub](https://github.com/ampache/ampache) — source, issues and releases
* [ampache-docker](https://github.com/ampache/ampache-docker) — the container images
* [Contributing](/docs/development/CONTRIBUTING) and [Translations](/docs/development/TRANSLATIONS)
* [Links](/links) — Telegram, Reddit, Mastodon and the rest
* [Donate](/donate) if Ampache is useful to you
