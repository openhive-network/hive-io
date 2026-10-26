// Plain JSON-RPC helpers for read-only chain data. Nothing here imports wax,
// so pages that only read from the chain do not download the wax wasm.

const API_ENDPOINT = 'https://api.hive.blog'

export interface NaiAmount {
  amount: string
  precision: number
  nai: string
}

const NAI_SYMBOLS: Record<string, string> = {
  '@@000000021': 'HIVE',
  '@@000000013': 'HBD',
  '@@000000037': 'VESTS',
}

/**
 * Call a Hive JSON-RPC method, e.g. hiveRpc('database_api.find_accounts', {...})
 */
export async function hiveRpc<T = any>(
  method: string,
  params: unknown = {},
): Promise<T> {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({jsonrpc: '2.0', id: 1, method, params}),
  })

  if (!response.ok) {
    throw new Error(`Hive API request failed: ${response.status}`)
  }

  const data = await response.json()
  if (data.error) {
    throw new Error(data.error.message || `Hive API error in ${method}`)
  }
  return data.result as T
}

/**
 * Format a NAI asset as a decimal string and symbol, e.g. "1.100" and "HIVE"
 */
export function parseNaiAsset(asset: NaiAmount): {
  amount: string
  symbol: string
} {
  const {precision} = asset
  const digits = asset.amount.padStart(precision + 1, '0')
  const amount = precision
    ? `${digits.slice(0, -precision)}.${digits.slice(-precision)}`
    : digits
  return {amount, symbol: NAI_SYMBOLS[asset.nai] ?? asset.nai}
}
