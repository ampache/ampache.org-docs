# Ampache 5.0.0 is a major change

The incoming release of Ampache 5.0.0 has made a lot of changes to the PHP structure of the project.

![image](https://user-images.githubusercontent.com/1305249/131267485-ed6792d2-4bc0-4599-8277-109fe98eaffe.png)

While it will function the same way as a user; the backend has been updated which requires a few tweaks to your install.

This is a major rewrite of the PHP and will break if you aren't aware of the changes.

## PHP 7.4, php-intl and php-gettext are **required**

PHP 7.4 support should be readily available for most servers.
PHP 8.0 will be supported in the next release (5.1.0)

If you don't have access to php7.4 you should look at upgrading your server or staying on Ampache 4 until you can.

As well as php 7.4 Ampache 5.0.0 will also require **php-intl** module/dll to be enabled.

If you are unable to upgrade or want to remain on Ampache 4 you need to check out the release 4 branch.

```shell
git remote add release4 https://github.com/ampache/ampache.git
git fetch release4
git checkout release4
```

## You will need to update the web server document root

The root folder of Ampache is not the web root anymore.

The new folder is **public** and you will need to update your web server config.

```apache2
DocumentRoot /var/www/ampache
DocumentRoot /var/www/ampache/public
```

If you're using Apache2 make sure you copy the htaccess files as well

```shell
cp /var/www/ampache/public/rest/.htaccess.dist /var/www/ampache/public/rest/.htaccess
cp /var/www/ampache/public/play/.htaccess.dist /var/www/ampache/public/play/.htaccess
cp /var/www/ampache/public/channel/.htaccess.dist /var/www/ampache/public/channel/.htaccess
```

## Delete left over files

While updating from git there will be some left over files that are not deleted due to the structural change.

You can manually delete these folders

```shell
rm -rf ./channel
rm -rf ./play
rm -rf ./rest
rm -rf ./lib
```

## Don't forget to re-run composer

You will need to make sure you've run composer install again.

It should run but it's good to manually check.

```shell
composer install
```

Composer 1 and 2 are both supported now so it should not matter which version you use.

## scripts and cli commands need to be updated

The /bin folder has combined each script into a single application.

```shell
bin/cli
```

All your commands will need to be updated to match the new command structure.

For example the cron.service command has changed to the following

```conf
ExecStart=php bin/cron.inc
ExecStart=php bin/cli run:cronProcess
```

Arguments and options remain the same (with some minor exceptions)

Check out the [cli faq](/docs/information/troubleshooting/cli) to migrate your commands.

The cli program has a --help switch for all commands.

![image](https://user-images.githubusercontent.com/1305249/131268352-c3877dd0-c5c8-4f9a-a5b9-726a734c79dc.png)

## php-cs-fixer is out of the root folder

If you used ./php-cs-fixer from root it's still there in the vendor folder (/vendor/bin/php-cs-fixer)

## test scripts and commands for checking your code have changed

Anyone who wants to create a pull for Ampache can check their code by executing the test scripts.

```bash
bash ./resources/scripts/tests/*
```
