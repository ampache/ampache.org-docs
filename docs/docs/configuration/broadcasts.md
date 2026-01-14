---
title: "Broadcasts"
metaTitle: "Broadcasts"
description: "Ampache Broadcasts"
---

Broadcast what you're currently playing in your web player to other users.

## How it works

When you choose to become a broadcaster, all web player events (song change, position, play, pause ...) are transmitted to the web socket server which redistribute the information to listeners.
Listeners cannot interact with their web player which is controlled according to what you're doing on your side. This ensures connected listeners are playing the same music at the same time than you.

## Prerequisites

* [libevent](http://php.net/manual/fr/book.libevent.php)

## Apache configuration

Apache doesn't support WebSocket by default and a proxy is needed. For WebSocket connections, proxy mod is not enough and proxy_wstunnel mod is required. Be aware that proxy_wstunnel module isn't available by default on Apache 2.2 on most distribution. Apache >= 2.4 is recommended.

Enable proxy_wstunnel module then add this to your vhost:

```AmpacheConf
ProxyPass /ws ws://127.0.0.1:8100 retry=0
ProxyPassReverse /ws ws://127.0.0.1:8100 retry=0
ProxyRequests off
ProxyTimeout 15
```

You can also temporary open the binding port (8100 here) to internet access and use it directly, but it will not pass most http proxy.

## General configuration

See [socketo.me](http://socketo.me/docs/deploy#serverconfiguration)

### Ampache settings

In config/ampache.cfg.php change the following settings:

```INI
broadcast = true
websocket_address = "ws://localhost/ws"
```

### Run

#### Linux

`php bin/websocket_run.inc -p 8100 > /dev/null &`

#### Windows

`php bin\websocket_run.inc -p 8100 > nul &`
