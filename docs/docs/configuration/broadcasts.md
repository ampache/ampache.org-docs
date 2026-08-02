---
title: "Broadcasts"
metaTitle: "Broadcasts"
description: "Ampache Broadcasts"
---

Broadcast what you're currently playing in your web player to other users.

## How it works

When you choose to become a broadcaster, all web player events (song change, position, play, pause ...) are transmitted to the web socket server which redistributes the information to listeners.
Listeners cannot interact with their web player which is controlled according to what you're doing on your side. This ensures connected listeners are playing the same music at the same time as you.

Broadcasting is the one Ampache feature that needs a **second long-running process** as well as the web server. That is usually why it appears not to work: the interface is there, the browser tries to open a socket, nothing is listening, and nothing is reported on the page.

| Piece | What it does |
| --- | --- |
| The web server | serves Ampache as usual |
| `bin/cli run:websocket` | the websocket server the players connect to; must stay running |

## Ampache settings

In `config/ampache.cfg.php`:

```INI
broadcast = "true"
websocket_address = "ws://localhost:8100"
```

`broadcast` shows the feature in the interface. `websocket_address` is handed to the browser verbatim, so it must be an address the **browser** can reach — not one that only resolves on the server.

Its host is also checked on the server side. The websocket server takes the host out of `websocket_address` and refuses any connection whose browser `Origin` is a different host, answering `403 Forbidden`, and the browser reports nothing on the page when that happens. So the host in `websocket_address` must be the host people load Ampache from.

When `websocket_address` is left empty, Ampache falls back to `<scheme>://<server name>:8100`, choosing `wss` when your web path is an `https://` url and `ws` otherwise.

**`run:websocket` reads `websocket_address` once, at startup.** It is a long-running process, not a per-request script, so editing `ampache.cfg.php` has no effect on it until it is restarted. Its startup log line gives this away: it prints `Starting socket at <host>:<port>`, and if that host is `localhost` when you configured a real hostname, the process is still running with the old (or no) `websocket_address` — restart the service:

```shell
sudo systemctl restart ampache_websocket
```

A `localhost` host at startup also means the Origin check falls back to allowing only `localhost`/the origin passed to the socket, which real browser requests from your actual hostname will never match — so this specific misconfiguration produces exactly the silent `403`/connection-refused failure described above.

## Run the websocket server

```shell
bin/cli run:websocket           # listens on port 8100
bin/cli run:websocket -p 8888   # or a port of your choosing
```

It stays in the foreground and serves two routes: `/broadcast` (the feature) and `/echo` (a test endpoint). Leave it running — if it stops, broadcasts stop with it.

Do not confuse it with `bin/cli run:broadcast`, which sends a UPnP/DLNA discovery announcement and has nothing to do with this feature.

For a real installation, run it as a service. A systemd unit ships with Ampache in `docs/examples/ampache_websocket.service`:

```shell
sudo cp docs/examples/ampache_websocket.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now ampache_websocket
```

## HTTPS and reverse proxies

A site served over HTTPS may only open a `wss://` socket. Browsers block a plain `ws://` connection from an `https://` page as mixed content, and they do it silently in the page — you will only see it in the browser console.

The usual answer is to proxy a path on your existing HTTPS host to the websocket server, so no extra port is exposed and the existing certificate is reused:

```INI
websocket_address = "wss://music.example.org/websocket"
```

### Apache

Apache doesn't support WebSocket by default and a proxy is needed. For WebSocket connections, proxy mod is not enough and proxy_wstunnel mod is required. Be aware that proxy_wstunnel module isn't available by default on Apache 2.2 on most distributions. Apache >= 2.4 is recommended.

```shell
sudo a2enmod proxy proxy_http proxy_wstunnel
sudo systemctl restart apache2
```

Then add this inside the existing `<VirtualHost *:443>` block for your site (the one with the SSL certificate) — not a new vhost:

```AmpacheConf
<Location /websocket>
    ProxyPreserveHost On
    ProxyPass        ws://127.0.0.1:8100/ retry=0
    ProxyPassReverse ws://127.0.0.1:8100/
</Location>
ProxyRequests off
ProxyTimeout 3600
```

