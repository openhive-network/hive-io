'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import CreateHiveAccount from '@/components/join/CreateHiveAccount'
import JoinFlow from '@/components/join/JoinFlow'
import { Toaster } from 'sonner'
import { LogoMarquee } from '@/components/root/LogoMarquee'
import { RegistrationProviders } from '@/components/join/RegistrationProviders'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const FAQ_ITEMS = [
  {
    question: "What is a Hive account?",
    answer: "A Hive account is your identity on the Hive blockchain. It gives you access to all Hive-powered apps and services, lets you earn cryptocurrency for your content, and puts you in control of your data. Unlike traditional social media, your account is truly yours - no company can ban or delete it."
  },
  {
    question: "Why do I need someone to create my account?",
    answer: "Creating a Hive account requires a small amount of resources on the blockchain. Community providers and existing users can sponsor new accounts for free using account creation tokens they've earned. This system prevents spam while keeping Hive accessible to everyone."
  },
  {
    question: "What's the difference between the signup options?",
    answer: "Community providers (InLeo, Ecency, etc.) offer instant signup through their platforms - just create an account and start using Hive immediately. The sponsored option lets you generate your own secure keys and have an existing Hive user create your account, giving you more control over your credentials."
  },
  {
    question: "What are Hive keys and why are they important?",
    answer: "Hive uses cryptographic keys instead of passwords. You'll have different keys for different actions: Posting key for social activities, Active key for wallet operations, and Owner key for account recovery. Keep your keys safe - they cannot be reset like traditional passwords."
  },
]

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

          {/* FAQ Section */}
          <div className="w-full bg-black pt-16 px-5">
            <div className="max-w-[800px] mx-auto">

              <Accordion type="single" collapsible className="w-full">
                {FAQ_ITEMS.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-gray-800"
                  >
                    <AccordionTrigger className="text-white hover:no-underline hover:text-gray-300 text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

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
                  Get sponsored by an existing Hive member.
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
