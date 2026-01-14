---
title: "Ampache7 client structure"
metaTitle: "Ampache7 client structure"
description: "Ampache7 client structure"
---

## Ampache7 client structure install type

Do you like Ampache but hate the UI? (First, ouch!)

Ampache has always encouraged API clients and will one day support the removal of the main interface entirely.

We've created a new release type for Ampache7 ([client7](https://github.com/ampache/ampache/tree/client7)) that allows you to put your client in the root of the public folder and hide Ampache in a subfolder. (currently `/client`)

We still have to include some of the content in the base folder so hopefully your client can make sure you don't overwrite these folders.

![image](https://github.com/user-attachments/assets/e5226393-4f9e-4139-8776-22302a087c7d)

When you have installed this version you still need to install your chosen client.

A script installer will be created for the most commonly used clients like ample but for now you'll need to know enough to do this manually.

## Install steps

Follow the normal Ampache install process but remember that the base Ampache url is `http://hostname/client` for the web interface

![image](https://github.com/user-attachments/assets/08b62aac-ead2-4a47-b7a3-ee824faf5f04)

When you have installed and configured you can install your API client

Configure that and you're ready to go!

![image](https://github.com/user-attachments/assets/032ee80c-570b-4e28-887a-df7ee64cac60)
