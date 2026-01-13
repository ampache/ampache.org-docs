# Ampache API

Ampache has an open, published API that can allow 3rd party applications to integrate with the music, meta-data, and album art held by Ampache. The primary use for this API is to expose your Ampache server to mobile devices while maintaining a native and fully functional client without having to rely on a web browser. Full documentation for developers on Ampache's API can be found at [ampache.org](http://ampache.org/api/)

## Enabling use of the API

The API is disabled out of the box in versions earlier than Ampache 3.5.4. You will need to make a few modifications to the default Ampache configuration.

_Note on CORS_: If you plan on using any of the API provided by Ampache from a browser (using JavaScript code for instance), you should be aware of the necessity of enabling [CORS headers](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing). Information on how to set them for various webservers can be found [here](https://www.w3.org/wiki/CORS_Enabled).

### Creating the API/RPC ACL Entry

As of Ampache 3.5.4 the API should work out of the box without any modifications. If you are upgrading from a previous version you will need to add an API/RPC [Access Control List](/docs/configuration/acl) for any IP addresses that you wish to use the API from.

In most cases people will want to open up all addresses to use the API, which can be accomplished by entering _0.0.0.0_ for the Start IP and _255.255.255.255_ for the end IP. When creating the ACL entry leave everything as default until you know what the settings are for. If you are familiar with the networks you will be connecting from, feel free to customize these ACL's for your setup. You should also check and make sure that `access_control=true` is set in your config file. If you have upgraded Ampache from a version before 3.4.x access_control was disabled by default.

Troubleshooting:

* The 3.5.x and newer APIs use your web interface username and password. If you have recently upgraded from Ampache 3.4.x you will need to log into the web interface and reset your password before the API will work.

* If you receive an ACL error it is because your Ampache install is either missing the API/RPC [Access Control List](/docs/configuration/acl) or the IP you are accessing from is outside the currently defined ACL. Verify your ACLs and, if needed [enable logging](/docs/information/troubleshooting/#enable-logging) to get more detailed debug information.

* It's possible that an ACL error is an erroneous error message, particularly in regard to Amarok. Amarok fails because your RPC version is too old, but doesn't report it. It then attempts to get through the ACL and you get the ACL message not because the ACL itself is failing, but your client cannot connect do to the previous Version Too Old. Amarok only reports the last error it got, not the first.

## Note about SSL

Using Ampache over SSL is recommended for security and privacy reasons, but it can be tricky to setup on few clients. If you're using a self-signed certificate or a certificate delivered by a local authority, be sure you can configure your client to ignore invalid certificates or set the root certificate as a trusted authority (see [ubuntu](http://askubuntu.com/questions/73287/how-do-i-install-a-root-certificate) explanation example).

## For Apache users

* Default configuration is for Apache web server, you have to adapt /rest/.htaccess script for your web server if you're not using Apache
* URL rewriting Apache mod must be enabled and your Apache configuration must allow configuration override (AllowOverride all).
* If not already done, you may need to copy /play/.htaccess.dist -> /play/.htaccess and /rest/.htaccess.dist -> /rest/.htaccess (and modify local paths as applicable)

## For Nginx users

* rewriting must be enabled (is enabled by default, just to be sure)
* make sure that local_web_path is set in your ampache.cfg.php the following way: local_ip:your_http_server_port or at least localhost:your_http_server_port
* Use the example nginx.conf in [General Installation](https://github.com/ampache/ampache/wiki/Installation#nginx)       and change it for your needs or add the following lines to your existing config:

```Nginx
if ( !-d $request_filename ) {
  rewrite ^/rest/(.*)\.view$ /rest/index.php?action=$1 last;
}

rewrite ^/play/ssid/(.*)/type/(.*)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&player=$6&name=$7 last;
rewrite ^/play/ssid/(.*)/type/(.*)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/bitrate/([0-9]+)/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&bitrate=$6player=$7&name=$8 last;
rewrite ^/play/ssid/(.*)/type/(.*)/oid/([0-9]+)/uid/([0-9]+)/client/(.*)/transcode_to/(w+)/bitrate/([0-9]+)/player/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&transcode_to=$6&bitrate=$7&player=$8&name=$9 last;

# The following line necessary for me to be able to download single songs
rewrite ^/play/ssid/(.*)/type/(.*)/oid/([0-9]+)/uid/([0-9]+)/action/(.*)/name/(.*)$ /play/index.php?ssid=$1&type=$2&oid=$3&uid=$4action=$5&name=$6 last;

# used for transfering art work to some clients, seems not to work for clementine because of an clementine-internal issue
location /play {
         if (!-e $request_filename) {
             rewrite ^/play/art/([^/]+)/([^/]+)/([0-9]+)/thumb([0-9]*)\.([a-z]+)$ /image.php?object_type=$2&object_id=$3&auth=$1;
             break;
         }
         rewrite ^/([^/]+)/([^/]+)(/.*)?$ /play/$3?$1=$2;
         rewrite ^/(/[^/]+|[^/]+/|/?)$ /play/index.php last;
         break;
}

location /rest {
         limit_except GET POST {
         deny all;
         }
}
```

## For others

* You have to adapt /rest/.htaccess script for your web server if you're not using Apache or Nginx
* For lighttpd following lines need to be added:

```ApacheConf
url.rewrite-if-not-file += (
  "^/rest/(([^\?]+)\.view)(\?(.*))?" => "/rest/index.php?ssaction=$2&$4",
  "^/play/ssid/([^/]+)/type/([^/]+)/oid/([^/]+)/uid/([^/]+)/client/([^/]+)/bitrate/([^/]+)/player/([^/]+)/name/([^/]+)(/.*)?$" => "/play/index.php?ssid=$1&type=$2&oid=$3&uid=$4&client=$5&bitrate=$6&player=$7&name=$8"
)
```

* which key-vaue-pairs have to be present in the second rewrite rule might depend on the client and its version used. If the above rule does not work, check your lighttpd access log for 404-Errors and adapt the second rewrite rule according to the client's requests that failed (see [#1853](https://github.com/ampache/ampache/issues/1853))

In general for all kind of webservers:

* You must enable _SubSonic Backend_ in System settings in the Web UI.
* Access control and XML-API must be [enabled](/docs/configuration/api#enabling-use-of-the-api)
* PHP cUrl mod is highly recommended
* (Apache only) To not break few clients, Authorization header should be passed (some Apache module can remove this header for security reason). To be sure, please add the following directive in your Apache configuration : `SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1`
* Most SubSonic client will request cover thumbnail. To return real thumbnail on the fly, PHP-GD module is recommended.

Once these prerequisites matched, the best test is to open `http://your/ampache/location:port/rest/ping.view`, e.g. if your ampache location is /ampache on standard port 80 open `http://localhost/ampache/rest/ping.view` with your browser and see the output.
You should get the following XML response:

```XML
<subsonic-response version="1.10.1" status="failed">
    <error code="10" message="Required parameter is missing."/>
</subsonic-response>
```

If you get successfully this XML message, you can now add your server on a Subsonic client, adding `http://localhost/ampache` as web server url.

## DAAP API

Your Ampache server can be accessed through DAAP protocol (iTunes server) but there is some prerequisite for that:

* You must enable _DAAP Backend_ in System settings.
* Default configuration is for Apache web server, you have to adapt /daap/.htaccess script for your web server if you're not using Apache
* Url rewriting Apache mod must be enabled
* You have to setup a dedicated Virtual Host for DAAP backend pointing to /daap subdirectory, and listen on port 3689 (recommended). Vhost example:

```AmpacheConf
<VirtualHost _default_:3689>
    DocumentRoot /var/local/ampache/daap/

    SetEnv nokeepalive
    SetEnv downgrade-1.0
    SetEnv force-response-1.0

    <Directory "/var/local/ampache/daap/">
        Options Indexes FollowSymLinks MultiViews
        AllowOverride all
        Require all granted
    </Directory>
</VirtualHost>
```

* The DAAP handling code connects to the "main" ampache web server for retrieving the media files. You must tell it where that main server is reachable by setting the `local_web_path` variable in the `ampache.cfg.php` config file.

So if your "main" ampache server can be reached at `http://localhost/ampache`, just uncomment the prepared statement:

```AmpacheConf
local_web_path = "http://localhost/ampache"
```

* Most DAAP clients only support server auto-discovery.
* On Linux: you should setup [Avahi](https://wiki.archlinux.org/index.php/avahi) and add the following `/etc/avahi/services/ampache-daap.service` file:

 ```XML
<?xml version="1.0" standalone='no'?>
<!DOCTYPE service-group SYSTEM "avahi-service.dtd">
<service-group>
  <name>Ampache DAAP protocol</name>

  <service>
    <type>_http._tcp</type>
    <port>3689</port>
  </service>

  <service>
    <type>_daap._tcp</type>
    <port>3689</port>
    <txt-record>txtvers=1 iTShVersion=131073 Version=196610</txt-record>
  </service>

  <service>
    <type>_dacp._tcp</type>
    <port>3689</port>
  </service>

  <service>
    <type>_touch-able._tcp</type>
    <port>3689</port>
    <txt-record>txtvers=1</txt-record>
    <txt-record>OSsi=0x10313</txt-record>
    <txt-record>CtlN=Ampache</txt-record>
    <txt-record>Ver=131073</txt-record>
    <txt-record>DvSv=2305</txt-record>
    <txt-record>DvTy=iTunes</txt-record>
    <txt-record>DbId=416D7061636865</txt-record>
  </service>

  <service>
    <type>_rsp._tcp</type>
    <port>3689</port>
  </service>
</service-group>
```

* On Windows: you should run the following commands once Bonjour service installed:
  * `dns-sd -R Ampache _http._tcp local 3689`
  * `dns-sd -R Ampache _daap._tcp local 3689 txtvers=1 "Machine ID"=AC630E6FB504 "iTSh Version"=196619 "Media Kinds Shared"=1 dmv=131082 Version=196620 "Machine Name"=Ampache Password=0 OSsi=0x10313 "Database ID"=416D7061636865 MID=0xAD12C5B9B9D839F2`
  * `dns-sd -R Ampache _dacp._tcp local 3689`
  * `dns-sd -R Ampache _touch-able._tcp local 3689 txtvers=1 OSsi=0x10313 CtlN=Ampache Ver=131073 DvSv=2305 DvTy=iTunes DbId=416D7061636865`
  * `dns-sd -R Ampache _rsp._tcp local 3689`
* PHP cUrl mod is recommended
* DAAP protocol doesn't support multiusers. If you want authentication, you should setup the DAAP password configuration in system settings.

## UPnP / DLNA API

Your Ampache server can be accessed through UPnP / DLNA API but there is some prerequisite for that:

* You must enable _UPnP Backend_ in System settings.
* You must also enable _Enable url rewriting_ in Streaming settings.
* If your installation is within a subfolder '/ampache' you must take care for your Rewrite Rules within '[ampachepath]/play/.htaccess'.
* PHP Socket mod must be enabled and PHP XMLReader extension available
* You should broadcast the server periodically calling `http://localhost/ampache/upnp/?btnSend=Send+SSDP+broadcast` or `php bin/cli run:broadcast` with a cron (every 1-2 minutes recommended).
* You need to set the http_host option within config/ampache.cfg.php to broadcast via broadcast.inc.
* You need to enable (remove leading semicolon) `;websocket_address = "ws://localhost:8100"` in config/ampache.cfg.php.

## WebDAV API

Your Ampache server can be accessed through WebDAV API.

* You must enable _WebDAV Backend_ in System settings.
* The base address to setup on your client is `http://localhost/ampache/webdav/index.php/`
* If `use_auth` is enabled (by default), a basic authentication with your Ampache user/password will be required.
