import {ApiOperation, operation} from '@hiveio/wax'
import {getHiveChain} from './index'

/**
 * Format time ago (e.g., "2s ago", "5m ago")
 */
export function formatTimeAgo(date: Date): string {
  return `just now`
}

/**
 * Shuffle array for random display
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export interface ActivityItem {
  id: string
  txId?: string
  type:
    | 'transfer'
    | 'power_up'
    | 'post'
    | 'comment'
    | 'vote'
    | 'custom'
    | 'trade'
    | 'other'
  message: string
  user?: string
  amount?: string
  symbol?: string
  timestamp: Date
  color?: string
  avatarUrl?: string
  // For posts, comments, and votes - used to link to peakd
  author?: string
  permlink?: string
}

/**
 * Get user avatar URL from Hive images
 */
export function getUserAvatar(username?: string): string {
  return username
    ? `https://images.hive.blog/u/${username}/avatar/small`
    : 'https://images.hive.blog/u/null/avatar/small'
}

/**
 * Parse a Hive operation into a readable activity item
 */
export function parseOperation(
  hive: any,
  op: ApiOperation,
  blockNum: number,
  txIndex: number,
  txId?: string,
): ActivityItem | null {
  const opType = op.type
  const opData = op.value
  const timestamp = new Date()
  const id = `${blockNum}-${txIndex}`

  switch (opType) {
    case 'transfer_operation': {
      const data = opData as operation['transfer_operation']

      if (!data) return null

      const asset = hive.getAsset(data!.amount!)
      return {
        id,
        txId,
        type: 'transfer',
        message: `${data.from} sent ${asset.amount} ${asset.symbol}`,
        user: data?.from,
        amount: asset.amount,
        symbol: asset.symbol,
        timestamp,
        color: 'text-gray-700',
        avatarUrl: getUserAvatar(data?.from),
      }
    }

    case 'claim_reward_balance_operation': {
      const data = opData as operation['claim_reward_balance_operation']

      if (!data) return null

      return {
        id,
        txId,
        type: 'other',
        message: `${data.account} claimed rewards`,
        user: data.account,
        timestamp,
        color: 'text-gray-700',
        avatarUrl: getUserAvatar(data.account),
      }
    }

    case 'vote_operation': {
      const data = opData as operation['vote_operation']

      if (!data) return null

      // Only show upvotes (weight > 0)
      if (data.weight! <= 0) return null

      return {
        id,
        txId,
        type: 'vote',
        message: `${data.voter} upvoted a post`,
        user: data.voter,
        timestamp,
        color: 'text-gray-700',
        avatarUrl: getUserAvatar(data.voter),
        author: data.author,
        permlink: data.permlink,
      }
    }

    case 'limit_order_create_operation': {
      const data = opData as operation['limit_order_create_operation']

      if (!data) return null

      return {
        id,
        txId,
        type: 'trade',
        message: `${data.owner} traded on Hive`,
        user: data.owner,
        timestamp,
        color: 'text-gray-700',
        avatarUrl: getUserAvatar(data.owner),
      }
    }

    case 'comment_operation': {
      const data = opData as operation['comment_operation']

      if (!data) return null

      // Root post (no parent)
      if (!data.parent_author) {
        return {
          id,
          txId,
          type: 'post',
          message: `${data.author} published a post`,
          user: data.author,
          timestamp,
          color: 'text-gray-700',
          avatarUrl: getUserAvatar(data.author),
          author: data.author,
          permlink: data.permlink,
        }
      }

      // Comment
      return {
        id,
        txId,
        type: 'comment',
        message: `${data.author} commented on a post`,
        user: data.author,
        timestamp,
        color: 'text-gray-700',
        avatarUrl: getUserAvatar(data.author),
        author: data.author,
        permlink: data.permlink,
      }
    }

    case 'transfer_to_vesting_operation': {
      const data = opData as operation['transfer_to_vesting_operation']

      if (!data) return null

      const asset = hive.getAsset(data!.amount!)
      const user = data.to || data.from

      return {
        id,
        txId,
        type: 'power_up',
        message: `${user} powered up ${asset.amount} ${asset.symbol}`,
        user,
        amount: asset.amount,
        symbol: asset.symbol,
        timestamp,
        color: 'text-gray-700',
        avatarUrl: getUserAvatar(user),
      }
    }

    case 'custom_json_operation': {
      const data = opData as operation['custom_json_operation']

      if (!data) return null

      const user =
        data.required_posting_auths?.[0] ||
        data.required_auths?.[0] ||
        'Someone'

      // Parse common custom_json operations
      if (data.id.startsWith('sm_')) {
        // if (data.id.includes('delegate_cards')) {
        //   return {
        //     id,
        //     txId,
        //     type: 'custom',
        //     message: `${user} delegated Splinterlands cards`,
        //     user,
        //     timestamp,
        //     icon: '🃏',
        //     color: 'text-gray-700',
        //     avatarUrl: getUserAvatar(user),
        //   }
        // }
        if (data.id.includes('market_purchase')) {
          return {
            id,
            txId,
            type: 'custom',
            message: `${user} made a Splinterlands market purchase`,
            user,
            timestamp,
            color: 'text-gray-700',
            avatarUrl: getUserAvatar(user),
          }
        }
        // if (data.id.includes('sm_claim_rewards')) {
        //   return {
        //     id,
        //     txId,
        //     type: 'custom',
        //     message: `${user} claimed Splinterlands rewards`,
        //     user,
        //     timestamp,
        //     icon: '🎁',
        //     color: 'text-gray-700',
        //     avatarUrl: getUserAvatar(user),
        //   }
        // }
        return {
          id,
          txId,
          type: 'custom',
          message: `${user} played Splinterlands`,
          user,
          timestamp,
          color: 'text-gray-700',
          avatarUrl: getUserAvatar(user),
        }
      } else if (data.id === 'ssc-mainnet-hive') {
        return {
          id,
          txId,
          type: 'custom',
          message: `${user} traded on Hive Engine`,
          user,
          timestamp,
          color: 'text-gray-700',
          avatarUrl: getUserAvatar(user),
        }
      }
    }
  }

  return null
}

