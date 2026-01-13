# What is Transcode Caching

Managing your files can be complicated; trancoding helps smooth out the experience by converting your files on demand into preset types and bit rates. It's also useful when you have a file format that's massive like a wav file, a type that's incompatible with your chosen player or an application that can't support your chosen format.

Sometimes this process doesn't always work perfectly so we've added new options to do all this before a user requests the file.

This feature is supported for local catalogs, remote Ampache and remote Subsonic catalogs.

Remote catalogs will cache ALL files and ignore file extension settings.

## Use cases

The reasons you might want to do this are:

* You're having trouble with certain file types. (Like a flac album finishing early in the web player)
* You want to reduce server load by trancoding these files once instead of on demand
* You don't have the space to fit your library on the server
* The time it takes to transcode music is affecting your client application
* You use a remote catalog and you want to reduce external traffic to the remote server

## Enable Transcode Caching

Here's a copy of the config section so you can have a look over the options.

* Before you can enable this option transcoding **must** be configured and working.
* You must have an accessible path, a target format and uncommented at least 1 file format to use this feature
* You can start the cache process using the cli only (e.g. `php bin/cli run:cacheProcess`)

```
;#########################################################
; Transcode Caching                                      #
;#########################################################
; These are commands used to pre-cache a file format for streaming.
; This helps avoid waiting for transcodes to finish and makes
; files immediately available to the client.

; Path to your cache folder.
; This is where the pre-transcoded files will be stored
; DEFAULT: none
;cache_path = "/tmp"

; Default audio output format
; DEFAULT: none
;cache_target = "mp3"

; Look in your local catalogs for these file extensions and pre-cache to the
; 'cache_path'. This could be helpful to reduce space needed on your
; web server or to make sure that clients get files quickly.
; Execute "bin/cli run:cacheProcess" to process these files.
; DEFAULT: "false"
;cache_m4a  = "true"
;cache_flac = "true"
;cache_mpc  = "true"
;cache_ogg  = "true"
;cache_oga  = "true"
;cache_opus = "true"
;cache_wav  = "true"
;cache_wma  = "true"
;cache_aif  = "true"
;cache_aiff = "true"
;cache_ape  = "true"
;cache_shn  = "true"
;cache_mp3  = "true"

; REMOTE CATALOGS ONLY
; Enabling cache_remote on remote catalogs will cache every file on the remote server
; DEFAULT: "false"
;cache_remote  = "true"
```