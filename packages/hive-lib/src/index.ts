'use client'

import KeychainProvider from '@hiveio/wax-signers-keychain'
import {createHiveChain, IHiveChainInterface, operation} from '@hiveio/wax'
import WaxExtendedData from '@hiveio/wax-api-jsonrpc'
import {PrivateKey, Asset} from '@hiveio/dhive'
import {randomBytes, bytesToHex} from '@noble/hashes/utils'

export let hive: IHiveChainInterface = null as any
let hiveExtended: ReturnType<typeof hive.extend<typeof WaxExtendedData>> | null = null

const initHiveChain = async () => {
  if (!hive) {
    hive = await createHiveChain()
    hiveExtended = hive.extend(WaxExtendedData)
  }
  return hive
}

export const getHiveChain = async (): Promise<IHiveChainInterface> => {
  return initHiveChain()
}

export const getHiveChainExtended = async () => {
  await initHiveChain()
  return hiveExtended!
}

// Re-export activity utilities
export * from './activity'

// ==========================================
// Account Creation Types
// ==========================================

export interface PrivateKeys {
  owner: string
  active: string
  posting: string
  memo: string
  ownerPubkey: string
  activePubkey: string
  postingPubkey: string
  memoPubkey: string
}

export interface AccountAuth {
  account: string
  type: 'posting' | 'active' | 'owner'
}

export interface AccountDelegation {
  account: string
  vests: number
}

export interface HiveAuthData {
  token: string
  key: string
  expire: number
}

// ==========================================
// Account Validation & Availability
// ==========================================

export const checkAccountAvailability = async (
  accountName: string
): Promise<boolean> => {
  try {
    const chain = await initHiveChain()
    const result = await chain.api.database_api.find_accounts({
      accounts: [accountName],
    })

    return !result.accounts || result.accounts.length === 0
  } catch (error) {
    console.error('Error checking account availability:', error)
    throw new Error('Failed to check account availability')
  }
}

export const validateAccountName = (
  accountName: string
): {isValid: boolean; error?: string} => {
  if (!accountName) {
    return {
      isValid: false,
      error: 'Account name should not be empty',
    }
  }

  if (accountName.length < 3) {
    return {
      isValid: false,
      error: 'Account name should be longer',
    }
  }

  if (accountName.length > 16) {
    return {
      isValid: false,
      error: 'Account name should be shorter',
    }
  }

  const suffix = accountName.includes('.')
    ? 'Each account segment should'
    : 'Account name should'

  const segments = accountName.split('.')
  for (const segment of segments) {
    if (!/^[a-z]/.test(segment)) {
      return {
        isValid: false,
        error: `${suffix} start with a letter`,
      }
    }
    if (!/^[a-z0-9-]*$/.test(segment)) {
      return {
        isValid: false,
        error: `${suffix} have only letters, digits, or dashes`,
      }
    }
    if (!/[a-z0-9]$/.test(segment)) {
      return {
        isValid: false,
        error: `${suffix} end with a letter or digit`,
      }
    }
    if (segment.length < 3) {
      return {
        isValid: false,
        error: `${suffix} be longer`,
      }
    }
  }

  return {isValid: true}
}

// ==========================================
// Key Generation
// ==========================================

export const generatePassword = (): string => {
  return `P${PrivateKey.fromSeed(bytesToHex(randomBytes(48))).toString()}`
}

export const generateKeys = (
  account: string,
  password: string,
  roles: string[] = ['posting', 'active', 'memo', 'owner'],
  addressPrefix = 'STM'
): PrivateKeys => {
  const keys: any = {}

  for (const role of roles) {
    const pk = PrivateKey.fromLogin(account, password, role as any)
    keys[role] = pk.toString()
    keys[`${role}Pubkey`] = pk.createPublic(addressPrefix).toString()
  }

  return keys as PrivateKeys
}

// ==========================================
// Backup File Generation
// ==========================================

export const generateBackupFileContent = (
  account: string,
  password: string,
  privateKeys: PrivateKeys
): string => {
  return `Please be very careful with your password & private keys.
If you lose your password, you will not be able to access your account.
Nobody can help you recover the password!

Our recommendation:
1. Print this file out multiple times and store it securely in multiple locations.
2. NEVER use your password/owner key unless it's absolutely required.
3. Save your Active + Posting + Memo keys within a password manager and/or browser extension/mobile wallet, as you will need them frequently.
4. Delete this file once you've done all of the steps before.

Your Hive Account

Username: ${account}
Password: ${password}

Your Private Keys

Owner:   ${privateKeys.owner}
Active:  ${privateKeys.active}
Posting: ${privateKeys.posting}
Memo:    ${privateKeys.memo}

What are those keys used for?

Owner:   Change Password, Change Keys, Recover Account
Active:  Transfer Funds, Power up/down, Voting Witnesses/Proposals
Posting: Post, Comment, Vote, Reblog, Follow, Profile
Memo:    Send/View encrypted messages on transfers
`
}

