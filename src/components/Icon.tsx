'use client';

import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import tippy, { type Instance } from 'tippy.js';

interface IconProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  icon?: IconDefinition | [IconPrefix, IconName];
  link?: string;
  height?: number;
  width?: number;
  tooltip?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  link,
  height = 30,
  width = 30,
  tooltip,
  className,
  style,
  ...props
}) => {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const tippyInstanceRef = useRef<Instance | null>(null);

  useEffect(() => {
    if (tooltip && anchorRef.current) {
      tippyInstanceRef.current = tippy(anchorRef.current, {
        placement: 'bottom',
        arrow: true,
        content: tooltip,
        trigger: 'mouseenter focus',
      });
    }

    return () => {
      if (tippyInstanceRef.current) {
        tippyInstanceRef.current.destroy();
      }
    };
  }, [tooltip]);

  if (!icon || !link) {
    return null;
  }

  return (
    <a
      ref={anchorRef}
      href={link}
      target="_blank"
      rel="nofollow noopener noreferrer"
      style={{ height: `${height}px`, ...style }}
      title={tooltip}
      className={className}
      {...props}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{ height: `${height}px`, width: `${width}px` }}
      />
    </a>
  );
};
