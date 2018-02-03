/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    image: '/img/muyu.png',
    infoLink: 'http://www.muyus.com',
    pinned: true,
  },
];

const siteConfig = {
  title: '木渔' /* title for your website */,
  tagline: '服务框架应用DEMO',
  url: 'http://www.muyus.com' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  projectName: 'muyu-docs',
  headerLinks: [
    {doc: 'doc1', label: 'Docker'},
    {blog: true, label: 'Blog'},
    {href: 'https://github.com/muyus', label: 'GitHub' },
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/muyu.png',
  footerIcon: 'img/muyu.png',
  favicon: 'img/favicon/favicon.ico',
  /* colors for website */
  colors: {
    primaryColor: '#2E8555',
    secondaryColor: '#205C3B',
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Your Name or Your Company Name',
  organizationName: 'muyus', // or set an env variable ORGANIZATION_NAME
  projectName: 'muyus.github.io', // or set an env variable PROJECT_NAME
  facebookAppId: '410082162756490',
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
