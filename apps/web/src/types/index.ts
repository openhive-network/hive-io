export interface IBaseApp {
  id: string
  name: string
  image: string
}

export interface IWallet extends IBaseApp {
  os: any[]
  website: {firefox?: string; chrome?: string; safari?: string} | string
  github?: string
  gitlab?: string
  closedSource?: boolean
  recommended?: boolean
  types: Type[]
}

export interface IEcoItem extends IBaseApp {
  id: string
  website: string
  description: string
  featured?: boolean // Is the app one of the top 50/100 performing web3 apps worldwide?
  types: EcoType[]
}

export interface IContributor {
  id: string
  name: string
  image?: string
  social: {
    linkedin?: string
    twitter?: string
    hive: string
  }
  labels: ContributorLabel[]
  inactive?: boolean
}

export const enum ContributorLabel {
  coreDeveloper = 'Core Developer',
  developer = 'Developer',
  blockProducer = 'Block Producer',
  marketing = 'Marketing',
  operations = 'Operations',
}

export const enum EcoType {
  game = 'game',
  social = 'social',
  nft = 'nft',
  tools = 'tools',
  travel = 'travel',
  wordpress = 'wordpress',
  video = 'video',
  sport = 'sport',
  defi = 'defi',
  app = 'app',
  blockExplorer = 'explorer',
}

export type OS =
  | 'windows'
  | 'osx'
  | 'ios'
  | 'android'
  | 'linux'
  | 'web'
  | 'extension'
  | 'firefox'
  | 'chrome'

export type Type = 'app' | 'extension' | 'wallet'
