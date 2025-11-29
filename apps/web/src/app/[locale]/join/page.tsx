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

      {joinData ? (
        // JoinFlow view - when someone is completing an account creation request
        <div className="flex justify-center w-full py-12 pt-16 px-5 bg-linear-to-b from-gray-900 to-black text-white flex-1">
          <div className="flex flex-col items-center w-full max-w-[900px]">
            <JoinFlow encodedData={joinData} />
          </div>
        </div>
      ) : (
        // Default view - providers first, then self-service
        <>
          {/* Community Providers - Primary option */}
          <RegistrationProviders className="pt-20" showTitle />

          {/* Divider */}
          <div className="w-full bg-black pt-16 pb-8 px-5">
            <div className="max-w-[1000px] mx-auto">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-800" />
                <span className="text-gray-500 text-sm font-medium tracking-wider uppercase">Or</span>
                <div className="flex-1 h-px bg-gray-800" />
              </div>
            </div>
          </div>

          {/* Self-service account creation - requires sponsorship */}
          <div className="flex justify-center w-full py-8 pb-16 px-5 bg-black text-white flex-1">
            <div className="flex flex-col items-center w-full max-w-[900px]">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Already know someone on Hive?
                </h2>
                <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                  Choose this option to get sponsored by an existing Hive member.
                </p>
              </div>
              <CreateHiveAccount />
            </div>
          </div>
        </>
      )}

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
