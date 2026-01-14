// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ampache',
  tagline: 'For the love of music',
  url: 'https://ampache.org/',
  baseUrl: '/',
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

  //plugins: [require.resolve('docusaurus-plugin-image-zoom')],

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
          src: 'img/logo/ampache-logo.png',
          href: '/',
        },
        items: [
          {to: '/demo', label: 'Demo', position: 'right'},
          {to: '/donate', label: 'Donate', position: 'right'},
          {to: '/docker', label: 'Docker', position: 'right'},
          {to: '/download', label: 'Download', position: 'right'},
          {to: '/docs', label: 'Wiki', position: 'right'},
          {to: '/api', label: 'API', position: 'right'},
          {to: '/links', label: 'Links', position: 'right', className: 'navbar-links' },
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
      zoom: {
        selector: '.markdown .zoomable img:not(.no-zoom)',
        background: {
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(50, 50, 50)'
        },
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
          container: '.zoomable'
        }
      }
    }),
};

module.exports = config;
