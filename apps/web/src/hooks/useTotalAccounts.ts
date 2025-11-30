'use client';

import { useEffect, useState } from 'react';
import { getHiveChainExtended } from '@hiveio/hive-lib';

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
        const chain = await getHiveChainExtended();
        const count = await chain.api.condenser_api.get_account_count([]);
        setTotalAccounts(count);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching total accounts:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsLoading(false);
      }
    };

    fetchTotalAccounts();
  }, []);

  return { totalAccounts, isLoading, error };
}
