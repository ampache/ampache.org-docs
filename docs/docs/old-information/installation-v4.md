---
title: "Ampache4 Installation"
metaTitle: "Ampache4 Installation"
description: "Ampache4 Installation"
---

## Installing Ampache 4

This document is built to help you install to your local server.
A pre-built [docker](https://github.com/ampache/ampache-docker) repo is also available.

* [prerequites](#prerequisites)
* [Web Server Configuration](#web-server-configuration)

## Prerequisites

* A web server. All of the following have been used, though Ampache receives the most testing with Apache:
  * Apache
  * lighttpd
  * nginx
  * IIS
* PHP => 7.1 and < 8.0 (Currently tested on php7.4-fpm)
  * Note: you will need PHP => 7.4 if you want to use [Composer](#composer) to manage dependencies

* PHP modules:
  * PDO
  * PDO_MYSQL
  * hash
  * session
  * json
  * intl (Ampache develop)
  * simplexml (optional)
  * curl (optional)

* For FreeBSD The following php modules must be loaded:
  * php-xml
  * php-dom
  * php-intl (Ampache develop)
  * MySQL

* Supported databases:
  * MySQL 8.x / MariaDB 10.x

## Download

Release tarballs are available at [github.com](https://github.com/ampache/ampache/tags). Depending on the feature and how recently it's changed, support might only be available for git HEAD.

You can grab the latest code for each branch directly:

* [github release4](https://github.com/ampache/ampache/archive/release4.zip).
* [github develop](https://github.com/ampache/ampache/archive/develop.zip).

Management of your deployment can be much easier if you use a git checkout rather than a tarball.

These commands will check out the latest Ampache code without having to download or unpack a zip file:

* `git clone -b release4 https://github.com/ampache/ampache.git ampache`
* `git clone -b develop https://github.com/ampache/ampache.git ampache`

## Emplacement

Whichever method you choose, place the extracted source tree somewhere served by your webserver. The details will depend on your precise setup and desired web path; it's fairly common to put it in a folder called ampache underneath the WWW root.

### git checkout example (Gentoo)

```shell
cd /var/www/localhost/htdocs
git clone https://github.com/ampache/ampache.git
```

### tarball example (Fedora)

```shell
cd /var/tmp
wget https://github.com/ampache/ampache/archive/release4.tar.gz
tar -xvzf release4.tar.gz
mv release4 /var/www/html/ampache
```

### Raspbian / RaspiOS example (Debian)

The process for a Raspberry Pi is essentially the same as installing an Apache webserver, which Ampache runs on. The following guides may be useful:

* [Random Nerd tutorials * most useful](https://randomnerdtutorials.com/raspberry-pi-apache-mysql-php-lamp-server/)
* [Instructables guide](https://www.instructables.com/Installing-LAMP-Linux-Apache-MySQL-PHP-on-a-Raspbe/)
* [DigitalOcean guide](https://www.digitalocean.com/community/tutorials/how-to-install-the-ampache-music-streaming-server-on-ubuntu-18-04)
* [Howtoforge guide](https://www.howtoforge.com/how-to-install-the-ampache-music-streaming-server-on-ubuntu-2004/)
* [Nxnjz.net](https://nxnjz.net/2019/01/installation-of-ampache-on-ubuntu-18-04/)

## Composer

Since 3.8.1, [Composer](https://getcomposer.org/) is used to manage dependencies. It is available if you are using PHP => 7.4.
You should download it and install it (e.g: mv composer.phar /usr/local/bin/composer), then run `composer install --prefer-source --no-interaction` on Ampache directory.
Attention: Composer version 2.x is not compatible to Ampache. Take care to use the latest 1.x version.

If you cannot use Composer, you should download the release archive *ampache-x.x.x_all.zip* which contains all dependencies.

For Mac users ( High Sierra & Mojave) * brew install composer

## MySQL database creation * Debian / Raspberry Pi (PiOS)

Open a new terminal window and run:
`sudo apt-get install apache2 mariadb-server mysqld php7.0 php7.0-mbstring php-mysql php7.0-gd php7.0-mcrypt php7.0-mysql php7.0-cli php7.0-curl php7.0-xml ffmpeg links git`
Hit 'y' when asked if you want to install the above programs

`sudo systemctl enable mariadb`
depending on your setup, you might still need to use:
`sudo mysql_secure_installation`

You should see MariaDB installation instructions:

* press enter to enter no root password
* change the root password when prompted to something you will remember
* re-enter
* remove anonymous users: Y
* disallow root login remotely: N
* remove test DB: Y
* reload privilege tables: Y

Now run:

```shell
sudo sync
sudo mysql -u root -p
```

* enter password you just created

You are now within the MySql DB, so the following commands are not Linux ones, but go straight into the MySQL DB and you will see:

```mysql
MariaDB [(none)]>
```

At the above prompt, you will create the `ampache` DB, user called `amp` (the standard `root` one probably won't work) and an example password of `password123`, enter:

```mysql
CREATE DATABASE ampache;
```

```mysql
CREATE USER 'amp'@'localhost' IDENTIFIED BY 'password123';
```

Then setup the above user you just created:

```mysql
GRANT ALL PRIVILEGES ON ampache.* TO 'amp'@'localhost';
```

Then type:

```mysql
FLUSH PRIVILEGES;
```

and:

```mysql
EXIT;
```

After each of the above command (except the last), you should get a return stating 'Query OK..'. If the line returns to the next one down without any reply, then your commands are not being received correctly.

See also: [Ampache wiki * MySQL](/docs/old-information/mysql-faq)

Now move/rename the following files with the following commands:
Move these files easily when using Linux with the following commands:
`sudo mv /var/www/ampache/rest/.htaccess.dist /var/www/ampache/rest/.htaccess`
`sudo mv /var/www/ampache/play/.htaccess.dist /var/www/ampache/play/.htaccess`
`sudo mv /var/www/ampache/channel/.htaccess.dist /var/www/ampache/channel/.htaccess`

Copy the ampache configuration ampache.cfg.php.dist file, the original ampache.cfg.php.dist is needed for admin backend as pattern for generating a new config from backend changed settings.
`sudo mv /var/www/html/ampache/config/ampache.cfg.php.dist /var/www/html/ampache/config/ampache.cfg.php`

After copying you can easily adapt it to your needs following the [Basic Configuration](/docs/configuration)
'nano /var/www/html/ampache/config/ampache.cfg.php'

In your terminal window, we will use nano to edit an Apache file (you might use a different text editor to nano, such as vim):
`sudo nano /etc/apache2/apache2.conf`
Find the following section headed:
`<Directory /var/www/html/>`
So that it reads:
`<Directory /var/www/html/>`
        `Options Indexes FollowSymLinks`
        `AllowOverride All`
        `Require all granted`
`</Directory>`
Close the window with Ctrl+X then Y to confirm changes.

Then:
`sudo nano /etc/apache2/sites-available/ampache.conf`
There should be one section, change the ServerName from localhost to your IP such as the one below. Note the folder changes too:
`<VirtualHost *:80>`
    `ServerName 192.168.1.100`
    `DocumentRoot /var/www/ampache`
    `<Directory /var/www/ampache/>`
        `AllowOverride All`
        `Require all granted`
    `</Directory>`
    `RewriteEngine on`
    `CustomLog /var/log/apache2/ampache.access.log common`
    `ErrorLog  /var/log/apache2/ampache.error.log`
`</VirtualHost>`

Run:

`sudo chmod 777 /var/www/html`
`sudo systemctl restart apache2`
`sudo a2enmod rewrite`
`a2ensite ampache.conf`
`a2enmod rewrite`
`a2enmod expires`
`systemctl restart apache2.service`

N.B. If you have issues in adding the source for the catalogue when setting up the webserver and the source is an external USB drive plugged into the Pi, this may be a permissions issue. Try the following to allow Ampache to read the drive correctly:
`sudo chmod 777 /mnt/USB/media`
(The above example assumes your USB drive is under the /mnt directory and your files are within a folder called USB/media. If this doesn't work, try a lower level folder i.e. /mnt/USB for the above example).

## Web server configuration

### Apache

Go to your web browser and direct it at the Ampache install page. For instance, if the local IP of your Ampache install is on IP 192.168.1.100, you would enter:
[http://192.168.1.100/ampache/install.php](http://192.168.1.100/ampache/install.php)

Ampache is developed to work instantly with Apache without additional configuration except setting up a regular vhost.

Some features requires url rewriting to work correctly. It is highly recommended to enable it.

* Be sure mod_rewrite is enable on your Apache installation. Otherwise install/activate it and restart your Apache service
* Check that Ampache website is allowed to override Apache settings (`AllowOverride All` in vhost config file for instance).
* After Ampache installation, check that .htaccess files are installed properly. If not, copy the following files as bellow and edit them to match your Ampache public address (eg., `RewriteRule ^(/[^/]+|[^/]+/|/?)$ /play/index.php` become `RewriteRule ^(/[^/]+|[^/]+/|/?)$ /ampache/play/index.php` if your Ampache public url is `http://localhost/ampache/`).

* `/rest/.htaccess.dist` => `/rest/.htaccess`
* `/play/.htaccess.dist` => `/play/.htaccess`
* `/channel/.htaccess.dist` => `/channel/.htaccess`

Move these files easily when using Linux with the following commands:

```shell
sudo mv /var/www/ampache/rest/.htaccess.dist /var/www/ampache/rest/.htaccess
sudo mv /var/www/ampache/play/.htaccess.dist /var/www/ampache/play/.htaccess
sudo mv /var/www/ampache/channel/.htaccess.dist /var/www/ampache/channel/.htaccess
```

Copy the ampache configuration ampache.cfg.php.dist file, the original ampache.cfg.php.dist is needed for admin backend as pattern for generating a new config from backend changed settings.

```shell
sudo cp /var/www/html/ampache/config/ampache.cfg.php.dist /var/www/html/ampache/config/ampache.cfg.php
```

After copying you can easily adapt it to your needs following the [Basic Configuration](/docs/configuration)
'nano /var/www/html/ampache/config/ampache.cfg.php'

### Nginx

Working Nginx configuration sample for Ampache.
If Ampache is served behind a reverse proxy using SSL, you will have to uncomment `fastcgi_param HTTPS on;` to prevent mixed content to be served.

```conf
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

    # Use secure SSL/TLS settings, see https://mozilla.github.io/server-side-tls/ssl-config-generator/
    # ssl_protocols TLSv1.2;
    # ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-E    CDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256';
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
    add_header Referrer-Policy "no-referrer";
    add_header Content-Security-Policy "script-src 'self' 'unsafe-inline' 'unsafe-eval'; frame-src 'self'; object-src 'self'";

    # Avoid information leak
    server_tokens off;
    fastcgi_hide_header X-Powered-By;

    root /path/to/ampache/root/directory;
    index index.php;

    # Somebody said this helps, in my setup it doesn't prevent temporary saving in files
    proxy_max_temp_file_size 0;

    # Rewrite rule for Subsonic backend
    if ( !-d $request_filename ) {
        rewrite ^/rest/(.*).view$ /rest/index.php?action=$1 last;
        rewrite ^/rest/fake/(.+)$ /play/$1 last;
    }

    # Rewrite rule for Channels
    if (!-d $request_filename){
      rewrite ^/channel/([0-9]+)/(.*)$ /channel/index.php?channel=$1&target=$2 last;
    }

    # Beautiful URL Rewriting
        rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&name=$5 last;
        rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&name=$6 last;
        rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&player=$6&name=$7 last;
        rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/bitrate/([0-9]+)/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&bitrate=$6player=$7&name=$8 last;
        rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/transcode_to/(w+)/bitrate/([0-9]+)/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&transcode_to=$6&bitrate=$7&player=$8&name=$9 last;
        rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/noscrobble/([0-1])/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&noscrobble=$6&name=$7 last;
        rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/noscrobble/([0-1])/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&noscrobble=$6&player=$7&name=$8 last;
        rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/noscrobble/([0-1])/bitrate/([0-9]+)/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&noscrobble=$6&bitrate=$7player=$8&name=$9 last;
        rewrite ^/play/ssid/(\w+)/type/(\w+)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/noscrobble/([0-1])/transcode_to/(w+)/bitrate/([0-9]+)/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&noscrobble=$6&transcode_to=$7&bitrate=$8&player=$9&name=$10 last;

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
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        # fastcgi_pass 127.0.0.1:8000/;
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

### Caddy

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

        r ^/play/ssid/(.*)/type/(.*)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/noscrobble/([0-1])/transcode_to/(w+)/bitrate/([0-9]+)/player/(.*)/name/(.*)$
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

Assuming your web stack is set up properly and you chose the standard web path, [this link](http://localhost/ampache/) should now take you to the first step of the online installer. If you set things up in a non-standard way, navigate to your chosen install root manually.

Any potential problems with your PHP installation should show up on this initial page.

![Installation screenshot](/img/ampache_installation_01.png)

Select a language and press "Start Configuration".

![Installation screenshot](/img/ampache_installation_02.png)

Check all errors and warnings about your environment.

![Installation screenshot](/img/ampache_installation_03.png)

Fill out the form with the database information.

![Installation screenshot](/img/ampache_installation_04-1.png)
![Installation screenshot](/img/ampache_installation_04-2.png)

Fill out the form with the configuration information if needed (blank database password are not accepted). If PHP is able to write to the config/ directory, you will be able to write out the config file directly from this page. If not, or if you just prefer to do it manually, show File Insight and select "Download" and then copy it into the config/ directory manually.
You also define on this screen the general Ampache behavior (installation type, transcoding default settings and player backends to enable) ; if you don't know about this at this stage, you can change this settings later in ampache.cfg.php and Ampache preferences.

![Installation screenshot](/img/ampache_installation_05.png)

The final step of installation is to create the initial administrative user.

## Post Installation Tasks

You might want to look at Ampache config file in ```config/ampache.cfg.php.dist```. There are many options available that allow you to customize and change almost every feature available.

Make sure you check out [Basic Configuration](/docs/configuration) before you dive in!
