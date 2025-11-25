'use client';

import React from 'react';

interface TokenDonutChartProps {
  total: number;
  locked: number;
  size?: number;
  primaryColor: string;
  secondaryColor: string;
  label?: string;
}

export const TokenDonutChart: React.FC<TokenDonutChartProps> = ({
  total,
  locked,
  size = 160,
  primaryColor,
  secondaryColor,
  label,
}) => {
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const innerRadius = radius - strokeWidth / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const lockedPercentage = total > 0 ? (locked / total) * 100 : 0;
  const lockedOffset = circumference - (lockedPercentage / 100) * circumference;

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
          </defs>

          {/* Filled center circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={innerRadius}
            fill={`url(#gradient-${label})`}
          />

          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={secondaryColor}
            strokeWidth={strokeWidth}
            className="opacity-20"
          />

          {/* Progress arc (locked portion) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={primaryColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={lockedOffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out drop-shadow-lg"
            style={{
              filter: `drop-shadow(0 0 8px ${primaryColor}40)`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">
            {lockedPercentage.toFixed(0)}%
          </span>
          <span className="text-sm text-gray-400 font-medium">{label || 'Locked'}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: primaryColor }}
          />
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">{label || 'Locked'}</span>
            <span className="text-white font-semibold">{formatNumber(locked)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full opacity-30"
            style={{ backgroundColor: secondaryColor }}
          />
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Liquid</span>
            <span className="text-white font-semibold">{formatNumber(total - locked)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
