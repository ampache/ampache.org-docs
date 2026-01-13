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
    {
      type: 'category',
      label: 'Ampache Wiki',
      link: {type: 'doc', id: 'index'},
      items: [
        'index',
        {
          type: 'link',
          label: 'Current Release',
          href: 'https://github.com/ampache/ampache/releases',
        },
        'information/ampache-use-cases',
        {
          type: 'link',
          label: 'Screenshots',
          href: 'https://ampache.org/#preview',
        },
        {
          type: 'category',
          label: 'TroubleShooting',
          link: {type: 'doc', id: 'information/troubleshooting'},
          items: [
            'information/troubleshooting',
            'information/troubleshooting/ampache7-for-admins',
            'information/troubleshooting/ampache7-for-users',
            'information/troubleshooting/faq',
            'information/troubleshooting/chart-faq',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Installation',
      link: {type: 'doc', id: 'installation/installation'},
      items: [
        'installation/installation',
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      link: {type: 'doc', id: 'configuration/configuration'},
      items: [
        'configuration/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Clients',
      link: {type: 'doc', id: 'clients/clients'},
      items: [
        'clients/clients',
      ],
    },
    {
      type: 'category',
      label: 'Plugins',
      link: {type: 'doc', id: 'plugins/plugins'},
      items: [
        'plugins/plugins',
      ],
    },
    {
      type: 'category',
      label: 'Themes',
      link: {type: 'doc', id: 'themes/themes'},
      items: [
        'themes/themes',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      link: {type: 'doc', id: 'development/development'},
      items: [
        'development/development',
      ],
    },
    {
      type: 'category',
      label: 'Help',
      link: {type: 'doc', id: 'help/help'},
      items: [
        'help/help',
      ],
    },
    {
      type: 'category',
      label: 'Old Information',
      link: {type: 'doc', id: 'old-information/old-information'},
      items: [
        'old-information/old-information',
      ],
    },
  ]
};

module.exports = sidebars;