`ProxyPreserveHost On` is not optional here. Without it, Apache rewrites the `Host` header it sends to the backend to the backend's own address (`127.0.0.1:8100`) rather than forwarding the one the browser sent. Ratchet's router matches routes against the `Host` header (it only accepts the host `websocket_address` names — that's the same origin/host check described above), so a rewritten `Host` header makes every route, including `/echo`, 404. Scoping it to `<Location /websocket>` keeps it from affecting any other reverse proxies in the same vhost.

`ProxyTimeout` matters as much as the module: a broadcast connection sits idle between songs, and Apache's default proxy timeout is a few minutes — well short of that. Reload with `sudo apache2ctl configtest && sudo systemctl reload apache2`.

### nginx

```AmpacheConf
location /websocket/ {
    proxy_pass http://127.0.0.1:8100/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_read_timeout 3600s;
}
```

The `Upgrade` and `Connection` headers are the part that matters: without them the proxy answers the handshake as an ordinary HTTP request and the socket never opens. The long timeout matters too — a broadcast is an idle connection between songs, and a short timeout closes it mid-listen.

You can also temporarily open the binding port (8100 here) to internet access and use it directly, but it will not pass most http proxies.

## Using it

**To broadcast:** start playing something in the web player, then choose the broadcast control in the player. Ampache creates a broadcast and starts pushing the current song and position to it.

**To listen:** open **Broadcasts** in the sidebar and pick one. The list has **All** and **Live** views; a broadcast counts as live only while it is actually running. Your player then follows the broadcaster — the track and position are driven by them, not by you.

### Who can listen

A new broadcast requires the listener to have a valid session. A user who wants theirs open can turn off **Require a session to listen to my broadcasts** in their preferences; it applies to broadcasts created afterwards, and an existing one is changed with the *Authentication Required* checkbox on the Broadcasts browse, where they are also deleted.

## Checking it works

Work outward — each step rules out the one before it.

1. **Is the server up?** `bin/cli run:websocket -p 8100` should print `Starting socket at <host>:8100` and stay running.

2. **Is the port open on the server?**

    ```shell
    php -r '$c = @stream_socket_client("tcp://127.0.0.1:8100", $e, $s, 2); echo $c ? "open" : "closed: $s", PHP_EOL;'
    ```

3. **Does it actually speak what `websocket_address` promises?** A port being open doesn't mean it's serving the right protocol. `run:websocket` only ever speaks plain `ws://` — it has no TLS support — so a `websocket_address` of `wss://host:8100` (TLS straight to that port, no reverse proxy) will open the TCP connection and then hang or fail at the TLS handshake, which browsers report as a bare connection failure with no other detail. Tell the two apart from the server itself:

    ```shell
    # a TLS handshake here should print a certificate; if it just hangs/times out,
    # nothing on this port speaks TLS
    openssl s_client -connect music.example.org:8100 -servername music.example.org

    # a plain HTTP request here should get a 426 Upgrade Required from Ratchet;
    # if it does, the process is fine and the problem is purely wss vs ws
    curl -v http://music.example.org:8100/echo
    ```

    If `curl` succeeds but `openssl s_client` hangs, `websocket_address` is asking for TLS on a port that doesn't offer it — proxy a path on your existing HTTPS host instead (see above) rather than pointing at the raw port with `wss://`.

    **If you're proxying through your web server, a 404 through the proxy path that doesn't happen hitting the port directly usually means the `Host` header isn't being forwarded** (Apache without `ProxyPreserveHost On`, or an nginx `proxy_set_header Host` that names the wrong value). Ratchet's router matches on `Host`, so a rewritten header 404s *every* route, `/echo` included — a same-error-on-both-routes result points here before you suspect anything about `/broadcast` specifically.

4. **Is it reachable from the browser?** Open the browser console on any Ampache page:

    ```js
    var s = new WebSocket('ws://music.example.org:8100/echo');
    s.onopen  = () => console.log('websocket reachable');
    s.onerror = (e) => console.log('websocket failed', e);
    ```

    A failure here is a firewall, a proxy without the `Upgrade` headers, or a `ws://` address on an `https://` page.

    **`/echo` succeeding does not prove `/broadcast` will.** `/echo` accepts any origin; `/broadcast` only accepts the host `websocket_address` names. Repeat the check against the real route:

    ```js
    var b = new WebSocket('ws://music.example.org:8100/broadcast');
    b.onopen  = () => console.log('broadcast route ok');
    b.onerror = () => console.log('broadcast refused - origin/host mismatch?');
    ```

5. **Then try a broadcast** with two browsers — one broadcasting, one listening. The listener's player should change track when the broadcaster does.

## Known limitations

* The websocket server is a single process and holds every listener connection; it is not clustered.
* There is no reconnect: if the server restarts, listeners must rejoin. If the socket never connects in the first place, or drops mid-listen, the player falls back to normal local playback (transport controls come back) rather than staying stuck with them hidden — but it does not automatically rejoin the broadcast.
* A listener's browser must be able to reach the *stream* as well as the socket, so the same access rules as ordinary playback apply.
* The origin check is exact on the host, so an installation reachable under two names can only broadcast under the one `websocket_address` names.

## Troubleshooting a stuck-looking player

Before the fix described here, a listener whose socket failed to connect (wrong host, blocked port, service not running) was left with the transport controls (play/pause/next/stop, seek bar, playlist) hidden and nothing to unhide them — `startBroadcastListening()` hides them optimistically, expecting the socket to come up and drive playback itself. If it never does, the player looks "half loaded": no track, no controls, an unusable black box.

The listener-side player now attaches `onerror`/`onclose` handlers to the broadcast socket. A failed or dropped connection is logged to the browser console (`[broadcast] ...`) and restores the hidden controls so the player works normally — it just won't follow the broadcaster anymore. Malformed `SONG` payloads are also caught and logged instead of throwing and silently breaking the message loop.

If you still see a broken player, check the browser console first — the failure is now always logged there.
