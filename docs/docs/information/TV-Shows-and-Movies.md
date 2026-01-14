---
title: "TV Shows and Movies"
metaTitle: "TV Shows and Movies"
description: "TV Shows and Movies"
---

The Ampache file parser for TV show and movie names is based partially on Kodi specs. The details can be found at [kodi.wiki TV_shows](http://kodi.wiki/view/Naming_video_files/TV_shows) and [kodi.wiki Movies](http://kodi.wiki/view/Naming_video_files/Movies>).  However, it will not automatically apply names and other values without the correct information.  Applying MP4 tags to files before adding them to the Ampache catalog is recommended.  Using the command line tool ``mp4tags``, this can be done manually (file-by-file) or with the help of a script.  For example:

## Scraping MP4 Tags with a Script

1. Name your files in a consistent manner.  For this example, all files are named with the pattern:
    * /Top Folder/show name/[Season_]##/##[-episode-Title].ext
       * Example: /TV Shows/Awkward/Season_4/3-Touched By an Angel.mp4
2. Be careful in your naming to avoid certain special values.  Patterns are finnicky.  For example:
    * An episode titled "100", causes the naming pattern to decide that this is now episode number 100.  The solution for text sequences with special characters is to include escaped quotation marks to the file name.  e.g. the file previously named ``20-100.mp4`` had to be renamed ``20-\"100\".mp4``.
    * Another problem are sequences with special words. An episode title with "Episode" in the name is a good example.  This must be edited to remove ``Episode`` from the filename entirely to prevent the naming parser from having a panic attack.
3. Tag all of your files with ``mp4tags`` [using this Python script](https://gist.github.com/BlueNalgene/2ff65e53d535e5cbe8433091638a926a) to scrape the naming pattern for values and apply the ``mp4tags`` arguments in commandline.
4. Add your catalog in the usual manner with the following caveats:
    * Filename pattern: ``%M-%t``
    * Folder pattern: ``%S/Season_%n``
**Ampache does not know what the unlisted character fields such as ``%M`` mean**, despite them being part of the mp4tags standard.  Instead, it only interprets this as a placeholder to ignore.  We only want to get ``%t`` out of the pattern in the end, and the rest must come from the ``mp4tags`` CLI tool/script.

## File Naming Variations and Common Forms

Because the following patterns are widely used in news groups and other download sites, best practices would be to conform to the following patterns.  The Python script would need to be modified if you prefer another common naming scheme.

### TV Show Name Variations

1. `title.[date].S#[#]E#[#][.episode title].ext`
   * Example: Awkward (2014).S04E03.Touched by an Angel.mp4
2. `title.[date].#[#]X#[#][.episode title].ext`
   * Example: Awkward.2014.04x03.Touched By an AngTV Show and Movie File Patternsel.mp4
3. `title.[date].Season #[#] Episode #[#][.episode title].ext`
   * Example: Awkward.Season 04 Episode 03.Touched by An Angel.mp4
4. `title.[date].###.ext (maximum of 9 seasons)`
   * Example: Awkward 2014.403.Touched by an Angel.mp4
5. `/Top Folder/show name [year]/[season ]##/##[-episode-Title].ext`
   * Example: /TV Shows/Awkward 2014/Season 4/3-Touched By an Angel.mp4

### Movie titles

* `title.[date].ext`
* `/Top Folder/movie title [(date)]/title.ext`

*Note: The parsing routine is case insensitive and the results will be converted to "camel case" before being imported. Item separators are limited to period (.), hyphen (-), underscore (_) and space (" ").*

### Abbreviation Filter

Many downloaded files have extraneous abbreviations mixed in with the title and cause problems with parsing the file names. An abbreviation list has been added to the config file to filter out the annoying abbreviations.  The list is not case sensitive.

### Configuration for Tvdb and Tmdb plugins

* metadata_order_video = "filename,getID3,Tvdb"

This order will insure that information from the physical file such as audio/video codecs used will be grabbed.
