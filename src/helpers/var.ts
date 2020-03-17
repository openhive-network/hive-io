import { IWallet, IEcoItem } from '~/types/index'

export const ECOSYSTEM: IEcoItem[] = [
  {
    id: 'splinterlands',
    name: 'Splinterlands',
    description: '',
    website: 'https://splinterlands.io',
    type: 'game'
  },
  /* {
    id: 'threespeak',
    name: '3Speak',
    description: '',
    website: 'https://3speak.online/',
    type: 'app'
  }, */
  {
    id: 'steempeak',
    name: 'SteemPeak',
    description: '',
    website: 'https://stempeak.com',
    type: 'app'
  },
  {
    id: 'esteem',
    name: 'Esteem',
    description: '',
    website: 'https://esteem.app',
    type: 'app'
  },
  {
    id: 'steempress',
    name: 'SteemPress',
    description: '',
    website: 'https://www.steempress.io',
    type: 'app'
  },
  {
    id: 'actifit',
    name: 'Actifit',
    description: '',
    website: 'https://actifit.io',
    type: 'app'
  },
  {
    id: 'engrave',
    name: 'Engrave',
    description: '',
    website: 'https://dblog.org',
    type: 'app'
  },
  {
    id: 'hivestem',
    name: 'hiveSTEM',
    description: '',
    website: 'https://steemstem.io',
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
    id: 'keychain',
    name: 'Keychain',
    os: ['web'],
    website: {
      firefox: 'tbd',
      chrome: 'tbd'
    },
    type: 'extension'
  },
  {
    id: 'vessel',
    name: 'Vessel',
    os: ['windows', 'osx', 'linux'],
    website: '',
    type: 'wallet'
  },
  {
    id: 'esteem',
    name: 'esteem',
    os: ['windows', 'osx', 'linux', 'ios', 'android'],
    website: 'https://esteem.app',
    type: 'wallet'
  },
  {
    id: 'steemwallet',
    name: 'SteemWallet',
    os: ['ios', 'android'],
    website: '',
    type: 'wallet'
  },
  {
    id: 'steempeak',
    name: 'Steempeak',
    os: ['web'],
    website: '',
    type: 'wallet'
  }
]
