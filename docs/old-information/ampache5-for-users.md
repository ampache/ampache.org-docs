# Some of the visual changes in Ampache 5

## Did you set a custom_datetime in Ampache 4

Ampache 4 and Ampache 5 have incompatible datetime strings.

![image](https://user-images.githubusercontent.com/1305249/128667744-1433063c-67ee-4540-b622-f727e7f3568f.png)

The Interface setting is found in the Preferences section

![image](https://user-images.githubusercontent.com/1305249/128667845-292bbc5d-e20e-4214-b193-114fb7053dc4.png)

As an example "Y/m/d H:i" will convert to "2020/04/14 10:42" Check the [date function](https://www.php.net/manual/en/function.date.php) in the PHP manual for help making your desired string.

## Private catalogs are available

An admin can create and hide catalogs from other users. Just enable catalog_filter in the Ampache config file

![image](https://user-images.githubusercontent.com/1305249/128670351-426a5466-f3e3-4f89-b107-ad608a2b462e.png)

**NOTE** Ampache develop (5.5.0+) has extended/replaced private catalogs with filter groups. [Catalog Filters](https://github.com/ampache/ampache/wiki/catalog-filters)

## Tags are called Genres

The Tag Cloud link has moved into the browse section called "Genres"

![image](https://user-images.githubusercontent.com/1305249/128665028-a1357141-55b0-4a29-adaa-745033d08c6f.png)

## Rating and flags have combined into one line/column

![image](https://user-images.githubusercontent.com/1305249/128665416-671b8b3c-4809-4c2c-9a64-d4e8590f00ed.png)

## Common or redundant columns have been hidden

There are a few areas where having all the columns available just wasn't needed and added to clutter.

Now you have a few extra options to hide or show things you want.

![image](https://user-images.githubusercontent.com/1305249/129854169-932dc380-01c2-4e2b-9e1a-260cd27e9f50.png)

## You can now browse by the original year instead of release year

When enabled you will see the release year next to the title (if it's not the same as the original year)

![image](https://user-images.githubusercontent.com/1305249/128665563-93b0620b-cc64-413b-b1ab-cd5010dc3197.png)

## The first menu group has gone back to Ampache 3 style and is a Browse menu only

The grid layout pages have been moved into a separate section called "Dashboards"

![image](https://user-images.githubusercontent.com/1305249/128665848-9ea8852c-4b0e-4c17-b3bc-63febfd82927.png)

## The Random section has been removed

The first 4 menu items are available from the playlist in the right hand corner.

![image](https://user-images.githubusercontent.com/1305249/128665926-f99d1228-8d3d-495a-baf3-ffedde567e4b.png)

Can't find the rightbar? you can hide or expand it from the right of the header

![image](https://user-images.githubusercontent.com/1305249/128668203-8871524b-bb8a-4261-91a5-166de2687c7d.png)

Advanced search is now "Random" in the search menu

![image](https://user-images.githubusercontent.com/1305249/128665962-9ce8f365-8df5-4ea6-bb2a-6983128dd2cc.png)

## Changes to playlists

You can set the type of playlist to create on import

![image](https://user-images.githubusercontent.com/1305249/128666891-a7d0404a-4a9b-4dd9-8e8a-de6a406682da.png)

You can change the playlist owner (You can give one away and lose it if you aren't an admin!)

![image](https://user-images.githubusercontent.com/1305249/128667013-4e848f7b-87ba-4623-b7ad-6820d835fb19.png)

This is the same for saved searches/Smart Lists

![image](https://user-images.githubusercontent.com/1305249/128667164-67c7937d-35d9-4558-ab23-5ddfa2968aac.png)

The Owner column has been removed and integrated into the display name

This gives the WebUI, API and Subsonic the same visual appearance

![image](https://user-images.githubusercontent.com/1305249/128668896-9c4e1b32-9f2f-4d53-b0b9-b45e40cf13e3.png)

Reminder: If you own the playlist you don't see the owner

![image](https://user-images.githubusercontent.com/1305249/128669285-32fcdcd7-d1ad-48e0-aaec-ac2a3d701b7c.png)

## Refresh a playlist using a smartlist

If you have a saved search (you can access) and a playlist with the same name you can refresh the playlist using that search.

Be warned that this will **delete the playlist contents** before refreshing!

![image](https://user-images.githubusercontent.com/1305249/128667401-3faabc21-142c-44b5-8731-b9e1372032e9.png)

## Label information has been expanded

Show more detail about labels and allow you to select from the categories available from musicbrainz

![image](https://user-images.githubusercontent.com/1305249/128668605-27b19238-48d1-4184-b400-93e0aae63f40.png)

## Additions to Searching

The numbers you can search for have been expanded to give you a bit more choice

![image](https://user-images.githubusercontent.com/1305249/128669428-7dcf291a-d10d-4bcd-b324-02b7b9d54a69.png)

More options when you get your results

* Added Random to Temporary playlist
* Save the current results as a playlist

![image](https://user-images.githubusercontent.com/1305249/128669576-8520d8f7-9b85-471f-b6d1-85097c0649c2.png)

## How does the RatingMatch plugin work

RatingMatch helps you automate a few mundane tasks related to ratings and flags

![image](https://user-images.githubusercontent.com/1305249/128670656-92ba47c7-ed4d-450e-9c2b-ec8de92b341a.png)

Lets explain the rules in a (hopefully easy) way.

* "Minimum star rating to match"
  * If you rate a song 3 stars, then rate the album 3 stars
    * If the Artist is not rated at least 3 stars; raise it to match
  * If you rate an album 3 stars it will only check the artist
* "Match rule for 2 stars"
  * Play a song once and skip it 10 times? if there isn't a rating present then mark it 2 star
* "Match rule for 3 stars"
  * Play a song 15 times and never skip it? 3 stars!
* "When you love a track, flag the album and artist"
  * Love a song? when you tick that heart the album and artist will get flagged as a favorite too!

## Find Duplicates has been replaced/removed

This feature just never worked correctly and has been replaced by searches instead.

![image](https://user-images.githubusercontent.com/1305249/129130798-eb890b36-88ff-477c-a03d-29e80ee37fda.png)

Why? It's faster, has better visibility and is available to registered users as well.

Look for "Possible Duplicate" in the search pages. Artist searches can also search for albums as well.

![image](https://user-images.githubusercontent.com/1305249/129134734-ac59d4a6-f25d-4379-9639-2e31d67e4992.png)

## Tell you that the podcast catalog is missing

The idea that you need a catalog before you can subscribe to a podcast isn't always obvious.

Now we tell you that it's missing. If you try to add anyway it will fail and warn you the catalog is required.

![image](https://user-images.githubusercontent.com/1305249/129301492-f9ff520b-5016-4a68-bcdf-f68644ce482f.png)
