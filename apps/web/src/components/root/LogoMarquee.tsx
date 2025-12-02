'use client';

import React, { useRef, useEffect, useState } from 'react';

interface LogoMarqueeProps {
  className?: string;
  compact?: boolean; // Less height, no padding, no animation
  showTitle?: boolean;
}

// Grid: 10 columns × 2 rows = 20 squares
// Size options: 4 (2×2), 2 (1×2 tall), 'wide' (2×1 horizontal), 1 (1×1 small)
// Type: 'image' or 'text'
interface MarqueeImageItem {
  type: 'image';
  src: string;
  size: 4 | 2 | 'wide' | 1;
  credit?: string;
}

interface MarqueeTextItem {
  type: 'text';
  value: string;
  label: string;
  size: 1; // Text items are always 1×1
}

type MarqueeItem = MarqueeImageItem | MarqueeTextItem;

// Define images and text items with their grid sizes (for homepage marquee)
const MARQUEE_ITEMS: MarqueeItem[] = [
  { type: 'image', src: '/images/community/hivefest_crimsonclad.png', size: 1, credit: 'crimsonclad' },
  { type: 'image', src: '/images/community/hivefest10_2.jpeg', size: 1, credit: 'louis88' },
  { type: 'image', src: '/images/community/hivefest9_1.webp', size: 4, credit: 'bil.prag' },
  { type: 'image', src: '/images/community/hivefest_mexico3.png', size: 1, credit: 'manuphotos' },
  { type: 'text', value: '1,200', label: 'Participants over 10 HiveFests', size: 1 },
  { type: 'image', src: '/images/community/hivefest10_1.png', size: 2, credit: 'louis88' },
  { type: 'image', src: '/images/community/hive_car1.jpeg', size: 1, credit: 'rubencress' },
  { type: 'image', src: '/images/community/hivefest10_3.jpeg', size: 1, credit: 'louis88' },
  { type: 'image', src: '/images/community/hivefest_mexico2.webp', size: 4, credit: 'manuphotos' },
  { type: 'text', value: '10', label: 'Years of Hive Events', size: 1 },
  { type: 'image', src: '/images/community/hivefest7_2.jpeg', size: 1, credit: 'rubencress' },
  { type: 'image', src: '/images/community/african_community.webp', size: 'wide', credit: 'hivecreators' },
  { type: 'image', src: '/images/community/blockchainsummit_1.png', size: 1, credit: 'hivecreators' },
  { type: 'image', src: '/images/community/latinevent_1.jpeg', size: 1, credit: 'hivecreators' },
  { type: 'image', src: '/images/community/hivefest6_2.jpeg', size: 2, credit: 'celestal' },
];

// Images for compact mode (join page) - reorder as needed
const COMPACT_ITEMS: MarqueeImageItem[] = [
  { type: 'image', src: '/images/community/hivefest10_1.png', size: 2, credit: 'louis88' },
  { type: 'image', src: '/images/community/hivefest10_2.jpeg', size: 1, credit: 'louis88' },
  { type: 'image', src: '/images/community/hivefest_mexico2.webp', size: 4, credit: 'manuphotos' },
  { type: 'image', src: '/images/community/latinevent_1.jpeg', size: 1, credit: 'hivecreators' },
  { type: 'image', src: '/images/community/hivefest9_1.webp', size: 4, credit: 'bil.prag' },
  { type: 'image', src: '/images/community/hive_car1.jpeg', size: 1, credit: 'rubencress' },
  { type: 'image', src: '/images/community/african_community.webp', size: 'wide', credit: 'hivecreators' },
  { type: 'image', src: '/images/community/blockchainsummit_1.png', size: 1, credit: 'hivecreators' },
  { type: 'image', src: '/images/community/hivefest_crimsonclad.png', size: 1, credit: 'crimsonclad' },
  { type: 'image', src: '/images/community/hivefest6_2.jpeg', size: 2, credit: 'celestal' },
  { type: 'image', src: '/images/community/hivefest10_3.jpeg', size: 1, credit: 'louis88' },


];

// Unit size in pixels (350x263 aspect ratio)
const UNIT_WIDTH = 350;
const UNIT_HEIGHT = 263;
const GAP = 16;

// Compact dimensions (scaled down ~45% of original)
const COMPACT_SCALE = 0.45;
const COMPACT_UNIT_WIDTH = Math.round(UNIT_WIDTH * COMPACT_SCALE);
const COMPACT_UNIT_HEIGHT = Math.round(UNIT_HEIGHT * COMPACT_SCALE);
const COMPACT_GAP = 0;

