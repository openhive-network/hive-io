import type {IEcoItem} from '@/types/index'
import {BLOCKEXPLORERS} from './blockexplorers'
import {EcoType} from '@/types/index'

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
    stores: {
      googlePlay: 'https://android.ecency.com/',
      appStore: 'https://ios.ecency.com/',
    },
    types: [EcoType.social],
    featured: true,
  },
  {
    id: 'magi',
    name: 'Magi Network',
    description:
      'Next generation L2 smart contracts and wrapping technology on the Hive Blockchain.',
    image: 'magi.png',
    website: 'https://magiprotocol.com/',
    types: [EcoType.tools, EcoType.defi, EcoType.nft],
    featured: true,
  },
  {
    id: 'holozing',
    name: 'Holozing',
    description:
      'A roleplaying adventure game for both casual and competitive players.',
    image: 'holozing.webp',
    website: 'https://holozing.com/',
    types: [EcoType.game, EcoType.nft],
    featured: true,
  },
  {
    id: 'worldmappin',
    name: 'Worldmappin',
    description:
      'An interactive visual map where you can explore travel content from around the world and a curated feed of stunning editor picks',
    image: 'worldmappin.svg',
    website: 'https://worldmappin.com/',
    types: [EcoType.social],
    featured: true,
  },
  {
    id: 'liketu',
    name: 'Liketu',
    description: 'A visual social network for the web of tomorrow.',
    image: 'liketu.png',
    website: 'https://liketu.social/',
    types: [EcoType.social],
    featured: true,
  },
    {
    id: 'inleo',
    name: 'InLeo',
    description:
      'A social media platform focused on use-owned content and decentralized monetization.',
    image: 'inleo.avif',
    website: 'https://inleo.io',
    types: [EcoType.social],
    featured: false,
  },
  {
    id: 'woo',
    name: 'Wrestling Organization',
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
    featured: false,
  },
  {
    id: 'travelfeed',
    name: 'TravelFeed',
    description: 'TravelFeed makes travel blogging easy and fun.',
    image: 'travelfeed.svg',
    website: 'https://travelfeed.com',
    stores: {
      googlePlay:
        'https://play.google.com/store/apps/details?id=io.travelfeed.pwa',
      appStore: 'https://apps.apple.com/app/travelfeed/id6472209919',
    },
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
    stores: {
      googlePlay:
        'https://play.google.com/store/apps/details?id=io.travelfeed.truvvl',
      appStore: 'https://apps.apple.com/app/truvvl/id1552253482',
    },
    types: [EcoType.social],
    featured: false,
  },
  {
    id: 'actifit',
    name: 'Actifit',
    description: 'An innovative dapp that rewards your everyday activity.',
    image: 'actifit.png',
    website: 'https://actifit.io',
    stores: {
      googlePlay: 'https://links.actifit.io/android',
      appStore: 'https://links.actifit.io/ios',
    },
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
  //{
  //   id: 'leodex',
  //   name: 'LeoDex',
  //   description:
  //     'Trade HIVE to and from the top crypto assets in the world like BTC, ETH, DASH and more. LeoDex is a DEX Web app for cross-chain trading that prioritizes a seamless User Experience with a clean and intuitive Interface as a non-custodial decentralized exchange. Trading across blockchains on LeoDex is extremely easy and can be done using Maya Protocol and Hive Aggregation Technology.',
  //   image: 'LeoDex_Logo_no_Name.png',
  //   website: 'https://leodex.io/',
  //   types: [EcoType.defi],
  //   featured: false,
  // },
  {
    id: 'dcrops',
    name: 'dCrops',
    description: 'A decentralized farm simulator.',
    image: 'dcrops.svg',
    website: 'https://dcrops.com',
    types: [EcoType.game, EcoType.nft],
    featured: false,
  },
  {
    id: 'snapie',
    name: 'Snapie',
    description: 'Snapie brings social media to the blockchain.',
    image: 'snapie.png',
    website: 'https://www.snapie.io/',
    stores: {
      googlePlay:
        'https://play.google.com/store/apps/details?id=com.menobass.hivesnaps',
      appStore: 'https://apps.apple.com/us/app/hive-snaps/id6748106413',
    },
    types: [EcoType.social],
  },
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
    id: 'risingstar',
    name: 'Rising Star',
    description:
      'Go from poor busker to super star with this crypto currency trading card game.',
    image: 'risingstar.png',
    website: 'https://www.risingstargame.com/',
    types: [EcoType.game],
    featured: false,
  },
  // {
  //   id: 'vimm',
  //   name: 'Vimm',
  //   description: 'Web3 video platform for gamers and independent creators.',
  //   image: 'vimm.png',
  //   website: 'https://www.vimm.tv/',
  //   types: [EcoType.social, EcoType.video],
  //   featured: false,
  // },
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
    id: 'tribaldex',
    name: 'Tribaldex',
    description: 'Create Tokens + Smart Contracts on the Hive blockchain.',
    image: 'tribaldex.png',
    website: 'https://tribaldex.com',
    types: [EcoType.defi],
    featured: false,
  },
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
    id: 'skatehive',
    name: 'Skatehive',
    description:
      'A skateboarding community and magazine: share videos, find skate spots and earn post rewards.',
    image: 'skatehive.png',
    website: 'https://skatehive.app/',
    types: [EcoType.social, EcoType.video, EcoType.sport],
    featured: false,
  },
  // {
  //   id: 'hivelist',
  //   name: 'HiveLIST',
  //   description:
  //     'An Honest Place To Buy Products And Services Using Cryptocurrency.',
  //   image: 'hivelist.png',
  //   website: 'https://hivelist.io/',
  //   types: [EcoType.nft, EcoType.defi],
  //   featured: false,
  // },
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
  // {
  //   id: 'muterra',
  //   name: 'Muterra',
  //   description: 'RPG+TCG game on Hive set in a post-apocalyptic world.',
  //   image: 'muterra.png',
  //   website: 'https://muterra.in',
  //   types: [EcoType.game],
  //   featured: false,
  // },
  // {
  //   id: 'hivetube',
  //   name: 'Hive Tube',
  //   description:
  //     'Hive-Tube is the best alternative to Youtube. P2P, Fediverse syndicated, no fees and no KYC.',
  //   image: 'hive-tube.svg',
  //   website: 'https://hive-tube.com',
  //   types: [EcoType.social, EcoType.video],
  //   featured: false,
  // },
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
    id: 'genesisleaguesports',
    name: 'Genesis League Sports',
    description:
      'A blockchain-based, play2earn gaming platform and ecosystem specifically designed for sports games and NFTs.',
    image: 'genesisleaguesports.png',
    website: 'https://genesisleaguesports.com/',
    types: [EcoType.game, EcoType.nft],
    featured: false,
  },
  {
    id: 'riseofthepixels',
    name: 'Rise of the Pixels',
    description:
      'A browser-based simulation game where you manage your own game development studio. Grow through the vibrant eras of gaming, smash bugs, hone your team, and deliver masterpieces to your audiences.',
    image: 'riseofthepixels.png',
    website: 'https://riseofthepixels.com/',
    types: [EcoType.game],
    featured: false,
  },
  {
    id: 'hive-suite',
    name: 'HiveSuite',
    description: 'All in one - blogs, videos, shorts, polls, snaps & games',
    image: 'hive-suite-logo.png',
    website: 'https://hivesuite.app',
    stores: {
      googlePlay:
        'https://play.google.com/store/apps/details?id=app.hivesuite.mobile_app',
    },
    types: [EcoType.social],
    featured: false,
  },
  {
    id: 'astral-wars',
    name: 'Astral Wars',
    description:
      'Astral Wars is a fast-paced digital trading card game where players use programs, units, deterrents and structures to outsmart opponents in epic duels set in the Astranian universe.',
    image: 'AstralWars.webp',
    website: 'https://www.surgentgaming.com/',
    stores: {
      googlePlay:
        'https://play.google.com/store/apps/details?id=com.SurgentGaming.AstralWars',
    },
    types: [EcoType.game],
    featured: false,
  },

  //  {
  //    id: 'hive-analytics',
  //   name: 'Hive Analytics',
  //    description: 'Real-time blockchain intelligence for the Hive ecosystem.',
  //    image: 'hiveanalytics.png',
  //    website: 'https://hiveanalytics.usehive.com/',
  //    types: [EcoType.tools],
  //  },
  {
    id: 'dungeoncities',
    name: 'Dungeon Cities',
    description: 'A blockchain-based dungeon building and battling game on Hive.',
    image: 'dungeoncities.webp',
    website: 'https://dungeoncities.com/',
    types: [EcoType.game],
    featured: false,
  },
  {
    id: 'beatbrawls',
    name: 'Beat Brawls',
    description: 'A competitive, music-reactive card battler on the Hive blockchain.',
    image: 'beatbrawls.png',
    website: 'https://beatbrawls.com/',
    types: [EcoType.game],
    featured: false,
  },
  {
    id: 'pevo',
    name: 'Pevo',
    description:
      'Publish, review, and evaluate research on a transparent, open platform.',
    image: 'pevo.webp',
    website: 'https://beta.pevo.science/',
    types: [EcoType.social],
    featured: true,
  },
  {
    id: 'decentmemes',
    name: 'Decent Memes',
    description:
      'Submit your meme template and earn forever.',
    image: 'decentmemes.svg',
    website: 'https://decentmemes.com/home/',
    types: [EcoType.social],
    featured: false,
  },
  {
    id: 'hivegrove',
    name: 'Hive Grove',
    description:
      'Plant and Connect: a cozy social game where you grow trees and friendships.',
    image: 'hivegrove.png',
    website: 'https://playhivegrove.com/',
    types: [EcoType.game, EcoType.social],
    featured: false,
  },
  {
    id: 'everwitnessed',
    name: 'EverWitnessed',
    description:
      'Timestamp any file on Hive. Only its SHA-256 fingerprint goes on chain; the file stays on your device.',
    image: 'everwitnessed.png',
    website: 'https://everwitnessed.net/',
    types: [EcoType.tools],
    featured: false,
  },
  {
    id: 'hivepizza',
    name: 'Hive Pizza',
    description:
      'The PIZZA Guild: a community for games, art and music, with its own PIZZA token.',
    image: 'hivepizza.png',
    website: 'https://hive.pizza/',
    types: [EcoType.social],
    featured: false,
  },
  {
    id: 'moon',
    name: 'Moon',
    description:
      'A browser space strategy game from Hive Pizza: build fleets and grow your empire.',
    image: 'moon.webp',
    website: 'https://moonsiege.com/',
    types: [EcoType.game],
    featured: false,
  },
  {
    id: 'hivedappmenu',
    name: 'Hive dApp Menu',
    description:
      'A browser extension with a menu of Hive apps, made for new users.',
    image: 'hivedappmenu.jpg',
    website:
      'https://chromewebstore.google.com/detail/hive-dapp-menu/dbikjmkkbcjpcnjbhihmlbjdcjcaoaad',
    types: [EcoType.tools],
    featured: false,
  },
  {
    id: 'scrobblelife',
    name: 'scrobble.life',
    description:
      'A browser scrobbler that writes what you listen to and watch to Hive.',
    image: 'scrobblelife.png',
    website: 'https://scrobble.life/',
    types: [EcoType.social],
    featured: false,
  },
  {
    id: 'syndicateprotocol',
    name: 'Syndicate Protocol',
    description:
      'A browser territory-control strategy game: deploy crews, run operations and take the map.',
    image: 'syndicateprotocol.png',
    website: 'https://syndicate-protocol.com/',
    types: [EcoType.game],
    featured: false,
  },
  {
    id: 'hivetown',
    name: 'Hive Town',
    description:
      'A small town where you meet Hive creators, discover posts and play minigames.',
    image: 'hivetown.webp',
    website: 'https://rozioogames.com/',
    types: [EcoType.game, EcoType.social],
    featured: false,
  },
  {
    id: 'hiveraven',
    name: 'HiveRaven',
    description:
      'Public Hive analytics: account health, new user discovery, DHF watch and downvote dashboards.',
    image: 'hiveraven.svg',
    website: 'https://hiveraven.vercel.app/',
    types: [EcoType.tools],
    featured: false,
  },
  {
    id: 'beetris',
    name: 'BeeTris',
    description:
      'A Hive-themed browser block puzzle: stack transactions, survive hardforks and dodge downvotes.',
    image: 'beetris.svg',
    website: 'https://hiveb3.github.io/beetris/',
    types: [EcoType.game],
    featured: false,
  },
  {
    id: 'limitless',
    name: 'Limitless',
    description:
      'An NFT mining game: collect miners and mine Hive Engine tokens, with Hive Keychain login.',
    image: 'limitless.svg',
    website: 'https://www.hivereward.co.uk/limitless/',
    types: [EcoType.game, EcoType.nft],
    featured: false,
  },
  {
    id: 'splinterlanes',
    name: 'Splinterlanes',
    description:
      'A three-lane Splinterlands variant: 1v1 battles with the cards you own, for card prizes.',
    image: 'splinterlanes.svg',
    website: 'https://splinterlanes.com/',
    types: [EcoType.game],
    featured: false,
  },
  ...BLOCKEXPLORERS,
]

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
