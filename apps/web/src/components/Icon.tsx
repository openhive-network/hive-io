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
  const anchorRef = useRef<HTMLElement>(null);
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

  if (!icon) {
    return null;
  }

  if (!link) {
    return (
      <span
        ref={anchorRef as React.RefObject<HTMLSpanElement | null>}
        style={{ height: `${height}px`, display: 'inline-block', ...style }}
        title={tooltip}
        className={className}
        {...props}
      >
        <FontAwesomeIcon
          icon={icon}
          style={{ height: `${height}px`, width: `${width}px` }}
        />
      </span>
    );
  }

  return (
    <a
      ref={anchorRef as React.RefObject<HTMLAnchorElement | null>}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
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
