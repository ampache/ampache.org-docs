---
title: "Ampache REST API"
metaTitle: "Ampache REST API"
description: "REST API documentation"
---

## RESTful Resource Path Conversion in Ampache

As part of the ongoing modernisation of the [Ampache API](https://ampache.org/api), the project has transitioned from a query-parameter based RPC model to a fully resource-oriented RESTful specification aligned with OpenAPI.

This document explains:

* The differences between the RPC API and the RESTful API
* How resource path conversion works
* Updated endpoint structure and behaviour
* HTTP method alignment
* Versioning model
* Migration guidance

## Background

Ampache historically exposed its API through two server entry points providing XML and JSON output formats:

```URL
https://develop.ampache.dev/server/xml.server.php?action={action_name}&parameter=value
https://develop.ampache.dev/server/json.server.php?action={action_name}&parameter=value
```

While functional, this approach:

* Mixes transport and action logic
* Encodes behaviour inside query parameters
* Overloads GET for state-changing operations
* Limits proper HTTP semantics
* Reduces cache effectiveness
* Complicates OpenAPI documentation

The new RESTful API resolves these issues by introducing structured, versioned resource paths.

## RPC API Structure

### Pattern

```URL
{ampacheURL}/server/{format}.server.php?action={action}&{parameters}
```

Characteristics:

* Behaviour determined by the `action` parameter
* Primarily GET-based
* Resources inferred indirectly
* Verb-style operation naming

Example:

```URL
?action=song&id=123
?action=playlist_songs&id=9
?action=add_song&playlist=9&song=123
```

## RESTful Resource Path Structure

### Base Path

```URL
{ampacheURL}/rest/{version}/{format}/{resource}
```

### Resource Item

```URL
{ampacheURL}/rest/{version}/{format}/{resource}/{identifier}
```

### Nested Resource

```URL
{ampacheURL}/rest/{version}/{format}/{parent}/{id}/{child}
```

Key characteristics:

* Resource-oriented URL design
* Plural resource naming
* Hierarchical relationship modelling
* Proper HTTP verb usage
* OpenAPI-compliant specification
* Clear separation between transport and intent

## Updated Conversion Examples

| RPC API | RESTful API |
|----------|-------------|
| `?action=song&id=123` | `GET /rest/6/songs/123` |
| `?action=artist&id=45` | `GET /rest/6/artists/45` |
| `?action=album&id=78` | `GET /rest/6/albums/78` |
| `?action=artists` | `GET /rest/6/artists` |
| `?action=playlist_songs&id=9` | `GET /rest/6/playlists/9/songs` |
| `?action=add_song&playlist=9&song=123` | `POST /rest/6/playlists/9/songs` |

## HTTP Method Alignment

The RESTful API uses standard HTTP semantics:

| Method | Purpose | Example |
|--------|----------|----------|
| GET | Retrieve resource or collection | `/rest/6/songs/123` |
| POST | Create resource or relationship | `/rest/6/playlists` |
| PUT | Replace full resource | `/rest/6/songs/123` |
| PATCH | Partial update | `/rest/6/songs/123` |
| DELETE | Remove resource | `/rest/6/playlists/9` |

State-changing behaviour is no longer implemented via GET.

## Resource Naming Conventions

To ensure consistency across the API:

* Use plural nouns for collections
  * `songs`
  * `artists`
  * `albums`
  * `playlists`
* Use nested routes for relationships
  * `/artists/{id}/albums`
  * `/albums/{id}/songs`
  * `/playlists/{id}/songs`
* Avoid verbs in URLs
* Use HTTP methods to express intent

## Versioning Strategy

All RESTful endpoints are prefixed with:

```URL
/rest/{version}/{format}
```

Example

```URL
/rest/6/json/songs
/rest/6/xml/artists/45
```

Versioning enables:

* Backward compatibility
* Parallel support for RPC endpoints
* Incremental evolution of the API
* Clear OpenAPI documentation per version

## Authentication and Headers

The RESTful API aligns with OpenAPI specification standards and expects:

* Authentication token passed via headers
* Proper `Content-Type` and `Accept` headers
* JSON as the primary response format in documentation
* XML support remains available where specified.

## Backwards Compatibility

* RPC endpoints remain functional
* RPC actions are marked as deprecated in REST documentation
* The RPC and REST APIs will coexist

## Benefits of RESTful Conversion

### Clarity

Endpoints describe the resource being accessed rather than an action being executed.

### Predictability

Developers can infer endpoints from resource structure.

### Standards Alignment

Fully compatible with OpenAPI tooling and modern REST conventions.

### Cache Compatibility

Improved support for HTTP caching layers and reverse proxies.

### Tooling Integration

Works seamlessly with:

* OpenAPI generators
* SDK generation tools
* Postman collections
* Automated testing frameworks

## Migration Recommendations

1. Identify RPC usage in existing integrations
2. Map each action to its RESTful resource equivalent
3. Replace query-based calls with proper HTTP verbs
4. Update authentication handling to header-based tokens
5. Validate against the OpenAPI schema

## Conversion Rules

* RPC endpoints must remain accessible and fully functional
* REST documentation reflects canonical behaviour
* Separate OpenAPI documentation is maintained for REST endpoints
* New features must be implemented using RESTful resource paths only

This RESTful specification establishes a cleaner, scalable, and standards-aligned foundation for the Ampache API.
