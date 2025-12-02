'use client';

import React, { forwardRef, useCallback } from 'react';
import { TokenDonutChart } from '@/components/charts/TokenDonutChart';

interface TokenFeature {
  icon: React.ReactNode;
  text: React.ReactNode;
}

interface TokenCardProps {
  name: string;
  subtitle: string;
  iconSrc: string;
  color: string;
  colorRgb: string; // For shadow: "227,19,55" or "16,185,129"
  features: TokenFeature[];
  totalSupply: number;
  lockedAmount: number;
  chartLabel: string;
  onBuyHover?: (rect: DOMRect) => void;
  buyUrl?: string; // If provided, opens this URL in new tab instead of scrolling to exchanges
}

export const TokenCard = forwardRef<HTMLDivElement, TokenCardProps>(
  (
    {
      name,
      subtitle,
      iconSrc,
      color,
      colorRgb,
      features,
      totalSupply,
      lockedAmount,
      chartLabel,
      onBuyHover,
      buyUrl,
    },
    ref
  ) => {
    // Only trigger particle effect on desktop (hover-capable devices)
    const handleBuyHover = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (onBuyHover && window.matchMedia('(hover: hover)').matches) {
        const rect = e.currentTarget.getBoundingClientRect();
        onBuyHover(rect);
      }
    }, [onBuyHover]);

    return (
      <div
        ref={ref}
        className="group relative rounded-3xl p-5 sm:p-10 overflow-hidden transition-all duration-500"
        style={{
          background: `linear-gradient(to bottom right, ${color}1a, ${color}0d)`,
          border: `1px solid ${color}4d`,
        }}
        onMouseOver={(e) => {
          const target = e.currentTarget;
          target.style.borderColor = `${color}80`;
          target.style.boxShadow = `0 0 60px -15px rgba(${colorRgb},0.3)`;
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget;
          target.style.borderColor = `${color}4d`;
          target.style.boxShadow = 'none';
        }}
      >
        {/* Animated background glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to top, ${color}1a, transparent, transparent)`,
          }}
        />

        <div className="relative flex flex-col md:flex-row gap-8">
          {/* Left side - Token info */}
          <div className="flex-1">
            {/* Token icon and name */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative flex-shrink-0">
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"
                  style={{ backgroundColor: color }}
                />
                <img
                  src={iconSrc}
                  alt={name}
                  className="relative w-20 h-20 min-w-20 min-h-20 drop-shadow-lg object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-6">
                  <h3 className="text-4xl font-bold text-white">{name}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (buyUrl) {
                        window.open(buyUrl, '_blank', 'noopener,noreferrer');
                      } else {
                        document.getElementById('exchanges')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    onMouseEnter={handleBuyHover}
                    className="px-4 py-1.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:brightness-125 cursor-pointer"
                    style={{
                      backgroundColor: `rgba(${colorRgb}, 0.2)`,
                      border: `1px solid ${color}`,
                      color: color,
                    }}
                  >
                    Buy
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ color }}
                  >
                    {subtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Visual attributes */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 min-w-10 min-h-10 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${color}33` }}
                  >
                    <div style={{ color }}>{feature.icon}</div>
                  </div>
                  <span className="text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Donut chart */}
          {totalSupply > 0 && (
            <div className="flex flex-col items-center justify-center md:items-end">
              <TokenDonutChart
                total={totalSupply}
                locked={lockedAmount}
                primaryColor={color}
                secondaryColor={color}
                label={chartLabel}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

TokenCard.displayName = 'TokenCard';
