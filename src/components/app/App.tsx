'use client';

import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAssets } from '@/hooks/useAssets';
import { useMainStore } from '@/store/useMainStore';
import { formatToUnits } from '@/lib/data/util';
import { AppType } from './AppType';
import { Icon } from '../Icon';
import type { IEcoItem, IWallet } from '@/types';

interface AppProps {
  item: IEcoItem | IWallet;
  appType?: string;
  move?: boolean;
  showName?: boolean;
  showTypes?: boolean;
  openModal?: boolean;
  openDetailed?: boolean;
  detailed?: boolean;
  style?: React.CSSProperties;
}

export const App: React.FC<AppProps> = ({
  item,
  appType = '',
  move = false,
  showName = false,
  showTypes = false,
  openModal = false,
  openDetailed = false,
  detailed = false,
  style
}) => {
  const { getImage } = useAssets();
  const [hover, setHover] = useState(false);

  const statsAppsData = useMainStore(state => state.statsAppsData);
  const activeEco = useMainStore(state => state.activeEco);
  const setActiveEco = useMainStore(state => state.setActiveEco);

  const dict: Record<string, string> = { threespeak: '3speak' };

  const stats = useMemo(() => {
    return statsAppsData.find(
      (d: any) => d.name === (dict[item.id] || item.id)
    );
  }, [statsAppsData, item.id]);

  const getAppImage = (image: string) => {
    return getImage(`apps/${image}`);
  };

  const getWebsiteUrl = () => {
    if (typeof item.website === 'string') {
      return item.website;
    }
    // For IWallet with browser-specific URLs, prefer chrome, then firefox, then safari
    return item.website.chrome || item.website.firefox || item.website.safari || '#';
  };

  const onClick = () => {
    if (openDetailed || activeEco.id) {
      setActiveEco(item as IEcoItem);
      if (openDetailed) {
        // router.replace(`/eco/${item.id}`)
      }
    } else {
      setActiveEco(item as IEcoItem);
      // Modal will show automatically
    }
  };

  const isEngrave = item.name === 'Engrave';
  const isDLease = item.name === 'DLease';

  const baseClasses = `flex flex-col items-center justify-center cursor-pointer ${
    detailed ? 'flex-row flex-wrap items-start justify-start cursor-default mx-[30px] my-[15px]' : ''
  }`;

  const innerClasses = `flex justify-center items-center rounded-[15%] bg-[#e2e2ec] h-[110px] w-[110px] p-3 mb-2 transition-transform duration-500 ${
    move && !detailed && hover ? '-translate-y-[10%]' : ''
  }`;

  const innerContent = (
    <div className={`flex h-full w-full ${isEngrave ? 'h-auto' : ''} ${isDLease ? 'justify-center' : ''}`}>
      <img
        src={getAppImage(item.image)}
        alt={item.name}
        className={`h-full w-full ${isEngrave ? '' : 'rounded-[15%]'} ${isDLease ? 'w-auto' : ''}`}
      />
    </div>
  );

  return (
    <div className={baseClasses} style={style}>
      {!openModal && !detailed && !openDetailed ? (
        <a
          href={getWebsiteUrl()}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={innerClasses}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {innerContent}
        </a>
      ) : (
        <div
          className={innerClasses}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={onClick}
        >
          {innerContent}
        </div>
      )}

      <div className={`flex flex-col items-center ${detailed ? 'items-start mt-2.5 ml-5 flex-1' : ''}`}>
        <div className={`flex flex-col flex-wrap items-center ${detailed ? 'flex-row mb-[5px]' : ''}`}>
          {(showName || detailed) && (
            <a
              href={getWebsiteUrl()}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className={`flex items-center mt-0.5 mb-1.5 text-base transition-all ease-in duration-100 ${
                move && !detailed && hover ? 'text-[#e31337]' : ''
              } ${detailed ? 'text-2xl font-semibold' : ''}`}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {item.name}
              {!detailed && !openDetailed && !openModal && (
                <FontAwesomeIcon
                  className="h-2 ml-[5px]"
                  icon={faExternalLinkAlt}
                />
              )}
            </a>
          )}
          {(detailed || showTypes) && (
            <div className={`flex items-center mb-1.5 [&>*:not(:first-child)]:ml-2 ${detailed ? 'ml-3 -mt-0.5' : ''}`}>
              {item.types?.map((t, index) => (
                <AppType key={index} appType={t} />
              ))}
            </div>
          )}
          {detailed && stats && stats.dau && stats.dau.last_month > 10 && (
            <div className="py-[5px] px-2.5 ml-[15px] bg-[#e2e2ec] rounded-[5px] text-[0.8rem] cursor-default mb-1.5 max-[525px]:ml-0">
              {`${formatToUnits(stats.dau.last_month)} Monthly Users`}
            </div>
          )}
        </div>

        {detailed && 'description' in item && item.description && (
          <div>{item.description}</div>
        )}

        {'os' in item && item.os && (
          <div className="flex justify-center items-center mb-0.5">
            {item.os.map((os, index) => (
              <Icon
                key={index}
                icon={os.icon}
                tooltip={os.name}
                height={18}
              />
            ))}
          </div>
        )}

        {('github' in item || 'gitlab' in item) && (item.github || item.gitlab) && (
          <a
            href={item.github || item.gitlab}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex items-center mt-1 text-[0.88rem] opacity-50 transition-all ease-in duration-100 hover:text-[#e31337]"
          >
            Open Source
            <FontAwesomeIcon
              className="h-[7px] ml-[5px]"
              icon={faExternalLinkAlt}
            />
          </a>
        )}

        {'closedSource' in item && item.closedSource && (
          <div className="flex items-center mt-1 text-[0.88rem] opacity-50">
            Closed Source
            <FontAwesomeIcon className="h-[7px] ml-[5px]" icon={faTimes} />
          </div>
        )}

        {detailed && (
          <div className="py-2 px-5 cursor-pointer rounded-[5px] bg-[#757575] w-fit text-white mt-[14px] hover:bg-[#5f5f5f]">
            <a
              href={getWebsiteUrl()}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-white"
            >
              Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
