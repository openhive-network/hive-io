import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useAssets } from '@/hooks/useAssets';
import type { IContributor } from '@/types';

interface ContributorsContributorProps {
  contributor?: IContributor;
  className?: string;
}

const links: Record<string, string> = {
  linkedin: 'https://www.linkedin.com/in/',
  hive: 'https://hive.blog/@',
  twitter: 'https://twitter.com/',
};

export const ContributorsContributor: React.FC<ContributorsContributorProps> = ({
  contributor = {} as IContributor,
  className = ''
}) => {
  const { getImage: getAssetImage } = useAssets();

  const getImage = (image: string) => {
    return getAssetImage(`contributors/${image}`);
  };

  const imageUrl = contributor.image
    ? getImage(contributor.image)
    : `https://images.hive.blog/u/${contributor.social?.hive}/avatar/large`;

  return (
    <div className={`flex flex-col flex-nowrap p-[14px] bg-[#e2e2ec] rounded-[5px] max-[720px]:flex-1 ${className}`}>
      <img
        className="min-h-[190px] min-w-[190px] max-h-[190px] max-w-[190px] h-full w-full object-contain rounded-[10px] max-[768px]:max-h-40 max-[768px]:max-w-40 max-[720px]:max-h-full max-[720px]:max-w-full max-[720px]:min-w-[150px] max-[720px]:min-h-[150px]"
        src={imageUrl}
        alt={contributor.name}
      />
      <a
        className="text-[1.2rem] font-bold py-1.5 px-2.5 my-2.5 mx-1 bg-[#f0f0f7] text-[#555555] rounded-[14px_14px_1px_1px] text-center cursor-pointer"
        href={`${links.hive}${contributor.social?.hive}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {contributor.name}
      </a>
      <div className="text-[0.8rem] text-[#787885] text-center">
        {contributor.labels?.join(' & ').replace('Core Developer', 'Core Dev')}
      </div>
      <div className="flex items-center justify-center mt-[5px]">
        {contributor.social && Object.entries(contributor.social).map(([platform, handle]) => (
          <a
            key={platform}
            href={`${links[platform]}${handle}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <FontAwesomeIcon
              className="h-5 w-5 cursor-pointer my-[5px] mx-1.5 opacity-100 text-[#787885]"
              icon={['fab', platform] as any}
            />
          </a>
        ))}
      </div>
    </div>
  );
};
