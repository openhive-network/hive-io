'use client';

import React from 'react';
import { useMainStore } from '@/store/useMainStore';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';

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

  const onClick = () => {
    setIsMobileActive(!isMobileActive);
  };

  return (
    <div className={className} {...props}>
      {/* Navigation overlay */}
      <div className={`${isMobileActive ? 'fixed' : 'hidden'} top-0 bottom-0 right-0 left-0 w-full bg-hive-light-grey z-98 overflow-y-auto pt-24 px-6`}>
        <MobileNavigation
          items={items}
          onClicked={() => setIsMobileActive(false)}
        />
      </div>

      {/* Hamburger button */}
      <div className="block relative z-100 select-none w-[33px] h-[22px]">
        <input
          type="checkbox"
          onChange={onClick}
          checked={isMobileActive}
          className="block w-10 h-8 absolute top-[-7px] left-[-5px] cursor-pointer opacity-0 z-101"
        />

        <span className={`block w-full h-1 absolute left-0 bg-hive-black rounded-[3px] origin-center transition-all duration-300 ease-in-out ${
          isMobileActive ? 'top-[10px] rotate-45' : 'top-0'
        }`}></span>
        <span className={`block w-full h-1 absolute top-[10px] left-0 bg-hive-black rounded-[3px] origin-center transition-all duration-300 ease-in-out ${
          isMobileActive ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}></span>
        <span className={`block w-full h-1 absolute left-0 bg-hive-black rounded-[3px] origin-center transition-all duration-300 ease-in-out ${
          isMobileActive ? 'top-[10px] -rotate-45' : 'top-[20px]'
        }`}></span>
      </div>
    </div>
  );
};
