'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import CreateHiveAccount from '@/components/join/CreateHiveAccount'
import JoinFlow from '@/components/join/JoinFlow'
import { Toaster } from 'sonner'
import { LogoMarquee } from '@/components/root/LogoMarquee'
import { RegistrationProviders } from '@/components/join/RegistrationProviders'

function JoinContent() {
  const searchParams = useSearchParams()
  const joinData = searchParams.get('join')

  return (
    <div className="flex flex-col min-h-screen">
      {/* Community Bar */}
      <LogoMarquee compact showTitle={false} />

      <div className="flex justify-center w-full py-12 pt-16 px-5 bg-linear-to-b from-gray-900 to-black text-white">
        <div className="flex flex-col items-center w-full max-w-[900px]">
          {joinData ? (
            <JoinFlow encodedData={joinData} />
          ) : (
            <CreateHiveAccount />
          )}
        </div>
      </div>

      {/* Alternative Registration Providers - grows to fill remaining space */}
      <RegistrationProviders className="flex-1" />

      <Toaster position="top-center" richColors theme="dark" />
    </div>
  )
}

export default function JoinPage() {
  return (
    <Suspense fallback={null}>
      <JoinContent />
    </Suspense>
  )
}
