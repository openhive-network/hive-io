'use client';

import { useState, useEffect, useRef } from 'react';
import { trackOnce } from '@/lib/analytics';

interface TransactionStatsOptions {
  updateInterval: number;
  enabled: boolean;
}

interface TransactionStatsResult {
  displayedTransactions: number;
  isAnimating: boolean;
}

async function fetchTransactionTotal(): Promise<number> {
  const response = await fetch(
    'https://api.hive.blog/hafbe-api/transaction-statistics?granularity=yearly'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch transaction statistics');
  }

  const data = await response.json();

  // Sum up all transaction counts from all years
  return data.reduce((sum: number, year: any) => sum + year.trx_count, 0);
}

/**
 * Hook to fetch total transaction count from Hive API
 * Updates at the same interval as blockchain activity
 * Animates the count up smoothly when new data arrives
 */
export function useTransactionStats(
  options: TransactionStatsOptions,
): TransactionStatsResult {
  const { updateInterval, enabled } = options;

  const [displayedTransactions, setDisplayedTransactions] = useState(0);
  const [targetTransactions, setTargetTransactions] = useState(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const loadTransactionStats = () => {
    if (!enabled) return;

    fetchTransactionTotal().then(
      (total) => {
        // Set new target (will trigger animation in useEffect); the first
        // value is shown as is, without counting up from 0
        setTargetTransactions(total);
        setDisplayedTransactions((displayed) => (displayed === 0 ? total : displayed));
      },
      (err) => {
        console.error('Failed to fetch transaction statistics:', err);
        trackOnce('data_fallback', { fallback_source: 'transaction_stats' });
      }
    );
  };

  // Animate counting up to target
  useEffect(() => {
    if (targetTransactions === 0 || displayedTransactions === targetTransactions) {
      return;
    }

    const startValue = displayedTransactions;
    const endValue = targetTransactions;
    const duration = 2500; // 2.5 seconds for smooth counting
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut);
      setDisplayedTransactions(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayedTransactions(endValue);
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [targetTransactions, displayedTransactions]);

  // Fetch immediately on mount
  useEffect(() => {
    if (!enabled) return;

    loadTransactionStats();
  }, [enabled]);

  // Set up polling interval
  useEffect(() => {
    if (!enabled) return;

    intervalIdRef.current = setInterval(() => {
      loadTransactionStats();
    }, updateInterval);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [enabled, updateInterval]);

  return {
    displayedTransactions,
    isAnimating: targetTransactions !== 0 && displayedTransactions !== targetTransactions,
  };
}
