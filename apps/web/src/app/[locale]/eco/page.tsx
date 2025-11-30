'use client';

import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useMainStore } from '@/store/useMainStore';
import { ECOSYSTEM, STATISTIC_WEBSITES, TYPE_COLORS, HIVE_PROJECTS } from '@/lib/data/var';
import { EcoType, IEcoItem } from '@/types';
import { App } from '@/components/app/App';
import { AppType } from '@/components/app/AppType';
import { StatWebsite } from '@/components/statWebsite/StatWebsite';
import { ModalEco } from '@/components/modal/ModalEco';

function EcoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const [filteredEco, setFilteredEco] = useState<IEcoItem[]>([]);

  const filterParam = searchParams.get('t');

  const appTypes = useMemo(() =>
    Object.keys(TYPE_COLORS)
      .filter((c) => {
        return ECOSYSTEM.find((e) => e.types.includes(c as any));
      })
      .map((c) => {
        return {
          value: c,
          count: ECOSYSTEM.filter((e) => e.types.includes(c as any)).length,
        };
      }),
    []
  );

  const getFilteredEco = (key: string | null) => {
    setFilteredEco(ECOSYSTEM.filter((e) => !key || e.types.includes(key as EcoType)));
  };

  // Initialize on mount
  useEffect(() => {
    getFilteredEco(filterParam);
  }, []);

  // Update when filter changes
  useEffect(() => {
    getFilteredEco(filterParam);
  }, [filterParam]);

  const filterEco = (key: string) => {
    if (filterParam === key) {
      router.push('/eco');
    } else {
      router.push(`/eco?t=${key}`);
    }
  };

  return (
    <div className="flex justify-center w-full min-h-[calc(100vh-80px)] py-20 px-5">
      <div className="flex flex-col items-center w-full max-w-[1000px]">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-[4rem] font-bold leading-tight mb-6 max-[600px]:text-[3rem]">
            {t('eco.title')}<span className="text-[#e31337]">.</span>
          </h1>
          <p className="text-xl max-w-[700px] text-[#555] leading-relaxed">
            {t('eco.text')}
          </p>
        </div>

        {/* Filter Types */}
        <div className="flex flex-row flex-wrap justify-center gap-3 mb-12">
          {appTypes.map((appType) => (
            <AppType
              key={appType.value}
              className={
                filterParam && filterParam !== appType.value
                  ? 'opacity-40 hover:opacity-75'
                  : ''
              }
              appType={appType.value}
              count={appType.count}
              onClick={() => filterEco(appType.value)}
            />
          ))}
        </div>

        <ModalEco />

        {/* Apps Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] justify-items-center w-full gap-x-3 gap-y-5 mb-16">
          {filteredEco.map((eco) => (
            <App
              key={eco.id}
              item={eco}
              openModal={true}
              move={true}
              showName={true}
              showTypes={true}
              appType="eco"
              size={85}
              compact={true}
            />
          ))}
        </div>

        {/* More Projects Section */}
        <div className="flex flex-col items-center text-center mt-12 mb-16">
          <h2 className="text-[2.8rem] font-bold leading-tight mb-4">
            But wait, there's more<span className="text-[#e31337]">...</span>
          </h2>
          <p className="text-xl text-[#555] leading-relaxed mb-6">
            Over <span className="font-bold text-black">190 projects</span> have been BUIDL'd by the Hive community. You
            can view all of them via HiveProjects.io
          </p>
          <StatWebsite item={HIVE_PROJECTS} transparent={true} />
        </div>

        {/* Statistics Section */}
        <div className="flex flex-col items-center text-center w-full mt-16">
          <h2 className="text-[2.8rem] font-bold leading-tight mb-4">
            {t('eco.subTitle')}<span className="text-[#e31337]">.</span>
          </h2>
          <p className="text-xl text-[#555] leading-relaxed mb-8">{t('eco.subText')}</p>
          <div className="flex flex-row flex-wrap justify-center gap-8 w-full">
            {STATISTIC_WEBSITES.map((site) => (
              <StatWebsite key={site.id} item={site} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EcoPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <EcoContent />
    </Suspense>
  );
}
