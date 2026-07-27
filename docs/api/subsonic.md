---
title: "Subsonic API"
metaTitle: "Subsonic API"
description: "API documentation"
---

## Subsonic API support

**NOTE** Ampache8 will force all user preferences to the OpenSubsonic implementation by updating preferences to use the new version.

Ampache implements the [OpenSubsonic](https://opensubsonic.netlify.app/docs/) API as well as a pure [Subsonic](http://www.subsonic.org/pages/api.jsp) API.

Users who want to use a pure Subsonic implementation can enable the `Enable legacy Subsonic API responses for compatibility issues` preference on the Options page. (`preferences.php?tab=options`)

**Compatible Versions:**

* Ampache 8.0.0 => Force default to OpenSubsonic and clean up Subsonic to a pure 1.16.1 implementation
* Ampache 7.6.0 => Separated OpenSubsonic [docs](https://opensubsonic.netlify.app/docs/) & Subsonic API's [1.16.1](http://www.subsonic.org/pages/inc/api/schema/subsonic-rest-api-1.16.1.xsd)
* Ampache7 => OpenSubsonic extensions & Subsonic [1.16.1](http://www.subsonic.org/pages/inc/api/schema/subsonic-rest-api-1.16.1.xsd)
* Ampache6 => Subsonic [1.16.1](http://www.subsonic.org/pages/inc/api/schema/subsonic-rest-api-1.16.1.xsd)
* Ampache5 => Subsonic [1.13.0](http://www.subsonic.org/pages/inc/api/schema/subsonic-rest-api-1.13.0.xsd)
* Ampache4 => Subsonic [1.13.0](http://www.subsonic.org/pages/inc/api/schema/subsonic-rest-api-1.13.0.xsd)
* Ampache3 => Subsonic [1.11.0](http://www.subsonic.org/pages/inc/api/schema/subsonic-rest-api-1.11.0.xsd)

## OpenSubsonic API extension

[OpenSubsonic API](https://opensubsonic.netlify.app/docs/) is an open source initiative to create backward-compatible extensions for the original Subsonic API.

Ampache Subsonic support is being extended to support these changes

### Extensions

Ampache 8.0.0 implements every endpoint in the OpenSubsonic specification.

All of the extensions below are reported by [getOpenSubsonicExtensions](https://opensubsonic.netlify.app/docs/endpoints/getopensubsonicextensions/) at version 1.

| Extension | Notes |
|---|---|
| [apiKeyAuthentication](https://opensubsonic.netlify.app/docs/extensions/apikeyauth/) | See below. Adds `tokenInfo`. |
| [formPost](https://opensubsonic.netlify.app/docs/extensions/formpost/) | HTTP form POST. |
| [getPodcastEpisode](https://opensubsonic.netlify.app/docs/extensions/getpodcastepisode/) | |
| [indexBasedQueue](https://opensubsonic.netlify.app/docs/extensions/indexbasedqueue/) | `getPlayQueueByIndex` and `savePlayQueueByIndex`. |
| [playbackReport](https://opensubsonic.netlify.app/docs/extensions/playbackreport/) | `reportPlayback`. Send `ignoreScrobble=true` to update now playing without counting a play. |
| [songLyrics](https://opensubsonic.netlify.app/docs/extensions/songlyrics/) | `getLyricsBySongId`. Send `enhanced=true` for word level timing. |
| [sonicSimilarity](https://opensubsonic.netlify.app/docs/extensions/sonicsimilarity/) | `getSonicSimilarTracks` and `findSonicPath`. Needs a sonic analysis plugin, see below. |
| [topSongsByArtistId](https://opensubsonic.netlify.app/docs/extensions/topsongsbyartistid/) | `getTopSongs` accepts an artist `id` as well as a name. |
| [transcodeOffset](https://opensubsonic.netlify.app/docs/extensions/transcodeoffset/) | `timeOffset` on `stream`. |
| [transcoding](https://opensubsonic.netlify.app/docs/extensions/transcoding/) | `getTranscodeDecision` and `getTranscodeStream`. |

Also implemented, outside the named extensions:

* Expanded [subsonic-response](https://opensubsonic.netlify.app/docs/responses/subsonic-response/)
* Expanded [subsonic-response error](https://opensubsonic.netlify.app/docs/responses/error/)

OpenSubsonic responses now carry the documented extra fields in both JSON and XML.

Songs gained `artists`, `albumArtists`, `displayArtist`, `displayAlbumArtist`, `displayComposer`, `contributors`, `mediaType`, `samplingRate`, `channelCount`, `isrc`, `replayGain` and `bookmarkPosition`.

Albums gained `artists`, `displayArtist`, `sortName`, `releaseDate`, `originalReleaseDate`, `releaseTypes` and `discTitles`.

Artists gained `sortName` and `artistImageUrl`, playlists gained `allowedUser`, users gained `maxBitRate` and videos gained `originalWidth` and `originalHeight`.

#### Sonic similarity

`getSonicSimilarTracks` and `findSonicPath` need similarity worked out by analysing the audio itself.

Ampache does not do that, so these endpoints are served by a plugin.

The `sonicSimilarity` extension is only reported while such a plugin is installed and enabled for you.

With no plugin installed both endpoints report the feature as unsupported.

They never fall back to last.fm style metadata similarity, which is a different thing and would give the wrong answers.

Install the **AudioMuse** plugin and set its server URL to use [AudioMuse-AI](https://github.com/NeptuneHub/AudioMuse-AI).

#### Transcoding

`getTranscodeDecision` tells a client whether it can play a file as it stands.

It is a POST request, because the client sends its playback capabilities as a JSON body.

The reply includes a `transcodeParams` value.

Send that value back to `getTranscodeStream` exactly as you received it.

Do not try to build one yourself, the server signs it and rejects anything it did not issue.

#### Api Key authentication

The key that must be passed to Ampache is the API Key generated for a specific user (none by default, only the administrator can generate one).

Then call the following URL (Where localhost/ampache is the location of your Ampache installation):

```URL
http://localhost/ampache/rest/ping.view?apiKey=API_KEY&v=1.2.0&c=DSub&f=json
```

**NOTE** Do not send a user (u) parameter or auth will be rejected.

The key can be also be passed to Ampache using `SHA256(USER+KEY)` where `KEY` is `SHA256('APIKEY')`. Below is a PHP example

```PHP
$user = 'username';
$key = hash('sha256', 'myapikey');
$passphrase = hash('sha256', $user . $key);
```

#### HTTP Header Authentication

Ampache supports sending your apiKey parameter to the server using a Bearer Token.

The `apiKey` parameter does not need to be sent with your URL. We will check your header for a token first

```text
GET http://localhost/ampache/rest/ping.view?v=1.2.0&c=DSub&f=jsonHTTP/1.1
Authorization: Bearer 000111112233334444455556667777788888899aaaaabbbbcccccdddeeeeeeff
```

### Endpoint extension

* Edit [search3](https://opensubsonic.netlify.app/docs/endpoints/search3/) to allow empty `query` argument
* Edit [savePlayQueue](https://opensubsonic.netlify.app/docs/endpoints/saveplayqueue/) to allow empty `id` argument
* Add [getOpenSubsonicExtensions](https://opensubsonic.netlify.app/docs/endpoints/getopensubsonicextensions/)

### Partially implemented

* [stream](https://opensubsonic.netlify.app/docs/endpoints/stream/)
  * Support `timeOffset` (Parameter is supported but untested)
* [getLyricsBySongId](https://opensubsonic.netlify.app/docs/endpoints/getlyricsbysongid/)
  * `kind` and `agents` are not returned, Ampache stores a single unattributed lyric layer
* Some optional response fields have nowhere to come from in the Ampache database and are left out
  * `bpm`, `moods`, `works`, `movements`, `groupings`, `bitDepth`, `explicitStatus`, `isCompilation`, `disambiguation`, `fallbackGain`, `subRole`, `shortcut`
  * `played`, `recordLabels`, `lastFmUrl` and the `nowPlaying` position fields are waiting on a database change

## Subsonic Examples

You can get examples from an official Subsonic release as well as examples from Ampache.

These servers are using a Subsonic 1.16.1 compatible API version.

* [Ampache 7.0.0 (1.16.1+opensubsonic)](https://github.com/ampache/python3-ampache/tree/api6/docs/ampache-opensubsonic)
* [Ampache 6.0.0 (1.16.1)](https://github.com/ampache/python3-ampache/tree/api6/docs/ampache-subsonic)
* [Subsonic 6.1.6 (1.16.1)](https://github.com/ampache/python3-ampache/tree/api6/docs/subsonic-6.1.6)
