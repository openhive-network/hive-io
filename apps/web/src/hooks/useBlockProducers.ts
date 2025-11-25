'use client'

import {useState, useEffect, useCallback, useRef} from 'react'

export interface BlockProducer {
  block_num: number
  producer: string
  timestamp: string
}

interface UseBlockProducersOptions {
  initialCount?: number
  enabled?: boolean
}

interface UseBlockProducersResult {
  producers: BlockProducer[]
  latestProducer: BlockProducer | null
  isLoading: boolean
  error: string | null
  addBlock: (blockNum: number, producer: string) => void
}

/**
 * Hook to fetch and track block producers for DPoS visualization
 * Fetches initial producers once, then use addBlock to add new ones
 */
export function useBlockProducers(
  options: UseBlockProducersOptions = {},
): UseBlockProducersResult {
  const {initialCount = 20, enabled = true} = options

  const [producers, setProducers] = useState<BlockProducer[]>([])
  const [latestProducer, setLatestProducer] = useState<BlockProducer | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const lastBlockRef = useRef<number>(0)
  const hasInitializedRef = useRef(false)
  const initialCountRef = useRef(initialCount)

  /**
   * Fetch initial block producers (runs once)
   */
  const fetchInitialProducers = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.hive.blog/hafbe-api/operation-type-counts?result-limit=${initialCountRef.current}`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch block producers')
      }

      const data = await response.json()

      if (Array.isArray(data)) {
        const blockProducers: BlockProducer[] = data.map(
          (block: {block_num: number; witness: string}) => ({
            block_num: block.block_num,
            producer: block.witness,
            timestamp: new Date().toISOString(),
          }),
        )

        setProducers(blockProducers)

        if (blockProducers.length > 0) {
          setLatestProducer(blockProducers[0])
          lastBlockRef.current = blockProducers[0].block_num
        }
      }

      setIsLoading(false)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch block producers:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setIsLoading(false)
    }
  }, [])

  /**
   * Add a new block from external source
   * Call this when a new block is produced
   */
  const addBlock = useCallback((blockNum: number, producer: string) => {
    // Only add if it's a newer block
    if (blockNum <= lastBlockRef.current) return

    const newProducer: BlockProducer = {
      block_num: blockNum,
      producer,
      timestamp: new Date().toISOString(),
    }

    lastBlockRef.current = blockNum
    setLatestProducer(newProducer)
    setProducers((prev) =>
      [newProducer, ...prev].slice(0, initialCountRef.current),
    )
  }, [])

  // Initial fetch only - runs once
  useEffect(() => {
    if (!enabled || hasInitializedRef.current) return

    hasInitializedRef.current = true
    void fetchInitialProducers()
  }, [enabled, fetchInitialProducers])

  return {
    producers,
    latestProducer,
    isLoading,
    error,
    addBlock,
  }
}
