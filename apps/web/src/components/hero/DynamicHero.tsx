'use client';

import { useBlockchainActivity } from '@/hooks/useBlockchainActivity';
import { useCallback, useEffect, useRef, useState } from 'react';

export function DynamicHero() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxActivities = 4; // Change this to limit number of activities fetched
  const LIMIT_TOTAL_ACTIVITIES = 0; // Set to 0 to disable - stops accepting new activities after this many
  const ANIMATION_DELAY = 1800; // Delay between activity animations (ms)

  const seenActivitiesRef = useRef<Set<string>>(new Set());
  const [shouldStopPolling, setShouldStopPolling] = useState(false);

  const { activities: hookActivities, currentBlock, transactionCount } = useBlockchainActivity({
    maxActivities,
    enabled: true,
    animationDelay: ANIMATION_DELAY,
  });

  const activities = LIMIT_TOTAL_ACTIVITIES > 0
    ? hookActivities.filter(activity => {
      if (seenActivitiesRef.current.has(activity.id)) {
        return true; // Keep already seen activities
      }
      if (seenActivitiesRef.current.size < LIMIT_TOTAL_ACTIVITIES) {
        seenActivitiesRef.current.add(activity.id);
        // Stop polling once we've reached the limit
        if (seenActivitiesRef.current.size === LIMIT_TOTAL_ACTIVITIES) {
          setShouldStopPolling(true);
        }
        return true;
      }
      return false; // Reject new activities once limit reached
    })
    : hookActivities;

  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());
  const [finishedAnimatingIds, setFinishedAnimatingIds] = useState<Set<string>>(new Set());
  const [queuedIds, setQueuedIds] = useState<string[]>([]);
  const [exitingActivities, setExitingActivities] = useState<typeof activities>([]);
  const [fadingOutIds, setFadingOutIds] = useState<Set<string>>(new Set());
  const prevActivitiesRef = useRef<Set<string>>(new Set());
  const prevActivitiesArrayRef = useRef<typeof activities>([]);
  const prevPositionsRef = useRef<Map<string, number>>(new Map());

  // Handle animation completion
  const handleAnimationEnd = useCallback((activityId: string, event: React.AnimationEvent) => {
    if (event.animationName === 'fadeIn') {
      console.log('✅ Animation complete:', activityId.substring(0, 10));

      // Clear animating state
      setAnimatingIds(new Set());

      // Add to finished set (keep only last 5)
      setFinishedAnimatingIds((prev) => {
        const arr = [...prev, activityId];
        const updated = new Set(arr.slice(-5)); // Keep only last 5
        console.log('   Updated finishedAnimatingIds:', Array.from(updated).map(id => id.substring(0, 10)));
        return updated;
      });

      // Remove from queue (next animation will be started by the queue effect)
      setQueuedIds((prev) => {
        const remaining = prev.slice(1);
        console.log('   Queue remaining:', remaining.length);
        return remaining;
      });
    }
  }, []);

  // Handle transition end for exit animations
  const handleTransitionEnd = useCallback((activityId: string, event: React.TransitionEvent) => {
    if (event.propertyName === 'opacity') {
      // Check if this is an exiting activity
      setExitingActivities((prev) => {
        const isExiting = prev.some((a) => a.id === activityId);
        if (isExiting) {
          console.log('🚪 Exit complete:', activityId);
          // Remove from exiting, fading, and finished
          setFadingOutIds((prevFading) => {
            const next = new Set(prevFading);
            next.delete(activityId);
            return next;
          });
          setFinishedAnimatingIds((prevFinished) => {
            const next = new Set(prevFinished);
            next.delete(activityId);
            return next;
          });
          return prev.filter((a) => a.id !== activityId);
        }
        return prev;
      });
    }
  }, []);

  // Observe visibility of the container
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        const nowVisible = entry.isIntersecting;
        setIsVisible(nowVisible);

        // If becoming visible after being hidden, reset animation state
        if (!wasVisible && nowVisible) {
          console.log('🔄 Visibility restored, clearing queue');
          setQueuedIds([]);
          setAnimatingIds(new Set());
          setExitingActivities([]);
          // Mark all current activities as finished
          setFinishedAnimatingIds(new Set(activities.map((a) => a.id)));
        }
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
  }, [isVisible, activities]);

  // Handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('🔄 Tab visible, clearing queue');
        setQueuedIds([]);
        setAnimatingIds(new Set());
        setExitingActivities([]);
        setFinishedAnimatingIds(new Set(activities.map((a) => a.id)));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [activities]);

  // Detect new activities and mark them for animation
  useEffect(() => {
    const currentIds = new Set(activities.map((a) => a.id));
    const prevIds = prevActivitiesRef.current;

    // Find truly new IDs that weren't in the previous set
    const newIds = Array.from(currentIds).filter((id) => !prevIds.has(id));

    // Find IDs that are leaving (were in prev but not in current)
    const exitIds = Array.from(prevIds).filter((id) => !currentIds.has(id));

    if (exitIds.length > 0) {
      console.log('🚪 Exiting:', exitIds);
      // Get exiting activities from previous activities array (not current!)
      const exitingActsList = prevActivitiesArrayRef.current.filter((a) => exitIds.includes(a.id));
      setExitingActivities(exitingActsList);

      // Trigger fade out after a tick to ensure transition happens
      requestAnimationFrame(() => {
        setFadingOutIds(new Set(exitIds));
      });
    }

    if (newIds.length > 0) {
      console.log('➕ Adding to queue:', newIds);
      setQueuedIds((prev) => [...prev, ...newIds]);
    }

    // Update refs with current state
    prevActivitiesRef.current = currentIds;
    prevActivitiesArrayRef.current = activities;
  }, [activities]);

  // Start first animation when queue goes from empty to having items
  useEffect(() => {
    if (queuedIds.length > 0 && animatingIds.size === 0) {
      const firstId = queuedIds[0];
      console.log('🎬 Starting animation:', firstId);
      console.log('   Current activities:', activities.map(a => a.id.substring(0, 10)));
      console.log('   finishedAnimatingIds:', Array.from(finishedAnimatingIds).map(id => id.substring(0, 10)));
      setAnimatingIds(new Set([firstId]));
    }
  }, [queuedIds, animatingIds, activities, finishedAnimatingIds]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl max-[600px]:px-1 mx-auto px-4">
      {/* Main Headlines */}
      <div className="text-center mt-8">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-1 max-[600px]:text-5xl max-[600px]:mb-2">
          Fast & Scalable<span className="text-[#e31337]">.</span>
        </h1>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 max-[600px]:text-2xl">
          Web3 Becomes Reality
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mt-8 mb-16 max-w-[600px] mx-auto max-[600px]:text-base max-[600px]:mb-10">
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

        <div className="relative" style={{ minHeight: `${maxActivities * 100}px` }}>
          {[...exitingActivities, ...activities].map((activity, index) => {
            const isAnimating = animatingIds.has(activity.id);
            const hasFinishedAnimating = finishedAnimatingIds.has(activity.id);
            const isExiting = exitingActivities.some((a) => a.id === activity.id);

            // Calculate position - animating items stay at top, exiting items keep their last position
            const actualIndex = isAnimating
              ? 0  // Always position animating items at top
              : isExiting
                ? prevPositionsRef.current.get(activity.id) !== undefined
                  ? prevPositionsRef.current.get(activity.id)! / 90
                  : activities.length
                : activities.findIndex((a) => a.id === activity.id);
            const yPosition = actualIndex * 90; // 80px height + 10px gap

            // Set opacity and transform for animations
            const baseTransform = `translateY(${yPosition}px)`;
            const isFadingOut = fadingOutIds.has(activity.id);

            const style = isAnimating
              ? { '--y-pos': `${yPosition}px`, top: 0, left: 0, right: 0, transition: 'none' } as React.CSSProperties
              : isExiting
                ? { opacity: isFadingOut ? 0 : 1, transform: baseTransform, top: 0, left: 0, right: 0 }
                : hasFinishedAnimating
                  ? { opacity: 1, transform: baseTransform, top: 0, left: 0, right: 0 }
                  : { opacity: 0, transform: `${baseTransform} translateX(50px)`, top: 0, left: 0, right: 0 };

            // Log position changes
            const prevPosition = prevPositionsRef.current.get(activity.id);
            if (prevPosition !== yPosition) {
              console.log(`📐 ${activity.id.substring(0, 10)}:`, {
                prevPos: prevPosition ?? 'new',
                newPos: yPosition,
                actualIndex,
                isAnimating,
                hasFinishedAnimating,
                isExiting,
                activitiesArray: activities.map(a => a.id.substring(0, 10)),
                transform: isAnimating ? `var(--y-pos: ${yPosition}px)` : style.transform
              });
              prevPositionsRef.current.set(activity.id, yPosition);
            }

            return (
              <div
                key={activity.id}
                style={style}
                className={`absolute bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-5 py-4 transition-all duration-400 ${isAnimating ? 'animate-fade-in' : ''}`}
                onAnimationEnd={(e) => handleAnimationEnd(activity.id, e)}
                onTransitionEnd={(e) => handleTransitionEnd(activity.id, e)}
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
