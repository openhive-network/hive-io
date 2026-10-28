'use client';

import { useEffect, useState } from 'react';
import { hiveRpc } from '@hiveio/hive-lib';
import { trackOnce } from '@/lib/analytics';

interface UseTotalAccountsResult {
  totalAccounts: number;
  isLoading: boolean;
  error: string | null;
}

export function useTotalAccounts(): UseTotalAccountsResult {
  const [totalAccounts, setTotalAccounts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalAccounts = async () => {
      try {
        const count = await hiveRpc<number>(
          'condenser_api.get_account_count',
          [],
        );
        setTotalAccounts(count);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching total accounts:', err);
        trackOnce('data_fallback', { fallback_source: 'total_accounts' });
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsLoading(false);
      }
    };

    fetchTotalAccounts();
  }, []);

  return { totalAccounts, isLoading, error };
}
