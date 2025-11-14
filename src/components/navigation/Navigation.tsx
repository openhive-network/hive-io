'use client';

import React, { useMemo } from 'react';
import { NavigationItem } from './NavigationItem';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link } from '@/i18n/routing';

interface NavigationChild {
  to?: string;
  name?: string;
  description?: string;
}

interface NavigationItemType {
  to?: string;
  name?: string;
  isButton?: boolean;
  children?: NavigationChild[];
}

interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: NavigationItemType[];
  dark?: boolean;
  onClicked?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  items = [],
  dark = false,
  onClicked,
  className,
  ...props
}) => {
  // Check if any items have children (dropdown menus)
  const hasDropdowns = useMemo(() => {
    return items.some(item => item.children && item.children.length > 0);
  }, [items]);

  // Check if this is mobile menu (flex-col indicates mobile)
  const isMobileMenu = className?.includes('flex-col');

  // Navigation with dropdowns
  if (hasDropdowns) {
    return (
      <div className={`${isMobileMenu ? '' : 'flex items-center'} ${className || ''}`} {...props}>
        <NavigationMenu delayDuration={0} viewport={!isMobileMenu}>
          <NavigationMenuList className={isMobileMenu ? 'flex-col w-full gap-4' : ''}>
            {items.map((item, index) => {
              // Dropdown menu items
              if (item.children && item.children.length > 0) {
                return (
                  <NavigationMenuItem key={index} className={isMobileMenu ? 'w-full' : ''}>
                    <NavigationMenuTrigger className={`text-base font-normal bg-transparent border-none py-[5px] px-2.5 cursor-pointer transition-colors duration-100 ease-in hover:text-[#e31337] data-[state=open]:text-[#e31337] ${isMobileMenu ? 'w-full justify-center' : ''}`}>
                      {item.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className={`p-3 ${isMobileMenu ? 'w-full relative' : 'min-w-[280px]'}`}>
                      <ul className="list-none p-0 m-0 flex flex-col gap-2">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            {child.to && (child.to.includes('https://') || child.to.includes('mailto')) ? (
                              <NavigationMenuLink
                                href={child.to}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                onClick={onClicked}
                                className="block no-underline rounded-md py-3 px-4 transition-colors duration-100 ease-in hover:bg-[#f5f5f5] focus:outline-none focus:bg-[#f5f5f5]"
                              >
                                <div className="flex flex-col gap-1">
                                  <div className="text-sm font-medium text-black">{child.name}</div>
                                  {child.description && (
                                    <p className="text-[13px] text-[#666] m-0 leading-[1.4]">
                                      {child.description}
                                    </p>
                                  )}
                                </div>
                              </NavigationMenuLink>
                            ) : child.to ? (
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/${child.to}` as any}
                                  onClick={onClicked}
                                  className="block no-underline rounded-md py-3 px-4 transition-colors duration-100 ease-in hover:bg-[#f5f5f5] focus:outline-none focus:bg-[#f5f5f5]"
                                >
                                  <div className="flex flex-col gap-1">
                                    <div className="text-sm font-medium text-black">{child.name}</div>
                                    {child.description && (
                                      <p className="text-[13px] text-[#666] m-0 leading-[1.4]">
                                        {child.description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }

              // Regular navigation items
              return (
                <NavigationMenuItem key={index} className={isMobileMenu ? 'w-full' : ''}>
                  <NavigationItem
                    className="m-0 p-0"
                    to={item.to}
                    name={item.name}
                    isButton={item.isButton}
                    dark={dark}
                    onClick={onClicked}
                  />
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    );
  }

  // Simple navigation without dropdowns
  return (
    <div className={`flex items-center ${className || ''}`} {...props}>
      {items.map((item, index) => (
        <NavigationItem
          key={index}
          className="m-0 p-0"
          to={item.to}
          name={item.name}
          isButton={item.isButton}
          dark={dark}
          onClick={onClicked}
        />
      ))}
    </div>
  );
};
