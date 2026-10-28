'use client'

import {useEffect, useState} from 'react'
import {computeBaseStakingApr, fetchChainSnapshot} from '@/lib/hive-rates'
import {trackOnce} from '@/lib/analytics'

const REFRESH_MS = 5 * 60 * 1000

interface StakingAprState {
  apr: number | null
  failed: boolean
}

/**
 * Live base staking APR as a fraction. `apr` is null until the first
 * answer; `failed` is true only while there is no value and the Hive API
 * could not be reached, so the UI can tell loading from failed. A later
 * failed refresh keeps the last good value. Never falls back to a fixed
 * rate.
 */
export function useStakingApr(): StakingAprState {
  const [state, setState] = useState<StakingAprState>({
    apr: null,
    failed: false,
  })

  useEffect(() => {
    let cancelled = false
    const load = () => {
      fetchChainSnapshot()
        .then((chain) => {
          if (cancelled) return
          setState({
            apr: computeBaseStakingApr({
              headBlockNumber: chain.headBlockNumber,
              currentSupply: chain.currentSupply,
              currentHbdSupply: chain.currentHbdSupply,
              treasuryHbd: chain.treasuryHbd,
              totalVestingFundHive: chain.totalVestingFundHive,
              vestingRewardPercent: chain.vestingRewardPercent,
              hbdPerHive: chain.hbdPerHive,
            }),
            failed: false,
          })
        })
        .catch((err) => {
          console.error('Failed to fetch staking APR:', err)
          trackOnce('data_fallback', {fallback_source: 'staking_apr'})
          if (!cancelled) {
            setState((prev) =>
              prev.apr == null ? {apr: null, failed: true} : prev,
            )
          }
        })
    }
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  return state
}
