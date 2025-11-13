'use client';

import React from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useMainStore } from '@/store/useMainStore';
import { Button } from '@/components/ui/button';
import { App } from './App';

export const EcoDetailed: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const activeEco = useMainStore(state => state.activeEco);
  const getSimilarEco = useMainStore(state => state.getSimilarEco);
  const getOtherEco = useMainStore(state => state.getOtherEco);

  const similarEco = getSimilarEco();
  const otherEco = getOtherEco();

  const exploreEco = () => {
    router.push('/eco');
  };

  const isEcoPage = pathname.endsWith('/eco') || pathname.includes('/eco/');

  return (
    <div className="pt-6">
      <div className="!m-0 py-[25px] px-10 !mb-[15px] bg-[#f0f0f8]">
        <App
          item={activeEco}
          detailed={true}
        />
      </div>
      <div>
        <h3 className="text-2xl font-bold leading-normal mb-2.5 pl-10">Similar Apps</h3>
        <div className="flex flex-row flex-wrap p-0 pr-10 pb-[5px] pl-[30px] [&>div]:!mx-2 [&>div]:!my-1 [&>div>div]:!h-[70px] [&>div>div]:!w-[70px] [&>div>a]:!h-[70px] [&>div>a]:!w-[70px] [&>div>div:last-child]:!hidden">
          {similarEco.map((eco) => (
            <App
              key={eco.id}
              item={eco}
              detailed={false}
              move={true}
              showName={false}
              openModal={true}
              appType="eco"
              style={{
                opacity: eco.id === activeEco.id ? '0.333' : '1'
              }}
            />
          ))}
        </div>
      </div>
      {!isEcoPage && (
        <div>
          <div className="flex mb-2.5">
            <h3 className="text-2xl font-bold leading-normal m-0 pl-10">
              Other Apps
            </h3>
            <Button
              variant="outline"
              className="ml-[15px] py-1.5 px-[18px]"
              onClick={exploreEco}
            >
              Explore Ecosystem
            </Button>
          </div>
          <div className="flex flex-row flex-wrap p-0 pr-10 pb-[5px] pl-[30px] [&>div]:!mx-2 [&>div]:!my-1 [&>div>div]:!h-[70px] [&>div>div]:!w-[70px] [&>div>a]:!h-[70px] [&>div>a]:!w-[70px] [&>div>div:last-child]:!hidden">
            {otherEco.map((eco) => (
              <App
                key={eco.id}
                item={eco}
                detailed={false}
                move={true}
                showName={false}
                openModal={true}
                appType="eco"
                style={{
                  opacity: eco.id === activeEco.id ? '0.333' : '1'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
