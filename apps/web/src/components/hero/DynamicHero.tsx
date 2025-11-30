'use client';

import { useBlockchainActivity } from '@/hooks/useBlockchainActivity';
import { useTotalAccounts } from '@/hooks/useTotalAccounts';
import { useTransactionStats } from '@/hooks/useTransactionStats';
import { Link } from '@/i18n/routing';
import { useMainStore } from '@/store/useMainStore';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { DynamicGlobalProperties } from '@hiveio/hive-lib';

interface TVLData {
  totalUSD: number;
  hivePrice: number;
  hbdPrice: number;
}

interface DynamicHeroProps {
  onNewBlock?: (blockNum: number, witness: string) => void;
  onGlobalProps?: (props: DynamicGlobalProperties) => void;
  onHiveFundBalance?: (balance: { hiveBalance: number; hbdBalance: number }) => void;
  tvl?: TVLData | null;
}

// Rotating slogans for the hero
const SLOGANS = [
  'Blockchain for the people.',
  'Empowering communities.',
  'Your Entrance to Crypto.',
  'Digital Freedom.'
];

// Calculate max activities based on screen dimensions
function calculateMaxActivities(): number {
  if (typeof window === 'undefined') return 4;

  const height = window.innerHeight;
  const width = window.innerWidth;

  const headerSpace = width < 600 ? 500 : 500;
  const availableHeight = height - headerSpace;
  const calculated = Math.floor(availableHeight / 90);

  return Math.max(4, Math.min(calculated, 4));
}

