// Plain JSON-RPC helpers for read-only chain data. Nothing here imports wax,
// so pages that only read from the chain do not download the wax wasm.

const API_NODES = ['https://api.hive.blog', 'https://api.openhive.network']
const REQUEST_TIMEOUT_MS = 8000

export async function hiveApiFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  let lastError: unknown = new Error('No Hive API node available')
  for (const node of API_NODES) {
    try {
      const response = await fetch(`${node}${path}`, {
        ...init,
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      })
      if (response.ok) return response
      lastError = new Error(`Hive API request failed: ${response.status}`)
    } catch (err) {
      lastError = err
    }
  }
  throw lastError
}

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
  const response = await hiveApiFetch('', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({jsonrpc: '2.0', id: 1, method, params}),
  })

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
