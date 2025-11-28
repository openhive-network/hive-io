'use client';

import React, { useRef, useEffect, useState } from 'react';

interface LogoMarqueeProps {
  className?: string;
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

// Define images and text items with their grid sizes
const MARQUEE_ITEMS: MarqueeItem[] = [
  { type: 'image', src: '/images/community/hivefest_crimsonclad.png', size: 1 },
  { type: 'image', src: '/images/community/hivefest10_2.jpeg', size: 1, credit: 'louis88' },
  { type: 'image', src: '/images/community/hivefest9_1.webp', size: 4, credit: 'bil.prag' },
  { type: 'image', src: '/images/community/hivefest_mexico3.png', size: 1, credit: 'manuphotos' },
  { type: 'text', value: '1,200', label: 'Participants over 10 HiveFests', size: 1 },
  { type: 'image', src: '/images/community/hivefest10_1.png', size: 2, credit: 'louis88' },
  { type: 'image', src: '/images/community/hive_car1.jpeg', size: 1, credit: 'rubencress' },
  { type: 'image', src: '/images/community/hivefest10_3.jpeg', size: 1, credit: 'louis88' },
  { type: 'image', src: '/images/community/hivefest_mexico2.webp', size: 4, credit: 'manuphotos' },
  { type: 'text', value: '10', label: 'Years of Hive Events', size: 1 },
  { type: 'image', src: '/images/community/hivefest7_2.jpeg', size: 1 },
  { type: 'image', src: '/images/community/african_community.webp', size: 'wide' },
  { type: 'image', src: '/images/community/blockchainsummit_1.png', size: 1 },
  { type: 'image', src: '/images/community/latinevent_1.jpeg', size: 1 },
  { type: 'image', src: '/images/community/hivefest6_2.jpeg', size: 2, credit: 'celestal' },

];

// Unit size in pixels (350x263 aspect ratio)
const UNIT_WIDTH = 350;
const UNIT_HEIGHT = 263;
const GAP = 16;

interface MarqueeImageProps {
  src: string;
  size: 4 | 2 | 'wide' | 1;
  credit?: string;
}

const MarqueeImage: React.FC<MarqueeImageProps> = ({ src, size, credit }) => {
  // Calculate dimensions based on size
  // 4 = 2×2 (2 cols, 2 rows)
  // 2 = 1×2 (1 col, 2 rows - tall)
  // 'wide' = 2×1 (2 cols, 1 row - horizontal)
  // 1 = 1×1 (1 col, 1 row - small)
  const width = (size === 4 || size === 'wide') ? UNIT_WIDTH * 2 + GAP : UNIT_WIDTH;
  const height = (size === 1 || size === 'wide') ? UNIT_HEIGHT : UNIT_HEIGHT * 2 + GAP;

  return (
    <div
      className="shrink-0 rounded-2xl overflow-hidden bg-gray-800 relative"
      style={{ width, height, minWidth: width, minHeight: height }}
    >
      <img
        src={src}
        alt="Hive community"
        width={width}
        height={height}
        className="w-full h-full object-cover"
        loading="eager"
      />
      {credit && (
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
}

const MarqueeTextCard: React.FC<MarqueeTextCardProps> = ({ value, label }) => (
  <div
    className="shrink-0 rounded-2xl bg-gray-800 p-6 flex flex-col items-center justify-center text-center"
    style={{ width: UNIT_WIDTH, height: UNIT_HEIGHT, minWidth: UNIT_WIDTH, minHeight: UNIT_HEIGHT }}
  >
    <span className="text-8xl font-bold text-[#e31337]">{value}</span>
    <span className="text-gray-400 text-base mt-3">{label}</span>
  </div>
);

// A column that contains items stacked vertically
const MarqueeColumn: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="shrink-0 flex flex-col gap-4">
    {children}
  </div>
);

export const LogoMarquee: React.FC<LogoMarqueeProps> = ({ className }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  // Measure the width of one content set for seamless animation
  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, []);

  // Render a single item based on its type
  const renderItem = (item: MarqueeItem) => {
    if (item.type === 'text') {
      return <MarqueeTextCard value={item.value} label={item.label} />;
    }
    return <MarqueeImage src={item.src} size={item.size} credit={item.credit} />;
  };

  // Build columns from items - each column is 1 unit wide, 2 units tall
  // Tall images (size 2) take full column, small items (size 1) stack in pairs
  // Wide items ('wide') are 2 cols × 1 row and can stack vertically
  const buildColumns = () => {
    const columns: React.ReactNode[] = [];
    let i = 0;

    while (i < MARQUEE_ITEMS.length) {
      const item = MARQUEE_ITEMS[i];

      if (item.type === 'image' && item.size === 2) {
        // Tall image takes full column
        columns.push(
          <MarqueeColumn key={i}>
            {renderItem(item)}
          </MarqueeColumn>
        );
        i++;
      } else if (item.type === 'image' && item.size === 'wide') {
        // Wide image (2×1) - try to pair with another wide item or two 1×1 items
        const nextItem = MARQUEE_ITEMS[i + 1];
        const nextNextItem = MARQUEE_ITEMS[i + 2];
        if (nextItem && nextItem.type === 'image' && nextItem.size === 'wide') {
          // Pair with another wide item
          columns.push(
            <MarqueeColumn key={i}>
              {renderItem(item)}
              {renderItem(nextItem)}
            </MarqueeColumn>
          );
          i += 2;
        } else if (nextItem && nextItem.size === 1 && nextNextItem && nextNextItem.size === 1) {
          // Pair with two 1×1 items side by side below
          columns.push(
            <MarqueeColumn key={i}>
              {renderItem(item)}
              <div className="flex gap-4">
                {renderItem(nextItem)}
                {renderItem(nextNextItem)}
              </div>
            </MarqueeColumn>
          );
          i += 3;
        } else {
          // Single wide item in column
          columns.push(
            <MarqueeColumn key={i}>
              {renderItem(item)}
            </MarqueeColumn>
          );
          i++;
        }
      } else if (item.size === 1) {
        // Try to pair two small items (image or text)
        const nextItem = MARQUEE_ITEMS[i + 1];
        if (nextItem && nextItem.size === 1) {
          columns.push(
            <MarqueeColumn key={i}>
              {renderItem(item)}
              {renderItem(nextItem)}
            </MarqueeColumn>
          );
          i += 2;
        } else {
          // Single small item in column
          columns.push(
            <MarqueeColumn key={i}>
              {renderItem(item)}
            </MarqueeColumn>
          );
          i++;
        }
      } else if (item.type === 'image' && item.size === 4) {
        // 2×2 image spans 2 columns worth of width
        columns.push(
          <MarqueeColumn key={i}>
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
    <div className={`w-full bg-gradient-to-b from-gray-900 to-black py-24 overflow-hidden ${className || ''}`}>
      <div className="max-w-screen-2xl mx-auto mb-16">
        <h2 className="text-5xl md:text-6xl font-bold text-white text-center">
          Join a Thriving Community<span className="text-[#e31337]">.</span>
        </h2>
      </div>

      {/* Animated Marquee - full width, shows ~half of one set at a time */}
      <div className="relative overflow-hidden" style={{ height: UNIT_HEIGHT * 2 + GAP }}>
        <div
          className="flex"
          style={{
            animation: contentWidth ? `marquee ${80}s linear infinite` : 'none',
            ['--content-width' as string]: `${contentWidth}px`,
          }}
        >
          <div ref={contentRef} className="flex gap-4 shrink-0 pr-4">
            {columns}
          </div>
          <div className="flex gap-4 shrink-0 pr-4">
            {columns}
          </div>
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
