# Ampache Plugins

It can be a bit daunting to write a plugin for Ampache but this page will be written up to help people with a bit of knowledge take the plunge and write a plugin!

## About

Plugins are called by Ampache to perform a specific function. currently there are multiple display, media notification and art searching plugins that help extend what Ampache can do.

Plugins are placed in: ``` Ampache/modules/plugins/ ``` the name of the file must be ```./Name/Name.plugin.php```.
 e.g. ```Dummy/Dummy.plugin.php```.

The file must declare a corresponding class and the name of the class must be prefixed with Ampache.
e.g. ```class AmpacheDummy```

## Required Methods

The following public variables must be declared:

* (string) name
* (string) description 
* (int)    version     - This plugin's version
* (string) min_ampache - Minimum Ampache DB version required
* (string) max_ampache - Maximum Ampache DB version supported

```
    public $name        = 'Dummy Plugin';
    public $description = 'Dummy Plugin to hopefully explain this a bit better';
    public $version     = '000002';
    public $min_ampache = '420000';
    public $max_ampache = '999999';
```

The following public methods must be implemented:

* install()        - This is usually used to insert preferences like API keys or other values the plugin needs
* uninstall()      - Remove all the things you install here
* load(User $user) - Loads the preferences you have installed to the database

These functions should all return a boolean on success/failure.

## Additional Methods

The following public methods may be implemented:

* upgrade() - If you make an update that requires new preferences use upgrade to insert the missing preferences without having to reinstall.

## Methods called by Ampache

Finally, for the plugin to actually be useful one or more of the following hooks should be implemented as a public method:

* display_home() Display someting in the home page / index
* display_on_footer() Same as home, except in the page footer
* display_user_field(library_item $libitem = null) This display the module in user page
* display_map(array $points) Used for graphs and charts
* external_share(string $public_url, string $share_name) Send a shared object to an external site
* gather_arts(string $type, array $options, integer $limit) Search for art externally
* get_avatar_url(User $user)
* get_lyrics(Song $song)
* get_location_name(float $latitude float $longitude)
* get_metadata(array $gather_types, array $media_info) Array of object types and array of info for that object
* get_photos(string $search_name)
* get_song_preview(string $track_mbid, string $artist_name, string $title)
* process_wanted(Wanted $wanted)
* save_mediaplay(Song $song)
* save_rating(Rating $rating, integer $new_value)
* set_flag(Song $song, boolean $flagged)
* shortener(string $url)
* stream_control(array $object_ids)
* stream_song_preview(string $file)
