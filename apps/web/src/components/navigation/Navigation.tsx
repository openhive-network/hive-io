'use client';

import React, { useMemo, useState, useEffect } from 'react';
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
import { ChevronRight } from 'lucide-react';

interface SubmenuItem {
  to?: string;
  name?: string;
  description?: string;
}

interface NavigationChild {
  to?: string;
  name?: string;
  description?: string;
  submenu?: SubmenuItem[];
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
  const [hoveredSubmenu, setHoveredSubmenu] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Reset hoveredSubmenu when dropdown changes
  useEffect(() => {
    setHoveredSubmenu(null);
  }, [openDropdown]);

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
                    <NavigationMenuTrigger
                      className={`text-base font-normal bg-transparent border-none py-[5px] px-2.5 cursor-pointer transition-colors duration-100 ease-in hover:text-[#e31337] data-[state=open]:text-[#e31337] ${isMobileMenu ? 'w-full justify-center' : ''}`}
                      onPointerEnter={() => setOpenDropdown(item.name || null)}
                      onPointerLeave={() => setHoveredSubmenu(null)}
                    >
                      {item.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                      className={`p-3 ${isMobileMenu ? 'w-full relative' : ''}`}
                      onPointerLeave={() => setHoveredSubmenu(null)}
                    >
                      <div className="flex gap-0">
                        {/* Main menu items */}
                        <ul className="list-none p-0 m-0 flex flex-col gap-2 flex-1 shrink-0 w-[280px]">
                          {item.children && item.children.map((child: any, childIndex) => (
                            <li
                              key={childIndex}
                              onMouseEnter={() => child.submenu ? setHoveredSubmenu(childIndex) : setHoveredSubmenu(null)}
                            >
                              {child.to && (child.to.includes('https://') || child.to.includes('mailto')) ? (
                                <NavigationMenuLink
                                  href={child.to}
                                  target="_blank"
                                  rel="nofollow noopener noreferrer"
                                  onClick={onClicked}
                                  className="group/link block no-underline rounded-md py-3 px-4 transition-colors duration-100 ease-in hover:bg-[#f5f5f5] focus:outline-none focus:bg-[#f5f5f5]"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex flex-col gap-1">
                                      <span className="text-sm font-medium text-black">{child.name}</span>
                                      {child.description && (
                                        <p className="text-[13px] text-[#666] m-0 leading-[1.4]">
                                          {child.description}
                                        </p>
                                      )}
                                    </div>
                                    <span className="text-sm text-gray-400 group-hover/link:text-[#e31337] transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0">↗</span>
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
                              ) : child.submenu ? (
                                <div className={`block no-underline rounded-md py-3 px-4 transition-colors duration-100 ease-in cursor-pointer ${hoveredSubmenu === childIndex ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'}`}>
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                      <div className="text-sm font-medium text-black">{child.name}</div>
                                      <ChevronRight className="w-4 h-4 text-[#666] ml-2" />
                                    </div>
                                    {child.description && (
                                      <p className="text-[13px] text-[#666] m-0 leading-[1.4]">
                                        {child.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ) : null}
                            </li>
                          ))}
                        </ul>

                        {/* Right column - Submenu items (only visible when hovering submenu item) */}
                        {hoveredSubmenu !== null && item.children && (item.children[hoveredSubmenu] as any)?.submenu && (
                          <div className="border-l border-gray-200 pl-6 min-w-[300px] shrink-0">
                            <ul className="list-none p-0 m-0 flex flex-col gap-2">
                              {(item.children[hoveredSubmenu] as any).submenu.map((subItem: any, subIndex: number) => (
                                <li key={subIndex}>
                                  {subItem.to && (subItem.to.includes('https://') || subItem.to.includes('mailto')) ? (
                                    <NavigationMenuLink
                                      href={subItem.to}
                                      target="_blank"
                                      rel="nofollow noopener noreferrer"
                                      onClick={onClicked}
                                      className="group/link block no-underline rounded-md py-3 px-4 transition-colors duration-100 ease-in hover:bg-[#f5f5f5] focus:outline-none focus:bg-[#f5f5f5]"
                                    >
                                      <div className="flex items-start justify-between gap-2">
                                        <div className="flex flex-col gap-1">
                                          <span className="text-sm font-medium text-black">{subItem.name}</span>
                                          {subItem.description && (
                                            <p className="text-[13px] text-[#666] m-0 leading-[1.4]">
                                              {subItem.description}
                                            </p>
                                          )}
                                        </div>
                                        <span className="text-sm text-gray-400 group-hover/link:text-[#e31337] transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0">↗</span>
                                      </div>
                                    </NavigationMenuLink>
                                  ) : subItem.to ? (
                                    <NavigationMenuLink asChild>
                                      <Link
                                        href={`/${subItem.to}` as any}
                                        onClick={onClicked}
                                        className="block no-underline rounded-md py-3 px-4 transition-colors duration-100 ease-in hover:bg-[#f5f5f5] focus:outline-none focus:bg-[#f5f5f5]"
                                      >
                                        <div className="flex flex-col gap-1">
                                          <div className="text-sm font-medium text-black">{subItem.name}</div>
                                          {subItem.description && (
                                            <p className="text-[13px] text-[#666] m-0 leading-[1.4]">
                                              {subItem.description}
                                            </p>
                                          )}
                                        </div>
                                      </Link>
                                    </NavigationMenuLink>
                                  ) : null}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
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
