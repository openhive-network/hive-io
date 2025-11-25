'use client';

import { useEffect, useState } from 'react';

interface AccountDetails {
  id: number;
  name: string;
  recovery_account: string;
  created: string;
  post_count: number;
  reputation: number;
  json_metadata: string;
  posting_json_metadata: string;
}

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
        // Step 1: Get the last account name
        const accountsResponse = await fetch('https://rpc.mahdiyari.info/hafsql/accounts?limit=-1');
        if (!accountsResponse.ok) {
          throw new Error('Failed to fetch accounts list');
        }
        const accountNames: string[] = await accountsResponse.json();

        if (!accountNames || accountNames.length === 0) {
          throw new Error('No accounts returned');
        }

        // The last account name in the list
        const lastAccountName = accountNames[accountNames.length - 1];

        // Step 2: Get the account details to retrieve the ID (which is the total count)
        const detailsResponse = await fetch(
          `https://rpc.mahdiyari.info/hafsql/accounts/by-names?names=${lastAccountName}`
        );
        if (!detailsResponse.ok) {
          throw new Error('Failed to fetch account details');
        }
        const accountDetails: AccountDetails[] = await detailsResponse.json();

        if (!accountDetails || accountDetails.length === 0) {
          throw new Error('No account details returned');
        }

        // The ID of the last account represents the total number of accounts
        setTotalAccounts(accountDetails[0].id);
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
