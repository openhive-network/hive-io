import React from 'react';
import { CONTRIBUTOR_LABELS } from '@/lib/data/var';

interface ContributorLabelProps {
  label?: string;
  count?: number;
  className?: string;
  onClick?: () => void;
}

export const ContributorLabel: React.FC<ContributorLabelProps> = ({
  label = '',
  count,
  className = '',
  onClick
}) => {
  const colors = CONTRIBUTOR_LABELS[label as keyof typeof CONTRIBUTOR_LABELS] || {
    background: 'transparent',
    text: 'inherit'
  };

  return (
    <div
      className={`p-[5px] rounded-md uppercase text-[0.7rem] font-semibold cursor-pointer ${
        count ? 'text-base py-[7px] px-[15px] max-[768px]:text-[0.8rem]' : ''
      } max-[768px]:w-[calc(50%-42px)] ${className}`}
      style={{
        background: colors.background,
        color: colors.text
      }}
      onClick={onClick}
    >
      {label}
      {count && <span>({count})</span>}
    </div>
  );
};
