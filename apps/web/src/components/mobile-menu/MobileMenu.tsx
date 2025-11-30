'use client';

import React from 'react';
import { useMainStore } from '@/store/useMainStore';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import { usePathname } from '@/i18n/routing';
import { useAuth } from '@/lib/auth';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { LanguageSelector } from '@/components/LanguageSelector';

interface MobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: any[];
  dark?: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  items = [],
  dark = false,
  className,
  ...props
}) => {
  const isMobileActive = useMainStore(state => state.isMobileActive);
  const setIsMobileActive = useMainStore(state => state.setIsMobileActive);
  const pathname = usePathname();
  const { user, isAuthenticated, pendingClaimedAccounts, logout } = useAuth();

  const isOnJoinPage = pathname === '/join' || pathname.startsWith('/join');

  // Filter out Join button on join page
  const filteredItems = items.filter(item => !(isOnJoinPage && item.isButton && item.to === 'join'));

  const onClick = () => {
    setIsMobileActive(!isMobileActive);
  };

  return (
    <div className={className} {...props}>
      {/* Navigation overlay */}
      <div className={`${isMobileActive ? 'fixed' : 'hidden'} top-0 bottom-0 right-0 left-0 w-full bg-white z-98 overflow-y-auto pt-24 px-6`}>
        {isOnJoinPage && isAuthenticated && user && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800 font-medium">@{user.username}</span>
              {pendingClaimedAccounts !== null && (
                <span className="text-xs text-gray-500">
                  ({pendingClaimedAccounts} {pendingClaimedAccounts === 1 ? 'token' : 'tokens'})
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout()
                setIsMobileActive(false)
              }}
              className="h-8 px-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
        <MobileNavigation
          items={filteredItems}
          onClicked={() => setIsMobileActive(false)}
        />
        {/* <div className="mt-6 pb-6">
          <LanguageSelector />
        </div> */}
      </div>

      {/* Hamburger button */}
      <div className="block relative z-100 select-none w-[33px] h-[22px]">
        <input
          type="checkbox"
          onChange={onClick}
          checked={isMobileActive}
          className="block w-10 h-8 absolute top-[-7px] left-[-5px] cursor-pointer opacity-0 z-101"
        />

        <span className={`block w-full h-1 absolute left-0 bg-hive-black rounded-[3px] origin-center transition-all duration-300 ease-in-out ${isMobileActive ? 'top-[10px] rotate-45' : 'top-0'
          }`}></span>
        <span className={`block w-full h-1 absolute top-[10px] left-0 bg-hive-black rounded-[3px] origin-center transition-all duration-300 ease-in-out ${isMobileActive ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}></span>
        <span className={`block w-full h-1 absolute left-0 bg-hive-black rounded-[3px] origin-center transition-all duration-300 ease-in-out ${isMobileActive ? 'top-[10px] -rotate-45' : 'top-[20px]'
          }`}></span>
      </div>
    </div>
  );
};
