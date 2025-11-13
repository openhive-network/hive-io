'use client';

import React from 'react';
import { useMainStore } from '@/store/useMainStore';
import { Navigation } from '@/components/navigation/Navigation';

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
      <div className="block relative z-[1] select-none">
        <input
          type="checkbox"
          onClick={onClick}
          className="block w-10 h-8 absolute top-[-7px] left-[-5px] cursor-pointer opacity-0 z-[2]"
        />

        <span className={`block w-[33px] h-1 mb-[5px] relative bg-[#212529] rounded-[3px] z-[1] origin-[4px_0px] transition-all duration-500 ease-[cubic-bezier(0.77,0.2,0.05,1)] first:origin-[0%_0%] [&:nth-last-child(2)]:origin-[0%_100%] ${
          isMobileActive ? 'opacity-100 rotate-45 -translate-x-0.5 -translate-y-px' : ''
        }`}></span>
        <span className={`block w-[33px] h-1 mb-[5px] relative bg-[#212529] rounded-[3px] z-[1] origin-[4px_0px] transition-all duration-500 ease-[cubic-bezier(0.77,0.2,0.05,1)] first:origin-[0%_0%] [&:nth-last-child(2)]:origin-[0%_100%] ${
          isMobileActive ? 'opacity-0 scale-[0.2]' : ''
        }`}></span>
        <span className={`block w-[33px] h-1 mb-[5px] relative bg-[#212529] rounded-[3px] z-[1] origin-[4px_0px] transition-all duration-500 ease-[cubic-bezier(0.77,0.2,0.05,1)] first:origin-[0%_0%] [&:nth-last-child(2)]:origin-[0%_100%] ${
          isMobileActive ? 'opacity-100 -rotate-45 translate-x-0 -translate-y-px' : ''
        }`}></span>

        <Navigation
          className={`${isMobileActive ? 'flex' : 'hidden'} fixed top-0 bottom-0 right-0 left-0 w-full flex-col justify-center [&>*]:text-center [&>*]:py-2.5 [&>*]:px-0 [&>*]:w-full -mt-[200px] bg-[#f0f0f8]`}
          items={items}
          onClicked={() => setIsMobileActive(false)}
        />
      </div>
    </div>
  );
};
