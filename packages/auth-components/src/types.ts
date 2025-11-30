export type AuthMethod = 'keychain' | 'hiveauth'

export interface HiveAuthSession {
  token: string
  key: string
  expire: number
}

export interface HiveAuthWaitData {
  cmd: 'auth_wait'
  uuid: string
  expire: number
  account: string
  key: string
}

export interface HiveAuthAckData {
  cmd: 'auth_ack'
  uuid: string
  data: {
    token: string
    expire: number
    challenge?: {
      challenge: string // The actual signature
      pubkey: string // The public key that signed it
    }
  }
}

export interface HiveAuthNackData {
  cmd: 'auth_nack'
  uuid: string
  error: string
  msg: string
}

export interface HiveAuthErrorData {
  error: string
  message?: string
}

export interface HiveAuthConfig {
  appName: string
  appDescription: string
  appIcon?: string
  hasServer?: string
}
