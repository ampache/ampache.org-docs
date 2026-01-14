---
title: "SubSonic API"
metaTitle: "SubSonic API"
description: "Ampache SubSonic API"
---

Your Ampache server can be accessed through the SubSonic API.

| Parameter | Required | Default | Comment                                                                                                                                                                           |
|-----------|----------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| u         | Yes      |         | The username.                                                                                                                                                                     |
| p         | Yes*     |         | The password, either in clear text or hex-encoded with a "enc:" prefix. Since 4.0.0 this should only be used for testing purposes.                                                |
| t         | Yes*     |         | (Since 4.0.0) The authentication token computed as md5(apikey + salt). See below for details.                                                                                     |
| s         | Yes*     |         | (Since 4.0.0) A random string ("salt") used as input for computing the password hash. See below for details.                                                                      |
| v         | Yes      |         | The protocol version implemented by the client, i.e., the version of the subsonic-rest-api.xsd schema used (see below).                                                           |
| c         | Yes      |         | A unique string identifying the client application.                                                                                                                               |
| f         | No       | xml     | Request data to be returned in this format. Supported values are "xml", "json", "jsonp". If using jsonp, specify name of javascript callback function using a callback parameter. |

 (*) Either p or both t and s must be specified.

**Note** token auth in Ampache requires a user apikey. This is due to the differences in how Subsonic and Ampache store passwords.

Remember to URL encode the request parameters. All methods (except those that return binary data) returns XML documents conforming to the subsonic-rest-api.xsd schema. The XML documents are encoded with UTF-8.
Authentication

If Ampache version 3.x.x, authentication is performed by sending the password as clear text or hex-encoded. Examples:

```URL
http://your-server/rest/ping.view?u=joe&p=sesame&v=1.12.0&c=myapp
http://your-server/rest/ping.view?u=joe&p=enc:736573616d65&v=1.12.0&c=myapp
```

Starting with Ampache version 4.0.0, the recommended authentication scheme is to send an authentication token, calculated as a one-way salted hash of the password.

This involves two steps:

* For each REST call, generate a random string called the salt. Send this as parameter s.
* Use a salt length of at least six characters.
* Calculate the authentication token as follows: token = md5(password + salt). The md5() function takes a string and returns the 32-byte ASCII hexadecimal representation of the MD5 hash, using lower case characters for the hex values. The '+' operator represents concatenation of the two strings. Treat the strings as UTF-8 encoded when calculating the hash. Send the result as parameter t.

For example: if the password is sesame and the random salt is c19b2d, then token = md5("sesamec19b2d") = 26719a1196d2a940705a59634eb18eab. The corresponding request URL then becomes:

```URL
http://your-server/rest/ping.view?u=joe&t=26719a1196d2a940705a59634eb18eab&s=c19b2d&v=1.12.0&c=myapp
```

Example from the Subsonic API documentation:

```URL
http://your-server/rest/ping.view?u=joe&p=sesame&v=1.12.0&c=myapp
```

**Note**: Default configuration assumes your Ampache installation resides at the root of your webserver.
If you are serving it from a subfolder (say `/ampache/`), you should:

* Set `web_path` in your config:

```INI
web_path = "/ampache"
;local_web_path = ""
```

* Edit the `.htaccess` file accordingly, e.g. replacing `/play/` by `/ampache/play`.

## Errors during Playback

When your Subsonic Client can successfully login to your Ampache server, brwose the Library,
but fails to play music (Client status is "Downloading 0 B"), try one of the following:

### Allow access from your Ampache server to your external IP-address on port 443

Applies when you see something like the following in your Ampache log (Provided logging is turned on):
`2020-09-15T19:02:29+00:00 [bbl] (subsonic_api.class) -> Stream error: Failed to connect to your-external-hostname port 443: Connection timed out`

### Set the local_web_path

This applies if Ampache is running behind a reverse proxy.
The following are typical error messages:

```shell
(Ampache\Module\Api\Subsonic_Api) -> Stream error:
(Ampache\Module\Api\Subsonic_Api) -> Stream error: The requested URL returned error: 404 Not Found
```

In `ampache.cfg.php` set `local_web_path` to `localhost`.
There are various discussions and issues with more detail on this,
see for example: [Issue 1639](https://github.com/ampache/ampache/issues/1639)

### Make sure you are not accessing an https site in http

Changing `server preferences` can solve that problem :
> forcing http streaming must be set to `inactive`
![image](https://github.com/ampache/ampache/assets/3218235/cd40a343-ba37-422d-bf0e-1c2eec678bce)
