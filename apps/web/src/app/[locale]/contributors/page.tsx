'use client';

import React, { Suspense } from 'react';
import { Contributors } from '@/components/contributors/Contributors';

export default function ContributorsPage() {
  return (
    <div className="flex justify-center w-full min-h-[calc(100vh-80px)] py-20 px-5">
      <div className="flex flex-col items-center w-full max-w-[1200px]">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <Contributors />
        </Suspense>
      </div>
    </div>
  );
}
