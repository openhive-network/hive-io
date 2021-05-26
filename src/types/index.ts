export interface IBaseApp {
  id: string
  name: string
  image: string
  types: Type[]
}

export interface IWallet extends IBaseApp {
  os: any[]
  website: {firefox?: string; chrome?: string; safari?: string} | string
  github?: string
  gitlab?: string
  closedSource?: boolean
}

export interface IEcoItem extends IBaseApp {
  id: string
  website: string
  description: string
  featured?: boolean // Is the app one of the top 50/100 performing web3 apps worldwide?
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

export type Type =
  | 'game'
  | 'social'
  | 'nft'
  | 'tools'
  | 'travel'
  | 'wordpress'
  | 'video'
  | 'sport'
  | 'defi'
  | 'app'
  | 'extension'
  | 'wallet'
