'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useAssets } from '@/hooks/useAssets';
import { Button } from '@/components/ui/button';
import { Color } from '@/components/color/Color';

const colors = [
  {
    name: 'Hive Red',
    hex: '#E31337',
    rgb: '227 / 19/ 55',
    cmyk: '0 / 91.63 / 75.77 / 10.98',
  },
  {
    name: 'Hive Black',
    hex: '#212529',
    rgb: '33 / 37 / 41',
    cmyk: '19.51 / 9.76 / 0 / 83.92',
  },
  {
    name: 'Hive LightGrey',
    hex: '#f0f0f8',
    rgb: '240 / 240 / 248',
    cmyk: '3.23 / 3.23 / 0 / 2.75',
  },
  {
    name: 'Hive Grey',
    hex: '#e7e7f1',
    rgb: '231 / 231 / 241',
    cmyk: '4.15 / 4.15 / 0 / 5.49',
  },
];

export default function BrandPage() {
  const t = useTranslations();
  const { getImage } = useAssets();

  return (
    <div className="flex justify-center w-full min-h-[calc(100vh-80px)] py-20 px-5">
      <div className="flex flex-col items-center w-full max-w-[900px]">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <img className="h-[150px] mb-8" src={getImage('branding.svg')} alt="Branding" />
          <h1 className="text-[4rem] font-bold leading-tight mb-6 max-[600px]:text-[3rem]">
            {t('brand.title')}<span className="text-[#e31337]">.</span>
          </h1>
          <p className="text-xl max-w-[700px] text-[#555] leading-relaxed whitespace-pre-line mb-8">
            {t('brand.text')}
          </p>
          <a href="/hive-branding.zip">
            <Button className="mt-4">Download Assets</Button>
          </a>
        </div>

        {/* Colors Section */}
        <div className="flex flex-col items-center w-full mt-12">
          <h2 className="text-[2.8rem] font-bold leading-tight mb-8">
            Colors<span className="text-[#e31337]">.</span>
          </h2>
          <div className="flex flex-row flex-wrap justify-center gap-8 bg-[#f9f9ff] py-8 px-6 rounded-lg w-full">
            {colors.map((color, index) => (
              <Color key={index} color={color} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
