'use client';

import { useBlockchainActivity } from '@/hooks/useBlockchainActivity';
import { useCallback, useEffect, useRef, useState } from 'react';

// Calculate max activities based on screen dimensions
function calculateMaxActivities(): number {
  if (typeof window === 'undefined') return 4;

  const height = window.innerHeight;
  const width = window.innerWidth;

  const headerSpace = width < 600 ? 500 : 500;
  const availableHeight = height - headerSpace;
  const calculated = Math.floor(availableHeight / 90);

  return Math.max(4, Math.min(calculated, 6));
}

export function DynamicHero() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxActivities, setMaxActivities] = useState(() => calculateMaxActivities());

  const LIMIT_TOTAL_ACTIVITIES = 0; // Set to 0 to disable - stops accepting new activities after this many
  const ANIMATION_DELAY = 1800; // Delay between activity animations (ms)

  // Calculate maxActivities once on mount (no resize updates to avoid layout shifts)
  useEffect(() => {
    const calculated = calculateMaxActivities();
    setMaxActivities(calculated);
  }, []);

  const seenActivitiesRef = useRef<Set<string>>(new Set());
  const [shouldStopPolling, setShouldStopPolling] = useState(false);

  const { activities: hookActivities, currentBlock, transactionCount, reset: resetHook } = useBlockchainActivity({
    maxActivities,
    updateInterval: 3000,
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
  const [fadingOutIds, setFadingOutIds] = useState<Set<string>>(new Set());
  const [displayedActivities, setDisplayedActivities] = useState<typeof activities>([]);
  const displayedActivitiesRef = useRef(displayedActivities);
  displayedActivitiesRef.current = displayedActivities; // Always keep ref in sync
  const prevActivitiesRef = useRef<Set<string>>(new Set());
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
        const updated = new Set(arr.slice(-maxActivities));
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
  }, [maxActivities]);

  // Handle transition end for exit animations
  const handleTransitionEnd = useCallback((activityId: string, event: React.TransitionEvent) => {
    if (event.propertyName === 'opacity' && fadingOutIds.has(activityId)) {
      console.log('🚪 Exit complete:', activityId);
      // Remove from fading and displayed
      setFadingOutIds((prev) => {
        const next = new Set(prev);
        next.delete(activityId);
        return next;
      });
      setDisplayedActivities((prev) => prev.filter((a) => a.id !== activityId));
      setFinishedAnimatingIds((prev) => {
        const next = new Set(prev);
        next.delete(activityId);
        return next;
      });
    }
  }, [fadingOutIds]);

  // Observe visibility of the container (for scroll-based visibility)
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

  // Handle tab visibility changes - reset everything when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('🔄 Tab visible, resetting everything');
        // Reset local state
        setQueuedIds([]);
        setAnimatingIds(new Set());
        setFadingOutIds(new Set());
        setFinishedAnimatingIds(new Set());
        setDisplayedActivities([]);
        prevActivitiesRef.current = new Set();
        prevPositionsRef.current = new Map();
        // Reset the hook to start fresh
        resetHook();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [resetHook]);

  // Sync displayedActivities with activities from hook
  // New activities are added, removed activities are marked for fading
  useEffect(() => {
    const currentIds = new Set(activities.map((a) => a.id));
    const prevIds = prevActivitiesRef.current;

    // Find truly new IDs that weren't in the previous set
    const newIds = Array.from(currentIds).filter((id) => !prevIds.has(id));

    // Find IDs that are leaving (were in prev but not in current)
    const exitIds = Array.from(prevIds).filter((id) => !currentIds.has(id));

    if (exitIds.length > 0) {
      console.log('🚪 Exiting:', exitIds);
      // Mark these IDs for fading out - they stay in displayedActivities
      setFadingOutIds((prev) => new Set([...prev, ...exitIds]));
    }

    if (newIds.length > 0) {
      console.log('➕ Adding to queue:', newIds);
      setQueuedIds((prev) => [...prev, ...newIds]);

      // Add new activities to displayed list (at the front)
      const newActivities = activities.filter((a) => newIds.includes(a.id));
      setDisplayedActivities((prev) => [...newActivities, ...prev]);
    }

    // Update ref with current state
    prevActivitiesRef.current = currentIds;
  }, [activities]);

  // Start first animation when queue goes from empty to having items
  useEffect(() => {
    if (queuedIds.length > 0 && animatingIds.size === 0) {
      const firstId = queuedIds[0];
      console.log('🎬 Starting animation:', firstId);
      console.log('   Current displayedActivities:', displayedActivities.map(a => a.id.substring(0, 10)));
      console.log('   finishedAnimatingIds:', Array.from(finishedAnimatingIds).map(id => id.substring(0, 10)));
      setAnimatingIds(new Set([firstId]));
    }
  }, [queuedIds, animatingIds, displayedActivities, finishedAnimatingIds]);

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
      {/* Height: min 4 activities (360px) on mobile, up to 6 (540px) on desktop based on viewport */}
      <div
        ref={containerRef}
        className="w-full max-w-2xl relative mb-[50px] min-h-[360px] md:min-h-[min(540px,max(360px,calc(100vh-520px)))]"
      >

        <div className="relative">
          {displayedActivities.map((activity) => {
            const isAnimating = animatingIds.has(activity.id);
            const hasFinishedAnimating = finishedAnimatingIds.has(activity.id);
            const isFadingOut = fadingOutIds.has(activity.id);

            // Calculate position based on index in displayedActivities
            // Fading out items move to the bottom (maxActivities position)
            const currentIndex = displayedActivities.findIndex((a) => a.id === activity.id);
            const actualIndex = isAnimating ? 0 : currentIndex;
            const yPosition = actualIndex * 90; // 80px height + 10px gap

            // Set opacity and transform for animations
            const baseTransform = `translateY(${yPosition}px)`;

            // Determine style based on state
            // - Animating: use CSS animation (no inline transition)
            // - Fading out: opacity 0, same position animation
            // - Finished animating: opacity 1, position animation
            // - Not yet animated: hidden (opacity 0, offset)
            const style = isAnimating
              ? { '--y-pos': `${yPosition}px`, top: 0, left: 0, right: 0, transition: 'none' } as React.CSSProperties
              : hasFinishedAnimating || isFadingOut
                ? { opacity: isFadingOut ? 0 : 1, transform: baseTransform, top: 0, left: 0, right: 0 }
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
                isFadingOut,
                displayedArray: displayedActivities.map(a => a.id.substring(0, 10)),
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
                  <img
                    src={activity.avatarUrl || 'https://images.hive.blog/u/null/avatar/small'}
                    alt={activity.user || 'User'}
                    className="w-12 h-12 rounded-full shrink-0 bg-gray-300 object-cover ring-2 ring-white"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.hive.blog/u/null/avatar/small';
                    }}
                  />
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
