'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function HbdPage() {
  const t = useTranslations();

  return (
    <div className="flex justify-center w-full min-h-[calc(100vh-80px)] py-20 px-5">
      <div className="flex flex-col items-center w-full max-w-[900px]">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-[4rem] font-bold leading-tight mb-6 max-[600px]:text-[3rem]">
            {t('hbd.title')}<span className="text-[#e31337]">.</span>
          </h1>
          <p className="text-xl max-w-[700px] text-[#555] leading-relaxed">{t('hbd.text')}</p>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-12 w-full text-left">
          <div>
            <h2 className="text-[2.2rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('hbd.howTitle')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[5px] w-[60px] bg-[#e31337]"></div>
            </h2>
            <p className="text-[1.1rem] text-[#555] leading-relaxed">{t('hbd.howText')}</p>
          </div>

          <div>
            <h2 className="text-[2.2rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('hbd.hbdToHiveTitle')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[5px] w-[60px] bg-[#e31337]"></div>
            </h2>
            <p className="text-[1.1rem] text-[#555] leading-relaxed">{t('hbd.hbdToHiveText')}</p>
          </div>

          <div>
            <h2 className="text-[2.2rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('hbd.hiveToHbdTitle')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[5px] w-[60px] bg-[#e31337]"></div>
            </h2>
            <p className="text-[1.1rem] text-[#555] leading-relaxed mb-3">{t('hbd.hiveToHbdText')}</p>
            <p className="text-[1.1rem] text-[#555] leading-relaxed">
              {t('hbd.supportedWallets')}:{' '}
              <a
                href="https://peakd.com"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-[#e31337] hover:underline"
              >
                Peakd
              </a>
              ,{' '}
              <a
                href="https://hive-keychain.com"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-[#e31337] hover:underline"
              >
                Hive Keychain
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-[2.2rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('hbd.interestTitle')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[5px] w-[60px] bg-[#e31337]"></div>
            </h2>
            <p className="text-[1.1rem] text-[#555] leading-relaxed">{t('hbd.interestText')}</p>
          </div>

          <div>
            <h2 className="text-[2.2rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('hbd.risksTitle')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[5px] w-[60px] bg-[#e31337]"></div>
            </h2>
            <p className="text-[1.1rem] text-[#555] leading-relaxed mb-3">{t('hbd.risksText')}</p>
            <p className="text-[1.1rem] text-[#555] leading-relaxed mb-3">{t('hbd.risksText2')}</p>
            <p className="text-[1.1rem] font-semibold">
              <a
                href="https://peakd.com/hbd/@arcange/hive-debt-ratio-and-haircut-rule"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-[#e31337] hover:underline"
              >
                Read more
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-[2.2rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('hbd.whereToBuyTitle')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[5px] w-[60px] bg-[#e31337]"></div>
            </h2>
            <div className="flex flex-col gap-2 text-[1.1rem]">
              <a
                href="https://hivedex.io"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-[#e31337] hover:underline"
              >
                Hivedex.io (internal market)
              </a>
              <a
                href="https://ecency.com/market"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-[#e31337] hover:underline"
              >
                Ecency (internal market)
              </a>
              <a
                href="https://tribaldex.com/trade/SWAP.HBD"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-[#e31337] hover:underline"
              >
                Tribaldex
              </a>
              <a
                href="https://sg.upbit.com"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-[#e31337] hover:underline"
              >
                Upbit
              </a>
              <a
                href="https://ex.xbts.io/market/XBTSX.HBD_BTS"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-[#e31337] hover:underline"
              >
                XBTS
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-[2.2rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('hbd.moreInfoTitle')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[5px] w-[60px] bg-[#e31337]"></div>
            </h2>
            <p className="text-[1.1rem] text-[#555] leading-relaxed">
              {t('hbd.moreInfoText')}{' '}
              <a
                href="https://www.hbdstats.com"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-[#e31337] hover:underline"
              >
                HBD Stats
              </a>
              ,{' '}
              <a
                href="https://hive.ausbit.dev/hbd"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-[#e31337] hover:underline"
              >
                Block Explorer
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
