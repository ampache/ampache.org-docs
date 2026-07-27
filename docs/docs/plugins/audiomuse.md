---
title: "AudioMuse"
metaTitle: "AudioMuse"
description: "Sonic similarity for Ampache using an AudioMuse-AI server"
---

## AudioMuse

AudioMuse gives Ampache **sonic similarity**, which means finding songs that actually sound alike.

This is not the same as the similar artists you may already get from last.fm.

Last.fm similarity comes from what other people listened to, so it is really metadata and popularity.

Sonic similarity comes from analysing the audio itself, so two tracks match because they share a sound.

Ampache does not analyse audio, so this plugin hands that job to an [AudioMuse-AI](https://github.com/NeptuneHub/AudioMuse-AI) server.

## What you get

Two OpenSubsonic endpoints start working once the plugin is set up.

`getSonicSimilarTracks` returns songs that sound like the one you give it.

`findSonicPath` builds a route between two songs, easing from one sound into the other over several tracks.

Both are part of the OpenSubsonic `sonicSimilarity` extension, documented in the [Subsonic API docs](/api/subsonic).

Your Subsonic client has to support that extension to use them.

Ampache only reports `sonicSimilarity` in `getOpenSubsonicExtensions` while this plugin is installed and enabled.

With no plugin installed, both endpoints tell the client the feature is unsupported.

They never quietly fall back to last.fm similarity, because that would answer a different question and give you the wrong songs.

## Setting up AudioMuse-AI

AudioMuse-AI is a separate service that you run yourself.

It is not part of Ampache and Ampache does not install or manage it.

Follow the install instructions in the [AudioMuse-AI repository](https://github.com/NeptuneHub/AudioMuse-AI).

It needs access to your music so it can analyse it, and it keeps its own index of the results.

Run its analysis over your library before you expect any results in Ampache.

An unanalysed library returns nothing, which looks exactly like a broken plugin.

### Connecting it to Ampache

AudioMuse-AI has to read your library itself, so it needs its own connection back to Ampache.

There are two ways to do that and the plugin works with either.

**Ampache connector (pending).** A native Ampache connector has been written and submitted upstream, but it is
**not in an AudioMuse-AI release yet**.

It uses Ampache's own API, so it reads fields the Subsonic API has no room for and needs fewer calls.

Once it ships, pick `ampache` as the server type and give it your Ampache URL, username and password.

**Navidrome connector (works today).** Until then, add Ampache using the **Navidrome** server type.

Navidrome's connector is a plain Subsonic client, and Ampache serves the Subsonic API, so it connects as-is.

Use your Ampache URL, your username, and your normal account password.

It authenticates with a hex-encoded plaintext password, so this is the account password, not your Subsonic Password.

Either way the plugin works unchanged; you do not have to tell Ampache which one you used.

## Setting up the plugin

Activate the **AudioMuse** plugin on the plugins page (`admin/modules.php`).

Then set the `AudioMuse-AI server URL` preference to the address of your AudioMuse-AI instance.

```text
http://localhost:8000
```

Use the address Ampache itself can reach.

If Ampache runs in Docker and AudioMuse-AI runs beside it, that is usually a container name rather than `localhost`.

The setting is a normal plugin preference, so an administrator can set a server default and users can override it.

## How the plugin talks to AudioMuse

The plugin calls two AudioMuse-AI endpoints.

`/api/similar_tracks` is used for `getSonicSimilarTracks`.

`/api/find_path` is used for `findSonicPath`.

AudioMuse-AI indexes each track against the id reported by whichever connector it scanned with.

The Ampache connector reports Ampache's own song id, and the Navidrome connector reports the Subsonic form of it.

The plugin tries both forms, so it does not matter which connector you used and there is nothing to configure.

What does matter is that both are looking at the same library.

If AudioMuse-AI indexed a different server, its ids match nothing in Ampache and you get empty results.

AudioMuse-AI scores results as a **distance**, where `0` means identical and larger numbers mean less alike.

OpenSubsonic asks for the opposite, a **similarity** between `0` and `1` where `1` means the same recording.

The plugin inverts and clamps every score, so what your client sees is already in the form the specification expects.

## Setting up AudioMuse-AI for Ampache

AudioMuse-AI can read your library through its own Ampache connector or through the OpenSubsonic one, and the two are not interchangeable.

Use the Ampache connector. It reads catalogs, playlists and play statistics the way Ampache models them.

Whichever you choose, stay on it. The two report different song ids, so switching after an analysis leaves the stored results pointing at nothing.

Its setup guide lives with AudioMuse-AI itself, at [docs/AMPACHE.md](https://github.com/NeptuneHub/AudioMuse-AI/blob/main/docs/AMPACHE.md).

For the password you can give AudioMuse-AI either your Ampache password or your API key. It works out which you gave it.

## When it does not work

Check these in order, they cover almost every case.

The plugin is activated and the server URL is set.

Ampache can reach that URL, from inside its own container or host, not just from your browser.

AudioMuse-AI has finished analysing your library.

AudioMuse-AI is pointed at the same library as Ampache, so the ids line up.

Your client actually supports the `sonicSimilarity` extension.

Ampache logs its requests to AudioMuse-AI at debug level, so turn logging up and look for `AmpacheAudioMuse` entries.
