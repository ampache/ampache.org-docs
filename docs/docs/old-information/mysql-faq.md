---
title: "MySQL8 FAQ"
metaTitle: "MySQL8 FAQ"
description: "MySQ8 FAQ"
---

## PHP7.4 is out and stable

I have tested installs using php7.4 and no extra requirements are needed for installs on 7.4

## Help Me Use MySQL8 with Ampache

MySQL8 support currently requires a bit of manual configuration outside of Ampache to install.

The newer versions default to caching-sha2-password as the default authentication plugin rather than mysql_native_password. [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-caching-sha2-password)

For now it is recommended that you use the old default of mysql_native_password.

Update your mysql ini file

```conf
[mysqld]
default_authentication_plugin=mysql_native_password
```

And then update your root user.

```mysql
ALTER USER 'root'@'localhost'
IDENTIFIED WITH mysql_native_password
BY 'password';
FLUSH PRIVILEGES;
```

After you install Ampache and create a database user for the site, you can reset root to an SHA2 password.

## Why do I need to do this?

Until PHP 7.4 releases you won't be able to connect using caching-sha2-passwords.

[PHP bugs #76243 mysql 8 - new default_authentication_plugin](https://bugs.php.net/bug.php?id=76243)
