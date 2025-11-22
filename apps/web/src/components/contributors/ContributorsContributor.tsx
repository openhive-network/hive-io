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
    <div className={`group flex flex-col items-center p-2.5 bg-[#e2e2ec] rounded-lg w-[115px] max-[600px]:w-[95px] ${className}`}>
      <a
        href={`${links.hive}${contributor.social?.hive}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="block"
      >
        <img
          className="h-[85px] w-[85px] max-[600px]:h-[70px] max-[600px]:w-[70px] object-cover rounded-full"
          src={imageUrl}
          alt={contributor.name}
        />
      </a>
      <a
        className="mt-2 text-[0.8rem] max-[600px]:text-[0.7rem] font-semibold text-[#555] text-center leading-tight hover:text-[#e31337] transition-colors truncate w-full"
        href={`${links.hive}${contributor.social?.hive}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {contributor.name}
      </a>
      <div className="mt-0.5 text-[0.65rem] max-[600px]:text-[0.55rem] text-[#787885] text-center leading-tight line-clamp-2 min-h-[2lh]">
        {contributor.labels?.join(' & ').replace('Core Developer', 'Core Dev')}
      </div>
      <div className="flex items-center justify-center mt-1.5 gap-1">
        {contributor.social && Object.entries(contributor.social).map(([platform, handle]) => (
          <a
            key={platform}
            href={`${links[platform]}${handle}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-[#787885] hover:text-[#e31337] transition-colors"
          >
            <FontAwesomeIcon
              className="h-3.5 w-3.5"
              icon={['fab', platform] as any}
            />
          </a>
        ))}
      </div>
    </div>
  );
};
