---
title: "Installing Ampache"
metaTitle: "Installing Ampache"
description: "Installing Ampache 5+"
---

## Installing Ampache 5+

This document is built to help you install to your local server.

Alternative installations can be found here:

* A pre-built [docker](https://github.com/ampache/ampache-docker) repo is also available.
* [Ampache 4 Installation](/docs/old-information/installation-v4)

1. Prepare the web server [Prerequisites](#prerequisites)
2. Configure the web server [Web Server Configuration](#web-server-configuration)
3. Configure Ampache [Web-based Installer](#web-based-installer)

## Prerequisites

* A web server. All of the following have been used, though Ampache receives the most testing with Apache:
  * Apache
  * lighttpd
  * nginx
  * IIS
* PHP = 7.4-8.4

* PHP modules:
  * PDO
  * PDO_MYSQL
  * hash
  * session
  * intl
  * json (for php8.0+ php-json is part of the base php package)
  * curl
  * simplexml
  * gd (optional)
  * ldap (optional)
  * zip (optional)

* For FreeBSD The following php modules must be loaded:
  * php-xml
  * php-dom
  * php-intl
  * MySQL

* Supported databases:
  * MySQL 8.x / MariaDB 10.x

Using Debian? This should cover you

```Shell
sudo apt install apache2 cron ffmpeg flac gosu inotify-tools lame libavcodec-extra libev-libevent-dev libflac-dev libmp3lame-dev libtheora-dev libvorbis-dev libvpx-dev php php-curl php-gd php-json php-ldap php-mysql php-xml php-zip php-intl vorbis-tools zip unzip
sudo a2enmod rewrite
```

### Download Ampache

Release tarballs are available at [github.com](https://github.com/ampache/ampache/tags). Depending on the feature and how recently it's changed, support might only be available for git HEAD.

You can grab the latest code for each branch directly:

* [git MASTER](https://github.com/ampache/ampache/archive/master.zip).
* [git DEVELOP](https://github.com/ampache/ampache/archive/develop.zip).

Management of your deployment can be much easier if you use a git checkout rather than a tarball.

These commands will check out the latest Ampache code without having to download or unpack a zip file:

* `git clone -b release7 https://github.com/ampache/ampache.git ampache`
* `git clone -b release6 https://github.com/ampache/ampache.git ampache`
* `git clone -b develop https://github.com/ampache/ampache.git ampache`

### Install Composer

[Composer2](https://getcomposer.org/) is used to manage dependencies. Composer1 has a few issues now and is likely to cause you issues.

Download it and install it (e.g: `mv composer.phar /usr/local/bin/composer`)

If you cannot use Composer, you should download the release archive *ampache-x.x.x_all.zip* which contains all dependencies.

For Mac users (High Sierra & Mojave) - brew install composer

## Ampache7 requires NPM for JS package installation

When you update Ampache you need to add another step to the update processes.

In addition to composer install you need to update the NPM packages.

The minimum nodejs version is **v15** or higher and supported packages are available in:

* Debian bookworm (stable)
* Ubuntu 23.10
* Ubuntu LTS 24.04

Check your version prior to upgrading.

![image](https://github.com/ampache/ampache/assets/1305249/4fa526a6-fc68-4890-ac5d-6a44be7a9a2c)

When you're updating from git add the npm commands to the end of your scripts.

```shell
cd /var/www/ampache
git pull
composer install --no-dev --prefer-source --no-interaction
npm install
npm run build
```

Check out [update_from_git.sh](https://github.com/ampache/ampache/blob/patch7/docs/examples/update_from_git.sh) for an updated example.

### Emplacement

The project root folder of the Ampache is not the web root anymore.

The new folder is public which is a subfolder of the project root.

![image](/img/1305249/129305685-ba0c0b6f-35cd-4085-8a4b-4aa2585d8b23.png)

To install Ampache 5+ it's basically the same but you have to have a bit better understanding of how the webserver serves your folders

The simple way is just to chuck it all in /var/www and link to your default html/httpd folder (if you're serving more than one website this will overwrite everything)

Here's an easy example that covers a Debian/Ubuntu webserver

```Shell
wget https://getcomposer.org/download/latest-stable/composer.phar
sudo mv composer.phar /usr/local/bin/composer
sudo chmod +x /usr/local/bin/composer
sudo chown www-data:www-data /var/www -R
sudo su - www-data -s /bin/bash
cd /var/www
git clone -b release6 https://github.com/ampache/ampache.git ampache
mv /var/www/html /var/www/html_before_ampache
ln -s /var/www/ampache/public /var/www/html
cd ampache
composer install
```

You now have an Ampache 6 server ready to install. (`http://localhost` if you followed these commands)

### MySQL database creation

Don't know how to set up MariaDB? Need it on the same server? Lets install it

```Shell
sudo apt install mariadb-server
sudo mariadb-secure-installation
```

You will see the following

![image](/img/1305249/129307818-6b89703c-1309-47e8-b6ac-27843c46df80.png)

* "Enter current password for root (enter for none):" **Press enter for no password**
* "Switch to unix_socket authentication [Y/n]" **Another no**
* "Change the root password? [Y/n]" **Yes we want a password**

![image](/img/1305249/129308015-b9337afe-b968-4599-b24a-72026cd51341.png)

The rest is up to you but if you are using a different server for your webserver you will probably need to answer no to keep remote root access

![image](/img/1305249/129308136-74836b10-e041-4a8f-b788-234cc7265ef9.png)

Now you can test logon using your new password

```Shell
mysql -u root -p
```

Get this? You can install Ampache using the web-based installer!

![image](/img/1305249/129308228-1294e960-ab18-4e56-9711-ed9928d866e6.png)

## Web server configuration

After you follow the web installation make sure you check out the [Basic Configuration](/docs/configuration) for some tips on editing you config file

### Apache

Go to your web browser and direct it at the Ampache install page. For instance, if the local IP of your Ampache install is on IP 192.168.1.100, you would enter:
[http://192.168.1.100/install.php](http://192.168.1.100/install.php)

Ampache is developed to work instantly with Apache without additional configuration except setting up a regular vhost.

Some features requires url rewriting to work correctly. It is highly recommended to enable it.

* Be sure mod_rewrite is enabled on your Apache installation. Otherwise install/activate it and restart your Apache service
* Check that Ampache website is allowed to override Apache settings (`AllowOverride All` in vhost config file for instance)

If you followed the easy example for a Debian/Ubuntu webserver above (see: [Emplacement](#emplacement)):

* mod_rewrite should be enabled, but you can check with `sudo apache2ctl -M` for the line `rewrite_module (shared)`.
* The server config file is /etc/apache2/sites-enabled/000-default.conf and the following lines need to be added for the .htaccess files to take effect and the url rewriting to work correctly:

```conf
<Directory /var/www>
        AllowOverride All
</Directory>
```

Issues have been reported in recent Apache versions. [issue 3993](https://github.com/ampache/ampache/issues/3993#issue-2434020443)

In your server conf you can bypass that security measure by enabling `ap_trust_cgilike_cl`

```conf
<Directory /var/www/ampache/public/play>
    SetEnv ap_trust_cgilike_cl 1
</Directory>
```

### Nginx

Working Nginx configuration sample for Ampache.
If Ampache is served behind a reverse proxy using SSL, you will have to uncomment `fastcgi_param HTTPS on;` to prevent mixed content to be served.

```Nginx
server {

    # listen to
    listen  [::]:used_port; #ssl; ipv6 optional with ssl enabled
    listen       used_port; #ssl; ipv4 optional with ssl enabled

    server_name my_server_name;
    charset utf-8;

    # Logging, error_log mode [notice] is necessary for rewrite_log on,
    # (very usefull if rewrite rules do not work as expected)
    error_log       /var/log/ampache/error.log; # notice;
    # access_log      /var/log/ampache/access.log;
    # rewrite_log     on;

    # ssl_protocols TLSv1.3 TLSv1.2;
    # ssl_certificate         /path/to/fullchain.pem;
    # ssl_certificate_key     /path/to/privkey.pem;
    # ssl_trusted_certificate /path/to/chain.pem;

    # Use secure SSL/TLS settings, see https://mozilla.github.io/server-side-tls/ssl-config-generator/
    # Medium Security:
    # ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256';
    # Strong Security:
    # ssl_ciphers 'TLS-CHACHA20-POLY1305-SHA256:TLS-AES-256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384';
    # ssl_ecdh_curve X448:secp521r1:secp384r1;
    # ssl_stapling on;
    # ssl_stapling_verify on;
    # ssl_prefer_server_ciphers on;
    # add_header Strict-Transport-Security max-age=15768000;
    # etc.

    # Use secure headers to avoid XSS and many other things
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Robots-Tag none;
    add_header X-Download-Options noopen;
    add_header X-Permitted-Cross-Domain-Policies none;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "same-origin";
    add_header Content-Security-Policy "script-src 'self' 'unsafe-inline' 'unsafe-eval'; frame-src 'self'; object-src 'self'";

    # Avoid information leak
    server_tokens off;
    fastcgi_hide_header X-Powered-By;

    root /path/to/ampache/root/directory;
    index index.php;

    # Rewrite rule for Channels
    if (!-d $request_filename){
      rewrite ^/channel/([0-9]+)/(.*)$ /channel/index.php?channel=$1&target=$2 last;
    }

    # Beautiful URL Rewriting
    rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&name=$5 last;
    rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(\w+)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&name=$6 last;
    rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(\w+)/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&player=$6&name=$7 last;
    rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(\w+)/bitrate/([0-9]+)/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&bitrate=$6&player=$7&name=$8 last;
    rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(\w+)/transcode_to/(\w+)/bitrate/([0-9]+)/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&transcode_to=$6&bitrate=$7&player=$8&name=$9 last;
    rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(\w+)/noscrobble/([0-1])/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&noscrobble=$6&name=$7 last;
    rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(\w+)/noscrobble/([0-1])/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&noscrobble=$6&player=$7&name=$8 last;
    rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(\w+)/noscrobble/([0-1])/bitrate/([0-9]+)/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&noscrobble=$6&bitrate=$7&player=$8&name=$9 last;
    rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(\w+)/noscrobble/([0-1])/transcode_to/(\w+)/bitrate/([0-9]+)/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&noscrobble=$6&transcode_to=$7&bitrate=$8&player=$9&name=$10 last;

    # the following line was needed for me to get downloads of single songs to work
    rewrite ^/play/ssid/(.*)/type/(.*)/oid/([0-9]+)/uid/([0-9]+)/action/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4action=$5&name=$6 last;
    location /play {
        if (!-e $request_filename) {
            rewrite ^/play/art/([^/]+)/([^/]+)/([0-9]+)/thumb([0-9]*)\.([a-z]+)$ /image.php?object_type=$2&object_id=$3&auth=$1 last;
        }

        rewrite ^/([^/]+)/([^/]+)(/.*)?$ /play/$3?$1=$2;
        rewrite ^/(/[^/]+|[^/]+/|/?)$ /play/index.php last;
        break;
    }

   location /rest {
      limit_except GET POST {
         deny all;
      }
      # Rewrite rule for Subsonic backend
      if ( !-e $request_filename ) {
          rewrite ^/rest/fake/(.+)$ /play/$1 last;
          rewrite ^/rest/(.*).view$ /rest/index.php?ssaction=$1;
          rewrite ^/rest/(.*)$ /rest/index.php?ssaction=$1;
      }
   }

   location ^~ /bin/ {
      deny all;
      return 403;
   }

   location ^~ /config/ {
      deny all;
      return 403;
   }

   location / {
      limit_except GET POST HEAD{
         deny all;
      }
   }

   location ~ ^/.*.php {
        fastcgi_index index.php;

        # sets the timeout for requests in [s] , 60s are normally enough
        fastcgi_read_timeout 600s;

        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;

        # Mitigate HTTPOXY https://httpoxy.org/
        fastcgi_param HTTP_PROXY "";

        # has to be set to on if encryption (https) is used:
        # fastcgi_param HTTPS on;

        fastcgi_split_path_info ^(.+?\.php)(/.*)$;

        # chose as your php-fpm is configured to listen on
        fastcgi_pass unix:/var/run/php-fpm.sock;
        # fastcgi_pass 127.0.0.1:8000/;

        # Prevents buffering to a temp file. May increase memory usage
        fastcgi_buffering off;
   }

   # Rewrite rule for WebSocket
   location /ws {
        rewrite ^/ws/(.*) /$1 break;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:8100/;
   }
}
```

### Lighttpd

```ApacheConf
$HTTP["host"] == "example.com" {
    server.document-root = "/srv/http/vhosts/example.com/public/"
    url.rewrite-if-not-file += (
        "^/(.*)\.(css|js|jpg|png|gif)$" => "$0",
        "^/rest/(.+)\.view$" => "/rest/index.php?ssaction=$1",
        "^/rest/fake/(.+)$" => "/play/$1",
        "^/play/art/([^/]+)/([^/]+)/([0-9]+)/thumb([0-9]*)\.([a-z]+)$" => "/image.php?object_type=$2&object_id=$3&auth=$1&thumb=$4&name=art.jpg",
        "^/play/([^/]+)/([^/]+)/([^/]+)/([^/]+)(/.*)?$" => "/play/$5?$1=$2&$3=$4",
        "^/play/([^/]+)/([^/]+)(/.*)?$" => "/play/$3?$1=$2",
        "^/play(/[^/]+|[^/]+/|/?)$" => "/play/index.php",
        "^/channel/([0-9]+)/(.*)$" => "/channel/index.php?channel=$1&target=$2"
    )
}
```

### Caddy v1

Working caddy configuration sample for Ampache. It was converted using the nginx config.

```Conf
ampache.domain.com {
    root /home/caddy/web/ampache.domain.com

    log /home/caddy/web/log/ampache.domain.com.access.log {
        rotate_size 100  # Rotate after 100 MB
        rotate_age  14   # Keep log files for 14 days
        rotate_keep 10   # keep maximum of 10 lof files
    }

    errors /home/caddy/web/log/ampache.domain.com.error.log

    index index.php

    gzip

    fastcgi / unix:/var/run/php/php7.0-fpm.sock php

    # Rewrite rules for Subsonic backend
    rewrite /rest {
        r ^/rest/(.*).view$
        to {path}/ /rest/index.php?action={1}
    }
    rewrite /rest/fake {
        r ^/rest/fake/(.+)$
        to {path}/ /play/{1}
    }

    # Rewrite rule for Channels
    rewrite /channel {
        r ^/channel/([0-9]+)/(.*)$
        to /channel/index.php?channel={1&}target={2} last;
    }

    # Beautiful URL Rewriting
    rewrite /play/ssid {
        r ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/name/(.*)$
        to /play/index.php?ssid={1}&type={2}&oid={3}&uid={4}&name={5}

        r ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/noscrobble/([0-1])/name/(.*)$
        to /play/index.php?ssid={1}&type={2}&oid={3}&uid={4}&client={5}&noscrobble={6}&name={7}

        r ^/play/ssid/(.*)/type/(.*)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/noscrobble/([0-1])/player/(.*)/name/(.*)$
        to /play/index.php?ssid={1}&type={2}&oid={3}&uid={4}&client={5}&noscrobble={6}&player={7}&name={8}

        r ^/play/ssid/(.*)/type/(.*)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/noscrobble/([0-1])/transcode_to/(\w+)/bitrate/([0-9]+)/player/(.*)/name/(.*)$
        to /play/index.php?ssid={1}&type={2}&oid={3}&uid={4}&client={5&}noscrobble={6}&transcode_to={7}&bitrate={8}&player={9}&name={10}

        r ^/play/ssid/(.*)/type/(.*)/oid/([0-9]+)/uid/([0-9]+)/action/(.*)/name/(.*)$
        to /play/index.php?ssid={1}&type={2}&oid={3}&uid={4}action={5}&name={6}
    }

    # the following line was needed for me to get downloads of single songs to work
    rewrite /play {
        r ^/play/art/([^/]+)/([^/]+)/([0-9]+)/thumb([0-9]*)\.([a-z]+)$
        to /image.php?object_type={2}&object_id={3}&auth={1}

        r ^/([^/]+)/([^/]+)(/.*)?$
        to /play/{3}?{1}={2}

        r ^/(/[^/]+|[^/]+/|/?)$
        to /play/index.php
    }

    proxy /ws 127.0.0.1:8100 {
        transparent
        websocket
        without /ws
    }
}
```

## Web-based Installer

Assuming your web stack is set up properly and you chose the standard web path, [this link](http://localhost/) should now take you to the first step of the online installer. If you set things up in a non-standard way, navigate to your chosen install root manually.

Select a language and press "Start Configuration".

![image](/img/1305249/129309422-bcf87115-a661-4a28-84a4-826d767c1999.png)

Check all errors and warnings about your environment.

![image](/img/1305249/129309590-97ca0109-8bbb-4064-8f01-684ffd8f4823.png)

Fill out the form with the database information.

It's a good idea to not use your root user as the website database user. (blank database passwords are not accepted)

![image](/img/1305249/129309667-5bed76c9-589d-4c2f-ab99-055affb1afbe.png)

If PHP is able to write to the config directory, you will be able to write out the config file directly from this page.

If you want transcoding to be available make sure you pick something in the "Allow Transcoding" section

![image](/img/1305249/129309887-dce7c474-5c5a-40e1-b4d6-d256adb4b645.png)

## Installation Type

### Default

Standard installation

### Minimalist

Disables the following by default

* ratings
* sociable
* wanted
* channel
* live_stream
* download
* allow_video

Also defaults the sidebar to collapsed mode, as well as album/artist views as lists instead of grids

### Community

Sets the following values

* use_auth = false
* licensing = true
* wanted = false
* live_stream = false
* allow_public_registration = true
* cookie_disclaimer = true
* share = true
* download = false
* home_now_playing = false
* home_recently_played = false

## Create administrative user

The final step of installation is to create the initial administrative user.

![image](/img/1305249/129310109-6fe3eb4e-d6c1-45fd-83f0-7c76073b2b76.png)

After you create your user you might have some database updates to install and then you'll be presented with the logon page

![image](/img/1305249/129310162-bd453a70-68b4-4606-9865-5fbbddb23e7f.png)

YOU DID IT!

## Post Installation Tasks

You might want to look at Ampache config file in ```config/ampache.cfg.php```. There are many options available that allow you to customize and change almost every feature available.

Make sure you check out [Basic Configuration](/docs/configuration) before you dive in!
