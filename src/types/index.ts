export interface IWallet {
  id: string
  name: string
  os: any[]
  image: string
  type: Type
  website: { firefox?: string; chrome?: string; safari?: string } | string
}

export interface IEcoItem {
  id: string
  name: string
  description: string
  image: string
  website: string
  type: Type
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

export type Type = 'game' | 'app' | 'extension' | 'wallet'
