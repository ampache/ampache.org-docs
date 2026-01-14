---
title: "LDAP"
metaTitle: "LDAP"
description: "Ampache and LDAP"
---

## Configuring Ampache for LDAP authentication

### Enable LDAP as an authentication method

You first need to add LDAP to the authentication methods of your Ampache instance: `auth_methods = "ldap"`

The above example does not include MySQL authentication support. Ampache can have multiple authentication methods at the same time. It will try them in the order they are listed until a match is found. If you would like it to try LDAP first, and then fall back on MySQL simply set `auth_methods` as follows: `auth_methods = "ldap,mysql"`

### Enable the automatic user creation

As with all others login extension methods, you need to set the `auto_create` and the `auto_user` variables.

The `auto_create` variable allows Ampache to create new users when they manage to connect using a login extension method (here, LDAP). This variable **MUST** be set to `true`, otherwise your users wont be able to connect to Ampache.

The `auto_user` variable states what status one will obtain by connecting with a login extension method. The default is "guest". The other possible values are "user" and "admin".

### Configure Ampache's LDAP client

You now need to set the `ldap_*` variables that will define the behaviour of Ampache against your LDAP server.

You **MUST** set the following variables:

* `ldap_url` (format: `ldap://my.domain.tld/`, `ldaps://123.456.7.89/`)
* `ldap_search_dn`: The DN in which the users will be searched for (usually something like `ou=people,dc=my,dc=domain,dc=tld`)
* `ldap_objectclass`: The objectClass common to all users. In OpenLDAP, this is usually `posixAccount`; In Microsoft Active Directory, `organizationalPerson`
* `ldap_filter`: The filter that will be used when searching for the user. The `%v` string will be replaced by the username. For OpenLDAP, try `(uid=%v)`. For Microsoft Active Directory, try `(sAMAaccountName=%v)`.

If you want Ampache to use a specific username/password combination instead of the anonymous login, you'll have to set the `ldap_username` and `ldap_password` variables. Be carefull: `ldap_username` takes a **DN**.

If you want all your users to be in a specific group, you can provide the `ldap_require_group` variable that takes a group DN. Ampache will search for the username in the list of the members of this group. By default, this list is in attribute `member`, but it's not always the case (it might be `memberuid` for instance). If you need to change this attribute name, change the `ldap_member_attribute` variable.

If you want Ampache to automatically fetch the user's name and/or e-mail from your LDAP server, fill the `ldap_name_field` and `ldap_email_field` variables. `ldap_name_field` can reconstruct a name. If you have for instance the first names of your users in a `givenName` field, and their family name in a `sn` field, you can set `ldap_name_field` to `givenName sn`.

By default, the LDAP protocol version used is **3**. You can customize this behaviour with the `ldap_protocol_version` variable.

If your server can use StartTLS, you may want Ampache to use it. In that case, set the `ldap_start_tls` variable to `"true"`.

## TIPs and Gotchas

### My users can't connect, how can I know what is happening

Enable Ampache's logging (debug mode). Look in the logs for the lines containing `(LDAP)`:

```ShellSession
cat ampache.XXXXX.log | grep '(LDAP)'
```

### When logging on, I get the message "undefined function ldap_connect()"

Make sure PHP's LDAP libraries are installed and accessible (Debian/Ubuntu: `sudo apt-get install php5-ldap`; Red Hat/Fedora: `sudo dnf install php-ldap php-mysqlnd php-pdo`).
Once the libraries are installed, you may need to restart Apache if it is already running. (Debian/Ubuntu: `sudo service apache2 restart`; Red Hat/Fedora: `sudo systemctl restart httpd`).

### Miscellaneous

* Specifying an `ldap_objectclass` value other than `"*"` may cause authentication to fail. Check this value if you are getting authentication failure messages from the login page.
