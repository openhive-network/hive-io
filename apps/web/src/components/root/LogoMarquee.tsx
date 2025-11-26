'use client';

import React, { useRef, useEffect, useState } from 'react';

interface LogoMarqueeProps {
  className?: string;
}

// Grid: 10 columns × 2 rows = 20 squares
// Size options: 4 (2×2), 2 (1×2 tall), 1 (1×1 small)
// Type: 'image' or 'text'
interface MarqueeImageItem {
  type: 'image';
  src: string;
  size: 4 | 2 | 1;
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
  { type: 'text', value: '10', label: 'HiveFests Held', size: 1 },
  { type: 'image', src: '/images/community/hivefest10_2.jpeg', size: 1 },
  { type: 'image', src: '/images/community/hivefest10.jpeg', size: 4 },
  { type: 'image', src: '/images/community/hivefest10_2.jpeg', size: 1 },
  { type: 'text', value: '1,200', label: 'Participants during HiveFest', size: 1 },
  { type: 'image', src: '/images/community/car.jpeg', size: 2 },
  { type: 'image', src: '/images/community/hivefest7_1.jpeg', size: 1 },
  { type: 'image', src: '/images/community/hivefest7_2.jpeg', size: 1 },
  { type: 'image', src: '/images/community/HIVE.jpeg', size: 4 },
  { type: 'image', src: '/images/community/hivefest10_2.jpeg', size: 1 },
  { type: 'text', value: '3', label: 'Continents hosting HiveFests', size: 1 },
  { type: 'image', src: '/images/community/hivefest10.jpeg', size: 2 },

];

// Unit size in pixels (350x263 aspect ratio)
const UNIT_WIDTH = 350;
const UNIT_HEIGHT = 263;
const GAP = 16;

interface MarqueeImageProps {
  src: string;
  size: 4 | 2 | 1;
}

const MarqueeImage: React.FC<MarqueeImageProps> = ({ src, size }) => {
  // Calculate dimensions based on size
  // 4 = 2×2 (2 cols, 2 rows)
  // 2 = 1×2 (1 col, 2 rows - tall)
  // 1 = 1×1 (1 col, 1 row - small)
  const width = size === 4 ? UNIT_WIDTH * 2 + GAP : UNIT_WIDTH;
  const height = size === 1 ? UNIT_HEIGHT : UNIT_HEIGHT * 2 + GAP;

  return (
    <div
      className="shrink-0 rounded-2xl overflow-hidden bg-gray-800"
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
    <span className="text-6xl font-bold text-[#e31337]">{value}</span>
    <span className="text-gray-400 text-sm mt-3">{label}</span>
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
    return <MarqueeImage src={item.src} size={item.size} />;
  };

  // Build columns from items - each column is 1 unit wide, 2 units tall
  // Tall images (size 2) take full column, small items (size 1) stack in pairs
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
