'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo/Logo';
import { ScrollIndicator } from '@/components/ScrollIndicator';
import { RootDPoS, RootDPoSHandle } from '@/components/root/RootDPoS';
import { RootEco } from '@/components/root/RootEco';
import { RootHistory } from '@/components/root/RootHistory';
import { LogoMarquee } from '@/components/root/LogoMarquee';
import { TokenCard } from '@/components/cards/TokenCard';
import { useAssets } from '@/hooks/useAssets';
import { useTVL } from '@/hooks/useTVL';
import { EXCHANGES } from '@/lib/data/var';
import { useState, useRef, useEffect, useCallback } from 'react';
import type { DynamicGlobalProperties } from '@hiveio/hive-lib';

// Live Activity Components
import { DynamicHero } from '@/components/hero/DynamicHero';

interface TokenParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  type: 'hive' | 'hbd';
}

export default function HomePage() {
  const router = useRouter();
  const t = useTranslations();
  const { getImage } = useAssets();
  const [particles, setParticles] = useState<TokenParticle[]>([]);
  const hiveCardRef = useRef<HTMLDivElement>(null);
  const hbdCardRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);
  const animationFrameRef = useRef<number>(null);
  const dposRef = useRef<RootDPoSHandle>(null);
  const hasTriggeredRef = useRef<{ hive: boolean; hbd: boolean }>({ hive: false, hbd: false });
  const [globalProps, setGlobalProps] = useState<DynamicGlobalProperties | null>(null);
  const [hiveFundBalance, setHiveFundBalance] = useState<{ hiveBalance: number; hbdBalance: number } | null>(null);

  // Fetch TVL data for locked amounts
  const { tvl } = useTVL({ updateInterval: 60000 });

  // Callback to pass new block info from DynamicHero to RootDPoS
  const handleNewBlock = useCallback((blockNum: number, witness: string) => {
    dposRef.current?.addBlock(blockNum, witness);
  }, []);

  // Callback to receive global props from DynamicHero
  const handleGlobalProps = useCallback((props: DynamicGlobalProperties) => {
    setGlobalProps(props);
  }, []);

  // Callback to receive hive.fund balance from DynamicHero
  const handleHiveFundBalance = useCallback((balance: { hiveBalance: number; hbdBalance: number }) => {
    setHiveFundBalance(balance);
  }, []);

  // Parse supply values from global props (format: "123.456 HIVE" or {amount, nai, precision})
  const parseSupply = (supply: unknown): number => {
    if (!supply) return 0;
    // Handle string format: "123.456 HIVE"
    if (typeof supply === 'string') {
      return parseFloat(supply.split(' ')[0]) || 0;
    }
    // Handle object format: { amount: "123456", nai: "@@000000021", precision: 3 }
    if (typeof supply === 'object' && supply !== null && 'amount' in supply) {
      const obj = supply as { amount: string; precision?: number };
      const amount = parseInt(obj.amount, 10);
      const precision = obj.precision ?? 3;
      return amount / Math.pow(10, precision);
    }
    return 0;
  };

  // Calculate token supply data (subtract hive.fund balance for circulating supply)
  const hiveSupply = parseSupply(globalProps?.current_supply) - (hiveFundBalance?.hiveBalance ?? 0);
  const hbdSupply = parseSupply(globalProps?.current_hbd_supply) - (hiveFundBalance?.hbdBalance ?? 0);
  const hiveLocked = tvl ? tvl.hpAmount + tvl.hiveSavings : 0;
  const hbdLocked = tvl?.hbdSavings || 0;

  const go = (link: string) => {
    window.open(link, '_blank');
  };

  const getExchangeImage = (image: string) => {
    return getImage(`exchanges/${image}`);
  };

  // Particle animation loop
  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.4,
            rotation: p.rotation + p.rotationSpeed,
          }))
          .filter((p) => p.y < window.innerHeight + 100)
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Spawn particles from around the Buy button (once per page view)
  const spawnParticleBurst = (
    rect: DOMRect,
    type: 'hive' | 'hbd'
  ) => {
    if (hasTriggeredRef.current[type]) return;
    hasTriggeredRef.current[type] = true;

    const newParticles: TokenParticle[] = [];
    const count = 5 + Math.floor(Math.random() * 3); // 5-7 particles

    for (let i = 0; i < count; i++) {
      // Pick a random edge (0: top, 1: right, 2: bottom, 3: left)
      const edge = Math.floor(Math.random() * 4);
      let x: number, y: number, vx: number, vy: number;

      switch (edge) {
        case 0: // top edge
          x = rect.left + Math.random() * rect.width;
          y = rect.top;
          vx = (Math.random() - 0.5) * 3;
          vy = -2 - Math.random() * 2;
          break;
        case 1: // right edge
          x = rect.right;
          y = rect.top + Math.random() * rect.height;
          vx = 2 + Math.random() * 2;
          vy = (Math.random() - 0.5) * 3;
          break;
        case 2: // bottom edge
          x = rect.left + Math.random() * rect.width;
          y = rect.bottom;
          vx = (Math.random() - 0.5) * 3;
          vy = 1 + Math.random() * 2;
          break;
        default: // left edge
          x = rect.left;
          y = rect.top + Math.random() * rect.height;
          vx = -2 - Math.random() * 2;
          vy = (Math.random() - 0.5) * 3;
          break;
      }

      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        vx,
        vy,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        type,
      });
    }

    setParticles((prev) => [...prev, ...newParticles].slice(-30));
  };

  return (
    <div className="h-full">
      <div
        className="flex flex-1 flex-col items-center pt-10 max-[600px]:pt-0 pb-0 relative"
      >
        {/* Dynamic Hero with Live Block Number and Activities */}
        <DynamicHero onNewBlock={handleNewBlock} onGlobalProps={handleGlobalProps} onHiveFundBalance={handleHiveFundBalance} tvl={tvl} />
      </div>

      {/* Token Showcase Section */}
      <div className="w-full bg-linear-to-b from-gray-900 to-black py-24 px-6 sm:px-10">
        <div className="max-w-screen-2xl mx-auto min-h-[480px] flex flex-col justify-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-16">
            Tokenomics<span className="text-[#e31337]">.</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* HIVE Token Card */}
            <TokenCard
              ref={hiveCardRef}
              name="HIVE"
              subtitle="Utility & Governance"
              iconSrc={getImage('circle_hive_red.png')}
              color="#e31337"
              colorRgb="227,19,55"
              features={[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  text: 'Powers all transactions',
                },

                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  text: 'Stake to vote on governance',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  text: (
                    <span className="flex items-center gap-2">
                      Up to <span className="text-2xl font-bold mt-[-2px] text-hive-red">20%</span> Staking Rewards
                    </span>
                  ),
                },
              ]}
              totalSupply={hiveSupply}
              lockedAmount={hiveLocked}
              chartLabel="Staked"
              onBuyHover={(rect) => spawnParticleBurst(rect, 'hive')}
            />

            {/* HBD Token Card */}
            <TokenCard
              ref={hbdCardRef}
              name="HBD"
              subtitle="Stablecoin"
              iconSrc={getImage('hbd.svg')}
              color="#10b981"
              colorRgb="16,185,129"
              features={[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  text: 'Algorithmic peg to USD',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  text: 'Backed by HIVE',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                  text: (
                    <span className="flex items-center gap-2">
                      Earn <span className="text-2xl font-bold mt-[-2px] text-emerald-400">15%</span> APR
                    </span>
                  ),
                },
              ]}
              totalSupply={hbdSupply}
              lockedAmount={hbdLocked}
              chartLabel="Staked"
              onBuyHover={(rect) => spawnParticleBurst(rect, 'hbd')}
              buyUrl="https://hivedex.io/"
            />
          </div>
        </div>
      </div>

      {/* History Section */}
      <RootHistory className="bg-white" />

      {/* Community Section */}
      <LogoMarquee />

      {/* Ecosystem */}
      <RootEco id="ecosystem-section" className="bg-white" />

      {/* DPoS Visualization */}
      <RootDPoS ref={dposRef} />

      {/* Exchanges */}
      <div id="exchanges" className="w-full bg-linear-to-b from-gray-900 to-black py-32 px-6 sm:px-10">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              {t('root.exchanges.title')}
            </h2>
            <p className="text-l text-gray-400 max-w-[700px] mx-auto leading-relaxed">
              {t('root.exchanges.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {EXCHANGES.map((exchange) => (
              <a
                key={exchange.id}
                className="flex items-center justify-center h-20 w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] md:w-[calc(25%-12px)] lg:w-[calc(20%-13px)] xl:w-[calc(16.666%-14px)] bg-white/5 border border-white/10 rounded-xl transition-colors duration-200 hover:bg-white/10 hover:border-white/20"
                href={exchange.website}
                target="_blank"
                rel="nofollow noopener noreferrer"
                title={exchange.name}
              >
                <img
                  src={getExchangeImage(exchange.image)}
                  alt={exchange.name}
                  className="max-h-8 max-w-[65%] object-contain opacity-70"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Token Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
          }}
        >
          <img
            src={getImage(particle.type === 'hive' ? 'circle_hive_red.png' : 'hbd.svg')}
            alt={particle.type.toUpperCase()}
            className="w-8 h-8 opacity-80"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          />
        </div>
      ))}
    </div >
  );
}
