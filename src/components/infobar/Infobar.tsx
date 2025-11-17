'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { INFOBAR } from '@/lib/data/var';

dayjs.extend(utc);

interface CountdownState {
  d: string;
  h: string;
  m: string;
  s: string;
}

const getInitialCountdown = (): CountdownState => {
  const then = dayjs.utc(INFOBAR.date).valueOf();
  const now = dayjs.utc().valueOf();
  if (then - now < 0) {
    return { d: '0', h: '0', m: '0', s: '0' };
  }
  const diff = then - now;
  const countdown = dayjs.utc(diff);
  const dNum = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hNum = countdown.hour();
  const mNum = countdown.minute();
  const sNum = countdown.second();

  return {
    d: String(dNum),
    h: dNum > 0 ? (hNum < 10 ? '0' : '') + String(hNum) : String(hNum),
    m:
      dNum > 0 || hNum > 0
        ? (mNum < 10 ? '0' : '') + String(mNum)
        : String(mNum),
    s: (sNum < 10 ? '0' : '') + String(sNum),
  };
};

export const Infobar: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownState>(getInitialCountdown());
  const [showInfobar, setShowInfobar] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const then = dayjs.utc(INFOBAR.date).valueOf();
      const now = dayjs.utc().valueOf();
      if (then - now < 0) {
        setCountdown({ d: '0', h: '0', m: '0', s: '0' });
        return;
      }
      const diff = then - now;
      const countdownTime = dayjs.utc(diff);
      const dNum = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hNum = countdownTime.hour();
      const mNum = countdownTime.minute();
      const sNum = countdownTime.second();

      setCountdown({
        d: String(dNum),
        h: dNum > 0 ? (hNum < 10 ? '0' : '') + String(hNum) : String(hNum),
        m:
          dNum > 0 || hNum > 0
            ? (mNum < 10 ? '0' : '') + String(mNum)
            : String(mNum),
        s: (sNum < 10 ? '0' : '') + String(sNum),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedCountdown = useMemo(() => {
    const parts: string[] = [];
    if (countdown.d !== '0') parts.push(`${countdown.d}d`);
    if (countdown.h !== '0' || countdown.d !== '0') parts.push(`${countdown.h}h`);
    if (countdown.m !== '0' || countdown.h !== '0' || countdown.d !== '0')
      parts.push(`${countdown.m}m`);
    parts.push(`${countdown.s}s`);
    return parts.join(' ');
  }, [countdown]);

  const isReady = useMemo(() => {
    const countdownString = `${countdown.d}:${countdown.h}:${countdown.m}:${countdown.s}`;
    return countdownString === '0:0:0:00' || countdownString === '0:0:0:0';
  }, [countdown]);

  const go = () => {
    if (INFOBAR.urlReady && isReady) {
      window.open(INFOBAR.urlReady, '_blank');
    } else {
      window.open(INFOBAR.url, '_blank');
    }
  };

  if (!showInfobar || (isReady && INFOBAR.hideWhenReady)) {
    return null;
  }

  return (
    <div
      className="w-fit mx-auto -mt-32 mb-[50px] text-center max-h-[800px]:mt-0 max-h-[800px]:mb-[30px] max-[600px]:mt-0 max-[600px]:mb-5"
    >
      {!isReady && (
        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="text-[#1a1a1a] text-[0.9rem] font-bold uppercase tracking-[1px] max-[600px]:text-[0.8rem]">
            {INFOBAR.titleDesktopOnly && (
              <span className="max-[600px]:hidden">
                {INFOBAR.titleDesktopOnly}
              </span>
            )}
            <span>{INFOBAR.title}</span>
          </div>
          <div
            className="bg-[#e31337] text-white rounded px-[30px] py-[10px] min-w-[250px] cursor-pointer transition-transform duration-500 hover:-translate-y-[10%] flex items-center justify-center gap-3 max-[600px]:px-5 max-[600px]:py-2"
            onClick={go}
          >
            <span className="text-[1.8rem] font-bold tabular-nums tracking-[2px] text-white max-[600px]:text-2xl max-[600px]:tracking-[1.5px]">
              {formattedCountdown}
            </span>
            <FontAwesomeIcon
              className="h-2.5 w-2.5 text-white opacity-80"
              icon={faExternalLinkAlt}
            />
          </div>
        </div>
      )}
      {isReady && (
        <div
          className="bg-[#e31337] text-white rounded px-[30px] py-[15px] min-w-[250px] text-2xl font-semibold cursor-pointer transition-transform duration-500 hover:-translate-y-[10%]"
          onClick={go}
        >
          {INFOBAR.titleReady}
        </div>
      )}
    </div>
  );
};
