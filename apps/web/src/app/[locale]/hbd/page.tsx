'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Protocol percent scale is 0–10000 (10000 = 100%).
 * Witnesses vote hbd_interest_rate and hbd_stop_percent / hbd_start_percent.
 * Fallbacks match live chain values verified 2026-09-30 (APR 10%, haircut 20%).
 */
const FALLBACK_APR_PERCENT = 10;
const FALLBACK_HAIRCUT_PERCENT = 20;

async function fetchHbdRates(): Promise<{ aprPercent: number; haircutPercent: number }> {
  const response = await fetch('https://api.hive.blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'condenser_api.get_dynamic_global_properties',
      params: [],
      id: 1,
    }),
  });
  if (!response.ok) {
    throw new Error(`Hive API HTTP ${response.status}`);
  }
  const payload = await response.json();
  const props = payload?.result;
  if (!props || typeof props.hbd_interest_rate !== 'number') {
    throw new Error('Missing hbd_interest_rate in global properties');
  }
  const aprPercent = props.hbd_interest_rate / 100;
  const haircutPercent =
    typeof props.hbd_stop_percent === 'number'
      ? props.hbd_stop_percent / 100
      : FALLBACK_HAIRCUT_PERCENT;
  return { aprPercent, haircutPercent };
}

export default function HbdPage() {
  const t = useTranslations();
  // Witness-voted rates; replace hardcoded copy with live chain values when available.
  const [aprPercent, setAprPercent] = useState(FALLBACK_APR_PERCENT);
  const [haircutPercent, setHaircutPercent] = useState(FALLBACK_HAIRCUT_PERCENT);

  useEffect(() => {
    let cancelled = false;
    fetchHbdRates()
      .then((rates) => {
        if (!cancelled) {
          setAprPercent(rates.aprPercent);
          setHaircutPercent(rates.haircutPercent);
        }
      })
      .catch(() => {
        // Keep witness-rate fallbacks if the public API is unreachable.
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
            <p className="text-[1.1rem] text-[#555] leading-relaxed">
              {t('hbd.interestText', { aprPercent })}
            </p>
          </div>

          <div>
            <h2 className="text-[2.2rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('hbd.risksTitle')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[5px] w-[60px] bg-[#e31337]"></div>
            </h2>
            <p className="text-[1.1rem] text-[#555] leading-relaxed mb-3">
              {t('hbd.risksText', { haircutPercent })}
            </p>
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