interface MarqueeImageProps {
  src: string;
  size: 4 | 2 | 'wide' | 1;
  credit?: string;
  compact?: boolean;
}

const MarqueeImage: React.FC<MarqueeImageProps> = ({ src, size, credit, compact = false }) => {
  const unitW = compact ? COMPACT_UNIT_WIDTH : UNIT_WIDTH;
  const unitH = compact ? COMPACT_UNIT_HEIGHT : UNIT_HEIGHT;
  const gap = compact ? COMPACT_GAP : GAP;

  // Calculate dimensions based on size
  // 4 = 2×2 (2 cols, 2 rows)
  // 2 = 1×2 (1 col, 2 rows - tall)
  // 'wide' = 2×1 (2 cols, 1 row - horizontal)
  // 1 = 1×1 (1 col, 1 row - small)
  const width = (size === 4 || size === 'wide') ? unitW * 2 + gap : unitW;
  const height = (size === 1 || size === 'wide') ? unitH : unitH * 2 + gap;

  return (
    <div
      className={`shrink-0 overflow-hidden bg-gray-800 relative ${compact ? '' : 'rounded-2xl'}`}
      style={{ width, height, minWidth: width, minHeight: height }}
    >
      <img
        src={src}
        alt="Hive community"
        width={width}
        height={height}
        className="w-full h-full object-cover object-center"
        loading="eager"
      />
      {credit && !compact && (
        <span className="absolute bottom-2 right-2 text-[10px] text-white/60">
          © {credit}
        </span>
      )}
    </div>
  );
};

interface MarqueeTextCardProps {
  value: string;
  label: string;
  compact?: boolean;
}

const MarqueeTextCard: React.FC<MarqueeTextCardProps> = ({ value, label, compact = false }) => {
  const unitW = compact ? COMPACT_UNIT_WIDTH : UNIT_WIDTH;
  const unitH = compact ? COMPACT_UNIT_HEIGHT : UNIT_HEIGHT;

  return (
    <div
      className={`shrink-0 bg-gray-800 flex flex-col items-center justify-center text-center ${compact ? 'rounded-lg p-2' : 'rounded-2xl p-6'}`}
      style={{ width: unitW, height: unitH, minWidth: unitW, minHeight: unitH }}
    >
      <span className={`font-bold text-[#e31337] ${compact ? 'text-2xl' : 'text-8xl'}`}>{value}</span>
      <span className={`text-gray-400 ${compact ? 'text-[10px] mt-1' : 'text-base mt-3'}`}>{label}</span>
    </div>
  );
};

// A column that contains items stacked vertically
const MarqueeColumn: React.FC<{ children: React.ReactNode; compact?: boolean }> = ({ children, compact = false }) => (
  <div className={`shrink-0 flex flex-col ${compact ? 'gap-2 justify-center' : 'gap-4'}`}>
    {children}
  </div>
);

