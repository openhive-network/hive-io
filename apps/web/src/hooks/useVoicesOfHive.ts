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

interface UseVoicesOfHiveOptions {
  postAuthor?: string
  postPermlink?: string
  excludeAuthors?: string[]
  excludePermlinks?: string[]
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
    excludeAuthors = [],
    excludePermlinks = [],
    maxExcerptLength = 200,
  } = options

  const [voices, setVoices] = useState<Voice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Serialize arrays for stable dependency comparison
  const excludeAuthorsKey = JSON.stringify(excludeAuthors)
  const excludePermlinksKey = JSON.stringify(excludePermlinks)

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

        const parsedExcludeAuthors: string[] = JSON.parse(excludeAuthorsKey)
        const parsedExcludePermlinks: string[] = JSON.parse(excludePermlinksKey)

        // Filter for first-level comments only
        const firstLevelComments = Object.values(discussion).filter((post) => {
          return (
            post.parent_author === postAuthor &&
            post.parent_permlink === postPermlink &&
            !parsedExcludeAuthors.includes(post.author) &&
            !parsedExcludePermlinks.includes(post.permlink)
          )
        })

        const voicesData: Voice[] = firstLevelComments.map((post) => {
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
  }, [
    postAuthor,
    postPermlink,
    excludeAuthorsKey,
    excludePermlinksKey,
    maxExcerptLength,
  ])

  return {voices, isLoading, error}
}
