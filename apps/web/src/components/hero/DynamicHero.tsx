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
  const [isHoveringFeed, setIsHoveringFeed] = useState(false);

  const { activities: hookActivities, currentBlock, transactionCount } = useBlockchainActivity({
    maxActivities,
    updateInterval: 3000,
    enabled: true,
    paused: isHoveringFeed,
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
  const [hoveredActivityId, setHoveredActivityId] = useState<string | null>(null);
  const hoveredActivityIdRef = useRef<string | null>(null);
  hoveredActivityIdRef.current = hoveredActivityId; // Keep ref in sync for callbacks
  const [isTabHidden, setIsTabHidden] = useState(false);
  const isTabHiddenRef = useRef(false);
  isTabHiddenRef.current = isTabHidden; // Keep ref in sync for callbacks
  const displayedActivitiesRef = useRef(displayedActivities);
  displayedActivitiesRef.current = displayedActivities; // Always keep ref in sync
  const prevPositionsRef = useRef<Map<string, number>>(new Map());
  const lastAnimationEndRef = useRef<number>(0);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle animation completion
  const handleAnimationEnd = useCallback((activityId: string, event: React.AnimationEvent) => {
    if (event.animationName === 'fadeIn') {
      console.log('✅ Animation complete:', activityId.substring(0, 10));

      // Record when animation ended for cooldown calculation
      lastAnimationEndRef.current = Date.now();

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

      // If user was hovering this activity while it was animating, pause now
      if (hoveredActivityIdRef.current === activityId) {
        console.log('⏸️ Pausing after animation complete (was hovered)');
        setIsHoveringFeed(true);
      }

      // If tab was hidden while animating, pause now
      if (isTabHiddenRef.current) {
        console.log('⏸️ Pausing after animation complete (tab hidden)');
        setIsHoveringFeed(true);
      }
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

  // Handle tab visibility changes - pause when hidden, resume when visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log('👁️ Tab hidden, pausing');
        setIsTabHidden(true);
        // If no animation is currently running, pause immediately
        if (animatingIds.size === 0) {
          setIsHoveringFeed(true);
        }
        // If animation is running, it will pause after completion (handled in handleAnimationEnd)
      } else if (document.visibilityState === 'visible') {
        console.log('👁️ Tab visible, resuming');
        setIsTabHidden(false);
        // Clear hover state - user is no longer hovering after returning from another tab
        // This is especially important on mobile where touch "hover" gets stuck
        setHoveredActivityId(null);
        setIsHoveringFeed(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [animatingIds.size]);

  // Cleanup cooldown timer on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  // Handle activities leaving (fading out)
  // Only exit when we're over capacity and no animation is in progress
  useEffect(() => {
    // Don't exit while an animation is running
    if (animatingIds.size > 0) return;

    // Count non-fading activities
    const activeCount = displayedActivities.filter(a => !fadingOutIds.has(a.id)).length;

    // Only exit if we're over max capacity
    if (activeCount > maxActivities) {
      // Exit the last (oldest) non-fading activity
      const nonFadingActivities = displayedActivities.filter(a => !fadingOutIds.has(a.id));
      const oldestActivity = nonFadingActivities[nonFadingActivities.length - 1];

      if (oldestActivity) {
        console.log('🚪 Exiting oldest:', oldestActivity.id.substring(0, 10));
        setFadingOutIds((prev) => new Set([...prev, oldestActivity.id]));
      }
    }
  }, [displayedActivities, fadingOutIds, animatingIds, maxActivities]);

  // Start animation when queue has items, or pick up pending activities when queue is empty
  useEffect(() => {
    // Clear any existing cooldown timer when effect runs
    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = null;
    }

    if (queuedIds.length > 0 && animatingIds.size === 0) {
      // Queue has an item ready - start its animation
      const firstId = queuedIds[0];
      console.log('🎬 Starting animation:', firstId);
      console.log('   Current displayedActivities:', displayedActivities.map(a => a.id.substring(0, 10)));
      console.log('   finishedAnimatingIds:', Array.from(finishedAnimatingIds).map(id => id.substring(0, 10)));
      setAnimatingIds(new Set([firstId]));
    } else if (queuedIds.length === 0 && animatingIds.size === 0 && !isHoveringFeed) {
      // Queue is empty and no animation running - check for pending activities
      const displayedIds = new Set(displayedActivities.map(a => a.id));
      const pendingActivities = activities.filter(a => !displayedIds.has(a.id));

      if (pendingActivities.length > 0) {
        // Check cooldown: wait 1300ms after animation ends (500ms CSS + 1300ms = 1800ms total)
        const CSS_ANIMATION_DURATION = 500;
        const cooldownNeeded = ANIMATION_DELAY - CSS_ANIMATION_DURATION; // 1300ms
        const timeSinceLastAnimation = Date.now() - lastAnimationEndRef.current;

        if (lastAnimationEndRef.current > 0 && timeSinceLastAnimation < cooldownNeeded) {
          // Not enough time passed - schedule a re-check
          const remainingCooldown = cooldownNeeded - timeSinceLastAnimation;
          console.log(`⏳ Cooldown: waiting ${remainingCooldown}ms before next animation`);
          cooldownTimerRef.current = setTimeout(() => {
            // Force re-render to trigger this effect again
            setQueuedIds(prev => [...prev]);
          }, remainingCooldown);
          return;
        }

        // Cooldown complete - queue the first pending activity
        const nextActivity = pendingActivities[0];
        console.log('➕ Picking up pending activity:', nextActivity.id.substring(0, 10));
        setQueuedIds([nextActivity.id]);
        setDisplayedActivities(prev => [nextActivity, ...prev]);
      }
    }
  }, [queuedIds, animatingIds, displayedActivities, finishedAnimatingIds, activities, isHoveringFeed]);

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
        onMouseLeave={() => setIsHoveringFeed(false)}
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

            // Activities are clickable if they have a txId AND are not hardcoded defaults
            // Hardcoded defaults have IDs starting with "default-"
            const isClickable = !!activity.txId && !activity.id.startsWith('default-');

            // For posts, comments, and votes, link to peakd; otherwise link to hivehub transaction
            let activityUrl: string | undefined;
            if (isClickable) {
              if ((activity.type === 'post' || activity.type === 'comment' || activity.type === 'vote') && activity.author && activity.permlink) {
                activityUrl = `https://peakd.com/@${activity.author}/${activity.permlink}`;
              } else {
                activityUrl = `https://hivehub.dev/tx/${activity.txId}`;
              }
            }

            const cardContent = (
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
                  <span className="text-xs text-gray-400 group-hover:text-[#e31337] font-mono shrink-0 transition-colors">
                    {activity.txId.substring(0, 4)}...{activity.txId.substring(activity.txId.length - 4)}
                  </span>
                )}
              </div>
            );

            const animationClass = isAnimating && !isHoveringFeed ? 'animate-fade-in' : '';
            const pausedClass = isHoveringFeed ? 'animation-paused' : '';

            // Track hovered activity - pause immediately if not animating,
            // otherwise pause will trigger when animation completes
            const handleCardMouseEnter = () => {
              // Don't allow pausing on fading out activities
              if (isFadingOut) return;

              setHoveredActivityId(activity.id);
              if (!isAnimating) {
                setIsHoveringFeed(true);
              }
              // If animating, pause will be triggered in handleAnimationEnd
            };

            const handleCardMouseLeave = () => {
              setHoveredActivityId(null);
            };

            return isClickable ? (
              <a
                key={activity.id}
                href={activityUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={style}
                className={`group absolute bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-5 py-4 transition-all duration-400 hover:bg-white/90 hover:border-gray-300 cursor-pointer ${animationClass} ${pausedClass}`}
                onAnimationEnd={(e) => handleAnimationEnd(activity.id, e)}
                onTransitionEnd={(e) => handleTransitionEnd(activity.id, e)}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >
                {cardContent}
              </a>
            ) : (
              <div
                key={activity.id}
                style={style}
                className={`group absolute bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-5 py-4 transition-all duration-400 ${animationClass} ${pausedClass}`}
                onAnimationEnd={(e) => handleAnimationEnd(activity.id, e)}
                onTransitionEnd={(e) => handleTransitionEnd(activity.id, e)}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
