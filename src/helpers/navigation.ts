/**
 * Header Navigation
 */
export const NAVIGATION_HEADER = [
  {
    to: 'about',
    name: 'Learn More',
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
    to: 'https://signup.hive.io',
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
      to: 'https://signup.hive.io',
      name: 'Create Account',
    },
    {
      to: 'brand',
      name: 'Brand Assets',
    },
    {
      to: 'about-contributors',
      name: 'Contributors',
    },
    {
      to: 'about-updates',
      name: 'Updates',
    },

    {
      to: 'https://hive.blog/@hiveio',
      name: 'Blog',
    },

    /* {
      to: 'https://hive.wiki',
      name: 'Wiki'
    }, */
    {
      to: 'mailto:info@hive.io',
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
    /*
    {
      to: 'https://hive.ausbit.dev/hbd',
      name: 'Hive Dollar (HBD)',
    },
    */
    {
      to: 'https://hiveblocks.com',
      name: 'Block Explorer',
    },
    {
      to: 'https://hive.arcange.eu/witnesses',
      name: 'Governance',
    },
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
  {to: 'about-contributors', text: 'Contributors'},
  {to: 'about-updates', text: 'Updates'},
]