export function DynamicHero({ onNewBlock, onGlobalProps, onHiveFundBalance, tvl }: DynamicHeroProps) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxActivities, setMaxActivities] = useState(() => calculateMaxActivities());
  const isMobileMenuOpen = useMainStore(state => state.isMobileActive);

  const LIMIT_TOTAL_ACTIVITIES = 0; // Set to 0 to disable - stops accepting new activities after this many
  const ANIMATION_DELAY = 1300; // Delay between activity animations (ms)

  // Typewriter animation state
  const [sloganIndex, setSloganIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'deleting'>('typing');

  // Typewriter animation effect
  useEffect(() => {
    const currentSlogan = SLOGANS[sloganIndex];
    const typingSpeed = 50; // ms per character when typing
    const deletingSpeed = 30; // ms per character when deleting
    const waitTime = 2000; // ms to wait before deleting

    let timeout: NodeJS.Timeout;

    if (phase === 'typing') {
      if (displayedText.length < currentSlogan.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentSlogan.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, wait before deleting
        timeout = setTimeout(() => {
          setPhase('deleting');
        }, waitTime);
      }
    } else if (phase === 'deleting') {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next slogan
        setSloganIndex((prev) => (prev + 1) % SLOGANS.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, phase, sloganIndex]);

  // Calculate maxActivities once on mount (no resize updates to avoid layout shifts)
  useEffect(() => {
    const calculated = calculateMaxActivities();
    setMaxActivities(calculated);
  }, []);

  const seenActivitiesRef = useRef<Set<string>>(new Set());
  const [shouldStopPolling, setShouldStopPolling] = useState(false);
  const [isHoveringFeed, setIsHoveringFeed] = useState(false);

  const { activities: hookActivities, currentBlock, globalProps, hiveFundBalance } = useBlockchainActivity({
    maxActivities,
    updateInterval: 3000,
    enabled: true,
    paused: isHoveringFeed || isMobileMenuOpen || !isVisible,
    onNewBlock,
  });

  // Pass global props to parent when updated
  useEffect(() => {
    if (globalProps && onGlobalProps) {
      onGlobalProps(globalProps);
    }
  }, [globalProps, onGlobalProps]);

  // Pass hive.fund balance to parent when updated
  useEffect(() => {
    if (hiveFundBalance && onHiveFundBalance) {
      onHiveFundBalance(hiveFundBalance);
    }
  }, [hiveFundBalance, onHiveFundBalance]);

  // Fetch transaction statistics
  const { displayedTransactions } = useTransactionStats({
    updateInterval: 3000,
    enabled: true,
  });

  // Fetch total accounts (runs once on mount)
  const { totalAccounts } = useTotalAccounts();

  // Parse supply values from global props (format: "123.456 HIVE" or {amount, nai, precision})
  const parseSupply = (supply: unknown): number => {
    if (!supply) return 0;
    if (typeof supply === 'string') {
      return parseFloat(supply.split(' ')[0]) || 0;
    }
    if (typeof supply === 'object' && supply !== null && 'amount' in supply) {
      const obj = supply as { amount: string; precision?: number };
      const amount = parseInt(obj.amount, 10);
      const precision = obj.precision ?? 3;
      return amount / Math.pow(10, precision);
    }
    return 0;
  };

  // Calculate market cap (HIVE + HBD combined)
  const hiveSupply = parseSupply(globalProps?.current_supply) - (hiveFundBalance?.hiveBalance ?? 0);
  const hbdSupply = parseSupply(globalProps?.current_hbd_supply) - (hiveFundBalance?.hbdBalance ?? 0);
  const marketCap = tvl ? (hiveSupply * tvl.hivePrice) + (hbdSupply * tvl.hbdPrice) : 0;

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
  const lastAnimationEndRef = useRef<number>(0);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle animation completion
  const handleAnimationEnd = useCallback((activityId: string, event: React.AnimationEvent) => {
    if (event.animationName === 'fadeIn') {
      // Record when animation ended for cooldown calculation
      lastAnimationEndRef.current = Date.now();

      // Clear animating state
      setAnimatingIds(new Set());

      // Add to finished set (keep only last 5)
      setFinishedAnimatingIds((prev) => {
        const arr = [...prev, activityId];
        return new Set(arr.slice(-maxActivities));
      });

      // Remove from queue (next animation will be started by the queue effect)
      setQueuedIds((prev) => prev.slice(1));

      // If user was hovering this activity while it was animating, pause now
      if (hoveredActivityIdRef.current === activityId) {
        setIsHoveringFeed(true);
      }

      // If tab was hidden while animating, pause now
      if (isTabHiddenRef.current) {
        setIsHoveringFeed(true);
      }
    }
  }, [maxActivities]);

  // Handle transition end for exit animations
  const handleTransitionEnd = useCallback((activityId: string, event: React.TransitionEvent) => {
    if (event.propertyName === 'opacity' && fadingOutIds.has(activityId)) {
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
        setIsTabHidden(true);
        // If no animation is currently running, pause immediately
        if (animatingIds.size === 0) {
          setIsHoveringFeed(true);
        }
        // If animation is running, it will pause after completion (handled in handleAnimationEnd)
      } else if (document.visibilityState === 'visible') {
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
      setAnimatingIds(new Set([firstId]));
    } else if (queuedIds.length === 0 && animatingIds.size === 0 && !isHoveringFeed && !isMobileMenuOpen && isVisible) {
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
          cooldownTimerRef.current = setTimeout(() => {
            // Force re-render to trigger this effect again
            setQueuedIds(prev => [...prev]);
          }, remainingCooldown);
          return;
        }

        // Cooldown complete - queue the first pending activity
        const nextActivity = pendingActivities[0];
        setQueuedIds([nextActivity.id]);
        setDisplayedActivities(prev => [nextActivity, ...prev]);
      }
    }
  }, [queuedIds, animatingIds, displayedActivities, finishedAnimatingIds, activities, isHoveringFeed, isMobileMenuOpen, isVisible]);

  return (
    <div className="w-full max-w-screen-2xl max-[600px]:px-6 mx-auto px-10 ">
      {/* Two column layout */}
      <div className="flex flex-col xl:flex-row items-center xl:items-center justify-center pb-10 gap-8 xl:gap-12 2xl:gap-28">
        {/* Main Headlines - Left side on desktop */}
        <div className="text-center xl:text-left mt-8 xl:mt-0 xl:flex-1 2xl:flex-none">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-1 max-[600px]:text-5xl max-[600px]:mb-2">
            Fast <span className="text-[#e31337]">&</span> Scalable<span className="text-[#e31337]">.</span>
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 max-[600px]:text-2xl h-[1.2em] whitespace-nowrap max-[600px]:w-[280px] max-[600px]:mx-auto w-[450px] md:w-[550px] lg:w-[680px]">
            {displayedText}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mt-8 mb-8 max-w-[650px] max-[600px]:text-base max-[600px]:mb-6 text-justify md:text-left">
            Hive is a decentralized, scalable, high-speed blockchain with zero fees and near-instant transactions—powering social apps, games, and financial tools built for everyone.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4 max-[600px]:mb-8 xl:mt-12">
            <a
              href="https://developers.hive.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 w-[220px] max-[600px]:w-[180px] py-4 bg-gray-800 text-white font-semibold rounded-full overflow-hidden text-lg max-[600px]:text-base max-[600px]:py-3"
            >
              <span className="absolute inset-0 bg-[#e31337] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <span className="relative">Start Building</span>
              <span className="relative text-2xl transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="https://peakd.com/trending"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[220px] max-[600px]:w-[180px] py-4 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200 text-lg max-[600px]:text-base max-[600px]:py-3 text-center"
            >
              Explore
            </a>
          </div>
        </div>

        {/* Live Feed - Right side on desktop */}
        <div className="w-full xl:w-[450px] xl:shrink-0 xl:mt-8">

          {/* Live Activities Feed */}
          {/* Height: min 4 activities (360px) on mobile, up to 6 (540px) on desktop based on viewport */}
          <div
            ref={containerRef}
            className="w-full relative mb-[50px] bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-gray-300 rounded-3xl p-6 max-[600px]:bg-transparent max-[600px]:backdrop-blur-none max-[600px]:shadow-none max-[600px]:border-none max-[600px]:p-0"
            onMouseLeave={() => setIsHoveringFeed(false)}
          >
            {/* Title and Live Indicator */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-black max-[600px]:text-gray-900">Blockchain Activity</h3>
                {currentBlock > 0 ? (
                  <a
                    href={`https://hivehub.dev/b/${currentBlock}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-gray-400 max-[600px]:text-gray-600 hover:text-[#e31337] transition-colors"
                  >
                    #{currentBlock.toLocaleString()}
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-gray-300 max-[600px]:text-gray-500">---</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
                </div>
                <span className="text-sm font-semibold text-[#22c55e] uppercase tracking-wide">Live</span>
              </div>
            </div>

            <div className="relative min-h-[360px]">
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

                // Extract action text by removing username prefix from message
                const actionText = activity.user && activity.message.startsWith(activity.user)
                  ? activity.message.slice(activity.user.length).trim()
                  : activity.message;

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
                    <div className="flex-1 min-w-0 flex flex-col">
                      <span className="text-sm font-bold text-gray-900 truncate">
                        {activity.user || 'Unknown'}
                      </span>
                      <span className={`text-sm ${activity.color} truncate`}>
                        {actionText}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {activity.txId && (
                        <span className="text-xs text-gray-400 group-hover:text-[#e31337] font-mono transition-colors">
                          {activity.txId.substring(0, 4)}...{activity.txId.substring(activity.txId.length - 4)}
                        </span>
                      )}
                      <span className="text-sm text-gray-400 group-hover:text-[#e31337] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </div>
                  </div>
                );

                const isPaused = isHoveringFeed || isMobileMenuOpen || !isVisible;
                const animationClass = isAnimating && !isPaused ? 'animate-fade-in' : '';
                const pausedClass = isPaused ? 'animation-paused' : '';

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
                    className={`group absolute bg-white max-[600px]:bg-white backdrop-blur-sm border border-gray-200 rounded-xl px-5 py-4 transition-all duration-400 hover:bg-white/90 hover:border-gray-300 cursor-pointer ${animationClass} ${pausedClass}`}
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
                    className={`group absolute bg-white max-[600px]:bg-white backdrop-blur-sm border border-gray-200 rounded-xl px-5 py-4 transition-all duration-400 ${animationClass} ${pausedClass}`}
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
      </div>

      {/* Stats Bar - Full width below both columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-between gap-6 lg:gap-12 pt-8 max-[600px]:pt-4 border-t border-gray-200 mt-12 max-[600px]:mt-2 mb-12 max-[600px]:mb-10">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <svg className="w-5 h-5 max-[600px]:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <span className="font-medium">Transactions</span>
          </div>
          <div className={`text-4xl max-[600px]:text-2xl lg:w-[255px] font-bold ${displayedTransactions > 0 ? 'text-gray-900' : 'text-gray-300'}`}>
            {displayedTransactions > 0 ? displayedTransactions.toLocaleString() : '---'}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <svg className="w-5 h-5 max-[600px]:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="font-medium">Market Cap</span>
          </div>
          <div className={`text-4xl max-[600px]:text-2xl font-bold ${marketCap > 0 ? 'text-gray-900' : 'text-gray-300'}`}>
            {marketCap > 0 ? `$${(marketCap / 1_000_000).toFixed(2)}M` : '---'}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <svg className="w-5 h-5 max-[600px]:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">TVL</span>
          </div>
          <div className={`text-4xl max-[600px]:text-2xl font-bold ${tvl ? 'text-gray-900' : 'text-gray-300'}`}>
            {tvl ? `$${(tvl.totalUSD / 1_000_000).toFixed(2)}M` : '---'}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <svg className="w-5 h-5 max-[600px]:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-medium">Accounts</span>
          </div>
          <div className={`text-4xl max-[600px]:text-2xl font-bold ${totalAccounts > 0 ? 'text-gray-900' : 'text-gray-300'}`}>
            {totalAccounts > 0 ? `${parseFloat((totalAccounts / 1_000_000).toFixed(2))}M` : '---'}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <svg className="w-5 h-5 max-[600px]:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Uptime (Days)</span>
          </div>
          <div className="text-4xl max-[600px]:text-2xl font-bold text-gray-900">
            {Math.floor((Date.now() - new Date('2016-03-24T16:00:00Z').getTime()) / (1000 * 60 * 60 * 24)).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