/**
 * Filter operations to only show interesting activities
 */
export function filterInterestingOperations(
  operations: ApiOperation[],
): ApiOperation[] {
  const interestingTypes = new Set([
    'custom_json_operation',
    'claim_reward_balance_operation',
    'transfer_operation',
    'transfer_to_vesting_operation',
    'comment_operation',
    'vote_operation',
  ])

  return operations.filter((op) => interestingTypes.has(op.type))
}

/**
 * Filter activities based on quality criteria
 */
export function filterOptimalActivities(
  activities: ActivityItem[],
  maxActivities: number = 5,
): ActivityItem[] {
  const excludedAccountPatterns = ['sl-admin', 'null', 'ai-summaries']

  // First pass: Filter high-quality activities
  const optimalActivities = activities.filter((activity) => {
    // Filter out excluded accounts
    if (activity.user) {
      const lowerUser = activity.user.toLowerCase()
      if (
        excludedAccountPatterns.some((pattern) => lowerUser.includes(pattern))
      ) {
        return false
      }
    }

    // For transfers and power-ups, require >= 5 HIVE or HBD
    if (activity.type === 'transfer' || activity.type === 'power_up') {
      if (activity.amount && activity.symbol) {
        const amount = parseFloat(activity.amount)
        const symbol = activity.symbol.toUpperCase()

        // Must be >= 5 HIVE or HBD
        if ((symbol === 'HIVE' || symbol === 'HBD') && amount >= 5) {
          return true
        }
        return false
      }
      return false
    }

    // Include all other activity types (posts, comments, votes, etc.)
    return true
  })

  // Second pass: Ensure unique users (keep first occurrence of each user)
  const seenUsers = new Set<string>()
  const uniqueActivities = optimalActivities.filter((activity) => {
    if (!activity.user) return true

    if (seenUsers.has(activity.user)) {
      return false
    }

    seenUsers.add(activity.user)
    return true
  })

  // Third pass: Limit activities on the same post (author/permlink combo) to max 2
  // This prevents too many votes/comments on the same popular post from flooding the feed
  const authorPermlinkCounts = new Map<string, number>()
  const limitedByPost = uniqueActivities.filter((activity) => {
    // Only apply to activities that have author/permlink (votes, comments, posts)
    if (!activity.author || !activity.permlink) return true

    const key = `${activity.author}/${activity.permlink}`
    const currentCount = authorPermlinkCounts.get(key) || 0

    // Allow max 2 activities per author/permlink combo
    if (currentCount >= 2) {
      return false
    }

    authorPermlinkCounts.set(key, currentCount + 1)
    return true
  })

  // Fourth pass: Ensure variety by avoiding too many of the same type in a row
  // Vote operations: max 1 consecutive (no back-to-back votes)
  // Other operations: max 2 consecutive
  const diversified: ActivityItem[] = []
  const remaining = [...limitedByPost]

  while (remaining.length > 0 && diversified.length < maxActivities) {
    let selected: ActivityItem | undefined

    if (diversified.length >= 1) {
      const lastType = diversified[diversified.length - 1].type

      // For vote operations, never allow consecutive votes
      if (lastType === 'vote') {
        selected = remaining.find((a) => a.type !== 'vote')
      }
      // For other operations, check last 2 activities
      else if (diversified.length >= 2) {
        const secondLastType = diversified[diversified.length - 2].type

        // If last 2 are the same type, avoid that type
        if (lastType === secondLastType) {
          selected = remaining.find((a) => a.type !== lastType)
        }
      }
    }

    // If no specific constraint or couldn't find different type, take the first one
    if (!selected) {
      selected = remaining[0]
    }

    // Add selected activity and remove from remaining
    if (selected) {
      diversified.push(selected)
      const index = remaining.indexOf(selected)
      remaining.splice(index, 1)
    } else {
      break
    }
  }

  // If we have enough optimal activities, return them
  if (diversified.length >= maxActivities) {
    return diversified.slice(0, maxActivities)
  }

  // Otherwise, fill with random activities from the remaining pool
  const leftover = activities.filter((activity) => {
    // Don't include activities already in diversified
    return !diversified.some((ua) => ua.id === activity.id)
  })

  // Shuffle remaining and take what we need
  const shuffledRemaining = shuffleArray(leftover)
  const needed = maxActivities - diversified.length

  return [...diversified, ...shuffledRemaining.slice(0, needed)]
}

