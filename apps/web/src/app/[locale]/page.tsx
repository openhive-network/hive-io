'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo/Logo';
import { ScrollIndicator } from '@/components/ScrollIndicator';
import { RootEco } from '@/components/root/RootEco';
import { useAssets } from '@/hooks/useAssets';
import { EXCHANGES } from '@/lib/data/var';

// Live Activity Components
import { DynamicHero } from '@/components/hero/DynamicHero';

export default function HomePage() {
  const router = useRouter();
  const t = useTranslations();
  const { getImage } = useAssets();

  const go = (link: string) => {
    window.open(link, '_blank');
  };

  const getExchangeImage = (image: string) => {
    return getImage(`exchanges/${image}`);
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

      {/* No fees */}
      <div className="flex flex-1 min-h-[550px] justify-center">
        <div className="flex flex-row-reverse justify-between w-full items-center max-w-[920px] px-10 py-10 max-[700px]:flex-col-reverse max-[700px]:flex-wrap max-[700px]:py-[100px]">
          <div className="w-[350px] max-w-[350px] min-w-[250px] max-[700px]:m-0 max-[700px]:text-center">
            <h2 className="text-[2rem] font-bold leading-snug mb-2.5">{t('root.feeTitle')}</h2>
            <p>
              {t('root.feeText')}
            </p>
            <p>
              {t('root.feeText2')}
            </p>
          </div>
          <div className="ml-[25px] flex justify-center items-center w-[280px] h-[280px] relative max-[700px]:mb-[50px]">
            <img className="w-[150px] z-[1]" src={getImage('fees.png')} alt="No fees" />
          </div>
        </div>
      </div>

      {/* Decentralized */}
      <div className="flex flex-1 min-h-[550px] justify-center bg-[#e7e7f1]">
        <div className="flex flex-row justify-between w-full items-center max-w-[920px] px-10 py-10 max-[700px]:flex-col max-[700px]:flex-wrap max-[700px]:py-[100px]">
          <div className="ml-[25px] flex justify-center items-center w-[280px] h-[280px] relative max-[700px]:mb-[50px]">
            <img className="w-[280px]" src={getImage('decentralized.png')} alt="Decentralized" />
          </div>
          <div className="w-[350px] max-w-[350px] min-w-[250px] max-[700px]:m-0 max-[700px]:text-center">
            <h2 className="text-[2rem] font-bold leading-snug mb-2.5">{t('root.decTitle')}</h2>
            <p>
              {t('root.decText')}
            </p>
            <p>
              {t('root.decText2')}
            </p>
          </div>
        </div>
      </div>

      {/* Username */}
      <div className="flex flex-1 min-h-[550px] justify-center">
        <div className="flex flex-row-reverse justify-between w-full items-center max-w-[920px] px-10 py-10 max-[700px]:flex-col-reverse max-[700px]:flex-wrap max-[700px]:py-[100px]">
          <div className="w-[350px] max-w-[350px] min-w-[250px] max-[700px]:m-0 max-[700px]:text-center">
            <h2 className="text-[2rem] font-bold leading-snug mb-2.5">{t('root.usernameTitle')}</h2>
            <p>
              {t('root.usernameText')}
            </p>
          </div>
          <div className="ml-[25px] flex justify-center items-center w-[280px] h-[280px] relative max-[700px]:mb-[50px]">
            <img className="w-[220px]" src={getImage('username.png')} alt="Username" />
          </div>
        </div>
      </div>

      {/* HDF */}
      <div className="flex flex-1 min-h-[550px] justify-center bg-[#e7e7f1]">
        <div className="flex flex-row justify-between w-full items-center max-w-[920px] px-10 py-10 max-[700px]:flex-col-reverse max-[700px]:flex-wrap max-[700px]:py-[100px]">
          <div className="max-w-[450px] w-full min-w-[250px] mr-[25px] max-[700px]:m-0 max-[700px]:text-center">
            <h2 className="text-[2rem] font-bold leading-snug mb-2.5">{t('root.dafTitle')}</h2>
            <p>
              {t('root.dafText')}
            </p>
            <Button
              className="min-w-[150px] w-fit text-base py-[15px] px-[26px] mt-[15px] float-left"
              onClick={() => go('https://peakd.com/proposals')}
            >
              {t('root.dafButton')}
            </Button>
          </div>
          <img className="w-[250px] max-[700px]:mb-[50px] max-[600px]:w-[200px]" src={getImage('distribution.svg')} alt="HDF" />
        </div>
      </div>

      {/* HBD */}
      <div className="flex flex-1 min-h-[550px] justify-center">
        <div className="flex flex-row-reverse justify-between w-full items-center max-w-[920px] px-10 py-10 max-[700px]:flex-col-reverse max-[700px]:flex-wrap max-[700px]:py-[100px]">
          <div className="w-[350px] max-w-[350px] min-w-[250px] max-[700px]:m-0 max-[700px]:text-center">
            <h2 className="text-[2rem] font-bold leading-snug mb-2.5">{t('root.hbdTitle')}</h2>
            <p>
              {t('root.hbdText')} <br /><br />
              {t('root.hbdAPR')}
            </p>
            <Button className="min-w-[150px] w-fit text-base py-[15px] px-[26px] mt-[15px] float-left" onClick={() => router.push('/hbd')}>
              {t('root.hbdButton')}
            </Button>
          </div>
          <div className="ml-[25px] flex justify-center items-center w-[280px] h-[280px] relative max-[700px]:mb-[50px] max-[600px]:h-[200px]">
            <img className="w-[230px] z-[1] max-[600px]:w-[100px]" src={getImage('hbd.svg')} alt="HBD" />
          </div>
        </div>
      </div>

      {/* Exchanges */}
      <div className="flex flex-col mx-auto bg-[#191919] justify-center items-center py-16 px-5">
        <div className="flex flex-col items-center text-center mb-12 max-w-[800px]">
          <h2 className="text-3xl font-bold text-white mb-3">
            {t('root.exchanges.title')}
          </h2>
          <p className="text-[#bbbbbb] text-lg">
            {t('root.exchanges.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 max-w-[1200px] w-full place-items-center">
          {EXCHANGES.map((exchange) => (
            <a
              key={exchange.id}
              className="flex items-center justify-center h-12 w-full px-4 transition-opacity duration-200 opacity-70 hover:opacity-100"
              href={exchange.website}
              target="_blank"
              rel="nofollow noopener noreferrer"
              title={exchange.name}
            >
              <img
                src={getExchangeImage(exchange.image)}
                alt={exchange.name}
                className="max-h-full max-w-full object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
