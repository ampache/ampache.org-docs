import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/',
    component: ComponentCreator('/docs/', 'cdf'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/', '6eb'),
        routes: [
          {
            path: '/docs/',
            component: ComponentCreator('/docs/', 'a96'),
            routes: [
              {
                path: '/docs/clients/',
                component: ComponentCreator('/docs/clients/', 'f5f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/clients/api',
                component: ComponentCreator('/docs/clients/api', '73a'),
                exact: true
              },
              {
                path: '/docs/clients/demo-server',
                component: ComponentCreator('/docs/clients/demo-server', 'b4b'),
                exact: true
              },
              {
                path: '/docs/configuration/',
                component: ComponentCreator('/docs/configuration/', '61d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/configuration/acl',
                component: ComponentCreator('/docs/configuration/acl', 'e12'),
                exact: true
              },
              {
                path: '/docs/configuration/Ampache-Icecast-and-Liquidsoap',
                component: ComponentCreator('/docs/configuration/Ampache-Icecast-and-Liquidsoap', '836'),
                exact: true
              },
              {
                path: '/docs/configuration/api',
                component: ComponentCreator('/docs/configuration/api', 'fab'),
                exact: true
              },
              {
                path: '/docs/configuration/broadcasts',
                component: ComponentCreator('/docs/configuration/broadcasts', 'f42'),
                exact: true
              },
              {
                path: '/docs/configuration/catalog-filters',
                component: ComponentCreator('/docs/configuration/catalog-filters', '902'),
                exact: true
              },
              {
                path: '/docs/configuration/cron',
                component: ComponentCreator('/docs/configuration/cron', '2d8'),
                exact: true
              },
              {
                path: '/docs/configuration/democratic',
                component: ComponentCreator('/docs/configuration/democratic', 'a3d'),
                exact: true
              },
              {
                path: '/docs/configuration/ldap',
                component: ComponentCreator('/docs/configuration/ldap', '2d9'),
                exact: true
              },
              {
                path: '/docs/configuration/localplay/',
                component: ComponentCreator('/docs/configuration/localplay/', 'd6b'),
                exact: true
              },
              {
                path: '/docs/configuration/localplay/HttpQ',
                component: ComponentCreator('/docs/configuration/localplay/HttpQ', 'd4f'),
                exact: true
              },
              {
                path: '/docs/configuration/localplay/Kodi',
                component: ComponentCreator('/docs/configuration/localplay/Kodi', '7bd'),
                exact: true
              },
              {
                path: '/docs/configuration/localplay/Localplay-API',
                component: ComponentCreator('/docs/configuration/localplay/Localplay-API', 'd0b'),
                exact: true
              },
              {
                path: '/docs/configuration/localplay/mpd',
                component: ComponentCreator('/docs/configuration/localplay/mpd', 'a92'),
                exact: true
              },
              {
                path: '/docs/configuration/localplay/MPD-With-ALSA-Config',
                component: ComponentCreator('/docs/configuration/localplay/MPD-With-ALSA-Config', '510'),
                exact: true
              },
              {
                path: '/docs/configuration/localplay/Sample-Config-With-ALSA-and-Raspberry-PI',
                component: ComponentCreator('/docs/configuration/localplay/Sample-Config-With-ALSA-and-Raspberry-PI', 'ef5'),
                exact: true
              },
              {
                path: '/docs/configuration/localplay/Sample-MPD-Config-For-Ampache',
                component: ComponentCreator('/docs/configuration/localplay/Sample-MPD-Config-For-Ampache', 'bca'),
                exact: true
              },
              {
                path: '/docs/configuration/localplay/Upnp',
                component: ComponentCreator('/docs/configuration/localplay/Upnp', '861'),
                exact: true
              },
              {
                path: '/docs/configuration/localplay/VLC',
                component: ComponentCreator('/docs/configuration/localplay/VLC', 'e61'),
                exact: true
              },
              {
                path: '/docs/configuration/multi-artist',
                component: ComponentCreator('/docs/configuration/multi-artist', 'dfb'),
                exact: true
              },
              {
                path: '/docs/configuration/podcasts',
                component: ComponentCreator('/docs/configuration/podcasts', '148'),
                exact: true
              },
              {
                path: '/docs/configuration/remote-catalogs',
                component: ComponentCreator('/docs/configuration/remote-catalogs', '559'),
                exact: true
              },
              {
                path: '/docs/configuration/services',
                component: ComponentCreator('/docs/configuration/services', '8aa'),
                exact: true
              },
              {
                path: '/docs/configuration/subsonic',
                component: ComponentCreator('/docs/configuration/subsonic', '2fd'),
                exact: true
              },
              {
                path: '/docs/configuration/transcoding/',
                component: ComponentCreator('/docs/configuration/transcoding/', 'a5e'),
                exact: true
              },
              {
                path: '/docs/configuration/transcoding/Transcode-Caching',
                component: ComponentCreator('/docs/configuration/transcoding/Transcode-Caching', 'c18'),
                exact: true
              },
              {
                path: '/docs/demo',
                component: ComponentCreator('/docs/demo', '904'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/development/',
                component: ComponentCreator('/docs/development/', '1ed'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/development/Branch-Layout',
                component: ComponentCreator('/docs/development/Branch-Layout', '384'),
                exact: true
              },
              {
                path: '/docs/development/CONTRIBUTING',
                component: ComponentCreator('/docs/development/CONTRIBUTING', '3e3'),
                exact: true
              },
              {
                path: '/docs/development/Enhancement-Requests',
                component: ComponentCreator('/docs/development/Enhancement-Requests', '959'),
                exact: true
              },
              {
                path: '/docs/development/issue-template',
                component: ComponentCreator('/docs/development/issue-template', '144'),
                exact: true
              },
              {
                path: '/docs/development/plugins',
                component: ComponentCreator('/docs/development/plugins', '8f6'),
                exact: true
              },
              {
                path: '/docs/development/TRANSLATIONS',
                component: ComponentCreator('/docs/development/TRANSLATIONS', 'caf'),
                exact: true
              },
              {
                path: '/docs/donate',
                component: ComponentCreator('/docs/donate', 'd90'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/help/',
                component: ComponentCreator('/docs/help/', '73b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/help/import-lastfm-data',
                component: ComponentCreator('/docs/help/import-lastfm-data', '1d8'),
                exact: true
              },
              {
                path: '/docs/help/preferences-explained',
                component: ComponentCreator('/docs/help/preferences-explained', '6ed'),
                exact: true
              },
              {
                path: '/docs/help/upload-catalogs',
                component: ComponentCreator('/docs/help/upload-catalogs', '7bf'),
                exact: true
              },
              {
                path: '/docs/information/',
                component: ComponentCreator('/docs/information/', '4e4'),
                exact: true
              },
              {
                path: '/docs/information/ampache-use-cases',
                component: ComponentCreator('/docs/information/ampache-use-cases', 'd83'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/information/multi-artist',
                component: ComponentCreator('/docs/information/multi-artist', '57b'),
                exact: true
              },
              {
                path: '/docs/information/mysql-faq',
                component: ComponentCreator('/docs/information/mysql-faq', 'd1f'),
                exact: true
              },
              {
                path: '/docs/information/troubleshooting',
                component: ComponentCreator('/docs/information/troubleshooting', 'eff'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/information/troubleshooting/',
                component: ComponentCreator('/docs/information/troubleshooting/', 'd83'),
                exact: true
              },
              {
                path: '/docs/information/troubleshooting/ampache7-for-admins',
                component: ComponentCreator('/docs/information/troubleshooting/ampache7-for-admins', '6c4'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/information/troubleshooting/ampache7-for-users',
                component: ComponentCreator('/docs/information/troubleshooting/ampache7-for-users', '595'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/information/troubleshooting/chart-faq',
                component: ComponentCreator('/docs/information/troubleshooting/chart-faq', '205'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/information/troubleshooting/cli',
                component: ComponentCreator('/docs/information/troubleshooting/cli', '169'),
                exact: true
              },
              {
                path: '/docs/information/troubleshooting/faq',
                component: ComponentCreator('/docs/information/troubleshooting/faq', 'df5'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/information/TV-Shows-and-Movies',
                component: ComponentCreator('/docs/information/TV-Shows-and-Movies', '9bd'),
                exact: true
              },
              {
                path: '/docs/information/Upgrade',
                component: ComponentCreator('/docs/information/Upgrade', 'abf'),
                exact: true
              },
              {
                path: '/docs/information/Web-Interface',
                component: ComponentCreator('/docs/information/Web-Interface', '968'),
                exact: true
              },
              {
                path: '/docs/information/Web-Player',
                component: ComponentCreator('/docs/information/Web-Player', '4ed'),
                exact: true
              },
              {
                path: '/docs/information/which-zip',
                component: ComponentCreator('/docs/information/which-zip', '460'),
                exact: true
              },
              {
                path: '/docs/installation/',
                component: ComponentCreator('/docs/installation/', 'a44'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/installation/catalog',
                component: ComponentCreator('/docs/installation/catalog', 'fde'),
                exact: true
              },
              {
                path: '/docs/installation/Cloudron-Installation-Guide',
                component: ComponentCreator('/docs/installation/Cloudron-Installation-Guide', 'b8d'),
                exact: true
              },
              {
                path: '/docs/installation/install-ampache-on-ubuntu2204',
                component: ComponentCreator('/docs/installation/install-ampache-on-ubuntu2204', '89a'),
                exact: true
              },
              {
                path: '/docs/installation/Installation-v4',
                component: ComponentCreator('/docs/installation/Installation-v4', 'be8'),
                exact: true
              },
              {
                path: '/docs/installation/Sephtan-Installation-Guide',
                component: ComponentCreator('/docs/installation/Sephtan-Installation-Guide', '45c'),
                exact: true
              },
              {
                path: '/docs/installation/Tutorial-to-install-Ampache-on-Xampp',
                component: ComponentCreator('/docs/installation/Tutorial-to-install-Ampache-on-Xampp', '669'),
                exact: true
              },
              {
                path: '/docs/installation/Windows-Installation-Guide',
                component: ComponentCreator('/docs/installation/Windows-Installation-Guide', '1bf'),
                exact: true
              },
              {
                path: '/docs/installation/Windows-installation-on-IIS7.5-(from-he99)',
                component: ComponentCreator('/docs/installation/Windows-installation-on-IIS7.5-(from-he99)', '467'),
                exact: true
              },
              {
                path: '/docs/old-information/',
                component: ComponentCreator('/docs/old-information/', '16b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/old-information/Ampache-Laravel-Next-Generation-Preview',
                component: ComponentCreator('/docs/old-information/Ampache-Laravel-Next-Generation-Preview', '594'),
                exact: true
              },
              {
                path: '/docs/old-information/ampache5-details',
                component: ComponentCreator('/docs/old-information/ampache5-details', '08e'),
                exact: true
              },
              {
                path: '/docs/old-information/ampache5-for-users',
                component: ComponentCreator('/docs/old-information/ampache5-for-users', 'b24'),
                exact: true
              },
              {
                path: '/docs/old-information/ampache6-details',
                component: ComponentCreator('/docs/old-information/ampache6-details', '0a2'),
                exact: true
              },
              {
                path: '/docs/old-information/ampache6-for-users',
                component: ComponentCreator('/docs/old-information/ampache6-for-users', 'ce0'),
                exact: true
              },
              {
                path: '/docs/plugins/',
                component: ComponentCreator('/docs/plugins/', 'fbc'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/plugins/writing-plugins',
                component: ComponentCreator('/docs/plugins/writing-plugins', '532'),
                exact: true
              },
              {
                path: '/docs/themes/',
                component: ComponentCreator('/docs/themes/', '096'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '8bd'),
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
