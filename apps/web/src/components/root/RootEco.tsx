'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { App } from '@/components/app/App';
import { ModalEco } from '@/components/modal/ModalEco';
import { ECOSYSTEM } from '@/lib/data/var';
import { shuffleArray } from '@/lib/data/util';
import type { IEcoItem } from '@/types';

interface RootEcoProps extends React.HTMLAttributes<HTMLDivElement> {
  full?: boolean;
}

export const RootEco: React.FC<RootEcoProps> = ({ full = true, className, ...props }) => {
  const router = useRouter();
  const t = useTranslations();

  const favs = useMemo(() => {
    const maxFeatured = 8;
    const fixed = ECOSYSTEM.filter((e) => e.featured).slice(0, 1);
    const random = fixed.concat(
      shuffleArray(
        ECOSYSTEM.filter((e) => e.featured).slice(1, ECOSYSTEM.length - 2)
      ).slice(0, maxFeatured - 1)
    );
    return random as IEcoItem[];
  }, []);

  return (
    <div className={`w-full  py-24 px-10  ${className || ''}`} {...props}>
      <ModalEco />
      <div className="max-w-screen-2xl mx-auto min-h-[420px] flex justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Title and Text */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t('root.ecoTitle')}<span className="text-[#e31337]">.</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('root.ecoText')}
            </p>
            <Button
              className="min-w-[160px] text-base py-6 px-8 font-semibold"
              onClick={() => router.push('/eco')}
            >
              {t('root.ecoButton')}
            </Button>
          </div>

          {/* Right side - Icons */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative h-[250px] w-[250px] mt-[86px] max-[600px]:mt-[60px] max-[600px]:mb-[50px]">
              {favs.map((app, index) => {
                const getSizeForIndex = (idx: number) => {
                  const sizes = [110, 80, 85, 65, 80, 55, 60, 77];
                  return sizes[idx] || 110;
                };

                return (
                  <div
                    key={app.id}
                    className={`absolute [&_a]:text-[0.9rem] ${index === 0 ? ' z-[1]' :
                      index === 1 ? 'top-[-115px] left-[35px]' :
                        index === 2 ? 'top-[-40px] left-[150px]' :
                          index === 3 ? 'top-[96px] left-[151px]' :
                            index === 4 ? 'top-[147px] left-[13px]' :
                              index === 5 ? 'top-[117px] left-[-93px]' :
                                index === 6 ? 'top-[10px] left-[-102px]' :
                                  index === 7 ? 'top-[-108px] left-[-86px]' :
                                    ''
                      }`}
                  >
                    <App
                      item={app}
                      move={true}
                      showName={false}
                      openModal={true}
                      appType="eco"
                      size={getSizeForIndex(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
