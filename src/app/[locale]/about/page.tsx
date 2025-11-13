'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useAssets } from '@/hooks/useAssets';
import { ABOUT_NAVIGATION } from '@/lib/data/navigation';

export default function AboutPage() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const { getImage } = useAssets();

  return (
    <div className="flex justify-center w-full min-h-[calc(100vh-80px)] py-20 px-5">
      <div className="flex flex-col items-center w-full max-w-[900px]">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-[4rem] font-bold leading-tight mb-6 max-[600px]:text-[3rem]">
            {t('about.title')}<span className="text-[#e31337]">3</span>
          </h1>
          <p className="text-xl max-w-[700px] text-[#555] leading-relaxed">
            {t('about.text')}
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 gap-16 w-full mt-8">
          {/* Fast */}
          <div className="flex flex-col">
            <h2 className="text-[3.8rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('about.featureFast')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[6px] w-[80px] bg-[#e31337]"></div>
            </h2>
            <p className="text-xl text-[#555] leading-relaxed max-w-[700px] mt-2">
              {t('about.featureFastText')}
            </p>
          </div>

          {/* Scalable */}
          <div className="flex flex-col">
            <h2 className="text-[3.8rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('about.featureScalable')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[6px] w-[80px] bg-[#e31337]"></div>
            </h2>
            <p className="text-xl text-[#555] leading-relaxed max-w-[700px] mt-2">
              {t('about.featureScalableText')}
            </p>
          </div>

          {/* Powerful */}
          <div className="flex flex-col">
            <h2 className="text-[3.8rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('about.featurePowerful')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[6px] w-[80px] bg-[#e31337]"></div>
            </h2>
            <p className="text-xl text-[#555] leading-relaxed max-w-[700px] mt-2">
              {t('about.featurePowerfulText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
