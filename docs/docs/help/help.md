---
title: "Help"
metaTitle: "Help"
description: "Troubleshooting"
---

## Ask people for help

* [Telegram Channel](https://t.me/ampache)
* [Reddit – r/ampache community](https://www.reddit.com/r/ampache)
* GitHub: Submit a [new issue](https://github.com/ampache/ampache/issues/new)

* Old and inactive groups. These are historical groups that are not actively used
  * IRC: #ampache on [webchat.freenode.net](https://webchat.freenode.net/#ampache)
  * Google Groups: [Ampache](https://groups.google.com/forum/#!forum/ampache)

## Ask Ampache for help

### Enable Logging

Ampache has extensive logging that is disabled in the default configuration, but is very helpful when you encounter issues.

To set up logging, you should modify three variables in config/ampache.cfg.php:

```INI
debug = "true"
debug_level = 5
; (for Windows: C:\log\ampache)
log_path = /var/log/ampache
```

The directory specified by log_path must already exist and be writable by PHP; Ampache will not attempt to create the directory.
