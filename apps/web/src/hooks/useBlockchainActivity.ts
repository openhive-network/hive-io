'use client'

import {useState, useEffect, useCallback, useRef} from 'react'
import {
  fetchBlockchainActivity,
  filterOptimalActivities,
  type ActivityItem,
} from '@hiveio/hive-lib'
import {
  getDefaultActivities,
  DEFAULT_BLOCK,
  DEFAULT_TX_COUNT,
} from './defaultActivities'

interface UseBlockchainActivityOptions {
  maxActivities: number
  updateInterval: number
  enabled: boolean
  animationDelay: number
}

interface UseBlockchainActivityResult {
  activities: ActivityItem[]
  isLoading: boolean
  error: string | null
  currentBlock: number
  blockTimestamp: string
  isNewBlock: boolean
  transactionCount: number
}

/**
 * Hook to fetch and parse real-time blockchain activities
 * Combines block observation with activity parsing
 */
export function useBlockchainActivity(
  options: UseBlockchainActivityOptions,
): UseBlockchainActivityResult {
  const {
    maxActivities,
    updateInterval,
    enabled,
    animationDelay,
  } = options

  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentBlock, setCurrentBlock] = useState(DEFAULT_BLOCK)
  const [blockTimestamp, setBlockTimestamp] = useState('')
  const [isNewBlock, setIsNewBlock] = useState(false)
  const [transactionCount, setTransactionCount] = useState(DEFAULT_TX_COUNT)

  const lastBlockRef = useRef(0)
  const activitiesPoolRef = useRef<ActivityItem[]>([])
  const displayedActivitiesRef = useRef<ActivityItem[]>([])
  const currentIntervalRef = useRef(updateInterval)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialLoadRef = useRef(true)
  const pendingActivitiesRef = useRef<ActivityItem[]>([])
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasInitializedRef = useRef(false)
  const hasLoadedDefaultsRef = useRef(false)

  /**
   * Preload an image to ensure it's cached before display
   */
  const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => resolve() // Resolve anyway to not block
      img.src = url
    })
  }

  /**
   * Display activities one at a time with animation
   * Maintains backup queue with large capacity for continuous flow
   * Prioritizes optimal activities by re-filtering the queue
   */
  const displayActivitiesSmooth = useCallback(
    (newActivities: ActivityItem[]) => {
      if (newActivities.length === 0) return

      // Add to pending queue with large capacity (up to 80 activities)
      // This allows continuous flow even when many blocks are processed
      const combinedQueue = [
        ...pendingActivitiesRef.current,
        ...newActivities,
      ].slice(0, maxActivities * 20)

      // Re-filter to maintain optimal ordering in the queue
      // This ensures the best activities are always at the front
      pendingActivitiesRef.current = filterOptimalActivities(
        combinedQueue,
        maxActivities * 20,
      )

      // If already animating, let it continue with updated queue
      if (animationIntervalRef.current) {
        return
      }

      // Start animation loop
      const displayNext = async () => {
        // Check if there are pending activities
        if (pendingActivitiesRef.current.length === 0) {
          animationIntervalRef.current = null
          return
        }

        // Get next activity from queue (from front)
        const nextActivity = pendingActivitiesRef.current.shift()!

        // Preload avatar image if present
        if (nextActivity.avatarUrl) {
          await preloadImage(nextActivity.avatarUrl)
        }

        // Add to front and keep only maxActivities
        displayedActivitiesRef.current = [
          nextActivity,
          ...displayedActivitiesRef.current,
        ].slice(0, maxActivities)

        // Update the displayed state
        setActivities([...displayedActivitiesRef.current])

        // Schedule next activity
        animationIntervalRef.current = setTimeout(displayNext, animationDelay)
      }

      // Start displaying
      void displayNext()
    },
    [maxActivities, animationDelay],
  )

  /**
   * Fetch the latest block and parse operations
   */
  const fetchActivity = useCallback(async () => {
    if (!enabled) return

    try {
      const {
        activities: newActivities,
        latestBlock,
        shouldSpeedUp,
        transactionCount,
      } = await fetchBlockchainActivity(
        lastBlockRef.current,
        3, // max 3 blocks per fetch
      )

      // Detect new block for animation
      if (lastBlockRef.current > 0 && latestBlock > lastBlockRef.current) {
        setIsNewBlock(true)
        setTimeout(() => setIsNewBlock(false), 500)
      }

      // On first fetch from default block, show latestBlock - 1 for display
      const displayBlock =
        currentBlock === DEFAULT_BLOCK ? latestBlock - 1 : latestBlock

      setCurrentBlock(displayBlock)
      setBlockTimestamp(new Date().toLocaleTimeString())
      setTransactionCount(transactionCount)
      lastBlockRef.current = latestBlock

      // Update activities pool
      if (newActivities.length > 0) {
        // Add new activities to pool
        activitiesPoolRef.current = [
          ...newActivities,
          ...activitiesPoolRef.current,
        ].slice(0, maxActivities * 3)

        // Mark initial load as complete
        isInitialLoadRef.current = false

        // Filter to get optimal activities from the pool
        const optimalActivities = filterOptimalActivities(
          activitiesPoolRef.current,
          maxActivities * 3, // Get more activities from pool to fill backup queue
        )

        // Find activities not already in backup queue or displayed
        // This allows pool activities to flow into backup queue continuously
        const queuedIds = new Set([
          ...pendingActivitiesRef.current.map((a) => a.id),
          ...displayedActivitiesRef.current.map((a) => a.id),
        ])
        const activitiesToQueue = optimalActivities.filter(
          (a) => !queuedIds.has(a.id),
        )

        // Add new activities to backup queue for continuous animation
        if (activitiesToQueue.length > 0) {
          displayActivitiesSmooth(activitiesToQueue)
        }
      }

      // No need to adjust polling speed - queue handles everything

      setIsLoading(false)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch blockchain activity:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setIsLoading(false)
    }
  }, [enabled, maxActivities, updateInterval, displayActivitiesSmooth])

  /**
   * Fetch initial block number immediately on mount
   */
  useEffect(() => {
    if (!enabled || hasInitializedRef.current) return

    hasInitializedRef.current = true

    // Fetch block number immediately to avoid showing default block for too long
    const fetchInitialBlock = async () => {
      try {
        const {latestBlock} = await fetchBlockchainActivity(0, 1)
        setCurrentBlock(latestBlock - 1)
        setBlockTimestamp(new Date().toLocaleTimeString())
        lastBlockRef.current = latestBlock
      } catch (err) {
        console.error('Failed to fetch initial block:', err)
      }
    }

    void fetchInitialBlock()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Load default activities on mount - start immediately
   */
  useEffect(() => {
    if (hasLoadedDefaultsRef.current) return

    hasLoadedDefaultsRef.current = true

    // Load default activities immediately on mount
    const defaultActivities = getDefaultActivities()
    // Start displaying them right away, no delay
    displayActivitiesSmooth(defaultActivities)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Set up polling interval with dynamic speed adjustment
   */
  useEffect(() => {
    if (!enabled) return

    // Delay first fetch by 3 seconds to allow default activities to be displayed
    const initialFetchTimeout = setTimeout(() => {
      void fetchActivity()

      // Set up polling interval after first fetch
      currentIntervalRef.current = updateInterval
      intervalIdRef.current = setInterval(() => {
        void fetchActivity()
      }, updateInterval)
    }, 3000)

    return () => {
      clearTimeout(initialFetchTimeout)
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current)
        intervalIdRef.current = null
      }
      if (animationIntervalRef.current) {
        clearTimeout(animationIntervalRef.current)
        animationIntervalRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  return {
    activities,
    isLoading,
    error,
    currentBlock,
    blockTimestamp,
    isNewBlock,
    transactionCount,
  }
}
