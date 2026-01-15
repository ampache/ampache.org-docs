---
title: "Podcasts"
metaTitle: "Podcasts"
description: "Ampache Podcasts"
---

## Subscribe Configuration

Subscribe to external podcasts and automatically retrieve new episodes when available.

* Enable podcast in `ampache.cfg.php` by setting `podcast` to `true`. (Don't forget to remove the `;`)
![image](/img/1305249/135967381-0443dec9-f19e-46a1-80cf-da7d032e51f4.png)

* In Ampache, setup your system preferences (in Admin > Server config > System > Podcast) for episodes to download when new episodes are available and latest episodes to keep.

* Create a new local catalog **of type podcast**. Podcast episodes will be download into this catalog directory. Thus, the path to this catalog **must be writable by the PHP user**.

* Subscribe to your podcasts. The episodes will be downloaded automatically at catalog update, or manually when using the "sync" action on targeted episodes.

## Provide podcasts

Artists, albums and subscribed podcasts can be exposed as a new podcast feed.
You just have to enable `use_rss` feature on ampache.cfg.php

## Automatic Podcast Catalog Updates

This command can be used to update and download new episodes for my podcasts catalog, when I created the catalog I named it podcasts.
Also user www-data owns the files and is the user that the php process runs as on my server, adjust your username and podcast name as necessary.

`sudo -u www-data php /var/www/ampache/bin/cli run:updateCatalog podcasts -a`

The above command is how to do it manually, now we take this command and work it into a cron job.
This cron job will run once a day at 1am, and any new episodes will download automatically.

`sudo echo "0 1   * * *  www-data  php /var/www/ampache/bin/cli run:updateCatalog podcasts -a >/dev/null 2>&1" > /etc/cron.d/ampache`
