'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { App } from '@/components/app/App';
import { WALLETS } from '@/lib/data/var';

export default function WalletsPage() {
  const t = useTranslations();

  return (
    <div className="flex justify-center w-full min-h-[calc(100vh-80px)] py-20 px-5">
      <div className="flex flex-col items-center w-full max-w-[1200px]">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-[4rem] font-bold leading-tight mb-6 max-[600px]:text-[3rem]">
            {t('wallets.title')}<span className="text-[#e31337]">.</span>
          </h1>
          <p className="text-xl max-w-[700px] text-[#555] leading-relaxed">
            {t('wallets.text')}
          </p>
        </div>

        {/* Wallets Grid */}
        <div className="flex flex-row flex-wrap items-start justify-center w-full gap-5">
          {WALLETS.map((wallet) => (
            <App key={wallet.id} item={wallet} />
          ))}
        </div>
      </div>
    </div>
  );
}
