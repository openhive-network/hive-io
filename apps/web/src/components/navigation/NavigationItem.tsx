'use client';

import React from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

interface NavigationItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  to?: string;
  name?: string;
  isButton?: boolean;
  dark?: boolean;
  onClick?: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  to,
  name,
  isButton = false,
  dark = false,
  className,
  onClick,
  ...props
}) => {
  const pathname = usePathname();

  const go = (url: string) => {
    window.open(url, '_blank');
  };

  const isActive = to && (pathname.endsWith(`/${to}`) || pathname.includes(`/${to}/`));

  const handleClick = () => {
    if (onClick) onClick();
  };

  // WhyHive button
  if (isButton && to && to.includes('whyhive.co')) {
    return (
      <div className={`py-[5px] px-[5px] ${className || ''}`} {...props}>
        <Button
          variant="outline"
          onClick={() => {
            go(to);
            handleClick();
          }}
        >
          {name}
        </Button>
      </div>
    );
  }

  // Regular button
  if (isButton && to && !to.includes('whyhive.co')) {
    return (
      <div className={`py-[5px] px-[5px] ${className || ''}`} {...props}>
        <Button
          size="lg"
          className="min-w-[110px] bg-[#e31337] hover:bg-[#c11129] text-white font-semibold transition-colors duration-200 text-base"
          onClick={() => {
            go(to);
            handleClick();
          }}
        >
          {name}
        </Button>
      </div>
    );
  }

  // External link
  if (!isButton && to && (to.includes('https://') || to.includes('mailto'))) {
    return (
      <div className={`py-[5px] px-[5px] ${className || ''}`} {...props}>
        <a
          className={`transition-all ease-in duration-100 hover:text-[#e31337] ${dark ? 'text-white' : ''}`}
          href={to}
          target="_blank"
          rel="nofollow noopener noreferrer"
          onClick={handleClick}
        >
          {name}
        </a>
      </div>
    );
  }

  // Internal link
  if (!isButton && to && !to.includes('https://') && !to.includes('mailto')) {
    return (
      <div className={`py-[5px] px-[5px] ${className || ''}`} {...props}>
        <Link
          href={`/${to}` as any}
          className={`transition-all ease-in duration-100 hover:text-[#e31337] ${dark ? 'text-white' : ''} ${isActive ? 'text-[#e31337]' : ''}`}
          onClick={handleClick}
        >
          {name}
        </Link>
      </div>
    );
  }

  return null;
};
