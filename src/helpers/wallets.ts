import {IWallet} from '~/types/index'

/**
 * Different OS Platforms
 */
const os = {
  web: {
    icon: ['fas', 'globe'],
    name: 'Web',
  },
  windows: {
    icon: ['fab', 'windows'],
    name: 'Windows',
  },
  macos: {
    icon: ['fab', 'apple'],
    name: 'macOS',
  },
  ios: {
    icon: ['fab', 'app-store-ios'],
    name: 'iOS',
  },
  linux: {
    icon: ['fab', 'linux'],
    name: 'Linux',
  },
  android: {
    icon: ['fab', 'android'],
    name: 'Android',
  },
  firefox: {
    icon: ['fab', 'firefox'],
    name: 'Firefox',
  },
  safari: {
    icon: ['fab', 'safari'],
    name: 'Safari',
  },
  chrome: {
    icon: ['fab', 'chrome'],
    name: 'Chrome',
  },
  brave: {
    icon: ['fab', 'brave'],
    name: 'Brave',
  },
  extension: {
    icon: ['fas', 'puzzle-piece'],
    name: 'Extension',
  },
  hardware: {
  icon: ['fas', 'wallet'],
  name: 'Hardware',
  },
}

/**
 * Hive Wallets
 */
export const WALLETS: IWallet[] = [
  {
    id: 'vessel',
    name: 'Vessel',
    image: 'vessel.png',
    os: [os.windows, os.macos, os.linux],
    website: 'https://gitlab.syncad.com/hive/vessel/-/releases',
    types: ['wallet'],
    github: 'https://gitlab.syncad.com/hive/vessel',
  },
  {
    id: 'hivewallet',
    name: 'HiveWallet',
    image: 'hivewallet.png',
    os: [os.ios, os.android],
    website: 'https://hivewallet.app',
    types: ['wallet'],
    github: 'https://github.com/roelandp/hivewallet',
  },
  {
    id: 'ecency',
    name: 'Ecency',
    image: 'ecency.svg',
    os: [os.windows, os.macos, os.linux, os.ios, os.android],
    website: 'https://ecency.com',
    types: ['wallet'],
    github: 'https://github.com/ecency',
  },
  {
    id: 'keychain',
    name: 'Keychain',
    image: 'keychain.svg',
    os: [os.brave, os.chrome, os.firefox, os.ios, os.android],
    website: 'https://hive-keychain.com',
    types: ['wallet'],
    github: 'https://github.com/stoodkev/hive-keychain',
  },
  {
    id: 'inleo',
    name: 'InLeo',
    image: 'inleo.avif',
    os: [os.web],
    website: 'https://inleo.io',
    types: ['wallet'],
    closedSource: true,
  },
  {
    id: 'peakd',
    name: 'Peakd',
    image: 'peakd.svg',
    os: [os.web],
    website: 'https://peakd.com',
    types: ['wallet'],
    closedSource: true,
  },
  {
    id: 'wallethiveblog',
    name: 'Hive.Blog',
    image: 'blackhive.png',
    os: [os.web],
    website: 'https://wallet.hive.blog',
    types: ['wallet'],
    gitlab: 'https://gitlab.syncad.com/hive/condenser',
  },
  {
    id: 'actifit',
    name: 'Actifit',
    image: 'actifit.png',
    os: [os.web],
    website: 'https://actifit.io/wallet',
    types: ['wallet'],
    github: 'https://github.com/actifit/actifit-landingpage',
  },
    {
    id: 'hiveledger',
    name: 'Ledger',
    image: 'ledger.png',
    os: [os.hardware],
    website: 'https://hiveledger.io/auth/login',
    types: ['wallet'],
    github: 'https://gitlab.com/engrave/ledger',
  },

]
