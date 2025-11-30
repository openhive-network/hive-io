/**
 * Header Navigation with Dropdowns
 */
export const NAVIGATION_HEADER_DROPDOWN = [
  {
    name: 'Learn',
    children: [
      {
        to: 'about',
        name: 'About Hive',
        description: 'Learn about the Hive blockchain',
      },
      {
        to: 'roadmap',
        name: 'Roadmap',
        description: "See what's coming next",
      },
      {
        to: 'contributors',
        name: 'Contributors',
        description: 'Meet the people behind Hive',
      },
      {
        to: 'hbd',
        name: 'Hive Dollar (HBD)',
        description: 'Stablecoin with 15% APR',
      },
    ],
  },
  {
    name: 'Build',
    children: [
      {
        to: 'https://developers.hive.io',
        name: 'Developer Portal',
        description: 'Developer resources and guides',
      },
      {
        to: 'https://gitlab.syncad.com/hive',
        name: 'Repositories',
        description: 'Browser Hive applications and source code',
      },
      {
        to: 'core-dev-meetings',
        name: 'Core Dev Meetings',
        description: 'Recordings of core developer meetings',
      },
    ],
  },
  {
    name: 'Ecosystem',
    children: [
      {
        name: 'Apps',
        description: 'Discover Hive dApps',
        to: 'eco',
      },
      {
        to: 'wallets',
        name: 'Wallets',
        description: 'Secure your HIVE and HBD',
      },
      {
        name: 'Frontends',
        description: 'Popular Hive interfaces',
        submenu: [
          {
            to: 'https://hive.blog',
            name: 'Hive Blog',
            description: 'Default Hive blogging platform',
          },
          {
            to: 'https://peakd.com',
            name: 'Peakd',
            description: 'Popular Hive blogging platform',
          },
          {
            to: 'https://ecency.com',
            name: 'Ecency',
            description: 'Popular Hive blogging platform',
          },
          {
            to: 'https://inleo.io',
            name: 'INLEO',
            description: 'Microblogging on Hive',
          },
        ],
      },

      {
        name: 'Block Explorers',
        description: 'Browse blockchain data',
        submenu: [
          {
            to: 'https://hivehub.dev',
            name: 'HiveHub',
            description: 'Block explorer for the Hive ecosystem',
            external: true,
          },
          {
            to: 'https://explore.openhive.network/',
            name: 'OpenHive Explorer',
            description: 'Block explorer for the Hive ecosystem',
            external: true,
          },
        ],
      },
    ],
  },
  {
    to: 'join',
    name: 'Join',
    isButton: true,
  },
]

/**
 * Header Navigation (Legacy - kept for backwards compatibility)
 */
export const NAVIGATION_HEADER = [
  {
    to: 'about',
    name: 'Learn More',
  },
  {
    to: 'roadmap',
    name: 'Roadmap',
  },
  {
    to: 'eco',
    name: 'Ecosystem',
  },
  {
    to: 'wallets',
    name: 'Wallets',
  },
  {
    to: 'https://developers.hive.io',
    name: 'Developers',
  },
  {
    to: 'join',
    name: 'Join',
    isButton: true,
  },
]

/**
 * Footer Navigation
 * Each array is a group
 */
export const NAVIGATION_FOOTER = [
  [
    {
      to: 'about',
      name: 'Learn More',
    },
    {
      to: 'join',
      name: 'Create Account',
    },
    {
      to: 'brand',
      name: 'Brand Assets',
    },
    {
      to: 'contributors',
      name: 'Contributors',
    },
    // {
    //  to: 'about-updates',
    //  name: 'Updates',
    // },

    {
      to: 'https://hive.blog/@hiveio',
      name: 'Blog',
    },

    /* {
      to: 'https://hive.wiki',
      name: 'Wiki'
    }, */
    {
      to: 'mailto:outreach@hive.io',
      name: 'Contact',
    },
    /* {
      to: 'contributors',
      name: 'Contributors'
    } */
  ],
  [
    {
      to: 'eco',
      name: 'Ecosystem',
    },
    {
      to: 'roadmap',
      name: 'Roadmap',
    },
    {
      to: 'hbd',
      name: 'Hive Dollar (HBD)',
    },
    {
      to: 'https://explore.openhive.network',
      name: 'Block Explorer',
    },
    {
      to: 'https://explore.openhive.network/witnesses',
      name: 'Governance',
    },
    //  {
    //     to: 'https://whyhive.co/',
    //     name: 'Why Hive',
    //  },
    /* {
      to: 'eco',
      name: 'dApps Statistics'
    }, */
  ],
  [
    {
      to: 'wallets',
      name: 'Wallets',
    },
  ],
  [
    {
      to: 'developers',
      name: 'Developer',
    },
    {
      to: 'https://developers.hive.io',
      name: 'Documentation',
    },
    {
      to: 'https://hive.io/whitepaper.pdf',
      name: 'Whitepaper',
    },
    {
      to: 'https://hive.blue/docs/technical-vision.pdf',
      name: 'Technical Vision',
    },
    {
      to: 'https://github.com/openhive-network/hive',
      name: 'GitHub',
    },
    {
      to: 'https://gitlab.hive.io',
      name: 'GitLab',
    },
  ],
]

export const ABOUT_NAVIGATION = [
  {
    to: 'about',
    text: 'About Hive',
  },
  {to: 'contributors', text: 'Contributors'},
  //  {to: 'updates', text: 'Updates'},
]
