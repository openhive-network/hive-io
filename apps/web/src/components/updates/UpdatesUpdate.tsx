import React from 'react';

interface UpdatesUpdateProps {
  item?: any;
  big?: boolean;
  className?: string;
}

export const UpdatesUpdate: React.FC<UpdatesUpdateProps> = ({
  item = {},
  big = false,
  className = ''
}) => {
  return (
    <div className={`flex flex-col mb-2.5 w-fit h-fit bg-gray-200 rounded-[10px] ${big ? 'mb-10' : ''} ${className}`}>
      <div className="font-bold mb-2.5 text-xl pt-3 pr-2 pb-1 pl-[26px] text-[#555555]">{item.title}</div>
      {item.video && (
        <iframe
          src={item.video}
          frameBorder="0"
          className={`!max-w-full h-full w-full rounded-[0_0_10px_10px] bg-[rgba(33,37,41,0.6)] min-[360px]:w-[360px] min-[360px]:h-[205px] max-[360px]:!w-[360px] max-[360px]:!h-[205px] ${big ? '!w-[793px] !h-[471px]' : ''
            }`}
          allowFullScreen
        />
      )}
    </div>
  );
};
