# Catalog

## Creating a Catalog

Catalogs are the core of Ampache. They are a logical container for all of your music files and other records. There are two main types of catalogs currently in Ampache, Remote and Local. [Remote catalogs](/docs/configuration/remote-catalogs) use the XML API and reference other Ampache servers. Local catalogs reference a base directory on the local file system of the server. To create your first Catalog login to Ampache as an administrator and go to the Admin Menu and click on _Add a Catalog_.

Starting with 3.7.0, Ampache now supports more Remote catalog types in addition to XML-RPC. You can use a SubSonic server, a Dropbox folder or your SoundCloud account as a remote catalog for Ampache.

## Local Catalog Settings

* **Path** - This is a directory located on the computer Ampache is running on. This can be a NFS mount, Windows Network drive etc. This is the full path, not a relative one.
* **File Pattern** - This defines the pattern that Ampache will use when attempting to read filenames for tag information, it also defines how Ampache will sort/rename files in this collection.
* **Path Pattern** - This defines the directory structure starting from the Path of the catalog up to the filenames, again used for tag information on read and sort/rename.
* **Album Art** - This option defines which methods to use when collecting Album Art, some methods may require additional configuration
* **Build Playlists from M3u's** - This options tells Ampache to look for .m3us in your catalog and attempts to parse and create playlists based on them.

## Maintaining a Catalog

Any administrator can maintain their catalog through either the web interface or the cli.
Below are a list of operations that can be performed on an existing catalog and how they behave.

* Add -- This looks for new files under the catalogs base path
* Verify -- This looks at existing files only and makes sure that the tags in the files are still accurate
* Clean -- This removes any orphaned artists,albums etc and also removes any songs that are no longer readable by ampache
* Update -- This performs a clean, then verify and lastly an Add. This is useful if you would like to do everything at once.
* Gather Art -- This looks for album art from all of the locations in config/ampache.cfg.php

### CLI

> Note: This section is dated. Run `run:updateCatalog --help` for up-to-date parameter information.

You can alternatively maintain an existing catalog through the command line interface,
providing different arguments for different operations.
For instance, if you've recently added another artist's songs to your database, then running only an 'add' function on the database is going to be far faster.
These arguments are -c, -v, -a and -g.
The order that this is performed in is always the same:

* Clean
* Verify
* Add
* Gather Art

This is intentional as you don't want to run a verify on files that are going to be deleted right after
and you don't want to run a verify on the files that just now got added because they're still accurate.

It is recommended to run the command line with the user running your web server (www-data for instance).

Commands can be joined into a single argument.
This example will clean deleted files, add new ones and gather the art for these new files on a single catalog called music.

``` shell
sudo -u www-data php -f /var/www/ampache/bin/cli run:updateCatalog music -cage
```

## Troubleshooting a Catalog Build

**Always Enable [Logging](/docs/information/troubleshooting/#enable-logging) when troubleshooting your catalog**

Ampache's catalog builds are done in such a way that even if it breaks in the middle of any one of the operations your Catalog is still perfectly intact. So, even if you encounter an error do not worry! If you are having trouble getting your tags recognized correctly by Ampache, or are confused as to why Ampache interrupted something as it did visit ~~Tag Reading / Meta Information  MISSING~~. The three most common causes of issues during a catalog build are:

### Permissions

Ampache must have Read access to all the files in the catalog, and Read+Execute to all the directories. If you run into issues where Ampache is saying it is unable to read a file or directory please double check the file permissions. The below two commands will set the correct file permissions for your files and directories. It is very important that you cd to the base of your MP3s first as these commands start at your current directory and recursively change permissions. Please note that these below commands cannot be ran in a Windows environment.

`chmod -R u+rwX,go+rX /path/to/your/catalog/*`

Make sure the [PHP's Open Basedir](http://php.oregonstate.edu/manual/en/features.safe-mode.php#ini.open-basedir) isn't set, or if it is it includes the directory of your music. Also make sure that there is not a specific deny listed in your IIS/Apache config prohibiting the script from opening the directory with your music.

For mount points you should make sure that the user / group that your webserver is running as has read access to the mount, and that the mount is using the correct character set. Something like

`mount -t smbfs //[computername or IP]/share  /media/Storage -o uid=username,gid=users -o iocharset=utf`

For windows network drives you will need to make sure that the user that apache is running as is the exact same user that is mounting the network drive, and has sufficient privileges to read the network drive and the files it contains.

Also note that selinux may default to not allowing apache to read cifs or nfs mounts. See the man pages for booleans(8), getsebool(8), and setseool(8). Selinux should log the violations to the system log (/var/log/messages usually).

### Windows Permissions

Accessing shared folders and drives is possible, but requires a little work to get going. Here are the things you need to watch out for:

* Make sure that your Apache service is running as user and not SYSTEM. The user you specify must be a user that has access to the files and directories you want to add.
  * In Windows, open the Service panel, click Start >  Settings >  Control Panel >  Administrative Tools >  Services.
  * On the Services panel, select the Apache service, right click, and select Properties
  * Select the Log On tab. Change This account field with your changed log on ID. If you use Windows domain or Active Directory active, change this log on to \<domain>\\\<account>. For example, mydoman\myaccount. Enter the password is you have changed the password. Click Enable and then OK.
* When adding your new catalog, make sure to use UNC paths with extra slashes as shown in this example: `\\192.168.0.1\folder\folder`
  * Many users have reported issues with catalogs stored on a UNC path, for this reason it is recommended that you map the network resource to a drive letter as shown in [microsoft.com](http://support.microsoft.com/kb/308582).

### Damaged Files

Getid3() should never take up more then 32MB of ram if it is working correctly, however every now and then it stumbles upon a file it can't parse correctly and uses a very large amount of Ram, and appears to hang the catalog process. The only way to solve this is to either re-encode/re-tagging the file in question or simply remove it from your collection. To figure out which file is causing the problem [enable logging](/docs/information/troubleshooting/#enable-logging) and look for the last file processed.

You can also use a variety of external tools to automatically check and repair your files.

### Invalid Characters in Filenames

As of 3.4-Beta2 Ampache forces the filenames of the files being added to the catalog to contain only characters from the character set defined in the _/config/ampache.cfg.php_ under site_charset. If some of your files are not cataloging correctly and are reporting a Charset error you can either rename them manually or use the provided script in /bin, **fix_filenames.inc**.

3.7.0 added a new optional setting lc_charset that allow you to define a local charset in use on your file system (mainly for Windows reasons). Ampache will try to convert lc_charset filename to site_charset automatically. Be aware that this could result to symbol noise if the conversion fail.
