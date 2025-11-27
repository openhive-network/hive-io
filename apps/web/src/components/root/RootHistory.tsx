'use client';

import React from 'react';

interface RootHistoryProps extends React.HTMLAttributes<HTMLDivElement> { }

export const RootHistory: React.FC<RootHistoryProps> = ({ className, ...props }) => {
  return (
    <div className={`w-full py-24 px-6 sm:px-10 ${className || ''}`} {...props}>
      <div className="max-w-screen-2xl mx-auto min-h-[420px] flex justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Bold statement */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              We forked<span className="text-[#e31337]">.</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              In March 2020, a hostile takeover threatened to centralize a blockchain.
              The community refused. They forked, taking their code, their content,
              and their principles with them.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">Hive was born</span>—a
              chain owned by no one and governed by everyone.
            </p>
          </div>

          {/* Right side - Articles */}
          <div className="flex flex-col gap-5">
            <a
              href="https://decrypt.co/38050/steem-steemit-tron-justin-sun-cryptocurrency-war"
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 hover:shadow-2xl hover:shadow-[#e31337]/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#e31337]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#e31337]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="font-medium text-white">DECRYPT</span>
                    <span>•</span>
                    <span>Aug 2020</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#e31337] transition-colors leading-snug mb-2 flex items-center gap-2">
                  The Great Steem Wars
                  <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
                </h3>
                <p className="text-sm text-gray-400">
                  Inside Crypto&apos;s Biggest Hostile Takeover
                </p>
              </div>
            </a>
            <a
              href="https://decrypt.co/23854/hive-decentralized-fork-outperforms-steemit"
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl bg-gradient-to-br from-[#e31337] to-[#a30d28] hover:shadow-2xl hover:shadow-[#e31337]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <span className="font-medium text-white">DECRYPT</span>
                    <span>•</span>
                    <span>Mar 2020</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white leading-snug mb-2 flex items-center gap-2">
                  The Fork That Won
                  <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
                </h3>
                <p className="text-sm text-white/80">
                  How Hive Outperformed Steemit
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
