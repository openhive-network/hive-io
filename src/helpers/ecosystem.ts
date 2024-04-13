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
    website: 'https://3speak.tv',
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
    id: 'holozing',
    name: 'Holozing',
    description:
      'A roleplaying adventure game for both casual and competitive players.',
    image: 'holozing.png',
    website: 'https://holozing.com/',
    types: [EcoType.game, EcoType.nft],
    featured: true,
  },
  {
    id: 'splinterroyale',
    name: 'Splinter Royale',
    description: 'Web3 Trading Card Game meets fast-paced Auto Chess Battler.',
    image: 'splinterroyale.png',
    website: 'https://splinterroyale.com',
    types: [EcoType.game, EcoType.nft],
    featured: true,
  },
  // {
  //   id: 'rabona',
  //   name: 'Rabona',
  //   description: 'Soccer manager built on the Hive blockchain.',
  //   image: 'rabona.png',
  //   website: 'https://rabona.io',
  //   types: [EcoType.game, EcoType.sport],
  //   featured: true,
  // },
  // {
  //   id: 'cryptobrewmaster',
  //   name: 'Brewmaster',
  //   description: 'Craft beer brewing business card game.',
  //   image: 'cryptobrewmaster.png',
  //   website: 'https://www.cryptobrewmaster.io/',
  //   types: [EcoType.game],
  //   featured: true,
  // },
  {
    id: 'pinmapple',
    name: 'Pinmapple',
    description:
      'An interactive visual map where you can explore travel content from around the world and a curated feed of stunning editor picks',
    image: 'Pinmapple_Logo.svg',
    website: 'https://www.pinmapple.com/',
    types: [EcoType.social],
    featured: true,
  },
  {
    id: 'liketu',
    name: 'Liketu',
    description: 'A visual social network for the web of tomorrow.',
    image: 'liketu.png',
    website: 'https://www.liketu.org',
    types: [EcoType.social],
    featured: true,
  },
  {
    id: 'dbuzz',
    name: 'D.Buzz',
    description: 'Micro-blogging for Hive.',
    image: 'dbuzz.png',
    website: 'https://d.buzz',
    types: [EcoType.social],
    featured: true,
  },
  {
    id: 'woo',
    name: 'Wrestling Organization Online',
    description:
      'Wrestling Organization Online is a P2E sport business management game.',
    image: 'WOO.png',
    website: 'https://play.wrestlingorganizationonline.com',
    types: [EcoType.game],
    featured: false,
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
    image: 'travelfeed.svg',
    website: 'https://travelfeed.com',
    types: [EcoType.social],
    featured: false,
  },
  {
    id: 'truvvl',
    name: 'truvvl',
    description:
      'With truvvl stories, swiping through your favorite travel blogs is fun.',
    image: 'truvvl.svg',
    website: 'https://truvvl.com',
    types: [EcoType.social],
    featured: false,
  },
  // {
  //   id: 'stemsocial',
  //   name: 'STEMsocial',
  //   description: '',
  //   image: 'stemsocial.png',
  //   website: 'https://stem.openhive.network',
  //   types: ['app'],
  // },
 // {
 //   id: 'exxp',
 //   name: 'Exxp',
 //   description: 'Power your wordpress blog with blockchain technology.',
 //   image: 'exxp.png',
 //   website: 'https://exxp.io',
 //   types: [EcoType.social],
 //   featured: false,
 // },
  {
    id: 'actifit',
    name: 'Actifit',
    description: 'An innovative dapp that rewards your everyday activity.',
    image: 'actifit.png',
    website: 'https://actifit.io',
    types: [EcoType.social, EcoType.sport],
    featured: false,
  },
  {
    id: 'engrave',
    name: 'Engrave',
    description:
      'Create blog and start earning money in three simple steps with HIVE blockchain technology.',
    image: 'engrave.png',
    website: 'https://dblog.org',
    types: [EcoType.social],
    featured: false,
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
    id: 'cubfi',
    name: 'CubFinance',
    description:
      'A DeFi derivatives platform operating bHIVE and bHBD on the BSC Blockchain where users can wrap HIVE & HBD to provide liquidity and trade',
    image: 'CUB.svg',
    website: 'https://cubdefi.com/',
    types: [EcoType.defi],
    featured: false,
  },
  {
    id: 'nfttunz',
    name: 'NFTTunz',
    description: 'Music NFTs on Hive.',
    image: 'nfttunz.png',
    website: 'https://nfttunz.io',
    types: [EcoType.nft],
    featured: false,
  },
  {
    id: 'dcrops',
    name: 'dCrops',
    description: 'A decentralized farm simulator.',
    image: 'dcrops.svg',
    website: 'https://dcrops.com',
    types: [EcoType.game, EcoType.nft],
    featured: false,
  },
  //  {
  //    id: 'lucksacks',
  //    name: 'Lucksacks Poker',
  //    description:
  //      'Host a custom poker league, tournament, ring game or sit-n-go.',
  //    image: 'lucksacks.png',
  //    website: 'https://lucksacks.com',
  //    types: [EcoType.game],
  //  },

  {
    id: 'stemgeeks',
    name: 'STEMGeeks',
    description: 'A Science, Technology, Engineering, and Math community.',
    image: 'stemgeeks.png',
    website: 'https://stemgeeks.net',
    types: [EcoType.social],
    featured: false,
  },
  {
    id: 'dcity',
    name: 'dCity',
    description: 'Build your dCITY on NFT assets.',
    image: 'dcity.png',
    website: 'https://dcity.io',
    types: [EcoType.game, EcoType.nft],
    featured: false,
  },

  {
    id: 'risingstar',
    name: 'Rising Star',
    description:
      'Go from poor busker to super star with this crypto currency trading card game.',
    image: 'risingstar.png',
    website: 'https://www.risingstargame.com/',
    types: [EcoType.game],
    featured: false,
  },
  {
    id: 'nftmart',
    name: 'NFTMart',
    description: 'An NFT market for Hive. Mostly card games.',
    image: 'nftmart.png',
    website: 'https://nftm.art/',
    types: [EcoType.nft],
    featured: false,
  },
  {
    id: 'vimm',
    name: 'Vimm',
    description: 'Web3 video platform for gamers and independent creators.',
    image: 'vimm.png',
    website: 'https://www.vimm.tv/',
    types: [EcoType.social, EcoType.video],
    featured: false,
  },
  {
    id: 'dlux',
    name: 'DLux',
    description:
      'Build, post, and monetize virtual reality experiences without needing to know any code.',
    image: 'dlux.svg',
    website: 'https://www.dlux.io/',
    types: [EcoType.nft, EcoType.tools],
    featured: false,
  },
  {
    id: 'hivebuzz',
    name: 'HiveBuzz',
    description: 'Track your achievements on the Hive blockchain.',
    image: 'hivebuzz.png',
    website: 'https://hivebuzz.me',
    types: [EcoType.tools],
    featured: false,
  },
  {
    id: 'hivepunks',
    name: 'HivePunks',
    description: 'Collectible auto-generated NFT punks.',
    image: 'hivepunks.png',
    website: 'https://punks.usehive.com',
    types: [EcoType.nft],
    featured: false,
  },
  {
    id: 'apeminingclub',
    name: 'Ape Mining Club',
    description: 'An idle simulation game that incorporates its own APE token.',
    image: 'apeminingclub.png',
    website: 'https://apemining.club',
    types: [EcoType.game],
    featured: false,
  },
  {
    id: 'tribaldex',
    name: 'Tribaldex',
    description: 'Create Tokens + Smart Contracts on the Hive blockchain.',
    image: 'tribaldex.png',
    website: 'https://tribaldex.com',
    types: [EcoType.defi],
    featured: false,
  },
  //  {
  //    id: 'hashkings',
  //    name: 'Hash Kings',
  //    description: 'Cannabis Farming Simulator on the Hive blockchain.',
  //    image: 'hashkings.png',
  //    website: 'https://www.hashkings.app',
  //    types: [EcoType.game],
  //  },
  {
    id: 'skatehype',
    name: 'Skate Hype',
    description:
      'Dedicated skateboarding platform for video, photo, and sequence sharing.',
    image: 'SkateHype.png',
    website: 'https://www.skatehype.com',
    types: [EcoType.social, EcoType.video, EcoType.sport],
    featured: false,
  },
  {
    id: 'hivelist',
    name: 'HiveLIST',
    description:
      'An Honest Place To Buy Products And Services Using Cryptocurrency.',
    image: 'hivelist.png',
    website: 'https://hivelist.io/',
    types: [EcoType.nft, EcoType.defi],
    featured: false,
  },
  // {
  //   id: 'dlease',
  //   name: 'DLease',
  //   description:
  //     'Invest with confidence using our state of the art Digital Asset Leasing platform.',
  //   image: 'dlease.png',
  //   website: 'https://dlease.io',
  //   types: [EcoType.defi],
  // },
  {
    id: 'waivio',
    name: 'Waivio',
    description:
      'Waivio is an open distributed attention marketplace for business.',
    image: 'waivio.png',
    website: 'https://www.waivio.com/',
    types: [EcoType.defi, EcoType.social],
    featured: false,
  },
  {
    id: 'cryptoshots',
    name: 'Crypto Shots',
    description:
      'Crypto Shots is a 3D Shooter connected to the Hive blockchain in which your gaming assets like weapons, ammo, characters and shields are collectible NFTs.',
    image: 'cryptoshots.png',
    website: 'https://crypto-shots.com/',
    types: [EcoType.game, EcoType.nft],
    featured: false,
  },
  {
    id: 'podping',
    name: 'Podping',
    description:
      'Podping is a global message bus for podcast infrastructure events.',
    image: 'podping.png',
    website: 'https://podping.org',
    types: [EcoType.tools],
    featured: false,
  },
  {
    id: 'exode',
    name: 'EXODE',
    description:
      'EXODE is an immersive science-fiction universe in a playable video game with blockchain assets and currencies.',
    image: 'exode.png',
    website: 'https://exode.io/',
    types: [EcoType.game, EcoType.nft],
    featured: false,
  },
  {
    id: 'blocktunes',
    name: 'BlockTunes',
    description:
      'Tokenizing the music industry with NFTs and artist ran DAOs and paying musicians in cryptocurrency.',
    image: 'blocktunes.png',
    website: 'https://blocktunes.net',
    types: [EcoType.defi, EcoType.nft],
    featured: false,
  },
  {
    id: 'muterra',
    name: 'Muterra',
    description: 'RPG+TCG game on Hive set in a post-apocalyptic world.',
    image: 'muterra.png',
    website: 'https://muterra.in',
    types: [EcoType.game],
    featured: false,
  },
  {
    id: 'psyberx',
    name: 'PsyberX',
    description: 'FPS+TPS game where gamers strike fear into their opponents.',
    image: 'psyberx.png',
    website: 'https://www.psyber-x.com',
    types: [EcoType.game],
    featured: false,
  },
  {
    id: 'hivetube',
    name: 'Hive Tube',
    description:
      'Hive-Tube is the best alternative to Youtube. P2P, Fediverse syndicated, no fees and no KYC.',
    image: 'hive-tube.svg',
    website: 'https://hive-tube.com',
    types: [EcoType.social, EcoType.video],
    featured: false,
  },
  {
    id: 'kod',
    name: 'King Of Duels',
    description:
      'King of Duels brings players a complete PvP gaming experience from day one.',
    image: 'king-of-duels.svg',
    website: 'https://kod.up.railway.app/',
    types: [EcoType.game],
    featured: false,
  },
  {
    id: 'reverio',
    name: 'Reverio',
    description:
      'Earn rewards on Hive by asking and answering questions on Reverio.',
    image: 'reverio.svg',
    website: 'https://reverio.io/',
    types: [EcoType.social],
    featured: false,
  },
  {
    id: 'hivedex',
    name: 'Hivedex.io',
    description: 'Modern exchange interface for the internal market (HIVE/HBD)',
    image: 'hivedex.png',
    website: 'https://hivedex.io',
    types: [EcoType.tools],
    featured: false,
  },
  {
    id: 'terracore',
    name: 'Terracore',
    description:
      'An idle strategy & collectable game on Hive that lets you survive in a post-apocalyptic world by collecting SCRAP.',
    image: 'terracore.png',
    website: 'https://www.terracoregame.com/',
    types: [EcoType.game],
    featured: false,
  },
  {
    id: 'vsc',
    name: 'VSC Network',
    description:
      'Next generation L2 smart contracts and wrapping technology on the Hive Blockchain.',
    image: 'vsc.png',
    website: 'https://vsc.eco',
    types: [EcoType.tools, EcoType.defi, EcoType.nft],
    featured: false,
  },
  {
    id: 'immortalcreed',
    name: 'Immortal Creed',
    description:
      'A trading card game set in a fantasy themed world integrated with blockchain technology. This allows you, the player, to earn, own and trade your game characters, weapons, equipment and currencies.',
    image: 'immortalcreed.png',
    website: 'https://immortalcreed.io',
    types: [EcoType.game, EcoType.nft],
    featured: false,
  },
  {
    id: 'arcadecolony',
    name: 'Arcade Colony',
    description: 'A platform for Web2 games to augment into Web3.',
    image: 'arcadecolony.svg',
    website: 'https://www.arcadecolony.com',
    types: [EcoType.tools, EcoType.nft],
    featured: true,
  },
  {
    id: 'genesisleaguesports',
    name: 'Genesis League Sports',
    description:
      'A blockchain-based, play2earn gaming platform and ecosystem specifically designed for sports games and NFTs.',
    image: 'genesisleaguesports.png',
    website: 'https://genesisleaguesports.com',
    types: [EcoType.game, EcoType.nft],
    featured: true,
  },
  {
    id: 'riseofthepixels',
    name: 'Rise of the Pixels',
    description: 'A browser-based simulation game where you manage your own game development studio. Grow through the vibrant eras of gaming, smash bugs, hone your team, and deliver masterpieces to your audiences.',
    image: 'riseofthepixels.png',
    website: 'https://riseofthepixels.com/',
    types: [EcoType.game],
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
    background: 'rgb(229 255 188)',
    text: 'rgb(129 140 112)',
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