export const downloadBackupFile = (
  account: string,
  password: string,
  privateKeys: PrivateKeys,
  onCopyToClipboard?: () => void,
  onDownload?: () => void
): void => {
  const content = generateBackupFileContent(account, password, privateKeys)

  // Detect if we're in an iOS in-app browser
  const isIOSInAppBrowser = () => {
    const ua = navigator.userAgent
    const isIOS = /iPad|iPhone|iPod/.test(ua)
    const isSafari = /Safari/.test(ua)
    const isInApp = !isSafari && isIOS
    return isInApp || (isIOS && /FBAN|FBAV|Instagram|Twitter|Line/.test(ua))
  }

  // For iOS in-app browsers, copy to clipboard instead
  if (isIOSInAppBrowser()) {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        if (onCopyToClipboard) {
          onCopyToClipboard()
        }
      })
      .catch((error) => {
        console.error('Failed to copy to clipboard:', error)
      })
  } else {
    // Standard download for other browsers
    const element = document.createElement('a')
    const blob = new Blob([content], {type: 'text/plain'})
    element.href = URL.createObjectURL(blob)
    element.download = `hive_backup_${account}.txt`
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    URL.revokeObjectURL(element.href)
    if (onDownload) {
      onDownload()
    }
  }
}

// ==========================================
// Transaction Execution
// ==========================================

export async function executeOperation(
  operations: operation[],
  username: string,
  options?: {
    authMethod?: 'keychain' | 'hiveauth'
    hiveAuthData?: HiveAuthData
  }
): Promise<{success: boolean; txId: string; error?: string}> {
  try {
    const chain = await initHiveChain()

    // Sign transaction based on auth method
    if (options?.authMethod === 'hiveauth' && options?.hiveAuthData) {
      // Use HiveAuth to sign
      // @ts-ignore - hive-auth-wrapper doesn't have types
      const HAS = (await import('hive-auth-wrapper')).default

      const result = await HAS.broadcast(
        {
          username,
          token: options.hiveAuthData.token,
          expire: options.hiveAuthData.expire,
          key: options.hiveAuthData.key,
        },
        'active',
        operations
      )

      return {success: true, txId: result.uuid}
    } else {
      // Use Keychain to sign
      const tx = await chain.createTransaction()

      for (const op of operations) {
        tx.pushOperation(op)
      }

      const provider = KeychainProvider.for(username, 'active')
      await provider.signTransaction(tx)
      await chain.broadcast(tx)

      return {success: true, txId: tx.id}
    }
  } catch (error) {
    console.log('executeOperation error:', error)
    return {
      success: false,
      txId: '',
      error:
        error instanceof Error
          ? error.message
          : 'Failed to broadcast transaction',
    }
  }
}

// ==========================================
// Account Creation
// ==========================================

interface CreateAccountKeys {
  ownerPubkey: string
  activePubkey: string
  postingPubkey: string
  memoPubkey: string
}

// HiveAuth uses dhive format operations (tuple format)
const createClaimedAccountForHiveAuth = ({
  creator,
  newAccountName,
  keys,
  auths,
  delegation,
}: {
  creator: string
  newAccountName: string
  keys: CreateAccountKeys
  auths?: AccountAuth[]
  delegation?: AccountDelegation
}) => {
  const mappedAuths = (auths || []).map((a) => {
    return {type: a.type, value: [a.account, 1]}
  })

  const ownerAuth = {
    weight_threshold: 1,
    account_auths: mappedAuths
      .filter((a) => a.type === 'owner')
      .map((a) => a.value),
    key_auths: [[keys.ownerPubkey, 1]],
  }

  const activeAuth = {
    weight_threshold: 1,
    account_auths: mappedAuths
      .filter((a) => a.type === 'active')
      .map((a) => a.value),
    key_auths: [[keys.activePubkey, 1]],
  }

  const postingAuth = {
    weight_threshold: 1,
    account_auths: mappedAuths
      .filter((a) => a.type === 'posting')
      .map((a) => a.value),
    key_auths: [[keys.postingPubkey, 1]],
  }

  const op: any = [
    'create_claimed_account',
    {
      creator,
      new_account_name: newAccountName,
      owner: ownerAuth,
      active: activeAuth,
      posting: postingAuth,
      memo_key: keys.memoPubkey,
      json_metadata: '',
      extensions: [],
    },
  ]

  if (delegation) {
    return [
      op,
      [
        'delegate_vesting_shares',
        {
          delegatee: newAccountName,
          delegator: delegation.account,
          vesting_shares: Asset.fromString(
            `${delegation.vests.toFixed(6)} VESTS`
          ),
        },
      ],
    ]
  }

  return [op]
}

