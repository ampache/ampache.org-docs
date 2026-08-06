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
| `/` | A few redirects, and the rules that keep private files out of the web root | Bot and query filtering stops working, and `config`, `src` and `vendor` are served if they sit in your web root |

**NOTE** The REST API added in Ampache8 lives under `/rest/` too, so it needs the same rules as Subsonic.

If your Subsonic clients work but the REST API 404s, your `/rest/` rules are out of date rather than missing.

## Where the rules live

Ampache ships the rules it needs, so you rarely have to write any yourself.

| File | Covers |
|---|---|
| [public/.htaccess.dist](https://github.com/ampache/ampache/blob/develop/public/.htaccess.dist) | The web root, redirects, private file blocking and optional bot filtering |
| [public/play/.htaccess.dist](https://github.com/ampache/ampache/blob/develop/public/play/.htaccess.dist) | Streaming and art URLs |
| [public/rest/.htaccess.dist](https://github.com/ampache/ampache/blob/develop/public/rest/.htaccess.dist) | Subsonic, OpenSubsonic and the REST API |
| [docs/examples/apache-site.conf](https://github.com/ampache/ampache/blob/develop/docs/examples/apache-site.conf) | A complete Apache vhost, for running with `AllowOverride None` |
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
php bin/installer htaccess -e
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

## Keeping private files out of the web root

The same rules do a second job: refusing requests for files that are none of a visitor's business.

How much this matters depends on which layout you installed.

| Layout | Web root | What sits in it |
|---|---|---|
| git checkout, or `composer install` | `/path/to/ampache/public` | Only files meant to be served. `config`, `src` and `vendor` are one level above it and unreachable |
| release zip (squashed) | `/path/to/ampache` | The whole install, so `config/`, `src/`, `vendor/`, `bin/` and `composer.json` are siblings of `index.php` |

On the release zip layout, a request for `/config/ampache.cfg.php` reaches a real file on disk.

PHP is what stops it being readable: the config starts with `;#<?php exit(); ?>##`, so PHP runs it and exits before printing anything.

That protection lasts exactly as long as PHP keeps handling `.php` files in that directory.

A misconfigured vhost, a disabled PHP module during an upgrade, or an editor backup at `ampache.cfg.php.bak` all leave your database password readable over HTTP.

`public/.htaccess.dist` refuses the lot, whichever layout you use.

* The directories `bin`, `config`, `docker`, `docs`, `locale`, `node_modules`, `resources`, `src`, `tests` and `vendor`
* Dotted paths at any depth, such as `.git`, `.env` and `.idea`
* `composer.json`, `composer.lock`, `package.json`, `phpunit.xml`, `rector.php` and `vite.config.js`
* Backup and editor leftovers: `.bak`, `.old`, `.orig`, `.save`, `.swp`, `.sql`, `.log`, `.dist` and friends
* Anything named `*.cfg.php`, from a rule that works without `mod_rewrite`

`/.well-known/acme-challenge/` is deliberately left reachable, so certbot can still renew your certificate.

**NOTE** These rules are new in Ampache8 and live in the web root file, which no installer or CLI command writes for you.

```shell
cp public/.htaccess.dist public/.htaccess
```

Upgrading from an older Ampache without doing that leaves you on your previous rules.

If you run Apache with `AllowOverride None`, no `.htaccess` file is read at all, so put the equivalent blocks in your vhost instead.

[docs/examples/apache-site.conf](https://github.com/ampache/ampache/blob/develop/docs/examples/apache-site.conf) is a complete vhost that already contains them.

nginx users get the same set from [docs/examples/nginx-site.conf](https://github.com/ampache/ampache/blob/develop/docs/examples/nginx-site.conf).

## Checking it works

Ask the server for a URL that only exists through rewriting.

```shell
curl -i 'http://your-server/rest/ping.view?u=user&p=password&v=1.16.1&c=test&f=json'
```

A working setup returns `200` and a small JSON body containing `"status": "ok"`.

A missing rewrite returns `404`, usually with your webserver's own error page rather than anything from Ampache.

Test streaming separately, since it uses different rules.

Play a song in the web interface and confirm audio actually starts.

Then check that the private paths are refused.

```shell
for path in /config/ampache.cfg.php /src/Config/Init.php /vendor/autoload.php /.git/config /composer.json; do
  printf '%-30s %s\n' "$path" "$(curl -s -o /dev/null -w '%{http_code}' "http://your-server$path")"
done
```

Every line should print `403`, or `404` if that path does not exist in your layout.

A `200` on any of them means the web root rules are not being read.

## Common problems

**Everything 404s under `/rest/`.**

Rewriting is off, or `.htaccess` is being ignored. Check `mod_rewrite` and `AllowOverride All`.

**Subsonic works but the REST API does not.**

Your `public/rest/.htaccess` predates Ampache8. Regenerate it with `bin/installer htaccess -e`.

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
