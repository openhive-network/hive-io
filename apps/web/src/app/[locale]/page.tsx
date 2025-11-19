'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo/Logo';
import { ScrollIndicator } from '@/components/ScrollIndicator';
import { RootEco } from '@/components/root/RootEco';
import { useAssets } from '@/hooks/useAssets';
import { EXCHANGES } from '@/lib/data/var';
import { useState, useRef, useEffect } from 'react';

// Live Activity Components
import { DynamicHero } from '@/components/hero/DynamicHero';

interface MoneyParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
}

export default function HomePage() {
  const router = useRouter();
  const t = useTranslations();
  const { getImage } = useAssets();
  const [particles, setParticles] = useState<MoneyParticle[]>([]);
  const defiCardRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);
  const animationFrameRef = useRef<number>(null);
  const isHoveringRef = useRef(false);
  const lastParticleTimeRef = useRef(0);

  const go = (link: string) => {
    window.open(link, '_blank');
  };

  const getExchangeImage = (image: string) => {
    return getImage(`exchanges/${image}`);
  };

  // Particle animation loop for DeFi card
  useEffect(() => {
    const animate = () => {
      const updateParticles = (prev: MoneyParticle[]) => {
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.5, // gravity
            rotation: p.rotation + p.rotationSpeed,
          }))
          .filter((p) => p.y < window.innerHeight + 100); // remove off-screen particles
      };

      setParticles(updateParticles);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Mouse move handler for DeFi card (HBD particles)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHoveringRef.current || !defiCardRef.current) return;

    // Throttle particle creation - only create one every 50ms
    const now = Date.now();
    if (now - lastParticleTimeRef.current < 50) return;
    lastParticleTimeRef.current = now;

    // Create particle at cursor position
    const newParticle: MoneyParticle = {
      id: particleIdRef.current++,
      x: e.clientX,
      y: e.clientY,
      vx: (Math.random() - 0.5) * 4,
      vy: -Math.random() * 3 - 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
    };

    setParticles((prev) => [...prev, newParticle]);

    // Limit particles
    if (particles.length > 40) {
      setParticles((prev) => prev.slice(-40));
    }
  };

  return (
    <div className="h-full">
      <div
        className="flex flex-1 flex-col items-center justify-center pt-[60px] px-5 pb-0 relative"
        style={{ minHeight: 'calc(100vh - 80px)' }}
      >
        {/* Dynamic Hero with Live Block Number and Activities */}
        <DynamicHero />
      </div>

      {/* Ecosystem */}
      <RootEco id="ecosystem-section" className="bg-[#e7e7f1]" />

      {/* Core Features Section */}
      <div className="w-full py-32 px-5">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Why Hive?
          </h2>
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Fast & Free */}
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-300 rounded-xl p-8 transition-all duration-300 hover:border-blue-400">
              <div className="flex items-center justify-center w-20 h-20 mb-6 mx-auto">
                <img className="w-full h-full object-contain" src={getImage('fees.png')} alt="No fees" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t('root.feeTitle')}</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-3 text-center">
                {t('root.feeText')}
              </p>
              <p className="text-sm text-gray-600 text-center">
                {t('root.feeText2')}
              </p>
            </div>

            {/* Feature 2: Decentralized */}
            <div className="group bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-300 rounded-xl p-8 transition-all duration-300 hover:border-purple-400">
              <div className="flex items-center justify-center w-20 h-20 mb-6 mx-auto">
                <img className="w-full h-full object-contain" src={getImage('decentralized.png')} alt="Decentralized" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t('root.decTitle')}</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-3 text-center">
                {t('root.decText')}
              </p>
              <p className="text-sm text-gray-600 text-center">
                {t('root.decText2')}
              </p>
            </div>

            {/* Feature 3: DeFi Made Simple */}
            <div
              ref={defiCardRef}
              className="group bg-gradient-to-br from-emerald-50 to-teal-100 border-2 border-emerald-300 rounded-xl p-8 transition-all duration-300 hover:border-emerald-400 relative overflow-hidden cursor-pointer"
              onMouseEnter={() => { isHoveringRef.current = true; }}
              onMouseLeave={() => { isHoveringRef.current = false; }}
              onMouseMove={handleMouseMove}
            >
              <div className="flex items-center justify-center w-20 h-20 mb-6 mx-auto">
                <img className="w-full h-full object-contain" src={getImage('hbd.svg')} alt="HBD DeFi" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">DeFi Made Simple</h3>
              <p className="text-base text-gray-700 leading-relaxed text-center">
                Earn up to 15% APR on HBD, our decentralized stablecoin pegged to USD.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exchanges */}
      <div className="w-full bg-gradient-to-b from-slate-900 via-gray-900 to-black py-32 px-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              {t('root.exchanges.title')}
            </h2>
            <p className="text-l text-gray-400 max-w-[700px] mx-auto leading-relaxed">
              {t('root.exchanges.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-[1300px] mx-auto">
            {EXCHANGES.map((exchange) => (
              <a
                key={exchange.id}
                className="flex items-center justify-center h-20 bg-white/5 border border-white/10 rounded-xl transition-colors duration-200 hover:bg-white/10 hover:border-white/20"
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

      {/* HBD Money Fountain Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            transition: 'none',
          }}
        >
          <img
            src={getImage('hbd.svg')}
            alt="HBD"
            className="w-8 h-8 opacity-80"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          />
        </div>
      ))}
    </div>
  );
}
