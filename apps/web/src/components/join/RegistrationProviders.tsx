'use client'

import Image from 'next/image'
import { ArrowUpRight, Check, Zap } from 'lucide-react'

interface Provider {
  name: string
  logo: string
  price: string
  isFree: boolean
  features: string[]
  url: string
  payments?: string[]
}

const PROVIDERS: Provider[] = [
  {
    name: 'InLeo',
    logo: '/images/apps/inleo.avif',
    price: 'Free',
    isFree: true,
    features: ['Email, Google or X signup', 'Instant activation'],
    url: 'https://inleo.io/signup',
  },
  {
    name: 'Ecency',
    logo: '/images/apps/ecency.svg',
    price: 'Free',
    isFree: true,
    features: ['Email or crypto wallet', 'Instant activation'],
    url: 'https://ecency.com/signup?referral=ecency',
  },
  {
    name: 'Hivedex',
    logo: '/images/apps/hivedex.png',
    price: '$1.49',
    isFree: false,
    features: ['Anonymous signup', 'Crypto payments'],
    url: 'https://hivedex.io/signup',
    payments: ['ETH', 'BTC', 'SOL', '+more'],
  },
  {
    name: 'Actifit',
    logo: '/images/apps/actifit.png',
    price: '$2',
    isFree: false,
    features: ['Anonymous signup', 'Crypto payments'],
    url: 'https://actifit.io/signup',
    payments: ['HIVE'],
  },
]

interface RegistrationProvidersProps {
  className?: string
}

export function RegistrationProviders({ className }: RegistrationProvidersProps) {
  return (
    <div className={`w-full bg-black py-0 px-5 ${className || ''}`}>
      <div className="max-w-[1000px] mx-auto">
        {/* OR Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-gray-500 text-sm font-medium tracking-wider uppercase">Or</span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Choose a Community Provider
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Independent services with various signup methods and privacy options.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROVIDERS.map((provider) => (
            <a
              key={provider.name}
              href={provider.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-linear-to-b from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-5 hover:border-gray-600 hover:from-gray-800 hover:to-gray-900/80 transition-all duration-300"
            >
              {/* Arrow indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>

              {/* Logo */}
              <div className="flex items-center justify-center h-14 mb-4">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
                  <Image
                    src={provider.logo}
                    alt={provider.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Name & Price */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors">
                  {provider.name}
                </h3>
                <span className={`inline-flex items-center justify-center gap-1.5 min-w-[70px] px-3 py-1 rounded-full text-sm font-medium ${provider.isFree
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-gray-800 text-gray-300 border border-gray-700'
                  }`}>
                  {provider.isFree && <Zap className="h-3.5 w-3.5" />}
                  {provider.price}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-4">
                {provider.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                    <Check className="h-4 w-4 text-gray-600 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Payment methods */}
              {provider.payments && (
                <div className="pt-3 border-t border-gray-800/50">
                  <div className="flex flex-wrap gap-1.5">
                    {provider.payments.map((payment, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs text-gray-500 bg-gray-800/50 rounded"
                      >
                        {payment}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </a>
          ))}
        </div>

        <p className="text-center text-gray-600 text-xs mt-8">
          These are independent community services. Hive.io does not operate or endorse any specific provider.
        </p>
      </div>
    </div>
  )
}
