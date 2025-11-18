'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faClock } from '@fortawesome/free-solid-svg-icons';
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

export const InfobarCompact: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownState>(getInitialCountdown());

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

  if (isReady && INFOBAR.hideWhenReady) {
    return null;
  }

  return (
    <div
      onClick={go}
      className="flex items-center gap-2 bg-[#e31337] text-white px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 hover:bg-[#c51230] hover:shadow-md max-[900px]:hidden"
    >
      <FontAwesomeIcon icon={faClock} className="w-3 h-3 opacity-90" />
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide opacity-90">
          {INFOBAR.title}
        </span>
        <span className="text-sm font-bold tabular-nums tracking-wide">
          {isReady ? INFOBAR.titleReady : formattedCountdown}
        </span>
      </div>
      <FontAwesomeIcon
        className="w-2.5 h-2.5 opacity-70"
        icon={faExternalLinkAlt}
      />
    </div>
  );
};
