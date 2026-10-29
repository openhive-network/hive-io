import type {IconName, IconPrefix} from '@fortawesome/fontawesome-svg-core'

export interface IBaseApp {
  id: string
  name: string
  image: string
}

export interface IPlatform {
  icon: [IconPrefix, IconName]
  name: string
}

export interface IWallet extends IBaseApp {
  os: IPlatform[]
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

export interface IStatWebsite extends IBaseApp {
  website: string
  github?: string
  gitlab?: string
}

export interface IAppStats {
  name: string
  dau?: {last_month: number}
}

export interface INavigationLink {
  to?: string
  name?: string
  description?: string
}

export interface INavigationChild extends INavigationLink {
  submenu?: INavigationLink[]
}

export interface INavigationItem {
  to?: string
  name?: string
  isButton?: boolean
  children?: INavigationChild[]
}

export interface ISocialMedia {
  icon: IconName
  name: string
  link: string
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
