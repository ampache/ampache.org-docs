---
title: "Ampache + Icecast & Liquidsoap"
metaTitle: "Ampache + Icecast & Liquidsoap"
description: "Ampache Ampache + Icecast & Liquidsoap"
---

Channels suck, I can't fix them without taking a lot of time for something that is already done better elsewhere.

There's actually a pretty easy way to use icecast and Ampache playlists without having to play around with scripts or the api.

This assumes you have good enough linux knowledge to configure things, i'll work on making this easier in the future.

## Install and configure Icecast2

Install icecast, configure admin accounts, etc and make sure it's all working first.

The default config file has a lot of commented information using `<!--` and `-->` so make sure you're aware of what you delete.

You want to create a source for music to stream to and a source for clients to read the stream from. This is done using sockets.

### Configure listen-socket's

For a user to hear your streams you need sockets.

In the config below I'm using socket 8000 to stream to clients (Proxied through my Apache server over ssl) and 8200 is a radio input stream.

Configure as many sockets as you want (I have 3 radio streams at home using ports 8200, 8201 and 8202)

```conf
<listen-socket>
    <port>8000</port>
    <bind-address>0.0.0.0</bind-address>
<!-- <ssl>1</ssl> -->
</listen-socket>
<listen-socket>
    <port>8200</port>
    <bind-address>127.0.0.1</bind-address>
</listen-socket>
```

**note** I have commented out the ssl line above. If you're going to proxy through your own web server it doesn't need to be encrypted.

### Configure ssl for your client socket

If you want to connect directly to icecast instead of through your webserver you'll probably want ssl configured.

Make sure the ssl-certificate line is uncommented.

```conf
<ssl-certificate>/usr/share/icecast2/icecast.pem</ssl-certificate>
```

To make an ssl cert for your server you need to combine the cert, chain and key into one file.

If you're using letsencrypt it's pretty easy to do. You just need to know where the cert is

Combine the cert into a single file and change perms for icecast to read it.

```shell
cat /etc/letsencrypt/live/MYSITENAME/privkey.pem /etc/letsencrypt/live/MYSITENAME/cert.pem /etc/letsencrypt/live/MYSITENAME/fullchain.pem >/usr/share/icecast2/icecast.pem
chmod 600 /usr/share/icecast2/icecast.pem
chown icecast2:icecast /usr/share/icecast2/icecast.pem
```

**note** Make sure you set up a cron job or systemd timer if you intend on keeping this going as letsencrypt certs expire pretty quickly

## Configure a mount point

Now you need a mount point is where you'll be serving music from.

```conf
<mount>
    <mount-name>/radio1</mount-name>
    <username>radio</username>
    <password>passwordhere</password>
    <burst-size>65536</burst-size>
    <bitrate>128</bitrate>
</mount>
<mount>
    <mount-name>/radio2</mount-name>
    <username>radio</username>
    <password>passwordhere</password>
    <burst-size>65536</burst-size>
    <bitrate>128</bitrate>
</mount>
```

### Restart icecast

After restarting the service i have icecast available on port :8000

![image](https://user-images.githubusercontent.com/1305249/136309993-4660864a-5d3b-4b00-8c98-5842a790616f.png)

Now it's time to get it playing music

## Configure Liquidsoap

First up install liquidsoap from your package manger. Debian is using 1.4.3 which is old but it works fine. We don't need anything special here.

### Get your playlists ready

With the Ampache cli you can add liquidsoap to the www-group, pull down the playlists and then serve the files to icecast

Add the www-data group to liquidsoap

```shell
usermod -a -G www-data liquidsoap
```

Log in as liquidsoap and create the playlists

```shell
su - liquidsoap -s /bin/bash
mkdir /usr/share/liquidsoap/playlists
/var/www/ampache/bin/cli export:playlist /usr/share/liquidsoap/playlists/
```

You should have an export of all your playlists exported to the playlists folder.

```shell
ls /usr/share/liquidsoap/playlists/
```

_Note: Ampache 6 add the possibility to export juste one playlist. Think about it if you have a lot of playlists._

### Create a liq file for Liquidsoap

Now that you're installed and have your playlists with a working Icecast you can start streaming!

Create a config file and make it executable

```shell
touch /usr/share/liquidsoap/ampache.liq
chmod +x /usr/share/liquidsoap/ampache.liq
nano /usr/share/liquidsoap/ampache.liq
```

Here is my config, make sure you alter to your setup!

```txt
#!/usr/bin/liquidsoap
# Log dir
set("log.file.path","/var/log/liquidsoap/liquidsoap.log")

# Music
radio8200 = playlist("~/playlists/2184. bangers user.m3u")
radio8201 = playlist("~/playlists/14. Rebel Radio mkIII user.m3u")

# Stream it out
output.icecast(%mp3.fxp(channels=2,samplerate=44100,bitrate=128),
  fallible=true,
  host = "127.0.0.1", port = 8200,
  user = "radio",  password = "passwordhere",
  mount = "/radio1",
  name="bangersRadio", description="",
  radio8200)

output.icecast(%mp3.fxp(channels=2,samplerate=44100,bitrate=128),
  host = "127.0.0.1", port = 8201,
  user = "radio",  password = "passwordhere",
  mount = "/radio2",
  name="rebelRadio", description="",
  radio8201)
```

Now that you're configured you can run the liq file as liquidsoap and check out that it's working

```shell
/usr/share/liquidsoap/ampache.liq
```

You should get a mount point on the icecast page

![image](https://user-images.githubusercontent.com/1305249/136313478-de076b3b-e38c-4779-bc82-8c9cf2c43991.png)

Radio will now be available from your mount point (https/https depending on your setup)

```URL
http://MYHOST:8000/bangersradio
https://MYHOST:8000/bangersradio
```

## Add it to Ampache

Add this link as a live stream in Ampache and you're done.

**note** outside your lan this port needs to be available

![image](https://user-images.githubusercontent.com/1305249/136313792-5fbafd05-7bc9-4dc8-8085-80d1b3cc7029.png)

Now you've got live streaming from playlists without the hassle!

![image](https://user-images.githubusercontent.com/1305249/136313859-59ae7259-b74e-4002-8347-2447f4bb8db2.png)

## Create an Apache2 proxy to remove the ports from the url

Can't get the ports outside your lan? Add a proxy to your site config and use your Ampache URL for the streams

In Debian Apache stores the active sites in `/etc/apache2/sites-enabled/`

First up make sure you've enabled proxy_html in Apache

```shell
a2enmod proxy_html
systemctl restart apache2
```

Here I've set up an ssl proxy here to redirect my streams from `https://MYHOST:8000/bangersradio` to `https://MYHOST/bangersradio`

```conf
SSLProxyEngine on
SSLProxyVerify none
SSLProxyCheckPeerCN off
SSLProxyCheckPeerName off
SSLProxyCheckPeerExpire off
ProxyPass /bangersradio https://MYHOST:8000/bangersradio
ProxyPassReverse /bangersradio https://MYHOST:8000/bangersradio
ProxyPass /rebelradio https://MYHOST:8000/rebelradio
ProxyPassReverse /rebelradio https://MYHOST:8000/rebelradio
```

Don't want icecast on ssl? That's basically the same as https.

```conf
ProxyPass /bangersradio http://MYHOST:8000/bangersradio
ProxyPassReverse /bangersradio http://MYHOST:8000/bangersradio
ProxyPass /rebelradio http://MYHOST:8000/rebelradio
ProxyPassReverse /rebelradio http://MYHOST:8000/rebelradio
```
