import {IWallet, IEcoItem} from '~/types/index'

export const INFOBAR = {
  show: false,
  date: '2020-12-18T15:30:00+00:00',
  url: 'https://hivefe.st',
  // If empty, only url is used
  urlReady: '',
  // Should timer be hidden when date is reached?
  hideWhenReady: false,
  // Shown when timer is NOT reacher
  title: 'HiveFest in',
  // titleDesktopOnly is displayed BEFORE the title ONLY on desktop and hidden on mobile
  titleDesktopOnly: '',

  // Shown when date is reached
  titleReady: 'HiveFest is happening!',

  // Show when route is active
  routes: ['index'],
}

/**
 * Header Navigation
 */
export const NAVIGATION_HEADER = [
  {
    to: 'about',
    name: 'About',
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
    name: 'Developer',
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
      name: 'About',
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
    {
      to: 'https://hive.ausbit.dev/hbd',
      name: 'Hive Dollar (HBD)',
    },
    {
      to: 'https://hiveblocks.com',
      name: 'Block Explorer',
    },
    {
      to: 'https://hiveprojects.io',
      name: 'Projects',
    },
    {
      to: 'https://hivekings.com/witnesses',
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
      to: 'developer',
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

/**
 * Social Media Profiles of Hive
 */
export const SOCIAL_MEDIAS = [
  {
    icon: 'hive',
    link: 'https://hive.blog/@hiveio',
  },
  {
    icon: 'github',
    link: 'https://github.com/openhive-network/hive',
  },
  {
    icon: 'gitlab',
    link: 'https://gitlab.hive.io',
  },
  {
    icon: 'twitter',
    link: 'https://twitter.com/hiveblocks',
  },
  {
    icon: 'youtube',
    link: 'https://www.youtube.com/channel/UCwM89V7NzVIHizgWT3GxhwA',
  },
  {
    icon: 'medium',
    link: 'https://medium.com/@hiveblocks',
  },
  {
    icon: 'telegram',
    link: 'https://t.me/hiveblockchain',
  },
  {
    icon: 'reddit',
    link: 'https://reddit.com/r/hivenetwork',
  },
  {
    icon: 'discord',
    link: 'https://myhive.li/discord',
  },
  {
    icon: 'facebook',
    link: 'https://www.facebook.com/hiveblocks/',
  },
  {
    icon: 'quora',
    link: 'https://www.quora.com/q/hive',
  },
]

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
}

/**
 * Hive Ecosystem
 */
export const ECOSYSTEM: IEcoItem[] = [
  {
    id: 'splinterlands',
    name: 'Splinterlands',
    description: '',
    image: 'splinterlands.png',
    website: 'https://splinterlands.com',
    type: 'game',
  },
  {
    id: 'peakd',
    name: 'Peakd',
    description: '',
    image: 'peakd.svg',
    website: 'https://peakd.com',
    type: 'app',
  },
  {
    id: 'hiveblog',
    name: 'Hive.Blog',
    description: '',
    image: 'blackhive.png',
    website: 'https://hive.blog',
    type: 'app',
  },
  {
    id: 'threespeak',
    name: '3Speak',
    description: '',
    image: 'threespeak.svg',
    website: 'https://3speak.online',
    type: 'app',
  },
  {
    id: 'cryptobrewmaster',
    name: 'Brewmaster',
    description: '',
    image: 'cryptobrewmaster.png',
    website: 'https://www.cryptobrewmaster.io/',
    type: 'game',
  },
  {
    id: 'ecency',
    name: 'Ecency',
    description: '',
    image: 'ecency.svg',
    website: 'https://ecency.com',
    type: 'app',
  },
  {
    id: 'rabona',
    name: 'Rabona',
    description: '',
    image: 'rabona.png',
    website: 'https://rabona.io',
    type: 'app',
  },
  {
    id: 'dbuzz',
    name: 'D.Buzz',
    description: '',
    image: 'dbuzz.png',
    website: 'https://d.buzz',
    type: 'app',
  },
  {
    id: 'stemsocial',
    name: 'STEMsocial',
    description: '',
    image: 'stemsocial.png',
    website: 'https://stem.openhive.network',
    type: 'app',
  },
  {
    id: 'exxp',
    name: 'Exxp',
    description: '',
    image: 'exxp.svg',
    website: 'https://exxp.io',
    type: 'app',
  },
  {
    id: 'actifit',
    name: 'Actifit',
    description: '',
    image: 'actifit.png',
    website: 'https://actifit.io',
    type: 'app',
  },
  {
    id: 'dlease',
    name: 'DLease',
    description: '',
    image: 'dlease.png',
    website: 'https://dlease.io',
    type: 'app',
  },
  {
    id: 'engrave',
    name: 'Engrave',
    description: '',
    image: 'engrave.png',
    website: 'https://dblog.org',
    type: 'app',
  },

  {
    id: 'fullalt',
    name: 'FullAlt',
    description: '',
    image: 'fullalt.png',
    website: 'https://www.fullalt.com',
    type: 'app',
  },
  {
    id: 'lucksacks',
    name: 'Lucksacks Poker',
    description: '',
    image: 'lucksacks.png',
    website: 'https://lucksacks.com',
    type: 'game',
  },
  {
    id: 'leofinance',
    name: 'LeoFinance',
    description: '',
    image: 'leofinance.png',
    website: 'https://leofinance.io',
    type: 'app',
  },
  {
    id: 'stemgeeks',
    name: 'STEMGeeks',
    description: '',
    image: 'stemgeeks.png',
    website: 'https://stemgeeks.net',
    type: 'app',
  },
  {
    id: 'dcity',
    name: 'dCity',
    description: '',
    image: 'dcity.png',
    website: 'https://dcity.io',
    type: 'app',
  },
  {
    id: 'nftshowroom',
    name: 'NFTShowroom',
    description: '',
    image: 'nftshowroom.png',
    website: 'https://nftshowroom.com',
    type: 'app',
  },
]

/**
 * Hive Blockchain Explorers
 */
export const BLOCKEXPLORERS = [
  {
    id: 'hiveblocks',
    name: 'HiveBlocks',
    website: 'https://hiveblocks.com',
  },
]

/**
 * Hive Wallets
 */
export const WALLETS: IWallet[] = [
  {
    id: 'vessel',
    name: 'Vessel',
    image: 'vessel.png',
    os: [os.windows, os.macos, os.linux],
    website: 'https://github.com/netuoso/vessel/releases',
    type: 'wallet',
    github: 'https://github.com/netuoso/vessel',
  },
  {
    id: 'keychain',
    name: 'Keychain',
    image: 'keychain.svg',
    os: [os.brave, os.chrome, os.firefox],
    website:
      'https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep',
    type: 'wallet',
    github: 'https://github.com/stoodkev/hive-keychain',
  },
  {
    id: 'hivewallet',
    name: 'HiveWallet',
    image: 'hivewallet.png',
    os: [os.ios, os.android],
    website: 'https://hivewallet.app',
    type: 'wallet',
    github: 'https://github.com/roelandp/hivewallet',
  },
  {
    id: 'ecency',
    name: 'Ecency',
    image: 'ecency.svg',
    os: [os.windows, os.macos, os.linux, os.ios, os.android],
    website: 'https://ecency.com',
    type: 'wallet',
    github: 'https://github.com/ecency',
  },
  {
    id: 'hivesigner',
    name: 'HiveSigner',
    image: 'hivesigner.svg',
    os: [os.web, os.windows, os.macos, os.linux, os.brave, os.chrome],
    website: 'https://hivesigner.com',
    type: 'wallet',
    github: 'https://github.com/ledgerconnect/hivesigner',
  },
  {
    id: 'actifit',
    name: 'Actifit',
    image: 'actifit.png',
    os: [os.web],
    website: 'https://actifit.io/wallet',
    type: 'wallet',
    github: 'https://github.com/actifit/actifit-landingpage',
  },
  {
    id: 'peakd',
    name: 'Peakd',
    image: 'peakd.svg',
    os: [os.web],
    website: 'https://peakd.com',
    type: 'wallet',
  },
  {
    id: 'wallethiveblog',
    name: 'Hive.Blog',
    image: 'blackhive.png',
    os: [os.web],
    website: 'https://wallet.hive.blog',
    type: 'wallet',
  },
]

/**
 * Exchanges where Hive is listed on
 */
export const EXCHANGES = [
  {
    id: 'binance',
    name: 'Binance',
    website: 'https://www.binance.com/en/trade/HIVE_USDT',
    image: 'binance.svg',
  },
  {
    id: 'blocktrades',
    name: 'Blocktrades',
    website: 'https://www.blocktrades.us/en/trade?output_coin_type=hive',
    image: 'blocktrades.svg',
  },
  {
    id: 'beaxy',
    name: 'Beaxy',
    website: 'https://exchange.beaxy.com/?pair=HIVEBTC',
    image: 'beaxy.png',
  },
  {
    id: 'bitsonic',
    name: 'BITSONIC',
    website: 'https://bitsonic.co.kr/front/en/exchange/hive-usdt',
    image: 'bitsonic.svg',
  },
  {
    id: 'bittrex',
    name: 'Bittrex',
    website: 'https://global.bittrex.com/Market/Index?MarketName=USD-HIVE',
    image: 'bittrex.svg',
  },
  {
    id: 'coindcx',
    name: 'CoinDCX',
    website: 'https://coindcx.com/trade/HIVEUSDT',
    image: 'coindcx.svg',
  },
  {
    id: 'cryptex24',
    name: 'Cryptex24',
    website: 'https://www.cryptex24.io/trade/HIVE&USDT',
    image: 'cryptex24.svg',
  },
  {
    id: 'gateio',
    name: 'gate.io',
    website: 'https://www.gate.io/trade/HIVE_USDT',
    image: 'gateio.svg',
  },
  {
    id: 'hbtc',
    name: 'HBTC',
    website: 'https://www.hbtc.com/exchange/HIVE1/USDT',
    image: 'hbtc.png',
  },
  {
    id: 'hiveengine',
    name: 'Hive Engine',
    website: 'https://hive-engine.com/?p=market&t=SWAP.HIVE',
    image: 'hive-engine.png',
  },
  {
    id: 'hotbit',
    name: 'HOTBIT',
    website: 'https://www.hotbit.io/exchange?symbol=HIVE_USDT',
    image: 'hotbit.png',
  },
  {
    id: 'huobi',
    name: 'Huobi',
    website: 'https://www.huobi.com/en-us/exchange/hive_usdt/',
    image: 'huobi.svg',
  },
  {
    id: 'ionomy',
    name: 'Ionomy',
    website: 'https://ionomy.com/en/markets/btc-hive',
    image: 'ionomy.png',
  },
  {
    id: 'mxc',
    name: 'MXC',
    website: 'https://www.mxc.com/trade/easy#HIVE_USDT',
    image: 'mxc.png',
  },
  {
    id: 'probit',
    name: 'ProBit',
    website: 'https://www.probit.com/app/exchange/HIVE-USDT',
    image: 'probit_white.png',
  },
  {
    id: 'sequoir',
    name: 'Sequoir',
    website: 'https://app.sequoir.com/assets/hive',
    image: 'sequoir.svg',
  },
  {
    id: 'steemengine',
    name: 'Steem Engine',
    website: 'https://steem-engine.com/?p=market&t=HIVEP',
    image: 'steem-engine.svg',
  },
  {
    id: 'swapspace',
    name: 'SwapSpace',
    website: 'https://swapspace.co/?from=btc&to=hive&amount=0.1',
    image: 'swapspace.svg',
  },
  {
    id: 'swapzone',
    name: 'Swapzone',
    website: 'https://swapzone.io/?to=hive',
    image: 'swapzone.svg',
  },
  {
    id: 'upbit',
    name: 'UPbit',
    website: 'https://upbit.com/exchange?code=CRIX.UPBIT.BTC-HIVE',
    image: 'upbit.svg',
  },
  {
    id: 'wazirx',
    name: 'WazirX',
    website: 'https://wazirx.com/exchange/HIVE-USDT',
    image: 'wazirx.png',
  },
]

/**
 * Dapp Statistic Websites where Hive is listed on (is randomized each visit)
 */
export const STATISTIC_WEBSITES = [
  {
    id: 'dapp-com',
    name: 'Dapp.com',
    website: 'https://dapp.com/dapps/hive',
    image: 'dapp-com.png',
  },
  {
    id: 'stateofthedapps',
    name: 'State of the Dapps',
    website: 'https://stateofthedapps.com/rankings',
    image: 'stateofthedapps.svg',
  },

  {
    id: 'dapp-review',
    name: 'Dapp Review',
    website: 'https://dapp.review/explore/hive',
    image: 'dapp-review.svg',
  },
  {
    id: 'hivedapps-com',
    name: 'HiveDapps',
    website: 'https://hivedapps.com',
    image: 'hivedapps-com.svg',
  },
]
