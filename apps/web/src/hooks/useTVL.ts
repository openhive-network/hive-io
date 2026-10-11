'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {fetchChainSnapshot} from '@/lib/hive-rates'

interface TVLData {
  totalUSD: number;
  hiveSavingsUSD: number;
  hbdSavingsUSD: number;
  hpUSD: number;
  hivePrice: number;
  hbdPrice: number;
  // Raw token amounts
  hiveSavings: number;
  hbdSavings: number;
  hpAmount: number;
}

interface UseTVLOptions {
  updateInterval?: number;
  enabled?: boolean;
}

interface UseTVLResult {
  tvl: TVLData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

// Balance Tracker on the Hive API node (CORS open). Integer strings:
// savings_hive and savings_hbd carry 3 decimals, total_vests carries 6.
const TVL_API = 'https://api.hive.blog/balance-api/total-value-locked'

interface BalanceTrackerTVL {
  total_vests: string
  savings_hive: string
  savings_hbd: string
}

/**
 * Hook to fetch Total Value Locked (TVL) data
 * Locked amounts come from the Balance Tracker, prices from the witness
 * median feed (HBD is treated as 1 USD, as the chain does). `tvl` is null
 * until the first success, so the UI never shows a made-up value. A later
 * failed poll keeps the last good `tvl` and only sets `error`.
 */
export function useTVL(options: UseTVLOptions = {}): UseTVLResult {
  const { updateInterval = 60000, enabled = true } = options;

  const [tvl, setTVL] = useState<TVLData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const fetchTVL = useCallback(async () => {
    if (!enabled) return;

    try {
      const [response, chain] = await Promise.all([
        fetch(TVL_API),
        fetchChainSnapshot(),
      ])

      if (!response.ok) {
        throw new Error(`Balance Tracker HTTP ${response.status}`)
      }

      const locked: BalanceTrackerTVL = await response.json()

      const hiveSavings = Number(locked.savings_hive) / 1000
      const hbdSavings = Number(locked.savings_hbd) / 1000
      const vests = Number(locked.total_vests) / 1e6
      // VESTS to HIVE at the current vesting fund ratio
      const hpAmount =
        (vests * chain.totalVestingFundHive) / chain.totalVestingShares

      if (![hiveSavings, hbdSavings, hpAmount].every(Number.isFinite)) {
        throw new Error('Invalid Balance Tracker response')
      }

      // Witness median feed gives HBD per HIVE, and the chain treats HBD as $1
      const hivePrice = chain.hbdPerHive
      const hbdPrice = 1

      const hiveSavingsUSD = hiveSavings * hivePrice
      const hbdSavingsUSD = hbdSavings * hbdPrice
      const hpUSD = hpAmount * hivePrice // HP uses HIVE price

      const totalUSD = hiveSavingsUSD + hbdSavingsUSD + hpUSD;

      setTVL({
        totalUSD,
        hiveSavingsUSD,
        hbdSavingsUSD,
        hpUSD,
        hivePrice,
        hbdPrice,
        // Raw token amounts
        hiveSavings,
        hbdSavings,
        hpAmount,
      });
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch TVL data:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setIsLoading(false);
    }
  }, [enabled]);

  // Fetch immediately on mount
  useEffect(() => {
    if (!enabled) return;

    void fetchTVL();
  }, [enabled, fetchTVL]);

  // Set up polling interval
  useEffect(() => {
    if (!enabled) return;

    intervalIdRef.current = setInterval(() => {
      void fetchTVL();
    }, updateInterval);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [enabled, updateInterval, fetchTVL]);

  return {
    tvl,
    isLoading,
    error,
    refetch: fetchTVL,
  };
}
