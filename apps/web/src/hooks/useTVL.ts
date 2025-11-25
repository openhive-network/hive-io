'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Placeholder data - TODO: Replace with actual API call
const PLACEHOLDER_LOCKED = {
  hive_savings: 2320515.702,
  hbd_savings: 8383879.033,
  hp: 197821486.215,
};

interface PriceData {
  hive: {
    usd: number;
    usd_24h_change: number;
  };
  hive_dollar: {
    usd: number;
    usd_24h_change: number;
  };
}

interface TVLData {
  totalUSD: number;
  hiveSavingsUSD: number;
  hbdSavingsUSD: number;
  hpUSD: number;
  hivePrice: number;
  hbdPrice: number;
  hive24hChange: number;
  hbd24hChange: number;
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

const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price?ids=hive,hive_dollar&vs_currencies=usd&include_24hr_change=true';

// Fallback prices when API fails
const FALLBACK_PRICES = {
  hive: 0.1,
  hbd: 1.0,
};

/**
 * Hook to fetch Total Value Locked (TVL) data
 * Uses placeholder locked amounts and fetches prices from CoinGecko
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
      const response = await fetch(COINGECKO_API);

      if (!response.ok) {
        throw new Error('Failed to fetch price data from CoinGecko');
      }

      const priceData: PriceData = await response.json();

      const hivePrice = priceData.hive.usd;
      const hbdPrice = priceData.hive_dollar.usd;

      // Calculate USD values
      const hiveSavingsUSD = PLACEHOLDER_LOCKED.hive_savings * hivePrice;
      const hbdSavingsUSD = PLACEHOLDER_LOCKED.hbd_savings * hbdPrice;
      const hpUSD = PLACEHOLDER_LOCKED.hp * hivePrice; // HP uses HIVE price

      const totalUSD = hiveSavingsUSD + hbdSavingsUSD + hpUSD;

      setTVL({
        totalUSD,
        hiveSavingsUSD,
        hbdSavingsUSD,
        hpUSD,
        hivePrice,
        hbdPrice,
        hive24hChange: priceData.hive.usd_24h_change,
        hbd24hChange: priceData.hive_dollar.usd_24h_change,
        // Raw token amounts
        hiveSavings: PLACEHOLDER_LOCKED.hive_savings,
        hbdSavings: PLACEHOLDER_LOCKED.hbd_savings,
        hpAmount: PLACEHOLDER_LOCKED.hp,
      });
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch TVL data, using fallback prices:', err);

      // Use fallback prices
      const hivePrice = FALLBACK_PRICES.hive;
      const hbdPrice = FALLBACK_PRICES.hbd;

      const hiveSavingsUSD = PLACEHOLDER_LOCKED.hive_savings * hivePrice;
      const hbdSavingsUSD = PLACEHOLDER_LOCKED.hbd_savings * hbdPrice;
      const hpUSD = PLACEHOLDER_LOCKED.hp * hivePrice;

      const totalUSD = hiveSavingsUSD + hbdSavingsUSD + hpUSD;

      setTVL({
        totalUSD,
        hiveSavingsUSD,
        hbdSavingsUSD,
        hpUSD,
        hivePrice,
        hbdPrice,
        hive24hChange: 0,
        hbd24hChange: 0,
        hiveSavings: PLACEHOLDER_LOCKED.hive_savings,
        hbdSavings: PLACEHOLDER_LOCKED.hbd_savings,
        hpAmount: PLACEHOLDER_LOCKED.hp,
      });
      setError(null);
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
