---
title: "Windows Installation Guide"
metaTitle: "Windows Installation Guide"
description: "Windows Installation Guide"
---

This guide will cover a simple, quick method for getting Ampache up and running on a Windows system. This is intended for novice users who have not been introduced to the technologies used to run Ampache.

## Overview

Below is a quick overview of the different components to running Ampache on Windows. If you are already familiar with these, you can skip to [Installation](#installation).

### WAMP

WAMP stands for Windows, Apache, MySQL, and PHP. The latter 3 are all required for running Ampache. When using the acronym "WAMP" you are referring to what's called a "stack" - or a group of software required for a specific goal. In this case, to run Ampache.

### Windows

If you're reading this, hopefully at a minimum you know what Windows is. If you do not, Ampache may not be for you. The only thing Windows does in the stack, is provide the operating system for all the subsequent software to run on.

### Apache

Apache (not to be confused with _Ampache_) is what's called a webserver. It's function is to serve webpages via the web browser. Apache will read the files provided by Ampache, process them, and send you the result in your browser.

### MySQL

MySQL is a database. It stores data associated with your Ampache installation such as your user account, preferences, music, album art, etc. All of the music displayed by Ampache is read from the database.

### PHP

Finally, PHP ties everything together. PHP is a scripting language for servers. It allows the Apache webserver to communicate with the MySQL database, using the PHP code within the Ampache files.

## Installation

Getting Ampache to work requires you to download a few pieces of software.

### Bitnami WAMP Stack Installer

There are a few different software options for installing Apache, MySQL, and PHP. I picked the installer from Bitnami because I found the setup to be the easiest, and most secure by default.

#### Download WAMP

1. Navigate to `https://bitnami.com/stack/wamp/installer`
2. Scroll down and click the orange/yellow button, **Download for Windows 64-bit**
3. It will prompt to sign-in, just click on **No thanks, just take me to the download** at the bottom
4. Save anywhere on your computer

#### Install WAMP

1. Run the .exe that was downloaded
2. Click **Next** on the welcome page
3. Uncheck all boxes on the **Select Components** page. These are all unneeded. Click **Next**
4. Click **Next** on the installation folder page
5. Enter a password to use for the root (administrative) user for the database. Make sure to remember this later! Hit **Next**
6. Uncheck **Launch wampstack in the cloud with Bitnami**, and click **Next** twice to begin installing
7. During the install, make sure to **Allow Access** for Apache and MySQL.
8. When complete, hit **Finish**!

### Composer

Composer is required to setup some dependencies for Ampache. When run, it automatically downloads other software required for features of Ampache to work properly.

#### Download Composer

Navigate to `https://getcomposer.org/download/` and click the link for **Composer-Setup.exe**.

#### Install Composer

1. Run Composer-Setup.exe
2. Click **Next** at Installation Options
3. At the **Settings Check** page, we will need to specify the location of PHP.
    1. Click **Browse...**
    2. Navigate to "C:\Bitnami\wampstack-7.3.6-2\php"
        * You may have a different number than 7.3.6-2 depending on the version installed.
    3. Click on **php**, then **Open**, then **Next >**
4. Click **Next** on Proxy Settings, then **Install**
5. After loading bar finished, Click **Next** then **Finish**

### Ampache

Finally, we can download and "install" Ampache. There are a few options for downloading and installing Ampache, but in this guide we will be using Git, as that is the best way to keep your installation up-to-date.

Git is a popular version control system. Software downloaded from Git is stored in what's called a repository. When files are changed in the repository, Git will be able to pull only the changed files for far better efficiency than standard Zip downloads.

#### Installing Git

1. Navigate to Git's Windows Download page `https://git-scm.com/download/win` where it will download automatically, then run the installer
2. Click **Next** through all the screens as defaults should work fine.
3. Click **Finish** at the end.

#### Cloning Ampache

When downloading files using git, the initial download is called cloning.

1. First open up Explorer, and navigate to "C:\Bitnami\wampstack-\<your version\>\apache2\htdocs"
2. Select everything inside, and delete it
3. Press **Shift**, then right-click anywhere in the folder and select the option **Open PowerShell window here**
4. Lastly, we can download Ampache. There are two main versions you can choose from. Master is typically the most tested and stable version. Develop has the latest fixes and features. Develop is recommended as it is very stable, and receives fixes more quickly. Copy, then paste either command depending on which version you want into the blue window. Make sure to include the ending '.'
    * `git clone -b develop https://github.com/ampache/ampache.git .`
    * `git clone -b master https://github.com/ampache/ampache.git .`
5. Then hit **Enter**

#### Running Composer

The final step is to run Composer. This will download some other software needed for many of Ampache's functions.

Run this command in the PowerShell window the same as before:

* `composer install --prefer-source --no-interaction`

This will likely take some time, you may see some warnings about files not being up to date. These are safe to ignore.

From this point, Ampache is now completely installed, and ready to perform the setup

### Initial Ampache Set-Up

Now, fire up your favorite web browser and navigate to `http://localhost/public/install.php`.

#### Choose Installation Language

If you plan on installing in a language other than English do so now. Otherwise hit **Start Configuration**

#### Requirements

Assuming you have followed the guide exactly, you should see a page full of green boxes with "OK". You are good to press **Continue**

#### Insert Ampache Database

On this step, Ampache will create the database with all the required information.

1. The only thing to change is to enter the **MySQL Administrative Password** that you set up earlier for root.
2. Proceed by pressing **Insert Database**.

#### Generate Config File

The options on this page will help create the main Ampache configuration file. The following steps will show how to create an Ampache database user.

1. Login to phpMyAdmin
    1. Open a new tab, and go to `http://localhost/phpmyadmin`.
    2. Enter "root" for the username, and the same password you created earlier for the password.
    3. Click **Go**.
2. Create Ampache user
    1. On the main page, click on **User accounts**.
    2. Under the "New" section, click on **Add user account**.
    3. Fill in "Login Information:
        1. User name: Enter **ampache**.
        2. Host name: Select **local**, the field should now say "localhost".
        3. Password: Enter anything you want to use the password, this will be needed later.
        4. Re-type: Re-enter password from above.
    4. "Database for user account" section:
        1. Check **Create database with same name and grant all privileges.**
    5. Click **Go**
3. Navigate back to the Ampache install tab.

It should be okay to leave everything on this page at the defaults, but make sure to fill in **MySQL Password** with the one created for the Ampache user. Scroll down the page and click **Create config**.

#### Create Admin Account

On this page simply fill in the username and password you would like to use with Ampache. Click **Create Account** when ready.

#### Ampache Update

This is the last step, the database just needs to be updated to the current version. Click on **Update Now!** at the bottom of the page. Then you can click on **Return to main page**.

## Success

Congratulations! Now you have a working Ampache installation. Now is a good time to restart your computer, as the auto updating feature may not work properly. Then you may proceed to [creating your first catalog](/docs/installation/catalog).
