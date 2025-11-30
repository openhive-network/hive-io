export interface ShareableAccountData {
  username: string
  ownerPubkey: string
  activePubkey: string
  postingPubkey: string
  memoPubkey: string
}

const KEY_LENGTH = 50 // Hive public keys without "STM" prefix are 50 chars

/**
 * Encodes account data into a compact URL-safe base64 string
 * Format: username|key1key2key3key4 (keys concatenated without delimiters, "STM" prefix removed)
 */
export function encodeAccountData(data: ShareableAccountData): string {
  // Remove "STM" prefix from all keys and concatenate without delimiters
  const keys = [
    data.ownerPubkey.replace(/^STM/, ''),
    data.activePubkey.replace(/^STM/, ''),
    data.postingPubkey.replace(/^STM/, ''),
    data.memoPubkey.replace(/^STM/, '')
  ].join('')

  const compact = data.username + '|' + keys

  const base64 = btoa(compact)
  // Make URL-safe by replacing + with - and / with _
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

/**
 * Decodes a URL-safe base64 string back into account data
 */
export function decodeAccountData(encoded: string): ShareableAccountData | null {
  try {
    // Restore standard base64 format
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    // Add back padding if needed
    const padded = base64 + '=='.substring(0, (4 - base64.length % 4) % 4)
    const decoded = atob(padded)

    const delimiterIndex = decoded.indexOf('|')
    if (delimiterIndex === -1) {
      throw new Error('Invalid format: missing delimiter')
    }

    const username = decoded.substring(0, delimiterIndex)
    const keysData = decoded.substring(delimiterIndex + 1)

    // Split the concatenated keys (each is KEY_LENGTH chars)
    const owner = keysData.substring(0, KEY_LENGTH)
    const active = keysData.substring(KEY_LENGTH, KEY_LENGTH * 2)
    const posting = keysData.substring(KEY_LENGTH * 2, KEY_LENGTH * 3)
    const memo = keysData.substring(KEY_LENGTH * 3, KEY_LENGTH * 4)

    return {
      username,
      ownerPubkey: 'STM' + owner,
      activePubkey: 'STM' + active,
      postingPubkey: 'STM' + posting,
      memoPubkey: 'STM' + memo
    }
  } catch (error) {
    console.error('Failed to decode account data:', error)
    return null
  }
}

/**
 * Generates a complete shareable link for account creation
 */
export function generateShareableLink(data: ShareableAccountData, baseUrl: string = window.location.origin): string {
  const encoded = encodeAccountData(data)
  return `${baseUrl}?join=${encoded}`
}
