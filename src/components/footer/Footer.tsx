import React from 'react';
import { Logo } from '@/components/logo/Logo';
import { FooterNavigation } from './FooterNavigation';

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: any[][];
}

export const Footer: React.FC<FooterProps> = ({ items = [], className, ...props }) => {
  return (
    <div className={`w-full bg-[#212529] ${className || ''}`} {...props}>
      <div className="py-10 px-20 flex flex-row justify-between max-[1250px]:px-[60px] max-[1000px]:flex-col max-[1000px]:items-center">
        <Logo className="h-[30px] w-[132px] max-[1000px]:mb-[15px]" dark={true} />
        <div className="flex flex-row flex-wrap justify-center w-full ml-[15px] max-[1000px]:mt-5 max-[1000px]:ml-0">
          {items.map((subItems, index) => (
            <FooterNavigation
              key={index}
              items={subItems}
              className="mb-5"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
