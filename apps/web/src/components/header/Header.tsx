'use client';

import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { Link } from '@/i18n/routing';
import { Logo } from '@/components/logo/Logo';
import { Navigation } from '@/components/navigation/Navigation';
import { MobileMenu } from '@/components/mobile-menu/MobileMenu';
import { LanguageSelector } from '@/components/LanguageSelector';
import { InfobarCompact } from '@/components/infobar/InfobarCompact';

interface HeaderProps {
  items?: any[];
}

export const Header: React.FC<HeaderProps> = ({ items = [] }) => {
  const headerRef = useRef<HTMLDivElement>(null);

  // Split items into navigation items and button items
  const navigationItems = items.filter(item => !item.isButton);
  const buttonItems = items.filter(item => item.isButton);

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
    <div id="header" ref={headerRef} className="max-w-screen-2xl w-full">
      <div className="py-5 px-10 flex flex-row items-center relative">
        <div className="flex flex-row items-center gap-8">
          <Link href="/">
            <Logo className="h-[33px] max-[600px]:z-[100]" />
          </Link>
          <Navigation className="max-[600px]:!hidden" items={navigationItems} />
        </div>

        {/* Centered InfobarCompact */}
        <div className="absolute left-1/2 -translate-x-1/2 max-[900px]:hidden">
          <InfobarCompact />
        </div>

        <div className="flex flex-row items-center gap-4 ml-auto max-[600px]:!hidden">
          <Navigation items={buttonItems} />
          {/* <LanguageSelector /> */}
        </div>
        <MobileMenu className="hidden max-[600px]:!block ml-auto" items={items} />
      </div>
    </div>
  );
};
