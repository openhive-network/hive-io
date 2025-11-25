'use client';

import React from 'react';
import { useTotalAccounts } from '@/hooks/useTotalAccounts';

interface LogoMarqueeProps {
  className?: string;
}

// Placeholder community images - replace with actual Hive community photos
const COMMUNITY_IMAGES = [
  '/images/community/hive-meetup-1.jpg',
  '/images/community/hive-meetup-2.jpg',
  '/images/community/hive-meetup-3.jpg',
  '/images/community/hive-meetup-4.jpg',
  '/images/community/hive-meetup-5.jpg',
  '/images/community/hive-meetup-6.jpg',
];

interface MarqueeItemProps {
  src: string;
  alt: string;
  tall?: boolean;
}

const MarqueeImage: React.FC<MarqueeItemProps> = ({ src, alt, tall }) => (
  <div
    className={`shrink-0 rounded-2xl overflow-hidden bg-gray-800 ${tall ? 'w-[280px] h-[420px]' : 'w-[280px] h-[202px]'
      }`}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
);

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
  <div className="shrink-0 w-[280px] h-[202px] rounded-2xl bg-gray-900 p-6 flex flex-col justify-center">
    <span className="text-4xl md:text-5xl font-bold text-[#e31337]">
      {value}
    </span>
    <span className="text-gray-400 text-sm mt-2">{label}</span>
  </div>
);

// A column that contains either 1 tall item or 2 stacked small items
interface MarqueeColumnProps {
  children: React.ReactNode;
}

const MarqueeColumn: React.FC<MarqueeColumnProps> = ({ children }) => (
  <div className="shrink-0 flex flex-col gap-4">
    {children}
  </div>
);

export const LogoMarquee: React.FC<LogoMarqueeProps> = ({ className }) => {
  const { totalAccounts } = useTotalAccounts();

  const formatNumber = (num: number) => {
    if (num === 0) return '---';
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return num.toLocaleString();
    return num.toString();
  };

  // Tetris-like columns: either 1 tall image OR 2 stacked small items
  const renderColumns = (keyPrefix: string) => (
    <>
      {/* Column 1: Tall image */}
      <MarqueeColumn>
        <MarqueeImage src={COMMUNITY_IMAGES[0]} alt="Hive community" tall />
      </MarqueeColumn>

      {/* Column 2: Two stacked small images */}
      <MarqueeColumn>
        <MarqueeImage src={COMMUNITY_IMAGES[1]} alt="Hive community" />
        <MarqueeImage src={COMMUNITY_IMAGES[2]} alt="Hive community" />
      </MarqueeColumn>

      {/* Column 3: Tall image */}
      <MarqueeColumn>
        <MarqueeImage src={COMMUNITY_IMAGES[3]} alt="Hive community" tall />
      </MarqueeColumn>

      {/* Column 4: Stat + small image stacked */}
      <MarqueeColumn>
        <StatCard value={formatNumber(10)} label="Total HiveFests" />
        <MarqueeImage src={COMMUNITY_IMAGES[4]} alt="Hive community" />
      </MarqueeColumn>

      {/* Column 5: Tall image */}
      <MarqueeColumn>
        <MarqueeImage src={COMMUNITY_IMAGES[5]} alt="Hive community" tall />
      </MarqueeColumn>

      {/* Column 6: Two stacked small images */}
      <MarqueeColumn>
        <MarqueeImage src={COMMUNITY_IMAGES[0]} alt="Hive community" />
        <MarqueeImage src={COMMUNITY_IMAGES[3]} alt="Hive community" />
      </MarqueeColumn>
    </>
  );

  return (
    <div className={`w-full bg-gradient-to-b from-gray-900 to-black py-24 px-10 overflow-hidden ${className || ''}`}>
      <div className="max-w-screen-2xl mx-auto mb-16">
        <h2 className="text-5xl md:text-6xl font-bold text-white text-center">
          Join a Thriving Community<span className="text-[#e31337]">.</span>
        </h2>
      </div>

      {/* Animated Marquee */}
      <div className="relative h-[420px]">
        <div className="flex gap-4 animate-marquee hover:paused">
          {renderColumns('first')}
          {renderColumns('second')}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};
