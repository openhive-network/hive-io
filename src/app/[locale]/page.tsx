'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo/Logo';
import { ScrollIndicator } from '@/components/ScrollIndicator';
import { RootEco } from '@/components/root/RootEco';
import { Infobar } from '@/components/infobar/Infobar';
import { useAssets } from '@/hooks/useAssets';
import { EXCHANGES } from '@/lib/data/var';

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
        className="flex flex-1 flex-col items-center pt-[60px] px-5 pb-0"
        style={{ minHeight: 'calc(100vh - 80px)' }}
      >
        <div className="flex flex-col items-center justify-center flex-grow mt-0 sm:-mt-10 md:-mt-16 lg:-mt-20">
          <Infobar />
          <div className="flex flex-row items-center justify-items-center relative shrink-0 flex-nowrap">
            <div className="h-fit flex flex-col justify-center min-w-[433px] shrink-0 max-[600px]:min-w-0">
              <h1 className="text-[3.8rem] font-bold leading-tight">Fast.</h1>
              <h1 className="text-[3.8rem] font-bold leading-tight">Scalable.</h1>
              <h1 className="text-[3.8rem] font-bold leading-tight">Powerful.</h1>
              <h3 className="mt-[10px] text-[1.75rem] font-bold leading-normal">The Blockchain for Web3</h3>
              <div>
                <Button className="min-w-[150px] w-fit text-base py-[15px] px-[26px] mt-[15px] float-left" onClick={() => router.push('/about')}>
                  {t('root.learnMore')}
                </Button>
              </div>
            </div>
            <Logo className="h-[150px] -ml-[55px] -mt-[130px] shrink-0 max-[600px]:hidden" full={false} />
          </div>
        </div>
        <div className="flex-shrink-0">
          <ScrollIndicator
            style={{ margin: '0 auto 0px auto', marginBottom: '40px' }}
            scrollToSelector="#ecosystem-section"
          />
        </div>
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
      <div className="flex flex-col mx-auto bg-[#191919] justify-center items-center py-10 px-10 pb-[50px]">
        <div className="text-white font-bold mb-[10px] text-base opacity-100 pb-[2px] cursor-default">
          {t('root.exchanges.title')}
        </div>
        <div className="text-[#bbbbbb] mb-5">
          {t('root.exchanges.subtitle')}
        </div>
        <div className="flex flex-row flex-wrap max-w-[1100px] justify-evenly items-center">
          {EXCHANGES.map((exchange) => (
            <a
              key={exchange.id}
              className={`py-2 px-[15px] my-[10px] mx-[15px] ${exchange.id === 'huobi' ? 'mt-[5px]' : ''}`}
              href={exchange.website}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <img
                src={getExchangeImage(exchange.image)}
                alt={exchange.name}
                className={`transition-opacity duration-100 ease-in opacity-[0.88] hover:opacity-100 ${exchange.id === 'upbit' ? 'h-6' : exchange.id === 'swapzone' ? 'h-[35px]' : 'h-[25px] max-[700px]:h-[14px]'
                  }`}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
