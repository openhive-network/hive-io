import React from 'react';
import { useAssets } from '@/hooks/useAssets';

export const Video: React.FC = () => {
  const { getVideo } = useAssets();

  return (
    <video className="w-full -mt-8 border border-black rounded-[10px] max-w-[640px] md:mt-10 md:mb-2.5" controls>
      <source src={getVideo('marketing.mp4')} type="video/mp4" />
    </video>
  );
};
