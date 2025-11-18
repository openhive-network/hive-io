'use client';

import React, { useEffect, useState } from 'react';
import { getHiveChain } from '@hiveio/hive-lib';

interface BlockData {
  blockNumber: number;
  timestamp: string;
}

export const BlockObserver: React.FC = () => {
  const [latestBlock, setLatestBlock] = useState<BlockData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let intervalId: NodeJS.Timeout;
    let previousBlockNumber = 0;

    const initBlockObserver = async () => {
      try {
        // Get Hive chain instance from hive-lib
        const hive = await getHiveChain();

        const fetchLatestBlock = async () => {
          try {
            // Get dynamic global properties from Hive blockchain
            const props = await hive.api.database_api.get_dynamic_global_properties({});

            if (props && props.head_block_number) {
              const newBlockNumber = props.head_block_number;

              // Only trigger animation if block number changed
              if (previousBlockNumber > 0 && newBlockNumber > previousBlockNumber) {
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 500);
              }

              previousBlockNumber = newBlockNumber;

              setLatestBlock({
                blockNumber: newBlockNumber,
                timestamp: new Date(props.time + 'Z').toLocaleTimeString(),
              });
            }
          } catch (error) {
            console.error('Failed to fetch block data:', error);
          }
        };

        // Fetch immediately
        await fetchLatestBlock();

        // Poll every 3 seconds (Hive blocks are produced every ~3 seconds)
        intervalId = setInterval(fetchLatestBlock, 3000);
      } catch (error) {
        console.error('Failed to initialize hive chain:', error);
      }
    };

    initBlockObserver();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isMounted]);

  // Don't render anything until mounted on client and we have block data
  if (!isMounted || !latestBlock) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 max-[600px]:bottom-4 max-[600px]:right-4">
      <div
        className={`
          bg-white border-2 border-[#e31337] rounded-lg shadow-lg px-4 py-3
          transition-all duration-500 ease-out
          ${isAnimating ? 'scale-110 shadow-xl' : 'scale-100'}
          max-[600px]:px-3 max-[600px]:py-2
        `}
      >
        <div className="flex items-center gap-3 max-[600px]:gap-2">
          {/* Animated block icon */}
          <div className="relative">
            <div
              className={`
                w-3 h-3 bg-[#e31337] rounded-full
                transition-all duration-300
                ${isAnimating ? 'animate-ping' : ''}
              `}
            />
            <div className="absolute inset-0 w-3 h-3 bg-[#e31337] rounded-full" />
          </div>

          {/* Block info */}
          <div className="flex flex-col">
            <div className="text-xs text-gray-500 leading-tight">Latest Block</div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#212529] tabular-nums">
                #{latestBlock.blockNumber.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400 max-[600px]:hidden">
                {latestBlock.timestamp}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
