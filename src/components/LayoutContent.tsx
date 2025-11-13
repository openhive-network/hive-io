'use client';

import { useEffect } from 'react';
import '@/lib/fontawesome';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { Icon } from '@/components/Icon';
import { NAVIGATION_HEADER_DROPDOWN, NAVIGATION_FOOTER, SOCIAL_MEDIAS } from '@/lib/data/var';
import { useMainStore } from '@/store/useMainStore';

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const initializeApp = useMainStore((state) => state.initializeApp);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header items={NAVIGATION_HEADER_DROPDOWN} />
      <main className="w-full flex flex-col flex-1 justify-start">
        {children}
      </main>
      <div className="p-5 bg-[#212529f0] w-full flex flex-row flex-wrap justify-center">
        {SOCIAL_MEDIAS.map(({ icon, link }) => (
          <Icon
            key={icon}
            className="m-5 [&_path]:fill-white [&_path]:transition-all [&_path]:ease-in [&_path]:duration-100 hover:[&_path]:fill-[#e31337]"
            icon={['fab', icon] as any}
            link={link}
            height={40}
            width={40}
          />
        ))}
      </div>
      <Footer items={NAVIGATION_FOOTER} />
    </div>
  );
}
