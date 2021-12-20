import {BLOCKEXPLORERS} from './blockexplorers'
import {IEcoItem, EcoType} from '~/types/index'

/**
 * Hive Ecosystem
 */
export const ECOSYSTEM: IEcoItem[] = [
  {
    id: 'splinterlands',
    name: 'Splinterlands',
    description: 'A digital trading card game built on blockchain technology.',
    image: 'splinterlands.png',
    website: 'https://splinterlands.com',
    types: [EcoType.game, EcoType.nft],
    featured: true,
  },
  {
    id: 'peakd',
    name: 'Peakd',
    description: 'Decentralized social media with true ownership.',
    image: 'peakd.svg',
    website: 'https://peakd.com',
    types: [EcoType.social],
    featured: true,
  },
  {
    id: 'hiveblog',
    name: 'Hive.Blog',
    description:
      'Communities without borders. A social network owned and operated by its users.',
    image: 'blackhive.png',
    website: 'https://hive.blog',
    types: [EcoType.social],
    featured: false,
  },
  {
    id: 'nftshowroom',
    name: 'NFTShowroom',
    description:
      'A digital art marketplace that makes creating and collecting rare digital art simple and accessible.',
    image: 'nftshowroom.png',
    website: 'https://nftshowroom.com',
    types: [EcoType.nft],
    featured: true,
  },
  {
    id: 'threespeak',
    name: '3Speak',
    description: 'Tokenised video communities.',
    image: 'threespeak.svg',
    website: 'https://3speak.co',
    types: [EcoType.social, EcoType.video],
    featured: true,
  },
  {
    id: 'ecency',
    name: 'Ecency',
    description:
      'Hot topics on a social network owned and operated by its users.',
    image: 'ecency.svg',
    website: 'https://ecency.com',
    types: [EcoType.social],
    featured: true,
  },
  {
    id: 'leofinance',
    name: 'LeoFinance',
    description:
      'A social platform where users get paid for creating, and interacting with crypto and finance content.',
    image: 'leofinance.png',
    website: 'https://leofinance.io',
    types: [EcoType.social],
    featured: true,
  },
  {
    id: 'rabona',
    name: 'Rabona',
    description: 'Soccer manager built on the Hive blockchain.',
    image: 'rabona.png',
    website: 'https://rabona.io',
    types: [EcoType.game],
    featured: true,
  },
  {
    id: 'cryptobrewmaster',
    name: 'Brewmaster',
    description: 'Craft beer brewing business card game.',
    image: 'cryptobrewmaster.png',
    website: 'https://www.cryptobrewmaster.io/',
    types: [EcoType.game],
    featured: true,
  },

  {
    id: 'dbuzz',
    name: 'D.Buzz',
    description: 'Micro-blogging for Hive.',
    image: 'dbuzz.png',
    website: 'https://d.buzz',
    types: [EcoType.social],
  },
  {
    id: 'engage',
    name: 'Engage',
    description:
      ' A community and conversation manager to stay connected with your Hive audience.',
    image: 'engage.png',
    website: 'https://engage.hivechain.app',
    types: [EcoType.social],
  },
  {
    id: 'travelfeed',
    name: 'TravelFeed',
    description: 'TravelFeed makes travel blogging easy and fun.',
    image: 'travelfeed.png',
    website: 'https://travelfeed.io',
    types: [EcoType.social],
  },
  {
    id: 'truvvl',
    name: 'truvvl',
    description:
      'With truvvl stories, swiping through your favorite travel blogs is fun.',
    image: 'truvvl.svg',
    website: 'https://truvvl.com',
    types: [EcoType.social],
  },
  // {
  //   id: 'stemsocial',
  //   name: 'STEMsocial',
  //   description: '',
  //   image: 'stemsocial.png',
  //   website: 'https://stem.openhive.network',
  //   types: ['app'],
  // },
  {
    id: 'exxp',
    name: 'Exxp',
    description: 'Power your wordpress blog with blockchain technology.',
    image: 'exxp.svg',
    website: 'https://exxp.io',
    types: [EcoType.social],
  },
  {
    id: 'actifit',
    name: 'Actifit',
    description: 'An innovative dapp that rewards your everyday activity.',
    image: 'actifit.png',
    website: 'https://actifit.io',
    types: [EcoType.social],
  },
  {
    id: 'dlease',
    name: 'DLease',
    description:
      'Invest with confidence using our state of the art Digital Asset Leasing platform.',
    image: 'dlease.png',
    website: 'https://dlease.io',
    types: [EcoType.defi],
  },
  {
    id: 'engrave',
    name: 'Engrave',
    description:
      'Create blog and start earning money in three simple steps with HIVE blockchain technology.',
    image: 'engrave.png',
    website: 'https://dblog.org',
    types: [EcoType.social],
  },

  // {
  //   id: 'fullalt',
  //   name: 'FullAlt',
  //   description: 'A set of tools to help tokenise the web.',
  //   image: 'fullalt.png',
  //   website: 'https://www.fullalt.com',
  //   types: [EcoType.tools],
  // },
    {
    id: 'nfttunz',
    name: 'NFTTunz',
    description: 'Music NFTs on Hive.',
    image: 'nfttunz.png',
    website: 'https://nfttunz.io',
    types: [EcoType.nft],
  },
  {
    id: 'dcrops',
    name: 'dCrops',
    description: 'A decentralized farm simulator.',
    image: 'dcrops.svg',
    website: 'https://dcrops.com',
    types: [EcoType.game, EcoType.nft],
  },
  {
    id: 'lucksacks',
    name: 'Lucksacks Poker',
    description:
      'Host a custom poker league, tournament, ring game or sit-n-go.',
    image: 'lucksacks.png',
    website: 'https://lucksacks.com',
    types: [EcoType.game],
  },

  {
    id: 'stemgeeks',
    name: 'STEMGeeks',
    description: 'A Science, Technology, Engineering, and Math community.',
    image: 'stemgeeks.png',
    website: 'https://stemgeeks.net',
    types: [EcoType.social],
  },
  {
    id: 'dcity',
    name: 'dCity',
    description: 'Build your dCITY on NFT assets.',
    image: 'dcity.png',
    website: 'https://dcity.io',
    types: [EcoType.game],
  },

  {
    id: 'risingstar',
    name: 'Rising Star',
    description:
      'Go from poor busker to super star with this crypto currency trading card game.',
    image: 'risingstar.png',
    website: 'https://www.risingstargame.com/',
    types: [EcoType.game],
  },
  {
    id: 'nftmart',
    name: 'NFTMart',
    description: 'An NFT market for Hive. Mostly card games.',
    image: 'nftmart.png',
    website: 'https://www.nftm.art/',
    types: [EcoType.nft],
  },
  {
    id: 'vimm',
    name: 'Vimm',
    description: 'Web3 video platform for gamers and independent creators.',
    image: 'vimm.png',
    website: 'https://www.vimm.tv/',
    types: [EcoType.social, EcoType.video],
  },
  {
    id: 'dlux',
    name: 'DLux',
    description:
      'Build, post, and monetize virtual reality experiences without needing to know any code.',
    image: 'dlux.svg',
    website: 'https://www.dlux.io/',
    types: [EcoType.nft, EcoType.tools],
  },
  {
    id: 'hivebuzz',
    name: 'HiveBuzz',
    description:
      'Track your achievements on the Hive blockchain.',
    image: 'hivebuzz.png',
    website: 'https://hivebuzz.me',
    types: [EcoType.tools],
  },
    {
    id: 'hivepunks',
    name: 'HivePunks',
    description:
      'Collectible auto-generated NFT punks.',
    image: 'hivepunks.png',
    website: 'https://punks.usehive.com',
    types: [EcoType.nft],
  },
    {
    id: 'liketu',
    name: 'Liketu',
    description:
      'A visual social network for the web of tomorrow.',
    image: 'liketu.png',
    website: 'https://liketu.net',
    types: [EcoType.social],
  },
  {
    id: 'apeminingclub',
    name: 'Ape Mining Club',
    description:
      'An idle simulation game that incorporates its own APE token.',
    image: 'apeminingclub.png',
    website: 'https://apemining.club',
    types: [EcoType.game],
  },
  {
    id: 'tribaldex',
    name: 'Tribaldex',
    description:
      'Create Tokens + Smart Contracts on the Hive blockchain.',
    image: 'tribaldex.png',
    website: 'https://tribaldex.com',
    types: [EcoType.defi],
  },
].concat(BLOCKEXPLORERS as any)

export const TYPE_COLORS = {
  game: {
    background: '#faea7e8c',
    text: 'rgb(117 104 20)',
  },
  social: {
    background: '#7efac08c',
    text: 'rgb(20 121 75)',
  },
  nft: {
    background: '#917efa8c',
    text: '#0c062d8c',
  },
  defi: {
    background: '#7eaafa8c',
    text: 'rgb(54 100 182)',
  },
  tools: {
    background: '#7ed2fa8c',
    text: '#0426378c',
  },
  travel: {
    background: '#faea7e8c',
    text: '#faea7e8c',
  },
  wordpress: {
    background: '#faea7e8c',
    text: '#faea7e8c',
  },
  sport: {
    background: '#faea7e8c',
    text: '#faea7e8c',
  },
  explorer: {
    background: '#faea7e8c',
    text: '#faea7e8c',
  },
  wallet: {
    background: '#faa07e8c',
    text: '#faa07e8c',
  },
  video: {
    background: '#faa07e8c',
    text: 'rgb(166 77 43)',
  },
}
