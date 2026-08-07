---
title: "Install Ampache on Xampp"
metaTitle: "Install Ampache on Xampp"
description: "Install Ampache on Xampp"
---

## Install Ampache on Xampp

[XAMPP](https://www.apachefriends.org/download.html) bundles Apache, MariaDB and PHP in one installer, which makes it a quick way to get a local Ampache going for testing.

**Check the PHP version first.** Each XAMPP download is tied to a PHP version, and Ampache8 requires **PHP 8.5**. If the XAMPP build you have is older, either grab a newer one or install [Ampache7](/docs/information/upgrade) (PHP 7.4 to 8.4) instead. The XAMPP control panel shows the version, or run `php -v` from the XAMPP shell.

1. Download and install XAMPP
2. Download Ampache from the [releases page](https://github.com/ampache/ampache/releases). The **squashed** zip (`ampache-%VERSION%_squashed.zip`) puts everything in one folder and needs no extra htdocs configuration, which is why it suits XAMPP. See [Which zip?](/docs/information/which-zip) for the alternatives
3. Unzip the ampache zip file, rename the resulting folder as `ampache`
4. Move the folder into the XAMPP `htdocs` folder
5. Open `php.ini` in XAMPP (control panel: Apache → Config → PHP (php.ini)) and uncomment the extensions Ampache needs. `extension=intl` and `extension=zip` are the two most commonly left off; `curl`, `gd`, `mbstring`, `openssl`, `fileinfo` and `pdo_mysql` are usually already on
6. Start Apache and MySQL from the XAMPP control panel
7. Open a browser at `http://localhost/ampache/install.php`
8. Follow the installation
9. (IMPORTANT) Choose Create Database User (last one option), choose a database username and a password
10. Your ampache address should be: `http://localhost/ampache/`

If you took a non-squashed zip instead, the website is the `public` subfolder, so the install URL becomes `http://localhost/ampache/public/install.php`.

## Rewrite rules

XAMPP's Apache has `mod_rewrite` enabled but sets `AllowOverride All` only for `htdocs`, so the shipped `.htaccess` files normally work. If streaming, Subsonic clients or the REST API return 404, that is what to check — see [Rewrite Rules](/docs/installation/rewrite-rules).

Write the files out with:

```shell
php bin/installer htaccess -e
```

## Troubleshooting

If a database username doesn't work, the database user is already present.
Now you have two options:

a. Choose another username

b. Go to phpmyadmin and write in SQL: DROP USER username@localhost;

If you want to reinstall ampache simply delete ampache.cfg.php in ampache/config folder and repeat the process, you have to choose the *Overwrite if Database Already Exists* option and another database username if you haven't deleted the previous one.

## Next steps

* [Create a catalog](/docs/installation/catalog) pointing at your music folder
* [Basic Configuration](/docs/configuration)
