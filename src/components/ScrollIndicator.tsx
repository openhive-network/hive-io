import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface ScrollIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ className, ...props }) => {
  return (
    <div className={`w-fit cursor-pointer ${className || ''}`} {...props}>
      <FontAwesomeIcon
        className="w-6 h-6 animate-bounce opacity-30"
        icon={faChevronDown}
      />
    </div>
  );
};
