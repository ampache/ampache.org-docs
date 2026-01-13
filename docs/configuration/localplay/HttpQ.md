# HttpQ Localplay

HttpQ is a protocol for remote controlling a music player over a network. You can use this if you, say, have a server which is plugged into your stereo. If you use a music player that supports HttpQ (e.g. Winamp or foobar2000) you can control the music player remotely from another machine, e.g. your laptop. You should have Ampache installed on the server machine and your music player. Then you log on and use [Localplay](/docs/configuration/localplay) to control the server. BrowseAmp is another example of this.

## Getting HttpQ

The standard version of HttpQ does not work with Ampache. As there haven't been any updates from the upstream the Ampache developers have made the unnecessary modifications and maintain their own copy of HttpQ. You may download the version which works with Ampache below.

* [HttpQ-Ampache](https://github.com/ampache/ampache/releases/download/3.6-alpha6/httpq-ampache.zip). Unpatched HttpQ version on [SourceForge](http://sourceforge.net/projects/httpq/files/httpq/v3.1/)

## Installing and Configuring HttpQ

HttpQ is a standard WinAmp plugin, simply extract the above zip file and then put the .dll file in your winamp plugins directory and start winamp. To configure the plugin open up your winamp preferences and look under _Plug-ins_ then _General Purpose_ You should see something to the effect of **Winamp httpQ plugin Ampache Edition v3.1**. Select it and click configure. A dialog box should pop up, the important settings are the password, IP Address and Port. These must be exactly matched when creating the localplay instance in Ampache.

## Testing HttpQ

By default all modern versions of Windows do not accept incoming connections on non-standard ports. You will need to add an exception or turn off your firewall for Ampache to be able to communicate with your instance of HttpQ if Ampache is on a different machine. If you would like to test the HttpQ connection before adding it to Ampache run the following from a command line windows on the box running Ampache.

`telnet <SERVERIP> <CONFIGUREDPORT>`

If you get a connection refused or other error then HttpQ is either not running or is being blocked.