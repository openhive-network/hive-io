'use client';

import { useBlockchainActivity } from '@/hooks/useBlockchainActivity';
import { formatTimeAgo } from '@hiveio/hive-lib';
import { useEffect, useRef, useState } from 'react';

export function DynamicHero() {
  const { activities, currentBlock, transactionCount } = useBlockchainActivity({
    maxActivities: 4
  });

  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());
  const prevActivitiesRef = useRef<Set<string>>(new Set());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect new activities and mark them for animation
  useEffect(() => {
    const currentIds = new Set(activities.map((a) => a.id));
    const prevIds = prevActivitiesRef.current;

    // Find truly new IDs that weren't in the previous set
    const newIds = Array.from(currentIds).filter((id) => !prevIds.has(id));

    if (newIds.length > 0) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Add new IDs to animating set
      setAnimatingIds(new Set(newIds));

      // Remove animation class after animation completes (300ms)
      timeoutRef.current = setTimeout(() => {
        setAnimatingIds(new Set());
      }, 300);
    }

    // Update previous activities reference
    prevActivitiesRef.current = currentIds;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activities]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4">
      {/* Main Headlines */}
      <div className="text-center mt-8">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-1 max-[600px]:text-5xl max-[600px]:mb-2">
          Fast & Scalable<span className="text-[#e31337]">.</span>
        </h1>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 max-[600px]:text-2xl">
          Web3 Becomes Reality
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mt-8 mb-16 max-w-xl mx-auto max-[600px]:text-base max-[600px]:mb-16">
          Built by the community, for the community. Experience the power of Hive, the
          decentralized blockchain that puts you in control.
        </p>
      </div>

      {/* Live Block Number - Subtle */}
      <div className="relative mb-6 max-[600px]:mb-4 w-full max-w-2xl">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 text-center">
          Current Block
        </div>
        <div className="flex items-end justify-between">
          {/* Live Indicator - Left side, aligned to bottom */}
          <div className="flex items-center gap-2 pb-0.5">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e31337] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e31337]"></span>
            </div>
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Live</span>
          </div>

          {/* Block Number - Center */}
          <div className="flex items-center gap-2">
            <a
              href={`https://hivehub.dev/b/${currentBlock}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl md:text-3xl font-bold tabular-nums max-[600px]:text-xl"
            >
              <span className="text-gray-400">#</span>
              <span className="text-[#e31337]">{currentBlock.toLocaleString()}</span>
            </a>
            <span className="text-lg md:text-xl text-gray-400 max-[600px]:text-base">
              • {transactionCount} txs
            </span>
          </div>

          {/* Empty space for balance */}
          <div className="w-[60px]"></div>
        </div>
      </div>

      {/* Live Activities Feed */}
      <div className="w-full max-w-2xl h-[480px]">

        {activities.length > 0 && (
          <div className="space-y-3">
            {activities.map((activity, index) => {
              const isAnimating = animatingIds.has(activity.id);
              const isFadingOut = index >= 4;
              return (
                <div
                  key={activity.id}
                  className={`bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-5 py-4 hover:bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-500 ${isAnimating ? 'animate-slide-in-right' : ''
                    } ${isFadingOut ? 'opacity-0 translate-y-2 h-0 overflow-hidden' : 'opacity-100 translate-y-0'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    {activity.avatarUrl ? (
                      <img
                        src={activity.avatarUrl}
                        alt={activity.user || 'User'}
                        className="w-12 h-12 rounded-full flex-shrink-0 bg-gray-200 object-cover ring-2 ring-white"
                      />
                    ) : (
                      <span className="text-2xl flex-shrink-0">{activity.icon}</span>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${activity.color} truncate`}>
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimeAgo(activity.timestamp)}
                      </p>
                    </div>
                    {activity.txId && (
                      <a
                        href={`https://hivehub.dev/tx/${activity.txId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-400 hover:text-[#e31337] font-mono shrink-0 transition-colors"
                      >
                        {activity.txId.substring(0, 4)}...{activity.txId.substring(activity.txId.length - 4)}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
