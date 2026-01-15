/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  api: [
    'index',
    'demo',
    'donate',
    'docker',
    'download',
    {
      type: 'category',
      label: 'Wiki',
      link: {type: 'doc', id: 'docs/docs'},
      items: [
        'docs/information/ampache-use-cases',
        {
          type: 'link',
          label: 'Screenshots',
          href: '/#preview',
        },
        {
          type: 'category',
          label: 'Installation',
          link: {type: 'doc', id: 'docs/installation/installation'},
          items: [
            'docs/installation/catalog',
            'docs/installation/install-ampache-on-ubuntu2204',
            'docs/installation/windows-installation-guide',
            {
              type: 'category',
              label: 'User Guides',
              link: {type: 'doc', id: 'docs/installation/guides/guides'},
              items: [
                'docs/installation/guides/tutorial-to-install-ampache-on-xampp',
                'docs/installation/guides/sephtan-installation-guide',
                'docs/installation/guides/windows-installation-on-iis7.5-(from-he99)',
                'docs/installation/guides/cloudron-installation-guide',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Configuration',
          link: {type: 'doc', id: 'docs/configuration/configuration'},
          items: [
            'docs/configuration/acl',
            'docs/configuration/remote-catalogs',
            'docs/configuration/ldap',
            'docs/configuration/api',
            'docs/configuration/subsonic',
            'docs/configuration/cron',
            {
              type: 'category',
              label: 'Localplay',
              link: {type: 'doc', id: 'docs/configuration/localplay/localplay'},
              items: [
                'docs/configuration/localplay/mpd',
                'docs/configuration/localplay/kodi',
                'docs/configuration/localplay/upnp',
                'docs/configuration/localplay/vlc',
                'docs/configuration/localplay/httpq',
                'docs/configuration/localplay/localplay-api',
                'docs/configuration/localplay/Sample-MPD-Config-For-Ampache',
                'docs/configuration/localplay/Sample-Config-With-ALSA-and-Raspberry-PI',
              ],
            },
            {
              type: 'category',
              label: 'Transcoding',
              link: {type: 'doc', id: 'docs/configuration/transcoding/transcoding'},
              items: [
                'docs/configuration/transcoding/transcode-caching',
              ],
            },
            'docs/configuration/catalog-filters',
            'docs/configuration/democratic',
            'docs/configuration/Ampache-Icecast-and-Liquidsoap',
            'docs/configuration/multi-artist',
            'docs/configuration/broadcasts',
            'docs/configuration/podcasts',
          ],
        },
        {
          type: 'category',
          label: 'Clients',
          link: {type: 'doc', id: 'docs/clients/clients'},
          items: [
            'docs/clients/api',
            'docs/clients/demo-server',
          ],
        },
        {
          type: 'category',
          label: 'Plugins',
          link: {type: 'doc', id: 'docs/plugins/plugins'},
          items: [
            'docs/plugins/writing-plugins',
          ],
        },
        'docs/themes',
        {
          type: 'category',
          label: 'Development',
          link: {type: 'doc', id: 'docs/development/CONTRIBUTING'},
          items: [
            'docs/development/TRANSLATIONS',
            'docs/development/branch-layout',
            'docs/development/issue-template',
            'docs/development/enhancement-requests',
          ],
        },
        {
          type: 'category',
          label: 'Help',
          link: {type: 'doc', id: 'docs/help/help'},
          items: [
            'docs/help/troubleshooting/ampache7-for-admins',
            'docs/help/troubleshooting/ampache7-for-users',
            'docs/help/troubleshooting/faq',
            'docs/help/troubleshooting/chart-faq',
          ],
        },
        {
          type: 'category',
          label: 'Old Information',
          link: {type: 'doc', id: 'docs/old-information/old-information'},
          items: [
            'docs/old-information/ampache6-details',
            'docs/old-information/ampache6-for-users',
            'docs/old-information/ampache5-changes',
            'docs/old-information/ampache5-for-users',
            'docs/old-information/installation-v4',
            'docs/old-information/mysql-faq',
            'docs/old-information/ampache-laravel-next-generation-preview',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'API',
      link: {type: 'doc', id: 'api/index'},
      items: [
        'api/api-standards',
        'api/api-xml-methods',
        'api/api-json-methods',
        'api/api-errors',
        'api/api-examples',
        'api/api-changelog',
        'docs/configuration/acl',
        'api/api-media-methods',
        {
          type: 'category',
          label: 'Browse Methods',
          link: {type: 'doc', id: 'api/api-browse'},
          items: [
            'api/browse/album-browse',
            'api/browse/artist-browse',
            'api/browse/catalog-browse',
            'api/browse/follower-browse',
            'api/browse/genre-browse',
            'api/browse/label-browse',
            'api/browse/license-browse',
            'api/browse/live_stream-browse',
            'api/browse/playlist-browse',
            'api/browse/podcast_episode-browse',
            'api/browse/podcast-browse',
            'api/browse/share-browse',
            'api/browse/song-browse',
            'api/browse/user-browse',
            'api/browse/video-browse',
          ],
        },
        {
          type: 'category',
          label: 'Advanced Search',
          link: {type: 'doc', id: 'api/api-advanced-search'},
          items: [
            'api/advanced-search/song-advanced-search',
            'api/advanced-search/album-advanced-search',
            'api/advanced-search/artist-advanced-search',
            'api/advanced-search/label-advanced-search',
            'api/advanced-search/playlist-advanced-search',
            'api/advanced-search/podcast-advanced-search',
            'api/advanced-search/podcast-episode-advanced-search',
            'api/advanced-search/user-advanced-search',
            'api/advanced-search/video-advanced-search',
          ],
        },
        'api/subsonic',
        {
          type: 'category',
          label: 'API5',
          link: {type: 'doc', id: 'api/api-5/api-5'},
          items: [
            'api/api-5/api-standards',
            'api/api-5/api-xml-methods',
            'api/api-5/api-json-methods',
            'api/api-5/api-errors',
            'api/api-5/api-advanced-search',
          ],
        },
        {
          type: 'category',
          label: 'API4',
          link: {type: 'doc', id: 'api/api-4/api-4'},
          items: [
            'api/api-4/api-xml-methods',
            'api/api-4/api-json-methods',
            'api/api-4/api-errors',
          ],
        },
        {
          type: 'category',
          label: 'API3',
          link: {type: 'doc', id: 'api/api-3/api-3'},
          items: [
            'api/api-3/api-xml-methods',
            'api/api-3/api-errors',
          ],
        },
        {
          type: 'category',
          label: 'Past Releases',
          link: {type: 'doc', id: 'api/versions/versions'},
          items: [
            {
              type: 'category',
              label: 'API 6.0',
              link: {type: 'doc', id: 'api/versions/api-6.0/api-6.0'},
              items: [
                'api/versions/api-6.0/api-standards',
                'api/versions/api-6.0/api-xml-methods',
                'api/versions/api-6.0/api-json-methods',
                'api/versions/api-6.0/api-errors',
                'api/versions/api-6.0/api-advanced-search',
              ],
            },
            {
              type: 'category',
              label: 'API 5.1',
              link: {type: 'doc', id: 'api/versions/api-5.1/api-5.1'},
              items: [
                'api/versions/api-5.1/api-standards',
                'api/versions/api-5.1/api-xml-methods',
                'api/versions/api-5.1/api-json-methods',
                'api/versions/api-5.1/api-errors',
                'api/versions/api-5.1/api-advanced-search',
              ],
            },
            {
              type: 'category',
              label: 'API 5.0',
              link: {type: 'doc', id: 'api/versions/api-5.0/api-5.0'},
              items: [
                'api/versions/api-5.0/api-standards',
                'api/versions/api-5.0/api-xml-methods',
                'api/versions/api-5.0/api-json-methods',
                'api/versions/api-5.0/api-errors',
                'api/versions/api-5.0/api-advanced-search',
              ],
            },
            {
              type: 'category',
              label: 'API 4.3',
              link: {type: 'doc', id: 'api/versions/api-4.3/api-4.3'},
              items: [
                'api/versions/api-4.3/api-xml-methods',
                'api/versions/api-4.3/api-json-methods',
                'api/versions/api-4.3/api-errors',
                'api/versions/api-4.3/api-advanced-search',
              ],
            },
            {
              type: 'category',
              label: 'API 4.2',
              link: {type: 'doc', id: 'api/versions/api-4.2/api-4.2'},
              items: [
                'api/versions/api-4.2/api-xml-methods',
                'api/versions/api-4.2/api-json-methods',
                'api/versions/api-4.2/api-errors',
                'api/versions/api-4.2/api-advanced-search',
              ],
            },
            {
              type: 'category',
              label: 'API 4.1',
              link: {type: 'doc', id: 'api/versions/api-4.1/api-4.1'},
              items: [
                'api/versions/api-4.1/xml-methods',
              ],
            },
          ],
        },
      ],
    },
    'links',
  ]
};

module.exports = sidebars;
