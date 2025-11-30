'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useVoicesOfHive } from '@/hooks/useVoicesOfHive';

// Whitelist of approved voices
const VOICES_WHITELIST = [
  { author: 'fermionico', permlink: 're-therealwolf-t6couu' },
  { author: 'starkerz', permlink: 're-therealwolf-t6cqv4' },
  { author: 'jza', permlink: 're-therealwolf-20251126t14421725z' },
  { author: 'meno', permlink: 're-therealwolf-t6cq3v' },
  { author: 'vikisecrets', permlink: 're-therealwolf-t6cnr3' },
  { author: 'condeas', permlink: 're-therealwolf-t6cpsz' },
  { author: 'eddiespino', permlink: 're-therealwolf-t6ctt9' },
  { author: 'themarkymark', permlink: 're-therealwolf-t6dd0j' },
  { author: 'sagarkothari88', permlink: 're-therealwolf-t6d7vv' },
  { author: 'neuropoeta', permlink: 're-therealwolf-20251126t1640601z' },
  { author: 'niallon11', permlink: 're-therealwolf-t6cnef' },
  { author: 'sofathana', permlink: 're-therealwolf-t6cpby' },
  { author: 'roundbeargames', permlink: 're-therealwolf-t6d7j1' },
  { author: 'spiritabsolute', permlink: 're-therealwolf-20251127t91213712z' },
  { author: 'davideownzall', permlink: 're-therealwolf-t6ctiw' },
  { author: 'michealb', permlink: 're-therealwolf-t6d2k0' },
  { author: 'zusi78', permlink: 're-therealwolf-20251127t7554254z' },
  { author: 'ben.haase', permlink: 're-therealwolf-2cc1qvawv' },
  { author: 'stresskiller', permlink: 're-therealwolf-t6dsi6' },
  { author: 'ph1102', permlink: 're-therealwolf-t6dtbj' },
  { author: 'shiftrox', permlink: 're-therealwolf-t6dvjx' },
  { author: 'jfuji', permlink: 're-therealwolf-20251127t7121657z' },
  { author: 'palomap3', permlink: 're-therealwolf-t6e7o1' },
  { author: 'meyateingi', permlink: 're-therealwolf-t6ep0f' },
  { author: 'abdullahkr', permlink: 're-therealwolf-t6eugs' },
  { author: 'olagod', permlink: 're-therealwolf-20251128t94315702z' },
  { author: 'steevc', permlink: 're-therealwolf-t6g3t5' },
  { author: 'therealwolf', permlink: 're-therealwolf-t6j8e8' },
  { author: 'relf87', permlink: 're-therealwolf-t6jn6t' },
];

interface RootVoicesOfHiveProps {
  className?: string;
  postAuthor?: string;
  postPermlink?: string;
  rotationInterval?: number;
}

export function RootVoicesOfHive({
  className = '',
  postAuthor = 'therealwolf',
  postPermlink = 'what-is-hive-to-you',
  rotationInterval = 6000,
}: RootVoicesOfHiveProps) {
  const { voices, isLoading, error } = useVoicesOfHive({
    postAuthor,
    postPermlink,
    whitelist: VOICES_WHITELIST,
    maxExcerptLength: 400,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Rotation interval - only runs when visible and not hovering
  useEffect(() => {
    if (!isVisible || isHovering || voices.length <= 1) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % voices.length);
        setIsFading(false);
      }, 300);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [isVisible, isHovering, voices.length, rotationInterval]);

  // Don't render if loading or error or no voices
  if (isLoading) {
    return (
      <div ref={sectionRef} className={`w-full py-24 px-6 sm:px-10 min-h-screen sm:min-h-0 ${className}`}>
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 w-64 bg-gray-200 rounded mx-auto mb-4" />
              <div className="h-6 w-96 bg-gray-200 rounded mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || voices.length === 0) {
    return null;
  }

  const currentVoice = voices[currentIndex];

  return (
    <div ref={sectionRef} className={`w-full py-24 px-6 sm:px-10 min-h-screen sm:min-h-0 ${className}`}>
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl md:text-6xl font-bold text-black">
            Voices of Hive<span className="text-[#e31337]">.</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Real perspectives from community members on what Hive means to them.
          </p>
        </div>

        {/* Rotating Message with Navigation */}
        <div className="flex justify-center items-center gap-2 sm:gap-6">
          {/* Left Arrow */}
          {voices.length > 1 && (
            <button
              onClick={() => {
                setIsFading(true);
                setTimeout(() => {
                  setCurrentIndex((prev) => (prev - 1 + voices.length) % voices.length);
                  setIsFading(false);
                }, 300);
              }}
              className="p-2 sm:p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="Previous voice"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
          )}

          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`max-w-3xl w-full min-h-[280px] sm:min-h-[300px] transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
          >
            {/* Message Bubble with Author inside */}
            <div className="relative bg-gray-50 rounded-2xl px-6 py-5 sm:px-8 sm:py-6">
              {/* Author - Inside bubble */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white">
                  <Image
                    src={currentVoice.avatarUrl}
                    alt={currentVoice.author}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <a
                  href={`https://peakd.com/@${currentVoice.author}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-gray-900 hover:text-[#e31337] transition-colors"
                >
                  @{currentVoice.author}
                </a>
              </div>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {currentVoice.excerpt}
              </p>
              {currentVoice.excerpt.endsWith('...') && (
                <a
                  href={currentVoice.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Read more <ChevronRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Right Arrow */}
          {voices.length > 1 && (
            <button
              onClick={() => {
                setIsFading(true);
                setTimeout(() => {
                  setCurrentIndex((prev) => (prev + 1) % voices.length);
                  setIsFading(false);
                }, 300);
              }}
              className="p-2 sm:p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="Next voice"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>

      </div>

      {/* Link to full post - Bottom of section */}
      <div className="text-center mt-12">
        <a
          href={`https://peakd.com/@${postAuthor}/${postPermlink}#comments`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-[#e31337] transition-colors"
        >
          Read all responses →
        </a>
      </div>
    </div>
  );
}
