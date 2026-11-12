'use client';

import React, { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { useMainStore } from '@/store/useMainStore';
import { ECOSYSTEM, STATISTIC_WEBSITES, TYPE_COLORS, HIVE_PROJECTS } from '@/lib/data/var';
import { BLOCKEXPLORERS } from '@/lib/data/blockexplorers';
import { weightedShuffle } from '@/lib/data/util';
import { useClientRandom } from '@/hooks/useClientRandom';
import { EcoType, IEcoItem, IStatWebsite } from '@/types';
import { App } from '@/components/app/App';
import { AppType } from '@/components/app/AppType';
import { useAssets } from '@/hooks/useAssets';
import { ModalEco } from '@/components/modal/ModalEco';
import { track } from '@/lib/analytics';
import { LiveFigures } from '@/components/developers/Developers';
import { BlockHexes, HEX_COLORS, type HexType } from '@/components/developers/BlockHexes';

const PROJECTS_ADD_URL = 'https://hiveprojects.io/projects/add';
const REPO_ISSUES_URL = 'https://gitlab.syncad.com/hive/hive-io/-/issues';

const EXPLORER_IDS = new Set(BLOCKEXPLORERS.map((e) => e.id));
const isExplorer = (e: IEcoItem) => EXPLORER_IDS.has(e.id);
const FEATURED = ECOSYSTEM.filter((e) => e.featured && !isExplorer(e));
const OTHERS = ECOSYSTEM.filter((e) => !e.featured && !isExplorer(e));
const EXPLORERS = ECOSYSTEM.filter(isExplorer);
const SERVER_ORDER = [...FEATURED, ...OTHERS, ...EXPLORERS];

const shuffle = (items: IEcoItem[]) => weightedShuffle(items, () => 1);
const shuffleEco = (): IEcoItem[] => [
  ...shuffle(FEATURED),
  ...shuffle(OTHERS),
  ...EXPLORERS,
];

function EcoContent() {
  const router = useRouter();
  const t = useTranslations();
  const ecosystem = useClientRandom('eco-order', SERVER_ORDER, shuffleEco);

  // Not useSearchParams: it would drop the grid from the static HTML.
  const [filterParam, setFilterParam] = useState<string | null>(null);
  useEffect(() => {
    const read = () =>
      setFilterParam(new URLSearchParams(window.location.search).get('t'));
    read();
    window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, []);

  const appTypes = useMemo(() =>
    Object.keys(TYPE_COLORS)
      .filter((c) => {
        return ECOSYSTEM.find((e) => e.types.includes(c as EcoType));
      })
      .map((c) => {
        return {
          value: c,
          count: ECOSYSTEM.filter((e) => e.types.includes(c as EcoType)).length,
        };
      }),
    []
  );

  const [query, setQuery] = useState('');
  const filteredEco = useMemo<IEcoItem[]>(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return ecosystem.filter(
      (e) =>
        (!filterParam || e.types.includes(filterParam as EcoType)) &&
        words.every((w) =>
          `${e.name} ${e.description} ${e.types.join(' ')}`
            .toLowerCase()
            .includes(w)
        )
    );
  }, [ecosystem, filterParam, query]);

  const filterEco = (key: string) => {
    track('eco_filter', { filter_name: key, toggle_state: filterParam === key ? 'off' : 'on' });
    if (filterParam === key) {
      setFilterParam(null);
      router.push('/eco');
    } else {
      setFilterParam(key);
      router.push(`/eco?t=${key}`);
    }
  };

  return (
    <>
        {/* Filter Types */}
        <div className="flex flex-row flex-wrap justify-center gap-3 mb-12">
          {appTypes.map((appType) => (
            <AppType
              key={appType.value}
              className={
                filterParam && filterParam !== appType.value
                  ? 'opacity-40 hover:opacity-75'
                  : ''
              }
              appType={appType.value}
              count={appType.count}
              onClick={() => filterEco(appType.value)}
            />
          ))}
        </div>

        <label className="w-full max-w-[480px] mb-10">
          <span className="sr-only">{t('eco.searchLabel')}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('eco.searchPlaceholder')}
            className="w-full rounded-full border border-gray-300 px-5 py-3 text-base outline-none focus:border-[#e31337] focus-visible:ring-2 focus-visible:ring-[#e31337] focus-visible:ring-offset-2"
          />
        </label>
        {filteredEco.length === 0 && (
          <p className="text-[#555] mb-16">{t('eco.noResults')}</p>
        )}

        <ModalEco />

        {/* Apps Grid */}
        <div
          className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] justify-items-center w-full gap-x-3 gap-y-5 mb-16"
          data-track-placement="eco_grid">
          {filteredEco.map((eco) => (
            <App
              key={eco.id}
              item={eco}
              openModal={true}
              move={true}
              showName={true}
              showTypes={true}
              appType="eco"
              size={85}
              compact={true}
            />
          ))}
        </div>

    </>
  );
}

