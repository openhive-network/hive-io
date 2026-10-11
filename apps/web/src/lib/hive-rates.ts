/**
 * Live chain figures for rate-like numbers on the site.
 * Nothing here is hardcoded: every value is read from api.hive.blog.
 */

const HIVE_API = 'https://api.hive.blog'

export interface BaseStakingAprInput {
  /** head_block_number from get_dynamic_global_properties */
  headBlockNumber: number
  /** current_supply (HIVE) */
  currentSupply: number
  /** current_hbd_supply (HBD) */
  currentHbdSupply: number
  /** HBD held by the hive.fund treasury account */
  treasuryHbd: number
  /** total_vesting_fund_hive (HIVE backing all staked VESTS) */
  totalVestingFundHive: number
  /** vesting_reward_percent, protocol scale 0-10000 (1500 = 15%) */
  vestingRewardPercent: number
  /** Witness median feed price, HBD per 1 HIVE */
  hbdPerHive: number
}

/**
 * Base staking APR as a fraction (0.028 = 2.8%), before curation rewards.
 *
 * Mirrors process_funds in hive core, libraries/chain/database.cpp. Since
 * HF 1.28 the inflation base (virtual supply) excludes the HBD held by the
 * treasury. Each block, new HIVE is minted at the current inflation rate and
 * vesting_reward_percent of it goes to stakers, so per year:
 *
 *   inflation_bp = max(978 - floor(head_block / 250000), 95)
 *   virtual_supply = current_supply + (hbd_supply - treasury_hbd) / price
 *   apr = virtual_supply * inflation_bp/10000 * vesting_pct/10000
 *         / total_vesting_fund_hive
 */
export function computeBaseStakingApr(input: BaseStakingAprInput): number {
  const inflationBp = Math.max(
    978 - Math.floor(input.headBlockNumber / 250000),
    95,
  )
  const virtualSupplyNoTreasury =
    input.currentSupply +
    (input.currentHbdSupply - input.treasuryHbd) / input.hbdPerHive
  return (
    (virtualSupplyNoTreasury *
      (inflationBp / 10000) *
      (input.vestingRewardPercent / 10000)) /
    input.totalVestingFundHive
  )
}

/** "2.8%" from a fraction. */
export function formatPercent(fraction: number): string {
  return `${(fraction * 100).toFixed(1)}%`
}

// Legacy asset strings from condenser_api: "123.456 HIVE", "0.289 HBD"
export function parseAsset(asset: string): number {
  return parseFloat(asset.split(' ')[0])
}

async function hiveBatch(
  calls: {method: string; params: unknown}[],
): Promise<unknown[]> {
  const response = await fetch(HIVE_API, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      calls.map((call, id) => ({jsonrpc: '2.0', id, ...call})),
    ),
  })
  if (!response.ok) {
    throw new Error(`Hive API HTTP ${response.status}`)
  }
  const payload = (await response.json()) as {id: number; result?: unknown}[]
  return calls.map((_, id) => {
    const item = payload.find((entry) => entry.id === id)
    if (!item || item.result == null) {
      throw new Error(`Hive API returned no result for ${calls[id].method}`)
    }
    return item.result
  })
}

export interface ChainSnapshot {
  headBlockNumber: number
  time: string
  currentSupply: number
  currentHbdSupply: number
  totalVestingFundHive: number
  totalVestingShares: number
  vestingRewardPercent: number
  treasuryHbd: number
  /** Witness median feed price, HBD per 1 HIVE */
  hbdPerHive: number
}

let snapshotCache: {at: number; promise: Promise<ChainSnapshot>} | null = null

/**
 * One batched request for the chain state the rate figures need. Calls made
 * within 5 seconds of each other share a single request.
 */
export function fetchChainSnapshot(): Promise<ChainSnapshot> {
  if (snapshotCache && Date.now() - snapshotCache.at < 5000) {
    return snapshotCache.promise
  }
  const promise = hiveBatch([
    {method: 'condenser_api.get_dynamic_global_properties', params: []},
    {method: 'condenser_api.get_current_median_history_price', params: []},
    {method: 'condenser_api.get_accounts', params: [['hive.fund']]},
  ]).then(([props, feed, accounts]) => {
    const p = props as Record<string, string | number>
    const f = feed as {base: string; quote: string}
    const treasury = (accounts as {hbd_balance: string}[])[0]
    const hbdPerHive = parseAsset(f.base) / parseAsset(f.quote)
    const snapshot: ChainSnapshot = {
      headBlockNumber: Number(p.head_block_number),
      time: String(p.time),
      currentSupply: parseAsset(String(p.current_supply)),
      currentHbdSupply: parseAsset(String(p.current_hbd_supply)),
      totalVestingFundHive: parseAsset(String(p.total_vesting_fund_hive)),
      totalVestingShares: parseAsset(String(p.total_vesting_shares)),
      vestingRewardPercent: Number(p.vesting_reward_percent),
      treasuryHbd: parseAsset(treasury.hbd_balance),
      hbdPerHive,
    }
    const {time, ...numbers} = snapshot
    if (
      !time ||
      !Object.values(numbers).every(Number.isFinite) ||
      hbdPerHive <= 0 ||
      numbers.totalVestingFundHive <= 0 ||
      numbers.totalVestingShares <= 0
    ) {
      throw new Error('Incomplete chain snapshot')
    }
    return snapshot
  })
  snapshotCache = {at: Date.now(), promise}
  promise.catch(() => {
    if (snapshotCache?.promise === promise) snapshotCache = null
  })
  return promise
}
