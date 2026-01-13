# Charts and Graphs in Ampache

Ampache uses a GPLv3 library for generating graphs [szymach/c-pchart](https://github.com/szymach/c-pchart)

Due to some issues around the [license](http://www.pchart.net/license) for the original library [ampache/issues/1515](https://github.com/ampache/ampache/issues/1515)

It has been decided to only provide a composer file containing 100% free software. That way it allows users the option of installing the package while not affecting the default install.

## Installing non-free packages in Ampache

If the graphs and charts are important to you you can do the following.

To add the missing lib you can cd to the Ampache folder and run the following command.
```bash
  cd /var/www/html/ampache
  sudo -u www-data composer require szymach/c-pchart "2.*"
```

## Disable non-free packages in Ampache

To remove c-pchart just change 'require' to 'remove'.
```bash
composer remove szymach/c-pchart
```