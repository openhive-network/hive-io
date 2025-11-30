'use client';

import { useEffect } from 'react';
import '@/lib/fontawesome';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { NAVIGATION_HEADER_DROPDOWN, NAVIGATION_FOOTER } from '@/lib/data/var';
import { useMainStore } from '@/store/useMainStore';
import { AuthProvider } from '@/lib/auth';

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const initializeApp = useMainStore((state) => state.initializeApp);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col items-center">
        <Header items={NAVIGATION_HEADER_DROPDOWN} />
        <main className="w-full flex flex-col flex-1 justify-start">
          {children}
        </main>
        <Footer items={NAVIGATION_FOOTER} />
      </div>
    </AuthProvider>
  );
}
