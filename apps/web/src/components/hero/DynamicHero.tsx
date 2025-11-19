'use client';

import { useBlockchainActivity } from '@/hooks/useBlockchainActivity';
import { formatTimeAgo } from '@hiveio/hive-lib';
import { useCallback, useEffect, useRef, useState } from 'react';

export function DynamicHero() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxActivities = 4;
  const { activities, currentBlock, transactionCount } = useBlockchainActivity({
    maxActivities,
    enabled: isVisible
  });

  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());
  const [finishedAnimatingIds, setFinishedAnimatingIds] = useState<Set<string>>(new Set());
  const [queuedIds, setQueuedIds] = useState<string[]>([]);
  const [exitingIds, setExitingIds] = useState<Set<string>>(new Set());
  const prevActivitiesRef = useRef<Set<string>>(new Set());

  // Handle animation completion
  const handleAnimationEnd = useCallback((activityId: string, event: React.AnimationEvent) => {
    if (event.animationName === 'fadeIn') {
      console.log('✅ Animation complete:', activityId);

      // Clear animating state
      setAnimatingIds(new Set());

      // Add to finished set
      setFinishedAnimatingIds((prev) => new Set([...prev, activityId]));

      // Remove from queue (next animation will be started by the queue effect)
      setQueuedIds((prev) => {
        const remaining = prev.slice(1);
        console.log('📋 Queue remaining:', remaining.length);
        return remaining;
      });
    }
  }, []);

  // Observe visibility of the container
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when at least 10% is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Detect new activities and mark them for animation
  useEffect(() => {
    const currentIds = new Set(activities.map((a) => a.id));
    const prevIds = prevActivitiesRef.current;

    // Find truly new IDs that weren't in the previous set
    const newIds = Array.from(currentIds).filter((id) => !prevIds.has(id));

    // Update previous activities reference first
    prevActivitiesRef.current = currentIds;

    if (newIds.length > 0) {
      console.log('➕ Adding to queue:', newIds);
      setQueuedIds((prev) => [...prev, ...newIds]);
    }
  }, [activities]);

  // Start first animation when queue goes from empty to having items
  useEffect(() => {
    if (queuedIds.length > 0 && animatingIds.size === 0) {
      const firstId = queuedIds[0];
      console.log('🎬 Starting animation:', firstId);
      setAnimatingIds(new Set([firstId]));
    }
  }, [queuedIds, animatingIds]);

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
        <p className="text-lg md:text-xl text-gray-600 mt-8 mb-16 max-w-[600px] mx-auto max-[600px]:text-base max-[600px]:mb-16">
          Built by the community, for the community. Experience the power of Hive, the
          decentralized blockchain that puts you in control.
        </p>
      </div>

      {/* Live Block Number - Subtle */}
      <div className="relative mb-6 max-[600px]:mb-4 w-full max-w-2xl">
        <div className="flex items-center justify-between">
          {/* Live Indicator - Left side */}
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e31337] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e31337]"></span>
            </div>
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Live</span>
          </div>

          {/* Block Number - Right side */}
          <div className="flex items-center gap-2">
            <a
              href={`https://hivehub.dev/b/${currentBlock}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl font-bold tabular-nums max-[600px]:text-lg text-[#e31337]"
            >
              {currentBlock.toLocaleString()}
            </a>
            <span className="text-base md:text-lg text-gray-400 max-[600px]:text-sm min-w-[80px] tabular-nums">
              • {transactionCount} txs
            </span>
          </div>
        </div>
      </div>

      {/* Live Activities Feed */}
      <div ref={containerRef} className="w-full max-w-2xl h-[360px] mb-[70px] relative">

        <div className="space-y-2.5">
          {activities.map((activity) => {
            const isAnimating = animatingIds.has(activity.id);
            const hasFinishedAnimating = finishedAnimatingIds.has(activity.id);
            // Only set opacity if not currently animating
            const opacity = isAnimating ? undefined : (hasFinishedAnimating ? 1 : 0);
            return (
              <div
                key={activity.id}
                style={{ opacity }}
                className={`bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-5 py-4 ${isAnimating ? 'animate-fade-in' : ''}`}
                onAnimationEnd={(e) => handleAnimationEnd(activity.id, e)}
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
      </div>
    </div>
  );
}