// Track block sync state
let blockCheckCounter = 0
let assumedHeadBlock = 0
let cachedGlobalProps: DynamicGlobalProperties | null = null
let cachedHiveFundBalance: { hiveBalance: number; hbdBalance: number } | null = null

// Asset can be either string format "123.456 HIVE" or object format
export type HiveAsset = string | { amount: string; nai: string; precision: number }

export interface DynamicGlobalProperties {
  head_block_number: number
  head_block_id: string
  time: string
  current_witness: string
  total_pow: number
  num_pow_witnesses: number
  virtual_supply: HiveAsset
  current_supply: HiveAsset
  init_hbd_supply: HiveAsset
  current_hbd_supply: HiveAsset
  total_vesting_fund_hive: HiveAsset
  total_vesting_shares: HiveAsset
  total_reward_fund_hive: HiveAsset
  total_reward_shares2: string
  pending_rewarded_vesting_shares: HiveAsset
  pending_rewarded_vesting_hive: HiveAsset
  hbd_interest_rate: number
  hbd_print_rate: number
  maximum_block_size: number
  required_actions_partition_percent: number
  current_aslot: number
  recent_slots_filled: string
  participation_count: number
  last_irreversible_block_num: number
  vote_power_reserve_rate: number
  delegation_return_period: number
  reverse_auction_seconds: number
  available_account_subsidies: number
  hbd_stop_percent: number
  hbd_start_percent: number
  next_maintenance_time: string
  last_budget_time: string
  next_daily_maintenance_time: string
  content_reward_percent: number
  vesting_reward_percent: number
  proposal_fund_percent: number
  dhf_interval_ledger: string
  downvote_pool_percent: number
  current_remove_threshold: number
  early_voting_seconds: number
  mid_voting_seconds: number
  max_consecutive_recurrent_transfer_failures: number
  max_recurrent_transfer_end_date: number
  min_recurrent_transfers_recurrence: number
  max_open_recurrent_transfers: number
}

/**
 * Fetch blockchain activities from recent blocks
 * Optimized to avoid unnecessary dynamic_global_properties calls
 */
export interface BlockWitness {
  blockNum: number
  witness: string
}

