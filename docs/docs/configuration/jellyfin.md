---
title: "Jellyfin API"
metaTitle: "Jellyfin API"
description: "Ampache Jellyfin-compatible API"
---

## Ampache Jellyfin API

Ampache8 can emulate enough of the Jellyfin server protocol for **Jellyfin audio clients** to
browse and stream your Ampache catalog, without running Jellyfin itself.

This is **audio only**. No video, no podcasts, no live TV and no plugin support.

Direct play always works. The server can also transcode when it makes sense — for example when your admin
has configured a different streaming format, or when a client asks for a lower bitrate than the source file
— using the same transcoding engine as the rest of Ampache. See [Transcoding](/docs/configuration/transcoding)
for how to configure formats and bitrates; this uses your existing settings rather than needing separate
Jellyfin-specific ones.

Confirmed working clients:

* [Finamp](https://github.com/jmshrv/finamp)
* [Symfonium](https://symfonium.app/)
* [gelly](https://f-droid.org/en/packages/oss.krtaozz.music/)

Any other Jellyfin-compatible audio client should work too, since this surface answers the same API real Jellyfin servers do for browsing and streaming music.

## Enabling the backend

The Jellyfin backend is off by default. To turn it on:

1. Log in as an admin and open **Admin > Server Config**.
2. Select the **System** tab.
3. Under the **Backend** heading, enable **Use Jellyfin backend**.

## Connecting a client

Point your Jellyfin client at your server's `/jellyfin` path, for example:

```text
https://demo.ampache.dev/jellyfin
```

The `/jellyfin` part matters — Ampache serves this protocol from a subpath rather than the site root, so it
has to be part of the server address you give the client, not just the hostname.

Log in with your normal Ampache **username and password**, the same credentials you use for the web
interface (not your API key).

## QuickConnect (optional, passwordless pairing)

Some Jellyfin clients can request a short numeric code instead of asking for a password, and let you approve
the sign-in from somewhere you are already logged in. To allow this:

1. In **Admin > Server Config > System > Backend**, enable **Use Jellyfin QuickConnect**.
2. On the device you are signing in, choose QuickConnect and note the code it shows.
3. From your own account, open **Preferences > QuickConnect** and enter that code, then **Approve**.

The device signs in automatically once approved.

## Errors connecting

Everything under `/jellyfin` is served through URL rewriting, the same mechanism Subsonic and the REST API
use. If a client cannot find the server at all, or every request 404s, check your rewrite rules first — see
[Rewrite Rules](/docs/installation/rewrite-rules) for how to set this up on Apache, nginx and other
webservers.

If rewriting is fine but the client still cannot connect, confirm the backend is actually enabled: a request
to `/jellyfin/System/Ping` returns `503 Service Unavailable` with the message `Jellyfin backend is disabled`
until you turn on **Use Jellyfin backend** above.

```shell
curl -i https://demo.ampache.dev/jellyfin/System/Ping
```

A working setup returns `200`.
