---
title: "Upload Catalogs"
metaTitle: "Upload Catalogs"
description: "Managing Upload Catalogs"
---

## Set up your catalogs

First up you need to configure catalogs before you can accept uploads.

Check the wiki [Create a Catalog](/docs/installation/catalog) if you have any issues setting up catalogs.

## Configure the upload catalog

Now that you have a place for your uploads you need to configure an `upload_catalog`.

These are all system options which means that you can not set up individual upload_catalogs for each user.

To configure these settings, navigate to the `System` settings page `preferences.php?action=admin&tab=system`

![image](https://user-images.githubusercontent.com/1305249/205207875-f454f88a-8630-48b4-9991-7f77521655a1.png)

**NOTE** In Ampache7 this was changed to a per-user preference which is available from the options pages.

* Admin `preferences.php?action=admin&tab=options`
* User `preferences.php?tab=options`

![image](https://github.com/user-attachments/assets/91d89a83-17d4-406e-bf2c-e13e4bc0ea19)

Lets explain the settings:

* **Allow user uploads**
  * Enable or disable uploads
* **Allow users to edit uploaded songs**
  * Allow a user to edit their own uploads (Even if they don't have the user permissions)
* **Allow users to remove uploaded songs**
  * Same as Edit this will allow delete permissions for user uploads
* **Consider the user sender as the track's artist**
  * Ignore the tags or manual selection and set the user as the artist
* **Create a subdirectory per user**
  * When you upload a song it will be saved in a directory named after the user who uploaded it

![image](https://user-images.githubusercontent.com/1305249/205209152-9bdbb9fe-2e52-43e9-bfcc-cd3ed78d6bd1.png)

* **Destination catalog**
  * Which catalog is used for uploads? Must be a music folder
* **Post-upload script (current directory = upload target directory)**
  * Run a script from the server after each upload. (Probably shouldn't set this but it's available if you trust everyone)
* **Rename uploaded file according to catalog pattern**
  * This will use the song sorter to read file tags and name itself according to the file tags.
  * If Ampache can't replace all the variables it will be stored in the root directory (or user directory if configured)

![image](https://user-images.githubusercontent.com/1305249/205209531-022e2208-6a1a-437c-a901-4d22d2641f31.png)

## Errors

### Not Found: upload_catalog

This tells us that you haven't selected the catalog where the uploaded files will go.

![image](https://user-images.githubusercontent.com/1305249/205209866-6161eb65-2470-4c55-9fe1-ebf4a708a791.png)

Make sure you have selected a catalog in System preferences (`preferences.php?action=admin&tab=system`)

### Where are my files

As a User you can browse uploads (`stats.php?action=upload`) in 2 places.

On the main sidebar.

![image](https://user-images.githubusercontent.com/1305249/205215335-c7d067a0-9612-4767-a289-e9cfe4d251cd.png)

In the user preferences tab

![image](https://user-images.githubusercontent.com/1305249/205211002-fcf5f461-c710-45a9-9faa-7b7146d8d199.png)

As an Admin you can browse uploads for all users using `Browse Uploads` in the admin tab (Ampache Develop only)

![image](https://user-images.githubusercontent.com/1305249/205219681-1819349b-0380-4560-b733-41af65fc30b5.png)

### Uploads don't move to the right place

I've seen some bugs regarding the movement of files when you enable
 `Rename uploaded file according to catalog pattern`.
