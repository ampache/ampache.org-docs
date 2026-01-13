# Configuring VLC for Localplay

Ampache has the ability to remote control VLC over the network via it's http interface. VLC or [VLC media player](http://www.videolan.org/vlc/) is a cross-platform open source media player that can play most known media formats. This document will walk you through the steps on how to setup localplay with VLC. It is assumed that you have _Admin_ rights on your Ampache instance.

## Activate the HTTP interface of the VLC player

Vlc comes standard with a built in http interface, this needs to be activated before Ampache can use it for localplay.

### Windows

1. Goto the Tools menu preferences (show settings all) interface > main interface, tick http remote control interface.
2. Then main interface > HTTP , fill in your host adres with portnumber (like: 192.168.0.109:8900) default is 8080 but i advice to use something else.
3. Fill in the Source directory,this is the directory where your vlc http files are,there mostly here(c:\Program Files\Videolan\VLC\http).
4. You need to restart vlc for it to take effect.

### Linux

1. Same as above, directory is mostly at `/usr/share/vlc/lua/http`, the interface can also be started from the command line if you only have a remote access to this machine : `cvlc -I http --http-port 8080`.
2. There is no password used so security happens through a **.host** file that only allows access from hosts in the file(`/usr/share/vlc/lua/http/.hosts` for linux) or (`%PROGRAMFILES%\VideoLAN\VLC\http.hosts` for Windows).

Here you have to make sure the ip adress of your ampache server is included or uncommented.

## Adding a localplay instance

Check that you are logged in as admin into ampache, goto _modules>localplay modules_ and activate vlc.
Linux users make sure those files are readable by your webserver.

### Creating the localplay instance

1. Settings --> option -> localplay type  (vlc)
2. Localplay --> Add instance ->

You will be given several options when creating an instance, such as instance name and hostname and port. Name is how Ampache will represent the instance on the sidebar. The Hostname is the IP or DNS name of your Vlc server (same as host in your vlc settings). If vlc is non-local make sure that it is listening on the correct IP. Port is by default 8080 but because this is used by other processes another port is preferred.

PASSWORD is not used at the moment so leave this blank.

### Selecting the instance

Once you created an instance, the name of the instance should show up under _Active instance_. All that you have to do to start using it is click on its name. It should turn blue to indicate that the change was successful. At any time you can switch back to Streaming by clicking _None_ or start managing a different instance by clicking on its name.

### extra info

The vlc controller is still in beta, if you find any errors or problems please let me know (davevdv).
Vlc uses xml files to communicate and in standard mode sends it's entire medialibary along if requesting a playlist, so a big medialibary can make things slow.