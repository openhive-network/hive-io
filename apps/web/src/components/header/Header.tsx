'use client';

import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { Logo } from '@/components/logo/Logo';
import { Navigation } from '@/components/navigation/Navigation';
import { MobileMenu } from '@/components/mobile-menu/MobileMenu';
// import { LanguageSelector } from '@/components/LanguageSelector';
import { InfobarCompact } from '@/components/infobar/InfobarCompact';
import { useAuth } from '@/lib/auth';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  items?: any[];
}

export const Header: React.FC<HeaderProps> = ({ items = [] }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, isAuthenticated, pendingClaimedAccounts, logout } = useAuth();

  const isOnJoinPage = pathname === '/join' || pathname.startsWith('/join');

  // Split items into navigation items and button items
  const navigationItems = items.filter(item => !item.isButton);
  // Hide Join button on join page
  const buttonItems = items.filter(item => item.isButton && !(isOnJoinPage && item.to === 'join'));

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
      <div className="py-5 px-6 sm:px-10 flex flex-row items-center relative">
        <div className="flex flex-row items-center gap-16">
          <Link href="/">
            <Logo className="h-[33px] max-[600px]:z-[100]" />
          </Link>
          <Navigation className="max-[600px]:!hidden" items={navigationItems} />
        </div>

        {/* Centered InfobarCompact - Desktop only */}
        <div className="absolute left-1/2 -translate-x-1/2 max-[1250px]:hidden">
          <InfobarCompact />
        </div>

        <div className="flex flex-row items-center gap-4 ml-auto max-[600px]:!hidden">
          {isOnJoinPage && isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 border border-gray-200">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">@{user.username}</span>
                {pendingClaimedAccounts !== null && (
                  <span className="text-xs text-gray-500">
                    ({pendingClaimedAccounts} {pendingClaimedAccounts === 1 ? 'token' : 'tokens'})
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout()}
                className="h-8 px-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Navigation items={buttonItems} />
          )}
          {/* <LanguageSelector /> */}
        </div>
        <MobileMenu className="hidden max-[600px]:!block ml-auto" items={items} />
      </div>

      {/* InfobarCompact - Mobile version below navbar */}
      <div className="hidden max-[1250px]:flex justify-center px-4 pb-4">
        <InfobarCompact />
      </div>
    </div>
  );
};
