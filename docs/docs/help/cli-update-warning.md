---
title: "Use the CLI for large updates"
metaTitle: "Use the CLI for large updates"
description: "Use the CLI for large updates"
---

Sometimes we need to make a large change to the database that can affect the time it takes to complete the update.

The web interface can timeout and fail to complete the update.

That's why you might have seen a warning on the Web updater when a big update drops

![image](https://github.com/user-attachments/assets/df22e483-36b7-442e-82c4-f4bf7a757b06)

## Use the cli when upgrading

Very simply you can just call the updateDatabase command from the CLI and the updates will be done for you.

`php bin/cli admin:updateDatabase -e`

We recommend you create an update script for yourself which you can run when updating so you don't need to remember all these commands.

The [example](https://github.com/ampache/ampache/blob/develop/docs/examples/update_from_git.sh) script that I use to update my server in the docs folder.

If you use git I really recommend setting it up and integrating it into your processes.