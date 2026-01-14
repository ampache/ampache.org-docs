---
title: "API3 Errors"
metaTitle: "API3 Errors"
description: "API documentation"
---

Ampache's API errors are loosely based around the HTTP status codes.
All errors are returned in the form of an XML Document however the string error message provided is translated into the language of the Ampache server in question. All services should only use the code value.

## Example Error messages

```xml
<root>
      <error code="404">Library item not found</error>
</root>
```

## Current Error Codes

All error codes are accompanied by a string value for the error and derived from the [HTTP/1.1 Status Codes](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

* **400** Bad Request
  * Used when you have specified a valid method but something about the input is incorrect, invalid or missing
  * You can check the error message for details, but do not re-attempt the exact same request
* **401** Received Invalid Handshake
  * This is a temporary error, this means no valid session was passed or the handshake failed
* **404** Not Found
  * The API could not find the requested object
* **405**
  * This is a fatal error, the service requested a method that the API does not implement
