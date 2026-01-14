---
title: "Transcoding"
metaTitle: "Transcoding"
description: "Transcoding"
---

Transcoding allows you to convert one type of file to another. Ampache supports on the fly transcoding of all file types based on user, IP address or available bandwidth. In order to transcode Ampache takes advantage of existing binary applications such as [ffmpeg](http://www.ffmpeg.org/), [Lame](http://lame.sourceforge.net/) or [mp3splt](http://mp3splt.sourceforge.net/mp3splt_page/home.php). In order for transcoding to work you must first install the supporting applications and ensure that they are executable by the webserver. If you have any trouble to get transcoding working you can also have a look at the [FAQ](/docs/help/troubleshooting/faq#unable-to-get-transcoding-working).

**WARNING:** Transcoding currently causes several issues documented in [#1048](https://github.com/ampache/ampache/issues/1048) which you should know about before enabling it. For that reason usability is quite limited with transcoding enabled.

## Standard Transcoding

You will need to enable and configure transcoding in the config file before it will work.

```INI
;######################################################
; These are commands used to transcode non-streaming
; formats to the target file type for streaming.
; This can be useful in re-encoding file types that don't stream
; very well, or if your player doesn't support some file types.
;
; 'Downsampling' will also use these commands.
;
; To state the bleeding obvious, any programs referenced in the downsample
; commands must be installed, in the web server's search path (or referenced
; by their full path), and executable by the web server.
```

```INI
; Input type selection
; TYPE is the extension. 'allowed' certifies that transcoding works properly for
; this input format. 'required' further forbids the direct streaming of a format
; (e.g. if you store everything in FLAC, but don't want to ever stream that.)
; transcode_TYPE         = {allowed|required|false}
; DEFAULT: false
;transcode_m4a      = allowed
;transcode_flac     = required
;transcode_mp3      = allowed
```

```INI
; Default output format
; DEFAULT: none
;encode_target = mp3
```

```INI
; Override the default output format on a per-type basis
; encode_target_TYPE = TYPE
; DEFAULT: none
;encode_target_flac = ogg
```

```INI
; Command configuration. Substitutions will be made as follows:
; %FILE% => filename
; %SAMPLE% => target sample rate
; You can do fancy things like VBR, but consider whether the consequences are
; acceptable in your environment.
```

```INI
; Master transcode command
; transcode_cmd should be a single command that supports multiple file types,
; such as ffmpeg or avconv. It's still possible to make a configuration that's
; equivalent to the old default, but if you find that necessary you should be
; clever enough to figure out how on your own.
; DEFAULT: none
;transcode_cmd = "ffmpeg -i %FILE"
```

```INI
; Specific transcode commands
; It shouldn't be necessary in most cases, but you can override the transcode
; command for specific source formats.  It still needs to accept the
; encoding arguments, so the easiest approach is to use your normal command as
; a clearing-house.
; transcode_cmd_TYPE = TRANSCODE_CMD
;transcode_cmd_mid = "timidity -Or -o – %FILE% | ffmpeg -i pipe:0"
```

```INI
; encode_args_TYPE = TRANSCODE_CMD_ARGS
;encode_args_mp3 = "-vn -b:a %SAMPLE%K -c:a mp3 -f mp3 pipe:1"
;encode_args_ogg = "-vn -b:a %SAMPLE%K -c:a vorbis -f ogg pipe:1"
```

The arguments may need to be adjusted depending on the specific external program chosen and its age.

## Network Based Transcoding

You can also force transcoding based on the IP address of the user streaming. This allows you to automatically downsample and transcode music if the user is off of your local network. To enable this you first need to define a [Local Network ACL](/docs/configuration/acl) and then enable _downsample_remote_ in the ampache.cfg.php

```INI
; Downsample Remote
; If this is set to true and access control is on any users who are not
; coming from a defined 'network' ACL will be automatically downsampled
; regardless of their preferences.
; DEFAULT: false
;downsample_remote = "false"
```

### Transcode Anyone outside 10.x Space

The below example config would cause anyone whos IP is not 10.x.x.x to have their streams transcoded according to the transcode rules in the config file

#### Config Variables

```INI
downsample_remote = "true"
access_control = "true"
```

#### ACL Interface Access for Clients

| User  |   Type    | Start Address |   End Address   | Level |
| :---: | :-------: | :-----------: | :-------------: | :---: |
|  All  | Interface |    0.0.0.0    | 255.255.255.255 |  All  |

This first ACL will let us continue to login after we've enabled the Access Control in the config file, next we need to allow streaming from our clients.

#### ACL Streaming Access for Clients

| User  |   Type    | Start Address |   End Address   | Level |
| :---: | :-------: | :-----------: | :-------------: | :---: |
|  All  | Streaming |    0.0.0.0    | 255.255.255.255 |  All  |

Last we'll need to define what is our local network so that Ampache knows when it needs to transcode

#### ACL Local Network Definition

| User  |  Type   | Start Address |  End Address   | Level |
| :---: | :-----: | :-----------: | :------------: | :---: |
|  All  | Network |   10.0.0.0    | 10.255.255.255 |  All  |

This will make is so that a client connecting from 192.168.0.32 would be considered Non-Local and would be forced to use any configured transcoding. A client coming from 10.0.32.12 would be considered local and would not be transcoded. **You can have as many network ACL definitions as you want.**
