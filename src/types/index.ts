export interface IWallet {
  id: string
  name: string
  os: OS[]
  type: Type
  website: { firefox?: string; chrome?: string; safari?: string } | string
}

export interface IEcoItem {
  id: string
  name: string
  description: string
  website: string
  type: Type
}

export type OS = 'windows' | 'osx' | 'ios' | 'android' | 'linux' | 'web'

export type Type = 'game' | 'app' | 'extension' | 'wallet'
