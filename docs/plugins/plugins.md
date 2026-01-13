# Ampache Plugins

Ampache contains a number of plugins that are included with each install.

(**TODO**) these need to be documented for regular users

Plugins are split into different categories based on the actions they perform.

* home
* metadata
* lyrics
* stats
* scrobbling
* avatar
* share
* shortener
* slideshow
* stream_control
* wanted
* geolocation
* preview

## User Plugins

Add something to the individual user page using the 'display_user_field' method.

### Flattr

Description: Flattr donation button on user page

Version: 000001

![image](https://user-images.githubusercontent.com/1305249/102038606-6f726200-3e13-11eb-8987-17487a9b467e.png)

### Paypal

Description: PayPal donation button on user page

Version: 000001

![image](https://user-images.githubusercontent.com/1305249/102038654-8c0e9a00-3e13-11eb-8d41-aaf468664e43.png)

## Homepage Plugins

Show something on the main page/index using the 'display_home' method.

### Catalog Favorites

Description: Catalog favorites on homepage. (This will show the **songs** you heart with album art)

Version: 000002

![image](https://user-images.githubusercontent.com/1305249/102038697-a8123b80-3e13-11eb-9dfa-3f45ddacc180.png)

### Friends Timeline

Description: Friend's Timeline on homepage

Version: 000001

![image](https://user-images.githubusercontent.com/1305249/102038744-c5dfa080-3e13-11eb-8d8e-08ddd37fbf67.png)

### Personal Favorites

Description: Personal favorites on homepage

Version: 000002

![image](https://user-images.githubusercontent.com/1305249/102038777-dd1e8e00-3e13-11eb-96a1-8092a01dd63f.png)

### RSSView

Description: RSS View will fetch recent items from any RSS feed and display them on the homepage.

Version: 000001

![image](https://user-images.githubusercontent.com/1305249/102038931-3e466180-3e14-11eb-8fcf-38cb21c59d46.png)

### Shout Home

Description: Shoutbox on homepage

Version: 000001

![image](https://user-images.githubusercontent.com/1305249/102039028-764da480-3e14-11eb-97b5-542409f2a288.png)

## Metadata Plugins

Plugins that can query for things like art or tag information missing from the file

### Amazon

Description: Amazon art search

Version: 000001

### Discogs

Description: Discogs metadata integration

Version: 000001

### MusicBrainz

Description: MusicBrainz metadata integration

Version: 000001

### Omdb

Description: OMDb metadata integration

Version: 000001

### TheAudioDb

Description: TheAudioDb metadata integration

Version: 000002

### Tmdb

Description: TMDb metadata integration

Version: 000003

### Tvdb

Description: TVDb metadata integration

Version: 000003

## Lyric Plugins

Search for external lyrics using the 'get_lyrics' method

### ChartLyrics

Description: Get lyrics from ChartLyrics

Version: 000001

## Statistic Plugins

Analytics plugins can insert their tracking information using the 'display_on_footer' method

### GoogleAnalytics

Description: Google Analytics statistics

Version: 000001

### Matomo

Description: Matomo statistics

Version: 000001

### Piwik

Description: Piwik statistics

Version: 000001

## Scrobble Plugins

Perform an action based on the playback, rating or flagging or a media item.

### Last.FM

Description: Scrobble songs you play to your Last.FM account

Version: 000005

### Libre.FM

Description: Scrobble songs you play to your Libre.FM Account

Version: 000003

### ListenBrainz

Description: Scrobble songs you play to your ListenBrainz Account

Version: 000001

### RatingMatch

Description: Raise the album and artist rating to match the highest song rating

Version: 000003

## Avatar Plugins

Fetch a user avater from an external source using 'get_avatar_url'

### Gravatar

User's avatars from Gravatar

Version: 000001

### Libravatar

Description: Users avatar's with Libravatar

Version: 000001

## Share Plugins

Open an external site for sharing a file using 'external_share'

### Facebook

Description: Facebook share

Version: 000001

![image](https://user-images.githubusercontent.com/1305249/102039459-903bb700-3e15-11eb-82b1-db047f0957ae.png)

### Twitter

Description: Twitter share

Version: 000001

![image](https://user-images.githubusercontent.com/1305249/102039537-dd1f8d80-3e15-11eb-97dd-96e80c934957.png)

## Shortener Plugins

Share a link to an external URL shortening site

### Bit.ly

Description: URL shorteners on shared links with Bit.ly

Version: 000002

### YOURLS

Description: URL shorteners on shared links with YOURLS

Version: 000002

## Slideshow Plugins

Get external photos to use in a slideshow

### Flickr

Description: Artist photos from Flickr

Version: 000001

## Stream Control Plugins

Manage limits for user streaming based on time, hits and bandwidth

### Stream Bandwidth

Description: Control bandwidth per user

Version: 000001

### Stream Hits

Description: Control hits per user

Version: 000001

### Stream Time

Description: Control time per user

Version: 000001

## Wanted Plugins

Plugins that make use of the wanted list using the 'process_wanted' method

### Headphones

Description: Automatically download accepted Wanted List albums with Headphones

Version: 000001

## Geolocation Plugins

Plugins which can get and show the user location

### GoogleMaps

Show user's location with Google Maps

Version: 000001

## Song Preview Plugins

Allow the user to get/stream a song preview

### 7digital

Description: Song preview from 7digital

Version: 000001
