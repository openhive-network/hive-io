'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CORE_DEV_MEETINGS } from '@/lib/data/coredevmeetings';

export default function CoreDevMeetingsPage() {
  const t = useTranslations();

  // Get the latest meeting (first in the array) and the next two
  const latestMeeting = CORE_DEV_MEETINGS[0];
  const gridMeetings = CORE_DEV_MEETINGS.slice(1, 3);

  return (
    <div className="flex justify-center w-full min-h-[calc(100vh-80px)] py-20 px-5">
      <div className="flex flex-col items-center w-full max-w-[900px]">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-[4rem] font-bold leading-tight mb-6 max-[600px]:text-[3rem]">
            Core Dev Meetings<span className="text-[#e31337]">.</span>
          </h1>
          <p className="text-xl max-w-[700px] text-[#555] leading-relaxed">
            Watch recordings of Hive core developer meetings to stay updated on the latest technical developments and discussions.
          </p>
        </div>

        {/* Meetings Section */}
        <div className="grid grid-cols-1 gap-16 w-full mt-8">
          <div className="flex flex-col">
            <h2 className="text-[3.8rem] font-bold leading-tight mb-8 relative inline-block w-fit">
              Latest Meetings<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[6px] w-[80px] bg-[#e31337]"></div>
            </h2>

            <div className="w-full space-y-6">
              {/* Featured Video - Latest Meeting */}
              {latestMeeting && (
                <div className="w-full">
                  <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-300">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full border-0"
                      src={`https://www.youtube.com/embed/${latestMeeting.videoId}`}
                      title={latestMeeting.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h3 className="text-2xl font-semibold mt-5 mb-2">{latestMeeting.title}</h3>
                  <p className="text-base text-[#666] leading-relaxed">
                    The most recent core developer meeting discussing Hive blockchain development, updates, and technical decisions.
                  </p>
                </div>
              )}

              {/* Grid of Recent Meetings */}
              {gridMeetings.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {gridMeetings.map((meeting) => (
                    <div key={meeting.videoId} className="w-full">
                      <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full border-0"
                          src={`https://www.youtube.com/embed/${meeting.videoId}`}
                          title={meeting.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <a
                  href="https://www.youtube.com/@Hivenetwork/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#e31337] hover:underline font-medium text-lg"
                >
                  View All Meetings on YouTube →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
