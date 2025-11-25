'use client';

import React, { useImperativeHandle, forwardRef } from 'react';
import { useBlockProducers } from '@/hooks/useBlockProducers';

const WITNESS_COUNT = 10;

interface RootDPoSProps extends React.HTMLAttributes<HTMLDivElement> { }

export interface RootDPoSHandle {
  addBlock: (blockNum: number, producer: string) => void;
}

export const RootDPoS = forwardRef<RootDPoSHandle, RootDPoSProps>(({ className, ...props }, ref) => {
  // Fetch initial block producers once - no polling needed
  const { producers, latestProducer, isLoading, addBlock } = useBlockProducers({
    initialCount: WITNESS_COUNT,
    enabled: true,
  });

  // Expose addBlock to parent via ref
  useImperativeHandle(ref, () => ({
    addBlock,
  }), [addBlock]);

  // Get recent producers, excluding the latest (shown separately at top)
  const recentProducers = React.useMemo(() => {
    return producers
      .filter(p => !(latestProducer && p.producer === latestProducer.producer && p.block_num === latestProducer.block_num))
      .slice(0, WITNESS_COUNT);
  }, [producers, latestProducer]);

  return (
    <div className={`w-full py-24 px-10 bg-gradient-to-b from-gray-900 to-black ${className || ''}`} {...props}>
      <div className="max-w-screen-2xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Governance<span className="text-[#e31337]">.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hive is decentralized by design. Secured through Delegated Proof of Stake. Over 100 stakeholder-elected witnesses produce blocks every 3s.
          </p>
        </div>

        {/* Main visualization */}
        <div className="relative">
          {/* Central block indicator */}
          <div className="flex flex-col items-center mb-12">
            {/* Latest block producer highlight */}
            {latestProducer ? (
              <div className="relative">
                {/* Pulsing glow */}
                <div className="absolute inset-0 bg-[#e31337] rounded-full blur-2xl opacity-30 animate-pulse" />

                {/* Producer avatar */}
                <div className="relative flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#e31337] to-[#ff4d6a] rounded-full opacity-50 blur-md animate-pulse" />
                    <img
                      src={`https://images.hive.blog/u/${latestProducer.producer}/avatar`}
                      alt={latestProducer.producer}
                      className="relative w-24 h-24 rounded-full border-4 border-[#e31337] object-cover bg-gray-800"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.hive.blog/u/null/avatar';
                      }}
                    />
                    {/* Live indicator */}
                    <div className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-[#e31337] px-2 py-1 rounded-full">
                      <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </div>
                      <span className="text-xs font-bold text-white">LIVE</span>
                    </div>
                  </div>

                  {/* Producer info */}
                  <a
                    href={`https://peakd.com/@${latestProducer.producer}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-bold text-white hover:text-[#e31337] transition-colors"
                  >
                    @{latestProducer.producer}
                  </a>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-400">Block</span>
                    <a
                      href={`https://hivehub.dev/b/${latestProducer.block_num}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono text-[#e31337] hover:underline"
                    >
                      #{latestProducer.block_num.toLocaleString()}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              // Loading placeholder
              <div className="relative flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full border-4 border-gray-700 bg-gray-800 animate-pulse" />
                  {/* Live indicator placeholder */}
                  <div className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-[#e31337] px-2 py-1 rounded-full">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </div>
                    <span className="text-xs font-bold text-white">LIVE</span>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-500">---</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-400">Block</span>
                  <span className="text-sm font-mono text-gray-500">---</span>
                </div>
              </div>
            )}
          </div>

          {/* Witness grid */}
          <div className="relative">
            {/* Recent block producers */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: WITNESS_COUNT }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-800 animate-pulse" />
                    <div className="w-16 h-3 mt-2 bg-gray-800 rounded animate-pulse" />
                  </div>
                ))
              ) : (
                recentProducers.map((producer) => (
                  <a
                    key={`${producer.producer}-${producer.block_num}`}
                    href={`https://peakd.com/@${producer.producer}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center transition-all duration-300 opacity-80 hover:opacity-100"
                  >
                    <div className="relative">
                      <img
                        src={`https://images.hive.blog/u/${producer.producer}/avatar/small`}
                        alt={producer.producer}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover bg-gray-800 border-2 border-gray-700 group-hover:border-gray-500 transition-colors"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.hive.blog/u/null/avatar/small';
                        }}
                      />
                    </div>
                    <span className="mt-2 text-xs font-medium truncate max-w-20 text-gray-400 group-hover:text-white transition-colors">
                      @{producer.producer}
                    </span>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

RootDPoS.displayName = 'RootDPoS';
