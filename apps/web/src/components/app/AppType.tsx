import React from 'react';
import { TYPE_COLORS } from '@/lib/data/ecosystem';

interface AppTypeProps extends React.HTMLAttributes<HTMLDivElement> {
  appType?: string;
  count?: number;
}

export const AppType: React.FC<AppTypeProps> = ({
  appType = 'app',
  count,
  className,
  onClick,
  ...props
}) => {
  const colors = TYPE_COLORS[appType as keyof typeof TYPE_COLORS] || {
    background: 'rgb(222 222 236)',
    text: 'rgb(96 96 110)'
  };

  return (
    <div
      className={`app-type p-[5px] rounded-md uppercase text-[0.7rem] font-semibold cursor-pointer transition-opacity ${
        count ? 'text-[1.1rem] py-[7px] px-[15px] max-[600px]:text-[0.8rem]' : ''
      } ${className || ''}`}
      style={{
        background: colors.background,
        color: colors.text
      }}
      onClick={onClick}
      {...props}
    >
      {appType}
      {count && <span className="ml-1">({count})</span>}
    </div>
  );
};
