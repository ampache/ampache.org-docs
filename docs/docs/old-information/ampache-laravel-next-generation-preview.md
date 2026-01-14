---
title: "Ampache Laravel"
metaTitle: "Ampache Laravel"
description: "Ampache Laravel"
---

**NOTE** This brach was abandoned many years ago now.

Please forgive my poor artistic ability in not getting the interface layout to be an exact duplicate of version 3.*.

Beware: This preview has only been tested on Fedora 29.

Interface is far from complete and only demonstrates display of some capability. very little functionality is complete in this demo.

Current Capabilities:

1. Ampache init via CLI command "artisan".
2. First registration becomes Administrator.
    * Registration via mail verification capability
    * Registration via Administrator
    * Captcha capability.
3. Localplay, Plugin, and Catalog modules can be enabled, but only local catalog can be created. This doesn't actually process the files yet. It only affects the interface.
4. Management of rules and permissions.

Setup and init:

Note: if Mysql 8.0 is installed it is necessary to modify the server config file adding the following to the [mysqld] section:
  `default_authentication_plugin=mysql_native_password`

1. Clone the repository or download the source from the install page.
   * `git clone https://github.com/ampache/ampache.git  --branch laravel ampache`
2. Run `composer install` from the ampache root folder. This "should" let you know if any PHP dependencies are missing.
3. Run `php artisan ampache:install` from the ampache root folder.

Alternate web server:

* The compressed file can be expanded anywhere and the command `php artisan serve --host <hostname> --port <port>` can be issued from ampache/laravel root folder. That way it can be previewed without affecting your current installation.

1. The first user to register will automatically get the administrator role.  Set the browser to `http://localhost/` or `http://localhost/register` to become a user. (Replace localhost with the appropriate host and port.)
2. Be careful if exercising roles and permissions: You can lock yourself out of Ampache. I will be implementing a warning before display those pages.

I'm sure you might have problems or questions.  I'm deciding how to keep track of issues separately from issues on the develop  version.
