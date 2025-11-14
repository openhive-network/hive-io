'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useAssets } from '@/hooks/useAssets';
import { ABOUT_NAVIGATION } from '@/lib/data/navigation';
import { ABOUT_VIDEOS } from '@/lib/data/videos';

export default function AboutPage() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const { getImage } = useAssets();

  const featuredVideo = ABOUT_VIDEOS.find(v => v.featured);
  const gridVideos = ABOUT_VIDEOS.filter(v => !v.featured);

  return (
    <div className="flex justify-center w-full min-h-[calc(100vh-80px)] py-20 px-5">
      <div className="flex flex-col items-center w-full max-w-[900px]">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-[4rem] font-bold leading-tight mb-6 max-[600px]:text-[3rem]">
            {t('about.title')}<span className="text-[#e31337]">3</span>
          </h1>
          <p className="text-xl max-w-[700px] text-[#555] leading-relaxed">
            {t('about.text')}
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 gap-16 w-full mt-8">
          {/* Fast */}
          <div className="flex flex-col">
            <h2 className="text-[3.8rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('about.featureFast')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[6px] w-[80px] bg-[#e31337]"></div>
            </h2>
            <p className="text-xl text-[#555] leading-relaxed max-w-[700px] mt-2">
              {t('about.featureFastText')}
            </p>
          </div>

          {/* Scalable */}
          <div className="flex flex-col">
            <h2 className="text-[3.8rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('about.featureScalable')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[6px] w-[80px] bg-[#e31337]"></div>
            </h2>
            <p className="text-xl text-[#555] leading-relaxed max-w-[700px] mt-2">
              {t('about.featureScalableText')}
            </p>
          </div>

          {/* Powerful */}
          <div className="flex flex-col">
            <h2 className="text-[3.8rem] font-bold leading-tight mb-4 relative inline-block w-fit">
              {t('about.featurePowerful')}<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[6px] w-[80px] bg-[#e31337]"></div>
            </h2>
            <p className="text-xl text-[#555] leading-relaxed max-w-[700px] mt-2">
              {t('about.featurePowerfulText')}
            </p>
          </div>

          {/* Video Showcase */}
          <div className="flex flex-col mt-8">
            <h2 className="text-[3.8rem] font-bold leading-tight mb-8 relative inline-block w-fit">
              Learn More<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[6px] w-[80px] bg-[#e31337]"></div>
            </h2>

            <div className="w-full space-y-6">
              {/* Featured Video */}
              {featuredVideo && (
                <div className="w-full">
                  <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-300">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full border-0"
                      src={`https://www.youtube.com/embed/${featuredVideo.videoId}`}
                      title={featuredVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h3 className="text-2xl font-semibold mt-5 mb-2">{featuredVideo.title}</h3>
                  <p className="text-base text-[#666] leading-relaxed">
                    {featuredVideo.description}
                  </p>
                </div>
              )}

              {/* Grid of Additional Videos */}
              {gridVideos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {gridVideos.map((video) => (
                    <div key={video.videoId} className="w-full">
                      <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full border-0"
                          src={`https://www.youtube.com/embed/${video.videoId}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <h4 className="text-lg font-semibold mt-4">{video.title}</h4>
                      <p className="text-sm text-[#666] mt-1">{video.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
