'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface MobileNavigationProps {
  items: NavigationItemType[];
  onClicked?: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ items, onClicked }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleLinkClick = () => {
    if (onClicked) onClicked();
  };

  const go = (url: string) => {
    window.open(url, '_blank');
    if (onClicked) onClicked();
  };

  return (
    <div className="flex flex-col w-full">
      {items.map((item, index) => {
        // Items with children (accordion sections)
        if (item.children && item.children.length > 0) {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggleSection(index)}
                className={`w-full flex items-center justify-between py-4 px-0 text-left text-lg font-medium bg-transparent border-none cursor-pointer transition-colors ${
                  isOpen ? 'text-[#e31337]' : 'text-black hover:text-[#e31337]'
                }`}
              >
                <span>{item.name}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="pb-4 pl-4">
                  {item.children.map((child, childIndex) => (
                    <div key={childIndex} className="mb-3">
                      {child.to && (child.to.includes('https://') || child.to.includes('mailto')) ? (
                        <a
                          href={child.to}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          onClick={handleLinkClick}
                          className="block no-underline"
                        >
                          <div className="text-base font-medium text-black hover:text-[#e31337] transition-colors">
                            {child.name}
                          </div>
                          {child.description && (
                            <p className="text-sm text-gray-600 mt-1 mb-0">
                              {child.description}
                            </p>
                          )}
                        </a>
                      ) : child.to ? (
                        <Link
                          href={`/${child.to}` as any}
                          onClick={handleLinkClick}
                          className="block no-underline"
                        >
                          <div className="text-base font-medium text-black hover:text-[#e31337] transition-colors">
                            {child.name}
                          </div>
                          {child.description && (
                            <p className="text-sm text-gray-600 mt-1 mb-0">
                              {child.description}
                            </p>
                          )}
                        </Link>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }

        // Regular button items
        if (item.isButton && item.to) {
          return (
            <div key={index} className="py-4 border-b border-gray-200">
              <Button
                className="w-full"
                onClick={() => go(item.to!)}
              >
                {item.name}
              </Button>
            </div>
          );
        }

        // Regular link items
        if (item.to && (item.to.includes('https://') || item.to.includes('mailto'))) {
          return (
            <div key={index} className="border-b border-gray-200">
              <a
                href={item.to}
                target="_blank"
                rel="nofollow noopener noreferrer"
                onClick={handleLinkClick}
                className="block py-4 text-lg font-medium text-black no-underline hover:text-[#e31337] transition-colors"
              >
                {item.name}
              </a>
            </div>
          );
        }

        if (item.to) {
          return (
            <div key={index} className="border-b border-gray-200">
              <Link
                href={`/${item.to}` as any}
                onClick={handleLinkClick}
                className="block py-4 text-lg font-medium text-black no-underline hover:text-[#e31337] transition-colors"
              >
                {item.name}
              </Link>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
