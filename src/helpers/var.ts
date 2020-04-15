import { IWallet, IEcoItem } from '~/types/index'

/**
 *
 * (
          typeof item.website !== 'string' ? item.website : []
        )
 */
const os = {
  web: {
    icon: ['fas', 'globe'],
    name: 'Web'
  },
  windows: {
    icon: ['fab', 'windows'],
    name: 'Windows'
  },
  macos: {
    icon: ['fab', 'apple'],
    name: 'macOS'
  },
  ios: {
    icon: ['fab', 'app-store-ios'],
    name: 'iOS'
  },
  linux: {
    icon: ['fab', 'linux'],
    name: 'Linux'
  },
  android: {
    icon: ['fab', 'android'],
    name: 'Android'
  },
  firefox: {
    icon: ['fab', 'firefox'],
    name: 'Firefox'
  },
  safari: {
    icon: ['fab', 'safari'],
    name: 'Safari'
  },
  chrome: {
    icon: ['fab', 'chrome'],
    name: 'Chrome'
  },
  brave: {
    icon: ['fab', 'brave'],
    name: 'Brave'
  },
  extension: {
    icon: ['fas', 'puzzle-piece'],
    name: 'Extension'
  }
}

export const ECOSYSTEM: IEcoItem[] = [
  {
    id: 'hiveblog',
    name: 'Hive.Blog',
    description: '',
    image: 'blackhive.png',
    website: 'https://hive.blog',
    type: 'app'
  },
  {
    id: 'peakd',
    name: 'Peakd',
    description: '',
    image: 'peakd.svg',
    website: 'https://peakd.com',
    type: 'app'
  },
  {
    id: 'threespeak',
    name: '3Speak',
    description: '',
    image: 'threespeak.svg',
    website: 'https://3speak.online',
    type: 'app'
  },
  {
    id: 'splinterlands',
    name: 'Splinterlands',
    description: '',
    image: 'splinterlands.png',
    website: 'https://splinterlands.io',
    type: 'game'
  },
  {
    id: 'esteem',
    name: 'Esteem',
    description: '',
    image: 'esteem.svg',
    website: 'https://esteem.app',
    type: 'app'
  },
  {
    id: 'stemsocial',
    name: 'STEMsocial',
    description: '',
    image: 'stemsocial.png',
    website: 'https://stem.openhive.network',
    type: 'app'
  },
  {
    id: 'steempress',
    name: 'SteemPress',
    description: '',
    image: 'steempress.svg',
    website: 'https://www.steempress.io',
    type: 'app'
  },
  {
    id: 'actifit',
    name: 'Actifit',
    description: '',
    image: 'actifit.png',
    website: 'https://actifit.io',
    type: 'app'
  },
  {
    id: 'dlease',
    name: 'DLease',
    description: '',
    image: 'dlease.png',
    website: 'https://dlease.io',
    type: 'app'
  },
  {
    id: 'engrave',
    name: 'Engrave',
    description: '',
    image: 'engrave.png',
    website: 'https://dblog.org',
    type: 'app'
  },

  {
    id: 'brosino',
    name: 'BROsino',
    description: '',
    image: 'brosino.png',
    website: 'https://brosgn.net',
    type: 'app'
  },
  {
    id: 'bropoker',
    name: 'BRO Poker',
    description: '',
    image: 'bropoker.png',
    website: 'https://brosinopoker.com',
    type: 'app'
  }
]

export const BLOCKEXPLORERS = [
  {
    id: 'hiveblocks',
    name: 'HiveBlocks',
    website: 'https://hiveblocks.com'
  }
]

export const WALLETS: IWallet[] = [
  {
    id: 'vessel',
    name: 'Vessel',
    image: 'vessel.png',
    os: [os.windows, os.macos, os.linux],
    website: 'https://github.com/netuoso/vessel/releases',
    type: 'wallet',
    github: 'https://github.com/netuoso/vessel'
  },
  {
    id: 'hivewallet',
    name: 'HiveWallet',
    image: 'hivewallet.png',
    os: [os.ios, os.android],
    website: 'https://hivewallet.app',
    type: 'wallet',
    github: 'https://github.com/roelandp/hivewallet'
  },
  {
    id: 'esteem',
    name: 'Esteem',
    image: 'esteem.svg',
    os: [os.windows, os.macos, os.linux, os.ios, os.android],
    website: 'https://esteem.app',
    type: 'wallet',
    github: 'https://github.com/esteemapp'
  },
  {
    id: 'keychain',
    name: 'Keychain',
    image: 'keychain.svg',
    os: [os.brave, os.chrome, os.firefox],
    website: 'https://github.com/stoodkev/hive-keychain',
    type: 'wallet',
    github: 'https://github.com/stoodkev/hive-keychain'
  },
  {
    id: 'hivesigner',
    name: 'HiveSigner',
    image: 'hivesigner.svg',
    os: [os.web, os.windows, os.macos, os.linux, os.brave, os.chrome],
    website: 'https://hivesigner.com',
    type: 'wallet',
    github: 'https://github.com/ledgerconnect/hivesigner'
  },
  {
    id: 'peakd',
    name: 'Peakd',
    image: 'peakd.svg',
    os: [os.web],
    website: 'https://peakd.com',
    type: 'wallet'
  },
  {
    id: 'wallethiveblog',
    name: 'Hive.Blog',
    image: 'blackhive.png',
    os: [os.web],
    website: 'https://wallet.hive.blog',
    type: 'wallet'
  }
]
