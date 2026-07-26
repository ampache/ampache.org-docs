---
title: "Charts and Graphs"
metaTitle: "Charts and Graphs"
description: "Charts and Graphs in Ampache"
---

## Charts and Graphs

**Ampache8** draws charts with [goat1000/svggraph](https://github.com/goat1000/SVGGraph) (LGPL-3.0). It's a normal, non-dev dependency, so a release download works with nothing extra to install, and there's no `ext-gd` requirement. Graphs render as SVG instead of PNG, so they scale to the page and stay sharp on a high-dpi screen.

`statistical_graphs` defaults to `"true"`. Set it to `"false"` in your config if you want to skip the graph queries entirely, e.g. on a very large catalog:

```conf
; DEFAULT: "true"
statistical_graphs = "false"
```

The rest of this page covers **Ampache7**, which still uses the older, optional `szymach/c-pchart` library described below.

## Ampache7: an optional GPLv3 charting library

Ampache7 uses a GPLv3 library for generating graphs [szymach/c-pchart](https://github.com/szymach/c-pchart)

Due to some issues around the [license](http://www.pchart.net/license) for the original library [ampache/issues/1515](https://github.com/ampache/ampache/issues/1515)

It has been decided to only provide a composer file containing 100% free software. That way it allows users the option of installing the package while not affecting the default install.

### Installing non-free packages in Ampache

If the graphs and charts are important to you you can do the following.

To add the missing lib you can cd to the Ampache folder and run the following command.

```shell
  cd /var/www/html/ampache
  sudo -u www-data composer require szymach/c-pchart "2.*"
```

### Disable non-free packages in Ampache

To remove c-pchart just change 'require' to 'remove'.

```shell
composer remove szymach/c-pchart
```
