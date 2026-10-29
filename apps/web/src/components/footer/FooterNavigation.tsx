import React from 'react';
import { Navigation } from '@/components/navigation/Navigation';
import type { INavigationItem } from '@/types';

interface FooterNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: INavigationItem[];
}

export const FooterNavigation: React.FC<FooterNavigationProps> = ({ items = [], className, ...props }) => {
  return (
    <div className={`min-w-[180px] ${className || ''}`} {...props}>
      <Navigation
        className="flex-col items-start [&>*]:m-0 [&>*]:py-[5px] [&>*]:px-0 [&>*:first-child_a]:font-bold [&>*:not(:first-child)_a]:!text-gray-400 [&>*:not(:first-child)_a:hover]:!text-white"
        items={items}
        dark={true}
      />
    </div>
  );
};
