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
  maxActivities?: number
  updateInterval?: number
  enabled?: boolean
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
  options: UseBlockchainActivityOptions = {},
): UseBlockchainActivityResult {
  const {
    maxActivities = 4,
    updateInterval = 3000, // 3 seconds (Hive block time)
    enabled = true,
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
  const pendingActivitiesRef = useRef<ActivityItem[]>([])
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialLoadRef = useRef(true)
  const lastAnimationTimeRef = useRef<number>(Date.now())

  /**
   * Display activities one at a time with smooth staggered animation
   * Maintains a queue and animates at a consistent pace
   */
  const displayActivitiesSmooth = useCallback(
    (newActivities: ActivityItem[]) => {
      // If no new activities, nothing to animate
      if (newActivities.length === 0) return

      // Add to pending queue (at the end, to maintain order)
      pendingActivitiesRef.current = [
        ...pendingActivitiesRef.current,
        ...newActivities,
      ]

      // Limit queue size to prevent buildup - keep only 6 most recent
      if (pendingActivitiesRef.current.length > 6) {
        pendingActivitiesRef.current = pendingActivitiesRef.current.slice(0, 6)
      }

      // If already animating, just let it continue with the updated queue
      if (animationIntervalRef.current) {
        return
      }

      // Start animation loop
      const displayNext = () => {
        // Check if there are pending activities
        if (pendingActivitiesRef.current.length === 0) {
          // No more pending activities, stop animation
          animationIntervalRef.current = null
          return
        }

        const now = Date.now()
        const timeSinceLastAnimation = now - lastAnimationTimeRef.current

        // If more than 2 seconds have passed since last animation (likely tab was inactive),
        // show all pending activities immediately
        if (timeSinceLastAnimation > 2000 && pendingActivitiesRef.current.length > 0) {
          // Take up to 5 pending activities and show them immediately
          const activitiesToShow = pendingActivitiesRef.current.splice(0, 5)

          displayedActivitiesRef.current = [
            ...activitiesToShow,
            ...displayedActivitiesRef.current,
          ].slice(0, 5)

          setActivities([...displayedActivitiesRef.current.slice(0, maxActivities)])

          lastAnimationTimeRef.current = now
          animationIntervalRef.current = null
          return
        }

        // Get next activity from queue (from front)
        const nextActivity = pendingActivitiesRef.current.shift()!

        // Add to displayed activities at the front
        // Keep 5 in the ref (for queue) but only show 4 to user
        displayedActivitiesRef.current = [
          nextActivity,
          ...displayedActivitiesRef.current,
        ].slice(0, 5)

        // Update the displayed state (only first 4 visible)
        setActivities([...displayedActivitiesRef.current.slice(0, maxActivities)])

        lastAnimationTimeRef.current = now

        // Calculate delay with ±10% variation for natural feel
        const baseDelay = 700 // ~700ms per activity for smooth feel
        const variation = (Math.random() - 0.5) * 0.2 * baseDelay
        const delay = Math.max(400, baseDelay + variation)

        // Schedule next activity
        animationIntervalRef.current = setTimeout(displayNext, delay) as any
      }

      // Start displaying activities
      displayNext()
    },
    [maxActivities],
  )

  /**
   * Fetch the latest block and parse operations
   */
  const fetchActivity = useCallback(async () => {
    if (!enabled) return

    try {
      const {activities: newActivities, latestBlock, shouldSpeedUp, transactionCount} =
        await fetchBlockchainActivity(
          lastBlockRef.current,
          3, // max 3 blocks per fetch
        )

      // Detect new block for animation
      if (lastBlockRef.current > 0 && latestBlock > lastBlockRef.current) {
        setIsNewBlock(true)
        setTimeout(() => setIsNewBlock(false), 500)
      }

      // On first fetch from default block, show latestBlock - 1 for display
      const displayBlock = currentBlock === DEFAULT_BLOCK ? latestBlock - 1 : latestBlock

      setCurrentBlock(displayBlock)
      setBlockTimestamp(new Date().toLocaleTimeString())
      setTransactionCount(transactionCount)
      lastBlockRef.current = latestBlock

      // Smooth display of new activities
      if (newActivities.length > 0) {
        // On first real data fetch, merge with default activities
        if (isInitialLoadRef.current) {
          // Add all new real activities to the pool
          activitiesPoolRef.current = [
            ...newActivities,
            ...activitiesPoolRef.current,
          ].slice(0, maxActivities * 3)

          // Mark initial load as complete
          isInitialLoadRef.current = false
        } else {
          // Normal operation: add new activities to pool
          activitiesPoolRef.current = [
            ...newActivities,
            ...activitiesPoolRef.current,
          ].slice(0, maxActivities * 3)
        }

        // Filter to get optimal activities from the pool (get 5 to maintain queue)
        const optimalActivities = filterOptimalActivities(
          activitiesPoolRef.current,
          5,
        )

        // Find truly new optimal activities (not already displayed)
        const displayedIds = new Set(displayedActivitiesRef.current.map((a) => a.id))
        const trulyNewOptimal = optimalActivities.filter(
          (a) => !displayedIds.has(a.id),
        )

        // Display only the truly new optimal activities with smooth animation
        if (trulyNewOptimal.length > 0) {
          displayActivitiesSmooth(trulyNewOptimal)
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
    if (!enabled) return

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
   * Load default activities on mount with animation
   */
  useEffect(() => {
    if (!enabled) return

    // Load and animate default activities on initial mount
    const defaultActivities = getDefaultActivities()
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
