import type {ActivityItem} from '@hiveio/hive-lib'
import {CONTRIBUTORS} from '@/lib/data/var'
import {shuffleArray} from '@/lib/data/util'

/**
 * Default activities
 * These are displayed instantly while real blockchain data loads
 * Randomized on each page load for variety using the same logic as the contributors page
 */

// Activity templates with different types
const ACTIVITY_TEMPLATES = [
  {
    type: 'vote' as const,
    getMessage: (user: string) => `${user} upvoted a post`,
    icon: '👍',
    color: 'text-gray-700',
  },
  {
    type: 'post' as const,
    getMessage: (user: string) => `${user} just published a post`,
    icon: '📝',
    color: 'text-gray-800',
  },
  {
    type: 'comment' as const,
    getMessage: (user: string) => `${user} commented on a post`,
    icon: '💬',
    color: 'text-gray-700',
  },
  {
    type: 'custom' as const,
    getMessage: (user: string) => `${user} powered up rewards`,
    icon: '⚡',
    color: 'text-[#e31337]',
  },
  {
    type: 'custom' as const,
    getMessage: (user: string) => `${user} claimed rewards`,
    icon: '🎁',
    color: 'text-gray-700',
  },
]

/**
 * Generate random activities from contributors
 * Uses the same shuffleArray logic as the contributors page
 * Ensures variety by using different activity templates for each activity
 */
function generateRandomActivities(count: number): ActivityItem[] {
  const activities: ActivityItem[] = []

  // Get active contributors and shuffle using the same logic as contributors page
  const activeContributors = CONTRIBUTORS.filter((c) => !c.inactive)
  const shuffledContributors = shuffleArray([...activeContributors])

  // Shuffle templates to ensure variety
  const shuffledTemplates = shuffleArray([...ACTIVITY_TEMPLATES])

  for (let i = 0; i < count && i < shuffledContributors.length; i++) {
    const contributor = shuffledContributors[i]
    const username = contributor.social.hive

    // Use templates in order from shuffled array to ensure variety
    const template = shuffledTemplates[i % shuffledTemplates.length]

    // Generate a mock transaction ID for default activities
    const mockTxId = `${Math.random()
      .toString(16)
      .substring(2, 10)}${Math.random().toString(16).substring(2, 34)}`

    activities.push({
      id: `default-${i}`,
      txId: mockTxId,
      type: template.type,
      message: template.getMessage(username),
      user: username,
      timestamp: new Date(),
      icon: template.icon,
      color: template.color,
      avatarUrl: `https://images.hive.blog/u/${username}/avatar/small`,
    })
  }

  return activities
}

/**
 * Get randomized default activities
 * Returns N random activities generated from contributors
 */
export function getDefaultActivities(count: number = 2): ActivityItem[] {
  return generateRandomActivities(count)
}

// Default block data
export const DEFAULT_BLOCK = 100000000
export const DEFAULT_TX_COUNT = 24
