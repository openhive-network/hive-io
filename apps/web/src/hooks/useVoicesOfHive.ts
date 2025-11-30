'use client'

import {useEffect, useState} from 'react'
import {getHiveChainExtended} from '@hiveio/hive-lib'

interface Voice {
  author: string
  permlink: string
  body: string
  excerpt: string
  avatarUrl: string
  created: string
  url: string
}

interface WhitelistEntry {
  author: string
  permlink: string
}

interface UseVoicesOfHiveOptions {
  postAuthor?: string
  postPermlink?: string
  whitelist?: WhitelistEntry[]
  maxExcerptLength?: number
}

interface UseVoicesOfHiveResult {
  voices: Voice[]
  isLoading: boolean
  error: string | null
}

function createExcerpt(body: string, maxLength: number): string {
  // Remove markdown formatting
  const clean = body
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with text
    .replace(/#{1,6}\s*/g, '') // Remove headers
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1') // Remove bold/italic
    .replace(/`{1,3}[^`]*`{1,3}/g, '') // Remove code blocks
    .replace(/>\s*/g, '') // Remove blockquotes
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  if (clean.length <= maxLength) {
    return clean
  }

  // Truncate at word boundary
  const truncated = clean.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  return (
    (lastSpace > maxLength * 0.7 ? truncated.slice(0, lastSpace) : truncated) +
    '...'
  )
}

export function useVoicesOfHive(
  options: UseVoicesOfHiveOptions = {},
): UseVoicesOfHiveResult {
  const {
    postAuthor = 'therealwolf',
    postPermlink = 'what-is-hive-to-you',
    whitelist = [],
    maxExcerptLength = 200,
  } = options

  const [voices, setVoices] = useState<Voice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Serialize whitelist for stable dependency comparison
  const whitelistKey = JSON.stringify(whitelist)

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const chain = await getHiveChainExtended()

        const discussion = await chain.api.bridge.get_discussion({
          author: postAuthor,
          permlink: postPermlink,
          observer: 'therealwolf',
        })

        if (!discussion) {
          throw new Error('No discussion found')
        }

        const parsedWhitelist: WhitelistEntry[] = JSON.parse(whitelistKey)

        // Filter for whitelisted comments only
        const whitelistedComments = Object.values(discussion).filter((post) => {
          return parsedWhitelist.some(
            (entry) => entry.author === post.author && entry.permlink === post.permlink
          )
        })

        const voicesData: Voice[] = whitelistedComments.map((post) => {
          return {
            author: post.author,
            permlink: post.permlink,
            body: post.body,
            excerpt: createExcerpt(post.body, maxExcerptLength),
            avatarUrl: `https://images.hive.blog/u/${post.author}/avatar`,
            created: post.created,
            url: `https://peakd.com/@${post.author}/${post.permlink}`,
          }
        })

        // Randomize the order
        for (let i = voicesData.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[voicesData[i], voicesData[j]] = [voicesData[j], voicesData[i]]
        }

        setVoices(voicesData)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching voices:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setIsLoading(false)
      }
    }

    fetchVoices()
  }, [postAuthor, postPermlink, whitelistKey, maxExcerptLength])

  return {voices, isLoading, error}
}
