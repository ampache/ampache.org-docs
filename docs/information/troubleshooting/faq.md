# Frequently Asked Questions

## Table of Contents

* [Empty albums remain after deleting a catalog](#empty-albums-remain-after-deleting-a-catalog)
* [I'm getting errors about memory limits being reached / out of memory](#im-getting-errors-about-memory-limits-being-reached--out-of-memory)
* [I'm getting errors about execution time-outs](#im-getting-errors-about-execution-time-outs)
* [I'm getting "Ampache Configuration Parse Error"](#im-getting-ampache-configuration-parse-error)
* [Catalog update throws Got a packet bigger than 'max_allowed_packet' bytes sometimes when I gather album art](#catalog-update-throws-got-a-packet-bigger-than-max_allowed_packet-bytes-sometimes-when-i-gather-album-art)
* [Some album art is missing](#some-album-art-is-missing)
* [Albums with the same title are being displayed as a single album](#albums-with-the-same-title-are-being-displayed-as-a-single-album)
* [Is there any way to browse songs based on the underlying directory structure](#is-there-any-way-to-browse-songs-based-on-the-underlying-directory-structure)
* [I lost my admin password](#i-lost-my-admin-password)
* [Unable to get transcoding working](#unable-to-get-transcoding-working)
* [When using an API (Ampache, Subsonic, UPnP ...) I can browse my library but playback doesn't work whereas it is working using the web interface, how to make it work](#when-using-an-api-ampache-subsonic-upnp--i-can-browse-my-library-but-playback-doesnt-work-whereas-it-is-working-using-the-web-interface-how-to-make-it-work)
* [Ampache / Ampache Doped, what is the difference](#ampache--ampache-doped-what-is-the-difference)
* [What is Ampache/Laravel](#what-is-ampachelaravel)

## Empty albums remain after deleting a catalog

After deleting catalogs, run "Clean All" from "Admin" > "Catalogs" section > "Show Catalogs" page.

## I'm getting errors about memory limits being reached / out of memory

The most common cause of memory issues is a file (or files) with corrupt or malformed tags. Enable logging to find the file causing the issue.
This could also happen because your PHP setting memory limit is too low. You should check your php.ini `memory_limit` setting and maybe increase its value.

## I'm getting errors about execution time-outs

Although Ampache uses `set_time_limit(0)` to attempt to override the PHP execution time limits during long-running processes such as cataloging and streaming, some PHP configurations do not allow runtime overrides. If possible you should update your PHP configuration and increase the global limits or enable run-time overrides. Don't panic if Ampache halts in the middle of a catalog action. You do not need to delete the catalog and start over, simply run the same process again and Ampache will pick up where it left off.

## I'm getting "Ampache Configuration Parse Error"

The reason you are getting this error, is because your configuration file (/config/ampache.cfg.php) is not formatted properly. Every line without a semicolon must be formatted as a key/value (e.g. `database_hostname = "localhost"`). If you're unable to determine where the problem is, it would be best to move your current configuration to another folder, then copy `/config/ampache.cfg.php.dist` to `/config/ampache.cfg.php` and replace the values from your old file.

## Catalog update throws *Got a packet bigger than 'max_allowed_packet' bytes* sometimes when I gather album art

When Gathering Art, Ampache saves the file to the database. If the filesize is too large, the MySQL query will fail because it exceeds the maximum allowed packet size for the query. You will either have to decrease the filesize of your cover art, or increase the *max_allowed_packet* in MySQL settings.

You could also avoid saving images to the database by saving them on disk. See the `album_art_store_disk` setting in ampache.cfg.php.

## Some album art is missing

If you have some album art that appears and some that don't, there can be a couple reasons why. One reason may be due to the filesize of your cover art. By default, Ampache allows art up to 1 MB in size. To allow larger art, simply change `max_upload_size` to something larger like 5242880 for 5 MB. Then, re-gather art from the "Show Catalogs" page.

## Albums with the same title are being displayed as a single album

This is a known limitation; the alternative is for Various Artist albums to display as multiple albums, which is unacceptable. If your files are tagged with the correct "Album Artist" this will help cut down on the frequency of this occurring, but not 100%. There is no way for Ampache to programmatically determine from the standard raw metadata whether "John Farnham, Greatest Hits, 1987" and "Richard Marx, Greatest Hits, 1987" are separate albums.

MusicBrainz is an open music encyclopedia that collects music metadata. Each release for any album is given its own unique MusicBrainz Identifier (MBID), providing an unambiguous form of music identification. Ampache now (version >= 3.7.0) has an additional constraint based on MBIDs that will split them correctly if the albums were tagged using a tagger that writes the MBIDs to the files tags (such as [Picard](https://picard.musicbrainz.org/), or [Beets](http://beets.io/)).

## Is there any way to browse songs based on the underlying directory structure

No. However, with the filename metadata source you can use the directory and filename structure as the authoritative metadata that's imported into Ampache's database, then browse it using the normal methods.

## I lost my admin password

You can temporarily disable authentication and reset the password. To do this, you should modify two variables in `config/ampache.cfg.php`:

```INI
use_auth = "false"
default_auth_level = "admin"
```

Don't forget to change them back after you've used the admin panel to reset the password!

Another option is to create a new admin account using the [command line tools](CLI)

## Unable to get transcoding working

First you can check the logs to see if there is a simple error you can resolve by yourself. Otherwise, you can try to run the transcoding command manually to see if it's working outside of Ampache.

Example:

```ShellSession
2015-02-07 10:27:08 [admin] (stream) -> Transcode command: avconv -i '/music/song.flac' -vn -b:a 32K -c:a libmp3lame -f mp3 pipe:1
2015-02-07 10:27:08 [admin] (play) -> Stream ended at 0 (0) bytes out of
```

For ubuntu, you may have to install the Ubuntu Restricted Extras package to get proprietary codecs to work. You can do this through the Ubuntu Software Center, or by running: `sudo apt-get install ubuntu-restricted-extras`.

## When using an API (Ampache, Subsonic, UPnP ...) I can browse my library but playback doesn't work whereas it is working using the web interface, how to make it work

For most of the API backends, it is recommended to have the PHP cURL module installed and enabled. Otherwise playback can fail for a few clients if they are expecting a specific URL format.

If your server supports IPv6, ensure that your webserver (e.g. Apache, Nginx) is listening the same way on IPv4 and IPv6. Be aware that when using cURL with the default configuration, IPv6 will always be used on cURL operations.

## Ampache / Ampache Doped, what is the difference

Today, none. At one point Ampache development had somewhat stopped, and was forked in order to continue progress. Eventually after a few months, was merged back to Ampache in April 2014 where development continued on the official repository.

## What is Ampache/Laravel

Ampache Laravel is an effort to migrate Ampache to the [Laravel](https://laravel.com/) framework so that the code could be improved and re-organized. Most Ampache features are missing so it is not ready yet as a replacement. It was originally going to be version 4 of Ampache, but development has slowed from the original authors and focus has shifted to updating the current Ampache to fix bugs, improve the API, and generally modernize the codebase.

To check out Laravel, read the available documentation: [Ampache Laravel Next Generation Preview](Ampache-Laravel-Next-Generation-Preview)
