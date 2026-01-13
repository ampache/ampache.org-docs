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
    {
      type: 'category',
      label: 'Information',
      link: {type: 'doc', id: 'information'},
      items: [
        'browse/information',
      ],
    },
    {
      type: 'category',
      label: 'Installation',
      link: {type: 'doc', id: 'installation'},
      items: [
        'installation/installation',
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      link: {type: 'doc', id: 'configuration'},
      items: [
        'configuration/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Clients',
      link: {type: 'doc', id: 'clients'},
      items: [
        'clients/clients',
      ],
    },
    {
      type: 'category',
      label: 'Plugins',
      link: {type: 'doc', id: 'plugins'},
      items: [
        'plugins/plugins',
      ],
    },
    {
      type: 'category',
      label: 'Themes',
      link: {type: 'doc', id: 'themes'},
      items: [
        'themes/themes',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      link: {type: 'doc', id: 'development'},
      items: [
        'development/development',
      ],
    },
    {
      type: 'category',
      label: 'Help',
      link: {type: 'doc', id: 'help'},
      items: [
        'help/help',
      ],
    },
    {
      type: 'category',
      label: 'Old Information',
      link: {type: 'doc', id: 'old-information'},
      items: [
        'old-information/old-information',
      ],
    },
  ]
};

module.exports = sidebars;
