'use client';

import React from 'react';
import {ExplorerLink} from '@/components/ui/explorer-link'
import {Skeleton} from '@/components/ui/skeleton'

interface TokenDonutChartProps {
  total: number;
  locked: number | null // null until live locked amounts load
  // loading: pulsing placeholder, failed: link to the chain explorer
  status: 'loading' | 'ready' | 'failed'
  size?: number;
  primaryColor: string;
  secondaryColor: string;
  label?: string;
}

// Fixed-height legend value: skeleton while loading, empty on failure
function LegendValue({
  isReady,
  status,
  children,
}: {
  isReady: boolean
  status: 'loading' | 'ready' | 'failed'
  children: React.ReactNode
}) {
  return (
    <span className="block h-5 text-white font-semibold">
      {isReady ? (
        children
      ) : status === 'loading' ? (
        <Skeleton className="mt-0.5 h-4 w-10 bg-gray-800" />
      ) : null}
    </span>
  )
}

export const TokenDonutChart: React.FC<TokenDonutChartProps> = ({
  total,
  locked,
  status,
  size = 160,
  primaryColor,
  secondaryColor,
  label,
}) => {
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const innerRadius = radius - strokeWidth / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const isReady = status === 'ready' && locked != null
  const lockedPercentage =
    locked != null && total > 0 ? (locked / total) * 100 : 0
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
          {/* Filled center circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={innerRadius}
            fill={primaryColor}
            fillOpacity={0.04}
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
          <div className="flex h-9 items-center">
            {isReady ? (
              <span className="text-3xl font-bold text-white">
                {`${lockedPercentage.toFixed(0)}%`}
              </span>
            ) : status === 'failed' ? (
              <ExplorerLink
                className="text-sm font-semibold"
                style={{color: primaryColor}}>
                View on chain
              </ExplorerLink>
            ) : (
              <Skeleton className="h-8 w-16 bg-gray-800" />
            )}
          </div>
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
            <LegendValue isReady={isReady} status={status}>
              {locked != null ? formatNumber(locked) : ''}
            </LegendValue>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full opacity-30"
            style={{ backgroundColor: secondaryColor }}
          />
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Liquid</span>
            <LegendValue isReady={isReady} status={status}>
              {locked != null ? formatNumber(total - locked) : ''}
            </LegendValue>
          </div>
        </div>
      </div>
    </div>
  );
};
