'use client';

import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { Link } from '@/i18n/routing';
import { Logo } from '@/components/logo/Logo';
import { Navigation } from '@/components/navigation/Navigation';
import { MobileMenu } from '@/components/mobile-menu/MobileMenu';
import { LanguageSelector } from '@/components/LanguageSelector';

interface HeaderProps {
  items?: any[];
}

export const Header: React.FC<HeaderProps> = ({ items = [] }) => {
  const headerRef = useRef<HTMLDivElement>(null);

  // Use useLayoutEffect to update header height before browser paint
  useLayoutEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    }
  }, []);

  // Handle resize events
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <div id="header" ref={headerRef} className="max-w-[1300px] w-full">
      <div className="py-5 px-10 flex flex-row justify-between items-center">
        <Link href="/">
          <Logo className="h-[33px] max-[600px]:z-[100]" />
        </Link>

        <div className="flex flex-row items-center gap-4">
          <Navigation className="max-[600px]:!hidden" items={items} />
          {/* <LanguageSelector /> */}
        </div>
        <MobileMenu className="hidden max-[600px]:!block" items={items} />
      </div>
    </div>
  );
};
