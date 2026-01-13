# Ampache with Multi Artist support

Ampache 5.3.0 includes support for connecting multiple artist objects to a single song or album.

We rely on 3 tags right now. ([picard-docs](https://picard-docs.musicbrainz.org/downloads/MusicBrainz_Picard_Tag_Map.html))

* **Artists**: Array of Artist names that are looked up and matched to Song Artist (Ignored if count is the same as MusicBrainz Artist ID)
* **MusicBrainz Artist ID**: Array of MBID values that denote Song Artist
* **MusicBrainz Release Artist ID**: Array of MBID values that denote Album Artist

If these are not arrays, we try to split and create arrays to do the lookups.

The reason the regular artist and albumartist tags are ignored (for now) is due to how awful these fields can be. If you don't use these tags nothing will change and will function as normal.

To do a full catalog verify, disable `catalog_verify_by_time` in your config file.

![image](https://user-images.githubusercontent.com/1305249/160990392-858854f1-0258-480e-892e-2c5305eb86d1.png)

## Visual Changes

Right now there isn't an easy way to edit this mapping outside of updating your tags and then doing another verify.

But it's not something you should need to do very much once you've updated your catalog.

### You will now see 'Additional Artists' on Album and Song edit pages

The first item in the array will be set as the primary artist

![image](https://user-images.githubusercontent.com/1305249/161686828-21439ff4-5027-45c2-ba8f-b60bcac00409.png)

## Album and Song pages will have links to each album artist

![image](https://user-images.githubusercontent.com/1305249/161687090-9df568fd-caf2-4c9d-82a5-d5ac99f8013d.png)

![image](https://user-images.githubusercontent.com/1305249/161687526-085e7fcc-145a-4cf0-9524-d133274176b1.png)

## Same for all Album and Song rows

![image](https://user-images.githubusercontent.com/1305249/161687284-6a303297-05c2-4f83-a2d7-33a27962f480.png)

![image](https://user-images.githubusercontent.com/1305249/161687361-f3c04490-7184-45ec-becf-a00818e299cc.png)

## Notes regarding tag issues

We have found that some arrays of tags are not being read / recorded / assigned blame correctly.

If you are sure your tags are correct but can't see the extra artists on a verify; try putting them in a single item and split with `;`.

![image](https://user-images.githubusercontent.com/1305249/161686529-3c0d04d2-8a9d-4fd8-b61d-cc9be5f2dad5.png)

This seems to be mostly affecting QuickTime (MP4) files but has been seen in some ASF (WMA) files as well.

## Issues with old Artist names

You might notice some of your old artists will still have the wrong name after updating.

![image](https://user-images.githubusercontent.com/1305249/160987422-4033368c-070d-44e1-92c3-8925e325b282.png)

You might also find some that look a bit odd with incorrect or extended names.

![image](https://user-images.githubusercontent.com/1305249/160988772-95aea854-9d2a-4389-91c4-1ac70820e104.png)

The decision was made to not update these objects automatically.

While it might be a it daunting for users with large catalogs there are now multiple options for you to resolve these issues.

### Edit the artist manually

There have been a lot of bug fixes made to the the update window so you can quickly update the Artist.

![image](https://user-images.githubusercontent.com/1305249/160989174-e952b93d-12ae-43ee-bea5-e634d9f18bc8.png)

### Update from MusicBrainz

This option is available to Catalog Manager and higher permissions.

First up you need to make sure the MusicBrainz plugin is active.

![image](https://user-images.githubusercontent.com/1305249/161193672-8196382f-43d2-43d6-87fb-de5559d9d6f3.png)

To enable this feature make sure you turn on `Overwrite Artist names that match an mbid` in your plugin preferences page

![image](https://user-images.githubusercontent.com/1305249/161190898-115a5576-348f-4428-b3a7-a5b5c9821fc3.png)

If your Artist has an mbid attached to them you can sync their name from MusicBrainz.

![image](https://user-images.githubusercontent.com/1305249/160989328-f2decb14-7b7e-4ecb-a432-a1280a32410a.png)

This function will use the MusicBrainz Plugin to update Name, Place Formed and Year Formed.

![image](https://user-images.githubusercontent.com/1305249/160989664-649765d2-0978-4184-adfc-66315cf0525d.png)

If your locale exists in the MusicBrainz data we will use that to update names.

### Update from MusicBrainz, Last.FM and TheAudioDB using the CLI

You can update even more details using the CLI. As with updating from the UI you need to enable `Overwrite Artist names that match an mbid`

If you use TheAudioDB plugin there is a separate option for overwriting names too

![image](https://user-images.githubusercontent.com/1305249/161191113-c785993b-f66b-479f-bc6e-936c1bcd6e92.png)

To update you can run:

```shell
bin/cli run:updateCatalog -u
```

This will load all the external metadata plugins that are enabled and sync data with the local artist objects.

There is a lot of information that can be updated here and it will overwrite any custom changes.
