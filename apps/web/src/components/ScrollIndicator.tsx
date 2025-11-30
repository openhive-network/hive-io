import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface ScrollIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollToSelector?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  className,
  scrollToSelector,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollToSelector) {
      const element = document.querySelector(scrollToSelector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={`w-fit cursor-pointer ${className || ''}`}
      onClick={handleClick}
      {...props}
    >
      <FontAwesomeIcon
        className="animate-bounce opacity-30 hover:opacity-50 transition-opacity"
        style={{ width: '36px', height: '36px' }}
        icon={faChevronDown}
      />
    </div>
  );
};
