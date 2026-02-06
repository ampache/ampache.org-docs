import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '68a'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '0d5'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '307'),
            routes: [
              {
                path: '/api/',
                component: ComponentCreator('/api/', 'e54'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/advanced-search/album-advanced-search',
                component: ComponentCreator('/api/advanced-search/album-advanced-search', '8ba'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/advanced-search/artist-advanced-search',
                component: ComponentCreator('/api/advanced-search/artist-advanced-search', '6ad'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/advanced-search/genre-advanced-search',
                component: ComponentCreator('/api/advanced-search/genre-advanced-search', '31c'),
                exact: true
              },
              {
                path: '/api/advanced-search/label-advanced-search',
                component: ComponentCreator('/api/advanced-search/label-advanced-search', '77d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/advanced-search/playlist-advanced-search',
                component: ComponentCreator('/api/advanced-search/playlist-advanced-search', 'fde'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/advanced-search/podcast-advanced-search',
                component: ComponentCreator('/api/advanced-search/podcast-advanced-search', 'd84'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/advanced-search/podcast-episode-advanced-search',
                component: ComponentCreator('/api/advanced-search/podcast-episode-advanced-search', '94f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/advanced-search/song-advanced-search',
                component: ComponentCreator('/api/advanced-search/song-advanced-search', 'e4c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/advanced-search/user-advanced-search',
                component: ComponentCreator('/api/advanced-search/user-advanced-search', 'b3f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/advanced-search/video-advanced-search',
                component: ComponentCreator('/api/advanced-search/video-advanced-search', 'a9e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-3/',
                component: ComponentCreator('/api/api-3/', '36a'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-3/api-errors',
                component: ComponentCreator('/api/api-3/api-errors', '07e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-3/api-xml-methods',
                component: ComponentCreator('/api/api-3/api-xml-methods', '044'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-4/',
                component: ComponentCreator('/api/api-4/', 'c61'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-4/api-advanced-search',
                component: ComponentCreator('/api/api-4/api-advanced-search', '976'),
                exact: true
              },
              {
                path: '/api/api-4/api-errors',
                component: ComponentCreator('/api/api-4/api-errors', '062'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-4/api-json-methods',
                component: ComponentCreator('/api/api-4/api-json-methods', '646'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-4/api-xml-methods',
                component: ComponentCreator('/api/api-4/api-xml-methods', '51e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-5/',
                component: ComponentCreator('/api/api-5/', '2df'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-5/api-advanced-search',
                component: ComponentCreator('/api/api-5/api-advanced-search', '2b0'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-5/api-errors',
                component: ComponentCreator('/api/api-5/api-errors', '874'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-5/api-json-methods',
                component: ComponentCreator('/api/api-5/api-json-methods', 'a92'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-5/api-standards',
                component: ComponentCreator('/api/api-5/api-standards', '2b7'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-5/api-xml-methods',
                component: ComponentCreator('/api/api-5/api-xml-methods', 'd3b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-advanced-search',
                component: ComponentCreator('/api/api-advanced-search', 'b41'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-browse',
                component: ComponentCreator('/api/api-browse', '2e9'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-changelog',
                component: ComponentCreator('/api/api-changelog', 'cac'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-errors',
                component: ComponentCreator('/api/api-errors', '234'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-examples',
                component: ComponentCreator('/api/api-examples', 'c2f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-json-methods',
                component: ComponentCreator('/api/api-json-methods', 'd4e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-media-methods',
                component: ComponentCreator('/api/api-media-methods', 'fee'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-standards',
                component: ComponentCreator('/api/api-standards', 'bbb'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/api-xml-methods',
                component: ComponentCreator('/api/api-xml-methods', '736'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/album-browse',
                component: ComponentCreator('/api/browse/album-browse', '0cd'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/artist-browse',
                component: ComponentCreator('/api/browse/artist-browse', 'b52'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/catalog-browse',
                component: ComponentCreator('/api/browse/catalog-browse', '245'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/follower-browse',
                component: ComponentCreator('/api/browse/follower-browse', 'a9d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/genre-browse',
                component: ComponentCreator('/api/browse/genre-browse', '671'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/label-browse',
                component: ComponentCreator('/api/browse/label-browse', '97d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/license-browse',
                component: ComponentCreator('/api/browse/license-browse', '9ac'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/live_stream-browse',
                component: ComponentCreator('/api/browse/live_stream-browse', 'a39'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/playlist-browse',
                component: ComponentCreator('/api/browse/playlist-browse', 'c94'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/podcast_episode-browse',
                component: ComponentCreator('/api/browse/podcast_episode-browse', '39b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/podcast-browse',
                component: ComponentCreator('/api/browse/podcast-browse', '6db'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/share-browse',
                component: ComponentCreator('/api/browse/share-browse', '220'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/song-browse',
                component: ComponentCreator('/api/browse/song-browse', '6dd'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/user-browse',
                component: ComponentCreator('/api/browse/user-browse', '713'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/browse/video-browse',
                component: ComponentCreator('/api/browse/video-browse', '3f0'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/subsonic',
                component: ComponentCreator('/api/subsonic', 'e82'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/',
                component: ComponentCreator('/api/versions/', 'a8f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-4.1/',
                component: ComponentCreator('/api/versions/api-4.1/', '33d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-4.1/api-errors',
                component: ComponentCreator('/api/versions/api-4.1/api-errors', '03f'),
                exact: true
              },
              {
                path: '/api/versions/api-4.1/xml-methods',
                component: ComponentCreator('/api/versions/api-4.1/xml-methods', '0b5'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-4.2/',
                component: ComponentCreator('/api/versions/api-4.2/', '034'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-4.2/api-advanced-search',
                component: ComponentCreator('/api/versions/api-4.2/api-advanced-search', 'dbc'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-4.2/api-errors',
                component: ComponentCreator('/api/versions/api-4.2/api-errors', '27c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-4.2/api-json-methods',
                component: ComponentCreator('/api/versions/api-4.2/api-json-methods', '91c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-4.2/api-xml-methods',
                component: ComponentCreator('/api/versions/api-4.2/api-xml-methods', 'eea'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-4.3/',
                component: ComponentCreator('/api/versions/api-4.3/', '8a8'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-4.3/api-advanced-search',
                component: ComponentCreator('/api/versions/api-4.3/api-advanced-search', '1a3'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-4.3/api-errors',
                component: ComponentCreator('/api/versions/api-4.3/api-errors', 'f3e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-4.3/api-json-methods',
                component: ComponentCreator('/api/versions/api-4.3/api-json-methods', '565'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-4.3/api-xml-methods',
                component: ComponentCreator('/api/versions/api-4.3/api-xml-methods', '5dc'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-5.0/',
                component: ComponentCreator('/api/versions/api-5.0/', '555'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-5.0/api-advanced-search',
                component: ComponentCreator('/api/versions/api-5.0/api-advanced-search', 'ff0'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-5.0/api-errors',
                component: ComponentCreator('/api/versions/api-5.0/api-errors', '750'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-5.0/api-json-methods',
                component: ComponentCreator('/api/versions/api-5.0/api-json-methods', '535'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-5.0/api-standards',
                component: ComponentCreator('/api/versions/api-5.0/api-standards', 'ef1'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-5.0/api-xml-methods',
                component: ComponentCreator('/api/versions/api-5.0/api-xml-methods', '30a'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-5.1/',
                component: ComponentCreator('/api/versions/api-5.1/', '7af'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-5.1/api-advanced-search',
                component: ComponentCreator('/api/versions/api-5.1/api-advanced-search', '40e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-5.1/api-errors',
                component: ComponentCreator('/api/versions/api-5.1/api-errors', '1c9'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-5.1/api-json-methods',
                component: ComponentCreator('/api/versions/api-5.1/api-json-methods', '2d9'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-5.1/api-standards',
                component: ComponentCreator('/api/versions/api-5.1/api-standards', 'bda'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-5.1/api-xml-methods',
                component: ComponentCreator('/api/versions/api-5.1/api-xml-methods', '365'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-6.0/',
                component: ComponentCreator('/api/versions/api-6.0/', '413'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-6.0/api-advanced-search',
                component: ComponentCreator('/api/versions/api-6.0/api-advanced-search', 'd5d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-6.0/api-errors',
                component: ComponentCreator('/api/versions/api-6.0/api-errors', '8f0'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-6.0/api-json-methods',
                component: ComponentCreator('/api/versions/api-6.0/api-json-methods', 'd27'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-6.0/api-standards',
                component: ComponentCreator('/api/versions/api-6.0/api-standards', '3cb'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/versions/api-6.0/api-xml-methods',
                component: ComponentCreator('/api/versions/api-6.0/api-xml-methods', 'ee7'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/demo',
                component: ComponentCreator('/demo', 'b90'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docker',
                component: ComponentCreator('/docker', 'f8e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '29e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/clients/',
                component: ComponentCreator('/docs/clients/', 'f32'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/clients/api',
                component: ComponentCreator('/docs/clients/api', '01b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/clients/demo-server',
                component: ComponentCreator('/docs/clients/demo-server', 'd1a'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/',
                component: ComponentCreator('/docs/configuration/', '454'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/acl',
                component: ComponentCreator('/docs/configuration/acl', 'dda'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/Ampache-Icecast-and-Liquidsoap',
                component: ComponentCreator('/docs/configuration/Ampache-Icecast-and-Liquidsoap', '488'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/api',
                component: ComponentCreator('/docs/configuration/api', '637'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/broadcasts',
                component: ComponentCreator('/docs/configuration/broadcasts', 'ada'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/catalog-filters',
                component: ComponentCreator('/docs/configuration/catalog-filters', '6ad'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/cron',
                component: ComponentCreator('/docs/configuration/cron', 'cde'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/democratic',
                component: ComponentCreator('/docs/configuration/democratic', '256'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/ldap',
                component: ComponentCreator('/docs/configuration/ldap', '041'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/localplay/',
                component: ComponentCreator('/docs/configuration/localplay/', '339'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/localplay/httpq',
                component: ComponentCreator('/docs/configuration/localplay/httpq', '278'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/localplay/kodi',
                component: ComponentCreator('/docs/configuration/localplay/kodi', '0ac'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/localplay/localplay-api',
                component: ComponentCreator('/docs/configuration/localplay/localplay-api', '240'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/localplay/mpd',
                component: ComponentCreator('/docs/configuration/localplay/mpd', '6c3'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/localplay/Sample-Config-With-ALSA-and-Raspberry-PI',
                component: ComponentCreator('/docs/configuration/localplay/Sample-Config-With-ALSA-and-Raspberry-PI', 'b56'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/localplay/Sample-MPD-Config-For-Ampache',
                component: ComponentCreator('/docs/configuration/localplay/Sample-MPD-Config-For-Ampache', 'a91'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/localplay/upnp',
                component: ComponentCreator('/docs/configuration/localplay/upnp', '7fe'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/localplay/vlc',
                component: ComponentCreator('/docs/configuration/localplay/vlc', '51a'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/multi-artist',
                component: ComponentCreator('/docs/configuration/multi-artist', 'beb'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/podcasts',
                component: ComponentCreator('/docs/configuration/podcasts', '10e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/remote-catalogs',
                component: ComponentCreator('/docs/configuration/remote-catalogs', 'f33'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/subsonic',
                component: ComponentCreator('/docs/configuration/subsonic', 'f76'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/transcoding/',
                component: ComponentCreator('/docs/configuration/transcoding/', '227'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/transcoding/transcode-caching',
                component: ComponentCreator('/docs/configuration/transcoding/transcode-caching', '75f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/development/',
                component: ComponentCreator('/docs/development/', 'a04'),
                exact: true
              },
              {
                path: '/docs/development/branch-layout',
                component: ComponentCreator('/docs/development/branch-layout', '2c7'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/development/CONTRIBUTING',
                component: ComponentCreator('/docs/development/CONTRIBUTING', '145'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/development/enhancement-requests',
                component: ComponentCreator('/docs/development/enhancement-requests', 'e9a'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/development/issue-template',
                component: ComponentCreator('/docs/development/issue-template', '97b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/development/TRANSLATIONS',
                component: ComponentCreator('/docs/development/TRANSLATIONS', 'b7d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/help/',
                component: ComponentCreator('/docs/help/', 'ebf'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/help/cli-update-warning',
                component: ComponentCreator('/docs/help/cli-update-warning', '1ca'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/help/import-lastfm-data',
                component: ComponentCreator('/docs/help/import-lastfm-data', 'd9b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/help/preferences-explained',
                component: ComponentCreator('/docs/help/preferences-explained', 'b00'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/help/troubleshooting/ampache7-for-admins',
                component: ComponentCreator('/docs/help/troubleshooting/ampache7-for-admins', '6f2'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/help/troubleshooting/ampache7-for-users',
                component: ComponentCreator('/docs/help/troubleshooting/ampache7-for-users', 'c39'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/help/troubleshooting/chart-faq',
                component: ComponentCreator('/docs/help/troubleshooting/chart-faq', '859'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/help/troubleshooting/cli',
                component: ComponentCreator('/docs/help/troubleshooting/cli', 'ef2'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/help/troubleshooting/faq',
                component: ComponentCreator('/docs/help/troubleshooting/faq', 'a77'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/help/upload-catalogs',
                component: ComponentCreator('/docs/help/upload-catalogs', 'c25'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/information/ampache-use-cases',
                component: ComponentCreator('/docs/information/ampache-use-cases', 'd6a'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/information/ampache7-client-structure-install-type',
                component: ComponentCreator('/docs/information/ampache7-client-structure-install-type', '976'),
                exact: true
              },
              {
                path: '/docs/information/TV-Shows-and-Movies',
                component: ComponentCreator('/docs/information/TV-Shows-and-Movies', '96d'),
                exact: true
              },
              {
                path: '/docs/information/upgrade',
                component: ComponentCreator('/docs/information/upgrade', '598'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/information/Web-Interface',
                component: ComponentCreator('/docs/information/Web-Interface', '07f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/information/web-player',
                component: ComponentCreator('/docs/information/web-player', '97f'),
                exact: true
              },
              {
                path: '/docs/information/which-zip',
                component: ComponentCreator('/docs/information/which-zip', '5ce'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/installation/',
                component: ComponentCreator('/docs/installation/', 'bba'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/installation/catalog',
                component: ComponentCreator('/docs/installation/catalog', 'b3f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/installation/guides/',
                component: ComponentCreator('/docs/installation/guides/', '45f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/installation/guides/cloudron-installation-guide',
                component: ComponentCreator('/docs/installation/guides/cloudron-installation-guide', '408'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/installation/guides/sephtan-installation-guide',
                component: ComponentCreator('/docs/installation/guides/sephtan-installation-guide', 'fdc'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/installation/guides/tutorial-to-install-ampache-on-xampp',
                component: ComponentCreator('/docs/installation/guides/tutorial-to-install-ampache-on-xampp', 'ed4'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/installation/guides/windows-installation-on-iis7.5-from-he99',
                component: ComponentCreator('/docs/installation/guides/windows-installation-on-iis7.5-from-he99', '0f6'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/installation/install-ampache-on-ubuntu2204',
                component: ComponentCreator('/docs/installation/install-ampache-on-ubuntu2204', '79f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/installation/windows-installation-guide',
                component: ComponentCreator('/docs/installation/windows-installation-guide', 'e63'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/old-information/',
                component: ComponentCreator('/docs/old-information/', '1c4'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/old-information/ampache-laravel-next-generation-preview',
                component: ComponentCreator('/docs/old-information/ampache-laravel-next-generation-preview', 'dcd'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/old-information/ampache5-changes',
                component: ComponentCreator('/docs/old-information/ampache5-changes', 'b48'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/old-information/ampache5-for-users',
                component: ComponentCreator('/docs/old-information/ampache5-for-users', '575'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/old-information/ampache6-details',
                component: ComponentCreator('/docs/old-information/ampache6-details', '878'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/old-information/ampache6-for-users',
                component: ComponentCreator('/docs/old-information/ampache6-for-users', '78d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/old-information/installation-v4',
                component: ComponentCreator('/docs/old-information/installation-v4', '6d4'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/old-information/mysql-faq',
                component: ComponentCreator('/docs/old-information/mysql-faq', 'fcf'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/plugins/',
                component: ComponentCreator('/docs/plugins/', 'a66'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/plugins/writing-plugins',
                component: ComponentCreator('/docs/plugins/writing-plugins', 'f54'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/themes',
                component: ComponentCreator('/docs/themes', 'a24'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/donate',
                component: ComponentCreator('/donate', 'd13'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/download',
                component: ComponentCreator('/download', 'f55'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/links',
                component: ComponentCreator('/links', 'c0e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/',
                component: ComponentCreator('/', '928'),
                exact: true,
                sidebar: "api"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
