import React from 'react';
import { Logo } from '@/components/logo/Logo';
import { FooterNavigation } from './FooterNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SOCIAL_MEDIAS } from '@/lib/data/socialmedias';

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: any[][];
}

export const Footer: React.FC<FooterProps> = ({ items = [], className, ...props }) => {
  return (
    <div className={`w-full bg-black py-10 px-10 max-[600px]:px-6 ${className || ''}`} {...props}>
      <div className="max-w-screen-2xl mx-auto flex flex-row justify-between max-[1000px]:flex-col max-[1000px]:items-center">
        <div className="flex flex-col max-[1000px]:items-center">
          <Logo className="h-[30px] w-[132px] max-[1000px]:mb-[15px]" dark={true} />
          <div className="flex flex-row items-center gap-3 mt-8 mb-6 max-[1000px]:mb-8">
            {SOCIAL_MEDIAS.map((social, index) => (
              <React.Fragment key={social.icon}>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon
                    icon={['fab', social.icon as any]}
                    style={{ height: `20px`, width: `20px` }}
                  />
                </a>
                {index < SOCIAL_MEDIAS.length - 1 && (
                  <div className="w-px h-4 bg-gray-600 opacity-40" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-end w-full ml-[15px] max-[1000px]:mt-5 max-[1000px]:ml-0">
          {items.map((subItems, index) => (
            <FooterNavigation
              key={index}
              items={subItems}
              className="mb-5"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
