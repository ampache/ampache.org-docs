# Standard Web Interface

The standard interface is a web-based graphical user interface available via web browsers. It enables the user to search and browse media, playback media, construct random or custom playlists, make changes to options, and administer the server.

The playback process one uses depends largely on the playlist method configured for that account. In the default configuration, the playback process involves browsing or searching for media, adding the media to a playlist, and then, in the final step, instructing the playlist to play to the media client. By default, Ampache streams media to a compatible media player client. However, other playback options exist, including the following: [Localplay](Localplay), [Democratic](Democratic), and HTML5 Player.

## Selecting Media

Selecting media for playback is generally done using two methods: searching and browsing. Media may also be selected using Ampache's randomization features.

### Search

Ampache provides two search methods: basic search and advanced search. Note that searches are only available for audio media; video media is not searchable.

#### Basic Search

To perform a basic search, enter a search term (or terms) in the simple search box, usually found at the top-right of the Ampache page; press the search button after you've entered your search term(s), or you can simply press "enter." The simple search will look for close matches to terms you entered in all tags and filenames of audio media.

When results appear that you want to play or add to a playlist, press the green button to the right side of each result - the action Ampache takes will depend on your playlist method. Note that pressing the column headings above the results will sort the search results according to the category specified.

#### Advanced Search

The opportunity to perform an advanced search appears automatically with the results of a simple search. Alternatively, invoke the advanced search dialog by clicking the "advanced search" button, which can usually be found on the top right of the interface.

Advanced Search is differentiated from simple search by the ability to specify a fuzzy or exact search, a minimum bitrate, codec, as well as tag, artist, year, ratings, and comments.

As with the simple search, the results can be sorted by clicking on the column headings; and likewise, play or add a result to the playlist with the green "+" button that appears to the right of each result.

### Browse

The standard, web-based interface allows users to browse music using a number of different strategies. These options are available on the menu (usually available on the left side of the screen) by pressing the "Main" botton.

Under the "Browse" heading, appear several options for browsing the audio media available on Ampache: the menu enables you to browse by the following categories: song title, album titles, artists, and saved playlists. Selecting any of these options enables the user to sort results by clicking on the column names in bold.

If the account you are using is configured to use the default playlist method, simply click the green "+" button beside the audio to add to your playlist.

Two additional options under the "Browse" heading of the Main Menu enable browsing of video media and radio stations. As with audio media, if your account is set to use the default playlist method, simply click the green "+" button beside the media you want to add to include it in a playlist.

### Random Play

As an alternative to searching or browsing for media to add to a playlist, the standard Ampache web interface provides options for random play. The four options, which appear on the main menu on the left side of the screen, include the following: album, artist, playlist, and advanced. Selecting album chooses a random album from the catalogs and adds it the current playlist; selecting artist does the same but with a random artist rather than a random album. Selecting a random playlist will choose one from among the playlists saved by Ampache and add it to the current playlist. Choosing "advanced" offers four parameters to guide the playlist that Ampache will randomly generate: number of items; length of playlist (in time); what types of albums to bias; and a size limit in MB.

## Playlist Methods

The method Ampache uses to render a playlist can be customized by the individual user.

To choose a custom playlist method, navigate to the menu, which is usually found on the left side of the page. At the top of the menu are four buttons, each of which is used to select a submenu. The third button from the left selects the preferences menu. From the preferences menu, select the "playlist" option. A drop-down box appears that enables selection of the playlist method used by a particular account.

### Default

The default playlist method enables the user to add media files to a new or existing playlist.

To ensure use of a fresh playlist, start by clearing the current playlist: navigate to the Playlist section, usually on the right side of the screen, and click the red "x" at the top of the playlist section.

From this point, add media to the blank playlist by clicking the green "+" beside the desired media. Continue to add media in the same fashion until ready to play or save the playlist.

To stream the playlist to your multimedia client, navigate to the playlist section on the right side of the screen; clicking the first button the left will start playback of the playlist.

### Send on Add

The "send on add" playlist method immediately accepts additions to the playlist and sends them to the streaming media client. This is a useful method for playing entire albums or a discography; however, this method doesn't offer the flexibility to revise and append playlists as the default method does. On sending the playlist to the client, Ampache does keep the playlist available for reference and some revision. However, the revisions will not effect the stream that's already in process.

### Send and Clear on Add

Very similar to send on add, the send and clear on add sends your selection to the player immediately, but unlike the previous method, it clears the playlist automatically.

### Clear on Send

Using the clear on send method, a playlist can be built and emended up until the point that it is sent to the media player client; at that point, the playlist clears.