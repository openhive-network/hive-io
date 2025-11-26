'use client'

import {useState, useEffect, useCallback, useRef} from 'react'
import {
  fetchBlockchainActivity,
  filterOptimalActivities,
  type ActivityItem,
  type BlockWitness,
  type DynamicGlobalProperties,
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
  paused?: boolean
  onNewBlock?: (blockNum: number, witness: string) => void
}

interface UseBlockchainActivityResult {
  activities: ActivityItem[]
  isLoading: boolean
  error: string | null
  currentBlock: number
  blockTimestamp: string
  transactionCount: number
  globalProps: DynamicGlobalProperties | null
  hiveFundBalance: { hiveBalance: number; hbdBalance: number } | null
  reset: () => void
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
    paused = false,
    onNewBlock,
  } = options

  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentBlock, setCurrentBlock] = useState(DEFAULT_BLOCK)
  const [blockTimestamp, setBlockTimestamp] = useState('')
  const [transactionCount, setTransactionCount] = useState(DEFAULT_TX_COUNT)
  const [globalProps, setGlobalProps] = useState<DynamicGlobalProperties | null>(null)
  const [hiveFundBalance, setHiveFundBalance] = useState<{ hiveBalance: number; hbdBalance: number } | null>(null)

  const lastBlockRef = useRef(0)
  const activitiesPoolRef = useRef<ActivityItem[]>([])
  const displayedActivitiesRef = useRef<ActivityItem[]>([])
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)
  const pendingActivitiesRef = useRef<ActivityItem[]>([])
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasInitializedRef = useRef(false)
  const hasLoadedDefaultsRef = useRef(false)
  const isFirstFetchRef = useRef(true)
  const pausedRef = useRef(paused)
  const onNewBlockRef = useRef(onNewBlock)

  // Keep refs in sync
  pausedRef.current = paused
  onNewBlockRef.current = onNewBlock

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
   * Queue activities for display
   * Maintains backup queue with large capacity for continuous flow
   * Prioritizes optimal activities by re-filtering the queue
   */
  const queueActivities = useCallback(
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

      // Process queue - push activities to state
      const processQueue = async () => {
        // If paused, check again after a short delay
        if (pausedRef.current) {
          animationIntervalRef.current = setTimeout(processQueue, 100)
          return
        }

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
        animationIntervalRef.current = setTimeout(processQueue, 10)
      }

      // Start processing
      void processQueue()
    },
    [maxActivities],
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
        witnesses,
        globalProps: fetchedGlobalProps,
        hiveFundBalance: fetchedHiveFundBalance,
      } = await fetchBlockchainActivity(
        lastBlockRef.current,
        3, // max 3 blocks per fetch
      )

      // Update global props if we received new ones
      if (fetchedGlobalProps) {
        setGlobalProps(fetchedGlobalProps)
      }

      // Update hive.fund balance if we received it
      if (fetchedHiveFundBalance) {
        setHiveFundBalance(fetchedHiveFundBalance)
      }

      // On first fetch from default block, show latestBlock - 1 for display
      const displayBlock =
        isFirstFetchRef.current ? latestBlock - 1 : latestBlock
      isFirstFetchRef.current = false

      setCurrentBlock(displayBlock)
      setBlockTimestamp(new Date().toLocaleTimeString())
      setTransactionCount(transactionCount)
      lastBlockRef.current = latestBlock

      // Notify about new blocks/witnesses
      if (onNewBlockRef.current && witnesses.length > 0) {
        witnesses.forEach((w) => {
          onNewBlockRef.current?.(w.blockNum, w.witness)
        })
      }

      // Update activities pool
      if (newActivities.length > 0) {
        // Add new activities to pool
        activitiesPoolRef.current = [
          ...newActivities,
          ...activitiesPoolRef.current,
        ].slice(0, maxActivities * 3)

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
          queueActivities(activitiesToQueue)
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
  }, [enabled, maxActivities, queueActivities])

  /**
   * Fetch initial block number immediately on mount
   */
  useEffect(() => {
    if (!enabled || hasInitializedRef.current) return

    hasInitializedRef.current = true

    // Fetch block number and global props immediately
    const fetchInitialBlock = async () => {
      try {
        const {latestBlock, globalProps: initialGlobalProps, hiveFundBalance: initialHiveFundBalance} = await fetchBlockchainActivity(0, 1)
        setCurrentBlock(latestBlock - 1)
        setBlockTimestamp(new Date().toLocaleTimeString())
        lastBlockRef.current = latestBlock
        if (initialGlobalProps) {
          setGlobalProps(initialGlobalProps)
        }
        if (initialHiveFundBalance) {
          setHiveFundBalance(initialHiveFundBalance)
        }
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
    queueActivities(defaultActivities)

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

  /**
   * Reset everything and start fresh (like a page reload)
   */
  const reset = useCallback(() => {
    console.log('🔄 Resetting blockchain activity hook')

    // Save activities from pool before clearing (if we have any)
    // These are real blockchain activities from the last known block
    const savedPoolActivities = [...activitiesPoolRef.current]
    const savedBlock = lastBlockRef.current

    // Clear all timers
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
      intervalIdRef.current = null
    }
    if (animationIntervalRef.current) {
      clearTimeout(animationIntervalRef.current)
      animationIntervalRef.current = null
    }

    // Reset all refs
    lastBlockRef.current = 0
    activitiesPoolRef.current = []
    displayedActivitiesRef.current = []
    pendingActivitiesRef.current = []

    // Reset state to empty first
    setActivities([])
    setCurrentBlock(DEFAULT_BLOCK)
    setTransactionCount(DEFAULT_TX_COUNT)
    setIsLoading(true)
    setError(null)

    // Use setTimeout to ensure state is cleared before adding new activities
    setTimeout(() => {
      // Use saved pool activities if we have any, otherwise fall back to hardcoded defaults
      let initialActivities
      if (savedPoolActivities.length > 0) {
        console.log(
          '📦 Using saved pool activities for reset:',
          savedPoolActivities.length,
        )
        // Re-filter to get optimal selection and assign new IDs to avoid conflicts
        initialActivities = filterOptimalActivities(savedPoolActivities, 4).map(
          (activity, index) => ({
            ...activity,
            id: `reset-${Date.now()}-${index}`,
          }),
        )
        // Restore the last known block number so we continue from there
        if (savedBlock > 0) {
          lastBlockRef.current = savedBlock
          setCurrentBlock(savedBlock)
        }
      } else {
        console.log('📦 Using hardcoded default activities for reset')
        initialActivities = getDefaultActivities()
      }

      queueActivities(initialActivities)

      // Restart polling after additional delay
      setTimeout(() => {
        void fetchActivity()
        intervalIdRef.current = setInterval(() => {
          void fetchActivity()
        }, updateInterval)
      }, 3000)
    }, 50)
  }, [queueActivities, fetchActivity, updateInterval])

  return {
    activities,
    isLoading,
    error,
    currentBlock,
    blockTimestamp,
    transactionCount,
    globalProps,
    hiveFundBalance,
    reset,
  }
}
