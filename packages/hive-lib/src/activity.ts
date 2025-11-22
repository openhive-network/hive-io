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
  icon?: string
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
        icon: '💸',
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
        icon: '🏆',
        color: 'text-yellow-600',
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
        icon: '👍',
        color: 'text-gray-700',
        avatarUrl: getUserAvatar(data.voter),
        author: data.author,
        permlink: data.permlink,
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
          icon: '📝',
          color: 'text-gray-800',
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
        icon: '💬',
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
        icon: '⚡',
        color: 'text-[#e31337]',
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
            icon: '🛒',
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
          icon: '🎮',
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

/**
 * Fetch initial activities for default display
 * Fetches from multiple recent blocks and randomizes selection
 */
export async function fetchInitialActivities(count: number = 4): Promise<{
  activities: ActivityItem[]
  currentBlock: number
  transactionCount: number
}> {
  const hive = await getHiveChain()

  // Get current head block
  const props = await hive.api.database_api.get_dynamic_global_properties({})
  const headBlock = props.head_block_number

  // Fetch last 10 blocks to get a good pool of activities
  const allActivities: ActivityItem[] = []
  let latestTransactionCount = 0

  for (let i = 0; i < 10; i++) {
    const blockNum = headBlock - i

    try {
      const result = await hive.api.block_api.get_block({block_num: blockNum})

      if (!result?.block?.transactions) continue

      const block = result.block

      // Store transaction count from the latest block
      if (i === 0) {
        latestTransactionCount = block.transactions.length
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
            allActivities.push(activity)
          }
        })
      })
    } catch (error) {
      console.error(`Failed to fetch block ${blockNum}:`, error)
    }
  }

  // Filter and get optimal activities
  const optimalActivities = filterOptimalActivities(allActivities, count * 3)

  // Shuffle and take the requested count
  const shuffled = shuffleArray(optimalActivities)
  const selected = shuffled.slice(0, count)

  return {
    activities: selected,
    currentBlock: headBlock,
    transactionCount: latestTransactionCount,
  }
}

/**
 * Fetch blockchain activities from recent blocks
 * Optimized to avoid unnecessary dynamic_global_properties calls
 */
export async function fetchBlockchainActivity(
  lastBlock: number,
  maxBlocks: number = 3,
): Promise<{
  activities: ActivityItem[]
  latestBlock: number
  shouldSpeedUp: boolean
  transactionCount: number
}> {
  const hive = await getHiveChain()

  // Only check dynamic props on first call or every 10 blocks
  if (lastBlock === 0 || blockCheckCounter % 10 === 0) {
    const props = await hive.api.database_api.get_dynamic_global_properties({})
    assumedHeadBlock = props.head_block_number

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

      // console.log(
      //   `Fetched block ${blockNum} with ${block.transactions.length} transactions.`,
      //   block,
      // )

      actualLatestBlock = blockNum
      latestTransactionCount = block.transactions.length

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
  }
}