function BuildBand() {
  const t = useTranslations();
  const locale = useLocale();
  const number = (n: number) => new Intl.NumberFormat(locale).format(n);
  const types = Object.fromEntries(
    (Object.keys(HEX_COLORS) as HexType[]).map((type) => [
      type,
      (chunks: ReactNode) => (
        <strong className="font-semibold" style={{ color: HEX_COLORS[type] }}>
          {chunks}
        </strong>
      ),
    ])
  );
  return (
    <section className="relative overflow-hidden w-full pt-24 pb-28 px-6 sm:px-10 mb-16 bg-gradient-to-b from-gray-900 to-black text-white">
      <BlockHexes />
      <div className="relative max-w-[1000px] mx-auto flex flex-col items-center text-center">
        <h2 className="text-5xl max-[600px]:text-4xl font-bold mb-4">
          {t('eco.buildTitle')}
          <span className="text-[#e31337]">.</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mb-12 text-left">
          {t.rich('eco.buildText', types)}
        </p>
        <LiveFigures
          headLabel={t('developers.headBlockLabel')}
          accountsLabel={t('eco.accountsLabel')}
          transactionsLabel={t('developers.transactionsLabel')}
          number={number}
        />
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/developers"
            className="group relative inline-flex items-center justify-center gap-3 w-[330px] max-[400px]:w-full py-4 bg-white whitespace-nowrap text-black font-semibold rounded-full overflow-hidden text-lg">
            <span className="absolute inset-0 bg-[#e31337] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            <span className="relative group-hover:text-white transition-colors">
              {t('eco.buildCta')}
            </span>
            <span className="relative text-2xl group-hover:text-white transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <a
            href="/llms.txt"
            className="w-[330px] max-[400px]:w-full py-4 border-2 border-gray-600 text-white font-semibold rounded-full hover:border-gray-400 transition-colors text-lg text-center">
            {t('eco.buildSummary')}
          </a>
        </div>
      </div>
    </section>
  );
}

function SiteLogo({ item }: { item: IStatWebsite }) {
  const { getImage } = useAssets();
  return (
    <a
      href={item.website}
      target="_blank"
      rel="noopener"
      className="block h-[40px] w-[220px] transition-transform duration-300 hover:-translate-y-1">
      <img
        src={getImage(`websites/${item.image}`)}
        alt={item.name}
        className="h-full w-full object-contain object-left"
      />
    </a>
  );
}

function EcoLower() {
  const t = useTranslations();
  const faqJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (['1', '2', '3'] as const).map((n) => ({
      '@type': 'Question',
      name: t(`eco.faq.q${n}`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: String(t.raw(`eco.faq.a${n}`)).replace(/<\/?\w+>/g, ''),
      },
    })),
  }).replace(/</g, '\\u003c');
  return (
    <div className="flex flex-col items-center w-full max-w-[1000px] mx-auto px-5 pb-20">
      <section className="w-full mb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
        <h2 className="text-[2.4rem] max-[600px]:text-[2rem] font-bold leading-tight mb-8 text-center">
          {t('eco.faqTitle')}<span className="text-[#e31337]">.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['1', '2', '3'] as const).map((n) => (
          <div key={n} className="flex flex-col gap-2 p-6 sm:p-8 rounded-2xl bg-gray-200">
            <h3 className="text-xl font-bold">{t(`eco.faq.q${n}`)}</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.rich(`eco.faq.a${n}`, {
                projects: (chunks) => (
                  <a href={HIVE_PROJECTS.website} target="_blank" rel="noopener" className="font-semibold text-gray-900 underline decoration-[#e31337] decoration-2 underline-offset-2 hover:text-[#e31337]">
                    {chunks}
                  </a>
                ),
                repo: (chunks) => (
                  <a href={REPO_ISSUES_URL} target="_blank" rel="noopener" className="font-semibold text-gray-900 underline decoration-[#e31337] decoration-2 underline-offset-2 hover:text-[#e31337]">
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
        ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 w-full">
        <div className="flex flex-col items-start">
          <h3 className="text-2xl font-medium text-gray-500 mb-3">
            {t('eco.projectsTitle')}
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            {t('eco.projectsText')}
          </p>
          <SiteLogo item={HIVE_PROJECTS} />
          <a
            href={PROJECTS_ADD_URL}
            target="_blank"
            rel="noopener"
            className="mt-4 font-semibold text-[#e31337] underline underline-offset-2 hover:no-underline">
            {t('eco.projectsAdd')} →
          </a>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-2xl font-medium text-gray-500 mb-3">
            {t('eco.subTitle')}
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-5">{t('eco.subText')}</p>
          <div className="flex flex-row flex-wrap gap-8">
            {STATISTIC_WEBSITES.map((site) => (
              <SiteLogo key={site.id} item={site} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EcoPage() {
  const t = useTranslations();

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-80px)]">
      <div className="flex flex-col items-center w-full max-w-[1000px] mx-auto pt-20 px-5">
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-[4rem] font-bold leading-tight mb-6 max-[600px]:text-[3rem]">
            {t('eco.title')}<span className="text-[#e31337]">.</span>
          </h1>
          <p className="text-2xl font-semibold max-w-[700px] mb-4">
            {t('eco.punch')}
          </p>
          <p className="text-xl max-w-[700px] text-[#555] leading-relaxed mb-4 text-left">
            {t('eco.text')}
          </p>
          <p className="text-xl max-w-[700px] text-[#555] leading-relaxed mb-8 text-left">
            {t('eco.text2')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/join"
              className="group relative inline-flex items-center justify-center gap-3 w-[260px] max-[600px]:w-full py-4 max-[600px]:py-3 bg-gray-800 text-white font-semibold rounded-full overflow-hidden text-lg max-[600px]:text-base">
              <span className="absolute inset-0 bg-[#e31337] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <span className="relative">{t('eco.ctaJoin')}</span>
              <span className="relative text-2xl transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/developers"
              className="w-[260px] max-[600px]:w-full py-4 max-[600px]:py-3 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200 text-lg max-[600px]:text-base text-center">
              {t('eco.ctaBuild')}
            </Link>
          </div>
        </div>

        <EcoContent />
      </div>
      <BuildBand />
      <EcoLower />
    </div>
  );
}
