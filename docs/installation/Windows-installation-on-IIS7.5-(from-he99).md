# Windows-installation-on-IIS

Cloned from he99's guide: [github.com/he99](https://github.com/he99/ampache/wiki/Windows-installation-on-IIS7.5)

This page shows the steps needed to install Ampache on IIS7.5 (Server 2008R2) in a subdirectoy of "Default Website".

**WARNING**: This is my first installation of Ampache, most stuff I wanted is working * but likely not everything.

## What works

Everything I need, especially:

* Web interface and web music player
* The Subsonic API, i.e. mobile applications using this interface
* also works for Ampache V5 (there are some notes below on the differences)

## What did/does not work (so far)

* Streaming Radio stations only work with mp3 streams (m3u playlists don't work, this is an already known issue, see [issue 1313](https://github.com/ampache/ampache/issues/1313)
* ~Initial catalog creation did not work because the IIS process was not able to access my media folders. Adding the catalog had to be done manually (accessing the database)~ Was fixed by allowing the local IUSR account to read my media folders (see [Configure IIS Folder Security](https://github.com/he99/ampache/wiki/Windows-installation-on-IIS7.5#configure-iis-folder-security)).
* ~Catalog scanning seemed not to work, so I used the command line utilities~ (turned out that I simply did not wait long enough, scanning large media folders can take quite some time)

## Prerequisites

* IIS7.5 installed (IIS was already installed/running on my 2008R2 server)
* Git, composer etc. installed (only required if you want to clone and build Ampache as described in the manual at [installation](https://github.com/ampache/ampache/wiki/Installation).
* MySQL or MariaDB installed (I've used MariaDB 10.4 x64)

## Installation steps

Main steps are:

* Install IIS and required addons
* Clone/install and configure Ampache
* Configure IIS folder security
* Configure IIS rewriting
* Configure scheduled tasks

### Install IIS modules

I've used the "Web Plattform Installer" (WebPI) to install the following modules

* PHP 7.4.1
* URL Rewrite V2.1

As I had already installed another PHP version on the server, I've also installed PHPManager V2.4 from [phpmanager](https://github.com/phpmanager/phpmanager). At the first run it showed a few suggestions * I followed them all.

![PHPManager](https://github.com/ampache/ampache/assets/5735900/537dc01b-d63f-4c79-a467-5f4ba5f0f7b5)

### Clone/install and configure Ampache

I've installed Ampache into the "Default Website" into the virtual subfolder "ampache". This is done by "Add Virtual Folder", name it "ampache" and specify the physical path (I've used the default `C:\inetpub\wwwroot\ampache` * for Ampache V5, use `C:\inetpub\wwwroot\ampache\public` instead due to the changed webroot).

Then do the following in a command shell:

```shell
cd C:\inetpub\wwwroot
git clone https://github.com/ampache/ampache.git ampache
cd ampache
composer install --prefer-source --no-interaction
```

To enable the charts, an additional install step is needed see [Chart FAQ](https://github.com/ampache/ampache/wiki/chart-faq):

```shell
composer require szymach/c-pchart "2.*"
```

For whatever reason (likely file access), I could not get the Web-based Installer to successfull write the config file, so I changed the relevant settings manually: rename `config\ampache.cfg.php.dist` to `config\ampache.cfg.php` and edit it.

I had to change the following to make Ampache run correctly from the `http://<server>/ampache` subfolder:

```conf
web_path = "/ampache"
local_web_path = "http://localhost/ampache"
```

Other required changes are obviously the database connection:

```conf
database_username = <myusername>
database_password = <mypassword>
```

Other changes for debugging (temporarily):

```conf
debug="true"
log_path="C:\inetpub\logs\ampache"
```

I left everything else at the default values.

### Configure IIS folder security

See [stackoverflow](https://stackoverflow.com/questions/14934006/iis-iusrs-and-iusr-permissions-in-iis8)

To allow Ampache to access the media folders, add an ACL allowing read access for the local IUSR account.

Here is as sample from my machine (make sure to search on the local system for the IUSR account and not in the Domain):

![IUSR folder security](https://github.com/ampache/ampache/assets/5735900/982e01de-bb1b-4b91-8b2f-4ec543a04590)

### Configure IIS rewriting

This was kind of tricky as IIS URL Rewrite rules can be applied to a folder and will then only see the relative URL (i.e. folder prefix stripped of). Here are some helpful resources:

* `https://blog.lextudio.com/the-very-common-mistakes-when-using-iis-url-rewrite-module-a2ab7e4fee59`
* `https://docs.microsoft.com/en-us/iis/extensions/url-rewrite-module/testing-rewrite-rule-patterns`

I've also enabled Failed Request tracking (see [docs.microsoft.com](https://docs.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-failed-request-tracing-to-trace-rewrite-rules)) to actually see what IIS comes up with.

The only rewrite rule I've implemented is for the `ampache/rest` folder * this is required to make Subsonic clients work. The directory has a sample .htaccess.dist file, which I've converted to an IIS rule as follows (I've got some hints from [groups.google.com](https://groups.google.com/forum/#!topicsearchin/ampache/subject$3Aiis/ampache/TIkvVFG3GRU)):

1. In IIS, go to the `ampache` virtual directory and open "URL rewrite". Click `Add rule` and select the `Blank rule` from the `Inbound rules` section.
2. Add the following pattern ("Match Pattern" using "Regex")

    `rest/(.+).view$`

3. Add File/Directory conditions (see below, I've added that from the .htaccess)
4. Under Action select `Rewrite` for the action type and enter the following URL:

    `/ampache/rest/index.php?ssaction={R:1}`

Make sure to enable "Add query string" and optionally check "Log rewritten URL".

![rules](https://github.com/ampache/ampache/assets/5735900/d2b9d962-b6b9-4931-9a24-06eb8b8cd853)

![actions](https://github.com/ampache/ampache/assets/5735900/a7e4ced0-b100-45b3-a14d-5d0f4fa26910)

You can use the following to test the pattern (note that the input data should be relative to the current rules directory) * important is that `{R:1}` results in **only** the `ping` command:

![IIS Test pattern](https://github.com/ampache/ampache/assets/5735900/e0bb194e-ce5a-441d-992a-205e5d44e55e)

### Configure scheduled tasks

tbd.

## Todo/open issues

* To add a catalog, IIS needs read access * file system security must be changed accordingly
* Catalog indexing seems to not work from within ampache (requires scheduled task?). As a workaround, run the following commands from a shell:

```shell
cd C:\inetpub\wwwroot\ampache\bin
php catalog_update.inc
```

Unfortunately this still does not pick up all music files * but might also be related to my music not correctly be tagged.

Alternatively you can run a add, update, gather art as follows

```shell
php -f /var/www/ampache/bin/catalog_update.inc -* -cag
```
