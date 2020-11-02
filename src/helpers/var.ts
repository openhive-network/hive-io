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
    id: 'splinterlands',
    name: 'Splinterlands',
    description: '',
    image: 'splinterlands.png',
    website: 'https://splinterlands.com',
    type: 'game'
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
    id: 'hiveblog',
    name: 'Hive.Blog',
    description: '',
    image: 'blackhive.png',
    website: 'https://hive.blog',
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
    id: 'dbuzz',
    name: 'D.Buzz',
    description: '',
    image: 'dbuzz.png',
    website: 'https://d.buzz',
    type: 'app'
  },
  {
    id: 'cryptobrewmaster',
    name: 'Brewmaster',
    description: '',
    image: 'cryptobrewmaster.png',
    website: 'https://www.cryptobrewmaster.io/',
    type: 'game'
  },
  {
    id: 'ecency',
    name: 'Ecency',
    description: '',
    image: 'ecency.svg',
    website: 'https://ecency.com',
    type: 'app'
  },
  {
    id: 'rabona',
    name: 'Rabona',
    description: '',
    image: 'rabona.png',
    website: 'https://rabona.io',
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
    id: 'exxp',
    name: 'Exxp',
    description: '',
    image: 'exxp.svg',
    website: 'https://exxp.io',
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
    id: 'fullalt',
    name: 'FullAlt',
    description: '',
    image: 'fullalt.png',
    website: 'https://www.fullalt.com',
    type: 'app'
  },
  {
    id: 'lucksacks',
    name: 'Lucksacks Poker',
    description: '',
    image: 'lucksacks.png',
    website: 'https://lucksacks.com',
    type: 'game'
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
    id: 'keychain',
    name: 'Keychain',
    image: 'keychain.svg',
    os: [os.brave, os.chrome, os.firefox],
    website:
      'https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep',
    type: 'wallet',
    github: 'https://github.com/stoodkev/hive-keychain'
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
    id: 'ecency',
    name: 'Ecency',
    image: 'ecency.svg',
    os: [os.windows, os.macos, os.linux, os.ios, os.android],
    website: 'https://ecency.com',
    type: 'wallet',
    github: 'https://github.com/ecency'
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
    id: 'actifit',
    name: 'Actifit',
    image: 'actifit.png',
    os: [os.web],
    website: 'https://actifit.io/wallet',
    type: 'wallet',
    github: 'https://github.com/actifit/actifit-landingpage'
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

export const EXCHANGES = [
  {
    id: 'binance',
    name: 'Binance',
    website: 'https://www.binance.com/en/trade/HIVE_USDT',
    image: 'binance.svg'
  },
  {
    id: 'blocktrades',
    name: 'Blocktrades',
    website: 'https://www.blocktrades.us/en/trade?output_coin_type=hive',
    image: 'blocktrades.svg'
  },
  {
    id: 'bitsonic',
    name: 'BITSONIC',
    website: 'https://bitsonic.co.kr/front/en/exchange/hive-usdt',
    image: 'bitsonic.svg'
  },
  {
    id: 'bittrex',
    name: 'Bittrex',
    website: 'https://global.bittrex.com/Market/Index?MarketName=USD-HIVE',
    image: 'bittrex.svg'
  },
  {
    id: 'coindcx',
    name: 'CoinDCX',
    website: 'https://coindcx.com/trade/HIVEUSDT',
    image: 'coindcx.svg'
  },
  {
    id: 'cryptex24',
    name: 'Cryptex24',
    website: 'https://www.cryptex24.io/trade/HIVE&USDT',
    image: 'cryptex24.svg'
  },
  {
    id: 'gateio',
    name: 'gate.io',
    website: 'https://www.gate.io/trade/HIVE_USDT',
    image: 'gateio.svg'
  },
  {
    id: 'hbtc',
    name: 'HBTC',
    website: 'https://www.hbtc.com/exchange/HIVE1/USDT',
    image: 'hbtc.png'
  },
  {
    id: 'hiveengine',
    name: 'Hive Engine',
    website: 'https://hive-engine.com/?p=market&t=SWAP.HIVE',
    image: 'hive-engine.png'
  },
  {
    id: 'hotbit',
    name: 'HOTBIT',
    website: 'https://www.hotbit.io/exchange?symbol=HIVE_USDT',
    image: 'hotbit.png'
  },
  {
    id: 'huobi',
    name: 'Huobi',
    website: 'https://www.huobi.com/en-us/exchange/hive_usdt/',
    image: 'huobi.svg'
  },
  {
    id: 'ionomy',
    name: 'Ionomy',
    website: 'https://ionomy.com/en/markets/btc-hive',
    image: 'ionomy.png'
  },
  {
    id: 'mxc',
    name: 'MXC',
    website: 'https://www.mxc.com/trade/easy#HIVE_USDT',
    image: 'mxc.png'
  },
  {
    id: 'probit',
    name: 'ProBit',
    website: 'https://www.probit.com/app/exchange/HIVE-USDT',
    image: 'probit_white.png'
  },
  {
    id: 'sequoir',
    name: 'Sequoir',
    website: 'https://app.sequoir.com/assets/hive',
    image: 'sequoir.svg'
  },
  {
    id: 'steemengine',
    name: 'Steem Engine',
    website: 'https://steem-engine.com/?p=market&t=HIVEP',
    image: 'steem-engine.svg'
  },
  {
    id: 'swapspace',
    name: 'SwapSpace',
    website: 'https://swapspace.co/?from=btc&to=hive&amount=0.1',
    image: 'swapspace.svg'
  },
  {
    id: 'swapzone',
    name: 'Swapzone',
    website: 'https://swapzone.io/?to=hive',
    image: 'swapzone.svg'
  },
  {
    id: 'upbit',
    name: 'UPbit',
    website: 'https://upbit.com/exchange?code=CRIX.UPBIT.BTC-HIVE',
    image: 'upbit.svg'
  },
  {
    id: 'wazirx',
    name: 'WazirX',
    website: 'https://wazirx.com/exchange/HIVE-USDT',
    image: 'wazirx.png'
  }
]

export const STATISTIC_WEBSITES = [
  {
    id: 'dapp-com',
    name: 'Dapp.com',
    website: 'https://dapp.com/dapps/hive',
    image: 'dapp-com.png'
  },
  {
    id: 'stateofthedapps',
    name: 'State of the Dapps',
    website: 'https://stateofthedapps.com/rankings',
    image: 'stateofthedapps.svg'
  },

  {
    id: 'dapp-review',
    name: 'Dapp Review',
    website: 'https://dapp.review/explore/hive',
    image: 'dapp-review.svg'
  },
  {
    id: 'hivedapps-com',
    name: 'HiveDapps',
    website: 'https://hivedapps.com',
    image: 'hivedapps-com.svg'
  }
]