const createClaimedAccount = ({
  creator,
  newAccountName,
  keys,
  auths,
  delegation,
  chain,
}: {
  creator: string
  newAccountName: string
  keys: CreateAccountKeys
  auths?: AccountAuth[]
  delegation?: AccountDelegation
  chain: IHiveChainInterface
}) => {
  const mappedAuths = (auths || []).map((a) => {
    return {type: a.type, value: [a.account, 1]}
  })

  const convertAuths = (type: 'active' | 'owner' | 'posting', auths: any[]) => {
    const objAuths: {[key: string]: number} = {}

    auths.filter((a) => {
      if (a.type === type) {
        objAuths[a.value[0]] = Number(a.value[1])
        return false
      }
    })

    return objAuths
  }

  const op: operation = {
    create_claimed_account_operation: {
      active: {
        weight_threshold: 1,
        account_auths: convertAuths('active', mappedAuths),
        key_auths: {[keys.activePubkey]: 1},
      },
      owner: {
        weight_threshold: 1,
        account_auths: convertAuths('owner', mappedAuths),
        key_auths: {[keys.ownerPubkey]: 1},
      },
      posting: {
        weight_threshold: 1,
        account_auths: convertAuths('posting', mappedAuths),
        key_auths: {[keys.postingPubkey]: 1},
      },
      memo_key: keys.memoPubkey,
      new_account_name: newAccountName,
      creator,
      json_metadata: '',
      extensions: [],
    },
  }

  if (delegation) {
    return [
      op,
      {
        delegate_vesting_shares_operation: {
          delegator: delegation.account,
          delegatee: newAccountName,
          vesting_shares: chain.vestsCoins(delegation.vests),
        },
      },
    ]
  }
  return [op]
}

export const createHiveAccount = async (
  accountName: string,
  keys: PrivateKeys,
  creator: string,
  options?: {
    auths?: AccountAuth[]
    delegation?: number
    isLiveEnv?: boolean
    authMethod?: 'keychain' | 'hiveauth'
    hiveAuthData?: HiveAuthData
  }
): Promise<{success: boolean; error?: string}> => {
  const {
    auths,
    delegation,
    isLiveEnv = false,
    authMethod,
    hiveAuthData,
  } = options || {}

  try {
    const chain = await initHiveChain()

    let vests = 0
    if (delegation) {
      const properties =
        await chain.api.database_api.get_dynamic_global_properties({})
      // Calculate vests from HIVE delegation
      const totalVestingFundHive =
        parseFloat(properties.total_vesting_fund_hive.amount) /
        Math.pow(10, properties.total_vesting_fund_hive.precision)
      const totalVestingShares =
        parseFloat(properties.total_vesting_shares.amount) /
        Math.pow(10, properties.total_vesting_shares.precision)
      vests = (delegation * totalVestingShares) / totalVestingFundHive
    }

    const accountKeys: CreateAccountKeys = {
      ownerPubkey: keys.ownerPubkey,
      activePubkey: keys.activePubkey,
      postingPubkey: keys.postingPubkey,
      memoPubkey: keys.memoPubkey,
    }

    if (isLiveEnv) {
      let operations: any[]

      // HiveAuth needs dhive-format operations, Keychain uses WAX operations
      if (authMethod === 'hiveauth') {
        operations = createClaimedAccountForHiveAuth({
          creator,
          auths,
          keys: accountKeys,
          delegation: delegation ? {account: creator, vests} : undefined,
          newAccountName: accountName,
        })
      } else {
        const operationList = createClaimedAccount({
          creator,
          auths,
          keys: accountKeys,
          delegation: delegation ? {account: creator, vests} : undefined,
          newAccountName: accountName,
          chain,
        })
        operations = operationList
      }

      const result = await executeOperation(operations, creator, {
        authMethod,
        hiveAuthData,
      })

      console.log('createHiveAccount result:', result)
      return {success: result.success, error: result.error}
    } else {
      console.log('Would have created Hive account', {
        creator,
        newAccountName: accountName,
        keys: accountKeys,
        auths,
        delegation: delegation
          ? {
              account: creator,
              vests,
            }
          : null,
      })
      return {success: true}
    }
  } catch (error) {
    console.error('Error in createHiveAccount:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to create Hive account',
    }
  }
}
