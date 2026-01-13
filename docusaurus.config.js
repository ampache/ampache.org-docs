// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ampache Wiki',
  tagline: 'For the love of music',
  url: 'https://ampache.org/',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ampache', // Usually your GitHub org/user name.
  projectName: 'ampache', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    }
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false, // Optional: disable the blog plugin
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'Ampache',
        logo: {
          alt: 'Ampache Logo',
          src: 'img/ampache-logo.png',
          href: 'https://ampache.org',
          className: 'navbar_logo',
        },
        items: [
          {to: 'https://ampache.org', label: 'Home', position: 'right'},
          {to: 'https://ampache.org/demo.html', label: 'Demo', position: 'right'},
          {to: 'https://ampache.org/donate.html', label: 'Donate', position: 'right'},
          {to: 'https://github.com/ampache/ampache/releases', label: 'Download', position: 'right'},
          {to: 'https://ampache.org/docs', label: 'Wiki', position: 'right'},
          {to: 'https://ampache.org/api', label: 'API', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
        ],
        copyright: `Copyright © 2001 - ${new Date().getFullYear()} Ampache.org`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
