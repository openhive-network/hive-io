import React, { useMemo } from 'react';
import { UPDATES } from '@/lib/data/updates';
import { UpdatesUpdate } from './UpdatesUpdate';

export const Updates: React.FC = () => {
  const UPDATES_PROCESSED = useMemo(() => {
    return UPDATES.map((v) => {
      if (v.video) {
        v.video = v.video
          .replace('youtube.', 'youtube-nocookie.')
          .replace('youtu.be/', 'www.youtube-nocookie.com/embed/')
          .replace('/watch?v=', '/embed/')
          .replace('&t=', '?start=');
      }
      return v;
    });
  }, []);

  return (
    <div className="flex flex-col flex-nowrap items-center max-w-[1200px] w-full">
      <h2 className="text-center mb-10">Newest Updates</h2>
      <UpdatesUpdate item={UPDATES_PROCESSED[0]} big={true} />

      <div className="flex w-full flex-row flex-wrap justify-center [&>*]:my-2.5 [&>*]:mx-[15px]">
        {UPDATES_PROCESSED.slice(1, UPDATES_PROCESSED.length).map((update, index) => (
          <UpdatesUpdate
            key={index}
            item={update}
          />
        ))}
      </div>
    </div>
  );
};