export async function fetchBlockchainActivity(
  lastBlock: number,
  maxBlocks: number = 3,
): Promise<{
  activities: ActivityItem[]
  latestBlock: number
  shouldSpeedUp: boolean
  transactionCount: number
  witnesses: BlockWitness[]
  globalProps: DynamicGlobalProperties | null
  hiveFundBalance: { hiveBalance: number; hbdBalance: number } | null
}> {
  const hive = await getHiveChain()

  // Only check dynamic props on first call or every 10 blocks
  if (lastBlock === 0 || blockCheckCounter % 10 === 0) {
    // Fetch global props and hive.fund account in parallel
    const [props, hiveFundResult] = await Promise.all([
      hive.api.database_api.get_dynamic_global_properties({}),
      hive.api.database_api.find_accounts({ accounts: ['hive.fund'] }),
    ])

    cachedGlobalProps = props as unknown as DynamicGlobalProperties
    assumedHeadBlock = props.head_block_number

    // Cache hive.fund balance using hive.getAsset
    if (hiveFundResult.accounts && hiveFundResult.accounts.length > 0) {
      const account = hiveFundResult.accounts[0]
      const hiveAsset = hive.getAsset(account.balance)
      const hbdAsset = hive.getAsset(account.hbd_balance)
      cachedHiveFundBalance = {
        hiveBalance: parseFloat(hiveAsset.amount),
        hbdBalance: parseFloat(hbdAsset.amount),
      }
    }

    // If this is the first fetch, set lastBlock to fetch recent blocks
    if (lastBlock === 0) {
      blockCheckCounter = 0
      // Start from a few blocks ago to get initial activities
      lastBlock = Math.max(0, assumedHeadBlock - 3)
    }
  }

  blockCheckCounter++

  // Check if we're behind (more than 1 block behind assumed head)
  const blocksBehind = assumedHeadBlock - lastBlock
  const shouldSpeedUp = blocksBehind > 1

  // If more than 2 blocks behind, jump to latest instead of catching up
  let nextBlock = lastBlock + 1
  let blocksToFetch = Math.min(Math.max(1, blocksBehind), maxBlocks)

  if (blocksBehind > 2) {
    // Jump to the latest block instead of trying to catch up
    nextBlock = assumedHeadBlock
    blocksToFetch = 1
  }

  const newActivities: ActivityItem[] = []
  const witnesses: BlockWitness[] = []
  let actualLatestBlock = lastBlock
  let latestTransactionCount = 0

  // Fetch each block
  for (let i = 0; i < blocksToFetch; i++) {
    const blockNum = nextBlock + i

    // Don't fetch beyond assumed head
    if (blockNum > assumedHeadBlock) break

    try {
      const result = await hive.api.block_api.get_block({block_num: blockNum})

      if (!result?.block?.transactions) {
        // Block doesn't exist yet, we've caught up
        break
      }

      const block = result.block

      actualLatestBlock = blockNum
      latestTransactionCount = block.transactions.length

      // Track the witness/producer for this block
      if (block.witness) {
        witnesses.push({
          blockNum,
          witness: block.witness,
        })
      }

      // Parse all transactions in the block
      block.transactions.forEach((tx, txIndex: number) => {
        const operations = tx.operations || []
        // Get transaction ID from block.transaction_ids array (same order as transactions)
        const txId = (block as any).transaction_ids?.[txIndex]

        const interestingOps = filterInterestingOperations(operations)

        interestingOps.forEach((op) => {
          const activity = parseOperation(hive, op, blockNum, txIndex, txId)
          if (activity) {
            newActivities.push(activity)
          }
        })
      })
    } catch (blockError) {
      console.error(`Failed to fetch block ${blockNum}:`, blockError)
      // Block might not exist yet, we've caught up
      break
    }
  }

  // Update assumed head block for next iteration
  if (actualLatestBlock >= assumedHeadBlock) {
    assumedHeadBlock = actualLatestBlock + 1
  }

  return {
    activities: newActivities,
    latestBlock: actualLatestBlock,
    shouldSpeedUp,
    transactionCount: latestTransactionCount,
    witnesses,
    globalProps: cachedGlobalProps,
    hiveFundBalance: cachedHiveFundBalance,
  }
}