export const LogoMarquee: React.FC<LogoMarqueeProps> = ({ className, compact = false, showTitle = true }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  // Measure the width of one content set for seamless animation
  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, []);

  // Compact mode uses smaller dimensions
  const unitH = compact ? COMPACT_UNIT_HEIGHT : UNIT_HEIGHT;
  const gap = compact ? COMPACT_GAP : GAP;
  // For compact mode, reduce container height by 55% (multiply by 0.45) to crop/clip the content
  const fullContentHeight = unitH * 2 + gap;
  const totalHeight = compact ? Math.round(fullContentHeight * 0.45) : UNIT_HEIGHT * 2 + GAP;

  // Render a single item based on its type
  const renderItem = (item: MarqueeItem) => {
    if (item.type === 'text') {
      // Skip text items in compact mode
      if (compact) return null;
      return <MarqueeTextCard value={item.value} label={item.label} compact={compact} />;
    }
    return <MarqueeImage src={item.src} size={item.size} credit={item.credit} compact={compact} />;
  };

  const getItems = () => {
    if (compact) {
      return COMPACT_ITEMS;
    }
    return MARQUEE_ITEMS;
  };

  // Build columns from items - each column is 1 unit wide, 2 units tall
  // Tall images (size 2) take full column, small items (size 1) stack in pairs
  // Wide items ('wide') are 2 cols × 1 row and can stack vertically
  const buildColumns = () => {
    const items = getItems();
    const columns: React.ReactNode[] = [];
    let i = 0;

    while (i < items.length) {
      const item = items[i];

      if (item.type === 'image' && item.size === 2) {
        // Tall image takes full column
        columns.push(
          <MarqueeColumn key={i} compact={compact}>
            {renderItem(item)}
          </MarqueeColumn>
        );
        i++;
      } else if (item.type === 'image' && item.size === 'wide') {
        if (compact) {
          // In compact mode, render wide image alone (centered)
          columns.push(
            <MarqueeColumn key={i} compact={compact}>
              {renderItem(item)}
            </MarqueeColumn>
          );
          i++;
        } else {
          // Wide image (2×1) - try to pair with another wide item or two 1×1 items
          const nextItem = items[i + 1];
          const nextNextItem = items[i + 2];
          if (nextItem && nextItem.type === 'image' && nextItem.size === 'wide') {
            // Pair with another wide item
            columns.push(
              <MarqueeColumn key={i} compact={compact}>
                {renderItem(item)}
                {renderItem(nextItem)}
              </MarqueeColumn>
            );
            i += 2;
          } else if (nextItem && nextItem.size === 1 && nextNextItem && nextNextItem.size === 1) {
            // Pair with two 1×1 items side by side below
            columns.push(
              <MarqueeColumn key={i} compact={compact}>
                {renderItem(item)}
                <div className={`flex ${compact ? 'gap-2' : 'gap-4'}`}>
                  {renderItem(nextItem)}
                  {renderItem(nextNextItem)}
                </div>
              </MarqueeColumn>
            );
            i += 3;
          } else {
            // Single wide item in column
            columns.push(
              <MarqueeColumn key={i} compact={compact}>
                {renderItem(item)}
              </MarqueeColumn>
            );
            i++;
          }
        }
      } else if (item.size === 1) {
        if (compact) {
          // In compact mode, render single items (no stacking)
          columns.push(
            <MarqueeColumn key={i} compact={compact}>
              {renderItem(item)}
            </MarqueeColumn>
          );
          i++;
        } else {
          // Try to pair two small items (image or text)
          const nextItem = items[i + 1];
          if (nextItem && nextItem.size === 1) {
            columns.push(
              <MarqueeColumn key={i} compact={compact}>
                {renderItem(item)}
                {renderItem(nextItem)}
              </MarqueeColumn>
            );
            i += 2;
          } else {
            // Single small item in column
            columns.push(
              <MarqueeColumn key={i} compact={compact}>
                {renderItem(item)}
              </MarqueeColumn>
            );
            i++;
          }
        }
      } else if (item.type === 'image' && item.size === 4) {
        // 2×2 image spans 2 columns worth of width
        columns.push(
          <MarqueeColumn key={i} compact={compact}>
            {renderItem(item)}
          </MarqueeColumn>
        );
        i++;
      }
    }

    return columns;
  };

  const columns = buildColumns();

  return (
    <div className={`w-full bg-gradient-to-b from-gray-900 to-black ${compact ? 'py-0' : 'py-12 sm:py-24'} overflow-hidden ${className || ''}`}>
      {showTitle && (
        <div className="max-w-screen-2xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
            Join a Thriving Community<span className="text-[#e31337]">.</span>
          </h2>
        </div>
      )}

      {/* Animated Marquee - full width, shows ~half of one set at a time */}
      <div className={`relative overflow-hidden ${compact ? 'flex items-center' : 'max-h-[280px] sm:max-h-none'}`} style={{ height: compact ? totalHeight : undefined }}>
        {/* Dark overlay for compact mode */}
        {compact && <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />}
        <div
          className={`flex ${compact ? 'justify-center w-full' : 'origin-top-left scale-[0.5] sm:scale-100'}`}
          style={{
            animation: !compact && contentWidth ? `marquee ${80}s linear infinite` : 'none',
            ['--content-width' as string]: `${contentWidth}px`,
          }}
        >
          <div ref={contentRef} className={`flex ${compact ? 'gap-2' : 'gap-4'} shrink-0 ${compact ? 'pr-2' : 'pr-4'}`}>
            {compact && columns}
            {columns}
            {compact && columns}
          </div>
          {!compact && (
            <div className="flex gap-4 shrink-0 pr-4">
              {columns}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(var(--content-width) * -1));
          }
        }
      `}</style>
    </div>
  );
};
