'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { useAssets } from '@/hooks/useAssets';

interface StatWebsiteProps {
  item?: any;
  transparent?: boolean;
}

export const StatWebsite: React.FC<StatWebsiteProps> = ({
  item = {},
  transparent = false
}) => {
  const { getImage: getAssetImage } = useAssets();
  const [hover, setHover] = useState(false);

  const getImage = (image: string) => {
    return getAssetImage(`websites/${image}`);
  };

  const isDarkBackground = item.id === 'dapp-review' || item.id === 'stateofthedapps';
  const isWhiteBackground = item.id === 'dapp-com' || item.id === 'hivedapps-com';

  return (
    <div className="flex flex-col items-center justify-center mx-10 my-[25px] max-[525px]:mx-5 max-[525px]:my-5 max-[525px]:mb-10 max-[425px]:mx-[15px] max-[425px]:my-[15px] max-[425px]:mb-[30px]">
      <a
        href={item.website}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={`flex justify-center items-center rounded-[10px] h-[60px] w-[250px] p-3 mb-2 transition-transform duration-500 shadow-[0px_0px_15px_rgba(0,0,0,0.03)] hover:-translate-y-[10%] ${hover ? '-translate-y-[10%]' : ''
          } ${transparent
            ? 'bg-transparent shadow-[0px_0px_15px_rgba(0,0,0,0.2)]'
            : isDarkBackground
              ? 'bg-[#2e3135]'
              : isWhiteBackground
                ? 'bg-white'
                : 'bg-gray-200'
          }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex justify-self-center h-full w-full max-h-[40px]">
          <img src={getImage(item.image)} alt={item.name} className="h-full w-full object-contain" />
        </div>
      </a>

      <a
        href={item.website}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={`flex items-center mt-0.5 mb-1.5 text-xl transition-all ease-in duration-100 hover:text-[#e31337] ${hover ? 'text-[#e31337]' : ''
          }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {item.name}
        <FontAwesomeIcon
          className="h-2 ml-[5px]"
          icon={faExternalLinkAlt}
        />
      </a>

      {(item.github || item.gitlab) && (
        <a
          href={item.github || item.gitlab}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="flex items-center mt-1 text-[0.88rem] transition-all ease-in duration-100 hover:text-[#e31337]"
        >
          {item.github ? 'Github' : 'Gitlab'}
          <FontAwesomeIcon
            className="h-[7px] ml-[5px]"
            icon={faExternalLinkAlt}
          />
        </a>
      )}
    </div>
  );
};
