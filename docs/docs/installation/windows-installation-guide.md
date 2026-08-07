---
title: "Windows Installation Guide"
metaTitle: "Windows Installation Guide"
description: "Windows Installation Guide"
---

## Windows Installation Guide

This guide covers getting Ampache up and running on a Windows system. It is intended for users who have not been introduced to the technologies used to run Ampache.

**NOTE** this guide used to be built around the Bitnami WAMP stack installer. Bitnami discontinued all of its native installers in November 2022, so that route is gone. The options below replace it.

## Pick your approach

| Approach | Effort | Good for |
| --- | --- | --- |
| [Docker Desktop](#docker-desktop) | Lowest | Just wanting a working server on your PC |
| [XAMPP](/docs/installation/guides/tutorial-to-install-ampache-on-xampp) | Low | A quick local test install |
| [Apache + PHP + MariaDB by hand](#manual-wamp-stack) | Higher | A real server you control every part of |
| [IIS](/docs/installation/guides/windows-installation-on-iis7.5-from-he99) | Higher | Windows Server where IIS is already running |

Whichever you choose, Ampache8 needs **PHP 8.5**. Ampache7 runs on PHP 7.4 to 8.4. Check what your stack ships before you download Ampache.

## Docker Desktop

If you only want a working Ampache, this is by far the shortest path. [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/) runs the official image, which brings its own Apache, PHP and MariaDB, and upgrades are a new image pull.

```shell
docker run --name=ampache -d -v D:\Music:/media:ro -p 80:80 ampache/ampache
```

Then open `http://localhost/` and follow the installer. Everything about the images — persistent volumes, automated install, environment variables — is on the [Docker](/docker) page.

## Overview of the parts

Below is a quick overview of the different components to running Ampache on Windows. If you are already familiar with these, you can skip to [Manual WAMP stack](#manual-wamp-stack).

### WAMP

WAMP stands for Windows, Apache, MySQL, and PHP. The latter 3 are all required for running Ampache. When using the acronym "WAMP" you are referring to what's called a "stack" - or a group of software required for a specific goal. In this case, to run Ampache.

### Apache

Apache (not to be confused with _Ampache_) is what's called a webserver. It's function is to serve webpages via the web browser. Apache will read the files provided by Ampache, process them, and send you the result in your browser.

### MySQL / MariaDB

MySQL is a database. It stores data associated with your Ampache installation such as your user account, preferences, music, album art, etc. All of the music displayed by Ampache is read from the database. MariaDB is a drop-in replacement for MySQL and is what most people run now.

### PHP

Finally, PHP ties everything together. PHP is a scripting language for servers. It allows the Apache webserver to communicate with the MySQL database, using the PHP code within the Ampache files.

## Manual WAMP stack

### Download the pieces

1. **Apache** — Windows builds come from [Apache Lounge](https://www.apachelounge.com/download/). Take the current VS17 x64 zip
2. **PHP 8.5** — from [windows.php.net](https://windows.php.net/download/). You need the **Thread Safe** (TS) x64 build, because that is the one with `php8apache2_4.dll` for Apache
3. **MariaDB** — the MSI installer from [mariadb.org/download](https://mariadb.org/download/). Set a root password during the install and remember it
4. **Ampache** — the `ampache-%VERSION%_php8.5.zip` release from [the releases page](https://github.com/ampache/ampache/releases). This one already contains the composer and npm packages, so you do not need Composer or Node.js at all ([Which zip?](/docs/information/which-zip))

Unzip Apache to `C:\Apache24`, PHP to `C:\php`, and Ampache to `C:\ampache`.

### Configure PHP

Copy `C:\php\php.ini-production` to `C:\php\php.ini`, open it in a text editor and set:

```ini
extension_dir = "C:\php\ext"
date.timezone = "Australia/Brisbane"
upload_max_filesize = 500M
post_max_size = 500M
memory_limit = 512M
```

Then uncomment (remove the leading `;` from) these extensions:

```ini
extension=curl
extension=fileinfo
extension=gd
extension=intl
extension=mbstring
extension=openssl
extension=pdo_mysql
extension=zip
```

Check it loaded everything:

```shell
C:\php\php.exe -m
```

### Configure Apache

In `C:\Apache24\conf\httpd.conf`, point the server at Ampache's `public` folder and load PHP:

```apache
DocumentRoot "C:/ampache/public"
<Directory "C:/ampache/public">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>

LoadModule rewrite_module modules/mod_rewrite.so

LoadModule php_module "C:/php/php8apache2_4.dll"
AddHandler application/x-httpd-php .php
PHPIniDir "C:/php"
```

`AllowOverride All` and `mod_rewrite` are both required — without them streaming, the Subsonic API and the REST API return 404. See [Rewrite Rules](/docs/installation/rewrite-rules).

Write out the `.htaccess` files Ampache needs:

```shell
cd C:\ampache
C:\php\php.exe bin/installer htaccess -e
```

Install Apache as a service and start it:

```shell
C:\Apache24\bin\httpd.exe -k install
C:\Apache24\bin\httpd.exe -k start
```

### Installing from git instead

A git checkout is easier to keep up to date, but you have to build the dependencies yourself. Install [Git](https://git-scm.com/download/win), [Composer](https://getcomposer.org/download/) and [Node.js](https://nodejs.org/) (`^20.19.0` or `>=22.12.0`), then:

```shell
git clone -b develop https://github.com/ampache/ampache.git C:\ampache
cd C:\ampache
composer install --no-dev --prefer-dist --no-interaction
npm install
npm run build
```

`develop` is Ampache8. Use `-b release7` for Ampache7.

## Initial Ampache Set-Up

Now, fire up your favorite web browser and navigate to `http://localhost/`. If your document root is the Ampache project folder rather than its `public` subfolder, use `http://localhost/public/install.php`.

### Choose Installation Language

If you plan on installing in a language other than English do so now. Otherwise hit **Start Configuration**

### Requirements

Assuming you have followed the guide exactly, you should see a page full of green boxes with "OK". Anything red is usually an extension still commented out in `php.ini`. You are good to press **Continue**

### Insert Ampache Database

On this step, Ampache will create the database with all the required information.

1. Enter `root` and the **MySQL Administrative Password** that you set up during the MariaDB install
2. Tick **Create Database User** and give the Ampache database user its own username and password (not the root one)
3. Proceed by pressing **Insert Database**

### Generate Config File

The options on this page build `config/ampache.cfg.php`. If you want [transcoding](/docs/configuration/transcoding), you need `ffmpeg.exe` on the machine ([gyan.dev](https://www.gyan.dev/ffmpeg/builds/) publishes Windows builds) and its path set here. Otherwise the defaults are fine — click **Create Config**.

If PHP cannot write to `C:\ampache\config`, the page offers the file as a download instead. Save it into that folder yourself and continue.

### Create Admin Account

On this page simply fill in the username and password you would like to use with Ampache. Click **Create Account** when ready.

### Ampache Update

This is the last step, the database just needs to be updated to the current version. Click on **Update Now!** at the bottom of the page. Then you can click on **Return to main page**.

## Success

Congratulations! Now you have a working Ampache installation.

Next steps:

* [Create your first catalog](/docs/installation/catalog) — use the full path to your music, e.g. `D:\Music`
* Schedule the maintenance tasks with Task Scheduler; see [Cron](/docs/configuration/cron) for what needs running
* Read [Basic Configuration](/docs/configuration)
* Upgrading later is covered in [Upgrading](/docs/information/upgrade)
