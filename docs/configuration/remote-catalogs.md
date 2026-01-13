# Ampache Remote Catalogs

You can remotely connect one more Ampache servers to one or more other Ampache servers. This is accomplished using API-RPC. The below documentation will walk you through configuring two Ampache installs and connecting one to the other. This functionality is disabled by default.

## First Steps

Ampache's Access Lists are by default _Deny From All_ this means if we enable _access_control_ without defining any ACL's we will be locked out of our own Ampache install. First we should create the ACL (Access Control List) on both servers.

### Configure the ACL's on the server side

* Login as administrator and use the menu to browse to the access-list setup.
* Admin > Access List
* Click **Add Entry**.
* Fill in the form with the following entry's

### Stream Access List

|     Name      | Level | User  |   ACL Type    | Start Address |   End Address   |
| :-----------: | :---: | :---: | :-----------: | :-----------: | :-------------: |
| Stream Access | Read  |  All  | Stream Access |    0.0.0.0    | 255.255.255.255 |

Where

|     Field     |                                      Description                                       |
| :-----------: | :------------------------------------------------------------------------------------: |
|     Name      |      This is just the name of the ACL(Access List) so you can identify it later.       |
|     Level     |                    This is the privilege level that the user gets.                     |
|     User      |                          This is the login name of the user.                           |
|   ACL Type    |                                 This is the ACL type.                                  |
| Start Address | This is the start ip address of the range of ip addresses you're building the ACL for. |
|  End Address  |  This is the end ip address of the range of ip addresses you're building the ACL for.  |

* Click _Create ACL_.
* What we created just now is an ACL that allows streaming capability from all possible ip addresses, not bound to any user.
* Click _Add Entry_ again.


### Interface Access List

Name | Level | User | ACL Type | Start Address | End Address
:--: | :--: | :--: | :--: | :--: | :--:
Interface Access | View | All | Web Interface | 0.0.0.0 | 255.255.255.255

* Click _Create ACL_.
* What we created just now is an ACL that allows interface access from all possible ip addresses, not bound to any user.
* Click _Add Entry_.

### API-RPC Access List

|            Name             |   Level    |      User      | ACL Type |   Start Address    |    End Address     |
| :-------------------------: | :--------: | :------------: | :------: | :----------------: | :----------------: |
| API-RPC %Remote Servername% | Read/Write | %User Account% | API-RPC  | "Remote Server Ip" | "Remote Server Ip" |

* Click _Create ACL_.
* What we created just now is an ACL that allows API-RPC access from one ip address and secured by a shared secret.

### Configure the ACL's on the remote side.

* Login as administrator and use the menu to browse to the access-list setup.
* Admin > Access List
* Click Add Entry.
* Fill in the form with the following entry's

### Stream Access List

|     Name      | Level | User  |   ACL Type    | Start Address |   End Address   |
| :-----------: | :---: | :---: | :-----------: | :-----------: | :-------------: |
| Stream Access | Read  |  All  | Stream Access |    0.0.0.0    | 255.255.255.255 |

* Click _Create ACL_.
* What we created just now is an ACL that allows streaming capability from all possible ip addresses, not bound to any user.
* Click _Add Entry_ again.

### Interface Access List

| Name | Level | User | ACL Type | Start Address | End Address |
| :--: | :--: | :--: | :--: | :--: | :--: |
| Interface Access | View | All | Web Interface | 0.0.0.0 | 255.255.255.255 |

* Click _Create ACL_.
* What we created just now is an ACL that allows interface access from all possible ip addresses, not bound to any user.
* Click _Add Entry_.

### API-RPC Access List

|            Name             |   Level    |      User      | ACL Type | Start Address |   End Address   |
| :-------------------------: | :--------: | :------------: | :------: | :-----------: | :-------------: |
| API-RPC %Remote Servername% | Read/Write | %User Account% | API-RPC  |    0.0.0.0    | 255.255.255.255 |

* Click _Create ACL_.
* What we created just now is an ACL that allows API-RPC access from one ip address and secured by a shared secret.

## Config requirements for the "SERVER" and "REMOTE"

Last but not least we have to enable few settings in the ampache.cfg.php file on both servers. The settings below are required when you want to use API-RPC and ampache.

```INI
; Use Access List
; Toggle this on if you want ampache to pay attention to the access list
; and only allow streaming/downloading/api-rpc from known hosts by default
; api-rpc will not working without this on.
; DEFAULT: true
access_control  = "true"
```

```INI
; Require Session
; If this is set to true ampache will make sure that the URL passed when
; attempting to retrieve a song contains a valid Session ID This prevents
; others from guessing URL's
; DEFAULT: true
require_session = "true"
```

## Add The catalog to the REMOTE server.

Login as administrator at the REMOTE and use the menu to browse to the catalog setup. Click Admin > Catalog then Click _Add Catalog_.

### Fill in the form with the following entry's

|        Catalog Name         |           Path           | Catalog Type | Remote Catalog Username | Remote Catalog Password |
| :-------------------------: | :----------------------: | :----------: | :---------------------: | :---------------------: |
| API-RPC %Remote Servername% | http://127.0.0.2/ampache |    Remote    |     %User Account%      | %User Account Password% |

The rest of the option can be set as wished. They do not influence the working of the catalog.

* Click _Add Catalog_