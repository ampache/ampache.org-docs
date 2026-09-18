---
title: "Ampache vs Navidrome"
metaTitle: "Ampache vs Navidrome"
description: "A feature-by-feature comparison between Ampache and Navidrome"
---

## Ampache vs Navidrome

[Navidrome](https://www.navidrome.org/) is currently the most widely used self-hosted, open source music
server, and a fair number of people evaluating Ampache are coming from it or comparing the two. This page
is a factual, feature-by-feature comparison rather than marketing copy: where the two are equivalent it says so.

Both projects are open source, both speak the Subsonic API, and both are actively developed. The differences
are mostly about **scope**: Navidrome is a focused, lightweight Subsonic-compatible music server, while
Ampache is a broader media server and streaming platform that happens to have one of the most complete
Subsonic implementations available, plus several protocols and features Navidrome does not have at all.

This comparison is current as of Ampache8 and Navidrome's [published feature list](https://www.navidrome.org/docs/overview/).
Navidrome moves fast too, so if something below is out of date, please [open an issue](https://github.com/ampache/ampache.org-docs/issues).

## At a glance

| | Ampache | Navidrome |
| --- | --- | --- |
| License | AGPLv3 | GPLv3 |
| First released | 2001 | 2019 |
| Language | PHP | Go |
| Media types | Music **and video** | Music only |
| Native API | Full JSON/XML API (versions 3-8) + documented REST/OpenAPI | Subsonic API only |
| Subsonic API | Full Subsonic + full OpenSubsonic specification | Subsonic + partial OpenSubsonic extensions |
| Jellyfin-compatible API | Yes, built in | No |
| DAAP (iTunes) | Yes, built in | No |
| UPnP/DLNA | Yes, built in | No |
| Folder browsing | Real filesystem folder browsing | Simulated from tags only, no real folder view |
| Web-based uploads | Yes, built in, with per-user quotas and folders, also available as a native API method | No, by design; use a separate file manager or sync tool |
| Writing tags back to files (ratings, genres, moods) | Yes, optional, admin-toggleable | No, by design (security) |
| Renaming/moving files on disk to match a naming pattern | Yes, on scan or on demand | No, by design (security) |
| Command-line administration | Yes, `bin/cli` (users, catalogs, plugins, database, exports) | Yes, `navidrome` subcommands (users, scans, backups, plugins) |
| Localplay (control an MPD/VLC/Kodi/httpq output) | Yes | Jukebox mode (server-side audio device only) |
| WebDAV access (mount your library as a network drive) | Yes, built in | No |
| Wanted list (track missing albums via MusicBrainz, optionally auto-download) | Yes | No |
| Democratic/voted playback | Yes | No |
| Podcasts | Yes, with scheduled sync | No |
| Live broadcast/listen-along (multiple users hear the same playback in sync) | Yes | No |
| Internet radio stations | Yes | Yes |
| Collections (mixed shelves of songs/albums/videos/playlists) | Yes | No |
| Moods (as a tag type, searchable) | Yes | No |
| BPM tagging | Yes, own field, searchable in the advanced search UI and API | Yes, own field, searchable via Smart Playlist `.nsp` criteria |
| Sonic/audio similarity ("songs that sound alike") | Yes, via the AudioMuse plugin, exposed through the native API and OpenSubsonic | Yes, via a third-party [AudioMuse-AI Navidrome plugin](https://github.com/NeptuneHub/AudioMuse-AI-NV-plugin), exposed as Instant Mix/Radio |
| Multi-library / per-library ACLs | Catalogs + per-user/catalog ACLs and catalog filters | Yes, native multi-library support |
| Remote catalogs (pull another server's library in) | Subsonic (including Navidrome), Beets, SoundCloud, another Ampache instance | No, local files only |
| Smart/dynamic playlists | Yes, built-in UI, many object types, always live | Yes (beta), edited as `.nsp` files or via the third-party Feishin client |
| Sharing public links | Yes, native share links (per object, expiring, admin-toggleable) | Yes, native share links |
| Authentication methods | Local, LDAP, HTTP, PAM, MySQL, OpenID Connect | Local, reverse-proxy/header auth, OIDC |
| Transcoding | ffmpeg/avconv/custom command, per user/player | ffmpeg, per user/player, native Opus support |
| Resource usage | Moderate (PHP + MySQL/MariaDB) | Very low (single Go binary, SQLite) |
| Client support | A large ecosystem of native/third-party apps (Amperfy, Amproid, Power Ampache, Ample, foam, and more), plus every Subsonic/Jellyfin/DAAP/UPnP client | Relies on the wider Subsonic client ecosystem; no Navidrome-specific native app |
| Plugin system | Yes (metadata, art, sonic analysis, catalogs, ...), PHP-based | Yes (WebAssembly sandboxed agents/scrobblers/scheduled tasks/event handlers) |

## Where Ampache goes further

### One server, five ways to connect

Navidrome focuses on doing one protocol, Subsonic, very well. Ampache covers that same ground and adds
more: its own [JSON/XML/REST API](/api), a full [Subsonic and OpenSubsonic](/docs/configuration/subsonic)
implementation, a [Jellyfin-compatible API](/docs/configuration/jellyfin),
[DAAP](/docs/configuration/api#daap-api), [UPnP/DLNA](/docs/configuration/api#upnp--dlna-api) and
[WebDAV](/docs/configuration/api#webdav-api), all against the same catalog, at the same time. That means
the same server works with Subsonic apps, Jellyfin audio apps like [Finamp](https://github.com/jmshrv/finamp)
and [Symfonium](https://symfonium.app/), iTunes, any UPnP/DLNA renderer, and lets you mount the catalog as a
network drive over WebDAV, without picking one protocol to standardize on.

### Full OpenSubsonic, not a subset

Ampache8 implements every endpoint in the OpenSubsonic specification and reports the `apiKeyAuthentication`,
`formPost`, `getPodcastEpisode`, `indexBasedQueue`, `playbackReport`, `songLyrics`, `topSongsByArtistId`,
`transcodeOffset`, `transcoding` and (with a sonic analysis plugin installed) `sonicSimilarity` extensions.
Navidrome supports OpenSubsonic too, currently covering a smaller set of the extensions. See the
[Subsonic API docs](/api/subsonic) for exactly what Ampache reports.

### Video is a first-class citizen

Navidrome is a music server by design and doesn't catalog video. Ampache catalogs and streams video
alongside music, so one server can cover a household's music *and* video library instead of needing a
second application like Jellyfin or Plex for video.

### Two ways to browse your library

Navidrome deliberately organizes everything by tags rather than by filesystem folder. That's a considered
design choice explained on their [FAQ](https://www.navidrome.org/docs/faq/#can-you-add-a-browsing-by-folder-optionmode-to-navidrome):
a strict tag-only model keeps their album/artist grouping logic simple and predictable, at the cost of not
helping libraries that aren't consistently tagged. Ampache takes the other approach and gives you both: the
usual tag-based browsing, plus a real filesystem folder view of your catalog, which is useful if your files
aren't neatly tagged or you organize by folder on purpose.

### Uploads, tag writing and file management

Navidrome's own [FAQ](https://www.navidrome.org/docs/faq/#how-can-i-edit-my-music-metadata-id3-tags-how-can-i-renamemove-my-files)
explains that it never uploads, edits tags on, or renames/moves your music files, and calls this a deliberate
security choice: an internet-facing server that can write to your library is one exploit away from losing
it. They point people at dedicated tools like beets, MusicBrainz Picard or mp3tag instead. Ampache takes on
that risk in exchange for convenience: it has [built-in web uploads](/docs/help/upload-catalogs) with
per-user folders and quotas, also exposed as a native API [`upload`](/api/api-json-methods#upload) method
so a client app can push a file straight into your catalog without going through the web interface, can
optionally write ratings, genres and moods back into your files as `id3`/Vorbis/APE tags when you edit
them (off by default, an admin turns it on), and can rename or move files on disk to match a catalog
naming pattern, either automatically on scan or with the `cleanup:sortSongs` command. If you'd rather your
library stayed completely untouched by the server, Navidrome's stance is the safer default; if you want to
manage uploading, tagging and renaming from the same place you stream from, Ampache can do that too.

### Smart playlists with a built-in UI

Both servers can build playlists from search criteria that update automatically. Ampache's advanced search
covers many more object types than just songs, including albums, artists, playlists, podcasts, genres and
video, all built and edited from the same web UI and exposed through the API. Navidrome's Smart Playlists
are a newer, currently-beta feature: they're defined as JSON in `.nsp` files, and Navidrome doesn't yet
ship a UI to create or edit them (the third-party [Feishin](https://github.com/jeffvli/feishin/) client
can, and Navidrome plans to add one of its own).

### Podcasts and live broadcasting

Ampache syncs [Podcasts](/docs/configuration/podcasts) on a schedule and supports
[Broadcasting](/docs/configuration/broadcasts): one listener plays something in the web player, and any
number of other logged-in users can tune in and hear the exact same track, kept in sync
over a websocket.

Navidrome doesn't have a podcast or listen-along feature; both servers can add an
internet radio station from any stream URL, including one you run yourself with something like
[Icecast and Liquidsoap](/docs/configuration/Ampache-Icecast-and-Liquidsoap).

### Sonic similarity works on both, but it's built in on Ampache

Both servers can show similar artists/biography from Last.fm-style metadata. Both can also get real
*sonic* similarity (songs that actually sound alike) from the same third-party
[AudioMuse-AI](https://github.com/NeptuneHub/AudioMuse-AI) server. The difference is how it plugs in:
Ampache's [AudioMuse plugin](/docs/plugins/audiomuse) is maintained by Ampache and exposes the results
through the OpenSubsonic `sonicSimilarity` extension and the native API's `sonic_match` method, alongside
`findSonicPath`/path-building between two songs. Navidrome needs a separate, community-maintained
[AudioMuse-AI-NV-plugin](https://github.com/NeptuneHub/AudioMuse-AI-NV-plugin) installed as a `.ndp` file,
which surfaces the same AudioMuse-AI data as Navidrome's Instant Mix and Radio features. Either way, you
still need to run AudioMuse-AI yourself, since neither server does the audio analysis on its own.

### Collections and Moods

Ampache8 added [Collections](/docs/help/troubleshooting/ampache8-for-users#collections-a-list-that-can-hold-anything)
(mixed shelves of any object type: songs, albums, playlists and video together) and a
[Moods](/docs/help/troubleshooting/ampache8-for-users#moods-browse-and-tag-by-feeling) tag type for
browsing and searching by feeling. Neither is part of Navidrome's current tagging model. Both servers read
and can search on a song's BPM tag, and both let you build a playlist from it: Ampache through its advanced
search UI, Navidrome through a Smart Playlist `.nsp` file.

### Remote catalogs

Ampache can pull a library in from an existing Subsonic-compatible server, including Navidrome itself
since it speaks the Subsonic API, a [Beets](https://beets.io/) database, [SoundCloud](https://soundcloud.com/),
or another Ampache instance, and keep it in sync as a [remote catalog](/docs/configuration/remote-catalogs).
Navidrome focuses on scanning your local files directly and doesn't have an equivalent remote-catalog
concept.

### Localplay and democratic playback

Ampache can both drive and be driven by [MPD, VLC, Kodi and httpq](/docs/configuration/localplay) outputs,
and adds [Democratic Playlists](/docs/configuration/democratic) on top, where users vote on what plays next
on a shared, single output, useful for an office or a party. Navidrome's Jukebox mode covers playing audio
out of the server's own sound device and controlling it from a client, but doesn't extend to voting on
what plays next or driving a separate player like MPD.

### The wanted list

Ampache has a [Wanted list](/docs/plugins/plugins#wanted-plugins): if a MusicBrainz release you own is
missing tracks, you can mark it as wanted, and an optional plugin like Headphones can pick that up and
fetch the rest automatically. Navidrome doesn't have an equivalent feature.

### Plugins

Both servers have a plugin system, aimed at different things. Ampache's plugins are PHP-based and are
grouped into categories: metadata and lyrics lookups, album art sources, scrobbling (Last.FM, Libre.FM,
ListenBrainz), sharing to external sites, URL shorteners, homepage widgets, avatars, geolocation, wanted-list
handling, song previews and per-user stream limits, alongside the sonic analysis category the AudioMuse
plugin uses and catalog/Localplay modules for new backends. See [Ampache Plugins](/docs/plugins/plugins)
for the full list. Navidrome's plugins are newer and run sandboxed in WebAssembly, currently covering
metadata agents, scrobblers, scheduled tasks and event handlers, a narrower but growing set of extension
points.

### A wide native client ecosystem

Navidrome relies on the broader Subsonic client ecosystem, since it has no client apps of its own. Ampache
has that same access to Subsonic/OpenSubsonic clients, plus a long list of dedicated Ampache clients built
directly against its native API: [Amperfy](https://github.com/BLeeEZ/amperfy) on iOS,
[Amproid](https://play.google.com/store/apps/details?id=com.pppphun.amproid&hl=en) on Android (with
Android Auto support), [Power Ampache](https://f-droid.org/en/packages/luci.sixsixsix.powerampache2.fdroid/)
on Android, and web clients like [Ample](https://github.com/mitchray/ample) and
[foam](https://github.com/Andrew-McGee/foam), plus plugins for players like Rhythmbox and Kodi. See the
[API Clients](/docs/clients/api) page for the full list.

### Command-line administration

Both servers are comfortable to run entirely from the command line, they just cover different ground.
Ampache's [`bin/cli`](/docs/help/troubleshooting/cli-commands) manages users, catalogs, plugins, catalog
types and Localplay controllers, applies database migrations and config file updates after an upgrade, and
exports art, playlists and catalog metadata to disk, alongside a separate `bin/installer` for the two
things that have to run before Ampache has a config file at all. Navidrome's `navidrome` binary has its own
set of subcommands, including `user`, `scan`, `backup`, `doctor`, `inspect`, `missing`, `plugin`, `pls` and
`search`, covering user management, library scans, database backup/restore, health checks and playlist
import/export. Neither CLI writes tags or moves files, since Navidrome doesn't do that at all and Ampache's
equivalents (`cleanup:sortSongs`, `write_tags`) are separate, explicit, admin-controlled features rather
than part of routine catalog maintenance.

## Where Navidrome has the edge

Navidrome is a single, small Go binary with a SQLite database, which makes it noticeably lighter on
resources and easier to run on something like a Raspberry Pi Zero. It also ships native multi-library
support with per-library access controls, and a slightly larger set of officially
"tested" third-party Subsonic client recommendations on its [apps page](https://www.navidrome.org/apps/).
If your only requirement is "a small, fast Subsonic server for music," Navidrome is a perfectly good choice.

Ampache's broader feature set (video, more protocols, podcasts, broadcasting, remote catalogs, plugins)
comes with a larger, more configurable PHP + MySQL/MariaDB stack. The tradeoff is more capability for a
bit more setup and resource overhead.

## Is Ampache harder to run than Navidrome?

Historically, yes. Navidrome's single static binary is genuinely simpler to get running than a PHP app
with a separate database server. That gap closes a lot once you use Docker, and Ampache has the same
"pull an image, point it at a music folder, done" path Navidrome does:

* **`docker run` is one command.** `docker run --name=ampache -d -v /path/to/your/music:/media:ro -p 80:80 ampache/ampache`
  starts a full Ampache instance, no manual PHP, webserver or database install required. See
  [Docker](/docker) for the full image list and environment variables.
* **`docker-compose` is the recommended path**, and it is still just one command
  (`docker-compose up -d`) once you've downloaded the provided `docker-compose.yml`. It wires up
  persistent folders for your media, database, config and logs automatically, so upgrades and restarts
  don't lose your data. It also bundles its own MariaDB inside the same container, so there is no second
  database service to stand up separately, just a folder to mount for its data.
* **The whole install can skip the web wizard entirely.** The same `docker-compose.yml` accepts
  `DB_NAME`, `AMPACHE_ADMIN_USER`, `AMPACHE_ADMIN_EMAIL` and friends as environment variables. Set those
  in a `.env` file and the container creates the database and the admin account for you on first start,
  the same "type your details into a config once" experience as Navidrome's setup, no browser wizard
  required at all. Passwords can even be left as `**Random**` and generated for you. See
  [Automated install](/docker#automated-install) for the full variable list.
* **If you'd rather use the wizard, it's still just a browser form.** Without those environment variables
  set, the [Web-based Installer](/docs/installation#web-based-installer) walks you through creating the
  database and the admin account after you open the container's address in a browser, the same
  "open a URL, click through a form" flow Navidrome's own first-run setup uses.
* **Installation presets exist for exactly this.** The `minimalist` and `community`
  [preference presets](/docs/help/preferences-explained#presets) turn off the more advanced/administrative
  options in one step, so a new admin isn't presented with every knob Ampache has on day one.
* **You don't have to touch the native API, plugins, remote catalogs or Localplay at all.** Point a
  Subsonic or Jellyfin client at the container's address with your normal username and password, the
  same as you would with Navidrome, and the rest of Ampache's extra surface area just sits there unused
  until you want it.

Where Ampache still asks more of you than Navidrome: the bundled database is one more moving part inside
the container to keep healthy and back up (Docker hides most of this, but the data folder still needs a
volume and occasional attention), advanced features like remote catalogs, broadcasting or Localplay do
have their own configuration pages, and the sheer number of preferences in the web UI can be more
intimidating to a first-time admin even if you never touch most of them. If your goal is the smallest
possible thing to run, Navidrome's single binary is still simpler. Docker and the automated install
variables close most of the gap, but not all of it.

## Try it yourself

* [Demo](/demo) - try Ampache without installing anything
* [Docker](/docker) - the fastest way to get a real server running
* [Installation guide](/docs/installation) - set Ampache up on your own server
* [Clients](/docs/clients) - see every protocol and client Ampache supports
