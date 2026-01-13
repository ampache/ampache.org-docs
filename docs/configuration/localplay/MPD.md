# Configuring MPD for Localplay

Ampache has the ability to remote control an MPD instance over the network. MPD or [Music Player Daemon](http://musicpd.org) is designed for integrating a computer into a stereo system that provides control for music playback over a local network. this document will walk you through the steps on how to setup localplay with MPD. It is assumed that you have _Admin_ rights on your Ampache instance.

## Activate MPD module

In all new installs of Ampache the MPD module is, by default, enabled. To verify that it is currently enabled click on _Modules_ and then look under _Localplay Modules_.

When you activate the MPD module Ampache automatically enables Localplay globally, sets your play type to _Localplay_, sets your [Localplay Access](Localplay#Localplay-Permission-Levels) to _Admin_ and sets your Localplay type to _MPD_. You must do the same for any other user you would like to be able to use MPD.

## Adding a localplay instance

Once you have that setup you will need to add an Instance of MPD. Ampache works on the principle of distinct Localplay Instances which each have their own settings, an owner and an access level. This allows a single user to control a very large number of MPD instances with a click of a button.

### Creating the localplay instance

`Localplay --> Add instance`

You will be given several options when creating an instance, such as instance name, hostname, password and port. Name is how Ampache will represent the instance on the sidebar. The Hostname is the IP or DNS name of your MPD instance. If MPD is non-local make sure that it is listening on the correct IP. Password is the password in mpd.conf you set for your MPD instance, leave blank if you did not set a password. Port is by default 6600 only change if you have modified your mpd.conf.

### Selecting the instance

Once you created an instance you the name of the instance should show up under _Active instance_. All that you have to do to start using it is click on its name. It should turn blue to indicate that the change was successful. At any time you can switch back to Streaming by clicking _None_ or start managing a different MPD instance by clicking on its name.

### Tips & Tricks

* **Ampache can't connect to MPD but I'm sure I've got the host set correctly**: If MPD is not on the same box as your ampache instance you need to make sure that MPD is not listening on localhost, instead it will need to listen on all addresses so that it can accept the stream from Ampache.
* **I can add songs but I can't stop or start MPD**: Most likely your [Localplay Access](Localplay#Localplay-Permission-Levels) is set to user, change it to Manager or Admin.
* **MPD localplay stops for no apparent reason** : It's MPD's config dropping connections. Switching to a Physical address instead of allowing MPD to use local host solve most of it. Example of a part of a config file:
```
   audio_output {  
         type                    "alsa"  
         name                    "My ALSA Device"  
         device                  "hw:0,0"     # optional  
 #        format                  "44100:16:2" # optional  
 #        mixer_control                   "Master"
         use_mmap                                "yes"  
         auto_resample                   "yes"  
 ```

[Here a more complete example](Sample-MPD-Config-For-Ampache)


### Sample settings in mpd.conf

These settings affect your MPD localplay instance. If you have large playlists then the max settings need to be adjusted.

    bind_to_address                 "any"
    port                            "6600"
    password                        "yourpassword@read,add,control,admin"
    max_playlist_length             "65535"
    max_command_list_size           "65535"

## Ampache and Mopidy

If you're using [Mopidy](http://www.mopidy.com) then you should be aware that it is also possible to browse and play your Ampache library from Mopidy web interface using Subsonic API on Ampache and the [Mopidy-Subsonic](https://github.com/rattboi/mopidy-subsonic) backend extension.