---
title: "Rewrite Rules"
metaTitle: "Rewrite Rules"
description: "How URL rewriting works in Ampache and how to configure it for your webserver"
---

## Rewrite Rules

Ampache needs your webserver to rewrite some URLs before they reach PHP.

If rewriting is not set up, parts of Ampache return **404 Not Found** even though the install is otherwise fine.

This trips a lot of people up, because the web interface mostly works without it and only some features break.

## What rewriting actually does

Ampache serves some things from URLs that do not match a real file on disk.

A Subsonic client might ask for this.

```text
/rest/ping.view
```

There is no file called `ping.view` anywhere in Ampache.

A rewrite rule tells the webserver to quietly hand that request to a file that does exist.

```text
/rest/index.php?ssaction=ping
```

The client never sees the difference, it just gets its answer.

Without the rule the webserver looks for a file named `ping.view`, does not find one, and returns 404.

## What breaks without it

Three parts of Ampache depend on rewriting.

| Path | Used by | Symptom when rewriting is missing |
|---|---|---|
| `/rest/` | Subsonic and OpenSubsonic clients, and the Ampache REST API | Every client request returns 404, login usually fails outright |
| `/play/` | Streaming and downloads | Browsing works, but nothing plays |
| `/` | A few redirects and security filters | Mostly cosmetic, some bot and query filtering stops working |

**NOTE** The REST API added in Ampache8 lives under `/rest/` too, so it needs the same rules as Subsonic.

If your Subsonic clients work but the REST API 404s, your `/rest/` rules are out of date rather than missing.

## Where the rules live

Ampache ships the rules it needs, so you rarely have to write any yourself.

| File | Covers |
|---|---|
| [public/.htaccess.dist](https://github.com/ampache/ampache/blob/develop/public/.htaccess.dist) | The web root, redirects and optional bot filtering |
| [public/play/.htaccess.dist](https://github.com/ampache/ampache/blob/develop/public/play/.htaccess.dist) | Streaming and art URLs |
| [public/rest/.htaccess.dist](https://github.com/ampache/ampache/blob/develop/public/rest/.htaccess.dist) | Subsonic, OpenSubsonic and the REST API |
| [docs/examples/nginx-site.conf](https://github.com/ampache/ampache/blob/develop/docs/examples/nginx-site.conf) | The same rules written for nginx |

The `.dist` files are templates.

The installer copies each one to the same name without `.dist`, which is the file your webserver actually reads.

## Apache

Apache reads rules from `.htaccess` files, but only if you let it.

Enable `mod_rewrite` first.

```shell
sudo a2enmod rewrite
sudo systemctl restart apache2
```

Check it is loaded.

```shell
sudo apache2ctl -M | grep rewrite
```

You should see `rewrite_module (shared)`.

Then allow `.htaccess` files to override configuration, in your site config such as `/etc/apache2/sites-enabled/000-default.conf`.

```apache
<Directory /var/www/ampache/public>
    Options FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

Restart Apache after changing the site config.

`AllowOverride All` is the setting people miss most often.

With `AllowOverride None`, Apache reads no `.htaccess` file at all and silently ignores every rule in it.

### Creating the .htaccess files

The web installer offers to write the `play` and `rest` files for you, and it can fill in your web path while it does.

If you installed another way, or deleted them, generate the same two from the CLI.

```shell
php bin/cli htaccess -e
```

**NOTE** Neither the installer nor that command touches the web root file, so copy that one yourself.

```shell
cp public/.htaccess.dist public/.htaccess
```

You can copy all three by hand instead if you prefer.

```shell
cp public/.htaccess.dist public/.htaccess
cp public/play/.htaccess.dist public/play/.htaccess
cp public/rest/.htaccess.dist public/rest/.htaccess
```

**NOTE** If Ampache runs in a subdirectory such as `/ampache/`, edit the paths inside these files to match.

A rule pointing at `/rest/index.php` has to become `/ampache/rest/index.php`.

## nginx

nginx does not read `.htaccess` files at all, so the shipped files do nothing for you.

The rules go directly in your site config instead.

Copy them from [docs/examples/nginx-site.conf](https://github.com/ampache/ampache/blob/develop/docs/examples/nginx-site.conf), which is a complete working server block.

The important parts are the `location /rest/` block and the `/play/` rewrites.

```nginx
location /rest/ {
    rewrite ^/rest/([^/]+)\.view$ /rest/index.php?ssaction=$1 last;
    rewrite ^/rest/fake/(.+)$ /play/$1 last;
}
```

That example file is kept in sync with the Apache rules.

When you upgrade Ampache and REST paths change, re-check it against your config.

**NOTE** The nginx rules mirror `public/rest/.htaccess.dist`, so if you have customised either one, keep both in step.

## Other webservers

Ampache works behind other webservers, but you have to translate the rules yourself.

Read `public/rest/.htaccess.dist` and `public/play/.htaccess.dist` and reproduce them in your server's own syntax.

Community guides for IIS and other setups are under [Installation Guides](/docs/installation/guides/).

## Checking it works

Ask the server for a URL that only exists through rewriting.

```shell
curl -i 'http://your-server/rest/ping.view?u=user&p=password&v=1.16.1&c=test&f=json'
```

A working setup returns `200` and a small JSON body containing `"status": "ok"`.

A missing rewrite returns `404`, usually with your webserver's own error page rather than anything from Ampache.

Test streaming separately, since it uses different rules.

Play a song in the web interface and confirm audio actually starts.

## Common problems

**Everything 404s under `/rest/`.**

Rewriting is off, or `.htaccess` is being ignored. Check `mod_rewrite` and `AllowOverride All`.

**Subsonic works but the REST API does not.**

Your `public/rest/.htaccess` predates Ampache8. Regenerate it with `bin/cli htaccess -e`.

**Browsing works but nothing plays.**

`public/play/.htaccess` is missing or the paths inside it do not match your install directory.

**It broke after moving Ampache into a subdirectory.**

The rules use absolute paths. Update every path inside the `.htaccess` files, and set `web_path` in `ampache.cfg.php`.

**nginx ignores everything you do.**

Confirm you are editing the site config that is actually enabled, and reload nginx afterwards.

```shell
sudo nginx -t && sudo systemctl reload nginx
```

Turning on rewrite logging is the fastest way to see what the server is really doing with a request.

For Apache, raise `LogLevel` to `alert rewrite:trace3`; for nginx, uncomment `rewrite_log on;` in the example config.
