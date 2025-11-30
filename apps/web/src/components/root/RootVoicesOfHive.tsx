'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useVoicesOfHive } from '@/hooks/useVoicesOfHive';

interface RootVoicesOfHiveProps {
  className?: string;
  excludeAuthors?: string[];
  excludePermlinks?: string[];
  postAuthor?: string;
  postPermlink?: string;
  rotationInterval?: number;
}

export function RootVoicesOfHive({
  className = '',
  excludeAuthors = [],
  excludePermlinks = [],
  postAuthor = 'therealwolf',
  postPermlink = 'what-is-hive-to-you',
  rotationInterval = 6000,
}: RootVoicesOfHiveProps) {
  const { voices, isLoading, error } = useVoicesOfHive({
    postAuthor,
    postPermlink,
    excludeAuthors,
    excludePermlinks,
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
      <div ref={sectionRef} className={`w-full py-24 px-6 sm:px-10 ${className}`}>
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
    <div ref={sectionRef} className={`w-full py-24 px-6 sm:px-10 ${className}`}>
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
            {/* Author - Top */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-gray-100">
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

            {/* Message Bubble */}
            <div className="relative bg-gray-50 rounded-2xl rounded-tl-sm px-6 py-5 sm:px-8 sm:py-6">
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
